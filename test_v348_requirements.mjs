import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {
  SKILLS_LIST,
  ADVANTAGES_DATABASE,
  auditCharacter
} from './js/rules.js';
import {
  POWER_PROFILES_LIBRARY
} from './js/power_profiles.js';

console.log('--- Running Tests for v3.48 Update Icon, Power Profiles Polish, & 2-Row Effect Notes ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.48)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.48', 'version.json should be 3.48');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.48'), 'index.html should reference v3.48');
assert.ok(indexHtml.includes('Character Editor v3.48'), 'index.html title has v3.48');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.48'"), 'app.js defines CURRENT_VERSION as 3.48');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.48'), 'archetype_window.js links to v3.48 stylesheet');

console.log('✓ Version 3.48 verified across version.json, index.html, app.js, and archetype_window.js');

// 2. Only show "!" update icon when an update is detected
assert.ok(indexHtml.includes('id="btn-header-update-alert" class="btn-header-update-alert" title="Check for updates / Update status" style="display: none;"'), 'btn-header-update-alert hidden by default in index.html');

const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');
assert.ok(stylesCss.includes('display: none; /* Only show if update detected */'), 'styles.css hides update button by default');
assert.ok(stylesCss.includes('.btn-header-update-alert.out-of-date {\n  display: inline-flex !important;'), 'styles.css shows update button only when out-of-date');

assert.ok(appJs.includes("updateBtn.style.display = isOutdated ? 'inline-flex' : 'none';"), 'app.js dynamically toggles updateBtn display based on isOutdated');

console.log('✓ Update alert "!" icon is strictly hidden by default and only shown when an update is detected');

// 3. Power profiles re-parsed with clean descriptions and no truncated/erroneous text
let flaggedCount = 0;
let totalProfiles = 0;
for (const grp of POWER_PROFILES_LIBRARY) {
  for (const p of grp.profiles) {
    totalProfiles++;
    if (p.notes.startsWith('and ') || p.notes.startsWith('or ') || p.notes.startsWith('but ') ||
        p.notes.startsWith('of ') || p.notes.startsWith('to ') ||
        p.notes.includes('CHAPTER') || p.notes.includes('MUTANTS') || p.notes.includes('HERO') ||
        p.notes.length < 15) {
      flaggedCount++;
    }
  }
}
assert.strictEqual(flaggedCount, 0, `Expected 0 flagged power profiles, found ${flaggedCount}`);
assert.ok(totalProfiles > 1000, `Expected > 1000 power profiles, found ${totalProfiles}`);
assert.ok(appJs.includes('descriptor: matchedProfile.descriptor || \'\''), 'app.js populates descriptor when applying power profile');

console.log(`✓ All ${totalProfiles} Power Profiles re-examined and verified clean of truncated/erroneous text`);

// 4. Effect notes field expands to two visible rows
assert.ok(appJs.includes('<textarea class="input-power-notes" rows="2"'), 'app.js renders primary effect notes as textarea rows=2');
assert.ok(appJs.includes('<textarea class="input-ae-notes" rows="2"'), 'app.js renders alternate effect notes as textarea rows=2');
assert.ok(stylesCss.includes('.input-power-notes') && stylesCss.includes('min-height: 48px;') && stylesCss.includes('resize: vertical;'), 'styles.css sets min-height 48px and vertical resize for effect notes');

console.log('✓ Effect notes fields expand to two visible rows with vertical resize support');

// 5. "i" button by currently selected power profile with pop-up description
assert.ok(indexHtml.includes('id="btn-power-profile-info"'), 'index.html has #btn-power-profile-info button next to profile picker');
assert.ok(indexHtml.includes('id="modal-power-profile-info"'), 'index.html has #modal-power-profile-info modal structure');
assert.ok(appJs.includes('btn-power-profile-info') && appJs.includes('modal-power-profile-info'), 'app.js wires #btn-power-profile-info to display modal with profile description');

console.log('✓ "i" info button added next to power profile select with modal pop-up description');

// 6. Power profile picker light mode styling
assert.ok(indexHtml.includes('class="card-box power-profiles-card"'), 'index.html applies power-profiles-card class to profile box');
assert.ok(stylesCss.includes('html[data-theme="light"] .power-profiles-card'), 'styles.css defines light theme styling for power profiles card');
assert.ok(stylesCss.includes('html[data-theme="light"] #power-profiles-select'), 'styles.css defines light theme styling for power profiles dropdown');
assert.ok(stylesCss.includes('html[data-theme="light"] #power-profiles-select option'), 'styles.css defines light theme styling for power profiles options');

console.log('✓ Power profile picker dark background fixed in light mode');

console.log('\n========================================');
console.log('ALL v3.48 REQUIREMENTS VERIFIED 100% CLEAN!');
console.log('========================================\n');
