import fs from 'fs';
import assert from 'assert';

console.log('Testing v3.94 features...');

const appJs = fs.readFileSync('js/app.js', 'utf8').replace(/\r\n/g, '\n');
const partyJs = fs.readFileSync('js/party.js', 'utf8').replace(/\r\n/g, '\n');
const subJs = fs.readFileSync('js/supabase_client.js', 'utf8').replace(/\r\n/g, '\n');
const indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const stylesCss = fs.readFileSync('css/styles.css', 'utf8').replace(/\r\n/g, '\n');
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));

// 1. Version check
assert.strictEqual(versionJson.version, '3.94', 'version.json should be 3.94');
assert(indexHtml.includes('Character Editor v3.94'), 'index.html title must reflect v3.94');
assert(indexHtml.includes('header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.94<'), 'index.html header version tag must be v3.94');
assert(indexHtml.includes('js/app.js?v=3.94"'), 'index.html app.js import must have ?v=3.94');
assert(indexHtml.includes('css/styles.css?v=3.94"'), 'index.html css import must have ?v=3.94');
assert(appJs.includes("CURRENT_VERSION = '3.94';"), 'app.js CURRENT_VERSION must be 3.94');

// 2. Button order & positioning in Row 3
// Order must be: Archetypes, Tables, Campaigns (Campaigns is to the right side of Tables)
const row2Right = indexHtml.slice(indexHtml.indexOf('class="row-2-right"'), indexHtml.indexOf('<!-- Persistent Navigation Tab Bar'));
const archIdx = row2Right.indexOf('id="btn-open-archetypes"');
const tablesIdx = row2Right.indexOf('id="btn-open-tables"');
const campIdx = row2Right.indexOf('id="btn-open-campaigns"');

assert(archIdx >= 0, 'btn-open-archetypes must exist in row-2-right');
assert(tablesIdx >= 0, 'btn-open-tables must exist in row-2-right');
assert(campIdx >= 0, 'btn-open-campaigns must exist in row-2-right');
assert(tablesIdx > archIdx, 'Tables button must come after Archetypes button');
assert(campIdx > tablesIdx, 'Campaigns button must come after Tables button (to the right side of Tables)');

// Check shifted to the right end of the row
assert(row2Right.includes('margin-left: auto;'), 'row-2-right must have margin-left: auto; in index.html style');
assert(stylesCss.includes('justify-content: space-between;'), 'styles.css .header-row-2 must have justify-content: space-between');
assert(stylesCss.includes('.row-2-right {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin-left: auto;'), 'styles.css .row-2-right must have margin-left: auto');

// 3. Campaign Creation DB Schema Compatibility
assert(subJs.includes('ensureSession()'), 'supabase_client.js must have ensureSession method');
assert(subJs.includes('basePayload') && subJs.includes('fullPayload'), 'supabase_client.js createCampaign must have schema fallback');
assert(subJs.includes("error.message?.includes('is_public') || error.message?.includes('description') || error.code === '42703'"), 'supabase_client.js createCampaign must handle missing is_public/description columns');
assert(!subJs.includes(".eq('is_public', true)"), 'supabase_client.js getPublicCampaigns must not query .eq("is_public", true) directly in SQL');
assert(appJs.includes('Failed to create campaign in cloud database'), 'app.js openCreateCampaignDialog must gracefully offer local creation if cloud rejects');

// 4. Player Name Synchronization Logic
assert(appJs.includes('isCharacterAttachedToCampaign(char = this.char)'), 'app.js must have isCharacterAttachedToCampaign method');
assert(appJs.includes('syncPlayerNameWithCampaignAttachment()'), 'app.js must have syncPlayerNameWithCampaignAttachment method');
assert(appJs.includes('this.syncPlayerNameWithCampaignAttachment();'), 'loadCharacterToUI must invoke syncPlayerNameWithCampaignAttachment');

// 5. Functional test of Player Name Sync and isCharacterAttachedToCampaign
const { AppControllerMock } = await import('./test_helpers_v394.mjs');
const controller = new AppControllerMock();

// Non-campaign character: player name can be whatever user decides
controller.char = { name: 'Batman', playerName: 'BruceWayne', campaign: '', campaignId: '' };
assert.strictEqual(controller.isCharacterAttachedToCampaign(controller.char), false, 'Character without campaign is not attached to campaign');
controller.syncPlayerNameWithCampaignAttachment();
assert.strictEqual(controller.char.playerName, 'BruceWayne', 'Non-campaign character player name must NOT be overwritten');

// Campaign character: player name syncs with online username
controller.char = { name: 'Superman', playerName: 'ClarkKent', campaign: 'Justice League', campaignId: 'JUST-1234' };
assert.strictEqual(controller.isCharacterAttachedToCampaign(controller.char), true, 'Character with campaign is attached to campaign');
controller.mockOnlineUsername = 'KalEl';
controller.syncPlayerNameWithCampaignAttachment();
assert.strictEqual(controller.char.playerName, 'KalEl', 'Campaign character player name must match online username');

console.log('All v3.94 tests passed successfully!');
process.exit(0);
