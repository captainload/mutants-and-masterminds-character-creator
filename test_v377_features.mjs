import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const read = (...p) => fs.readFileSync(path.join(__dirname, ...p), 'utf8');

// ---------- Browser-ish globals ----------
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
globalThis.document = { getElementById: () => null, querySelectorAll: () => [], querySelector: () => null };

// ---------- In-memory Supabase mock (mimics obfuscated duplicate-email sign-ups) ----------
const db = { profiles: [] };
const authUsers = new Map();
const authListeners = [];
let currentSession = null;
const emit = (evt) => authListeners.forEach(cb => cb(evt, currentSession));

function makeQuery(table) {
  const filters = [];
  const run = () => (db[table] || []).filter(r => filters.every(f => f(r)));
  const q = {
    select() { return q; },
    eq(col, val) { filters.push(r => r[col] === val); return q; },
    ilike(col, pat) {
      const p = String(pat).replace(/\\([\\%_])/g, '$1').toLowerCase();
      filters.push(r => String(r[col] || '').toLowerCase() === p);
      return q;
    },
    limit() { return q; },
    order() { return q; },
    update() { return q; },
    maybeSingle() { return Promise.resolve({ data: run()[0] || null, error: null }); },
    single() { return Promise.resolve({ data: run()[0] || null, error: null }); },
    then(res, rej) { return Promise.resolve({ data: run(), error: null }).then(res, rej); }
  };
  return q;
}

const mockClient = {
  from: (table) => makeQuery(table),
  removeChannel: () => {},
  auth: {
    onAuthStateChange(cb) { authListeners.push(cb); return { data: { subscription: { unsubscribe() {} } } }; },
    getSession: async () => ({ data: { session: currentSession } }),
    signUp: async ({ email, password, options }) => {
      if (authUsers.has(email)) {
        // Supabase obfuscation: fake user, no identities, no session, no error
        return { data: { user: { id: 'fake-' + Math.random(), email, identities: [], user_metadata: options.data }, session: null }, error: null };
      }
      const user = { id: 'uid-' + (authUsers.size + 1), email, identities: [{ id: 'i' }], user_metadata: options.data };
      authUsers.set(email, { user, password });
      db.profiles.push({ id: user.id, username: options.data.username });
      currentSession = { user };
      emit('SIGNED_IN');
      return { data: { user, session: currentSession }, error: null };
    },
    signInWithPassword: async ({ email, password }) => {
      const rec = authUsers.get(email);
      if (!rec || rec.password !== password) return { data: {}, error: new Error('Invalid login credentials') };
      currentSession = { user: rec.user };
      emit('SIGNED_IN');
      return { data: { user: rec.user, session: currentSession }, error: null };
    },
    signOut: async () => { currentSession = null; emit('SIGNED_OUT'); return { error: null }; }
  }
};

globalThis.window = {
  location: { origin: 'https://example.com', pathname: '/index.html', href: 'https://example.com/index.html' },
  addEventListener: () => {},
  supabase: { createClient: () => mockClient }
};

const { supabaseService } = await import('./js/supabase_client.js');
const { partyManager } = await import('./js/party.js');
const tick = () => new Promise(r => setTimeout(r, 5));

console.log('=== Testing v3.77 Features ===');

// 1. Version
const versionJson = JSON.parse(read('version.json'));
assert.ok(parseFloat(versionJson.version) >= 3.77, 'version.json should be >= 3.77');
const indexHtml = read('index.html');
const appJs = read('js', 'app.js');
// indexHtml check
// appJs check
console.log('✓ 1. Version 3.77 verified.');

// 2. Messaging client pop-out
assert.ok(indexHtml.includes('id="btn-messages-popout"'), 'Messages modal has a Pop-out button');
['openMessagesPopout()', 'redockMessagesPopout()', 'isMessagesPopoutOpen()', 'wireMessagingClient(doc = document)', 'renderMessagesInto(doc = document)', 'mm3e_messages_window_coords']
  .forEach(sym => assert.ok(appJs.includes(sym), `app.js must include ${sym}`));
assert.ok(/if \(id === 'modal-campaign-messages' && this\.isMessagesPopoutOpen\(\)\)/.test(appJs), 'Modal and pop-out are never open at the same time');
assert.ok(appJs.includes("const knownUsers = campaignManager.getKnownUsers();\n") || appJs.includes("const knownUsers = campaignManager.getKnownUsers();\r\n"), 'Compose pane defines knownUsers before building CC list');
console.log('✓ 2. Messaging Client pop-out wiring verified.');

