import assert from 'node:assert';
import fs from 'node:fs';

console.log('=== Testing v3.81 Features: Light Mode Toolbar & Dropdown Fixes ===');

// 1. Version checks
const vJson = JSON.parse(fs.readFileSync('./version.json', 'utf8'));
assert.strictEqual(vJson.version, '3.81', 'version.json should be 3.81');

const indexHtml = fs.readFileSync('./index.html', 'utf8');
assert.ok(indexHtml.includes('v3.81'), 'index.html contains v3.81');
assert.ok(!indexHtml.includes('id="btn-campaign-sync-discord" style="font-size: var(--font-size-xs)'), 'footer discord button font size is at least 10pt');

const appJs = fs.readFileSync('./js/app.js', 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.81'"), 'app.js CURRENT_VERSION is 3.81');

const stylesCss = fs.readFileSync('./css/styles.css', 'utf8');
assert.ok(stylesCss.includes('html[data-theme="light"] .campaign-browser-toolbar'), 'styles.css has light theme campaign toolbar rules');
assert.ok(stylesCss.includes('html[data-theme="light"] .campaign-actions-panel'), 'styles.css has light theme campaign actions panel rules');
assert.ok(stylesCss.includes('html[data-theme="light"] .campaign-gm-panel'), 'styles.css has light theme campaign gm panel rules');
console.log('✓ 1. Version 3.81 and CSS light mode theme rules verified.');

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

mgr.createCampaign({
  campaignId: 'HERO_LEAGUE',
  name: 'Freedom League',
  creatorName: 'Alice',
  isPublic: true,
  powerLevel: 10
});

const generatedHtml = mgr.generatePartyHTML();

// 3. Test that hardcoded dark inline styles are removed from toolbar and dropdown panels
assert.ok(!generatedHtml.includes('rgba(17, 26, 47, 0.75)'), 'Toolbar no longer has hardcoded dark rgba inline background');
assert.ok(!generatedHtml.includes('campaign-actions-panel" style="position: absolute; top: calc(100% + 4px); right: 0; left: auto; min-width: 200px; background-color: #111a2f;'), 'Actions panel no longer has hardcoded dark #111a2f');
assert.ok(!generatedHtml.includes('campaign-gm-panel" style="position: absolute; top: calc(100% + 4px); right: 0; left: auto; min-width: 220px; background-color: #111a2f;'), 'GM panel no longer has hardcoded dark #111a2f');
assert.ok(!generatedHtml.includes('campaign-actions-panel" style="position: absolute; top: calc(100% + 4px); right: 0; left: auto; min-width: 200px; border-radius: 6px; z-index: 2500; display: none;'), 'Actions panel no longer has conflicting inline display:none');
console.log('✓ 2. HTML template is clean of conflicting inline dark styles & display:none.');

// 4. Test dropdown interactive toggling simulation
class MockElement {
  constructor(tagName = 'div', className = '') {
    this.tagName = tagName;
    this.className = className;
    this.classList = {
      _classes: new Set(className.split(' ').filter(Boolean)),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      contains: (c) => this.classList._classes.has(c)
    };
    this.style = {};
    this.listeners = {};
    this.children = [];
    this.parentElement = null;
  }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  click() {
    (this.listeners['click'] || []).forEach(fn => fn({
      stopPropagation: () => {},
      preventDefault: () => {}
    }));
  }
  closest(selector) {
    let curr = this;
    while (curr) {
      if (selector.startsWith('.') && curr.classList.contains(selector.slice(1))) return curr;
      curr = curr.parentElement;
    }
    return null;
  }
  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }
  querySelectorAll(selector) {
    const results = [];
    const check = (node) => {
      for (const child of node.children) {
        if (selector.split(', ').some(s => s.startsWith('.') && child.classList.contains(s.slice(1)))) {
          results.push(child);
        }
        check(child);
      }
    };
    check(this);
    return results;
  }
  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }
}

// Build mock card DOM hierarchy
const mockParent = new MockElement('div', 'campaign-browser-list');
mockParent.ownerDocument = mockParent;

const mockCard = new MockElement('div', 'campaign-browser-card');
mockParent.appendChild(mockCard);

const actionsDropdown = new MockElement('div', 'menu-dropdown-container campaign-actions-dropdown');
const actionsBtn = new MockElement('button', 'btn campaign-actions-toggle');
const actionsPanel = new MockElement('div', 'menu-dropdown-panel campaign-actions-panel');
actionsDropdown.appendChild(actionsBtn);
actionsDropdown.appendChild(actionsPanel);
mockCard.appendChild(actionsDropdown);

const gmDropdown = new MockElement('div', 'menu-dropdown-container campaign-gm-tools-dropdown');
const gmBtn = new MockElement('button', 'btn campaign-gm-toggle');
const gmPanel = new MockElement('div', 'menu-dropdown-panel campaign-gm-panel');
gmDropdown.appendChild(gmBtn);
gmDropdown.appendChild(gmPanel);
mockCard.appendChild(gmDropdown);

// Wire card buttons
mgr.wireCardButtons(mockParent);

// Initially neither panel is shown
assert.strictEqual(actionsPanel.classList.contains('show'), false);
assert.strictEqual(gmPanel.classList.contains('show'), false);

// Click Actions toggle -> opens Actions panel
actionsBtn.click();
assert.strictEqual(actionsPanel.classList.contains('show'), true, 'Actions panel has .show');
assert.strictEqual(actionsPanel.style.display, 'block', 'Actions panel style.display is block');
assert.strictEqual(mockCard.style.zIndex, '50', 'Parent card raised to z-index 50');

// Click Actions toggle again -> closes Actions panel
actionsBtn.click();
assert.strictEqual(actionsPanel.classList.contains('show'), false, 'Actions panel .show removed');
assert.strictEqual(actionsPanel.style.display, 'none', 'Actions panel style.display is none');

// Click GM toggle -> opens GM panel
gmBtn.click();
assert.strictEqual(gmPanel.classList.contains('show'), true, 'GM panel has .show');
assert.strictEqual(gmPanel.style.display, 'block', 'GM panel style.display is block');

// Click Actions toggle -> switches from GM panel to Actions panel
actionsBtn.click();
assert.strictEqual(actionsPanel.classList.contains('show'), true, 'Actions panel opened');
assert.strictEqual(actionsPanel.style.display, 'block', 'Actions panel style is block');
assert.strictEqual(gmPanel.classList.contains('show'), false, 'GM panel was closed');
assert.strictEqual(gmPanel.style.display, 'none', 'GM panel style is none');

console.log('✓ 3. Dropdown toggling logic verified.');
console.log('=== All v3.81 tests passed successfully! ===');
