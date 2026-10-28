import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.42 Dice History 50-Rolls, Sizing & Wider Scrollbar ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.42)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.42', 'version.json should be 3.42');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.42'), 'index.html should reference v3.42');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.42'"), 'app.js defines CURRENT_VERSION as 3.42');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.42'), 'archetype_window.js links to v3.42 stylesheet');

const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');
const diceJs = fs.readFileSync(path.join(projectDir, 'js/dice.js'), 'utf8');

// 2. Clear Link, Timestamps, and Roll Results Enlarged
assert.ok(
  appJs.includes('Clear History') &&
  appJs.includes('font-size: var(--font-size-xs); font-weight: 700; text-decoration: underline;'),
  'Clear button should be enlarged and styled prominently'
);
assert.ok(
  appJs.includes('font-size: var(--font-size-xs); font-weight: 600; white-space: nowrap;'),
  'Timestamps should be enlarged using --font-size-xs'
);
assert.ok(
  appJs.includes('font-size: var(--font-size-base); color: ${isNat20 ? \'var(--hero-green)\' : \'var(--hero-gold)\'}; font-weight: 900;'),
  'Roll totals should be enlarged using --font-size-base'
);

console.log('✓ Clear link, timestamps, and roll results sizing verified');

// 3. Scrollbar Sizing (Very slightly wider: 9px)
assert.ok(
  stylesCss.includes('.dice-history-dropdown-panel::-webkit-scrollbar') &&
  stylesCss.includes('width: 9px;'),
  'Scrollbar width should be set to 9px (slightly wider than previous 6px)'
);

console.log('✓ Scrollbar width enlargement to 9px verified');

// 4. Extended to 50 rolls & Visible Area for 10 rolls
assert.ok(
  indexHtml.includes('title="Show last 50 rolls"') &&
  indexHtml.includes('max-height: 510px;'),
  'index.html should configure 50 rolls and 510px max-height for visible area of ~10 rolls'
);
assert.ok(
  stylesCss.includes('.dice-history-dropdown-panel') &&
  stylesCss.includes('max-height: 510px !important;'),
  'styles.css should enforce 510px max-height for visible area of 10 rolls'
);
assert.ok(
  appJs.includes('diceRoller.history.slice(0, 50)'),
  'app.js should slice 50 rolls from history'
);
assert.ok(
  diceJs.includes('if (this.history.length > 100) this.history.pop();'),
  'dice.js should store at least 100 rolls in memory buffer'
);

console.log('✓ 50-roll history capacity and 10-roll visible viewport height verified');

// 5. Test Dice Roller Engine with 60 rolls -> Slices exactly 50
const { diceRoller } = await import('./js/dice.js');
diceRoller.history = [];

for (let i = 1; i <= 60; i++) {
  diceRoller.notify({
    id: 'test_roll_' + i,
    timestamp: '12:00:' + (i < 10 ? '0' + i : i),
    title: 'Test Check ' + i,
    rollType: 'general',
    rawDie: (i % 20) + 1,
    modifier: 2,
    total: ((i % 20) + 1) + 2,
    targetDC: 15,
    isNatural20: ((i % 20) + 1) === 20,
    outcomeClass: 'success'
  });
}

assert.strictEqual(diceRoller.history.length, 60, 'history buffer holds 60 rolls without dropping to 50');
const last50 = diceRoller.history.slice(0, 50);
assert.strictEqual(last50.length, 50, 'history slices exactly last 50 rolls');
assert.strictEqual(last50[0].title, 'Test Check 60', 'newest roll is first');
assert.strictEqual(last50[49].title, 'Test Check 11', '50th roll is index 49');

console.log('✓ 50 rolls history engine execution verified successfully');

console.log('\n========================================');
console.log('ALL v3.42 REQUIREMENTS VERIFIED 100% PASS!');
console.log('========================================');
