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
import { POWER_PROFILES_LIBRARY } from './js/power_profiles.js';

console.log('=== Running v3.24 Requirements Test Suite ===\n');

// 1. Version Check: 3.24 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.24') {
  throw new Error(`Expected version.json to be 3.24, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.24')) {
  throw new Error('Expected index.html title to reference Character Editor v3.24');
}
if (!indexHtml.includes('css/styles.css?v=3.24')) {
  throw new Error('Expected styles.css query param to be v3.24');
}
if (!indexHtml.includes('js/app.js?v=3.24')) {
  throw new Error('Expected app.js script query param to be v3.24');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.24'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.24"');
}
console.log('✓ 1. Version 3.24 verified across version.json, index.html, and js/app.js');

// 2. Power Profiles Library loaded: all 39 chapters and 1000+ profiles
if (!Array.isArray(POWER_PROFILES_LIBRARY) || POWER_PROFILES_LIBRARY.length !== 39) {
  throw new Error(`Expected 39 chapters in POWER_PROFILES_LIBRARY, got ${POWER_PROFILES_LIBRARY?.length}`);
}

let totalProfiles = 0;
const expectedChapters = [
  'Air Powers', 'Armor Powers', 'Animal Powers', 'Cold Powers', 'Cosmic Powers',
  'Darkness Powers', 'Death Powers', 'Dimension Powers', 'Dream Powers', 'Earth Powers',
  'Electrical Powers', 'Element Powers', 'Fire Powers', 'Gravity Powers', 'Illusion Powers',
  'Kinetic Powers', 'Life Powers', 'Light Powers', 'Luck Powers', 'Magic Powers',
  'Magnetic Powers', 'Martial Powers', 'Mental Powers', 'Meta Powers', 'Morphing Powers',
  'Plant Powers', 'Radiation Powers', 'Sensory Powers', 'Size Powers', 'Sonic Powers',
  'Speed Powers', 'Strength Powers', 'Summoning Powers', 'Talent Powers', 'Tech Powers',
  'Teleport Powers', 'Time Powers', 'Water Powers', 'Weather Powers'
];

for (const expName of expectedChapters) {
  const grp = POWER_PROFILES_LIBRARY.find(g => g.category.toLowerCase() === expName.toLowerCase());
  if (!grp) {
    throw new Error(`Missing expected chapter in library: ${expName}`);
  }
  if (!Array.isArray(grp.profiles) || grp.profiles.length < 5) {
    throw new Error(`Chapter ${expName} has too few profiles: ${grp.profiles?.length}`);
  }
  totalProfiles += grp.profiles.length;
}

if (totalProfiles < 1000) {
  throw new Error(`Expected at least 1,000 power profiles extracted, got ${totalProfiles}`);
}

// Verify profile data structure and descriptor preservation
const sampleProfile = POWER_PROFILES_LIBRARY[0].profiles[0];
if (!sampleProfile.id || !sampleProfile.name || !sampleProfile.effectId || !sampleProfile.descriptor) {
  throw new Error(`Sample profile missing core properties: ${JSON.stringify(sampleProfile)}`);
}

// Verify that setupPowerProfiles leaves descriptor empty for user customization with placeholder
if (!appJs.includes("descriptor: '',")) {
  throw new Error('Expected setupPowerProfiles in js/app.js to use empty descriptor for user customization');
}

console.log(`✓ 2. Power Profiles Library verified: 39 chapters, ${totalProfiles} total profiles, user customizable descriptors`);

// 3. Power Profiles precedence: Effects and Modifiers from Power Profiles integrated into catalog
const requiredNewEffects = [
  'communication', 'environment', 'summon', 'transform', 'variable',
  'growth', 'shrinking', 'elongation', 'extra_limbs', 'feature', 'luck_control'
];
for (const effId of requiredNewEffects) {
  const found = POWER_EFFECTS_CATALOG.find(e => e.id === effId);
  if (!found) {
    throw new Error(`Missing Power Profiles effect in catalog: ${effId}`);
  }
}

const requiredNewExtras = [
  'area_cloud', 'area_cylinder', 'area_perception', 'psychic',
  'variable_conditions', 'responsive', 'portal', 'increased_mass', 'turnabout'
];
for (const exId of requiredNewExtras) {
  const found = EXTRAS_CATALOG.find(e => e.id === exId);
  if (!found) {
    throw new Error(`Missing Power Profiles extra in catalog: ${exId}`);
  }
}

const requiredNewFlaws = [
  'self_powered', 'limited_to_minds', 'limited_to_resistance', 'limited_ambient',
  'transit_time', 'limited_location'
];
for (const flId of requiredNewFlaws) {
  const found = FLAWS_CATALOG.find(f => f.id === flId);
  if (!found) {
    throw new Error(`Missing Power Profiles flaw in catalog: ${flId}`);
  }
}

// Test legality restrictions
const illusionEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'illusion');
const damageEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage');
const teleportEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'teleport');
const psychicDef = EXTRAS_CATALOG.find(e => e.id === 'psychic');
const portalDef = EXTRAS_CATALOG.find(e => e.id === 'portal');

if (!isModifierLegalForEffect(psychicDef, illusionEffect, [], []).legal) {
  throw new Error('Psychic extra should be legal for Illusion effect');
}
if (isModifierLegalForEffect(psychicDef, damageEffect, [], []).legal) {
  throw new Error('Psychic extra should NOT be legal for Damage effect');
}
if (!isModifierLegalForEffect(portalDef, teleportEffect, [], []).legal) {
  throw new Error('Portal extra should be legal for Teleport effect');
}
if (isModifierLegalForEffect(portalDef, damageEffect, [], []).legal) {
  throw new Error('Portal extra should NOT be legal for Damage effect');
}

// Cost calculation check for Power Profiles modifiers
// Teleport Rank 10 + Portal (+2/rank) = 4 PP/rank * 10 = 40 PP
const teleportPortalPower = {
  id: 'test-tp-portal',
  name: 'Gate',
  effect: teleportEffect,
  rank: 10,
  extras: [{ id: 'portal', name: 'Portal', cost: 2, isFlat: false, rank: 1 }],
  flaws: []
};
const teleportCost = calculatePowerCost(teleportPortalPower);
if (teleportCost !== 40) {
  throw new Error(`Expected Teleport Portal cost to be 40 PP, got ${teleportCost} PP`);
}

// Affliction Rank 10 + Variable Conditions (+2/rank) = 3 PP/rank * 10 = 30 PP
const afflictionEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'affliction');
const affVariablePower = {
  id: 'test-aff-var',
  name: 'Curse of Chaos',
  effect: afflictionEffect,
  rank: 10,
  extras: [{ id: 'variable_conditions', name: 'Variable Conditions', cost: 2, isFlat: false, rank: 1 }],
  flaws: []
};
const affCost = calculatePowerCost(affVariablePower);
if (affCost !== 30) {
  throw new Error(`Expected Affliction Variable Conditions cost to be 30 PP, got ${affCost} PP`);
}

console.log('✓ 3. Power Profiles precedence, new effects, modifiers, and cost calculation verified');

// 4. Dropdown Alphabetization: Extras and Flaws strictly sorted
function isAlphabetized(arr, getName) {
  for (let i = 0; i < arr.length - 1; i++) {
    const cur = getName(arr[i]).replace(/^★\s*/, '').toLowerCase();
    const next = getName(arr[i + 1]).replace(/^★\s*/, '').toLowerCase();
    if (cur.localeCompare(next) > 0) {
      return { sorted: false, failedAt: `${cur} should not come before ${next}` };
    }
  }
  return { sorted: true };
}

// Catalog sorting in rules.js
const extrasSorted = isAlphabetized(EXTRAS_CATALOG, x => x.name);
if (!extrasSorted.sorted) {
  throw new Error(`EXTRAS_CATALOG is not alphabetized: ${extrasSorted.failedAt}`);
}

const flawsSorted = isAlphabetized(FLAWS_CATALOG, f => f.name);
if (!flawsSorted.sorted) {
  throw new Error(`FLAWS_CATALOG is not alphabetized: ${flawsSorted.failedAt}`);
}

// Check that app.js explicitly sorts dropdown lists
if (!appJs.includes("a.name.replace(/^★\\s*/, '').localeCompare(b.name.replace(/^★\\s*/, ''))")) {
  throw new Error('Expected js/app.js to sort extras and flaws dropdown lists alphabetically');
}

// Check both builder modal and power card modifier dropdowns have sorting
if (!appJs.includes("const sortedExtras = [...EXTRAS_CATALOG].sort")) {
  throw new Error('Expected custom power builder modal extras to be sorted alphabetically');
}
if (!appJs.includes("const sortedFlaws = [...FLAWS_CATALOG].sort")) {
  throw new Error('Expected custom power builder modal flaws to be sorted alphabetically');
}

console.log('✓ 4. Extras and Flaws dropdown lists verified strictly alphabetized across UI and catalogs');

console.log('\n=== ALL v3.24 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
