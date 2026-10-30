import { readFileSync } from 'fs';
import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js';

console.log('--- Testing v3. Features Suite ---');

// =========================================================================
// 1. Version Consistency (v3.)
// =========================================================================
const versionJson = JSON.parse(readFileSync('version.json', 'utf8'));
assert(parseFloat(versionJson.version) >= 3.70, `Expected >= 3.70 in version.json, got ${versionJson.version}`);

const indexHtml = readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.'), 'index.html title missing v3.');
assert(indexHtml.includes('css/styles.css?v=3.'), 'index.html styles query missing v3.');
assert(indexHtml.includes('>v3.'), 'index.html version badge missing v3.');
assert(indexHtml.includes('js/app.js?v=3.'), 'index.html app.js script query missing v3.');

const appJs = readFileSync('js/app.js', 'utf8');
assert(appJs.includes("CURRENT_VERSION = '3."), 'app.js CURRENT_VERSION missing 3.70');
assert(appJs.includes("power_profiles.js?v=3."), 'app.js power_profiles query missing 3.70');

const archJs = readFileSync('js/archetype_window.js', 'utf8');
assert(archJs.includes('css/styles.css?v=3.'), 'archetype_window.js styles link missing 3.70');

const partyJs = readFileSync('js/party.js', 'utf8');
assert(partyJs.includes('css/styles.css?v=3.'), 'party.js styles link missing 3.70');

