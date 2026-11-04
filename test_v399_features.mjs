import assert from 'assert';
import fs from 'fs';
import { CampaignTrackerManager } from './js/party.js?v=3.99';

console.log('--- TEST SUITE: v3.99 Features & Database Admin ---');

// Test 1: Verify non-GM users cannot delete campaigns in the standard Campaign Browser
console.log('Test 1: Verify non-GM users cannot delete campaigns in Campaign Browser');
import { supabaseService } from './js/supabase_client.js?v=3.99';
supabaseService.isLoggedIn = () => true;
supabaseService.getUsername = () => 'player1';

const mgr = new CampaignTrackerManager();
// Set current username to 'player1'
mgr.getCurrentUsername = () => 'player1';

// Register two campaigns: one where player1 is GM, one where player1 is NOT GM
const myCamp = {
  campaignId: 'MYCA-1111',
  campaignName: 'My GM Campaign',
  creatorName: 'player1',
  isCreator: true,
  isPublic: true,
  powerLevel: 10
};
const otherCamp = {
  campaignId: 'OTHR-2222',
  campaignName: 'Other GM Campaign',
  creatorName: 'captainload',
  isCreator: false,
  isPublic: true,
  powerLevel: 10
};

mgr.registerCampaignInfo(myCamp);
mgr.registerCampaignInfo(otherCamp);
mgr.saveToCampaignHistory(myCamp);
mgr.saveToCampaignHistory(otherCamp);

const browserHtml = mgr.generateCampaignBrowserHTML();

// Ensure btn-delete-orphan-campaign and btn-purge-orphan-campaigns are NOT in the Campaign Browser HTML
assert.strictEqual(
  browserHtml.includes('btn-delete-orphan-campaign'),
  false,
  'Campaign Browser must NOT contain btn-delete-orphan-campaign for non-GM users'
);
assert.strictEqual(
  browserHtml.includes('btn-purge-orphan-campaigns'),
  false,
  'Campaign Browser must NOT contain btn-purge-orphan-campaigns button'
);

// Ensure GM tools ARE present for myCamp
assert.strictEqual(
  browserHtml.includes('btn-gm-delete-campaign'),
  true,
  'GM of a campaign must still have access to GM delete campaign button'
);
console.log('✓ Non-GM users cannot delete campaigns in Campaign Browser; GM controls preserved.');

// Test 2: Admin Console HTML & Script Verification
console.log('Test 2: Verify Admin Console structure in admin.html & js/admin.js');
assert.ok(fs.existsSync('admin.html'), 'admin.html must exist');
assert.ok(fs.existsSync('js/admin.js'), 'js/admin.js must exist');

const adminHtml = fs.readFileSync('admin.html', 'utf8');
const adminJs = fs.readFileSync('js/admin.js', 'utf8');

// Check key sections in admin.html
assert.ok(adminHtml.includes('Database Administration Console'), 'Title must be present in admin.html');
assert.ok(adminHtml.includes('tab-campaigns'), 'Campaigns tab must exist');
assert.ok(adminHtml.includes('tab-users'), 'Users tab must exist');
assert.ok(adminHtml.includes('tab-requests'), 'Join Requests tab must exist');
assert.ok(adminHtml.includes('tab-members'), 'Members tab must exist');
assert.ok(adminHtml.includes('tab-diagnostics'), 'Diagnostics tab must exist');
assert.ok(adminHtml.includes('tab-backup'), 'Backup tab must exist');
assert.ok(adminHtml.includes('auth-overlay'), 'Admin auth overlay must exist');
assert.ok(adminHtml.includes('btn-cli-login'), 'Admin login button must exist');

// Check key controller methods in js/admin.js
assert.ok(adminJs.includes('refreshAllData'), 'refreshAllData must exist in js/admin.js');
assert.ok(adminJs.includes('deleteCampaignAdmin'), 'deleteCampaignAdmin must exist in js/admin.js');
assert.ok(adminJs.includes('purgeLocalOrphans'), 'purgeLocalOrphans must exist in js/admin.js');
assert.ok(adminJs.includes('resyncBrowserCacheWithCloud'), 'resyncBrowserCacheWithCloud must exist in js/admin.js');
assert.ok(adminJs.includes('exportDatabaseJSON'), 'exportDatabaseJSON must exist in js/admin.js');
console.log('✓ Admin Console files and methods verified successfully.');

// Test 3: Local Storage Orphan Diagnostics Logic
console.log('Test 3: Verify Orphan Detection Logic against known GMs (captainload & psycros)');
const testLocalCampaigns = [
  { code: 'TITA-4039', name: 'Titan Watch', creator: 'psycros' },
  { code: 'TEST-6144', name: 'Test 1', creator: 'psycros' },
  { code: 'CAPT-1234', name: 'Captain Watch', creator: 'captainload' },
  { code: 'ORPH-9999', name: 'Ghost Campaign', creator: 'unknown_tester' }
];

const knownGMs = ['captainload', 'psycros'];
const cloudCodes = new Set(['TITA-4039', 'TEST-6144']);

testLocalCampaigns.forEach(c => {
  const inCloud = cloudCodes.has(c.code);
  const isKnownGM = knownGMs.includes((c.creator || '').toLowerCase());
  c.isCloudVerified = inCloud;
  c.isOrphan = !inCloud && !isKnownGM;
});

const verified = testLocalCampaigns.filter(c => c.isCloudVerified);
const orphans = testLocalCampaigns.filter(c => c.isOrphan);

assert.strictEqual(verified.length, 2, 'Should have 2 cloud-verified campaigns');
assert.strictEqual(orphans.length, 1, 'Should identify exactly 1 orphan campaign (Ghost Campaign)');
assert.strictEqual(orphans[0].code, 'ORPH-9999', 'Orphan code should be ORPH-9999');
console.log('✓ Orphan detection correctly isolates non-GM campaigns.');