// 3. Redock buttons on ALL pop-outs
const popoutSources = {
  'Messaging Client (app.js)': appJs,
  'Campaign Tracker (party.js)': read('js', 'party.js'),
  'Archetype Builder (archetype_window.js)': read('js', 'archetype_window.js'),
  'Reference Tables (tables.js)': read('js', 'tables.js')
};
for (const [name, src] of Object.entries(popoutSources)) {
  assert.ok(src.includes('id="btn-popout-redock"'), `${name} pop-out must have a Redock button`);
  assert.ok(src.includes('↙ Redock'), `${name} Redock button label`);
}
assert.ok(popoutSources['Campaign Tracker (party.js)'].includes('op.appController.openCampaignTracker()'), 'Tracker redock reopens modal');
assert.ok(popoutSources['Archetype Builder (archetype_window.js)'].includes('openArchetypeWizard({ reset: false })'), 'Archetype redock keeps wizard state');
assert.ok(popoutSources['Reference Tables (tables.js)'].includes("openModal('modal-tables')"), 'Tables redock reopens modal');
console.log('✓ 3. Redock button present on all 4 pop-outs.');

// 4. Account creation: unique email + unique username
const headerEvents = [];
supabaseService.onAuthStateChange((user) => headerEvents.push(user ? supabaseService.getUsername() : null));

await supabaseService.signUp({ email: 'Shared@Example.com', password: 'secretA', username: 'UserA' });
await tick();
assert.equal(supabaseService.getUsername(), 'UserA');
assert.equal(headerEvents[headerEvents.length - 1], 'UserA', 'Auth listeners (header button) receive UserA');

await assert.rejects(
  () => supabaseService.signUp({ email: 'shared@example.com', password: 'secretB', username: 'UserB' }),
  /already exists/i,
  'Second account with same email (case-insensitive) is rejected by local directory'
);
// Even on a fresh device (no local directory), Supabase's obfuscated duplicate response is rejected
localStorage.removeItem('mm3e_registered_accounts');
await assert.rejects(
  () => supabaseService.signUp({ email: 'shared@example.com', password: 'secretB', username: 'UserB' }),
  /already exists/i,
  'Obfuscated Supabase duplicate-email sign-up is rejected'
);
assert.equal(supabaseService.isLoggedIn(), false, 'Failed duplicate sign-up never leaves a half-logged-in state');
assert.equal(supabaseService.getUsername(), '', 'getUsername() is empty when logged out');

await assert.rejects(
  () => supabaseService.signUp({ email: 'other@example.com', password: 'secretB', username: 'usera' }),
  /already taken/i,
  'Duplicate username (case-insensitive) is rejected'
);
await supabaseService.signUp({ email: 'userb@example.com', password: 'secretB', username: 'UserB' });
await tick();
assert.equal(supabaseService.getUsername(), 'UserB');
console.log('✓ 4. Unique email & username enforcement verified.');

// 5. Sign in switches identity cleanly; header always shows the signed-in account
await supabaseService.signIn({ email: 'shared@example.com', password: 'secretA' });
await tick();
assert.equal(supabaseService.getUsername(), 'UserA');
assert.equal(headerEvents[headerEvents.length - 1], 'UserA', 'Header shows UserA after switching accounts');
await supabaseService.signIn({ email: 'UserB', password: 'secretB' }); // sign in by username
await tick();
assert.equal(supabaseService.getUsername(), 'UserB', 'Sign in by username works');
assert.equal(headerEvents[headerEvents.length - 1], 'UserB');
assert.equal(JSON.parse(sessionStorage.getItem('mm3e_active_auth_user')).username, 'UserB');
console.log('✓ 5. Login identity / header username verified.');

// 6. Direct messaging between the two accounts
globalThis.window.appController = { char: { name: 'Hero', playerName: 'StalePlayerName' } };
await supabaseService.signIn({ email: 'shared@example.com', password: 'secretA' });
await tick();
assert.equal(partyManager.getCurrentUsername(), 'UserA', 'Messaging identity = logged-in account, not stale player name');
partyManager.sendDirectUserMessage({ toUser: 'UserB', text: 'Hello B from A' });

await supabaseService.signIn({ email: 'userb@example.com', password: 'secretB' });
await tick();
assert.equal(partyManager.getCurrentUsername(), 'UserB');
const inboxB = partyManager.getMessagesForCurrentUser();
assert.ok(inboxB.some(m => String(m.text).includes('Hello B from A')), 'UserB receives message sent explicitly to UserB');
partyManager.sendDirectUserMessage({ toUser: 'UserA', text: 'Hi A, B here' });

await supabaseService.signIn({ email: 'shared@example.com', password: 'secretA' });
await tick();
const inboxA = partyManager.getMessagesForCurrentUser();
assert.ok(inboxA.some(m => String(m.text).includes('Hi A, B here')), 'UserA receives message sent explicitly to UserA');
assert.ok(!inboxA.some(m => String(m.text).includes('Hello B from A') && m.recipientUser === 'UserB'), 'Sender does not get a copy of their outgoing direct message');

await supabaseService.signOut();
await tick();
assert.equal(headerEvents[headerEvents.length - 1], null, 'Sign out resets header');
console.log('✓ 6. Cross-account direct messaging verified.');

console.log('=== All v3.77 tests passed ===');
process.exit(0);
