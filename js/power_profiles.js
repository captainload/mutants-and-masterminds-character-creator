/**
 * Mutants & Masterminds 3E Official Power Profiles
 * Pre-configured power archetypes and profiles from Green Ronin rules and supplements.
 */

export const POWER_PROFILES_LIBRARY = [
  {
    category: 'Armor Powers',
    profiles: [
      {
        id: 'prof_armor_plating',
        name: 'Armor Plating (Impervious Protection)',
        rank: 10,
        effectId: 'protection',
        action: 'None',
        range: 'Personal',
        duration: 'Permanent',
        descriptor: 'Technology, Ballistic Armor',
        extras: [{ id: 'impervious', rank: 10, cost: 1, isFlat: false }],
        flaws: [{ id: 'removable', rank: 1, cost: 0, isFlat: false, isDevice: true }],
        notes: 'Reinforced ballistic composite plating. Impervious Toughness ignores ranks 5 or below.'
      },
      {
        id: 'prof_armor_exoskeleton',
        name: 'Powered Exoskeleton (Hydraulic Servos)',
        rank: 8,
        effectId: 'enhanced_trait',
        action: 'Free',
        range: 'Personal',
        duration: 'Sustained',
        descriptor: 'Technology, Cybernetics',
        extras: [],
        flaws: [{ id: 'removable', rank: 1, cost: 0, isFlat: false, isDevice: true }],
        notes: 'Hydraulic servomotors granting +8 Strength (Enhanced Trait: STR).'
      },
      {
        id: 'prof_armor_jets',
        name: 'Thruster Jetpack (Flight)',
        rank: 7,
        effectId: 'flight',
        action: 'Free',
        range: 'Personal',
        duration: 'Sustained',
        descriptor: 'Technology, Propulsion',
        extras: [],
        flaws: [{ id: 'removable', rank: 1, cost: 0, isFlat: false, isDevice: true }],
        notes: 'Turbine or ion thrust boots providing 250 MPH atmospheric flight.'
      }
    ]
  },
  {
    category: 'Fire & Thermal Powers',
    profiles: [
      {
        id: 'prof_fire_blast',
        name: 'Fire Blast (Thermal Ray)',
        rank: 10,
        effectId: 'blast',
        action: 'Standard',
        range: 'Ranged',
        duration: 'Instant',
        descriptor: 'Fire, Heat, Plasma',
        extras: [{ id: 'secondary_effect', rank: 10, cost: 1, isFlat: false }],
        flaws: [],
        notes: 'Searing concentrated fire bolt. Secondary Effect inflicts heat damage again on the next round.'
      },
      {
        id: 'prof_fire_eruption',
        name: 'Fire Eruption (Area Burst Damage)',
        rank: 10,
        effectId: 'damage',
        action: 'Standard',
        range: 'Close',
        duration: 'Instant',
        descriptor: 'Fire, Explosion',
        extras: [{ id: 'area_burst', rank: 10, cost: 1, isFlat: false }],
        flaws: [],
        notes: 'Spherical fireball detonation affecting everything in 30ft radius (Dodge check DC 20 for half).'
      },
      {
        id: 'prof_fire_aura',
        name: 'Flame Aura (Reaction Damage)',
        rank: 6,
        effectId: 'damage',
        action: 'Reaction',
        range: 'Close',
        duration: 'Instant',
        descriptor: 'Fire, Thermal',
        extras: [{ id: 'reaction', rank: 6, cost: 3, isFlat: false }],
        flaws: [],
        notes: 'Body erupts in intense plasma flames, dealing Damage 6 automatically to anyone who touches or grabs you.'
      }
    ]
  },
  {
    category: 'Kinetic & Force Powers',
    profiles: [
      {
        id: 'prof_kinetic_blast',
        name: 'Kinetic Shockwave Blast',
        rank: 10,
        effectId: 'blast',
        action: 'Standard',
        range: 'Ranged',
        duration: 'Instant',
        descriptor: 'Kinetic, Impact',
        extras: [{ id: 'penetrating', rank: 5, cost: 1, isFlat: false }],
        flaws: [],
        notes: 'High-velocity concussive slug penetrating physical barriers.'
      },
      {
        id: 'prof_kinetic_shield',
        name: 'Kinetic Force Field (Protection)',
        rank: 10,
        effectId: 'protection',
        action: 'Free',
        range: 'Personal',
        duration: 'Sustained',
        descriptor: 'Force, Kinetic',
        extras: [
          { id: 'impervious', rank: 10, cost: 1, isFlat: false }
        ],
        flaws: [{ id: 'sustained', rank: 1, cost: 1, isFlat: false }],
        notes: 'Repulsive momentum shield absorbing incoming physical blows.'
      },
      {
        id: 'prof_telekinesis',
        name: 'Telekinetic Grip (Move Object)',
        rank: 10,
        effectId: 'move_object',
        action: 'Standard',
        range: 'Ranged',
        duration: 'Sustained',
        descriptor: 'Psionic, Force',
        extras: [{ id: 'precise', rank: 1, cost: 1, isFlat: true }],
        flaws: [],
        notes: 'Manipulates physical objects at distance (up to 25 tons) with fine motor control.'
      }
    ]
  },
  {
    category: 'Mental & Telepathic Powers',
    profiles: [
      {
        id: 'prof_mental_blast',
        name: 'Mental Blast (Resisted by Will)',
        rank: 10,
        effectId: 'damage',
        action: 'Standard',
        range: 'Perception',
        duration: 'Instant',
        descriptor: 'Psionic, Mental',
        extras: [
          { id: 'increased_range_2', cost: 2, isFlat: false },
          { id: 'alternate_resistance', cost: 1, isFlat: false }
        ],
        flaws: [],
        notes: 'Perception range psychic stroke directly attacking victim neural pathways (Resisted by Will DC 25, no attack check required).'
      },
      {
        id: 'prof_mind_reading',
        name: 'Telepathic Probe (Mind Reading)',
        rank: 10,
        effectId: 'mind_reading',
        action: 'Standard',
        range: 'Perception',
        duration: 'Sustained',
        descriptor: 'Psionic, Telepathy',
        extras: [{ id: 'cumulative', cost: 1, isFlat: false }],
        flaws: [],
        notes: 'Probes surface thoughts, deep memories, and hidden secrets (Resisted by Will).'
      },
      {
        id: 'prof_mind_control',
        name: 'Psychic Domination (Affliction)',
        rank: 10,
        effectId: 'affliction',
        action: 'Standard',
        range: 'Perception',
        duration: 'Instant',
        descriptor: 'Psionic, Mind Control',
        extras: [
          { id: 'increased_range_2', cost: 2, isFlat: false },
          { id: 'cumulative', cost: 1, isFlat: false }
        ],
        flaws: [],
        notes: 'Resisted by Will: Dazed / Compelled / Controlled.'
      }
    ]
  },
  {
    category: 'Speed & Time Powers',
    profiles: [
      {
        id: 'prof_speed_sprint',
        name: 'Hyper-Velocity Running',
        rank: 12,
        effectId: 'speed',
        action: 'Free',
        range: 'Personal',
        duration: 'Sustained',
        descriptor: 'Speed Force, Kinetic',
        extras: [],
        flaws: [],
        notes: 'Runs at 8,000 MPH (16 miles per round). Can traverse water and vertical surfaces.'
      },
      {
        id: 'prof_speed_rapid_flurry',
        name: 'Hundred-Hand Flurry (Multiattack)',
        rank: 8,
        effectId: 'damage',
        action: 'Standard',
        range: 'Close',
        duration: 'Instant',
        descriptor: 'Kinetic, Bludgeoning',
        extras: [{ id: 'multiattack', cost: 1, isFlat: false }],
        flaws: [],
        notes: 'Unleashes dozens of punches in a fraction of a second (+2 or +5 damage on high attack rolls).'
      },
      {
        id: 'prof_speed_whirlwind',
        name: 'Vortex Whirlwind (Area Affliction)',
        rank: 8,
        effectId: 'affliction',
        action: 'Standard',
        range: 'Close',
        duration: 'Instant',
        descriptor: 'Air, Vortex',
        extras: [{ id: 'area_burst', cost: 1, isFlat: false }],
        flaws: [],
        notes: 'Spins arms into miniature hurricane knocking all foes prone in 30ft radius (Resisted by Dodge).'
      }
    ]
  },
  {
    category: 'Weather & Lightning Powers',
    profiles: [
      {
        id: 'prof_lightning_bolt',
        name: 'Lightning Bolt (Ranged Damage)',
        rank: 10,
        effectId: 'blast',
        action: 'Standard',
        range: 'Ranged',
        duration: 'Instant',
        descriptor: 'Electricity, Lightning',
        extras: [{ id: 'accurate', rank: 1, cost: 1, isFlat: true }],
        flaws: [],
        notes: 'Forked bolt of high-voltage arc electricity (+2 to attack check).'
      },
      {
        id: 'prof_thunderclap',
        name: 'Thunderclap (Dazzle Burst Affliction)',
        rank: 10,
        effectId: 'affliction',
        action: 'Standard',
        range: 'Close',
        duration: 'Instant',
        descriptor: 'Sonic, Concussive',
        extras: [{ id: 'area_burst', cost: 1, isFlat: false }],
        flaws: [],
        notes: 'Deafening sonic burst: Impaired / Disabled / Unaware (Hearing), Resisted by Fortitude.'
      }
    ]
  },
  {
    category: 'Morphic & Animal Powers',
    profiles: [
      {
        id: 'prof_animal_morph',
        name: 'Faunal Metamorphosis (Morph)',
        rank: 5,
        effectId: 'morph',
        action: 'Free',
        range: 'Personal',
        duration: 'Sustained',
        descriptor: 'Biological, Morphic',
        extras: [],
        flaws: [{ id: 'limited', cost: 1, isFlat: false }],
        notes: 'Assume the physical shape and traits of any beast, predator, or avian species.'
      },
      {
        id: 'prof_predator_claws',
        name: 'Razor Claws (Slashing Damage)',
        rank: 6,
        effectId: 'damage',
        action: 'Standard',
        range: 'Close',
        duration: 'Instant',
        descriptor: 'Biological, Slashing',
        extras: [
          { id: 'penetrating', cost: 1, isFlat: false },
          { id: 'improved_critical', rank: 1, cost: 1, isFlat: true }
        ],
        flaws: [],
        notes: 'Hardened chitinous or adamantine claws with expanded critical threat range (19-20).'
      }
    ]
  }
];
