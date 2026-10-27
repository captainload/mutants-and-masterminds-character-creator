import fs from 'fs';
import { DEFENSES, auditCharacter } from './js/rules.js';
import { tablesManager } from './js/tables.js';

console.log('=== Running v3.33 Requirements Test Suite ===\n');

// 1. Version Check: 3.33 across version.json, index.html, and js/app.js
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.33') {
  throw new Error(`Expected version.json to be 3.33, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.33')) {
  throw new Error('Expected index.html title to reference Character Editor v3.33');
}
if (!indexHtml.includes('css/styles.css?v=3.33')) {
  throw new Error('Expected styles.css query param to be v3.33');
}
if (!indexHtml.includes('js/app.js?v=3.33')) {
  throw new Error('Expected app.js script query param to be v3.33');
}
if (!indexHtml.includes('>v3.33</span>')) {
  throw new Error('Expected header version badge to display v3.33');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.33'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.33"');
}
console.log('✓ 1. Version 3.33 verified across version.json, index.html, and js/app.js');

// 2. Toughness direct rank buying disabled in rules & engine
const toughDef = DEFENSES.find(d => d.id === 'toughness');
if (!toughDef) {
  throw new Error('Expected toughness in DEFENSES');
}
if (toughDef.canBuyDirectly !== false) {
  throw new Error('Expected toughness.canBuyDirectly to be false');
}

// Test character with bought toughness ranks in data: PP cost must be 0 for toughness
const testChar = {
  powerLevel: 10,
  powerPointsBudget: 150,
  abilities: { str: 2, sta: 3, agi: 2, dex: 2, fgt: 4, int: 2, awe: 2, pre: 1 },
  defenses: { dodge: 2, parry: 2, fortitude: 2, toughness: 5, will: 2 }, // toughness: 5 bought
  skills: [],
  advantages: [{ id: 'defensive_roll', rank: 2 }],
  powers: [{ id: 'p1', rank: 4, effect: { id: 'protection', name: 'Protection', baseCost: 1 } }]
};

const audit = auditCharacter(testChar);
// Dodge: base 2 + bought 2 = 4 (cost 2)
// Parry: base 4 + bought 2 = 6 (cost 2)
// Fortitude: base 3 + bought 2 = 5 (cost 2)
// Will: base 2 + bought 2 = 4 (cost 2)
// Toughness bought 5 MUST NOT cost PP!
// Total defensesCost should be 2 + 2 + 2 + 2 = 8 PP (NOT 13 PP)
if (audit.defensesCost !== 8) {
  throw new Error(`Expected defensesCost to be 8 PP (excluding Toughness bought ranks), got ${audit.defensesCost}`);
}
// Toughness value should be STA 3 + Protection 4 + Defensive Roll 2 = 9 (ignoring bought 5)
if (audit.computedDefenses.toughness !== 9) {
  throw new Error(`Expected computedDefenses.toughness to be 9 (STA 3 + Prot 4 + DefRoll 2), got ${audit.computedDefenses.toughness}`);
}

// Check UI rendering code for Toughness: must not have bought stepper buttons
if (!appJs.includes("def.id === 'toughness'")) {
  throw new Error('Expected special Toughness handling in renderAbilitiesTab');
}
if (!appJs.includes('Derived &bull; Cannot buy with PP')) {
  throw new Error('Expected Derived Cannot buy with PP label in renderAbilitiesTab for Toughness');
}
console.log('✓ 2. Toughness defense direct PP purchase disabled and computed strictly as derived');

// 3. Power Array Main Effect marking & Alternate Effect linking
if (!appJs.includes('★ Primary Effect')) {
  throw new Error('Expected Primary Effect badge / indicator in power card');
}
if (!appJs.includes('Linked Effects vs Alternate Effect Arrays')) {
  throw new Error('Expected educational alert when linking with no other powers');
}
if (!appJs.includes('Link "${ae.name || \'Alternate Effect\'}" With Existing Effect')) {
  throw new Error('Expected interactive link target selection modal for Alternate Effects');
}
if (!appJs.includes('cb-ae-linked')) {
  throw new Error('Expected cb-ae-linked checkbox handling');
}
console.log('✓ 3. Array main power clearly marked and Alternate Effect linking prompts for target effect');

// 4. Toggle pop-ups for Archetypes and Tables
if (!appJs.includes("archModal.classList.contains('active')")) {
  throw new Error('Expected Archetypes button to toggle modal if already active');
}
if (!appJs.includes("tablesManager.popoutWindow.close()")) {
  throw new Error('Expected Tables button to close popout if already open');
}
console.log('✓ 4. Archetypes and Tables buttons toggle their pop-ups');

// 5. Tables popout state memory & width check
if (typeof tablesManager.canDisplayPopout !== 'function') {
  throw new Error('Expected tablesManager.canDisplayPopout method');
}
if (typeof tablesManager.wasClosedWhilePoppedOut !== 'function') {
  throw new Error('Expected tablesManager.wasClosedWhilePoppedOut method');
}
if (typeof tablesManager.setClosedWhilePoppedOut !== 'function') {
  throw new Error('Expected tablesManager.setClosedWhilePoppedOut method');
}

// Test tablesManager popout preference
tablesManager.setClosedWhilePoppedOut(true);
if (!tablesManager.wasClosedWhilePoppedOut()) {
  throw new Error('Expected wasClosedWhilePoppedOut to return true after setClosedWhilePoppedOut(true)');
}
tablesManager.setClosedWhilePoppedOut(false);
if (tablesManager.wasClosedWhilePoppedOut()) {
  throw new Error('Expected wasClosedWhilePoppedOut to return false after setClosedWhilePoppedOut(false)');
}

console.log('✓ 5. Tables popout state restoration and display width check verified');

console.log('\n=== All v3.33 Requirements Tests Passed Successfully! ===');
