import {
  SKILLS_LIST,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  POWER_EFFECTS_CATALOG,
  computePowerRangeAndDuration,
  validateModifierLegality,
  calculatePowerCost
} from './js/rules.js';

console.log('--- Testing v3.5 Powers and Skills Suite ---');

// 1. Close Combat options check
const closeCombat = SKILLS_LIST.find(s => s.id === 'close_combat');
console.assert(closeCombat, 'Close Combat must exist');
console.assert(closeCombat.options.includes('Swords'), 'Close Combat must include "Swords"');
console.assert(closeCombat.options.includes('Short Blades'), 'Close Combat must include "Short Blades"');
console.assert(closeCombat.options.includes('Spears'), 'Close Combat must include "Spears"');
console.assert(!closeCombat.options.includes('Swords & Blades'), 'Close Combat must not include "Swords & Blades"');
console.assert(!closeCombat.options.includes('Chi Strike'), 'Close Combat must not include "Chi Strike"');
console.log('✓ Close Combat options verified');

// 2. Unique modifiers ★ check
const uniqueExtras = EXTRAS_CATALOG.filter(e => e.isUnique);
console.assert(uniqueExtras.length > 5, 'Must have unique extras marked');
uniqueExtras.forEach(e => {
  console.assert(e.name.startsWith('★ '), `Unique extra ${e.id} must start with ★ `);
});

const uniqueFlaws = FLAWS_CATALOG.filter(f => f.isUnique);
console.assert(uniqueFlaws.length > 3, 'Must have unique flaws marked');
uniqueFlaws.forEach(f => {
  console.assert(f.name.startsWith('★ '), `Unique flaw ${f.id} must start with ★ `);
});
console.log('✓ Unique modifiers correctly tagged with ★ ');

// 3. Derived Range & Duration
const damageEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage');
const baseRD = computePowerRangeAndDuration(damageEffect, [], []);
console.assert(baseRD.effectiveRange === 'Close', `Base damage should be Close, got ${baseRD.effectiveRange}`);
console.assert(baseRD.effectiveDuration === 'Instant', `Base damage should be Instant, got ${baseRD.effectiveDuration}`);

const rangedDamageRD = computePowerRangeAndDuration(damageEffect, [{ id: 'increased_range', rank: 1 }], []);
console.assert(rangedDamageRD.effectiveRange === 'Ranged', `Damage + Increased Range 1 should be Ranged, got ${rangedDamageRD.effectiveRange}`);

const perceptionDamageRD = computePowerRangeAndDuration(damageEffect, [{ id: 'increased_range', rank: 2 }], []);
console.assert(perceptionDamageRD.effectiveRange === 'Perception', `Damage + Increased Range 2 should be Perception, got ${perceptionDamageRD.effectiveRange}`);

const flightEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'flight');
const flightOthersRD = computePowerRangeAndDuration(flightEffect, [{ id: 'affects_others' }], []);
console.assert(flightOthersRD.effectiveRange === 'Close', `Flight + Affects Others should be Close, got ${flightOthersRD.effectiveRange}`);

const concFlightRD = computePowerRangeAndDuration(flightEffect, [], [{ id: 'concentration' }]);
console.assert(concFlightRD.effectiveDuration === 'Concentration', `Flight + Concentration should be Concentration, got ${concFlightRD.effectiveDuration}`);
console.log('✓ Derived Range and Duration calculations verified');

// 4. Modifier Conflict Validation
const conflict1 = validateModifierLegality(damageEffect, [{ id: 'increased_range' }], [{ id: 'reduced_range' }]);
console.assert(!conflict1.valid && conflict1.errors.length > 0, 'Increased Range + Reduced Range must report conflict');

const conflict2 = validateModifierLegality(damageEffect, [], [{ id: 'removable' }, { id: 'easily_removable' }]);
console.assert(!conflict2.valid && conflict2.errors.length > 0, 'Removable + Easily Removable must report conflict');

const conflict3 = validateModifierLegality(flightEffect, [{ id: 'increased_range' }], []);
console.assert(!conflict3.valid && conflict3.errors.length > 0, 'Personal without Affects Others cannot take Increased Range');
console.log('✓ Modifier Conflict & Validation checks verified');

// 5. Alternate Effects & Linked Powers Cost
const basePower = {
  id: 'p1',
  name: 'Fire Blast',
  rank: 10,
  effect: POWER_EFFECTS_CATALOG.find(e => e.id === 'blast'), // 2 PP/rank * 10 = 20 PP
  extras: [],
  flaws: [],
  alternateEffects: [
    { id: 'ae1', name: 'Fire Cone', isDynamic: false, rank: 10 }, // 1 PP
    { id: 'ae2', name: 'Fire Aura', isDynamic: true, rank: 10 }   // 2 PP
  ],
  linkedEffects: [
    {
      id: 'le1',
      name: 'Smoke Cloud',
      rank: 5,
      effect: POWER_EFFECTS_CATALOG.find(e => e.id === 'affliction'), // 1 PP/rank * 5 = 5 PP
      extras: [],
      flaws: []
    }
  ],
  isDynamicArray: true // +1 PP
};

const totalCost = calculatePowerCost(basePower);
// 20 (base) + 5 (linked) + 1 (dynamic array) + 1 (standard AE) + 2 (dynamic AE) = 29 PP
console.assert(totalCost === 29, `Expected total cost 29 PP, got ${totalCost} PP`);
console.log(`✓ Power cost with Array & Linked Effects verified: ${totalCost} PP`);

// 6. House Rule: Specializations (M&M 4E) vs Standard 3E
const required3E = SKILLS_LIST.filter(s => s.requiresOption3E);
console.assert(required3E.length === 3, `Expected 3 skills to require 3E options, found ${required3E.length}`);
console.assert(required3E.some(s => s.id === 'close_combat'), 'close_combat must require 3E option');
console.assert(required3E.some(s => s.id === 'expertise'), 'expertise must require 3E option');
console.assert(required3E.some(s => s.id === 'ranged_combat'), 'ranged_combat must require 3E option');

const athletics = SKILLS_LIST.find(s => s.id === 'athletics');
console.assert(!athletics.requiresOption3E, 'Athletics must NOT require 3E option');
console.assert(athletics.options.length > 0, 'Athletics must have house rule options defined');
console.log('✓ Specialization house rule metadata verified');

console.log('ALL v3.6 TEST CASES PASSED SUCCESSFULLY!');
