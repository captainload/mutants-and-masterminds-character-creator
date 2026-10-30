import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock browser environment before importing party.js
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

const makeMockBadge = () => {
  const classes = new Set();
  return {
    textContent: '0',
    style: { display: 'none' },
    classList: {
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
      contains: (c) => classes.has(c),
      toggle: (c, force) => {
        const shouldAdd = force === undefined ? !classes.has(c) : !!force;
        if (shouldAdd) classes.add(c);
        else classes.delete(c);
        return shouldAdd;
      }
    }
  };
};

const mockElements = {
  'header-message-count-badge': makeMockBadge(),
  'dropdown-message-count-badge': makeMockBadge(),
  'btn-header-messages': { style: { display: 'none' }, title: '' }
};

globalThis.document = {
  getElementById: (id) => mockElements[id] || null,
  querySelectorAll: () => []
};
globalThis.window = {
  location: { origin: 'https://example.com', pathname: '/index.html' },
  addEventListener: () => {}
};

const { partyManager } = await import('./js/party.js');

console.log('=== Testing v3.74 Features ===');

// 1. Verify Version 3.74 & Static HTML/CSS Requirements
const versionJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'version.json'), 'utf8'));
assert.equal(versionJson.version, '3.74', 'version.json should be 3.74');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('id="dropdown-message-count-badge"'), 'index.html should have #dropdown-message-count-badge next to Campaign Messages menu item');
assert.ok(indexHtml.includes('id="user-settings-notes-input"') && indexHtml.includes('maxlength="256"'), 'index.html should have 256-char User Notes textarea in Account Settings');
assert.ok(indexHtml.includes('id="msg-compose-recipient-select"') && indexHtml.includes('id="known-users-address-book-list"'), 'index.html should have Known Users dropdown and Address Book pane in Campaign Messages modal');

const stylesCss = fs.readFileSync(path.join(__dirname, 'css', 'styles.css'), 'utf8');
assert.ok(stylesCss.includes('@keyframes unreadMessagePulse') && stylesCss.includes('.unread-badge-pulse'), 'styles.css should define pulsing animation for unread message counts');
assert.ok(stylesCss.includes('.textarea-campaign-notes') && stylesCss.includes('max-height: 75px'), 'styles.css should define 1-to-3 row expanding GM campaign notes');

console.log('✓ 1. Version 3.74, HTML structure, and CSS classes verified.');

// 2. Test Pulsing Unread Message Count & Dropdown Badge
localStorage.clear();
globalThis.window.appController = { char: { name: 'Captain Valiant', playerName: 'GM_Atlas' } };

const createdCamp = partyManager.createCampaign({
  name: 'Emerald City Defenders',
  powerLevel: 10,
  creatorName: 'GM_Atlas'
});

// Dispatch an unread message to GM_Atlas
partyManager.sendCampaignMessage({
  type: 'JOIN_REQUEST',
  recipientRole: 'GM',
  recipientUser: 'GM_Atlas',
  campaignId: createdCamp.campaignId,
  campaignName: createdCamp.campaignName,
  gmName: 'GM_Atlas',
  playerName: 'StarKnight',
  text: 'StarKnight requested to join Emerald City Defenders.'
});

partyManager.updateHeaderBadge();
assert.equal(mockElements['header-message-count-badge'].textContent, '1', 'Header message badge should show 1 unread message');
assert.ok(mockElements['header-message-count-badge'].classList.contains('unread-badge-pulse'), 'Header message badge should have pulsing class when unread > 0');
assert.equal(mockElements['dropdown-message-count-badge'].textContent, '1', 'Dropdown menu message badge should show 1 unread message');
assert.equal(mockElements['dropdown-message-count-badge'].style.display, 'inline-flex', 'Dropdown menu message badge should be visible when unread > 0');
assert.ok(mockElements['dropdown-message-count-badge'].classList.contains('unread-badge-pulse'), 'Dropdown menu message badge should have pulsing class when unread > 0');

partyManager.markAllMessagesRead();
assert.ok(!mockElements['header-message-count-badge'].classList.contains('unread-badge-pulse'), 'Pulsing class should be removed when unread count is 0');
assert.equal(mockElements['dropdown-message-count-badge'].textContent, '0', 'Dropdown menu message badge should show 0 when unread count is 0');
assert.ok(!mockElements['dropdown-message-count-badge'].classList.contains('unread-badge-pulse'), 'Dropdown menu message badge should stop pulsing when unread count is 0');

