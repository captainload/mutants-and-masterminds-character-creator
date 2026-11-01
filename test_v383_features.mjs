import fs from 'fs';
import path from 'path';
import assert from 'assert';

const baseDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

console.log('--- Running v3.83 Feature Verification Tests ---');

// 1. Version checks
const vJson = JSON.parse(fs.readFileSync(path.join(baseDir, 'version.json'), 'utf8'));
assert.strictEqual(vJson.version, '3.83', 'version.json must be 3.83');
console.log('✓ version.json is v3.83');

const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
assert(indexHtml.includes('Mutants & Masterminds 3E - Character Editor v3.83'), 'index.html title has v3.83');
assert(indexHtml.includes('<span id="header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.83</span>'), 'index.html header version tag is v3.83');
assert(indexHtml.includes('css/styles.css?v=3.83'), 'index.html styles.css link has ?v=3.83');
assert(indexHtml.includes('js/app.js?v=3.83'), 'index.html app.js script has ?v=3.83');
console.log('✓ index.html versions are v3.83');

const appJs = fs.readFileSync(path.join(baseDir, 'js/app.js'), 'utf8').replace(/\r\n/g, '\n');
assert(appJs.includes("const CURRENT_VERSION = '3.83';"), 'app.js CURRENT_VERSION is 3.83');
console.log('✓ js/app.js version is v3.83');

const tablesJs = fs.readFileSync(path.join(baseDir, 'js/tables.js'), 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.83'), 'tables.js styles link is v3.83');
console.log('✓ js/tables.js stylesheet link is v3.83');

const archJs = fs.readFileSync(path.join(baseDir, 'js/archetype_window.js'), 'utf8');
assert(archJs.includes('css/styles.css?v=3.83'), 'archetype_window.js styles link is v3.83');
console.log('✓ js/archetype_window.js stylesheet link is v3.83');

const partyJs = fs.readFileSync(path.join(baseDir, 'js/party.js'), 'utf8').replace(/\r\n/g, '\n');
assert(partyJs.includes('css/styles.css?v=3.83'), 'party.js styles link is v3.83');
console.log('✓ js/party.js stylesheet link is v3.83');

// 2. Campaigns button color and position
assert(indexHtml.includes('id="btn-open-campaigns"'), 'btn-open-campaigns exists');
assert(indexHtml.includes('color: var(--hero-blue); border-color: var(--hero-blue);'), 'btn-open-campaigns colored with hero-blue matching top row buttons');
assert(!indexHtml.includes('id="btn-open-campaigns" style="padding: 0.35rem 1.1rem; min-height: 38px; font-size: 10pt; font-weight: 800; white-space: nowrap; color: var(--hero-green)'), 'btn-open-campaigns no longer green');

const stylesCss = fs.readFileSync(path.join(baseDir, 'css/styles.css'), 'utf8').replace(/\r\n/g, '\n');
assert(stylesCss.includes('.header-row-2 #btn-open-campaigns {\n  margin-left: 0;\n  margin-right: 0;\n  color: var(--hero-blue);\n  border-color: var(--hero-blue);'), 'styles.css styles btn-open-campaigns with hero-blue');
assert(appJs.includes('alignCampaignButton()'), 'app.js includes alignCampaignButton()');
assert(appJs.includes('const targetLeft = boxRect.left - row2Rect.left;'), 'alignCampaignButton calculates box offset');
assert(appJs.includes('campBtn.style.marginLeft = `${marginNeeded}px`;'), 'alignCampaignButton sets margin to fit right under campaign label');
console.log('✓ Campaigns button colored with hero-blue and dynamically aligned under Campaign label');

// 3. Campaign field turned into dropdown
assert(indexHtml.includes('<select id="header-campaign-select" class="header-field-input header-field-select"'), 'index.html has header-campaign-select dropdown');
assert(indexHtml.includes('<input type="hidden" id="header-campaign-name" value="">'), 'index.html has header-campaign-name hidden input');
assert(stylesCss.includes('select.header-field-select'), 'styles.css defines styles for select.header-field-select');
assert(stylesCss.includes('html[data-theme="light"] select.header-field-select'), 'styles.css defines light mode styles for select.header-field-select');
assert(appJs.includes('updateCampaignDropdown()'), 'app.js includes updateCampaignDropdown()');
assert(appJs.includes("optGroup.label = 'Active Campaign Sessions';"), 'updateCampaignDropdown groups active sessions');
assert(appJs.includes('await this.joinGameSession(val);'), 'app.js connects to session when dropdown selection changes');
console.log('✓ Campaign field successfully converted to active session dropdown');

// 4. Joined campaign behavior in campaign browser
assert(partyJs.includes('const isJoinedOrCreated = !!(c.isCreator || c.isJoinedOrCreated || this.isUserMemberOfCampaign(c.campaignId, c.campaignName));'), 'party.js accurately resolves isJoinedOrCreated');
assert(partyJs.includes('isLive && isJoinedOrCreated') && partyJs.includes('btn-join-game-session'), 'Shows Join Session button if session is running');
assert(partyJs.includes('!isJoinedOrCreated') && partyJs.includes('btn-browser-apply-campaign'), 'Only shows Apply to Join if user has NOT joined');
console.log('✓ Joined campaigns strictly show Join Session button only when session is active (no Join Campaign button)');

// 5. Limit GMs to running one campaign session at one time
assert(partyJs.includes('// Limit GMs to running one campaign session at one time (v3.83)'), 'party.js startSession enforces GM session limit');
assert(partyJs.includes('GMs are limited to running one campaign session at a time.'), 'party.js throws informative error on multiple GM sessions');

// Functional test of partyManager GM session limit
import { pathToFileURL } from 'url';
const { CampaignTrackerManager } = await import(pathToFileURL(path.join(baseDir, 'js/party.js')).href);
const partyMgr = new CampaignTrackerManager();

// Create mock GM campaign A
partyMgr.saveCampaignState({
  isConnected: true,
  campaignId: 'ALPHA1',
  campaignName: 'Campaign Alpha',
  isHost: true,
  isCreator: true,
  creatorName: 'MockGM'
});

// Emulate active session for ALPHA1
const activeSessions = {
  ALPHA1: {
    campaignId: 'ALPHA1',
    campaignName: 'Campaign Alpha',
    creatorName: 'MockGM',
    isHost: true,
    lastHeartbeat: Date.now()
  }
};
partyMgr._sharedFallback['mm3e_active_sessions'] = JSON.stringify(activeSessions);

// Mock creator check
partyMgr.isUserCreatorOfCampaign = function(c) {
  return true; // Simulate GM is creator of both
};

// Attempt to start second session BETA2 while ALPHA1 is running
let caughtError = null;
try {
  partyMgr.startSession('BETA2');
} catch (e) {
  caughtError = e;
}
assert(caughtError !== null, 'startSession must throw an error when GM already has an active session');
assert(caughtError.message.includes('one campaign session at a time'), `Error message must explain GM session limit, got: ${caughtError.message}`);
console.log('✓ Functional test confirmed: GM cannot start a second session while one is active');

// 6. Font size checks (>= 10pt across all elements)
const ptMatches = indexHtml.match(/font-size:\s*([0-9.]+)pt/g) || [];
ptMatches.forEach(m => {
  const num = parseFloat(m.replace(/font-size:\s*/, '').replace('pt', ''));
  assert(num >= 10, `Font size must be >= 10pt, found: ${m}`);
});
console.log(`✓ All explicit pt font-sizes (${ptMatches.length} occurrences) in index.html are >= 10pt`);

console.log('\n--- ALL v3.83 VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
