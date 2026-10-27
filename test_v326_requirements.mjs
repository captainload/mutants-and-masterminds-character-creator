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

console.log('=== Running v3.26 Requirements Test Suite ===\n');

// 1. Version Check: 3.26 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.26') {
  throw new Error(`Expected version.json to be 3.26, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.26')) {
  throw new Error('Expected index.html title to reference Character Editor v3.26');
}
if (!indexHtml.includes('css/styles.css?v=3.26')) {
  throw new Error('Expected styles.css query param to be v3.26');
}
if (!indexHtml.includes('js/app.js?v=3.26')) {
  throw new Error('Expected app.js script query param to be v3.26');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.26'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.26"');
}
console.log('✓ 1. Version 3.26 verified across version.json, index.html, and js/app.js');

// 2. Affects Others classification: non-unique modifier
const affectsOthers = EXTRAS_CATALOG.find(e => e.id === 'affects_others');
if (!affectsOthers) throw new Error('affects_others not found in EXTRAS_CATALOG');
if (affectsOthers.isUnique !== false) {
  throw new Error(`Expected Affects Others isUnique to be false, got ${affectsOthers.isUnique}`);
}
if (affectsOthers.name.startsWith('★')) {
  throw new Error(`Expected Affects Others name to not have star ★ prefix, got "${affectsOthers.name}"`);
}
if (affectsOthers.name !== 'Affects Others') {
  throw new Error(`Expected Affects Others name to be "Affects Others", got "${affectsOthers.name}"`);
}
console.log('✓ 2. Affects Others correctly classified as non-unique (isUnique: false, no star prefix)');

// 3. Modifier Filtering: Attack modifiers on non-attack effects
const nonAttackEffects = ['flight', 'protection', 'speed', 'quickness', 'senses', 'comprehend', 'regeneration', 'teleport'];
const attackExtras = ['accurate', 'homing', 'multiattack', 'penetrating', 'ricochet', 'secondary_effect', 'contagious'];
const attackFlaws = ['inaccurate', 'diminished_range', 'grab_based'];

for (const effId of nonAttackEffects) {
  const effect = POWER_EFFECTS_CATALOG.find(e => e.id === effId);
  if (!effect) throw new Error(`Missing effect ${effId} in catalog`);

  for (const exId of attackExtras) {
    const mod = EXTRAS_CATALOG.find(e => e.id === exId);
    const legality = isModifierLegalForEffect(mod, effect, [], []);
    if (legality.legal) {
      throw new Error(`Expected attack extra "${mod.name}" to be illegal on non-attack effect "${effect.name}"`);
    }
    if (!legality.reason.toLowerCase().includes('attack')) {
      throw new Error(`Expected rejection reason to mention attack, got: "${legality.reason}"`);
    }
  }

  for (const flId of attackFlaws) {
    const mod = FLAWS_CATALOG.find(f => f.id === flId);
    const legality = isModifierLegalForEffect(mod, effect, [], []);
    if (legality.legal) {
      throw new Error(`Expected attack flaw "${mod.name}" to be illegal on non-attack effect "${effect.name}"`);
    }
    if (!legality.reason.toLowerCase().includes('attack')) {
      throw new Error(`Expected rejection reason to mention attack, got: "${legality.reason}"`);
    }
  }
}
console.log('✓ 3. Attack extras and flaws strictly forbidden on non-attack effects');

// 4. Attack extra conversion: Personal effects with Attack extra become attack effects
const flightEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'flight');
const attackExtraDef = EXTRAS_CATALOG.find(e => e.id === 'attack');
const accurateDef = EXTRAS_CATALOG.find(e => e.id === 'accurate');
const multiattackDef = EXTRAS_CATALOG.find(e => e.id === 'multiattack');
const contagiousDef = EXTRAS_CATALOG.find(e => e.id === 'contagious');
const inaccurateDef = FLAWS_CATALOG.find(f => f.id === 'inaccurate');
const grabBasedDef = FLAWS_CATALOG.find(f => f.id === 'grab_based');
const homingDef = EXTRAS_CATALOG.find(e => e.id === 'homing');
const ricochetDef = EXTRAS_CATALOG.find(e => e.id === 'ricochet');
const diminishedRangeDef = FLAWS_CATALOG.find(f => f.id === 'diminished_range');

// Flight with Attack extra (Close range attack)
const flightAttackExtras = [{ id: 'attack', rank: 1, cost: 0, isFlat: false }];
if (!isModifierLegalForEffect(accurateDef, flightEffect, flightAttackExtras, []).legal) {
  throw new Error('Expected Accurate to be legal on Flight with Attack extra');
}
if (!isModifierLegalForEffect(multiattackDef, flightEffect, flightAttackExtras, []).legal) {
  throw new Error('Expected Multiattack to be legal on Flight with Attack extra');
}
if (!isModifierLegalForEffect(contagiousDef, flightEffect, flightAttackExtras, []).legal) {
  throw new Error('Expected Contagious to be legal on Flight with Attack extra');
}
if (!isModifierLegalForEffect(inaccurateDef, flightEffect, flightAttackExtras, []).legal) {
  throw new Error('Expected Inaccurate to be legal on Flight with Attack extra');
}
if (!isModifierLegalForEffect(grabBasedDef, flightEffect, flightAttackExtras, []).legal) {
  throw new Error('Expected Grab-Based to be legal on Flight with Attack extra (Close range)');
}
// Homing, Ricochet, Diminished Range require Ranged attacks; Flight (Attack) is Close range
if (isModifierLegalForEffect(homingDef, flightEffect, flightAttackExtras, []).legal) {
  throw new Error('Expected Homing to be illegal on Close attack');
}
if (isModifierLegalForEffect(ricochetDef, flightEffect, flightAttackExtras, []).legal) {
  throw new Error('Expected Ricochet to be illegal on Close attack');
}
if (isModifierLegalForEffect(diminishedRangeDef, flightEffect, flightAttackExtras, []).legal) {
  throw new Error('Expected Diminished Range to be illegal on Close attack');
}

// When Increased Range is added (making Flight Attack Ranged), ranged attack modifiers unlock
const flightRangedAttackExtras = [
  { id: 'attack', rank: 1, cost: 0, isFlat: false },
  { id: 'increased_range', rank: 1, cost: 1, isFlat: false }
];
if (!isModifierLegalForEffect(homingDef, flightEffect, flightRangedAttackExtras, []).legal) {
  throw new Error('Expected Homing to be legal on Flight (Attack) + Increased Range (Ranged)');
}
if (!isModifierLegalForEffect(ricochetDef, flightEffect, flightRangedAttackExtras, []).legal) {
  throw new Error('Expected Ricochet to be legal on Flight (Attack) + Increased Range (Ranged)');
}
if (!isModifierLegalForEffect(diminishedRangeDef, flightEffect, flightRangedAttackExtras, []).legal) {
  throw new Error('Expected Diminished Range to be legal on Flight (Attack) + Increased Range (Ranged)');
}
if (isModifierLegalForEffect(grabBasedDef, flightEffect, flightRangedAttackExtras, []).legal) {
  throw new Error('Expected Grab-Based to be illegal on Ranged attack');
}
console.log('✓ 4. Attack extra conversion and range-dependent attack modifiers verified');

// 5. Affects Others and Attack mutual exclusivity & Personal range rules
const protectionEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'protection');
const blastEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'blast');

// Affects Others on Personal power
if (!isModifierLegalForEffect(affectsOthers, protectionEffect, [], []).legal) {
  throw new Error('Expected Affects Others to be legal on Personal power (Protection)');
}
// Affects Others on Ranged power (illegal)
if (isModifierLegalForEffect(affectsOthers, blastEffect, [], []).legal) {
  throw new Error('Expected Affects Others to be illegal on Ranged power (Blast)');
}
// Cannot combine Affects Others and Attack
if (isModifierLegalForEffect(attackExtraDef, protectionEffect, [{ id: 'affects_others', rank: 1 }], []).legal) {
  throw new Error('Expected Attack extra to be illegal when power already has Affects Others');
}
if (isModifierLegalForEffect(affectsOthers, protectionEffect, [{ id: 'attack', rank: 1 }], []).legal) {
  throw new Error('Expected Affects Others to be illegal when power already has Attack');
}
console.log('✓ 5. Affects Others & Attack Personal range requirement and mutual exclusivity verified');

// 6. validateModifierLegality detects all illegal combinations as errors
const invalidPower1 = {
  effect: flightEffect,
  extras: [{ id: 'accurate', name: 'Accurate', rank: 1 }],
  flaws: [{ id: 'inaccurate', name: 'Inaccurate', rank: 1 }]
};
const valResult1 = validateModifierLegality(invalidPower1.effect, invalidPower1.extras, invalidPower1.flaws);
if (!valResult1.errors.some(e => e.includes('Accurate') && e.includes('attack'))) {
  throw new Error(`Expected validation error for Accurate on Flight, got: ${JSON.stringify(valResult1.errors)}`);
}
if (!valResult1.errors.some(e => e.includes('Inaccurate') && e.includes('attack'))) {
  throw new Error(`Expected validation error for Inaccurate on Flight, got: ${JSON.stringify(valResult1.errors)}`);
}

const invalidPower2 = {
  effect: protectionEffect,
  extras: [
    { id: 'affects_others', name: 'Affects Others', rank: 1 },
    { id: 'attack', name: 'Attack', rank: 1 }
  ],
  flaws: []
};
const valResult2 = validateModifierLegality(invalidPower2.effect, invalidPower2.extras, invalidPower2.flaws);
if (!valResult2.errors.some(e => e.includes('Cannot combine Affects Others and Attack'))) {
  throw new Error(`Expected validation error for combining Affects Others and Attack, got: ${JSON.stringify(valResult2.errors)}`);
}
console.log('✓ 6. validateModifierLegality properly reports all filter violations as errors');

// 7. Click-Outside Pop-Up and Modal Dismissal Logic
if (!appJs.includes("document.querySelectorAll('.modal-overlay').forEach(overlay =>")) {
  throw new Error('Expected app.js to wire up click listener on all .modal-overlay elements');
}
if (!appJs.includes('if (e.target === overlay)')) {
  throw new Error('Expected click outside check (e.target === overlay) in app.js');
}
if (!appJs.includes("this.closeModal(modalId)")) {
  throw new Error('Expected modal closing logic on outside click in app.js');
}
if (!appJs.includes("btn-alert-dialog-ok") || !appJs.includes("btn-confirm-dialog-close") || !appJs.includes("btn-prompt-dialog-close")) {
  throw new Error('Expected dialog buttons to be triggered on backdrop click in app.js');
}
if (!appJs.includes("if (e.key === 'Escape')")) {
  throw new Error('Expected Escape key handler to close active modal or popup');
}
console.log('✓ 7. Modal & pop-up click-outside dismissal and Escape handler verified');

console.log('\n=== ALL v3.26 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
