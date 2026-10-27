import fs from 'fs';

let content = fs.readFileSync('js/rules.js', 'utf8');

const newEffects = `export const POWER_EFFECTS_CATALOG = [
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
];`;

const newExtras = `export const EXTRAS_CATALOG = [
  { id: 'accurate', name: 'Accurate', cost: 1, isFlat: true, isRanked: true, maxRank: 10, minRank: 1, isUnique: false, isEffectSpecific: false, desc: '+2 to attack check rolls with this power per rank of Accurate.' },
  { id: 'action_extra', name: 'Action (Faster)', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Decreases the time required to use the effect by one step per rank (Standard -> Move -> Free).' },
  { id: 'affects_corporeal', name: '★ Affects Corporeal', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Can affect physical targets while you are Insubstantial (specific to Insubstantial).' },
  { id: 'affects_insubstantial', name: 'Affects Insubstantial', cost: 1, isFlat: true, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Full effect against Insubstantial targets (Rank 1 half, Rank 2 full).' },
  { id: 'affects_others', name: '★ Affects Others', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Can grant personal powers (Flight, Protection, etc.) to allies at Close range (specific to Personal range powers).' },
  { id: 'area_burst', name: 'Area (Burst 30ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects all targets in 30ft radius (+30ft per additional rank). Targets make Dodge check for half effect.' },
  { id: 'area_cloud', name: 'Area (Cloud 15ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects 15ft radius cloud that lingers for 1 additional round, affecting anyone inside. Dodge check for half effect.' },
  { id: 'area_cone', name: 'Area (Cone 60ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects all targets in 60ft cone (+60ft per additional rank). Dodge check for half effect.' },
  { id: 'area_cylinder', name: 'Area (Cylinder 30ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects an upright cylinder 30 feet in radius and height. Dodge check for half effect.' },
  { id: 'area_line', name: 'Area (Line 30ft)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects all targets in 30ft line (+30ft per additional rank). Dodge check for half effect.' },
  { id: 'area_perception', name: 'Area (Perception)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects any target capable of perceiving the effect (visual, auditory, or scent). Dodge check for half effect.' },
  { id: 'area_shapeable', name: 'Area (Shapeable)', cost: 1, isFlat: false, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Affects 30 cubic feet shaped as desired (+30 cu ft per rank). Dodge check for half effect.' },
  { id: 'attack', name: '★ Attack', cost: 0, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Converts personal power into an attack resisted by Dodge/Fortitude/Will (specific to Personal range powers).' },
  { id: 'contagious', name: '★ Contagious', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Spreads to any person touching or in close contact with the affected target (specific to attack/condition effects).' },
  { id: 'continuous', name: 'Continuous', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: false, desc: 'Power remains active continuously without needing maintenance actions until deliberately dismissed.' },
  { id: 'cumulative', name: '★ Cumulative', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Affliction/Weaken/Nullify degrees accumulate across multiple hits on same target (specific to Affliction, Weaken, Nullify).' },
  { id: 'extended_range', name: 'Extended Range', cost: 1, isFlat: true, isRanked: true, maxRank: 4, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Doubles short, medium, and long range increments per rank.' },
  { id: 'homing', name: 'Homing', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Reroll missed attack checks once per round per rank of homing.' },
  { id: 'impervious', name: '★ Impervious', cost: 1, isFlat: false, isUnique: true, isRanked: true, maxRankByEffect: true, minRank: 1, isEffectSpecific: true, desc: 'Ignores damage effects with rank <= half impervious rank (specific to Protection / Defenses).' },
  { id: 'increased_duration', name: 'Increased Duration', cost: 1, isFlat: false, isRanked: true, maxRank: 3, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Increases duration by one step per rank (Instant -> Concentration -> Sustained -> Continuous).' },
  { id: 'increased_mass', name: 'Increased Mass', cost: 1, isFlat: true, isRanked: true, maxRank: 20, minRank: 1, isUnique: false, isEffectSpecific: true, desc: 'Allows carrying or affecting additional mass ranks with movement or teleport effects (Flat 1 point per rank).' },
  { id: 'increased_range', name: 'Increased Range', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Increases range by one step per rank (Close -> Ranged [1 rank], Close -> Perception [2 ranks]).' },
  { id: 'incurable', name: 'Incurable', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Cannot be healed by ordinary Healing or Regeneration without Persistent.' },
  { id: 'linked', name: 'Linked', cost: 0, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Links two powers together so they activate simultaneously on the same target with one action.' },
  { id: 'multiattack', name: 'Multiattack', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Fires bursts for +2 or +5 damage bonus on high hits, or sprays multiple targets.' },
  { id: 'penetrating', name: '★ Penetrating', cost: 1, isFlat: false, isRanked: true, maxRankByEffect: true, minRank: 1, isUnique: true, isEffectSpecific: true, desc: 'Overcomes Impervious Toughness equal to the penetrating rank (specific to Damage).' },
  { id: 'portal', name: '★ Portal', cost: 2, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Teleport creates an open portal that remains open until your next turn for others to pass through (+2 cost per rank).' },
  { id: 'precise', name: 'Precise', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Power can perform fine or delicate tasks with great finesse.' },
  { id: 'progressive', name: '★ Progressive', cost: 2, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Target makes defense check each round until resisting; failure increases degree of affliction or weaken (specific to Affliction, Weaken).' },
  { id: 'psychic', name: '★ Psychic', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Illusion is perceived directly in the minds of targets rather than in the external environment (+1 cost per rank).' },
  { id: 'reach', name: '★ Reach', cost: 1, isFlat: true, isRanked: true, maxRank: 10, minRank: 1, isUnique: false, isEffectSpecific: true, desc: 'Extends reach of close range attack by 5ft per rank (specific to Close range powers).' },
  { id: 'reaction', name: '★ Reaction Action', cost: 3, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Power triggers automatically in response to a specified triggering event.' },
  { id: 'responsive', name: '★ Responsive', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Summoned creatures are responsive and can act on the same round summoned (+1 cost per rank).' },
  { id: 'reversible', name: 'Reversible', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Can undo or remove power effects at will (e.g. undoing Affliction, Damage bruised, or Insubstantial).' },
  { id: 'ricochet', name: 'Ricochet', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Power can bounce off solid surfaces around corners or obstacles.' },
  { id: 'secondary_effect', name: '★ Secondary Effect', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Power hits again automatically on the next round without an additional action roll (specific to Instant duration attacks).' },
  { id: 'selective', name: '★ Selective', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Freely choose who is affected within the area (requires Area modifier).' },
  { id: 'split', name: 'Split', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Splits power rank across multiple targets (e.g. Rank 10 split into two Rank 5 attacks).' },
  { id: 'strength_based', name: '★ Strength-Based', cost: 0, isFlat: true, isUnique: true, isEffectSpecific: true, desc: 'Adds Strength rank directly to power damage (specific to Damage effects).' },
  { id: 'subtle', name: 'Subtle', cost: 1, isFlat: true, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Power display is imperceptible (Rank 1 DC 20 Perception, Rank 2 completely invisible).' },
  { id: 'sustained', name: 'Sustained', cost: 0, isFlat: true, isUnique: true, isEffectSpecific: false, desc: 'Requires a free action each round to maintain.' },
  { id: 'triggered', name: 'Triggered', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Sets a conditional trigger or trap that activates automatically when conditions are met.' },
  { id: 'turnabout', name: 'Turnabout', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: true, desc: 'Allows moving before and after using Teleport, or returning to starting point (Flat 1 point).' },
  { id: 'variable_conditions', name: '★ Variable Conditions', cost: 2, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Affliction can impose different condition sets chosen when the attack is made (+2 cost per rank).' },
  { id: 'variable_descriptor', name: 'Variable Descriptor', cost: 1, isFlat: true, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Change descriptor freely (Rank 1 broad group like weather or elements, Rank 2 any descriptor).' }
];`;

