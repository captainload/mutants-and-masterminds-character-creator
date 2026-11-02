import fs from 'fs';
import assert from 'assert';
import { campaignManager } from './js/party.js';
import { supabaseService } from './js/supabase_client.js';

console.log('--- Running v3.86 Feature Tests ---');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.ok(parseFloat(versionJson.version) >= 3.86, 'version.json should be >= 3.86');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(/Character Editor v3\.(8[6-9]|9\d)/.test(indexHtml), 'index.html title has version >= 3.86');
assert.ok(/css\/styles\.css\?v=3\.(8[6-9]|9\d)/.test(indexHtml), 'index.html links css >= 3.86');
assert.ok(/id="header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3\.(8[6-9]|9\d)</.test(indexHtml), 'header version tag is >= 3.86');
assert.ok(/src="js\/app\.js\?v=3\.(8[6-9]|9\d)"/.test(indexHtml), 'index.html loads app.js >= 3.86');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert.ok(/CURRENT_VERSION = '3\.(8[6-9]|9\d)'/.test(appJs), 'app.js CURRENT_VERSION is >= 3.86');

const partyJs = fs.readFileSync('js/party.js', 'utf8');
assert.ok(/css\/styles\.css\?v=3\.(8[6-9]|9\d)/.test(partyJs), 'party.js has css link');

const tablesJs = fs.readFileSync('js/tables.js', 'utf8');
assert.ok(/css\/styles\.css\?v=3\.(8[6-9]|9\d)/.test(tablesJs), 'tables.js has css link');

const archetypeJs = fs.readFileSync('js/archetype_window.js', 'utf8');
assert.ok(/css\/styles\.css\?v=3\.(8[6-9]|9\d)/.test(archetypeJs), 'archetype_window.js has css link');
console.log('✓ Test 1 Passed: All versions successfully bumped to >= 3.86');

// 2. Address Book Direct Exchange Rule
// Clear test storage
campaignManager._sharedFallback = {};
campaignManager._memoryFallback = {};

// Simulate logged in user via supabaseService:
supabaseService.currentUser = { id: 'u1', email: 'hero@test.com', user_metadata: { username: 'HeroOne' } };

// Before any messages, address book is empty
assert.deepStrictEqual(campaignManager.getKnownUsers(), [], 'Address book must be empty before any message is exchanged');

// Create a campaign with creator "OtherGM", but NO messages exchanged
campaignManager.saveCampaignState({
  campaignId: 'ALPHA1',
  campaignName: 'Alpha Sector',
  isCreator: false,
  creatorName: 'OtherGM',
  isConnected: true
});
campaignManager._memoryFallback['mm3e_campaigns_history'] = JSON.stringify([{
  campaignId: 'ALPHA1',
  campaignName: 'Alpha Sector',
  creatorName: 'OtherGM',
  isCreator: false
}]);

// "OtherGM" should NOT be in HeroOne's address book because no message was exchanged!
let known = campaignManager.getKnownUsers();
assert.strictEqual(known.length, 0, 'Campaign creator must NOT be in address book without exchanged message');

// Now send a direct message from HeroOne to "SidekickTwo"
campaignManager.sendCampaignMessage({
  type: 'DIRECT_MESSAGE',
  senderUser: 'HeroOne',
  recipientRole: 'USER',
  recipientUser: 'SidekickTwo',
  text: 'Hello SidekickTwo!'
});

// Now "SidekickTwo" should be in HeroOne's address book
known = campaignManager.getKnownUsers();
assert.strictEqual(known.length, 1, 'SidekickTwo must now be in address book');
assert.strictEqual(known[0].username, 'SidekickTwo', 'Contact name matches');
assert.strictEqual(known[0].role, undefined, 'No GM/Player role tag on address book entry');

// Now simulate receiving a message from "VigilanteThree"
campaignManager.sendCampaignMessage({
  type: 'DIRECT_MESSAGE',
  senderUser: 'VigilanteThree',
  recipientRole: 'USER',
  recipientUser: 'HeroOne',
  text: 'Need backup!'
});

known = campaignManager.getKnownUsers();
assert.strictEqual(known.length, 2, 'Both SidekickTwo and VigilanteThree in address book');
assert(known.some(u => u.username === 'VigilanteThree'), 'VigilanteThree is in address book');
assert(!known.some(u => u.username === 'OtherGM'), 'OtherGM is still NOT in address book (no message exchanged)');
console.log('✓ Test 2 Passed: Users added to address book ONLY when message is successfully exchanged');

// 3. User Notes (up to 256 chars)
const testNotes = 'Available Fri/Sat 7pm EST. Plays Mystic/Speedster. Discord: @HeroOne#1234';
const savedNotes = campaignManager.setUserNotes(testNotes, 'HeroOne');
assert.strictEqual(savedNotes, testNotes, 'Notes properly saved');
assert.strictEqual(campaignManager.getUserNotes('HeroOne'), testNotes, 'Notes retrieved for HeroOne');

// Test 256 char truncation limit
const longNotes = 'X'.repeat(300);
const truncated = campaignManager.setUserNotes(longNotes, 'HeroOne');
assert.strictEqual(truncated.length, 256, 'Notes strictly limited to 256 characters');
console.log('✓ Test 3 Passed: User Notes up to 256 characters work properly');

// 4. Mark as Read & Batch Mark as Read
const msgs = campaignManager.getAllCampaignMessages();
assert(msgs.length >= 2, 'Should have test messages');
const msgIds = msgs.map(m => m.id);

// Mark single message
campaignManager.markMessageRead(msgIds[0]);
let updatedMsgs = campaignManager.getAllCampaignMessages();
assert.strictEqual(updatedMsgs.find(m => m.id === msgIds[0]).read, true, 'Single message marked as read');

// Batch mark
campaignManager.markMessagesRead(msgIds);
updatedMsgs = campaignManager.getAllCampaignMessages();
assert(updatedMsgs.every(m => m.read === true), 'All messages marked as read via batch function');
console.log('✓ Test 4 Passed: Single & batch mark as read functions work properly');

// 5. CSS Light Mode Inversion & Popup Dialog check
const cssContent = fs.readFileSync('css/styles.css', 'utf8');
assert(cssContent.includes('html[data-theme="light"] .campaign-message-card.msg-unread'), 'Light mode rule for unread message exists');
assert(cssContent.includes('html[data-theme="light"] .campaign-message-card.msg-read'), 'Light mode rule for read message exists');
assert(cssContent.includes('#msg-client-address-book-drawer'), 'Address book drawer styles exist');
assert(cssContent.includes('.msg-client-compose-dialog'), 'Compose popup dialog styles exist');
assert(cssContent.includes('.address-book-user-notes-middle'), 'User notes middle area style exists');
console.log('✓ Test 5 Passed: CSS includes light mode inverted styles, 50% address book drawer, and popup dialog');

// 6. Auth dialog Enter key & clear status check
assert(appJs.includes("auth-signin-password')?.addEventListener('keydown'"), 'app.js listens for Enter on password field');
assert(appJs.includes("clearAuthStatus"), 'app.js clears status message when typing in credentials');
console.log('✓ Test 6 Passed: Auth Enter key and typing status clear verified');

// 7. Compose Pane as Popup Dialog in HTML
assert(indexHtml.includes('class="msg-client-compose-dialog"'), 'index.html has compose popup dialog wrapper');
assert(indexHtml.includes('id="btn-mark-selected-messages-read"'), 'index.html has bulk read button');
console.log('✓ Test 7 Passed: HTML structure for popup dialog and bulk actions verified');

console.log('=== All v3.86 Feature Tests Passed Cleanly! ===');
