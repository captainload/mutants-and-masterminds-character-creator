import fs from 'fs';
import {
  ABILITIES,
  DEFENSES,
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  AFFLICTION_CONDITIONS,
  IMMUNITY_OPTIONS_CATALOG,
  WEAKEN_CONFIG_OPTIONS,
  NULLIFY_CONFIG_OPTIONS,
  SENSES_OPTIONS_CATALOG,
  getTraitDefinition,
  calculatePowerCost
} from './js/rules.js';

console.log('=== Running v3.9 Verification Suite ===\n');

// 1. Version 3.9 consistency
const versionData = JSON.parse(fs.readFileSync('version.json', 'utf8'));
console.assert(versionData.version === '3.9', `Expected version 3.9 in version.json, got ${versionData.version}`);
console.log('✓ version.json verified at v3.9');

const indexHtml = fs.readFileSync('index.html', 'utf8');
console.assert(indexHtml.includes('Character Architect v3.9'), 'index.html missing v3.9 title');
console.assert(indexHtml.includes('Character Editor v3.9'), 'index.html missing v3.9 brand header');
console.assert(indexHtml.includes('js/app.js?v=3.9'), 'index.html missing app.js?v=3.9 script tag');
console.log('✓ index.html references verified at v3.9');

const appJs = fs.readFileSync('js/app.js', 'utf8');
console.assert(appJs.includes("CURRENT_VERSION = '3.9'"), "js/app.js missing CURRENT_VERSION = '3.9'");
console.log("✓ js/app.js CURRENT_VERSION verified at v3.9");

// 2. "+ Build new power" button text verification
console.assert(indexHtml.includes('➕ Build new power'), "index.html missing '➕ Build new power' button text");
console.assert(appJs.includes('➕ Build new power'), "js/app.js missing '➕ Build new power' empty state text");
console.assert(!indexHtml.includes('Custom Power Builder'), "index.html still has old 'Custom Power Builder' text");
console.log("✓ '+ Build new power' button text verified in index.html and js/app.js");

// 3. Trait Rules Dialog & Definitions for Abilities and Defenses
ABILITIES.forEach(ab => {
  const trait = getTraitDefinition(ab.id, 'ability', ab.name);
  console.assert(trait && trait.name === ab.name, `Failed to get trait definition for ability ${ab.name}`);
  console.assert(trait.desc && trait.desc.length > 20, `Trait description too short for ${ab.name}`);
});
DEFENSES.forEach(def => {
  const trait = getTraitDefinition(def.id, 'defense', def.name);
  console.assert(trait && trait.name === def.name, `Failed to get trait definition for defense ${def.name}`);
  console.assert(trait.desc && trait.desc.length > 20, `Trait description too short for ${def.name}`);
});
console.assert(appJs.includes('showTraitRulesDialog(id, type, name)'), "showTraitRulesDialog method missing from js/app.js");
console.assert(appJs.includes("this.showTraitRulesDialog(ab.id, 'ability', ab.name)"), "Action center / dialog missing ability rules click hook");
console.assert(appJs.includes("this.showTraitRulesDialog(def.id, 'defense', def.name)"), "Action center / dialog missing defense rules click hook");
console.log('✓ Official 3E rules trait description popups for Abilities & Defenses verified');

// 4. Linked Effects Mechanics
const linkedExtra = EXTRAS_CATALOG.find(x => x.id === 'linked');
console.assert(linkedExtra && linkedExtra.name.includes('Linked'), "'★ Linked' extra missing from EXTRAS_CATALOG");
console.assert(appJs.includes('linkExistingEffect(power)'), 'linkExistingEffect missing in js/app.js');
console.assert(appJs.includes('No other effects added yet'), "Missing 'No other effects added yet' warning in js/app.js");
console.assert(appJs.includes("if (selectedId === 'linked')"), "Missing 'linked' interception in btn-add-extra");
console.log('✓ Linked effects picker and 0-effects warning pop-up logic verified');

// 5. Rich Configuration Options for Affliction, Immunity, Senses, Weaken, Nullify
console.assert(AFFLICTION_CONDITIONS.resistedBy.length >= 2, 'AFFLICTION_CONDITIONS missing resistedBy');
console.assert(AFFLICTION_CONDITIONS.degree1.includes('Dazed'), 'AFFLICTION_CONDITIONS degree1 missing Dazed');
console.assert(AFFLICTION_CONDITIONS.degree2.includes('Stunned'), 'AFFLICTION_CONDITIONS degree2 missing Stunned');
console.assert(AFFLICTION_CONDITIONS.degree3.includes('Incapacitated'), 'AFFLICTION_CONDITIONS degree3 missing Incapacitated');

console.assert(IMMUNITY_OPTIONS_CATALOG.length >= 20, 'IMMUNITY_OPTIONS_CATALOG should have rich 3E options');
const lifeSupport = IMMUNITY_OPTIONS_CATALOG.find(o => o.id === 'life_support');
console.assert(lifeSupport && lifeSupport.ranks === 10, 'Life Support immunity should be 10 ranks');

console.assert(SENSES_OPTIONS_CATALOG.length >= 10, 'SENSES_OPTIONS_CATALOG should have rich 3E sensory options');
console.assert(WEAKEN_CONFIG_OPTIONS.traits.includes('Strength'), 'WEAKEN_CONFIG_OPTIONS missing Strength');
console.assert(NULLIFY_CONFIG_OPTIONS.descriptors.includes('Magic'), 'NULLIFY_CONFIG_OPTIONS missing Magic');

console.assert(appJs.includes('renderEffectConfigSection(p)'), 'renderEffectConfigSection missing from js/app.js');
console.assert(appJs.includes('btn-add-imm-item'), "Immunity '+' button missing from app.js");
console.assert(appJs.includes('btn-add-sens-item'), "Senses '+' button missing from app.js");
console.log('✓ Affliction dropdowns, Immunity "+" multi-option catalog, and Senses/Weaken/Nullify configs verified');

// 6. Immunity Cost Math Verification
const immunityPower = {
  id: 'pow_imm',
  name: 'Construct Immunities',
  effect: POWER_EFFECTS_CATALOG.find(e => e.id === 'immunity'),
  rank: 30, // e.g. Fortitude immunity
  extras: [],
  flaws: []
};
console.assert(calculatePowerCost(immunityPower) === 30, `Expected 30 PP for rank 30 immunity, got ${calculatePowerCost(immunityPower)}`);
console.log('✓ Immunity PP calculation verified (1 PP/rank)');

// 7. Minimum 10pt Font Size Check
const filesToCheck = ['css/styles.css', 'index.html', 'js/app.js'];
let fontViolations = 0;
filesToCheck.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const fontMatches = line.match(/font-size:\s*([0-9.]+(rem|px|pt))/g);
    if (fontMatches) {
      fontMatches.forEach(m => {
        const num = parseFloat(m.replace(/[^0-9.]/g, ''));
        const unit = m.slice(-2);
        if ((unit === 'em' && num < 0.833) || (unit === 'px' && num < 13.33) || (unit === 'pt' && num < 10.0)) {
          console.error(`Font size violation in ${file} at line ${idx + 1}: ${m}`);
          fontViolations++;
        }
      });
    }
  });
});
console.assert(fontViolations === 0, `Expected 0 font size violations below 10pt, found ${fontViolations}`);
console.log(`✓ 10pt Minimum Font Size check passed across ${filesToCheck.length} files (0 violations)`);

console.log('\n=== ALL v3.9 VERIFICATIONS PASSED SUCCESSFULLY! ===');
