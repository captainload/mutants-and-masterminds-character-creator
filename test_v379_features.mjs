import assert from 'assert';
import fs from 'fs';
import { CampaignTrackerManager } from './js/party.js';

console.log('=== Testing v3.79 Campaign Security & Permissions ===');

// 1. Version Check
const vJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(vJson.version, '3.79', 'version.json should be 3.79');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(indexHtml.includes('v3.79'), 'index.html shows v3.79');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert.ok(appJs.includes("const CURRENT_VERSION = '3.79'"), 'app.js CURRENT_VERSION 3.79');
console.log('✓ 1. Version 3.79 verified.');

// Mock storage & environment
const mockLocalStorage = {
  data: {},
  getItem(k) { return this.data[k] || null; },
  setItem(k, v) { this.data[k] = String(v); },
  removeItem(k) { delete this.data[k]; },
  clear() { this.data = {}; }
};

global.localStorage = mockLocalStorage;
global.sessionStorage = {
  data: {},
  getItem(k) { return this.data[k] || null; },
  setItem(k, v) { this.data[k] = String(v); },
  removeItem(k) { delete this.data[k]; }
};

let currentMockUser = { username: 'Alice', id: 'alice-uuid' };

global.supabaseService = {
  isLoggedIn: () => !!currentMockUser,
  getUser: () => currentMockUser ? { id: currentMockUser.id, user_metadata: { username: currentMockUser.username } } : null,
  getUsername: () => currentMockUser ? currentMockUser.username : ''
};

global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  appController: {
    char: { playerName: 'Alice', powerLevel: 10, campaignId: '' },
    storage: { getCharacters: () => [] }
  }
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

const mgr = new CampaignTrackerManager();

// Create 1 private campaign created by Alice
mgr.createCampaign({
  name: 'Alice Secret Lair',
  campaignId: 'ALICE_PRIV',
  pin: '1111',
  creatorName: 'Alice',
  powerLevel: 10,
  dontEnforcePL: false,
  isPublic: false,
  notes: 'Classified private campaign'
});

// Create 1 public campaign created by Alice
mgr.createCampaign({
  name: 'Alice Open League',
  campaignId: 'ALICE_PUB',
  pin: '2222',
  creatorName: 'Alice',
  powerLevel: 12,
  dontEnforcePL: true,
  isPublic: true,
  notes: 'Public superhero league'
});

// Verify Alice sees both campaigns and is GM on both
currentMockUser = { username: 'Alice', id: 'alice-uuid' };
window.appController.char.playerName = 'Alice';

const aliceCampaigns = mgr.getBrowsableCampaigns();
assert.strictEqual(aliceCampaigns.length, 2, 'Alice should see both her private and public campaigns');
assert.ok(aliceCampaigns.every(c => c.isCreator === true), 'Alice should be isCreator === true on both');

const aliceHtml = mgr.generatePartyHTML();
assert.ok(aliceHtml.includes('Alice Secret Lair'), 'Alice HTML includes Alice Secret Lair');
assert.ok(aliceHtml.includes('Alice Open League'), 'Alice HTML includes Alice Open League');
assert.ok(aliceHtml.includes('👑 GM • 🌟 Joined'), 'Alice HTML includes GM badge');
assert.ok(aliceHtml.includes('btn-gm-toggle-hiatus'), 'Alice HTML includes hiatus toggle');
assert.ok(aliceHtml.includes('btn-gm-transfer-ownership'), 'Alice HTML includes transfer ownership');
console.log('✓ 2. Campaign creator (Alice) sees all her campaigns with full GM rights.');

// 3. Switch user to Bob (who did NOT create either campaign)
currentMockUser = { username: 'Bob', id: 'bob-uuid' };
window.appController.char.playerName = 'Bob';

// Test Bob's browsable campaigns:
const bobCampaigns = mgr.getBrowsableCampaigns();

// Non-public campaign MUST NOT be visible to Bob!
const bobPrivMatch = bobCampaigns.find(c => c.campaignId === 'ALICE_PRIV');
assert.strictEqual(bobPrivMatch, undefined, 'Bob MUST NOT see Alice\'s non-public campaign!');
console.log('✓ 3. Non-public campaign (ALICE_PRIV) is completely hidden from Bob.');

// Public campaign (ALICE_PUB) IS visible to Bob, but Bob MUST NOT have GM rights!
const bobPubMatch = bobCampaigns.find(c => c.campaignId === 'ALICE_PUB');
assert.ok(bobPubMatch !== undefined, 'Bob should see the public campaign (ALICE_PUB)');
assert.strictEqual(bobPubMatch.isCreator, false, 'Bob MUST NOT be creator of ALICE_PUB (isCreator must be false)');
assert.strictEqual(bobPubMatch.isJoinedOrCreated, false, 'Bob has not joined ALICE_PUB yet');

