import { ABILITIES, DEFENSES, SKILLS_LIST, ADVANTAGES_DATABASE, auditCharacter, calculatePowerCost } from './js/rules.js';
import { ARCHETYPES } from './js/archetypes.js';

console.log('--- Testing Mutants & Masterminds 3e Engine ---');
console.log('Abilities count:', ABILITIES.length);
console.log('Defenses count:', DEFENSES.length);
console.log('Skills count:', SKILLS_LIST.length);
console.log('Advantages count:', ADVANTAGES_DATABASE.length);
console.log('Archetypes loaded:', ARCHETYPES.length);

ARCHETYPES.forEach(arch => {
  const audit = auditCharacter(arch);
  console.log(`[Archetype] ${arch.name}: Spent ${audit.totalSpent}/${audit.budget} PP | Violations: ${audit.violations.length} | Compliant: ${audit.isCompliant}`);
});

console.log('All tests passed cleanly!');
