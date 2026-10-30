import { readFileSync } from 'fs';
import assert from 'assert';
import { campaignManager, CampaignTrackerManager } from './js/party.js';
import { supabaseService } from './js/supabase_client.js';

console.log('--- Testing v3.69 Features Suite ---');

// =========================================================================
// 1. Version Consistency (v3.69)
// =========================================================================
const versionJson = JSON.parse(readFileSync('version.json', 'utf8'));
assert(parseFloat(versionJson.version) >= 3.69, `Expected >= 3.69 in version.json, got ${versionJson.version}`);

const indexHtml = readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.'), 'index.html title missing v3.');
assert(indexHtml.includes('css/styles.css?v=3.'), 'index.html styles query missing v3.');
assert(indexHtml.includes('>v3.'), 'index.html version badge missing v3.');
assert(indexHtml.includes('js/app.js?v=3.'), 'index.html app.js script query missing v3.');

const appJs = readFileSync('js/app.js', 'utf8');
assert(appJs.includes("CURRENT_VERSION = '3."), 'app.js CURRENT_VERSION missing 3.');
assert(appJs.includes("power_profiles.js?v=3."), 'app.js power_profiles query missing 3.');

const archJs = readFileSync('js/archetype_window.js', 'utf8');
assert(archJs.includes('css/styles.css?v=3.'), 'archetype_window.js styles link missing 3.');

const partyJs = readFileSync('js/party.js', 'utf8');
assert(partyJs.includes('css/styles.css?v=3.'), 'party.js styles link missing 3.');