const bobHtml = mgr.generatePartyHTML();
assert.ok(!bobHtml.includes('Alice Secret Lair'), 'Bob HTML must not contain Alice Secret Lair');
assert.ok(bobHtml.includes('Alice Open League'), 'Bob HTML contains Alice Open League');

// Check that Bob does NOT receive any GM badges or controls in the rendered HTML
assert.ok(!bobHtml.includes('👑 GM • 🌟 Joined'), 'Bob HTML must not contain GM badge');
assert.ok(!bobHtml.includes('👑 GM (Owner)'), 'Bob HTML must not contain GM Owner tag');
assert.ok(!bobHtml.includes('btn-gm-toggle-session'), 'Bob HTML must not contain GM Start/End session button');
assert.ok(!bobHtml.includes('btn-gm-toggle-public'), 'Bob HTML must not contain GM Make Public button');
assert.ok(!bobHtml.includes('btn-open-join-requests'), 'Bob HTML must not contain GM Join Requests button');
assert.ok(!bobHtml.includes('chk-campaign-dont-enforce-pl'), 'Bob HTML must not contain GM PL enforcement checkbox');
assert.ok(!bobHtml.includes('sel-campaign-target-pl'), 'Bob HTML must not contain GM Target PL dropdown');
assert.ok(!bobHtml.includes('btn-gm-toggle-hiatus'), 'Bob HTML must not contain GM Hiatus button');
assert.ok(!bobHtml.includes('btn-gm-transfer-ownership'), 'Bob HTML must not contain GM Transfer Ownership button');
assert.ok(!bobHtml.includes('btn-gm-delete-campaign'), 'Bob HTML must not contain GM Delete Campaign button');

// Bob should see player controls
assert.ok(bobHtml.includes('btn-browser-apply-campaign'), 'Bob HTML contains Apply to Join button');
assert.ok(bobHtml.includes('btn-browser-message-gm'), 'Bob HTML contains Message GM button');
console.log('✓ 4. Bob has zero GM rights/controls on Alice\'s public campaign.');

// 5. Method-level security enforcement tests
assert.throws(() => {
  mgr.startSession('ALICE_PUB');
}, /Only the GM can start a game session/, 'Bob cannot start session for Alice\'s campaign');

assert.throws(() => {
  mgr.endSession('ALICE_PUB');
}, /Only the GM can end a game session/, 'Bob cannot end session for Alice\'s campaign');

assert.throws(() => {
  mgr.setCampaignHiatus('ALICE_PUB', true);
}, /Only the GM can put this campaign on hiatus/, 'Bob cannot put Alice\'s campaign on hiatus');

assert.throws(() => {
  mgr.deleteCampaignByGM('ALICE_PUB');
}, /Only the GM can delete this campaign/, 'Bob cannot delete Alice\'s campaign');

assert.throws(() => {
  mgr.initiateOwnershipTransfer('ALICE_PUB', 'Charlie');
}, /Only the GM can transfer ownership/, 'Bob cannot transfer ownership of Alice\'s campaign');
console.log('✓ 5. Method-level security prevents non-GM from invoking GM actions.');

// 6. Joining as a Player: Bob should remain a player without GM rights
mgr.joinCampaign({
  campaignId: 'ALICE_PUB',
  campaignName: 'Alice Open League',
  playerName: 'Bob'
});

const bobJoinedState = mgr.getCampaignState();
assert.strictEqual(bobJoinedState.isCreator, false, 'Bob joined session must have isCreator: false');
assert.strictEqual(bobJoinedState.isHost, false, 'Bob joined session must have isHost: false');

// Now Bob has joined: can Bob see the campaign with player badge?
const bobJoinedCamp = mgr.getBrowsableCampaigns().find(c => c.campaignId === 'ALICE_PUB');
assert.ok(bobJoinedCamp !== undefined, 'Bob sees ALICE_PUB after joining');
assert.strictEqual(bobJoinedCamp.isCreator, false, 'Bob is still not creator');
assert.strictEqual(bobJoinedCamp.isJoinedOrCreated, true, 'Bob is marked as joined');

const bobJoinedHtml = mgr.generatePartyHTML();
assert.ok(bobJoinedHtml.includes('badge-joined-campaign'), 'Bob has joined badge');
assert.ok(!bobJoinedHtml.includes('badge-gm-owned-campaign'), 'Bob still has no GM badge');
assert.ok(!bobJoinedHtml.includes('👑 GM (Owner)'), 'Bob still has no GM owner badge');
assert.ok(bobJoinedHtml.includes('btn-leave-campaign-membership'), 'Bob has Leave Campaign button');
assert.ok(!bobJoinedHtml.includes('⚙️ GM Campaign Settings'), 'Bob active session connection bar has no GM settings');
console.log('✓ 6. Bob joining as player receives player rights only, without GM elevation.');

console.log('=== All v3.79 tests passed successfully! ===');
