import fs from 'fs';
import path from 'path';
import assert from 'assert';
import {
  SKILLS_LIST,
  ADVANTAGES_DATABASE,
  auditCharacter
} from './js/rules.js';

console.log('--- Running Tests for v3.45 Skill Mastery Advantage & Default Hidden Advantages Descriptions ---');

const projectDir = 'C:/Users/admin/.gemini/antigravity/scratch/mutants-and-masterminds-character-creator';

// 1. Version Check (3.45)
const versionData = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8'));
assert.strictEqual(versionData.version, '3.45', 'version.json should be 3.45');

const indexHtml = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('v3.45'), 'index.html should reference v3.45');
assert.ok(indexHtml.includes('Character Editor v3.45'), 'index.html title has v3.45');

const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');
assert.ok(appJs.includes("CURRENT_VERSION = '3.45'"), 'app.js defines CURRENT_VERSION as 3.45');

const archWindowJs = fs.readFileSync(path.join(projectDir, 'js/archetype_window.js'), 'utf8');
assert.ok(archWindowJs.includes('styles.css?v=3.45'), 'archetype_window.js links to v3.45 stylesheet');

console.log('✓ Version 3.45 verified across all files');

// 2. Skill Mastery is an Advantage, NOT a Skill
const smSkill = SKILLS_LIST.find(s => s.id === 'skill_mastery');
assert.strictEqual(smSkill, undefined, 'Skill Mastery must NOT exist in SKILLS_LIST');
assert.strictEqual(SKILLS_LIST.length, 16, 'Official M&M 3E SKILLS_LIST has exactly 16 skills');

const required3E = SKILLS_LIST.filter(s => s.requiresOption3E);
assert.strictEqual(required3E.length, 3, 'Exactly 3 skills require options in 3E: Close Combat, Expertise, Ranged Combat');
assert.ok(required3E.some(s => s.id === 'close_combat'));
assert.ok(required3E.some(s => s.id === 'expertise'));
assert.ok(required3E.some(s => s.id === 'ranged_combat'));

console.log('✓ Skill Mastery confirmed absent from SKILLS_LIST (Skills list has exactly 16 official skills)');

// 3. Skill Mastery verified in ADVANTAGES_DATABASE
const smAdv = ADVANTAGES_DATABASE.find(a => a.id === 'skill_mastery');
assert.ok(smAdv, 'Skill Mastery must exist in ADVANTAGES_DATABASE');
assert.strictEqual(smAdv.category, 'Skill', 'Skill Mastery category must be Skill');
assert.strictEqual(smAdv.hasOptions, true, 'Skill Mastery hasOptions must be true');
assert.ok(smAdv.maxRank >= 16, 'Skill Mastery maxRank must be at least 16 (for all skills)');
assert.strictEqual(smAdv.options.length, 16, 'Skill Mastery options must cover all 16 skills');
assert.ok(smAdv.options.includes('Acrobatics'));
assert.ok(smAdv.options.includes('Athletics'));
assert.ok(smAdv.options.includes('Close Combat'));
assert.ok(smAdv.options.includes('Technology'));
assert.ok(smAdv.options.includes('Vehicles'));

console.log('✓ Skill Mastery advantage verified in ADVANTAGES_DATABASE covering all 16 skills');

// 4. "Show descriptions" disabled by default
assert.ok(
  indexHtml.includes('<input type="checkbox" id="adv-show-descriptions"') &&
  !indexHtml.includes('<input type="checkbox" id="adv-show-descriptions" checked'),
  '#adv-show-descriptions must NOT have checked attribute by default in index.html'
);

assert.ok(
  appJs.includes("const showDescriptions = document.getElementById('adv-show-descriptions')?.checked ?? false;"),
  'app.js must default showDescriptions fallback to false'
);

console.log('✓ Advantages "Show descriptions" is disabled by default in HTML and JavaScript');

// 5. Migration and PP calculation
const testChar = {
  powerLevel: 10,
  powerPointsBudget: 150,
  abilities: { int: 2 },
  advantages: [
    { id: 'skill_mastery', name: 'Skill Mastery', rank: 2, note: 'Athletics, Technology' }
  ],
  skills: []
};

const audit = auditCharacter(testChar);
assert.strictEqual(audit.advantagesCost, 2, 'Skill Mastery rank 2 costs 2 PP');
assert.strictEqual(audit.skillsCost, 0, 'No skill costs');
console.log('✓ Character PP calculation for Skill Mastery verified');

console.log('\n========================================');
console.log('ALL v3.45 REQUIREMENTS VERIFIED 100% CLEAN!');
console.log('========================================\n');
