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
  location: { origin: 'https://example.com', pathname: '/index.html', href: 'https://example.com/index.html' },
  addEventListener: () => {}
};

const { partyManager } = await import('./js/party.js');

console.log('=== Testing v3.76 Features ===');

// 1. Verify Version 3.76 & New CC Button + Checkboxed Known Users List in HTML/JS
const versionJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'version.json'), 'utf8'));
assert.equal(versionJson.version, '3.76', 'version.json should be 3.76');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');

assert.ok(indexHtml.includes('id="btn-msg-toolbar-cc"'), 'Top toolbar must include #btn-msg-toolbar-cc');
assert.ok(indexHtml.includes('id="btn-toggle-cc-dropdown"'), 'Compose pane must include #btn-toggle-cc-dropdown');
assert.ok(indexHtml.includes('id="msg-cc-checkbox-menu"'), 'Compose pane must include #msg-cc-checkbox-menu for CC Known Users checkboxes');
assert.ok(appJs.includes('chk-cc-user-recipient'), 'js/app.js must render and wire .chk-cc-user-recipient checkboxes');
assert.ok(appJs.includes('↩️ Reply to ${replyTarget}'), 'Message cards must show Reply to original sender only (not Reply to All / mailing list)');

console.log('✓ 1. CC button and checkboxed Known Users CC dropdown verified.');

// 2. Verify Mailing Lists Are Never Added to Address Books (Even After Scoped Broadcasts or Legacy Storage)
localStorage.clear();
globalThis.window.appController = { char: { name: 'Centurion', playerName: 'GM_Valiant' } };

const camp = partyManager.createCampaign({
  name: 'Justice Vanguard',
  powerLevel: 12,
  creatorName: 'GM_Valiant'
});

partyManager.saveCampaignSavedCharacter(camp.campaignId, { id: 'h1', name: 'Starlight', powerLevel: 12 }, 'Player_Alice');
partyManager.saveCampaignSavedCharacter(camp.campaignId, { id: 'h2', name: 'Ironclad', powerLevel: 12 }, 'Player_Bob');
partyManager.saveCampaignSavedCharacter(camp.campaignId, { id: 'h3', name: 'Vortex', powerLevel: 12 }, 'Player_Charlie');

// Attempt to inject a mailing list name directly and via scoped message
assert.equal(partyManager.addKnownUser('Participants of Justice Vanguard (excluding GM_Valiant: Player_Alice, Player_Bob)'), null, 'addKnownUser must reject mailing list strings');
assert.equal(partyManager.addKnownUser('All Campaign Players'), null, 'addKnownUser must reject All Campaign Players');

// Simulate a legacy corrupted entry in mm3e_known_users and ensure getKnownUsers scrubs it
localStorage.setItem('mm3e_known_users', JSON.stringify({
  'participants of justice vanguard': { username: 'Participants of Justice Vanguard', role: 'Player' },
  'player_alice': { username: 'Player_Alice', role: 'Player' }
}));

// Send a scoped message to all owned campaigns
const massMsg = partyManager.sendDirectUserMessage({
  recipientScope: 'ALL_OWNED',
  senderUser: 'GM_Valiant',
  text: 'Welcome to Justice Vanguard! Session 1 starts Sunday.'
});

const knownAfterBroadcast = partyManager.getKnownUsers();
assert.ok(
  !knownAfterBroadcast.some(u => u.username.toLowerCase().includes('participants of') || u.username.includes(',')),
  'Known Users Address Book must NEVER contain mailing list entries'
);
assert.equal(massMsg.playerName, 'GM_Valiant', 'Scoped message playerName should be the sender (not a mailing list string)');

console.log('✓ 2. Mailing lists strictly excluded and scrubbed from Address Books verified.');

// 3. Verify Sender Does NOT Receive Copies of Messages They Mass-Mailed Unless They Specifically Added Themselves
// Currently logged in as GM_Valiant (the sender of massMsg)
let gmInbox = partyManager.getMessagesForCurrentUser();
assert.ok(
  !gmInbox.some(m => m.id === massMsg.id),
  'Sender (GM_Valiant) must NOT receive a copy of a campaign-scoped message they mass-mailed when they did not add themselves as a recipient'
);

