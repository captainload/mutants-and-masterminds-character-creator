import fs from 'fs';
import assert from 'assert';
import { campaignManager, partyManager, CampaignTrackerManager } from './js/party.js';

console.log('--- Testing v3.61 Campaign Tracker & Prefill Requirements ---');

// 1. Version consistency
const vJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(vJson.version, '3.61');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.61'), 'index.html title has v3.61');
assert(indexHtml.includes('>v3.61</span>'), 'index.html header tag has v3.61');

// 2. Button named "Campaigns" instead of "Party"
assert(indexHtml.includes('id="btn-open-campaigns"'), 'Header button id is btn-open-campaigns');
assert(indexHtml.includes('🛡️ Campaigns'), 'Header button text is "🛡️ Campaigns"');

// 3. Campaign tracker naming
assert(indexHtml.includes('id="modal-campaign-tracker"'), 'Modal overlay id is modal-campaign-tracker');
assert(indexHtml.includes('🛡️ Campaign Tracker & Conditions'), 'Modal header title has Campaign Tracker');

// 4. Campaign prefilling logic in app.js
const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes('lastCamp = this.char.lastCampaign || this.char.campaign'), 'Campaign field prefills character lastCampaign');
assert(appJs.includes('Switch Campaigns?'), 'Join campaign asks user if they want to disconnect first');

// 5. Campaign Tracker Manager exports and aliases
assert.strictEqual(campaignManager, partyManager, 'campaignManager is aliased to partyManager');
assert.strictEqual(typeof CampaignTrackerManager, 'function', 'CampaignTrackerManager class is exported');

// Clean slate
campaignManager.leaveCampaign();
assert.strictEqual(campaignManager.isUserConnected(), false);

// Test campaign create and prefill data
const created = campaignManager.createCampaign({
  name: 'Gotham Knights',
  pin: '4455'
});
assert.strictEqual(created.campaignName, 'Gotham Knights');
assert.strictEqual(campaignManager.isUserConnected(), true);

// Clean slate
campaignManager.leaveCampaign();

console.log('ALL v3.61 CAMPAIGN TRACKER TESTS PASSED CLEANLY!');
