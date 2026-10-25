/**
 * Mutants & Masterminds 3rd Edition Core Rules & Engine
 * Faithful to Green Ronin M&M 3e Deluxe Hero's Handbook & Hero Lab calculations.
 */

export const ABILITIES = [
  { id: 'str', name: 'Strength', short: 'STR', desc: 'Physical power, close damage, athletic capability, and lifting capacity.' },
  { id: 'sta', name: 'Stamina', short: 'STA', desc: 'Health, physical resilience, Toughness, Fortitude, and recovery.' },
  { id: 'agi', name: 'Agility', short: 'AGI', desc: 'Coordination, body control, balance, dexterity, Dodge defense, and initiative.' },
  { id: 'dex', name: 'Dexterity', short: 'DEX', desc: 'Eye-hand coordination, agility with hands, ranged attack checks, sleight of hand, vehicles.' },
  { id: 'fgt', name: 'Fighting', short: 'FGT', desc: 'Close combat competence, close attack checks, and Parry defense.' },
  { id: 'int', name: 'Intellect', short: 'INT', desc: 'Reasoning, logic, memory, education, knowledge skills, and technology.' },
  { id: 'awe', name: 'Awareness', short: 'AWE', desc: 'Common sense, perception, intuition, willpower, and Will defense.' },
  { id: 'pre', name: 'Presence', short: 'PRE', desc: 'Charisma, leadership, willpower, social interactions, and force of personality.' }
];

export const DEFENSES = [
  { id: 'dodge', name: 'Dodge', ability: 'agi', desc: 'Avoidance of ranged attacks and area effects.' },
  { id: 'parry', name: 'Parry', ability: 'fgt', desc: 'Avoidance of close/melee attacks.' },
  { id: 'fortitude', name: 'Fortitude', ability: 'sta', desc: 'Resistance to health hazards, poison, disease, fatigue.' },
  { id: 'toughness', name: 'Toughness', ability: 'sta', desc: 'Resistance to physical and energy damage.' },
  { id: 'will', name: 'Will', ability: 'awe', desc: 'Mental stability, mind control resistance, fear resistance.' }
];

export const SKILLS_LIST = [
  { id: 'acrobatics', name: 'Acrobatics', ability: 'agi', trainedOnly: false, desc: 'Balance, flips, tumbling, aerial control, escapes.' },
  { id: 'athletics', name: 'Athletics', ability: 'str', trainedOnly: false, desc: 'Running, swimming, climbing, jumping, strenuous physical acts.' },
  { id: 'close_combat', name: 'Close Combat', ability: 'fgt', trainedOnly: true, hasSpecialty: true, defaultSpecialty: 'Unarmed', desc: 'Melee attacks with a specific weapon, unarmed style, or close power.' },
  { id: 'deception', name: 'Deception', ability: 'pre', trainedOnly: false, desc: 'Lying, bluffing, feinting in combat, fast-talking, trickery.' },
  { id: 'expertise', name: 'Expertise', ability: 'int', trainedOnly: true, hasSpecialty: true, defaultSpecialty: 'Science', desc: 'Professional knowledge, trade skills, sciences, law, pop culture, magic.' },
  { id: 'insight', name: 'Insight', ability: 'awe', trainedOnly: false, desc: 'Detecting lies, gauging intentions, sensing motive, resisting deception.' },
  { id: 'intimidation', name: 'Intimidation', ability: 'pre', trainedOnly: false, desc: 'Coercion, demoralizing opponents in combat, frightening people.' },
  { id: 'investigation', name: 'Investigation', ability: 'int', trainedOnly: true, desc: 'Finding clues, crime scene analysis, research, deductive reasoning.' },
  { id: 'perception', name: 'Perception', ability: 'awe', trainedOnly: false, desc: 'Notice details, spot hidden foes, hear whispers, sensory awareness.' },
  { id: 'persuasion', name: 'Persuasion', ability: 'pre', trainedOnly: false, desc: 'Reasoning, diplomacy, negotiation, making friends, inspiring trust.' },
  { id: 'ranged_combat', name: 'Ranged Combat', ability: 'dex', trainedOnly: true, hasSpecialty: true, defaultSpecialty: 'Blaster', desc: 'Ranged attacks with a specific weapon type, blast power, or throwing.' },
  { id: 'sleight_of_hand', name: 'Sleight of Hand', ability: 'dex', trainedOnly: true, desc: 'Pickpocketing, palming items, stage magic, concealing objects.' },
  { id: 'stealth', name: 'Stealth', ability: 'agi', trainedOnly: false, desc: 'Hiding, moving silently, tailing targets, avoiding detection.' },
  { id: 'technology', name: 'Technology', ability: 'int', trainedOnly: true, desc: 'Inventing, repairing, hacking computers, disabling security, operating tech.' },
  { id: 'treatment', name: 'Treatment', ability: 'int', trainedOnly: true, desc: 'First aid, medical diagnosis, surgery, stabilizing dying allies.' },
  { id: 'vehicles', name: 'Vehicles', ability: 'dex', trainedOnly: true, desc: 'Driving cars, piloting aircraft, maneuvering spacecraft or sea vessels.' }
];

