import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageMap = new Map();
globalThis.localStorage = {
  getItem: (k) => (storageMap.has(k) ? storageMap.get(k) : null),
  setItem: (k, v) => storageMap.set(k, String(v)),
  removeItem: (k) => storageMap.delete(k),
  clear: () => storageMap.clear()
};

const sessionMap = new Map();
globalThis.sessionStorage = {
  getItem: (k) => (sessionMap.has(k) ? sessionMap.get(k) : null),
  setItem: (k, v) => sessionMap.set(k, String(v)),
  removeItem: (k) => sessionMap.delete(k),
  clear: () => sessionMap.clear()
};

globalThis.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};
globalThis.window = {
  location: { origin: 'https://example.com', pathname: '/index.html', href: 'https://example.com/index.html' },
  addEventListener: () => {}
};

const { partyManager } = await import('./js/party.js');

console.log('=== Testing v3.76 Features ===');

// 1. Verify Version 3.76 & Messaging Client Size (matches Campaign Tracker .25in margins)
const versionJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'version.json'), 'utf8'));
assert.equal(versionJson.version, '3.76', 'version.json should be 3.76');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, 'css', 'styles.css'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');

assert.ok(
  stylesCss.includes('#modal-campaign-tracker .modal-container,\n#modal-campaign-messages .modal-container') ||
  stylesCss.includes('#modal-campaign-tracker .modal-container,\r\n#modal-campaign-messages .modal-container'),
  'styles.css should size #modal-campaign-messages .modal-container identically to #modal-campaign-tracker .modal-container'
);
assert.ok(
  indexHtml.includes('id="modal-campaign-messages"') &&
  indexHtml.includes('width: calc(100vw - 0.5in); max-width: calc(100vw - 0.5in); height: calc(100vh - 0.5in); max-height: calc(100vh - 0.5in); margin: 0.25in;'),
  'index.html #modal-campaign-messages should have the same full-screen .25in margin dimensions as Campaign Tracker'
);

console.log('✓ 1. Messaging Client sized identically to Campaign Tracker verified.');

// 2. Verify GM-Owned Campaigns Marked with 👑 Icon and Shown First in Both Campaign Browser and Messaging Dialog
localStorage.clear();
globalThis.window.appController = { char: { name: 'Centurion', playerName: 'GM_Valiant' } };

// Register and join a campaign as a PLAYER (not GM)
partyManager.registerCampaignInfo({
  campaignId: 'PLY-101',
  campaignName: 'Titans Tomorrow',
  creatorName: 'OtherGM',
  powerLevel: 10,
  isPublic: true
});
partyManager.joinCampaign({
  campaignId: 'PLY-101',
  campaignName: 'Titans Tomorrow',
  playerName: 'GM_Valiant',
  powerLevel: 10
});

// Create a campaign as GM (Owner)
const gmCamp1 = partyManager.createCampaign({
  name: 'Alpha Sentinels',
  powerLevel: 12,
  creatorName: 'GM_Valiant'
});

// Register another public campaign not joined at all
partyManager.registerCampaignInfo({
  campaignId: 'PUB-303',
  campaignName: 'Outsiders Public',
  creatorName: 'ThirdGM',
  powerLevel: 8,
  isPublic: true
});

// Ensure PLY-101 has a MORE RECENT lastJoinedMs than gmCamp1 so we prove GM-owned campaigns still sort FIRST
const hist = partyManager.getCampaignHistory();
hist.forEach(c => {
  if (c.campaignId === 'PLY-101') c.lastJoinedMs = Date.now() + 50000;
  if (c.campaignId === gmCamp1.campaignId) c.lastJoinedMs = Date.now() - 50000;
});
localStorage.setItem('mm3e_campaigns_history', JSON.stringify(hist));

