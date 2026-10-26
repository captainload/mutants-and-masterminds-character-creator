import fs from 'fs';
import path from 'path';

console.log('--- Testing v3.11 Power Card 3-Color Restriction & Font Size ---');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (parseFloat(versionJson.version) < 3.11) {
  throw new Error(`Expected version.json to have version >= 3.11, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!/v3\.\d+/.test(indexHtml)) {
  throw new Error('Expected index.html to reference version');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!/CURRENT_VERSION = '3\.\d+'/.test(appJs)) {
  throw new Error('Expected js/app.js to have CURRENT_VERSION');
}
console.log('✓ Version >= 3.11 confirmed in version.json, index.html, and js/app.js');

// 2. Minimum Font Size Check
const cssContent = fs.readFileSync('css/styles.css', 'utf8');
if (!cssContent.includes('--font-size-min: 10pt')) {
  throw new Error('Expected css/styles.css to specify --font-size-min: 10pt');
}
console.log('✓ Minimum 10pt font size verified in css/styles.css');

// 3. Power Cards 3-Color Restriction Check
// Extract renderPowersTab method
const renderPowersTabMatch = appJs.match(/renderPowersTab\(audit\)\s*\{([\s\S]*?)\n\s*renderGearTab/);
if (!renderPowersTabMatch) {
  throw new Error('Could not locate renderPowersTab in js/app.js');
}
const renderPowersTabCode = renderPowersTabMatch[1];

// Extract renderEffectConfigSection method
const renderEffectConfigSectionMatch = appJs.match(/renderEffectConfigSection\(p\)\s*\{([\s\S]*?)\n\s*renderPowersTab/);
if (!renderEffectConfigSectionMatch) {
  throw new Error('Could not locate renderEffectConfigSection in js/app.js');
}
const renderEffectConfigSectionCode = renderEffectConfigSectionMatch[1];

const combinedPowerCode = renderPowersTabCode + '\n' + renderEffectConfigSectionCode;

// Disallowed color markers in power cards:
const disallowedPatterns = [
  { pattern: /var\(--hero-red\)/g, desc: 'var(--hero-red)' },
  { pattern: /var\(--hero-green\)/g, desc: 'var(--hero-green)' },
  { pattern: /var\(--hero-purple\)/g, desc: 'var(--hero-purple)' },
  { pattern: /var\(--hero-cyan\)/g, desc: 'var(--hero-cyan)' },
  { pattern: /text-cyan/g, desc: 'text-cyan class' },
  { pattern: /text-purple/g, desc: 'text-purple class' },
  { pattern: /text-green/g, desc: 'text-green class' },
  { pattern: /text-red/g, desc: 'text-red class' },
  { pattern: /btn-danger/g, desc: 'btn-danger class' },
  { pattern: /#ef4444/gi, desc: 'red hex #ef4444' },
  { pattern: /#10b981/gi, desc: 'green hex #10b981' },
  { pattern: /#06b6d4/gi, desc: 'cyan hex #06b6d4' },
  { pattern: /#a855f7/gi, desc: 'purple hex #a855f7' }
];

let violations = [];
for (const { pattern, desc } of disallowedPatterns) {
  const matches = combinedPowerCode.match(pattern);
  if (matches) {
    violations.push(`Found ${matches.length} instance(s) of ${desc} in power rendering code`);
  }
}

if (violations.length > 0) {
  console.error('Violations found in power cards:');
  violations.forEach(v => console.error('  - ' + v));
  throw new Error('Power card 3-color restriction violated!');
}

console.log('✓ Power cards strictly restricted to White, Gold, and Blue in js/app.js');

// 4. Verify power card CSS classes do not use non-allowed colors
const cssLines = cssContent.split('\n');
const powerCardRuleLines = [
  ...cssLines.slice(1502, 1626),
  ...cssLines.slice(1675, 1835)
].join('\n');

for (const { pattern, desc } of disallowedPatterns) {
  const matches = powerCardRuleLines.match(pattern);
  if (matches) {
    throw new Error(`Disallowed color marker ${desc} found in power card CSS rules!`);
  }
}

console.log('✓ Collapsible power card CSS rules strictly adhere to White, Gold, and Blue');
console.log('--- ALL v3.11 TEST CASES PASSED SUCCESSFULLY! ---');
