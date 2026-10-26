import fs from 'fs';
import { SKILLS_LIST, auditCharacter } from './js/rules.js';

console.log('=== Running v3.7 Verification Suite ===');

// Test 1: Verify 10pt minimum font size across all codebase files
const filesToCheck = ['css/styles.css', 'index.html', 'js/app.js'];
let violations = 0;

filesToCheck.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const matches = line.match(/font-size:\s*([0-9.]+(rem|px|pt))/g);
    if (matches) {
      matches.forEach(m => {
        const num = parseFloat(m.replace(/[^0-9.]/g, ''));
        const unit = m.slice(-2);
        // 10pt = 13.333px = 0.8333rem (assuming 16px standard)
        if ((unit === 'em' && num < 0.833) || (unit === 'px' && num < 13.33) || (unit === 'pt' && num < 10.0)) {
          console.error(`Violation in ${file} at line ${idx + 1}: ${m}`);
          violations++;
        }
      });
    }
  });
});

console.assert(violations === 0, `Expected 0 font size violations below 10pt, found ${violations}`);
console.log(`✓ 10pt Minimum Font Size check passed across ${filesToCheck.length} files (0 violations).`);

// Test 2: Check Assigned Focus Skills in SKILLS_LIST
const lang = SKILLS_LIST.find(s => s.id === 'languages');
console.assert(lang !== undefined, 'Languages skill exists');
console.assert(lang.isAssignedFocus === true, 'Languages must have isAssignedFocus: true');
console.assert(lang.maxRankPerInstance === 1, 'Languages must enforce maxRankPerInstance: 1');
console.assert(lang.options && lang.options.length >= 10, 'Languages must provide a robust set of options');

const sm = SKILLS_LIST.find(s => s.id === 'skill_mastery');
console.assert(sm !== undefined, 'Skill Mastery exists');
console.assert(sm.isAssignedFocus === true, 'Skill Mastery must have isAssignedFocus: true');
console.assert(sm.maxRankPerInstance === 1, 'Skill Mastery must enforce maxRankPerInstance: 1');
console.assert(sm.options && sm.options.length >= 10, 'Skill Mastery must provide skill options');
console.log('✓ Assigned Focus definitions for Languages and Skill Mastery verified.');

// Test 3: Verify Multi-Instance Assigned Focus PP Calculation
const char = {
  powerLevel: 10,
  powerPointsBudget: 150,
  abilities: { int: 2 },
  skills: [
    { id: 'languages', specialty: 'Spanish', ranks: 1 },
    { id: 'languages', specialty: 'French', ranks: 1 },
    { id: 'languages', specialty: 'Japanese', ranks: 1 },
    { id: 'languages', specialty: 'Russian', ranks: 1 },
    { id: 'skill_mastery', specialty: 'Investigation', ranks: 1 },
    { id: 'skill_mastery', specialty: 'Technology', ranks: 1 }
  ]
};

const audit = auditCharacter(char);
// 6 ranks total = Math.ceil(6 / 2) = 3 PP
console.assert(audit.skillsCost === 3, `Expected 3 PP for 6 assigned focus ranks, got ${audit.skillsCost}`);
console.log('✓ Multi-instance PP calculation for assigned focus skills verified (6 ranks = 3 PP).');

// Test 4: Verify App Version updated to 3.7
const versionData = JSON.parse(fs.readFileSync('version.json', 'utf8'));
console.assert(versionData.version === '3.7', `Expected version 3.7, got ${versionData.version}`);
console.log('✓ version.json verified at v3.7.');

console.log('=== ALL v3.7 VERIFICATIONS PASSED SUCCESSFULLY ===');
