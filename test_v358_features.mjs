import fs from 'fs';
import assert from 'assert';
import { DiceRoller } from './js/dice.js';
import { DiscordIntegrator } from './js/discord.js';

console.log('--- Testing v3.58 Features & Requirements ---');

// 1. Verify version.json, index.html, app.js
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(versionJson.version, '3.58', 'version.json should be 3.58');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.58'), 'index.html title has v3.58');
assert(indexHtml.includes('css/styles.css?v=3.58'), 'index.html stylesheet has v3.58');
assert(indexHtml.includes('>v3.58</span>'), 'index.html header version tag has v3.58');

// 2. Verify Movement Speed Light Mode CSS
const stylesCss = fs.readFileSync('css/styles.css', 'utf8');
assert(stylesCss.includes('.movement-badge .movement-rate {\n  color: var(--text-bright);'), 'movement-rate uses var(--text-bright) in dark/default');
assert(stylesCss.includes('html[data-theme="light"] .movement-badge .movement-rate {\n  color: #0f172a !important;'), 'movement-rate uses #0f172a !important in light theme');
assert(stylesCss.includes('html[data-theme="light"] .movement-badge strong {\n  color: #0369a1 !important;'), 'movement-badge strong uses high-contrast blue in light theme');
console.log('✓ Movement speed light mode readability verified');

// 3. Verify Hero Point Reroll on Any Die Roll
const roller = new DiceRoller();

// Initiative roll should update mostRecentCheck and mostRecentRoll
const initRoll = roller.rollNotation('initiative', 'Speedster');
assert(roller.mostRecentCheck, 'mostRecentCheck should be populated for initiative');
assert.strictEqual(roller.mostRecentCheck.rollType, 'initiative');
assert.strictEqual(roller.mostRecentRoll.rollType, 'initiative');

// Custom notation should update mostRecentCheck and mostRecentRoll
const notationRoll = roller.rollNotation('d20+5', 'Hero');
assert.strictEqual(roller.mostRecentCheck.title, 'd20+5');
assert.strictEqual(roller.mostRecentRoll.title, 'd20+5');

// Hero point reroll mechanics on die roll
const rerollResult = roller.rollCheck({
  title: 'Initiative (HP Reroll)',
  characterName: 'Speedster',
  modifier: 8,
  isHeroPointReroll: true
});
assert(rerollResult.effectiveDie >= 11, 'Hero Point rerolls guaranteed effectiveDie >= 11');
assert(rerollResult.total >= 19, 'Total reflects rerolled die + mod');
console.log('✓ Hero Points can reroll any die roll (initiative, notation, checks) verified');

// 4. Verify Popout Themes in archetype_window.js and tables.js
const archJs = fs.readFileSync('js/archetype_window.js', 'utf8');
assert(archJs.includes('data-theme="${currentTheme}"'), 'archetype_window includes data-theme attribute');
assert(archJs.includes('var(--bg-app, #0f172a)'), 'archetype_window body background uses var(--bg-app)');
assert(archJs.includes('var(--text-main, #f8fafc)'), 'archetype_window body color uses var(--text-main)');
assert(archJs.includes("window.addEventListener('storage'"), 'archetype_window has storage theme listener');

const tablesJs = fs.readFileSync('js/tables.js', 'utf8');
assert(tablesJs.includes('data-theme="${currentTheme}"'), 'tables popout includes data-theme attribute');
assert(tablesJs.includes('<link rel="stylesheet" href="css/styles.css?v=3.58">'), 'tables popout includes stylesheet');
assert(tablesJs.includes('var(--bg-app, #0f172a)'), 'tables popout body uses var(--bg-app)');
assert(tablesJs.includes('var(--text-main, #f8fafc)'), 'tables popout text uses var(--text-main)');
assert(tablesJs.includes("window.addEventListener('storage'"), 'tables popout has storage theme listener');
console.log('✓ Popout windows theme synchronization verified');

// 5. Verify Discord 1080px density & minimal rows
const integrator = new DiscordIntegrator();

// Test complex attack roll
const complexRoll = {
  id: 'r_1',
  timestamp: '12:00:00 PM',
  characterName: 'Powerhouse',
  title: 'Smash Attack',
  rawDie: 14,
  effectiveDie: 14,
  modifier: 10,
  total: 24,
  targetDC: 20,
  outcome: 'Success',
  outcomeClass: 'success',
  outcomeDescription: '1° Success',
  isCriticalHit: true,
  damageRank: '12',
  descriptor: 'Bludgeoning, Physical',
  extraText: 'Target pushed 30 ft'
};

const embed = integrator.buildEmbedFromRoll(complexRoll);

// All fields MUST have inline: true so they pack into 3-column rows on >= 1080px display
embed.fields.forEach(f => {
  assert.strictEqual(f.inline, true, `Field ${f.name} must be inline: true to minimize vertical rows`);
});

// Row 1: Result, Target DC, Outcome (3 fields)
// Row 2: Damage Rank, Descriptors, Details (3 fields max)
assert(embed.fields.length <= 6, 'Total fields should not exceed 6 (at most 2 rows in 3-col layout)');
assert(embed.fields.some(f => f.name === 'Details' && f.value.includes('CRITICAL HIT') && f.value.includes('Target pushed')), 'Critical alert and details packed into single inline field');

// Test initiative roll (minimal row)
const initEmbed = integrator.buildEmbedFromRoll({
  title: 'Initiative',
  rawDie: 18,
  modifier: 4,
  total: 22,
  rollType: 'initiative'
});
assert.strictEqual(initEmbed.fields.length, 1, 'Initiative embed uses exactly 1 compact field');
assert.strictEqual(initEmbed.fields[0].inline, true, 'Initiative field is inline');

console.log('✓ Discord >= 1080px horizontal packing & minimized rows verified');

console.log('ALL v3.58 TESTS PASSED SUCCESSFULLY!');
