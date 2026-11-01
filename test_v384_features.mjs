import fs from 'fs';
import path from 'path';
import assert from 'assert';

const baseDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

console.log('--- Running v3.84 Feature Verification Tests ---');

// 1. Version checks
const vJson = JSON.parse(fs.readFileSync(path.join(baseDir, 'version.json'), 'utf8'));
assert.strictEqual(vJson.version, '3.84', 'version.json must be 3.84');
console.log('✓ version.json is v3.84');

const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
assert(indexHtml.includes('Mutants & Masterminds 3E - Character Editor v3.84'), 'index.html title has v3.84');
assert(indexHtml.includes('<span id="header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.84</span>'), 'index.html header version tag is v3.84');
assert(indexHtml.includes('css/styles.css?v=3.84'), 'index.html styles.css link has ?v=3.84');
assert(indexHtml.includes('js/app.js?v=3.84'), 'index.html app.js script has ?v=3.84');
console.log('✓ index.html versions are v3.84');

const appJs = fs.readFileSync(path.join(baseDir, 'js/app.js'), 'utf8').replace(/\r\n/g, '\n');
assert(appJs.includes("const CURRENT_VERSION = '3.84';"), 'app.js CURRENT_VERSION is 3.84');
console.log('✓ js/app.js version is v3.84');

const tablesJs = fs.readFileSync(path.join(baseDir, 'js/tables.js'), 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.84'), 'tables.js styles link is v3.84');
console.log('✓ js/tables.js stylesheet link is v3.84');

const archJs = fs.readFileSync(path.join(baseDir, 'js/archetype_window.js'), 'utf8');
assert(archJs.includes('css/styles.css?v=3.84'), 'archetype_window.js styles link is v3.84');
console.log('✓ js/archetype_window.js stylesheet link is v3.84');

const partyJs = fs.readFileSync(path.join(baseDir, 'js/party.js'), 'utf8');
assert(partyJs.includes('css/styles.css?v=3.84'), 'party.js styles link is v3.84');
console.log('✓ js/party.js stylesheet link is v3.84');

// 2. HP group in Action Center right column above Edit Abilities
const actionSideColIdx = indexHtml.indexOf('class="action-side-col"');
assert(actionSideColIdx !== -1, 'action-side-col must exist');

const hpCardIdx = indexHtml.indexOf('class="card-box hp-status-card"');
assert(hpCardIdx !== -1, 'hp-status-card must exist');
assert(hpCardIdx > actionSideColIdx, 'hp-status-card must be inside action-side-col (right column)');

const editAbilitiesBtnIdx = indexHtml.indexOf('id="btn-open-abilities-dialog"');
assert(editAbilitiesBtnIdx !== -1, 'btn-open-abilities-dialog must exist');
assert(hpCardIdx < editAbilitiesBtnIdx, 'hp-status-card must be placed above btn-open-abilities-dialog');

assert(indexHtml.includes('id="header-hp-val"'), 'header-hp-val exists');
assert(indexHtml.includes('id="btn-hp-minus"'), 'btn-hp-minus exists');
assert(indexHtml.includes('id="btn-hp-plus"'), 'btn-hp-plus exists');
assert(indexHtml.includes('id="btn-quick-spend-hp"'), 'btn-quick-spend-hp exists');

// Verify that left column action-main-col does NOT contain hp-status-group
const actionMainColIdx = indexHtml.indexOf('class="action-main-col"');
const subContent = indexHtml.slice(actionMainColIdx, actionSideColIdx);
assert(!subContent.includes('id="btn-quick-spend-hp"'), 'btn-quick-spend-hp is no longer in action-main-col');
assert(!subContent.includes('id="header-hp-val"'), 'header-hp-val is no longer in action-main-col');
console.log('✓ HP display and Spend HP button cleanly positioned in the right column above Edit Abilities button');

// 3. Stylesheet check
const stylesCss = fs.readFileSync(path.join(baseDir, 'css/styles.css'), 'utf8').replace(/\r\n/g, '\n');
assert(stylesCss.includes('.action-side-col .hp-status-card'), 'styles.css styles .action-side-col .hp-status-card');
console.log('✓ styles.css contains .action-side-col .hp-status-card styling');

// 4. Font size checks (>= 10pt across all elements)
const ptMatches = indexHtml.match(/font-size:\s*([0-9.]+)pt/g) || [];
ptMatches.forEach(m => {
  const num = parseFloat(m.replace(/font-size:\s*/, '').replace('pt', ''));
  assert(num >= 10, `Font size must be >= 10pt, found: ${m}`);
});
console.log(`✓ All explicit pt font-sizes (${ptMatches.length} occurrences) in index.html are >= 10pt`);

console.log('\n--- ALL v3.84 VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
