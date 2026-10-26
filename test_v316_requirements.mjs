import fs from 'fs';
import { DiceRoller } from './js/dice.js';

console.log('=== Running v3.16 Requirements Test Suite ===\n');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.16') {
  throw new Error(`Expected version.json to be 3.16, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('v3.16')) {
  throw new Error('Expected index.html to reference v3.16');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.16'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.16"');
}
console.log('✓ 1. Version 3.16 verified across version.json, index.html, and js/app.js');

// 2. Row 2 PP Details Font Scaling
const css = fs.readFileSync('css/styles.css', 'utf8');
const ppLabelMatch = css.match(/\.pp-status-label\s*\{([^}]+)\}/);
if (!ppLabelMatch || !ppLabelMatch[1].includes('var(--font-size-sm)')) {
  throw new Error('Expected .pp-status-label in css/styles.css to use font-size: var(--font-size-sm)');
}

const ppValueMatch = css.match(/\.pp-status-value\s*\{([^}]+)\}/);
if (!ppValueMatch || !ppValueMatch[1].includes('var(--font-size-base)')) {
  throw new Error('Expected .pp-status-value in css/styles.css to use font-size: var(--font-size-base)');
}
console.log('✓ 2. Row 2 PP details font scaling verified: label is sm, value is base');

// 3. DiceRoller Tracking (lastFailedCheck & mostRecentCheck)
const roller = new DiceRoller();
if (roller.lastFailedCheck !== null || roller.mostRecentCheck !== null) {
  throw new Error('Expected new DiceRoller to start with null for lastFailedCheck and mostRecentCheck');
}

// Roll initiative: should NOT overwrite lastFailedCheck or mostRecentCheck
roller.rollCheck({ title: 'Initiative', modifier: 5, rollType: 'initiative' });
if (roller.lastFailedCheck !== null || roller.mostRecentCheck !== null) {
  throw new Error('Initiative roll should not set lastFailedCheck or mostRecentCheck');
}

// Roll a successful check
roller.rollCheck({ title: 'Close Attack', modifier: 10, targetDC: 10, rollType: 'attack' });
// Note: with modifier 10 vs DC 10, min roll is 1+10=11 >= 10, so always a success
if (!roller.mostRecentCheck || roller.mostRecentCheck.outcomeClass !== 'success') {
  throw new Error('Expected mostRecentCheck to be recorded and successful');
}
if (roller.lastFailedCheck !== null) {
  throw new Error('Successful check should not set lastFailedCheck');
}

// Roll a guaranteed failed check (mod 0 vs DC 50)
const failedRoll = roller.rollCheck({ title: 'Toughness Resistance', modifier: 0, targetDC: 50, rollType: 'toughness' });
if (!roller.lastFailedCheck || roller.lastFailedCheck.outcomeClass !== 'failure') {
  throw new Error('Failed check was not recorded as lastFailedCheck');
}
if (roller.lastFailedCheck.title !== 'Toughness Resistance') {
  throw new Error(`Expected lastFailedCheck title to be 'Toughness Resistance', got ${roller.lastFailedCheck.title}`);
}
console.log('✓ 3. DiceRoller check history tracking verified for success, failure, and initiative');

// 4. Hero Point Reroll Mechanics (1-10 + 10)
let rolledLowCount = 0;
for (let i = 0; i < 50; i++) {
  const hpReroll = roller.rollCheck({
    title: 'Test HP Reroll',
    modifier: 0,
    isHeroPointReroll: true
  });
  if (hpReroll.effectiveDie < 11 || hpReroll.effectiveDie > 20) {
    throw new Error(`Hero Point reroll produced effective die outside 11-20: ${hpReroll.effectiveDie}`);
  }
}
console.log('✓ 4. Hero Point reroll rule (die 1-10 + 10 guaranteeing 11-20) verified over 50 iterations');

// 5. App Code Integrations for Hero Point Reroll
if (!appJs.includes('this.lastFailedCheck') || !appJs.includes('updateHeroPointModal')) {
  throw new Error('Expected js/app.js to integrate this.lastFailedCheck and updateHeroPointModal');
}
if (!appJs.includes('appliedToughnessPenalties')) {
  throw new Error('Expected js/app.js to track and revert appliedToughnessPenalties on Hero Point reroll');
}
if (!indexHtml.includes('id="hp-reroll-target-info"')) {
  throw new Error('Expected index.html to contain #hp-reroll-target-info');
}
console.log('✓ 5. Hero Point modal UI and Toughness penalty reversal integration verified');

console.log('\n=== All v3.16 Requirements Passed Successfully! ===');
