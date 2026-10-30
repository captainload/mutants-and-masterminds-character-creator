import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageMap = new Map();
globalThis.localStorage = {
  getItem: (k) => (storageMap.has(k) ? storageMap.get(k) : null),
  setItem: (k, v) => storageMap.set(k, String(v)),
  removeItem: (k) => storageMap.delete(k),
  clear: () => storageMap.clear()
};

const sessionMap = new Map();
globalThis.sessionStorage = {
  getItem: (k) => (sessionMap.has(k) ? sessionMap.get(k) : null),
  setItem: (k, v) => sessionMap.set(k, String(v)),
  removeItem: (k) => sessionMap.delete(k),
  clear: () => sessionMap.clear()
};

globalThis.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};
globalThis.window = {
  location: { origin: 'https://example.com', pathname: '/index.html' },
  addEventListener: () => {}
};

const { partyManager } = await import('./js/party.js');

console.log('=== Testing v3.74 Features ===');

// 1. Verify Version 3.74
const versionJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'version.json'), 'utf8'));
assert.equal(versionJson.version, '3.74', 'version.json should be 3.74');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, 'css', 'styles.css'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');

// 2. Verify Clear Division between Game Session Monitor and Campaign Browser in Campaign Tracker
partyManager.createCampaign({ name: 'Freedom League', powerLevel: 10, creatorName: 'GM_Star' });
const trackerHtml = partyManager.generatePartyHTML();

const monitorIdx = trackerHtml.indexOf('tracker-section-session-monitor');
const dividerIdx = trackerHtml.indexOf('tracker-section-divider');
const browserIdx = trackerHtml.indexOf('tracker-section-campaign-browser');

assert.ok(monitorIdx !== -1, 'Campaign Tracker must render .tracker-section-session-monitor');
assert.ok(dividerIdx > monitorIdx, 'Campaign Tracker must render .tracker-section-divider after the Game Session Monitor');
assert.ok(browserIdx > dividerIdx, 'Campaign Tracker must render .tracker-section-campaign-browser after the section divider');
assert.ok(trackerHtml.includes('🎮 Game Session Monitor'), 'Game Session Monitor header should be present');
assert.ok(trackerHtml.includes('🌐 Campaign Browser'), 'Campaign Browser header should be present');

console.log('✓ 1. Clear division between Game Session Monitor and Campaign Browser verified.');

// 3. Verify Traditional Messaging Client Layout (Top Toolbar + Upper Message List + Bottom Compose Pane)
const toolbarPos = indexHtml.indexOf('id="msg-client-toolbar"');
const inboxPanePos = indexHtml.indexOf('id="msg-client-inbox-pane"');
const composePanePos = indexHtml.indexOf('id="msg-client-compose-pane"');

assert.ok(toolbarPos !== -1, 'Messaging client top toolbar (#msg-client-toolbar) must exist');
assert.ok(inboxPanePos > toolbarPos, 'Message list pane (#msg-client-inbox-pane) must appear below the top toolbar');
assert.ok(composePanePos > inboxPanePos, 'New Message compose pane (#msg-client-compose-pane) must be a second pane below the message list');

assert.ok(indexHtml.includes('id="btn-msg-toolbar-new"'), 'Top toolbar must include New Message button');
assert.ok(indexHtml.includes('id="btn-msg-toolbar-reply"'), 'Top toolbar must include Reply button');
assert.ok(indexHtml.includes('id="btn-msg-toolbar-address-book"'), 'Top toolbar must include Address Book button');
assert.ok(indexHtml.includes('id="btn-mark-all-messages-read"'), 'Top toolbar must include Mark All Read button');
assert.ok(indexHtml.includes('id="btn-clear-read-messages"'), 'Top toolbar must include Clear Read button');

console.log('✓ 2. Traditional Messaging Client layout (Top Toolbar + Message List + Second Compose Pane below) verified.');

// 4. Verify 3-Row Default Expanding up to 8 Visible Rows Before Scrolling on Compose Textarea
assert.ok(
  indexHtml.includes('<textarea id="msg-compose-text-input" class="textarea-msg-compose" rows="3"'),
  'Message compose field must be a textarea with rows="3" by default'
);
assert.ok(
  stylesCss.includes('.textarea-msg-compose') &&
  stylesCss.includes('min-height: 72px;') &&
  stylesCss.includes('max-height: 172px;') &&
  stylesCss.includes('overflow-y: auto;'),
  'CSS for .textarea-msg-compose must enforce 3 rows default (min-height: 72px) and 8 visible rows max (max-height: 172px) before scrolling'
);
assert.ok(
  appJs.includes('Math.min(Math.max(ta.scrollHeight || 72, 72), 172)'),
  'js/app.js must dynamically auto-expand #msg-compose-text-input between 3 rows (72px) and 8 rows (172px)'
);

console.log('✓ 3. Compose textarea 3-blank-rows default and 8-visible-rows auto-expansion verified.');

// 5. Verify Any User Can Be Messaged By Exact Name Without Public User Index/Search
const modalSection = indexHtml.slice(toolbarPos, composePanePos + 1500);
assert.ok(!modalSection.includes('user-search') && !modalSection.includes('search-users'), 'Messaging modal must not have a public user search function');

const sentMsg = partyManager.sendDirectUserMessage({
  toUser: 'UnlistedHeroPlayer42',
  senderUser: 'GM_Star',
  text: 'Hello! Inviting you to our Saturday session.'
});
assert.equal(sentMsg.recipientUser, 'UnlistedHeroPlayer42', 'Should allow messaging any user as long as the sender knows their username');
assert.ok(
  partyManager.getKnownUsers().some(u => u.username === 'UnlistedHeroPlayer42'),
  'Recipient should be automatically added to the sender Address Book after messaging'
);

console.log('✓ 4. Direct messaging to any known username (without public user index/search) verified.');
console.log('ALL v3.74 TESTS PASSED SUCCESSFULLY!');
