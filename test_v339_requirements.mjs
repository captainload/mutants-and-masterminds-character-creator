import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.39 Square Alt Count & Edit Abilities Popup Wrapping ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.39)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.39', 'version.json should be 3.39');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.39'), 'index.html should reference v3.39');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.39'"), 'app.js defines CURRENT_VERSION as 3.39');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.39'), 'archetype_window.js links to v3.39 stylesheet');

const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');

// 2. Alt Character Count on Alt Button: Larger & Square Background
assert.ok(
  indexHtml.includes('id="header-alts-count-badge"') &&
  indexHtml.includes('min-width: 22px') &&
  indexHtml.includes('height: 22px') &&
  indexHtml.includes('font-size: 13px') &&
  indexHtml.includes('border-radius: 0'),
  'index.html header-alts-count-badge must have larger dimensions (22x22px, 13px font) and square border-radius: 0'
);

assert.ok(
  stylesCss.includes('#header-alts-count-badge') &&
  stylesCss.includes('border-radius: 0px !important;') &&
  stylesCss.includes('min-width: 22px;') &&
  stylesCss.includes('height: 22px;') &&
  stylesCss.includes('font-size: 13px !important;'),
  'styles.css must enforce square border-radius: 0px and larger font/size for #header-alts-count-badge'
);

console.log('✓ Alt character count badge verified with square background and larger sizing');

// 3. Edit Abilities & Defenses Popup: Taller & Row 2 Wrapping
assert.ok(
  indexHtml.includes('id="modal-abilities-defenses"') &&
  indexHtml.includes('height: 92vh') &&
  indexHtml.includes('max-height: 94vh') &&
  indexHtml.includes('display: flex; flex-direction: column;'),
  'index.html modal-abilities-defenses container must be taller (92vh) with flex column layout'
);

assert.ok(
  indexHtml.includes('id="defenses-stepper-grid"') &&
  indexHtml.includes('repeat(auto-fit, minmax(190px, 1fr))'),
  'index.html defenses-stepper-grid must use auto-fit wrapping to prevent exceeding right margin'
);

assert.ok(
  stylesCss.includes('#defenses-stepper-grid') &&
  stylesCss.includes('repeat(auto-fit, minmax(190px, 1fr)) !important;'),
  'styles.css must enforce auto-fit wrapping for #defenses-stepper-grid'
);

assert.ok(
  stylesCss.includes('#modal-abilities-defenses .modal-container') &&
  stylesCss.includes('height: 92vh;'),
  'styles.css must configure modal-abilities-defenses height to 92vh'
);

console.log('✓ Edit Abilities popup taller dimensions and Row 2 grid wrapping verified');

console.log('\n========================================');
console.log('ALL v3.39 REQUIREMENTS VERIFIED 100% PASS!');
console.log('========================================');
