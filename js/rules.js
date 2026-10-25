/**
 * Mutants & Masterminds 3rd Edition Core Rules & Engine
 * Official rules text from Green Ronin Publishing M&M 3e Deluxe Hero's Handbook.
 */

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
  { id: 'toughness', name: 'Toughness', ability: 'sta', desc: 'Toughness measures your character’s resistance to direct physical damage, concussive force, and energetic assault. Toughness checks resist damage conditions (DC 15 + Damage rank).' },
  { id: 'will', name: 'Will', ability: 'awe', desc: 'Will measures your mental fortitude, psychological stability, spiritual strength, and resistance to mind control, fear, illusions, and mental attacks.' }
];

export const SKILLS_LIST = [
  {
    id: 'acrobatics',
    name: 'Acrobatics',
    ability: 'agi',
    trainedOnly: false,
    desc: 'You can flip, tumble, balance, perform aerial maneuvers, and escape from grabs and restraints. You can use Acrobatics to make a feint in combat if you possess the Agile Feint advantage.',
    options: []
  },
  {
    id: 'athletics',
    name: 'Athletics',
    ability: 'str',
    trainedOnly: false,
    desc: 'Athletics covers physical feats of strength, speed, and endurance including climbing sheer cliff faces, running across obstacles, leaping across chasms, and swimming against strong currents.',
    options: []
  },
  {
    id: 'close_combat',
    name: 'Close Combat',
    ability: 'fgt',
    trainedOnly: true,
    hasSpecialty: true,
    desc: 'Close Combat is the skill for making melee attacks with a specific weapon, unarmed style, or close power effect. Each close attack check uses Fighting + Close Combat rank for that specific weapon.',
    options: ['Unarmed', 'Swords & Blades', 'Clubs & Hammers', 'Axes', 'Chains & Whips', 'Grabbing & Wrestling', 'Chi Strike']
  },
  {
    id: 'deception',
    name: 'Deception',
    ability: 'pre',
    trainedOnly: false,
    desc: 'Deception is the skill of misleading others: lying, bluffing, fast-talking, tricking an opponent in combat (feinting), creating disguises, and sending secret innuendo.',
    options: []
  },
  {
    id: 'expertise',
    name: 'Expertise',
    ability: 'int',
    trainedOnly: true,
    hasSpecialty: true,
    desc: 'Expertise covers a broad field of specialized knowledge, profession, or craft. Examples include Science, Magic, Criminal, Pop Culture, Law, Tactics, Streetwise, Engineering, Medicine, and History.',
    options: ['Science', 'Magic / Occult', 'Engineering', 'Criminal / Underworld', 'Law', 'Tactics / Military', 'Streetwise', 'Pop Culture', 'History', 'Medicine', 'Journalism']
  },
  {
    id: 'insight',
    name: 'Insight',
    ability: 'awe',
    trainedOnly: false,
    desc: 'Insight lets you evaluate others, read emotional tells, detect lies, gauge intentions, sense mental influence or mind control, and resist combat feints and trickery.',
    options: []
  },
  {
    id: 'intimidation',
    name: 'Intimidation',
    ability: 'pre',
    trainedOnly: false,
    desc: 'Intimidation is the art of getting what you want through overt force of personality, menace, or physical threat. It can be used to coerce cooperation or demoralize an opponent in combat.',
    options: []
  },
  {
    id: 'investigation',
    name: 'Investigation',
    ability: 'int',
    trainedOnly: true,
    desc: 'Investigation allows you to search crime scenes, uncover hidden evidence, follow paper trails, connect disparate clues, conduct forensic examinations, and interrogate persons of interest.',
    options: []
  },
  {
    id: 'perception',
    name: 'Perception',
    ability: 'awe',
    trainedOnly: false,
    desc: 'Perception allows you to use all five senses to notice sensory details: spotting hidden adversaries, overhearing quiet conversations, smelling gas leaks, and noticing concealed items.',
    options: []
  },
  {
    id: 'persuasion',
    name: 'Persuasion',
    ability: 'pre',
    trainedOnly: false,
    desc: 'Persuasion is the ability to convince others of your point of view through reasoned argument, debate, charisma, diplomacy, and charm. It shifts target attitudes from hostile to helpful.',
    options: []
  },
  {
    id: 'ranged_combat',
    name: 'Ranged Combat',
    ability: 'dex',
    trainedOnly: true,
    hasSpecialty: true,
    desc: 'Ranged Combat measures your marksmanship with a particular ranged weapon type or power (e.g. Blasters, Bows, Firearms, Thrown, Slings).',
    options: ['Energy Blasters', 'Firearms / Pistols', 'Rifles & Snipers', 'Bows & Arrows', 'Thrown Weapons', 'Heavy Artillery', 'Magic Bolts']
  },
  {
    id: 'sleight_of_hand',
    name: 'Sleight of Hand',
    ability: 'dex',
    trainedOnly: true,
    desc: 'Sleight of Hand covers manual dexterity for stage magic, palming small objects, pickpocketing, planting evidence on someone, and slipping out of handcuffs or bonds.',
    options: []
  },
  {
    id: 'stealth',
    name: 'Stealth',
    ability: 'agi',
    trainedOnly: false,
    desc: 'Stealth is the skill of moving without making sound and avoiding detection by sight or other senses. It is opposed by a viewer’s Perception check.',
    options: []
  },
  {
    id: 'technology',
    name: 'Technology',
    ability: 'int',
    trainedOnly: true,
    desc: 'Technology is the skill for building, inventing, repairing, modifying, and hacking electronic hardware, security systems, vehicles, mainframe networks, and super-science gadgets.',
    options: []
  },
  {
    id: 'treatment',
    name: 'Treatment',
    ability: 'int',
    trainedOnly: true,
    desc: 'Treatment allows you to perform first aid, administer CPR, stabilize dying characters, perform complex trauma surgery, and treat poisons and diseases.',
    options: []
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    ability: 'dex',
    trainedOnly: true,
    desc: 'Vehicles allows you to pilot and drive vehicles under stressful combat circumstances, including high-speed pursuit maneuvers in cars, motorcycles, helicopters, jets, and starships.',
    options: []
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
    hasOptions: true,
    desc: 'Each rank of this advantage grants you fluency in an additional spoken and written language (Rank 1: 1 language, Rank 2: 2 languages, Rank 3: 4 languages, Rank 4: 8 languages, Rank 5: 16 languages... Rank 10: speak and understand every language).',
    options: ['Spanish', 'Mandarin Chinese', 'French', 'Russian', 'German', 'Japanese', 'Arabic', 'Latin', 'Ancient Greek', 'Atlantean', 'Kryptonian / Alien']
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
    maxRank: 5,
    hasOptions: true,
    desc: 'You are so practiced with chosen skills that you can make routine checks (take 10) even under extreme danger and combat pressure. Each rank applies to one skill.',
    options: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Investigation', 'Perception', 'Stealth', 'Technology', 'Treatment', 'Vehicles']
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
  { id: 'damage', name: 'Damage', baseCost: 1, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'Toughness', dcBase: 15, isAttack: true, desc: 'Damage inflicts physical or energetic harm on targets. The target makes a Toughness check against DC (15 + Damage rank). Failure degrees impose Bruises (-1 penalty), Dazed, Staggered, or Incapacitated.' },
  { id: 'affliction', name: 'Affliction', baseCost: 1, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'Fortitude or Will', dcBase: 10, isAttack: true, desc: 'Affliction imposes adverse conditions on a target, resisting with Fortitude or Will against DC (10 + Affliction rank). Example conditions: Dazed/Stunned/Incapacitated or Hindered/Immobilized/Paralyzed.' },
  { id: 'blast', name: 'Ranged Damage', baseCost: 2, action: 'Standard', range: 'Ranged', duration: 'Instant', resist: 'Toughness', dcBase: 15, isAttack: true, desc: 'Ranged Damage projects force, energy bolts, bullets, or plasma beams to strike opponents from a distance. Resisted by Toughness (DC 15 + Damage rank).' },
  { id: 'protection', name: 'Protection', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', isDefense: true, desc: 'Protection adds directly to your character’s Toughness defense rank, resisting incoming damage.' },
  { id: 'flight', name: 'Flight', baseCost: 2, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Flight allows you to fly through the air. Speed begins at 4 MPH (Rank 1) up to supersonic speeds.' },
  { id: 'speed', name: 'Speed', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Speed allows high-speed ground running (Rank 1: 4 MPH ... Rank 10: 2,000 MPH).' },
  { id: 'quickness', name: 'Quickness', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Quickness allows you to perform routine actions and tasks in fractions of normal time.' },
  { id: 'leaping', name: 'Leaping', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Instant', resist: 'None', isMovement: true, desc: 'Leaping allows you to jump extraordinary distances without a running start.' },
  { id: 'teleport', name: 'Teleport', baseCost: 2, action: 'Move', range: 'Personal', duration: 'Instant', resist: 'None', isMovement: true, desc: 'Teleport lets you instantly vanish from one spot and reappear in another location.' },
  { id: 'move_object', name: 'Move Object', baseCost: 2, action: 'Standard', range: 'Ranged', duration: 'Sustained', resist: 'Dodge/Str', dcBase: 10, isAttack: true, desc: 'Telekinesis or tractor beams lifting and manipulating physical objects at distance.' },
  { id: 'create', name: 'Create', baseCost: 2, action: 'Standard', range: 'Ranged', duration: 'Sustained', resist: 'Dodge', dcBase: 10, desc: 'Generate solid three-dimensional objects out of hard light, ice, or matter.' },
  { id: 'illusion', name: 'Illusion', baseCost: 1, action: 'Standard', range: 'Perception', duration: 'Sustained', resist: 'Awareness/Will', dcBase: 10, desc: 'Conjure sensory impressions that deceive sight, sound, smell, or touch.' },
  { id: 'healing', name: 'Healing', baseCost: 2, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'None', dcBase: 10, desc: 'Remove damage conditions and restore health to injured subjects.' },
  { id: 'regeneration', name: 'Regeneration', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Heal bruised and staggered conditions automatically every X rounds.' },
  { id: 'immortality', name: 'Immortality', baseCost: 2, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Return from death after a period of time determined by rank.' },
  { id: 'immunity', name: 'Immunity', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Total immunity to specified hazards (aging, suffocation, life support, radiation, disease, cold, fire).' },
  { id: 'insubstantial', name: 'Insubstantial', baseCost: 5, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Transform into liquid (Rank 1), gas (Rank 2), energy (Rank 3), or incorporeal ghost (Rank 4).' },
  { id: 'morph', name: 'Morph', baseCost: 5, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Change physical appearance into other beings, humanoid forms, or any object.' },
  { id: 'senses', name: 'Senses', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Superhuman perception (darkvision, infravision, radar, scent, microscopic, radio).' },
  { id: 'concealment', name: 'Concealment', baseCost: 2, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Invisibility or total stealth shielding against visual, audio, or radar senses.' },
  { id: 'remote_sensing', name: 'Remote Sensing', baseCost: 2, action: 'Free', range: 'Rank', duration: 'Sustained', resist: 'None', desc: 'Clairvoyance, projecting perception to distant coordinates.' },
  { id: 'deflect', name: 'Deflect', baseCost: 1, action: 'Standard', range: 'Ranged', duration: 'Instant', resist: 'None', desc: 'Use active defense rolls to protect allies against ranged attacks.' },
  { id: 'nullify', name: 'Nullify', baseCost: 1, action: 'Standard', range: 'Ranged', duration: 'Instant', resist: 'Will', dcBase: 10, isAttack: true, desc: 'Counters, shuts down, or disrupts target super powers or technology.' },
  { id: 'weaken', name: 'Weaken', baseCost: 1, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'Fortitude/Will', dcBase: 10, isAttack: true, desc: 'Drains enemy abilities, defenses, or power ranks temporarily.' },
  { id: 'enhanced_trait', name: 'Enhanced Trait', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Superhuman boost to an Ability (+2/rank), Defense (+1/rank), Skill, or Advantage.' },
  { id: 'comprehend', name: 'Comprehend', baseCost: 2, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', desc: 'Understand all spoken tongues, read all languages, speak to animals or machines.' },
  { id: 'burrowing', name: 'Burrowing', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Tunnel rapidly through soil, rock, or reinforced concrete.' },
  { id: 'mind_reading', name: 'Mind Reading', baseCost: 2, action: 'Standard', range: 'Perception', duration: 'Sustained', resist: 'Will', dcBase: 10, isAttack: true, desc: 'Read target thoughts, memories, surface consciousness, or deep secrets.' }
];

export const EXTRAS_CATALOG = [
  { id: 'accurate', name: 'Accurate', cost: 1, isFlat: true, desc: '+2 to attack check rolls with this power per rank of Accurate.' },
  { id: 'affects_corporeal', name: 'Affects Corporeal', cost: 1, isFlat: false, desc: 'Can affect physical targets while you are Insubstantial.' },
  { id: 'affects_insubstantial', name: 'Affects Insubstantial', cost: 1, isFlat: true, desc: 'Full effect against Insubstantial targets (Rank 1 half, Rank 2 full).' },
  { id: 'affects_others', name: 'Affects Others', cost: 1, isFlat: false, desc: 'Can grant personal powers (Flight, Protection, etc.) to allies.' },
  { id: 'area_burst', name: 'Area (Burst 30ft)', cost: 1, isFlat: false, desc: 'Affects all targets in 30ft radius. Targets make Dodge check for half effect.' },
  { id: 'area_cone', name: 'Area (Cone 60ft)', cost: 1, isFlat: false, desc: 'Affects all targets in 60ft cone. Dodge check for half effect.' },
  { id: 'area_line', name: 'Area (Line 30ft)', cost: 1, isFlat: false, desc: 'Affects all targets in 30ft line. Dodge check for half effect.' },
  { id: 'area_shapeable', name: 'Area (Shapeable)', cost: 1, isFlat: false, desc: 'Affects 30 cubic feet shaped as desired. Dodge check for half effect.' },
  { id: 'attack', name: 'Attack', cost: 0, isFlat: false, desc: 'Converts personal power into an attack resisted by Dodge.' },
  { id: 'contagious', name: 'Contagious', cost: 1, isFlat: false, desc: 'Spreads to any person touching the affected target.' },
  { id: 'cumulative', name: 'Cumulative', cost: 1, isFlat: false, desc: 'Affliction/Weaken degrees accumulate across multiple hits on same target.' },
  { id: 'extended_range', name: 'Extended Range', cost: 1, isFlat: true, desc: 'Doubles short, medium, and long range increments.' },
  { id: 'homing', name: 'Homing', cost: 1, isFlat: true, desc: 'Reroll missed attack checks once per round per rank of homing.' },
  { id: 'impervious', name: 'Impervious', cost: 1, isFlat: false, desc: 'Ignores damage effects with rank <= half impervious rank.' },
  { id: 'increased_range', name: 'Increased Range (Close -> Ranged)', cost: 1, isFlat: false, desc: 'Increases range by one step (Personal -> Close -> Ranged -> Perception).' },
  { id: 'increased_range_2', name: 'Increased Range 2 (Close -> Perception)', cost: 2, isFlat: false, desc: 'Increases range by two steps, allowing automatic hits without attack check.' },
  { id: 'incurable', name: 'Incurable', cost: 1, isFlat: true, desc: 'Cannot be healed by ordinary Healing or Regeneration without Persistent.' },
  { id: 'multiattack', name: 'Multiattack', cost: 1, isFlat: false, desc: 'Fires bursts for +2 or +5 damage bonus on high hits, or sprays multiple targets.' },
  { id: 'penetrating', name: 'Penetrating', cost: 1, isFlat: false, desc: 'Overcomes Impervious Toughness up to the penetrating rank.' },
  { id: 'precise', name: 'Precise', cost: 1, isFlat: true, desc: 'Fine manipulation, intricate details, precise aiming.' },
  { id: 'reach', name: 'Reach (+5ft)', cost: 1, isFlat: true, desc: 'Extends melee attack reach by +5 feet per rank.' },
  { id: 'reaction', name: 'Reaction Action', cost: 3, isFlat: false, desc: 'Triggers automatically in response to specific stimulus without using your turn.' },
  { id: 'reversible', name: 'Reversible', cost: 1, isFlat: true, desc: 'Can instantly undo the power’s effects at will as a free action.' },
  { id: 'ricochet', name: 'Ricochet', cost: 1, isFlat: true, desc: 'Bounce attack around corners or off solid surfaces.' },
  { id: 'secondary_effect', name: 'Secondary Effect', cost: 1, isFlat: false, desc: 'Target suffers full effect again on following round without another attack.' },
  { id: 'selective', name: 'Selective', cost: 1, isFlat: false, desc: 'Choose exactly which targets are affected within an area effect.' },
  { id: 'subtle', name: 'Subtle', cost: 1, isFlat: true, desc: 'Power display is imperceptible (Rank 1 DC 20 Perception, Rank 2 completely invisible).' },
  { id: 'sustained', name: 'Sustained Duration', cost: 1, isFlat: false, desc: 'Maintains effect round-to-round as a free action.' },
  { id: 'triggered', name: 'Triggered', cost: 1, isFlat: true, desc: 'Sets a trap or delayed trigger activated by proximity or timer.' },
  { id: 'variable_descriptor', name: 'Variable Descriptor', cost: 1, isFlat: true, desc: 'Change descriptor freely (Rank 1: any energy/element; Rank 2: any descriptor).' }
];

export const FLAWS_CATALOG = [
  { id: 'activation_move', name: 'Activation (Move Action)', cost: 1, isFlat: true, desc: 'Takes a move action to activate before benefits apply.' },
  { id: 'activation_standard', name: 'Activation (Standard Action)', cost: 2, isFlat: true, desc: 'Takes a standard action to activate.' },
  { id: 'check_required', name: 'Check Required (Skill DC 11+)', cost: 1, isFlat: false, desc: 'Requires successful skill check to activate.' },
  { id: 'concentration', name: 'Concentration Duration', cost: 1, isFlat: false, desc: 'Requires standard action each round to maintain.' },
  { id: 'diminished_range', name: 'Diminished Range', cost: 1, isFlat: true, desc: 'Reduces ranged attack range brackets.' },
  { id: 'distracting', name: 'Distracting', cost: 1, isFlat: false, desc: 'You become vulnerable while using this power, halving active defenses.' },
  { id: 'easily_removable', name: 'Easily Removable (Device / Disarmable)', cost: 0, isFlat: false, isDevice: true, discountPer5: 2, desc: 'Handheld item easily knocked away or stolen (-2 PP per 5 PP total).' },
  { id: 'fades', name: 'Fades', cost: 1, isFlat: false, desc: 'Loses 1 rank per use until restored by recharge or rest.' },
  { id: 'feedback', name: 'Feedback', cost: 1, isFlat: false, desc: 'Damage inflicted on power manifestations damages you directly.' },
  { id: 'grab_based', name: 'Grab-Based', cost: 1, isFlat: false, desc: 'Must first successfully grab or pin target before power takes effect.' },
  { id: 'inaccurate', name: 'Inaccurate (-2 to hit)', cost: 1, isFlat: true, desc: '-2 penalty on attack checks per rank of Inaccurate.' },
  { id: 'limited', name: 'Limited (Half Utility/Specific Targets)', cost: 1, isFlat: false, desc: 'Only works in limited conditions, against specific foes.' },
  { id: 'noticeable', name: 'Noticeable', cost: 1, isFlat: true, desc: 'Power is clearly obvious and conspicuous even if continuous or passive.' },
  { id: 'quirk', name: 'Quirk (Minor drawback)', cost: 1, isFlat: true, desc: 'Minor inconvenience or limitation (-1 PP flat).' },
  { id: 'reduced_range', name: 'Reduced Range (Ranged -> Close)', cost: 1, isFlat: false, desc: 'Power range reduced by one step (Ranged to Close).' },
  { id: 'removable', name: 'Removable (Worn Device / Suit / Belt)', cost: 0, isFlat: false, isDevice: true, discountPer5: 1, desc: 'Worn suit or gadget that can only be removed when immobilized (-1 PP per 5 PP total).' },
  { id: 'resistible', name: 'Resistible', cost: 1, isFlat: false, desc: 'Allows extra defense check (e.g. Will or Fortitude) to completely negate.' },
  { id: 'sense_dependent', name: 'Sense-Dependent', cost: 1, isFlat: false, desc: 'Target must be able to perceive power with specific sense.' },
  { id: 'side_effect', name: 'Side Effect', cost: 1, isFlat: false, desc: 'Suffers automatic negative backlash if power roll fails or is used.' },
  { id: 'tiring', name: 'Tiring', cost: 1, isFlat: false, desc: 'Causes 1 degree of fatigue when used; can be offset with hero point.' },
  { id: 'uncontrolled', name: 'Uncontrolled', cost: 1, isFlat: false, desc: 'GM decides when and how the power triggers or manifests.' },
  { id: 'unreliable', name: 'Unreliable (5 uses or 50% fail)', cost: 1, isFlat: false, desc: 'Has 5 uses per scene or requires a DC 11 flat check before each use.' }
];

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

    if (isFlat) {
      const count = parseInt(extra.rank, 10) || 1;
      flatExtras += unitCost * count;
    } else {
      extrasPerRank += unitCost;
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

    if (isFlat) {
      const count = parseInt(flaw.rank, 10) || 1;
      flatFlaws += unitCost * count;
    } else if (!isDevice) {
      flawsPerRank += unitCost;
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
    const boughtRanks = parseInt(char.defenses?.[def.id], 10) || 0;
    defensesCost += Math.max(0, boughtRanks);
    computedDefenses[def.id] = baseVal + boughtRanks;
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
    (parseInt(char.defenses?.toughness, 10) || 0) +
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
    const cleanName = name.toLowerCase().split('(')[0].trim();
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
    const byExtra = EXTRAS_CATALOG.find(x => x.name.toLowerCase() === cleanName);
    if (byExtra) return { ...byExtra, traitType: 'extra' };
    const byFlaw = FLAWS_CATALOG.find(f => f.name.toLowerCase() === cleanName);
    if (byFlaw) return { ...byFlaw, traitType: 'flaw' };
  }
  return null;
}
