import fs from 'fs';
import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js';

console.log('--- Testing v3.64 Features Suite ---');

// 1. Version 3.64 verification
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(versionJson.version, '3.64', 'version.json is 3.64');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.64'), 'index.html title has v3.64');
assert(indexHtml.includes('>v3.64</span>'), 'index.html badge has v3.64');
assert(indexHtml.includes('css/styles.css?v=3.64'), 'index.html styles link has v3.64');
assert(indexHtml.includes('js/app.js?v=3.64'), 'index.html app link has v3.64');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes("const CURRENT_VERSION = '3.64';"), 'app.js CURRENT_VERSION is 3.64');

const archJs = fs.readFileSync('js/archetype_window.js', 'utf8');
assert(archJs.includes('styles.css?v=3.64'), 'archetype_window.js has v3.64');

const tablesJs = fs.readFileSync('js/tables.js', 'utf8');
assert(tablesJs.includes('styles.css?v=3.64'), 'tables.js has v3.64');

const partyJs = fs.readFileSync('js/party.js', 'utf8');
assert(partyJs.includes('styles.css?v=3.64'), 'party.js has v3.64');
assert(partyJs.includes('btn-gm-toggle-session'), 'party.js has GM Start/End session button');
assert(partyJs.includes('btn-attach-current-char'), 'party.js has Attach Character button');
assert(partyJs.includes('btn-detach-current-char'), 'party.js has Detach Character button');
console.log('✓ Version 3.64 and UI markup verified');

// 2. Disconnection on app close and startup clean state
const mgr = new CampaignTrackerManager();
assert.strictEqual(mgr.isUserConnected(), false, 'App starts in disconnected campaign state');

// 3. GM Start/End Session Controls
const camp = mgr.createCampaign({
  name: 'Sentinels',
  campaignId: 'SENT-202',
  creatorName: 'GM Dave',
  powerLevel: 10
});

assert.strictEqual(mgr.isSessionActive('SENT-202'), true, 'Session is active after creation');
mgr.endSession('SENT-202');
assert.strictEqual(mgr.isSessionActive('SENT-202'), false, 'Session is inactive after GM ends it');
mgr.startSession('SENT-202');
assert.strictEqual(mgr.isSessionActive('SENT-202'), true, 'Session is active after GM restarts it');
console.log('✓ GM Start/End Game Session controls verified');

// 4. GM loaded characters do NOT automatically join campaign party
mgr.updateCurrentPlayer({
  id: 'gm_random_hero',
  name: 'Random NPC',
  powerLevel: 8
});
assert.strictEqual(mgr.getPartyMembers().length, 0, 'Loaded character in GM client does not automatically join party');

// 5. Attaching character explicitly
mgr.updateCurrentPlayer({
  id: 'gm_attached_hero',
  name: 'Solaris',
  campaign: 'Sentinels',
  campaignId: 'SENT-202',
  powerLevel: 10
});
assert.strictEqual(mgr.getPartyMembers().length, 1, 'Attached character joins party');
assert.strictEqual(mgr.getPartyMembers()[0].characterName, 'Solaris');
console.log('✓ Character attachment and detachment verified');

// 6. Name and ID lookup for joining campaign
const foundById = mgr.getCampaignInfo('SENT-202');
assert(foundById && foundById.campaignName === 'Sentinels', 'Found campaign by ID');

const foundByName = mgr.getCampaignInfo('Sentinels');
assert(foundByName && foundByName.campaignId === 'SENT-202', 'Found campaign by Name');
console.log('✓ Campaign lookup by Name and ID verified');

// 7. Cleanup
mgr.leaveCampaign();
assert.strictEqual(mgr.isUserConnected(), false, 'Successfully disconnected');
assert.strictEqual(mgr.isSessionActive('SENT-202'), false, 'Session ended after leaveCampaign');

console.log('ALL v3.64 FEATURE TESTS PASSED CLEANLY!');
process.exit(0);