export const ADVANTAGES_DATABASE = [
  { id: 'accurate_attack', name: 'Accurate Attack', category: 'Combat', maxRank: 1, desc: 'Trade up to -5 effect rank for up to +5 attack bonus on a check.' },
  { id: 'agile_feint', name: 'Agile Feint', category: 'Combat', maxRank: 1, desc: 'Use Acrobatics instead of Deception to feint in combat.' },
  { id: 'all_out_attack', name: 'All-out Attack', category: 'Combat', maxRank: 1, desc: 'Trade up to -5 active defense (Dodge & Parry) for up to +5 attack bonus.' },
  { id: 'animal_empathy', name: 'Animal Empathy', category: 'General', maxRank: 1, desc: 'Use interaction skills on animals as if they were people.' },
  { id: 'artificer', name: 'Artificer', category: 'Skill', maxRank: 1, desc: 'Use Expertise (Magic) to invent temporary magical devices.' },
  { id: 'assessment', name: 'Assessment', category: 'Skill', maxRank: 1, desc: 'Use Insight to gauge opponent combat caps and abilities.' },
  { id: 'attractive', name: 'Attractive', category: 'General', maxRank: 2, desc: '+2 bonus on Deception and Persuasion per rank where physical attraction applies.' },
  { id: 'benefit', name: 'Benefit', category: 'General', maxRank: 10, hasNote: true, desc: 'Special status, wealth, cipher, diplomatic immunity, or clearance.' },
  { id: 'chokehold', name: 'Chokehold', category: 'Combat', maxRank: 1, desc: 'Suffocate a target you have pinned in a grab.' },
  { id: 'close_attack', name: 'Close Attack', category: 'Combat', maxRank: 20, desc: '+1 to all close attack checks per rank.' },
  { id: 'connected', name: 'Connected', category: 'General', maxRank: 1, desc: 'Call in favors from contacts via Persuasion checks.' },
  { id: 'contacts', name: 'Contacts', category: 'General', maxRank: 1, desc: 'Make an initial Investigation check in one minute by checking your network.' },
  { id: 'daze', name: 'Daze', category: 'Combat', maxRank: 1, desc: 'Use Deception or Intimidation to daze an opponent for 1 round.' },
  { id: 'defensive_attack', name: 'Defensive Attack', category: 'Combat', maxRank: 1, desc: 'Trade up to -5 attack bonus for up to +5 active defense (Dodge & Parry).' },
  { id: 'defensive_roll', name: 'Defensive Roll', category: 'Combat', maxRank: 10, desc: '+1 active bonus to Toughness per rank when not vulnerable or defenseless.' },
  { id: 'diehard', name: 'Diehard', category: 'General', maxRank: 1, desc: 'Automatically stabilize when dying without needing a Fortitude check.' },
  { id: 'eidetic_memory', name: 'Eidetic Memory', category: 'General', maxRank: 1, desc: '+5 to remember things, recall any details with total precision.' },
  { id: 'equipment', name: 'Equipment', category: 'General', maxRank: 30, desc: 'Provides 5 Equipment Points (EP) per rank for gear, weapons, bases, vehicles.' },
  { id: 'extraordinary_effort', name: 'Extraordinary Effort', category: 'Fortune', maxRank: 1, desc: 'Gain two benefits when using Extra Effort instead of one.' },
  { id: 'fascinate', name: 'Fascinate', category: 'Skill', maxRank: 1, desc: 'Captivate an audience using an interaction or artistic skill.' },
  { id: 'favored_environment', name: 'Favored Environment', category: 'Combat', maxRank: 1, desc: '+2 attack bonus or +2 active defense in your chosen environment (e.g. Underwater, Air).' },
  { id: 'favored_foe', name: 'Favored Foe', category: 'Combat', maxRank: 5, desc: '+2 bonus on checks to resist or oppose your chosen foe group.' },
  { id: 'fearless', name: 'Fearless', category: 'General', maxRank: 1, desc: 'Immune to all fear effects and Intimidation attempts.' },
  { id: 'grab_fighting', name: 'Grab Fighting', category: 'Combat', maxRank: 1, desc: 'Maintain grabs with one arm and retain active defenses while grabbing.' },
  { id: 'great_endurance', name: 'Great Endurance', category: 'General', maxRank: 1, desc: '+5 to Fortitude checks against environmental hazards, starvation, thirst.' },
  { id: 'hide_in_plain_sight', name: 'Hide in Plain Sight', category: 'Skill', maxRank: 1, desc: 'Hide using Stealth even while observed, without requiring cover/concealment.' },
  { id: 'improved_aim', name: 'Improved Aim', category: 'Combat', maxRank: 1, desc: 'Doubles attack check bonus when taking the Aim action (+5 / +10).' },
  { id: 'improved_critical', name: 'Improved Critical', category: 'Combat', maxRank: 4, hasNote: true, desc: '+1 to critical threat range (19-20, 18-20, etc.) for a specific attack per rank.' },
  { id: 'improved_defense', name: 'Improved Defense', category: 'Combat', maxRank: 1, desc: '+2 bonus to active defense when taking the Defend action (total +4).' },
  { id: 'improved_disarm', name: 'Improved Disarm', category: 'Combat', maxRank: 1, desc: 'No penalty for disarm check; target cannot disarm you if check fails.' },
  { id: 'improved_grab', name: 'Improved Grab', category: 'Combat', maxRank: 1, desc: 'Make an immediate grab attack as a free action after a successful unarmed strike.' },
  { id: 'improved_hold', name: 'Improved Hold', category: 'Combat', maxRank: 1, desc: '-5 penalty to opponent checks to escape your grab.' },
  { id: 'improved_initiative', name: 'Improved Initiative', category: 'Combat', maxRank: 5, desc: '+4 bonus to Initiative checks per rank.' },
  { id: 'improved_smash', name: 'Improved Smash', category: 'Combat', maxRank: 1, desc: 'No attack penalty when attempting to smash/damage an object held by another.' },
  { id: 'improved_trip', name: 'Improved Trip', category: 'Combat', maxRank: 1, desc: 'No penalty for trip checks; target cannot trip you if you fail.' },
  { id: 'improvised_tools', name: 'Improvised Tools', category: 'Skill', maxRank: 1, desc: 'No penalty for using Technology or Treatment without proper toolkit.' },
  { id: 'improvised_weapon', name: 'Improvised Weapon', category: 'Combat', maxRank: 4, desc: '+1 damage rank when using improvised weapons per rank (up to rank 4).' },
  { id: 'inspire', name: 'Inspire', category: 'Fortune', maxRank: 5, desc: 'Spend a hero point to give all allies within earshot +1 per rank to checks.' },
  { id: 'instant_up', name: 'Instant Up', category: 'Combat', maxRank: 1, desc: 'Stand up from prone as a free action with an Acrobatics check DC 10.' },
  { id: 'interpose', name: 'Interpose', category: 'Combat', maxRank: 1, desc: 'Move up to your full speed to intercept an attack meant for an adjacent ally.' },
  { id: 'inventor', name: 'Inventor', category: 'Skill', maxRank: 1, desc: 'Use Technology to invent temporary technological gadgets and devices.' },
  { id: 'jack_of_all_trades', name: 'Jack-of-all-trades', category: 'Skill', maxRank: 1, desc: 'Use any skill untrained, even skills requiring specialized training.' },
  { id: 'languages', name: 'Languages', category: 'General', maxRank: 20, hasNote: true, desc: 'Speak additional languages fluently (1 per rank, or 2^rank at higher levels).' },
  { id: 'leadership', name: 'Leadership', category: 'Fortune', maxRank: 1, desc: 'Spend a hero point to remove fatigue, dazed, or stunned from an ally.' },
  { id: 'luck', name: 'Luck', category: 'Fortune', maxRank: 5, desc: 'Re-roll a failed check with 1 additional hero point reroll per rank per session.' },
  { id: 'move_by_action', name: 'Move-by Action', category: 'Combat', maxRank: 1, desc: 'Split your movement before and after taking a standard action.' },
  { id: 'power_attack', name: 'Power Attack', category: 'Combat', maxRank: 1, desc: 'Trade up to -5 attack bonus for up to +5 effect rank on damage.' },
  { id: 'precise_attack', name: 'Precise Attack', category: 'Combat', maxRank: 4, hasNote: true, desc: 'Ignore cover or concealment penalties on close or ranged attacks.' },
  { id: 'prone_fighting', name: 'Prone Fighting', category: 'Combat', maxRank: 1, desc: 'No attack penalty for being prone, and attackers gain no bonus against you.' },
  { id: 'quick_draw', name: 'Quick Draw', category: 'Combat', maxRank: 1, desc: 'Draw a weapon or device as a free action rather than a move action.' },
  { id: 'ranged_attack', name: 'Ranged Attack', category: 'Combat', maxRank: 20, desc: '+1 to all ranged attack checks per rank.' },
  { id: 'redirect', name: 'Redirect', category: 'Combat', maxRank: 1, desc: 'Trick an opponent into attacking another target on a tricked attack.' },
  { id: 'ritualist', name: 'Ritualist', category: 'Skill', maxRank: 1, desc: 'Use Expertise (Magic) to create and perform long-form occult rituals.' },
  { id: 'second_chance', name: 'Second Chance', category: 'Fortune', maxRank: 5, hasNote: true, desc: 'One free reroll against a specific hazard (mind control, traps, radiation).' },
  { id: 'seize_initiative', name: 'Seize Initiative', category: 'Fortune', maxRank: 1, desc: 'Spend a hero point to automatically go first in the initiative order.' },
  { id: 'set_up', name: 'Set-up', category: 'Combat', maxRank: 1, desc: 'Transfer the combat advantage of a successful feint to an ally.' },
  { id: 'skill_mastery', name: 'Skill Mastery', category: 'Skill', maxRank: 5, hasNote: true, desc: 'Make routine checks (take 10) with chosen skill even under intense pressure.' },
  { id: 'startle', name: 'Startle', category: 'Combat', maxRank: 1, desc: 'Use Intimidation instead of Deception to feint an opponent in combat.' },
  { id: 'takedown', name: 'Takedown', category: 'Combat', maxRank: 2, desc: 'Free extra attack on adjacent minion upon rendering one minion incapacitated.' },
  { id: 'taunt', name: 'Taunt', category: 'Combat', maxRank: 1, desc: 'Demoralize opponent in combat using Deception instead of Intimidation.' },
  { id: 'teamwork', name: 'Teamwork', category: 'General', maxRank: 1, desc: '+5 to checks when performing Team Checks or Aid actions with allies.' },
  { id: 'throwing_mastery', name: 'Throwing Mastery', category: 'Combat', maxRank: 5, desc: '+1 damage rank with thrown weapons per rank.' },
  { id: 'tracking', name: 'Tracking', category: 'Skill', maxRank: 1, desc: 'Use Perception checks to follow visual and sensory tracks at full speed.' },
  { id: 'trance', name: 'Trance', category: 'General', maxRank: 1, desc: 'Enter deep meditative state to suspend bodily functions and survive without air.' },
  { id: 'ultimate_effort', name: 'Ultimate Effort', category: 'Fortune', maxRank: 5, hasNote: true, desc: 'Spend a hero point to immediately count as rolling a natural 20 on a specific check.' },
  { id: 'uncanny_dodge', name: 'Uncanny Dodge', category: 'Combat', maxRank: 1, desc: 'Not vulnerable when surprised or caught flat-footed; retains active defenses.' },
  { id: 'weapon_bind', name: 'Weapon Bind', category: 'Combat', maxRank: 1, desc: 'Free disarm attempt upon successfully defending with Defend action.' },
  { id: 'weapon_break', name: 'Weapon Break', category: 'Combat', maxRank: 1, desc: 'Free smash attack against opponent weapon upon successfully defending.' },
  { id: 'well_informed', name: 'Well-informed', category: 'Skill', maxRank: 1, desc: 'Make an immediate Investigation or Perception check to know about an encounter.' }
];

