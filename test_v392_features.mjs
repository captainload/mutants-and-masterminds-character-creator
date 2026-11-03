import fs from 'fs';
import assert from 'assert';

console.log('Testing v3.92 features...');

const appJs = fs.readFileSync('js/app.js', 'utf8').replace(/\r\n/g, '\n');
const partyJs = fs.readFileSync('js/party.js', 'utf8').replace(/\r\n/g, '\n');
const subJs = fs.readFileSync('js/supabase_client.js', 'utf8').replace(/\r\n/g, '\n');
const indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const stylesCss = fs.readFileSync('css/styles.css', 'utf8').replace(/\r\n/g, '\n');
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));

// 1. Version check
assert(parseFloat(versionJson.version) >= 3.92, 'version.json should be >= 3.92');
assert(indexHtml.includes('Character Editor v3.'), 'index.html title must reflect v3.x');
assert(indexHtml.includes('header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.'), 'index.html header version tag must be v3.x');
assert(indexHtml.includes('js/app.js?v=3.'), 'index.html app.js import must have ?v=3.x');

// 2. Row 3 buttons shifted to right end (v3.94) / leftwards (v3.92)
assert(indexHtml.includes('Row 3') || indexHtml.includes('ROW 3'), 'index.html should have row 3 buttons comment');
assert(indexHtml.includes('id="btn-open-campaigns"'), 'index.html must have btn-open-campaigns');
assert(indexHtml.includes('id="btn-open-archetypes"'), 'index.html must have btn-open-archetypes');
assert(indexHtml.includes('id="btn-open-tables"'), 'index.html must have btn-open-tables');
// Ensure Campaigns, Archetypes, Tables are grouped inside row-2-right with left margin
const row2RightChunk = indexHtml.slice(indexHtml.indexOf('class="row-2-right"'), indexHtml.indexOf('<!-- Persistent Navigation Tab Bar'));
assert(row2RightChunk.includes('btn-open-campaigns'), 'btn-open-campaigns must be inside row-2-right button group');
assert(row2RightChunk.includes('btn-open-archetypes'), 'btn-open-archetypes must be inside row-2-right button group');
assert(row2RightChunk.includes('btn-open-tables'), 'btn-open-tables must be inside row-2-right button group');

// Check styles.css .header-row-2 layout
assert(stylesCss.includes('justify-content: space-between;\n  gap: 1.25rem;') || stylesCss.includes('justify-content: flex-start;\n  gap: 1.25rem;'), 'styles.css .header-row-2 must have justify-content and gap: 1.25rem');

// Check app.js alignCampaignButton does not push buttons rightwards
assert(appJs.includes("campBtn.style.marginLeft = '0';"), 'alignCampaignButton should set marginLeft to 0');

// 3. Create Campaign button enablement & isUserLoggedIn
assert(partyJs.includes('isUserLoggedIn()'), 'party.js must have isUserLoggedIn method');
assert(partyJs.includes('this.isUserLoggedIn'), 'generateCampaignBrowserHTML must check this.isUserLoggedIn');
assert(appJs.includes('partyManager?.isUserLoggedIn'), 'openCreateCampaignDialog must check partyManager?.isUserLoggedIn');

// 4. Supabase Client sync and session restoration
assert(subJs.includes('sessionStorage.getItem(\'mm3e_active_auth_user\')'), 'supabase_client.js constructor must synchronously check sessionStorage');
assert(subJs.includes('syncCloudCampaignsToLocal(partyMgr)'), 'supabase_client.js must have syncCloudCampaignsToLocal method');
assert(subJs.includes('getMyParticipatedCampaigns()'), 'supabase_client.js must have getMyParticipatedCampaigns method');

// 5. Functional test of isUserCreatorOfCampaign and getBrowsableCampaigns with logged-in user
Promise.all([
  import('./js/party.js'),
  import('./js/supabase_client.js?v=3.94')
]).then(async ([{ CampaignTrackerManager }, { supabaseService }]) => {
  const mgr = new CampaignTrackerManager();

  // Test 5A: When logged in via supabaseService
  supabaseService.currentUser = { id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d', email: 'psycros@gmail.com' };
  supabaseService.currentProfile = { id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d', username: 'psycros', email: 'psycros@gmail.com' };

  assert.strictEqual(mgr.isUserLoggedIn(), true, 'isUserLoggedIn should return true when supabaseService.isLoggedIn() is true');

  // Register an owned campaign
  mgr.registerCampaignInfo({
    campaignId: 'TITA-4039',
    campaignName: 'Titan Watch',
    creator_id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d',
    creatorName: 'psycros',
    powerLevel: 7,
    isPublic: false
  });
  mgr.saveToCampaignHistory({
    campaignId: 'TITA-4039',
    campaignName: 'Titan Watch',
    creator_id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d',
    creatorName: 'psycros',
    powerLevel: 7,
    isCreator: true,
    isPublic: false
  });

  const isCreator = mgr.isUserCreatorOfCampaign({ campaignId: 'TITA-4039', creator_id: 'b99216b1-3d17-4dd2-9de4-ad1ffff3517d', creatorName: 'psycros' });
  assert.strictEqual(isCreator, true, 'isUserCreatorOfCampaign must be true for campaign owner');

  const browsable = mgr.getBrowsableCampaigns();
  const titanWatch = browsable.find(c => c.campaignId === 'TITA-4039');
  assert(titanWatch, 'Titan Watch must be in browsable campaigns for owner');
  assert.strictEqual(titanWatch.isCreator, true, 'Titan Watch must have isCreator: true for owner');

  // Verify browser HTML has enabled create campaign button
  const html = mgr.generateCampaignBrowserHTML();
  assert(html.includes('btn-primary btn-trigger-create-campaign'), 'Browser HTML must contain create campaign button');
  assert(!html.includes('button type="button" class="btn btn-primary btn-trigger-create-campaign" disabled'), 'Create campaign button must NOT be disabled when logged in');
  assert(html.includes('Titan Watch'), 'Browser HTML must list Titan Watch');

  console.log('All v3.92 functional and static tests passed successfully!');
}).catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
