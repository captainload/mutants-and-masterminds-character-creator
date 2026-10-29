import assert from 'assert';
import { PartyManager } from './js/party.js';

console.log('--- Testing P2P Campaign & Collision Protection ---');

const party = new PartyManager();

// Ensure clean slate
party.leaveCampaign();
assert.strictEqual(party.isUserConnected(), false, 'Initially not connected');

// 1. Create a campaign
const camp1 = party.createCampaign({
  name: 'Justice League',
  campaignId: 'JL-1001',
  pin: '1234',
  creatorName: 'Batman'
});

assert.strictEqual(party.isUserConnected(), true, 'Now connected to campaign');
assert.strictEqual(camp1.campaignId, 'JL-1001');
assert.strictEqual(camp1.pin, '1234');

// 2. When connected, creating another campaign MUST be prevented!
assert.throws(() => {
  party.createCampaign({
    name: 'Avengers',
    campaignId: 'AV-2002',
    pin: '5678'
  });
}, /You are currently connected to campaign/, 'Prevented from creating another campaign while connected');

// 3. Prevented from joining another campaign while connected
assert.throws(() => {
  party.joinCampaign({
    campaignId: 'OTHER-999',
    pin: '0000'
  });
}, /You are currently connected to campaign/, 'Prevented from joining another campaign while connected');

console.log('✓ Successfully prevented creating or joining other campaigns while connected');

// 4. Test identical campaign names with different PINs (isolation)
// Simulate peer message for a different campaign with identical name but different PIN
const initialMembers = party.getPartyMembers().length;

// Incoming message from a different campaign with same name but different PIN/ID
party.handleNetworkMessage({
  type: 'MEMBER_UPDATE',
  campaignId: 'JL-1002', // Different campaign ID
  pin: '9999',           // Different PIN
  member: {
    id: 'alien_hero',
    characterName: 'Superman (Group 2)',
    bruises: 0,
    conditions: []
  }
});

// Should NOT have ingested member from different campaign!
assert.strictEqual(party.getPartyMembers().length, initialMembers, 'Ignored member from different campaign ID');

// Incoming message with correct campaign ID but wrong PIN
party.handleNetworkMessage({
  type: 'MEMBER_UPDATE',
  campaignId: 'JL-1001',
  pin: 'WRONG_PIN',
  member: {
    id: 'impostor',
    characterName: 'Impostor',
    bruises: 0,
    conditions: []
  }
});

assert.strictEqual(party.getPartyMembers().length, initialMembers, 'Ignored member with wrong PIN');

// Incoming message with matching campaign ID and PIN
party.handleNetworkMessage({
  type: 'MEMBER_UPDATE',
  campaignId: 'JL-1001',
  pin: '1234',
  member: {
    id: 'flash_hero',
    characterName: 'The Flash',
    playerName: 'Barry',
    bruises: 1,
    conditions: ['Dazed']
  }
});

const afterValidSync = party.getPartyMembers();
assert.strictEqual(afterValidSync.length, initialMembers + 1, 'Ingested legitimate member from same campaign ID and PIN');
assert(afterValidSync.some(m => m.characterName === 'The Flash'), 'The Flash is in the party');

console.log('✓ PIN and Campaign ID isolation verified: identically named campaigns never collide');

// 5. Test leaving campaign
party.leaveCampaign();
assert.strictEqual(party.isUserConnected(), false, 'Disconnected after leaveCampaign');

// After leaving, creating a campaign is allowed again
const camp2 = party.createCampaign({
  name: 'Titans',
  campaignId: 'TT-3003',
  pin: ''
});
assert.strictEqual(party.isUserConnected(), true, 'Can create campaign after disconnecting');
assert.strictEqual(camp2.campaignId, 'TT-3003');

// Clean up
party.leaveCampaign();

console.log('ALL P2P CAMPAIGN TESTS PASSED CLEANLY!');
