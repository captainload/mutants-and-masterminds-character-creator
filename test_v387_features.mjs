import assert from 'assert';
import fs from 'fs';
import { partyManager } from './js/party.js';
import { supabaseService } from './js/supabase_client.js';

console.log('--- Running v3.87 Feature Tests ---');

// Test 1: Version bump verification across all required files
console.log('Verifying version bumps to 3.87...');
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(versionJson.version, '3.87', 'version.json must be 3.87');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(indexHtml.includes('Character Editor v3.87'), 'index.html title must reflect v3.87');
assert.ok(indexHtml.includes('css/styles.css?v=3.87'), 'index.html css link must be v3.87');
assert.ok(indexHtml.includes('id="header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.87<'), 'index.html header version tag must be v3.87');
assert.ok(indexHtml.includes('src="js/app.js?v=3.87"'), 'index.html app.js script must be v3.87');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert.ok(appJs.includes("const CURRENT_VERSION = '3.87';"), 'app.js CURRENT_VERSION must be 3.87');
assert.ok(appJs.includes("power_profiles.js?v=3.87"), 'app.js power_profiles import must be v3.87');

const partyJs = fs.readFileSync('js/party.js', 'utf8');
assert.ok(partyJs.includes('css/styles.css?v=3.87'), 'party.js popout link must be v3.87');

const tablesJs = fs.readFileSync('js/tables.js', 'utf8');
assert.ok(tablesJs.includes('css/styles.css?v=3.87'), 'tables.js popout link must be v3.87');

const archetypeJs = fs.readFileSync('js/archetype_window.js', 'utf8');
assert.ok(archetypeJs.includes('css/styles.css?v=3.87'), 'archetype_window.js link must be v3.87');
console.log('✓ Test 1 Passed: All versions successfully bumped to 3.87');

// Test 2: Separation of Game Session Tracker and Campaign Browser
console.log('Verifying separation of Game Session Tracker and Campaign Browser...');
assert.ok(indexHtml.includes('id="modal-campaign-tracker"'), 'index.html must have modal-campaign-tracker');
assert.ok(indexHtml.includes('🌐 Campaign Browser & Directory'), 'modal-campaign-tracker title must be Campaign Browser & Directory');
assert.ok(indexHtml.includes('id="modal-game-session"'), 'index.html must have modal-game-session');
assert.ok(indexHtml.includes('id="game-session-modal-title"'), 'modal-game-session must have title element');
assert.ok(indexHtml.includes('id="session-party-tracker-container"'), 'modal-game-session must have top-half party tracker container');
assert.ok(indexHtml.includes('id="session-output-history-container"'), 'modal-game-session must have bottom-half output container');
assert.ok(indexHtml.includes('id="btn-session-tab-rolls"'), 'modal-game-session must have Rolls tab button');
assert.ok(indexHtml.includes('id="btn-session-tab-general"'), 'modal-game-session must have General tab button');
assert.ok(indexHtml.includes('id="session-pane-rolls"'), 'modal-game-session must have session-pane-rolls');
assert.ok(indexHtml.includes('id="session-pane-general"'), 'modal-game-session must have session-pane-general');
assert.ok(indexHtml.includes('id="btn-session-popout"'), 'modal-game-session must have popout button');

// Verify generator methods on partyManager
const browserHtml = partyManager.generateCampaignBrowserHTML();
assert.ok(browserHtml.includes('campaign-browser-card') || browserHtml.includes('tracker-section-campaign-browser'), 'generateCampaignBrowserHTML must output browser markup');
assert.ok(browserHtml.includes('input-join-campaign-link'), 'generateCampaignBrowserHTML must include join campaign link input');
assert.ok(browserHtml.includes('btn-trigger-create-campaign'), 'generateCampaignBrowserHTML must include create campaign button');

const sessionHtml = partyManager.generateSessionTrackerHTML();
assert.ok(sessionHtml.includes('tracker-section-session-monitor'), 'generateSessionTrackerHTML must output session monitor');
assert.ok(typeof partyManager.openSessionPopout === 'function', 'partyManager must have openSessionPopout function');
console.log('✓ Test 2 Passed: Separation of Game Session Tracker and Campaign Browser verified');

