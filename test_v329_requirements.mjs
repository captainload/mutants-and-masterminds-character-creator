import fs from 'fs';
import { execSync } from 'child_process';
import { calculatePowerCost, POWER_EFFECTS_CATALOG, FLAWS_CATALOG } from './js/rules.js';

console.log('=== Running v3.29 Requirements Test Suite ===\n');

// 1. Version Check: >= 3.29 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
const verNum = parseFloat(versionJson.version);
if (verNum < 3.29) {
  throw new Error(`Expected version.json to be >= 3.29, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes(`Character Editor v${versionJson.version}`)) {
  throw new Error(`Expected index.html title to reference Character Editor v${versionJson.version}`);
}
if (!indexHtml.includes(`css/styles.css?v=${versionJson.version}`)) {
  throw new Error(`Expected styles.css query param to be v${versionJson.version}`);
}
if (!indexHtml.includes(`js/app.js?v=${versionJson.version}`)) {
  throw new Error(`Expected app.js script query param to be v${versionJson.version}`);
}
if (!indexHtml.includes(`>v${versionJson.version}</span>`)) {
  throw new Error(`Expected header version badge to display v${versionJson.version}`);
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes(`CURRENT_VERSION = '${versionJson.version}'`)) {
  throw new Error(`Expected js/app.js to define CURRENT_VERSION = "${versionJson.version}"`);
}
console.log(`✓ 1. Version ${versionJson.version} verified across version.json, index.html, and js/app.js`);

// 2. Primary Effect Standalone vs Total Array Cost Distinction
// Verification of Diminished Range scenario (8 PP base - 1 PP flat diminished range = 7 PP standalone, 8 PP total with 1 AE)
const damageEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage');
const diminishedRangeFlaw = FLAWS_CATALOG.find(f => f.id === 'diminished_range');

const testPower = {
  id: 'p_test',
  name: 'Test Blast',
  rank: 4,
  effect: damageEffect, // 1 PP/rank
  extras: [{ id: 'ranged', name: 'Ranged', cost: 1, isFlat: false, rank: 1 }], // +1 PP/rank -> 2 PP/rank * 4 = 8 PP
  flaws: [{ id: 'diminished_range', name: 'Diminished Range', cost: 1, isFlat: true, rank: 1 }], // -1 PP flat -> 7 PP
  alternateEffects: [
    {
      id: 'ae_test',
      name: 'Alternate',
      rank: 3,
      effect: damageEffect,
      extras: [{ id: 'ranged', name: 'Ranged', cost: 1, isFlat: false, rank: 1 }],
      flaws: []
    }
  ]
};

// Standalone cost of primary effect (7 PP)
const primaryStandalone = calculatePowerCost({
  ...testPower,
  isAlternateEffect: false,
  alternateEffects: [],
  linkedEffects: [],
  isDynamicArray: false
});
// Total power cost including 1 AE slot (7 + 1 = 8 PP)
const totalWithAe = calculatePowerCost(testPower);

if (primaryStandalone !== 7) {
  throw new Error(`Expected primary standalone cost to be 7 PP, got ${primaryStandalone}`);
}
if (totalWithAe !== 8) {
  throw new Error(`Expected total cost with 1 AE slot to be 8 PP, got ${totalWithAe}`);
}
console.log(`✓ 2. Math verified: 4 ranks of Ranged Damage (8 PP) - 1 flat flaw = ${primaryStandalone} PP standalone; + 1 AE slot = ${totalWithAe} PP array total`);

// 3. UI Display Templates Check
// In header: checks that header displays both total and base standalone when AEs exist
if (!appJs.includes('${cost} PP${p.alternateEffects?.length ? ` total • ${mainStandaloneCost} PP base` : \'\'}')) {
  throw new Error('Expected power card header to distinguish total PP and base standalone PP');
}

// In row 1: displays mainStandaloneCost and total underneath
if (!appJs.includes('title="Primary effect standalone cost: ${mainStandaloneCost} PP">${mainStandaloneCost} PP</strong>')) {
  throw new Error('Expected primary effect Row 1 to display mainStandaloneCost');
}
if (!appJs.includes('${p.alternateEffects?.length ? `<div style="font-size: var(--font-size-xs); color: var(--text-muted); white-space: nowrap;">(${cost} PP total)</div>` : \'\'}')) {
  throw new Error('Expected primary effect Row 1 to display total array cost underneath when AEs exist');
}

// In AE header: displays both AE cost and max allowed
if (!appJs.includes('(AE Cost: ${aeStandaloneCost} PP / Max Allowed: ${mainStandaloneCost} PP)')) {
  throw new Error('Expected alternate effect header to label "(AE Cost: X PP / Max Allowed: Y PP)"');
}

// In overrun warnings: clarifies standalone cost and notes when total array cost differs
if (!appJs.includes("primary effect's standalone cost (${mainCost} PP)")) {
  throw new Error("Expected warning dialogs to clarify primary effect's standalone cost");
}
console.log('✓ 3. UI display verified: Power card header, Row 1 cost badge, AE header, and warning dialogs clearly distinguish standalone cost vs array total');

// 4. JS Syntax & App Initialization Check
try {
  execSync('node --check js/app.js', { stdio: 'pipe' });
  execSync('node test_app_init.mjs', { stdio: 'pipe' });
} catch (err) {
  throw new Error(`Syntax or initialization error in app.js: ${err.message}`);
}
console.log('✓ 4. js/app.js syntax check and test_app_init initialization verified');

console.log('\n=== ALL v3.29 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
