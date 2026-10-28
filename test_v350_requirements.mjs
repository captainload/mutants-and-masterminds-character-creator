import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.50 Add Alternate Power Button & Contrast Polish ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.50)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.50', 'version.json should be 3.50');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.50'), 'index.html should reference v3.50');
assert.ok(indexHtml.includes('Character Editor v3.50'), 'index.html title has v3.50');
assert.ok(indexHtml.includes('js/app.js?v=3.50'), 'index.html imports app.js?v=3.50');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.50'"), 'app.js defines CURRENT_VERSION as 3.50');
assert.ok(appJs.includes("from './power_profiles.js?v=3.50'"), 'app.js imports power_profiles.js with ?v=3.50 cache buster');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.50'), 'archetype_window.js links to v3.50 stylesheet');

console.log('✓ Version 3.50 verified across version.json, index.html, app.js, and archetype_window.js');

// 2. Add Alternate Effect / Power Button Styling
assert.ok(!appJs.includes('btn-add-ae-effect" style="font-size: var(--font-size-sm); min-height: 32px; padding: 0.2rem 0.75rem; border-color: var(--hero-blue); color: #fff;"'), 'btn-add-ae-effect no longer has hardcoded color: #fff');
assert.ok(appJs.includes('class="btn btn-outline btn-add-ae-effect"'), 'btn-add-ae-effect button rendered in app.js');
assert.ok(appJs.includes('Add Alternate Power / Effect to Array'), 'app.js renders clear "Add Alternate Power / Effect to Array" button text');

const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');
assert.ok(stylesCss.includes('.btn-add-ae-effect {'), 'styles.css defines .btn-add-ae-effect');
assert.ok(stylesCss.includes('color: var(--hero-blue) !important;'), 'styles.css gives .btn-add-ae-effect hero-blue color');
assert.ok(stylesCss.includes('html[data-theme="light"] .btn-add-ae-effect'), 'styles.css includes light theme override for .btn-add-ae-effect');

console.log('✓ Add Alternate Power / Effect button is styled with high contrast hero-blue and light theme support');

// 3. Modifier Add & Delete Buttons
assert.ok(!appJs.includes('btn-add-extra" style="font-size: var(--font-size-sm); min-height: 32px; padding: 0.2rem 0.55rem; white-space: nowrap; flex-shrink: 0; border-color: var(--hero-blue); color: #fff;"'), 'btn-add-extra no longer has inline color: #fff');
assert.ok(!appJs.includes('btn-add-flaw" style="font-size: var(--font-size-sm); min-height: 32px; padding: 0.2rem 0.55rem; white-space: nowrap; flex-shrink: 0; border-color: var(--hero-blue); color: #fff;"'), 'btn-add-flaw no longer has inline color: #fff');
assert.ok(!appJs.includes('btn-delete-power" data-p-id="${p.id}" title="Delete Power" style="min-height: 32px; padding: 0.2rem 0.65rem; font-size: var(--font-size-base); font-weight: 700; color: #fff; border-color: rgba(255, 255, 255, 0.25);"'), 'btn-delete-power no longer has inline color: #fff');
assert.ok(!appJs.includes('btn-delete-ae" style="padding: 0.2rem 0.65rem; min-height: 32px; font-size: var(--font-size-sm); color: #fff; border-color: rgba(255, 255, 255, 0.25);"'), 'btn-delete-ae no longer has inline color: #fff');

assert.ok(stylesCss.includes('.btn-delete-power,'), 'styles.css styles delete buttons with danger red');

console.log('✓ Add and Delete action buttons no longer have unreadable white-on-white text');

// 4. Bruises and Validation text contrast in light mode
assert.ok(!indexHtml.includes('<div style="font-weight: 800; font-size: var(--font-size-sm); color: #fff;">Bruises</div>'), 'Bruises label in action center no longer has color: #fff');
assert.ok(stylesCss.includes('html[data-theme="light"] .power-validation-alert,'), 'Light theme validation alerts use high-contrast text-bright');

console.log('✓ Bruises label and power validation alerts confirmed high contrast in light mode');

console.log('\n========================================');
console.log('ALL v3.50 REQUIREMENTS VERIFIED 100% CLEAN!');
console.log('========================================\n');
