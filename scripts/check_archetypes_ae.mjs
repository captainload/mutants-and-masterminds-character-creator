import { ARCHETYPES } from '../js/archetypes.js';

ARCHETYPES.forEach(arch => {
  console.log(`=== Archetype: ${arch.name} ===`);
  (arch.powers || []).forEach(p => {
    if (p.alternateEffects && p.alternateEffects.length > 0) {
      console.log(`  Power: ${p.name}`);
      console.log(`    Main extras:`, (p.extras || []).map(e => e.id));
      console.log(`    Main flaws:`, (p.flaws || []).map(f => f.id));
      p.alternateEffects.forEach((ae, i) => {
        console.log(`    AE ${i + 1} (${ae.name}) extras:`, (ae.extras || []).map(e => e.id));
        console.log(`    AE ${i + 1} (${ae.name}) flaws:`, (ae.flaws || []).map(f => f.id));
      });
    }
  });
});
