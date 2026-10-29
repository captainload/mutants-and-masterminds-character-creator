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

// 1. GM creates campaign with blank hero name
const camp = gmManager.createCampaign({
  name: 'Freedom League',
  campaignId: 'FREE-101',
  pin: '4444',
  creatorName: 'Steve',
  powerLevel: 10
});

assert.strictEqual(gmManager.isUserConnected(), true, 'GM is now connected as host');
assert.strictEqual(gmManager.getCampaignState().isHost, true);

// GM registers blank hero
gmManager.updateCurrentPlayer({
  id: 'shared_char_id', // Note: Same base ID from shared storage!
  name: '', // Blank name on GM side
  playerName: '',
  powerLevel: 10,
  bruises: 0,
  conditions: {}
});

// Check GM's hero label
const gmInitialRoster = gmManager.getPartyMembers();
assert.strictEqual(gmInitialRoster.length, 1);
assert.strictEqual(gmInitialRoster[0].characterName, 'GM (Steve)', 'GM hero clearly identified instead of Unnamed Hero');

// 2. Player joins campaign with named character
playerManager.updateCurrentPlayer({
  id: 'shared_char_id', // Same base ID from shared storage!
  name: 'Star Knight',
  playerName: 'Alice',
  powerLevel: 10,
  bruises: 1,
  conditions: { dazed: true }
});

const joined = playerManager.joinCampaign({
  campaignId: camp.campaignId,
  pin: '4444',
  playerName: 'Alice',
  powerLevel: 10
});

assert.strictEqual(playerManager.isUserConnected(), true, 'Player instance is now connected');
assert.strictEqual(playerManager.getCampaignState().isHost, false, 'Player is connected as player (not host)');

// Verify handshake completed: both rosters contain BOTH heroes!
const gmRoster = gmManager.getPartyMembers();
assert.strictEqual(gmRoster.length, 2, 'GM roster contains 2 heroes (GM + Player)');
assert(gmRoster.some(m => m.characterName === 'GM (Steve)'), 'GM hero is in GM roster');
assert(gmRoster.some(m => m.characterName === 'Star Knight'), 'Star Knight is in GM roster');

const playerRoster = playerManager.getPartyMembers();
assert.strictEqual(playerRoster.length, 2, 'Player roster contains 2 heroes (Player + GM)');
assert(playerRoster.some(m => m.characterName === 'Star Knight'), 'Star Knight is in Player roster');
assert(playerRoster.some(m => m.characterName === 'GM (Steve)'), 'GM hero is in Player roster');

// 3. Test Toughness penalty and condition live update
playerManager.updateCurrentPlayer({
  id: 'shared_char_id',
  name: 'Star Knight',
  playerName: 'Alice',
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
