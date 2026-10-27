import fs from 'fs';
import {
  isModifierLegalForEffect,
  validateModifierLegality,
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  computePowerEffectiveStats
} from './js/rules.js';

console.log('=== Running v3.13 Requirements Test Suite ===\n');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (parseFloat(versionJson.version) < 3.13) {
  throw new Error(`Expected version.json to be >= 3.13, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes(`v${versionJson.version}`)) {
  throw new Error(`Expected index.html to reference v${versionJson.version}`);
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes(`CURRENT_VERSION = '${versionJson.version}'`)) {
  throw new Error(`Expected js/app.js to define CURRENT_VERSION = "${versionJson.version}"`);
}
console.log(`✓ 1. Version ${versionJson.version} verified across version.json, index.html, and js/app.js`);

// 2. Font Size Scaling Tests
const css = fs.readFileSync('css/styles.css', 'utf8');

// Check that root font variables have been boosted
const xsMatch = css.match(/--font-size-xs:\s*max\(([^)]+)\);/);
if (!xsMatch || !xsMatch[1].includes('11pt')) {
  throw new Error('Expected --font-size-xs to be boosted to at least 11pt');
}

const smMatch = css.match(/--font-size-sm:\s*max\(([^)]+)\);/);
if (!smMatch || !smMatch[1].includes('12pt')) {
  throw new Error('Expected --font-size-sm to be boosted to at least 12pt');
}

const baseMatch = css.match(/--font-size-base:\s*max\(([^)]+)\);/);
if (!baseMatch || !baseMatch[1].includes('13pt')) {
  throw new Error('Expected --font-size-base to be boosted to at least 13pt');
}
console.log('✓ 2. Typography scale verified: --font-size-xs >= 11pt, --font-size-sm >= 12pt, --font-size-base >= 13pt');

// 3. Flaws header clean-up (remove "& Devices" confusion)
if (appJs.includes('➖ Flaws & Devices')) {
  throw new Error('Found deprecated "➖ Flaws & Devices" in js/app.js. Should be "➖ Flaws"');
}
if (!appJs.includes('➖ Flaws (★ =')) {
  throw new Error('Expected "➖ Flaws (★ =" header in js/app.js');
}
console.log('✓ 3. Flaws header verified clean ("➖ Flaws (★ = ...)") without ambiguous container conflation');

// 4. Modifier Legality & Single-Instance Prevention Tests
const blastEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage'); // Ranged or Close
const flightEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'flight'); // Personal

// A. Single-instance prevention: cannot add same extra twice
const accurateDef = EXTRAS_CATALOG.find(e => e.id === 'accurate');
const checkAccurateDup = isModifierLegalForEffect(accurateDef, blastEffect, [{ id: 'accurate', rank: 1 }], []);
if (checkAccurateDup.legal) {
  throw new Error('Expected isModifierLegalForEffect to block duplicate Accurate extra');
}

// B. Single-instance in flaws: cannot add same flaw twice
const activationDef = FLAWS_CATALOG.find(f => f.id === 'activation_move');
const checkActDup = isModifierLegalForEffect(activationDef, blastEffect, [], [{ id: 'activation_move', rank: 1 }]);
if (checkActDup.legal) {
  throw new Error('Expected isModifierLegalForEffect to block duplicate Activation flaw');
}

// C. Mutual exclusivity: Removable and Easily Removable
const easilyRemovableDef = FLAWS_CATALOG.find(f => f.id === 'easily_removable');
const checkDeviceConflict = isModifierLegalForEffect(easilyRemovableDef, blastEffect, [], [{ id: 'removable', rank: 1 }]);
if (checkDeviceConflict.legal) {
  throw new Error('Expected isModifierLegalForEffect to block Easily Removable when Removable is already active');
}

// D. Mutual exclusivity: Move Activation and Standard Activation
const stdActDef = FLAWS_CATALOG.find(f => f.id === 'activation_standard');
const checkActConflict = isModifierLegalForEffect(stdActDef, blastEffect, [], [{ id: 'activation_move', rank: 1 }]);
if (checkActConflict.legal) {
  throw new Error('Expected isModifierLegalForEffect to block Standard Activation when Move Activation is already active');
}

// E. Area shape mutual exclusivity: Cannot have Burst AND Cone
const coneDef = EXTRAS_CATALOG.find(e => e.id === 'area_cone');
const checkAreaConflict = isModifierLegalForEffect(coneDef, blastEffect, [{ id: 'area_burst', rank: 1 }], []);
if (checkAreaConflict.legal) {
  throw new Error('Expected isModifierLegalForEffect to block multiple different Area shapes');
}

// F. Personal Range rules: Cannot add Increased Range or Area to Personal effect without Affects Others / Attack
const incRangeDef = EXTRAS_CATALOG.find(e => e.id === 'increased_range');
const checkPersonalRange = isModifierLegalForEffect(incRangeDef, flightEffect, [], []);
if (checkPersonalRange.legal) {
  throw new Error('Expected Increased Range on Personal effect without Affects Others/Attack to be illegal');
}

// G. validateModifierLegality test with illegal combo
const validationWithDup = validateModifierLegality(blastEffect, [{ id: 'accurate' }, { id: 'accurate' }], []);
if (validationWithDup.valid) {
  throw new Error('Expected validateModifierLegality to fail on duplicate modifier');
}

const validationWithConflictingAreas = validateModifierLegality(blastEffect, [{ id: 'area_burst' }, { id: 'area_line' }], []);
if (validationWithConflictingAreas.valid) {
  throw new Error('Expected validateModifierLegality to fail on multiple Area shapes');
}

console.log('✓ 4. Single-instance modifier enforcement & illegal combo prevention verified successfully');

// 5. Effect Stats Summary Bar Tests
if (!css.includes('.power-stats-summary-bar')) {
  throw new Error('Expected .power-stats-summary-bar in css/styles.css');
}
if (!appJs.includes('power-stats-summary-bar')) {
  throw new Error('Expected js/app.js to render power-stats-summary-bar');
}
if (parseFloat(versionJson.version) < 3.20) {
  if (!appJs.includes('EFFECT STATS SUMMARY:')) {
    throw new Error('Expected "EFFECT STATS SUMMARY:" label in js/app.js');
  }
} else {
  if (!appJs.includes('Stats:') && !appJs.includes('EFFECT STATS SUMMARY:')) {
    throw new Error('Expected "Stats:" label in js/app.js');
  }
}

// Check derived calculation works dynamically
const baseDamageStats = computePowerEffectiveStats(blastEffect, [], []);
if (baseDamageStats.action !== 'Standard' || baseDamageStats.effectiveRange !== 'Close' || baseDamageStats.effectiveDuration !== 'Instant') {
  throw new Error(`Unexpected base damage stats: ${JSON.stringify(baseDamageStats)}`);
}

const rangedDamageStats = computePowerEffectiveStats(blastEffect, [{ id: 'increased_range', rank: 1 }], []);
if (rangedDamageStats.effectiveRange !== 'Ranged') {
  throw new Error(`Expected Increased Range to modify range to Ranged, got ${rangedDamageStats.effectiveRange}`);
}

const areaDamageStats = computePowerEffectiveStats(blastEffect, [{ id: 'area_burst', rank: 1 }], []);
if (!areaDamageStats.area.includes('Burst')) {
  throw new Error(`Expected Area Burst to modify area description, got ${areaDamageStats.area}`);
}

console.log('✓ 5. Effect Stats Summary Bar and dynamic derived stat calculations verified');

console.log('\n=== ALL v3.13 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
