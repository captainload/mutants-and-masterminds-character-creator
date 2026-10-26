import fs from 'fs';
import { auditCharacter } from './js/rules.js';

console.log('=== Running v3.15 Requirements Test Suite ===\n');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (parseFloat(versionJson.version) < 3.15) {
  throw new Error(`Expected version.json to be >= 3.15, got ${versionJson.version}`);
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

// 2. Font Size Scaling Tests
const css = fs.readFileSync('css/styles.css', 'utf8');

// A. Tab names font size: var(--font-size-md)
const tabBtnMatch = css.match(/\.nav-tab-btn\s*\{([^}]+)\}/);
if (!tabBtnMatch || !tabBtnMatch[1].includes('var(--font-size-md)')) {
  throw new Error('Expected .nav-tab-btn in css/styles.css to use font-size: var(--font-size-md)');
}

// B. PP status label: var(--font-size-base) or var(--font-size-sm)
const ppLabelMatch = css.match(/\.pp-status-label\s*\{([^}]+)\}/);
if (!ppLabelMatch || (!ppLabelMatch[1].includes('var(--font-size-base)') && !ppLabelMatch[1].includes('var(--font-size-sm)'))) {
  throw new Error('Expected .pp-status-label in css/styles.css to use font-size: var(--font-size-base) or var(--font-size-sm)');
}

// C. Top row buttons: .btn-menu, .btn-archetype, .btn-tables use var(--font-size-base)
['.btn-menu', '.btn-archetype', '.btn-tables'].forEach(selector => {
  const match = css.match(new RegExp(`${selector.replace('.', '\\.')}\\s*\\{([^}]+)\\}`));
  if (!match || !match[1].includes('var(--font-size-base)')) {
    throw new Error(`Expected ${selector} in css/styles.css to use font-size: var(--font-size-base)`);
  }
});

// D. Advantages +Add / Remove button uses var(--font-size-base) in js/app.js
if (!appJs.includes('font-size: var(--font-size-base); font-weight: 800; min-width: 84px;')) {
  throw new Error('Expected Advantages toggle button to use var(--font-size-base)');
}

// E. Skills specialty buttons use var(--font-size-base) in js/app.js
if (!appJs.includes('btn-skill-add-specialty') || !appJs.includes('min-height: 36px; font-size: var(--font-size-base); font-weight: 800;')) {
  throw new Error('Expected Skill add specialty button to use var(--font-size-base)');
}

if (!appJs.includes('btn-add-another-skill') || !appJs.includes('min-height: 38px; font-size: var(--font-size-base); font-weight: 800;')) {
  throw new Error('Expected Skill add another specialty button to use var(--font-size-base)');
}

console.log('✓ 2. Font sizes verified: Tab names (md), PP top row buttons (base), Advantages add buttons (base), Skill specialty buttons (base)');

// 3. Shorten Power Points to PP and Power Level to PL in Top Row Section
if (!indexHtml.includes('<span class="pp-status-label">PP:</span>')) {
  throw new Error('Expected "PP:" label in top row section of index.html');
}

if (!indexHtml.includes('<span class="pp-status-label">PL:</span>')) {
  throw new Error('Expected "PL:" label in top row section of index.html');
}

// Ensure the old long forms are removed from Row 2
const row2Match = indexHtml.match(/<div class="header-row-2">([\s\S]*?)<\/div>\s*<\/header>/);
if (!row2Match) {
  throw new Error('Could not find header-row-2 in index.html');
}
if (row2Match[1].includes('Power Points:')) {
  throw new Error('Found deprecated "Power Points:" in header-row-2. Should be shortened to "PP:"');
}
if (row2Match[1].includes('Power Level:')) {
  throw new Error('Found deprecated "Power Level:" in header-row-2. Should be shortened to "PL:"');
}

console.log('✓ 3. Labels in top row successfully shortened to "PP:" and "PL:"');

// 4. PL Steppers, Lock Checkbox, and Overrun Prevention Logic
if (!indexHtml.includes('id="btn-pl-minus"') || !indexHtml.includes('id="btn-pl-plus"')) {
  throw new Error('Missing PL stepper buttons (#btn-pl-minus, #btn-pl-plus) in index.html');
}

if (!indexHtml.includes('id="header-pl-lock"')) {
  throw new Error('Missing PL lock checkbox (#header-pl-lock) in index.html');
}

if (!appJs.includes('plMinusBtn?.addEventListener') || !appJs.includes('plPlusBtn?.addEventListener')) {
  throw new Error('Missing PL stepper event listeners in js/app.js');
}

if (!appJs.includes('header-pl-lock')) {
  throw new Error('Missing PL lock listener/handling in js/app.js');
}

if (!appJs.includes('Power Points Cost Overrun') || !appJs.includes('recover spent PP first')) {
  throw new Error('Missing PL cost overrun prevention message in js/app.js');
}

// Verify audit overrun logic unit check
const testChar = {
  powerLevel: 10,
  powerPointsBudget: 150,
  abilities: { str: 10, sta: 10 } // 20 ranks * 2 = 40 PP
};
const testAudit = auditCharacter(testChar);
const targetPL = 2; // budget = 30 PP
const targetBudget = targetPL * 15;
if (testAudit.totalSpent <= targetBudget) {
  throw new Error(`Test setup failed: expected spent (${testAudit.totalSpent}) > budget (${targetBudget})`);
}

console.log('✓ 4. PL stepper, lock checkbox, and cost overrun prevention verified');

console.log('\n=== ALL v3.15 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
