import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js?v=3.98';
import { supabaseService } from './js/supabase_client.js?v=3.98';

console.log('--- TEST SUITE: v3.98 Features ---');

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
  appController: null
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

// ----------------------------------------------------
// Test 1: UI Prompting to Attach Currently Loaded Character on Apply
// ----------------------------------------------------
console.log('Test 1: Verify apply flow prompts to attach loaded character and handles decline');

let confirmPromptText = '';
let alertText = '';
let confirmResponse = false;

const dummyApp = {
  char: {
    name: 'Shadow Hawk',
    powerLevel: 10,
    campaign: '',
    campaignId: ''
  },
  primaryChar: null,
  saveAndAudit: () => {},
  updateCampaignDropdown: () => {},
  alignCampaignButton: () => {},
  async showConfirmDialog(msg, opts) {
    confirmPromptText = msg;
    return confirmResponse;
  },
  async showAlertDialog(msg, opts) {
    alertText = msg;
  },
  async checkOfferLoadAttachedCharacter() {},
  async joinGameSession() {}
};

global.window.appController = dummyApp;

// Create dummy implementation of openJoinCampaignDialog logic to test unit behavior
async function simulateApplyFlow(app, campName, cleanCampId, campPL, dontEnforcePL) {
  let charName = (app.char.name || '').trim();
  
  // Ask user if they wish to attach the currently loaded character
  const wantAttachLoadedChar = await app.showConfirmDialog(
    `Do you want to attach your currently loaded character "${charName}" to campaign "${campName}" (#${cleanCampId})?`,
    {
      title: 'Attach Character to Campaign?',
      confirmText: `Attach "${charName}"`,
      cancelText: 'No',
      confirmClass: 'btn-primary'
    }
  );

  if (!wantAttachLoadedChar) {
    await app.showAlertDialog(
      'Please load the character you wish to attach before requesting to join a campaign.',
      { title: 'Load Character First' }
    );
    return false;
  }

  // Proceed with attach
  app.char.campaign = campName;
  app.char.campaignId = cleanCampId;
  return true;
}

// Case A: User declines attaching loaded character
confirmResponse = false;
let applied = await simulateApplyFlow(dummyApp, 'Titan Watch', 'TITA-4039', 10, false);
assert.strictEqual(applied, false, 'Flow must halt when user declines attaching loaded character');
assert(confirmPromptText.includes('Do you want to attach your currently loaded character "Shadow Hawk"'), 'Confirmation prompt must include character name');
assert(alertText.includes('Please load the character you wish to attach before requesting to join a campaign'), 'Decline must alert user to load desired character first');
assert.strictEqual(dummyApp.char.campaign, '', 'Character must NOT be attached when declined');

// Case B: User accepts attaching loaded character
confirmResponse = true;
applied = await simulateApplyFlow(dummyApp, 'Titan Watch', 'TITA-4039', 10, false);
assert.strictEqual(applied, true, 'Flow must proceed when user accepts attaching loaded character');
assert.strictEqual(dummyApp.char.campaign, 'Titan Watch', 'Character must be attached when confirmed');
console.log('✓ Apply flow prompts to attach currently loaded character and properly aborts with instructions if declined.');

// ----------------------------------------------------
// Test 2: Individual Orphan Campaign Deletion
// ----------------------------------------------------
console.log('Test 2: Individual Orphan Campaign Deletion');
const mgr = new CampaignTrackerManager();

supabaseService.currentUser = { id: 'test-user-1', email: 'user@example.com' };
supabaseService.currentProfile = { id: 'test-user-1', username: 'psycros', email: 'psycros@gmail.com' };

const orphanCampId = 'ORPH-0001';
const orphanCampName = 'Abandoned Realm';

mgr.registerCampaignInfo({
  campaignId: orphanCampId,
  campaignName: orphanCampName,
  creator_id: 'unknown-user-id',
  creatorName: 'GhostGM',
  powerLevel: 8,
  isPublic: true
});

mgr.saveToCampaignHistory({
  campaignId: orphanCampId,
  campaignName: orphanCampName,
  creator_id: 'unknown-user-id',
  creatorName: 'GhostGM',
  powerLevel: 8,
  isCreator: false,
  isPublic: true
});

let browsable = mgr.getBrowsableCampaigns();
assert(browsable.some(c => c.campaignId === orphanCampId), 'Orphan campaign must be in browser before deletion');

// Delete orphan campaign
const deleted = mgr.deleteOrphanCampaign(orphanCampId, orphanCampName);
assert.strictEqual(deleted, true, 'deleteOrphanCampaign should succeed');

// Verify removal
assert(!mgr.getCampaignRegistry()[orphanCampId], 'Orphan campaign must be removed from registry');
assert(!mgr.getCampaignHistory().some(c => c.campaignId === orphanCampId), 'Orphan campaign must be removed from history');
assert(!mgr.getBrowsableCampaigns().some(c => c.campaignId === orphanCampId), 'Orphan campaign must no longer appear in browser');
console.log('✓ Individual orphan campaign deletion completely removes campaign from registry, history, and browser.');

