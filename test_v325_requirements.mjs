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

console.log('=== Running v3.25 Requirements Test Suite ===\n');

// 1. Version Check: 3.25 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.25') {
  throw new Error(`Expected version.json to be 3.25, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.25')) {
  throw new Error('Expected index.html title to reference Character Editor v3.25');
}
if (!indexHtml.includes('css/styles.css?v=3.25')) {
  throw new Error('Expected styles.css query param to be v3.25');
}
if (!indexHtml.includes('js/app.js?v=3.25')) {
  throw new Error('Expected app.js script query param to be v3.25');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.25'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.25"');
}
console.log('✓ 1. Version 3.25 verified across version.json, index.html, and js/app.js');

// 2. Alternate Effects Unique Modifiers & Device Flaws Filtering
const damageEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage');
const blastEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'blast');
const selectiveDef = EXTRAS_CATALOG.find(e => e.id === 'selective');
const strengthBasedDef = EXTRAS_CATALOG.find(e => e.id === 'strength_based');
const removableDef = FLAWS_CATALOG.find(f => f.id === 'removable');
const easilyRemovableDef = FLAWS_CATALOG.find(f => f.id === 'easily_removable');
const grabBasedDef = FLAWS_CATALOG.find(f => f.id === 'grab_based');

// Test A: Primary power with unique modifier (Selective extra + Removable flaw)
const primaryPower = {
  id: 'p_main',
  name: 'Main Laser',
  effect: blastEffect,
  rank: 10,
  extras: [
    { id: 'area_burst', name: 'Area (Burst 30ft)', rank: 1, cost: 1, isFlat: false },
    { id: 'selective', name: '★ Selective', rank: 1, cost: 1, isFlat: false, isUnique: true }
  ],
  flaws: [
    { id: 'removable', name: 'Removable', cost: 0, isFlat: false, isDevice: true }
  ]
};

const alternateEffect = {
  id: 'ae_alt1',
  name: 'Alt Stun',
  effect: damageEffect,
  rank: 10,
  extras: [],
  flaws: []
};

// Check isModifierLegalForEffect for AE against primaryPower
const selectiveOnAe = isModifierLegalForEffect(selectiveDef, damageEffect, [{ id: 'area_burst', rank: 1 }], [], primaryPower);
if (selectiveOnAe.legal) {
  throw new Error('Expected isModifierLegalForEffect to disallow Selective on AE when primary effect has it');
}
if (!selectiveOnAe.reason.includes('already has')) {
  throw new Error(`Expected reason to indicate primary effect already has unique modifier, got: ${selectiveOnAe.reason}`);
}

// Device flaws should never be legal on an Alternate Effect
const removableOnAe = isModifierLegalForEffect(removableDef, damageEffect, [], [], primaryPower);
if (removableOnAe.legal) {
  throw new Error('Expected Removable to be disallowed on Alternate Effects');
}

const easilyRemovableOnAe = isModifierLegalForEffect(easilyRemovableDef, damageEffect, [], [], primaryPower);
if (easilyRemovableOnAe.legal) {
  throw new Error('Expected Easily Removable to be disallowed on Alternate Effects');
}

// Check validateModifierLegality detects conflict if AE contains duplicate unique modifier or device flaw
const aeWithConflict = {
  effect: damageEffect,
  extras: [{ id: 'selective', name: '★ Selective' }],
  flaws: [{ id: 'removable', name: 'Removable' }]
};
const valResult = validateModifierLegality(aeWithConflict.effect, aeWithConflict.extras, aeWithConflict.flaws, primaryPower);
if (valResult.errors.length < 2) {
  throw new Error(`Expected at least 2 errors for unique extra and device flaw on AE, got: ${JSON.stringify(valResult.errors)}`);
}

// Check that app.js filters out unique modifiers in renderModifierColumns
if (!appJs.includes('if (isAlternateEffect && ex.isUnique && mainExtraIds.has(ex.id)) return false;')) {
  throw new Error('Expected renderModifierColumns in js/app.js to filter out unique extras present in main power');
}
if (!appJs.includes('if (isAlternateEffect && fl.isDevice) return false;')) {
  throw new Error('Expected renderModifierColumns in js/app.js to filter out device flaws for alternate effects');
}
if (!appJs.includes('if (isAlternateEffect && fl.isUnique && mainFlawIds.has(fl.id)) return false;')) {
  throw new Error('Expected renderModifierColumns in js/app.js to filter out unique flaws present in main power');
}
if (!appJs.includes('validateModifierLegality(ae.effect, ae.extras, ae.flaws, p)')) {
  throw new Error('Expected validateModifierLegality for AE to pass primary power context');
}

console.log('✓ 2. Alternate Effects unique modifiers and device flaws filtering verified');

// 3. HTML Rendering in Modifier and Effect Descriptions
if (!appJs.includes('isHtml || (typeof message === \'string\' && /<[a-z][\\s\\S]*>/i.test(message))')) {
  throw new Error('Expected showAlertDialog to detect and render HTML content');
}
if (!appJs.includes('msgEl.style.whiteSpace = \'normal\'') || !appJs.includes('msgEl.innerHTML = message')) {
  throw new Error('Expected showAlertDialog to set innerHTML and normal white-space for HTML messages');
}
if (!appJs.includes('showModifierDescriptionDialog(modDef)') || !appJs.includes('isHtml: true')) {
  throw new Error('Expected showModifierDescriptionDialog to pass isHtml: true');
}
if (!appJs.includes('showEffectDescriptionDialog(effectDef)') || !appJs.includes('isHtml: true')) {
  throw new Error('Expected showEffectDescriptionDialog to pass isHtml: true');
}

console.log('✓ 3. HTML rendering in modifier and effect description dialogs verified');

console.log('\n=== ALL v3.25 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
