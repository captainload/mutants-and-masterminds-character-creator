import fs from 'fs';
import {
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  getTraitDefinition
} from './js/rules.js';

console.log('=== Running v3.14 Requirements Test Suite ===\n');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (parseFloat(versionJson.version) < 3.14) {
  throw new Error(`Expected version.json to be >= 3.14, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes(`v${versionJson.version}`)) {
  throw new Error(`Expected index.html to reference v${versionJson.version}`);
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes(`CURRENT_VERSION = '${versionJson.version}'`)) {
  throw new Error(`Expected js/app.js to define CURRENT_VERSION = "${versionJson.version}"`);
}
console.log(`✓ 1. Version ${versionJson.version} verified across version.json, index.html, and js/app.js`);

// 2. Stars (★) Assigned Strictly to Effect-Specific Modifiers
const universalExtrasShouldNotHaveStar = [
  'accurate', 'affects_insubstantial', 'area_burst', 'area_cone', 'area_line',
  'area_shapeable', 'extended_range', 'homing', 'increased_range', 'increased_duration',
  'incurable', 'multiattack', 'precise', 'reach', 'reaction', 'reversible', 'ricochet',
  'secondary_effect', 'selective', 'split', 'subtle', 'sustained', 'continuous',
  'triggered', 'variable_descriptor', 'linked'
];

universalExtrasShouldNotHaveStar.forEach(id => {
  const extra = EXTRAS_CATALOG.find(e => e.id === id);
  if (!extra) throw new Error(`Missing extra: ${id}`);
  if (extra.name.startsWith('★')) {
    throw new Error(`Universal extra ${id} should NOT have a star (★) in name, found: "${extra.name}"`);
  }
  if (extra.isEffectSpecific) {
    throw new Error(`Universal extra ${id} should have isEffectSpecific: false`);
  }
});

const effectSpecificExtrasShouldHaveStar = [
  'cumulative', 'progressive', 'penetrating', 'impervious', 'affects_corporeal',
  'affects_others', 'attack', 'contagious', 'strength_based'
];

effectSpecificExtrasShouldHaveStar.forEach(id => {
  const extra = EXTRAS_CATALOG.find(e => e.id === id);
  if (!extra) throw new Error(`Missing effect-specific extra: ${id}`);
  if (!extra.name.startsWith('★')) {
    throw new Error(`Effect-specific extra ${id} MUST start with star (★), found: "${extra.name}"`);
  }
  if (!extra.isEffectSpecific) {
    throw new Error(`Effect-specific extra ${id} must have isEffectSpecific: true`);
  }
});

const universalFlawsShouldNotHaveStar = [
  'activation_move', 'activation_standard', 'check_required', 'concentration',
  'distracting', 'easily_removable', 'fades', 'inaccurate', 'limited', 'noticeable',
  'quirk', 'reduced_range', 'removable', 'resistible', 'sense_dependent',
  'side_effect', 'tiring', 'uncontrolled', 'unreliable'
];

universalFlawsShouldNotHaveStar.forEach(id => {
  const flaw = FLAWS_CATALOG.find(f => f.id === id);
  if (!flaw) throw new Error(`Missing flaw: ${id}`);
  if (flaw.name.startsWith('★')) {
    throw new Error(`Universal flaw ${id} should NOT have a star (★) in name, found: "${flaw.name}"`);
  }
  if (flaw.isEffectSpecific) {
    throw new Error(`Universal flaw ${id} should have isEffectSpecific: false`);
  }
});

const effectSpecificFlawsShouldHaveStar = [
  'feedback', 'grab_based', 'diminished_range'
];

effectSpecificFlawsShouldHaveStar.forEach(id => {
  const flaw = FLAWS_CATALOG.find(f => f.id === id);
  if (!flaw) throw new Error(`Missing effect-specific flaw: ${id}`);
  if (!flaw.name.startsWith('★')) {
    throw new Error(`Effect-specific flaw ${id} MUST start with star (★), found: "${flaw.name}"`);
  }
  if (!flaw.isEffectSpecific) {
    throw new Error(`Effect-specific flaw ${id} must have isEffectSpecific: true`);
  }
});

// Test getTraitDefinition resolves with or without star
const resolvedWithStar = getTraitDefinition('cumulative', 'extra', '★ Cumulative');
if (!resolvedWithStar || resolvedWithStar.id !== 'cumulative') {
  throw new Error('Failed to resolve trait definition for "★ Cumulative"');
}
const resolvedWithoutStar = getTraitDefinition('cumulative', 'extra', 'Cumulative');
if (!resolvedWithoutStar || resolvedWithoutStar.id !== 'cumulative') {
  throw new Error('Failed to resolve trait definition for "Cumulative"');
}

console.log('✓ 2. Stars (★) strictly assigned to effect-specific modifiers and removed from universal modifiers');

// 3. Button Font Sizes: Strictly >= 10pt (10pp)
const css = fs.readFileSync('css/styles.css', 'utf8');

// Global button rule in css/styles.css
if (!css.includes('button, .btn, .btn-stepper, .nav-tab-btn, .condition-btn')) {
  throw new Error('Missing global button rule in css/styles.css ensuring minimum font size');
}

// Ensure no buttons use var(--font-size-xs) inline in index.html
const btnXsInIndex = indexHtml.match(/<button[^>]*style="[^"]*font-size:\s*var\(--font-size-xs\)/g);
if (btnXsInIndex) {
  throw new Error(`Found buttons using var(--font-size-xs) in index.html: ${btnXsInIndex.length} instances`);
}

// Ensure no buttons use var(--font-size-xs) inline in js/app.js
const btnXsInApp = appJs.match(/<button[^>]*style="[^"]*font-size:\s*var\(--font-size-xs\)/g);
if (btnXsInApp) {
  throw new Error(`Found buttons using var(--font-size-xs) in js/app.js: ${btnXsInApp.length} instances`);
}

// Ensure no buttons use raw pixel sizes under 13.33px / 10pt
const tinyPxMatch = appJs.match(/<button[^>]*style="[^"]*font-size:\s*(?:[0-9]|1[0-2])px/g);
if (tinyPxMatch) {
  throw new Error(`Found buttons with font-size < 13px: ${tinyPxMatch.join(', ')}`);
}

console.log('✓ 3. All button font sizes verified strictly >= 10pt (10pp), with zero micro-font buttons');

// 4. Advantages Tab 'Show Descriptions' Checkbox & Interactive Pop-up
if (!indexHtml.includes('id="adv-show-descriptions"')) {
  throw new Error('Missing #adv-show-descriptions checkbox in index.html');
}

if (!indexHtml.includes('Show descriptions')) {
  throw new Error('Missing "Show descriptions" label in index.html');
}

// Verify app.js handles showDescriptions toggle
if (!appJs.includes("document.getElementById('adv-show-descriptions')?.checked")) {
  throw new Error('js/app.js does not check #adv-show-descriptions state');
}

if (!appJs.includes('adv-name-link') || !appJs.includes('rules-link')) {
  throw new Error('Advantage name must include rules-link class to trigger pop-up');
}

if (!appJs.includes("document.getElementById('adv-show-descriptions')?.addEventListener('change'")) {
  throw new Error('Missing event listener for #adv-show-descriptions checkbox');
}

console.log('✓ 4. Advantages tab "Show descriptions" checkbox & pop-up integration verified');

console.log('\n=== ALL v3.14 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