const browsable = partyManager.getBrowsableCampaigns();
assert.equal(browsable[0].campaignId, gmCamp1.campaignId, 'Campaigns the GM owns must be shown FIRST in the Campaign Browser');
assert.equal(browsable[0].isCreator, true);
assert.equal(browsable[1].campaignId, 'PLY-101', 'Other campaigns the user participates in should appear after GM-owned campaigns');
assert.equal(browsable[1].isCreator, false);
assert.equal(browsable[2].campaignId, 'PUB-303', 'Unjoined public campaigns should appear after participated campaigns');

const browserHtml = partyManager.generatePartyHTML();
// Extract the card HTML for GM-owned campaign vs Player-participated campaign
const gmCardIdx = browserHtml.indexOf(`data-campid="${gmCamp1.campaignId}"`);
const plyCardIdx = browserHtml.indexOf('data-campid="PLY-101"');
assert.ok(gmCardIdx !== -1 && plyCardIdx > gmCardIdx, 'GM-owned campaign card must render before Player-participated campaign card');

const gmCardSlice = browserHtml.slice(gmCardIdx, plyCardIdx);
const plyCardSlice = browserHtml.slice(plyCardIdx, browserHtml.indexOf('data-campid="PUB-303"'));

assert.ok(gmCardSlice.includes('data-gm-owned="1"') && gmCardSlice.includes('👑 Alpha Sentinels'), 'GM-owned campaign in Campaign Browser must be marked with the 👑 icon');
assert.ok(plyCardSlice.includes('data-gm-owned="0"') && !plyCardSlice.includes('👑 Titans Tomorrow') && !plyCardSlice.includes('👑 GM'), 'Other participated campaigns in Campaign Browser must NOT have the 👑 GM icon');

console.log('✓ 2. GM-owned campaigns shown first and marked with 👑 icon (while other participated campaigns omit it) in Campaign Browser verified.');

// 3. Verify Well-Defined Recipient Scope Choices & GM Icon / Ordering in Messaging Dialog
const scopeChoices = partyManager.getRecipientScopeChoices();
const labels = scopeChoices.map(s => s.label);

assert.ok(
  scopeChoices.some(s => s.value === 'CURRENT_CONNECTED' && s.label.includes('Participants of currently connected campaign (excludes the user themselves)')),
  'Recipient scope must include "Participants of currently connected campaign (excludes the user themselves)"'
);
assert.ok(
  scopeChoices.some(s => s.value === 'ALL_OWNED' && s.label.includes('Participants of all campaigns owned')),
  'Recipient scope must include "Participants of all campaigns owned"'
);

const campScopes = scopeChoices.filter(s => s.scopeType === 'SINGLE_CAMPAIGN');
assert.equal(campScopes.length, 2, 'Both participated campaigns should appear as "Participants of [campaign]" scopes');
assert.equal(campScopes[0].campaignId, gmCamp1.campaignId, 'GM-owned campaign must be listed FIRST in Messaging Dialog recipient scopes');
assert.ok(campScopes[0].label.startsWith('👑 Participants of Alpha Sentinels'), 'GM-owned campaign scope must be marked with 👑 icon');
assert.equal(campScopes[1].campaignId, 'PLY-101', 'Other participated campaign must be listed after GM-owned campaigns');
assert.ok(campScopes[1].label.startsWith('Participants of Titans Tomorrow') && !campScopes[1].label.includes('👑'), 'Other participated campaign scope must NOT have 👑 icon');

console.log('✓ 3. Well-defined Recipient Scope choices and GM-first 👑 icon in Messaging Dialog verified.');

// 4. Verify Scoped Messaging Behavior (Excludes Sender Themselves) & Multi-User Checkbox Selection
// Add two players to gmCamp1 and start/connect to a live session
partyManager.saveCampaignSavedCharacter(gmCamp1.campaignId, { id: 'c1', name: 'Starfire', powerLevel: 12 }, 'Player_Alice');
partyManager.saveCampaignSavedCharacter(gmCamp1.campaignId, { id: 'c2', name: 'Nighthawk', powerLevel: 12 }, 'Player_Bob');
partyManager.saveCampaignSavedCharacter(gmCamp1.campaignId, { id: 'c3', name: 'Centurion', powerLevel: 12 }, 'GM_Valiant');

