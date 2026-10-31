import assert from 'assert';
import fs from 'fs';
import { CampaignTrackerManager } from './js/party.js';

console.log('=== Testing v3.78 Features ===');

// 1. Version 3.78 Verification
const vJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(vJson.version, '3.78', 'version.json should be 3.78');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(indexHtml.includes('v3.78'), 'index.html should reference v3.78');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert.ok(appJs.includes('3.78'), 'app.js should reference 3.78');
console.log('✓ 1. Version 3.78 verified across version.json, index.html, app.js.');

// 2. CSS spinner arrow suppression verification
const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
assert.ok(stylesCss.includes('.input-pl-range-min::-webkit-inner-spin-button'), 'styles.css should suppress webkit spin button on min');
assert.ok(stylesCss.includes('.input-pl-range-max::-webkit-inner-spin-button'), 'styles.css should suppress webkit spin button on max');
assert.ok(stylesCss.includes('-moz-appearance: textfield;'), 'styles.css should set -moz-appearance: textfield');
console.log('✓ 2. CSS spin button removal verified for PL range fields.');

// 3. Instantiate CampaignTrackerManager and test HTML rendering
// Setup mock storage
const fakeStorage = {
  data: {},
  getItem(k) { return this.data[k] || null; },
  setItem(k, v) { this.data[k] = String(v); },
  removeItem(k) { delete this.data[k]; }
};

global.localStorage = fakeStorage;
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  appController: {
    char: { playerName: 'TestGM', powerLevel: 10, campaignId: 'TESTCAMP1' },
    storage: { getCharacters: () => [] }
  }
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

const mgr = new CampaignTrackerManager();
// Create a GM-owned campaign
mgr.createCampaign({
  name: 'Justice Defenders',
  campaignId: 'JUSTICE1',
  pin: '1234',
  creatorName: 'TestGM',
  powerLevel: 12,
  dontEnforcePL: false,
  isPublic: true,
  notes: 'Protecting the city from villainy.'
});

const html = mgr.generatePartyHTML();

// 4. Verify Arrow buttons removed from PL search range fields
assert.ok(!html.includes('btn-pl-min-minus'), 'Should not contain btn-pl-min-minus');
assert.ok(!html.includes('btn-pl-min-plus'), 'Should not contain btn-pl-min-plus');
assert.ok(!html.includes('btn-pl-max-minus'), 'Should not contain btn-pl-max-minus');
assert.ok(!html.includes('btn-pl-max-plus'), 'Should not contain btn-pl-max-plus');
assert.ok(html.includes('class="input-pl-range-min"'), 'Should contain input-pl-range-min');
assert.ok(html.includes('class="input-pl-range-max"'), 'Should contain input-pl-range-max');
console.log('✓ 3. Arrow buttons removed from PL range search fields.');

// 5. Verify Public and Join Requests buttons placed to right of Link Copy button
const copyLinkIdx = html.indexOf('btn-copy-campaign-link');
const publicBtnIdx = html.indexOf('btn-gm-toggle-public');
const joinReqBtnIdx = html.indexOf('btn-open-join-requests');

assert.ok(copyLinkIdx !== -1, 'Copy link button must exist');
assert.ok(publicBtnIdx !== -1, 'Public button must exist');
assert.ok(joinReqBtnIdx !== -1, 'Join requests button must exist');

assert.ok(publicBtnIdx > copyLinkIdx, 'Public button must be to the right (after) copy link button in DOM');
assert.ok(joinReqBtnIdx > publicBtnIdx, 'Join requests button must follow public button');
console.log('✓ 4. "Public" and "Join requests" buttons placed to right of link copy button.');

// 6. Verify PL setting & enforcement checkbox compacted onto right end of second row (alongside Campaign Notes)
const notesIdx = html.indexOf('textarea-campaign-notes');
const dontEnforceIdx = html.indexOf('chk-campaign-dont-enforce-pl');
const targetPlIdx = html.indexOf('sel-campaign-target-pl');

assert.ok(notesIdx !== -1, 'Notes textarea must exist');
assert.ok(dontEnforceIdx !== -1, 'chk-campaign-dont-enforce-pl must exist');
assert.ok(targetPlIdx !== -1, 'sel-campaign-target-pl must exist');

assert.ok(dontEnforceIdx > notesIdx, 'Compacted PL enforcement checkbox must be at the right end of second row (after notes textarea)');
assert.ok(targetPlIdx > dontEnforceIdx, 'Target PL dropdown must be adjacent to PL enforcement checkbox');
console.log('✓ 5. PL setting & enforcement checkbox compacted to right end of second row alongside Campaign Notes.');

// 7. Verify Hiatus/Resume button is at the start of the bottom campaign row (to left of transfer)
const hiatusBtnIdx = html.indexOf('btn-gm-toggle-hiatus');
const transferBtnIdx = html.indexOf('btn-gm-transfer-ownership');
const deleteBtnIdx = html.indexOf('btn-gm-delete-campaign');

assert.ok(hiatusBtnIdx !== -1, 'Hiatus/resume button must exist');
assert.ok(transferBtnIdx !== -1, 'Transfer ownership button must exist');
assert.ok(deleteBtnIdx !== -1, 'Delete campaign button must exist');

assert.ok(hiatusBtnIdx > targetPlIdx, 'Hiatus button must be in bottom row (after row 2 PL dropdown)');
assert.ok(hiatusBtnIdx < transferBtnIdx, 'Hiatus/resume button must be at the start of the bottom row, to the left of "transfer"');
assert.ok(transferBtnIdx < deleteBtnIdx, 'Delete button must follow transfer button');
console.log('✓ 6. Hiatus/Resume button placed at start of bottom campaign row to the left of "transfer".');

console.log('=== All v3.78 tests passed successfully! ===');
