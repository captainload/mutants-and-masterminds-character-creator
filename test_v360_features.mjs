import fs from 'fs';
import assert from 'assert';
import { StorageManager } from './js/storage.js';
import { PartyManager } from './js/party.js';

console.log('--- Testing v3.60 Requirements & Features ---');

// 1. Version consistency
const vJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(vJson.version, '3.60', 'version.json is 3.60');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.60'), 'index.html has title v3.60');
assert(indexHtml.includes('>v3.60</span>'), 'index.html header tag has v3.60');
assert(indexHtml.includes('css/styles.css?v=3.60'), 'index.html stylesheet has v3.60');

// 2. Top row fields placeholders rather than auto-populating
const storage = new StorageManager();
const blankHero = storage.buildBlankHero();
assert.strictEqual(blankHero.name, '', 'Blank hero name defaults to empty string, relying on placeholder');

assert(indexHtml.includes('id="header-char-name" class="header-field-input" placeholder="Character Name (Required)"'), 'Hero name input uses required placeholder');
assert(indexHtml.includes('id="header-player-name" class="header-field-input" placeholder="Player Name"'), 'Player name input uses placeholder');
assert(indexHtml.includes('id="header-campaign-name" class="header-field-input" placeholder="Campaign / Setting"'), 'Campaign input uses placeholder');

const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes("campaignInput.value = this.char.campaign || '';"), 'Campaign does not default to Earth-Prime');
assert(appJs.includes("if (campEl) campEl.value = this.char.campaign || '';"), 'Campaign render does not default to Earth-Prime');
console.log('✓ Top row field placeholders verified (no auto-population of defaults)');

// 3. Name requirement before saving
assert(appJs.includes("targetChar.name.trim().toLowerCase() === 'new hero'"), 'Blocks saving if name is unassigned or default "new hero"');
assert(appJs.includes("A character must have an assigned name before it can be saved"), 'Prompts user for character name when saving unnamed hero');
console.log('✓ Character name enforcement on save verified');

// 4. Light mode text contrast (no grey on white)
const css = fs.readFileSync('css/styles.css', 'utf8');
assert(css.includes('--text-muted: #3d3429;'), 'Light mode --text-muted is high-contrast dark walnut (#3d3429), not washed out grey');
assert(css.includes('html[data-theme="light"] .header-field-label {\n  color: #1e293b !important;'), 'Header field labels use high-contrast dark text in light mode');
assert(css.includes('html[data-theme="light"] input::placeholder,'), 'Light mode inputs define crisp readable placeholder contrast');
console.log('✓ Light mode contrast verified (no grey-on-white text)');

// 5. Party button and modal in index.html
assert(indexHtml.includes('id="btn-open-party"'), 'Party button exists in header');
assert(indexHtml.includes('id="modal-party"'), 'Party modal overlay exists');
assert(indexHtml.includes('id="party-tracker-content"'), 'Party tracker content container exists');
console.log('✓ Party button and modal layout verified');

// 6. PartyManager conditions, toughness reduction & alt tracking
const party = new PartyManager();

// Test primary hero with bruises and conditions
const primaryHero = {
  id: 'hero_1',
  name: 'Titan',
  playerName: 'Alice',
  campaign: 'Justice League',
  heroPoints: 2,
  bruises: 3,
  conditions: { dazed: true, prone: true }
};

party.updateCurrentPlayer(primaryHero, null, null);
let members = party.getPartyMembers();
assert.strictEqual(members.length, 1);
assert.strictEqual(members[0].characterName, 'Titan');
assert.strictEqual(members[0].bruises, 3);
assert.strictEqual(members[0].toughnessPenalty, -3);
assert(members[0].conditions.includes('Dazed'), 'Conditions include Dazed');
assert(members[0].conditions.includes('Prone'), 'Conditions include Prone');
assert.strictEqual(members[0].isAlt, false, 'Is primary hero, not alt');

// Test alt character switch
const altHero = {
  id: 'alt_1',
  name: 'Shadow Titan',
  altType: 'alternate_form',
  heroPoints: 2,
  bruises: 1,
  conditions: { hindered: true }
};

party.updateCurrentPlayer(altHero, primaryHero, 'alt_1');
members = party.getPartyMembers();
assert.strictEqual(members.length, 1); // Updates the same local player's entry
assert.strictEqual(members[0].characterName, 'Titan');
assert.strictEqual(members[0].activeDisplayName, 'Shadow Titan');
assert.strictEqual(members[0].isAlt, true, 'Alt character is recognized');
assert(members[0].activeAltLabel.includes('Alt Form: Shadow Titan'), 'Alt label is noted in party list');
assert.strictEqual(members[0].bruises, 1);

// Test HTML generation
const html = party.generatePartyHTML();
assert(html.includes('Titan'), 'HTML includes hero name');
assert(html.includes('Alt Form: Shadow Titan'), 'HTML notes alt form switch');
assert(html.includes('Toughness: -1 (1 Bruise)'), 'HTML displays toughness reduction');
assert(html.includes('Hindered'), 'HTML displays active condition');

// Test Discord party embed generation
const discordEmbed = party.buildPartyDiscordEmbed('Justice League');
assert(discordEmbed.title.includes('Party Conditions & Toughness Summary - Justice League'));
assert(discordEmbed.fields.length === 1);
assert(discordEmbed.fields[0].value.includes('Toughness -1'));
assert(discordEmbed.fields[0].value.includes('Hindered'));

console.log('✓ PartyManager conditions, toughness reduction, and alt switching verified');

console.log('ALL v3.60 TESTS PASSED SUCCESSFULLY!');
