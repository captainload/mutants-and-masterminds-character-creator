import fs from 'fs';
import assert from 'assert';
import { supabaseService, SUPABASE_URL, SUPABASE_ANON_KEY } from './js/supabase_client.js';
import { formatCharacterSheetHTML } from './js/party.js';

console.log('--- Testing v3.65 Supabase Cloud & GM Controls Suite ---');

// 1. Version 3.65 verification
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
assert.strictEqual(versionJson.version, '3.65', 'version.json is 3.65');

const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('Character Editor v3.65'), 'index.html title has v3.65');
assert(indexHtml.includes('>v3.65</span>'), 'index.html badge has v3.65');
assert(indexHtml.includes('css/styles.css?v=3.65'), 'index.html styles link has v3.65');
assert(indexHtml.includes('js/app.js?v=3.65'), 'index.html app link has v3.65');

// 2. Supabase SDK CDN and client credentials
assert(indexHtml.includes('@supabase/supabase-js@2'), 'index.html loads Supabase JS SDK via CDN');
assert.strictEqual(SUPABASE_URL, 'https://jthabormtacutpiualiq.supabase.co');
assert(SUPABASE_ANON_KEY.startsWith('eyJ'), 'Supabase anon key is present and formatted');

// 3. User Authentication UI & Modals in index.html
assert(indexHtml.includes('id="btn-header-auth"'), 'Sign In / Register button exists in header');
assert(indexHtml.includes('id="header-user-badge"'), 'Header user badge exists in header');
assert(indexHtml.includes('id="modal-auth"'), 'Authentication modal exists');
assert(indexHtml.includes('id="tab-btn-signin"'), 'Sign In tab exists');
assert(indexHtml.includes('id="tab-btn-signup"'), 'Sign Up tab exists');
assert(indexHtml.includes('id="tab-btn-forgot"'), 'Forgot Password tab exists');
assert(indexHtml.includes('id="auth-signup-username"'), 'Unique username input exists');
console.log('✓ Supabase Auth UI & Modals verified');

// 4. GM Join Requests Approval Queue Modal in index.html
assert(indexHtml.includes('id="modal-join-requests"'), 'GM Join Requests modal exists');
assert(indexHtml.includes('id="join-requests-list-container"'), 'Join requests list container exists');

// 5. GM Character Sheet Inspector Modal in index.html
assert(indexHtml.includes('id="modal-character-inspector"'), 'Character Sheet Inspector modal exists');
assert(indexHtml.includes('id="inspector-hero-content"'), 'Inspector hero content container exists');
console.log('✓ GM Join Requests Queue and Character Inspector UI verified');

// 6. Character Sheet Inspection Formatter
const sampleHero = {
  name: 'Apex Guardian',
  playerName: 'Steve',
  concept: 'Cosmic Defender',
  powerLevel: 10,
  powerPointsBudget: 150,
  abilities: { str: 10, sta: 10, agi: 2, dex: 2, fgt: 8, int: 2, awe: 2, pre: 2 },
  defenses: { dodge: 10, parry: 10, fortitude: 10, toughness: 10, will: 10 },
  powers: [
    { name: 'Cosmic Blast', rank: 10, descriptors: 'Energy', cost: 20, summary: 'Ranged Damage 10' }
  ],
  skills: [
    { name: 'Athletics', ranks: 4, totalBonus: 14 }
  ],
  advantages: ['Power Attack', 'Improved Initiative'],
  gear: ['Commlink']
};

const sheetHtml = formatCharacterSheetHTML(sampleHero);
assert(sheetHtml.includes('Apex Guardian'), 'Hero name included in sheet inspector');
assert(sheetHtml.includes('PL 10'), 'PL badge included');
assert(sheetHtml.includes('Cosmic Blast'), 'Power listed');
assert(sheetHtml.includes('Athletics'), 'Skill listed');
assert(sheetHtml.includes('Power Attack'), 'Advantage listed');
assert(sheetHtml.includes('Commlink'), 'Gear listed');
console.log('✓ Full Character Sheet Formatter verified');

console.log('ALL v3.65 SUPABASE & GM CONTROL TESTS PASSED CLEANLY!');
process.exit(0);
