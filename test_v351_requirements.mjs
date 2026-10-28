import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.51 Power Effect Tags Placement & Button Rename ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.51)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.51', 'version.json should be 3.51');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.51'), 'index.html should reference v3.51');
assert.ok(indexHtml.includes('Character Editor v3.51'), 'index.html title has v3.51');
assert.ok(indexHtml.includes('js/app.js?v=3.51'), 'index.html imports app.js?v=3.51');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.51'"), 'app.js defines CURRENT_VERSION as 3.51');
assert.ok(appJs.includes("from './power_profiles.js?v=3.51'"), 'app.js imports power_profiles.js with ?v=3.51 cache buster');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.51'), 'archetype_window.js links to v3.51 stylesheet');

console.log('✓ Version 3.51 verified across version.json, index.html, app.js, and archetype_window.js');

// 2. Primary Effect and Array Main tags right-justified after actual effect name
assert.ok(
  appJs.includes('<div class="power-effect-tags-right" style="margin-left: auto; display: inline-flex; align-items: center; gap: 0.35rem;">'),
  'power-effect-tags-right container with margin-left: auto present in power card header'
);
assert.ok(
  appJs.includes('<span class="badge-tag tag-primary-effect" style="background: rgba(56, 189, 248, 0.15); border: 1px solid var(--hero-cyan); color: var(--hero-cyan); font-weight: 700;" title="Primary Base Effect of this Power">Primary Effect</span>'),
  'Primary Effect tag is defined with tag-primary-effect'
);
assert.ok(
  appJs.includes('<span class="badge-tag tag-array-main" style="background: rgba(59, 130, 246, 0.18); border: 1px solid var(--hero-blue); color: var(--hero-blue); font-weight: 700;" title="Main effect of this Power Array">Array Main</span>'),
  'Array Main tag is defined with tag-array-main'
);

const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');
assert.ok(stylesCss.includes('.power-effect-tags-right'), 'styles.css defines .power-effect-tags-right');

console.log('✓ "Primary Effect" and "Array Main" tags appear after the actual effect name, right-justified on the row');

// 3. Add alternate power button renamed to "Add alternate power effect"
assert.ok(
  appJs.includes('>Add alternate power effect</button>'),
  'Button label updated exactly to "Add alternate power effect"'
);
assert.ok(
  appJs.includes('Click "Add alternate power effect" above to add one.'),
  'Empty state text references "Add alternate power effect"'
);

console.log('✓ Add alternate power button accurately renamed to "Add alternate power effect"');

console.log('\n========================================');
console.log('ALL v3.51 REQUIREMENTS VERIFIED 100% CLEAN!');
console.log('========================================\n');
