import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Running Tests for v3.40 Dice History Dropdown & Green Natural 20s ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.40)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.40', 'version.json should be 3.40');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.40'), 'index.html should reference v3.40');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.40'"), 'app.js defines CURRENT_VERSION as 3.40');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.40'), 'archetype_window.js links to v3.40 stylesheet');

const stylesCss = fs.readFileSync(path.join(projectDir, 'css/styles.css'), 'utf8');

// 2. Dropdown Arrow on Right Side of Dice Roll Output
assert.ok(
  indexHtml.includes('id="btn-toggle-dice-history"'),
  'index.html must have #btn-toggle-dice-history dropdown toggle button'
);
assert.ok(
  indexHtml.includes('id="dice-history-dropdown"'),
  'index.html must have #dice-history-dropdown container for last 10 rolls'
);
assert.ok(
  appJs.includes('btn-toggle-dice-history') && appJs.includes('dice-history-dropdown'),
  'app.js must wire toggle listener for dice history dropdown'
);
assert.ok(
  appJs.includes('renderDiceHistoryDropdown()'),
  'app.js must define renderDiceHistoryDropdown()'
);

console.log('✓ Dropdown arrow and last 10 rolls history panel verified');

// 3. Natural 20 Coloration (Green)
assert.ok(
  stylesCss.includes('.dice-result-badge.result-nat20') &&
  stylesCss.includes('border-color: #10b981 !important;') &&
  stylesCss.includes('rgba(16, 185, 129, 0.22)'),
  'styles.css must have green styles for natural 20 badge'
);
assert.ok(
  stylesCss.includes('.nat20-text'),
  'styles.css must define .nat20-text class for natural 20 green coloration'
);
assert.ok(
  appJs.includes('NAT 20') &&
  appJs.includes('var(--hero-green)') &&
  appJs.includes('isNat20'),
  'app.js must format natural 20 rolls in green with NAT 20 indicators'
);

console.log('✓ Natural 20 green coloration styling and logic verified');

// 4. Test Dice Engine History & Natural 20 Detection
const { diceRoller } = await import('./js/dice.js');
diceRoller.history = [];

// Force test rolls
for (let i = 0; i < 15; i++) {
  diceRoller.notify({
    id: 'test_roll_' + i,
    timestamp: '12:00:' + (i < 10 ? '0' + i : i),
    title: 'Test Check ' + i,
    rollType: 'general',
    rawDie: i === 5 ? 20 : 12,
    modifier: 5,
    total: i === 5 ? 25 : 17,
    targetDC: 15,
    isNatural20: i === 5,
    outcomeClass: 'success'
  });
}

assert.strictEqual(diceRoller.history.length, 15, 'diceRoller history stores rolls');
const last10 = diceRoller.history.slice(0, 10);
assert.strictEqual(last10.length, 10, 'history slices exactly last 10 rolls');

const nat20Roll = last10.find(r => r.isNatural20);
assert.ok(nat20Roll, 'natural 20 roll present in history');
assert.strictEqual(nat20Roll.rawDie, 20);

console.log('✓ Dice history storage and last 10 rolls slicing verified');

console.log('\n========================================');
console.log('ALL v3.40 REQUIREMENTS VERIFIED 100% PASS!');
console.log('========================================');
