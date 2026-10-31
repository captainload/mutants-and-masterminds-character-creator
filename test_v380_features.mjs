import assert from 'node:assert';
import fs from 'node:fs';

console.log('=== Testing v3.80 Features & Visual Enhancements ===');

// 1. Version checks
const vJson = JSON.parse(fs.readFileSync('./version.json', 'utf8'));
assert.strictEqual(vJson.version, '3.80', 'version.json should be 3.80');

const indexHtml = fs.readFileSync('./index.html', 'utf8');
assert.ok(indexHtml.includes('v3.80'), 'index.html contains v3.80');
assert.ok(indexHtml.includes('id="join-requests-alert-banner"'), 'index.html contains join-requests-alert-banner inside modal-join-requests');

const appJs = fs.readFileSync('./js/app.js', 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.80'"), 'app.js CURRENT_VERSION is 3.80');
assert.ok(appJs.includes('join-requests-alert-banner'), 'app.js references join-requests-alert-banner');
assert.ok(!appJs.includes("await this.showAlertDialog(`Approved"), 'app.js no longer pops alert under approval modal');

const stylesCss = fs.readFileSync('./css/styles.css', 'utf8');
assert.ok(stylesCss.includes('#modal-alert-dialog,\n#modal-confirm-dialog,\n#modal-prompt-dialog {\n  z-index: 3000;\n}') ||
          stylesCss.includes('#modal-alert-dialog,\r\n#modal-confirm-dialog,\r\n#modal-prompt-dialog {\r\n  z-index: 3000;\r\n}'),
          'styles.css has modal-alert-dialog z-index at 3000');
assert.ok(stylesCss.includes('.campaign-actions-panel'), 'styles.css has campaign-actions-panel');
assert.ok(stylesCss.includes('.campaign-gm-panel'), 'styles.css has campaign-gm-panel');
assert.ok(stylesCss.includes('.campaign-browser-toolbar-separator'), 'styles.css has campaign-browser-toolbar-separator');

console.log('✓ 1. Version 3.80 and asset references verified.');

// 2. Mock environment setup before importing party.js
class MockLocalStorage {
  constructor() { this.store = {}; }
  getItem(k) { return this.store[k] || null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}

global.localStorage = new MockLocalStorage();
global.sessionStorage = new MockLocalStorage();
global.document = {
  readyState: 'complete',
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};

let currentMockUser = { username: 'Alice', id: 'alice-uuid' };
global.supabaseService = {
  isLoggedIn: () => !!currentMockUser,
  getUser: () => currentMockUser ? { id: currentMockUser.id, user_metadata: { username: currentMockUser.username } } : null,
  getUsername: () => currentMockUser ? currentMockUser.username : ''
};

global.window = {
  location: { href: 'http://localhost/test' },
  localStorage: global.localStorage,
  sessionStorage: global.sessionStorage,
  addEventListener: () => {},
  removeEventListener: () => {},
  appController: {
    char: { name: 'Sentinel', playerName: 'Alice', campaignId: '', powerLevel: 10 },
    primaryChar: { name: 'Sentinel', playerName: 'Alice', campaignId: '', powerLevel: 10 },
    storage: { getCharacters: () => [] }
  }
};

const partyModule = await import('./js/party.js');
const mgr = partyModule.campaignManager;
mgr.clearAllCampaignsForTesting?.();
global.localStorage.clear();

// Alice creates a private campaign and a public campaign
mgr.createCampaign({
  campaignId: 'ALICE_CAMP',
  name: 'Guardians of Freedom',
  creatorName: 'Alice',
  isPublic: true,
  powerLevel: 10
});

const aliceHtml = mgr.generatePartyHTML();

// 3. Test Toolbar Visual Separation
assert.ok(aliceHtml.includes('campaign-browser-toolbar'), 'Toolbar exists');
assert.ok(aliceHtml.includes('campaign-browser-toolbar-separator'), 'Toolbar has distinct colored separator line');
assert.ok(aliceHtml.includes('border-left: 5px solid var(--hero-blue)'), 'Toolbar has colored left border accent');
console.log('✓ 2. Toolbar visual separation with colored border accent and gradient separator line verified.');

// 4. Test GM Entry Dropdown Menus
assert.ok(aliceHtml.includes('campaign-actions-dropdown'), 'Card contains Actions dropdown menu');
assert.ok(aliceHtml.includes('campaign-actions-toggle'), 'Card contains Actions toggle button');
assert.ok(aliceHtml.includes('⚡ Actions ▾'), 'Card displays ⚡ Actions ▾');
assert.ok(aliceHtml.includes('campaign-gm-tools-dropdown'), 'Alice (creator) sees GM Tools dropdown menu');
assert.ok(aliceHtml.includes('campaign-gm-toggle'), 'Alice sees GM Tools toggle button');
assert.ok(aliceHtml.includes('👑 GM Tools ▾'), 'Alice sees 👑 GM Tools ▾');

// GM tools contains the GM commands:
assert.ok(aliceHtml.includes('btn-gm-toggle-session'), 'GM Tools contains start/end session');
assert.ok(aliceHtml.includes('btn-open-join-requests'), 'GM Tools contains review join requests');
assert.ok(aliceHtml.includes('btn-gm-toggle-public'), 'GM Tools contains make public/unlist');
assert.ok(aliceHtml.includes('btn-gm-toggle-hiatus'), 'GM Tools contains hiatus/resume');
assert.ok(aliceHtml.includes('btn-gm-transfer-ownership'), 'GM Tools contains transfer ownership');
assert.ok(aliceHtml.includes('btn-gm-delete-campaign'), 'GM Tools contains delete campaign');
console.log('✓ 3. Campaign creator (GM) has both Actions and GM Tools dropdown menus.');

// 5. Test Non-GM (Bob) View: Filtered so only GMs see GM commands
window.appController.char.playerName = 'Bob';
window.appController.primaryChar.playerName = 'Bob';
currentMockUser = { username: 'Bob', id: 'bob-uuid' };

const bobHtml = mgr.generatePartyHTML();
assert.ok(bobHtml.includes('campaign-actions-dropdown'), 'Bob sees Actions dropdown');
assert.ok(bobHtml.includes('⚡ Actions ▾'), 'Bob sees ⚡ Actions ▾');
assert.ok(bobHtml.includes('btn-browser-apply-campaign'), 'Bob has Apply to Join');
assert.ok(bobHtml.includes('btn-copy-campaign-link'), 'Bob has Copy Link');
assert.ok(bobHtml.includes('btn-browser-message-gm'), 'Bob has Message GM');

// Bob MUST NOT see GM Tools dropdown or ANY GM commands
assert.ok(!bobHtml.includes('campaign-gm-tools-dropdown'), 'Bob MUST NOT see GM Tools dropdown menu container');
assert.ok(!bobHtml.includes('campaign-gm-toggle'), 'Bob MUST NOT see GM Tools toggle');
assert.ok(!bobHtml.includes('👑 GM Tools ▾'), 'Bob MUST NOT see 👑 GM Tools ▾');
assert.ok(!bobHtml.includes('btn-gm-toggle-session'), 'Bob MUST NOT see Start/End session button');
assert.ok(!bobHtml.includes('btn-open-join-requests'), 'Bob MUST NOT see Join requests button');
assert.ok(!bobHtml.includes('btn-gm-toggle-public'), 'Bob MUST NOT see Make Public toggle');
assert.ok(!bobHtml.includes('btn-gm-toggle-hiatus'), 'Bob MUST NOT see Hiatus button');
assert.ok(!bobHtml.includes('btn-gm-transfer-ownership'), 'Bob MUST NOT see Transfer ownership');
assert.ok(!bobHtml.includes('btn-gm-delete-campaign'), 'Bob MUST NOT see Delete campaign');
console.log('✓ 4. Non-GM (Bob) view is strictly filtered: zero GM commands or GM Tools menu visible.');

console.log('✓ 5. Approval notice combined into modal-join-requests banner.');
console.log('=== All v3.80 tests passed successfully! ===');
