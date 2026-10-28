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

console.log('--- Running Tests for v3.43 3E Languages Advantage & Selection Modal ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.43)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.43', 'version.json should be 3.43');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.43'), 'index.html should reference v3.43');
assert.ok(indexHtml.includes('Character Editor v3.43'), 'index.html title has v3.43');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.43'"), 'app.js defines CURRENT_VERSION as 3.43');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.43'), 'archetype_window.js links to v3.43 stylesheet');

console.log('✓ Version 3.43 verified across all files');

// 2. Languages Removed from Skills Catalog
const skillLang = SKILLS_LIST.find(s => s.id === 'languages');
assert.strictEqual(skillLang, undefined, 'Languages must NOT be in SKILLS_LIST (it is an advantage in 3E, not a skill)');
console.log('✓ Languages verified removed from SKILLS_LIST');

// 3. Languages in ADVANTAGES_DATABASE
const advLang = ADVANTAGES_DATABASE.find(a => a.id === 'languages');
assert.ok(advLang, 'Languages must exist in ADVANTAGES_DATABASE');
assert.strictEqual(advLang.category, 'General', 'Languages must be in General category');
assert.strictEqual(advLang.maxRank, 20, 'Languages maxRank must be 20');
assert.strictEqual(advLang.hasOptions, false, 'Languages hasOptions is false (managed via dedicated modal)');
console.log('✓ Languages advantage definition verified in ADVANTAGES_DATABASE');

// 4. Progression Rule (1, 2, 4, 8, 16, 32...)
assert.strictEqual(getLanguagesLimit(0), 0, 'Rank 0 allows 0 languages');
assert.strictEqual(getLanguagesLimit(1), 1, 'Rank 1 allows 1 extra language');
assert.strictEqual(getLanguagesLimit(2), 2, 'Rank 2 allows 2 extra languages');
assert.strictEqual(getLanguagesLimit(3), 4, 'Rank 3 allows 4 extra languages');
assert.strictEqual(getLanguagesLimit(4), 8, 'Rank 4 allows 8 extra languages');
assert.strictEqual(getLanguagesLimit(5), 16, 'Rank 5 allows 16 extra languages');
assert.strictEqual(getLanguagesLimit(6), 32, 'Rank 6 allows 32 extra languages');
assert.strictEqual(getLanguagesLimit(10), 512, 'Rank 10 allows 512 extra languages');
console.log('✓ Doubling fluency progression (1, 2, 4, 8, 16...) mathematically verified');

// 5. Comprehensive Alphabetical Major Languages List
assert.ok(MAJOR_LANGUAGES_LIST.length >= 40, `Major languages list must be comprehensive (found ${MAJOR_LANGUAGES_LIST.length})`);

// Verify strictly alphabetical
for (let i = 0; i < MAJOR_LANGUAGES_LIST.length - 1; i++) {
  const current = MAJOR_LANGUAGES_LIST[i];
  const next = MAJOR_LANGUAGES_LIST[i + 1];
  assert.ok(
    current.localeCompare(next) <= 0,
    `Languages list must be strictly alphabetical: "${current}" should come before "${next}"`
  );
}

// Verify key major and setting languages exist
const expectedLangs = ['Arabic (Standard)', 'French', 'German', 'Japanese', 'Mandarin Chinese', 'Russian', 'Spanish', 'Latin', 'Ancient Greek', 'Atlantean', 'Kryptonian'];
expectedLangs.forEach(lang => {
  assert.ok(MAJOR_LANGUAGES_LIST.includes(lang), `Languages list should include "${lang}"`);
});
console.log(`✓ Major languages catalog verified: ${MAJOR_LANGUAGES_LIST.length} languages strictly sorted alphabetically`);

// 6. Modal Structure & Elements in index.html
assert.ok(indexHtml.includes('id="modal-languages"'), 'index.html has modal-languages');
assert.ok(indexHtml.includes('id="modal-languages-known-list"'), 'index.html has modal-languages-known-list');
assert.ok(indexHtml.includes('id="modal-lang-count-badge"'), 'index.html has modal-lang-count-badge');
assert.ok(indexHtml.includes('id="modal-languages-search"'), 'index.html has modal-languages-search');
assert.ok(indexHtml.includes('id="modal-lang-custom-input"'), 'index.html has modal-lang-custom-input');
assert.ok(indexHtml.includes('id="btn-modal-add-custom-lang"'), 'index.html has btn-modal-add-custom-lang');
assert.ok(indexHtml.includes('id="modal-languages-available-list"'), 'index.html has modal-languages-available-list');
assert.ok(indexHtml.includes('id="btn-close-languages-modal-done"'), 'index.html has btn-close-languages-modal-done');

console.log('✓ Languages modal DOM structure verified');

// 7. Advantages Tab Row Wiring in app.js
assert.ok(appJs.includes('data-manage-languages'), 'app.js includes manage languages button');
assert.ok(appJs.includes('openLanguagesModal()'), 'app.js includes openLanguagesModal method');
assert.ok(appJs.includes('renderLanguagesModal()'), 'app.js includes renderLanguagesModal method');
assert.ok(appJs.includes('renderLanguagesAvailableList()'), 'app.js includes renderLanguagesAvailableList method');
assert.ok(appJs.includes('migrateLanguagesSkillToAdvantage'), 'app.js includes migration helper');

console.log('✓ Advantages tab UI buttons & modal handlers verified in app.js');

// 8. Test PP Audit for Languages Advantage
const testHero = {
  powerLevel: 10,
  powerPointsBudget: 150,
  abilities: { int: 2 },
  advantages: [
    { id: 'languages', name: 'Languages', rank: 3, languages: ['French', 'German', 'Spanish', 'Japanese'] }
  ],
  skills: []
};

const audit = auditCharacter(testHero);
assert.strictEqual(audit.advantagesCost, 3, 'Languages rank 3 must cost 3 PP');
assert.strictEqual(audit.skillsCost, 0, 'No skills cost');
console.log('✓ PP Audit verified for Languages advantage (Rank 3 = 3 PP)');

console.log('\n========================================');
console.log('ALL v3.43 REQUIREMENTS VERIFIED 100% CLEAN!');
console.log('========================================\n');
