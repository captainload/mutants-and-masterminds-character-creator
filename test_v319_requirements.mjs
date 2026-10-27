import fs from 'fs';
import {
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  isModifierLegalForEffect,
  validateModifierLegality,
  computePowerEffectiveStats,
  calculatePowerCost
} from './js/rules.js';

console.log('=== Running v3.19 Requirements Test Suite ===\n');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (parseFloat(versionJson.version) < 3.19) {
  throw new Error(`Expected version.json to be >= 3.19, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Architect v3.')) {
  throw new Error('Expected index.html title to reference Character Architect');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
const appVerMatch = appJs.match(/CURRENT_VERSION = '([0-9.]+)'/);
if (!appVerMatch || parseFloat(appVerMatch[1]) < 3.19) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION >= 3.19');
}
console.log('✓ 1. Version >= 3.19 verified across version.json, index.html, and js/app.js');

// 2. Power Profiles Placeholder
if (!indexHtml.includes('<option value="" disabled selected>-select power profile-</option>')) {
  throw new Error('Expected "-select power profile-" placeholder option in index.html power-profiles-select');
}
if (!appJs.includes('-select power profile-')) {
  throw new Error('Expected js/app.js setupPowerProfiles to include "-select power profile-" placeholder');
}
console.log('✓ 2. Power profiles placeholder "-select power profile-" verified in index.html and js/app.js');

// 3. Redundant Power Builder Modal and Quick Add Button Elimination
if (indexHtml.includes('id="modal-power-builder"')) {
  throw new Error('Expected redundant modal-power-builder to be eliminated from index.html');
}
if (indexHtml.includes('id="btn-quick-add-power"')) {
  throw new Error('Expected redundant btn-quick-add-power to be eliminated from index.html');
}
if (!appJs.includes("document.getElementById('btn-open-custom-power-builder')?.addEventListener('click', () => {") ||
    !appJs.includes("this.addNewCustomPower();")) {
  throw new Error('Expected Build new power button to directly call addNewCustomPower()');
}
console.log('✓ 3. Redundant modal and quick button eliminated; Build new power creates power record directly');

// 4. Action Extra, Flaw & Conflict Checking
const actionExtra = EXTRAS_CATALOG.find(e => e.id === 'action_extra');
const actionFlaw = FLAWS_CATALOG.find(f => f.id === 'action_flaw');
const reactionExtra = EXTRAS_CATALOG.find(e => e.id === 'reaction');

if (!actionExtra || actionExtra.cost !== 1 || actionExtra.isFlat) {
  throw new Error('Expected action_extra (+1/rank) in EXTRAS_CATALOG');
}
if (!actionFlaw || actionFlaw.cost !== 1 || actionFlaw.isFlat) {
  throw new Error('Expected action_flaw (-1/rank) in FLAWS_CATALOG');
}
if (!reactionExtra || reactionExtra.cost !== 3) {
  throw new Error('Expected reaction (+3/rank) in EXTRAS_CATALOG');
}

// Conflict checks: cannot combine action_extra and action_flaw
const damageEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage'); // Standard action base
const flightEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'flight'); // Free action base

// Cannot add action_flaw to Standard action effect
const flawOnStandard = isModifierLegalForEffect(actionFlaw, damageEffect, [], []);
if (flawOnStandard.legal) {
  throw new Error('Expected action_flaw to be illegal on Standard action effect');
}

// Cannot add action_extra to Free action effect
const extraOnFree = isModifierLegalForEffect(actionExtra, flightEffect, [], []);
if (extraOnFree.legal) {
  throw new Error('Expected action_extra to be illegal on Free action effect');
}

// Incompatible combo check
const conflictValidation = validateModifierLegality(damageEffect, [{ id: 'action_extra', rank: 1 }], [{ id: 'action_flaw', rank: 1 }]);
if (conflictValidation.valid || !conflictValidation.errors.some(err => err.includes('Action'))) {
  throw new Error('Expected validation error when combining action_extra and action_flaw');
}

// Dynamic Action derivation in computePowerEffectiveStats
const standardDamageStats = computePowerEffectiveStats(damageEffect, [], []);
if (standardDamageStats.action !== 'Standard') {
  throw new Error(`Expected base damage action to be Standard, got ${standardDamageStats.action}`);
}

const moveDamageStats = computePowerEffectiveStats(damageEffect, [{ id: 'action_extra', rank: 1 }], []);
if (moveDamageStats.action !== 'Move') {
  throw new Error(`Expected 1 rank of action_extra on Damage to yield Move action, got ${moveDamageStats.action}`);
}

const freeDamageStats = computePowerEffectiveStats(damageEffect, [{ id: 'action_extra', rank: 2 }], []);
if (freeDamageStats.action !== 'Free') {
  throw new Error(`Expected 2 ranks of action_extra on Damage to yield Free action, got ${freeDamageStats.action}`);
}

const reactionDamageStats = computePowerEffectiveStats(damageEffect, [{ id: 'reaction', rank: 1 }], []);
if (reactionDamageStats.action !== 'Reaction') {
  throw new Error(`Expected reaction extra to yield Reaction action, got ${reactionDamageStats.action}`);
}

const moveFlightStats = computePowerEffectiveStats(flightEffect, [], [{ id: 'action_flaw', rank: 1 }]);
if (moveFlightStats.action !== 'Move') {
  throw new Error(`Expected 1 rank of action_flaw on Flight to yield Move action, got ${moveFlightStats.action}`);
}

const standardFlightStats = computePowerEffectiveStats(flightEffect, [], [{ id: 'action_flaw', rank: 2 }]);
if (standardFlightStats.action !== 'Standard') {
  throw new Error(`Expected 2 ranks of action_flaw on Flight to yield Standard action, got ${standardFlightStats.action}`);
}
console.log('✓ 4. Dynamic Action modifiers and conflict validation verified');

// 5. Measurements in Real-Time Effect Stats & No Vertical Bars
const rangedDamageRank8 = computePowerEffectiveStats(
  POWER_EFFECTS_CATALOG.find(e => e.id === 'blast'),
  [],
  [],
  null,
  8
);
if (rangedDamageRank8.rangeDisplay !== 'Ranged (1 mile)') {
  throw new Error(`Expected Ranged (1 mile) for Rank 8 Ranged Damage, got "${rangedDamageRank8.rangeDisplay}"`);
}

const closeDamage = computePowerEffectiveStats(
  damageEffect,
  [],
  [],
  null,
  10
);
if (closeDamage.rangeDisplay !== 'Close (5 ft.)') {
  throw new Error(`Expected Close (5 ft.) for Close Damage, got "${closeDamage.rangeDisplay}"`);
}

const closeDamageWithReach = computePowerEffectiveStats(
  damageEffect,
  [{ id: 'reach', rank: 2 }],
  [],
  null,
  10
);
if (closeDamageWithReach.rangeDisplay !== 'Close (15 ft.)') {
  throw new Error(`Expected Close (15 ft.) with 2 ranks Reach, got "${closeDamageWithReach.rangeDisplay}"`);
}

const personalFlight = computePowerEffectiveStats(
  flightEffect,
  [],
  [],
  null,
  10
);
if (personalFlight.rangeDisplay !== 'Personal (Self)') {
  throw new Error(`Expected Personal (Self) for Flight, got "${personalFlight.rangeDisplay}"`);
}

// Verify app.js power card stats row has no vertical bar separators
if (appJs.includes(".join(' | ')")) {
  throw new Error('Found deprecated ".join(\' | \')" in js/app.js power stats bar');
}
console.log('✓ 5. Range measurements in parentheses and clean stat bar without vertical bars verified');

// 6. Dedicated Power Feats & Drawbacks Row
if (!appJs.includes('⭐ Power Feats (+Flat PP Extras)') ||
    !appJs.includes('⚠️ Drawbacks (-Flat PP & Devices)')) {
  throw new Error('Expected dedicated Power Feats and Drawbacks columns in js/app.js');
}
if (!appJs.includes('btn-add-feat') || !appJs.includes('btn-add-drawback')) {
  throw new Error('Missing Power Feat and Drawback add buttons');
}
console.log('✓ 6. Dedicated Power Feats and Drawbacks row with full validation confirmed');

// 7. Bidirectional [ ] Linked Checkbox on Effects
if (!appJs.includes('cb-effect-linked')) {
  throw new Error('Missing cb-effect-linked checkbox class in js/app.js');
}
if (!appJs.includes('targetPower.isLinked = true;') || !appJs.includes('targetPower.linkedToId = p.id;')) {
  throw new Error('Expected bidirectional linking of target power when Linked checkbox is checked');
}
if (!appJs.includes('targetPower.isLinked = false;') || !appJs.includes('targetPower.linkedToId = null;')) {
  throw new Error('Expected bidirectional unlinking when Linked checkbox is unchecked');
}
console.log('✓ 7. Bidirectional [ ] Linked effect checkbox verified');

// 8. Arrays & Dynamic Primary Effect Checkbox
if (!appJs.includes('cb-primary-dynamic')) {
  throw new Error('Missing cb-primary-dynamic checkbox for array primary effect in js/app.js');
}
if (!appJs.includes('btn-add-ae-effect')) {
  throw new Error('Missing alternate effects add button in js/app.js');
}
if (parseFloat(versionJson.version) < 3.20 && !appJs.includes('cb-ae-dynamic')) {
  throw new Error('Missing alternate effects dynamic checkbox in js/app.js');
}

// Array cost test with dynamic primary and dynamic AE
const testArrayPower = {
  id: 'p_array_1',
  name: 'Elemental Mastery',
  rank: 10,
  effect: POWER_EFFECTS_CATALOG.find(e => e.id === 'blast'), // 2 PP/rank = 20 PP
  isDynamicArray: true, // +1 PP base
  alternateEffects: [
    { id: 'ae_1', name: 'Flame Cone', isDynamic: true, rank: 10 }, // 2 PP
    { id: 'ae_2', name: 'Fire Shield', isDynamic: false, rank: 10 } // 1 PP
  ]
};
const arrayCost = calculatePowerCost(testArrayPower);
// 20 (base) + 1 (dynamic array) + 2 (dynamic AE) + 1 (standard AE) = 24 PP
if (arrayCost !== 24) {
  throw new Error(`Expected Array cost 24 PP, got ${arrayCost} PP`);
}
console.log('✓ 8. Power Arrays with Dynamic primary checkbox and AE calculation verified');

// 9. Affliction Degrees without "failure by"
if (appJs.includes('Failure by 1-5') || appJs.includes('Failure by 6-10') || appJs.includes('Failure by 11+')) {
  throw new Error('Found obsolete "Failure by" in Affliction degree labels');
}
if (!appJs.includes('1st Degree (1-5):') ||
    !appJs.includes('2nd Degree (6-10):') ||
    !appJs.includes('3rd Degree (11+):')) {
  throw new Error('Expected clean failure ranges: 1st Degree (1-5):, 2nd Degree (6-10):, 3rd Degree (11+):');
}
console.log('✓ 9. Affliction degree labels cleanly format failure ranges without "failure by"');

console.log('\n=== ALL v3.19 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
