import assert from 'assert';
import { CampaignTrackerManager } from './js/party.js';

console.log('--- TEST SUITE: Campaign Browser GM Tag Elimination & 👑 GM: Prefix ---');

const mgr = new CampaignTrackerManager();
mgr.getCurrentUsername = () => 'test_gm_user';

const myOwnedCamp = {
  campaignId: 'HERO-1001',
  campaignName: 'Justice League',
  creatorName: 'test_gm_user',
  isCreator: true,
  isPublic: true,
  powerLevel: 10
};

const otherCamp = {
  campaignId: 'DOOM-2002',
  campaignName: 'Legion of Doom',
  creatorName: 'lex_luthor',
  isCreator: false,
  isPublic: true,
  powerLevel: 12
};

mgr.registerCampaignInfo(myOwnedCamp);
mgr.registerCampaignInfo(otherCamp);
mgr.saveToCampaignHistory(myOwnedCamp);
mgr.saveToCampaignHistory(otherCamp);

const html = mgr.generateCampaignBrowserHTML();

// 1. Verify that "GM (Owner)" tags are completely eliminated
assert.strictEqual(
  html.includes('GM (Owner)'),
  false,
  'Campaign Browser HTML must not contain "GM (Owner)" tag'
);
assert.strictEqual(
  html.includes('👑 GM (Owner)'),
  false,
  'Campaign Browser HTML must not contain "👑 GM (Owner)"'
);
console.log('✓ 1. "GM (Owner)" tags are completely eliminated from the Campaign Browser.');

// 2. Verify that the GM\'s name is prefixed with 👑 GM:
assert.ok(
  html.includes('👑 GM: <strong>test_gm_user</strong>'),
  'GM card must display 👑 GM: in front of GM test_gm_user'
);
assert.ok(
  html.includes('👑 GM: <strong>lex_luthor</strong>'),
  'Other GM card must display 👑 GM: in front of GM lex_luthor'
);
console.log('✓ 2. "👑 GM:" correctly appears directly in front of the GM name on campaign cards.');

console.log('--- ALL BROWSER CAMPAIGN TESTS PASSED SUCCESSFULLY! ---');
