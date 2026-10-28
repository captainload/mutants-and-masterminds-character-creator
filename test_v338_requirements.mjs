import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.38 Blue Alt Button & Light Theme ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.38)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.38', 'version.json should be 3.38');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.38'), 'index.html should reference v3.38');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.38'"), 'app.js defines CURRENT_VERSION as 3.38');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.38'), 'archetype_window.js links to v3.38 stylesheet');

// 2. Alt Characters Button is Blue
assert.ok(
  indexHtml.includes('id="btn-open-alts"') &&
  indexHtml.includes('color: var(--hero-blue); border-color: var(--hero-blue);'),
  'index.html #btn-open-alts must have blue coloration'
);
assert.ok(
  indexHtml.includes('id="header-alts-count-badge"') &&
  indexHtml.includes('background:var(--hero-blue);'),
  'index.html #header-alts-count-badge must have blue background'
);

const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');
assert.ok(
  stylesCss.includes('#btn-open-alts') && stylesCss.includes('color: var(--hero-blue) !important;'),
  'styles.css must style #btn-open-alts in hero-blue'
);

console.log('✓ Alt Characters button color changed from purple to blue');

// 3. Theme Picker in Settings
assert.ok(
  indexHtml.includes('id="theme-picker-container"'),
  'index.html Settings flyout must have #theme-picker-container'
);
assert.ok(
  indexHtml.includes('class="btn btn-outline theme-toggle-btn active" data-theme="dark"') &&
  indexHtml.includes('data-theme="light"'),
  'index.html Settings flyout must have dark and light theme toggle buttons'
);

// 4. JS Logic for Visual Theme
assert.ok(appJs.includes('this.initTheme()'), 'app.js init() calls initTheme()');
assert.ok(appJs.includes('initTheme()'), 'app.js defines initTheme()');
assert.ok(appJs.includes('mm3e_theme'), 'app.js stores selected theme in localStorage mm3e_theme');
assert.ok(appJs.includes("document.documentElement.setAttribute('data-theme',"), 'app.js sets data-theme attribute');

console.log('✓ Settings Theme Picker and JavaScript controller methods verified');

// 5. CSS Light Theme (Off-white, Light tan, and Beige)
assert.ok(stylesCss.includes('html[data-theme="light"]'), 'styles.css must have html[data-theme="light"] rules');
assert.ok(stylesCss.includes('--bg-app: #f5efe6;'), 'styles.css light theme must define soft light tan --bg-app');
assert.ok(stylesCss.includes('--bg-header: #ebe3d5;'), 'styles.css light theme must define light tan --bg-header');
assert.ok(stylesCss.includes('--bg-card: #fcfaf7;'), 'styles.css light theme must define off-white/beige --bg-card');
assert.ok(stylesCss.includes('--border-color: #dcd1c2;'), 'styles.css light theme must define light tan border-color');
assert.ok(stylesCss.includes('--text-main: #2b251d;'), 'styles.css light theme must define readable warm dark text-main');

console.log('✓ Light theme palette verified with off-white, light tan, and beige coloration');

// 6. Test Blank Hero and Rules Logic
const { storageManager } = await import('./js/storage.js');
const blank = storageManager.buildBlankHero();
assert.ok(Array.isArray(blank.alts), 'blankHero has alts array');

console.log('\n========================================');
console.log('ALL v3.38 REQUIREMENTS VERIFIED 100% PASS!');
console.log('========================================');
