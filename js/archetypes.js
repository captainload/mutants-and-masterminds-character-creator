/**
 * Official & Quickstart Archetypes for Mutants & Masterminds 3rd Edition
 * Fully calculated and compliant with PL 10 (150 PP) standards and caps.
 */

export const ARCHETYPES = [
  {
    id: 'battlesuit',
    name: 'Battlesuit',
    tagline: 'High-tech armored hero equipped with repulsor blasts, flight systems, and life support.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Genius inventor or pilot inside an advanced powered exoskeleton armor suit.',
    abilities: {
      str: 1, // Boosted to 10 by suit servos
      sta: 1,
      agi: 1,
      dex: 2,
      fgt: 4,
      int: 6,
      awe: 2,
      pre: 0
    },
    defenses: {
      dodge: 7, // Total 8 with Agi 1
      parry: 4, // Total 8 with Fgt 4
      fortitude: 6, // Total 7 with Sta 1
      toughness: 0, // Gets +11 from Armor (Protection 11) + Sta 1 = Toughness 12
      will: 6  // Total 8 with Awe 2
    },
    skills: [
      { id: 'close_combat', name: 'Close Combat', specialty: 'Unarmed', ranks: 2 },
      { id: 'expertise', name: 'Expertise', specialty: 'Engineering', ranks: 6 },
      { id: 'expertise', name: 'Expertise', specialty: 'Science', ranks: 3 },
      { id: 'insight', name: 'Insight', ranks: 4 },
      { id: 'investigation', name: 'Investigation', ranks: 4 },
      { id: 'perception', name: 'Perception', ranks: 4 },
      { id: 'ranged_combat', name: 'Ranged Combat', specialty: 'Battlesuit Blasters', ranks: 6 },
      { id: 'technology', name: 'Technology', ranks: 5 }
    ],
    advantages: [
      { id: 'eidetic_memory', name: 'Eidetic Memory', rank: 1 },
      { id: 'inventor', name: 'Inventor', rank: 1 },
      { id: 'improved_initiative', name: 'Improved Initiative', rank: 1 },
      { id: 'ranged_attack', name: 'Ranged Attack', rank: 2 }
    ],
    powers: [
      {
        id: 'p_suit_armor',
        name: 'Battlesuit Armor Plating',
        descriptor: 'Technology, Armor',
        rank: 11,
        effect: { id: 'protection', name: 'Protection', baseCost: 1 },
        extras: [
          { id: 'impervious', cost: 1, isFlat: false }
        ],
        flaws: [
          { id: 'removable', cost: 0, isFlat: false, isDevice: true }
        ],
        notes: 'Reinforced titanium-alloy body armor. Impervious Toughness 11.'
      },
      {
        id: 'p_suit_enhanced_str',
        name: 'Hydraulic Servos (Enhanced STR)',
        descriptor: 'Technology, Cybernetics',
        rank: 9,
        effect: { id: 'enhanced_trait', name: 'Enhanced Trait', baseCost: 2 },
        extras: [],
        flaws: [
          { id: 'removable', cost: 0, isFlat: false, isDevice: true }
        ],
        notes: 'Grants +9 Strength (effective STR 10, lifting 25 tons).'
      },
      {
        id: 'p_suit_flight',
        name: 'Jet Thrusters (Flight)',
        descriptor: 'Technology, Propulsion',
        rank: 6,
        effect: { id: 'flight', name: 'Flight', baseCost: 2 },
        extras: [],
        flaws: [
          { id: 'removable', cost: 0, isFlat: false, isDevice: true }
        ],
        notes: 'High-speed boot jets (120 MPH).'
      },
      {
        id: 'p_suit_life_support',
        name: 'Sealed Life Support System',
        descriptor: 'Technology, Environmental',
        rank: 10,
        effect: { id: 'immunity', name: 'Immunity', baseCost: 1 },
        extras: [],
        flaws: [
          { id: 'removable', cost: 0, isFlat: false, isDevice: true }
        ],
        notes: 'Immune to all environmental hazards, suffocation, poison, radiation.'
      },
      {
        id: 'p_suit_blasters',
        name: 'Particle Blasters',
        descriptor: 'Technology, Energy',
        rank: 10,
        effect: { id: 'blast', name: 'Ranged Damage', baseCost: 2 },
        extras: [],
        flaws: [
          { id: 'removable', cost: 0, isFlat: false, isDevice: true }
        ],
        alternateEffects: [
          {
            id: 'ae_repulsor_cone',
            name: 'Repulsor Wave (Cone Damage)',
            rank: 10,
            effect: { id: 'damage', name: 'Damage', baseCost: 1 },
            extras: [{ id: 'area_cone', cost: 1, isFlat: false }],
            flaws: []
          }
        ],
        notes: 'Gauntlet mounted particle beams. Can switch to wide repulsor cone.'
      },
      {
        id: 'p_suit_sensors',
        name: 'Tactical Sensor Suite',
        descriptor: 'Technology, Sensors',
        rank: 3,
        effect: { id: 'senses', name: 'Senses', baseCost: 1 },
        extras: [],
        flaws: [
          { id: 'removable', cost: 0, isFlat: false, isDevice: true }
        ],
        notes: 'Darkvision, Radio communication, Direction Sense.'
      }
    ],
    gear: [],
    complications: [
      { type: 'Motivation', name: 'Doing Good / Responsibility', desc: 'Dedicated to using advanced technology to safeguard human lives.' },
      { type: 'Identity', name: 'Secret Identity', desc: 'Must hide civilian life as a high-profile engineer and executive.' },
      { type: 'Power Loss', name: 'Power Drain', desc: 'Batteries can be drained or disabled by EMP weapons.' }
    ]
  },
  {
    id: 'martial_artist',
    name: 'Martial Artist',
    tagline: 'Flawless physical perfection, blistering martial arts combos, and uncanny reflexes.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Disciplined warrior trained in ancient monasteries or secret combat schools.',
    abilities: {
      str: 3,
      sta: 3,
      agi: 7,
      dex: 4,
      fgt: 13,
      int: 2,
      awe: 4,
      pre: 2
    },
    defenses: {
      dodge: 6, // Total 13 with Agi 7
      parry: 0, // Total 13 with Fgt 13
      fortitude: 5, // Total 8 with Sta 3
      toughness: 0, // Total 7 with Sta 3 + Defensive Roll 4
      will: 6 // Total 10 with Awe 4
    },
    skills: [
      { id: 'acrobatics', name: 'Acrobatics', ranks: 8 },
      { id: 'athletics', name: 'Athletics', ranks: 6 },
      { id: 'close_combat', name: 'Close Combat', specialty: 'Unarmed', ranks: 2 },
      { id: 'insight', name: 'Insight', ranks: 6 },
      { id: 'intimidation', name: 'Intimidation', ranks: 4 },
      { id: 'investigation', name: 'Investigation', ranks: 4 },
      { id: 'perception', name: 'Perception', ranks: 6 },
      { id: 'stealth', name: 'Stealth', ranks: 6 }
    ],
    advantages: [
      { id: 'accurate_attack', name: 'Accurate Attack', rank: 1 },
      { id: 'agile_feint', name: 'Agile Feint', rank: 1 },
      { id: 'all_out_attack', name: 'All-out Attack', rank: 1 },
      { id: 'chokehold', name: 'Chokehold', rank: 1 },
      { id: 'defensive_attack', name: 'Defensive Attack', rank: 1 },
      { id: 'defensive_roll', name: 'Defensive Roll', rank: 4 },
      { id: 'improved_critical', name: 'Improved Critical', rank: 2, note: 'Unarmed Strikes (18-20)' },
      { id: 'improved_defense', name: 'Improved Defense', rank: 1 },
      { id: 'improved_disarm', name: 'Improved Disarm', rank: 1 },
      { id: 'improved_grab', name: 'Improved Grab', rank: 1 },
      { id: 'improved_initiative', name: 'Improved Initiative', rank: 2 },
      { id: 'instant_up', name: 'Instant Up', rank: 1 },
      { id: 'move_by_action', name: 'Move-by Action', rank: 1 },
      { id: 'power_attack', name: 'Power Attack', rank: 1 },
      { id: 'prone_fighting', name: 'Prone Fighting', rank: 1 },
      { id: 'quick_draw', name: 'Quick Draw', rank: 1 },
      { id: 'takedown', name: 'Takedown', rank: 2 },
      { id: 'uncanny_dodge', name: 'Uncanny Dodge', rank: 1 }
    ],
    powers: [
      {
        id: 'p_ma_flurry',
        name: 'Flurry of Blows (Damage)',
        descriptor: 'Chi, Training, Bludgeoning',
        rank: 4,
        effect: { id: 'damage', name: 'Damage', baseCost: 1 },
        extras: [
          { id: 'multiattack', cost: 1, isFlat: false }
        ],
        flaws: [],
        alternateEffects: [
          {
            id: 'ae_pressure_points',
            name: 'Pressure Points (Affliction)',
            rank: 6,
            effect: { id: 'affliction', name: 'Affliction', baseCost: 1 },
            extras: [
              { id: 'cumulative', cost: 1, isFlat: false }
            ],
            flaws: [],
            notes: 'Resisted by Fortitude: Dazed / Stunned / Incapacitated.'
          }
        ],
        notes: 'Combines with Strength damage for a total of Damage 7 Multiattack.'
      },
      {
        id: 'p_ma_leaping',
        name: 'Acrobatic Mastery (Leaping)',
        descriptor: 'Training, Physical',
        rank: 2,
        effect: { id: 'leaping', name: 'Leaping', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Can leap 30 feet effortlessly.'
      }
    ],
    gear: [],
    complications: [
      { type: 'Honor', name: 'Code of the Warrior', desc: 'Strict moral code refusing to strike an unarmed or defenseless foe.' },
      { type: 'Rivalry', name: 'Rival Martial School', desc: 'Former student turned villain seeks to prove their martial supremacy.' }
    ]
  },
  {
    id: 'mystic',
    name: 'Mystic',
    tagline: 'Wielder of cosmic spells, dimensional wards, and reality-bending sorcery.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Scholar of ancient tomes sworn to protect our realm from occult incursions.',
    abilities: {
      str: 0,
      sta: 1,
      agi: 1,
      dex: 2,
      fgt: 4,
      int: 6,
      awe: 8,
      pre: 4
    },
    defenses: {
      dodge: 7, // Total 8 with Agi 1
      parry: 4, // Total 8 with Fgt 4
      fortitude: 7, // Total 8 with Sta 1
      toughness: 0, // Total 12 with Mystic Shield (Protection 11) + Sta 1
      will: 4 // Total 12 with Awe 8
    },
    skills: [
      { id: 'expertise', name: 'Expertise', specialty: 'Magic', ranks: 12 },
      { id: 'insight', name: 'Insight', ranks: 6 },
      { id: 'investigation', name: 'Investigation', ranks: 6 },
      { id: 'perception', name: 'Perception', ranks: 6 },
      { id: 'persuasion', name: 'Persuasion', ranks: 4 },
      { id: 'ranged_combat', name: 'Ranged Combat', specialty: 'Spellcasting', ranks: 8 }
    ],
    advantages: [
      { id: 'artificer', name: 'Artificer', rank: 1 },
      { id: 'ritualist', name: 'Ritualist', rank: 1 },
      { id: 'trance', name: 'Trance', rank: 1 },
      { id: 'well_informed', name: 'Well-informed', rank: 1 }
    ],
    powers: [
      {
        id: 'p_mystic_shield',
        name: 'Mystic Ward (Protection)',
        descriptor: 'Magic, Abjuration',
        rank: 11,
        effect: { id: 'protection', name: 'Protection', baseCost: 1 },
        extras: [],
        flaws: [
          { id: 'sustained', cost: 1, isFlat: false }
        ],
        notes: 'Luminous eldritch shield that deflects bullets and magical curses.'
      },
      {
        id: 'p_mystic_spells',
        name: 'Sorcery: Mystic Blast',
        descriptor: 'Magic, Eldritch',
        rank: 10,
        effect: { id: 'blast', name: 'Ranged Damage', baseCost: 2 },
        extras: [
          { id: 'variable_descriptor', rank: 1, cost: 1, isFlat: true }
        ],
        flaws: [],
        alternateEffects: [
          {
            id: 'ae_mystic_binding',
            name: 'Crimson Bands of Cyttorak (Snare)',
            rank: 10,
            effect: { id: 'affliction', name: 'Affliction', baseCost: 1 },
            extras: [
              { id: 'increased_range', cost: 1, isFlat: false },
              { id: 'cumulative', cost: 1, isFlat: false }
            ],
            flaws: [],
            notes: 'Resisted by Dodge/Str: Hindered & Vulnerable / Defenseless & Immobilized.'
          },
          {
            id: 'ae_telekinesis',
            name: 'Levitating Force (Move Object)',
            rank: 10,
            effect: { id: 'move_object', name: 'Move Object', baseCost: 2 },
            extras: [],
            flaws: []
          }
        ],
        notes: 'Master spell array. Variable descriptor allows casting Fire, Cold, Lightning, or Arcane force.'
      },
      {
        id: 'p_mystic_flight',
        name: 'Levitation Spell (Flight)',
        descriptor: 'Magic',
        rank: 3,
        effect: { id: 'flight', name: 'Flight', baseCost: 2 },
        extras: [],
        flaws: [],
        notes: 'Floating through the air at 16 MPH.'
      },
      {
        id: 'p_mystic_senses',
        name: 'Third Eye (Magical Awareness)',
        descriptor: 'Magic, Divination',
        rank: 4,
        effect: { id: 'senses', name: 'Senses', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Detect Magic (Ranged, Radius, Acute, Analytical).'
      }
    ],
    gear: [],
    complications: [
      { type: 'Responsibility', name: 'Sorcerer Protector', desc: 'Bound by vow to repel demonic and extradimensional threats.' },
      { type: 'Power Loss', name: 'Incantation & Gestures', desc: 'Cannot cast spells if gagged or hands are tightly bound.' }
    ]
  },
  {
    id: 'paragon',
    name: 'Paragon',
    tagline: 'Super-strength, bulletproof invulnerability, supersonic flight, and heat vision.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Solar-powered alien champion or gene-enhanced paragon of human potential.',
    abilities: {
      str: 12,
      sta: 12,
      agi: 1,
      dex: 1,
      fgt: 8,
      int: -1,
      awe: 1,
      pre: 1
    },
    defenses: {
      dodge: 7, // Total 8 with Agi 1 (Dodge 8 + Toughness 12 = 20 Cap)
      parry: 0, // Total 8 with Fgt 8 (Parry 8 + Toughness 12 = 20 Cap)
      fortitude: 0, // Total 12 with Sta 12
      toughness: 0, // Total 12 with Sta 12
      will: 7 // Total 8 with Awe 1 (Fort 12 + Will 8 = 20 Cap)
    },
    skills: [
      { id: 'athletics', name: 'Athletics', ranks: 4 },
      { id: 'insight', name: 'Insight', ranks: 4 },
      { id: 'intimidation', name: 'Intimidation', ranks: 6 },
      { id: 'perception', name: 'Perception', ranks: 5 },
      { id: 'persuasion', name: 'Persuasion', ranks: 3 },
      { id: 'ranged_combat', name: 'Ranged Combat', specialty: 'Heat Vision', ranks: 8 }
    ],
    advantages: [
      { id: 'extraordinary_effort', name: 'Extraordinary Effort', rank: 1 },
      { id: 'interpose', name: 'Interpose', rank: 1 },
      { id: 'power_attack', name: 'Power Attack', rank: 1 },
      { id: 'ultimate_effort', name: 'Ultimate Effort', rank: 1, note: 'Toughness Saves' }
    ],
    powers: [
      {
        id: 'p_paragon_flight',
        name: 'Supersonic Flight',
        descriptor: 'Alien, Gravitational',
        rank: 8,
        effect: { id: 'flight', name: 'Flight', baseCost: 2 },
        extras: [],
        flaws: [],
        notes: 'Flight 8 (500 MPH).'
      },
      {
        id: 'p_paragon_heat_vision',
        name: 'Solar Heat Vision',
        descriptor: 'Solar, Thermal, Radiation',
        rank: 10,
        effect: { id: 'blast', name: 'Ranged Damage', baseCost: 2 },
        extras: [],
        flaws: [],
        alternateEffects: [
          {
            id: 'ae_shockwave',
            name: 'Thunderclap / Shockwave (Damage Burst)',
            rank: 10,
            effect: { id: 'damage', name: 'Damage', baseCost: 1 },
            extras: [
              { id: 'area_burst', cost: 1, isFlat: false }
            ],
            flaws: []
          }
        ],
        notes: 'Intense beam of solar radiation or concussive groundstrike.'
      },
      {
        id: 'p_paragon_life_support',
        name: 'Alien Physiology (Life Support)',
        descriptor: 'Alien, Biology',
        rank: 10,
        effect: { id: 'immunity', name: 'Immunity', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Immune to suffocation, extreme heat, extreme cold, vacuum, radiation, poison, disease.'
      }
    ],
    gear: [],
    complications: [
      { type: 'Weakness', name: 'Radiant Mineral', desc: 'Loses powers and suffers debilitating agony in the presence of rare alien mineral.' },
      { type: 'Responsibility', name: 'Symbol of Hope', desc: 'Expected to act as an unyielding paragon of morality and protector of all.' }
    ]
  },
  {
    id: 'speedster',
    name: 'Speedster',
    tagline: 'Fastest hero alive, defying the laws of velocity, friction, and reaction time.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Struck by charged lightning or mutated with kinetic speed force.',
    abilities: {
      str: 1,
      sta: 2,
      agi: 4,
      dex: 4,
      fgt: 8,
      int: 2,
      awe: 2,
      pre: 0
    },
    defenses: {
      dodge: 8, // Total 12 with Agi 4 (Dodge 12 + Toughness 8 = 20 Cap)
      parry: 4, // Total 12 with Fgt 8 (Parry 12 + Toughness 8 = 20 Cap)
      fortitude: 6, // Total 8 with Sta 2
      toughness: 0, // Total 8 with Sta 2 + Defensive Roll 6
      will: 8 // Total 10 with Awe 2
    },
    skills: [
      { id: 'acrobatics', name: 'Acrobatics', ranks: 8 },
      { id: 'athletics', name: 'Athletics', ranks: 4 },
      { id: 'close_combat', name: 'Close Combat', specialty: 'Unarmed', ranks: 4 },
      { id: 'insight', name: 'Insight', ranks: 4 },
      { id: 'perception', name: 'Perception', ranks: 6 },
      { id: 'technology', name: 'Technology', ranks: 4 }
    ],
    advantages: [
      { id: 'agile_feint', name: 'Agile Feint', rank: 1 },
      { id: 'defensive_roll', name: 'Defensive Roll', rank: 6 },
      { id: 'improved_initiative', name: 'Improved Initiative', rank: 3 },
      { id: 'instant_up', name: 'Instant Up', rank: 1 },
      { id: 'move_by_action', name: 'Move-by Action', rank: 1 },
      { id: 'seize_initiative', name: 'Seize Initiative', rank: 1 },
      { id: 'takedown', name: 'Takedown', rank: 2 },
      { id: 'uncanny_dodge', name: 'Uncanny Dodge', rank: 1 }
    ],
    powers: [
      {
        id: 'p_speed_running',
        name: 'Super-Speed (Hyper Velocity)',
        descriptor: 'Speed Force, Kinetic',
        rank: 10,
        effect: { id: 'speed', name: 'Speed', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Runs at 2,000 MPH (can run up vertical walls and across open water).'
      },
      {
        id: 'p_speed_quickness',
        name: 'Supercharged Quickness',
        descriptor: 'Speed Force, Temporal',
        rank: 6,
        effect: { id: 'quickness', name: 'Quickness', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Performs routine tasks 60 times faster than a human.'
      },
      {
        id: 'p_speed_rapid_attack',
        name: 'Rapid-Fire Punch Combo',
        descriptor: 'Kinetic, Bludgeoning',
        rank: 7,
        effect: { id: 'damage', name: 'Damage', baseCost: 1 },
        extras: [
          { id: 'multiattack', cost: 1, isFlat: false }
        ],
        flaws: [],
        alternateEffects: [
          {
            id: 'ae_whirlwind',
            name: 'Cyclone Whirlwind (Area Affliction)',
            rank: 7,
            effect: { id: 'affliction', name: 'Affliction', baseCost: 1 },
            extras: [
              { id: 'area_burst', cost: 1, isFlat: false }
            ],
            flaws: [],
            notes: 'Spins arms into hurricane winds: Hindered / Prone / Incapacitated.'
          }
        ],
        notes: 'Combines with Strength for 8 Damage Multiattack.'
      },
      {
        id: 'p_speed_vibration',
        name: 'Molecular Vibration (Insubstantial)',
        descriptor: 'Vibration, Quantum',
        rank: 4,
        effect: { id: 'insubstantial', name: 'Insubstantial', baseCost: 5 },
        extras: [],
        flaws: [
          { id: 'concentration', cost: 1, isFlat: false }
        ],
        notes: 'Vibrates molecules to phase through solid walls and doors.'
      }
    ],
    gear: [],
    complications: [
      { type: 'Quirk', name: 'Hyper Metabolism', desc: 'Must consume thousands of calories daily or suffer severe exhaustion.' },
      { type: 'Accident', name: 'Kinetic Shockwave', desc: 'High-speed maneuvers can accidentally shatter nearby windows and street furniture.' }
    ]
  },
  {
    id: 'crime_fighter',
    name: 'Crime Fighter',
    tagline: 'Peak human detective, martial arts vigilante, equipped with a customized utility belt.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Billionaire or gritty detective who turned personal tragedy into a crusade against crime.',
    abilities: {
      str: 3,
      sta: 3,
      agi: 4,
      dex: 4,
      fgt: 11,
      int: 6,
      awe: 4,
      pre: 3
    },
    defenses: {
      dodge: 7, // Total 11 with Agi 4 (Dodge 11 + Toughness 9 = 20 Cap)
      parry: 0, // Total 11 with Fgt 11 (Parry 11 + Toughness 9 = 20 Cap)
      fortitude: 5, // Total 8 with Sta 3
      toughness: 0, // Total 9 with Sta 3 + Defensive Roll 3 + Costume 3
      will: 6 // Total 10 with Awe 4 (Fort 8 + Will 10 = 18 <= 20)
    },
    skills: [
      { id: 'acrobatics', name: 'Acrobatics', ranks: 6 },
      { id: 'athletics', name: 'Athletics', ranks: 6 },
      { id: 'close_combat', name: 'Close Combat', specialty: 'Unarmed', ranks: 2 },
      { id: 'deception', name: 'Deception', ranks: 4 },
      { id: 'insight', name: 'Insight', ranks: 6 },
      { id: 'intimidation', name: 'Intimidation', ranks: 8 },
      { id: 'investigation', name: 'Investigation', ranks: 7 },
      { id: 'perception', name: 'Perception', ranks: 6 },
      { id: 'ranged_combat', name: 'Ranged Combat', specialty: 'Throwing Weapons', ranks: 7 },
      { id: 'stealth', name: 'Stealth', ranks: 7 },
      { id: 'technology', name: 'Technology', ranks: 5 },
      { id: 'vehicles', name: 'Vehicles', ranks: 4 }
    ],
    advantages: [
      { id: 'assessment', name: 'Assessment', rank: 1 },
      { id: 'benefit', name: 'Benefit (Billionaire)', rank: 2 },
      { id: 'contacts', name: 'Contacts', rank: 1 },
      { id: 'defensive_roll', name: 'Defensive Roll', rank: 3 },
      { id: 'equipment', name: 'Equipment', rank: 6 }, // 30 Equipment Points!
      { id: 'hide_in_plain_sight', name: 'Hide in Plain Sight', rank: 1 },
      { id: 'improved_initiative', name: 'Improved Initiative', rank: 1 },
      { id: 'jack_of_all_trades', name: 'Jack-of-all-trades', rank: 1 },
      { id: 'move_by_action', name: 'Move-by Action', rank: 1 },
      { id: 'power_attack', name: 'Power Attack', rank: 1 },
      { id: 'startle', name: 'Startle', rank: 1 },
      { id: 'takedown', name: 'Takedown', rank: 1 },
      { id: 'uncanny_dodge', name: 'Uncanny Dodge', rank: 1 },
      { id: 'well_informed', name: 'Well-informed', rank: 1 }
    ],
    powers: [],
    gear: [
      { name: 'Reinforced Armored Costume', cost: 3, desc: 'Protection 3, subtle kevlar weave' },
      { name: 'Batarangs / Boomerangs', cost: 6, desc: 'Ranged Damage 2, Multiattack' },
      { name: 'Smoke Bombs', cost: 4, desc: 'Cloud Area Visual Concealment Attack 2' },
      { name: 'Flash-Bangs', cost: 4, desc: 'Burst Area Dazzle Affliction 3 (Resisted by Fortitude)' },
      { name: 'Grapple Gun & Swing Line', cost: 3, desc: 'Movement 1 (Swinging), Movement 1 (Safe Fall)' },
      { name: 'Night Vision / Rebreather Cowl', cost: 3, desc: 'Senses 1 (Low-Light), Immunity 1 (Suffocation)' },
      { name: 'Tactical Supercar / Bike', cost: 7, desc: 'Armored pursuit vehicle with turbo thrusters' }
    ],
    complications: [
      { type: 'Justice', name: 'Dark Vow', desc: 'Relentless drive to punish crime and protect innocent citizens from corruption.' },
      { type: 'Enemy', name: 'Rogues Gallery', desc: 'Hounded by psychotic criminal masterminds and mob bosses.' }
    ]
  },
  {
    id: 'energy_controller',
    name: 'Energy Controller',
    tagline: 'Master of raw elemental force, channeling searing plasma or electric arcs.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Mutant or meta-human conduit of fire, lightning, or cosmic force.',
    abilities: {
      str: 0,
      sta: 2,
      agi: 3,
      dex: 4,
      fgt: 4,
      int: 1,
      awe: 2,
      pre: 2
    },
    defenses: {
      dodge: 6, // Total 9 with Agi 3 (Dodge 9 + Toughness 11 = 20 Cap)
      parry: 5, // Total 9 with Fgt 4 (Parry 9 + Toughness 11 = 20 Cap)
      fortitude: 6, // Total 8 with Sta 2 (Fort 8 + Will 10 = 18 <= 20)
      toughness: 0, // Total 11 with Force Field (Protection 9) + Sta 2
      will: 8 // Total 10 with Awe 2
    },
    skills: [
      { id: 'acrobatics', name: 'Acrobatics', ranks: 4 },
      { id: 'insight', name: 'Insight', ranks: 6 },
      { id: 'perception', name: 'Perception', ranks: 8 },
      { id: 'persuasion', name: 'Persuasion', ranks: 4 },
      { id: 'ranged_combat', name: 'Ranged Combat', specialty: 'Energy Blast', ranks: 6 }
    ],
    advantages: [
      { id: 'accurate_attack', name: 'Accurate Attack', rank: 1 },
      { id: 'improved_initiative', name: 'Improved Initiative', rank: 2 },
      { id: 'power_attack', name: 'Power Attack', rank: 1 },
      { id: 'precise_attack', name: 'Precise Attack', rank: 1, note: 'Ranged Cover' }
    ],
    powers: [
      {
        id: 'p_ec_force_field',
        name: 'Energy Force Field (Protection)',
        descriptor: 'Energy, Plasma',
        rank: 9,
        effect: { id: 'protection', name: 'Protection', baseCost: 1 },
        extras: [],
        flaws: [
          { id: 'sustained', cost: 1, isFlat: false }
        ],
        notes: 'Kinetic energy envelope absorbing attacks.'
      },
      {
        id: 'p_ec_blast_array',
        name: 'Plasma Bolt (Ranged Damage)',
        descriptor: 'Energy, Fire / Lightning',
        rank: 10,
        effect: { id: 'blast', name: 'Ranged Damage', baseCost: 2 },
        extras: [],
        flaws: [],
        alternateEffects: [
          {
            id: 'ae_ec_burst',
            name: 'Energy Burst (Area Damage)',
            rank: 10,
            effect: { id: 'damage', name: 'Damage', baseCost: 1 },
            extras: [
              { id: 'area_burst', cost: 1, isFlat: false }
            ],
            flaws: [],
            notes: 'Detonates a spherical blast of searing energy 30ft radius.'
          },
          {
            id: 'ae_ec_rapid',
            name: 'Rapid Barrage (Multiattack Blast)',
            rank: 7,
            effect: { id: 'blast', name: 'Ranged Damage', baseCost: 2 },
            extras: [
              { id: 'multiattack', cost: 1, isFlat: false }
            ],
            flaws: []
          }
        ],
        notes: 'Primary energy blast array. Can switch to area detonation or rapid barrage.'
      },
      {
        id: 'p_ec_flight',
        name: 'Energy Flight',
        descriptor: 'Energy, Propulsion',
        rank: 7,
        effect: { id: 'flight', name: 'Flight', baseCost: 2 },
        extras: [],
        flaws: [],
        notes: 'Rides waves of pure energy at 250 MPH.'
      },
      {
        id: 'p_ec_immunity',
        name: 'Energy Immunity',
        descriptor: 'Energy, Immunity',
        rank: 5,
        effect: { id: 'immunity', name: 'Immunity', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Immune to chosen energy type (Electricity / Fire).'
      }
    ],
    gear: [],
    complications: [
      { type: 'Accident', name: 'Overcharge', desc: 'Losing temper can cause electrical conduits to explode and short circuits.' },
      { type: 'Identity', name: 'Conspicuous Glow', desc: 'Skin or eyes glow faintly when stressed or powered up.' }
    ]
  },
  {
    id: 'powerhouse',
    name: 'Powerhouse',
    tagline: 'Massive brick of unstoppable muscle, titanic punches, and earth-shattering leaps.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Gamma-irradiated monster, cybernetic titan, or mythological colossus.',
    abilities: {
      str: 14,
      sta: 13,
      agi: 0,
      dex: 0,
      fgt: 6,
      int: -1,
      awe: 1,
      pre: 1
    },
    defenses: {
      dodge: 5, // Total 5 with Agi 0 (Dodge 5 + Toughness 13 = 18 <= 20)
      parry: 0, // Total 6 with Fgt 6 (Parry 6 + Toughness 13 = 19 <= 20)
      fortitude: 1, // Total 14 with Sta 13
      toughness: 0, // Total 13 with Sta 13
      will: 5 // Total 6 with Awe 1 (Fort 14 + Will 6 = 20 Cap)
    },
    skills: [
      { id: 'athletics', name: 'Athletics', ranks: 2 },
      { id: 'close_combat', name: 'Close Combat', specialty: 'Unarmed', ranks: 0 },
      { id: 'insight', name: 'Insight', ranks: 4 },
      { id: 'intimidation', name: 'Intimidation', ranks: 10 },
      { id: 'perception', name: 'Perception', ranks: 4 }
    ],
    advantages: [
      { id: 'all_out_attack', name: 'All-out Attack', rank: 1 },
      { id: 'diehard', name: 'Diehard', rank: 1 },
      { id: 'great_endurance', name: 'Great Endurance', rank: 1 },
      { id: 'improved_grab', name: 'Improved Grab', rank: 1 },
      { id: 'improved_hold', name: 'Improved Hold', rank: 1 },
      { id: 'power_attack', name: 'Power Attack', rank: 1 },
      { id: 'startle', name: 'Startle', rank: 1 },
      { id: 'takedown', name: 'Takedown', rank: 1 }
    ],
    powers: [
      {
        id: 'p_ph_leaping',
        name: 'Super-Human Leaping',
        descriptor: 'Physical, Muscle',
        rank: 10,
        effect: { id: 'leaping', name: 'Leaping', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Leaps 1 mile in a single bound!'
      },
      {
        id: 'p_ph_groundstrike',
        name: 'Groundstrike (Seismic Trip)',
        descriptor: 'Bludgeoning, Kinetic',
        rank: 10,
        effect: { id: 'affliction', name: 'Affliction', baseCost: 1 },
        extras: [
          { id: 'area_burst', cost: 1, isFlat: false }
        ],
        flaws: [
          { id: 'limited', cost: 1, isFlat: false, note: 'Targets on the ground only' }
        ],
        notes: 'Smashes the ground, knocking all targets prone in 30ft radius.'
      }
    ],
    gear: [],
    complications: [
      { type: 'Prejudice', name: 'Monstrous Appearance', desc: 'Feared and misunderstood by the general populace.' },
      { type: 'Temper', name: 'Berserk Rage', desc: 'Prone to explosive anger that causes collateral damage.' }
    ]
  },
  {
    id: 'psychic',
    name: 'Psychic / Mentalist',
    tagline: 'Telepathic brainpower commanding minds, reading thoughts, and unleashing mental blasts.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Evolved psionic prodigy or awakened mind whose thoughts manifest in physical space.',
    abilities: {
      str: 0,
      sta: 1,
      agi: 1,
      dex: 2,
      fgt: 4,
      int: 4,
      awe: 8,
      pre: 4
    },
    defenses: {
      dodge: 7, // Total 8 with Agi 1 (Dodge 8 + Toughness 12 = 20 Cap)
      parry: 4, // Total 8 with Fgt 4 (Parry 8 + Toughness 12 = 20 Cap)
      fortitude: 7, // Total 8 with Sta 1
      toughness: 0, // Total 12 with Telekinetic Shield (Protection 11) + Sta 1
      will: 4 // Total 12 with Awe 8 (Fort 8 + Will 12 = 20 Cap)
    },
    skills: [
      { id: 'deception', name: 'Deception', ranks: 6 },
      { id: 'insight', name: 'Insight', ranks: 8 },
      { id: 'investigation', name: 'Investigation', ranks: 6 },
      { id: 'perception', name: 'Perception', ranks: 8 },
      { id: 'persuasion', name: 'Persuasion', ranks: 8 }
    ],
    advantages: [
      { id: 'assessment', name: 'Assessment', rank: 1 },
      { id: 'eidetic_memory', name: 'Eidetic Memory', rank: 1 },
      { id: 'fearless', name: 'Fearless', rank: 1 },
      { id: 'seize_initiative', name: 'Seize Initiative', rank: 1 },
      { id: 'trance', name: 'Trance', rank: 1 },
      { id: 'uncanny_dodge', name: 'Uncanny Dodge', rank: 1 }
    ],
    powers: [
      {
        id: 'p_psy_shield',
        name: 'Telekinetic Shield (Protection)',
        descriptor: 'Psionic, Force',
        rank: 11,
        effect: { id: 'protection', name: 'Protection', baseCost: 1 },
        extras: [],
        flaws: [
          { id: 'sustained', cost: 1, isFlat: false }
        ],
        notes: 'Inconspicuous psionic barrier shielding from kinetic impact.'
      },
      {
        id: 'p_psy_array',
        name: 'Mental Blast (Damage Resisted by Will)',
        descriptor: 'Psionic, Telepathy',
        rank: 10,
        effect: { id: 'damage', name: 'Damage', baseCost: 1 },
        extras: [
          { id: 'increased_range_2', cost: 2, isFlat: false }, // Perception range
          { id: 'alternate_resistance', cost: 1, isFlat: false } // Resisted by Will
        ],
        flaws: [],
        alternateEffects: [
          {
            id: 'ae_telepathy',
            name: 'Mind Reading & Telepathy',
            rank: 10,
            effect: { id: 'mind_reading', name: 'Mind Reading', baseCost: 2 },
            extras: [
              { id: 'cumulative', cost: 1, isFlat: false }
            ],
            flaws: []
          },
          {
            id: 'ae_telekinesis_move',
            name: 'Telekinesis (Move Object)',
            rank: 10,
            effect: { id: 'move_object', name: 'Move Object', baseCost: 2 },
            extras: [],
            flaws: []
          }
        ],
        notes: 'Perception range mental blast directly attacking victim neural pathways (Resisted by Will DC 25).'
      },
      {
        id: 'p_psy_flight',
        name: 'Telekinetic Levitation',
        descriptor: 'Psionic',
        rank: 2,
        effect: { id: 'flight', name: 'Flight', baseCost: 2 },
        extras: [],
        flaws: [],
        notes: 'Smooth levitation at 8 MPH.'
      }
    ],
    gear: [],
    complications: [
      { type: 'Headaches', name: 'Psionic Feedback', desc: 'Overexertion or mental barriers trigger agonizing migraines.' },
      { type: 'Sensory Overload', name: 'Noisy Thoughts', desc: 'Crowds without mental shielding cause disorientation.' }
    ]
  },
  {
    id: 'shapeshifter',
    name: 'Shapeshifter',
    tagline: 'Fluid morphing physiology mimicking predatory beasts, avian fliers, and aquatic terrors.',
    powerLevel: 10,
    powerPointsBudget: 150,
    concept: 'Genetic chimera or ancient nature avatar commanding forms of all living creatures.',
    abilities: {
      str: 2,
      sta: 4,
      agi: 4,
      dex: 2,
      fgt: 8,
      int: 1,
      awe: 4,
      pre: 1
    },
    defenses: {
      dodge: 6, // Total 10 with Agi 4 (Dodge 10 + Toughness 10 = 20 Cap)
      parry: 2, // Total 10 with Fgt 8 (Parry 10 + Toughness 10 = 20 Cap)
      fortitude: 6, // Total 10 with Sta 4 (Fort 10 + Will 10 = 20 Cap)
      toughness: 0, // Total 10 with Sta 4 + Protection 6 (Tough Hide)
      will: 6 // Total 10 with Awe 4
    },
    skills: [
      { id: 'acrobatics', name: 'Acrobatics', ranks: 6 },
      { id: 'athletics', name: 'Athletics', ranks: 6 },
      { id: 'close_combat', name: 'Close Combat', specialty: 'Natural Weapons', ranks: 4 },
      { id: 'insight', name: 'Insight', ranks: 4 },
      { id: 'perception', name: 'Perception', ranks: 8 },
      { id: 'stealth', name: 'Stealth', ranks: 8 }
    ],
    advantages: [
      { id: 'animal_empathy', name: 'Animal Empathy', rank: 1 },
      { id: 'diehard', name: 'Diehard', rank: 1 },
      { id: 'great_endurance', name: 'Great Endurance', rank: 1 },
      { id: 'improved_initiative', name: 'Improved Initiative', rank: 1 },
      { id: 'move_by_action', name: 'Move-by Action', rank: 1 },
      { id: 'takedown', name: 'Takedown', rank: 1 },
      { id: 'tracking', name: 'Tracking', rank: 1 },
      { id: 'uncanny_dodge', name: 'Uncanny Dodge', rank: 1 }
    ],
    powers: [
      {
        id: 'p_morph_animals',
        name: 'Animal Morphing (Variable Traits)',
        descriptor: 'Biological, Morphic',
        rank: 5,
        effect: { id: 'morph', name: 'Morph', baseCost: 5 },
        extras: [],
        flaws: [
          { id: 'limited', cost: 1, isFlat: false, note: 'Animal forms only' }
        ],
        notes: 'Change form into any terrestrial animal. Allocates dynamic physical traits as needed.'
      },
      {
        id: 'p_ss_claws',
        name: 'Bestial Claws & Fangs (Damage)',
        descriptor: 'Slashing, Biological',
        rank: 6,
        effect: { id: 'damage', name: 'Damage', baseCost: 1 },
        extras: [
          { id: 'penetrating', cost: 1, isFlat: false }
        ],
        flaws: [],
        notes: 'Combines with Strength for Damage 8 Penetrating.'
      },
      {
        id: 'p_ss_hide',
        name: 'Tough Hide (Protection)',
        descriptor: 'Biological',
        rank: 6,
        effect: { id: 'protection', name: 'Protection', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Provides +6 Toughness defense.'
      },
      {
        id: 'p_ss_senses',
        name: 'Predatory Senses',
        descriptor: 'Sensory, Biological',
        rank: 4,
        effect: { id: 'senses', name: 'Senses', baseCost: 1 },
        extras: [],
        flaws: [],
        notes: 'Low-light vision, Scent (Acute, Tracking), Ultra-hearing.'
      }
    ],
    gear: [],
    complications: [
      { type: 'Identity', name: 'Instinctual Urges', desc: 'Animal instincts surface in stressful or hunting situations.' },
      { type: 'Quirk', name: 'Animalistic Features', desc: 'Retains subtle animal cues (slitted eyes, feline posture).' }
    ]
  }
];

export function getArchetypeById(id) {
  const match = ARCHETYPES.find(a => a.id === id);
  if (!match) return null;
  return JSON.parse(JSON.stringify(match));
}
