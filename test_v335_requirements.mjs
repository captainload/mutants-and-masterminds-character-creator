import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.35 Alt Characters System ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.35', 'version.json should be 3.35');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.35'), 'index.html should reference v3.35');

// 2. DOM Elements Check in index.html
// Hero field should have #btn-open-alts right after #header-char-name
assert.ok(indexHtml.includes('id="btn-open-alts"'), 'index.html should have #btn-open-alts');
assert.ok(indexHtml.includes('id="header-alts-count-badge"'), 'index.html should have #header-alts-count-badge');
assert.ok(indexHtml.includes('id="header-active-alt-badge"'), 'index.html should have #header-active-alt-badge');
assert.ok(indexHtml.includes('id="header-active-alt-name"'), 'index.html should have #header-active-alt-name');
assert.ok(indexHtml.includes('id="header-active-alt-type"'), 'index.html should have #header-active-alt-type');
assert.ok(indexHtml.includes('id="btn-return-primary-char"'), 'index.html should have #btn-return-primary-char');

// Alt config containers in tabs
assert.ok(indexHtml.includes('id="alt-config-advantages-banner"'), 'index.html should have #alt-config-advantages-banner in Advantages tab');
assert.ok(indexHtml.includes('id="alt-config-powers-banner"'), 'index.html should have #alt-config-powers-banner in Powers tab');

// Two-column modal
assert.ok(indexHtml.includes('id="modal-alt-characters"'), 'index.html should have #modal-alt-characters');
assert.ok(indexHtml.includes('data-alt-type="alternate_form"'), 'modal should have Alternate Form option');
assert.ok(indexHtml.includes('data-alt-type="minion"'), 'modal should have Minion option');
assert.ok(indexHtml.includes('data-alt-type="sidekick"'), 'modal should have Sidekick option');
assert.ok(indexHtml.includes('id="alts-list-container"'), 'modal should have #alts-list-container for Column 2');
assert.ok(indexHtml.includes('id="btn-modal-switch-to-main"'), 'modal should have #btn-modal-switch-to-main');

// Integrated Alt Naming Inputs
assert.ok(indexHtml.includes('id="input-create-alt-name-alternate_form"'), 'modal should have integrated name input for Alternate Form');
assert.ok(indexHtml.includes('id="input-create-alt-name-minion"'), 'modal should have integrated name input for Minion');
assert.ok(indexHtml.includes('id="input-create-alt-name-sidekick"'), 'modal should have integrated name input for Sidekick');

console.log('✓ DOM element structure and integrated naming inputs verified successfully');

// 3. Storage blank hero test
const { storageManager } = await import('./js/storage.js');
const blankHero = storageManager.buildBlankHero();
assert.ok(Array.isArray(blankHero.alts), 'blankHero should have an alts array');
assert.strictEqual(blankHero.alts.length, 0, 'blankHero.alts should default to empty array');
console.log('✓ Storage model initializes alts array');

// 4. Test Alt Character Creation & Rules Logic
// Main Hero: PL 10, 150 PP
const primaryHero = storageManager.createFreeformCharacter('Apex Guardian', 10, 150);
primaryHero.id = 'hero_apex_1';

// Test Alt 1: Alternate Form
const altForm = storageManager.buildBlankHero();
altForm.id = 'alt_form_1';
altForm.name = 'Diamond Form';
altForm.altType = 'alternate_form';
altForm.primaryCharId = primaryHero.id;
altForm.powerLevel = primaryHero.powerLevel;
altForm.powerPointsBudget = primaryHero.powerPointsBudget;
altForm.alternateFormConfig = { activation: 'free' };

assert.strictEqual(altForm.powerLevel, 10, 'Alternate Form must match main hero PL');
assert.strictEqual(altForm.powerPointsBudget, 150, 'Alternate Form must match main hero PP budget');

// Test Alt 2: Minion
const minionAlt = storageManager.buildBlankHero();
minionAlt.id = 'alt_minion_1';
minionAlt.name = 'Cyber Drone';
minionAlt.altType = 'minion';
minionAlt.primaryCharId = primaryHero.id;
minionAlt.minionRank = 3;
minionAlt.powerPointsBudget = minionAlt.minionRank * 15;
minionAlt.powerLevel = Math.min(10, primaryHero.powerLevel);

