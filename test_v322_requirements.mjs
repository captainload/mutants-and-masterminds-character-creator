import fs from 'fs';
import {
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  calculatePowerCost,
  computePowerEffectiveStats,
  validateModifierLegality,
  isModifierLegalForEffect
} from './js/rules.js';

console.log('=== Running v3.22 Requirements Test Suite ===\n');

// 1. Version Check: >= 3.22 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
const verNum = parseFloat(versionJson.version);
if (verNum < 3.22) {
  throw new Error(`Expected version.json to be >= 3.22, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (verNum === 3.22) {
  if (!indexHtml.includes('Character Architect v3.22')) {
    throw new Error('Expected index.html title to reference v3.22');
  }
} else {
  if (!indexHtml.includes(`Character Editor v${versionJson.version}`)) {
    throw new Error(`Expected index.html title to reference v${versionJson.version}`);
  }
}
if (!indexHtml.includes(`css/styles.css?v=${versionJson.version}`)) {
  throw new Error(`Expected styles.css query param to be v${versionJson.version}`);
}
if (!indexHtml.includes(`js/app.js?v=${versionJson.version}`)) {
  throw new Error(`Expected app.js script query param to be v${versionJson.version}`);
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes(`CURRENT_VERSION = '${versionJson.version}'`)) {
  throw new Error(`Expected js/app.js to define CURRENT_VERSION = "${versionJson.version}"`);
}
console.log(`✓ 1. Version ${versionJson.version} verified across version.json, index.html, and js/app.js`);

// 2. No automatically added descriptors; placeholder text used
if (!appJs.includes('placeholder="e.g. Fire, Energy, Technology"')) {
  throw new Error('Expected placeholder text for descriptors');
}
// Check that power profile loading does not auto-fill matchedProfile.descriptor
if (appJs.includes('descriptor: matchedProfile.descriptor')) {
  throw new Error('Power profiles should not auto-add descriptor; use placeholder text instead');
}
console.log('✓ 2. Descriptors are not automatically populated; placeholder text confirmed');

// 3. Drawback dropdown removed; all flaws in flaws catalog; Quirk description field
if (appJs.includes('select-add-drawback') || appJs.includes('btn-add-drawback')) {
  throw new Error('Found deprecated drawback dropdown/buttons in js/app.js - drawbacks dropdown must be removed');
}
if (!appJs.includes('input-quirk-desc')) {
  throw new Error('Expected input-quirk-desc field for Quirk flaw description in js/app.js');
}
console.log('✓ 3. Drawbacks dropdown removed; all flaws unified; Quirk custom description input confirmed');

// 4. Action extra and Action flaw cancel each other out
const damageEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage'); // Standard action base
const moveEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'teleport'); // Move action base
const freeEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'flight'); // Free action base

// Equal ranks cancel out to base action
const cancelStandard = computePowerEffectiveStats(damageEffect, [{ id: 'action_extra', rank: 1 }], [{ id: 'action_flaw', rank: 1 }]);
if (cancelStandard.action !== 'Standard') {
  throw new Error(`Expected Action extra and flaw rank 1 to cancel out to Standard, got ${cancelStandard.action}`);
}

const cancelMove = computePowerEffectiveStats(moveEffect, [{ id: 'action_extra', rank: 1 }], [{ id: 'action_flaw', rank: 1 }]);
if (cancelMove.action !== 'Move') {
  throw new Error(`Expected Action extra and flaw rank 1 on Move effect to cancel out to Move, got ${cancelMove.action}`);
}

const cancelFree = computePowerEffectiveStats(freeEffect, [{ id: 'action_extra', rank: 1 }], [{ id: 'action_flaw', rank: 1 }]);
if (cancelFree.action !== 'Free') {
  throw new Error(`Expected Action extra and flaw rank 1 on Free effect to cancel out to Free, got ${cancelFree.action}`);
}

// Extra 2 ranks vs Flaw 1 rank -> net +1 faster
const netFaster = computePowerEffectiveStats(damageEffect, [{ id: 'action_extra', rank: 2 }], [{ id: 'action_flaw', rank: 1 }]);
if (netFaster.action !== 'Move') {
  throw new Error(`Expected net +1 faster on Standard to yield Move, got ${netFaster.action}`);
}

// Extra 1 rank vs Flaw 2 ranks on Free -> net -1 slower
const netSlower = computePowerEffectiveStats(freeEffect, [{ id: 'action_extra', rank: 1 }], [{ id: 'action_flaw', rank: 2 }]);
if (netSlower.action !== 'Move') {
  throw new Error(`Expected net -1 slower on Free to yield Move, got ${netSlower.action}`);
}

// Validation check allows combining with advisory
const actionComboVal = validateModifierLegality(damageEffect, [{ id: 'action_extra', rank: 1 }], [{ id: 'action_flaw', rank: 1 }]);
if (!actionComboVal.valid) {
  throw new Error('Action extra and Action flaw should be valid and cancel each other out without hard error');
}
if (!actionComboVal.warnings.some(w => w.includes('cancel each other out'))) {
  throw new Error('Expected advisory warning when Action extra and flaw cancel each other out');
}
console.log('✓ 4. Action extra and Action flaw cancellation logic and advisory verified');

// 5. Primary effects notes field
if (!appJs.includes('input-power-notes')) {
  throw new Error('Expected input-power-notes field in primary effect container in js/app.js');
}
console.log('✓ 5. Primary effect notes field verified in unified power container');

// 6. Flaw dropdown anchor box shortened to prevent overrun
if (!appJs.includes('max-width: calc(100% - 95px)') && !appJs.includes('max-width: calc(100% -')) {
  throw new Error('Expected max-width constraint on select dropdown anchor box');
}
if (!appJs.includes('flex-shrink: 0')) {
  throw new Error('Expected flex-shrink: 0 on add flaw/extra buttons to prevent margin overrun');
}
console.log('✓ 6. Flaw dropdown anchor box shortened with flex-shrink protection on Add button');

// 7. Centered app title and shifted identity fields
const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
if (!stylesCss.includes('.brand-title-centered') || !stylesCss.includes('text-align: center')) {
  throw new Error('Expected centered app title class in css/styles.css');
}
if (!stylesCss.includes('.header-fields-row')) {
  throw new Error('Expected .header-fields-row class in css/styles.css');
}
if (!indexHtml.includes('brand-title-centered')) {
  throw new Error('Expected brand-title-centered in index.html');
}
if (!indexHtml.includes('header-fields-row')) {
  throw new Error('Expected header-fields-row in index.html');
}
console.log('✓ 7. Centered app title above shifted downwards player/hero/campaign fields verified');

console.log('\n=== ALL v3.22 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