export const POWER_EFFECTS_CATALOG = [
  { id: 'damage', name: 'Damage', baseCost: 1, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'Toughness', dcBase: 15, isAttack: true, desc: 'Inflicts damage on targets, causing bruises, dazed, staggered, or incapacitated.' },
  { id: 'affliction', name: 'Affliction', baseCost: 1, action: 'Standard', range: 'Close', duration: 'Instant', resist: 'Fortitude or Will', dcBase: 10, isAttack: true, desc: 'Imposes negative conditions (e.g., Dazed, Stunned, Paralyzed, Transformed).' },
  { id: 'blast', name: 'Ranged Damage', baseCost: 2, action: 'Standard', range: 'Ranged', duration: 'Instant', resist: 'Toughness', dcBase: 15, isAttack: true, desc: 'Fires energy blasts, kinetic projectiles, or elemental bolts at range.' },
  { id: 'protection', name: 'Protection', baseCost: 1, action: 'None', range: 'Personal', duration: 'Permanent', resist: 'None', isDefense: true, desc: 'Adds directly to Toughness defense against physical and energy harm.' },
  { id: 'flight', name: 'Flight', baseCost: 2, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'Propels you through the air at supersonic or sub-light speeds.' },
  { id: 'speed', name: 'Speed', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', isMovement: true, desc: 'High-speed ground running (Rank 1: 4 MPH ... Rank 10: 2,000 MPH).' },
  { id: 'quickness', name: 'Quickness', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Sustained', resist: 'None', desc: 'Perform routine and complex tasks in fractions of normal time.' },
  { id: 'leaping', name: 'Leaping', baseCost: 1, action: 'Free', range: 'Personal', duration: 'Instant', resist: 'None', isMovement: true, desc: 'Jump extraordinary distances without run-up.' },
  { id: 'teleport', name: 'Teleport', baseCost: 2, action: 'Move', range: 'Personal', duration: 'Instant', resist: 'None', isMovement: true, desc: 'Instantly vanish and reappear in distant locations.' },
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
  { id: 'attack', name: 'Attack (Turn Personal to Attack)', cost: 0, isFlat: false, desc: 'Converts a personal power (like Teleport or Insubstantial) into an attack resisted by Dodge.' },
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
  { id: 'check_required', name: 'Check Required (Skill DC 11+)', cost: 1, isFlat: false, desc: 'Requires successful skill check to activate; effect reduced if check fails.' },
  { id: 'concentration', name: 'Concentration Duration', cost: 1, isFlat: false, desc: 'Requires standard action each round to maintain.' },
  { id: 'diminished_range', name: 'Diminished Range', cost: 1, isFlat: true, desc: 'Reduces ranged attack range brackets.' },
  { id: 'distracting', name: 'Distracting', cost: 1, isFlat: false, desc: 'You become vulnerable while using this power, halving active defenses.' },
  { id: 'easily_removable', name: 'Easily Removable (Device / Disarmable)', cost: 0, isFlat: false, isDevice: true, discountPer5: 2, desc: 'Handheld item easily knocked away, disarmed, or stolen (-2 PP per 5 PP total).' },
  { id: 'fades', name: 'Fades', cost: 1, isFlat: false, desc: 'Loses 1 rank per use until restored by recharge or rest.' },
  { id: 'feedback', name: 'Feedback', cost: 1, isFlat: false, desc: 'Damage inflicted on power manifestations damages you directly.' },
  { id: 'grab_based', name: 'Grab-Based', cost: 1, isFlat: false, desc: 'Must first successfully grab or pin target before power takes effect.' },
  { id: 'inaccurate', name: 'Inaccurate (-2 to hit)', cost: 1, isFlat: true, desc: '-2 penalty on attack checks per rank of Inaccurate.' },
  { id: 'limited', name: 'Limited (Half Utility/Specific Targets)', cost: 1, isFlat: false, desc: 'Only works in limited conditions, against specific foes (e.g. only robots, only at night).' },
  { id: 'noticeable', name: 'Noticeable', cost: 1, isFlat: true, desc: 'Power is clearly obvious and conspicuous even if continuous or passive.' },
  { id: 'quirk', name: 'Quirk (Minor drawback)', cost: 1, isFlat: true, desc: 'Minor inconvenience or limitation (-1 PP flat).' },
  { id: 'reduced_range', name: 'Reduced Range (Ranged -> Close)', cost: 1, isFlat: false, desc: 'Power range reduced by one step (Ranged to Close).' },
  { id: 'removable', name: 'Removable (Worn Device / Suit / Belt)', cost: 0, isFlat: false, isDevice: true, discountPer5: 1, desc: 'Worn suit or gadget that can only be removed when immobilized (-1 PP per 5 PP total).' },
  { id: 'resistible', name: 'Resistible', cost: 1, isFlat: false, desc: 'Allows extra defense check (e.g. Will or Fortitude) to completely negate.' },
  { id: 'sense_dependent', name: 'Sense-Dependent', cost: 1, isFlat: false, desc: 'Target must be able to perceive power with specific sense (hearing, sight).' },
  { id: 'side_effect', name: 'Side Effect', cost: 1, isFlat: false, desc: 'Suffers automatic negative backlash if power roll fails or is used.' },
  { id: 'tiring', name: 'Tiring', cost: 1, isFlat: false, desc: 'Causes 1 degree of fatigue when used; can be offset with hero point.' },
  { id: 'uncontrolled', name: 'Uncontrolled', cost: 1, isFlat: false, desc: 'GM decides when and how the power triggers or manifests.' },
  { id: 'unreliable', name: 'Unreliable (5 uses or 50% fail)', cost: 1, isFlat: false, desc: 'Has 5 uses per scene or requires a DC 11 flat check before each use.' }
];

/**
 * Hero Lab-compliant M&M 3e power cost calculator.
 * Supports fractional ranks (1 PP per 2, 3, 4 ranks if cost <= 0),
 * flat extras/flaws, Alternate Effects (1 PP flat / 2 PP dynamic),
 * and Removable / Easily Removable device discounts.
 */
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
      // In Hero Lab / M&M 3e, an extra per rank adds unitCost (+1 or +2) to the rank cost
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
    // Fractional cost rule:
    // net = 0 -> 1 PP per 2 ranks (divisor 2)
    // net = -1 -> 1 PP per 3 ranks (divisor 3)
    // net = -k -> 1 PP per (2 + k) ranks
    const divisor = 2 - netCostPerRank;
    rawBaseTotal = Math.ceil(rank / divisor);
  }

  let subtotal = Math.max(1, rawBaseTotal + flatExtras - flatFlaws);

  // Apply device discounts if present (Hero Lab formula: -1 PP per 5 PP for Removable, -2 PP per 5 PP for Easily Removable)
  if (isEasilyRemovable) {
    const discount = Math.floor(subtotal / 5) * 2;
    subtotal = Math.max(1, subtotal - discount);
  } else if (isRemovable) {
    const discount = Math.floor(subtotal / 5) * 1;
    subtotal = Math.max(1, subtotal - discount);
  }

  // Add Alternate Effects costs
  let aeCost = 0;
  (power.alternateEffects || []).forEach(ae => {
    aeCost += ae.isDynamic ? 2 : 1;
  });

  return Math.max(1, subtotal + aeCost);
}

