import fs from 'fs';
import {
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  calculatePowerCost,
  computePowerEffectiveStats,
  validateModifierLegality,
  isModifierLegalForEffect
} from './js/rules.js';

console.log('=== Running v3.27 Requirements Test Suite ===\n');

// 1. Version Check: 3.27 across files
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.27') {
  throw new Error(`Expected version.json to be 3.27, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.27')) {
  throw new Error('Expected index.html title to reference Character Editor v3.27');
}
if (!indexHtml.includes('css/styles.css?v=3.27')) {
  throw new Error('Expected styles.css query param to be v3.27');
}
if (!indexHtml.includes('js/app.js?v=3.27')) {
  throw new Error('Expected app.js script query param to be v3.27');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.27'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.27"');
}
console.log('✓ 1. Version 3.27 verified across version.json, index.html, and js/app.js');

// 2. Feedback flaw classification: non-unique modifier
const feedbackFlaw = FLAWS_CATALOG.find(f => f.id === 'feedback');
if (!feedbackFlaw) throw new Error('feedback not found in FLAWS_CATALOG');
if (feedbackFlaw.isUnique !== false) {
  throw new Error(`Expected Feedback isUnique to be false, got ${feedbackFlaw.isUnique}`);
}
if (feedbackFlaw.name.startsWith('★')) {
  throw new Error(`Expected Feedback name to not have star ★ prefix, got "${feedbackFlaw.name}"`);
}
if (feedbackFlaw.name !== 'Feedback') {
  throw new Error(`Expected Feedback name to be "Feedback", got "${feedbackFlaw.name}"`);
}
console.log('✓ 2. Feedback flaw correctly classified as non-unique (isUnique: false, no star prefix)');

// 3. Feedback legal effect applications: physical or sensory manifestations only
const manifestationEffects = ['create', 'illusion', 'summon', 'remote_sensing'];
for (const effId of manifestationEffects) {
  const eff = POWER_EFFECTS_CATALOG.find(e => e.id === effId);
  const legality = isModifierLegalForEffect(feedbackFlaw, eff, [], []);
  if (!legality.legal) {
    throw new Error(`Expected Feedback to be legal on manifestation effect ${effId}, got: ${legality.reason}`);
  }
}

const nonManifestationEffects = ['flight', 'protection', 'damage', 'blast', 'speed', 'quickness', 'senses', 'comprehend', 'regeneration', 'teleport'];
for (const effId of nonManifestationEffects) {
  const eff = POWER_EFFECTS_CATALOG.find(e => e.id === effId);
  const legality = isModifierLegalForEffect(feedbackFlaw, eff, [], []);
  if (legality.legal) {
    throw new Error(`Expected Feedback to be illegal on non-manifestation effect ${effId}`);
  }
  if (!legality.reason.toLowerCase().includes('manifestation')) {
    throw new Error(`Expected rejection reason to mention manifestation, got: "${legality.reason}"`);
  }
}
console.log('✓ 3. Feedback flaw strictly restricted to manifestation effects (Create, Illusion, Summon, Remote Sensing)');

// 4. Full review of modifier rules: legal effect applications
const imperviousDef = EXTRAS_CATALOG.find(e => e.id === 'impervious');
const continuousDef = EXTRAS_CATALOG.find(e => e.id === 'continuous');
const sustainedDef = EXTRAS_CATALOG.find(e => e.id === 'sustained');
const concentrationDef = FLAWS_CATALOG.find(f => f.id === 'concentration');
const incurableDef = EXTRAS_CATALOG.find(e => e.id === 'incurable');
const limitedAmbientDef = FLAWS_CATALOG.find(f => f.id === 'limited_ambient');
const limitedToMindsDef = FLAWS_CATALOG.find(f => f.id === 'limited_to_minds');
const limitedToResDef = FLAWS_CATALOG.find(f => f.id === 'limited_to_resistance');
const senseDepDef = FLAWS_CATALOG.find(f => f.id === 'sense_dependent');
const resistibleDef = FLAWS_CATALOG.find(f => f.id === 'resistible');
const noticeableDef = FLAWS_CATALOG.find(f => f.id === 'noticeable');

const flight = POWER_EFFECTS_CATALOG.find(e => e.id === 'flight');
const protection = POWER_EFFECTS_CATALOG.find(e => e.id === 'protection');
const damage = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage');
const blast = POWER_EFFECTS_CATALOG.find(e => e.id === 'blast');
const affliction = POWER_EFFECTS_CATALOG.find(e => e.id === 'affliction');
const mindReading = POWER_EFFECTS_CATALOG.find(e => e.id === 'mind_reading');

// Impervious: legal on Protection; illegal on Damage, Blast, Flight
if (!isModifierLegalForEffect(imperviousDef, protection, [], []).legal) {
  throw new Error('Expected Impervious to be legal on Protection');
}
if (isModifierLegalForEffect(imperviousDef, blast, [], []).legal) {
  throw new Error('Expected Impervious to be illegal on Blast');
}
if (isModifierLegalForEffect(imperviousDef, flight, [], []).legal) {
  throw new Error('Expected Impervious to be illegal on Flight');
}

// Continuous: legal on Sustained (Flight); illegal on Instant (Damage) or Permanent (Protection)
if (!isModifierLegalForEffect(continuousDef, flight, [], []).legal) {
  throw new Error('Expected Continuous to be legal on Sustained effect (Flight)');
}
if (isModifierLegalForEffect(continuousDef, damage, [], []).legal) {
  throw new Error('Expected Continuous to be illegal on Instant effect (Damage)');
}
if (isModifierLegalForEffect(continuousDef, protection, [], []).legal) {
  throw new Error('Expected Continuous to be illegal on Permanent effect (Protection)');
}

// Sustained: legal on Permanent (Protection); illegal on Instant (Damage) or Sustained (Flight)
if (!isModifierLegalForEffect(sustainedDef, protection, [], []).legal) {
  throw new Error('Expected Sustained to be legal on Permanent effect (Protection)');
}
if (isModifierLegalForEffect(sustainedDef, damage, [], []).legal) {
  throw new Error('Expected Sustained to be illegal on Instant effect (Damage)');
}
if (isModifierLegalForEffect(sustainedDef, flight, [], []).legal) {
  throw new Error('Expected Sustained to be illegal on Sustained effect (Flight)');
}

// Concentration: legal on Sustained (Flight); illegal on Instant (Damage) or Permanent (Protection)
if (!isModifierLegalForEffect(concentrationDef, flight, [], []).legal) {
  throw new Error('Expected Concentration to be legal on Sustained effect (Flight)');
}
if (isModifierLegalForEffect(concentrationDef, damage, [], []).legal) {
  throw new Error('Expected Concentration to be illegal on Instant effect (Damage)');
}

// Incurable: legal on Damage / Affliction; illegal on Flight / Protection
if (!isModifierLegalForEffect(incurableDef, damage, [], []).legal) {
  throw new Error('Expected Incurable to be legal on Damage');
}
if (isModifierLegalForEffect(incurableDef, flight, [], []).legal) {
  throw new Error('Expected Incurable to be illegal on Flight');
}

// Limited: Ambient Source: legal on Blast, Damage, Create; illegal on Flight, Senses
if (!isModifierLegalForEffect(limitedAmbientDef, blast, [], []).legal) {
  throw new Error('Expected Limited Ambient to be legal on Blast');
}
if (isModifierLegalForEffect(limitedAmbientDef, flight, [], []).legal) {
  throw new Error('Expected Limited Ambient to be illegal on Flight');
}

// Limited to Minds: legal on Mind Reading, Affliction; illegal on Flight, Protection
if (!isModifierLegalForEffect(limitedToMindsDef, mindReading, [], []).legal) {
  throw new Error('Expected Limited to Minds to be legal on Mind Reading');
}
if (isModifierLegalForEffect(limitedToMindsDef, flight, [], []).legal) {
  throw new Error('Expected Limited to Minds to be illegal on Flight');
}

// Sense-Dependent & Resistible: illegal on Personal non-attack (Flight, Protection)
if (isModifierLegalForEffect(senseDepDef, flight, [], []).legal) {
  throw new Error('Expected Sense-Dependent to be illegal on Personal Flight');
}
if (isModifierLegalForEffect(resistibleDef, flight, [], []).legal) {
  throw new Error('Expected Resistible to be illegal on Personal Flight');
}
// When Flight takes Attack, Sense-Dependent & Resistible become legal
if (!isModifierLegalForEffect(senseDepDef, flight, [{ id: 'attack', rank: 1 }], []).legal) {
  throw new Error('Expected Sense-Dependent to be legal on Flight (Attack)');
}
if (!isModifierLegalForEffect(resistibleDef, flight, [{ id: 'attack', rank: 1 }], []).legal) {
  throw new Error('Expected Resistible to be legal on Flight (Attack)');
}

// Noticeable: legal on Protection; illegal on obvious attacks (Blast, Damage)
if (!isModifierLegalForEffect(noticeableDef, protection, [], []).legal) {
  throw new Error('Expected Noticeable to be legal on Protection');
}
if (isModifierLegalForEffect(noticeableDef, blast, [], []).legal) {
  throw new Error('Expected Noticeable to be illegal on Blast');
}

console.log('✓ 4. Complete review of modifier legal applications verified against M&M 3E rules');

// 5. validateModifierLegality catches all of these violations as errors
const invalidPower = {
  effect: flight,
  extras: [
    { id: 'impervious', name: 'Impervious', rank: 1 },
    { id: 'sustained', name: 'Sustained', rank: 1 }
  ],
  flaws: [
    { id: 'feedback', name: 'Feedback', rank: 1 },
    { id: 'sense_dependent', name: 'Sense-Dependent', rank: 1 }
  ]
};
const valResult = validateModifierLegality(invalidPower.effect, invalidPower.extras, invalidPower.flaws);
if (!valResult.errors.some(e => e.includes('Feedback'))) {
  throw new Error(`Expected validation error for Feedback on Flight, got: ${JSON.stringify(valResult.errors)}`);
}
if (!valResult.errors.some(e => e.includes('Impervious'))) {
  throw new Error(`Expected validation error for Impervious on Flight, got: ${JSON.stringify(valResult.errors)}`);
}
if (!valResult.errors.some(e => e.includes('Sustained'))) {
  throw new Error(`Expected validation error for Sustained on Flight, got: ${JSON.stringify(valResult.errors)}`);
}
if (!valResult.errors.some(e => e.includes('Sense-Dependent'))) {
  throw new Error(`Expected validation error for Sense-Dependent on Flight, got: ${JSON.stringify(valResult.errors)}`);
}
console.log('✓ 5. validateModifierLegality properly reports all reviewed modifier violations as errors');

console.log('\n=== ALL v3.27 REQUIREMENTS VERIFIED SUCCESSFULLY! ===');
