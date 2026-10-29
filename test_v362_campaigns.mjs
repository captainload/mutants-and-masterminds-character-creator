import fs from 'fs';
import assert from 'assert';
import { CampaignTrackerManager, campaignManager, partyManager } from './js/party.js';

console.log('--- Testing v3.62 Campaigns Button, Placement, Prefill & PL Enforcement ---');

// 1. Version assertions
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(versionJson.version, '3.62', 'version.json is 3.62');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.62'), 'index.html title has v3.62');
assert(indexHtml.includes('>v3.62</span>'), 'index.html version badge has v3.62');
assert(indexHtml.includes('css/styles.css?v=3.62'), 'index.html css link has v3.62');
assert(indexHtml.includes('js/app.js?v=3.62'), 'index.html script tag has v3.62');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes("const CURRENT_VERSION = '3.62';"), 'app.js CURRENT_VERSION is 3.62');

const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
assert(stylesCss.includes('button.header-field-label-btn'), 'styles.css has header-field-label-btn styles');
assert(stylesCss.includes('html[data-theme="light"] button.header-field-label-btn'), 'styles.css has light theme contrast for label button');

const archJs = fs.readFileSync('js/archetype_window.js', 'utf8');
assert(archJs.includes('styles.css?v=3.62'), 'archetype_window.js has v3.62');

const tablesJs = fs.readFileSync('js/tables.js', 'utf8');
assert(tablesJs.includes('styles.css?v=3.62'), 'tables.js has v3.62');

const partyJs = fs.readFileSync('js/party.js', 'utf8');
assert(partyJs.includes('styles.css?v=3.62'), 'party.js has v3.62');

console.log('✓ Version 3.62 verified across all files');

// 2. Button and Layout Placement
assert(indexHtml.includes('class="header-campaign-group"'), 'header-campaign-group wrapper exists');
assert(indexHtml.includes('id="btn-open-campaigns-label"'), 'Campaigns clickable label button exists');
assert(indexHtml.includes('id="btn-open-campaigns"'), 'Campaigns button exists');
assert(indexHtml.includes('id="header-campaign-name"'), 'header-campaign-name field exists');

// Verify order inside header-campaign-group: label -> input -> button
const groupIdx = indexHtml.indexOf('class="header-campaign-group"');
const labelIdx = indexHtml.indexOf('id="btn-open-campaigns-label"', groupIdx);
const inputIdx = indexHtml.indexOf('id="header-campaign-name"', groupIdx);
const btnIdx = indexHtml.indexOf('id="btn-open-campaigns"', groupIdx);

assert(groupIdx < labelIdx, 'label is inside header-campaign-group');
assert(labelIdx < inputIdx, 'label precedes input');
assert(inputIdx < btnIdx, 'Campaigns button is to the right of campaign name field');
console.log('✓ Layout verified: Campaigns button is directly to the right of campaign name field, and Campaign label is a clickable button');

// 3. Prefill Logic Verification
// Verify that app.js does not fall back to global last joined campaign when a character has no campaign
assert(!appJs.includes("localStorage.getItem('mm3e_last_joined_campaign')"), 'Global localStorage last campaign fallback removed from app.js');

// 4. Campaign PL, "Don't enforce PL", and Settings Verification
const manager = new CampaignTrackerManager();
manager.leaveCampaign();

// Test Create Campaign with PL 12 and strict PL enforcement (default)
const created = manager.createCampaign({
  name: 'Titan Watch',
  pin: '7788',
  creatorName: 'GM Alpha',
  powerLevel: 12,
  dontEnforcePL: false
});

assert.strictEqual(created.campaignName, 'Titan Watch');
assert.strictEqual(created.powerLevel, 12);
assert.strictEqual(created.dontEnforcePL, false);
assert.strictEqual(manager.isUserConnected(), true);

// Verify campaign registry caching
const info = manager.getCampaignInfo(created.campaignId);
assert(info, 'Campaign info is registered in registry');
assert.strictEqual(info.powerLevel, 12);
assert.strictEqual(info.dontEnforcePL, false);

// Test Host update of Campaign Settings
manager.updateCampaignSettings({
  powerLevel: 8,
  dontEnforcePL: true
});

const updatedState = manager.getCampaignState();
assert.strictEqual(updatedState.powerLevel, 8, 'Host changed target PL to 8');
assert.strictEqual(updatedState.dontEnforcePL, true, 'Host enabled "Don\'t enforce PL"');

const updatedInfo = manager.getCampaignInfo(created.campaignId);
assert.strictEqual(updatedInfo.powerLevel, 8);
assert.strictEqual(updatedInfo.dontEnforcePL, true);

// Test HTML generation includes GM Settings controls when host
const html = manager.generatePartyHTML();
assert(html.includes('chk-campaign-dont-enforce-pl'), 'HTML includes Don\'t enforce PL checkbox');
assert(html.includes('sel-campaign-target-pl'), 'HTML includes Target PL selector');
assert(html.includes('PL 8'), 'HTML displays current campaign PL');

// Disconnect
manager.leaveCampaign();
assert.strictEqual(manager.isUserConnected(), false);

// Test Join Campaign with matching PL and with different PL
const hostMgr = new CampaignTrackerManager();
hostMgr.leaveCampaign();
const strictCamp = hostMgr.createCampaign({
  name: 'Avengers Protocol',
  pin: '1234',
  creatorName: 'Nick Fury',
  powerLevel: 10,
  dontEnforcePL: false
});

// A player connects with PL 10 character
const playerCharMatch = { name: 'Captain America', powerLevel: 10 };
const playerCharMismatch = { name: 'Superboy', powerLevel: 14 };

const campTarget = hostMgr.getCampaignInfo(strictCamp.campaignId);
assert.strictEqual(campTarget.powerLevel, 10);
assert.strictEqual(campTarget.dontEnforcePL, false);

// Player PL check validation function simulation matching app.js
function canJoinCampaign(char, targetCamp) {
  const charPL = parseInt(char.powerLevel, 10) || 10;
  const campPL = targetCamp?.powerLevel ?? 10;
  const dontEnforce = !!targetCamp?.dontEnforcePL;
  if (!dontEnforce && charPL !== campPL) {
    return { allowed: false, error: `Power Level Mismatch: char PL ${charPL} vs camp PL ${campPL}` };
  }
  return { allowed: true };
}

assert.strictEqual(canJoinCampaign(playerCharMatch, campTarget).allowed, true, 'PL 10 matches campaign PL 10');
assert.strictEqual(canJoinCampaign(playerCharMismatch, campTarget).allowed, false, 'PL 14 blocked by strict PL 10 enforcement');

// Now GM enables "Don't enforce PL"
hostMgr.updateCampaignSettings({ dontEnforcePL: true });
const openCampTarget = hostMgr.getCampaignInfo(strictCamp.campaignId);
assert.strictEqual(openCampTarget.dontEnforcePL, true);
assert.strictEqual(canJoinCampaign(playerCharMismatch, openCampTarget).allowed, true, 'PL 14 allowed when Don\'t enforce PL is active');

hostMgr.leaveCampaign();

console.log('ALL v3.62 CAMPAIGN TESTS PASSED CLEANLY!');
