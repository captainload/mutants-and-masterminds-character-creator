import { readFileSync } from 'fs';
import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js';

console.log('--- Testing v3.73 Features Suite ---');

// =========================================================================
// 1. Version Consistency (v3.73)
// =========================================================================
const versionJson = JSON.parse(readFileSync('version.json', 'utf8'));
assert(parseFloat(versionJson.version) >= 3.73, `Expected >= 3.73 in version.json, got ${versionJson.version}`);

const indexHtml = readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.73'), 'index.html title missing v3.73');
assert(indexHtml.includes('css/styles.css?v=3.73'), 'index.html styles query missing v3.73');
assert(indexHtml.includes('>v3.73</span>'), 'index.html version badge missing v3.73');
assert(indexHtml.includes('js/app.js?v=3.73'), 'index.html app.js script query missing v3.73');

const appJs = readFileSync('js/app.js', 'utf8');
assert(appJs.includes("CURRENT_VERSION = '3.73'"), 'app.js CURRENT_VERSION missing 3.73');
assert(appJs.includes("power_profiles.js?v=3.73"), 'app.js power_profiles query missing 3.73');

const archJs = readFileSync('js/archetype_window.js', 'utf8');
assert(archJs.includes('css/styles.css?v=3.73'), 'archetype_window.js styles link missing 3.73');

const partyJs = readFileSync('js/party.js', 'utf8');
assert(partyJs.includes('css/styles.css?v=3.73'), 'party.js styles link missing 3.73');

const tablesJs = readFileSync('js/tables.js', 'utf8');
assert(tablesJs.includes('css/styles.css?v=3.73'), 'tables.js styles link missing 3.73');
console.log('✓ v3.73 version consistency verified across all files');

// =========================================================================
// 2. GM Campaign Controls: No "Leave Campaign" for GM; Hiatus & Delete Options
// =========================================================================
const gmMgr = new CampaignTrackerManager();
gmMgr._fallbackTabId = 'gm_tab_371';
gmMgr.leaveCampaign();

const camp = gmMgr.createCampaign({
  name: 'Titans Tomorrow',
  campaignId: 'TITN-371',
  creatorName: 'GM_Diana',
  powerLevel: 10
});

const gmHtml = gmMgr.generatePartyHTML();
assert(!gmHtml.includes('btn-leave-campaign-membership'), 'GM must NOT have a Leave Campaign option on owned campaigns');
assert(gmHtml.includes('btn-gm-toggle-hiatus'), 'GM has Put on Hiatus option');
assert(gmHtml.includes('⏸️ Put on Hiatus'), 'Put on Hiatus label rendered for GM');
assert(gmHtml.includes('btn-gm-transfer-ownership'), 'GM has Transfer Ownership option');
assert(gmHtml.includes('btn-gm-delete-campaign'), 'GM has Delete Campaign option');

// Put campaign on hiatus
const hiatusState = gmMgr.setCampaignHiatus('TITN-371', true, 'GM_Diana');
assert.strictEqual(hiatusState.isOnHiatus, true, 'Campaign is marked as on hiatus');
assert.strictEqual(gmMgr.ownsAnyCampaign(), true, 'GM still owns the campaign while on hiatus');
assert.strictEqual(gmMgr.getCampaignHistory().some(c => c.campaignId === 'TITN-371'), true, 'Campaign is NOT deleted when placed on hiatus');

const gmHiatusHtml = gmMgr.generatePartyHTML();
assert(gmHiatusHtml.includes('⏸️ On Hiatus'), 'Campaign card displays On Hiatus badge');
assert(gmHiatusHtml.includes('▶️ Resume Campaign'), 'GM can resume campaign from hiatus');

// Cannot start a session while on hiatus
let threwStartOnHiatus = false;
try {
  gmMgr.startSession('TITN-371');
} catch (err) {
  threwStartOnHiatus = true;
  assert(err.message.includes('currently on hiatus'));
}
assert.strictEqual(threwStartOnHiatus, true, 'Cannot start session while campaign is on hiatus');
console.log('✓ GM Hiatus (without deleting campaign) and absence of Leave Campaign for GM verified');

// =========================================================================
// 3. Ownership Transfer During Hiatus: Offer, Withdraw, Refuse, and Accept
// =========================================================================
// 3a. Initiate transfer during hiatus -> Target user gets message asking to accept or refuse
const offer1 = gmMgr.initiateOwnershipTransfer('TITN-371', 'Player_Victor', 'GM_Diana');
assert.strictEqual(offer1.status, 'pending');
assert.strictEqual(offer1.targetUser, 'Player_Victor');
assert.strictEqual(offer1.isDuringHiatus, true);

const gmPendingHtml = gmMgr.generatePartyHTML();
assert(gmPendingHtml.includes('⏳ Transfer Offered to Player_Victor'), 'GM sees pending transfer offer badge');
assert(gmPendingHtml.includes('btn-gm-withdraw-transfer'), 'GM sees Withdraw Offer button while pending');