// Test 3: Running sessions count badge
console.log('Verifying running sessions count badge...');
assert.ok(indexHtml.includes('id="btn-header-active-sessions"'), 'index.html must include btn-header-active-sessions');
assert.ok(indexHtml.includes('id="header-sessions-count-badge"'), 'index.html must include header-sessions-count-badge');
assert.strictEqual(typeof partyManager.getEligibleRunningSessionsCount, 'function', 'partyManager must have getEligibleRunningSessionsCount method');

// Setup mock campaigns and test eligible running sessions count
supabaseService.currentUser = { id: 'u_gm1', email: 'gm@test.com', user_metadata: { username: 'GMUser' } };
partyManager.getCurrentUsername = () => 'GMUser';
partyManager.saveToCampaignHistory({
  campaignId: 'TEST-SESSION-1',
  campaignName: 'Test Active Campaign',
  creatorName: 'GMUser',
  powerLevel: 10,
  isCreator: true,
  isOnHiatus: false
});
partyManager.registerCampaignInfo({
  campaignId: 'TEST-SESSION-1',
  campaignName: 'Test Active Campaign',
  creatorName: 'GMUser',
  powerLevel: 10,
  isCreator: true,
  isOnHiatus: false
});
partyManager.startSession('TEST-SESSION-1');
assert.strictEqual(partyManager.isSessionActive('TEST-SESSION-1'), true, 'Session should be active');

const eligibleCount = partyManager.getEligibleRunningSessionsCount();
assert.ok(eligibleCount >= 1, `Eligible running sessions count must be >= 1 (got ${eligibleCount})`);
partyManager.endSession('TEST-SESSION-1');
console.log('✓ Test 3 Passed: Running sessions count badge and calculation verified');

// Test 4: Light mode read messages background is white
console.log('Verifying light mode read messages style...');
const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
assert.ok(
  stylesCss.includes('html[data-theme="light"] .campaign-message-card.msg-read') &&
  stylesCss.includes('background: #ffffff !important;'),
  'Light mode read message cards must have background: #ffffff !important'
);
assert.ok(
  stylesCss.includes('html[data-theme="light"] .campaign-message-card.msg-unread') &&
  stylesCss.includes('background: #f0f7ff !important;'),
  'Light mode unread message cards must contrast with #f0f7ff'
);
console.log('✓ Test 4 Passed: Light mode read message card background is pure white');

// Test 5: Message client button cleanup
console.log('Verifying message client button cleanup...');
assert.ok(!indexHtml.includes('id="btn-msg-toolbar-cc"'), 'Message client toolbar must not have btn-msg-toolbar-cc');
assert.ok(!indexHtml.includes('id="btn-close-campaign-messages-footer"'), 'Message client must not have btn-close-campaign-messages-footer');
console.log('✓ Test 5 Passed: CC toolbar button and bottom close button successfully removed');

// Test 6: Compose popup width within 20px of side margins
console.log('Verifying compose popup width within 20px of side margins...');
assert.ok(
  stylesCss.includes('.msg-client-compose-dialog') &&
  stylesCss.includes('width: calc(100vw - 40px);') &&
  stylesCss.includes('max-width: calc(100vw - 40px);') &&
  stylesCss.includes('margin: 0 20px;'),
  '.msg-client-compose-dialog must be styled with width: calc(100vw - 40px) and margin: 0 20px'
);
console.log('✓ Test 6 Passed: Compose dialog width correctly sized within 20px of margins');

// Test 7: Session rolls and general events logging
console.log('Verifying session rolls and general events...');
partyManager.clearSessionRolls();
partyManager.addSessionRoll({
  characterName: 'Aegis',
  title: 'Toughness Resistance',
  total: 22,
  rawDie: 14,
  modifier: 8,
  targetDC: 20,
  outcome: 'Success',
  outcomeClass: 'success',
  outcomeDescription: '1° Success'
});

const rolls = partyManager.getSessionRolls();
assert.strictEqual(rolls.length, 1, 'Should have 1 recorded roll');
assert.strictEqual(rolls[0].characterName, 'Aegis');
assert.strictEqual(rolls[0].total, 22);

partyManager.addSessionEvent({
  type: 'broadcast',
  icon: '📢',
  text: 'GM: Roll initiative everyone!'
});

const events = partyManager.getSessionEvents();
assert.ok(events.length >= 1, 'Should have recorded session events');
assert.ok(events[0].text.includes('Roll initiative'), 'Event text should match');
console.log('✓ Test 7 Passed: Session rolls and general events work properly');

console.log('=== All v3.87 Feature Tests Passed Cleanly! ===');
