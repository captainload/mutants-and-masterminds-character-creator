import fs from 'fs';
import path from 'path';
import assert from 'assert';

const baseDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

console.log('--- Running v3.82 Feature Verification Tests ---');

// 1. Version checks
const vJson = JSON.parse(fs.readFileSync(path.join(baseDir, 'version.json'), 'utf8'));
assert.strictEqual(vJson.version, '3.82', 'version.json must be 3.82');
console.log('✓ version.json is v3.82');

const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
assert(indexHtml.includes('Mutants & Masterminds 3E - Character Editor v3.82'), 'index.html title has v3.82');
assert(indexHtml.includes('<span id="header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.82</span>'), 'index.html header version tag is v3.82');
assert(indexHtml.includes('css/styles.css?v=3.82'), 'index.html styles.css link has ?v=3.82');
assert(indexHtml.includes('js/app.js?v=3.82'), 'index.html app.js script has ?v=3.82');
console.log('✓ index.html versions are v3.82');

const appJs = fs.readFileSync(path.join(baseDir, 'js/app.js'), 'utf8').replace(/\r\n/g, '\n');
assert(appJs.includes("const CURRENT_VERSION = '3.82';"), 'app.js CURRENT_VERSION is 3.82');
console.log('✓ js/app.js version is v3.82');

const tablesJs = fs.readFileSync(path.join(baseDir, 'js/tables.js'), 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.82'), 'tables.js styles link is v3.82');
console.log('✓ js/tables.js stylesheet link is v3.82');

const archJs = fs.readFileSync(path.join(baseDir, 'js/archetype_window.js'), 'utf8');
assert(archJs.includes('css/styles.css?v=3.82'), 'archetype_window.js styles link is v3.82');
console.log('✓ js/archetype_window.js stylesheet link is v3.82');

const partyJs = fs.readFileSync(path.join(baseDir, 'js/party.js'), 'utf8');
assert(partyJs.includes('css/styles.css?v=3.82'), 'party.js styles link is v3.82');
console.log('✓ js/party.js stylesheet link is v3.82');

// 2. Title shift left
const stylesCss = fs.readFileSync(path.join(baseDir, 'css/styles.css'), 'utf8').replace(/\r\n/g, '\n');
assert(stylesCss.includes('text-align: left;'), 'styles.css has text-align: left for brand title');
assert(stylesCss.includes('justify-content: flex-start;'), 'styles.css has justify-content: flex-start for brand title');
console.log('✓ App title shifted to the left');

// 3. 30 Character username limits
assert(indexHtml.includes('id="header-player-name" class="header-field-input" placeholder="Player Name" maxlength="30"'), 'header-player-name has maxlength 30');
assert(indexHtml.includes('id="auth-signup-username" class="header-field-input" placeholder="e.g. CaptainCosmo" maxlength="30"'), 'auth-signup-username has maxlength 30');

const supabaseClientJs = fs.readFileSync(path.join(baseDir, 'js/supabase_client.js'), 'utf8');
assert(supabaseClientJs.includes("if (cleanUser.length > 30) throw new Error('Username cannot exceed 30 characters.');"), 'supabase_client.js signUp enforces 30 char limit');

assert(appJs.includes("if (username.length > 30) {\n        showAuthStatus('Username cannot exceed 30 characters.', true);"), 'app.js sign-up validation checks 30 chars');
assert(appJs.includes("const uname = rawUname.length > 30 ? rawUname.slice(0, 30) : rawUname;"), 'app.js updateAuthHeaderUI slices username to 30 chars');
assert(appJs.includes("this.char.playerName = (e.target.value || '').slice(0, 30);"), 'app.js player name input event slices to 30 chars');
console.log('✓ Usernames strictly limited to 30 characters across HTML, app.js, and supabase_client.js');

// 4. Expanding user names leftwards and nowrap header-fields-row
assert(stylesCss.includes('header-account-area {\n  flex: 1 1 auto;'), 'header-account-area has flex: 1 1 auto to take available leftward space');
assert(stylesCss.includes('header-fields-row {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-bottom: 0.4rem;\n  flex-wrap: nowrap;\n}'), 'header-fields-row has flex-wrap: nowrap to prevent row overflow');
assert(stylesCss.includes('#header-auth-label {\n  pointer-events: none;\n  display: inline-block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 260px;\n  text-align: right;\n}'), 'header-auth-label expands leftwards and truncates cleanly');
console.log('✓ User button expands leftwards and header row will not wrap');

// 5. HP total and Spend HP relocated to Action Center above Edit abilities
assert(indexHtml.includes('<!-- Relocated HP total & Spend HP button (above Edit abilities) -->'), 'index.html contains relocated HP group above Edit abilities');
assert(indexHtml.includes('id="btn-quick-spend-hp"'), 'btn-quick-spend-hp exists');
assert(indexHtml.includes('id="btn-action-edit-abilities"'), 'btn-action-edit-abilities exists');
const editAbilitiesIdx = indexHtml.indexOf('id="btn-action-edit-abilities"');
const quickSpendHpIdx = indexHtml.indexOf('id="btn-quick-spend-hp"');
assert(quickSpendHpIdx !== -1 && quickSpendHpIdx < editAbilitiesIdx, 'Quick spend HP is placed before/above Edit abilities button');
console.log('✓ HP total and Spend HP relocated above Edit abilities button');

// 6. Campaigns button relocated to header-row-2 where Spend HP was
const headerRow2Idx = indexHtml.indexOf('class="header-row header-row-2"');
const btnCampaignsIdx = indexHtml.indexOf('id="btn-open-campaigns"');
const row2RightIdx = indexHtml.indexOf('class="row-2-right"');
assert(btnCampaignsIdx > headerRow2Idx && btnCampaignsIdx < row2RightIdx, 'Campaigns button relocated to header-row-2 where Spend HP was');
console.log('✓ Campaigns button relocated to header-row-2');

// 7. Widen Campaign field & make non-editable
assert(indexHtml.includes('id="header-campaign-name" class="header-field-input" placeholder="Campaign / Setting" style="width: 260px; cursor: pointer;" readonly'), 'header-campaign-name is 260px wide, pointer cursor, and readonly');
assert(appJs.includes('campaignInput.readOnly = true;'), 'app.js sets campaignInput.readOnly = true');
assert(appJs.includes("campaignInput?.addEventListener('click', openCampaignsHandler);"), 'app.js opens campaign tracker when campaign field is clicked');
console.log('✓ Campaign field is widened to 260px and non-editable (opens campaign tracker on click)');

// 8. Dice icons on Abilities and Defenses roll buttons
assert(appJs.includes('🎲 ${abShort}'), 'Abilities roll buttons have 🎲 icon');
assert(appJs.includes('🎲 ${def.name}'), 'Defenses roll buttons have 🎲 icon');
console.log('✓ Dice icons added to roll-enabled abilities and defenses buttons');

// 9. Font size checks (>= 10pt across all elements)
const ptMatches = indexHtml.match(/font-size:\s*([0-9.]+)pt/g) || [];
ptMatches.forEach(m => {
  const num = parseFloat(m.replace(/font-size:\s*/, '').replace('pt', ''));
  assert(num >= 10, `Font size must be >= 10pt, found: ${m}`);
});
console.log(`✓ All explicit pt font-sizes (${ptMatches.length} occurrences) are >= 10pt`);

console.log('\n--- ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
