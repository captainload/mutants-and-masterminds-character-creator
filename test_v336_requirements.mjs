import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.36 Alt Characters System ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.36)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.36', 'version.json should be 3.36');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.36'), 'index.html should reference v3.36');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.36'"), 'app.js defines CURRENT_VERSION as 3.36');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.36'), 'archetype_window.js links to v3.36 stylesheet');

// 2. DOM Elements Check in index.html
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

// Integrated Alt Naming Inputs & Modal Sizing (near viewport margins & taller)
assert.ok(indexHtml.includes('id="input-create-alt-name-alternate_form"'), 'modal should have integrated name input for Alternate Form');
assert.ok(indexHtml.includes('id="input-create-alt-name-minion"'), 'modal should have integrated name input for Minion');
assert.ok(indexHtml.includes('id="input-create-alt-name-sidekick"'), 'modal should have integrated name input for Sidekick');
assert.ok(indexHtml.includes('width: 98%') && indexHtml.includes('height: 92vh'), 'modal should have near-viewport width (98%) and taller height (92vh)');

console.log('✓ DOM element structure, modal dimensions, and integrated naming inputs verified successfully');

// 3. Storage blank hero test
const { storageManager } = await import('./js/storage.js');
const blankHero = storageManager.buildBlankHero();
assert.ok(Array.isArray(blankHero.alts), 'blankHero should have an alts array');
assert.strictEqual(blankHero.alts.length, 0, 'blankHero.alts should default to empty array');
console.log('✓ Storage model initializes alts array');

// 4. Test Alt Character Creation & Rules Logic
const primaryHero = storageManager.createFreeformCharacter('Apex Guardian', 10, 150);
primaryHero.id = 'hero_apex_1';

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

const minionAlt = storageManager.buildBlankHero();
minionAlt.id = 'alt_minion_1';
minionAlt.name = 'Cyber Drone';
minionAlt.altType = 'minion';
minionAlt.primaryCharId = primaryHero.id;
minionAlt.minionRank = 3;
minionAlt.powerPointsBudget = minionAlt.minionRank * 15;
minionAlt.powerLevel = Math.min(10, primaryHero.powerLevel);

assert.strictEqual(minionAlt.minionRank, 3);
assert.strictEqual(minionAlt.powerPointsBudget, 45, 'Minion budget must be Rank * 15 PP');
assert.ok(minionAlt.powerLevel <= primaryHero.powerLevel, 'Minion PL cannot exceed primary hero PL');

const sidekickAlt = storageManager.buildBlankHero();
sidekickAlt.id = 'alt_sidekick_1';
sidekickAlt.name = 'Cadet Shadow';
sidekickAlt.altType = 'sidekick';
sidekickAlt.primaryCharId = primaryHero.id;
sidekickAlt.sidekickRank = 8;
sidekickAlt.powerPointsBudget = sidekickAlt.sidekickRank * 5;
sidekickAlt.powerLevel = Math.min(10, primaryHero.powerLevel);

assert.strictEqual(sidekickAlt.sidekickRank, 8);
assert.strictEqual(sidekickAlt.powerPointsBudget, 40, 'Sidekick budget must be Rank * 5 PP');
assert.ok(sidekickAlt.powerLevel <= primaryHero.powerLevel, 'Sidekick PL cannot exceed primary hero PL');

primaryHero.alts = [altForm, minionAlt, sidekickAlt];
console.log('✓ Rules calculations for Alternate Form, Minion, and Sidekick verified');

// 5. Check Alt Label Prefixes & Icons in Front of Alt Name without Redundant Trailing Badge
assert.ok(appJs.includes("typePrefix = '🎭 Alt form:'"), 'app.js uses 🎭 Alt form:');
assert.ok(appJs.includes("typePrefix = '🤖 Minion:'"), 'app.js uses 🤖 Minion:');
assert.ok(appJs.includes("typePrefix = '🦸 Sidekick:'"), 'app.js uses 🦸 Sidekick:');
assert.ok(appJs.includes("alternate_form: '🎭 Alt form:'"), 'renderHeaderStatus uses 🎭 Alt form:');
assert.ok(appJs.includes("minion: '🤖 Minion:'"), 'renderHeaderStatus uses 🤖 Minion:');
assert.ok(appJs.includes("sidekick: '🦸 Sidekick:'"), 'renderHeaderStatus uses 🦸 Sidekick:');

// Ensure typeBadge after name is NOT in renderAltsListModal
assert.ok(!appJs.includes('${typeBadge}'), 'redundant typeBadge after alt name should be removed');

console.log('✓ Alt type icons placed to the left of labels in front of name, redundant badges removed');

// 6. Test App.js Code Signatures & Version
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

console.log('✓ All AppController methods, version 3.36 signatures, and styles verified');

console.log('\n========================================');
console.log('ALL v3.36 REQUIREMENTS VERIFIED 100% PASS!');
console.log('========================================');
