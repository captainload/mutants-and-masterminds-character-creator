import { readFileSync } from 'fs';
import { resolve } from 'path';

const basePath = resolve('C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator');

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    process.exit(1);
  }
}

const vObj = JSON.parse(readFileSync(resolve(basePath, 'version.json'), 'utf8'));
const html = readFileSync(resolve(basePath, 'index.html'), 'utf8');
const css = readFileSync(resolve(basePath, 'css/styles.css'), 'utf8');
const party = readFileSync(resolve(basePath, 'js/party.js'), 'utf8');
const app = readFileSync(resolve(basePath, 'js/app.js'), 'utf8');
const tables = readFileSync(resolve(basePath, 'js/tables.js'), 'utf8');
const arch = readFileSync(resolve(basePath, 'js/archetype_window.js'), 'utf8');
const supa = readFileSync(resolve(basePath, 'js/supabase_client.js'), 'utf8');

test('Version 3.89 bumped across all required files', () => {
  if (parseFloat(vObj.version) < 3.89) throw new Error(`version.json has version ${vObj.version}`);
  if (!/Character Editor v3\.\d+/.test(html)) throw new Error('index.html missing title');
  if (!/v3\.\d+<\/span>/.test(html)) throw new Error('index.html missing badge');
  if (!/const CURRENT_VERSION = '3\.\d+';/.test(app)) throw new Error('app.js missing CURRENT_VERSION');
  if (!/css\/styles\.css\?v=3\.\d+/.test(tables)) throw new Error('tables.js missing version');
  if (!/css\/styles\.css\?v=3\.\d+/.test(arch)) throw new Error('archetype_window.js missing version');
  if (!/css\/styles\.css\?v=3\.\d+/.test(party)) throw new Error('party.js missing version');
});

test('Campaign Browser bottom footer buttons removed to reclaim space', () => {
  const trackerMatch = html.match(/id="modal-campaign-tracker"[\s\S]*?id="campaign-tracker-content"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (!trackerMatch) throw new Error('modal-campaign-tracker structure invalid');
  const trackerSection = trackerMatch[0];
  if (trackerSection.includes('id="btn-campaign-modal-close-footer"')) {
    throw new Error('modal-campaign-tracker still has bottom close button');
  }
  if (trackerSection.includes('class="modal-footer-bar"')) {
    throw new Error('modal-campaign-tracker still has modal-footer-bar');
  }
});

test('Leave Campaign confirmation popup informs user characters remain intact and can restore from backups', () => {
  if (!app.includes('Your campaign characters will remain intact in your character library, and you will still be able to restore characters from campaign backups at any time.')) {
    throw new Error('app.js confirmAndLeaveCampaign missing required intact & backup restoration text');
  }
});

test('Leave Campaign option available in Actions dropdown', () => {
  if (!party.includes('class="menu-dropdown-item btn-leave-campaign-membership"')) {
    throw new Error('party.js missing btn-leave-campaign-membership in Actions dropdown');
  }
  if (!party.includes('${(isJoinedOrCreated || attached.length > 0) ?')) {
    throw new Error('party.js Leave Campaign not checking joined or attached characters');
  }
});

test('GM Tools includes Campaign Characters command', () => {
  if (!party.includes('btn-open-campaign-characters')) {
    throw new Error('party.js missing btn-open-campaign-characters');
  }
  if (!party.includes('Campaign Characters')) {
    throw new Error('party.js missing Campaign Characters text in GM Tools');
  }
});

test('Campaign characters modal exists in index.html and app.js', () => {
  if (!html.includes('id="modal-campaign-characters"')) {
    throw new Error('index.html missing modal-campaign-characters');
  }
  if (!html.includes('id="campaign-characters-list-container"')) {
    throw new Error('index.html missing campaign-characters-list-container');
  }
  if (!app.includes('openCampaignCharactersModal')) {
    throw new Error('app.js missing openCampaignCharactersModal');
  }
  if (!app.includes('renderCampaignCharactersList')) {
    throw new Error('app.js missing renderCampaignCharactersList');
  }
  if (!app.includes('btn-gm-view-char') || !app.includes('btn-gm-award-hp') || !app.includes('btn-gm-award-pp')) {
    throw new Error('app.js missing view char, award hp, or award pp button bindings');
  }
});

test('Database sync and real-time push for HP/PP awards implemented', () => {
  if (!supa.includes('updateCampaignMemberAwards')) {
    throw new Error('supabase_client.js missing updateCampaignMemberAwards');
  }
  if (!party.includes("case 'GM_AWARD_CHARACTER':")) {
    throw new Error('party.js missing GM_AWARD_CHARACTER message handler');
  }
  if (!app.includes('handleGMAwardCharacterMessage')) {
    throw new Error('app.js missing handleGMAwardCharacterMessage');
  }
  if (!app.includes('syncCampaignCharacterUpdates')) {
    throw new Error('app.js missing syncCampaignCharacterUpdates');
  }
  if (!app.includes("window.addEventListener('online'")) {
    throw new Error('app.js missing online event listener for syncing');
  }
});

test('Font size constraint >= 10pt across campaign characters modal', () => {
  if (css.includes('font-size: 8pt') || css.includes('font-size: 9pt')) {
    throw new Error('Found sub-10pt font in css');
  }
});

console.log('All v3.89 feature tests passed successfully!');