const offerMsg = gmMgr.getAllCampaignMessages().find(m => m.offerId === offer1.offerId);
assert(offerMsg, 'Target user receives ownership transfer offer message');
assert(offerMsg.text.includes('Titans Tomorrow') && offerMsg.text.includes('GM_Diana') && offerMsg.text.includes('Player_Victor'), 'Message notes campaign, GM, and player');

// 3b. GM can withdraw the offer at any time before target responds
gmMgr.withdrawOwnershipTransfer('TITN-371', 'GM_Diana');
assert.strictEqual(gmMgr.getCampaignInfo('TITN-371').pendingTransfer, null, 'Pending transfer cleared after withdrawal');
const withdrawnMsg = gmMgr.getAllCampaignMessages().find(m => m.type === 'OWNERSHIP_TRANSFER_WITHDRAWN');
assert(withdrawnMsg && withdrawnMsg.campaignId === 'TITN-371', 'Target user notified when GM withdraws offer');

// 3c. Target user refuses ownership offer
const offer2 = gmMgr.initiateOwnershipTransfer('TITN-371', 'Player_Gar', 'GM_Diana');
const refuseRes = gmMgr.respondToOwnershipTransfer('TITN-371', false, 'Player_Gar');
assert.strictEqual(refuseRes.status, 'refused');
assert.strictEqual(gmMgr.getCampaignInfo('TITN-371').creatorName, 'GM_Diana', 'GM_Diana remains owner after refusal');
const refusedMsg = gmMgr.getAllCampaignMessages().find(m => m.type === 'OWNERSHIP_TRANSFER_REFUSED');
assert(refusedMsg && refusedMsg.playerName === 'Player_Gar' && refusedMsg.gmName === 'GM_Diana', 'GM notified when target refuses transfer');

// 3d. Target user accepts ownership offer -> becomes new GM
const offer3 = gmMgr.initiateOwnershipTransfer('TITN-371', 'Player_Kori', 'GM_Diana');
const acceptRes = gmMgr.respondToOwnershipTransfer('TITN-371', true, 'Player_Kori');
assert.strictEqual(acceptRes.status, 'accepted');
assert.strictEqual(acceptRes.newGM, 'Player_Kori');
assert.strictEqual(gmMgr.getCampaignInfo('TITN-371').creatorName, 'Player_Kori', 'Player_Kori is now the GM of the campaign');
const transferredMsg = gmMgr.getAllCampaignMessages().find(m => m.type === 'OWNERSHIP_TRANSFERRED');
assert(transferredMsg && transferredMsg.gmName === 'Player_Kori' && transferredMsg.previousGmName === 'GM_Diana', 'Participants notified that ownership was transferred');

// Resume from hiatus
gmMgr.setCampaignHiatus('TITN-371', false, 'Player_Kori');
assert.strictEqual(gmMgr.getCampaignInfo('TITN-371').isOnHiatus, false, 'Campaign resumed from hiatus');
console.log('✓ Campaign Ownership Transfer (Initiate during hiatus, Withdraw, Refuse, Accept) verified');

// =========================================================================
// 4. Join Requests Viewable by Campaign Owner Even When No Session Is Running
// =========================================================================
assert.strictEqual(gmMgr.isSessionActive('TITN-371'), false, 'Confirm no session is currently running');
const gmOfflineCardHtml = gmMgr.generatePartyHTML();
assert(gmOfflineCardHtml.includes('btn-open-join-requests'), 'Join Requests button is visible to campaign owner even when no session is running');

const submittedReq = gmMgr.submitCampaignJoinRequest({
  campaignId: 'TITN-371',
  campaignName: 'Titans Tomorrow',
  gmName: 'Player_Kori',
  playerName: 'Player_Raven',
  character: { id: 'char_raven', name: 'Raven', powerLevel: 10 }
});
assert(submittedReq && submittedReq.status === 'pending', 'Join request submitted while no session is running');

const offlineReqs = gmMgr.getJoinRequestsForGM('TITN-371');
assert(offlineReqs.length >= 1 && offlineReqs[0].character_name === 'Raven', 'Campaign owner can retrieve join requests when no session is running');
console.log('✓ Join requests viewable by campaign owner without a session running verified');

// =========================================================================
// 5. Header Message Count Badge & All GM / Player Messaging Notifications
// =========================================================================
assert(indexHtml.includes('id="btn-header-messages"'), 'Header message button exists next to user icon');
assert(indexHtml.includes('id="header-message-count-badge"'), 'Header message count badge exists next to user icon');
assert(indexHtml.includes('id="modal-campaign-messages"'), 'Campaign messages modal exists in index.html');