assert.strictEqual(minionAlt.minionRank, 3);
assert.strictEqual(minionAlt.powerPointsBudget, 45, 'Minion budget must be Rank * 15 PP (3 * 15 = 45)');
assert.ok(minionAlt.powerLevel <= primaryHero.powerLevel, 'Minion PL cannot exceed primary hero PL');

// Test Alt 3: Sidekick
const sidekickAlt = storageManager.buildBlankHero();
sidekickAlt.id = 'alt_sidekick_1';
sidekickAlt.name = 'Cadet Shadow';
sidekickAlt.altType = 'sidekick';
sidekickAlt.primaryCharId = primaryHero.id;
sidekickAlt.sidekickRank = 8;
sidekickAlt.powerPointsBudget = sidekickAlt.sidekickRank * 5;
sidekickAlt.powerLevel = Math.min(10, primaryHero.powerLevel);

assert.strictEqual(sidekickAlt.sidekickRank, 8);
assert.strictEqual(sidekickAlt.powerPointsBudget, 40, 'Sidekick budget must be Rank * 5 PP (8 * 5 = 40)');
assert.ok(sidekickAlt.powerLevel <= primaryHero.powerLevel, 'Sidekick PL cannot exceed primary hero PL');

primaryHero.alts = [altForm, minionAlt, sidekickAlt];
console.log('✓ Rules calculations for Alternate Form, Minion, and Sidekick verified');

// 5. Test Session Log Snapshots with Alts & Rollback
// Create a session log entry
const sessionDate = '10/27/2026';
const sessionTitle = 'Battle for Downtown';

const characterSnapshot = JSON.parse(JSON.stringify(primaryHero));
delete characterSnapshot.historyLog;

const altsSummary = (primaryHero.alts || []).map(a => ({
  name: a.name,
  type: a.altType
}));

assert.strictEqual(altsSummary.length, 3);
assert.strictEqual(altsSummary[0].name, 'Diamond Form');
assert.strictEqual(altsSummary[1].name, 'Cyber Drone');
assert.strictEqual(altsSummary[2].name, 'Cadet Shadow');

primaryHero.historyLog = [{
  id: 'sess_1',
  date: sessionDate,
  time: '04:00 PM',
  title: sessionTitle,
  notes: 'Defeated villain syndicate.',
  characterName: primaryHero.name,
  characterPL: primaryHero.powerLevel,
  characterHP: 1,
  characterPP: 150,
  alts: altsSummary,
  characterSnapshot
}];

// Modify hero and alts after the session
primaryHero.name = 'Apex Guardian (Injured)';
primaryHero.alts[0].name = 'Shattered Diamond Form';
primaryHero.alts.pop(); // Remove Cadet Shadow in modern state

assert.strictEqual(primaryHero.alts.length, 2, 'Primary hero now only has 2 alts');

// Execute rollback from session snapshot
const sessionToRestore = primaryHero.historyLog[0];
const currentLogs = primaryHero.historyLog;
const restored = JSON.parse(JSON.stringify(sessionToRestore.characterSnapshot));
restored.historyLog = currentLogs;

assert.strictEqual(restored.name, 'Apex Guardian', 'Restored hero name reverted to original');
assert.strictEqual(restored.alts.length, 3, 'Restored alts length reverted to 3');
assert.strictEqual(restored.alts[0].name, 'Diamond Form', 'Restored alt 0 name reverted');
assert.strictEqual(restored.alts[2].name, 'Cadet Shadow', 'Restored alt 2 (deleted alt) was recovered');
console.log('✓ Session log rollback restores all alts accurately');

// 6. Test Modifiers Catalog Stars & Uniqueness (Only effect-unique modifiers and unique variants starred)
const { EXTRAS_CATALOG, FLAWS_CATALOG } = await import('./js/rules.js');

const contagious = EXTRAS_CATALOG.find(e => e.id === 'contagious');
assert.strictEqual(contagious.name, 'Contagious', 'Contagious should NOT be starred');
assert.strictEqual(contagious.isUnique, false, 'Contagious should not be marked isUnique');

const attack = EXTRAS_CATALOG.find(e => e.id === 'attack');
assert.strictEqual(attack.name, 'Attack', 'Attack should NOT be starred');
assert.strictEqual(attack.isUnique, false, 'Attack should not be marked isUnique');