partyManager.startSession(gmCamp1.campaignId);
partyManager.joinGameSession({
  campaignId: gmCamp1.campaignId,
  campaignName: gmCamp1.campaignName,
  playerName: 'GM_Valiant',
  powerLevel: 12
});

// 4a. Test "Participants of currently connected campaign (excludes the user themselves)"
const connectedParticipants = partyManager.getCampaignParticipants(gmCamp1.campaignId, 'GM_Valiant');
assert.ok(connectedParticipants.includes('Player_Alice') && connectedParticipants.includes('Player_Bob'), 'Participants of connected campaign should include Alice and Bob');
assert.ok(!connectedParticipants.includes('GM_Valiant'), 'Participants of connected campaign MUST exclude the user themselves (GM_Valiant)');

const msgConnected = partyManager.sendDirectUserMessage({
  recipientScope: 'CURRENT_CONNECTED',
  senderUser: 'GM_Valiant',
  text: 'Session is live! Join the tracker room.'
});
assert.equal(msgConnected.excludedUser, 'GM_Valiant', 'CURRENT_CONNECTED message must record excludedUser as the sender');
assert.ok(!msgConnected.recipientUsers.includes('GM_Valiant'), 'CURRENT_CONNECTED recipientUsers must exclude the sender themselves');
assert.ok(msgConnected.recipientUsers.includes('Player_Alice') && msgConnected.recipientUsers.includes('Player_Bob'));

// 4b. Test "Participants of all campaigns owned"
const msgAllOwned = partyManager.sendDirectUserMessage({
  recipientScope: 'ALL_OWNED',
  senderUser: 'GM_Valiant',
  text: 'Schedule announcement for all my campaigns.'
});
assert.equal(msgAllOwned.campaignId, gmCamp1.campaignId);
assert.ok(!msgAllOwned.recipientUsers.includes('GM_Valiant'));

// 4c. Test "Participants of [campaign 1]"
const msgSingleCamp = partyManager.sendDirectUserMessage({
  recipientScope: 'CAMP:PLY-101',
  senderUser: 'GM_Valiant',
  text: 'Hey fellow Titans players!'
});
assert.equal(msgSingleCamp.campaignId, 'PLY-101');
assert.ok(msgSingleCamp.recipientUsers.includes('OtherGM'), 'Should include OtherGM in PLY-101 participants');
assert.ok(!msgSingleCamp.recipientUsers.includes('GM_Valiant'), 'Should exclude sender GM_Valiant');

// 4d. Test Multi-Select Known Users Checkboxes (sending to multiple checked users at once)
assert.ok(indexHtml.includes('id="msg-known-users-checkbox-menu"'), 'index.html must include #msg-known-users-checkbox-menu for multi-select checkboxes');
assert.ok(appJs.includes('chk-known-user-recipient'), 'js/app.js must render and wire .chk-known-user-recipient checkboxes');

const multiMsgs = partyManager.sendDirectUserMessage({
  toUsers: ['Player_Alice', 'Player_Bob', 'Hero_Charlie'],
  senderUser: 'GM_Valiant',
  text: 'Direct group ping to Alice, Bob, and Charlie!'
});
assert.ok(Array.isArray(multiMsgs) && multiMsgs.length === 3, 'Selecting 3 users in Known Users checkboxes should dispatch 3 direct messages');

// Clean up session heartbeat
partyManager.endSession(gmCamp1.campaignId);

console.log('✓ 4. Scoped messaging (CURRENT_CONNECTED, ALL_OWNED, CAMP:<id>) and multi-user checkbox messaging verified.');
console.log('ALL v3.76 TESTS PASSED SUCCESSFULLY!');