console.log('✓ 2. Pulsing unread message count and dropdown menu count badge verified.');

// 3. Test "Make Public" Advertising, GM Campaign Notes (1-to-3 rows), and Campaign Browser Eligibility & Ordering
partyManager.setCampaignNotes(createdCamp.campaignId, 'Weekly Friday evening superhero campaign set in Emerald City. Heroic tone, PL 10.');
partyManager.setCampaignPublic(createdCamp.campaignId, true);

const updatedInfo = partyManager.getCampaignInfo(createdCamp.campaignId);
assert.equal(updatedInfo.isPublic, true, 'Campaign should be marked public after setCampaignPublic(id, true)');
assert.ok(updatedInfo.notes.includes('Emerald City'), 'Campaign notes should be saved and persisted');

// Register two public campaigns from other GMs and one private campaign from another GM
partyManager.registerCampaignInfo({
  campaignId: 'COS-200',
  campaignName: 'Cosmic Vanguard',
  creatorName: 'GM_Nova',
  powerLevel: 15,
  isPublic: true,
  isOnHiatus: false,
  notes: 'High-powered cosmic space opera across the galaxy.',
  createdAtMs: Date.now() - 100000
});
partyManager.registerCampaignInfo({
  campaignId: 'STR-008',
  campaignName: 'Street Level Vigilantes',
  creatorName: 'GM_Shadow',
  powerLevel: 8,
  isPublic: true,
  isOnHiatus: true,
  notes: 'Gritty crimefighting in the narrows.',
  createdAtMs: Date.now() - 500000
});
partyManager.registerCampaignInfo({
  campaignId: 'PRV-999',
  campaignName: 'Secret Private Cabal',
  creatorName: 'GM_Secret',
  powerLevel: 12,
  isPublic: false,
  isOnHiatus: false,
  notes: 'Unlisted campaign.'
});

// Reset filters to default
partyManager.setBrowserFilter({
  query: '',
  searchName: true,
  searchDesc: true,
  searchPL: false,
  plMin: 1,
  plMax: 20,
  sortBy: 'default',
  hideHiatus: false
});

let browsable = partyManager.getBrowsableCampaigns();
assert.equal(browsable.length, 3, 'Campaign Browser should show user joined/created campaigns + public advertised campaigns (excluding other GMs private campaigns)');
assert.equal(browsable[0].campaignId, createdCamp.campaignId, 'By default, campaigns the user has joined or created must be shown first');
assert.equal(browsable[0].isJoinedOrCreated, true, 'Joined/created campaign should be flagged with isJoinedOrCreated = true');

console.log('✓ 3. Campaign Browser, Make Public advertising, GM Notes, and Joined/Created-first ordering verified.');

// 4. Test Campaign Browser Search (Name, Description, Legal PL Range Stepper), Sorting, and "On Hiatus" Filter
// 4a. Search by Description only
partyManager.setBrowserFilter({ query: 'galaxy', searchName: false, searchDesc: true, searchPL: false });
browsable = partyManager.getBrowsableCampaigns();
assert.equal(browsable.length, 1, 'Searching description for "galaxy" should match Cosmic Vanguard');
assert.equal(browsable[0].campaignId, 'COS-200');

// 4b. Search by PL Range Stepper & Legal "# to #" Range enforcement
const legalRange = partyManager.setBrowserPLRange(14, 10, 'min');
assert.equal(legalRange.plMin, 14, 'Setting min PL to 14 when max was 10 should clamp max up to 14 to keep a legal # to # range');
assert.equal(legalRange.plMax, 14);

partyManager.setBrowserPLRange(9, 12, 'max');
partyManager.setBrowserFilter({ query: '', searchName: false, searchDesc: false, searchPL: true });
browsable = partyManager.getBrowsableCampaigns();
assert.equal(browsable.length, 1, 'Filtering by PL range 9 to 12 should match only PL 10 Emerald City Defenders');
assert.equal(browsable[0].campaignId, createdCamp.campaignId);

