import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.41 Dice History Extension to 25 Rolls ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.41)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.41', 'version.json should be 3.41');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.41'), 'index.html should reference v3.41');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.41'"), 'app.js defines CURRENT_VERSION as 3.41');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.41'), 'archetype_window.js links to v3.41 stylesheet');

// 2. Dropdown Configuration for Last 25 Rolls
assert.ok(
  indexHtml.includes('title="Show last 25 rolls"') &&
  indexHtml.includes('aria-label="Show last 25 rolls"'),
  'index.html #btn-toggle-dice-history must reflect 25 rolls'
);

assert.ok(
  appJs.includes('diceRoller.history.slice(0, 25)'),
  'app.js renderDiceHistoryDropdown must slice last 25 rolls'
);

assert.ok(
  appJs.includes('No rolls recorded yet. Roll the dice to see the last 25 rolls here.'),
  'app.js empty state must reference 25 rolls'
);

console.log('✓ Dropdown configuration and JS slice(0, 25) verified');

// 3. Test Dice Roller Engine with 30 rolls -> Slices exactly 25
const { diceRoller } = await import('./js/dice.js');
diceRoller.history = [];

for (let i = 1; i <= 30; i++) {
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

assert.strictEqual(diceRoller.history.length, 30, 'history holds 30 rolls');
const last25 = diceRoller.history.slice(0, 25);
assert.strictEqual(last25.length, 25, 'history slices exactly last 25 rolls');
assert.strictEqual(last25[0].title, 'Test Check 30', 'newest roll is first');
assert.strictEqual(last25[24].title, 'Test Check 6', '25th roll is index 24');

console.log('✓ 25 rolls history logic tested and verified successfully');

console.log('\n========================================');
console.log('ALL v3.41 REQUIREMENTS VERIFIED 100% PASS!');
console.log('========================================');
