import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js';

console.log('--- Testing Two Independent Instances (GM vs Player) ---');

class MockBroadcastChannel {
  constructor(channelName) {
    this.name = channelName;
    MockBroadcastChannel.channels[channelName] = MockBroadcastChannel.channels[channelName] || [];
    MockBroadcastChannel.channels[channelName].push(this);
    this.onmessage = null;
  }
  postMessage(data) {
    const peers = MockBroadcastChannel.channels[this.name] || [];
    peers.forEach(peer => {
      if (peer !== this && peer.onmessage) {
        peer.onmessage({ data });
      }
    });
  }
}
MockBroadcastChannel.channels = {};

// Instance 1 (GM)
const gmManager = new CampaignTrackerManager();
gmManager._fallbackTabId = 'tab_gm_001';
gmManager.broadcastChannel = new MockBroadcastChannel('mm3e_party_p2p_channel');
gmManager.broadcastChannel.onmessage = (e) => gmManager.handleNetworkMessage(e.data);

// Instance 2 (Player)
const playerManager = new CampaignTrackerManager();
playerManager._fallbackTabId = 'tab_player_002';
playerManager.broadcastChannel = new MockBroadcastChannel('mm3e_party_p2p_channel');
playerManager.broadcastChannel.onmessage = (e) => playerManager.handleNetworkMessage(e.data);

// Verify initial state: both disconnected
gmManager.leaveCampaign();
playerManager.leaveCampaign();

assert.strictEqual(gmManager.isUserConnected(), false, 'GM starts disconnected');
assert.strictEqual(playerManager.isUserConnected(), false, 'Player starts disconnected');

// 1. GM creates campaign
const camp = gmManager.createCampaign({
  name: 'Freedom League',
  campaignId: 'FREE-101',
  pin: '4444',
  creatorName: 'Steve',
  powerLevel: 10
});

assert.strictEqual(gmManager.isUserConnected(), true, 'GM is now connected as host');
assert.strictEqual(gmManager.getCampaignState().isHost, true);

// Verify GM Start/End Session controls
assert.strictEqual(gmManager.isSessionActive('FREE-101'), true, 'Session is active after creation');
gmManager.endSession('FREE-101');
assert.strictEqual(gmManager.isSessionActive('FREE-101'), false, 'Session successfully ended by GM');
gmManager.startSession('FREE-101');
assert.strictEqual(gmManager.isSessionActive('FREE-101'), true, 'Session successfully restarted by GM');

// GM loads a character into GM client (unattached hero / NPC)
gmManager.updateCurrentPlayer({
  id: 'npc_char_id',
  name: 'Dr. Sinister',
  playerName: 'Steve',
  powerLevel: 12,
  bruises: 0,
  conditions: {}
});

// Verify unattached character loaded in GM client does NOT automatically join the party
const gmInitialRoster = gmManager.getPartyMembers();
assert.strictEqual(gmInitialRoster.length, 0, 'Characters loaded into GM client do NOT automatically join running campaign party');

// 2. Player joins campaign with attached character
playerManager.updateCurrentPlayer({
  id: 'player_char_id',
  name: 'Star Knight',
  playerName: 'Alice',
  campaign: 'Freedom League',
  campaignId: camp.campaignId,
  powerLevel: 10,
  bruises: 1,
  conditions: { dazed: true }
});

const joined = playerManager.joinCampaign({
  campaignId: camp.campaignId,
  pin: '4444',
  playerName: 'Alice',
  powerLevel: 10,
  campaignName: 'Freedom League'
});

assert.strictEqual(playerManager.isUserConnected(), true, 'Player instance is now connected');
assert.strictEqual(playerManager.getCampaignState().isHost, false, 'Player is connected as player (not host)');

// GM and Player both see Star Knight in the party!
const gmRosterAfterPlayerJoin = gmManager.getPartyMembers();
assert.strictEqual(gmRosterAfterPlayerJoin.length, 1, 'GM roster contains only the joined player');
assert.strictEqual(gmRosterAfterPlayerJoin[0].characterName, 'Star Knight', 'Star Knight is in GM roster');

// 3. GM chooses to attach a character to the campaign party (same way players do)
gmManager.updateCurrentPlayer({
  id: 'gm_hero_id',
  name: 'Aegis',
  playerName: 'Steve',
  campaign: 'Freedom League',
  campaignId: camp.campaignId,
  powerLevel: 10,
  bruises: 0,
  conditions: {}
});
gmManager.broadcastLocalMemberData();

// Now both rosters contain BOTH heroes (Star Knight + Aegis)
const gmRoster = gmManager.getPartyMembers();
assert.strictEqual(gmRoster.length, 2, 'GM roster contains 2 heroes (Aegis + Star Knight)');
assert(gmRoster.some(m => m.characterName === 'Aegis'), 'GM attached hero Aegis is in GM roster');
assert(gmRoster.some(m => m.characterName === 'Star Knight'), 'Star Knight is in GM roster');

const playerRoster = playerManager.getPartyMembers();
assert.strictEqual(playerRoster.length, 2, 'Player roster contains 2 heroes (Star Knight + Aegis)');
assert(playerRoster.some(m => m.characterName === 'Star Knight'), 'Star Knight is in Player roster');
assert(playerRoster.some(m => m.characterName === 'Aegis'), 'Aegis is in Player roster');

// 3. Test Toughness penalty and condition live update
playerManager.updateCurrentPlayer({
  id: 'player_char_id',
  name: 'Star Knight',
  playerName: 'Alice',
  campaign: 'Freedom League',
  campaignId: camp.campaignId,
  powerLevel: 10,
  bruises: 2, // 2 Toughness penalty
  conditions: { dazed: true, staggered: true }
});

const updatedGMRoster = gmManager.getPartyMembers();
const gmStarKnight = updatedGMRoster.find(m => m.characterName === 'Star Knight');
assert.strictEqual(gmStarKnight.bruises, 2, 'GM received updated 2 Toughness penalty');
assert.strictEqual(gmStarKnight.toughnessPenalty, -2);
assert(gmStarKnight.conditions.includes('Staggered'), 'GM received Staggered condition');

gmManager.stopSessionHeartbeat();
playerManager.stopSessionHeartbeat();
console.log('ALL TWO-INSTANCE HANDSHAKE AND SYNC TESTS PASSED CLEANLY!');
process.exit(0);
