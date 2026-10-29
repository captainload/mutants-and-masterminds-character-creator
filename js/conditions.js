/**
 * Mutants & Masterminds 3rd Edition - Conditions & Trait Modifiers Engine
 * Official Basic & Combined Damage Conditions as defined by Green Ronin Publishing.
 */

export const BASIC_CONDITIONS = [
  { id: 'dazed', name: 'Dazed', desc: 'Limited to free actions and a single standard action per round (cannot take move actions).' },
  { id: 'clumsy', name: 'Clumsy', desc: '-2 circumstance penalty on attack checks and active defense checks (Dodge and Parry).' },
  { id: 'impaired', name: 'Impaired', desc: '-2 circumstance penalty on all checks (attacks, defenses, skills, ability checks).' },
  { id: 'disabled', name: 'Disabled', desc: '-5 circumstance penalty on all checks (attacks, defenses, skills, ability checks).' },
  { id: 'vulnerable', name: 'Vulnerable', desc: 'Active defense checks (Dodge and Parry) are divided in half (rounded down).' },
  { id: 'defenseless', name: 'Defenseless', desc: 'Active defense checks (Dodge and Parry) are reduced to 0! Attackers can make routine checks or criticals.' },
  { id: 'hindered', name: 'Hindered', desc: 'Movement speed is halved (-1 speed rank).' },
  { id: 'immobile', name: 'Immobile', desc: 'Speed is 0; cannot move from current location.' },
  { id: 'prone', name: 'Prone', desc: '-5 penalty on close attacks; opponents gain +5 on close attacks against you, -5 on ranged attacks.' },
  { id: 'stunned', name: 'Stunned', desc: 'Cannot take any actions (including free actions).' },
  { id: 'blind', name: 'Blind', desc: '-5 penalty on attack checks relying on vision; visual perception checks fail automatically.' },
  { id: 'deaf', name: 'Deaf', desc: 'Auditory perception checks fail automatically.' },
  { id: 'fatigued', name: 'Fatigued', desc: 'Hindered. One hour of rest required to recover.' },
  { id: 'unaware', name: 'Unaware', desc: 'Completely unaware of surroundings (-5 to active defense, auto-fail perception).' }
];

export const COMBINED_CONDITIONS = [
  { id: 'staggered', name: 'Staggered', constituents: ['dazed', 'hindered'], desc: 'Dazed + Hindered. Limited to standard action at half speed.' },
  { id: 'surprised', name: 'Surprised', constituents: ['stunned', 'vulnerable'], desc: 'Stunned + Vulnerable. Cannot act, active defenses halved.' },
  { id: 'entangled', name: 'Entangled', constituents: ['hindered', 'vulnerable'], desc: 'Hindered + Vulnerable. Half speed, active defenses halved.' },
  { id: 'exhausted', name: 'Exhausted', constituents: ['hindered', 'impaired'], desc: 'Hindered + Impaired. Half speed, -2 on all checks.' },
  { id: 'restrained', name: 'Restrained', constituents: ['hindered', 'vulnerable', 'immobile'], desc: 'Hindered + Vulnerable + Immobile. Cannot move, defenses halved.' },
  { id: 'paralyzed', name: 'Paralyzed', constituents: ['defenseless', 'immobile', 'stunned'], desc: 'Defenseless + Immobile + Stunned. Defenses 0, cannot act or move.' },
  { id: 'incapacitated', name: 'Incapacitated', constituents: ['defenseless', 'stunned', 'unaware', 'prone'], desc: 'Defenseless + Stunned + Unaware + Prone. Unconscious and defeated.' },
  { id: 'unconscious', name: 'Unconscious', constituents: ['defenseless', 'stunned', 'unaware', 'prone'], desc: 'Defenseless + Stunned + Unaware + Prone. Helpless and knocked out.' },
  { id: 'asleep', name: 'Asleep', constituents: ['defenseless', 'stunned', 'unaware', 'prone'], desc: 'Defenseless + Stunned + Unaware + Prone. Can be awakened by damage or noise.' },
  { id: 'dying', name: 'Dying', constituents: ['defenseless', 'stunned', 'unaware', 'prone'], desc: 'Incapacitated and near death. Must make Fortitude checks each round or perish.' },
  { id: 'compelled', name: 'Compelled', constituents: ['dazed'], desc: 'Limited to standard action, forced by an external controller.' },
  { id: 'controlled', name: 'Controlled', constituents: ['dazed'], desc: 'Under total direct control of an external controller.' }
];

export function calculateConditionModifiers(conditions = {}, bruises = 0) {
  let checkPenalty = 0;
  if (conditions.disabled) {
    checkPenalty = -5;
  } else if (conditions.impaired) {
    checkPenalty = -2;
  }

  const isClumsy = !!conditions.clumsy;
  const isVulnerable = !!conditions.vulnerable;
  const isDefenseless = !!conditions.defenseless;
  const isProne = !!conditions.prone;
  const bruiseCount = parseInt(bruises, 10) || 0;
  const toughnessPenalty = -bruiseCount + checkPenalty;

  const notes = [];
  if (bruiseCount > 0) notes.push(`-${bruiseCount} Toughness Penalty`);
  if (conditions.disabled) notes.push('-5 Disabled');
  else if (conditions.impaired) notes.push('-2 Impaired');
  if (isClumsy) notes.push('-2 Clumsy');
  if (isDefenseless) notes.push('Defenses 0 (Defenseless)');
  else if (isVulnerable) notes.push('Defenses Halved (Vulnerable)');
  if (isProne) notes.push('-5 Close Attacks (Prone)');

  return {
    checkPenalty,
    attackPenalty: checkPenalty + (isClumsy ? -2 : 0),
    dodgeParryPenalty: checkPenalty + (isClumsy ? -2 : 0),
    isVulnerable,
    isDefenseless,
    isProne,
    bruiseCount,
    toughnessPenalty,
    summaryText: notes.length > 0 ? notes.join(', ') : 'Normal'
  };
}