/**
 * Calculates complete Power Point expenditure and verifies PL caps.
 */
export function auditCharacter(char) {
  const pl = parseInt(char.powerLevel, 10) || 10;
  const budget = parseInt(char.powerPointsBudget, 10) || (pl * 15);

  // 1. Abilities Cost: 2 PP per rank
  let abilitiesCost = 0;
  ABILITIES.forEach(ab => {
    const val = parseInt(char.abilities?.[ab.id], 10) || 0;
    abilitiesCost += val * 2;
  });

  // 2. Defenses Cost: 1 PP per bought rank above base ability
  let defensesCost = 0;
  const computedDefenses = {};
  DEFENSES.forEach(def => {
    const baseVal = parseInt(char.abilities?.[def.ability], 10) || 0;
    const boughtRanks = parseInt(char.defenses?.[def.id], 10) || 0;
    defensesCost += Math.max(0, boughtRanks);
    computedDefenses[def.id] = baseVal + boughtRanks;
  });

  // Toughness receives bonuses from Protection powers and Defensive Roll
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

  // 3. Skills Cost: 1 PP per 2 ranks (0.5 PP/rank, rounded up for total spent)
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

  // 4. Advantages Cost: 1 PP per rank
  let advantagesCost = 0;
  (char.advantages || []).forEach(adv => {
    const rank = parseInt(adv.rank, 10) || 1;
    advantagesCost += rank;
  });

  // 5. Powers Cost
  let powersCost = 0;
  (char.powers || []).forEach(p => {
    powersCost += calculatePowerCost(p);
  });

  // Total PP Spent
  const totalSpent = abilitiesCost + defensesCost + skillsCost + advantagesCost + powersCost;
  const ppRemaining = budget - totalSpent;

  // Power Level Cap Checks
  const violations = [];
  const pl2 = pl * 2;

  // Toughness + Dodge <= 2 * PL
  if (computedDefenses.dodge + computedDefenses.toughness > pl2) {
    violations.push({
      rule: 'Dodge + Toughness Cap',
      current: computedDefenses.dodge + computedDefenses.toughness,
      max: pl2,
      message: `Dodge (${computedDefenses.dodge}) + Toughness (${computedDefenses.toughness}) exceeds PL ${pl} cap of ${pl2}.`
    });
  }

  // Toughness + Parry <= 2 * PL
  if (computedDefenses.parry + computedDefenses.toughness > pl2) {
    violations.push({
      rule: 'Parry + Toughness Cap',
      current: computedDefenses.parry + computedDefenses.toughness,
      max: pl2,
      message: `Parry (${computedDefenses.parry}) + Toughness (${computedDefenses.toughness}) exceeds PL ${pl} cap of ${pl2}.`
    });
  }

  // Fortitude + Will <= 2 * PL
  if (computedDefenses.fortitude + computedDefenses.will > pl2) {
    violations.push({
      rule: 'Fortitude + Will Cap',
      current: computedDefenses.fortitude + computedDefenses.will,
      max: pl2,
      message: `Fortitude (${computedDefenses.fortitude}) + Will (${computedDefenses.will}) exceeds PL ${pl} cap of ${pl2}.`
    });
  }

  // Skill ranks + ability <= PL + 10
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

/**
 * Returns weight capacity in lbs/tons for a given Strength rank according to M&M 3e Measurements Table.
 */
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