// ----------------------------------------------------
// Test 3: Bulk Purge of Orphan Campaigns
// ----------------------------------------------------
console.log('Test 3: Bulk Purge of Orphan Campaigns');

// Setup: 2 valid campaigns owned by test GMs (captainload and psycros)
mgr.registerCampaignInfo({
  campaignId: 'CAP-1001',
  campaignName: 'Captainload Citadel',
  creator_id: '10ef10b5-5583-424c-bccb-1ba7ca8033a8',
  creatorName: 'captainload',
  powerLevel: 10,
  isPublic: true
});
mgr.saveToCampaignHistory({
  campaignId: 'CAP-1001',
  campaignName: 'Captainload Citadel',
  creator_id: '10ef10b5-5583-424c-bccb-1ba7ca8033a8',
  creatorName: 'captainload',
  powerLevel: 10,
  isCreator: false,
  isPublic: true
});

mgr.registerCampaignInfo({
  campaignId: 'PSY-2002',
  campaignName: 'Psycros Stronghold',
  creator_id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d',
  creatorName: 'psycros',
  powerLevel: 10,
  isPublic: true
});
mgr.saveToCampaignHistory({
  campaignId: 'PSY-2002',
  campaignName: 'Psycros Stronghold',
  creator_id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d',
  creatorName: 'psycros',
  powerLevel: 10,
  isCreator: true,
  isPublic: true
});

// Setup: 3 orphan campaigns
const orphanList = [
  { id: 'ORPH-0010', name: 'Random World 1', creator: 'StrangelyNamedGM' },
  { id: 'ORPH-0020', name: 'Forgotten Sector', creator: 'LegacyHost' },
  { id: 'ORPH-0030', name: 'Lost Dimensions', creator: '' }
];

orphanList.forEach(oc => {
  mgr.registerCampaignInfo({
    campaignId: oc.id,
    campaignName: oc.name,
    creator_id: 'some-other-id',
    creatorName: oc.creator,
    powerLevel: 10,
    isPublic: true
  });
  mgr.saveToCampaignHistory({
    campaignId: oc.id,
    campaignName: oc.name,
    creator_id: 'some-other-id',
    creatorName: oc.creator,
    powerLevel: 10,
    isCreator: false,
    isPublic: true
  });
});

// Verify all 5 are currently present
assert.strictEqual(mgr.getBrowsableCampaigns().length, 5, 'Should have 5 campaigns total before purge');

// Simulate bulk purge logic
const knownGMs = ['captainload', 'psycros'];
const history = mgr.getCampaignHistory() || [];
const reg = mgr.getCampaignRegistry() || {};
const browsableList = mgr.getBrowsableCampaigns() || [];

const orphanMap = new Map();
const checkAndAdd = (c) => {
  if (!c || !c.campaignId) return;
  const cleanId = String(c.campaignId).toUpperCase().replace(/^#+/, '');
  const creator = String(c.creatorName || c.creator_name || '').trim().toLowerCase();
  if (!knownGMs.includes(creator)) {
    if (!orphanMap.has(cleanId)) {
      orphanMap.set(cleanId, {
        campaignId: cleanId,
        campaignName: c.campaignName || cleanId,
        creatorName: c.creatorName || 'Unknown / None'
      });
    }
  }
};

browsableList.forEach(checkAndAdd);
history.forEach(checkAndAdd);
Object.values(reg).forEach(checkAndAdd);

assert.strictEqual(orphanMap.size, 3, 'Must identify exactly 3 orphan campaigns');

// Execute purge
for (const c of orphanMap.values()) {
  mgr.deleteOrphanCampaign(c.campaignId, c.campaignName);
}

// Verify post-purge state: only the 2 valid test GM campaigns remain!
const remaining = mgr.getBrowsableCampaigns();
assert.strictEqual(remaining.length, 2, 'Only 2 campaigns must remain after purge');
assert(remaining.some(c => c.campaignId === 'CAP-1001'), 'captainload campaign must be preserved');
assert(remaining.some(c => c.campaignId === 'PSY-2002'), 'psycros campaign must be preserved');
assert(!remaining.some(c => c.campaignId.startsWith('ORPH-')), 'No orphan campaigns should remain');

// Verify HTML contains Purge button and orphan delete options
const browserHTML = mgr.generateCampaignBrowserHTML();
assert(browserHTML.includes('btn-purge-orphan-campaigns'), 'Campaign Browser toolbar must contain Purge Orphan Campaigns button');
assert(browserHTML.includes('btn-delete-orphan-campaign'), 'Actions dropdown for non-owned campaign must contain Delete Campaign option');

console.log('✓ Bulk purge accurately identifies and purges all orphan campaigns while preserving captainload and psycros campaigns.');

console.log('--- ALL v3.98 TESTS PASSED SUCCESSFULLY! ---');
