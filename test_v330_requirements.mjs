import fs from 'fs';
import { execSync } from 'child_process';
import { POWER_EFFECTS_CATALOG, EXTRAS_CATALOG, isModifierLegalForEffect, validateModifierLegality } from './js/rules.js';

console.log('=== Running v3.30 Requirements Test Suite ===\n');

// 1. Version Check: 3.30 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.30') {
  throw new Error(`Expected version.json to be 3.30, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.30')) {
  throw new Error('Expected index.html title to reference Character Editor v3.30');
}
if (!indexHtml.includes('css/styles.css?v=3.30')) {
  throw new Error('Expected styles.css query param to be v3.30');
}
if (!indexHtml.includes('js/app.js?v=3.30')) {
  throw new Error('Expected app.js script query param to be v3.30');
}
if (!indexHtml.includes('>v3.30</span>')) {
  throw new Error('Expected header version badge to display v3.30');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.30'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.30"');
}
console.log('✓ 1. Version 3.30 verified across version.json, index.html, and js/app.js');

// 2. Split extra legality on Enhanced Trait and Personal effects
const enhancedTrait = POWER_EFFECTS_CATALOG.find(e => e.id === 'enhanced_trait');
const splitExtra = EXTRAS_CATALOG.find(e => e.id === 'split');
const attackExtra = EXTRAS_CATALOG.find(e => e.id === 'attack');
const affectsOthers = EXTRAS_CATALOG.find(e => e.id === 'affects_others');

// Personal effect without Attack or Affects Others must REJECT Split
const splitOnPersonal = isModifierLegalForEffect(splitExtra, enhancedTrait, [], []);
if (splitOnPersonal.legal) {
  throw new Error('Expected Split to be illegal on Enhanced Trait without Attack or Affects Others');
}

// Personal effect with Attack must ALLOW Split
const splitWithAttack = isModifierLegalForEffect(splitExtra, enhancedTrait, [{ id: 'attack', cost: 0, isFlat: false, rank: 1 }], []);
if (!splitWithAttack.legal) {
  throw new Error('Expected Split to be legal on Enhanced Trait with Attack modifier');
}

// Personal effect with Affects Others must ALLOW Split
const splitWithAffectsOthers = isModifierLegalForEffect(splitExtra, enhancedTrait, [{ id: 'affects_others', cost: 1, isFlat: false, rank: 1 }], []);
if (!splitWithAffectsOthers.legal) {
  throw new Error('Expected Split to be legal on Enhanced Trait with Affects Others modifier');
}
console.log('✓ 2. Split extra legality on Personal effects verified (disallowed by default; allowed with Attack or Affects Others)');

// 3. Area effects must REJECT Split
const damageEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage');
const splitOnArea = isModifierLegalForEffect(splitExtra, damageEffect, [{ id: 'area_burst', cost: 1, isFlat: false, rank: 1 }], []);
if (splitOnArea.legal) {
  throw new Error('Expected Split to be illegal on Area effects');
}
console.log('✓ 3. Area effects properly reject Split modifier');

// 4. validateModifierLegality reports Split on Personal effect as error
const valResult = validateModifierLegality(enhancedTrait, [{ id: 'split', name: 'Split', cost: 1, isFlat: true, rank: 1 }], []);
if (valResult.valid || !valResult.errors.some(err => err.includes('Split extra only applies to effects that can target others'))) {
  throw new Error('Expected validateModifierLegality to report error for Split on unmodified Personal effect');
}
console.log('✓ 4. validateModifierLegality enforces Split restriction as validation error');

// 5. Triggered and Reversible restrictions on Personal effects
const triggeredExtra = EXTRAS_CATALOG.find(e => e.id === 'triggered');
const reversibleExtra = EXTRAS_CATALOG.find(e => e.id === 'reversible');

const triggeredOnPersonal = isModifierLegalForEffect(triggeredExtra, enhancedTrait, [], []);
if (triggeredOnPersonal.legal) {
  throw new Error('Expected Triggered to be illegal on Personal effects without Attack/Affects Others');
}

const reversibleOnPersonal = isModifierLegalForEffect(reversibleExtra, enhancedTrait, [], []);
if (reversibleOnPersonal.legal) {
  throw new Error('Expected Reversible to be illegal on Personal effects without Attack/Affects Others');
}
console.log('✓ 5. Triggered and Reversible extras confirmed restricted on Personal range effects');

// 6. Syntax Check & Initialization
try {
  execSync('node --check js/app.js', { stdio: 'pipe' });
  execSync('node test_app_init.mjs', { stdio: 'pipe' });
} catch (err) {
  throw new Error(`Syntax or initialization error in app.js: ${err.message}`);
}
console.log('✓ 6. js/app.js syntax check and test_app_init initialization verified');

console.log('\n=== ALL v3.30 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
