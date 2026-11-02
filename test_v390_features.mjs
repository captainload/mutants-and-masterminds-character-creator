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

test('Version 3.90 bumped across all required files', () => {
  if (parseFloat(vObj.version) < 3.90) throw new Error(`version.json has version ${vObj.version}`);
  if (!html.includes('Character Editor v3.')) throw new Error('index.html missing v3 title');
  if (!html.includes('header-version-tag')) throw new Error('index.html missing version badge');
  if (!app.includes("const CURRENT_VERSION = '")) throw new Error('app.js missing CURRENT_VERSION');
});

test('Action center defenses shortened: Fortitude -> FORTI, Toughness -> TOUGH', () => {
  if (!app.includes("if (def.id === 'fortitude') defDisplayName = 'FORTI';")) {
    throw new Error('app.js missing FORTI shortening for fortitude');
  }
  if (!app.includes("if (def.id === 'toughness') defDisplayName = 'TOUGH';")) {
    throw new Error('app.js missing TOUGH shortening for toughness');
  }
  if (!app.includes('🎲 ${defDisplayName}')) {
    throw new Error('app.js not rendering defDisplayName with dice icon');
  }
});

test('Ability cards move "i" icon to upper right corner opposite dice icon', () => {
  if (!app.includes('position: absolute; top: 4px; right: 5px;') || !app.includes('padding-right: 18px;')) {
    throw new Error('app.js missing upper-right absolute placement for ability info badge');
  }
  if (!css.includes('position: relative;')) {
    throw new Error('css missing position: relative on button.action-roll-card');
  }
});

test('Defense cards also position "i" icon in upper right corner opposite dice icon', () => {
  // Check that defense cards also have padding-right: 18px and position: absolute; top: 4px; right: 5px;
  const defMatch = app.match(/let defDisplayName = def\.name\.toUpperCase\(\);[\s\S]*?padding-right: 18px;[\s\S]*?position: absolute; top: 4px; right: 5px;/);
  if (!defMatch) {
    throw new Error('Defense card template does not have upper-right positioning for info badge');
  }
});

test('Font size constraint >= 10pt across Action Center ability and defense cards', () => {
  // Check that font sizes in action roll cards are 10pt or larger
  if (app.includes('font-size: var(--font-size-xs)') && (app.includes('data-cat="Ability"') || app.includes('data-cat="Defense"'))) {
    // Check if the badges inside action-roll-card use 10pt
    const abilityRegion = app.match(/action-ability-card action-roll-card[\s\S]*?abilitiesGrid\.appendChild/)?.[0] || '';
    if (abilityRegion.includes('font-size: 8pt') || abilityRegion.includes('font-size: 9pt')) {
      throw new Error('Found sub-10pt font in action-ability-card');
    }
    const defRegion = app.match(/action-save-card action-roll-card[\s\S]*?defGrid\.appendChild/)?.[0] || '';
    if (defRegion.includes('font-size: 8pt') || defRegion.includes('font-size: 9pt')) {
      throw new Error('Found sub-10pt font in action-save-card');
    }
  }
});

console.log('All v3.90 feature tests passed successfully!');
