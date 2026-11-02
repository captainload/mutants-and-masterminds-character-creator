import fs from 'fs';
import assert from 'assert';

console.log('Testing v3.91 features...');

const appJs = fs.readFileSync('js/app.js', 'utf8').replace(/\r\n/g, '\n');
const partyJs = fs.readFileSync('js/party.js', 'utf8').replace(/\r\n/g, '\n');
const indexHtml = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));

// 1. Version check
assert.strictEqual(versionJson.version, '3.91', 'version.json should be 3.91');
assert(indexHtml.includes('Character Editor v3.91'), 'index.html title must reflect v3.91');
assert(indexHtml.includes('header-version-tag" class="header-version-tag up-to-date" title="Current Version">v3.91<'), 'index.html header version tag must be v3.91');
assert(indexHtml.includes('js/app.js?v=3.91"'), 'index.html app.js import must have ?v=3.91');

// 2. Ability cards check
// Dice icon moved to the left of ability rank:
// Top row: abShort on left, ℹ️ on right
// Bottom row: 🎲 +rank
assert(appJs.includes('<span style="font-size: 0.95rem; font-weight: 800; color: var(--hero-gold); letter-spacing: 0.04em; white-space: nowrap;">${abShort}</span>'), 'Ability card short name should not have dice icon on top row');
assert(appJs.includes('<strong style="font-size: 1.35rem; font-weight: 900; line-height: 1; color: ${effRank !== baseRank ? \'var(--hero-red)\' : \'var(--text-bright)\'};">🎲 ${effRank >= 0 ? \'+\' + effRank : effRank}</strong>'), 'Ability card bottom row should have dice icon to the left of the rank');
assert(appJs.includes('position: absolute; top: 4px; right: 5px; font-size: 10pt; opacity: 0.75; cursor: pointer; padding: 1px 3px; border-radius: 3px; z-index: 2;">ℹ️</span>'), 'Ability card should retain info badge in upper right corner');

// 3. Campaign Directory & Logged-out Create Campaign Button
assert(partyJs.includes('const isLoggedIn = typeof supabaseService !== \'undefined\' && supabaseService && supabaseService.isLoggedIn();'), 'party.js should check supabaseService.isLoggedIn() for directory bar');
assert(partyJs.includes('User must be logged in to create and manage campaigns.'), 'party.js must show notice when user is not logged in');
assert(partyJs.includes('button type="button" class="btn btn-primary btn-trigger-create-campaign" disabled'), 'party.js must disable Create Campaign button when logged out');
assert(appJs.includes('User must be logged in to create and manage campaigns.') && appJs.includes('Sign In / Register dialog now?'), 'app.js openCreateCampaignDialog must enforce sign in');

// 4. "Join Party" and "Leave Party" Terminology & GM Ownership Retention
assert(partyJs.includes('🔗 Join Party'), 'party.js must have "Join Party" button label');
assert(partyJs.includes('Leave Party'), 'party.js must have "Leave Party" dropdown item');
assert(partyJs.includes('Apply to join a party by name or paste a GM\'s Campaign Link'), 'party.js directory text must use party terminology');
assert(appJs.includes('Leave Party?'), 'app.js confirmAndLeaveCampaign modal title should be Leave Party?');
assert(appJs.includes('⚠️ Please Note: This will only prevent you from having characters in this campaign\'s party — a GM user will still own and manage the campaign.'), 'app.js confirmAndLeaveCampaign must explain GM continues to own campaign');

// 5. GM Status Decoupling (GM Ownership vs In Party)
assert(partyJs.includes('👑 GM • 🌟 In Party'), 'party.js should display "👑 GM • 🌟 In Party" badge when GM has characters in party');
assert(partyJs.includes('👑 GM (Owner)'), 'party.js should display "👑 GM (Owner)" badge when GM has no characters in party');
assert(partyJs.includes('btn-gm-join-party'), 'party.js should provide Join Party button for GM not currently in party');
assert(partyJs.includes('if (c.isCreator || this.isUserCreatorOfCampaign(c)) return true;'), 'leaveCampaignPermanent must preserve campaign for GM');

console.log('All v3.91 static checks passed successfully!');
