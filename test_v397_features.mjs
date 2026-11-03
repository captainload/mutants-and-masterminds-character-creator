import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js?v=3.99';
import { supabaseService } from './js/supabase_client.js?v=3.99';

console.log('--- TEST SUITE: v3.97 Features ---');

// Mock localStorage / sessionStorage
const storageData = {};
global.localStorage = {
  getItem: (k) => storageData[k] || null,
  setItem: (k, v) => { storageData[k] = String(v); },
  removeItem: (k) => { delete storageData[k]; },
  clear: () => { Object.keys(storageData).forEach(k => delete storageData[k]); }
};
global.sessionStorage = {
  getItem: (k) => storageData[k] || null,
  setItem: (k, v) => { storageData[k] = String(v); },
  removeItem: (k) => { delete storageData[k]; },
  clear: () => { Object.keys(storageData).forEach(k => delete storageData[k]); }
};

// Mock window and document
global.window = {
  location: { href: 'http://localhost:3000' },
  addEventListener: () => {},
  removeEventListener: () => {},
  appController: {
    char: { id: 'char-1', name: 'Titan', campaign: '', campaignId: '' },
    primaryChar: null,
    storage: {
      getCharacters: () => [
        { id: 'char-1', name: 'Titan', campaign: '', campaignId: '' }
      ]
    },
    saveAndAudit: () => {},
    updateCampaignDropdown: () => {},
    alignCampaignButton: () => {}
  }
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

// Test 1: Verify supabaseService has deleteCampaign and removeCampaignMember
console.log('Test 1: Supabase client methods');
assert(typeof supabaseService.deleteCampaign === 'function', 'supabaseService must have deleteCampaign method');
assert(typeof supabaseService.removeCampaignMember === 'function', 'supabaseService must have removeCampaignMember method');
console.log('✓ Supabase deleteCampaign and removeCampaignMember methods are available.');

// Test 2: Delete Campaign by GM completely removes from registry, history, and browser
console.log('Test 2: Delete Campaign by GM');
const mgr = new CampaignTrackerManager();

// Set user as GM
supabaseService.currentUser = { id: 'gm-user-1', email: 'gm@example.com' };
supabaseService.currentProfile = { id: 'gm-user-1', username: 'GameMaster', email: 'gm@example.com' };

const testCampId = 'ALPHA-1234';
const testCampName = 'Alpha Squadron';

// Register campaign in registry & history
mgr.registerCampaignInfo({
  campaignId: testCampId,
  campaignName: testCampName,
  creator_id: 'gm-user-1',
  creatorName: 'GameMaster',
  powerLevel: 10,
  isPublic: true
});

mgr.saveToCampaignHistory({
  campaignId: testCampId,
  campaignName: testCampName,
  creator_id: 'gm-user-1',
  creatorName: 'GameMaster',
  powerLevel: 10,
  isCreator: true,
  isPublic: true
});

// Verify it exists in browsable campaigns
let browsable = mgr.getBrowsableCampaigns();
assert(browsable.some(c => c.campaignId === testCampId), 'Campaign must be visible in browser before deletion');

// Delete campaign
mgr.deleteCampaignByGM(testCampId);

// Verify it was removed from registry
const reg = mgr.getCampaignRegistry();
assert(!reg[testCampId], 'Campaign must be removed from registry');

// Verify it was removed from history even though user is creator
const hist = mgr.getCampaignHistory();
assert(!hist.some(c => c.campaignId === testCampId), 'Campaign must be removed from history completely');

// Verify it is NO LONGER in browsable campaigns
browsable = mgr.getBrowsableCampaigns();
assert(!browsable.some(c => c.campaignId === testCampId), 'Deleted campaign must NOT appear in campaign browser');
console.log('✓ Delete Campaign successfully removes campaign from registry, history, and campaign browser.');

// Test 3: Player Leaving Party
console.log('Test 3: Player Leaving Party');
const campBId = 'BETA-5678';
const campBName = 'Beta Team';

// Setup campaign created by GM
mgr.registerCampaignInfo({
  campaignId: campBId,
  campaignName: campBName,
  creator_id: 'other-gm-user',
  creatorName: 'OtherGM',
  powerLevel: 8,
  isPublic: true
});

// Setup active user as Player
supabaseService.currentUser = { id: 'player-user-1', email: 'player@example.com' };
supabaseService.currentProfile = { id: 'player-user-1', username: 'SpeedHero', email: 'player@example.com' };

// Player has an approved join request
mgr.saveAllJoinRequestsStore([
  {
    campaignId: campBId,
    campaignName: campBName,
    username: 'speedhero',
    status: 'approved'
  }
]);

// Player character attached
window.appController.char = {
  id: 'char-speed',
  name: 'Velocity',
  campaign: campBName,
  campaignId: campBId
};
window.appController.storage.getCharacters = () => [window.appController.char];

// Player has character backup in campaign characters store
storageData[`mm3e_campaign_characters_${campBId}`] = JSON.stringify({
  'char-speed': {
    characterName: 'Velocity',
    playerName: 'speedhero',
    heroPoints: 1
  }
});

// Before leaving: player is in party
assert.strictEqual(mgr.isUserMemberOfCampaign(campBId, campBName), true, 'Player should be a party member before leaving');

// Player leaves party
window.appController.char.campaign = '';
window.appController.char.campaignId = '';
mgr.leaveCampaignPermanent(campBId, campBName);

// Verify join request was removed / no longer approved
const reqsAfter = mgr.getAllJoinRequestsStore().filter(r => r.campaignId === campBId && r.username === 'speedhero');
assert.strictEqual(reqsAfter.length, 0, 'Approved join request must be removed upon leaving party');

// Verify character backup remains intact (user requirement)
assert.ok(storageData[`mm3e_campaign_characters_${campBId}`], 'Campaign character backups must remain intact in storage');

// Verify isUserMemberOfCampaign is now false (character backup does NOT grant active party membership)
assert.strictEqual(mgr.isUserMemberOfCampaign(campBId, campBName), false, 'Player must NOT remain in party after leaving');

console.log('✓ Player successfully leaves party, character backups remain preserved without granting phantom party membership.');

// Test 4: GM Leaving Party (GM keeps ownership, but is not in party)
console.log('Test 4: GM Leaving Party');
const campCId = 'GAMMA-9999';
const campCName = 'Gamma Corps';

supabaseService.currentUser = { id: 'gm-user-1', email: 'gm@example.com' };
supabaseService.currentProfile = { id: 'gm-user-1', username: 'GameMaster', email: 'gm@example.com' };

mgr.registerCampaignInfo({
  campaignId: campCId,
  campaignName: campCName,
  creator_id: 'gm-user-1',
  creatorName: 'GameMaster',
  powerLevel: 10,
  isPublic: true
});

mgr.saveToCampaignHistory({
  campaignId: campCId,
  campaignName: campCName,
  creator_id: 'gm-user-1',
  creatorName: 'GameMaster',
  powerLevel: 10,
  isCreator: true,
  isPublic: true
});

// GM has no character attached
window.appController.char = {
  id: 'char-gm-observer',
  name: 'GM Observer',
  campaign: '',
  campaignId: ''
};
window.appController.storage.getCharacters = () => [window.appController.char];

// GM leaves party (detaches any characters)
mgr.leaveCampaignPermanent(campCId, campCName);

// Verify GM still owns campaign in registry and history
const histAfter = mgr.getCampaignHistory().find(c => c.campaignId === campCId);
assert(histAfter && histAfter.isCreator, 'GM must still own campaign in history after leaving party');

// In browser HTML, card should reflect GM (Owner) and NOT In Party
const browserHTML = mgr.generateCampaignBrowserHTML();
assert(browserHTML.includes('👑 GM (Owner)'), 'GM without attached character must be marked GM (Owner)');
assert(!browserHTML.includes('👑 GM • 🌟 In Party'), 'GM without attached character must NOT be marked In Party');
assert(browserHTML.includes('Attach Character') || browserHTML.includes('Join Campaign'), 'Card must show Attach Character or Join Campaign button when GM is not in party');

console.log('✓ GM leaving party keeps campaign ownership while properly removing party membership status.');

console.log('--- ALL v3.97 TESTS PASSED SUCCESSFULLY! ---');
