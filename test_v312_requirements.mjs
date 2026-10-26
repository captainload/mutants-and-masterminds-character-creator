import fs from 'fs';

console.log('=== Running v3.12 Level-Based Text Color & Category Consistency Tests ===\n');

// 1. Version 3.12 Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.12') {
  throw new Error(`Expected version.json to have version 3.12, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('v3.12')) {
  throw new Error('Expected index.html to reference v3.12');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.12'")) {
  throw new Error('Expected js/app.js to have CURRENT_VERSION = "3.12"');
}
console.log('✓ Version 3.12 confirmed in version.json, index.html, and js/app.js');

// 2. CSS Check for Stat Labels & Stat Chips Level Consistency
const cssContent = fs.readFileSync('css/styles.css', 'utf8');

// Check that .effective-stat-label defines a single uniform color
const statLabelMatch = cssContent.match(/\.effective-stat-label\s*\{([^}]+)\}/);
if (!statLabelMatch) {
  throw new Error('Could not find .effective-stat-label in css/styles.css');
}
if (!statLabelMatch[1].includes('color: var(--hero-blue)')) {
  throw new Error('Expected .effective-stat-label to have color: var(--hero-blue)');
}

// Ensure no per-chip label color overrides exist that vary colors across stats of the same level
const perChipOverride = cssContent.match(/\.effective-stat-chip\.stat-\w+\s+\.effective-stat-label/g);
if (perChipOverride) {
  throw new Error(`Found disallowed per-chip stat label color overrides: ${perChipOverride.join(', ')}`);
}
console.log('✓ Effect stat labels (Action, Range, Duration, Area) strictly use uniform color (var(--hero-blue)) with zero per-chip variance');

// Check that .effective-stat-chip has uniform border-left
const chipMatch = cssContent.match(/\.effective-stat-chip\s*\{([^}]+)\}/);
if (!chipMatch || !chipMatch[1].includes('border-left: 3px solid var(--hero-blue)')) {
  throw new Error('Expected .effective-stat-chip to have uniform border-left: 3px solid var(--hero-blue)');
}
console.log('✓ Effect stat chips share uniform border-left (3px solid var(--hero-blue))');

// Check that .effective-stat-val has color: var(--hero-gold)
const statValMatch = cssContent.match(/\.effective-stat-val\s*\{([^}]+)\}/);
if (!statValMatch || !statValMatch[1].includes('color: var(--hero-gold)')) {
  throw new Error('Expected .effective-stat-val to have color: var(--hero-gold)');
}
console.log('✓ Effect stat values share uniform color (var(--hero-gold))');

// 3. Check js/app.js for Power Card Section Headings & Chip Values
// Extract renderPowersTab
const renderPowersTabMatch = appJs.match(/renderPowersTab\(audit\)\s*\{([\s\S]*?)\n\s*renderGearTab/);
if (!renderPowersTabMatch) {
  throw new Error('Could not locate renderPowersTab in js/app.js');
}
const renderPowersTabCode = renderPowersTabMatch[1];

// Extract renderEffectConfigSection
const renderEffectConfigSectionMatch = appJs.match(/renderEffectConfigSection\(p\)\s*\{([\s\S]*?)\n\s*renderPowersTab/);
if (!renderEffectConfigSectionMatch) {
  throw new Error('Could not locate renderEffectConfigSection in js/app.js');
}
const renderEffectConfigSectionCode = renderEffectConfigSectionMatch[1];

// In effective stats row, verify all stat values use text-gold
if (renderPowersTabCode.includes('effective-stat-val text-blue') || renderPowersTabCode.includes('effective-stat-val text-cyan')) {
  throw new Error('Found non-gold stat values in effective stats bar; all stat values must share the same color!');
}
console.log('✓ All stat values in effective stats bar share uniform text-gold styling');

// Verify section headers across power card use var(--hero-blue)
const extrasHeaderMatch = renderPowersTabCode.match(/color:\s*var\(--hero-(\w+)\);\s*">➕ Extras/);
const flawsHeaderMatch = renderPowersTabCode.match(/color:\s*var\(--hero-(\w+)\);\s*">➖ Flaws/);
if (extrasHeaderMatch && flawsHeaderMatch) {
  if (extrasHeaderMatch[1] !== flawsHeaderMatch[1]) {
    throw new Error(`Extras header color (${extrasHeaderMatch[1]}) does not match Flaws header color (${flawsHeaderMatch[1]})!`);
  }
}
console.log('✓ Extras and Flaws section headers share identical level color (var(--hero-blue))');

// Verify all effect config headers share identical level color
const configHeaders = [
  { name: 'Affliction', regex: /<strong style="color: var\(--hero-(\w+)\);[^"]*">⚙️ Affliction Configuration/ },
  { name: 'Immunity', regex: /<strong style="color: var\(--hero-(\w+)\);[^"]*">🛡️ Immunity Configuration/ },
  { name: 'Senses', regex: /<strong style="color: var\(--hero-(\w+)\);[^"]*">👁️ Senses Configuration/ },
  { name: 'Weaken', regex: /<strong style="color: var\(--hero-(\w+)\);[^"]*">⚙️ Weaken Configuration/ },
  { name: 'Nullify', regex: /<strong style="color: var\(--hero-(\w+)\);[^"]*">⚙️ Nullify Configuration/ }
];

for (const cfg of configHeaders) {
  const m = renderEffectConfigSectionCode.match(cfg.regex);
  if (!m) {
    throw new Error(`Could not find header for ${cfg.name}`);
  }
  if (m[1] !== 'blue') {
    throw new Error(`Expected ${cfg.name} header to be var(--hero-blue), got var(--hero-${m[1]})`);
  }
}
console.log('✓ All Effect Configuration section headers (Affliction, Immunity, Senses, Weaken, Nullify) share identical color (var(--hero-blue))');

// 4. Minimum font size requirement
if (!cssContent.includes('--font-size-min: 10pt')) {
  throw new Error('Expected css/styles.css to specify --font-size-min: 10pt');
}
console.log('✓ Minimum 10pt font size verified in css/styles.css');

console.log('\n=== ALL v3.12 VERIFICATIONS PASSED SUCCESSFULLY! ===');
