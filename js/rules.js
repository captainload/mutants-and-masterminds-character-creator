/**
 * Mutants & Masterminds 3rd Edition Core Rules & Engine
 * Official rules text from Green Ronin Publishing M&M 3e Deluxe Hero's Handbook.
 */

import { MEASUREMENTS_TABLE } from './tables.js';

export const ABILITIES = [
  { id: 'str', name: 'Strength', short: 'STR', desc: 'Strength measures sheer muscle and physical power of your character. It affects the damage you deal in close combat, how far you can jump, your athletic prowess, and how much weight you can lift and carry.' },
  { id: 'sta', name: 'Stamina', short: 'STA', desc: 'Stamina represents health, physical resilience, and vigor. It is critical for defending against physical and energy harm (adding directly to Toughness) as well as resisting diseases, poisons, and environmental hazards (adding to Fortitude).' },
  { id: 'agi', name: 'Agility', short: 'AGI', desc: 'Agility measures body control, balance, coordination, reflexes, and overall nimbleness. It determines how quickly you react in combat (Initiative), allows you to avoid area attacks and ranged strikes (Dodge), and governs balance and stealth.' },
  { id: 'dex', name: 'Dexterity', short: 'DEX', desc: 'Dexterity controls eye-hand coordination, agility with the hands, fine motor control, and marksmanship. It governs your ability to hit targets with ranged attacks (firearms, blasters, thrown weapons), drive vehicles, and perform sleight of hand.' },
  { id: 'fgt', name: 'Fighting', short: 'FGT', desc: 'Fighting measures your close combat competence, martial prowess, and defensive instinct in melee. It provides your base close attack bonus and forms your Parry defense to deflect incoming melee strikes.' },
  { id: 'int', name: 'Intellect', short: 'INT', desc: 'Intellect covers reasoning ability, memory, logic, analytical deduction, education, and how well you process information. It governs scientific knowledge, technology, hacking, investigation, and trade skills.' },
  { id: 'awe', name: 'Awareness', short: 'AWE', desc: 'Awareness measures common sense, intuition, sensory acuity, discernment, and mental resilience. It provides your Will defense against telepathy and mind control, and governs insight and perception.' },
  { id: 'pre', name: 'Presence', short: 'PRE', desc: 'Presence governs charisma, force of personality, leadership capability, persuasiveness, and social command. It is used to persuade allies, trick adversaries with deception, and cow foes with intimidation.' }
];

export const DEFENSES = [
  { id: 'dodge', name: 'Dodge', ability: 'agi', desc: 'Dodge measures your agility and quickness to avoid ranged attacks, explosions, and hazards. Ranged attack checks are compared against your Dodge defense value (10 + Dodge).' },
  { id: 'parry', name: 'Parry', ability: 'fgt', desc: 'Parry measures your ability to parry, duck, and deflect close melee attacks. Close attack checks are made against your Parry defense value (10 + Parry).' },
  { id: 'fortitude', name: 'Fortitude', ability: 'sta', desc: 'Fortitude measures your physical resistance to illness, drugs, fatigue, radiation, suffocation, poison, and other biological threats.' },
  { id: 'toughness', name: 'Toughness', ability: 'sta', canBuyDirectly: false, desc: 'Toughness measures your character’s resistance to direct physical damage, concussive force, and energetic assault. Unlike other defenses, Toughness cannot be bought directly with Power Points; it is derived from Stamina, Protection powers, and advantages like Defensive Roll.' },
  { id: 'will', name: 'Will', ability: 'awe', desc: 'Will measures your mental fortitude, psychological stability, spiritual strength, and resistance to mind control, fear, illusions, and mental attacks.' }
];

export const SKILLS_LIST = [
  {
    id: 'acrobatics',
    name: 'Acrobatics',
    ability: 'agi',
    trainedOnly: false,
    hasSpecialty: true,
    desc: 'You can flip, tumble, balance, perform aerial maneuvers, and escape from grabs and restraints. You can use Acrobatics to make a feint in combat if you possess the Agile Feint advantage.',
    options: ['Balancing', 'Acrobatic Feints', 'Tumbling & Breakfall', 'Escape Maneuvers', 'Aerial Maneuvers']
  },
  {
    id: 'athletics',
    name: 'Athletics',
    ability: 'str',
    trainedOnly: false,
    hasSpecialty: true,
    desc: 'Athletics covers physical feats of strength, speed, and endurance including climbing sheer cliff faces, running across obstacles, leaping across chasms, and swimming against strong currents.',
    options: ['Climbing', 'Swimming', 'Running & Sprinting', 'Jumping & Leaping', 'Brachiation']
  },
  {
    id: 'close_combat',
    name: 'Close Combat',
    ability: 'fgt',
    trainedOnly: true,
    hasSpecialty: true,
    requiresOption3E: true,
    desc: 'Close Combat is the skill for making melee attacks with a specific weapon, unarmed style, or close power effect. Each close attack check uses Fighting + Close Combat rank for that specific weapon.',
    options: ['Unarmed', 'Swords', 'Short Blades', 'Clubs & Hammers', 'Axes', 'Spears', 'Chains & Whips', 'Grabbing & Wrestling']
  },
  {
    id: 'deception',
    name: 'Deception',
    ability: 'pre',
    trainedOnly: false,
    hasSpecialty: true,
    desc: 'Deception is the skill of misleading others: lying, bluffing, fast-talking, tricking an opponent in combat (feinting), creating disguises, and sending secret innuendo.',
    options: ['Fast-Talking / Bluffing', 'Feinting in Combat', 'Disguise', 'Innuendo / Double Talk']
  },
  {
    id: 'expertise',
    name: 'Expertise',
    ability: 'int',
    trainedOnly: true,
    hasSpecialty: true,
    requiresOption3E: true,
    desc: 'Expertise covers a broad field of specialized knowledge, profession, or craft. Examples include Science, Magic, Criminal, Pop Culture, Law, Tactics, Streetwise, Engineering, Medicine, and History.',
    options: ['Science', 'Magic / Occult', 'Engineering', 'Criminal / Underworld', 'Law', 'Tactics / Military', 'Streetwise', 'Pop Culture', 'History', 'Medicine', 'Journalism', 'Art & Culture', 'Current Events', 'Philosophy']
  },
  {
    id: 'insight',
    name: 'Insight',
    ability: 'awe',
    trainedOnly: false,
    hasSpecialty: true,
    desc: 'Insight lets you evaluate others, read emotional tells, detect lies, gauge intentions, sense mental influence or mind control, and resist combat feints and trickery.',
    options: ['Detect Lies', 'Sense Intentions / Motives', 'Resist Feints', 'Mental Awareness']
  },
  {
    id: 'intimidation',
    name: 'Intimidation',
    ability: 'pre',
    trainedOnly: false,
    hasSpecialty: true,
    desc: 'Intimidation is the art of getting what you want through overt force of personality, menace, or physical threat. It can be used to coerce cooperation or demoralize an opponent in combat.',
    options: ['Coercion', 'Demoralize in Combat', 'Menacing Presence', 'Interrogation']
  },
  {
    id: 'investigation',
    name: 'Investigation',
    ability: 'int',
    trainedOnly: true,
    hasSpecialty: true,
    desc: 'Investigation allows you to search crime scenes, uncover hidden evidence, follow paper trails, connect disparate clues, conduct forensic examinations, and interrogate persons of interest.',
    options: ['Crime Scene Forensics', 'Evidence Gathering', 'Paper Trails / Records', 'Interrogation']
  },
  {
    id: 'perception',
    name: 'Perception',
    ability: 'awe',
    trainedOnly: false,
    hasSpecialty: true,
    desc: 'Perception allows you to use all five senses to notice sensory details: spotting hidden adversaries, overhearing quiet conversations, smelling gas leaks, and noticing concealed items.',
    options: ['Visual / Sight', 'Auditory / Hearing', 'Olfactory / Scent', 'Tracking']
  },
  {
    id: 'persuasion',
    name: 'Persuasion',
    ability: 'pre',
    trainedOnly: false,
    hasSpecialty: true,
    desc: 'Persuasion is the ability to convince others of your point of view through reasoned argument, debate, charisma, diplomacy, and charm. It shifts target attitudes from hostile to helpful.',
    options: ['Diplomacy & Mediation', 'Debate & Argument', 'Negotiation', 'Charm & Flattery']
  },
  {
    id: 'ranged_combat',
    name: 'Ranged Combat',
    ability: 'dex',
    trainedOnly: true,
    hasSpecialty: true,
    requiresOption3E: true,
    desc: 'Ranged Combat measures your marksmanship with a particular ranged weapon type or power (e.g. Blasters, Bows, Firearms, Thrown, Slings).',
    options: ['Energy Blasters', 'Firearms / Pistols', 'Rifles & Snipers', 'Bows & Arrows', 'Thrown Weapons', 'Heavy Artillery', 'Magic Bolts']
  },
  {
    id: 'sleight_of_hand',
    name: 'Sleight of Hand',
    ability: 'dex',
    trainedOnly: true,
    hasSpecialty: true,
    desc: 'Sleight of Hand covers manual dexterity for stage magic, palming small objects, pickpocketing, planting evidence on someone, and slipping out of handcuffs or bonds.',
    options: ['Legerdemain / Prestidigitation', 'Pickpocketing', 'Concealing Objects', 'Escaping Restraints']
  },
  {
    id: 'stealth',
    name: 'Stealth',
    ability: 'agi',
    trainedOnly: false,
    hasSpecialty: true,
    desc: 'Stealth is the skill of moving without making sound and avoiding detection by sight or other senses. It is opposed by a viewer’s Perception check.',
    options: ['Shadows & Camouflage', 'Silent Movement', 'Crowd Blending', 'Infiltration']
  },
  {
    id: 'technology',
    name: 'Technology',
    ability: 'int',
    trainedOnly: true,
    hasSpecialty: true,
    desc: 'Technology is the skill for building, inventing, repairing, modifying, and hacking electronic hardware, security systems, vehicles, mainframe networks, and super-science gadgets.',
    options: ['Computers & Hacking', 'Electronics & Hardware', 'Security Systems', 'Invention & Engineering', 'Demolitions']
  },
  {
    id: 'treatment',
    name: 'Treatment',
    ability: 'int',
    trainedOnly: true,
    hasSpecialty: true,
    desc: 'Treatment allows you to perform first aid, administer CPR, stabilize dying characters, perform complex trauma surgery, and treat poisons and diseases.',
    options: ['First Aid & Stabilization', 'Surgery & Trauma', 'Toxins & Diseases', 'Psychological Care']
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    ability: 'dex',
    trainedOnly: true,
    hasSpecialty: true,
    desc: 'Vehicles allows you to pilot and drive vehicles under stressful combat circumstances, including high-speed pursuit maneuvers in cars, motorcycles, helicopters, jets, and starships.',
    options: ['Ground Vehicles (Cars/Bikes)', 'Air Vehicles (Planes/Helicopters)', 'Water Vehicles (Boats/Subs)', 'Space Vehicles (Starships)']
  }
];

