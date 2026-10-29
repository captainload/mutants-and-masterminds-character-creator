import fs from 'fs';
import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js';

console.log('--- Testing v3.63 Features Suite ---');

// 1. Version assertions
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(versionJson.version, '3.63', 'version.json is 3.63');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.63'), 'index.html title has v3.63');
assert(indexHtml.includes('>v3.63</span>'), 'index.html version badge has v3.63');
assert(indexHtml.includes('css/styles.css?v=3.63'), 'index.html css link has v3.63');
assert(indexHtml.includes('js/app.js?v=3.63'), 'index.html script tag has v3.63');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes("const CURRENT_VERSION = '3.63';"), 'app.js CURRENT_VERSION is 3.63');

// 2. Player dropdown elements in index.html
assert(indexHtml.includes('id="btn-player-dropdown-arrow"'), 'Player dropdown arrow button exists in index.html');
assert(indexHtml.includes('id="player-dropdown-menu"'), 'Player dropdown menu container exists in index.html');

console.log('✓ Version 3.63 and UI markup verified');

// 3. Campaign ID Normalization & Collision Isolation
const gmParty = new CampaignTrackerManager();
gmParty._fallbackTabId = 'tab_gm_363';
gmParty.leaveCampaign();

const created = gmParty.createCampaign({
  name: 'Justice League',
  campaignId: '#JL-777', // User created with #
  pin: '5555',
  creatorName: 'Batman',
  powerLevel: 10
});

assert.strictEqual(created.campaignId, 'JL-777', 'Leading # stripped on campaign creation');

// Check campaign history persistence
const history = gmParty.getCampaignHistory();
assert.strictEqual(history.length, 1, 'Campaign added to persistent history');
assert.strictEqual(history[0].campaignId, 'JL-777');
assert.strictEqual(history[0].isCreator, true, 'User is recorded as creator in history');

// Player joins with #JL-777
const playerParty = new CampaignTrackerManager();
playerParty._fallbackTabId = 'tab_player_363';
playerParty.leaveCampaign();

const joined = playerParty.joinCampaign({
  campaignId: '#JL-777', // Player entered with #
  pin: '5555',
  playerName: 'Robin',
  powerLevel: 10
});

assert.strictEqual(joined.campaignId, 'JL-777', 'Leading # stripped on join');

const playerHistory = playerParty.getCampaignHistory();
assert.strictEqual(playerHistory.length, 1);
assert.strictEqual(playerHistory[0].isCreator, false, 'Player is NOT recorded as creator');

// 4. GM Settings visibility: Only creator can see GM Settings
const gmHtml = gmParty.generatePartyHTML();
assert(gmHtml.includes('GM Campaign Settings (Creator)'), 'Creator sees GM Settings');
assert(gmHtml.includes('chk-campaign-dont-enforce-pl'), 'Creator sees Don\'t enforce PL checkbox');

const playerHtml = playerParty.generatePartyHTML();
assert(!playerHtml.includes('GM Campaign Settings (Creator)'), 'Non-creator player DOES NOT see GM Settings');
assert(!playerHtml.includes('chk-campaign-dont-enforce-pl'), 'Non-creator player DOES NOT see Don\'t enforce PL checkbox');
assert(playerHtml.includes('Strict PL Enforcement is active'), 'Player sees PL status notice');

console.log('✓ Creator-only GM settings verified');

// 5. Active Session Detection & Heartbeats
assert.strictEqual(gmParty.isSessionActive('JL-777'), true, 'JL-777 has an active session');
assert.strictEqual(gmParty.isSessionActive('#JL-777'), true, 'Session active check normalizes #');
assert.strictEqual(gmParty.isSessionActive('UNKNOWN-999'), false, 'Unknown campaign has no active session');

const activeSessions = gmParty.getActiveSessions();
assert(activeSessions['JL-777'], 'JL-777 found in active sessions');
assert.strictEqual(activeSessions['JL-777'].powerLevel, 10);

console.log('✓ Active session detection verified');

// 6. Dual-transport message delivery
// Simulate storage bus event from Player to GM
const playerMember = {
  id: 'robin_hero',
  characterName: 'Robin',
  playerName: 'Robin',
  powerLevel: 10,
  bruises: 0,
  toughnessPenalty: 0,
  conditions: []
};

// Send message via network bus
gmParty.handleNetworkMessage({
  type: 'MEMBER_UPDATE',
  campaignId: 'JL-777',
  pin: '5555',
  member: playerMember
});

const gmRoster = gmParty.getPartyMembers();
assert(gmRoster.some(m => m.characterName === 'Robin'), 'GM roster ingested Robin via P2P bus');

// 7. Cleanup
gmParty.leaveCampaign();
playerParty.leaveCampaign();
assert.strictEqual(gmParty.isSessionActive('JL-777'), false, 'Session deactivated after GM leaves');

console.log('ALL v3.63 FEATURE TESTS PASSED CLEANLY!');
process.exit(0);
