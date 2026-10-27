import fs from 'fs';
import { FLAWS_CATALOG, EXTRAS_CATALOG, POWER_EFFECTS_CATALOG } from './js/rules.js';

console.log('=== Running v3.28 Requirements Test Suite ===\n');

// 1. Version Check: >= 3.28 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
const verNum = parseFloat(versionJson.version);
if (verNum < 3.28) {
  throw new Error(`Expected version.json to be >= 3.28, got ${versionJson.version}`);
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

// 2. Limited: Custom flaw verification
const limitedCustom = FLAWS_CATALOG.find(f => f.id === 'limited_custom');
if (!limitedCustom) {
  throw new Error('Limited: Custom flaw (id: limited_custom) not found in FLAWS_CATALOG');
}
if (limitedCustom.name !== 'Limited: Custom') {
  throw new Error(`Expected name to be "Limited: Custom", got "${limitedCustom.name}"`);
}
if (limitedCustom.cost !== 1 || limitedCustom.isFlat !== false || !limitedCustom.isRanked || limitedCustom.maxRank !== 2) {
  throw new Error('Limited: Custom has incorrect cost, ranking, or maxRank parameters');
}
if (limitedCustom.isUnique !== false) {
  throw new Error('Limited: Custom should not be unique');
}

// Check that app.js renders "Limited:" label and input-limited-custom-desc
if (!appJs.includes('Limited:</label>') || !appJs.includes('input-limited-custom-desc')) {
  throw new Error('Expected app.js to render a field labeled "Limited:" with class input-limited-custom-desc');
}
if (!appJs.includes("fl.id === 'limited_custom'")) {
  throw new Error('Expected app.js to check fl.id === "limited_custom" for rendering the custom limitation field');
}
console.log('✓ 2. Limited: Custom flaw verified in FLAWS_CATALOG and UI template with "Limited:" label');

// 3. Alternate Effect Dynamic Naming
// Verify new AEs get name from assigned effect (not hardcoded (Alt X))
if (appJs.includes("name: `${p.name || 'Power'} (Alt ${nextNum})`")) {
  throw new Error('Found old hardcoded alternate effect naming template in js/app.js');
}
if (!appJs.includes("name: defaultEffect.name")) {
  throw new Error('Expected new alternate effect to be initialized with defaultEffect.name');
}
if (!appJs.includes("ae.isCustomName = true")) {
  throw new Error('Expected editing AE name to set ae.isCustomName = true');
}
// Verify effect change retains custom name or updates if unedited
const effectChangeRegex = /ae\.effect\s*=\s*newEff;\s*if\s*\(!ae\.isCustomName/s;
if (!effectChangeRegex.test(appJs)) {
  throw new Error('Expected select-ae-effect change handler to preserve custom names and update unedited names');
}
console.log('✓ 3. Dynamic Alternate Effect naming logic verified (starts with effect name, updates on effect change unless edited by user)');

// 4. Redundant footer notes and PP cost total removed
// The footerBar should now only have the collapse button, without redundant input-power-notes or Total PP
const footerBarMatches = appJs.match(/footerBar\.innerHTML\s*=\s*`([^`]+)`/);
if (!footerBarMatches) {
  throw new Error('footerBar.innerHTML template not found in js/app.js');
}
const footerBarContent = footerBarMatches[1];
if (footerBarContent.includes('input-power-notes')) {
  throw new Error('Redundant input-power-notes still present in footerBar');
}
if (footerBarContent.includes('Total:')) {
  throw new Error('Redundant Total PP display still present in footerBar');
}
if (!footerBarContent.includes('btn-collapse-card')) {
  throw new Error('Expected footerBar to retain btn-collapse-card');
}
console.log('✓ 4. Redundant effect description field and PP cost total removed from power record footerBar');

// 5. Modifier & Profile Dropdowns disabled until selected, and repeated clicks don't add unseen items
if (appJs.includes('if (!selectedId && legalExtras.length > 0) selectedId = legalExtras[0].id;')) {
  throw new Error('Found fallback to unseen legalExtras[0].id in btn-add-extra handler');
}
if (appJs.includes('if (!selectedId && legalFlaws.length > 0) selectedId = legalFlaws[0].id;')) {
  throw new Error('Found fallback to unseen legalFlaws[0].id in btn-add-flaw handler');
}

// Extra button starts disabled in markup
if (!appJs.includes('<button class="btn btn-outline btn-add-extra" style="font-size: var(--font-size-sm); min-height: 32px; padding: 0.2rem 0.55rem; white-space: nowrap; flex-shrink: 0; border-color: var(--hero-blue); color: #fff;" disabled>+ Add Extra</button>')) {
  throw new Error('Expected btn-add-extra to have disabled attribute by default in HTML template');
}
// Flaw button starts disabled in markup
if (!appJs.includes('<button class="btn btn-outline btn-add-flaw" style="font-size: var(--font-size-sm); min-height: 32px; padding: 0.2rem 0.55rem; white-space: nowrap; flex-shrink: 0; border-color: var(--hero-blue); color: #fff;" disabled>+ Add Flaw</button>')) {
  throw new Error('Expected btn-add-flaw to have disabled attribute by default in HTML template');
}

// Change listener updates disabled state
if (!appJs.includes('extraSelectEl?.addEventListener(\'change\'') || !appJs.includes('flawSelectEl?.addEventListener(\'change\'')) {
  throw new Error('Expected change listeners on select-add-extra and select-add-flaw to toggle button disabled state');
}

// Power profiles apply button starts disabled in index.html and setupPowerProfiles
if (!indexHtml.includes('id="btn-apply-profile"') || !indexHtml.includes('id="btn-apply-profile" style="min-height: 40px; font-size: var(--font-size-base); font-weight: 800;" disabled>')) {
  throw new Error('Expected #btn-apply-profile to be disabled by default in index.html');
}
if (!appJs.includes('applyBtn.disabled = !select.value;')) {
  throw new Error('Expected setupPowerProfiles to enforce applyBtn.disabled = !select.value');
}

console.log('✓ 5. Modifier and profile add buttons disabled unless item selected; fallbacks to unseen dropdown items eliminated');

// 6. JS Syntax & App Initialization Check
import { execSync } from 'child_process';
try {
  execSync('node --check js/app.js', { stdio: 'pipe' });
  execSync('node test_app_init.mjs', { stdio: 'pipe' });
} catch (err) {
  throw new Error(`Syntax or initialization error in app.js: ${err.message}`);
}
console.log('✓ 6. js/app.js syntax check and test_app_init initialization verified');

console.log('\n=== ALL v3.28 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