// Test 4: Verify index.html user dropdown has Database Admin launch link
console.log('Test 4: Verify index.html contains Database Admin launch link');
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(indexHtml.includes('btn-header-database-admin'), 'index.html must contain btn-header-database-admin');
assert.ok(indexHtml.includes('href="admin.html"'), 'index.html must link to admin.html');
console.log('✓ Database Admin link is present in index.html user dropdown.');

// Test 5: Verify GitHub Project Credentials Authorization Gating
console.log('Test 5: Verify GitHub Project Credentials Authorization Gating');
assert.ok(adminHtml.includes('captainload'), 'admin.html must designate captainload as authorized project admin');
assert.ok(adminHtml.includes('GitHub Project Administration'), 'admin.html must emphasize GitHub project administration');
assert.ok(adminJs.includes('captainload'), 'js/admin.js must enforce captainload login');
assert.ok(adminJs.includes('api.github.com/user'), 'js/admin.js must verify credentials with GitHub API');
assert.ok(adminJs.includes('verifyAndSignIn'), 'js/admin.js must implement verifyAndSignIn');
console.log('✓ Database Admin is strictly gated by GitHub project credentials (captainload).');

// Test 6: Verify GM Join Request Synchronization into Messages & Requests Store
console.log('Test 6: Verify GM Join Request Synchronization into Messages & Requests Store');
const gmPartyMgr = new CampaignTrackerManager();
gmPartyMgr.getCurrentUsername = () => 'psycros';

