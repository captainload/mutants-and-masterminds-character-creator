import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { pathToFileURL } from 'url';

const baseDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

console.log('--- Running v3.85 Feature Verification Tests ---');

// 1. Version checks
const vJson = JSON.parse(fs.readFileSync(path.join(baseDir, 'version.json'), 'utf8'));
assert.strictEqual(vJson.version, '3.85', 'version.json must be 3.85');
console.log('✓ version.json is v3.85');

const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
assert(indexHtml.includes('Mutants & Masterminds 3E - Character Editor v3.85'), 'index.html title has v3.85');
assert(indexHtml.includes('<span id="header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.85</span>'), 'index.html header version tag is v3.85');
assert(indexHtml.includes('css/styles.css?v=3.85'), 'index.html styles.css link has ?v=3.85');
assert(indexHtml.includes('js/app.js?v=3.85'), 'index.html app.js script has ?v=3.85');
console.log('✓ index.html versions are v3.85');

const appJs = fs.readFileSync(path.join(baseDir, 'js/app.js'), 'utf8').replace(/\r\n/g, '\n');
assert(appJs.includes("const CURRENT_VERSION = '3.85';"), 'app.js CURRENT_VERSION is 3.85');
console.log('✓ js/app.js version is v3.85');

const tablesJs = fs.readFileSync(path.join(baseDir, 'js/tables.js'), 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.85'), 'tables.js styles link is v3.85');
console.log('✓ js/tables.js stylesheet link is v3.85');

const archJs = fs.readFileSync(path.join(baseDir, 'js/archetype_window.js'), 'utf8');
assert(archJs.includes('css/styles.css?v=3.85'), 'archetype_window.js styles link is v3.85');
console.log('✓ js/archetype_window.js stylesheet link is v3.85');

const partyJs = fs.readFileSync(path.join(baseDir, 'js/party.js'), 'utf8').replace(/\r\n/g, '\n');
assert(partyJs.includes('css/styles.css?v=3.85'), 'party.js styles link is v3.85');
console.log('✓ js/party.js stylesheet link is v3.85');

// 2. Action Center whitespace reduction check
const stylesCss = fs.readFileSync(path.join(baseDir, 'css/styles.css'), 'utf8').replace(/\r\n/g, '\n');
assert(stylesCss.includes('.action-center-grid {\n  display: grid;\n  grid-template-columns: 1fr 320px;\n  gap: 0.45rem;\n}'), 'action-center-grid gap tightened to 0.45rem');
assert(stylesCss.includes('.action-main-col {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}'), 'action-main-col gap tightened to 0.4rem');
assert(stylesCss.includes('.action-side-col {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}'), 'action-side-col gap tightened to 0.4rem');
assert(indexHtml.includes('class="dice-roller-bar" style="margin-bottom: 0.4rem;'), 'dice-roller-bar margin tightened to 0.4rem');
assert(!indexHtml.includes('<!-- Main Abilities in Action Center -->\n            <div class="card-box" style="margin-bottom: 0.5rem;'), 'redundant margin-bottom on Abilities card removed');
assert(!indexHtml.includes('<!-- Core Combat Defenses & Resistance Checks -->\n            <div class="card-box" style="margin-bottom: 0.5rem;'), 'redundant margin-bottom on Defenses card removed');
console.log('✓ Action Center vertical whitespace successfully reduced across grid, columns, and cards');

// 3. Functional tests: Unauthenticated visitor must NOT be member or GM of campaigns
const { CampaignTrackerManager } = await import(pathToFileURL(path.join(baseDir, 'js/party.js')).href);
const partyMgr = new CampaignTrackerManager();

// Mock global supabaseService as NOT logged in
globalThis.supabaseService = {
  isLoggedIn: () => false,
  getUsername: () => '',
  getUser: () => null
};

// Test getCurrentUsername returns '' when not logged in
assert.strictEqual(partyMgr.getCurrentUsername(), '', 'getCurrentUsername must return empty string when not logged in');

// Test isUserMemberOfCampaign returns false when not logged in
assert.strictEqual(partyMgr.isUserMemberOfCampaign('CAMP1', 'Test Campaign'), false, 'isUserMemberOfCampaign must return false when not logged in');

// Test isUserCreatorOfCampaign returns false when not logged in
assert.strictEqual(partyMgr.isUserCreatorOfCampaign({ campaignId: 'CAMP1', creatorName: 'AnyGM' }), false, 'isUserCreatorOfCampaign must return false when not logged in');

// Test getBrowsableCampaigns hides private non-public campaigns from unauthenticated visitors
partyMgr.saveCampaignState({
  campaignId: '',
  campaignName: '',
  isConnected: false
});

// Seed mock registry with 1 private campaign and 1 public campaign
partyMgr._sharedFallback['mm3e_campaign_registry'] = JSON.stringify({
  PRIVATE1: { campaignId: 'PRIVATE1', campaignName: 'Top Secret Campaign', isPublic: false, creatorName: 'SecretGM' },
  PUBLIC1: { campaignId: 'PUBLIC1', campaignName: 'Public Adventurers', isPublic: true, creatorName: 'OpenGM' }
});
partyMgr._memoryFallback['mm3e_campaigns_history'] = JSON.stringify([
  { campaignId: 'PRIVATE1', campaignName: 'Top Secret Campaign', isPublic: false, creatorName: 'SecretGM' },
  { campaignId: 'PUBLIC1', campaignName: 'Public Adventurers', isPublic: true, creatorName: 'OpenGM' }
]);

const browsable = partyMgr.getBrowsableCampaigns();
const hasPrivate = browsable.some(c => c.campaignId === 'PRIVATE1');
const hasPublic = browsable.some(c => c.campaignId === 'PUBLIC1');

assert.strictEqual(hasPrivate, false, 'Unauthenticated users must NOT see private non-public campaigns');
assert.strictEqual(hasPublic, true, 'Unauthenticated users CAN see public campaigns');
const publicCard = browsable.find(c => c.campaignId === 'PUBLIC1');
assert.strictEqual(publicCard.isJoinedOrCreated, false, 'Unauthenticated user must NOT be flagged as joined or created on public campaigns');
console.log('✓ Unauthenticated visitor rules verified: cannot see private campaigns and cannot be falsely flagged as member/GM');

// 4. openJoinCampaignDialog requires sign in when not logged in
assert(appJs.includes('You must sign in or register an account to apply to or join a campaign.'), 'openJoinCampaignDialog requires sign in when unauthenticated');
console.log('✓ Joining campaigns strictly requires sign-in');

// 5. Font size checks (>= 10pt across all elements)
const ptMatches = indexHtml.match(/font-size:\s*([0-9.]+)pt/g) || [];
ptMatches.forEach(m => {
  const num = parseFloat(m.replace(/font-size:\s*/, '').replace('pt', ''));
  assert(num >= 10, `Font size must be >= 10pt, found: ${m}`);
});
console.log(`✓ All explicit pt font-sizes (${ptMatches.length} occurrences) in index.html are >= 10pt`);

console.log('\n--- ALL v3.85 VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
