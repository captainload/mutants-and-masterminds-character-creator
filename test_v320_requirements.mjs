import fs from 'fs';
import {
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  isModifierLegalForEffect,
  validateModifierLegality,
  computePowerEffectiveStats,
  calculatePowerCost
} from './js/rules.js';

console.log('=== Running v3.20 Requirements Test Suite ===\n');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.20') {
  throw new Error(`Expected version.json to be 3.20, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Architect v3.20')) {
  throw new Error('Expected index.html title to reference v3.20');
}
if (!indexHtml.includes('Character Editor v3.20')) {
  throw new Error('Expected index.html brand label to reference v3.20');
}
if (!indexHtml.includes('css/styles.css?v=3.20')) {
  throw new Error('Expected styles.css query param to be v3.20');
}
if (!indexHtml.includes('js/app.js?v=3.20')) {
  throw new Error('Expected app.js script query param to be v3.20');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.20'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.20"');
}
console.log('✓ 1. Version 3.20 verified across version.json, index.html, and js/app.js');

// 2. Stats Summary Bar: Unbolded text (500), "Stats:" label, bullets "•"
const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
const statValMatch = stylesCss.match(/\.stat-item\s+\.stat-val\s*\{[^}]*font-weight:\s*([0-9a-zA-Z]+);/);
if (!statValMatch || statValMatch[1] !== '500') {
  throw new Error(`Expected .stat-item .stat-val font-weight to be 500, got ${statValMatch ? statValMatch[1] : 'none'}`);
}
const effStatValMatch = stylesCss.match(/\.effective-stat-val\s*\{[^}]*font-weight:\s*([0-9a-zA-Z]+);/);
if (!effStatValMatch || effStatValMatch[1] !== '500') {
  throw new Error(`Expected .effective-stat-val font-weight to be 500, got ${effStatValMatch ? effStatValMatch[1] : 'none'}`);
}

if (!appJs.includes('<span class="stats-summary-title">Stats:</span>')) {
  throw new Error('Expected stats-summary-title to be "Stats:" in js/app.js');
}
if (!appJs.includes('<span class="stat-sep">•</span>')) {
  throw new Error('Expected bullet separators <span class="stat-sep">•</span> in js/app.js');
}
console.log('✓ 2. Stats summary bar unbolded (font-weight: 500), labeled "Stats:", and bullet separators verified');

// 3. Default Descriptors: empty by default, placeholder used
if (appJs.includes("descriptor: 'Energy'")) {
  throw new Error("Found hardcoded default descriptor 'Energy' in js/app.js - expected empty string ''");
}
if (!appJs.includes('placeholder="e.g. Fire, Energy, Technology"')) {
  throw new Error('Expected placeholder "e.g. Fire, Energy, Technology" for descriptor inputs');
}
console.log('✓ 3. Default descriptors removed in favor of placeholder text');

// 4. Modifier auto-removal when decremented to 0 ranks (from rank 1)
if (!appJs.includes('if (r <= 1)') ||
    !appJs.includes('targetObj.extras.splice(exIdx, 1)') ||
    !appJs.includes('targetObj.flaws.splice(flIdx, 1)')) {
  throw new Error('Expected modifier rank decrement to automatically remove modifier at 0 ranks');
}
// Verify button is not disabled when r is 1
if (appJs.includes('${r <= minR ? \'disabled\' : \'\'}')) {
  throw new Error('Found disabled condition on minus button at minR in js/app.js; minus button should be enabled at rank 1');
}
console.log('✓ 4. Modifier rank decrement auto-removal at 0 ranks verified');

// 5. Alternate Effects ("ALTERNATE #" sections)
if (!appJs.includes('⚡ ALTERNATE ${aeIdx + 1}') && !appJs.includes('ALTERNATE ${aeIdx + 1}')) {
  throw new Error('Expected section title "ALTERNATE #" automatically iterated starting at 1');
}
if (!appJs.includes('power-ae-card') || !appJs.includes('input-ae-name') || !appJs.includes('select-ae-effect')) {
  throw new Error('Expected dedicated alternate effect card container and controls in js/app.js');
}
// Verify AE has its own stats bar, effect config, and modifiers
if (!appJs.includes('this.renderEffectStatsSummaryBar(ae)') ||
    !appJs.includes('this.renderEffectConfigSection(ae)') ||
    !appJs.includes('this.renderModifierColumns(ae)')) {
  throw new Error('Expected alternate effect entries to have stats bar, effect config, and full modifier columns');
}
console.log('✓ 5. Full ALTERNATE # sections with complete configuration controls verified');

// 6. Rules Description Popups (links for modifiers, info "ℹ️" icon for effects)
if (!appJs.includes('btn-modifier-info-link')) {
  throw new Error('Expected btn-modifier-info-link class for clickable modifier name links');
}
if (!appJs.includes('showModifierDescriptionDialog')) {
  throw new Error('Expected showModifierDescriptionDialog method in js/app.js');
}
if (!appJs.includes('btn-effect-info') || !appJs.includes('btn-ae-effect-info')) {
  throw new Error('Expected effect info icons (btn-effect-info and btn-ae-effect-info) in js/app.js');
}
if (!appJs.includes('showEffectDescriptionDialog')) {
  throw new Error('Expected showEffectDescriptionDialog method in js/app.js');
}

// Check that catalog modifiers have descriptions
const testEx = EXTRAS_CATALOG.find(e => e.id === 'area_burst');
if (!testEx || !testEx.desc) {
  throw new Error('Expected EXTRAS_CATALOG entries to have desc');
}
const testFl = FLAWS_CATALOG.find(f => f.id === 'distracting');
if (!testFl || !testFl.desc) {
  throw new Error('Expected FLAWS_CATALOG entries to have desc');
}
const testEff = POWER_EFFECTS_CATALOG.find(e => e.id === 'affliction');
if (!testEff || !testEff.desc) {
  throw new Error('Expected POWER_EFFECTS_CATALOG entries to have desc');
}
console.log('✓ 6. Rules description links for modifiers and info icons for effects verified');

console.log('\n=== ALL v3.20 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
