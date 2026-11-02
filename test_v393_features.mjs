import fs from 'fs';
import assert from 'assert';

console.log('Testing v3.93 features...');

const appJs = fs.readFileSync('js/app.js', 'utf8').replace(/\r\n/g, '\n');
const partyJs = fs.readFileSync('js/party.js', 'utf8').replace(/\r\n/g, '\n');
const subJs = fs.readFileSync('js/supabase_client.js', 'utf8').replace(/\r\n/g, '\n');
const indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));

// 1. Version check
assert.strictEqual(versionJson.version, '3.93', 'version.json should be 3.93');
assert(indexHtml.includes('Character Editor v3.93'), 'index.html title must reflect v3.93');
assert(indexHtml.includes('header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.93<'), 'index.html header version tag must be v3.93');
assert(indexHtml.includes('js/app.js?v=3.93"'), 'index.html app.js import must have ?v=3.93');
assert(indexHtml.includes('css/styles.css?v=3.93"'), 'index.html css import must have ?v=3.93');
assert(appJs.includes("CURRENT_VERSION = '3.93';"), 'app.js CURRENT_VERSION must be 3.93');

// 2. Window Globals and isInitialized assigned in AppController constructor
assert(appJs.includes('window.appController = this;'), 'app.js constructor must assign window.appController = this');
assert(appJs.includes('this._isInitialized = false;'), 'app.js constructor must initialize this._isInitialized = false');
assert(appJs.includes('this._isInitialized = true;'), 'app.js init must set this._isInitialized = true');

// 3. updateAuthHeaderUI guards heavy view rendering behind this._isInitialized
const authUiStart = appJs.indexOf('updateAuthHeaderUI(user = supabaseService.getUser())');
const authUiMethod = appJs.slice(authUiStart, authUiStart + 3500);
assert(authUiMethod.includes('if (this._isInitialized)'), 'updateAuthHeaderUI must check this._isInitialized');

// 4. SupabaseService onAuthStateChange defers INITIAL callback
assert(subJs.includes('onAuthStateChange(callback) {'), 'supabase_client.js must have onAuthStateChange');
assert(subJs.includes('setTimeout(() => {') && subJs.includes("callback(this.currentUser, this.currentProfile, 'INITIAL');"), 'supabase_client.js onAuthStateChange must defer initial callback');

// 5. Cache busting on all module imports
assert(appJs.includes("from './party.js?v=3.93';"), 'app.js must import party.js with ?v=3.93');
assert(appJs.includes("from './supabase_client.js?v=3.93';"), 'app.js must import supabase_client.js with ?v=3.93');
assert(appJs.includes("from './tables.js?v=3.93';"), 'app.js must import tables.js with ?v=3.93');
assert(partyJs.includes("from './supabase_client.js?v=3.93';"), 'party.js must import supabase_client.js with ?v=3.93');

// 6. Defensive check in openCreateCampaignDialog
assert(appJs.includes('partyManager?.isUserLoggedIn'), 'app.js openCreateCampaignDialog must use optional chaining on partyManager.isUserLoggedIn');

// 7. Defensive syncCloudCampaignsToLocal in party.js
assert(partyJs.includes("typeof this.isUserLoggedIn === 'function'"), 'party.js generateCampaignBrowserHTML must check typeof this.isUserLoggedIn === function');
assert(partyJs.includes("typeof supabaseService.syncCloudCampaignsToLocal === 'function'"), 'party.js must check typeof supabaseService.syncCloudCampaignsToLocal === function');

console.log('All static assertion tests passed!');
