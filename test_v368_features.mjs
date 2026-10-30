import { readFileSync } from 'fs';
import assert from 'assert';

console.log('--- Testing v3.68 Unified Cloud Restoration Pop-Up Suite ---');

// 1. Verify v3.68 version consistency
const versionJson = JSON.parse(readFileSync('version.json', 'utf8'));
assert.strictEqual(versionJson.version, '3.68', `Expected 3.68 in version.json, got ${versionJson.version}`);

const indexHtml = readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.68'), 'index.html title missing v3.68');
assert(indexHtml.includes('css/styles.css?v=3.68'), 'index.html styles missing v3.68 query');
assert(indexHtml.includes('>v3.68</span>'), 'index.html version badge missing v3.68');
assert(indexHtml.includes('js/app.js?v=3.68'), 'index.html app.js script missing v3.68 query');

const appJs = readFileSync('js/app.js', 'utf8');
assert(appJs.includes("CURRENT_VERSION = '3.68'"), 'app.js CURRENT_VERSION missing 3.68');
assert(appJs.includes("power_profiles.js?v=3.68"), 'app.js power_profiles query missing 3.68');

const archJs = readFileSync('js/archetype_window.js', 'utf8');
assert(archJs.includes('css/styles.css?v=3.68'), 'archetype_window.js styles link missing 3.68');

const partyJs = readFileSync('js/party.js', 'utf8');
assert(partyJs.includes('css/styles.css?v=3.68'), 'party.js styles link missing 3.68');

const tablesJs = readFileSync('js/tables.js', 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.68'), 'tables.js styles link missing 3.68');

console.log('✓ v3.68 version verified across all files');

// 2. Verify unified cloud restoration logic in js/app.js
assert(appJs.includes('btn-confirm-restore-now'), 'inline confirm restore button missing in app.js');
assert(appJs.includes('btn-confirm-delete-now'), 'inline confirm delete button missing in app.js');
assert(appJs.includes('btn-cancel-confirm'), 'inline cancel button missing in app.js');
assert(appJs.includes('Replace active hero in workspace with'), 'inline replace warning missing in app.js');

// Ensure openCloudRestoreModal does NOT use this.showConfirmDialog to prevent overlapping pop-ups
const startIndex = appJs.indexOf('openCloudRestoreModal()');
const endIndex = appJs.indexOf('// =======================================================\n  // GM', startIndex);
const openCloudRestoreSnippet = appJs.slice(startIndex, endIndex > startIndex ? endIndex : startIndex + 3000);
assert(!openCloudRestoreSnippet.includes('this.showConfirmDialog('), 'openCloudRestoreModal must not call showConfirmDialog so pop-ups do not layer on top of each other');

console.log('✓ Unified inline confirmation verified in openCloudRestoreModal without overlapping pop-ups');

console.log('ALL v3.68 UNIFIED CLOUD RESTORATION TESTS PASSED CLEANLY!');