// Also test multi-user direct mass mail without self
const multiDirectMsg = partyManager.sendDirectUserMessage({
  toUsers: ['Player_Alice', 'Player_Bob'],
  senderUser: 'GM_Valiant',
  text: 'Direct message to Alice and Bob!'
});
gmInbox = partyManager.getMessagesForCurrentUser();
assert.ok(
  !gmInbox.some(m => m.text.includes('Direct message to Alice and Bob!')),
  'Sender (GM_Valiant) must NOT receive copies of a multi-user mass-mailed message unless they specifically added themselves'
);

// Switch active user to Player_Alice — she MUST receive both messages!
globalThis.window.appController = { char: { name: 'Starlight', playerName: 'Player_Alice' } };
const aliceInbox = partyManager.getMessagesForCurrentUser();
assert.ok(aliceInbox.some(m => m.id === massMsg.id), 'Recipient Player_Alice must receive the campaign-scoped mass message');
assert.ok(aliceInbox.some(m => m.text.includes('Direct message to Alice and Bob!')), 'Recipient Player_Alice must receive the multi-user direct message');

// Now switch back to GM_Valiant and mass-mail WITH GM_Valiant specifically added as a recipient
globalThis.window.appController = { char: { name: 'Centurion', playerName: 'GM_Valiant' } };
const selfIncludedMsg = partyManager.sendDirectUserMessage({
  recipientScope: 'ALL_OWNED',
  toUsers: ['GM_Valiant'],
  senderUser: 'GM_Valiant',
  text: 'Note to all participants AND myself!'
});
gmInbox = partyManager.getMessagesForCurrentUser();
assert.ok(
  gmInbox.some(m => m.id === selfIncludedMsg.id),
  'Sender (GM_Valiant) SHOULD receive a copy when they specifically added themselves as a recipient'
);

console.log('✓ 3. Sender excluded from receiving copies of mass-mailed messages (unless self-added) verified.');

// 4. Verify Replying Only Goes to Original Sender Unless CC Users Are Selected
// Player_Alice replies to GM_Valiant and CCs Player_Bob (but NOT Player_Charlie)
globalThis.window.appController = { char: { name: 'Starlight', playerName: 'Player_Alice' } };
const replyWithCc = partyManager.sendDirectUserMessage({
  toUser: 'GM_Valiant',
  ccUsers: ['Player_Bob'],
  senderUser: 'Player_Alice',
  text: 'Replying to GM_Valiant and copying Player_Bob via CC!'
});

assert.equal(replyWithCc.recipientUser, 'GM_Valiant', 'Primary recipient of reply must be the original sender GM_Valiant');
assert.deepEqual(replyWithCc.ccUsers, ['Player_Bob'], 'CC list on reply must contain only the checked CC user Player_Bob');
assert.ok(replyWithCc.text.includes('(CC: Player_Bob)'), 'Message text should note the CC recipient(s)');

// Verify GM_Valiant receives the reply
globalThis.window.appController = { char: { name: 'Centurion', playerName: 'GM_Valiant' } };
assert.ok(partyManager.getMessagesForCurrentUser().some(m => m.id === replyWithCc.id), 'Original sender GM_Valiant must receive the reply');

// Verify CC'd user Player_Bob receives the copy
globalThis.window.appController = { char: { name: 'Ironclad', playerName: 'Player_Bob' } };
assert.ok(partyManager.getMessagesForCurrentUser().some(m => m.id === replyWithCc.id), 'CC user Player_Bob must receive a copy of the reply');

// Verify non-CC'd user Player_Charlie does NOT receive the reply
globalThis.window.appController = { char: { name: 'Vortex', playerName: 'Player_Charlie' } };
assert.ok(!partyManager.getMessagesForCurrentUser().some(m => m.id === replyWithCc.id), 'Non-CC user Player_Charlie must NOT receive the reply');

// Verify sender Player_Alice does NOT receive her own reply back in her inbox
globalThis.window.appController = { char: { name: 'Starlight', playerName: 'Player_Alice' } };
assert.ok(!partyManager.getMessagesForCurrentUser().some(m => m.id === replyWithCc.id), 'Reply sender Player_Alice should not receive a copy of her own reply unless she added herself');

console.log('✓ 4. Reply to original sender only + CC checkboxed Known Users delivery verified.');
console.log('ALL v3.76 TESTS PASSED SUCCESSFULLY!');
