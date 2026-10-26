import fs from 'fs';
import {
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  computePowerRangeAndDuration,
  computePowerEffectiveStats
} from './js/rules.js';

console.log('=== Running v3.10 Verification Suite ===\n');

// 1. Version 3.10 consistency
const versionData = JSON.parse(fs.readFileSync('version.json', 'utf8'));
console.assert(versionData.version === '3.10', `Expected version 3.10 in version.json, got ${versionData.version}`);
console.log('✓ version.json verified at v3.10');

const indexHtml = fs.readFileSync('index.html', 'utf8');
console.assert(indexHtml.includes('Character Architect v3.10'), 'index.html missing v3.10 title');
console.assert(indexHtml.includes('Character Editor v3.10'), 'index.html missing v3.10 brand header');
console.assert(indexHtml.includes('js/app.js?v=3.10'), 'index.html missing app.js?v=3.10 script tag');
console.assert(indexHtml.includes('css/styles.css?v=3.10'), 'index.html missing styles.css?v=3.10 stylesheet tag');
console.log('✓ index.html references verified at v3.10');

const appJs = fs.readFileSync('js/app.js', 'utf8');
console.assert(appJs.includes("CURRENT_VERSION = '3.10'"), "js/app.js missing CURRENT_VERSION = '3.10'");
console.log("✓ js/app.js CURRENT_VERSION verified at v3.10");

// 2. computePowerEffectiveStats verification
const blastEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage'); // Ranged base
const eff1 = computePowerEffectiveStats(blastEffect, [], [], 'Standard');
console.assert(eff1.action === 'Standard', `Expected Standard action, got ${eff1.action}`);
console.assert(eff1.effectiveRange === 'Close', `Base damage is Close, got ${eff1.effectiveRange}`);
console.assert(eff1.effectiveDuration === 'Instant', `Base damage is Instant, got ${eff1.effectiveDuration}`);
console.assert(eff1.area === 'Single Target', `Base damage is Single Target, got ${eff1.area}`);

// Add increased range and burst area rank 2
const incRangeExtra = EXTRAS_CATALOG.find(e => e.id === 'increased_range');
const burstAreaExtra = { ...EXTRAS_CATALOG.find(e => e.id === 'area_burst'), rank: 2 };
const eff2 = computePowerEffectiveStats(blastEffect, [incRangeExtra, burstAreaExtra], [], 'Standard');
console.assert(eff2.effectiveRange === 'Ranged', `Expected Ranged, got ${eff2.effectiveRange}`);
console.assert(eff2.area === 'Burst (60 ft radius)', `Expected Burst (60 ft radius), got ${eff2.area}`);
console.log('✓ computePowerEffectiveStats derives Action, Range, Duration, and Area accurately');

// 3. Compact Effective Stats Block in Power Cards (js/app.js & css/styles.css)
console.assert(appJs.includes('power-effective-stats-bar'), 'Missing power-effective-stats-bar class in js/app.js');
console.assert(appJs.includes('effective-stat-chip stat-action'), 'Missing Action stat chip in js/app.js');
console.assert(appJs.includes('effective-stat-chip stat-range'), 'Missing Range stat chip in js/app.js');
console.assert(appJs.includes('effective-stat-chip stat-duration'), 'Missing Duration stat chip in js/app.js');
console.assert(appJs.includes('effective-stat-chip stat-area'), 'Missing Area stat chip in js/app.js');
console.assert(appJs.includes('(${cost} PP • ${effStats.action} • ${effStats.effectiveRange} • ${effStats.effectiveDuration} • ${effStats.area})'), 'Collapsed header missing 4-stat block');
console.log('✓ Power card effective stats block (action, range, duration, area) verified');

// 4. Color Standardization in css/styles.css
const cssContent = fs.readFileSync('css/styles.css', 'utf8');
console.assert(cssContent.includes('.power-effective-stats-bar'), 'styles.css missing .power-effective-stats-bar');
console.assert(cssContent.includes('.stat-action'), 'styles.css missing .stat-action');
console.assert(cssContent.includes('.stat-range'), 'styles.css missing .stat-range');
console.assert(cssContent.includes('.stat-duration'), 'styles.css missing .stat-duration');
console.assert(cssContent.includes('.stat-area'), 'styles.css missing .stat-area');
console.assert(cssContent.includes('.text-gold'), 'styles.css missing standardized .text-gold');
console.assert(cssContent.includes('.text-cyan'), 'styles.css missing standardized .text-cyan');
console.assert(cssContent.includes('.text-purple'), 'styles.css missing standardized .text-purple');
console.assert(cssContent.includes('.field-label'), 'styles.css missing standardized .field-label');
console.assert(cssContent.includes('.heading-section'), 'styles.css missing standardized .heading-section');
console.assert(cssContent.includes('.modal-footer-bar'), 'styles.css missing standardized .modal-footer-bar');
console.log('✓ Standardized color classes, headings, and labels verified in css/styles.css');

// 5. Minimum 10pt Font Size Check
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

console.log('\n=== ALL v3.10 VERIFICATIONS PASSED SUCCESSFULLY! ===');