const newFlaws = `export const FLAWS_CATALOG = [
  { id: 'action_flaw', name: 'Action (Slower)', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Increases the time required to use the effect by one step per rank (Free -> Move -> Standard).' },
  { id: 'activation_move', name: 'Activation (Move Action)', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Takes a move action to activate before benefits apply.' },
  { id: 'activation_standard', name: 'Activation (Standard Action)', cost: 2, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Takes a standard action to activate.' },
  { id: 'check_required', name: 'Check Required (Skill DC 11+)', cost: 1, isFlat: false, isRanked: true, maxRank: 10, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Requires successful skill check to activate (DC 11 + rank).' },
  { id: 'concentration', name: 'Concentration Duration', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Requires standard action each round to maintain.' },
  { id: 'diminished_range', name: '★ Diminished Range', cost: 1, isFlat: true, isRanked: true, maxRank: 3, minRank: 1, isUnique: true, isEffectSpecific: true, desc: 'Reduces ranged attack range brackets (Rank 1: 10/25/50, Rank 2: 5/10/25, Rank 3: 2/5/10; specific to Ranged attacks).' },
  { id: 'distracting', name: 'Distracting', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'You become vulnerable while using this power, halving active defenses.' },
  { id: 'easily_removable', name: 'Easily Removable (Device / Disarmable)', cost: 0, isFlat: false, isDevice: true, discountPer5: 2, isUnique: false, isEffectSpecific: false, desc: 'Handheld item easily knocked away or stolen (-2 PP per 5 PP total).' },
  { id: 'empathic', name: '★ Empathic', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'You suffer any damage conditions that you successfully heal from others (specific to Healing).' },
  { id: 'fades', name: 'Fades', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Loses 1 rank per use until restored by recharge or rest.' },
  { id: 'feedback', name: '★ Feedback', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Damage inflicted on power manifestations damages you directly (specific to physical manifestations/constructs).' },
  { id: 'grab_based', name: '★ Grab-Based', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Must first successfully grab or pin target before power takes effect (specific to Close attacks).' },
  { id: 'inaccurate', name: 'Inaccurate (-2 to hit)', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: '-2 penalty on attack checks per rank of Inaccurate.' },
  { id: 'limited', name: 'Limited (Half Utility/Specific Targets)', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Only works in limited conditions, against specific foes (-1/rank per tier of limitation).' },
  { id: 'limited_ambient', name: 'Limited: Ambient Source', cost: 1, isFlat: false, isRanked: true, maxRank: 1, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Requires existing ambient source of the element or energy to manipulate (-1 cost per rank).' },
  { id: 'limited_location', name: 'Limited to Locations', cost: 1, isFlat: false, isRanked: true, maxRank: 2, minRank: 1, isUnique: false, isEffectSpecific: true, desc: 'Teleport is limited to fixed transit locations, portals, or anchor points (-1 or -2 cost per rank).' },
  { id: 'limited_to_minds', name: 'Limited to Minds', cost: 1, isFlat: false, isRanked: true, maxRank: 1, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Effect only works on thinking creatures with a mind (-1 cost per rank).' },
  { id: 'limited_to_resistance', name: 'Limited: Single Resistance', cost: 1, isFlat: false, isRanked: true, maxRank: 1, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Effect is limited to a single specific resistance or defense (-1 cost per rank).' },
  { id: 'noticeable', name: 'Noticeable', cost: 1, isFlat: true, isUnique: false, isEffectSpecific: false, desc: 'Power is clearly obvious and conspicuous even if continuous or passive.' },
  { id: 'quirk', name: 'Quirk (Minor drawback)', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Minor inconvenience or limitation (-1 PP flat per quirk).' },
  { id: 'reduced_range', name: 'Reduced Range', cost: 1, isFlat: false, isRanked: true, maxRank: 1, minRank: 1, isUnique: false, isEffectSpecific: false, desc: 'Power range reduced by one step (Perception -> Ranged, or Ranged -> Close).' },
  { id: 'removable', name: 'Removable (Worn Device / Suit / Belt)', cost: 0, isFlat: false, isDevice: true, discountPer5: 1, isUnique: false, isEffectSpecific: false, desc: 'Worn suit or gadget that can only be removed when immobilized (-1 PP per 5 PP total).' },
  { id: 'resistible', name: 'Resistible', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Allows extra defense check (e.g. Will or Fortitude) to completely negate.' },
  { id: 'self_powered', name: '★ Self-Powered', cost: 1, isFlat: false, isUnique: true, isEffectSpecific: true, desc: 'Summoned minion draws power from the summoner; damage or fatigue to minion affects the summoner (-1 cost per rank).' },
  { id: 'sense_dependent', name: 'Sense-Dependent', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Target must be able to perceive power with specific sense.' },
  { id: 'side_effect', name: 'Side Effect', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Suffers automatic negative backlash if power roll fails or is used (-1 or -2/rank).' },
  { id: 'tiring', name: 'Tiring', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Causes 1 degree of fatigue when used; can be offset with hero point.' },
  { id: 'transit_time', name: 'Transit Time', cost: 1, isFlat: true, isRanked: true, maxRank: 5, minRank: 1, isUnique: false, isEffectSpecific: true, desc: 'Teleportation requires time to travel across the distance rather than being instantaneous (Flat -1 point per rank).' },
  { id: 'uncontrolled', name: 'Uncontrolled', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'GM decides when and how the power triggers or manifests.' },
  { id: 'unreliable', name: 'Unreliable (5 uses or 50% fail)', cost: 1, isFlat: false, isUnique: false, isEffectSpecific: false, desc: 'Has 5 uses per scene or requires a DC 11 flat check before each use.' }
];`;