export const ADVANTAGES_DATABASE = [
  {
    id: 'accurate_attack',
    name: 'Accurate Attack',
    category: 'Combat',
    maxRank: 1,
    desc: 'When you make an attack, you can trade effect rank for attack bonus on a 1-for-1 basis, up to a maximum of 5 points. You can take a penalty of up to -5 on the effect modifier (e.g. Damage) and add the same amount (up to +5) to your attack check. Your effect modifier cannot be reduced below 0. The modification takes effect before making the attack and lasts until the start of your next turn.'
  },
  {
    id: 'agile_feint',
    name: 'Agile Feint',
    category: 'Combat',
    maxRank: 1,
    desc: 'You can use your Acrobatics skill bonus instead of Deception to feint in combat, using speed, acrobatics, and athletic flips to catch opponents flat-footed. Your Acrobatics check is opposed by the target’s Acrobatics or Insight check.'
  },
  {
    id: 'all_out_attack',
    name: 'All-out Attack',
    category: 'Combat',
    maxRank: 1,
    desc: 'When you make an attack, you can take a penalty of up to -5 on your active defenses (Dodge and Parry) and add the same number (up to +5) to your attack bonus for that check. The defense penalty applies immediately and lasts until the start of your next turn.'
  },
  {
    id: 'animal_empathy',
    name: 'Animal Empathy',
    category: 'General',
    maxRank: 1,
    desc: 'You can use interaction skills (Deception, Intimidation, Persuasion) on animals just as you would on normal people, without circumstance penalties. You can also understand an animal’s basic emotional state and intentions with an Insight check.'
  },
  {
    id: 'artificer',
    name: 'Artificer',
    category: 'Skill',
    maxRank: 1,
    desc: 'You can use the Expertise: Magic skill to design, invent, and create temporary occult devices and magical talismans, using the inventing rules (see Inventing, Chapter 8).'
  },
  {
    id: 'assessment',
    name: 'Assessment',
    category: 'Skill',
    maxRank: 1,
    desc: 'You can use Insight to gauge an opponent’s combat capabilities. Make an Insight check as a free action opposed by the target’s Deception. If you succeed, you learn the target’s relative attack, defense, and effect ranks compared to your own (lower, equal, or higher). With three or more degrees of success, you learn the exact values.'
  },
  {
    id: 'attractive',
    name: 'Attractive',
    category: 'General',
    maxRank: 2,
    desc: 'You are exceptionally good-looking. You gain a +2 circumstance bonus on Deception and Persuasion checks per rank whenever physical attraction is a factor. You also gain this bonus when feinting with Deception or making interaction checks against receptive targets.'
  },
  {
    id: 'benefit',
    name: 'Benefit',
    category: 'General',
    maxRank: 10,
    hasOptions: true,
    desc: `You have some significant social or legal benefit. The opposite of a Complication, a Benefit grants you an in-game advantage. Each rank provides one of the following benefits:

• Wealth: You are wealthier than average. Characters are normally assumed to have sufficient income for basic living expenses and typical equipment. Ranks of Wealth grant significant financial resources:
  - Rank 1 (Well-off): Upper-middle class, comfortable professional income, easily affords luxury goods and leisure activities.
  - Rank 2 (Wealthy): Low-level millionaire, substantial personal assets and investment portfolio, easily finances major lifestyle expenses.
  - Rank 3 (Very Wealthy): Multi-millionaire, considerable corporate assets, private estates, yachts, or personal aircraft.
  - Rank 4 (Rich): Hundreds of millions, major corporate tycoon, venture capitalist, or industrial CEO.
  - Rank 5 (Billionaire): Immense multi-billion global empire, can privately fund space exploration, massive R&D, secret superhero headquarters, and advanced technology.

• Administrative / Diplomatic Immunity: You are immune to prosecution by civil authorities and beyond the jurisdiction of local law enforcement.
• Alternate Identity: You have a legal alternate identity, complete with documentation (driver's license, passport, birth certificate).
• Ambidexterity: You can use either hand equally well; you do not suffer off-hand penalties.
• Cipher: You are not on any public record; your identity and background cannot be researched using Investigation or public databases. Each rank adds +5 to the DC to uncover information about you.
• Security Clearance: You have official clearance to access classified information and facilities. Higher ranks grant higher levels of clearance (Confidential, Secret, Top Secret, Black Ops).
• Status: You have a degree of formal status or high social standing, such as royalty, nobility, high military rank, or head of state.`,
    options: [
      'Wealth 1 (Well-off: comfortable professional luxury)',
      'Wealth 2 (Wealthy: millionaire, substantial personal assets)',
      'Wealth 3 (Very Wealthy: multi-millionaire, corporate assets)',
      'Wealth 4 (Rich: hundreds of millions, major tycoon)',
      'Wealth 5 (Billionaire: global empire, private R&D funding)',
      'Diplomatic Immunity (Immune to civil prosecution)',
      'Alternate Identity (Legal ID with documentation)',
      'Ambidexterity (No off-hand penalties)',
      'Cipher (+5 DC per rank to research identity via public records)',
      'Security Clearance (Classified state/military access)',
      'Status (Royalty, nobility, or head of state)'
    ]
  },
  {
    id: 'chokehold',
    name: 'Chokehold',
    category: 'Combat',
    maxRank: 1,
    desc: 'If you have an opponent pinned or bound in a grab attack, you can suffocate them. The target must hold their breath (for Stamina rounds) and make Fortitude checks (DC 10 + rank, +1 per previous check) each round or become exhausted, then disabled, then dying on subsequent failed checks.'
  },
  {
    id: 'close_attack',
    name: 'Close Attack',
    category: 'Combat',
    maxRank: 20,
    desc: 'You gain a +1 bonus on all close attack checks per rank of this advantage, applying to unarmed strikes, melee weapons, and close power attacks (subject to campaign PL attack and effect caps).'
  },
  {
    id: 'connected',
    name: 'Connected',
    category: 'General',
    maxRank: 1,
    desc: 'You have extensive contacts and friends in various fields. You can call in favors by making a Persuasion check (DC 10 for minor help, DC 15 for significant help, DC 20 for risky or illegal help) to secure assistance, resources, equipment, or bail.'
  },
  {
    id: 'contacts',
    name: 'Contacts',
    category: 'General',
    maxRank: 1,
    desc: 'You have an extensive network of informants. You can make an initial Investigation check to gather information in one minute instead of the usual hours. You must still make the check, but can obtain results quickly.'
  },
  {
    id: 'daze',
    name: 'Daze',
    category: 'Combat',
    maxRank: 1,
    hasOptions: true,
    desc: 'You can use Deception or Intimidation to daze an opponent. Make an interaction check as a standard action opposed by the target’s Insight or Will check. If you succeed, the target is dazed until the end of your next turn (can take only a single standard or move action, and cannot take free actions).',
    options: ['Deception (Trickery / Taunt)', 'Intimidation (Menace / Fright)']
  },
  {
    id: 'defensive_attack',
    name: 'Defensive Attack',
    category: 'Combat',
    maxRank: 1,
    desc: 'When making an attack, you can trade attack bonus for active defense bonus. You can take a penalty of up to -5 on your attack check and add the same number (up to +5) to your active defenses (Dodge and Parry) until the start of your next turn.'
  },
  {
    id: 'defensive_roll',
    name: 'Defensive Roll',
    category: 'Combat',
    maxRank: 10,
    desc: 'You can roll with incoming blows to avoid damage. You gain an active bonus of +1 to your Toughness defense per rank. This bonus cannot exceed your character’s active defense bonus (Dodge or Parry). Like other active defenses, you lose this bonus if you are vulnerable or defenseless.'
  },
  {
    id: 'diehard',
    name: 'Diehard',
    category: 'General',
    maxRank: 1,
    desc: 'When your condition is dying, you automatically stabilize on the following round without needing to make a Fortitude check.'
  },
  {
    id: 'eidetic_memory',
    name: 'Eidetic Memory',
    category: 'General',
    maxRank: 1,
    desc: 'You have flawless total recall. You receive a +5 circumstance bonus on checks to remember details and never forget anything you have experienced. You can make routine memory checks for things most people would forget.'
  },
  {
    id: 'equipment',
    name: 'Equipment',
    category: 'General',
    maxRank: 30,
    desc: 'Each rank in Equipment provides you with 5 Equipment Points (EP) to purchase mundane weapons, body armor, vehicles, headquarters, and gadgets (see Chapter 7: Gadgets & Gear). Equipment can be damaged, lost, or confiscated without awarding a hero point.'
  },
  {
    id: 'extraordinary_effort',
    name: 'Extraordinary Effort',
    category: 'Fortune',
    maxRank: 1,
    desc: 'When using Extra Effort, you can choose two benefits at the same time instead of just one (though you still only suffer the normal fatigue cost of a single extra effort).'
  },
  {
    id: 'fascinate',
    name: 'Fascinate',
    category: 'Skill',
    maxRank: 1,
    hasOptions: true,
    desc: 'You can captivate and entrance an audience using an artistic or interaction skill. Make a check as a standard action opposed by the targets’ Insight or Will. If you succeed, the targets are entranced (fascinated) and can take no actions other than paying attention to you. Any hostile action or obvious danger immediately breaks the effect.',
    options: ['Expertise: Artistic / Music', 'Deception', 'Intimidation', 'Persuasion']
  },
  {
    id: 'favored_environment',
    name: 'Favored Environment',
    category: 'Combat',
    maxRank: 1,
    hasOptions: true,
    desc: 'You are adapted to fighting in a specific environment (e.g. Aerial, Aquatic, Zero-G, Urban, Underground). You gain a +2 circumstance bonus to either your attack checks or your active defenses (Dodge and Parry) while operating in that environment (chosen at the start of each turn).',
    options: ['Aerial / Airborne', 'Aquatic / Underwater', 'Zero-G / Space', 'Urban / Rooftops', 'Underground / Caves']
  },
  {
    id: 'favored_foe',
    name: 'Favored Foe',
    category: 'Combat',
    maxRank: 5,
    hasOptions: true,
    desc: 'You have specialized training or experience fighting a particular type of opponent. You gain a +1 circumstance bonus per rank on checks to deceive, intimidate, intuit, or perceive that type of foe, as well as +1 to damage against them.',
    options: ['Undead', 'Robots & Constructs', 'Aliens / Extraterrestrials', 'Mutants', 'Demons & Fiends', 'Criminal Syndicate']
  },
  {
    id: 'fearless',
    name: 'Fearless',
    category: 'General',
    maxRank: 1,
    desc: 'You are utterly immune to fear effects, intimidation attempts, and fear-based emotional manipulation. You never need to make checks or resistance rolls against fear.'
  },
  {
    id: 'grab_fighting',
    name: 'Grab Fighting',
    category: 'Combat',
    maxRank: 1,
    desc: 'You can maintain a grab with only one arm and retain your full active defenses (Dodge and Parry) while grabbing a foe. You can also make close attacks against a grabbed target with your free hand.'
  },
  {
    id: 'great_endurance',
    name: 'Great Endurance',
    category: 'General',
    maxRank: 1,
    desc: 'You receive a +5 circumstance bonus on Fortitude resistance checks and endurance checks against environmental cold, heat, starvation, thirst, suffocation, holding your breath, and sleep deprivation.'
  },
  {
    id: 'hide_in_plain_sight',
    name: 'Hide in Plain Sight',
    category: 'Skill',
    maxRank: 1,
    desc: 'You can use the Stealth skill to hide even while being actively observed, without requiring cover, concealment, or a distraction.'
  },
  {
    id: 'improved_aim',
    name: 'Improved Aim',
    category: 'Combat',
    maxRank: 1,
    desc: 'When you take an action to aim, you double the normal aim bonus: you gain a +5 bonus on your next attack check (or +10 if you spend a full action aiming with a scoped weapon) instead of the normal +2/+5.'
  },
  {
    id: 'improved_critical',
    name: 'Improved Critical',
    category: 'Combat',
    maxRank: 4,
    hasOptions: true,
    desc: 'Your critical threat range with a chosen attack expands by 1 per rank (rank 1 threatens on a natural 19-20; rank 2 on 18-20; rank 3 on 17-20; rank 4 on 16-20). A critical hit adds +5 to the effect DC or grants another critical effect.',
    options: ['Unarmed Strike', 'Melee Blades / Swords', 'Ranged Blaster', 'Sniper Rifle', 'Custom Power Strike']
  },
  {
    id: 'improved_defense',
    name: 'Improved Defense',
    category: 'Combat',
    maxRank: 1,
    desc: 'When you take the Defend action in combat, you gain a +2 circumstance bonus to your active defenses in addition to the standard defend benefits (total +4 bonus to Dodge and Parry).'
  },
  {
    id: 'improved_disarm',
    name: 'Improved Disarm',
    category: 'Combat',
    maxRank: 1,
    desc: 'You suffer no attack check penalty when attempting to disarm an opponent, and the defender gains no bonus if their weapon is larger than yours. Furthermore, an opponent cannot attempt to disarm you in return if your disarm check fails.'
  },
  {
    id: 'improved_grab',
    name: 'Improved Grab',
    category: 'Combat',
    maxRank: 1,
    desc: 'When you hit an opponent with an unarmed close attack, you can make an immediate grab attempt against that target as a free action. You are not considered vulnerable while maintaining the grab.'
  },
  {
    id: 'improved_hold',
    name: 'Improved Hold',
    category: 'Combat',
    maxRank: 1,
    desc: 'Opponents you have grabbed suffer a -5 circumstance penalty on all checks to escape your hold.'
  },
  {
    id: 'improved_initiative',
    name: 'Improved Initiative',
    category: 'Combat',
    maxRank: 5,
    desc: 'You gain a +4 bonus on Initiative checks per rank of this advantage, letting you act faster in combat. Multiple ranks are cumulative (+8 for rank 2, +12 for rank 3, etc.).'
  },
  {
    id: 'improved_smash',
    name: 'Improved Smash',
    category: 'Combat',
    maxRank: 1,
    desc: 'You suffer no attack check penalty when attempting to smash or damage an object held, carried, or worn by another character, and gain a +5 circumstance bonus on damage checks to break objects.'
  },
  {
    id: 'improved_trip',
    name: 'Improved Trip',
    category: 'Combat',
    maxRank: 1,
    desc: 'You suffer no penalty when attempting a trip attack. If your trip attempt fails, the defender cannot attempt to trip you in return. You can also use Agility or Dexterity instead of Strength for trip checks.'
  },
  {
    id: 'improvised_tools',
    name: 'Improvised Tools',
    category: 'Skill',
    maxRank: 1,
    desc: 'You suffer no circumstance penalty on skill checks (such as Technology or Treatment) when working without proper toolkits or specialized instruments.'
  },
  {
    id: 'improvised_weapon',
    name: 'Improvised Weapon',
    category: 'Combat',
    maxRank: 4,
    desc: 'When using improvised weapons (bottles, chairs, lamp posts, trash cans), you gain +1 to your Damage rank per rank of this advantage (up to a maximum bonus of +4, capped by your Strength).'
  },
  {
    id: 'inspire',
    name: 'Inspire',
    category: 'Fortune',
    maxRank: 5,
    desc: 'Once per scene as a standard action, you can spend a hero point to inspire your comrades. All allies who can hear and see you gain a +1 circumstance bonus per rank of Inspire (up to rank 5) on all checks until the start of your next turn.'
  },
  {
    id: 'instant_up',
    name: 'Instant Up',
    category: 'Combat',
    maxRank: 1,
    desc: 'You can stand up from prone as a free action without needing to make an Acrobatics check.'
  },
  {
    id: 'interpose',
    name: 'Interpose',
    category: 'Combat',
    maxRank: 1,
    desc: 'Once per round, when an ally within your normal movement distance is targeted by an attack, you can move to step into the line of fire and suffer the attack intended for that ally, resolving it against your defenses.'
  },
  {
    id: 'inventor',
    name: 'Inventor',
    category: 'Skill',
    maxRank: 1,
    desc: 'You can use the Technology skill to design, build, and jury-rig temporary super-science devices and gadgets on the fly, using the inventing rules in Chapter 8.'
  },
  {
    id: 'jack_of_all_trades',
    name: 'Jack-of-all-trades',
    category: 'Skill',
    maxRank: 1,
    desc: 'You can use any skill untrained, even those skills that normally require formal training (such as Technology, Treatment, Investigation, and Sleight of Hand).'
  },
  {
    id: 'languages',
    name: 'Languages',
    category: 'General',
    maxRank: 20,
    hasOptions: false,
    desc: 'Each rank of this advantage doubles the number of extra languages unlocked by the previous rank (Rank 1: 1 extra language, Rank 2: 3 extra languages [+2], Rank 3: 7 extra languages [+4], Rank 4: 15 extra languages [+8], Rank 5: 31 extra languages [+16], doubling new languages each rank). Native language is free.'
  },
  {
    id: 'leadership',
    name: 'Leadership',
    category: 'Fortune',
    maxRank: 1,
    desc: 'You can spend a hero point to remove a condition (such as dazed, fatigued, or stunned) from an ally within earshot who can hear your orders, or grant them an immediate reroll with normal hero point benefits.'
  },
  {
    id: 'luck',
    name: 'Luck',
    category: 'Fortune',
    maxRank: 5,
    desc: 'Each rank in Luck gives you one extra hero point per game session (usable only for rerolls and recovery). You cannot possess more ranks of Luck than half your campaign Power Level.'
  },
  {
    id: 'move_by_action',
    name: 'Move-by Action',
    category: 'Combat',
    maxRank: 1,
    desc: 'When you take a standard action (such as an attack), you can split your movement, taking part of your move action before the standard action and the remainder after.'
  },
  {
    id: 'power_attack',
    name: 'Power Attack',
    category: 'Combat',
    maxRank: 1,
    desc: 'When making an attack, you can trade attack bonus for effect bonus. You can take a penalty of up to -5 on your attack check and add the same number (up to +5) to the effect modifier (e.g. Damage). Your attack bonus cannot be reduced below 0.'
  },
  {
    id: 'precise_attack',
    name: 'Precise Attack',
    category: 'Combat',
    maxRank: 4,
    hasOptions: true,
    desc: 'You ignore circumstance penalties from cover or concealment on attacks. Each rank chooses one specific combination: Close vs Cover, Close vs Concealment, Ranged vs Cover, or Ranged vs Concealment.',
    options: ['Close Attacks vs Cover', 'Close Attacks vs Concealment', 'Ranged Attacks vs Cover', 'Ranged Attacks vs Concealment']
  },
  {
    id: 'prone_fighting',
    name: 'Prone Fighting',
    category: 'Combat',
    maxRank: 1,
    desc: 'You suffer no penalty on melee attack checks while prone, and melee attacks against you gain no bonus while you are prone.'
  },
  {
    id: 'quick_draw',
    name: 'Quick Draw',
    category: 'Combat',
    maxRank: 1,
    desc: 'You can draw a weapon or ready an item from your belt, holster, or scabbard as a free action rather than a move action.'
  },
  {
    id: 'ranged_attack',
    name: 'Ranged Attack',
    category: 'Combat',
    maxRank: 20,
    desc: 'You gain a +1 bonus on all ranged attack checks per rank of this advantage, applying to firearms, blasters, bows, thrown weapons, and rays (subject to campaign PL caps).'
  },
  {
    id: 'redirect',
    name: 'Redirect',
    category: 'Combat',
    maxRank: 1,
    desc: 'If you successfully trick or feint an opponent using Deception, you can cause an attacker who misses you with a close attack to strike the tricked opponent instead.'
  },
  {
    id: 'ritualist',
    name: 'Ritualist',
    category: 'Skill',
    maxRank: 1,
    desc: 'You can use the Expertise: Magic skill to perform occult rituals to cast spells and generate magical power stunts over extended preparation periods (see Rituals, Chapter 8).'
  },
  {
    id: 'second_chance',
    name: 'Second Chance',
    category: 'Fortune',
    maxRank: 5,
    hasOptions: true,
    desc: 'You gain one free reroll on resistance checks against a specific hazard or check type (e.g. Mind Control, Radiation, Toxins, Falling, Traps). You must accept the result of the second roll.',
    options: ['Mind Control', 'Radiation', 'Suffocation / Drowning', 'Toxins & Poisons', 'Falling Damage', 'Traps & Snares']
  },
  {
    id: 'seize_initiative',
    name: 'Seize Initiative',
    category: 'Fortune',
    maxRank: 1,
    desc: 'You can spend a hero point to automatically act first in the initiative order for the encounter, preempting all other participants regardless of their initiative rolls.'
  },
  {
    id: 'set_up',
    name: 'Set-up',
    category: 'Combat',
    maxRank: 1,
    desc: 'When you successfully feint or deceive an opponent in combat, you can transfer the combat advantage of their vulnerability to an ally instead of yourself.'
  },
  {
    id: 'skill_mastery',
    name: 'Skill Mastery',
    category: 'Skill',
    maxRank: 16,
    hasOptions: true,
    desc: 'You are so practiced with chosen skills that you can make routine checks (take 10) even under extreme danger and combat pressure. Each rank applies to one skill.',
    options: ['Acrobatics', 'Athletics', 'Close Combat', 'Deception', 'Expertise', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Persuasion', 'Ranged Combat', 'Sleight of Hand', 'Stealth', 'Technology', 'Treatment', 'Vehicles']
  },
  {
    id: 'startle',
    name: 'Startle',
    category: 'Combat',
    maxRank: 1,
    desc: 'You can use the Intimidation skill instead of Deception to feint an opponent in combat. The check is opposed by the target’s Insight or Will. Success renders them vulnerable against your next attack.'
  },
  {
    id: 'takedown',
    name: 'Takedown',
    category: 'Combat',
    maxRank: 2,
    desc: 'If you render a minion incapacitated with a melee attack, you gain an immediate extra attack against an adjacent minion as a free action. With rank 2, you can also move between attacks.'
  },
  {
    id: 'taunt',
    name: 'Taunt',
    category: 'Combat',
    maxRank: 1,
    desc: 'You can demoralize an opponent using Deception instead of Intimidation. The check is opposed by the target’s Insight or Will. Success imposes a -2 circumstance penalty on checks until the end of their next round.'
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    category: 'General',
    maxRank: 1,
    desc: 'You are effective at coordinating team efforts. When aiding an ally, you provide a +5 bonus on a check with 1 degree of success (instead of +2), and +7 with 3 or more degrees of success.'
  },
  {
    id: 'throwing_mastery',
    name: 'Throwing Mastery',
    category: 'Combat',
    maxRank: 5,
    desc: 'You gain a +1 bonus to damage when throwing objects or thrown weapons per rank of this advantage, turning everyday objects into lethal projectiles.'
  },
  {
    id: 'tracking',
    name: 'Tracking',
    category: 'Skill',
    maxRank: 1,
    desc: 'You can follow visual tracks and footprints using Perception checks at full normal walking speed without penalty (opposed by DC set by terrain and time).'
  },
  {
    id: 'trance',
    name: 'Trance',
    category: 'General',
    maxRank: 1,
    desc: 'You can enter a deep meditative trance that slows your breathing and heart rate to a fraction of normal, allowing you to survive on 1/10th the normal air for hours.'
  },
  {
    id: 'ultimate_effort',
    name: 'Ultimate Effort',
    category: 'Fortune',
    maxRank: 5,
    hasOptions: true,
    desc: 'Choose a specific check or trait (e.g. Ultimate Toughness, Ultimate Aim, Ultimate Will). When you spend a hero point on that check, you automatically treat your d20 roll as an unmodified natural 20.',
    options: ['Toughness Saves', 'Aiming Attacks', 'Escaping Grabs', 'Will Defense Saves', 'Strength Lifting Checks', 'Technology / Hacking Checks']
  },
  {
    id: 'uncanny_dodge',
    name: 'Uncanny Dodge',
    category: 'Combat',
    maxRank: 1,
    desc: 'You are especially attuned to danger. You retain your active defense bonuses (Dodge and Parry) even when surprised, caught flat-footed, or blind.'
  },
  {
    id: 'weapon_bind',
    name: 'Weapon Bind',
    category: 'Combat',
    maxRank: 1,
    desc: 'If you take the Defend action and an opponent misses you with a melee weapon attack, you can make an immediate free disarm check against them.'
  },
  {
    id: 'weapon_break',
    name: 'Weapon Break',
    category: 'Combat',
    maxRank: 1,
    desc: 'If you take the Defend action and an opponent misses you with a melee weapon attack, you can make an immediate free smash check against their weapon.'
  },
  {
    id: 'well_informed',
    name: 'Well-informed',
    category: 'Skill',
    maxRank: 1,
    desc: 'When you encounter an individual, group, or secret organization for the first time, you can make an immediate Investigation or Perception check to recall key intelligence and facts about them.'
  }
];

export const POWER_EFFECTS_CATALOG = [
  { id: 'affliction', name: 'Affliction', baseCost: 1, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'Fortitude or Will', dcBase: 10, isAttack: true, desc: 'Affliction imposes adverse conditions on a target, resisting with Fortitude or Will against DC (10 + Affliction rank). Example conditions: Dazed/Stunned/Incapacitated or Hindered/Immobilized/Paralyzed.' },
  { id: 'blast', name: 'Ranged Damage', baseCost: 2, action: 'Standard', range: 'Ranged', duration: 'Instant', resist: 'Toughness', dcBase: 15, isAttack: true, desc: 'Ranged Damage projects force, energy bolts, bullets, or plasma beams to strike opponents from a distance. Resisted by Toughness (DC 15 + Damage rank).' },
  { id: 'burrowing', name: 'Burrowing', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Tunnel rapidly through soil, rock, or reinforced concrete.' },
  { id: 'communication', name: 'Communication', baseCost: 4, action: 'Free', range: 'Rank', duration: 'Sustained', resist: 'None', desc: 'Allows mental, radio, or sensory communication across distances based on rank.' },
  { id: 'comprehend', name: 'Comprehend', baseCost: 2, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Understand all spoken tongues, read all languages, speak to animals or machines.' },
  { id: 'concealment', name: 'Concealment', baseCost: 2, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Invisibility or total stealth shielding against visual, audio, or radar senses.' },
  { id: 'create', name: 'Create', baseCost: 2, action: 'Standard', range: 'Ranged', duration: 'Sustained', resist: 'None', desc: 'Form solid light, ice, earth, or force constructs with Volume and Toughness equal to rank.' },
  { id: 'damage', name: 'Damage', baseCost: 1, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'Toughness', dcBase: 15, isAttack: true, desc: 'Damage inflicts physical or energetic harm on targets. The target makes a Toughness check against DC (15 + Damage rank). Failure degrees impose Bruises (-1 penalty), Dazed, Staggered, or Incapacitated.' },
  { id: 'deflect', name: 'Deflect', baseCost: 1, action: 'Standard', range: 'Ranged', duration: 'Instant', resist: 'None', desc: 'Use active defense rolls to protect allies against ranged attacks.' },
  { id: 'elongation', name: 'Elongation', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Allows stretching or extending body parts or reach.' },
  { id: 'enhanced_trait', name: 'Enhanced Trait', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Superhuman boost to an Ability (+2/rank), Defense (+1/rank), Skill, or Advantage.' },
  { id: 'environment', name: 'Environment', baseCost: 1, action: 'Standard', range: 'Rank', duration: 'Sustained', resist: 'None', desc: 'Alters environmental conditions in an area (cold, heat, light, visibility, impeded movement).' },
  { id: 'extra_limbs', name: 'Extra Limbs', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Grants additional limbs or manipulators for grappling or manipulating objects.' },
  { id: 'feature', name: 'Feature', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Minor beneficial effects, utility quirks, or cosmetic capabilities costing 1 point per rank.' },
  { id: 'flight', name: 'Flight', baseCost: 2, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Flight grants aerial movement at a speed rank equal to the power rank.' },
  { id: 'growth', name: 'Growth', baseCost: 2, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Increases size, granting Strength, Stamina, reach, and mass, while reducing active defenses and stealth.' },
  { id: 'healing', name: 'Healing', baseCost: 2, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'None', desc: 'Restore bruised conditions and heal injuries or affliction conditions on allies.' },
  { id: 'illusion', name: 'Illusion', baseCost: 1, action: 'Standard', range: 'Perception', duration: 'Sustained', resist: 'Insight', dcBase: 10, desc: 'Project sensory phantasms deceiving sight, hearing, scent, touch, or all senses (1-5 PP/rank).' },
  { id: 'immortality', name: 'Immortality', baseCost: 2, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Return from death after a period of time determined by rank.' },
  { id: 'immunity', name: 'Immunity', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Total immunity to specified hazards (aging, suffocation, life support, radiation, disease, cold, fire).' },
  { id: 'insubstantial', name: 'Insubstantial', baseCost: 5, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Transform into liquid (Rank 1), gas (Rank 2), energy (Rank 3), or incorporeal ghost (Rank 4).' },
  { id: 'leaping', name: 'Leaping', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Instant', resist: 'None', isMovement: true, desc: 'Leaping allows covering great jumping distances vertically and horizontally based on rank.' },
  { id: 'luck_control', name: 'Luck Control', baseCost: 3, action: 'Reaction', range: 'Perception', duration: 'Instant', resist: 'None', desc: 'Allows influencing rolls, re-rolls, and fortune for yourself or others.' },
  { id: 'mind_reading', name: 'Mind Reading', baseCost: 2, action: 'Standard', range: 'Perception', duration: 'Sustained', resist: 'Will', dcBase: 10, isAttack: true, desc: 'Read target thoughts, memories, surface consciousness, or deep secrets.' },
  { id: 'morph', name: 'Morph', baseCost: 5, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Change physical appearance into other beings, humanoid forms, or any object.' },
  { id: 'movement', name: 'Movement', baseCost: 2, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Specialized movement modes: Dimensional Travel, Environmental Adaptation, Permeate, Space Travel, Swinging, Time Travel, Trackless, Wall-Crawling, Water-Walking.' },
  { id: 'move_object', name: 'Move Object', baseCost: 2, action: 'Standard', range: 'Ranged', duration: 'Sustained', resist: 'Dodge/Str', dcBase: 10, isAttack: true, desc: 'Telekinesis or magnetic tractor beam capable of lifting and manipulating distant objects.' },
  { id: 'nullify', name: 'Nullify', baseCost: 1, action: 'Standard', range: 'Ranged', duration: 'Instant', resist: 'Will', dcBase: 10, isAttack: true, desc: 'Counters, shuts down, or disrupts target super powers or technology.' },
  { id: 'protection', name: 'Protection', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', isDefense: true, desc: 'Protection adds directly to your character’s Toughness defense rank, resisting incoming damage.' },
  { id: 'quickness', name: 'Quickness', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Perform routine or non-combat tasks with extraordinary speed (rank table time reduction).' },
  { id: 'regeneration', name: 'Regeneration', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Automatically recover from damage bruises and conditions over rounds without medical aid.' },
  { id: 'remote_sensing', name: 'Remote Sensing', baseCost: 2, action: 'Free', range: 'Rank', duration: 'Sustained', resist: 'None', desc: 'Clairvoyance, projecting perception to distant coordinates.' },
  { id: 'senses', name: 'Senses', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Superhuman perception (darkvision, infravision, radar, scent, microscopic, radio).' },
  { id: 'shrinking', name: 'Shrinking', baseCost: 2, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Decreases size, granting defense bonuses and stealth while reducing movement and Strength/mass.' },
  { id: 'speed', name: 'Speed', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Speed multiplies your ground movement speed rank above normal running speed.' },
  { id: 'summon', name: 'Summon', baseCost: 2, action: 'Standard', range: 'Close', duration: 'Sustained', resist: 'None', desc: 'Conjures minions, allies, creatures, or automated constructs to act under your command (15 power points per rank).' },
  { id: 'swimming', name: 'Swimming', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Swimming allows rapid aquatic propulsion through water (Rank 1: 4 MPH / 60 ft/rnd).' },
  { id: 'teleport', name: 'Teleport', baseCost: 2, action: 'Move', range: 'Personal', duration: 'Instant', resist: 'None', isMovement: true, desc: 'Instantly dematerialize and reappear at another location within range rank.' },
  { id: 'transform', name: 'Transform', baseCost: 2, action: 'Standard', range: 'Close', duration: 'Sustained', resist: 'Dodge or Fortitude', dcBase: 10, isAttack: true, desc: 'Alters inanimate or animate matter from one form into another (base cost 2 to 5 depending on scope).' },
  { id: 'variable', name: 'Variable', baseCost: 7, action: 'Standard', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Provides a flexible pool of power points (5 points per rank) that can be reallocated to fit an overarching descriptor or concept.' },
  { id: 'weaken', name: 'Weaken', baseCost: 1, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'Fortitude/Will', dcBase: 10, isAttack: true, desc: 'Drains enemy abilities, defenses, or power ranks temporarily.' }
];

export const EXTRAS_CATALOG = [
  { id: 'accurate', name: 'Accurate', cost: 1, isFlat: true, isRanked: true, maxRank: 10, minRank: 1, isUnique: false, isEffectSpecific: false, desc: '+2 to attack check rolls with this power per rank of Accurate.' },
  { id: 'action_extra', name: 'Action (Faster)', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Decreases the time required to use the effect by one step per rank (Standard -> Move -> Free).' },
  { id: 'affects_corporeal', name: '★ Affects Corporeal', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Can affect physical targets while you are Insubstantial (specific to Insubstantial).' },
  { id: 'affects_insubstantial', name: 'Affects Insubstantial', cost: 1, isFlat: true, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Full effect against Insubstantial targets (Rank 1 half, Rank 2 full).' },
  { id: 'affects_others', name: 'Affects Others', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Can grant personal powers (Flight, Protection, etc.) to allies at Close range (specific to Personal range powers).' },
  { id: 'area_burst', name: 'Area (Burst 30ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects all targets in 30ft radius (+30ft per additional rank). Targets make Dodge check for half effect.' },
  { id: 'area_cloud', name: 'Area (Cloud 15ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects 15ft radius cloud that lingers for 1 additional round, affecting anyone inside. Dodge check for half effect.' },
  { id: 'area_cone', name: 'Area (Cone 60ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects all targets in 60ft cone (+60ft per additional rank). Dodge check for half effect.' },
  { id: 'area_cylinder', name: 'Area (Cylinder 30ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects an upright cylinder 30 feet in radius and height. Dodge check for half effect.' },
  { id: 'area_line', name: 'Area (Line 30ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects all targets in 30ft line (+30ft per additional rank). Dodge check for half effect.' },
  { id: 'area_perception', name: 'Area (Perception)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects any target capable of perceiving the effect (visual, auditory, or scent). Dodge check for half effect.' },
  { id: 'area_shapeable', name: 'Area (Shapeable)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects 30 cubic feet shaped as desired (+30 cu ft per rank). Dodge check for half effect.' },
  { id: 'attack', name: 'Attack', cost: 0, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Converts personal power into an attack resisted by Dodge/Fortitude/Will (specific to Personal range powers).' },
  { id: 'contagious', name: 'Contagious', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Spreads to any person touching or in close contact with the affected target (specific to attack/condition effects).' },
  { id: 'continuous', name: 'Continuous', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Power remains active continuously without needing maintenance actions until deliberately dismissed.' },
  { id: 'cumulative', name: 'Cumulative', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Affliction/Weaken/Nullify degrees accumulate across multiple hits on same target (specific to Affliction, Weaken, Nullify).' },
  { id: 'extended_range', name: 'Extended Range', cost: 1, isFlat: true, isRanked: true, maxRank: 4, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Doubles short, medium, and long range increments per rank.' },
  { id: 'homing', name: 'Homing', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Reroll missed attack checks once per round per rank of homing.' },
  { id: 'impervious', name: '★ Impervious', cost: 1, isFlat: false, isUnique: true, isRanked: true, maxRankByEffect: true, minRank: 1, isEffectSpecific: true, desc: 'Ignores damage effects with rank <= half impervious rank (specific to Protection / Defenses).' },
  { id: 'increased_duration', name: 'Increased Duration', cost: 1, isFlat: false, isRanked: true, maxRank: 3, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Increases duration by one step per rank (Instant -> Concentration -> Sustained -> Continuous).' },
  { id: 'increased_mass', name: 'Increased Mass', cost: 1, isFlat: true, isRanked: true, maxRank: 20, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Allows carrying or affecting additional mass ranks with movement or teleport effects (Flat 1 point per rank).' },
  { id: 'increased_range', name: 'Increased Range', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Increases range by one step per rank (Close -> Ranged [1 rank], Close -> Perception [2 ranks]).' },
  { id: 'incurable', name: 'Incurable', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Cannot be healed by ordinary Healing or Regeneration without Persistent.' },
  { id: 'linked', name: 'Linked', cost: 0, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Links two powers together so they activate simultaneously on the same target with one action.' },
  { id: 'multiattack', name: 'Multiattack', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Fires bursts for +2 or +5 damage bonus on high hits, or sprays multiple targets.' },
  { id: 'penetrating', name: '★ Penetrating', cost: 1, isFlat: false, isRanked: true, maxRankByEffect: true, minRank: 1, isUnique: true, isEffectSpecific: true, desc: 'Overcomes Impervious Toughness equal to the penetrating rank (specific to Damage).' },
  { id: 'portal', name: '★ Portal', cost: 2, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Teleport creates an open portal that remains open until your next turn for others to pass through (+2 cost per rank).' },
  { id: 'precise', name: 'Precise', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Power can perform fine or delicate tasks with great finesse.' },
  { id: 'progressive', name: '★ Progressive', cost: 2, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Target makes defense check each round until resisting; failure increases degree of affliction or weaken (specific to Affliction, Weaken).' },
  { id: 'psychic', name: '★ Psychic', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Illusion is perceived directly in the minds of targets rather than in the external environment (+1 cost per rank).' },
  { id: 'reach', name: 'Reach', cost: 1, isFlat: true, isRanked: true, maxRank: 10, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Extends reach of close range attack by 5ft per rank (specific to Close range powers).' },
  { id: 'reaction', name: 'Reaction Action', cost: 3, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Power triggers automatically in response to a specified triggering event.' },
  { id: 'responsive', name: '★ Responsive', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Summoned creatures are responsive and can act on the same round summoned (+1 cost per rank).' },
  { id: 'reversible', name: 'Reversible', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Can undo or remove power effects at will (e.g. undoing Affliction, Damage bruised, or Insubstantial).' },
  { id: 'ricochet', name: 'Ricochet', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Power can bounce off solid surfaces around corners or obstacles.' },
  { id: 'secondary_effect', name: 'Secondary Effect', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Power hits again automatically on the next round without an additional action roll (specific to Instant duration attacks).' },
  { id: 'selective', name: 'Selective', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Freely choose who is affected within the area (requires Area modifier).' },
  { id: 'split', name: 'Split', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Splits power rank across multiple targets (e.g. Rank 10 split into two Rank 5 attacks).' },
  { id: 'strength_based', name: '★ Strength-Based', cost: 0, isFlat: true, isUnique: true, isEffectSpecific: true, desc: 'Adds Strength rank directly to power damage (specific to Damage effects).' },
  { id: 'subtle', name: 'Subtle', cost: 1, isFlat: true, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Power display is imperceptible (Rank 1 DC 20 Perception, Rank 2 completely invisible).' },
  { id: 'sustained', name: 'Sustained', cost: 0, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Requires a free action each round to maintain.' },
  { id: 'triggered', name: 'Triggered', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Sets a conditional trigger or trap that activates automatically when conditions are met.' },
  { id: 'turnabout', name: '★ Turnabout', cost: 1, isFlat: true, isUnique: true, isEffectSpecific: true, desc: 'Allows moving before and after using Teleport, or returning to starting point (Flat 1 point).' },
  { id: 'variable_conditions', name: '★ Variable Conditions', cost: 2, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Affliction can impose different condition sets chosen when the attack is made (+2 cost per rank).' },
  { id: 'variable_descriptor', name: 'Variable Descriptor', cost: 1, isFlat: true, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Change descriptor freely (Rank 1 broad group like weather or elements, Rank 2 any descriptor).' }
];

export const FLAWS_CATALOG = [
  { id: 'action_flaw', name: 'Action (Slower)', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Increases the time required to use the effect by one step per rank (Free -> Move -> Standard).' },
  { id: 'activation_move', name: 'Activation (Move Action)', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Takes a move action to activate before benefits apply.' },
  { id: 'activation_standard', name: 'Activation (Standard Action)', cost: 2, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Takes a standard action to activate.' },
  { id: 'check_required', name: 'Check Required (Skill DC 11+)', cost: 1, isFlat: false, isRanked: true, maxRank: 10, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Requires successful skill check to activate (DC 11 + rank).' },
  { id: 'concentration', name: 'Concentration Duration', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Requires standard action each round to maintain.' },
  { id: 'diminished_range', name: 'Diminished Range', cost: 1, isFlat: true, isRanked: true, maxRank: 3, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Reduces ranged attack range brackets (Rank 1: 10/25/50, Rank 2: 5/10/25, Rank 3: 2/5/10; specific to Ranged attacks).' },
  { id: 'distracting', name: 'Distracting', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'You become vulnerable while using this power, halving active defenses.' },
  { id: 'easily_removable', name: 'Easily Removable (Device / Disarmable)', cost: 0, isFlat: false, isDevice: true, discountPer5: 2, isUnique: false, isEffectSpecific: false, desc: 'Handheld item easily knocked away or stolen (-2 PP per 5 PP total).' },
  { id: 'empathic', name: '★ Empathic', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'You suffer any damage conditions that you successfully heal from others (specific to Healing).' },
  { id: 'fades', name: 'Fades', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Loses 1 rank per use until restored by recharge or rest.' },
  { id: 'feedback', name: 'Feedback', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Damage inflicted on power manifestations damages you directly (specific to physical or sensory manifestations: Create, Illusion, Summon, Remote Sensing).' },
  { id: 'grab_based', name: 'Grab-Based', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Must first successfully grab or pin target before power takes effect (specific to Close attacks).' },
  { id: 'inaccurate', name: 'Inaccurate (-2 to hit)', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: '-2 penalty on attack checks per rank of Inaccurate.' },
  { id: 'limited', name: 'Limited (Half Utility/Specific Targets)', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Only works in limited conditions, against specific foes (-1/rank per tier of limitation).' },
  { id: 'limited_location', name: '★ Limited to Locations', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: true, isEffectSpecific: true, desc: 'Teleport is limited to fixed transit locations, portals, or anchor points (-1 or -2 cost per rank).' },
  { id: 'limited_to_minds', name: '★ Limited to Minds', cost: 1, isFlat: false, isRanked: true, maxRank: 1, minRank: 1, isUnique: true, isEffectSpecific: true, desc: 'Effect only works on thinking creatures with a mind (-1 cost per rank).' },
  { id: 'limited_ambient', name: '★ Limited: Ambient Source', cost: 1, isFlat: false, isRanked: true, maxRank: 1, minRank: 1, isUnique: true, isEffectSpecific: true, desc: 'Requires existing ambient source of the element or energy to manipulate (-1 cost per rank).' },
  { id: 'limited_custom', name: 'Limited: Custom', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Effect loses about half its effectiveness under custom conditions or against specific targets (-1 or -2 cost per rank).' },
  { id: 'limited_to_resistance', name: '★ Limited: Single Resistance', cost: 1, isFlat: false, isRanked: true, maxRank: 1, minRank: 1, isUnique: true, isEffectSpecific: true, desc: 'Effect is limited to a single specific resistance or defense (-1 cost per rank).' },
  { id: 'noticeable', name: 'Noticeable', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Power is clearly obvious and conspicuous even if continuous or passive.' },
  { id: 'quirk', name: 'Quirk (Minor drawback)', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Minor inconvenience or limitation (-1 PP flat per quirk).' },
  { id: 'reduced_range', name: 'Reduced Range', cost: 1, isFlat: false, isRanked: true, maxRank: 1, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Power range reduced by one step (Perception -> Ranged, or Ranged -> Close).' },
  { id: 'removable', name: 'Removable (Worn Device / Suit / Belt)', cost: 0, isFlat: false, isDevice: true, discountPer5: 1, isUnique: false, isEffectSpecific: false, desc: 'Worn suit or gadget that can only be removed when immobilized (-1 PP per 5 PP total).' },
  { id: 'resistible', name: 'Resistible', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Allows extra defense check (e.g. Will or Fortitude) to completely negate.' },
  { id: 'self_powered', name: '★ Self-Powered', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Summoned minion draws power from the summoner; damage or fatigue to minion affects the summoner (-1 cost per rank).' },
  { id: 'sense_dependent', name: 'Sense-Dependent', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Target must be able to perceive power with specific sense.' },
  { id: 'side_effect', name: 'Side Effect', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Suffers automatic negative backlash if power roll fails or is used (-1 or -2/rank).' },
  { id: 'tiring', name: 'Tiring', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Causes 1 degree of fatigue when used; can be offset with hero point.' },
  { id: 'transit_time', name: '★ Transit Time', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: true, isEffectSpecific: true, desc: 'Teleportation requires time to travel across the distance rather than being instantaneous (Flat -1 point per rank).' },
  { id: 'uncontrolled', name: 'Uncontrolled', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'GM decides when and how the power triggers or manifests.' },
  { id: 'unreliable', name: 'Unreliable (5 uses or 50% fail)', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Has 5 uses per scene or requires a DC 11 flat check before each use.' }
];

export const AFFLICTION_CONDITIONS = {
  resistedBy: ['Fortitude', 'Will'],
  degree1: ['Dazed', 'Entangled', 'Fatigued', 'Hindered', 'Impaired', 'Vulnerable'],
  degree2: ['Stunned', 'Compelled', 'Defenseless', 'Disabled', 'Exhausted', 'Immobile', 'Prone'],
  degree3: ['Incapacitated', 'Asleep', 'Blind', 'Controlled', 'Paralyzed', 'Transformed', 'Unaware']
};

export const IMMUNITY_OPTIONS_CATALOG = [
  // 1 Rank
  { id: 'aging', name: 'Aging', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'disease_spec', name: 'Disease (Specific, e.g. Cold/Flu)', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'poison_spec', name: 'Poison (Specific, e.g. Arsenic)', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'suffocation_holding', name: 'Suffocation (Holding breath / lung capacity)', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'cold_env', name: 'Environmental Cold (Extreme cold)', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'heat_env', name: 'Environmental Heat (Extreme heat)', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'pressure_env', name: 'High Pressure / Deep Sea', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'vacuum_env', name: 'Vacuum & Zero Gravity', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'radiation_env', name: 'Environmental Radiation', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'starvation', name: 'Starvation & Thirst', ranks: 1, category: '1 Rank (Biological & Environmental)' },
  { id: 'drowning', name: 'Drowning', ranks: 1, category: '1 Rank (Biological & Environmental)' },

  // 2 Ranks
  { id: 'crit_hits', name: 'Critical Hits', ranks: 2, category: '2 Ranks (Combat & Physiological)' },
  { id: 'suffocation_all', name: 'Suffocation (All / No Need to Breathe)', ranks: 2, category: '2 Ranks (Combat & Physiological)' },

  // 5 Ranks
  { id: 'disease_all', name: 'All Diseases', ranks: 5, category: '5 Ranks (Broad Hazards & Defenses)' },
  { id: 'poison_all', name: 'All Poisons', ranks: 5, category: '5 Ranks (Broad Hazards & Defenses)' },
  { id: 'env_all', name: 'All Environmental Conditions', ranks: 5, category: '5 Ranks (Broad Hazards & Defenses)' },
  { id: 'entrapment', name: 'Entrapment (Bonds, Snare, Grabs)', ranks: 5, category: '5 Ranks (Broad Hazards & Defenses)' },
  { id: 'alteration', name: 'Alteration Effects', ranks: 5, category: '5 Ranks (Broad Hazards & Defenses)' },
  { id: 'sensory_aff', name: 'Sensory Affliction (Specific Sense, e.g. Dazzle)', ranks: 5, category: '5 Ranks (Broad Hazards & Defenses)' },
  { id: 'falling_damage', name: 'Falling Damage', ranks: 5, category: '5 Ranks (Broad Hazards & Defenses)' },
  { id: 'suffocation_dmg', name: 'Suffocation Damage', ranks: 5, category: '5 Ranks (Broad Hazards & Defenses)' },

  // 10 Ranks
  { id: 'life_support', name: 'Life Support (Disease, Poison, All Env, Suffocation, Starvation)', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },
  { id: 'dmg_fire', name: 'Fire / Heat Damage', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },
  { id: 'dmg_cold', name: 'Cold Damage', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },
  { id: 'dmg_electricity', name: 'Electricity Damage', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },
  { id: 'dmg_radiation', name: 'Radiation Damage', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },
  { id: 'dmg_sonic', name: 'Sonic Damage', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },
  { id: 'interaction_skills', name: 'Interaction Skills & Emotion Effects', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },
  { id: 'magic_desc', name: 'Magic Descriptor Effects (Common)', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },
  { id: 'tech_desc', name: 'Technology Descriptor Effects (Common)', ranks: 10, category: '10 Ranks (Life Support & Common Descriptors)' },

  // 20 Ranks
  { id: 'all_energy_dmg', name: 'Very Common Descriptor: All Energy Damage', ranks: 20, category: '20 Ranks (Very Common Descriptors)' },
  { id: 'all_physical_dmg', name: 'Very Common Descriptor: All Physical Damage', ranks: 20, category: '20 Ranks (Very Common Descriptors)' },
  { id: 'all_mental_effects', name: 'Very Common Descriptor: All Mental Effects', ranks: 20, category: '20 Ranks (Very Common Descriptors)' },

  // 30 Ranks
  { id: 'all_fortitude', name: 'All Fortitude Effects (Construct / Undead / Inorganic)', ranks: 30, category: '30 Ranks (Total Defense System)' },
  { id: 'all_will', name: 'All Will Effects (Total Mental Immunity)', ranks: 30, category: '30 Ranks (Total Defense System)' },

  // 80 Ranks
  { id: 'all_toughness', name: 'All Toughness Effects (Impervious to Damage)', ranks: 80, category: '80 Ranks (Invulnerability)' }
];

export const WEAKEN_CONFIG_OPTIONS = {
  resistedBy: ['Fortitude', 'Will'],
  traits: ['Strength', 'Stamina', 'Agility', 'Dexterity', 'Fighting', 'Intellect', 'Awareness', 'Presence', 'Dodge', 'Parry', 'Fortitude', 'Toughness', 'Will', 'All Powers of Descriptor']
};

export const NULLIFY_CONFIG_OPTIONS = {
  descriptors: ['Magic', 'Technology', 'Mutation', 'Psionics', 'Fire / Heat', 'Cold', 'Electricity', 'Cosmic', 'Chemical'],
  scopes: ['Single Descriptor (+0 cost)', 'Broad Descriptor (+1/rank)', 'Simultaneous (+1/rank)']
};

export const SENSES_OPTIONS_CATALOG = [
  { id: 'darkvision', name: 'Darkvision', ranks: 2, desc: 'See in total darkness without penalty.' },
  { id: 'infravision', name: 'Infravision', ranks: 1, desc: 'See thermal infrared radiation/heat signatures.' },
  { id: 'low_light', name: 'Low-Light Vision', ranks: 1, desc: 'See in dim light as if it were daylight.' },
  { id: 'ultravision', name: 'Ultravision', ranks: 1, desc: 'Perceive ultraviolet light spectrum.' },
  { id: 'ultra_hearing', name: 'Ultra-Hearing', ranks: 1, desc: 'Hear very high and low sound frequencies.' },
  { id: 'radio', name: 'Radio', ranks: 1, desc: 'Receive and detect radio wave transmissions.' },
  { id: 'tracking', name: 'Tracking', ranks: 1, desc: 'Track scent/visual trails at normal speed.' },
  { id: 'accurate_hearing', name: 'Accurate (Hearing)', ranks: 2, desc: 'Pinpoint precise combat target locations by sound alone.' },
  { id: 'acute_scent', name: 'Acute (Scent)', ranks: 1, desc: 'Distinguish fine details by smell alone.' },
  { id: 'analytical', name: 'Analytical (Vision or Scent)', ranks: 1, desc: 'Analyze chemical composition, structural weak points, or DNA.' },
  { id: 'counters_concealment', name: 'Counters Concealment (e.g. Smoke/Fog)', ranks: 2, desc: 'Ignores partial and total concealment from specific visual obscurities.' },
  { id: 'counters_illusion', name: 'Counters Illusion', ranks: 2, desc: 'Automatically pierces visual illusions.' },
  { id: 'extended_vision', name: 'Extended (Vision)', ranks: 1, desc: '-1 per 100 feet rather than per 10 feet for distance checks.' },
  { id: 'microscopic', name: 'Microscopic Vision', ranks: 1, desc: 'View dust particles and cellular structures (up to rank 4 atomic).' },
  { id: 'penetrates_concealment', name: 'Penetrates Concealment (X-Ray Vision)', ranks: 4, desc: 'Perceives through solid barriers and lead-lined matter.' },
  { id: 'radius_vision', name: 'Radius (Vision)', ranks: 2, desc: '360-degree field of perception without blind spots.' },
  { id: 'rapid_senses', name: 'Rapid Senses', ranks: 1, desc: 'Read and process sensory data at 10x normal speed.' },
  { id: 'time_sense', name: 'Time Sense', ranks: 1, desc: 'Know the exact time and elapsed durations intuitively.' }
];

export function computePowerRangeAndDuration(effect, extras = [], flaws = []) {
  const baseRange = effect?.range || 'Personal';
  const baseDuration = effect?.duration || 'Instant';

  const rangeSteps = ['Personal', 'Close', 'Ranged', 'Perception'];
  const durationSteps = ['Instant', 'Concentration', 'Sustained', 'Continuous', 'Permanent'];

  let curRangeIdx = rangeSteps.indexOf(baseRange);
  if (curRangeIdx === -1) curRangeIdx = 1;

  let curDurIdx = durationSteps.indexOf(baseDuration);
  if (curDurIdx === -1) curDurIdx = 0;

  const rangeNotes = [];
  const durationNotes = [];

  const incRange = (extras || []).find(e => e.id === 'increased_range' || e.id === 'increased_range_2');
  const redRange = (flaws || []).find(f => f.id === 'reduced_range');
  const affectsOthers = (extras || []).find(e => e.id === 'affects_others');
  const attackExtra = (extras || []).find(e => e.id === 'attack');
  const reachExtra = (extras || []).find(e => e.id === 'reach');
  const dimRange = (flaws || []).find(f => f.id === 'diminished_range');

  if (baseRange === 'Personal' && (affectsOthers || attackExtra)) {
    curRangeIdx = 1; // Converts Personal to Close
    rangeNotes.push(affectsOthers ? 'Affects Others (+1/rank)' : 'Attack (+0)');
  }

  if (incRange) {
    const ranks = incRange.id === 'increased_range_2' ? 2 : (parseInt(incRange.rank, 10) || 1);
    curRangeIdx = Math.min(3, curRangeIdx + ranks);
    rangeNotes.push(`+${ranks} Increased Range`);
  }

  if (redRange) {
    const ranks = parseInt(redRange.rank, 10) || 1;
    curRangeIdx = Math.max(1, curRangeIdx - ranks);
    rangeNotes.push(`-${ranks} Reduced Range`);
  }

  const effectiveRange = rangeSteps[curRangeIdx] || baseRange;

  if (effectiveRange === 'Close' && reachExtra) {
    const reachRanks = parseInt(reachExtra.rank, 10) || 1;
    rangeNotes.push(`Reach +${reachRanks * 5} ft`);
  }
  if (effectiveRange === 'Ranged' && dimRange) {
    rangeNotes.push(`Diminished Range (${parseInt(dimRange.rank, 10) || 1} ranks)`);
  }

  // Duration derivation
  const incDuration = (extras || []).find(e => e.id === 'sustained' || e.id === 'continuous' || e.id === 'increased_duration');
  const concentrationFlaw = (flaws || []).find(f => f.id === 'concentration');

  if (incDuration) {
    if (incDuration.id === 'continuous') {
      curDurIdx = 3;
      durationNotes.push('Continuous (+1/rank)');
    } else if (incDuration.id === 'sustained') {
      curDurIdx = Math.max(curDurIdx, 2);
      durationNotes.push('Sustained (+1/rank)');
    } else {
      const ranks = parseInt(incDuration.rank, 10) || 1;
      curDurIdx = Math.min(3, curDurIdx + ranks);
      durationNotes.push(`+${ranks} Increased Duration`);
    }
  }

  if (concentrationFlaw) {
    curDurIdx = 1;
    durationNotes.push('Concentration (-1/rank)');
  }

  const effectiveDuration = durationSteps[curDurIdx] || baseDuration;

  return {
    baseRange,
    effectiveRange,
    rangeNotes: rangeNotes.join(', '),
    baseDuration,
    effectiveDuration,
    durationNotes: durationNotes.join(', ')
  };
}

export function computePowerEffectiveStats(effect, extras = [], flaws = [], action = null, rank = null) {
  const rd = computePowerRangeAndDuration(effect, extras, flaws);
  const baseAction = effect?.action || 'Standard';
  let effectiveAction = baseAction;

  const hasReaction = (extras || []).some(e => e.id === 'reaction');
  const actionEx = (extras || []).find(e => e.id === 'action_extra');
  const actionFl = (flaws || []).find(f => f.id === 'action_flaw');

  const actionExRanks = actionEx ? (parseInt(actionEx.rank, 10) || 1) : 0;
  const actionFlRanks = actionFl ? (parseInt(actionFl.rank, 10) || 1) : 0;
  const netActionChange = actionExRanks - actionFlRanks;

  if (hasReaction) {
    effectiveAction = 'Reaction';
  } else if (netActionChange > 0) {
    if (baseAction === 'Standard') {
      effectiveAction = netActionChange >= 2 ? 'Free' : 'Move';
    } else if (baseAction === 'Move') {
      effectiveAction = 'Free';
    }
  } else if (netActionChange < 0) {
    const slowRanks = Math.abs(netActionChange);
    if (baseAction === 'Free') {
      effectiveAction = slowRanks >= 2 ? 'Standard' : 'Move';
    } else if (baseAction === 'Move') {
      effectiveAction = 'Standard';
    }
  } else if (actionExRanks > 0 && actionFlRanks > 0 && netActionChange === 0) {
    // Action extra and Action flaw cancel each other out
    effectiveAction = baseAction;
  } else if (action) {
    effectiveAction = action;
  }

  // Area calculation
  let effectiveArea = 'Single Target';
  let areaNotes = '';
  const areaExtras = (extras || []).filter(e => e.id?.startsWith('area_') || e.id === 'area');
  if (areaExtras.length > 0) {
    const descriptions = areaExtras.map(ae => {
      const rk = parseInt(ae.rank, 10) || 1;
      if (ae.id === 'area_burst') return `Burst (${30 * rk} ft radius)`;
      if (ae.id === 'area_cone') return `Cone (${60 * rk} ft)`;
      if (ae.id === 'area_line') return `Line (${30 * rk} ft)`;
      if (ae.id === 'area_shapeable') return `Shapeable (${30 * rk} cu ft)`;
      if (ae.id === 'area_cloud') return `Cloud (${15 * rk} ft radius)`;
      if (ae.id === 'area_cylinder') return `Cylinder (${30 * rk} ft radius/height)`;
      if (ae.id === 'area_perception') return `Perception Area`;
      return `${ae.name || 'Area'} (${rk})`;
    });
    effectiveArea = descriptions.join(', ');
    const hasSelective = (extras || []).some(e => e.id === 'selective');
    if (hasSelective) areaNotes = 'Selective';
  } else if (rd.effectiveRange === 'Personal') {
    effectiveArea = 'Personal';
  }

  // Measurements derivation
  const effectRank = Math.max(0, parseInt(rank ?? effect?.rank ?? 10, 10));
  let rangeMeasurement = '';
  if (rd.effectiveRange === 'Ranged') {
    const extRange = (extras || []).find(e => e.id === 'extended_range');
    const dimRange = (flaws || []).find(f => f.id === 'diminished_range');
    let distRank = effectRank;
    if (extRange) distRank += (parseInt(extRange.rank, 10) || 1);
    if (dimRange) distRank = Math.max(0, distRank - (parseInt(dimRange.rank, 10) || 1));
    const clampedRank = Math.min(20, Math.max(-5, Math.round(distRank)));
    const entry = MEASUREMENTS_TABLE.find(m => m.rank === clampedRank);
    rangeMeasurement = entry ? entry.distance : `${effectRank * 100} ft.`;
  } else if (rd.effectiveRange === 'Close') {
    const reach = (extras || []).find(e => e.id === 'reach');
    const reachRanks = reach ? (parseInt(reach.rank, 10) || 1) : 0;
    rangeMeasurement = `${5 + reachRanks * 5} ft.`;
  } else if (rd.effectiveRange === 'Personal') {
    rangeMeasurement = 'Self';
  } else if (rd.effectiveRange === 'Perception') {
    rangeMeasurement = 'Line of Sight';
  }

  const rangeDisplay = rangeMeasurement ? `${rd.effectiveRange} (${rangeMeasurement})` : rd.effectiveRange;

  return {
    ...rd,
    action: effectiveAction,
    baseAction,
    rangeDisplay,
    rangeMeasurement,
    area: effectiveArea,
    areaNotes
  };
}

export function isModifierLegalForEffect(modifier, effect, extras = [], flaws = [], mainPower = null) {
  // 0. Alternate Effect restrictions against primary effect
  if (mainPower) {
    if (modifier.isDevice) {
      return { legal: false, reason: 'Device flaws (Removable) apply to the power container as a whole, not individual alternate effects' };
    }
    if (modifier.isUnique) {
      const mainExtras = mainPower.extras || [];
      const mainFlaws = mainPower.flaws || [];
      const hasInMain = mainExtras.some(e => e.id === modifier.id) || mainFlaws.some(f => f.id === modifier.id);
      if (hasInMain) {
        return { legal: false, reason: `Primary effect already has the unique modifier "${modifier.name.replace(/^★\s*/, '')}"` };
      }
    }
  }

  const extraIds = new Set((extras || []).map(e => e.id));
  const flawIds = new Set((flaws || []).map(f => f.id));
  const baseRange = effect?.range || 'Personal';
  const effId = effect?.id || '';
  const rd = computePowerRangeAndDuration(effect, extras, flaws);
  const effectiveRange = rd.effectiveRange;

  // 1. Single instance rule: cannot add multiple instances of the same modifier
  if (extraIds.has(modifier.id) || flawIds.has(modifier.id)) {
    return { legal: false, reason: 'Already added (adjust ranks instead)' };
  }

  // 2. Removable / Easily Removable exclusivity
  if (modifier.id === 'removable' && flawIds.has('easily_removable')) {
    return { legal: false, reason: 'Incompatible with Easily Removable' };
  }
  if (modifier.id === 'easily_removable' && flawIds.has('removable')) {
    return { legal: false, reason: 'Incompatible with Removable' };
  }

  // 3. Activation exclusivity
  if (modifier.id === 'activation_move' && flawIds.has('activation_standard')) {
    return { legal: false, reason: 'Incompatible with Standard Action Activation' };
  }
  if (modifier.id === 'activation_standard' && flawIds.has('activation_move')) {
    return { legal: false, reason: 'Incompatible with Move Action Activation' };
  }

  // 4. Increased Range vs Reduced Range
  if (modifier.id === 'increased_range' && flawIds.has('reduced_range')) {
    return { legal: false, reason: 'Incompatible with Reduced Range' };
  }
  if (modifier.id === 'reduced_range' && extraIds.has('increased_range')) {
    return { legal: false, reason: 'Incompatible with Increased Range' };
  }

  // 4b. Action extra / flaw constraints
  const baseAction = effect?.action || 'Standard';
  if (modifier.id === 'action_extra') {
    if (extraIds.has('reaction')) return { legal: false, reason: 'Incompatible with Reaction Action' };
    if (baseAction === 'Free' && !flawIds.has('action_flaw')) return { legal: false, reason: 'Effect is already Free action' };
    if (baseAction === 'Reaction') return { legal: false, reason: 'Reaction is already instantaneous' };
    if (baseAction === 'None') return { legal: false, reason: 'Passive effect cannot take Action extra' };
  }
  if (modifier.id === 'reaction') {
    if (flawIds.has('action_flaw')) return { legal: false, reason: 'Incompatible with Action (Slower) flaw' };
    if (extraIds.has('action_extra')) return { legal: false, reason: 'Incompatible with Action (Faster) extra' };
    if (baseAction === 'Reaction') return { legal: false, reason: 'Effect is already Reaction action' };
    if (baseAction === 'None') return { legal: false, reason: 'Passive effect cannot take Reaction' };
  }
  if (modifier.id === 'action_flaw') {
    if (extraIds.has('reaction')) return { legal: false, reason: 'Incompatible with Reaction Action' };
    if (baseAction === 'Standard' && !extraIds.has('action_extra')) return { legal: false, reason: 'Standard action cannot be made slower' };
    if (baseAction === 'None') return { legal: false, reason: 'Passive effect cannot take Action flaw' };
  }

  // 5. Range-specific constraints
  if (modifier.id === 'increased_range') {
    if (baseRange === 'Perception') return { legal: false, reason: 'Perception is already maximum range' };
    if (baseRange === 'Personal' && !extraIds.has('affects_others') && !extraIds.has('attack')) {
      return { legal: false, reason: 'Requires Affects Others or Attack first' };
    }
  }

  if (modifier.id === 'reduced_range') {
    if (baseRange === 'Personal' || baseRange === 'Close') {
      return { legal: false, reason: 'Cannot reduce Close or Personal range' };
    }
  }

  const isAttackEffect = !!(effect?.isAttack || extraIds.has('attack') || (extras || []).some(e => e.id === 'attack'));

  // Attack-only extras and flaws (unless power is an attack effect or has Attack extra)
  if (['accurate', 'homing', 'multiattack', 'penetrating', 'ricochet', 'secondary_effect', 'contagious'].includes(modifier.id)) {
    if (!isAttackEffect) {
      return { legal: false, reason: `${modifier.name.replace(/^★\s*/, '')} only applies to attack effects` };
    }
  }

  if (['inaccurate', 'diminished_range', 'grab_based'].includes(modifier.id)) {
    if (!isAttackEffect) {
      return { legal: false, reason: `${modifier.name.replace(/^★\s*/, '')} only applies to attack effects` };
    }
  }

  if (modifier.id === 'homing') {
    if (effectiveRange !== 'Ranged') {
      return { legal: false, reason: 'Homing only applies to Ranged attack effects' };
    }
  }

  if (modifier.id === 'ricochet') {
    if (effectiveRange !== 'Ranged') {
      return { legal: false, reason: 'Ricochet only applies to Ranged attack effects' };
    }
  }

  if (modifier.id === 'diminished_range') {
    if (effectiveRange !== 'Ranged') {
      return { legal: false, reason: 'Diminished Range flaw only applies to Ranged attack effects' };
    }
  }

  if (modifier.id === 'grab_based') {
    if (effectiveRange !== 'Close') {
      return { legal: false, reason: 'Grab-Based flaw only applies to Close range attack effects' };
    }
  }

  if (modifier.id === 'reach') {
    if (effectiveRange !== 'Close') return { legal: false, reason: 'Reach only applies to Close range' };
  }

  if (modifier.id === 'extended_range') {
    if (effectiveRange !== 'Ranged') {
      return { legal: false, reason: 'Extended Range only applies to Ranged effects' };
    }
  }

  if (modifier.id === 'secondary_effect') {
    if (rd.effectiveDuration !== 'Instant') {
      return { legal: false, reason: 'Secondary Effect only applies to Instant duration attack effects' };
    }
  }

  // 6. Area constraints
  if (modifier.id?.startsWith('area_') || modifier.id === 'area') {
    if (baseRange === 'Personal' && !extraIds.has('affects_others') && !extraIds.has('attack')) {
      return { legal: false, reason: 'Personal powers require Affects Others or Attack first' };
    }
    const hasOtherArea = Array.from(extraIds).some(id => id.startsWith('area_') && id !== modifier.id);
    if (hasOtherArea) {
      return { legal: false, reason: 'Cannot combine multiple Area shapes' };
    }
  }

  if (modifier.id === 'selective') {
    const hasArea = Array.from(extraIds).some(id => id.startsWith('area_'));
    if (!hasArea) return { legal: false, reason: 'Requires an Area modifier' };
  }

  // 7. Duration constraints
  if (modifier.id === 'concentration') {
    if (extraIds.has('sustained') || extraIds.has('continuous') || extraIds.has('increased_duration')) {
      return { legal: false, reason: 'Incompatible with Sustained/Continuous' };
    }
  }
  if (modifier.id === 'sustained' || modifier.id === 'continuous' || modifier.id === 'increased_duration') {
    if (flawIds.has('concentration')) {
      return { legal: false, reason: 'Incompatible with Concentration flaw' };
    }
  }

  // 8. Effect-specific constraints
  if (modifier.id === 'strength_based') {
    if (!['damage', 'blast'].includes(effId)) {
      return { legal: false, reason: 'Strength-Based extra only applies to Damage effects' };
    }
  }

  if (modifier.id === 'penetrating') {
    if (!['damage', 'blast'].includes(effId)) {
      return { legal: false, reason: 'Penetrating extra only applies to Damage effects' };
    }
  }

  if (modifier.id === 'cumulative') {
    if (!['affliction', 'weaken', 'nullify'].includes(effId)) {
      return { legal: false, reason: 'Cumulative extra only applies to Affliction, Weaken, or Nullify' };
    }
    if (extraIds.has('progressive')) {
      return { legal: false, reason: 'Progressive already includes Cumulative' };
    }
  }

  if (modifier.id === 'progressive') {
    if (!['affliction', 'weaken'].includes(effId)) {
      return { legal: false, reason: 'Progressive extra only applies to Affliction or Weaken' };
    }
  }

  if (modifier.id === 'attack') {
    if (baseRange !== 'Personal') {
      return { legal: false, reason: 'Attack extra only applies to Personal range powers' };
    }
    if (extraIds.has('affects_others')) {
      return { legal: false, reason: 'Cannot combine Attack extra with Affects Others' };
    }
  }

  if (modifier.id === 'affects_others') {
    if (baseRange !== 'Personal') {
      return { legal: false, reason: 'Affects Others extra only applies to Personal range powers' };
    }
    if (extraIds.has('attack')) {
      return { legal: false, reason: 'Cannot combine Affects Others with Attack extra' };
    }
  }

  if (modifier.id === 'empathic') {
    if (effId !== 'healing') {
      return { legal: false, reason: 'Empathic flaw only applies to Healing effects' };
    }
  }

  // Feedback flaw
  if (modifier.id === 'feedback') {
    if (!['create', 'illusion', 'summon', 'remote_sensing'].includes(effId)) {
      return { legal: false, reason: 'Feedback flaw only applies to effects with physical or sensory manifestations (Create, Illusion, Summon, Remote Sensing)' };
    }
  }

  // Impervious extra
  if (modifier.id === 'impervious') {
    if (!['protection', 'enhanced_trait'].includes(effId)) {
      return { legal: false, reason: 'Impervious extra only applies to Protection or defensive traits' };
    }
  }

  // Continuous extra: Sustained duration only
  if (modifier.id === 'continuous') {
    if (rd.effectiveDuration !== 'Sustained') {
      return { legal: false, reason: 'Continuous extra only applies to Sustained duration effects' };
    }
  }

  // Sustained extra: Permanent duration only
  if (modifier.id === 'sustained') {
    if (effect?.duration !== 'Permanent' && rd.effectiveDuration !== 'Permanent') {
      return { legal: false, reason: 'Sustained extra only applies to Permanent duration effects' };
    }
  }

  // Concentration flaw: Sustained duration only
  if (modifier.id === 'concentration') {
    if (rd.effectiveDuration !== 'Sustained') {
      return { legal: false, reason: 'Concentration flaw only applies to Sustained duration effects' };
    }
  }

  // Incurable extra
  if (modifier.id === 'incurable') {
    if (!isAttackEffect && !['damage', 'blast', 'affliction', 'weaken'].includes(effId)) {
      return { legal: false, reason: 'Incurable extra only applies to damaging or condition-imposing attack effects' };
    }
  }

  // Limited: Ambient Source
  if (modifier.id === 'limited_ambient') {
    if (!['blast', 'damage', 'create', 'environment', 'move_object', 'transform'].includes(effId)) {
      return { legal: false, reason: 'Limited: Ambient Source flaw only applies to manipulation, creation, or energy blast/damage effects' };
    }
  }

  // Limited to Minds
  if (modifier.id === 'limited_to_minds') {
    if (!['mind_reading', 'affliction', 'illusion', 'weaken', 'communication', 'damage', 'blast'].includes(effId) && !isAttackEffect) {
      return { legal: false, reason: 'Limited to Minds flaw only applies to mental or attack effects targeting minds' };
    }
  }

  // Limited: Single Resistance
  if (modifier.id === 'limited_to_resistance') {
    if (!isAttackEffect && !['affliction', 'weaken', 'nullify', 'damage', 'blast'].includes(effId)) {
      return { legal: false, reason: 'Limited: Single Resistance flaw only applies to resistance-checked attack effects' };
    }
  }

  // Sense-Dependent flaw
  if (modifier.id === 'sense_dependent') {
    if (baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
      return { legal: false, reason: 'Sense-Dependent flaw only applies to effects targeting others or attacks' };
    }
  }

  // Resistible flaw
  if (modifier.id === 'resistible') {
    if (baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
      return { legal: false, reason: 'Resistible flaw only applies to effects targeting others or attacks' };
    }
  }

  // Noticeable flaw
  if (modifier.id === 'noticeable') {
    if (isAttackEffect || ['damage', 'blast', 'environment'].includes(effId)) {
      return { legal: false, reason: 'Noticeable flaw only applies to passive, continuous, or defensive effects (attacks are already noticeable)' };
    }
  }

  // Split extra
  if (modifier.id === 'split') {
    if (baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
      return { legal: false, reason: 'Split extra only applies to effects that can target others (requires Attack or Affects Others for Personal effects)' };
    }
    const hasArea = Array.from(extraIds).some(id => id.startsWith('area_') || id === 'area');
    if (hasArea) {
      return { legal: false, reason: 'Split extra cannot apply to Area effects (Area already affects multiple targets)' };
    }
  }

  // Triggered extra
  if (modifier.id === 'triggered') {
    if (baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
      return { legal: false, reason: 'Triggered extra only applies to effects targeting others, locations, or attacks (requires Attack or Affects Others for Personal effects)' };
    }
  }

  // Reversible extra
  if (modifier.id === 'reversible') {
    if (baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
      return { legal: false, reason: 'Reversible extra only applies to effects that impose conditions or changes on others or the environment' };
    }
  }

  // Power Profiles specific modifiers
  if (modifier.id === 'psychic') {
    if (effId !== 'illusion') return { legal: false, reason: 'Psychic extra only applies to Illusion' };
  }
  if (modifier.id === 'variable_conditions') {
    if (effId !== 'affliction') return { legal: false, reason: 'Variable Conditions extra only applies to Affliction' };
  }
  if (modifier.id === 'responsive') {
    if (effId !== 'summon') return { legal: false, reason: 'Responsive extra only applies to Summon' };
  }
  if (modifier.id === 'self_powered') {
    if (effId !== 'summon') return { legal: false, reason: 'Self-Powered flaw only applies to Summon' };
  }
  if (['portal', 'turnabout', 'transit_time', 'limited_location'].includes(modifier.id)) {
    if (effId !== 'teleport') return { legal: false, reason: `${modifier.name.replace(/^★\s*/, '')} only applies to Teleport` };
  }
  if (modifier.id === 'increased_mass') {
    if (!['teleport', 'flight', 'speed', 'leaping', 'movement', 'move_object'].includes(effId)) {
      return { legal: false, reason: 'Increased Mass only applies to movement, teleportation, or manipulation effects' };
    }
  }

  return { legal: true };
}

export function validateModifierLegality(effect, extras = [], flaws = [], mainPower = null) {
  const errors = [];
  const warnings = [];

  // Alternate Effect restrictions against primary effect
  if (mainPower) {
    (extras || []).forEach(e => {
      const def = EXTRAS_CATALOG.find(x => x.id === e.id) || e;
      if (def.isUnique && (mainPower.extras || []).some(me => me.id === e.id)) {
        errors.push(`Alternate Effect cannot have the same unique modifier "${def.name}" as the primary effect.`);
      }
    });
    (flaws || []).forEach(f => {
      const def = FLAWS_CATALOG.find(x => x.id === f.id) || f;
      if (def.isDevice) {
        errors.push(`Alternate Effect cannot have Device flaw "${def.name}". Removable flaws apply to the entire power container.`);
      } else if (def.isUnique && (mainPower.flaws || []).some(mf => mf.id === f.id)) {
        errors.push(`Alternate Effect cannot have the same unique modifier "${def.name}" as the primary effect.`);
      }
    });
  }

  // Check for duplicate modifier instances
  const seenExtras = new Set();
  (extras || []).forEach(e => {
    if (seenExtras.has(e.id)) {
      const def = EXTRAS_CATALOG.find(x => x.id === e.id) || e;
      errors.push(`Multiple instances of "${def.name}" detected. Adjust ranks on the existing modifier instead.`);
    }
    seenExtras.add(e.id);
  });

  const seenFlaws = new Set();
  (flaws || []).forEach(f => {
    if (seenFlaws.has(f.id)) {
      const def = FLAWS_CATALOG.find(x => x.id === f.id) || f;
      errors.push(`Multiple instances of "${def.name}" detected. Adjust ranks on the existing modifier instead.`);
    }
    seenFlaws.add(f.id);
  });

  const extraIds = new Set((extras || []).map(e => e.id));
  const flawIds = new Set((flaws || []).map(f => f.id));

  // Range and Duration Conflicts
  if (extraIds.has('increased_range') && flawIds.has('reduced_range')) {
    errors.push('Cannot combine Increased Range and Reduced Range on the same effect.');
  }
  if (extraIds.has('action_extra') && flawIds.has('action_flaw')) {
    const exRank = extras.find(e => e.id === 'action_extra')?.rank || 1;
    const flRank = flaws.find(f => f.id === 'action_flaw')?.rank || 1;
    if (exRank === flRank) {
      warnings.push('Action (Faster) extra and Action (Slower) flaw cancel each other out.');
    } else {
      warnings.push(`Action (Faster) rank ${exRank} and Action (Slower) rank ${flRank} offset each other.`);
    }
  }
  if (extraIds.has('reaction') && flawIds.has('action_flaw')) {
    errors.push('Cannot combine Reaction Action extra and Action (Slower) flaw.');
  }
  if (extraIds.has('action_extra') && extraIds.has('reaction')) {
    errors.push('Cannot combine Action (Faster) and Reaction Action on the same effect.');
  }
  if (flawIds.has('removable') && flawIds.has('easily_removable')) {
    errors.push('A power cannot be both Removable and Easily Removable.');
  }
  if (flawIds.has('activation_move') && flawIds.has('activation_standard')) {
    errors.push('Cannot combine Move Action and Standard Action Activation flaws.');
  }
  if (flawIds.has('concentration') && (extraIds.has('sustained') || extraIds.has('continuous') || extraIds.has('increased_duration'))) {
    errors.push('Cannot combine Concentration flaw with Increased Duration, Sustained, or Continuous extras.');
  }
  if (extraIds.has('cumulative') && extraIds.has('progressive')) {
    errors.push('Progressive already incorporates Cumulative; combining both is illegal.');
  }

  const baseRange = effect?.range || 'Personal';
  const effId = effect?.id || '';
  const rd = computePowerRangeAndDuration(effect, extras, flaws);
  const effectiveRange = rd.effectiveRange;
  const isAttackEffect = !!(effect?.isAttack || extraIds.has('attack') || (extras || []).some(e => e.id === 'attack'));

  if (baseRange === 'Personal' && (extraIds.has('increased_range') || extraIds.has('increased_range_2')) && !extraIds.has('affects_others') && !extraIds.has('attack')) {
    errors.push('Personal range powers must take Affects Others (+1/rank) or Attack (+0) before taking Increased Range.');
  }
  if ((baseRange === 'Personal' || baseRange === 'Close') && flawIds.has('reduced_range')) {
    errors.push('Reduced Range cannot be applied to Personal or Close range effects.');
  }
  if (baseRange === 'Perception' && extraIds.has('increased_range')) {
    errors.push('Perception range is already the maximum range and cannot take Increased Range.');
  }
  if (flawIds.has('grab_based') && (!isAttackEffect || effectiveRange !== 'Close')) {
    errors.push('Grab-Based flaw only applies to Close range attack effects.');
  }
  if (flawIds.has('diminished_range') && (!isAttackEffect || effectiveRange !== 'Ranged')) {
    errors.push('Diminished Range flaw only applies to Ranged attack effects.');
  }
  if (flawIds.has('inaccurate') && !isAttackEffect) {
    errors.push('Inaccurate flaw only applies to attack effects.');
  }
  if (extraIds.has('reach') && effectiveRange !== 'Close') {
    errors.push('Reach extra only applies to Close range effects.');
  }
  if (extraIds.has('extended_range') && effectiveRange !== 'Ranged') {
    errors.push('Extended Range extra only applies to Ranged effects.');
  }

  const areaExtras = (extras || []).filter(e => e.id?.startsWith('area_'));
  if (areaExtras.length > 1) {
    errors.push('Cannot combine multiple different Area shapes on the same effect.');
  }
  if (areaExtras.length > 0 && baseRange === 'Personal' && !extraIds.has('affects_others') && !extraIds.has('attack')) {
    errors.push('Personal range powers must take Affects Others or Attack before applying Area.');
  }
  if (extraIds.has('selective') && areaExtras.length === 0) {
    errors.push('Selective extra requires an Area modifier.');
  }

  // Attack checks
  if (extraIds.has('accurate') && !isAttackEffect) {
    errors.push('Accurate extra only applies to attack effects.');
  }
  if (extraIds.has('homing') && (!isAttackEffect || effectiveRange !== 'Ranged')) {
    errors.push('Homing extra only applies to Ranged attack effects.');
  }
  if (extraIds.has('multiattack') && !isAttackEffect) {
    errors.push('Multiattack extra only applies to attack effects.');
  }
  if (extraIds.has('penetrating') && (!isAttackEffect || !['damage', 'blast'].includes(effect?.id))) {
    errors.push('Penetrating extra only applies to Damage effects.');
  }
  if (extraIds.has('ricochet') && (!isAttackEffect || effectiveRange !== 'Ranged')) {
    errors.push('Ricochet extra only applies to Ranged attack effects.');
  }
  if (extraIds.has('secondary_effect') && (!isAttackEffect || rd.effectiveDuration !== 'Instant')) {
    errors.push('Secondary Effect extra only applies to Instant duration attack effects.');
  }
  if (extraIds.has('contagious') && !isAttackEffect) {
    errors.push('Contagious extra only applies to attack effects.');
  }
  if (extraIds.has('cumulative') && !['affliction', 'weaken', 'nullify'].includes(effect?.id)) {
    errors.push('Cumulative only applies to Affliction, Weaken, or Nullify.');
  }
  if (extraIds.has('progressive') && !['affliction', 'weaken'].includes(effect?.id)) {
    errors.push('Progressive only applies to Affliction or Weaken.');
  }
  if (extraIds.has('affects_others') && extraIds.has('attack')) {
    errors.push('Cannot combine Affects Others and Attack extras on the same power.');
  }
  if (extraIds.has('affects_others') && baseRange !== 'Personal') {
    errors.push('Affects Others extra only applies to Personal range effects.');
  }
  if (extraIds.has('attack') && baseRange !== 'Personal') {
    errors.push('Attack extra only applies to Personal range effects.');
  }

  // Effect-specific flaws & extras
  if (flawIds.has('feedback') && !['create', 'illusion', 'summon', 'remote_sensing'].includes(effId)) {
    errors.push('Feedback flaw only applies to effects with physical or sensory manifestations (Create, Illusion, Summon, Remote Sensing).');
  }
  if (extraIds.has('impervious') && !['protection', 'enhanced_trait'].includes(effId)) {
    errors.push('Impervious extra only applies to Protection or defensive traits.');
  }
  if (extraIds.has('continuous') && rd.effectiveDuration !== 'Sustained') {
    errors.push('Continuous extra only applies to Sustained duration effects.');
  }
  if (extraIds.has('sustained') && effect?.duration !== 'Permanent' && rd.effectiveDuration !== 'Permanent') {
    errors.push('Sustained extra only applies to Permanent duration effects.');
  }
  if (flawIds.has('concentration') && rd.effectiveDuration !== 'Sustained') {
    errors.push('Concentration flaw only applies to Sustained duration effects.');
  }
  if (extraIds.has('incurable') && !isAttackEffect && !['damage', 'blast', 'affliction', 'weaken'].includes(effId)) {
    errors.push('Incurable extra only applies to damaging or condition-imposing attack effects.');
  }
  if (flawIds.has('limited_ambient') && !['blast', 'damage', 'create', 'environment', 'move_object', 'transform'].includes(effId)) {
    errors.push('Limited: Ambient Source flaw only applies to manipulation, creation, or energy blast/damage effects.');
  }
  if (flawIds.has('limited_to_minds') && !['mind_reading', 'affliction', 'illusion', 'weaken', 'communication', 'damage', 'blast'].includes(effId) && !isAttackEffect) {
    errors.push('Limited to Minds flaw only applies to mental or attack effects targeting minds.');
  }
  if (flawIds.has('limited_to_resistance') && !isAttackEffect && !['affliction', 'weaken', 'nullify', 'damage', 'blast'].includes(effId)) {
    errors.push('Limited: Single Resistance flaw only applies to resistance-checked attack effects.');
  }
  if (flawIds.has('sense_dependent') && baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
    errors.push('Sense-Dependent flaw only applies to effects targeting others or attacks.');
  }
  if (flawIds.has('resistible') && baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
    errors.push('Resistible flaw only applies to effects targeting others or attacks.');
  }
  if (flawIds.has('noticeable') && (isAttackEffect || ['damage', 'blast', 'environment'].includes(effId))) {
    errors.push('Noticeable flaw only applies to passive, continuous, or defensive effects (attacks are already noticeable).');
  }
  if (extraIds.has('split')) {
    if (baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
      errors.push('Split extra only applies to effects that can target others (requires Attack or Affects Others for Personal effects).');
    }
    const hasArea = Array.from(extraIds).some(id => id.startsWith('area_') || id === 'area');
    if (hasArea) {
      errors.push('Split extra cannot apply to Area effects (Area already affects multiple targets).');
    }
  }
  if (extraIds.has('triggered') && baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
    errors.push('Triggered extra only applies to effects targeting others, locations, or attacks (requires Attack or Affects Others for Personal effects).');
  }
  if (extraIds.has('reversible') && baseRange === 'Personal' && !extraIds.has('attack') && !extraIds.has('affects_others')) {
    errors.push('Reversible extra only applies to effects that impose conditions or changes on others or the environment.');
  }

  // Rank limits
  const effectRank = parseInt(effect?.rank || 10, 10);
  (extras || []).forEach(e => {
    const def = EXTRAS_CATALOG.find(x => x.id === e.id);
    const r = parseInt(e.rank, 10) || 1;
    if (def?.maxRank && r > def.maxRank) {
      errors.push(`${def.name} rank (${r}) exceeds maximum allowed rank of ${def.maxRank}.`);
    }
    if (def?.maxRankByEffect && r > effectRank) {
      warnings.push(`${def.name} rank (${r}) cannot exceed the effect rank (${effectRank}).`);
    }
  });

  (flaws || []).forEach(f => {
    const def = FLAWS_CATALOG.find(x => x.id === f.id);
    const r = parseInt(f.rank, 10) || 1;
    if (def?.maxRank && r > def.maxRank) {
      errors.push(`${def.name} rank (${r}) exceeds maximum allowed rank of ${def.maxRank}.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function calculatePowerCost(power) {
  if (power.isAlternateEffect) {
    return power.isDynamic ? 2 : 1;
  }

  const baseCost = power.effect?.baseCost || 1;
  const rank = Math.max(1, parseInt(power.rank, 10) || 1);

  let extrasPerRank = 0;
  let flatExtras = 0;
  (power.extras || []).forEach(extra => {
    const extraDef = EXTRAS_CATALOG.find(e => e.id === extra.id);
    const unitCost = extraDef ? extraDef.cost : (extra.cost !== undefined ? extra.cost : 1);
    const isFlat = extraDef ? extraDef.isFlat : !!extra.isFlat;
    const count = parseInt(extra.rank, 10) || 1;

    if (isFlat) {
      flatExtras += unitCost * count;
    } else {
      extrasPerRank += unitCost * count;
    }
  });

  let flawsPerRank = 0;
  let flatFlaws = 0;
  let isRemovable = false;
  let isEasilyRemovable = false;

  (power.flaws || []).forEach(flaw => {
    const flawDef = FLAWS_CATALOG.find(f => f.id === flaw.id);
    if (flaw.id === 'removable') isRemovable = true;
    if (flaw.id === 'easily_removable') isEasilyRemovable = true;

    const unitCost = flawDef ? flawDef.cost : (flaw.cost !== undefined ? flaw.cost : 1);
    const isFlat = flawDef ? flawDef.isFlat : !!flaw.isFlat;
    const isDevice = flawDef ? flawDef.isDevice : !!flaw.isDevice;
    const count = parseInt(flaw.rank, 10) || 1;

    if (isFlat) {
      flatFlaws += unitCost * count;
    } else if (!isDevice) {
      flawsPerRank += unitCost * count;
    }
  });

  const netCostPerRank = baseCost + extrasPerRank - flawsPerRank;
  let rawBaseTotal = 0;

  if (netCostPerRank >= 1) {
    rawBaseTotal = netCostPerRank * rank;
  } else {
    const divisor = 2 - netCostPerRank;
    rawBaseTotal = Math.ceil(rank / divisor);
  }

  let subtotal = Math.max(1, rawBaseTotal + flatExtras - flatFlaws);

  if (isEasilyRemovable) {
    const discount = Math.floor(subtotal / 5) * 2;
    subtotal = Math.max(1, subtotal - discount);
  } else if (isRemovable) {
    const discount = Math.floor(subtotal / 5) * 1;
    subtotal = Math.max(1, subtotal - discount);
  }

  // Linked Effects sum their costs with primary power
  (power.linkedEffects || []).forEach(le => {
    subtotal += calculatePowerCost({ ...le, alternateEffects: [], linkedEffects: [] });
  });

  // Dynamic Array primary effect pays +1 PP
  if (power.isDynamicArray) {
    subtotal += 1;
  }

  let aeCost = 0;
  (power.alternateEffects || []).forEach(ae => {
    aeCost += ae.isDynamic ? 2 : 1;
  });

  return Math.max(1, subtotal + aeCost);
}

export function auditCharacter(char) {
  const pl = parseInt(char.powerLevel, 10) || 10;
  const budget = parseInt(char.powerPointsBudget, 10) || (pl * 15);

  let abilitiesCost = 0;
  ABILITIES.forEach(ab => {
    const val = parseInt(char.abilities?.[ab.id], 10) || 0;
    abilitiesCost += val * 2;
  });

  let defensesCost = 0;
  const computedDefenses = {};
  DEFENSES.forEach(def => {
    const baseVal = parseInt(char.abilities?.[def.ability], 10) || 0;
    if (def.id !== 'toughness') {
      const boughtRanks = parseInt(char.defenses?.[def.id], 10) || 0;
      defensesCost += Math.max(0, boughtRanks);
      computedDefenses[def.id] = baseVal + boughtRanks;
    }
  });

  let protectionBonus = 0;
  (char.powers || []).forEach(p => {
    if (p.effect?.id === 'protection' || p.effectId === 'protection') {
      protectionBonus += parseInt(p.rank, 10) || 0;
    }
  });

  let defensiveRollBonus = 0;
  (char.advantages || []).forEach(adv => {
    if (adv.id === 'defensive_roll') {
      defensiveRollBonus += parseInt(adv.rank, 10) || 1;
    }
  });

  computedDefenses.toughness = (parseInt(char.abilities?.sta, 10) || 0) +
    protectionBonus +
    defensiveRollBonus;

  let totalSkillRanks = 0;
  const computedSkills = [];
  (char.skills || []).forEach(sk => {
    const ranks = parseInt(sk.ranks, 10) || 0;
    totalSkillRanks += ranks;
    const skillDef = SKILLS_LIST.find(s => s.id === sk.id);
    const abId = skillDef ? skillDef.ability : 'str';
    const abVal = parseInt(char.abilities?.[abId], 10) || 0;
    const totalBonus = abVal + ranks;
    computedSkills.push({
      ...sk,
      name: skillDef ? skillDef.name : sk.id,
      ability: abId,
      abilityVal: abVal,
      totalBonus
    });
  });
  const skillsCost = Math.ceil(totalSkillRanks / 2);

  let advantagesCost = 0;
  (char.advantages || []).forEach(adv => {
    const rank = parseInt(adv.rank, 10) || 1;
    advantagesCost += rank;
  });

  let powersCost = 0;
  (char.powers || []).forEach(p => {
    powersCost += calculatePowerCost(p);
  });

  const totalSpent = abilitiesCost + defensesCost + skillsCost + advantagesCost + powersCost;
  const ppRemaining = budget - totalSpent;

  const violations = [];
  const pl2 = pl * 2;

  if (computedDefenses.dodge + computedDefenses.toughness > pl2) {
    violations.push({
      rule: 'Dodge + Toughness Cap',
      current: computedDefenses.dodge + computedDefenses.toughness,
      max: pl2,
      message: `Dodge (${computedDefenses.dodge}) + Toughness (${computedDefenses.toughness}) exceeds PL ${pl} cap of ${pl2}.`
    });
  }

  if (computedDefenses.parry + computedDefenses.toughness > pl2) {
    violations.push({
      rule: 'Parry + Toughness Cap',
      current: computedDefenses.parry + computedDefenses.toughness,
      max: pl2,
      message: `Parry (${computedDefenses.parry}) + Toughness (${computedDefenses.toughness}) exceeds PL ${pl} cap of ${pl2}.`
    });
  }

  if (computedDefenses.fortitude + computedDefenses.will > pl2) {
    violations.push({
      rule: 'Fortitude + Will Cap',
      current: computedDefenses.fortitude + computedDefenses.will,
      max: pl2,
      message: `Fortitude (${computedDefenses.fortitude}) + Will (${computedDefenses.will}) exceeds PL ${pl} cap of ${pl2}.`
    });
  }

  computedSkills.forEach(sk => {
    if (sk.totalBonus > pl + 10) {
      violations.push({
        rule: `Skill Cap: ${sk.name}`,
        current: sk.totalBonus,
        max: pl + 10,
        message: `${sk.name} total check bonus (${sk.totalBonus}) exceeds PL + 10 limit (${pl + 10}).`
      });
    }
  });

  return {
    powerLevel: pl,
    budget,
    abilitiesCost,
    defensesCost,
    skillsCost,
    advantagesCost,
    powersCost,
    totalSpent,
    ppRemaining,
    computedDefenses,
    computedSkills,
    violations,
    isCompliant: violations.length === 0 && totalSpent <= budget
  };
}

export function getStrengthLiftingCapacity(rank) {
  const table = {
    '-5': '1.5 lbs',
    '-4': '3 lbs',
    '-3': '6 lbs',
    '-2': '12 lbs',
    '-1': '25 lbs',
    '0': '50 lbs',
    '1': '100 lbs',
    '2': '200 lbs',
    '3': '400 lbs',
    '4': '800 lbs',
    '5': '1,600 lbs',
    '6': '3,200 lbs',
    '7': '3 tons',
    '8': '6 tons',
    '9': '12 tons',
    '10': '25 tons',
    '11': '50 tons',
    '12': '100 tons',
    '13': '200 tons',
    '14': '400 tons',
    '15': '800 tons',
    '16': '1,600 tons',
    '17': '3,200 tons',
    '18': '6,000 tons',
    '19': '12,000 tons',
    '20': '25,000 tons'
  };
  return table[String(rank)] || `${Math.pow(2, rank - 10) * 25} tons`;
}

export function getTraitDefinition(id, type, name) {
  if (id) {
    const byAdv = ADVANTAGES_DATABASE.find(a => a.id === id);
    if (byAdv) return { ...byAdv, traitType: 'advantage' };
    const bySkill = SKILLS_LIST.find(s => s.id === id);
    if (bySkill) return { ...bySkill, traitType: 'skill' };
    const byAb = ABILITIES.find(a => a.id === id || a.short?.toLowerCase() === id.toLowerCase());
    if (byAb) return { ...byAb, traitType: 'ability' };
    const byDef = DEFENSES.find(d => d.id === id);
    if (byDef) return { ...byDef, traitType: 'defense' };
    const byPow = POWER_EFFECTS_CATALOG.find(p => p.id === id);
    if (byPow) return { ...byPow, traitType: 'power' };
    const byExtra = EXTRAS_CATALOG.find(x => x.id === id);
    if (byExtra) return { ...byExtra, traitType: 'extra' };
    const byFlaw = FLAWS_CATALOG.find(f => f.id === id);
    if (byFlaw) return { ...byFlaw, traitType: 'flaw' };
  }
  if (name) {
    const cleanName = name.toLowerCase().replace(/^★\s*/, '').split('(')[0].trim();
    const byAdv = ADVANTAGES_DATABASE.find(a => a.name.toLowerCase() === cleanName);
    if (byAdv) return { ...byAdv, traitType: 'advantage' };
    const bySkill = SKILLS_LIST.find(s => s.name.toLowerCase() === cleanName);
    if (bySkill) return { ...bySkill, traitType: 'skill' };
    const byAb = ABILITIES.find(a => a.name.toLowerCase() === cleanName || a.short?.toLowerCase() === cleanName);
    if (byAb) return { ...byAb, traitType: 'ability' };
    const byDef = DEFENSES.find(d => d.name.toLowerCase() === cleanName);
    if (byDef) return { ...byDef, traitType: 'defense' };
    const byPow = POWER_EFFECTS_CATALOG.find(p => p.name.toLowerCase() === cleanName);
    if (byPow) return { ...byPow, traitType: 'power' };
    const byExtra = EXTRAS_CATALOG.find(x => x.name.toLowerCase().replace(/^★\s*/, '').split('(')[0].trim() === cleanName);
    if (byExtra) return { ...byExtra, traitType: 'extra' };
    const byFlaw = FLAWS_CATALOG.find(f => f.name.toLowerCase().replace(/^★\s*/, '').split('(')[0].trim() === cleanName);
    if (byFlaw) return { ...byFlaw, traitType: 'flaw' };
  }
  return null;
}

export function getLanguagesLimit(rank) {
  const r = parseInt(rank, 10) || 0;
  if (r <= 0) return 0;
  return Math.pow(2, r) - 1;
}

export const MAJOR_LANGUAGES_LIST = [
  'Afrikaans',
  'Albanian',
  'Amharic',
  'Arabic (Egyptian)',
  'Arabic (Gulf)',
  'Arabic (Levantine)',
  'Arabic (Modern Standard)',
  'Armenian',
  'Azerbaijani',
  'Basque',
  'Bengali',
  'Bosnian / Croatian / Serbian',
  'Bulgarian',
  'Burmese',
  'Catalan',
  'Cherokee',
  'Chinese (Cantonese)',
  'Chinese (Hakka)',
  'Chinese (Mandarin)',
  'Chinese (Min Nan / Taiwanese)',
  'Chinese (Shanghainese / Wu)',
  'Czech',
  'Danish',
  'Dutch',
  'English (American)',
  'English (Australian / Kiwi)',
  'English (British)',
  'Esperanto',
  'Estonian',
  'Farsi / Persian (Dari)',
  'Farsi / Persian (Iranian)',
  'Farsi / Persian (Tajik)',
  'Finnish',
  'French (Canadian / Québécois)',
  'French (European / Standard)',
  'Gaelic (Irish)',
  'Gaelic (Scottish)',
  'Georgian',
  'German (Austrian)',
  'German (Standard / High)',
  'German (Swiss)',
  'Greek (Ancient / Classical)',
  'Greek (Koine / Biblical)',
  'Greek (Modern)',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hebrew (Biblical / Ancient)',
  'Hebrew (Modern)',
  'Hindi',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Indonesian',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kazakh',
  'Khmer',
  'Korean',
  'Kurdish',
  'Latin (Classical)',
  'Latin (Ecclesiastical / Medieval)',
  'Latvian',
  'Lithuanian',
  'Macedonian',
  'Malay',
  'Malayalam',
  'Marathi',
  'Mongolian',
  'Navajo',
  'Nepali',
  'Norwegian (Bokmål / Nynorsk)',
  'Pashto',
  'Polish',
  'Portuguese (Brazilian)',
  'Portuguese (European / Continental)',
  'Punjabi',
  'Romanian',
  'Russian',
  'Sanskrit',
  'Sign Language (American / ASL)',
  'Sign Language (British / BSL)',
  'Sign Language (French / LSF)',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish (Castilian / European)',
  'Spanish (Latin American)',
  'Swahili',
  'Swedish',
  'Tagalog (Filipino)',
  'Tamil',
  'Telugu',
  'Thai',
  'Tibetan',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Vietnamese',
  'Welsh',
  'Yiddish',
  'Yoruba',
  'Zulu'
].sort((a, b) => a.localeCompare(b));