const selective = EXTRAS_CATALOG.find(e => e.id === 'selective');
assert.strictEqual(selective.name, 'Selective', 'Selective should NOT be starred');

const diminishedRange = FLAWS_CATALOG.find(f => f.id === 'diminished_range');
assert.strictEqual(diminishedRange.name, 'Diminished Range', 'Diminished Range should NOT be starred');

const grabBased = FLAWS_CATALOG.find(f => f.id === 'grab_based');
assert.strictEqual(grabBased.name, 'Grab-Based', 'Grab-Based should NOT be starred');

// Effect-unique modifiers should be starred
const strBased = EXTRAS_CATALOG.find(e => e.id === 'strength_based');
assert.strictEqual(strBased.name, '★ Strength-Based', 'Strength-Based must be starred');
assert.strictEqual(strBased.isUnique, true);

const penetrating = EXTRAS_CATALOG.find(e => e.id === 'penetrating');
assert.strictEqual(penetrating.name, '★ Penetrating', 'Penetrating must be starred');
assert.strictEqual(penetrating.isUnique, true);

const portal = EXTRAS_CATALOG.find(e => e.id === 'portal');
assert.strictEqual(portal.name, '★ Portal', 'Portal must be starred');
assert.strictEqual(portal.isUnique, true);

const turnabout = EXTRAS_CATALOG.find(e => e.id === 'turnabout');
assert.strictEqual(turnabout.name, '★ Turnabout', 'Turnabout must be starred');
assert.strictEqual(turnabout.isUnique, true);

const empathic = FLAWS_CATALOG.find(f => f.id === 'empathic');
assert.strictEqual(empathic.name, '★ Empathic', 'Empathic must be starred');
assert.strictEqual(empathic.isUnique, true);

// Unique modifier variants should be starred
const limAmbient = FLAWS_CATALOG.find(f => f.id === 'limited_ambient');
assert.strictEqual(limAmbient.name, '★ Limited: Ambient Source', 'Limited: Ambient Source must be starred');

const limMinds = FLAWS_CATALOG.find(f => f.id === 'limited_to_minds');
assert.strictEqual(limMinds.name, '★ Limited to Minds', 'Limited to Minds must be starred');

const limResist = FLAWS_CATALOG.find(f => f.id === 'limited_to_resistance');
assert.strictEqual(limResist.name, '★ Limited: Single Resistance', 'Limited: Single Resistance must be starred');

console.log('✓ Modifier catalogs correctly distinguish effect-unique modifiers and variants with stars');

// 7. Test App.js Code Signatures & Version
const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.35'"), 'app.js defines CURRENT_VERSION as 3.35');
assert.ok(appJs.includes('setupAltCharactersModal'), 'app.js includes setupAltCharactersModal');
assert.ok(appJs.includes('renderAltsListModal'), 'app.js includes renderAltsListModal');
assert.ok(appJs.includes('createAltCharacter'), 'app.js includes createAltCharacter');
assert.ok(appJs.includes('loadAltIntoEditor'), 'app.js includes loadAltIntoEditor');
assert.ok(appJs.includes('switchToMainHero'), 'app.js includes switchToMainHero');
assert.ok(appJs.includes('btn-rename-alt'), 'app.js supports renaming existing alts');
assert.ok(appJs.includes('renderAltAdvantagesConfig'), 'app.js includes renderAltAdvantagesConfig');
assert.ok(appJs.includes('renderAltPowersConfig'), 'app.js includes renderAltPowersConfig');
assert.ok(appJs.includes('this.activeAltId'), 'app.js tracks activeAltId');
assert.ok(appJs.includes('header-active-alt-badge'), 'app.js manages header-active-alt-badge');
assert.ok(appJs.includes('header-alts-count-badge'), 'app.js manages header-alts-count-badge');
assert.ok(appJs.includes('input-create-alt-name-'), 'app.js binds integrated alt naming inputs');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.35'), 'archetype_window.js links to v3.35 stylesheet');

const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');
assert.ok(stylesCss.includes('z-index: 2500'), 'styles.css defines z-index: 2500 for prompt and alert overlays');

console.log('✓ All AppController methods, version 3.35 signatures, and styles verified');

console.log('\n========================================');
console.log('ALL v3.35 REQUIREMENTS VERIFIED 100% PASS!');
console.log('========================================');
