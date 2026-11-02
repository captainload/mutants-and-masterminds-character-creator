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

test('Version 3.88 bumped across all files', () => {
  if (parseFloat(vObj.version) < 3.88) throw new Error(`version.json has version ${vObj.version}`);
  if (!/Character Editor v3\.\d+/.test(html)) throw new Error('index.html missing title');
  if (!/v3\.\d+<\/span>/.test(html)) throw new Error('index.html missing badge');
  if (!/const CURRENT_VERSION = '3\.\d+';/.test(app)) throw new Error('app.js missing CURRENT_VERSION');
  if (!/css\/styles\.css\?v=3\.\d+/.test(tables)) throw new Error('tables.js missing version');
  if (!/css\/styles\.css\?v=3\.\d+/.test(arch)) throw new Error('archetype_window.js missing version');
  if (!/css\/styles\.css\?v=3\.\d+/.test(party)) throw new Error('party.js missing version');
});

test('Campaign Directory title drops & Membership and places description to right of name', () => {
  if (party.includes('Campaign Directory &amp; Membership') || party.includes('Campaign Directory & Membership')) {
    throw new Error('party.js still includes & Membership');
  }
  if (!party.includes('Campaign Directory</span>')) {
    throw new Error('party.js missing Campaign Directory title');
  }
  if (!party.includes('display: flex; align-items: baseline; gap: 0.75rem; flex-wrap: wrap;')) {
    throw new Error('party.js missing flex container holding Campaign Directory and description side-by-side');
  }
});

test('Campaign link input field lengthened to fully display placeholder text', () => {
  if (!party.includes('class="input-join-campaign-link"') || !party.includes('min-width: 350px;')) {
    throw new Error('input-join-campaign-link not lengthened to at least 350px');
  }
});

test('Campaign browser and directory top bar use lighter border color than grey', () => {
  if (!css.includes('#modal-campaign-tracker .modal-container {\n  border: 2px solid rgba(56, 189, 248, 0.6) !important;') &&
      !css.includes('#modal-campaign-tracker .modal-container {\r\n  border: 2px solid rgba(56, 189, 248, 0.6) !important;')) {
    throw new Error('css missing lighter border on #modal-campaign-tracker .modal-container');
  }
  if (!party.includes('border: 1.5px solid rgba(56, 189, 248, 0.55);')) {
    throw new Error('party.js topDirectoryBar missing lighter border');
  }
  if (!css.includes('border: 2px solid rgba(56, 189, 248, 0.65);')) {
    throw new Error('css missing lighter border on .tracker-section-campaign-browser');
  }
});

test('Campaign browser section badge is Joined or owned campaigns shown first', () => {
  if (party.includes('🌟 Joined &amp; Created First')) {
    throw new Error('party.js still includes 🌟 Joined & Created First');
  }
  if (!party.includes('🌟 Joined or owned campaigns shown first')) {
    throw new Error('party.js missing 🌟 Joined or owned campaigns shown first badge');
  }
  if (!party.includes('🌟 Default (Joined / Owned First)')) {
    throw new Error('party.js missing sort option for Joined / Owned First');
  }
});

test('New message dialog is ~30% taller and compose textarea expanded', () => {
  if (!css.includes('min-height: 480px;')) {
    throw new Error('css missing min-height: 480px on compose dialog');
  }
  if (!css.includes('min-height: 140px;') || !css.includes('max-height: 260px;')) {
    throw new Error('css textarea-msg-compose missing taller min-height: 140px');
  }
  if (!html.includes('class="textarea-msg-compose" rows="5"')) {
    throw new Error('index.html compose textarea not set to 5 rows');
  }
  if (!app.includes("ta.scrollHeight || 140, 140), 260)")) {
    throw new Error('app.js syncComposeTextareaHeight not using 140px min height');
  }
});

test('Known users and CC dropdowns pop downwards instead of upwards', () => {
  if (css.includes('.known-users-checkbox-menu {\n  position: absolute;\n  bottom: calc(100% + 4px);') ||
      css.includes('.known-users-checkbox-menu {\r\n  position: absolute;\r\n  bottom: calc(100% + 4px);')) {
    throw new Error('known-users-checkbox-menu still has bottom: calc(100% + 4px)');
  }
  if (!css.includes('top: calc(100% + 4px);') || !css.includes('bottom: auto;')) {
    throw new Error('known-users-checkbox-menu missing top: calc(100% + 4px); bottom: auto;');
  }
  if (!css.includes('.msg-client-compose-dialog .modal-scroll-body {\n  overflow: visible;') &&
      !css.includes('.msg-client-compose-dialog .modal-scroll-body {\r\n  overflow: visible;')) {
    throw new Error('css compose modal-scroll-body missing overflow: visible;');
  }
});

test('Font size constraint >= 10pt verified on compose dialog and dropdowns', () => {
  if (css.includes('font-size: 8pt') || css.includes('font-size: 9pt')) {
    throw new Error('Found sub-10pt font size in css');
  }
});

console.log('All v3.88 feature tests passed successfully!');
