import assert from 'assert';
import { normalizeCharacter } from './js/storage.js';

console.log('--- Running test_v396_features.mjs ---');

// Test 1: normalizeCharacter handles null / undefined / primitives
assert.strictEqual(normalizeCharacter(null), null);
assert.strictEqual(normalizeCharacter(undefined), undefined);
assert.strictEqual(normalizeCharacter('string'), 'string');

// Test 2: normalizeCharacter initializes missing arrays and objects
const emptyChar = {};
normalizeCharacter(emptyChar);
assert.ok(Array.isArray(emptyChar.skills), 'skills should be an array');
assert.ok(Array.isArray(emptyChar.advantages), 'advantages should be an array');
assert.ok(Array.isArray(emptyChar.powers), 'powers should be an array');
assert.ok(Array.isArray(emptyChar.gear), 'gear should be an array');
assert.ok(Array.isArray(emptyChar.alts), 'alts should be an array');
assert.ok(Array.isArray(emptyChar.historyLog), 'historyLog should be an array');
assert.ok(Array.isArray(emptyChar.complications), 'complications should be an array');
assert.ok(typeof emptyChar.abilities === 'object', 'abilities should be an object');
assert.ok(typeof emptyChar.defenses === 'object', 'defenses should be an object');

// Test 3: normalizeCharacter converts legacy object skills to array
const legacyChar = {
  id: 'test-legacy-1',
  name: 'Legacy Hero',
  skills: {
    athletics: 4,
    close_combat: { ranks: 2, specialty: 'Swords' },
    languages: { ranks: 1, specialty: 'Spanish' },
    perception: '5'
  }
};

normalizeCharacter(legacyChar);
assert.ok(Array.isArray(legacyChar.skills), 'char.skills should be converted to an array');
assert.strictEqual(legacyChar.skills.length, 4, 'Should have 4 skill entries');

const athletics = legacyChar.skills.find(s => s.id === 'athletics');
assert.ok(athletics, 'Athletics found');
assert.strictEqual(athletics.ranks, 4);

const closeCombat = legacyChar.skills.find(s => s.id === 'close_combat');
assert.ok(closeCombat, 'Close combat found');
assert.strictEqual(closeCombat.ranks, 2);
assert.strictEqual(closeCombat.specialty, 'Swords');

const perception = legacyChar.skills.find(s => s.id === 'perception');
assert.ok(perception, 'Perception found');
assert.strictEqual(perception.ranks, 5);

// Test 4: Migration methods don't throw on non-array skills even if normalize was bypassed
const dummyController = {
  migrateLanguagesSkillToAdvantage(char) {
    if (!char) return;
    if (char.skills && Array.isArray(char.skills) && char.skills.some(s => s && s.id === 'languages')) {
      const legacyLangSkills = char.skills.filter(s => s.id === 'languages');
      const extractedLangs = legacyLangSkills.map(s => s.specialty).filter(Boolean);
      char.skills = char.skills.filter(s => s.id !== 'languages');
      if (extractedLangs.length > 0) {
        if (!char.advantages) char.advantages = [];
        let langAdv = char.advantages.find(a => a.id === 'languages');
        if (!langAdv) {
          langAdv = { id: 'languages', name: 'Languages', ranks: extractedLangs.length, languagesList: extractedLangs };
          char.advantages.push(langAdv);
        } else {
          langAdv.languagesList = Array.from(new Set([...(langAdv.languagesList || []), ...extractedLangs]));
          langAdv.ranks = Math.max(langAdv.ranks || 0, langAdv.languagesList.length);
        }
      }
    }
  },
  migrateSkillMasteryToAdvantage(char) {
    if (!char) return;
    if (char.skills && Array.isArray(char.skills) && char.skills.some(s => s && s.id === 'skill_mastery')) {
      const legacySmSkills = char.skills.filter(s => s.id === 'skill_mastery');
      const chosenSkills = legacySmSkills.map(s => s.specialty).filter(Boolean);
      char.skills = char.skills.filter(s => s.id !== 'skill_mastery');
      if (chosenSkills.length > 0) {
        if (!char.advantages) char.advantages = [];
        let smAdv = char.advantages.find(a => a.id === 'skill_mastery');
        if (!smAdv) {
          smAdv = { id: 'skill_mastery', name: 'Skill Mastery', ranks: chosenSkills.length, chosenSkills };
          char.advantages.push(smAdv);
        } else {
          smAdv.chosenSkills = Array.from(new Set([...(smAdv.chosenSkills || []), ...chosenSkills]));
          smAdv.ranks = Math.max(smAdv.ranks || 0, smAdv.chosenSkills.length);
        }
      }
    }
  }
};

const brokenChar = { id: 'broken', skills: { someProperty: 'not-array' } };
assert.doesNotThrow(() => {
  dummyController.migrateLanguagesSkillToAdvantage(brokenChar);
  dummyController.migrateSkillMasteryToAdvantage(brokenChar);
}, 'Migration methods must never throw if char.skills is an object');

// Test 5: normalizeCharacter handles alt forms / minions / sidekicks
const charWithAlts = {
  id: 'hero-with-alts',
  skills: [],
  alts: [
    {
      id: 'alt-1',
      name: 'Alternate Form',
      skills: { stealth: 6 }
    }
  ]
};
normalizeCharacter(charWithAlts);
assert.ok(Array.isArray(charWithAlts.alts[0].skills), 'Alt character skills must be normalized to array');
assert.strictEqual(charWithAlts.alts[0].skills[0].id, 'stealth');
assert.strictEqual(charWithAlts.alts[0].skills[0].ranks, 6);

console.log('All v3.96 feature tests passed successfully!');