// Rejecting a join request notifies the player
gmMgr.respondToCampaignJoinRequest(submittedReq.id, 'rejected', 'Player_Kori');
const rejectNotification = gmMgr.getAllCampaignMessages().find(m => m.type === 'JOIN_REQUEST_REJECTED' && m.playerName === 'Player_Raven');
assert(rejectNotification, 'Player is notified via messaging when GM rejects join request');
assert(rejectNotification.campaignName === 'Titans Tomorrow' && rejectNotification.gmName === 'Player_Kori', 'Rejection message notes Campaign, GM, and Player');

// Approving a join request notifies participants that a new player/character joined
const req2 = gmMgr.submitCampaignJoinRequest({
  campaignId: 'TITN-371',
  campaignName: 'Titans Tomorrow',
  gmName: 'Player_Kori',
  playerName: 'Player_Cyborg',
  character: { id: 'char_cyborg', name: 'Cyborg', powerLevel: 10 }
});
gmMgr.respondToCampaignJoinRequest(req2.id, 'approved', 'Player_Kori');
const joinedNotification = gmMgr.getAllCampaignMessages().find(m => m.type === 'PLAYER_CHARACTER_JOINED' && m.playerName === 'Player_Cyborg');
assert(joinedNotification && joinedNotification.characterName === 'Cyborg', 'Participants notified when a new player/character joins campaign');

// Character detachment notification
const detachMsg = gmMgr.notifyCharacterDetached({
  campaignId: 'TITN-371',
  campaignName: 'Titans Tomorrow',
  gmName: 'Player_Kori',
  playerName: 'Player_Cyborg',
  characterName: 'Cyborg'
});
assert.strictEqual(detachMsg.type, 'CHARACTER_DETACHED');
assert(detachMsg.text.includes('Titans Tomorrow') && detachMsg.text.includes('Player_Kori') && detachMsg.text.includes('Player_Cyborg'), 'Detachment message notes Campaign, GM, and Player');

// Character rollback notification
const rollbackMsg = gmMgr.notifyCharacterRollback({
  campaignId: 'TITN-371',
  campaignName: 'Titans Tomorrow',
  gmName: 'Player_Kori',
  playerName: 'Player_Cyborg',
  characterName: 'Cyborg',
  details: 'Restored earlier save'
});
assert.strictEqual(rollbackMsg.type, 'CHARACTER_ROLLBACK');
assert(rollbackMsg.text.includes('Titans Tomorrow') && rollbackMsg.text.includes('Player_Kori') && rollbackMsg.text.includes('Player_Cyborg'), 'Rollback message notes Campaign, GM, and Player');

// Player leaving campaign notification
const leftMsg = gmMgr.notifyPlayerLeftCampaign({
  campaignId: 'TITN-371',
  campaignName: 'Titans Tomorrow',
  gmName: 'Player_Kori',
  playerName: 'Player_Cyborg',
  characterNames: ['Cyborg']
});
assert.strictEqual(leftMsg.type, 'PLAYER_LEFT_CAMPAIGN');
assert(leftMsg.text.includes('Titans Tomorrow') && leftMsg.text.includes('Player_Kori') && leftMsg.text.includes('Player_Cyborg'), 'Player leaving message notes Campaign, GM, and Player');

// GM deleting/cancelling campaign notifies participants
assert( gmMgr.getUnreadMessageCount() > 0, 'Unread message count is tracked for badge next to user icon');
gmMgr.deleteCampaignByGM('TITN-371', 'Player_Kori');
const cancelMsg = gmMgr.getAllCampaignMessages().find(m => m.type === 'CAMPAIGN_CANCELLED' && m.campaignId === 'TITN-371');
assert(cancelMsg && cancelMsg.campaignName === 'Titans Tomorrow' && cancelMsg.gmName === 'Player_Kori', 'Participants notified via messaging when campaign is cancelled/deleted');
console.log('✓ Header message count badge & all GM/Player campaign notifications verified');


// =========================================================================
// 6. Campaign Tracker Scroll Lock (Prevent Scrolling Underlying Window)
// =========================================================================
const stylesCss = readFileSync('css/styles.css', 'utf8');
assert(stylesCss.includes('body.modal-open') && stylesCss.includes('overflow: hidden !important;'), 'styles.css locks body overflow when modal-open is active');
assert(stylesCss.includes('overscroll-behavior: contain !important;'), 'styles.css sets overscroll-behavior: contain on campaign tracker content');
assert(appJs.includes('syncBodyScrollLock()'), 'app.js syncs body scroll lock on openModal and closeModal');
assert(appJs.includes("campaignModalEl.addEventListener('wheel'"), 'app.js isolates wheel events inside #modal-campaign-tracker');
console.log('✓ Campaign tracker scroll isolation (no background window scroll) verified');

console.log('\nALL v3.73 FEATURE TESTS PASSED CLEANLY!');