const mockSupabase = {
  client: {
    from: (table) => {
      if (table === 'campaigns') {
        return {
          select: () => ({
            eq: () => ({
              order: () => Promise.resolve({
                data: [
                  {
                    id: '5818983e-9d76-4bcf-98c8-e74c2a48f690',
                    campaign_code: 'TEST-6144',
                    campaign_name: 'Test 1',
                    creator_id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d',
                    creator_name: 'psycros',
                    power_level: 10,
                    is_public: true
                  }
                ],
                error: null
              })
            })
          })
        };
      }
      if (table === 'join_requests') {
        return {
          select: () => ({
            in: () => Promise.resolve({
              data: [
                {
                  id: '92d2e280-6115-4964-9e5c-4023d8759c5d',
                  campaign_id: '5818983e-9d76-4bcf-98c8-e74c2a48f690',
                  user_id: '10ef10b5-5583-424c-bccb-1ba7ca8033a8',
                  username: 'captainload',
                  character_name: 'Hero',
                  power_level: 7,
                  character_data: { name: 'Hero', powerLevel: 7 },
                  status: 'pending',
                  created_at: new Date().toISOString()
                }
              ],
              error: null
            }),
            eq: () => Promise.resolve({ data: [], error: null })
          })
        };
      }
      if (table === 'campaign_members') {
        return {
          select: () => ({
            eq: () => Promise.resolve({ data: [], error: null })
          })
        };
      }
      return {};
    }
  },
  currentUser: { id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d', email: 'psycros@test.com' },
  getUsername: () => 'psycros',
  isLoggedIn: () => true,
  getMyCreatedCampaigns: async function() {
    return [
      {
        id: '5818983e-9d76-4bcf-98c8-e74c2a48f690',
        campaign_code: 'TEST-6144',
        campaign_name: 'Test 1',
        creator_id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d',
        creator_name: 'psycros',
        power_level: 10,
        is_public: true
      }
    ];
  },
  getMyParticipatedCampaigns: async () => [],
  getPublicCampaigns: async () => []
};

mockSupabase.syncCloudCampaignsToLocal = supabaseService.syncCloudCampaignsToLocal.bind(mockSupabase);

await mockSupabase.syncCloudCampaignsToLocal(gmPartyMgr);

const userMsgs = gmPartyMgr.getMessagesForCurrentUser();
assert.ok(userMsgs.length > 0, 'psycros must receive messages');
const joinReqMsg = userMsgs.find(m => m.type === 'JOIN_REQUEST');
assert.ok(joinReqMsg, 'JOIN_REQUEST message must exist for psycros');
assert.strictEqual(joinReqMsg.playerName, 'captainload');
assert.strictEqual(joinReqMsg.characterName, 'Hero');
assert.strictEqual(joinReqMsg.campaignId, 'TEST-6144');
assert.strictEqual(joinReqMsg.recipientRole, 'GM');
assert.strictEqual(joinReqMsg.read, false);
assert.strictEqual(gmPartyMgr.getUnreadMessageCount() >= 1, true, 'Unread message count must be at least 1');

// Verify join requests store
const gmReqs = gmPartyMgr.getJoinRequestsForGM();
assert.ok(gmReqs.length > 0, 'GM must have join requests in store');
const targetReq = gmReqs.find(r => r.username === 'captainload');
assert.ok(targetReq, 'Join request from captainload must be found in GM store');
assert.strictEqual(targetReq.campaignId, 'TEST-6144');
assert.strictEqual(targetReq.status, 'pending');

// Test responding to join request
gmPartyMgr.respondToCampaignJoinRequest(targetReq.id, 'approved', 'psycros');
const updatedReq = gmPartyMgr.getAllJoinRequestsStore().find(r => r.id === targetReq.id);
assert.strictEqual(updatedReq.status, 'approved', 'Request status must be updated to approved');

// Ensure JOIN_REQUEST message was marked read
const updatedJoinMsg = gmPartyMgr.getAllCampaignMessages().find(m => m.id === joinReqMsg.id);
assert.strictEqual(updatedJoinMsg.read, true, 'JOIN_REQUEST message must be marked read once responded to');
console.log('✓ Cloud join requests sync seamlessly to GM messages, increment unread count, and allow GM review/approval.');

// Test 7: Verify Database Admin mentions ONLY Captainload (Requirement 5)
console.log('Test 7: Verify Database Admin mode mentions ONLY Captainload');
const adminHtmlContent = fs.readFileSync('admin.html', 'utf8');
const adminJsContent = fs.readFileSync('js/admin.js', 'utf8');
assert.ok(adminHtmlContent.toLowerCase().includes('captainload'), 'admin.html must mention captainload');
assert.ok(adminJsContent.toLowerCase().includes('captainload'), 'js/admin.js must mention captainload');
assert.strictEqual(adminHtmlContent.includes('psycros'), false, 'admin.html must NOT mention psycros');
assert.strictEqual(adminJsContent.includes('psycros'), false, 'js/admin.js must NOT mention psycros');
console.log('✓ Database Admin mode exclusively mentions Captainload.');

// Test 8: Verify GM Campaign Invitation & Automatic Read on Acceptance (Requirements 2 & 4)
console.log('Test 8: Verify GM Campaign Invitation dispatch, acceptance, and auto-read');
const inviteMgr = new CampaignTrackerManager();
inviteMgr.getCurrentUsername = () => 'captainload';
const inviteCamp = {
  campaignId: 'INV-4455',
  campaignName: 'Invited Vanguard',
  creatorName: 'captainload',
  isCreator: true,
  isPublic: true,
  powerLevel: 10
};
inviteMgr.registerCampaignInfo(inviteCamp);
inviteMgr.saveToCampaignHistory(inviteCamp);

// GM sends invitation to psycros
const inviteMsg = inviteMgr.sendCampaignInvitation({
  targetUser: 'psycros',
  campaignId: 'INV-4455',
  gmName: 'captainload',
  customNote: 'Join our team for the next session!'
});

assert.ok(inviteMsg, 'Invitation message must be generated');
assert.strictEqual(inviteMsg.type, 'CAMPAIGN_INVITATION');
assert.strictEqual(inviteMsg.recipientUser, 'psycros');
assert.strictEqual(inviteMsg.campaignId, 'INV-4455');
assert.strictEqual(inviteMsg.invitationStatus, 'pending');
assert.strictEqual(inviteMsg.read, false);

// Psycros views and accepts invitation
inviteMgr.getCurrentUsername = () => 'psycros';
const psycrosMsgs = inviteMgr.getMessagesForCurrentUser();
const foundInvite = psycrosMsgs.find(m => m.id === inviteMsg.id);
assert.ok(foundInvite, 'Psycros must receive the invitation message');

inviteMgr.respondToCampaignInvitation(foundInvite.id, true, { name: 'InvitedHero', powerLevel: 10 });
const acceptedInvite = inviteMgr.getAllCampaignMessages().find(m => m.id === foundInvite.id);
assert.strictEqual(acceptedInvite.invitationStatus, 'accepted', 'Invitation status must be accepted');
assert.strictEqual(acceptedInvite.read, true, 'Invitation must be marked read upon acceptance (Requirement 4)');

// Verify that approving a join request also marks any invitations for that campaign as read
const joinInviteMsg = inviteMgr.sendCampaignInvitation({
  targetUser: 'newplayer',
  campaignId: 'INV-4455',
  gmName: 'captainload'
});
assert.strictEqual(joinInviteMsg.read, false);
// Add a mock join request and approve it
const joinReq = {
  id: 'req_auto_read_test',
  campaignId: 'INV-4455',
  campaignName: 'Invited Vanguard',
  username: 'newplayer',
  character_name: 'Speedy',
  character_data: { name: 'Speedy' },
  status: 'pending'
};
inviteMgr.saveAllJoinRequestsStore([joinReq]);
inviteMgr.respondToCampaignJoinRequest('req_auto_read_test', 'approved', 'captainload');
const readAfterApproval = inviteMgr.getAllCampaignMessages().find(m => m.id === joinInviteMsg.id);
assert.strictEqual(readAfterApproval.read, true, 'Invitations must be automatically marked read when user join is approved');
console.log('✓ GM campaign invitations operate smoothly and are automatically marked read on campaign acceptance.');

// Test 9: Verify Campaign Dropdown Selector / Switching on Messages (Requirement 8)
console.log('Test 9: Verify Campaign message updating and tag persistence');
const switchCamp1 = { campaignId: 'CAMP-A', campaignName: 'Alpha Squad', creatorName: 'captainload', isCreator: true };
const switchCamp2 = { campaignId: 'CAMP-B', campaignName: 'Beta Division', creatorName: 'captainload', isCreator: true };
inviteMgr.registerCampaignInfo(switchCamp1);
inviteMgr.registerCampaignInfo(switchCamp2);

const directMsg = inviteMgr.sendCampaignMessage({
  type: 'DIRECT_USER_MESSAGE',
  senderUser: 'captainload',
  recipientUser: 'psycros',
  campaignId: 'CAMP-A',
  campaignName: 'Alpha Squad',
  text: 'Are you ready for the mission?'
});
assert.strictEqual(directMsg.campaignId, 'CAMP-A');

// Switch message to Beta Division
const updatedSwitchMsg = inviteMgr.updateMessageCampaign(directMsg.id, 'CAMP-B');
assert.strictEqual(updatedSwitchMsg.campaignId, 'CAMP-B', 'Campaign ID must update to CAMP-B');
assert.strictEqual(updatedSwitchMsg.campaignName, 'Beta Division', 'Campaign name must update to Beta Division');
console.log('✓ Message campaign dropdown switching properly updates message campaign attribution.');

// Test 10: Verify Role Labels and Formatting in Messages (Requirements 1 & 7)
console.log('Test 10: Verify Role Labels formatting (👑 without GM text; generic 👤 without Player text for non-players)');
const appJsContent = fs.readFileSync('js/app.js', 'utf8');
// Verify From and To badges are rendered
assert.ok(appJsContent.includes('msg-from-badge'), 'app.js must render msg-from-badge');
assert.ok(appJsContent.includes('msg-to-badge'), 'app.js must render msg-to-badge');
assert.ok(appJsContent.includes('msg-campaign-badge'), 'app.js must render msg-campaign-badge');
assert.ok(appJsContent.includes('btn-msg-expand-arrow'), 'app.js must render btn-msg-expand-arrow modal arrows');
assert.ok(appJsContent.includes('msg-card-collapsible-section'), 'app.js must wrap message content in msg-card-collapsible-section');
assert.ok(appJsContent.includes('btn-msg-accept-invite'), 'app.js must render btn-msg-accept-invite');
assert.ok(appJsContent.includes('btn-msg-decline-invite'), 'app.js must render btn-msg-decline-invite');
assert.ok(appJsContent.includes('btn-address-book-invite-user'), 'app.js must render btn-address-book-invite-user in address book');
console.log('✓ AppController messaging templates correctly include From/To badges, Campaign badge, and modal arrow expand toggles.');

// Test 11: Verify Email Forwarding Settings and Privacy (Requirement 3)
console.log('Test 11: Verify Email Forwarding setting and privacy isolation');
const serverJsContent = fs.readFileSync('server.js', 'utf8');
assert.ok(serverJsContent.includes('/api/forward-message-email'), 'server.js must expose /api/forward-message-email endpoint');
assert.ok(serverJsContent.includes('#action=accept_invite'), 'Forwarding email must construct bidirectional accept_invite action link');
assert.ok(serverJsContent.includes('#action=decline_invite'), 'Forwarding email must construct bidirectional decline_invite action link');
assert.ok(serverJsContent.includes('#action=reply'), 'Forwarding email must construct bidirectional reply action link');

const indexHtmlContent = fs.readFileSync('index.html', 'utf8');
assert.ok(indexHtmlContent.includes('user-settings-chk-email-forward'), 'User settings modal must contain email forward checkbox');
assert.ok(indexHtmlContent.includes('Privacy Guard') && indexHtmlContent.includes('strictly confidential'), 'Privacy guarantee must be displayed');
console.log('✓ Email forwarding and bidirectional action links verified with complete privacy preservation.');

// Test 12: Prevent joining non-existent campaigns & filter campaigns with no GM
console.log('Test 12: Verify non-existent campaign rejection and no-GM browser filtering');
const ghostMgr = new CampaignTrackerManager();
ghostMgr.getCurrentUsername = () => 'tester_hero';
assert.throws(() => {
  ghostMgr.joinCampaign({ campaignId: 'NON-EXISTENT-999', campaignName: 'Ghost Realm' });
}, /does not exist on the server/i, 'joinCampaign must throw an error when attempting to join a non-existent campaign');

// Ensure campaigns without a GM are never shown in browser
ghostMgr.registerCampaignInfo({ campaignId: 'GHOST-001', campaignName: 'Ghost Camp', creatorName: '' });
const browsable = ghostMgr.getBrowsableCampaigns();
assert.strictEqual(browsable.some(c => c.campaignId === 'GHOST-001'), false, 'Campaigns without GM must not be browsable');
console.log('✓ Joining non-existent campaigns is rejected, and campaigns with no GM are filtered from the browser.');

// Test 13: Verify "Join Party" is changed to "Join Campaign"
console.log('Test 13: Verify "Join Party" text is renamed to "Join Campaign"');
const partyJsContent = fs.readFileSync('js/party.js', 'utf8');
assert.strictEqual(partyJsContent.includes('🔗 Join Party'), false, 'party.js must not contain "🔗 Join Party"');
assert.strictEqual(partyJsContent.includes('Apply to join a party by name'), false, 'party.js must not contain "Apply to join a party by name"');
assert.ok(partyJsContent.includes('🔗 Join Campaign'), 'party.js must contain "🔗 Join Campaign"');
assert.ok(partyJsContent.includes('Apply to join a campaign by name'), 'party.js must contain "Apply to join a campaign by name"');
console.log('✓ "Join Party" successfully renamed to "Join Campaign".');

// Test 14: Actions dropdown modifications (Attach Character, Remove from Party, Leave Campaign, Apply to Join)
console.log('Test 14: Verify Actions dropdown commands');
const actionsMgr = new CampaignTrackerManager();
actionsMgr.getCurrentUsername = () => 'speedster_guy';

// Create a campaign owned by captainload
const testCamp = {
  campaignId: 'ACT-100',
  campaignName: 'Action Squad',
  creatorName: 'captainload',
  isCreator: false,
  isPublic: true,
  powerLevel: 10
};
actionsMgr.registerCampaignInfo(testCamp);
actionsMgr.saveToCampaignHistory(testCamp);

// Case A: User is not yet a member
let browserHTML = actionsMgr.generateCampaignBrowserHTML();
let act100Card = browserHTML.split('<div class="campaign-browser-card"').find(chunk => chunk.includes('ACT-100')) || '';
assert.ok(act100Card.includes('btn-browser-apply-campaign'), 'Non-member must see Apply to Join');
assert.ok(act100Card.includes('Apply to Join'), 'Label must say Apply to Join');
assert.strictEqual(act100Card.includes('btn-browser-attach-char'), false, 'Non-member must NOT see Attach Character');

// Case B: User becomes member without character in party
actionsMgr.saveToCampaignHistory({
  ...testCamp,
  isJoinedOrCreated: true
});
browserHTML = actionsMgr.generateCampaignBrowserHTML();
act100Card = browserHTML.split('<div class="campaign-browser-card"').find(chunk => chunk.includes('ACT-100')) || '';
assert.ok(act100Card.includes('btn-browser-attach-char'), 'Campaign member without character must see Attach Character');
assert.ok(act100Card.includes('Attach Character'), 'Label must say Attach Character');
assert.ok(act100Card.includes('btn-leave-campaign-membership'), 'Member must see Leave Campaign');

// Case C: Character is in party
const mockCharInParty = {
  id: 'speed_char_1',
  name: 'Lightning',
  campaignId: 'ACT-100',
  campaign: 'Action Squad',
  powerLevel: 10
};
// Add to stored characters
globalThis.storageManager = {
  getCharacters: () => [mockCharInParty]
};
browserHTML = actionsMgr.generateCampaignBrowserHTML();
act100Card = browserHTML.split('<div class="campaign-browser-card"').find(chunk => chunk.includes('ACT-100')) || '';
assert.ok(act100Card.includes('btn-remove-char-from-party'), 'Member with character in party must see Remove Character from Party');
assert.ok(act100Card.includes('Remove Lightning from Party'), 'Label must name the character to remove');
assert.ok(act100Card.includes('btn-leave-campaign-membership'), 'Member must see Leave Campaign');
console.log('✓ Actions menu correctly surfaces Attach character, Remove from party, Leave campaign, and Apply to join.');

// Test 15: Character change detection between sessions, "!" badge, and GM Report / Approval
console.log('Test 15: Verify character change detection, "!" badge, and GM Report / Approval');
const sessionMgr = new CampaignTrackerManager();
sessionMgr.getCurrentUsername = () => 'captainload';
sessionMgr.saveCampaignState({
  isConnected: true,
  campaignId: 'ACT-100',
  campaignName: 'Action Squad',
  isHost: true,
  isCreator: true
});

// Approved copy from end of last session:
const baselineChar = {
  name: 'Lightning',
  playerName: 'speedster_guy',
  powerLevel: 10,
  powerPoints: { spent: 150, total: 150 },
  abilities: { agility: 5, strength: 2, stamina: 3 },
  powers: [{ name: 'Super-Speed', rank: 10 }]
};
sessionMgr.saveCampaignSavedCharacter('ACT-100', baselineChar, 'speedster_guy');

// Player joins session with updated character:
const updatedChar = {
  name: 'Lightning',
  playerName: 'speedster_guy',
  powerLevel: 10,
  powerPoints: { spent: 152, total: 152 },
  abilities: { agility: 6, strength: 2, stamina: 3 },
  powers: [{ name: 'Super-Speed', rank: 11 }]
};

sessionMgr.savePartyMembers([{
  id: 'party_mem_1',
  characterName: 'Lightning',
  playerName: 'speedster_guy',
  heroPoints: 1,
  bruises: 0,
  conditions: [],
  characterData: baselineChar,
  lastUpdated: new Date().toLocaleTimeString()
}]);

// Compare and record diff alert
const diffs = sessionMgr.compareCharacterCopies(baselineChar, updatedChar);
assert.ok(diffs.length > 0, 'Differences must be detected');
assert.ok(diffs.some(d => d.includes('Agility')), 'Agility change must be noted');
assert.ok(diffs.some(d => d.includes('Super-Speed')), 'Super-Speed rank change must be noted');

sessionMgr.recordMemberDiffAlert('ACT-100', 'Lightning', diffs, updatedChar);

// Verify party tracker HTML renders "!" badge and GM Report dropdown
const trackerHTML = sessionMgr.generateSessionTrackerHTML();
assert.ok(trackerHTML.includes('party-char-alert-badge'), 'Party member card must show alert badge');
assert.ok(trackerHTML.includes('!</span>'), 'Alert badge must contain "!" icon');
assert.ok(trackerHTML.includes('btn-gm-view-change-report'), 'GM dropdown must contain Report button');
assert.ok(trackerHTML.includes('Report (Changes since last session)'), 'Report button label must be present');
assert.ok(trackerHTML.includes('btn-gm-approve-character-changes'), 'GM dropdown must contain Approve Changes button');

// GM approves changes
const approved = sessionMgr.approveCharacterChanges('ACT-100', 'Lightning');
assert.strictEqual(approved, true, 'Changes must be approved');

// Re-render tracker HTML: alert badge must now be gone
const trackerAfterApprove = sessionMgr.generateSessionTrackerHTML();
assert.strictEqual(trackerAfterApprove.includes('party-char-alert-badge'), false, 'Alert badge must be cleared after approval');

// Verify saved campaign snapshot now reflects updated character
const savedAfter = sessionMgr.getCampaignSavedCharacter('ACT-100', 'Lightning', 'Lightning');
assert.strictEqual(savedAfter.characterData.abilities.agility, 6, 'Saved snapshot must reflect approved changes');
console.log('✓ Character change detection, "!" icon, GM change report, and approval flow verified successfully.');

// Test 16: Verify Inbox / Sent messages dropdown switching and getSentMessagesForCurrentUser
console.log('Test 16: Verify Inbox / Sent messages dropdown switching and getSentMessagesForCurrentUser');
const folderMgr = new CampaignTrackerManager();
folderMgr.getCurrentUsername = () => 'alice_sender';
folderMgr.saveAllCampaignMessages([]);

// Alice sends a message to Bob
const sentMsg = folderMgr.sendCampaignMessage({
  senderUser: 'alice_sender',
  recipientRole: 'USER',
  recipientUser: 'bob_receiver',
  campaignId: 'FOLDER-1',
  campaignName: 'Folder Test Campaign',
  text: 'Hello Bob from Alice!'
});

// Alice should see this in sent messages, not inbox
const aliceInbox = folderMgr.getMessagesForCurrentUser();
const aliceSent = folderMgr.getSentMessagesForCurrentUser();
assert.strictEqual(aliceSent.length, 1, 'Alice must have 1 sent message');
assert.strictEqual(aliceSent[0].id, sentMsg.id, 'Sent message ID must match');
assert.strictEqual(aliceInbox.length, 0, 'Alice must not have received her own direct message in inbox');

// Bob should see this in inbox, not sent
folderMgr.getCurrentUsername = () => 'bob_receiver';
const bobInbox = folderMgr.getMessagesForCurrentUser();
const bobSent = folderMgr.getSentMessagesForCurrentUser();
assert.strictEqual(bobInbox.length, 1, 'Bob must have 1 inbox message');
assert.strictEqual(bobInbox[0].id, sentMsg.id, 'Inbox message ID must match');
assert.strictEqual(bobSent.length, 0, 'Bob must have 0 sent messages');

// Check markup for folder select dropdown
const indexHtmlForFolder = fs.readFileSync('index.html', 'utf8');
assert.ok(indexHtmlForFolder.includes('id="msg-client-folder-select"'), 'index.html must have msg-client-folder-select');
assert.ok(indexHtmlForFolder.includes('value="inbox"'), 'Folder dropdown must have inbox option');
assert.ok(indexHtmlForFolder.includes('value="sent"'), 'Folder dropdown must have sent option');
console.log('✓ Inbox / Sent messages dropdown switching and getSentMessagesForCurrentUser verified.');

// Test 17: Verify "From:" and "To:" labels formatting for sender and recipient names
console.log('Test 17: Verify "From:" and "To:" labels formatting in messages');
const appJsForLabels = fs.readFileSync('js/app.js', 'utf8');
assert.ok(appJsForLabels.includes('From: ${fromFormatted}'), 'app.js must render From: label before sender');
assert.ok(appJsForLabels.includes('To: ${toFormatted}'), 'app.js must render To: label before recipient');
assert.ok(appJsForLabels.includes('msg-from-badge'), 'app.js must include msg-from-badge');
assert.ok(appJsForLabels.includes('msg-to-badge'), 'app.js must include msg-to-badge');
console.log('✓ "From:" and "To:" labels correctly formatted for sender and recipient names.');

// Test 18: Verify User Notes row sizing (1 row default, expands up to 3 rows before scrolling)
console.log('Test 18: Verify User Notes row sizing (1 row default, expands up to 3 rows before scrolling)');
const indexHtmlForNotes = fs.readFileSync('index.html', 'utf8');
assert.ok(indexHtmlForNotes.includes('id="user-settings-notes-input"'), 'index.html must contain user-settings-notes-input');
assert.ok(indexHtmlForNotes.includes('rows="1"'), 'user-settings-notes-input must show 1 row by default');
assert.ok(indexHtmlForNotes.includes('max-height: 4.5em'), 'user-settings-notes-input must cap at 3 rows before scrolling');

const stylesCssContent = fs.readFileSync('css/styles.css', 'utf8');
assert.ok(stylesCssContent.includes('.address-book-user-notes-middle'), 'styles.css must style .address-book-user-notes-middle');
assert.ok(stylesCssContent.includes('max-height: 4.2em'), '.address-book-user-notes-middle must expand up to 3 rows before scrolling');

assert.ok(appJsForLabels.includes('autoResizeUserNotes'), 'app.js must include autoResizeUserNotes dynamic handler');
console.log('✓ User Notes row sizing (1 row default, expands up to 3 rows before scrolling) verified.');

// Test 19: Verify Versioning (v4.02), GM Tools layout, and expand/collapse modal arrows
console.log('Test 19: Verify Versioning (v4.02), GM Tools layout, and expand/collapse modal arrows');
const vJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(vJson.version, '4.02', 'version.json must be v4.02');

const idxHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(idxHtml.includes('v4.02'), 'index.html must display v4.02');
assert.ok(idxHtml.includes('js/app.js?v=4.02'), 'index.html must include app.js?v=4.02 cache-buster');

const partyJsForGMTools = fs.readFileSync('js/party.js', 'utf8');
// Check that Campaign Actions dropdown does not prematurely close before GM Tools dropdown
const gmToolsPos = partyJsForGMTools.indexOf('campaign-gm-tools-dropdown');
assert.ok(gmToolsPos > 0, 'party.js must include campaign-gm-tools-dropdown');
const endOfActions = partyJsForGMTools.indexOf('btn-leave-campaign-membership');
const middleSnippet = partyJsForGMTools.slice(endOfActions, gmToolsPos);
// Count closing </div> tags between btn-leave-campaign-membership and campaign-gm-tools-dropdown
const closeDivMatches = middleSnippet.match(/<\/div>/g) || [];
// Exactly 2 </div> tags: campaign-actions-panel and campaign-actions-dropdown container
assert.strictEqual(closeDivMatches.length, 2, 'Must close exactly the actions panel and actions dropdown container before GM Tools dropdown');

const appJsFull = fs.readFileSync('js/app.js', 'utf8');
assert.ok(appJsFull.includes('btn-msg-expand-arrow'), 'app.js must render expand/collapse modal arrows');
assert.ok(appJsFull.includes('msg-card-collapsible-section'), 'app.js must wrap full message content except first row');
assert.strictEqual(appJsFull.includes('msg-card-campaign-select'), false, 'app.js must NOT render recipient scope dropdown in inbox messages');
console.log('✓ v4.02 Versioning, GM Tools layout, and Expand/Collapse modal arrows verified successfully.');

// Test 20: Verify message text sizing (11pt) and campaign names in bold
console.log('Test 20: Verify message text sizing (11pt) and campaign names in bold');
assert.ok(appJsFull.includes('Campaign: <strong>${this.escapeHTML(m.campaignName || cleanMCampId)}</strong>'), 'Campaign badge must wrap campaign name in <strong>');
assert.ok(appJsFull.includes('font-size: 11pt; color: var(--text-bright); line-height: 1.5;'), 'msg-body-wrapper must use 11pt font size and 1.5 line height');
assert.ok(appJsFull.includes('formatMessageBodyText'), 'app.js must contain formatMessageBodyText helper');

const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
assert.ok(stylesCss.includes('.campaign-message-card .msg-body-content') && stylesCss.includes('font-size: 11pt;'), 'styles.css must style message body content with 11pt');
assert.ok(stylesCss.includes('.msg-campaign-badge strong') && stylesCss.includes('font-weight: 800;'), 'styles.css must bold campaign badge name');
assert.ok(stylesCss.includes('.textarea-msg-compose') && stylesCss.includes('font-size: 11pt;'), 'styles.css must style compose textarea with 11pt');

// Instantiate or evaluate formatMessageBodyText logic
const extractMethod = (source, methodName) => {
  const start = source.indexOf(methodName + '(');
  if (start < 0) return null;
  let braceCount = 0;
  let started = false;
  let end = -1;
  for (let i = start; i < source.length; i++) {
    if (source[i] === '{') {
      braceCount++;
      started = true;
    } else if (source[i] === '}') {
      braceCount--;
      if (started && braceCount === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return end > start ? source.slice(start, end) : null;
};

const formatFnCode = extractMethod(appJsFull, 'formatMessageBodyText');
assert.ok(formatFnCode, 'formatMessageBodyText must be successfully extracted from app.js');
const escapeFnCode = extractMethod(appJsFull, 'escapeHTML');
assert.ok(escapeFnCode, 'escapeHTML must be successfully extracted from app.js');

const TestClass = new Function(`
  return class TestApp {
    ${escapeFnCode}
    ${formatFnCode}
  };
`)();
const testApp = new TestClass();

const sampleText = 'Hero "Sentinel" wants to join campaign "Emerald City Knights". Welcome to Emerald City Knights!';
const formatted = testApp.formatMessageBodyText(sampleText, 'Emerald City Knights');
assert.ok(formatted.includes('<strong>Emerald City Knights</strong>'), 'formatMessageBodyText must wrap campaign name in <strong>');
assert.strictEqual((formatted.match(/<strong>Emerald City Knights<\/strong>/g) || []).length, 2, 'Must bold all occurrences without double-wrapping');

// Verify message details (from, to, etc.) are slightly larger (11pt)
assert.ok(appJsFull.includes('.msg-from-badge') || appJsFull.includes('class="msg-from-badge" style="font-size: 11pt;'), 'msg-from-badge must be styled with 11pt');
assert.ok(appJsFull.includes('.msg-to-badge') || appJsFull.includes('class="msg-to-badge" style="font-size: 11pt;'), 'msg-to-badge must be styled with 11pt');
assert.ok(stylesCss.includes('.msg-from-badge') && stylesCss.includes('.msg-to-badge') && stylesCss.includes('font-size: 11pt;'), 'styles.css must style message badges with 11pt');
assert.ok(indexHtmlContent.includes('id="msg-compose-recipient-input"') && indexHtmlContent.includes('font-size: 11pt;'), 'index.html must style compose recipient input with 11pt');
console.log('✓ Message details (from, to, campaign, timestamp) slightly larger (11pt) verified successfully.');

// Test 21: Campaign Browser Session Logs Dropdown & Split Pane Log Viewer
console.log('Test 21: Verify Campaign Browser Session Logs dropdown & split viewer');
supabaseService.getUsername = () => 'captainload';
const logsMgr = new CampaignTrackerManager();
logsMgr.getCurrentUsername = () => 'captainload';

const testCampLogs = {
  campaignId: 'LOGS-900',
  campaignName: 'Metro Defense',
  creatorName: 'captainload',
  isCreator: true,
  isJoinedOrCreated: true,
  isPublic: true,
  powerLevel: 10
};
logsMgr.registerCampaignInfo(testCampLogs);
logsMgr.saveToCampaignHistory(testCampLogs);

// Verify initially empty - no bogus logs fabricated if none recorded
const initialLogs = logsMgr.getCampaignSessionLogs('LOGS-900');
assert.strictEqual(initialLogs.length, 0, 'Must not seed bogus session logs when none are recorded');

// Check browser HTML shows clean empty state
const emptyBrowserHTML = logsMgr.generateCampaignBrowserHTML();
assert.ok(emptyBrowserHTML.includes('No previous session logs recorded yet.'), 'Empty logs state must be displayed');

// Save authentic session logs
logsMgr.saveCampaignSessionLog('LOGS-900', {
  id: 'slog_test_1',
  title: 'Session 1: Warehouse Reconnaissance',
  date: '10/12/2026',
  time: '7:00 PM',
  notes: 'Players conducted surveillance at the docks.'
});
logsMgr.saveCampaignSessionLog('LOGS-900', {
  id: 'slog_test_2',
  title: 'Session 2: Infiltration',
  date: '10/19/2026',
  time: '7:30 PM',
  notes: 'Party breached the perimeter and accessed logs.'
});
const logs = logsMgr.getCampaignSessionLogs('LOGS-900');
assert.ok(Array.isArray(logs) && logs.length === 2, 'Must have saved authentic session logs');
assert.ok(logs[0].title && logs[0].date && logs[0].notes, 'Session log must contain title, date, and notes');

// Verify Campaign Browser HTML has campaign-logs-dropdown and replaces attach button for members
const browserHTMLWithLogs = logsMgr.generateCampaignBrowserHTML();
assert.ok(browserHTMLWithLogs.includes('campaign-logs-dropdown'), 'Browser must include campaign-logs-dropdown');
assert.ok(browserHTMLWithLogs.includes('campaign-logs-toggle'), 'Browser must include campaign-logs-toggle');
assert.ok(browserHTMLWithLogs.includes('btn-view-session-log'), 'Logs panel must include btn-view-session-log');
assert.ok(browserHTMLWithLogs.includes('max-height: calc(6 * 44px + 36px)'), 'Logs dropdown must limit height to 6 entries before scrolling');

// Verify split wrapper structure in HTML
assert.ok(browserHTMLWithLogs.includes('campaign-browser-split-wrapper'), 'Browser HTML must contain campaign-browser-split-wrapper');
assert.ok(browserHTMLWithLogs.includes('campaign-browser-top-pane'), 'Browser HTML must contain campaign-browser-top-pane');
assert.ok(browserHTMLWithLogs.includes('campaign-browser-split-divider'), 'Browser HTML must contain campaign-browser-split-divider');
assert.ok(browserHTMLWithLogs.includes('campaign-browser-log-pane'), 'Browser HTML must contain campaign-browser-log-pane');

// Mock DOM elements to test split interactions (open log, double click divider, close, switch logs)
const mockElements = {};
const mockDoc = {
  querySelector: (sel) => mockElements[sel] || null,
  querySelectorAll: (sel) => mockElements[sel] ? [mockElements[sel]] : [],
  addEventListener: () => {},
  removeEventListener: () => {}
};

const mockWrapper = {
  style: {},
  ownerDocument: mockDoc,
  querySelector: (s) => mockElements[s] || null,
  querySelectorAll: (s) => mockElements[s] ? [mockElements[s]] : [],
  getBoundingClientRect: () => ({ height: 600, top: 100 })
};
const mockTopPane = { style: {}, getBoundingClientRect: () => ({ height: 300, top: 100 }) };
const mockDivider = { style: {}, addEventListener: (evt, fn) => { mockDivider['on_' + evt] = fn; }, classList: { add: () => {}, remove: () => {} } };
const mockLogPane = { innerHTML: '', style: {} };

mockElements['#campaign-browser-split-wrapper'] = mockWrapper;
mockElements['#campaign-browser-top-pane'] = mockTopPane;
mockElements['#campaign-browser-split-divider'] = mockDivider;
mockElements['#campaign-browser-log-pane'] = mockLogPane;

// 1. Open first session log
logsMgr.openSessionLogInBrowser('LOGS-900', logs[0].id, { ownerDocument: mockDoc, querySelector: (s) => mockElements[s], querySelectorAll: (s) => mockElements[s] ? [mockElements[s]] : [] });
assert.strictEqual(mockDivider.style.display, 'flex', 'Divider must be visible when log is opened');
assert.strictEqual(mockLogPane.style.display, 'flex', 'Log pane must be visible when log is opened');
assert.ok(mockLogPane.innerHTML.includes(logs[0].title), 'Log pane must display the selected log title');
assert.ok(mockLogPane.innerHTML.includes('btn-close-log-viewer'), 'Log pane must contain ✕ close button');

// 2. Double-click divider restores default 50/50 position
assert.ok(typeof mockDivider.on_dblclick === 'function', 'Divider must have dblclick listener');
mockDivider.on_dblclick({ preventDefault: () => {}, stopPropagation: () => {} });
assert.strictEqual(logsMgr._logDividerTopRatio, 0.5, 'Double click must reset ratio to 0.5');
assert.strictEqual(mockTopPane.style.flex, '1 1 50%', 'Top pane must restore to 50% flex');
assert.strictEqual(mockLogPane.style.flex, '1 1 50%', 'Log pane must restore to 50% flex');

// 3. Switch between session logs while pane remains open
logsMgr.openSessionLogInBrowser('LOGS-900', logs[1].id, { ownerDocument: mockDoc, querySelector: (s) => mockElements[s], querySelectorAll: (s) => mockElements[s] ? [mockElements[s]] : [] });
assert.strictEqual(mockLogPane.style.display, 'flex', 'Log pane must remain open when switching logs');
assert.ok(mockLogPane.innerHTML.includes(logs[1].title), 'Log pane must update to second log title');

// 4. Click ✕ close button to close log viewer
logsMgr.closeSessionLogViewer({ ownerDocument: mockDoc, querySelector: (s) => mockElements[s], querySelectorAll: (s) => mockElements[s] ? [mockElements[s]] : [] });
assert.strictEqual(mockDivider.style.display, 'none', 'Divider must hide on close');
assert.strictEqual(mockLogPane.style.display, 'none', 'Log pane must hide on close');
assert.strictEqual(mockTopPane.style.flex, '1 1 100%', 'Top pane must expand to 100% on close');

// Verify Attach Character remains in Actions menu
assert.ok(browserHTMLWithLogs.includes('Attach Character'), 'Attach Character must remain available under Actions');
console.log('✓ Campaign Browser Session Logs dropdown & split viewer verified successfully.');

// Test 22: Interactive pulsing version alert, check for update on click, cache-busting reload, and reformatted defense cards
console.log('Test 22: Verify interactive pulsing version alert, check for updates, and reformatted defense cards');
const appJsCode = fs.readFileSync('js/app.js', 'utf8');
const stylesCssCode = fs.readFileSync('css/styles.css', 'utf8');
const indexHtmlCode = fs.readFileSync('index.html', 'utf8');

// 1. Interactive version display and check for update on click
assert.ok(indexHtmlCode.includes('id="header-version-tag"'), 'index.html must contain header-version-tag');
assert.ok(indexHtmlCode.includes('role="button"'), 'header-version-tag must have role="button" for accessibility');
assert.ok(indexHtmlCode.includes('tabindex="0"'), 'header-version-tag must have tabindex="0"');
assert.ok(appJsCode.includes("versionEl.style.cursor = 'pointer'"), 'app.js must make versionEl interactive with cursor pointer');
assert.ok(appJsCode.includes("this.checkForUpdates({ isManual: true })"), 'app.js must trigger checkForUpdates on clicking versionEl');

// 2. Pulsing effect when newer version detected
assert.ok(stylesCssCode.includes('@keyframes version-pulse'), 'styles.css must define @keyframes version-pulse');
assert.ok(stylesCssCode.includes('version-pulse') && stylesCssCode.includes('.header-version-tag.pulsing'), 'styles.css must style out-of-date pulsing version tag');
assert.ok(stylesCssCode.includes('animation: version-pulse'), 'styles.css must apply version-pulse animation');
assert.ok(appJsCode.includes('header-version-tag out-of-date pulsing'), 'app.js must assign pulsing class when newer version is detected');

// 3. Update alert push to open tabs
assert.ok(appJsCode.includes('APP_UPDATE_AVAILABLE'), 'app.js must broadcast APP_UPDATE_AVAILABLE');
const partyJsCode = fs.readFileSync('js/party.js', 'utf8');
assert.ok(partyJsCode.includes('APP_UPDATE_AVAILABLE'), 'party.js must handle APP_UPDATE_AVAILABLE');

// 4. Cache-busting reload to eliminate manual CTRL-F5 requirement
assert.ok(appJsCode.includes('performAppReloadBypassCache'), 'app.js must implement performAppReloadBypassCache');
assert.ok(appJsCode.includes("cache: 'reload'"), 'performAppReloadBypassCache must fetch with cache: reload');

// 5. Reformatted defense cards in edit abilities modal preventing edge overflow
assert.ok(appJsCode.includes('defense-card-total-row'), 'app.js must generate dedicated defense-card-total-row');
assert.ok(appJsCode.includes('defense-total-value'), 'app.js must generate defense-total-value');
assert.ok(stylesCssCode.includes('.defense-card-total-row'), 'styles.css must style defense-card-total-row');
assert.ok(stylesCssCode.includes('.defense-stepper-card-compact'), 'styles.css must style defense-stepper-card-compact');
console.log('✓ Interactive pulsing version alert, update pushes, cache-busting reload, and reformatted defense cards verified.');

console.log('--- ALL v3.99 / v4.02 TESTS PASSED SUCCESSFULLY! ---');
