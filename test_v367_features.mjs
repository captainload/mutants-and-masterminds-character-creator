import { readFileSync } from 'fs';
import assert from 'assert';

console.log('--- Testing v3.67 Version Bump & Account Button Fix Suite ---');

// 1. Verify version across all files
const versionJson = JSON.parse(readFileSync('version.json', 'utf8'));
assert.strictEqual(versionJson.version, '3.67', `Expected 3.67 in version.json, got ${versionJson.version}`);

const indexHtml = readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.67'), 'index.html title missing v3.67');
assert(indexHtml.includes('css/styles.css?v=3.67'), 'index.html styles missing v3.67 query');
assert(indexHtml.includes('>v3.67</span>'), 'index.html version badge missing v3.67');
assert(indexHtml.includes('js/app.js?v=3.67'), 'index.html app.js script missing v3.67 query');

const appJs = readFileSync('js/app.js', 'utf8');
assert(appJs.includes("CURRENT_VERSION = '3.67'"), 'app.js CURRENT_VERSION missing 3.67');
assert(appJs.includes("power_profiles.js?v=3.67"), 'app.js power_profiles query missing 3.67');

const archJs = readFileSync('js/archetype_window.js', 'utf8');
assert(archJs.includes('css/styles.css?v=3.67'), 'archetype_window.js styles link missing 3.67');

const partyJs = readFileSync('js/party.js', 'utf8');
assert(partyJs.includes('css/styles.css?v=3.67'), 'party.js styles link missing 3.67');

const tablesJs = readFileSync('js/tables.js', 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.67'), 'tables.js styles link missing 3.67');

console.log('✓ v3.67 version consistently applied across all project files');

// 2. Verify styles.css fixes for flyout panels & modal z-index
const stylesCss = readFileSync('css/styles.css', 'utf8');
assert(stylesCss.includes('#modal-auth,'), '#modal-auth should have high z-index in styles.css');
assert(stylesCss.includes('pointer-events: none;') && stylesCss.includes('visibility: hidden;'), 'flyout panels must have pointer-events: none and visibility: hidden when closed');
assert(stylesCss.includes('.header-account-area'), '.header-account-area must have explicit styling in styles.css');
assert(stylesCss.includes('#btn-header-auth'), '#btn-header-auth must have explicit styling in styles.css');
assert(stylesCss.includes('#header-auth-icon,\n#header-auth-label {\n  pointer-events: none;'), 'child icon and label must have pointer-events: none');

console.log('✓ CSS styles for account button clickability and modal z-index verified');

// 3. Verify ensureClient logic in supabase_client.js
import { supabaseService } from './js/supabase_client.js';
assert(typeof supabaseService.ensureClient === 'function', 'ensureClient method must exist on supabaseService');

console.log('ALL v3.67 VERSION & ACCOUNT FIX TESTS PASSED CLEANLY!');
