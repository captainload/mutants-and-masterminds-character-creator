import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js';

console.log('--- Testing Two Independent Instances (GM vs Player) ---');

// Mock a simple in-memory BroadcastChannel for simulation
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
gmManager.broadcastChannel = new MockBroadcastChannel('mm3e_party_p2p_channel');
gmManager.broadcastChannel.onmessage = (e) => gmManager.handleNetworkMessage(e.data);

// Instance 2 (Player)
const playerManager = new CampaignTrackerManager();
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
  creatorName: 'GM Steve',
  powerLevel: 10
});

assert.strictEqual(gmManager.isUserConnected(), true, 'GM is now connected as host');
assert.strictEqual(gmManager.getCampaignState().isHost, true);

// Register GM hero
gmManager.updateCurrentPlayer({
  id: 'gm_hero_1',
  name: 'Raven',
  playerName: 'GM Steve',
  powerLevel: 10,
  bruises: 0,
  conditions: {}
});

// 2. Player joins the campaign using GM's Campaign ID
assert.strictEqual(playerManager.isUserConnected(), false, 'Player instance is still disconnected');

const joined = playerManager.joinCampaign({
  campaignId: camp.campaignId,
  pin: '4444',
  playerName: 'Player Alice',
  powerLevel: 10
});

assert.strictEqual(playerManager.isUserConnected(), true, 'Player instance is now connected');
assert.strictEqual(playerManager.getCampaignState().isHost, false, 'Player is connected as player (not host)');

// Register Player hero
playerManager.updateCurrentPlayer({
  id: 'player_hero_2',
  name: 'Star Knight',
  playerName: 'Player Alice',
  powerLevel: 10,
  bruises: 1, // 1 Toughness penalty
  conditions: { dazed: true }
});

// Broadcast player hero to GM
playerManager.broadcastLocalMemberData();

// Verify GM receives Player member
const gmRoster = gmManager.getPartyMembers();
assert(gmRoster.some(m => m.characterName === 'Star Knight'), 'GM roster received Star Knight from Player instance');
const starKnight = gmRoster.find(m => m.characterName === 'Star Knight');
assert.strictEqual(starKnight.bruises, 1, 'Star Knight has 1 Toughness penalty');
assert.strictEqual(starKnight.toughnessPenalty, -1);
assert(starKnight.conditions.includes('Dazed'), 'Star Knight has Dazed condition');

console.log('✓ Successfully tested two separate instances (GM and Player) syncing live over P2P');
