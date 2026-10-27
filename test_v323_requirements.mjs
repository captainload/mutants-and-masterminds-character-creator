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

console.log('=== Running v3.23 Requirements Test Suite ===\n');

// 1. Version Check: >= 3.23 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
const verNum = parseFloat(versionJson.version);
if (verNum < 3.23) {
  throw new Error(`Expected version.json to be >= 3.23, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v' + versionJson.version)) {
  throw new Error(`Expected index.html title to reference Character Editor v${versionJson.version}`);
}
if (indexHtml.includes('Character Architect')) {
  throw new Error('Expected old name "Character Architect" to be removed to prevent confusion and text overrun');
}
if (!indexHtml.includes('css/styles.css?v=' + versionJson.version)) {
  throw new Error(`Expected styles.css query param to be v${versionJson.version}`);
}
if (!indexHtml.includes('js/app.js?v=' + versionJson.version)) {
  throw new Error(`Expected app.js script query param to be v${versionJson.version}`);
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes(`CURRENT_VERSION = '${versionJson.version}'`)) {
  throw new Error(`Expected js/app.js to define CURRENT_VERSION = "${versionJson.version}"`);
}
console.log(`✓ 1. Version ${versionJson.version} verified across version.json, index.html, and js/app.js`);

// 2. Program Title & Version Status UI
// Unified "Character Editor" header title without duplicate label causing overrun
if (!indexHtml.includes('Mutants & Masterminds 3E Character Editor')) {
  throw new Error('Expected "Mutants & Masterminds 3E Character Editor" centered in header');
}
if (indexHtml.includes('brand-label-compact')) {
  throw new Error('Expected duplicate brand-label-compact to be eliminated to avoid text overrun');
}
if (!indexHtml.includes('id="header-version-tag"')) {
  throw new Error('Expected header-version-tag element in index.html');
}
if (!indexHtml.includes('id="btn-header-update-alert"')) {
  throw new Error('Expected btn-header-update-alert element in index.html');
}

// Check CSS styling for up-to-date (blue) and out-of-date (red)
const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
if (!stylesCss.includes('.header-version-tag.up-to-date') || !stylesCss.includes('var(--hero-blue)')) {
  throw new Error('Expected .header-version-tag.up-to-date styling with hero blue');
}
if (!stylesCss.includes('.header-version-tag.out-of-date') || !stylesCss.includes('#ef4444')) {
  throw new Error('Expected .header-version-tag.out-of-date styling with red (#ef4444)');
}
if (!stylesCss.includes('.btn-header-update-alert')) {
  throw new Error('Expected .btn-header-update-alert styling in css/styles.css');
}

// Check update button click wiring in js/app.js
if (!appJs.includes("document.getElementById('btn-header-update-alert')?.addEventListener('click'")) {
  throw new Error('Expected btn-header-update-alert click event listener to be wired in js/app.js');
}
if (!appJs.includes("header-version-tag")) {
  throw new Error('Expected dynamic status update for header-version-tag in checkForUpdates()');
}
console.log('✓ 2. Unified Character Editor title, version indicator (blue/red), and update alert button verified');

// 3. Power Feats Reclassified as Extras in 3E Power Builder
// Separate feats column and buttons removed
if (appJs.includes('btn-add-feat') || appJs.includes('select-add-feat')) {
  throw new Error('Found deprecated btn-add-feat or select-add-feat in js/app.js - Power Feats should be unified into Extras');
}
if (appJs.includes('⭐ Power Feats')) {
  throw new Error('Found deprecated "⭐ Power Feats" section header in js/app.js');
}

// Unified Extras column includes both ranked and flat extras
const flatExtrasInCatalog = EXTRAS_CATALOG.filter(e => e.isFlat && e.id !== 'linked');
if (flatExtrasInCatalog.length === 0) {
  throw new Error('Expected flat extras to exist in EXTRAS_CATALOG');
}

// Check that flat extras cost calculation functions properly as Extras
const damageEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage');
const testPowerWithFlatExtra = {
  id: 'test-p1',
  name: 'Strike',
  effect: damageEffect,
  rank: 5, // 5 ranks * 1 PP = 5 PP
  extras: [
    { id: 'subtle', name: 'Subtle', cost: 1, isFlat: true, rank: 1 } // +1 flat PP
  ],
  flaws: []
};
const calculatedCost = calculatePowerCost(testPowerWithFlatExtra);
if (calculatedCost !== 6) {
  throw new Error(`Expected cost to be 6 PP (5 base + 1 flat extra), got ${calculatedCost} PP`);
}

// Test with both ranked extra and flat extra
const testPowerWithBoth = {
  id: 'test-p2',
  name: 'Ranged Subtle Blast',
  effect: damageEffect,
  rank: 5,
  extras: [
    { id: 'increased_range', name: 'Increased Range', cost: 1, isFlat: false, rank: 1 }, // +1/rank = 2 PP/rank * 5 = 10 PP
    { id: 'subtle', name: 'Subtle', cost: 1, isFlat: true, rank: 2 } // +2 flat PP
  ],
  flaws: []
};
const calculatedCostBoth = calculatePowerCost(testPowerWithBoth);
if (calculatedCostBoth !== 12) {
  throw new Error(`Expected cost to be 12 PP (10 ranked + 2 flat extra), got ${calculatedCostBoth} PP`);
}

// Verify legality check allows flat extras as extras
const subtleDef = EXTRAS_CATALOG.find(e => e.id === 'subtle');
const legality = isModifierLegalForEffect(subtleDef, damageEffect, [], []);
if (!legality.legal) {
  throw new Error(`Expected flat extra Subtle to be legal for Damage: ${legality.reason}`);
}

console.log('✓ 3. Reclassification of Power Feats as Extras verified in UI and rules calculation engine');

console.log('\n=== ALL v3.23 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