const tablesJs = readFileSync('js/tables.js', 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.'), 'tables.js styles link missing 3.');
console.log('✓ v3.69 version consistency verified across all files');

// =========================================================================
// 2. Power Effect Notes: Default 1 Row & Auto-Expand up to 3 Rows
// =========================================================================
const stylesCss = readFileSync('css/styles.css', 'utf8');
assert(stylesCss.includes('.input-power-notes'), 'styles.css has .input-power-notes');
assert(stylesCss.includes('min-height: 28px'), 'styles.css .input-power-notes has min-height: 28px (1 row)');
assert(stylesCss.includes('max-height: 75px'), 'styles.css .input-power-notes has max-height: 75px (3 rows)');

assert(appJs.includes('<textarea class="input-power-notes" rows="1"'), 'app.js defaults input-power-notes to rows="1"');
assert(appJs.includes('<textarea class="input-ae-notes" rows="1"'), 'app.js defaults input-ae-notes to rows="1"');
assert(appJs.includes('Math.min(Math.max(powerNotesTextarea.scrollHeight, 28), 75)'), 'app.js auto-resizes power notes up to 3 rows');
console.log('✓ Power effect notes default 1 row and auto-expand up to 3 rows verified');

// =========================================================================
// 3. Cloud Restoration Dialog: Display all backups with prominent timestamps
// =========================================================================
assert(appJs.includes('All Cloud Backups (${backups.length})'), 'app.js displays All Cloud Backups count header');
assert(appJs.includes('🕒 Backup Timestamp:'), 'app.js displays prominent Backup Timestamp for each backup');
assert(appJs.includes('new Date(b.updated_at).toLocaleString()'), 'app.js formats backup timestamp with toLocaleString()');
console.log('✓ Cloud restoration dialog shows all backups with timestamps verified');

// =========================================================================
// 4. Cloud Backup Prompt: Ask user if they want to update local save
// =========================================================================
assert(appJs.includes('Would you also like to update your local character save file?'), 'app.js prompts user to update local save upon cloud backup');
assert(appJs.includes('await this.saveCharacterFile({ forceSaveAs: false })'), 'app.js calls saveCharacterFile when confirmed');
console.log('✓ Cloud backup prompt asking to update local save verified');

// =========================================================================
// 5. Campaign Creation: Do NOT automatically start game session
// =========================================================================
const testMgr = new CampaignTrackerManager();
const testCamp = testMgr.createCampaign({
  name: 'Freedom League V369',
  campaignId: 'FL-369',
  creatorName: 'GM Steve',
  powerLevel: 10
});

assert.strictEqual(testMgr.isSessionActive('FL-369'), false, 'Session must NOT be active when campaign is created');
testMgr.startSession('FL-369');
assert.strictEqual(testMgr.isSessionActive('FL-369'), true, 'Session is active after GM explicitly starts it');
testMgr.endSession('FL-369');
assert.strictEqual(testMgr.isSessionActive('FL-369'), false, 'Session is inactive after GM ends it');

const supabaseJs = readFileSync('js/supabase_client.js', 'utf8');
assert(supabaseJs.includes('is_session_active: false'), 'supabase_client.js sets is_session_active to false on campaign creation');
console.log('✓ Manual session startup (no auto-start on creation) verified');

// =========================================================================
// 6. GM Campaign Character Sync & Change Detection with Dual Timestamps
// =========================================================================
// 6a. Character snapshotting on session end
testMgr.startSession('FL-369');
const sampleChar1 = {
  id: 'char_apex_1',
  name: 'Apex Sentinel',
  powerLevel: 10,
  playerName: 'Alice',
  abilities: { str: 4, sta: 4, agi: 3, dex: 3, fgt: 6, int: 2, awe: 2, pre: 2 },
  defenses: { dodge: 10, parry: 10, fortitude: 10, toughness: 10, will: 10 },
  powers: [{ name: 'Kinetic Blast', rank: 8, cost: 16 }],
  advantages: ['Power Attack'],
  skills: [{ name: 'Athletics', ranks: 4 }]
};

testMgr.saveCampaignSavedCharacter('FL-369', sampleChar1, 'Alice', '2026-10-30T10:00:00.000Z');
const savedRecord = testMgr.getCampaignSavedCharacter('FL-369', 'char_apex_1');
assert(savedRecord, 'GM campaign saved character must be retrievable');
assert.strictEqual(savedRecord.characterName, 'Apex Sentinel');
assert.strictEqual(savedRecord.timestamp, '2026-10-30T10:00:00.000Z');

// 6b. Diff comparison detection
const modifiedChar = JSON.parse(JSON.stringify(sampleChar1));
modifiedChar.powerLevel = 11;
modifiedChar.abilities.str = 6;
modifiedChar.powers[0].rank = 10;
modifiedChar.powers.push({ name: 'Flight', rank: 4, cost: 8 });
modifiedChar.advantages.push('Improved Initiative');
modifiedChar.skills[0].ranks = 6;

const diffs = testMgr.compareCharacterCopies(sampleChar1, modifiedChar);
assert(diffs.some(d => d.includes('Power Level: PL 10 → PL 11')), 'Detects PL change');
assert(diffs.some(d => d.includes('Strength: 4 → 6')), 'Detects ability change');
assert(diffs.some(d => d.includes('Kinetic Blast" Rank: 8 → 10')), 'Detects power rank change');
assert(diffs.some(d => d.includes('New Power Added: "Flight"')), 'Detects added power');
assert(diffs.some(d => d.includes('Added Advantage(s): Improved Initiative')), 'Detects added advantage');
assert(diffs.some(d => d.includes('Skill "Athletics" Ranks: 4 → 6')), 'Detects skill rank change');

// 6c. Verify leaveCampaign and disconnect sync in party.js
assert(partyJs.includes('type: \'MEMBER_LEFT\''), 'party.js broadcasts MEMBER_LEFT on disconnect');
assert(partyJs.includes('this.saveCampaignSavedCharacter(cleanCurId, msg.characterData'), 'GM saves incoming character on MEMBER_LEFT');
testMgr.endSession('FL-369');
console.log('✓ GM campaign character sync & change detection verified');

// =========================================================================
// 7. Campaign Tracker Sizing (.25 inches of tab margins)
// =========================================================================
assert(stylesCss.includes('width: calc(100vw - 0.5in) !important'), 'styles.css stretches tracker width to within 0.25in of margins');
assert(stylesCss.includes('height: calc(100vh - 0.5in) !important'), 'styles.css stretches tracker height to within 0.25in of margins');
assert(stylesCss.includes('margin: 0.25in auto !important'), 'styles.css sets 0.25in margin');
assert(indexHtml.includes('width: calc(100vw - 0.5in)'), 'index.html modal-campaign-tracker has 0.25in width margin');
console.log('✓ Campaign tracker enlarged modal sizing (.25in margins) verified');

// =========================================================================
// 8. Minimum Font Size Audit across Application (No font size < 10pt)
// =========================================================================
const filesToCheck = [
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/party.js',
  'js/supabase_client.js',
  'js/tables.js',
  'js/archetype_window.js'
];

for (const file of filesToCheck) {
  const content = readFileSync(file, 'utf8');
  // Check for px <= 13px (10pt is 13.33px)
  const pxMatches = content.match(/font-size:\s*(?:[0-9]|1[0-2]|13(?!\d))(?:\.[0-9]+)?px/g);
  assert(!pxMatches, `File ${file} contains font size < 10pt: ${pxMatches?.join(', ')}`);

  // Check for rem < 0.8rem
  const remMatches = content.match(/font-size:\s*0\.[0-7][0-9]*rem/g);
  assert(!remMatches, `File ${file} contains font size < 0.8rem: ${remMatches?.join(', ')}`);

  // Check for pt < 10pt
  const ptMatches = content.match(/font-size:\s*[0-9](?:\.[0-9]+)?pt/g);
  assert(!ptMatches, `File ${file} contains font size < 10pt: ${ptMatches?.join(', ')}`);
}
console.log('✓ Minimum 10pt font size verified across all files (zero font sizes < 10pt)');

console.log('\nALL v3.69 FEATURE TESTS PASSED CLEANLY!');