content = content.replace(/export const POWER_EFFECTS_CATALOG = \[[\s\S]*?\n\];/, newEffects);
content = content.replace(/export const EXTRAS_CATALOG = \[[\s\S]*?\n\];/, newExtras);
content = content.replace(/export const FLAWS_CATALOG = \[[\s\S]*?\n\];/, newFlaws);

// Update area descriptions in computePowerEffectiveStats
const oldAreaCode = `      if (ae.id === 'area_burst') return \`Burst (\${30 * rk} ft radius)\`;
      if (ae.id === 'area_cone') return \`Cone (\${60 * rk} ft)\`;
      if (ae.id === 'area_line') return \`Line (\${30 * rk} ft)\`;
      if (ae.id === 'area_shapeable') return \`Shapeable (\${30 * rk} cu ft)\`;`;

const newAreaCode = `      if (ae.id === 'area_burst') return \`Burst (\${30 * rk} ft radius)\`;
      if (ae.id === 'area_cone') return \`Cone (\${60 * rk} ft)\`;
      if (ae.id === 'area_line') return \`Line (\${30 * rk} ft)\`;
      if (ae.id === 'area_shapeable') return \`Shapeable (\${30 * rk} cu ft)\`;
      if (ae.id === 'area_cloud') return \`Cloud (\${15 * rk} ft radius)\`;
      if (ae.id === 'area_cylinder') return \`Cylinder (\${30 * rk} ft radius/height)\`;
      if (ae.id === 'area_perception') return \`Perception Area\`;`;

content = content.replace(oldAreaCode, newAreaCode);

// Update isModifierLegalForEffect with Power Profiles constraints
const oldLegalCheck = `  if (modifier.id === 'empathic') {
    if (effId !== 'healing') {
      return { legal: false, reason: 'Empathic flaw only applies to Healing effects' };
    }
  }`;

const newLegalCheck = `  if (modifier.id === 'empathic') {
    if (effId !== 'healing') {
      return { legal: false, reason: 'Empathic flaw only applies to Healing effects' };
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
    if (effId !== 'teleport') return { legal: false, reason: \`\${modifier.name.replace(/^★\\s*/, '')} only applies to Teleport\` };
  }
  if (modifier.id === 'increased_mass') {
    if (!['teleport', 'flight', 'speed', 'leaping', 'movement', 'move_object'].includes(effId)) {
      return { legal: false, reason: 'Increased Mass only applies to movement, teleportation, or manipulation effects' };
    }
  }`;

content = content.replace(oldLegalCheck, newLegalCheck);

fs.writeFileSync('js/rules.js', content, 'utf8');
console.log('Successfully updated js/rules.js');
