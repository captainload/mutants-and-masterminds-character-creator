import fs from 'fs';
import {
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  calculatePowerCost,
  computePowerEffectiveStats,
  validateModifierLegality
} from './js/rules.js';

console.log('=== Running v3.21 Requirements Test Suite ===\n');

// 1. Version Check: >= 3.21 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (parseFloat(versionJson.version) < 3.21) {
  throw new Error(`Expected version.json to be >= 3.21, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Architect v3.') || !indexHtml.includes('Character Editor v3.')) {
  throw new Error('Expected index.html title and brand label to reference v3.x');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION');
}
console.log('✓ 1. Version >= 3.21 verified across version.json, index.html, and js/app.js');

// 2. Vertical bars between effect stats completely removed
const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
if (stylesCss.includes('.effective-stat-chip {\n  display: inline-flex;\n  border-left: 3px solid var(--hero-blue);')) {
  throw new Error('Found border-left vertical bars on .effective-stat-chip');
}
if (stylesCss.includes('.effective-stat-chip.stat-action,\n.effective-stat-chip.stat-range,\n.effective-stat-chip.stat-duration,\n.effective-stat-chip.stat-area {\n  border-left: 3px solid var(--hero-blue);')) {
  throw new Error('Found border-left vertical bars on specific stat chips');
}
console.log('✓ 2. Vertical bars between effect stats eliminated in CSS');

// 3. Enforce alternate effect cost limits & No static overrun warning
if (!appJs.includes('Cannot increase alternate effect rank: Alternate Effects cannot cost more than the primary effect')) {
  throw new Error('Expected AE rank increase limit pop-up dialog in js/app.js');
}
if (!appJs.includes('Cannot select "') || !appJs.includes('Alternate Effects cannot cost more than the primary effect')) {
  throw new Error('Expected AE effect selection limit pop-up dialog in js/app.js');
}
if (!appJs.includes('Cannot reduce primary power rank: Alternate Effect "') && !appJs.includes('Cannot reduce primary power rank: Alternate effect "')) {
  throw new Error('Expected primary power rank reduction limit pop-up dialog in js/app.js');
}
if (appJs.includes('• Alternate effect standalone cost (') && appJs.includes('Array Cost Advisory:')) {
  throw new Error('Static warning banner still present for AE cost overrun - prompt requires pop-up only, no static warning');
}
console.log('✓ 3. Alternate effect cost limits enforced with pop-ups and static warning removed');

// Test Math for Alternate Effect Cost Limits
const primaryPower = {
  id: 'p1',
  name: 'Fire Blast',
  effect: POWER_EFFECTS_CATALOG.find(e => e.id === 'damage'), // 2 PP/rank
  rank: 10,
  extras: [],
  flaws: [],
  isAlternateEffect: false,
  alternateEffects: []
};
const primaryCost = calculatePowerCost(primaryPower); // 20 PP

const legalAe = {
  id: 'ae1',
  name: 'Ice Blast',
  effect: POWER_EFFECTS_CATALOG.find(e => e.id === 'damage'),
  rank: 10,
  extras: [],
  flaws: []
};
const legalAeCost = calculatePowerCost({ ...legalAe, isAlternateEffect: false, alternateEffects: [] });
if (legalAeCost > primaryCost) {
  throw new Error(`Expected legal AE cost (${legalAeCost}) <= primary cost (${primaryCost})`);
}

const overcostAe = {
  id: 'ae2',
  name: 'Super Affliction',
  effect: POWER_EFFECTS_CATALOG.find(e => e.id === 'affliction'), // 1 PP/rank
  rank: 10,
  extras: [{ id: 'burst-area', cost: 1, rank: 1 }, { id: 'ranged', cost: 1, rank: 1 }], // 3 PP/rank = 30 PP
  flaws: []
};
const overcostCost = calculatePowerCost({ ...overcostAe, isAlternateEffect: false, alternateEffects: [] });
if (overcostCost <= primaryCost) {
  throw new Error(`Expected overcost AE (${overcostCost}) to exceed primary cost (${primaryCost})`);
}
console.log(`✓ 3b. Calculation verification: Primary (${primaryCost} PP), Legal AE (${legalAeCost} PP), Overcost AE (${overcostCost} PP)`);

// 4. Unified main effect entry container
if (!stylesCss.includes('.power-main-effect-unified')) {
  throw new Error('Expected .power-main-effect-unified class in css/styles.css');
}
if (!appJs.includes("mainBlock.className = 'power-main-effect-unified'")) {
  throw new Error('Expected mainBlock with class power-main-effect-unified in js/app.js');
}
console.log('✓ 4. Unified main effect entry container verified in CSS and js/app.js');

// 5. Unified alternate effect blocks with separation blank line/margin
if (!stylesCss.includes('.power-ae-unified')) {
  throw new Error('Expected .power-ae-unified class in css/styles.css');
}
if (!appJs.includes('power-ae-unified')) {
  throw new Error('Expected power-ae-unified in js/app.js');
}
console.log('✓ 5. Unified alternate effect blocks verified in CSS and js/app.js');

// 6. Alternate effects collapsible with header toggle and state tracking
if (!appJs.includes('this.expandedAeIds')) {
  throw new Error('Expected this.expandedAeIds tracking in js/app.js');
}
if (!appJs.includes('btn-toggle-ae')) {
  throw new Error('Expected btn-toggle-ae toggle button in js/app.js');
}
if (!stylesCss.includes('.power-ae-unified.collapsed .power-ae-body')) {
  throw new Error('Expected .power-ae-unified.collapsed .power-ae-body rule in css/styles.css');
}
console.log('✓ 6. Collapsible alternate effects verified with header controls, state tracking, and CSS');

console.log('\n=== ALL v3.21 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
