/**
 * Mutants & Masterminds 3E Interactive Archetype Builder
 * Official options and customization packages from the Deluxe Hero's Handbook.
 */

import { ARCHETYPES } from './archetypes.js';

export const ARCHETYPE_CUSTOMIZATION_OPTIONS = {
  battlesuit: {
    specializations: [
      {
        id: 'energy_blaster',
        name: 'Energy Blaster Suit',
        desc: 'Gauntlet particle blasters with repulsor cone and high-altitude jet thrusters.',
        attackDescriptor: 'Energy, Particle Beams',
        extraPowers: [
          { name: 'Gauntlet Particle Blaster', rank: 10, effectId: 'blast', range: 'Ranged' },
          { name: 'Repulsor Wave Cone', rank: 10, effectId: 'damage', range: 'Close', extra: 'Area (Cone)' }
        ],
        skillFocus: 'Engineering & Technology (+8)'
      },
      {
        id: 'heavy_artillery',
        name: 'Heavy Assault & Micro-Missiles',
        desc: 'Hardened composite plating, hydraulic strength boosters, and micro-missile cluster pods.',
        attackDescriptor: 'Ballistic, Explosive',
        extraPowers: [
          { name: 'Micro-Missile Barrage', rank: 10, effectId: 'blast', range: 'Ranged', extra: 'Multiattack' },
          { name: 'Hydraulic Titan Punch', rank: 10, effectId: 'damage', range: 'Close', extra: 'Penetrating' }
        ],
        skillFocus: 'Heavy Weapons & Tactics (+8)'
      },
      {
        id: 'stealth_infiltration',
        name: 'Chameleon Stealth Infiltrator',
        desc: 'Optical bending stealth cloak, sensor dampeners, and silent electromagnetic thrusters.',
        attackDescriptor: 'Laser, Piercing',
        extraPowers: [
          { name: 'Chameleon Cloak (Concealment)', rank: 4, effectId: 'concealment', range: 'Personal' },
          { name: 'Silent Pulse Laser', rank: 10, effectId: 'blast', range: 'Ranged', extra: 'Subtle' }
        ],
        skillFocus: 'Stealth & Hacking (+8)'
      }
    ],
    complications: [
      { type: 'Identity', name: 'Secret Industrialist Identity', desc: 'Must manage corporate empire while concealing superhero double life.' },
      { type: 'Power Loss', name: 'Battery Depletion / EMP', desc: 'Suit systems can be disabled or drained by EMP weapons and high voltage.' },
      { type: 'Responsibility', name: 'Corporate Nemesis', desc: 'Rival defense contractor constantly attempts to steal armor schematics.' }
    ]
  },
  martial_artist: {
    specializations: [
      {
        id: 'chi_unarmed',
        name: 'Chi Master / Unarmed Kung Fu',
        desc: 'Lightning-fast unarmed flurry of blows and deadly nerve pressure points.',
        attackDescriptor: 'Chi, Bludgeoning',
        extraPowers: [
          { name: 'Flurry of Blows', rank: 5, effectId: 'damage', range: 'Close', extra: 'Multiattack' },
          { name: 'Dim Mak: Pressure Points', rank: 6, effectId: 'affliction', range: 'Close' }
        ],
        skillFocus: 'Acrobatics & Insight'
      },
      {
        id: 'weapon_master',
        name: 'Blade Master / Ninja Shinobi',
        desc: 'Mastery of twin katanas, throwing shuriken, and vanishing smoke bombs.',
        attackDescriptor: 'Slashing, Steel',
        extraPowers: [
          { name: 'Twin Katana Strike', rank: 6, effectId: 'damage', range: 'Close', extra: 'Penetrating' },
          { name: 'Shuriken Flurry', rank: 4, effectId: 'blast', range: 'Ranged', extra: 'Multiattack' }
        ],
        skillFocus: 'Stealth & Athletics'
      },
      {
        id: 'grappler',
        name: 'Judo & Submission Wrestler',
        desc: 'Unbreakable bone-locks, crushing throws, and submission chokeholds.',
        attackDescriptor: 'Wrestling, Joint Locks',
        extraPowers: [
          { name: 'Bone Crushing Grab', rank: 6, effectId: 'damage', range: 'Close', extra: 'Grab-Based' },
          { name: 'Paralyzing Nerve Lock', rank: 6, effectId: 'affliction', range: 'Close' }
        ],
        skillFocus: 'Athletics & Intimidation'
      }
    ],
    complications: [
      { type: 'Honor', name: 'Warrior Code of Bushido', desc: 'Refuses to attack unarmed, defenseless, or retreating opponents.' },
      { type: 'Rivalry', name: 'Rival Combat School', desc: 'Vengeful martial master seeks to defeat you in public combat.' }
    ]
  },
  mystic: {
    specializations: [
      {
        id: 'sorcerer_supreme',
        name: 'Eldritch Sorcerer (Dimensional Magic)',
        desc: 'Mystic blasts, glowing eldritch shields, and the Crimson Bands of Cyttorak.',
        attackDescriptor: 'Magic, Eldritch Force',
        extraPowers: [
          { name: 'Mystic Bolt', rank: 10, effectId: 'blast', range: 'Ranged' },
          { name: 'Crimson Bands Snare', rank: 10, effectId: 'affliction', range: 'Ranged', extra: 'Cumulative' }
        ],
        skillFocus: 'Expertise: Magic (+12)'
      },
      {
        id: 'elemental_shaman',
        name: 'Elemental Shaman (Nature Spirits)',
        desc: 'Channels primal elements of fire, glacial frost, lightning, and earthen stone.',
        attackDescriptor: 'Primal, Elemental',
        extraPowers: [
          { name: 'Elemental Arc Blast', rank: 10, effectId: 'blast', range: 'Ranged', extra: 'Variable Descriptor' },
          { name: 'Earth Wall Barrier', rank: 10, effectId: 'create', range: 'Ranged' }
        ],
        skillFocus: 'Expertise: Shamanism & Insight'
      },
      {
        id: 'enchanter_occultist',
        name: 'Occult Illusionist & Enchanter',
        desc: 'Mesmerizing illusions, telepathic suggestions, and astral projection.',
        attackDescriptor: 'Psychic, Glamour',
        extraPowers: [
          { name: 'Sensory Phantasm (Illusion)', rank: 10, effectId: 'illusion', range: 'Perception' },
          { name: 'Mesmerizing Hypnosis', rank: 10, effectId: 'affliction', range: 'Perception' }
        ],
        skillFocus: 'Deception & Persuasion'
      }
    ],
    complications: [
      { type: 'Responsibility', name: 'Oath of the Sanctum', desc: 'Bound by ancient oaths to defend reality from extradimensional horrors.' },
      { type: 'Power Loss', name: 'Somatic & Vocal Gestures', desc: 'Cannot invoke spells if gagged or hands are tightly bound.' }
    ]
  },
  paragon: {
    specializations: [
      {
        id: 'solar_heat_vision',
        name: 'Solar Heat Vision & Flight',
        desc: 'Searing solar beams projected from eyes, supersonic flight, and invulnerability.',
        attackDescriptor: 'Solar, Thermal, Radiation',
        extraPowers: [
          { name: 'Solar Heat Vision', rank: 10, effectId: 'blast', range: 'Ranged' },
          { name: 'Supersonic Flight', rank: 8, effectId: 'flight', range: 'Personal' }
        ],
        skillFocus: 'Perception & Ranged Combat'
      },
      {
        id: 'shockwave_brawler',
        name: 'Thunderclap & Seismic Shockwave',
        desc: 'Concussive groundstrike shockwaves and thunderous sonic claps that shatter barriers.',
        attackDescriptor: 'Sonic, Kinetic, Shockwave',
        extraPowers: [
          { name: 'Thunderclap Shockwave', rank: 10, effectId: 'damage', range: 'Close', extra: 'Area (Burst)' },
          { name: 'Super-Leap & Power Stomp', rank: 10, effectId: 'leaping', range: 'Personal' }
        ],
        skillFocus: 'Athletics & Intimidation'
      },
      {
        id: 'super_breath',
        name: 'Arctic Super-Breath & Cyclone',
        desc: 'Freezing gale breath that encases targets in solid ice or blows vehicles away.',
        attackDescriptor: 'Cold, Glacial, Wind',
        extraPowers: [
          { name: 'Arctic Breath Snare', rank: 10, effectId: 'affliction', range: 'Close', extra: 'Area (Cone)' },
          { name: 'Hurricane Exhalation', rank: 10, effectId: 'move_object', range: 'Close', extra: 'Area (Cone)' }
        ],
        skillFocus: 'Insight & Persuasion'
      }
    ],
    complications: [
      { type: 'Weakness', name: 'Radiant Alien Mineral', desc: 'Loses powers and suffers debilitating agony in the presence of rare mineral.' },
      { type: 'Responsibility', name: 'Symbol of Hope', desc: 'Public expects you to be an incorruptible champion and save everyone.' }
    ]
  },
  speedster: {
    specializations: [
      {
        id: 'kinetic_barrage',
        name: 'Rapid Multiattack Barrage',
        desc: 'Pummels targets with hundreds of punches in a single second.',
        attackDescriptor: 'Kinetic, Velocity',
        extraPowers: [
          { name: 'Rapid Punch Flurry', rank: 7, effectId: 'damage', range: 'Close', extra: 'Multiattack' },
          { name: 'Super-Speed Running', rank: 10, effectId: 'speed', range: 'Personal' }
        ],
        skillFocus: 'Close Combat: Unarmed & Acrobatics'
      },
      {
        id: 'cyclone_vortex',
        name: 'Cyclone Vortex Generator',
        desc: 'Spins arms into hurricane-force vortices to knock down groups and extinguish fires.',
        attackDescriptor: 'Vortex, Air, Concussive',
        extraPowers: [
          { name: 'Cyclone Vortex Affliction', rank: 8, effectId: 'affliction', range: 'Close', extra: 'Area (Burst)' },
          { name: 'Vortex Air Cushion (Safe Fall)', rank: 5, effectId: 'flight', range: 'Personal' }
        ],
        skillFocus: 'Technology & Science'
      },
      {
        id: 'molecular_phase',
        name: 'Quantum Molecular Phase',
        desc: 'Vibrates molecular structure to pass harmlessly through solid walls and doors.',
        attackDescriptor: 'Quantum, Molecular',
        extraPowers: [
          { name: 'Molecular Vibration (Insubstantial)', rank: 4, effectId: 'insubstantial', range: 'Personal' },
          { name: 'Vibration Disruption Strike', rank: 8, effectId: 'damage', range: 'Close', extra: 'Penetrating' }
        ],
        skillFocus: 'Perception & Stealth'
      }
    ],
    complications: [
      { type: 'Quirk', name: 'Hyper-Metabolism', desc: 'Must consume massive amounts of food daily or suffer exhaustion.' },
      { type: 'Accident', name: 'Sonic Collateral Damage', desc: 'Breaking sound barrier in city streets can shatter windows.' }
    ]
  },
  crime_fighter: {
    specializations: [
      {
        id: 'gadgeteer_detective',
        name: 'Detective & Utility Belt Gadgeteer',
        desc: 'Master of forensics, equipped with batarangs, smoke pellets, flashbangs, and grapple line.',
        attackDescriptor: 'Bludgeoning, Gadgets',
        extraPowers: [],
        skillFocus: 'Investigation (+10) & Stealth (+8)'
      },
      {
        id: 'street_brawler',
        name: 'Gritty Street Brawler',
        desc: 'Armored leather jacket, brass knuckles, heavy intimidation, and brutal melee counters.',
        attackDescriptor: 'Street Fighting, Dirty Tricks',
        extraPowers: [],
        skillFocus: 'Intimidation (+10) & Close Combat (+10)'
      },
      {
        id: 'covert_sniper',
        name: 'Covert Tactical Marksman',
        desc: 'Silenced high-powered rifle, flash suppressors, night-vision cowl, and tactical traps.',
        attackDescriptor: 'Ballistic, Piercing',
        extraPowers: [],
        skillFocus: 'Ranged Combat (+10) & Stealth (+10)'
      }
    ],
    complications: [
      { type: 'Motivation', name: 'Dark Justice Vow', desc: 'Driven by personal tragedy to eradicate corruption.' },
      { type: 'Enemy', name: 'Rogues Gallery', desc: 'Targeted by psychotic supervillains and crime syndicates.' }
    ]
  },
  energy_controller: {
    specializations: [
      {
        id: 'fire_controller',
        name: 'Fire / Pyrokinesis',
        desc: 'Searing fire bolts, flaming aura, explosive fireballs, and thermal rocket flight.',
        attackDescriptor: 'Fire, Plasma, Heat',
        extraPowers: [
          { name: 'Fire Blast', rank: 10, effectId: 'blast', range: 'Ranged' },
          { name: 'Fireball Detonation', rank: 10, effectId: 'damage', range: 'Close', extra: 'Area (Burst)' }
        ],
        skillFocus: 'Ranged Combat & Intimidation'
      },
      {
        id: 'electric_controller',
        name: 'Electricity / Electrokinesis',
        desc: 'Arc lightning bolts, EMP short circuits, taser stun affliction, and magnetic gliding.',
        attackDescriptor: 'Electricity, Lightning',
        extraPowers: [
          { name: 'Arc Lightning Bolt', rank: 10, effectId: 'blast', range: 'Ranged' },
          { name: 'Taser Stun Shock', rank: 10, effectId: 'affliction', range: 'Ranged' }
        ],
        skillFocus: 'Technology & Perception'
      },
      {
        id: 'ice_controller',
        name: 'Cryokinesis / Cold',
        desc: 'Glacial freeze rays, ice slide movement, protective ice armor, and flash-freeze snares.',
        attackDescriptor: 'Cold, Ice, Frost',
        extraPowers: [
          { name: 'Freeze Ray', rank: 10, effectId: 'blast', range: 'Ranged' },
          { name: 'Glacial Entombment', rank: 10, effectId: 'affliction', range: 'Ranged', extra: 'Cumulative' }
        ],
        skillFocus: 'Insight & Acrobatics'
      }
    ],
    complications: [
      { type: 'Accident', name: 'Elemental Flare-Up', desc: 'Strong emotional distress causes power arcs to ignite nearby objects.' },
      { type: 'Identity', name: 'Conspicuous Energy Glow', desc: 'Eyes or skin glow brightly when emotionally charged.' }
    ]
  },
  powerhouse: {
    specializations: [
      {
        id: 'gamma_monster',
        name: 'Colossal Gamma Behemoth',
        desc: 'Massive brute strength, seismic groundstrike, and bulletproof armored hide.',
        attackDescriptor: 'Bludgeoning, Tremor',
        extraPowers: [
          { name: 'Groundstrike Earthquake', rank: 10, effectId: 'affliction', range: 'Close', extra: 'Area (Burst)' },
          { name: 'Colossal Leap', rank: 10, effectId: 'leaping', range: 'Personal' }
        ],
        skillFocus: 'Intimidation & Athletics'
      },
      {
        id: 'cyber_titan',
        name: 'Cybernetic Juggernaut',
        desc: 'Titanium alloy endoskeleton, hydraulic pile-driver punches, and shock resistance.',
        attackDescriptor: 'Technology, Heavy Impact',
        extraPowers: [
          { name: 'Pile-Driver Punch', rank: 10, effectId: 'damage', range: 'Close', extra: 'Penetrating' },
          { name: 'Seismic Shockwave', rank: 8, effectId: 'damage', range: 'Close', extra: 'Area (Cone)' }
        ],
        skillFocus: 'Technology & Athletics'
      }
    ],
    complications: [
      { type: 'Prejudice', name: 'Monstrous Appearance', desc: 'Feared and distrusted by authorities and ordinary citizens.' },
      { type: 'Temper', name: 'Berserk Fury', desc: 'Damage or insults can trigger uncontrollable destructive rage.' }
    ]
  },
  psychic: {
    specializations: [
      {
        id: 'telepath_master',
        name: 'Master Telepath',
        desc: 'Mental blasts resisting Will, thought-reading, and telepathic mind control.',
        attackDescriptor: 'Psionic, Mental',
        extraPowers: [
          { name: 'Mental Blast (Resisted by Will)', rank: 10, effectId: 'damage', range: 'Perception' },
          { name: 'Mind Probe & Telepathy', rank: 10, effectId: 'mind_reading', range: 'Perception' }
        ],
        skillFocus: 'Insight & Perception'
      },
      {
        id: 'telekinesis_master',
        name: 'Master Telekinetic',
        desc: 'Lifts up to 25 tons with the mind, forms invisible force barriers, and telekinetic battering rams.',
        attackDescriptor: 'Psionic, Force',
        extraPowers: [
          { name: 'Telekinetic Battering Ram', rank: 10, effectId: 'blast', range: 'Ranged' },
          { name: 'Telekinetic Shield', rank: 10, effectId: 'protection', range: 'Personal' }
        ],
        skillFocus: 'Investigation & Technology'
      }
    ],
    complications: [
      { type: 'Headaches', name: 'Psionic Sensory Overload', desc: 'Crowds or psychic shielding trigger debilitating headaches.' },
      { type: 'Secret', name: 'Awakened Meta-Gene', desc: 'Hunted by covert government task forces seeking psionic weapons.' }
    ]
  },
  shapeshifter: {
    specializations: [
      {
        id: 'predator_beast',
        name: 'Predatory Hunter (Feline / Canine)',
        desc: 'Razor claws, piercing fangs, scent tracking, and lightning-fast predatory leaps.',
        attackDescriptor: 'Biological, Slashing',
        extraPowers: [
          { name: 'Predatory Claws', rank: 6, effectId: 'damage', range: 'Close', extra: 'Penetrating' },
          { name: 'Beast Morphing', rank: 5, effectId: 'morph', range: 'Personal' }
        ],
        skillFocus: 'Stealth & Perception'
      },
      {
        id: 'avian_stalker',
        name: 'Avian Aerial Hunter',
        desc: 'Wings of an eagle, aerial dive-bomb talons, ultra-sharp vision, and high-altitude flight.',
        attackDescriptor: 'Aerial, Piercing',
        extraPowers: [
          { name: 'Winged Flight', rank: 6, effectId: 'flight', range: 'Personal' },
          { name: 'Aerial Talon Rake', rank: 6, effectId: 'damage', range: 'Close' }
        ],
        skillFocus: 'Acrobatics & Perception'
      }
    ],
    complications: [
      { type: 'Instinct', name: 'Feral Urges', desc: 'Predatory instincts take over during stressful or combat encounters.' },
      { type: 'Identity', name: 'Bestial Features', desc: 'Retains visible animalistic eyes, fangs, or slit pupils in human form.' }
    ]
  }
};

/**
 * Builds an interactive customized character from an archetype and user choices.
 */
export function buildCustomizedArchetype(archetypeId, heroName, specializationId, complicationChoice) {
  const baseArch = ARCHETYPES.find(a => a.id === archetypeId);
  if (!baseArch) throw new Error('Archetype not found');

  const char = JSON.parse(JSON.stringify(baseArch));
  char.id = 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
  char.name = heroName || baseArch.name;
  char.playerName = 'Player';
  char.campaign = 'Earth-Prime';
  char.heroPoints = 1;
  char.bruises = 0;
  char.conditions = { dazed: false, staggered: false, defenseless: false, vulnerable: false };

  const customInfo = ARCHETYPE_CUSTOMIZATION_OPTIONS[archetypeId];
  if (customInfo && specializationId) {
    const spec = customInfo.specializations.find(s => s.id === specializationId);
    if (spec) {
      char.concept = `${spec.name} - ${spec.desc}`;
      if (char.powers && char.powers.length > 0) {
        char.powers[0].descriptor = spec.attackDescriptor || char.powers[0].descriptor;
      }
    }
  }

  if (complicationChoice) {
    if (!char.complications) char.complications = [];
    char.complications.unshift(complicationChoice);
  }

  return char;
}