// 4c. Filter out "On Hiatus" campaigns
partyManager.setBrowserFilter({ query: '', searchName: true, searchDesc: true, searchPL: false, hideHiatus: true });
browsable = partyManager.getBrowsableCampaigns();
assert.equal(browsable.some(c => c.campaignId === 'STR-008'), false, 'Enabling hideHiatus should filter out on-hiatus campaigns');
assert.equal(browsable.length, 2);

// 4d. Sorting options (by Campaign Name, GM Name, Campaign Age, PL)
partyManager.setBrowserFilter({ hideHiatus: false, sortBy: 'gm_asc' });
browsable = partyManager.getBrowsableCampaigns();
assert.deepEqual(
  browsable.map(c => c.creatorName),
  ['GM_Atlas', 'GM_Nova', 'GM_Shadow'],
  'Sorting by GM Name should order campaigns alphabetically by GM'
);

partyManager.setBrowserFilter({ sortBy: 'pl_desc' });
browsable = partyManager.getBrowsableCampaigns();
assert.deepEqual(
  browsable.map(c => c.powerLevel),
  [15, 10, 8],
  'Sorting by Power Level (High to Low) should order 15, 10, 8'
);

// Reset to default sort and verify rendered HTML includes Copy button, Joined icon, Make Public button, Notes textarea, and Apply button
partyManager.setBrowserFilter({ sortBy: 'default' });
const browserHtml = partyManager.generatePartyHTML();
assert.ok(browserHtml.includes('🌐 Campaign Browser'), 'Rendered HTML should feature the Campaign Browser heading');
assert.ok(browserHtml.includes('🌟 Joined'), 'Rendered HTML should display the special Joined/Created icon on user campaigns');
assert.ok(browserHtml.includes('btn-copy-campaign-link'), 'Rendered HTML should include the Copy button for campaign links');
assert.ok(browserHtml.includes('btn-gm-toggle-public'), 'Rendered HTML should include the Make Public / Public toggle button for GMs');
assert.ok(browserHtml.includes('textarea-campaign-notes'), 'Rendered HTML should include the GM campaign notes textarea');
assert.ok(browserHtml.includes('btn-browser-apply-campaign'), 'Rendered HTML should include the Apply to Join button on public non-joined campaigns');

console.log('✓ 4. Campaign Browser search, legal PL range stepper, sorting, hiatus filter, and Copy/Public UI verified.');

// 5. Test User Notes (up to 256 characters) & Direct Messaging + Known Users Address Book
const longNote = 'A'.repeat(300);
const savedNote = partyManager.setUserNotes(longNote, 'GM_Atlas');
assert.equal(savedNote.length, 256, 'User notes must be capped at 256 characters');
assert.equal(partyManager.getUserNotes('GM_Atlas').length, 256, 'getUserNotes should return the 256-character note');

const friendlyBio = 'GM for Emerald City! Sessions Fridays 8pm EST. Friendly to new M&M 3E players.';
partyManager.setUserNotes(friendlyBio, 'GM_Atlas');
assert.equal(partyManager.getUserNotes('GM_Atlas'), friendlyBio);

// Send a direct message to a new user "Nightwing99" and verify automatic addition to Known Users
partyManager.sendDirectUserMessage({
  toUser: 'Nightwing99',
  senderUser: 'GM_Atlas',
  campaignId: createdCamp.campaignId,
  text: 'Welcome to the campaign! Let me know when your hero sheet is ready.'
});

const knownUsers = partyManager.getKnownUsers();
const foundNightwing = knownUsers.find(u => u.username === 'Nightwing99');
assert.ok(foundNightwing, 'Anyone the user has ever sent a message to must be added automatically to Known Users');

// Verify recipient can read sender's User Notes via getUserNotes
partyManager.setUserNotes('Acrobatic vigilante player, available weekends.', 'Nightwing99');
const refreshedKnown = partyManager.getKnownUsers();
const nightwingEntry = refreshedKnown.find(u => u.username === 'Nightwing99');
assert.equal(nightwingEntry.notes, 'Acrobatic vigilante player, available weekends.', 'Known Users entries should expose the user notes for the "i" info button');

console.log('✓ 5. Direct Player/GM messaging, automatic Known Users addition, and 256-char User Notes verified.');
console.log('ALL v3.74 TESTS PASSED SUCCESSFULLY!');
