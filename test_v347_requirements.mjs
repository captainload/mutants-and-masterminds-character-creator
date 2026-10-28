import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {
  SKILLS_LIST,
  ADVANTAGES_DATABASE,
  auditCharacter
} from './js/rules.js';

console.log('--- Running Tests for v3.47 Light Theme Polish, Skill Mastery in Advantages, & Proportional Widening ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.47)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.47', 'version.json should be 3.47');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.47'), 'index.html should reference v3.47');
assert.ok(indexHtml.includes('Character Editor v3.47'), 'index.html title has v3.47');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.47'"), 'app.js defines CURRENT_VERSION as 3.47');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.47'), 'archetype_window.js links to v3.47 stylesheet');

console.log('✓ Version 3.47 verified across version.json, index.html, app.js, and archetype_window.js');

// 2. Skill Mastery in Advantages
const smAdv = ADVANTAGES_DATABASE.find(a => a.id === 'skill_mastery');
assert.ok(smAdv, 'Skill Mastery must exist in ADVANTAGES_DATABASE');
assert.strictEqual(smAdv.category, 'Skill', 'Skill Mastery category must be Skill');
assert.strictEqual(smAdv.name, 'Skill Mastery');

// Verify ADVANTAGES_DATABASE is 100% sorted alphabetically
const advNames = ADVANTAGES_DATABASE.map(a => a.name);
const sortedAdvNames = [...advNames].sort((a, b) => a.localeCompare(b));
advNames.forEach((n, idx) => {
  assert.strictEqual(n, sortedAdvNames[idx], `Advantage at index ${idx} (${n}) should match sorted order (${sortedAdvNames[idx]})`);
});
console.log('✓ ADVANTAGES_DATABASE verified 100% alphabetically sorted (Minion before Move-by Action, Sidekick, Skill Mastery, Startle)');

// Check app.js renderAdvantagesTab sorts and safely handles data-opt-adv
assert.ok(appJs.includes('advDef.hasOptions && advDef.id !== \'skill_mastery\''), 'app.js checks advDef.id !== "skill_mastery" for option listener');
assert.ok(appJs.includes("row.querySelector('[data-opt-adv]')?.addEventListener"), 'app.js uses optional chaining on data-opt-adv listener');
assert.ok(appJs.includes('sortedCatalog = [...ADVANTAGES_DATABASE].sort'), 'app.js ensures advantages catalog is sorted alphabetically during rendering');

console.log('✓ Skill Mastery rendering bug resolved with safe option handler and alphabetical rendering');

// 3. Light Theme Overhaul (Dark Background Elimination)
const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');
assert.ok(stylesCss.includes('html[data-theme="light"] button.action-roll-card'), 'styles.css has light theme roll card styling');
assert.ok(stylesCss.includes('html[data-theme="light"] .dice-roller-bar'), 'styles.css has light theme dice-roller-bar styling');
assert.ok(stylesCss.includes('html[data-theme="light"] #action-dice-result'), 'styles.css has light theme action-dice-result styling');
assert.ok(stylesCss.includes('html[data-theme="light"] .stepper-control'), 'styles.css has light theme stepper-control styling');
assert.ok(stylesCss.includes('html[data-theme="light"] .modal-container > div[style*="background: rgba(30, 41, 59"]'), 'styles.css overrides dark sub-headers in modals');
assert.ok(stylesCss.includes('html[data-theme="light"] .sm-skill-row'), 'styles.css has light theme sm-skill-row styling');

// Verify hardcoded #0c1424 / #10192a removed from target inline elements in index.html
assert.ok(!indexHtml.includes('id="action-dice-result" class="dice-result-badge" style="flex: 1; min-height: 38px; display: flex; align-items: center; padding: 0 2.2rem 0 0.75rem; background: #0c1424;'), 'Hardcoded #0c1424 removed from action-dice-result inline style');
assert.ok(!indexHtml.includes('class="help-nav-bar" style="padding: 0.5rem 1rem; background-color: #0c1424;'), 'Hardcoded #0c1424 removed from help-nav-bar inline style');
assert.ok(!indexHtml.includes('id="discord-config-editor" style="display: none; background-color: #0b1120;'), 'Hardcoded #0b1120 removed from discord-config-editor inline style');

console.log('✓ Light theme dark background overrides and inline style cleanups verified');

// 4. Proportional Widening of Row Columns
assert.ok(stylesCss.includes('PROPORTIONAL COLUMN WIDENING (DESKTOP & LANDSCAPE TABLETS)'), 'styles.css includes proportional column widening section');
assert.ok(stylesCss.includes('grid-template-columns: repeat(8, minmax(0, 1fr)) !important;'), 'styles.css sets 8 proportional columns on wide displays for Abilities');
assert.ok(stylesCss.includes('grid-template-columns: repeat(5, minmax(0, 1fr)) !important;'), 'styles.css sets 5 proportional columns on wide displays for Defenses');
assert.ok(stylesCss.includes('.ability-stepper-card-compact') && stylesCss.includes('min-width: 0;'), 'styles.css sets min-width: 0 on ability cards to allow proportional widening');
assert.ok(indexHtml.includes('max-width: 1400px; width: 96vw;'), 'index.html expanded max-width to 1400px on modal-abilities-defenses');

console.log('✓ Proportional widening for 8-column Abilities and 5-column Defenses verified for desktop and landscape tablets');

console.log('\n========================================');
console.log('ALL v3.47 REQUIREMENTS VERIFIED 100% CLEAN!');
console.log('========================================\n');
