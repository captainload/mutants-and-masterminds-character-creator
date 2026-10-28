import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.52 Primary Tag and (AE: #) Array Tag ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.52)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.52', 'version.json should be 3.52');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.52'), 'index.html should reference v3.52');
assert.ok(indexHtml.includes('Character Editor v3.52'), 'index.html title has v3.52');
assert.ok(indexHtml.includes('js/app.js?v=3.52'), 'index.html imports app.js?v=3.52');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.52'"), 'app.js defines CURRENT_VERSION as 3.52');
assert.ok(appJs.includes("from './power_profiles.js?v=3.52'"), 'app.js imports power_profiles.js with ?v=3.52 cache buster');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.52'), 'archetype_window.js links to v3.52 stylesheet');

console.log('✓ Version 3.52 verified across version.json, index.html, app.js, and archetype_window.js');

// 2. Primary tag verification
assert.ok(
  appJs.includes('>Primary</span>'),
  'The tag text is simply "Primary"'
);
assert.ok(
  !appJs.includes('>Primary Effect</span>'),
  'The old "Primary Effect" tag text is no longer present'
);
assert.ok(
  !appJs.includes('Array Main</span>'),
  'The old "Array Main" tag is no longer present'
);

// 3. (AE: #) formatting when power is an array
assert.ok(
  appJs.includes('(AE: ${p.alternateEffects.length})'),
  'Tag "Primary" is followed by "(AE: #)" when power has alternate effects'
);
assert.ok(
  !appJs.includes('${p.alternateEffects.length} AE</span>'),
  'Old duplicate "X AE" tag on left side was removed'
);

// 4. Right-side placement
assert.ok(
  appJs.includes('<div class="power-effect-tags-right" style="margin-left: auto; display: inline-flex; align-items: center; gap: 0.35rem;">'),
  'Primary tag and (AE: #) appear towards the right side of the row'
);

console.log('✓ Only "Primary" tag is shown towards the right side of the row, followed by "(AE: #)" when power is an array');

console.log('\n========================================');
console.log('ALL v3.52 REQUIREMENTS VERIFIED 100% CLEAN!');
console.log('========================================\n');