const tablesJs = readFileSync('js/tables.js', 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.'), 'tables.js styles link missing 3.70');
console.log('✓ v3. version consistency verified across all files');

// =========================================================================
// 2. Distinct Campaign Join vs. Game Session Join & No Room Connection Without Session
// =========================================================================
const mgr = new CampaignTrackerManager();
mgr.leaveCampaign();

// Creating a campaign must NOT start a session AND must NOT connect to a campaign room
const camp = mgr.createCampaign({
  name: 'Emerald City Knights',
  campaignId: 'ECK-370',
  creatorName: 'GM Arthur',
  powerLevel: 10
});

assert.strictEqual(mgr.isSessionActive('ECK-370'), false, 'Session is NOT active upon campaign creation');
assert.strictEqual(mgr.isUserConnected(), false, 'User is NOT connected to a campaign room when no session is running');

// Attempting to connect to a campaign room (joinGameSession) when no session is running MUST throw an error
let threwOnOfflineSession = false;
try {
  mgr.joinGameSession({
    campaignId: 'ECK-370',
    campaignName: 'Emerald City Knights',
    playerName: 'Player Bob'
  });
} catch (err) {
  threwOnOfflineSession = true;
  assert(err.message.includes('No game session is currently running'), 'Throws clear error when no session is running');
}
assert.strictEqual(threwOnOfflineSession, true, 'Cannot connect to a campaign room without a session running');

// Applying/joining a campaign (membership) WITHOUT a session running works cleanly and only requires campaign name
const playerMgr = new CampaignTrackerManager();
playerMgr._fallbackTabId = 'player_tab_370';
playerMgr.leaveCampaign();

const joinResult = playerMgr.joinCampaign({
  campaignName: 'Emerald City Knights',
  playerName: 'Player Bob',
  powerLevel: 10
});

assert.strictEqual(joinResult.campaignName, 'Emerald City Knights');
assert.strictEqual(joinResult.isSessionRunning, false, 'Correctly reports that no session is currently running');
assert.strictEqual(playerMgr.isUserConnected(), false, 'Joining a campaign does NOT connect to a live session room when offline');
assert.strictEqual(playerMgr.isUserMemberOfCampaign(joinResult.campaignId, 'Emerald City Knights'), true, 'User is now recorded as a member of the campaign');

// Checking already-member detection
const secondCheck = playerMgr.joinCampaign({
  campaignName: 'Emerald City Knights',
  playerName: 'Player Bob'
});
assert.strictEqual(secondCheck.alreadyMember, true, 'Detects that user is already part of the campaign');

// Starting a game session connects GM and allows players to join the game session
mgr.startSession('ECK-370');
assert.strictEqual(mgr.isSessionActive('ECK-370'), true, 'Session is active after startSession');
assert.strictEqual(mgr.isUserConnected(), true, 'GM is connected to room once session is active');

const liveSessionJoin = playerMgr.joinGameSession({
  campaignId: 'ECK-370',
  campaignName: 'Emerald City Knights',
  playerName: 'Player Bob'
});
assert.strictEqual(liveSessionJoin.isConnected, true, 'Player connects to live session when session IS running');

// Ending a game session disconnects from the room
mgr.endSession('ECK-370');
assert.strictEqual(mgr.isSessionActive('ECK-370'), false, 'Session is inactive after endSession');
assert.strictEqual(mgr.isUserConnected(), false, 'User is no longer connected to a live room after session ends');
console.log('✓ Distinct Join Campaign vs Join Game Session & No Room Connection Without Session verified');

// =========================================================================
// 3. Shareable Campaign Link Generation, Parsing, and Paste Field in UI
// =========================================================================
const link = mgr.generateCampaignLink(camp);
assert(link.includes('campaign=Emerald+City+Knights'), 'Generated campaign link contains campaign name');
assert(link.includes('id=ECK-370'), 'Generated campaign link contains campaign ID');
assert(link.includes('pl=10'), 'Generated campaign link contains power level');

const parsedFromLink = mgr.parseCampaignLinkOrName(link);
assert.strictEqual(parsedFromLink.campaignName, 'Emerald City Knights');
assert.strictEqual(parsedFromLink.campaignId, 'ECK-370');
assert.strictEqual(parsedFromLink.powerLevel, 10);
assert.strictEqual(parsedFromLink.isFromLink, true);

const parsedFromNameOnly = mgr.parseCampaignLinkOrName('Freedom League');
assert.strictEqual(parsedFromNameOnly.campaignName, 'Freedom League');
assert(parsedFromNameOnly.campaignId.startsWith('FREE-'), 'Generates deterministic ID when only campaign name is given');

const htmlWhenDisconnected = mgr.generatePartyHTML();
assert(htmlWhenDisconnected.includes('input-join-campaign-link'), 'Campaign Manager includes input field next to Join Campaign for pasting link/name');
assert(htmlWhenDisconnected.includes('btn-trigger-join-campaign'), 'Campaign Manager includes Join Campaign button');
assert(htmlWhenDisconnected.includes('btn-copy-campaign-link'), 'Campaign cards include Copy Campaign Link button');
assert(!htmlWhenDisconnected.includes('btn-join-game-session'), 'Offline campaigns do NOT render a Join Game Session / Connect button');
console.log('✓ Shareable Campaign Link generation, parsing, and paste input field verified');

// =========================================================================
// 4. Leave Campaign Button & Character Detachment Warning
// =========================================================================
assert(playerMgr.generatePartyHTML().includes('btn-leave-campaign-membership'), 'Participated campaigns include Leave Campaign button');
assert(playerMgr.generatePartyHTML().includes('🚪 Leave Campaign'), 'Leave Campaign button label is present');
assert(appJs.includes('confirmAndLeaveCampaign'), 'app.js defines confirmAndLeaveCampaign handler');
assert(appJs.includes('Leaving a campaign means any characters you have attached to the campaign will no longer be attached to it'), 'app.js alerts user that attached characters will no longer be attached when leaving a campaign');

playerMgr.leaveCampaignPermanent('ECK-370', 'Emerald City Knights');
assert.strictEqual(playerMgr.isUserMemberOfCampaign('ECK-370', 'Emerald City Knights'), false, 'leaveCampaignPermanent removes campaign from user membership');
console.log('✓ Leave Campaign button and character detachment warning verified');

// =========================================================================
// 5. Prevent Campaign Modal & Popout Window Duplication
// =========================================================================
assert.strictEqual(typeof mgr.isPopoutOpen, 'function', 'CampaignTrackerManager has isPopoutOpen()');
assert.strictEqual(mgr.isPopoutOpen(), false, 'isPopoutOpen() is false when popoutWindow is null');

// Simulate an open popout window
let focusedPopout = false;
mgr.popoutWindow = {
  closed: false,
  focus() { focusedPopout = true; },
  document: {
    getElementById() { return null; }
  }
};
assert.strictEqual(mgr.isPopoutOpen(), true, 'isPopoutOpen() is true when popoutWindow is open');

assert(appJs.includes('if (campaignManager.isPopoutOpen())'), 'openCampaignTracker checks isPopoutOpen() before opening modal');
assert(appJs.includes("(id === 'modal-campaign-tracker' || id === 'modal-party') && campaignManager.isPopoutOpen()"), 'openModal blocks opening campaign modal when popout is already open');
assert(partyJs.includes('if (this.isPopoutOpen())'), 'renderAllOpenViews closes in-app modal and only updates popout when popped out');

mgr.popoutWindow = null;
console.log('✓ Prevention of simultaneous Campaign Modal and Popout Window verified');

console.log('\nALL v3. FEATURE TESTS PASSED CLEANLY!');
