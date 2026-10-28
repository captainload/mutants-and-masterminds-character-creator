import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {
  SKILLS_LIST,
  ADVANTAGES_DATABASE,
  MAJOR_LANGUAGES_LIST,
  getLanguagesLimit,
  auditCharacter
} from './js/rules.js';

console.log('--- Running Tests for v3.44 Languages Doubling-More Progression & Real-World Languages Catalog ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.44)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.44', 'version.json should be 3.44');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.44'), 'index.html should reference v3.44');
assert.ok(indexHtml.includes('Character Editor v3.44'), 'index.html title has v3.44');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.44'"), 'app.js defines CURRENT_VERSION as 3.44');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.44'), 'archetype_window.js links to v3.44 stylesheet');

console.log('✓ Version 3.44 verified across all files');

// 2. Progression Check: Rank 2 unlocks 2 more languages (1 -> 3), Rank 3 unlocks 4 more (3 -> 7), etc.
assert.strictEqual(getLanguagesLimit(0), 0, 'Rank 0 allows 0 languages');
assert.strictEqual(getLanguagesLimit(1), 1, 'Rank 1 allows 1 extra language');
assert.strictEqual(getLanguagesLimit(2), 3, 'Rank 2 allows 3 extra languages (1 from rank 1 + 2 more unlocked = 3)');
assert.strictEqual(getLanguagesLimit(3), 7, 'Rank 3 allows 7 extra languages (3 + 4 more unlocked = 7)');
assert.strictEqual(getLanguagesLimit(4), 15, 'Rank 4 allows 15 extra languages (7 + 8 more unlocked = 15)');
assert.strictEqual(getLanguagesLimit(5), 31, 'Rank 5 allows 31 extra languages (15 + 16 more unlocked = 31)');
assert.strictEqual(getLanguagesLimit(6), 63, 'Rank 6 allows 63 extra languages (31 + 32 more unlocked = 63)');

// Verify delta between consecutive ranks doubles each rank: delta(r) = 2^(r-1)
for (let r = 1; r <= 10; r++) {
  const currentTotal = getLanguagesLimit(r);
  const prevTotal = getLanguagesLimit(r - 1);
  const newlyUnlocked = currentTotal - prevTotal;
  const expectedNew = Math.pow(2, r - 1);
  assert.strictEqual(
    newlyUnlocked,
    expectedNew,
    `Rank ${r} must unlock exactly ${expectedNew} more languages than Rank ${r - 1} (got ${newlyUnlocked})`
  );
}

console.log('✓ Progression verified: Each rank doubles the number of languages unlocked by previous rank (+1, +2, +4, +8, +16...)');

// 3. Real-World Languages ONLY
const fictionalTerms = ['atlantean', 'kryptonian', 'interlac', 'thanagarian', 'themysciran', 'elvish', 'vulcan', 'klingon'];
fictionalTerms.forEach(term => {
  const found = MAJOR_LANGUAGES_LIST.filter(l => l.toLowerCase().includes(term));
  assert.strictEqual(found.length, 0, `No fictional languages allowed in catalog, but found: ${found.join(', ')}`);
});
console.log('✓ Verified: Zero fictional languages present in catalog (custom field handles fictional languages)');

// 4. Common Variations Included
assert.ok(MAJOR_LANGUAGES_LIST.includes('Chinese (Mandarin)'), 'Must include Chinese (Mandarin)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Chinese (Cantonese)'), 'Must include Chinese (Cantonese)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Arabic (Modern Standard)'), 'Must include Arabic (Modern Standard)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Arabic (Egyptian)'), 'Must include Arabic (Egyptian)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Arabic (Levantine)'), 'Must include Arabic (Levantine)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Spanish (Latin American)'), 'Must include Spanish (Latin American)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Spanish (Castilian / European)'), 'Must include Spanish (Castilian / European)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('English (American)'), 'Must include English (American)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('English (British)'), 'Must include English (British)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('French (European / Standard)'), 'Must include French (European / Standard)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('French (Canadian / Québécois)'), 'Must include French (Canadian / Québécois)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Portuguese (Brazilian)'), 'Must include Portuguese (Brazilian)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Portuguese (European / Continental)'), 'Must include Portuguese (European / Continental)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Greek (Modern)'), 'Must include Greek (Modern)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Greek (Ancient / Classical)'), 'Must include Greek (Ancient / Classical)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Hebrew (Modern)'), 'Must include Hebrew (Modern)');
assert.ok(MAJOR_LANGUAGES_LIST.includes('Hebrew (Biblical / Ancient)'), 'Must include Hebrew (Biblical / Ancient)');

console.log('✓ Major world languages and common regional variations verified');

// 5. Strictly Alphabetical
for (let i = 0; i < MAJOR_LANGUAGES_LIST.length - 1; i++) {
  const cur = MAJOR_LANGUAGES_LIST[i];
  const next = MAJOR_LANGUAGES_LIST[i + 1];
  assert.ok(cur.localeCompare(next) <= 0, `Catalog must be strictly alphabetical: "${cur}" before "${next}"`);
}
assert.ok(MAJOR_LANGUAGES_LIST.length >= 80, `Catalog must be comprehensive (found ${MAJOR_LANGUAGES_LIST.length} languages)`);
console.log(`✓ Catalog strictly alphabetical and comprehensive (${MAJOR_LANGUAGES_LIST.length} real-world languages/variations)`);

// 6. Character audit check
const testChar = {
  powerLevel: 10,
  powerPointsBudget: 150,
  abilities: { int: 2 },
  advantages: [
    { id: 'languages', name: 'Languages', rank: 2, languages: ['Chinese (Mandarin)', 'Chinese (Cantonese)', 'Japanese'] }
  ],
  skills: []
};
const audit = auditCharacter(testChar);
assert.strictEqual(audit.advantagesCost, 2, 'Rank 2 Languages costs 2 PP');
console.log('✓ PP audit calculation verified for Languages Advantage');

console.log('\n========================================');
console.log('ALL v3.44 REQUIREMENTS VERIFIED 100% CLEAN!');
console.log('========================================\n');
