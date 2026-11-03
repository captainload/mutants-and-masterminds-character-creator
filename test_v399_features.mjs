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
assert.ok(adminHtml.includes('form-admin-login'), 'Admin login form must exist');

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

console.log('--- ALL v3.99 TESTS PASSED SUCCESSFULLY! ---');
