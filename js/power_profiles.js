/**
 * Mutants & Masterminds 3E Official Power Profiles Library
 * Complete pre-configured power catalog from Green Ronin's "Power Profiles" sourcebook.
 * In case of conflict with core rules, Power Profiles takes precedence.
 *
 * Generated automatically from the official sourcebook:
 * 39 Power Categories, 1076 distinct pre-configured power profiles.
 */

export const POWER_PROFILES_LIBRARY = [
  {
    "category": "Air Powers",
    "profiles": [
      {
        "id": "prof_air_powers_air_blast",
        "name": "Air Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Air, Air pressure",
        "extras": [],
        "flaws": [],
        "notes": "You strike with a powerful blast of compressed air that hits with hammering force. Typically, this power produces swirls and contrails of mist; if it uses nothing but unseen air, it also qualifies for the Subtle modifier. (Ranged Damage (air pressure) • 2 points per rank)"
      },
      {
        "id": "prof_air_powers_air_burst",
        "name": "Air Burst",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create an explosive outward blast of compressed air or a momentary vacuum that causes the surrounding air to rush in with the force of a thunderclap, potentially stunning targets in the area. If you can only produce the burst in an area around you, remove the Ranged modifier. (Ranged Burst Area Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 3 points per rank)"
      },
      {
        "id": "prof_air_powers_air_rifle",
        "name": "Air Rifle",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Air, Projectiles",
        "extras": [],
        "flaws": [],
        "notes": "Rather than striking with compressed air, you use that force to propel small objects as projectiles, like an air rifle. If you can do either, add 1 rank of the Variable Descriptor. (Ranged Damage (projectiles) • 2 points per rank)"
      },
      {
        "id": "prof_air_powers_blinding_gust",
        "name": "Blinding Gust",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "A wind kicks up dust, sand, and other grit or debris to fly into a target's eyes, blinding them. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Impaired, Disabled, Unaware), Limited to Vision • 2 points per rank)"
      },
      {
        "id": "prof_air_powers_flinging_gust",
        "name": "Flinging Gust",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Direction"
          }
        ],
        "notes": "A powerful gust of wind picks up your target and flings it a considerable distance. If the attack hits, the target makes a Strength or Dodge check against your effect rank check. If the target wins, there is no effect. If you win, the target is flung a distance rank equal to your effect rank minus the target's weight rank. So a 200 lb. man (weight rank 2) hit with a rank 8 Flinging Gust would be hurled 1,800 feet (distance rank 6, or 8 minus 2). Note that a character with the Aerokinesis power (under Utility Powers) can duplicate the effects of this power. Area versions of this power are common, including Wind Wall (under Defensive Powers, following) and Wind Blast (in the Weather Powers section). (Move Object, Limited Direction • 1 point per rank)"
      },
      {
        "id": "prof_air_powers_stench",
        "name": "Stench",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You fill the air around the target with a disgusting, nauseating stench sufficient to cause a significant distraction and potentially powerful enough to incapacitate the target. (Ranged Cumulative Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated), Smell-Dependent • 2 points per rank)"
      },
      {
        "id": "prof_air_powers_stench_cloud",
        "name": "Stench Cloud",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A Cloud Area version of this power is a common variation, affecting all targets in 15-foot radius for two rounds (the initial attack and the following round). (Ranged Cloud Area Cumulative Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated), Smell-Dependent • 3 points per rank)"
      },
      {
        "id": "prof_air_powers_suffocation",
        "name": "Suffocation",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You cut off a target's air, literally drawing the air out of their lungs and causing them to suffocate. For air controllers with sufficient command over the element, this power may be Perception Ranged. (Ranged Progressive Affliction (Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated) • 4 points per rank)"
      },
      {
        "id": "prof_air_powers_tornado",
        "name": "Tornado",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "area_cylinder",
            "name": "Area (Cylinder 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create a powerful whirlwind capable of damaging structures and picking up unsecured objects. The basic tornado has a radius of 30 feet (distance rank 0). It can \"grab\" or lift objects with weight rank equal to or less than its rank; a realistic tornado should be limited to around rank 8 in terms of both wind speed and lifting capabilities (sufficient to pick up and hurl vehicles), but the GM can allow cyclones of any rank. Because the power is Damaging, it can lift objects, \"hold\" them (trapped in the whirlwind), hurl them away, or simply damage them. (Cylinder Area Move Object, Damaging • 4 points per rank, +1 point per rank per +1 area distance rank)"
      },
      {
        "id": "prof_air_powers_air_bubble",
        "name": "Air Bubble",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Air, Suffocation",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create a bubble of fresh, clean, breathable air around you, 30 feet across (distance rank 0). Anyone inside the bubble is able to breathe normally (assuming they are an air-breather). If you stop sustaining the air bubble, its surface tension is sufficient to keep it intact for one more round before it pops. If you can create an air bubble at a distance, apply the Ranged modifier for an additional 2 points. If the bubble protects against other hazards, increase the rank of the Immunity (at a cost of 3 points per rank) to cover them. This includes the bubble resisting pressure (such as deep under water) or vacuum (in space) or maintaining a constant temperature. (Immunity 2 (Suffocation), Affects Others, Cloud Area, Sustained • 6 points + 2 points per +1 area distance rank)"
      },
      {
        "id": "prof_air_powers_air_shield",
        "name": "Air Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You surround yourself with a thin barrier of \"hardened\" air that protects you against damaging attacks. The default air shield is visible as a misty shimmer; if it is truly invisible, apply the Subtle modifier as well. A stronger air shield may have the Impervious modifier, allowing it to ignore lesser attacks. (Protection, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_air_powers_air_supply",
        "name": "Air Supply",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Air, Suffocation",
        "extras": [],
        "flaws": [],
        "notes": "You can generate your own supply of air, sufficient to allow you to breathe normally in airless conditions. If your air supply provides you with protection from other environmental hazards, increase the rank of Immunity. To provide an air supply for others, see the Air Bubble power. (Immunity 2 (suffocation), Sustained • 2 points)"
      },
      {
        "id": "prof_air_powers_deflecting_winds",
        "name": "Deflecting Winds",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Physical Projectiles"
          }
        ],
        "notes": "You can wield the winds to deflect ranged attacks at a distance, setting up a swirling barrier protecting anyone inside it. Roll the die and add your Deflect rank, adding 10 to the die roll if it is a 10 or less. The result becomes the active defense for targets inside the area if it is higher than their normal active defense. See Whirlwind in the Weather Powers section for a similar effect, with an expanded Cloud Area, allowing the whirlwind to deflect attacks on the round after it is used as well. (Deflect, Burst Area, Limited to Physical Projectiles • 1 point per rank)"
      },
      {
        "id": "prof_air_powers_mist",
        "name": "Mist",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Air, Visibility",
        "extras": [],
        "flaws": [],
        "notes": "You condense a heavy mist out of the air. It imposes a -2 visibility modifier in the area. For twice the cost (2 points per rank), the mist imposes a -5 visibility modifier. You are unable to see through your own mist unless you have an appropriate Senses effect (such as Counters Concealment or the Air Sense power, following). You can also apply a Feature to your power (does not impede your own vision) or make it Selective in order to decide who is and is not affected. (Environment (Visibility) • 1 point per rank (-2 modifier) or 2 points per rank (-5 modifier))"
      },
      {
        "id": "prof_air_powers_wind_wall",
        "name": "Wind Wall",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Air, Along the length of the line",
        "extras": [
          {
            "id": "area_line",
            "name": "Area (Line 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Direction"
          }
        ],
        "notes": "You create a narrow corridor or \"wall\" where the wind blows strongly in one direction, creating a barrier of sorts: anything trying to pass through the wind wall must beat an opposed check of Strength or Speed against the wall's rank. If the wall wins the check, the target is flung in the direction the wind is moving a distance rank equal to the wall's rank minus the target's weight rank. So a STR 4 person running into a rank 8 wind wall (moving at Speed rank 0) must make a Strength check (d20 + 4) versus d20 + 8 (the wall's rank) or be thrown distance rank 8 - 2 (average human weight) or 1,800 feet (distance rank 6). A Wind Wall can be combined with Deflecting Winds (previously) to create a barrier that provides a defensive bonus as well as flinging aside things trying to cross the barrier. (Line Area Move Object, Limited Direction (along the length of the line) • 2 points per rank +1 point per rank)"
      },
      {
        "id": "prof_air_powers_air_walking",
        "name": "Air-Walking",
        "rank": 1,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "the prone condition causes you to fall, -1 point"
          }
        ],
        "notes": "You can walk on air as if it were solid ground, including ascending or descending invisible inclines or simply standing and hovering in one spot. (Flight 1, Subtle, Quirk (the prone condition causes you to fall, -1 point) • 2 points)"
      },
      {
        "id": "prof_air_powers_full_sail",
        "name": "Full Sail",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Wind-Powered Vehicles"
          }
        ],
        "notes": "You summon up a wind to fill the sails of a vessel and speed it along: increase its speed to your effect rank if it is higher than the vessel's normal speed. The realistic rank limit on Earth is around rank 6, but the GM may allow any rank, as desired. (Swimming, Affects Objects, Limited to Wind-Powered Vehicles, Alternate Effect: Flight, Affects Objects, Gliding, Limited to Wind-Powered Vehicles • 1 point per 2 ranks + 1)"
      },
      {
        "id": "prof_air_powers_gliding",
        "name": "Gliding",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You can ride wind currents to glide through the air, but you can only gain altitude from updrafts, so your maximum gliding distance is equal to your starting height plus your effect rank. (Flight, Gliding • 1 point per rank)"
      },
      {
        "id": "prof_air_powers_grounding",
        "name": "Grounding",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Air, Wind",
        "extras": [
          {
            "id": "area_cylinder",
            "name": "Area (Cylinder 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your control over the air allows you to ground or becalm wind-powered forms of movement in an area. This includes winged Flight, sailing-based Swimming, and Flight based on conventional aerodynamics (as opposed to sheer power like anti-gravity, magnetics, and so forth). As long as you maintain your concentration, taking a standard action each round to do so, targets in the area remain grounded and those not yet grounded have to make a new resistance check. If you can maintain a grounding area as a free action, apply the Sustained modifier for an additional 1 point per rank cost. (Nullify Flight and Swimming Based on Air, Concentration, Cylinder Area, Effortless • 4 points per rank)"
      },
      {
        "id": "prof_air_powers_wind_riding",
        "name": "Wind-Riding",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You can truly ride the wind, similar to Gliding (previously) except you can create the necessary updrafts to control your ascent and maintain altitude at will. If you can command the wind to carry others aloft with you, either apply the Affects Others, Ranged, and Area modifiers, or use wind lifting (see Utility Powers) to pick up and carry them along. (Flight • 2 points per rank)"
      },
      {
        "id": "prof_air_powers_aerokinesis",
        "name": "Aerokinesis",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You use focused winds or mini-whirlwinds to lift and move objects with an effective Strength equal to your rank. See Wind-Lifting in the Weather Powers section for a Burst Area and Selective version of this power. (Move Object • 2 points per rank)"
      },
      {
        "id": "prof_air_powers_air_creatures",
        "name": "Air Creatures",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You can summon or create semi-independent creatures of air that obey your commands. The air creatures you summon are not truly alive, merely animated masses of air. They can look like virtually anything, from misty humanoids to mythic creatures like thunderbirds or dragons. You can apply the various modifiers for the Summon effect to get additional air creatures or to make them more active or capable (removing the minion type from the template). Note the creature template has a power level higher than the Summon effect rank, an option discussed in the Summoning Powers section. (Summon Air Creature 6 (90-point minion) • 12 points)"
      },
      {
        "id": "prof_air_powers_air_form",
        "name": "Air Form",
        "rank": 4,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Air, Visual",
        "extras": [],
        "flaws": [],
        "notes": "You can transform from flesh and blood into a mass of mobile air. In air form you are gaseous and insubstantial, able to slip through any opening that is not airtight, and largely immune to physical harm (although energy attacks and area effects, like explosions, still affect you). You can become invisible or appear as a misty, humanoid shape resembling your normal form. You can move through the air in any direction, but lack physical strength and cannot touch or move objects on your own, although you can still use powers like Aerokinesis to do so. Your air form may grant you other air powers, such as Suffocation or Stench (previously), either at their normal range or limited to close range, requiring you to engulf the target in your air form. (Concealment 4 (visual), Flight 1, Insubstantial 2 (gaseous) • 20 points)"
      },
      {
        "id": "prof_air_powers_air_sense",
        "name": "Air Sense",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Air, Air Awareness, Ranged Touch",
        "extras": [],
        "flaws": [],
        "notes": "You can feel the movement of air currents around you, giving you an effective picture of your surroundings without having to see and allowing you to sense any unusual disturbances of the air nearby (usually from the use of other powers with an air descriptor). (Senses 2 (Air Awareness, Ranged Touch) • 2 points 88 AIR POWERS AIR POWERS)"
      },
      {
        "id": "prof_air_powers_freshen_air",
        "name": "Freshen Air (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You clear the air of all scents, leaving it smelling crisp and clean. (Feature • 1 point)"
      },
      {
        "id": "prof_air_powers_scent",
        "name": "Scent (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You can generate any mild scent in the air around you, like an incense, perfume, spice, or the (Feature • 1 point)"
      },
      {
        "id": "prof_air_powers_wind_effect",
        "name": "Wind Effect (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You can create a gentle stirring breeze at will, just strong enough to ruffle hair and clothing (Feature • 1 point)"
      },
      {
        "id": "prof_air_powers_wind_hearing",
        "name": "Wind Hearing (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Air, Wind",
        "extras": [],
        "flaws": [],
        "notes": "You ignore the effects of wind noise on your Perception checks to hear things, as if the (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Armor Powers",
    "profiles": [
      {
        "id": "prof_armor_powers_solid_air",
        "name": "Solid Air",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "You can \"solidify\" air into a transparent crystalline material, like very strong glass, creating objects out of it which dissolve back into normal air when you choose or are no longer maintaining them. If your creations are truly invisible, apply the Subtle 2 extra to the power. (Create Solid Air Objects • 2 points per rank)"
      },
      {
        "id": "prof_armor_powers_wind_conditions",
        "name": "Wind Conditions",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Armor, Impede Movement",
        "extras": [],
        "flaws": [],
        "notes": "You whip up high winds in the area, impeding movement. In addition to the speed rank reduction, the GM may impose a circumstance modifier (-2 for 1 rank, -5 for 2 ranks of reduction) to movement-related skill checks like Acrobatics, Athletics, and Vehicles. (Environment (Impede Movement) • 1 point per rank for a 1 rank reduction in movement speeds, 2 points)"
      },
      {
        "id": "prof_armor_powers_whispering_wind",
        "name": "Whispering Wind",
        "rank": 10,
        "effectId": "communication",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Armor, Auditory, air",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "Currents of air \"carry\" your voice over a distance, allowing you to deliver a message to someone further than you could normally speak (or even shout). (Communication (auditory, air), Subtle 1 • 1 point + 4 points per rank)"
      },
      {
        "id": "prof_armor_powers_blaster",
        "name": "Blaster",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Most basic type of armor weapon: a straightforward ranged blasting attack. The attack may originate from the armor's gauntlets or arms, shoulder-mounted pods, or from the chest-plate or helmet, depending on the descriptors. Likewise, a \"blaster\" can be different types of energy or even physical projectiles. (Ranged Damage • 2 points per rank)"
      },
      {
        "id": "prof_armor_powers_capture_weapon",
        "name": "Capture Weapon",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "A non-damaging ranged weapon intended to disable and incapacitate opponents without harming them. A capture weapon may be tranquilizer darts, stun gas, a taser, net, or similar weapon. See the Dazzle, Sleep, and Snare sample powers in Chapter 6 of the Deluxe Hero's Handbook for additional examples. (Ranged Affliction (Resisted and Overcome by Fortitude; Impaired, Disabled, Incapacitated) • 2 points)"
      },
      {
        "id": "prof_armor_powers_homing_missile",
        "name": "Homing Missile",
        "rank": 1,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Armor, Infravision",
        "extras": [
          {
            "id": "homing",
            "name": "Homing",
            "rank": 2,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "You launch a micro-missile with an on-board guidance system, allowing it to lock onto and track its target. By default the homing missile is a heat-seeker, tracking its target by its heat emissions, but you can substitute another Sense effect worth 1 point (or spend additional points for a higher-ranked sense effect). (Ranged Damage, Homing 2 Linked to Senses 1 (Infravision) • 3 points + 2 points per rank)"
      },
      {
        "id": "prof_armor_powers_machine_gun",
        "name": "Machine-Gun",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Armor, Technology",
        "extras": [
          {
            "id": "multiattack",
            "name": "Multiattack",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "This weapon is a repeating type of blaster attack (see Blaster, previous): it may be a conventional machine gun or chain gun firing solid projectiles (or rubber bullets) or a pulsed energy weapon, depending on descriptors (Ranged Multiattack Damage • 3 points per rank MICRO-MISSILES Your armor can fire explosive micro-missiles from an arm-, shoulder-, or chest-mounted launcher. Although the default effect of this weapon is Damage, see the Grenades and Explosives section of Chapter 7 of the Deluxe Hero's Handbook for some potential Alternate Effects. A micro-missile might have partial ranks of Burst Area for three \"tiers\" of Damage: full Damage to the target of a successful attack check, Burst Area Damage to nearby targets in the blast radius, and half Burst Area Damage to targets in the blast radius who make a successful Dodge check.)"
      },
      {
        "id": "prof_armor_powers_micro_missiles",
        "name": "Micro-Missiles",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Armor, Technology",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your armor can fire explosive micro-missiles from an arm-, shoulder-, or chest-mounted launcher. Although the default effect of this weapon is Damage, see the Grenades and Explosives section of Chapter 7 of the Deluxe Hero's Handbook for some potential Alternate Effects. A micro-missile might have partial ranks of Burst Area for three \"tiers\" of Damage: full Damage to the target of a successful attack check, Burst Area Damage to nearby targets in the blast radius, and half Burst Area Damage to targets in the blast radius who make a successful Dodge check. (Burst Area Ranged Damage • 3 points per rank)"
      },
      {
        "id": "prof_armor_powers_surface_shock",
        "name": "Surface Shock",
        "rank": 10,
        "effectId": "affliction",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Armor, When touched",
        "extras": [],
        "flaws": [],
        "notes": "You electrify the exterior surface of your armor such that anyone touching it gets a nasty shock, good for throwing off grabs and gangs of minions. (Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated), Reaction (when touched) • 4 points per rank)"
      },
      {
        "id": "prof_armor_powers_strength_enhancement",
        "name": "Strength Enhancement",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Strength Enhancement power from Armor Powers. (Enhanced Strength • 2 points per rank)"
      },
      {
        "id": "prof_armor_powers_armor",
        "name": "Armor",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Most basic armor power is its namesake: protection against external sources of damage and injury. Some powered armor is reinforced, shrugging off minor attacks altogether, represented by ranks of the Impervious modifier (see Impervious Options, following). (Protection • 1 point per rank)"
      },
      {
        "id": "prof_armor_powers_force_field",
        "name": "Force Field",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Rather than armor plating or similarly protective materials, power armor may protect the wearer by generating a powerful force field. Descriptors vary from electromagnetic to magical or even cosmic. For some suits, the force field is effectively permanent in duration: as long as the armor is worn and operating, its defenses are \"up\". Others may have continuous or sustained duration force fields capable of greater mutability (usable for stunts) but also subject to being shutdown under circumstances where the effect cannot be maintained. Note that a permanent force field may have the Noticeable modifier (if the field glows brightly, for example), while non-permanent fields are noticeable by default. (Protection • 1 point per rank)"
      },
      {
        "id": "prof_armor_powers_life_support_system",
        "name": "Life Support System",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Armor, Life Support",
        "extras": [],
        "flaws": [],
        "notes": "Next most common defensive power for armor after the protection it affords is some type of built-in life support or sealed system, allowing the armor's wearer to operate in virtually any hostile environment. Some power armor is customized for particular environments, such as aquatic, arctic, or deep space, with lesser ranks of Immunity. The Gamemaster may wish to require a lower rank of Immunity, or permit the Quirk (missing some Immunities, -1 point each) for a Life Support System that does not cover certain things, such as still requiring the armor's wearer to rest or resist diseases or poisons that manage to penetrate the armor's outer shell. (Immunity 10 (Life Support) • 10 points)"
      },
      {
        "id": "prof_armor_powers_mind_shield",
        "name": "Mind Shield",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Armor, Technology",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Mental Effects"
          }
        ],
        "notes": "Your armor is attuned to aid you in resisting mental attacks (generally Will resisted effects with a mental, psionic, or psychic descriptor; see the Mental Powers section). (Enhanced Impervious Will, Limited to Mental Effects • 1 point per rank)"
      },
      {
        "id": "prof_armor_powers_sensory_shield",
        "name": "Sensory Shield",
        "rank": 5,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Armor, Sensory Affliction Effects",
        "extras": [],
        "flaws": [],
        "notes": "Filters and baffles in your armor, particularly in the helm or faceplate, are designed to shield your senses from overload due to outside stimuli. This allows you to largely ignore things like blinding light, deafening noise, nauseating odors, and so forth. If your armor only partially filters such things, Limit the Immunity to half effect (changing the cost to 3 points). (Immunity 5 (Sensory Affliction Effects) • 5 points per rank)"
      },
      {
        "id": "prof_armor_powers_aquatic_turbines",
        "name": "Aquatic Turbines",
        "rank": 10,
        "effectId": "swimming",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Powerful turbines deploy from your armor to propel you underwater. (Swimming • 1 point per rank)"
      },
      {
        "id": "prof_armor_powers_leg_hydraulics",
        "name": "Leg Hydraulics",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Powerful hydraulic or other strength-enhancing devices in the lower body of your armor greatly enhance your leaping ability, allowing you to jump great distances. (Leaping • 1 point per rank)"
      },
      {
        "id": "prof_armor_powers_limb_extenders",
        "name": "Limb Extenders",
        "rank": 10,
        "effectId": "elongation",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Arms and legs of your armor can telescope, extending many times their normal length, controlled remotely by you. This allows you to rise up on stilt-like legs or reach out with extended arms to grab or attack. (Elongation • 1 point per rank)"
      },
      {
        "id": "prof_armor_powers_skates",
        "name": "Skates",
        "rank": 10,
        "effectId": "speed",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Roller skate wheels (or in-line skates) deploy on command from the boots of your armor, allowing you to zip along the ground. Your skates may even be rocket powered, letting you move really fast! Unpowered skates should be limited to around Speed 3, while rocket-powered or magnetic skates could be up to rank 7 or 8! (Speed • 1 point per rank)"
      },
      {
        "id": "prof_armor_powers_thrusters",
        "name": "Thrusters",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Most common power armor movement effect involves rockets or other thrusters, allowing the wearer to fly. Some types of armor may have even more sophisticated anti-gravity systems or magical flight capabilities. These may have a rank of the Subtle modifier, being almost silent in use. (Flight • 2 points per rank)"
      },
      {
        "id": "prof_armor_powers_tunneling",
        "name": "Tunneling",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Armor designed for underground exploration might have the ability to tunnel through soil and bedrock, using builtin drills, digging lasers, or similar devices. Perhaps the entire suit becomes a \"tunneling machine\" of sorts that \"flies\" through earth and solid rock! (Burrowing • 1 point per rank)"
      },
      {
        "id": "prof_armor_powers_combat_computer",
        "name": "Combat Computer",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Computer systems in your armor analyze combat situations and potential threats and offers a variety of options, even exerting some subtle influence over your movements and actions to allow you to deal with unexpected situations faster than having to think about them. (Enhanced Advantages (choose from Assessment, Close Attack, Favored Opponent (previously assessed), Improved Initiative, Ranged Attack, and Uncanny Dodge) plus Enhanced Defense (Dodge and Parry) • 1 point)"
      },
      {
        "id": "prof_armor_powers_comm_system",
        "name": "Comm System",
        "rank": 10,
        "effectId": "communication",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Your armor features a comm system, allowing you to communicate, usually via radio or cellular link, with maximum range determined by its effect rank. Scrambled or encrypted communication systems apply the Subtle modifier. This system is powerful and self-contained; for the simple ability to tap into existing CB or cellular communications, add an appropriate Feature (cell phone or radio). (Radio Communication • 5 points per rank)"
      },
      {
        "id": "prof_armor_powers_sensors",
        "name": "Sensors",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Armor, Technology",
        "extras": [],
        "flaws": [],
        "notes": "Power armor often comes equipped with sensor devices, feeding into displays in the armor's visor or helmet. Lowlight and Darkvision are particularly common, but virtually any Senses effect with an appropriate descriptor may be included in power armor's sensor package. (Senses • 1 point per rank)"
      }
    ]
  },
  {
    "category": "Animal Powers",
    "profiles": [
      {
        "id": "prof_animal_powers_crushing_grip",
        "name": "Crushing Grip",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Grabs"
          }
        ],
        "notes": "Whether it's like a powerful bear-hug or a python's constricting coils, you have a mighty grip able to hold and squeeze an opponent. The Enhanced Strength granted by this power is still limited by power level. Crushing Grip is often accompanied by advantages like Improved Grab and Improved Hold. (Enhanced Strength, Limited to Grabs • 1 point per rank)"
      },
      {
        "id": "prof_animal_powers_ferocious_charge",
        "name": "Ferocious Charge",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "While Charging"
          }
        ],
        "notes": "A rush of movement at your opponent, you can hit with considerable force, like a charging rhino or bull. Protection or Immunity 2 (Own Slam Damage) is common with this power, as is the Improved Critical advantage. (Strength-based Damage, Limited to While Charging • 1 point per 2 ranks)"
      },
      {
        "id": "prof_animal_powers_natural_weapons",
        "name": "Natural Weapons",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Nature equips animals with weapons ranging from sharp claws and teeth to fangs, horns, spines, and mandibles. You possess similar natural weapons; some may be Penetrating, while others have a Linked venom effect (see the Venom power, following) or ranks of Improved Critical. (Strength-based Damage • 1 point per rank)"
      },
      {
        "id": "prof_animal_powers_quills",
        "name": "Quills",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Animal, To being touched",
        "extras": [],
        "flaws": [],
        "notes": "You have a coat of sharp quills or spines, making it dangerous to grab you and allowing you to inflict additional damage in close combat. (Reaction Damage (to being touched) • 4 points per rank)"
      },
      {
        "id": "prof_animal_powers_shock",
        "name": "Shock",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Animal, Biological",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can deliver a powerful shock by touch, like an electric eel. If you can generate the shock by reflex whenever someone touches you, apply the Reaction modifier. (Cumulative Affliction (electric shock; Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 2 points per rank)"
      },
      {
        "id": "prof_animal_powers_terrifying_roar",
        "name": "Terrifying Roar",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "You can emit a fearsome roar, cry, or other animal call able to shake and startle your foes. A truly terrifying roar might be a Hearing Area Affliction instead. (Enhanced Intimidation • 1 point per 2 skill ranks)"
      },
      {
        "id": "prof_animal_powers_venom",
        "name": "Venom",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Animal, Biological",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Animal kingdom is filled with a wide range of venomous creatures, most using fangs or stingers to inject their venom into a target (thus the use of Toughness for the initial resistance check). Venom can be Linked with a Damage effect for more serious injection methods, like envenomed claws or dagger-like fangs. Vary the conditions imposed by the Affliction to suit different types of venoms: paralytics, for example, may hinder, immobilize, and paralyze. (Progressive Affliction (Resisted by Toughness, Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 3 points per rank)"
      },
      {
        "id": "prof_animal_powers_webbing",
        "name": "Webbing",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Animal, Biological",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You can produce webbing like that of a spider, but scaled up to human size, giving your webs greater tensile strength and durability. In addition to using your webbing as an attack, you may be able to use it for the Movement (Swinging) effect as a regular power or power stunt. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_animal_powers_protective_hide",
        "name": "Protective Hide",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Your skin is tougher than normal, being leathery or covered with armored scales, for example. For extremely tough or armored hides, add ranks of Impervious. (Protection • 1 point per rank)"
      },
      {
        "id": "prof_animal_powers_regrowth",
        "name": "Regrowth",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Like certain lizards or worms, you can regrow lost body parts and heal quickly from injury, ignoring many of its complications. (Regeneration • 1 point per rank)"
      },
      {
        "id": "prof_animal_powers_squeeze_through",
        "name": "Squeeze Through",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Animal, Permeate",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Small Spaces"
          }
        ],
        "notes": "You can compress and shift your body to squeeze through small spaces an ordinary human could never fit through. (Movement (Permeate), Limited to Small Spaces • 1 point per rank)"
      },
      {
        "id": "prof_animal_powers_serpent_slither",
        "name": "Serpent Slither",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Animal, Slithering",
        "extras": [],
        "flaws": [],
        "notes": "Like a snake, you can slide along the ground and climb head-first down surfaces your body can grip. (Movement 1 (Slithering) • 2 points WALL-WALKER You can stick to walls and ceilings like an insect (or some types of lizards and salamanders).)"
      },
      {
        "id": "prof_animal_powers_wall_walker",
        "name": "Wall-Walker",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Animal, Wall-Crawling",
        "extras": [],
        "flaws": [],
        "notes": "You can stick to walls and ceilings like an insect (or some types of lizards and salamanders). (Movement (Wall-Crawling) • 2 points per rank (up to 2 ranks).)"
      },
      {
        "id": "prof_animal_powers_wings",
        "name": "Wings",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "You have fully functional wings: bird-like, bat-like, or even insector butterfly-like. You may be able to grow and shed your wings at will; if this takes any longer than a free action, apply the Activation modifier to your power. The fastest sustained flight for an animal is about speed rank 6. (Flight, Wings • 1 point per rank)"
      },
      {
        "id": "prof_animal_powers_animal_companion",
        "name": "Animal Companion",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Animal, See Summoning Powers",
        "extras": [],
        "flaws": [
          {
            "id": "self_powered",
            "name": "Self-Powered",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You have an animal ally or companion able to understand at least simple commands and carry them out, and likely wellinclined towards you. Your companion may be an ordinary trained animal or an unusual specimen in some way, such as having greater than normal Intellect or unusual abilities. Create your companion as a character with 15 power points per rank, using the sample animals in the Deluxe Hero's Handbook and Gamemaster's Guide as templates. (Summon Animal Companion, Heroic, Self-Powered (see Summoning Powers) • 3 points per rank)"
      },
      {
        "id": "prof_animal_powers_animal_form",
        "name": "Animal Form",
        "rank": 1,
        "effectId": "morph",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Animal, Animal Form",
        "extras": [],
        "flaws": [],
        "notes": "Allowing you to, amongst other things, speak and have hands while gaining many of the animal's other traits. The various difficulties of function in animal form are covered by complications (see Animal Complications). If you can assume any animal form, see the Shapeshift power from Morphing Powers, with the Limit \"Only Animal Forms\". (Morph 1 (Animal Form), Metamorph • 6 points per rank)"
      },
      {
        "id": "prof_animal_powers_animal_mimicry",
        "name": "Animal Mimicry",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Animal, Physical traits",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "traits possessed by animals"
          }
        ],
        "notes": "You can temporarily mimic the traits of different animals. See the Meta-Powers section for more on mimicry in general. (Variable (physical traits), Limited to traits possessed by animals • 6 points per rank)"
      },
      {
        "id": "prof_animal_powers_animal_senses",
        "name": "Animal Senses",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Aforementioned sonar-using creatures have hearing ranges into the ultrasonic (1 rank). (Senses • 1 point per rank Generally, characters have a fixed set of animal senses, or gain the senses of a particular animal form (see Animal Form). Those able to gain any animal sense, may have a limited version of Animal Mimicry. This power can grant any 5 power points in animal senses as a sustained effect,)"
      },
      {
        "id": "prof_animal_powers_animal_summoning",
        "name": "Animal Summoning",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Animal, Animals",
        "extras": [],
        "flaws": [],
        "notes": "Adjust based on the type and amount of animals the character can summon: flocks of birds, for example, substitute General Type and may summon a few swarms (Gamemaster's Guide, page 135) rather than a full 5 ranks of Multiple Minions, the same for Animal Summoning limited to sea-life. If you summon the animals out of nowhere, having them appear instantly at your side, drop the Self-Powered flaw. (Summon Animals 3, Broad Type (Animals), Horde, Multiple Minions 5 (32 animals), SelfPowered (see Summoning Powers) • 42 points)"
      },
      {
        "id": "prof_animal_powers_chameleon_camouflage",
        "name": "Chameleon Camouflage",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Animal, Visual",
        "extras": [],
        "flaws": [],
        "notes": "You quickly shift your color and pattern to match your surroundings, allowing you to blend into the background like a chameleon, although this power is far more adaptive and efficient. (Concealment (Visual) 2, Blending • 2 points)"
      },
      {
        "id": "prof_animal_powers_create_chimera",
        "name": "Create Chimera",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Animal, Mixed Animals",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Available Animals"
          }
        ],
        "notes": "You have the unusual power to \"merge\" two or more different animals, creating a combined creature with a mix of their traits-a chimera-able to carry out your commands. Your rank in the power sets the limit of the most powerful chimera you can create. Once you no longer sustain the power, the animals forming the chimera return to their normal forms (and likely to their normal habits and habitats as quickly as possible). (Summon Chimera, Broad Type (Mixed Animals), Heroic, Limited to Available Animals • 4 points per rank)"
      },
      {
        "id": "prof_animal_powers_multiple_limbs",
        "name": "Multiple Limbs",
        "rank": 10,
        "effectId": "extra_limbs",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "You have additional limbs, like many members of the animal kingdom. This power ranges from a prehensile tail (able to function like a hand) to feet adapted to work as hands, or additional arms (or tentacles). (Extra Limbs • 1 point per rank)"
      },
      {
        "id": "prof_animal_powers_speak_with_animals",
        "name": "Speak With Animals",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Animals",
        "extras": [],
        "flaws": [],
        "notes": "You can communicate with animals and they can respond to you. This power does not necessarily give animals any greater degree of intelligence, so their communication may be limited to fairly simple concepts and sense-impressions. If you can \"speak\" with animals without speaking aloud (you simply think your responses), apply the Subtle modifier. If others can understand animals when you are around, apply the Affects Others modifier. To communicate with animals over greater distances, use the Communication effect (or Summon, if you simply \"call\" animals to aid you). (Comprehend 2 (Animals) • 4 points)"
      },
      {
        "id": "prof_animal_powers_animal_harmony",
        "name": "Animal Harmony (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Natural animals are favorably disposed towards you, having an initial attitude of favor- (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_acute_olfactory",
        "name": "Acute Olfactory (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Many animals have an acute sense of smell (1 rank), able to distinguish individuals by (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_extended",
        "name": "Extended (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Some animals have extended senses compared to humans, notably the vision of some (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_heat_sensing_pits",
        "name": "Heat-Sensing Pits (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Various reptiles have heat-sensing pits, granting them the benefits of Infravision (1 rank). (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_multifaceted_eyes",
        "name": "Multifaceted Eyes (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Insects often have multifaceted eyes (or multiple eyes) granting them the benefits of (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_navigation",
        "name": "Navigation (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Birds and some fish appear to have an innate sense for navigation (Direction Sense, 1 rank). (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_night_vision",
        "name": "Night Vision (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Nocturnal animals have considerably better night vision than humans, providing Low-light (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_sonar",
        "name": "Sonar (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Animals like bats and some cetaceans use echolocation, providing them with a kind of sonar (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_survival_sense",
        "name": "Survival Sense (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Prey animals often have a preternatural sense for danger, perhaps providing the benefits (Feature • 1 point)"
      },
      {
        "id": "prof_animal_powers_ultra_hearing",
        "name": "Ultra-Hearing (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Animal, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Animals like dogs and some of the aforementioned sonar-using creatures have hearing (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Cold Powers",
    "profiles": [
      {
        "id": "prof_cold_powers_cold_blast",
        "name": "Cold Blast",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [],
        "notes": "You strike targets with a blast of freezing air, causing a sudden drop in temperature. (Ranged Affliction (cold; Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated) • 2 points)"
      },
      {
        "id": "prof_cold_powers_cryokinesis",
        "name": "Cryokinesis",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Cold, Ice",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can lower a target's temperature simply by looking at it, eventually freezing it solid. A completely frozen target can be broken or shattered, with the damage remaining when the target thaws, making this potentially fatal to living targets. Apply the Insidious modifier if the target is unaware of the effect. (Perception Ranged Cumulative Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Transformed), Affects Objects • 5 points per rank)"
      },
      {
        "id": "prof_cold_powers_flash_freeze",
        "name": "Flash Freeze",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [],
        "notes": "You flash freeze a nonliving object, causing it to become extremely brittle and easy to break or shatter. If you can flash freeze living targets as well, remove the Limited to Objects modifier, although you may also want to link a Damage or Affliction effect, since flash freezing a living being should realistically render them a nonliving object before it makes them brittle enough to shatter. (Ranged Weaken Toughness, Affects Only Objects • 2 points per rank)"
      },
      {
        "id": "prof_cold_powers_freezing_aura",
        "name": "Freezing Aura",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [],
        "notes": "Your body is so very cold to the touch that it \"burns\" those who come into physical contact. (Reaction Damage (cold; being touched) • 4 points per rank)"
      },
      {
        "id": "prof_cold_powers_hailstorm",
        "name": "Hailstorm",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cold, Cold and bludgeoning",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You cause large hailstones to pelt targets in your chosen area. The Hailstorm lasts for an additional round after your initial attack, affecting any targets remaining in the area. (Cloud Area Ranged Damage (cold and bludgeoning), Indirect 2 • 2 points + 3 points per rank)"
      },
      {
        "id": "prof_cold_powers_ice_blast",
        "name": "Ice Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cold, Cold and bludgeoning or slashing",
        "extras": [],
        "flaws": [],
        "notes": "A solid ram, spear, or shower of ice strikes at target, inflicting damage. For showers of icy projectiles, you may add Multiattack to the power. Sharp or pointed ice weapons may constitute going for the kill (Deluxe Hero's Handbook, page 258). (Ranged Damage (cold and bludgeoning or slashing) • 2 points per rank)"
      },
      {
        "id": "prof_cold_powers_ice_binding",
        "name": "Ice Binding",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cold, Ice",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Thick ice forms instantly around your target, trapping them. If you can completely entrap a target in ice, putting them in a kind of suspended animation, remove the Limited Degree flaw and make Incapacitated the Affliction's third degree, increasing cost to 4 points per rank. (Ranged Cumulative Affliction (ice; Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_cold_powers_ice_fist",
        "name": "Ice Fist",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Cold, Cold and bludgeoning",
        "extras": [],
        "flaws": [],
        "notes": "A heavy \"gauntlet\" or club of ice forms around your fist, allowing you to hit harder in close combat. (Strength-based Damage (cold and bludgeoning) • 1 point per rank)"
      },
      {
        "id": "prof_cold_powers_ice_slick",
        "name": "Ice Slick",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cold, Ice",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You coat a surface with a slick of smooth, wet ice, making it very slippery and difficult for targets to stand or move. (Ranged Burst Area Affliction (ice; Resisted and Overcome by Dodge; Hindered and Vulnerable, Defenseless and Prone), Alternate Resistance, Extra Condition, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_cold_powers_snowblind",
        "name": "Snowblind",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cold, Ice",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "One Sense"
          }
        ],
        "notes": "Drawing upon the effect of sunlight reflected off snow and ice, you strike a target temporarily blind. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Vision Impaired, Vision Disabled, Vision Unaware), Limited to One Sense • 2 points per rank)"
      },
      {
        "id": "prof_cold_powers_immunity_to_cold",
        "name": "Immunity to Cold",
        "rank": 1,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Cold, Environmental Cold",
        "extras": [],
        "flaws": [],
        "notes": "Your powers render you immune to some or all of the effects of cold temperatures. Rather than a permanent trait, your Immunity might be sustained in duration (with no change in cost), requiring a free action each round to maintain, perhaps representing some conscious temperature manipulation. On the other hand, you can use sustained Immunity to Cold for power stunts, perhaps even switching it for Immunity to Heat (following) by controlling temperatures the other way. (Immunity 1 (Environmental Cold), Immunity 5 (Cold Damage), Immunity 10 (Cold Effects) • 1, 5, or 10 points)"
      },
      {
        "id": "prof_cold_powers_immunity_to_heat",
        "name": "Immunity to Heat",
        "rank": 1,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Cold, Environmental Heat",
        "extras": [],
        "flaws": [],
        "notes": "Power to create or manipulate cold renders you immune to some or all of the effects of extreme heat. Like Immunity to Cold, this power might be sustained rather than permanent in duration, requiring a small amount of concentration, but opening it up to some power stunts. (Immunity 1 (Environmental Heat), Immunity 5 (Heat Damage), Immunity 10 (Heat Effects) • 1, 5, or 10 points)"
      },
      {
        "id": "prof_cold_powers_ice_armor",
        "name": "Ice Armor",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [],
        "notes": "You can form a protective layer of ice around your body, using your power to make it flexible or reforming it as you move. This armor may prove ineffective against certain attacks (see Weakness under Cold Complications). (Protection • 1 point per rank)"
      },
      {
        "id": "prof_cold_powers_infrared_invisibility",
        "name": "Infrared Invisibility",
        "rank": 2,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cold, Infravision",
        "extras": [],
        "flaws": [],
        "notes": "You can reduce your body's heat signature to no more than that of the surrounding air, even in sub-zero conditions, masking your appearance on infrared and heat scanners. If you can mask others as well, apply the Affects Others and Ranged or Area modifiers, also a potential power stunt for cold-emitting powers like Cold Projection or a cold attack power. (Concealment 2 (Infravision) • 4 points)"
      },
      {
        "id": "prof_cold_powers_ice_slides",
        "name": "Ice Slides",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cold, Ice slides",
        "extras": [],
        "flaws": [],
        "notes": "You create bridges and slides of ice, allowing you to \"surf\" along at a distance above the ground. (Flight, Platform (ice slides) • 1 point per rank)"
      },
      {
        "id": "prof_cold_powers_ice_passage",
        "name": "Ice Passage",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cold, Permeate",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Ice and Snow"
          }
        ],
        "notes": "You can pass through ice and snow as if it were no more solid than air. (Movement (Permeate), Limited to Ice and Snow • 1 point per rank up to 3 ranks)"
      },
      {
        "id": "prof_cold_powers_ice_portal",
        "name": "Ice Portal",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [],
        "notes": "Similar to Ice Passage (previously) to appear to pass \"into\" a surface of ice or snow, but you emerge from another some distance away without having to pass through the space between. This cold power tends to be magical in nature, and may have other Teleport modifiers applied to it. (Teleport, Medium (ice) • 1 point per rank)"
      },
      {
        "id": "prof_cold_powers_ice_tunneling",
        "name": "Ice Tunneling",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Ice and Snow"
          }
        ],
        "notes": "You can cut passages through snow and solid ice. (Burrowing, Limited to Ice and Snow • 1 point per 2 ranks)"
      },
      {
        "id": "prof_cold_powers_ice_walking",
        "name": "Ice Walking",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cold, Environmental Adaptation - Ice",
        "extras": [],
        "flaws": [],
        "notes": "You can walk on ice as though it were dry, level, ground, without any effect on your movement. (Movement 1 (Environmental Adaptation - Ice) • 2 points)"
      },
      {
        "id": "prof_cold_powers_snow_shoes",
        "name": "Snow Shoes",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cold, Trackless, Water-Walking",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Snow"
          }
        ],
        "notes": "You can walk on the surface of even lightly packed snow without sinking into it or leaving any tracks to follow. (Movement 2 (Trackless, Water-Walking), Limited to Snow • 2 points)"
      },
      {
        "id": "prof_cold_powers_speed_skating",
        "name": "Speed Skating",
        "rank": 10,
        "effectId": "speed",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Ice"
          }
        ],
        "notes": "You can \"skate\" across the surface of ice as if you were a skilled ice skater (realistically limited to 4 ranks maximum). If you remove the Limit from the power, then you also create your own icy surface beneath you as you move, which melts away as you pass, \"moving\" along with you. (Speed, Limited to Ice • 1 point per 2 ranks)"
      },
      {
        "id": "prof_cold_powers_blizzard",
        "name": "Blizzard",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Cold, Cold, Visibility",
        "extras": [],
        "flaws": [],
        "notes": "You can whip up powerful, blinding snow storms. At the minimum, this power creates intense cold and a -2 circumstance penalty to visibility. At its most severe, it creates extreme cold and a -5 visibility penalty. (Environment (Cold, Visibility) • 2, 3, or 4 points per rank)"
      },
      {
        "id": "prof_cold_powers_cold_projection",
        "name": "Cold Projection",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Cold, Cold",
        "extras": [],
        "flaws": [],
        "notes": "You create an area of intense or extreme cold. While this does create an environmental hazard (Deluxe Hero's Handbook, page 237) it is more often useful for countering some effects and providing cold conditions needed for others, unless the area is large enough to affect a whole region or lasts for considerable time. (Environment (Cold) • 1 or 2 points per rank)"
      },
      {
        "id": "prof_cold_powers_ice_creatures",
        "name": "Ice Creatures",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [],
        "notes": "You can create or summon animated creatures of ice that obey your commands. Heat-related weaknesses are common complications for these creatures (see Cold Complications). (Summon Ice Creature 5, Controlled • 15 points + 10 points per doubling of number of creatures + 5 points for)"
      },
      {
        "id": "prof_cold_powers_ice_form",
        "name": "Ice Form",
        "rank": 20,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cold, Cold Effects, Life Support",
        "extras": [],
        "flaws": [],
        "notes": "You can transform into a being of living ice. Melting may incapacitate you, or involuntarily transform you into a water form (see the Water Powers section). (Immunity 20 (Cold Effects, Life Support), Protection • 20 points +1 point per Protection rank)"
      },
      {
        "id": "prof_cold_powers_ice_sculpting",
        "name": "Ice Sculpting",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [],
        "notes": "You can create and shape masses of ice, forming things like walls and other barriers, braces for structures, bridges, domes, and so forth. Your ice sculptures melt based on the prevailing temperature, unless you use your power to reform them or shore them up. (Create Ice, Permanent • 2 points per rank)"
      },
      {
        "id": "prof_cold_powers_ice_shifting",
        "name": "Ice Shifting",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Cold, Ice",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Ice and Snow"
          }
        ],
        "notes": "You can move masses of ice and snow, up to a mass rank equal to your effect rank. (Move Object, Perception Range, Limited to Ice and Snow • 2 points per rank)"
      },
      {
        "id": "prof_cold_powers_snow_form",
        "name": "Snow Form",
        "rank": 20,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cold, Cold Effects, Life Support",
        "extras": [],
        "flaws": [],
        "notes": "You can transform into a being of living snow (a mass of granular ice) and may even look like an animated \"snowman\"! (Immunity 20 (Cold Effects, Life Support), Insubstantial 1 • 25 points)"
      },
      {
        "id": "prof_cold_powers_thermal_vision",
        "name": "Thermal Vision",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cold, Infravision",
        "extras": [],
        "flaws": [],
        "notes": "You can see gradations of temperature, perceiving into the infrared range. Amongst other things, this makes warm bodies stand out clearly against cold surrounding temperatures (and vice versa). (Senses 1 (Infravision) • 1 point.)"
      }
    ]
  },
  {
    "category": "Cosmic Powers",
    "profiles": [
      {
        "id": "prof_cosmic_powers_cosmic_blast",
        "name": "Cosmic Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "You can unleash a blast of pure cosmic energy. Some versions of this power have the Variable Descriptor modifier, allowing you to project different types of energy, perhaps along the entire electromagnetic spectrum (rank 2). (Ranged Damage • 2 points per rank Explosive cosmic blasts are a common variant, striking a target point and bursting to encompass an area. Apply)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_burst",
        "name": "Cosmic Burst",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cosmic, Energy",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Explosive cosmic blasts are a common variant, striking a target point and bursting to encompass an area. Apply the Burst Area modifier for this power, or the Cloud Area for a cosmic blast that creates a lingering Damage effect in the area. (Ranged Burst Area Damage • 3 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_grasp",
        "name": "Cosmic Grasp",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cosmic, Energy",
        "extras": [
          {
            "id": "reversible",
            "name": "Reversible",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Intelligent life forms they encounter. The simplest solution is to assume there is some sort of galactic lingua franca (\"Galactican\" or some such) used by civilized species, making the language barrier an occasional challenge. Otherwise, characters need ranks of Comprehend (languages) to overcome this problem, either via their own powers, a telepathic or linguist teammate, or \"universal translator\" equipment (perhaps built-in to the aforementioned space suits). Gamemasters running a cosmic series may choose to require the players' heroes to have some measure of these powers, or can choose to make them (or suitable equipment) available to the heroes at no power point cost as a part of the series itself, so players do not have to worry about spending additional points on the default powers. (Ranged Affliction (Resisted by Dodge, Overcome by Strength; Impaired and Vulnerable, Defenseless and Immobilized), Extra Condition, Reversible, Limited Degree • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_meteor_shower",
        "name": "Meteor Shower",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cosmic, Fire and impact",
        "extras": [
          {
            "id": "multiattack",
            "name": "Multiattack",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A bombardment of fiery streaks strikes your chosen target. The meteor shower normally comes from your outstretched hands, but apply the Indirect modifier if you can call down a meteor shower from a different point. (Ranged Multiattack Damage (fire and impact) • 3 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_nebular_field",
        "name": "Nebular Field",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Cosmic, Visual",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You conjure a glowing, swirling cloud of nebular gases, able to conceal everything within it. A Nebular Field might add additional senses (particularly magnetic or radio) to the Concealment effect, increasing its rank accordingly. (Ranged Cloud Area Concealment Attack 4 (Visual) • 16 points +4 points per +1 distance rank to area.)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_shield",
        "name": "Cosmic Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cosmic, Energy",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "An aura of cosmic energy surrounds you, shielding you from harm. For those lacking the Unearthly power (following), Cosmic Shield may include a Sustained Immunity 10 (life support) effect, providing protection against the environmental hazards of space and alien worlds as well as direct damage. (Impervious Protection, Sustained • 2 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_spaceworthy",
        "name": "Spaceworthy",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "You can survive unaided in the void of space, a useful ability for those who spend a great deal of time away from the comforts of a planetary environment. (Immunity 5 (cold, all suffocation, radiation, vacuum) • 5 points)"
      },
      {
        "id": "prof_cosmic_powers_unearthly",
        "name": "Unearthly",
        "rank": 30,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cosmic, Fortitude effects",
        "extras": [],
        "flaws": [],
        "notes": "You are a being of the void between worlds, beyond mere mortal frailty. You do not need to eat or sleep and are immune to the harmful effects of environments ranging from the depths of space to the heart of a star. You also do not age and are effectively immortal, so long as you are not killed. This power includes lesser immunities like Spaceworthy (previously). (Immunity 30 (Fortitude effects) • 30 points)"
      },
      {
        "id": "prof_cosmic_powers_faster_than_light",
        "name": "Faster Than Light",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cosmic, Space Travel",
        "extras": [],
        "flaws": [],
        "notes": "You can fly through space faster than the speed of light, able to traverse the distance between planets, stars, even galaxies in a relatively short amount of time. This power does not include the ability to survive unprotected in space, although Immunity (life support) or the Unearthly power are common for characters who have this power. (Movement (Space Travel) • 2 points per rank up to rank 3 (6 points).)"
      },
      {
        "id": "prof_cosmic_powers_space_warp",
        "name": "Space Warp",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cosmic, Space Travel",
        "extras": [
          {
            "id": "portal",
            "name": "Portal",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can open a warp in the fabric of the cosmos, allowing you to instantly cross a distance in space: entering the portal at one point and emerging from the other. Like Faster Than Light (previously) Space Warp is only useful for travel over interplanetary distances; warping across the surface of a planet takes a Teleport effect, possibly with the Portal modifier as well. (Movement (Space Travel), Portal • 4 points per rank up to rank 3 (12 points).)"
      },
      {
        "id": "prof_cosmic_powers_adaptation",
        "name": "Adaptation",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "You soar through the black void of space with the ease of a bird in the sky. It is a natural environment to you. Characters with this power may also have the Favored Environment (space) advantage, or an Enhanced Advantage as part of this power, granting the same benefit. Soar the Spaceways: Movement 1 (Environmental (Space) • 2 points)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_awareness",
        "name": "Cosmic Awareness",
        "rank": 6,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Cosmic Events"
          }
        ],
        "notes": "You are connected to the fabric of the cosmos on a fundamental level, allowing you to sense energies and events of universal importance. You also have some awareness of the \"correct\" flow of events in the cosmos, warning you when something diverts destiny from its proper course. (Senses 6 (Acute Cosmic Awareness, Precognition Limited to Cosmic Events) • 4 points)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_communication",
        "name": "Cosmic Communication",
        "rank": 5,
        "effectId": "communication",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "You can project your voice and image across vast distances, allowing you to communicate with subjects on other planets or even galaxies as if they were in the same room with you. (Communication 5 (subspace audiovisual projection, any distance) • 20 points)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_control",
        "name": "Cosmic Control",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "Your control over cosmic energy allows you to use it to grasp, lift, and manipulate objects from a distance without actually touching them. Typically this involves a visible beam or tendril of energy extending from you; if it is simply an invisible extension of your will, apply the Subtle modifier to the power. (Move Object • 2 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_healing",
        "name": "Cosmic Healing",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "You can channel cosmic energies to bolster the life force of injured creatures, helping to quickly restore them to health. Various Healing modifiers are common for this power, up to and including Resurrection for powerful cosmic healers. (Healing • 2 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_mastery",
        "name": "Cosmic Mastery",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cosmic, Cosmic powers",
        "extras": [],
        "flaws": [],
        "notes": "You wield great, but vaguely defined, \"cosmic power\" able to do virtually anything, limited solely by your will and imagination. With sufficient ranks, this power can include all of the various other powers in this section and more. Cosmic Mastery-also known as \"The Power Primal\" or \"The Power Cosmic\"-may have different Variable modifiers, particular to the action needed to change the effect, allowing you to choose different effects essentially at will (as a free action). Gamemasters are cautioned against allowing a large number of ranks of this power; most heroes with broad cosmic powers are better handled with power stunts while most villains with such power are essentially Power Level X plot devices (Gamemaster's Guide, page 72). (Variable (cosmic powers) • 7 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_order",
        "name": "Cosmic Order",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "You can call upon the universal forces of order to weed out chaos and eliminate the effects of unnatural powers, particularly those which tamper with the fabric of space and time (including things like Space Warp and Faster Than Light travel). This power often includes the Area modifier as well, working on all effects in an area rather than all effects on a single target at once. (Nullify Chaos Effects, Simultaneous • 2 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_strength",
        "name": "Cosmic Strength",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "Cosmic energy flows through your corporeal form, giving you increased physical strength. (Enhanced Strength • 2 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_tracking",
        "name": "Cosmic Tracking",
        "rank": 8,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "Provided you have some sort of connection (DNA sample, psychic trace, prior knowledge, etc.) you can \"lock on\" to a subject and track them across to vastness of space anywhere in the cosmos, although some phenomena in the depths of space-nebulas or supernovas, for examplemay cause you to lose the trail. This power does not include the movement ability necessary to follow a trail you sense, although such capabilities are commonly associated with it. Cosmic Tracking allows you to move at your full speed, even using Space Travel to fly faster than light through the void of space. (Senses 8 (Accurate, Acute, Direction Sense, Distance Sense, Extended, Tracking 2) • 8 points)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_transmutation",
        "name": "Cosmic Transmutation",
        "rank": 10,
        "effectId": "transform",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Cosmic, Anything into anything else",
        "extras": [],
        "flaws": [],
        "notes": "Cosmic energy gives you the power to rearrange matter on a molecular or atomic level, restructuring it into different forms or materials. See the Element Powers section for additional details on transmutative powers and effects. (Transform (anything into anything else) • 5 points per rank)"
      },
      {
        "id": "prof_cosmic_powers_universal_translation",
        "name": "Universal Translation",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "Tapping into low-level telepathic abilities or the fabric of the cosmic consciousness allows you to speak and understand any language, no matter the alien species or civilization, and to be understood in the listeners' language, regardless of how many beings interacting with you. (Comprehend 3 (speak, understand, understood, all languages) • 6 points)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_champion",
        "name": "Cosmic Champion (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "You are the chosen champion or representative of a cosmic being, which may give you (Feature • 1 point)"
      },
      {
        "id": "prof_cosmic_powers_cosmic_council",
        "name": "Cosmic Council (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Cosmic, Energy",
        "extras": [],
        "flaws": [],
        "notes": "You can gain the attention of higher cosmic beings, calling upon them for advice, council, (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Darkness Powers",
    "profiles": [
      {
        "id": "prof_darkness_powers_blinding_blast",
        "name": "Blinding Blast",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "A bolt of darkness strikes the target, covering or binding the eyes and temporarily blinding the victim. Cumulative or even Progressive are common modifiers for this power. (Ranged Affliction (darkness; Resisted by Dodge, Overcome by Will; Impaired, Disabled, Unaware), Limited to Vision • 1 point per rank)"
      },
      {
        "id": "prof_darkness_powers_dark_blast",
        "name": "Dark Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Darkness, Cold, force, or life-drain",
        "extras": [],
        "flaws": [],
        "notes": "A blast or bolt of darkness strikes your target, including force, cold, or life-draining damage. With the Variable Descriptor modifier, your Dark Blast may be able to inflict any of these types of Damage, as you choose. Life-draining damage may be resisted by Fortitude rather than Toughness (see the Death Powers section). (Ranged Damage (cold, force, or life-drain) • 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_night_terrors",
        "name": "Night Terrors",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "fleeing or cowering in terror"
          }
        ],
        "notes": "You invoke the primal fear associated with darkness, projecting it on your targets and filling them with terror. For a version of this power that affects those your shadow falls upon (rather than a target you can perceive), apply the Line Area modifier in place of Perception Ranged, perhaps with Reaction, if the effect occurs automatically without any conscious effort on your part. (Perception Ranged Affliction (Resisted and Overcome by Will; Entranced, Compelled, Controlled), Limited to fleeing or cowering in terror • 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_bind",
        "name": "Shadow Bind",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Darkness, Shadow",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Ribbons or chains of darkness bind and trap your target. Some-particularly mystical-versions of Shadow Bind have the Affects Incorporeal modifier. (Cumulative Ranged Affliction (Resisted by Dodge, Overcome by Will; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_boxing",
        "name": "Shadow Boxing",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Shadow Interactions"
          }
        ],
        "notes": "You can grab, damage, or otherwise exert your Strength on a target by having your shadow \"touch\" theirs, rather than having to physically interact with them. This limits the effect to the distance your shadows extend and to the interactions you can physically mimic (using your shadow's hands to grab or punch, for example). (Damaging Move Object, Limited to Shadow Interactions • 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_shroud",
        "name": "Shadow Shroud",
        "rank": 4,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadow",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create an inky cloud of darkness, blocking out all light (and therefore vision) in the area. If you can only create the darkness in a radius around you, remove the Ranged modifier. Apply different Area modifiers for things like a lingering dark mist (Cloud Area) or a spreading \"black light beam\" (Cone Area). (Ranged Burst Area Visual Concealment 4 Attack • 16 points +4 points per +1 area distance rank)"
      },
      {
        "id": "prof_darkness_powers_swallowing_shadow",
        "name": "Swallowing Shadow",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadow",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You engulf a target in darkness and they simply disappear, banished to a shadowy nether-world. Additional ranks of the power after the first have the Limited to Resistance modifier on their cost. (Perception Ranged Movement (Dimensional Travel to a \"shadow world\") Attack (Resisted by Will, base DC 11) • 4 points +3 points per +1 in)"
      },
      {
        "id": "prof_darkness_powers_dark_aura",
        "name": "Dark Aura",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "A shadowy aura surrounds your body, with an effect like a Dark Blast (previously) on anyone touching you, including the descriptors associated with the Damage (cold, force, or life-draining). Like Dark Blast, a Dark Aura may have the Variable Descriptor modifier. (Reaction Damage (to being touched; cold, force, or life-drain) • 4 points per rank)"
      },
      {
        "id": "prof_darkness_powers_immunity_to_darkness",
        "name": "Immunity to Darkness",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Darkness, Darkness effects",
        "extras": [],
        "flaws": [],
        "notes": "Your power over darkness makes you immune to its direct effects upon you, although this power does not grant you the ability to overcome or ignore the concealment created by darkness effects (for that, see the Darkvision power). (Immunity 5 (darkness effects) • 5 points)"
      },
      {
        "id": "prof_darkness_powers_immunity_to_light",
        "name": "Immunity to Light",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Darkness, Light effects",
        "extras": [],
        "flaws": [],
        "notes": "Your darkness powers counteract the effects of most light powers, making you immune to light-based Affliction or Damage effects, for example. (Immunity 10 (light effects) • 10 points)"
      },
      {
        "id": "prof_darkness_powers_shadow_meld",
        "name": "Shadow Meld",
        "rank": 4,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Darkness, Visual",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "areas of shadow or darkness"
          }
        ],
        "notes": "You can appear to \"melt\" into the shadows, virtually invisible when you are in any area with concealment provided by shadows or darkness. Additional ranks of Concealment can affect hearing or scent, becoming truly shadow-like. (Concealment 4 (Visual), Limited to areas of shadow or darkness • 4 points)"
      },
      {
        "id": "prof_darkness_powers_shadow_shield",
        "name": "Shadow Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Darkness, Dark force",
        "extras": [],
        "flaws": [],
        "notes": "A shadowy aura around your body protects you from harm. Your Shadow Shield may be Impervious, although perhaps not against light-based attacks (see Power Loss under Darkness Complications). (Protection (dark force), Sustained • 1 point per rank)"
      },
      {
        "id": "prof_darkness_powers_dark_flight",
        "name": "Dark Flight",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "A dark aura or shadowy wings allow you to defy gravity and fly. (Flight • 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_bridge",
        "name": "Shadow Bridge",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadow bridge",
        "extras": [],
        "flaws": [],
        "notes": "A bridge or platform of darkness supports you, allowing you to glide above the ground. (Flight, Platform (shadow bridge) • 1 point per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_crawl",
        "name": "Shadow Crawl",
        "rank": 10,
        "effectId": "speed",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "Tendrils or limbs of shadow emerge from your body (or a dark aura around it) to carry you above the ground like the legs of a giant spider. Elongation and Extra Limbs are common additional effects for this power. (Speed • 1 point per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_door",
        "name": "Shadow Door",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Darkness, Permeate",
        "extras": [],
        "flaws": [],
        "notes": "You can use a shadow as a \"doorway\" to pass through the surface it falls upon, as if you were stepping only through a shadow, and not a solid barrier. This is a much more limited range effect than Shadow Walk (following); it ends once you emerge from the other side of the object your \"door\" passes through. (Movement (Permeate) • 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_projection",
        "name": "Shadow Projection",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Darkness, Visual, auditory, mental",
        "extras": [],
        "flaws": [],
        "notes": "You place your consciousness into your shadow and send it forth from your body, allowing you to sense and operate through it at a distance. The normal Insight check to notice Remote Sensing (DC 10 + rank) is a Perception check to notice your separated shadow instead. (Remote Sensing (visual, auditory, mental) • 4 points per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_walk",
        "name": "Shadow Walk",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Darkness, Shadows",
        "extras": [],
        "flaws": [],
        "notes": "You appear to step into a shadow in one place and emerge from another elsewhere. Teleport modifiers like Accurate, Easy, Extended, and Portal are common for this power. (Teleport, Medium (shadows) • 1 point per rank)"
      },
      {
        "id": "prof_darkness_powers_darkvision",
        "name": "Darkvision",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "Your vision is unhindered by darkness and you can see normally regardless of the light level. (Senses 2 (Vision Counters Concealment - darkness) • 2 points)"
      },
      {
        "id": "prof_darkness_powers_gloom",
        "name": "Gloom",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Darkness, Visibility",
        "extras": [],
        "flaws": [],
        "notes": "You lower the light levels around you, creating an area of gloom and shadows, which may be a useful prerequisite for the use of other darkness powers, or simply an atmospheric environmental effect. At extreme ranks (sufficient to affect hundreds or even thousands of miles in radius), this power may involve creating an actual eclipse of the sun! (Environment (visibility) • 1 or 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_healing_darkness",
        "name": "Healing Darkness",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Darkness, Darkness",
        "extras": [],
        "flaws": [],
        "notes": "Darkness and shadows soothe your hurts and allow you to heal quickly from any damage or injury. (Regeneration, Source (darkness) • 1 point per 2 ranks)"
      },
      {
        "id": "prof_darkness_powers_scry_through_shadow",
        "name": "Scry Through Shadow",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Darkness, Visual and auditory",
        "extras": [],
        "flaws": [],
        "notes": "You can peer into a shadow or other area of darkness and perceive what is happening near another such shadow within your range. Those nearby may have the intense feeling of being watched from within that shadow if they succeed on an Insight check (DC 10 + your rank). (Remote Sensing (visual and auditory), Medium (shadows and darkness) • 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_form",
        "name": "Shadow Form",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Darkness and Shadows"
          }
        ],
        "notes": "You can transform as a free action into a living shadow, able to pass through solid barriers and ignore most physical attacks, save light-based effects. You can \"slide\" along surfaces, including walls and ceilings, and ignore the physical needs of flesh-and-blood. Shadow Form may include other effects, particularly upgrading Immunity to all Fortitude effects or adding traits like Elongation or Senses (such as Darkvision, previously). (Concealment 2 (Visual, Limited to Darkness and Shadows), Immunity 10 (life support), Insubstantial 3 (shadow form), Movement 3 (Slithering, Wall-crawling 2) • 33 points)"
      },
      {
        "id": "prof_darkness_powers_shadow_shaping",
        "name": "Shadow Shaping",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "You project and sculpt a kind of \"solid darkness\" into different shapes according to your will. This power is typically for forming walls and other barriers, containment spheres (cubes, etc.), temporary bridges and other such constructs. (Create Shadow Shapes • 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_shadow_tendrils",
        "name": "Shadow Tendrils",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadows",
        "extras": [],
        "flaws": [],
        "notes": "You extend tendrils of shadow from your hands or a dark aura around your head or body, able to grasp and manipulate objects like solid tentacles. Some Shadow Tendrils have the Precise modifier for performing delicate tasks, and the Area modifier allows you to extend multiple tendrils, each capable of lifting and moving your full Move Object rank of weight. (Move Object (shadows) • 2 points per rank)"
      },
      {
        "id": "prof_darkness_powers_summon_shadows",
        "name": "Summon Shadows",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "You can summon shadow beings, either animating ordinary shadows or calling shadow creatures from some nether dimension. Although no more substantial than ordinary shadows, these creatures can touch and manipulate physical objects-and damage them. Apply the Multiple Minions extra to summon more than one shadow creature at a time and the Horde modifier to summon them all at once. (Summon Shadow Creature 4 (58-point minion) • 8 points)"
      },
      {
        "id": "prof_darkness_powers_shades",
        "name": "Shades (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "Your control of darkness provides you with some minor protection from intense light. You never (Feature • 1 point)"
      },
      {
        "id": "prof_darkness_powers_shadow_puppets",
        "name": "Shadow Puppets (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "You can create minor \"shadow shows\" against a flat surface, shaping the shadows as (Feature • 1 point)"
      },
      {
        "id": "prof_darkness_powers_shadow_suit",
        "name": "Shadow Suit (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Darkness, Shadow",
        "extras": [],
        "flaws": [],
        "notes": "You can cover your entire body with impenetrable shadows at will, essentially \"wearing\" dark- (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Death Powers",
    "profiles": [
      {
        "id": "prof_death_powers_banshee_s_wail",
        "name": "Banshee’s Wail",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Death, Necromantic",
        "extras": [
          {
            "id": "area_perception",
            "name": "Area (Perception)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A soul-rending scream tears at the very life force of all who hear it. This power is often Cumulative as well, making it even more dangerous on successive rounds, and it may have Affects Corporeal for attackers with the Ghost Form power (see Utility Powers). (Hearing Perception Area Affliction (Resisted and Overcome by Will; Dazed, Stunned, Dying) • 2 points)"
      },
      {
        "id": "prof_death_powers_command_the_undead",
        "name": "Command the Undead",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Death, Necromantic",
        "extras": [
          {
            "id": "area_perception",
            "name": "Area (Perception)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "the Undead"
          }
        ],
        "notes": "You can exert control over undead beings in your presence, perhaps even wresting it away from whomever else controls them. Treat mindless undead as having a resistance check modifier of +0. This power is sometimes Cumulative, allowing you to make multiple attempts to strengthen your control, and may be Limited to a single command, like \"stay back!\" or \"begone!\" rather than full control of the creatures. (Hearing Perception Area Affliction (Resisted and Overcome by Will; Dazed, Compelled, Controlled), Affects Objects, Limited to the Undead • 2 points per rank)"
      },
      {
        "id": "prof_death_powers_death_curse",
        "name": "Death Curse",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Death, Necromantic",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "one check per day"
          }
        ],
        "notes": "Through mystic, psychic, or other means you place a \"mark of death\" upon your victim. From then on, the victim suffers from a progressive debilitating condition like a slow poison or disease until the death curse is removed or the victim finally succumbs. (Perception Ranged Progressive Affliction (Resisted and Overcome by Will; Impaired, Disabled, Dying), Limited to one check per day • 4 points per rank)"
      },
      {
        "id": "prof_death_powers_death_stare",
        "name": "Death Stare",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Death, Necromantic",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A chilling gaze, you fill your target with the terror of impending death, perhaps even to the point of causing a shadow of the Grim Reaper (or some other avatar of death) to cross your features. (Perception Ranged Cumulative Affliction (Resisted and Overcome by Will; Impaired, Stunned, Paralyzed), Vision Dependent • 3 points per rank)"
      },
      {
        "id": "prof_death_powers_death_touch",
        "name": "Death Touch",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Death, Necromantic",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your very touch is potentially deadly, draining victims of their life force and causing weakness and, eventually, death. (Cumulative Affliction (Resisted and Overcome by Fortitude; Impaired, Disabled, Dying) • 2 points per rank)"
      },
      {
        "id": "prof_death_powers_grasping_graves",
        "name": "Grasping Graves",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Death, Necromantic",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Multiple rotting and skeletal arms erupt from the earth at your command to grab a target and hold them in place. This power may be Limited to places where there are actual graves, or it might produce its effect anywhere. (Ranged Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree • 2 points per rank)"
      },
      {
        "id": "prof_death_powers_soulfire",
        "name": "Soulfire",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Death, Soul",
        "extras": [],
        "flaws": [],
        "notes": "You can generate and project a kind of fiery energy made up of the essence of souls, rather than having anything to do with actual fire. Infernal mystics and creatures sometimes refer to this energy as \"hellfire\" while angels and higher beings call it \"divine\" or \"holy\" fire. The basic effect of Soulfire is to \"burn\" the spirit rather than the body. Some can project blasts of Soulfire (add the Ranged modifier) or use it for a wider range of effects. See the Fire Powers section, applying the appropriate descriptors to those powers to make them into Soulfire effects. (Damage (soul), Alternate Resistance (Will) • 1 point per rank)"
      },
      {
        "id": "prof_death_powers_suppress_life",
        "name": "Suppress Life",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Death, Necromantic",
        "extras": [
          {
            "id": "incurable",
            "name": "Incurable",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Recovery Checks"
          }
        ],
        "notes": "Rather than the sheer draining power of Death Touch (previously) a more sinister power weakens the quality of the victim's life force, leaving them incapable of healing or recovering or benefitting from effects that help them to do so. (Weaken Stamina, Incurable, Insidious, Limited to Recovery Checks • 2 points + 1 point per 2 ranks)"
      },
      {
        "id": "prof_death_powers_blood_healing",
        "name": "Blood Healing",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Blood",
        "extras": [],
        "flaws": [],
        "notes": "You can quickly recover from damage, but only by consuming at least a pint of blood of a living creature. Some characters and creatures change the power's source to another power like Death Touch or to something like consuming flesh (for cannibalistic ghouls and zombies). (Regeneration, Source (blood) • 1 point per 2 ranks)"
      },
      {
        "id": "prof_death_powers_deathless",
        "name": "Deathless",
        "rank": 1,
        "effectId": "immortality",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Means of permanent death",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "means of permanent death"
          }
        ],
        "notes": "You are beyond the grasp of death and, even if you are destroyed, you will return. There must be at least one way to slay your permanently, however, whether beheading, burning, or burying your remains in hallowed ground. (Immortality, Limited (means of permanent death) • 1 point per rank)"
      },
      {
        "id": "prof_death_powers_ghost_shield",
        "name": "Ghost Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Death, Necromantic",
        "extras": [],
        "flaws": [],
        "notes": "Swirling ghostly forms around you deflect damage and keep your from harm. The Impervious modifier is common for this power. (Protection (necromantic), Sustained • 1 point per rank)"
      },
      {
        "id": "prof_death_powers_shielded_soul",
        "name": "Shielded Soul",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Death effects",
        "extras": [],
        "flaws": [],
        "notes": "You are protected against death effects and direct attacks upon your soul or life force. (Immunity 5 (death effects) • 5 points)"
      },
      {
        "id": "prof_death_powers_death_s_gate",
        "name": "Death’s Gate",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Death, Dimensional 2, afterlives",
        "extras": [
          {
            "id": "portal",
            "name": "Portal",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can open a portal into the realm of the dead (or realms, if there are more than one), allowing you and others to pass through into it. Of course, there is no assurance that you will necessarily be able to find someone there or bring them back with you. Indeed, the realms of the dead are often dangerous, and ruled by beings who prefer never to let anyone leave. (Movement 2 (Dimensional 2, afterlives), Portal • 8 points)"
      },
      {
        "id": "prof_death_powers_valkyrie_s_ride",
        "name": "Valkyrie’s Ride",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Death, See description",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Dying Subjects"
          }
        ],
        "notes": "You are drawn to death, so much so that you can immediately appear at the side of anyone known to you whose condition is dying. As a side effect of this power, you immediately know when such an opportunity arises and who that person is. This is a variant of the Accurate modifier (Deluxe Hero's Handbook, page 183). The Easy modifier is common for this power, allowing you to arrive at your destination ready for anything (rather than being momentarily disoriented). (Teleport, Accurate (see description), Extended, Limited to Dying Subjects • 3 points per rank)"
      },
      {
        "id": "prof_death_powers_death_sight",
        "name": "Death Sight",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Death, Detect Dying, Ranged",
        "extras": [],
        "flaws": [],
        "notes": "You can perceive those about to perish, seeing their life force as a kind of \"life\" which fades as their condition progresses through dying towards death. (Senses 2 (Detect Dying, Ranged) • 2 points)"
      },
      {
        "id": "prof_death_powers_death_visions",
        "name": "Death Visions",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Precognition",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Visions of Death"
          }
        ],
        "notes": "You can see the spirit of death hovering near those who will die soon. Whether or not their fate can be changed depends on how the GM chooses to handle precognitive effects, but generally the assumption is the victim will die unless something is done to prevent it, although you do not necessarily know how they will die or what needs to be done. (Senses 4 (Precognition), Limited to Visions of Death • 2 points)"
      },
      {
        "id": "prof_death_powers_ghost_form",
        "name": "Ghost Form",
        "rank": 1,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Death, Fortitude effects",
        "extras": [],
        "flaws": [],
        "notes": "You are a ghost: an incorporeal, undead being with no physical body. You pass harmlessly through solid objects, although you may affect them if you have powers with Affects Corporeal. You're immune to mortal concerns, but do not recover on your own without aid or the use of a power. Many ghosts also have ranks of Concealment, at least sufficient to render them unseen by mortal eyes, and may have other powers as well. True ghosts apply the Permanent modifier to Flight and Insubstantial and Innate to Insubstantial, increasing the net cost by 1 point. Otherwise, it is assumed you can switch in and out of your Ghost Form at will as a free action. (Flight 1, Immunity 30 (Fortitude effects), Insubstantial 4 (incorporeal), No Stamina rank (-10 points) • 41 points)"
      },
      {
        "id": "prof_death_powers_necromancy",
        "name": "Necromancy",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Death, 32 total",
        "extras": [],
        "flaws": [],
        "notes": "You can imbue corpses, even skeletal remains, with a semblance of life, turning them into undead creatures that rise up at your command. Use the zombie archetypes from the Gamemaster's Guide (page 144) or apply the zombie template (page 145) to a different archetype for things like creating zombie or skeletal dinosaurs or other creatures. Although the power as listed has a substantial cost per rank, only 1 or 2 ranks are needed to cover the undead's power level and costs; Summon Zombies costs 14 points while Summon Skeletons costs 28 points. This power may have a Limited modifier requiring the necessary corpses be already present, making it fully useful only in places like graveyards, morgues, and battlefields. (Summon Undead, Controlled, Horde, Multiple Minions (32 total) • 14 points per rank)"
      },
      {
        "id": "prof_death_powers_speak_with_the_dead",
        "name": "Speak With the Dead",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Postcognition",
        "extras": [],
        "flaws": [],
        "notes": "You can summon the spirit or shade of someone who has passed in order to communicate with them, learning what they knew in life. At the Gamemaster's discretion, this may require an interaction skill check rather than the Perception check normally associated with a Senses effect, representing your negotiation with the summoned spirit. If you can \"channel\" the spirit, allowing it to speak or interact through you as a medium, apply the Affects Others modifier, allowing you to grant the benefits of your insights to observers. (Senses 4 (Postcognition) • 4 points)"
      },
      {
        "id": "prof_death_powers_undead_form",
        "name": "Undead Form",
        "rank": 30,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Fortitude effects",
        "extras": [],
        "flaws": [],
        "notes": "You are no longer living, but not truly dead, either. Although your body has no vital signs or autonomic functions (breathing, heartbeat, brain activity, etc.) you are still animate and aware. Although you are immune to many of the things troubling living creatures, your body also does not heal on its own without a separate power like Blood Healing (previously). (Immunity 30 (Fortitude effects), No Stamina rank (-10 points) • 20 points)"
      },
      {
        "id": "prof_death_powers_necromantic",
        "name": "Necromantic (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Necromantic",
        "extras": [],
        "flaws": [],
        "notes": "Originally, \"necromancy\" was the mystical art of communicating with the spirits of the dead, (Feature • 1 point)"
      },
      {
        "id": "prof_death_powers_soul",
        "name": "Soul (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Necromantic",
        "extras": [],
        "flaws": [],
        "notes": "Death powers often associate the life force with the soul or spirit (used interchangeably). Death usually (Feature • 1 point)"
      },
      {
        "id": "prof_death_powers_undead",
        "name": "Undead (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Necromantic",
        "extras": [],
        "flaws": [],
        "notes": "The undead are creatures that are not alive (having no Stamina rank, vital life force, or vital (Feature • 1 point)"
      },
      {
        "id": "prof_death_powers_deathly_aura",
        "name": "Deathly Aura (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Necromantic",
        "extras": [],
        "flaws": [],
        "notes": "Your touch is inimical to simple forms of life: small plants wither and die when you touch (Feature • 1 point)"
      },
      {
        "id": "prof_death_powers_deathly_mien",
        "name": "Deathly Mien (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Necromantic",
        "extras": [],
        "flaws": [],
        "notes": "You seem dead to all appearances, even though you are not: your flesh is pale and cold, you (Feature • 1 point)"
      },
      {
        "id": "prof_death_powers_undead_presence",
        "name": "Undead Presence (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Death, Necromantic",
        "extras": [],
        "flaws": [],
        "notes": "Undead creatures tend to regard you as \"one of them\" and have, at worst, a neutral at- (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Dimension Powers",
    "profiles": [
      {
        "id": "prof_dimension_powers_dimensional_banishment",
        "name": "Dimensional Banishment",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Dimensional, Dimensional Travel 1",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Above the base of 11 costs 3 points per rank (including the Limited to Resistance modifier) and is limited by power level. This power is often Limited to banishing only outsiders, so you cannot exile someone from their native dimension. It can effectively serve to counter many dimensional summoning effects. (Perception Ranged Movement (Dimensional Travel 1) Attack (Resisted by Dodge or Will) • 4 points + 3 points per +1 to resistance DC.)"
      },
      {
        "id": "prof_dimension_powers_dimensional_blade",
        "name": "Dimensional Blade",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Dimensional, Cutting",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can conjure a two-dimensional weapon that is almost infinitely thin, making it impossibly sharp. It might be a Removable device, called out of nothing, or even your own hand or arm, flattened down into two-dimensions. The blade is Subtle in that it is practically invisible when seen on-edge, making it easier to conceal, and occasionally useful for surprise attacks. (Penetrating Damage (cutting), Subtle • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_dimension_powers_dimensional_cascade",
        "name": "Dimensional Cascade",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Dimensional, Environmental effect",
        "extras": [
          {
            "id": "area_cone",
            "name": "Area (Cone 60ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You tear a rift in the dimensional fabric, causing a cascade of dangerous energies to pour out and engulf your targets. You can choose any environmental effect or hazard-heat, cold, poison gas, electricity, radiation, and so forth-as the descriptor for the power's Damage. For a more focused version, swap Ranged for Cone Area. (Cone Area Damage (environmental effect), Variable Descriptor 1 (environmental effects) • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_dimension_powers_dimensional_adaptation",
        "name": "Dimensional Adaptation",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dimensional, Life support",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Hazardous Dimensions"
          }
        ],
        "notes": "You adapt to survive in dimensions you visit, allowing you to travel without any concern for the local conditions. (Immunity 10 (life support), Limited to Hazardous Dimensions • 5 points)"
      },
      {
        "id": "prof_dimension_powers_dimensional_anchor",
        "name": "Dimensional Anchor",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dimensional, Dimension powers",
        "extras": [],
        "flaws": [],
        "notes": "You are a \"fixed point\" amongst dimensions, immune to dimension-manipulating or shifting effects you do not initiate yourself. (Immunity 5 (dimension powers) • 5 points)"
      },
      {
        "id": "prof_dimension_powers_dimensional_shunt",
        "name": "Dimensional Shunt",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Dimensional, Dimensional",
        "extras": [],
        "flaws": [],
        "notes": "You neutralize the effects of attacks by shunting them into another dimension. This requires the Defend action (Deluxe Hero's Handbook, page 246) so you cannot use Dimensional Shunt while taking other standard actions, but you can use this power to protect other targets from attacks, so long as they are within range. Reflect and Redirect are potential modifiers for this power. (Deflect (dimensional) • 1 point per rank)"
      },
      {
        "id": "prof_dimension_powers_dimensional_jump",
        "name": "Dimensional Jump",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Dimensional, Dimensional Travel",
        "extras": [],
        "flaws": [],
        "notes": "You move from one dimension to another simply by willing it, vanishing from your current dimension and appearing in the other. You appear at your proximate location in the other dimension, and if you move there and travel back to the previous dimension, you appear to have moved the proximate distance. For the ability to shift great distances between dimensions, add a Teleport effect to your power. (Movement (Dimensional Travel) • 2 points per rank up to 3 ranks (6 points).)"
      },
      {
        "id": "prof_dimension_powers_dimensional_portal",
        "name": "Dimensional Portal",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Dimensional, Dimensional Travel",
        "extras": [
          {
            "id": "portal",
            "name": "Portal",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can open a portal or gateway between the dimension you currently occupy and another. Anyone can step through the portal so long as you concentrate to keep it open. (Movement (Dimensional Travel), Portal • 4 points per rank up to 3 ranks (12 points).)"
      },
      {
        "id": "prof_dimension_powers_dimension_sense",
        "name": "Dimension Sense",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dimensional, Detect Dimension, Acute",
        "extras": [],
        "flaws": [],
        "notes": "You have the ability to sense the \"vibration\" or other metaphysical qualities of the dimension you occupy, letting you both recognize it (if you know it) and learn it for future reference, allowing you to travel there again and recognize it when you do. Making the sense Analytical allows you to learn the essential differences between the physical laws and properties of the dimension from the baseline you know (usually Earth's dimension). (Senses 2 (Detect Dimension, Acute) • 2 points)"
      },
      {
        "id": "prof_dimension_powers_dimensional_grab",
        "name": "Dimensional Grab",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Dimensional, Equipment",
        "extras": [],
        "flaws": [],
        "notes": "Although details like its grip or make could vary. Gamemaster's may wish to limit the ability to grab very specific items to avoid the damage this power-carefully usedcan do to the plot. Dimensional Grab is often associated with a Removable device, such as a gauntlet or a container (bag, pocket, or hat) from which the user can withdraw almost anything. (Enhanced Advantage (Equipment; dimensional), Variable Descriptor 2 (equipment) • 2 points +)"
      },
      {
        "id": "prof_dimension_powers_dimensional_perspective",
        "name": "Dimensional Perspective",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dimensional, Penetrates Concealment",
        "extras": [],
        "flaws": [],
        "notes": "By shifting the perspective of your senses through dimensions, you can perceive \"around\" obstacles in the dimension you occupy: a wall, for example, may not exist in a neighboring dimension and is \"flat\" when viewed from a higher one. (Senses 4 (Penetrates Concealment) • 4 points per sense.)"
      },
      {
        "id": "prof_dimension_powers_dimensional_pocket",
        "name": "Dimensional Pocket",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dimensional, Quantum",
        "extras": [],
        "flaws": [],
        "notes": "Nothing else will fit into it without first removing something. Like Dimensional Grab, this power is often a Removable device of some sort, a container you literally reach into to store and retrieve items; otherwise, your Dimensional Pocket appears like a \"hole\" in the air or may simply be items appearing and disappearing from your hands. (Feature (extradimensional storage of mass rank in material) • 1 point per rank)"
      },
      {
        "id": "prof_dimension_powers_dimensional_shift",
        "name": "Dimensional Shift",
        "rank": 4,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Dimensional, Quantum",
        "extras": [],
        "flaws": [],
        "notes": "You shift the majority of your bodily mass out of your current dimension, leaving only a ghostly after-image, allowing you to move about like an immaterial wraith. You may be exposed to hazards in the interstitial dimension where you have shifted your mass, and others with Dimensional Shift powers may be able to reach you there. (Insubstantial 4 • 20 points)"
      },
      {
        "id": "prof_dimension_powers_dimensional_stability",
        "name": "Dimensional Stability",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Dimensional, Quantum",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You \"harden\" the local dimensional structure around you, making it more difficult to change, manipulate, or open for as long as you concentrate. If this power only requires a modicum of concentration for you, apply the Sustained modifier (increasing cost by +1 per rank). (Nullify Dimension Powers, Cloud Area, Concentration, Simultaneous, Close Range • 3 points)"
      },
      {
        "id": "prof_dimension_powers_dimensional_summoning",
        "name": "Dimensional Summoning",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Dimensional, Quantum",
        "extras": [],
        "flaws": [],
        "notes": "You can bring creatures from other dimensions to serve you. These can range from mythic and metaphysical beings to alien life forms or even parallel world duplicates, depending on the power's descriptors. See the Summoning Powers section for details and additional ideas for this power. (Summon Extradimensional Beings • 2 points per rank)"
      },
      {
        "id": "prof_dimension_powers_dimensional_window",
        "name": "Dimensional Window",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Dimensional, Quantum",
        "extras": [],
        "flaws": [],
        "notes": "You open a \"window\" into another dimension, allowing you to peer into it, seeing and hearing what is happening there proximate to your location. If you can extend your senses to other locales in your target dimension, add ranks in Remote Sensing to the power (possibly Limited to Other Dimensions). (Dimensional Vision and Hearing • 2 points (one other dimension), 4 points (related group of)"
      },
      {
        "id": "prof_dimension_powers_two_dimensional_form",
        "name": "Two-Dimensional Form",
        "rank": 4,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Dimensional, All visual, Limited to One Side",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "One Side"
          },
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Limited by body width, -1 point"
          }
        ],
        "notes": "You flatten your body down to two dimensions, having height and width, but essentially no depth, becoming almost infinitely flat. This makes you practically invisible when seen from the side (on edge) and allows you to fit through any opening wide enough to accommodate the width of your shoulders, allowing you to slide through the cracks between door and window frames, for example. This form is often (but not always) accompanied by the Dimensional Blade offensive power, using your hands and arms as infinitely thin cutting edges. (Concealment 4 (all visual, Limited to One Side), Insubstantial 1, Quirk (Limited by body width, -1 point) • 8 points)"
      },
      {
        "id": "prof_dimension_powers_native_garb",
        "name": "Native Garb (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dimensional, Quantum",
        "extras": [],
        "flaws": [],
        "notes": "When you arrive (and only when you arrive) in another dimension, you can choose to (Feature • 1 point)"
      },
      {
        "id": "prof_dimension_powers_native_outsider",
        "name": "Native Outsider (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dimensional, Quantum",
        "extras": [],
        "flaws": [],
        "notes": "Although you are not originally from the dimension you primarily inhabit, you are (Feature • 1 point)"
      },
      {
        "id": "prof_dimension_powers_safety_sense",
        "name": "Safety Sense (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dimensional, Quantum",
        "extras": [],
        "flaws": [],
        "notes": "You can visualize a target area in another dimension and sense if you are capable of (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Dream Powers",
    "profiles": [
      {
        "id": "prof_dream_powers_four_dimensional_form",
        "name": "Four-Dimensional Form",
        "rank": 8,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Dream, Variable Descriptor 2, all attacks",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Depending on the nature of other dimensions in the setting, this form may include other effects, such as Dimensional Travel, Enhanced Strength, Move Object, or even Time Travel. (Indirect 3 (Variable Descriptor 2, all attacks), Senses 8 (Vision and Hearing Penetrate Concealment), Teleport 1 • 15 points)"
      },
      {
        "id": "prof_dream_powers_dream_trap",
        "name": "Dream Trap",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Dream, Third only",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You cause a sleeping target to go into a coma, trapped in the dream-world and unable to wake. Although the target's condition is asleep, until the transformed condition is removed, the target cannot awaken. A more gradual version of this power may have the Cumulative or Progressive modifier. (Perception Ranged Affliction (Resisted and Overcome by Will; Transformed-Asleep), Limited Degree (third only), Limited to Sleeping Targets • 1 point per rank)"
      },
      {
        "id": "prof_dream_powers_nightmare_blast",
        "name": "Nightmare Blast",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Dream, Nightmares",
        "extras": [
          {
            "id": "variable_conditions",
            "name": "Variable Conditions",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Sleeping Targets"
          }
        ],
        "notes": "Putting your target through a terrible nightmare, you are able to inflict psychic trauma so profound as to have real consequences in the waking world. The exact nature of the trauma and its effects depend on the nightmare imagery, ranging from the classic \"if you fall to your death in a dream, you die in reality\" to inducing coma (incapacitated), psychological conditioning (controlled), or even changes in personality (transformed). This power is normally limited to affecting a sleeping target's dreams. If you remove the Limited modifier, you can project a Nightmare Blast into the mind of any target you can perceive, waking or sleeping. This power uses the Variable Conditions extra from the Illusion Power section. (Perception Ranged Affliction (Resisted and Overcome by Will; conditions vary), Variable Conditions, Variable Descriptor 1 (nightmares), Limited to Sleeping Targets • 1 point + 4 points per rank)"
      },
      {
        "id": "prof_dream_powers_sleep",
        "name": "Sleep",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Dream, Mental",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can place a target into a deep sleep, simply by looking at them. In addition to the usual resistance check to overcome the asleep condition, the target can be awakened by normal means (see Sleep under Dream Descriptors). This power may be both Subtle and Insidious, meaning the target is unaware you are causing sleep; they simply feel more and more drowsy until they finally drop off. (Perception Ranged Cumulative Affliction (Resisted and Overcome by Will; Fatigued, Exhausted, Asleep) • 4 points)"
      },
      {
        "id": "prof_dream_powers_sleep_deprivation",
        "name": "Sleep Deprivation",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Dream, Mental",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "one check per day"
          }
        ],
        "notes": "You leave a target unable to sleep, or at least unable to rest, their sleep troubled by disturbing images and nightmares such that it provides no recovery from fatigue. (Perception Ranged Affliction (Resisted and Overcome by Will; Fatigued, Exhausted, Incapacitated), Progressive, Subtle, Limited to one check per day • 1 point +)"
      },
      {
        "id": "prof_dream_powers_dream_dissipation",
        "name": "Dream Dissipation",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [],
        "notes": "You can counteract the effects of dream powers, either allowing a subject to return to wakefulness (if something prevented them from doing so) or slip into a normal asleep condition. This power affects a single subject by default but the Area modifier allows it to affect multiple subjects at once. The GM may allow an area use of this power in the dream dimension to affect a group within the designated area there, regardless of how far apart their sleeping physical forms may be. (Nullify Dream Powers, Simultaneous • 2 points per rank)"
      },
      {
        "id": "prof_dream_powers_dream_immunity",
        "name": "Dream Immunity",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Dream Powers",
        "extras": [],
        "flaws": [],
        "notes": "You are unaffected by dream powers, either due to some sort of shielding or protection or simply because you do not dream (see the Sleepless power, following, if you also do not sleep). (Immunity 2 (Dream Powers) • 2 points)"
      },
      {
        "id": "prof_dream_powers_healing_trance",
        "name": "Healing Trance",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Sleep",
        "extras": [],
        "flaws": [],
        "notes": "While you sleep, you quickly recover from any damage or injury. (Regeneration, Source (Sleep) • 1 point per 2 ranks)"
      },
      {
        "id": "prof_dream_powers_sleepless",
        "name": "Sleepless",
        "rank": 1,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Sleep",
        "extras": [],
        "flaws": [],
        "notes": "You do not ever need to sleep or dream, although you may choose to do so, if you wish (as a descriptor of the Immunity effect). If you are incapable of dreaming, then you also have the Dream Immunity power (previously). Note that this power does not grant immunity to physical fatigue: you still tire from exertion and need to rest, you simply do not sleep or tire from mental activity. (Immunity 1 (Sleep) • 1 point.)"
      },
      {
        "id": "prof_dream_powers_dreamport",
        "name": "Dreamport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Dream, Dreamers",
        "extras": [],
        "flaws": [],
        "notes": "You can bodily transport yourself over great distances in the waking world by traveling through the dreams of sleepers. You must be within about arm's reach of a sleeping dreamer and you emerge into the waking world about the same distance from another sleeping dreamer within range of your Teleport effect. Other Teleport modifiers, particularly Extended, are common for this power. (Teleport, Accurate, Medium (dreamers) • 2 points per rank)"
      },
      {
        "id": "prof_dream_powers_dream_projection",
        "name": "Dream Projection",
        "rank": 10,
        "effectId": "communication",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Dreamers"
          }
        ],
        "notes": "You project a mental image of yourself into another person's dreams. You cannot perceive the content of the dream unless you also have Dream Reading (see Utility Powers) but you can communicate with the dreamer and anyone else present within the dream. You will tend to blend into the context of the dream, although with a modest effort of will you can exert your normal appearance. If the power is Insidious, then your dream projection fits into the dream and is taken as just another element of it, granting you a circumstance bonus to use the projection for interaction checks like Deception against the dreamer. (Communication (Mental), Limited to Dreamers • 3 points per rank)"
      },
      {
        "id": "prof_dream_powers_dream_travel",
        "name": "Dream Travel",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Dream, Dimensional Travel",
        "extras": [],
        "flaws": [],
        "notes": "You can travel bodily into the dimension or realm of dreams. If you can bring others along with you, apply the Increased Mass extra, or the Portal modifier from Teleport to the power. See Dream Dimension under Dream Descriptors for details about what to expect at your destination. If the setting features multiple dream dimensions, you can travel to any of them with two ranks of Dimension Travel. Note that traveling bodily into a subject's dreams allows you to perceive them and communicate, but also exposes you to whatever is happening in that dream, since you are actually \"there\" rather than just perceiving or communicating. (Movement 1 (Dimensional Travel) • 2 points)"
      },
      {
        "id": "prof_dream_powers_dream_control",
        "name": "Dream Control",
        "rank": 10,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Dream, All Senses",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Minds"
          }
        ],
        "notes": "You have the ability to control the content of a person's dreams, dictating what they dream, creating nightmares, or soothing them, and so forth. If you can draw images from the subject's own mind, apply the Psychic modifier (see the Illusion Powers section). (Illusion (All Senses), Limited to Minds, Limited to Sleeping Subjects • 3 points per rank)"
      },
      {
        "id": "prof_dream_powers_dream_mastery",
        "name": "Dream Mastery",
        "rank": 10,
        "effectId": "variable",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "while asleep"
          }
        ],
        "notes": "You are virtually omnipotent in the world of dreams, limited solely by your imagination and willpower in terms of what you can accomplish. This power is significantly limited, in that both you and anyone you interact with must be asleep and dreaming, but otherwise it is capable of achieving real effects in that anything affecting dreamers on the mental level is reflected in the waking world, including damage and other conditions. There may even be psychosomatic or mystical physical repercussions of your powers, depending on descriptors. (Variable (dream powers, Free Action, Limited to while asleep, Limited to while in dreams) • 7 points per rank)"
      },
      {
        "id": "prof_dream_powers_dream_reading",
        "name": "Dream Reading",
        "rank": 10,
        "effectId": "mind_reading",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Sleeping Subjects"
          }
        ],
        "notes": "You can connect to a sleeping subject's dreams and perceive them as they occur, as if they were happening to you, but with a degree of psychological \"distance\" insulating you from their effects. You can even \"direct\" the dream to a degree to uncover particular information the subject knows, ranging from direct questioning of the subject's dreaming self, to revealing imagery, such as revisiting old memories. The subject may (with an Insight check versus DC 10 + power rank) perceive you as a \"presence\" in the dream, perhaps cloaked in appropriate imagery, unless your power is Subtle. The subject gets the usual Will resistance check to prevent you from perceiving anything or from increasing the information you receive. (Mind Reading, Limited to Sleeping Subjects • 1 point per rank)"
      },
      {
        "id": "prof_dream_powers_dream_touch",
        "name": "Dream Touch",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [],
        "notes": "You can \"reach out\" with your mind to \"touch\" the sleeping mind of another being known to you, sufficient for you to connect with their dreams and use other Perception Ranged dream powers on them. This is a particularly useful power, in spite of working only on sleeping minds, and Gamemasters should be careful about allowing playercontrolled characters to have and use it, since it can potentially unbalance the game and may leave other characters largely out of the activity that occurs on the dream level. (Remote Sensing (mental), Senses 4 (Accurate Ranged Detect Dreamers, mental) • 4 points + 1 point per rank)"
      },
      {
        "id": "prof_dream_powers_precognitive_dreams",
        "name": "Precognitive Dreams",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Precognition",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Dreaming"
          }
        ],
        "notes": "You receive visions of the future in your dreams. These may be couched in symbolic dream imagery and require interpretation, but you always know the difference between a vision and an ordinary dream. This power is often Uncontrolled in addition to only occurring while you dream, meaning the visions come unbidden, and only when the Gamemaster chooses. (Senses 4 (Precognition), Limited to Dreaming • 2 points)"
      },
      {
        "id": "prof_dream_powers_sleep_substitute",
        "name": "Sleep Substitute",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Dream, Energizing, Limited to Energizing",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Energizing"
          }
        ],
        "notes": "You can provide the benefits of sleep to someone without them actually needing to sleep for any length of time. (Healing (Energizing, Limited to Energizing) • 1 point per rank)"
      },
      {
        "id": "prof_dream_powers_dream_dimension",
        "name": "Dream Dimension (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [],
        "notes": "In many comic book settings, the realm of dreams is an entire alternate reality char- (Feature • 1 point)"
      },
      {
        "id": "prof_dream_powers_daydreamer",
        "name": "Daydreamer (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [],
        "notes": "You need the Light Sleeper Feature (following) to have this one. You can enter the asleep (Feature • 1 point)"
      },
      {
        "id": "prof_dream_powers_fast_sleeper",
        "name": "Fast Sleeper (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [],
        "notes": "You can go into the asleep condition at-will with just one round to prepare, and choose when (Feature • 1 point)"
      },
      {
        "id": "prof_dream_powers_light_sleeper",
        "name": "Light Sleeper (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [],
        "notes": "You only need one degree of success on a hearing Perception check to awaken from the (Feature • 1 point)"
      },
      {
        "id": "prof_dream_powers_lucid_dreamer",
        "name": "Lucid Dreamer (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Dream, Mental",
        "extras": [],
        "flaws": [],
        "notes": "When you sleep, you can choose what you dream and you remain conscious and (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Earth Powers",
    "profiles": [
      {
        "id": "prof_earth_powers_chasm",
        "name": "Chasm",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Earth, Mineral",
        "extras": [
          {
            "id": "area_line",
            "name": "Area (Line 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You open a deep pit or chasm in the ground beneath your targets, dropping them into it. At the least, they have to scramble to avoid falling; at the worst they plunge into the chasm, subjecting them to damage and leaving them prone. If you can close the chasm on your targets, inflicting the Damage to them again, apply the Secondary Effect modifier, increasing cost by 1 per rank. (Line Area Ranged Affliction (Resisted by Dodge; Dazed, Prone), Instant Recovery (the Dazed and Prone conditions only last for a round), Limited Degree, Linked Line Area Burrowing Attack (Limited to downward), Linked to Line Area Ranged Damage, Limited to Targets Affected by Second Degree of Affliction • 4 points per rank)"
      },
      {
        "id": "prof_earth_powers_dust_storm",
        "name": "Dust Storm",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Earth, -5 visibility",
        "extras": [],
        "flaws": [],
        "notes": "You kick up a storm of dust, dirt, or sand, severely limiting visibility in the area. This affects you as well unless you apply the Selective modifier or have the appropriate Penetrates Concealment Sense effect. (Environment (-5 visibility) • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_earth_blast",
        "name": "Earth Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Earth, Rock impact",
        "extras": [],
        "flaws": [],
        "notes": "You hurl a large rock or mass of earth at your target with considerable force. (Ranged Damage (rock impact) • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_earthquake",
        "name": "Earthquake",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Earth, Mineral",
        "extras": [
          {
            "id": "secondary_effect",
            "name": "Secondary Effect",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "A powerful local tremor shakes the ground, potentially knocking targets over. The Secondary Effect provides an \"aftershock\" on the round following the initial quake. Earthquakes can cause considerable collateral damage, a potential complication (see Earth Complications). (Ranged Burst Area 3 Affliction (Resisted by Dodge, Overcome by Fortitude; Dazed and Vulnerable, Stunned and Prone), Extra Condition, Secondary Effect, Limited Degree, Limited to along the ground; 120-foot radius • 5 points per rank,)"
      },
      {
        "id": "prof_earth_powers_earth_spray",
        "name": "Earth Spray",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Earth, Impaired, Disabled, Unaware",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "A spray of dirt, sand, or mud hits the target in the eyes, temporarily blinding them. (Ranged Cumulative Affliction (Impaired, Disabled, Unaware), Limited to Vision • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_spike_stones",
        "name": "Spike Stones",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Earth, Mineral",
        "extras": [
          {
            "id": "multiattack",
            "name": "Multiattack",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Rather than a mass of rock or soil, you hurl a shower of sharp, pointed stone spikes at your target. A version of this power without the Penetrating modifier may represent a shower or arc of small stones or pebbles. (Ranged Penetrating Multiattack Damage • 4 points per rank)"
      },
      {
        "id": "prof_earth_powers_stone_grip",
        "name": "Stone Grip",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Tendrils or giant hands of rock burst from the ground to grab and hold your target. (Ranged Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_stone_strike",
        "name": "Stone Strike",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Earth, Stone weapons",
        "extras": [],
        "flaws": [],
        "notes": "You form temporary weapons of stone in your hands, or even transform your own hands and arms into stone weapons. (Strength-based Damage, Variable (stone weapons) • 1 point + 1 point per rank)"
      },
      {
        "id": "prof_earth_powers_earth_healing",
        "name": "Earth Healing",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Earth",
        "extras": [],
        "flaws": [],
        "notes": "So long as you are in contact with the ground, you recover quickly from any damage or injury. (Regeneration, Source (Earth) • 1 point per 2 ranks)"
      },
      {
        "id": "prof_earth_powers_earth_immunity",
        "name": "Earth Immunity",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Earth Effects",
        "extras": [],
        "flaws": [],
        "notes": "Your powers make you immune to effects with the \"earth\" descriptor. (Immunity 10 (Earth Effects) • 10 points)"
      },
      {
        "id": "prof_earth_powers_rock_armor",
        "name": "Rock Armor",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Mineral",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You transform your flesh, making it as hard as rock (or turning into actual rock). Alternately, you might simply cover your body in rocky armor formed by your powers. (Impervious Protection • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_rooting",
        "name": "Rooting",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Resistance to being moved",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "While Touching the Ground"
          }
        ],
        "notes": "Your connection with the earth is strong enough to \"root\" you in place and prevent you from being moved if you do not wish to be. Your rank effectively adds to any resistance to being moved, typically Strength or Fortitude checks, but also resistance checks against trip attacks and other effects which would move you, like certain Afflictions. (Feature (Resistance to being moved), Limited to While Touching the Ground • 1 point per 2 ranks)"
      },
      {
        "id": "prof_earth_powers_immovable",
        "name": "Immovable",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Being Moved",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "While Touching the Ground"
          }
        ],
        "notes": "Some characters are practically immovable while in contact with the ground, having Immunity to the aforementioned effects. (Immunity 10 (Being Moved), Limited to While Touching the Ground • 5 points)"
      },
      {
        "id": "prof_earth_powers_earth_meld",
        "name": "Earth Meld",
        "rank": 3,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Permeate",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Earth"
          }
        ],
        "notes": "You can \"meld\" with the ground, passing through it to emerge at some other point some distance away. You move through the ground at your normal speed and have total concealment while doing so. (Movement 3 (Permeate), Limited to Earth; Immunity 2 (Suffocation), Limited to While Earth Melding • 4 points)"
      },
      {
        "id": "prof_earth_powers_earth_wave",
        "name": "Earth Wave",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "within 60 feet"
          }
        ],
        "notes": "You create and ride atop a \"wave\" of earth, like a moving hill, which carries you along. Generally, an earth wave is limited to a rank no greater than 6 (120 MPH, costing 3 power points). A broad enough earth wave may have Affects Others and Area (typically Line or Shapeable). An Earth Wave can potentially cause some collateral damage by tearing up the ground and disrupting structures (see Earth Complications). (Flight, Limited to within 60 feet (distance rank 1) of the ground, Platform • 1 point per 2 ranks)"
      },
      {
        "id": "prof_earth_powers_flying_rock",
        "name": "Flying Rock",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [],
        "notes": "You stand atop a chunk or slab of rock you levitate and move with your powers, providing you with a flying platform. If you use your flying rock for a slam attack (Deluxe Hero's Handbook, page 250) you lose the use of it and have to reactivate your power. (Flight, Platform • 1 point per rank)"
      },
      {
        "id": "prof_earth_powers_terraport",
        "name": "Terraport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Earth, Earth",
        "extras": [],
        "flaws": [],
        "notes": "You can merge with the substance of the Earth, emerging moments later virtually anywhere else on the planet. The only requirement is you must merge into and emerge from natural soil or stone, not earthen surfaces covered by water, pavement, or metal. (Teleport, Accurate, Medium (Earth) • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_tunneling",
        "name": "Tunneling",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [],
        "notes": "You can rapidly dig through earth and stone, simply pushing it aside with your power. You can choose to create a stable tunnel so others can follow or to allow the material to collapse and fill in behind you. If you can create tunnels at a distance, apply the Ranged modifier, but for the ability to create pits or chasms as an attack see the Chasm power (previously). (Burrowing • 1 point per rank)"
      },
      {
        "id": "prof_earth_powers_earth_creatures",
        "name": "Earth Creatures",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [],
        "notes": "You can summon or create semi-independent creatures formed out of earth and rock. The creatures you summon are not truly alive, merely animated masses of earth. They can look like virtually anything, from hulking humanoids to mythic creatures like trolls. You can apply the various modifiers for the Summon effect to get additional creatures or to make them more active or capable (removing the minion type from the template). (Summon Earth Creature 4 • 60-point minion (see the following template) • 8 points + 8 points per)"
      },
      {
        "id": "prof_earth_powers_earth_moving",
        "name": "Earth Moving",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Earth"
          }
        ],
        "notes": "One of the most basic earth powers is the ability to move large amounts of earthen material (soil, sand, and stone). You can move up to a mass rank equal to your effect rank, with a rank in the 10-11 range as effective as heavy construction equipment (Perception Ranged Move Object, Limited to Earth • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_stone_shape",
        "name": "Stone Shape",
        "rank": 10,
        "effectId": "transform",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [],
        "notes": "You can remold earth and stone as if it were soft clay, causing it to flow into whatever shape you wish. If your changes are permanent once you make them, apply the Continuous modifier. If you can shape earth at a distance, apply the Ranged modifier. (Transform (earth and stone From one shape to another) • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_earthsight",
        "name": "Earthsight",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Vision Penetrates Concealment",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Earthen Materials"
          }
        ],
        "notes": "You can see through earthen materials as if they were not there, allowing you to (amongst other things) easily find buried objects or see through stone walls. (Senses 4 (Vision Penetrates Concealment), Limited to Earthen Materials • 2 points)"
      },
      {
        "id": "prof_earth_powers_earthworks",
        "name": "Earthworks",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [],
        "notes": "You can form objects molded from earth and rock: walls, arches, bridges, columns, and so forth. Your creations have Toughness equal to your rank and must form out of the ground or some other form of earth (rocky outcropping, etc.). See the Create effect (Deluxe Hero's Handbook, page 154) for details of things you can do with your Earthworks. Your creations last as long as you maintain them, then crumble, unless you apply the Continuous modifier (allowing you to create semi-permanent earthen structures). Some versions of this power apply the Impervious modifier for creations of stone highly resistant to damage. (Create Earthworks • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_mountain_form",
        "name": "Mountain Form",
        "rank": 10,
        "effectId": "growth",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [],
        "notes": "You possess or can take on a mountainous stature. This may be combined with one of the following other forms (particularly Stone Form) for a giant-sized version. (Growth • 2 points per rank)"
      },
      {
        "id": "prof_earth_powers_mud_form",
        "name": "Mud Form",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Life Support",
        "extras": [],
        "flaws": [],
        "notes": "You turn into a mass of mobile, intelligent mud. In addition to the basic traits, this form might have Elongation and Morph as well. (Immunity 10 (Life Support), Insubstantial 1 • 15 points per rank)"
      },
      {
        "id": "prof_earth_powers_sand_form",
        "name": "Sand Form",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Life Support",
        "extras": [],
        "flaws": [],
        "notes": "You turn into a mass of mobile, intelligent sand, much like the Mud Form (previously) but with a different descriptor. (Immunity 10 (Life Support), Insubstantial 1 • 15 points per rank)"
      },
      {
        "id": "prof_earth_powers_stone_form",
        "name": "Stone Form",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Earth, Life Support",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You transform into solid stone, but still capable of movement, thought, and speech. (A stone form lacking all these qualities-essentially an immobile statue-drops the Enhanced Strength and applies a -2 Side-Effect.) (Enhanced Strength, Immunity 10 (Life Support), Impervious Protection • 10 points +4 points per rank)"
      },
      {
        "id": "prof_earth_powers_strength_of_antaeus",
        "name": "Strength of Antaeus",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Earth, Mineral",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Only While Touching the Ground, -2 points"
          }
        ],
        "notes": "Like the legendary Greek giant Antaeus, you have tremendous physical strength, but only while you are in contact with the Earth. Rather than the cost reduction of the Quirk, a hero might take a Power Loss complication instead (see Power Loss, following). (Enhanced Strength, Quirk (Only While Touching the Ground, -2 points) • 2 points for rank 2, +2)"
      },
      {
        "id": "prof_earth_powers_tremorsense",
        "name": "Tremorsense",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Earth, Ranged Touch",
        "extras": [],
        "flaws": [],
        "notes": "You're sensitive to vibrations transmitted through earth and stone. So long as you are touching the ground, you can \"feel\" the locations of moving creatures also touching the ground well enough to target them with attacks, but not to make out any more details. This power applies the Ranged modifier to the normal sense of touch, which is already accurate and radius. Applying Acute and Analytical allow you to sense details, while Extended lets you sense over greater distances. (Senses 1 (Ranged Touch) • 1 point.)"
      }
    ]
  },
  {
    "category": "Electrical Powers",
    "profiles": [
      {
        "id": "prof_electrical_powers_emp",
        "name": "EMP",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Electricity has plenty of offensive potential, from massive lightning bolts to its more subtle effects on the muscles and nervous system or electrical devices. ELECTROMAGNETIC PULSE (EMP) You emit a powerful pulse of electromagnetic energy, overloading and damaging electronics in the area around you. Unlike a regular use of an electrical power to counter, an EMP affects all targets in the area at once. Weakened electronics do not recover without being repaired and having damaged components replaced. Apply additional ranks of the Area modifier to extend the affected area. If you can create an EMP at a distance, add the Ranged modifier. (Weaken Electronics, Affects Only Objects, Broad, Burst Area, Simultaneous • 4 points per rank)"
      },
      {
        "id": "prof_electrical_powers_lightning_bolt",
        "name": "Lightning Bolt",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Electricity, Electrical",
        "extras": [],
        "flaws": [],
        "notes": "You hurl a surge of electrical power at a target, inflicting shock and burning damage. If you call down lightning bolts from the sky overhead, apply at least 2 ranks of the Indirect modifier. (Ranged Damage (electrical) • 2 points per rank If you create \"ball lightning\"-blasting everyone in an area-apply the Burst Area modifier to your power.)"
      },
      {
        "id": "prof_electrical_powers_ball_lightning",
        "name": "Ball Lightning",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Electricity, Electrical",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "If you create \"ball lightning\"-blasting everyone in an area-apply the Burst Area modifier to your power. (Burst Area Ranged Damage (electrical) • 3 points per rank)"
      },
      {
        "id": "prof_electrical_powers_chain_lightning",
        "name": "Chain Lightning",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Electricity, Electrical",
        "extras": [
          {
            "id": "multiattack",
            "name": "Multiattack",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Points per rank For \"chain lightning\"-where arcs of electricity leap from target to target before grounding out-apply the Multiattack modifier to your power. (Multiattack Ranged Damage (electrical) • 3 points per rank)"
      },
      {
        "id": "prof_electrical_powers_lightning_flash",
        "name": "Lightning Flash",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_perception",
            "name": "Area (Perception)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "One Sense"
          }
        ],
        "notes": "A searingly bright arc of electricity flashes between your hands, potentially blinding foes looking in your direction. (Perception Area Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Visually Impaired, Visually Disabled, Visually Unaware), Limited to One Sense • 3 points per rank)"
      },
      {
        "id": "prof_electrical_powers_seizure",
        "name": "Seizure",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "You scramble the electrical impulses of a target's brain and central nervous system, causing a momentary fugue state or seizure. (Perception Ranged Affliction (Resisted and Overcome by Will ; Entranced, Stunned, Incapacitated) • 3 points per rank)"
      },
      {
        "id": "prof_electrical_powers_shock_field",
        "name": "Shock Field",
        "rank": 10,
        "effectId": "affliction",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You electrically charge your body, delivering a powerful shock to anyone touching you. Since the effect's Reaction is being touched, you do not have to make an attack check except to deliberately touch or hit someone else; a successful attack check to touch or hit you constitutes a successful \"attack\" by the shock field. (Reaction Cumulative Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 5 points per rank)"
      },
      {
        "id": "prof_electrical_powers_dc_shock_field",
        "name": "DC Shock Field",
        "rank": 10,
        "effectId": "affliction",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Points per rank If your Shock Field uses direct current (DC) it also \"locks\" the target's muscles, preventing them from pulling away and continuing to inflict the effect until the target makes a successful resistance check, breaking contact. (Reaction Progressive Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 6 points per rank)"
      },
      {
        "id": "prof_electrical_powers_taser",
        "name": "Taser",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "You hit a target with a modulated blast of electricity that temporarily stuns the nervous system. If you have to touch the target, remove the Ranged modifier. (Ranged Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 2 points per rank)"
      },
      {
        "id": "prof_electrical_powers_electrical_absorption",
        "name": "Electrical Absorption",
        "rank": 10,
        "effectId": "healing",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Electricity, Can Counter Extra Effort Fatigue",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Self"
          }
        ],
        "notes": "You absorb incoming electrical energy, channelling it into recovery from damage or fatigue. The electrical energy still has its normal effect on you unless you also have a power like Electrical Immunity, which is common counterpart to this power. The Extraordinary Effort advantage is also a common trait in conjunction with this power. (Reaction Healing, Bonus Effect (Can Counter Extra Effort Fatigue), Limited to Self, Limited to Absorbed Electricity Rank, Source (Electricity) • 3 points per rank)"
      },
      {
        "id": "prof_electrical_powers_electrical_immunity",
        "name": "Electrical Immunity",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Electricity, Electrical Effects",
        "extras": [],
        "flaws": [],
        "notes": "You are largely unaffected by electricity, either perfectly insulated or able to harmlessly absorb or conduct it through you. In the first case, you are an effective insulator: anyone touching you is unaffected by the electricity, as you safely ground it out. In the second case, you are an efficient conductor: electricity does not harm you, but anyone touching you is affected by it, allowing you to, for example, grab a \"live\" source of electrical power like a cable and inflict electrical damage by touch like the Shock Field power (previously). Either option is just a descriptor with no change in cost. If you can choose between both from round to round, apply 1 rank of the Variable Descriptor modifier. (Immunity 10 (Electrical Effects) • 10 points If you are merely resistant to electricity, apply the Limited to Half Effect modifier to the Immunity.)"
      },
      {
        "id": "prof_electrical_powers_electrical_resistance",
        "name": "Electrical Resistance",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Electricity, Electrical Effects",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Half Effect"
          }
        ],
        "notes": "If you are merely resistant to electricity, apply the Limited to Half Effect modifier to the Immunity. (Immunity 10 (Electrical Effects), Limited to Half Effect • 5 points)"
      },
      {
        "id": "prof_electrical_powers_electrical_conductor",
        "name": "Electrical Conductor",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Electricity, Electrical Effects",
        "extras": [],
        "flaws": [],
        "notes": "If you are immune to electricity, but able to conduct it through your body and redirect it, apply the Reflect and Redirect modifiers. (Immunity 10 (Electrical Effects), Reflect, Redirect • 30 points)"
      },
      {
        "id": "prof_electrical_powers_electromagnetic_field",
        "name": "Electromagnetic Field",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "A field of electromagnetic repulsion surrounds you, deflecting incoming attacks. (Protection, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_electrical_powers_arc_riding",
        "name": "Arc Riding",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "You \"ride\" arcs of electricity through the air, leaping from one spot to another like a spark. (Leaping • 1 point per rank ELECTRO-FLIGHT An electromagnetic field allows you to fly through the air.)"
      },
      {
        "id": "prof_electrical_powers_electro_flight",
        "name": "Electro-Flight",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "An electromagnetic field allows you to fly through the air. (Flight • 2 points per rank Electro-Flight may be Limited in various ways. The most common are for the flight path to follow electrical lines, allowing you to fly along paths of current. Another is for the power to require masses of metal to \"lock on\" to, allowing for flight in urban environments, but limiting it outside of them, for example. Either of these reduces the power's cost by 1 point per rank.)"
      },
      {
        "id": "prof_electrical_powers_lightning_flight",
        "name": "Lightning Flight",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "must pass through intervening space in lightning form"
          }
        ],
        "notes": "You transform into a bolt of lightning, disappearing in a flash and reappearing almost instantly some distance away. The transformation lasts for only a moment, although characters with this power often have the Electrical Form power as well. (Teleport, Accurate, Easy, Extended, Limited (must pass through intervening space in lightning form) • 4 points per rank)"
      },
      {
        "id": "prof_electrical_powers_arclight",
        "name": "Arclight",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Electricity, Light",
        "extras": [],
        "flaws": [],
        "notes": "You can create a point of electric incandescence bright enough to shed light over a wide area. (Environment (Light) • 1 point per rank)"
      },
      {
        "id": "prof_electrical_powers_blackout",
        "name": "Blackout",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Electricity, Lightning",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You drain and shut down all electric power in an area around you, deactivating all electrical equipment. Unlike an EMP (previously) you do not damage or overload equipment, simply deprive it of power, so things return to normal when the effect ends. Apply additional ranks of the Area modifier to extend the affected area. If you can cause blackouts at a distance, remove the Close Range modifier. (Nullify Electronics, Broad, Burst Area, Concentration, Simultaneous, Close Range • 5 points per rank)"
      },
      {
        "id": "prof_electrical_powers_electrical_form",
        "name": "Electrical Form",
        "rank": 3,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Electricity, Electricity",
        "extras": [],
        "flaws": [],
        "notes": "You transform into a being of living electricity. Your electrical form is largely immune to physical harm but still affected by energy. Although it looks like crackling electricity, it is harmless to touch unless you also add the Shock Field power (previously). Your electrical form may grant other powers as well, such as Electrical Absorption, Electrical Immunity, Electro-Flight, and Lightning Flight. (Insubstantial 3 (electricity) • 15 points)"
      },
      {
        "id": "prof_electrical_powers_electrosense",
        "name": "Electrosense",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "You can sense electrical energy and its flow. Amongst other things, this power is useful for detecting electrical equipment operating in your vicinity and locating sources of power like buried cables, wiring inside walls, and the like. Picking up the electrical activity of a human body is difficult: a -15 modifier on the Perception check. Apply Extended to sense over greater distances and Accurate to use your Electrosense to target attacks in combat. (Detect Electricity, Ranged, Acute • 3 points per rank ELECTRO-SHAPING You shape electricity into different distinct shapes, from walls and rings to \"lightning cages.\" Since the electrical Damage effect is Selective, you can choose whether a target is affected by the electricity or not (left in an open space inside a ring or cage, for example). The shape lasts for as long as you concentrate. When you stop, it dissipates harmlessly.)"
      },
      {
        "id": "prof_electrical_powers_electro_shaping",
        "name": "Electro-Shaping",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Electricity, Lightning",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You shape electricity into different distinct shapes, from walls and rings to \"lightning cages.\" Since the electrical Damage effect is Selective, you can choose whether a target is affected by the electricity or not (left in an open space inside a ring or cage, for example). The shape lasts for as long as you concentrate. When you stop, it dissipates harmlessly. (Ranged Shapeable Area Electrical Damage, Concentration Duration, Selective • 5 points per rank, +1)"
      },
      {
        "id": "prof_electrical_powers_lightning_creatures",
        "name": "Lightning Creatures",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "You can summon or create semi-independent creatures formed out of \"living electricity\" that obey your commands. The creatures you summon are not truly alive, merely animated masses of energy. They can look like virtually anything, from humanoids to \"storm spirits\" or animated lightning bolts. You can apply the various modifiers for the Summon effect to get additional creatures or to make them more active or capable (removing the minion type from the template, for example). (Summon Lightning Creature 6 (90point minion (see the following template)) • 12 points)"
      },
      {
        "id": "prof_electrical_powers_static_electricity",
        "name": "Static Electricity",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "You can generate a powerful charge of static electricity, allowing you to attract, repel, and move objects around. \"Realistic\" versions of this power should be quite limited in terms of rank (perhaps even no more than the option under Features) but four-color characters might have electrostatic powers able to move massive amounts of weight. (Move Object • 2 points per rank)"
      },
      {
        "id": "prof_electrical_powers_car_battery",
        "name": "Car battery (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "12 volts (rank -2) • Household current: 120 volts (rank 2) (Feature • 1 point)"
      },
      {
        "id": "prof_electrical_powers_subway_third_rail",
        "name": "Subway third rail (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Electricity, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "700-1,200 volts (rank 4-5) • Power cable: 100,000 volts (rank 11) (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Element Powers",
    "profiles": [
      {
        "id": "prof_element_powers_corrosive",
        "name": "Corrosive",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Element, Chemical",
        "extras": [
          {
            "id": "secondary_effect",
            "name": "Secondary Effect",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can create a powerful corrosive that eats away at any material. The Weaken and Damage effects occur simultaneously, then both occur again on the following round, applying Damage against the Weakened Toughness. If you can project a corrosive at a distance, apply the Ranged modifier to both effects. (Weaken Toughness, Affects Objects, Secondary Effect, Linked to Damage, Secondary Effect • 5 points per rank)"
      },
      {
        "id": "prof_element_powers_encase",
        "name": "Encase",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You trap a target in transmuted bonds of material, such as turning the air around the target into stone or steel, often leaving only the target's face or head uncovered. (Ranged Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree • 2 points)"
      },
      {
        "id": "prof_element_powers_explosion",
        "name": "Explosion",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Element, Chemical",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Combining different volatile chemical elements or converting tiny amount of matter into energy via fission you produce a powerful explosion. If the blast originates with or near you, then you are unaffected. If you can produce the explosion at a distance, apply the Ranged modifier. (Burst Area Damage • 2 points per rank)"
      },
      {
        "id": "prof_element_powers_gas_cloud",
        "name": "Gas Cloud",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Element, Chemical",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create a cloud of choking or inert gas capable of suffocating those within it. You are unaffected by your own gas cloud, either leaving a \"hole\" in the center immediately around you, or able to otherwise negate its effects. Certain gases may inflict different conditions; feel free to vary those listed to suit particular descriptors, or to apply the Variable Conditions modifier (see the Illusion Powers section) for the ability to produce a wide range of different gas clouds. If you can create your gas cloud at a distance, apply the Ranged modifier. (Cloud Area Affliction (Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated), Cumulative • 3 points per rank)"
      },
      {
        "id": "prof_element_powers_immolation",
        "name": "Immolation",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Element, Heat",
        "extras": [],
        "flaws": [],
        "notes": "You can heat up or ignite your own body by creating a powerful oxidizing reaction, without any harm to yourself. (Damage (heat), Reaction (touching or being touched) • 4 points per rank)"
      },
      {
        "id": "prof_element_powers_petrify",
        "name": "Petrify",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Element, Third only",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You transform a living subject into a solid, non-living substance, typically stone, but it could just as easily be metals such as gold, iron, or lead. This version requires you to touch the target. If you can petrify at a distance, apply the Ranged modifier. If you can restore a petrified subject, add the Reversible modifier. (Affliction (Resisted and Overcome by Fortitude; Transformed), Limited Degree (third only), Progressive • 2 points per rank)"
      },
      {
        "id": "prof_element_powers_petrifying_gaze",
        "name": "Petrifying Gaze",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Element, Third only",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Points per rank For the classic \"petrifying gaze\" like that of Medusa, add the Perception Range and Sight-Dependent modifiers, allowing you to affect any target you can see that can also see you. Targets who deliberately block their vision are protected against your power. (Perception Ranged Affliction (Resisted and Overcome by Fortitude; Transformed), Limited Degree (third only), Progressive, Sight-Dependent • 3 points per rank)"
      },
      {
        "id": "prof_element_powers_tarpit",
        "name": "Tarpit",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Element, Chemical",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You transmute a portion of the ground or floor into a sticky muck, causing targets standing there to sink and become trapped, unable to move. If you are limited to affecting a small area under a single target, remove the Area modifier from the power. (Cloud Area Affliction (Resisted by Dodge, Overcome by Strength; Hindered and Vulnerable, Defenseless and Immobilized), Cumulative, Extra Condition, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_element_powers_chemical_immunity",
        "name": "Chemical Immunity",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical effects",
        "extras": [],
        "flaws": [],
        "notes": "You are chemically \"inert\" and immune to harmful chemical reactions, including the effects of acids, bases, chemical burns, and so forth. You are not immune to the sideeffects of chemical reactions, such as the force of an explosion or intense heat or cold, without taking additional ranks in Immunity. (Immunity 2 (chemical effects) • 2 points)"
      },
      {
        "id": "prof_element_powers_destroy_projectiles",
        "name": "Destroy Projectiles",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Element, Projectiles",
        "extras": [],
        "flaws": [],
        "notes": "You can transmute incoming projectiles into harmless gases or otherwise destroy them, preventing them from having any effect on you unless they are in some way indestructible or immune to your power. You must be capable of action in order to Destroy Projectiles (that is, the effect is sustained rather than permanent). If you can Destroy Projectiles over a wider area, apply the Affects Others and Area Modifiers; if you can choose who in the area receives your protection, apply the Selective modifier as well. (Immunity 10 (projectiles), Sustained • 10 points)"
      },
      {
        "id": "prof_element_powers_diamond_hard",
        "name": "Diamond Hard",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "noticeable",
            "name": "Noticeable",
            "cost": 1,
            "isFlat": true
          }
        ],
        "notes": "Your body is (or can become) as hard as diamond, perhaps turning into actual diamond in the process! If your Diamond Hard state is temporary, apply the Activation or Sustained modifiers. A Diamond Hard form may be accompanied by the Unliving power (following) or a degree of Enhanced Strength. (Impervious Protection, Noticeable • 1 point for rank 1, + 2 points per additional rank)"
      },
      {
        "id": "prof_element_powers_molecular_phasing",
        "name": "Molecular Phasing",
        "rank": 4,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "By altering the molecular valences of yourself or other material, you become able to \"phase,\" passing harmlessly through that material as if it were not even there. If you alter the valences of other materials, you might have the Affects Others modifier, allowing you to bring others with you or even create \"phase doors\" for them to pass through without you. (Insubstantial 4 • 20 points)"
      },
      {
        "id": "prof_element_powers_unliving",
        "name": "Unliving",
        "rank": 30,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Fortitude Effects",
        "extras": [],
        "flaws": [],
        "notes": "You have a body of something other than living flesh-andblood, making you immune to many mortal concerns. Some with this power also have no Stamina, meaning they do not recover or heal on their own. (Immunity 30 (Fortitude Effects) • 30 points)"
      },
      {
        "id": "prof_element_powers_chemical_rocket",
        "name": "Chemical Rocket",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "You can create and sustain a chemical reaction that provides you with rocket thrust, allowing you to fly, possibly at very high speeds. (Flight • 2 points per rank)"
      },
      {
        "id": "prof_element_powers_quantum_breakdown",
        "name": "Quantum Breakdown",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "This power disintegrates your physical form, allowing your consciousness to shift locations and recreate your physical form there, effectively disappearing from one place and reappearing in another. (Teleport • 2 points per rank The standard version of Quantum Breakdown results in nothing more than a harmless show of light and possibly sound as you vanish or reappear. The following version results in a considerable release of energy when you do so, creating a powerful explosion. Essentially, you \"detonate\" at one location, disappearing in the blast, then reform some distance away.)"
      },
      {
        "id": "prof_element_powers_explosive_quantum_breakdown",
        "name": "Explosive Quantum Breakdown",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Element, Explosion, upon teleporting",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Standard version of Quantum Breakdown results in nothing more than a harmless show of light and possibly sound as you vanish or reappear. The following version results in a considerable release of energy when you do so, creating a powerful explosion. Essentially, you \"detonate\" at one location, disappearing in the blast, then reform some distance away. (Teleport, Burst Area Reaction Damage (explosion, upon teleporting) • 2 points)"
      },
      {
        "id": "prof_element_powers_transmutative_tunneling",
        "name": "Transmutative Tunneling",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "You transform rock and soil into gas, shearing a passage through the ground. The transmuted material might revert to its original state, closing the tunnel behind you, or remain transformed, leaving a tunnel for others to follow, as you choose. (Burrowing • 1 point per rank)"
      },
      {
        "id": "prof_element_powers_chemical_analysis",
        "name": "Chemical Analysis",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "You can analyze chemical compounds, learning their structure and composition. The GM may require an appropriate Expertise skill check-such as Chemistry or Forensics-to fully understand what you have analyzed, but even just the basic information can be quite useful: recognizing a particular chemical residue as acid left by a known super-criminal, for example. The default setup of the power assumes you're examining the subject at close range; if you can analyze from a greater distance, apply the Ranged effect of Senses as well. (Senses 3 (Detect Chemical Compounds, Acute, Analytical) • 3 points)"
      },
      {
        "id": "prof_element_powers_neutralize_reaction",
        "name": "Neutralize Reaction",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "You can slow certain chemical reactions to a standstill, nullifying effects with appropriate chemical descriptors. This includes putting out fires by stopping the oxidizing reaction and neutralizing acids and explosives. It can also prevent powers based on chemical reactions from working. Apply Nullify modifiers to expand or refine the power, such as Concentration if you can suppress chemical reactions, Precise if you can choose which reactions to stop, and Area if you can affect reactions over a wider area than a single target. (Ranged Nullify Chemical Effects, Broad, Simultaneous • 4 points per rank)"
      },
      {
        "id": "prof_element_powers_creation",
        "name": "Creation (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "Transform can literally create things \"out of thin air\" by turning air (or other bulk matter) into (Feature • 1 point)"
      },
      {
        "id": "prof_element_powers_destruction",
        "name": "Destruction (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "Reversing the creation process, Transform can also \"destroy\" objects by turning them into (Feature • 1 point)"
      },
      {
        "id": "prof_element_powers_side_effects",
        "name": "Side Effects (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "There is a tremendous range of \"side effects\" to Transform, particularly the broader levels, (Feature • 1 point)"
      },
      {
        "id": "prof_element_powers_shape_and_substance",
        "name": "Shape and Substance (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "Transmutation affects both an object's substance (what materials it is made (Feature • 1 point)"
      },
      {
        "id": "prof_element_powers_range",
        "name": "Range (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "Transform is a close range effect by default. If you can transmute materials at a distance, apply (Feature • 1 point)"
      },
      {
        "id": "prof_element_powers_area",
        "name": "Area (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Element, Chemical",
        "extras": [],
        "flaws": [],
        "notes": "Transform affects a set amount of mass based on rank. An Area Transform can affect multiple targets in (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Fire Powers",
    "profiles": [
      {
        "id": "prof_fire_powers_transmutation",
        "name": "Transmutation",
        "rank": 10,
        "effectId": "transform",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Fire, Any material into anything else",
        "extras": [],
        "flaws": [],
        "notes": "Meaning when you stop maintaining the effect, the transformed materials revert to their original shape and substance. Apply the Continuous modifier if your transmutations are permanent unless reversed by you or some similar effect. (Transform (any material into anything else) • 5 points per rank)"
      },
      {
        "id": "prof_fire_powers_fireball",
        "name": "Fireball",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You hurl a fist-sized ball or a streamer of fire that explodes on contact with a target, blossoming out into a broad fireball engulfing multiple targets. (Ranged Burst Area Fire Damage • 30-foot radius, Dodge resistance check (DC 10 + rank) for half effect • 3 points per rank (+ 1 point per rank per +1 distance rank to area).)"
      },
      {
        "id": "prof_fire_powers_fireflash",
        "name": "Fireflash",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_perception",
            "name": "Area (Perception)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "One Sense"
          }
        ],
        "notes": "Searingly bright fire flashes between your hands, like an arcwelder, potentially blinding foes looking in your direction. (Perception Area Cumulative Affliction (Visually Impaired, Visually Disabled, Visually Unaware), Limited to One Sense • Resisted by Dodge (DC 10 + rank), Overcome by Fortitude (DC 10 + rank) • 3 points per rank)"
      },
      {
        "id": "prof_fire_powers_firey_breath",
        "name": "Firey Breath",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "area_cone",
            "name": "Area (Cone 60ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You breathe (or simply project from your hands or elsewhere) a cone-shaped gout of fire, like a dragon's breath. (Cone Area Fire Damage • 60-foot length and width, Dodge resistance check (DC 10 + rank) for half effect • 2 points per rank + 1 point per rank per +1 distance rank to)"
      },
      {
        "id": "prof_fire_powers_firey_cloud",
        "name": "Firey Cloud",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You engulf targets a cloud of flames, which burns for a few moments before going out in a flash. (Ranged Cloud Area Fire Damage • 15-foot radius, Dodge resistance check (DC 10 + rank) for half effect • 3 points per rank (+ 1 point per rank per +1 distance)"
      },
      {
        "id": "prof_fire_powers_fire_blast",
        "name": "Fire Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "You strike a target with a blast, stream, or small ball of fire, causing damage. (Ranged Fire Damage • 2 points per rank)"
      },
      {
        "id": "prof_fire_powers_flame_aura",
        "name": "Flame Aura",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Fire, When Touched",
        "extras": [],
        "flaws": [],
        "notes": "You surround your body in an aura of flames, damaging anything touching you. Since the damage is a reaction to being touched, no attack check is required. (Reaction Fire Damage (When Touched) • 4 points per rank)"
      },
      {
        "id": "prof_fire_powers_flamethrower",
        "name": "Flamethrower",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "area_line",
            "name": "Area (Line 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You emit a stream of fire that burns everything along its path. (Line Area Fire Damage • 5 feet wide, 30 feet long, Dodge resistance check (DC 10 + rank) for half effect • 2 points per rank (+ 1 point per rank per +1 distance rank)"
      },
      {
        "id": "prof_fire_powers_heatstroke",
        "name": "Heatstroke",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Fire, Fatigued, Exhausted, Incapacitated",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Rather than attacking a target direct with gouts of fire, you elevate the target's body temperature, causing eventual heatstroke. (Perception Ranged Cumulative Affliction (Fatigued, Exhausted, Incapacitated) • Resisted by Fortitude (DC 10 + rank), Overcome by Fortitude (DC + 10 rank) • 4 points per rank)"
      },
      {
        "id": "prof_fire_powers_immolate",
        "name": "Immolate",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Perception",
        "duration": "Concentration",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "You wreathe a target in flames, which continue burning as long as you concentrate on maintaining them. (Perception Ranged Fire Damage, Concentration Duration • 4 points per rank)"
      },
      {
        "id": "prof_fire_powers_melt",
        "name": "Melt",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "You generate heat intense enough to soften and melt materials from ice to plastic, stone, or even metal. See the Material Toughness table on page 244 of the Deluxe Hero's Handbook for guidelines on the ranks needed to completely melt various materials. (Ranged Weaken Toughness, Affects Only Objects • Toughness ranks lost due to the effect are not recovered and must be repaired • 2 points per rank)"
      },
      {
        "id": "prof_fire_powers_nova_burst",
        "name": "Nova Burst",
        "rank": 1,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "tiring",
            "name": "Tiring",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You emit a massive fiery explosion in all directions around you. The explosion covers a wide area but tiring you from the effort. (Burst Area Fire Damage, Area 3, Feature 1 (Extraordinary Effort for +2 effect rank), Tiring • 120-foot radius, Dodge resistance check (DC 10 + rank) for half effect • 1 point + 3 points per rank (+ 1 point per rank per +1 distance)"
      },
      {
        "id": "prof_fire_powers_smoke_cloud",
        "name": "Smoke Cloud",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Thick smoke fills the air, making it difficult for anyone in the area to see. (Ranged Cloud Area Visual Concealment Attack • 15-foot radius • 8 points (+4 points per +1 distance rank to)"
      },
      {
        "id": "prof_fire_powers_suffocation",
        "name": "Suffocation",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Fire, Dazed, Stunned, Incapacitated",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You burn up all of the oxygen around a target, causing them to suffocate. If you burn up all of the oxygen in an area or create a cloud of choking smoke, apply the Area modifier to the power, typically Burst or Cloud. (Ranged Progressive Affliction (Dazed, Stunned, Incapacitated) • Resisted by Fortitude (DC 10 + rank), overcome by Fortitude • 4 points per rank)"
      },
      {
        "id": "prof_fire_powers_fire_form",
        "name": "Fire Form",
        "rank": 3,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Fire, Energy Form",
        "extras": [],
        "flaws": [],
        "notes": "You transform into a being of living flame. Your fire form is largely immune to physical harm but still affected by energy. Although it looks like ordinary fire, it is harmless to touch unless you also add the flame aura power (previously). Your fire form may grant other powers as well, such as immunity to cold or heat, or rocket flight (following). (Insubstantial 3 (Energy Form) • 15 points)"
      },
      {
        "id": "prof_fire_powers_fire_shield",
        "name": "Fire Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Flammable Weapons"
          }
        ],
        "notes": "Your body emits heat and flames powerful enough to deflect or burn up some attacks before they can reach you. If you do not also have a flame aura (previously) assume unarmed attackers tend to flinch or \"pull\" their attacks because of the terrific heat, but are not themselves damaged by it. If you do have flame aura, then unarmed attackers actually flinch because they are being damaged! Your fire shield also protects against things like cold or other fire attacks but not energy like electricity or pure kinetic force (without some flammable weapon inflicting it). (Protection, Impervious, Limited to Flammable Weapons, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_fire_powers_heat_absorbtion",
        "name": "Heat Absorbtion",
        "rank": 10,
        "effectId": "immunity",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You absorb the energy of heat and fire attacks to fuel your own powers. You can enhance a chosen trait up to the number of points you have invested in Enhanced Trait, or the attack's rank, whichever is less, with a maximum of your Enhanced Trait points. The enhancement occurs automatically as a reaction, then fades by 1 power point per turn until it is gone. (Enhanced Trait (Fades, Reaction: When Absorbing Heat), Immunity 10 (Heat Effects) • 10 points +)"
      },
      {
        "id": "prof_fire_powers_immunity_to_cold",
        "name": "Immunity to Cold",
        "rank": 1,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Fire, Environmental Cold",
        "extras": [],
        "flaws": [],
        "notes": "Your internal heat renders you immune to cold. (Immunity 1 (Environmental Cold), Immunity 5 (Cold Damage), or Immunity 10 (Cold Effects) • 1, 5, or 10 points)"
      },
      {
        "id": "prof_fire_powers_immunity_to_heat",
        "name": "Immunity to Heat",
        "rank": 1,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Fire, Environmental Heat",
        "extras": [],
        "flaws": [],
        "notes": "Your control over fire protects you from external heat or flames. (Immunity 1 (Environmental Heat), Immunity 5 (Heat Damage), or Immunity 10 (Heat Effects) • 1, 5, or 10 points)"
      },
      {
        "id": "prof_fire_powers_fireport",
        "name": "Fireport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "You have the power to \"leap\" from one flame to another without having to cross the space between them. You vanish into one fire and emerge from another some distance away. (Teleport, Extended, Medium: Flames • 2 points per rank)"
      },
      {
        "id": "prof_fire_powers_rocket_flight",
        "name": "Rocket Flight",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "By projecting a stream of fire out behind you, you can fly as if propelled by a rocket blast. (Flight • 2 points per rank)"
      },
      {
        "id": "prof_fire_powers_tunneling",
        "name": "Tunneling",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "You melt and burn your way through obstacles, boring a tunnel even through solid rock. Such tunnels are usually fused glassy-smooth and relatively permanent, but you still have the option of moderating your flames to create an unstable tunnel that will collapse behind you. (Burrowing • 1 point per rank.)"
      },
      {
        "id": "prof_fire_powers_fire_creatures",
        "name": "Fire Creatures",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "You can summon or create semi-independent creatures formed out of \"living fire\" that obey your commands. The creatures you summon are not truly alive, merely animated mass of fiery energy. They can look like virtually anything, from humanoids (often with a demonic cast) to a fiery phoenix or dragon. You can apply the various modifiers for the Summon effect to get additional fire creatures or to make them more active or capable (removing the minion type from the template). (Summon Fire Creature 8 • 120-point minion (see following template) • 16 points)"
      },
      {
        "id": "prof_fire_powers_firelight",
        "name": "Firelight",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Fire, Light",
        "extras": [],
        "flaws": [],
        "notes": "You can create a point of incandescence bright enough to shed light over a wide area. (Environment (Light) • 1 point per rank)"
      },
      {
        "id": "prof_fire_powers_fire_shaping",
        "name": "Fire Shaping",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Fire, Heat",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You shape masses of fire into different distinct forms, from walls and rings to flaming cages. Since the Damage effect is Selective, you can choose whether a target is affected by the shape's fire or not (left in an open space inside a ring or cage of fire, for example). The shape lasts for as long as you concentrate. When you stop, it dissipates. If you are limited to shaping existing flames rather than generating them as you shape them, apply the Limited modifier. (Ranged Shapeable Area Fire Damage, Concentration Duration, Selective • 30 cubic feet (volume rank 5), Dodge resistance check (DC 10 + rank) for half effect • 5 points per rank (+1 point per rank per +1)"
      },
      {
        "id": "prof_fire_powers_infravision",
        "name": "Infravision",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Fire, Infravision",
        "extras": [],
        "flaws": [],
        "notes": "You can literally see patterns of heat and gradations in temperature around you. (Senses 1 (Infravision) • 1 point.)"
      },
      {
        "id": "prof_fire_powers_duration",
        "name": "Duration (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "Transform is sustained by default, meaning when you stop maintaining the effect, the (Feature • 1 point)"
      },
      {
        "id": "prof_fire_powers_setting_fires",
        "name": "Setting Fires (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "First, fire has the potential to spread, igniting flammable materials. Stray fire blasts, or a char- (Feature • 1 point)"
      },
      {
        "id": "prof_fire_powers_shedding_light",
        "name": "Shedding Light (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "Open flames shed some amount of light; a fire-wielder can light-up a small area, not (Feature • 1 point)"
      },
      {
        "id": "prof_fire_powers_smothering",
        "name": "Smothering (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "Combustion requires particular conditions, notably the presence of oxygen or other fuel. (Feature • 1 point)"
      },
      {
        "id": "prof_fire_powers_explosions",
        "name": "Explosions (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Fire, Heat",
        "extras": [],
        "flaws": [],
        "notes": "Just as flames can set smaller fires, so too can they potentially \"cook off\" things like ammunition (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Gravity Powers",
    "profiles": [
      {
        "id": "prof_gravity_powers_pyrokinesis",
        "name": "Pyrokinesis",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Existing Fire"
          }
        ],
        "notes": "You can mentally control and direct flames, moving them or containing them as you wish. You can affect fire with a Damage rank up to your effect rank in an area equal to your effect's maximum area. Flames move at a speed rank of your effect rank minus their damage rank, with a minimum of 0 (30 feet per round). Flames with no available surface to burn on the end of the round they are moved go out, so you can move the flames off of an objects into the air and have them dissipate. (Perception Range Shapeable Area Fire Damage, Limited to Existing Fire • 30 cubic feet (volume rank 5) • 3 points per rank (+1 point per rank for +1 volume rank).)"
      },
      {
        "id": "prof_gravity_powers_warm",
        "name": "Warm",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Gravity, Heat",
        "extras": [],
        "flaws": [],
        "notes": "You warm the air around you without flames, creating a comforting heat that drives away cold or makes an already temperate or warm area intensely hot. (Environment (Heat) • 1 point per rank, 2 points per rank for extreme heat)"
      },
      {
        "id": "prof_gravity_powers_gravitic_blast",
        "name": "Gravitic Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "You unleash a blast of gravitic force that smashes into your target. (Ranged Damage (force) • 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_gravitic_burst",
        "name": "Gravitic Burst",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Gravity, Force",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You release a burst of gravitic force in all directions around you. If you can produce a burst of gravitic force at a distance, rather than radiating out from you, apply the Ranged modifier to the power. (Burst Area Damage (force) • 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_gravitic_wave",
        "name": "Gravitic Wave",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Gravity, Force",
        "extras": [
          {
            "id": "area_cone",
            "name": "Area (Cone 60ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You send forth a widening wave of gravitic force that slams targets in its path before dissipating. (Cone Area Damage (force) • 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_gravity_field",
        "name": "Gravity Field",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Gravity, Gravity",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Pulling Downwards"
          }
        ],
        "notes": "This power intensifies the pull of gravity around you while leaving you unaffected. Subjects in the field are effectively grabbed (Deluxe Hero's Handbook, page 248). If the subject's Strength resistance check against the field's rank fails by one degree, the subject is prone and restrained (immobile and vulnerable). If it fails by two or more degrees, the subject is bound (defenseless, immobile, and impaired). Like a grab, you can make effect checks in succeeding rounds to increase the degree of an existing hold, and further degrees of success are cumulative. (Burst Area Move Object (gravity), Limited to Pulling Downwards • 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_crushing_gravity_field",
        "name": "Crushing Gravity Field",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Gravity, Gravity",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Pulling Downwards"
          }
        ],
        "notes": "By default, Gravity Field causes no harm, simply restraining or binding targets. For a Crushing Gravity Field, add the Damaging modifier so the increased gravity also has the effect of crushing targets beneath their increased weight, the same as inflicting Strength Damage on a grabbed target. (Burst Area Move Object (gravity), Limited to Pulling Downwards, Damaging • 3 points per rank)"
      },
      {
        "id": "prof_gravity_powers_null_g_field",
        "name": "Null-G Field",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Lifting Upwards"
          }
        ],
        "notes": "Reverse of the Gravity Field power (previously), in a Null-G Field, if the effect rank equals or exceeds a subject's weight rank, the subject floats, weightless, inside the field. This leaves subjects without other movement capabilities effectively immobilized. (Burst Area Move Object, Limited to Lifting Upwards • 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_singularity",
        "name": "Singularity",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Pulling Towards the Center of the Area"
          }
        ],
        "notes": "A dangerous and deadly attack, this power creates a micro-singularity-essentially a tiny black hole-which draws nearby matter into it to be torn apart and annihilated. Any target caught in the Singularity's area of effect is drawn towards it and suffers Damage upon contact until destroyed, whereupon the target disappears into the singularity. It takes a standard action each round to maintain the singularity, effectively reusing the power's Damage effect each round. (Burst Area 2 Damaging Move Object, Limited to Pulling Towards the Center of the Area • 4 points per rank)"
      },
      {
        "id": "prof_gravity_powers_upalanche",
        "name": "Upalanche",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Gravity, Bludgeoning",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Shifting the direction of gravity, you cause loose debris and objects to \"fall\" sideways or upwards to smash into your targets. The rain of debris causes damage on two consecutive rounds. Add more ranks of Area to create even larger cascades of debris. (Ranged Cloud Area Damage (bludgeoning) • 3 points per rank)"
      },
      {
        "id": "prof_gravity_powers_gravitic_containment",
        "name": "Gravitic Containment",
        "rank": 10,
        "effectId": "nullify",
        "action": "Reaction",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "Reflexively creating a point of intense gravity at the heart of an explosion, you prevent the explosive force and material from achieving escape velocity, containing the blast in an area no larger than its source and negating the explosion. This power has the Reaction modifier, allowing it to immediately counter other effects, but it also makes a useful countering effect power stunt using extra effort and a hero point to instantly counter (Deluxe Hero's Handbook, page 21) with any gravity power. (Nullify Explosions, Reaction • 4 points per rank)"
      },
      {
        "id": "prof_gravity_powers_gravitic_deflection",
        "name": "Gravitic Deflection",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "Gravity waves deflect incoming attacks, increasing the weight of projectiles so they simply drop out of the air and bending energy beams and similar attacks around their targets. By default, this power protects a single target but you can apply the Area modifier to allow you to exert Gravitic Deflection over a larger area and protect multiple subjects at once. (Deflect • 1 point per rank)"
      },
      {
        "id": "prof_gravity_powers_gravitic_immunity",
        "name": "Gravitic Immunity",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Gravity, Gravity Effects",
        "extras": [],
        "flaws": [],
        "notes": "Your control over gravity is such that you are immune to its effects, able to compensate for them instantly. (Immunity 2 (Gravity Effects) • 2 points)"
      },
      {
        "id": "prof_gravity_powers_gravitic_shield",
        "name": "Gravitic Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A hardened skin-tight shield of gravitic force protects you from incoming attacks. A Gravitic Shield may be Subtle, invisible to all but Gravitic Sense and similar effects. (Impervious Protection, Sustained • 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_anti_gravity",
        "name": "Anti-Gravity",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "Fine manipulation of gravity allows you to soar and swoop through the air without any other means of propulsion. Anti-Gravity flight can be extremely stealthy, qualifying for at least the first rank of the Subtle modifier. If you can grant others the ability to fly as well, apply the Affects Others modifier. If you merely carry others along with you using your own gravity powers, use the Gravikinesis power instead (see Utility Powers). (Flight, Subtle • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_directional_pull",
        "name": "Directional Pull",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Gravity, Wall-Crawling",
        "extras": [],
        "flaws": [],
        "notes": "You can alter the direction gravity pulls for you, effectively changing which direction \"down\" lies. This allows you to do things like walk on walls or ceilings as if they were the floor or ground. (Movement (Wall-Crawling) • 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_free_fall",
        "name": "Free Fall",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Gravity, Safe Fall",
        "extras": [],
        "flaws": [],
        "notes": "Power over gravity, you can slow a fall to land as lightly and gently as a feather. (Movement 1 (Safe Fall) • 2 points)"
      },
      {
        "id": "prof_gravity_powers_free_fall_adaptation",
        "name": "Free Fall Adaptation",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "Your system is adapted to operating in near-zero gravity or free fall conditions. You suffer no circumstance penalties in free fall environments, including those of your own creation. (Movement 1 (Environmental Adaptation-Zero Gravity) • 2 points)"
      },
      {
        "id": "prof_gravity_powers_gravity_warp",
        "name": "Gravity Warp",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "Using gravity to bend space, you open up a momentary warp between two distant points, allowing you to travel between them instantly. Your Gravity Warp may be a personal power, lasting just long enough to encompass you, or it could have the Portal modifier (Deluxe Hero's Handbook, page 183), allowing others to pass through it as well. Other Teleport modifiers may also apply to the power. For an interplanetary or interstellar version of Gravity Warp, add the Space Travel option of the Movement effect (Deluxe Hero's Handbook, page 172). Some Gravity Warps may be able to produce Time and Dimension Travel as well. (Teleport • 2 points per rank HIGH-GRAVITY ADAPTATION Your powers allow you to ignore the effects of higher than Earth-normal gravity. You operate normally under higher gravity conditions, as if you were still under 1G.)"
      },
      {
        "id": "prof_gravity_powers_high_gravity_adaptation",
        "name": "High-Gravity Adaptation",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "Your powers allow you to ignore the effects of higher than Earth-normal gravity. You operate normally under higher gravity conditions, as if you were still under 1G. (Movement 1 (Environmental Adaptation-High-Gravity) • 2 points)"
      },
      {
        "id": "prof_gravity_powers_low_g_leap",
        "name": "Low-G Leap",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "Rather than freeing you entirely from gravity's grip (see Anti-Gravity), you lower its effects enough for you to leap great distances with your normal Strength. If you can grant this benefit to others, apply the Affects Others modifier as well. (Leaping • 1 point per rank)"
      },
      {
        "id": "prof_gravity_powers_artificial_gravity",
        "name": "Artificial Gravity",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "You can create an area of Earth-normal gravity in defiance of the prevailing gravitational pull, either reducing the effects of a high-gravity environment, or creating a normal gravity environment on a low-gravity planetoid, space station, or space vessel, negating one level of impeded movement. Note that artificial gravity is an assumed capability of space vehicles, although the GM is free to make it a feature for settings where zero gravity on space vehicles is the default (see Vehicles, pages 221-225 of the Deluxe Hero's Handbook). (Environment (negate impeded movement due to gravity) • 1 point per rank)"
      },
      {
        "id": "prof_gravity_powers_gravikinesis",
        "name": "Gravikinesis",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [],
        "notes": "Using focused and directed gravity, you can move objects at a distance, causing them to \"fall\" in any direction you want at a speed rank of (effect rank - mass rank) or hover weightlessly in midair. You can move objects with mass rank equal to or less than your power rank. See the Kinetic Powers section for more details on the Move Object effect and similar powers using it. (Move Object • 2 points per rank)"
      },
      {
        "id": "prof_gravity_powers_gravitic_communication",
        "name": "Gravitic Communication",
        "rank": 5,
        "effectId": "communication",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "You can modulate gravity waves or particles to carry communication signals across interplanetary distances within a solar system. You can communicate over radio frequency bands at a level where only specialized graviton detectors (or recipients with Gravitic Sense, following) can pick up your communication. For gravity controllers who do not have this power, it makes a potentially useful power stunt for last-ditch communications. (Communication 5, Area, Subtle 1 • 26 points)"
      },
      {
        "id": "prof_gravity_powers_gravitic_sense",
        "name": "Gravitic Sense",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Gravity, Detect Gravity, Ranged",
        "extras": [],
        "flaws": [],
        "notes": "You can sense gravitational waves and flux, detecting the use of gravity powers and similar effects (like artificial gravity sources) with gravity descriptors. The basic power just detects such effects at a distance. It may also be Accurate for 2 more ranks, allowing it to target other effects, and Extended to detect over greater distances. (Senses (Detect Gravity, Ranged) • 2 points per rank LOW-G LIFTING By touching an object and reducing gravity's effect on it, you make it lighter and easier to move, effectively increasing your strength when it comes to lifting heavier objects. If you lighten an object for anyone to lift, apply the Affects Others modifier, allowing you to enhance the lifting capacity of others as well.)"
      },
      {
        "id": "prof_gravity_powers_low_g_lifting",
        "name": "Low-G Lifting",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Gravity, Force",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Lifting"
          }
        ],
        "notes": "By touching an object and reducing gravity's effect on it, you make it lighter and easier to move, effectively increasing your strength when it comes to lifting heavier objects. If you lighten an object for anyone to lift, apply the Affects Others modifier, allowing you to enhance the lifting capacity of others as well. (Enhanced Strength, Limited to Lifting • 1 point per rank)"
      }
    ]
  },
  {
    "category": "Illusion Powers",
    "profiles": [
      {
        "id": "prof_illusion_powers_illusory_affliction",
        "name": "Illusory Affliction",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Illusion, Sensory",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "reversible",
            "name": "Reversible",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "variable_conditions",
            "name": "Variable Conditions",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You place a convincing hallucination of an affliction into the target's mind, causing the target to react (even at a subconscious level) as if the affliction were real. The potential effects are wide-reaching, from presenting the illusion the target is bound in chains or a straightjacket to illusory illness, attacks by crawling insects, or wracking illusory pain, perhaps due to equally false injuries or attacks. The target's Will resistance checks to overcome the Affliction's conditions represent shaking off the illusion's effects. (Perception Ranged Affliction (Resisted and Overcome by Will), Variable Conditions, Reversible, Subtle • 2 points + 5 points per rank)"
      },
      {
        "id": "prof_illusion_powers_illusory_damage",
        "name": "Illusory Damage",
        "rank": 2,
        "effectId": "blast",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Illusion, Will",
        "extras": [],
        "flaws": [],
        "notes": "You create an illusion of harm so profound the target reacts as if actually struck. The attack affects the target's mind rather than body. Successfully shaking off the illusion with a Will check immediately removes any \"damage\" conditions caused by it. (Perception Ranged Damage, Alternate Resistance (Will), Resistible by Will (removes damage), Variable 2 (illusionary effects) • 2 points + 3 points per rank)"
      },
      {
        "id": "prof_illusion_powers_sensory_deprivation",
        "name": "Sensory Deprivation",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Illusion, Sensory",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your power overwhelms the target's senses, driving them towards a state of sensory deprivation. Before becoming completely overwhelmed, the target suffers penalties due to the inability to properly perceive things. (Perception Ranged Cumulative Affliction (Resisted and Overcome by Will; Impaired, Disabled, Incapacitated) • 4 points per rank)"
      },
      {
        "id": "prof_illusion_powers_vertigo",
        "name": "Vertigo",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Illusion, Sensory",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create an illusion upsetting the victim's sense of balance, causing the world to seem topsy-turvy and inducing vertigo. (Perception Ranged Cumulative Affliction (Resisted and Overcome by Will; Impaired, Prone, Incapacitated) • 4 points per rank)"
      },
      {
        "id": "prof_illusion_powers_hidden_cover",
        "name": "Hidden Cover",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Illusion, Evasion 2",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "Combat, you make every effort to place yourself behind cover (Deluxe Hero's Handbook, page 244) which you then conceal with an illusion. The effect makes it appear that attacks bounce off you or glance aside before hitting you, while in reality the attacker has hit the hidden cover and not you. Successfully overcoming the power's Subtle modifier with a DC 20 Perception check allows the attacker to become aware of the boundaries of the cover and work around it normally. (Enhanced Advantage (Evasion 2), Protection, Fades, Impervious, Subtle, Sustained • 3 points +1 point per rank)"
      },
      {
        "id": "prof_illusion_powers_illusory_concealment",
        "name": "Illusory Concealment",
        "rank": 10,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, All senses",
        "extras": [],
        "flaws": [],
        "notes": "You create an illusion that you are simply part of the background, blending into your surroundings, or effectively removing you from the perceptions of those around you. A hallucinatory version of this power is Resistible by Will (and possibly Selective). (Concealment 10 (all senses), Blending or Resistible by Will • 10 points)"
      },
      {
        "id": "prof_illusion_powers_illusory_double",
        "name": "Illusory Double",
        "rank": 2,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Illusion, Visual and Aural",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "a Double of Yourself"
          }
        ],
        "notes": "Range in order to control it. If you're successfully able to maintain the ruse that the double is you, frustrated opponents will waste their efforts attacking it rather than the real you. Note that any character with a general Illusion effect with at least 2 ranks affecting sight and hearing can approximate this power. (Illusion 2 (Visual and Aural), Limited to a Double of Yourself • 4 points)"
      },
      {
        "id": "prof_illusion_powers_illusory_projection",
        "name": "Illusory Projection",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Illusion, Visual, Aural, and Mental",
        "extras": [],
        "flaws": [
          {
            "id": "noticeable",
            "name": "Noticeable",
            "cost": 1,
            "isFlat": true
          }
        ],
        "notes": "You create an image of yourself similar to the Illusory Double power (previously), except you place your consciousness within the image, allowing you to perceive through it as if you were actually present, and to channel other sensory effects through its senses. Your effect rank determines the distance you can project your illusory \"self\". The normal Insight check to detect Remote Sensing becomes a check to sense that the projection is not real instead. (Remote Sensing (Visual, Aural, and Mental), Side-Effect (physical body is defenseless and immobile, -2), Noticeable • 1 point for rank 1 + 2 points per)"
      },
      {
        "id": "prof_illusion_powers_illusion",
        "name": "Illusion",
        "rank": 10,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "Harming themselves. Creating an illusion of a bridge or balcony can cause someone who believes in the illusion to step off a ledge and into open air and fall to the ground. Likewise, cloaking a wall with an illusory image of what's behind it may cause a fast-moving opponent to crash into the barrier. (Illusion • 1-5 points per rank)"
      },
      {
        "id": "prof_illusion_powers_illusory_disguise",
        "name": "Illusory Disguise",
        "rank": 2,
        "effectId": "morph",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "You can use illusions to change your appearance. This does not change any of your traits, but provides a +20 circumstance bonus to Deception checks to convince others you are what you appear to be. Your rank in Morph determines how extensive the change in appearance can be, from a narrow group of forms at rank 2 up to any appearance at rank 4. (Morph, Resistible by Will • 4 points per rank)"
      },
      {
        "id": "prof_illusion_powers_sensory",
        "name": "Sensory (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "The Illusion effect is a sensory effect. Illusory powers not containing the Illusion effect or other (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_impression",
        "name": "Impression (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "A sensory impression is an outside force that acts on the senses, causing them to perceive the (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_hallucination",
        "name": "Hallucination (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "A sensory hallucination, unlike an impression, exists solely in the subject's mind, which (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_illusory_guise",
        "name": "Illusory Guise (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "You can project an illusion that you are wearing a costume or uniform, allowing you to (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_prestidigitation",
        "name": "Prestidigitation (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "You can create minor illusions as \"magic tricks\" primarily suitable for entertainment, but (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_projected_display",
        "name": "Projected Display (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "You can create small, simple, and fairly obvious visual images suitable for displaying (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_size",
        "name": "Size (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "An illusion's rank determines its size, from human sized around rank 2-3, car or truck sized at (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_appearance",
        "name": "Appearance (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "An illusion large enough to cover something can change its appearance, so an illusionist (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_concealment",
        "name": "Concealment (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "Similarly, certain illusions can offer concealment (Deluxe Hero's Handbook, page 244). (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_visibility",
        "name": "Visibility (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "At the GM's discretion, a visual illusion can have the effect of decreasing visibility in the illusion's (Feature • 1 point)"
      },
      {
        "id": "prof_illusion_powers_tricks",
        "name": "Tricks (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Illusion, Sensory",
        "extras": [],
        "flaws": [],
        "notes": "An illusion can also trick characters into harming themselves. Creating an illusion of a bridge (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Kinetic Powers",
    "profiles": [
      {
        "id": "prof_kinetic_powers_sense_memory",
        "name": "Sense Memory",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Kinetic, Perfect Sense Recall",
        "extras": [],
        "flaws": [],
        "notes": "Mance, re-created just as you heard it. At the GM's discretion, Sense Memory can provide you with a circumstance modifier, increasing the Difficulty Class of noticing flaws in your illusions. (Feature 1 (Perfect Sense Recall) • 1 point.)"
      },
      {
        "id": "prof_kinetic_powers_true_perception",
        "name": "True Perception",
        "rank": 5,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Kinetic, All senses Counter Illusions",
        "extras": [],
        "flaws": [],
        "notes": "Those who work with illusions often learn to perceive past them, right to the true nature of things. This power is roughly equivalent to Immunity to Illusions and can be treated in much the same way. (Senses 5 (all senses Counter Illusions) • 10 points)"
      },
      {
        "id": "prof_kinetic_powers_vocal_mimicry",
        "name": "Vocal Mimicry",
        "rank": 2,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Kinetic, Aural",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Voices"
          }
        ],
        "notes": "You can accurately reproduce any voice. This ability is most effective when coupled with a change in appearance or some other way of concealing your appearance, such as speaking over a telephone or speaker system where the listener cannot see you. (Illusion 2 (Aural), Limited to Voices • 1 point.)"
      },
      {
        "id": "prof_kinetic_powers_force_cage",
        "name": "Force Cage",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Entrapping"
          }
        ],
        "notes": "You form a bubble, cage, or similar construct of force around a target, restricting their movements. If your attack check against the target's Dodge succeeds, the target makes a Dodge resistance check (DC 10 + rank). Failure means the target is trapped inside the object and must break through it in order to escape. The Force Cage has Toughness equal to its rank. The Force Constructs power (see Utility Powers) can duplicate this power, as it is the same effect without the Limited flaw. (Create Force Cage, Limited to Entrapping • 1 point per rank)"
      },
      {
        "id": "prof_kinetic_powers_friction_blindness",
        "name": "Friction Blindness",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Kinetic, Third Only",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "This power, you cause a target's eyelids to stick together, effectively blinding the target. The target does not get a check to overcome the effect, but it ends instantly when you no longer maintain it. (Perception Ranged Affliction (Resisted by Dodge; Unaware), Sustained, Instant Recovery, Limited Degree (Third Only), Limited to Targets with Eyelids, Limited to Vision • 1 point per rank)"
      },
      {
        "id": "prof_kinetic_powers_friction_muzzle",
        "name": "Friction Muzzle",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Kinetic, Third Only",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You can create a similar effect on speech by sticking the target's mouth closed. (Perception Ranged Affliction (Resisted by Dodge; Transformed), Sustained, Instant Recovery, Limited Degree (Third Only), Limited to Keeping Target's Mouth Closed (-2) • 1 point per rank)"
      },
      {
        "id": "prof_kinetic_powers_friction_heat",
        "name": "Friction Heat",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Kinetic, Heat",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Reduction in Speed Rank"
          }
        ],
        "notes": "You transform a target's kinetic energy into heat, slowing or stopping the target and inflicting heat damage. (Ranged Weaken Movement Effects, Broad; Linked to Ranged Damage (Heat), Damage Limited to Reduction in Speed Rank • 4 points per rank)"
      },
      {
        "id": "prof_kinetic_powers_internal_attack",
        "name": "Internal Attack",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Kinetic, Fortitude",
        "extras": [],
        "flaws": [],
        "notes": "You manipulate kinetic energy within a target, causing a disruption of the target's internal systems and bypassing external armor or defenses. (Perception Ranged Damage, Alternate Resistance (Fortitude), Affects Objects • 5 points per rank)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_blast",
        "name": "Kinetic Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Kinetic, Kinetic",
        "extras": [],
        "flaws": [],
        "notes": "You project a focused blast of kinetic energy that hits with considerable force. (Ranged Damage (kinetic) • 2 points per rank)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_bullet",
        "name": "Kinetic Bullet",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Kinetic, Projectile",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "requires objects as ammo, -1 point"
          }
        ],
        "notes": "You can fling a small object with enough speed that it hits like a bullet fired from a gun. If you can \"fire\" multiple small objects at once, apply the Multiattack modifier to the power for +1 point per rank. (Ranged Damage (projectile), Quirk (requires objects as ammo, -1 point) • 1 point for rank 1 + 2 points)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_burst",
        "name": "Kinetic Burst",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Kinetic, Kinetic",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create a \"bubble\" of force that bursts outwards like an explosion or creates a blast of debris or small objects in the same area. (Ranged Burst Area Damage (kinetic) • 3 points per rank)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_weapon",
        "name": "Kinetic Weapon",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [],
        "notes": "You form a close combat weapon (a sword, a club, etc.) out of kinetic force, able to strike targets like a physical weapon, perhaps with greater power than an ordinary weapon. (Damage • 1 point per rank)"
      },
      {
        "id": "prof_kinetic_powers_suffocating_bubble",
        "name": "Suffocating Bubble",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Kinetic, Force",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You surround a target's head with a force field that keeps out air, causing them to suffocate. (Ranged Progressive Affliction (Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated) • 4 points per rank)"
      },
      {
        "id": "prof_kinetic_powers_frictionless",
        "name": "Frictionless",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [],
        "notes": "You can render your surface virtually frictionless, such that it is impossible to get a grip on you: attempts to grab, ensnare, or otherwise restrain you automatically fail unless the effect does not rely on touching you (such as a trap or construct completely enclosing you). (Immunity 10 (Grabbing, Ensnaring, and Restraining effects), Sustained • 10 points)"
      },
      {
        "id": "prof_kinetic_powers_immovable",
        "name": "Immovable",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Kinetic, Being Moved",
        "extras": [],
        "flaws": [],
        "notes": "By redirecting kinetic energy and affecting friction, you render yourself immune to any attempt to move you against your will. Since this power as well as Frictionless (previously) are sustained, they may well exist as Alternate Effects, representing different applications of kinetic control. (Immunity 10 (Being Moved), Sustained • 10 points)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_absorption",
        "name": "Kinetic Absorption",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Kinetic, When Absorbing Kinetic Energy",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "When Absorbing Energy"
          },
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You soak up incoming kinetic energy, transforming it into energy you can redirect and use for your own purposes. When hit with a kinetic attack, you gain a trait, from Strength or Agility to particular advantages or powers, such as Kinetic Blast. You can even take multiple traits as Alternate Effects, allowing you to choose from a set of traits each time you absorb kinetic energy. Channeling energy to the same trait \"resets\" the Fades flaw, bringing the trait back up to its full normal value. This power is typically linked with something that blunts the actual effects of the kinetic energy absorbed, such as Kinetic Deflection, Kinetic Immunity, or Kinetic Shield. (Enhanced Trait, Fades, Reaction (When Absorbing Kinetic Energy), Limited to When Absorbing Energy • 1 point per rank)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_deflection",
        "name": "Kinetic Deflection",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Kinetic, Force",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Kinetic Attacks"
          }
        ],
        "notes": "You rob projectiles of their kinetic energy, or redirect it, causing them to miss their target(s) or even just drop harmlessly out of the air, deprived of all their momentum. (Deflect, Limited to Kinetic Attacks • 1 point per rank)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_immunity",
        "name": "Kinetic Immunity",
        "rank": 40,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Kinetic, Kinetic Attacks",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You are essentially invulnerable to impacts and other attacks reliant on kinetic energy, absorbing or dissipating them harmlessly. This power includes the benefits of the Immovable power (previously), since kinetic attacks cannot move you any more than they can harm you. (Immunity 40 (Kinetic Attacks) • 1 point per rank)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_shield",
        "name": "Kinetic Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Kinetic, Force",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You surround your body with a tight field of energy that protects you from incoming attacks. The standard Kinetic Shield is an effective barrier against all attacks targeting Toughness, but some Kinetic Fields are Limited to Kinetic Damage, ineffective against other types of energy, such as cold, heat, or electricity. (Impervious Protection, Sustained • 2 points per rank)"
      },
      {
        "id": "prof_kinetic_powers_friction_cling",
        "name": "Friction Cling",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Kinetic, Wall-Crawling 1 or 2",
        "extras": [],
        "flaws": [],
        "notes": "Controlling the friction between your body and a surface allows you to stick to walls and ceilings. (Movement (Wall-Crawling 1 or 2) • 2 or 4 points)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_transport",
        "name": "Kinetic Transport",
        "rank": 8,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Due West"
          }
        ],
        "notes": "You render yourself \"at rest\" relative to the rotation of the Earth beneath you, giving you a sudden and brief westward velocity of 1,000 MPH (at the equator, less towards the poles). The effect is that you suddenly vanish and are about a mile away before anyone realizes you are gone. (Teleport 8, Limited to Due West, Not Through Barriers • 4 points)"
      },
      {
        "id": "prof_kinetic_powers_kinetic_rebound",
        "name": "Kinetic Rebound",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Kinetic, Safe Fall",
        "extras": [],
        "flaws": [],
        "notes": "You absorb or dissipate the kinetic energy from falls (often linked with Kinetic Absorption) allowing you to fall any distance without harm. (Movement 1 (Safe Fall) • 2 points)"
      },
      {
        "id": "prof_kinetic_powers_friction_control",
        "name": "Friction Control",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Kinetic, Force",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "reversible",
            "name": "Reversible",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You create an area of extremely low or high friction, causing targets in the area to slip and find it difficult to stand, or become stuck and find it difficult to move. (Burst Area Ranged Affliction (Resisted and Overcome by Dodge; Hindered, Prone), Progressive, Limited Degree; AE: Burst Area Ranged Affliction (Resisted by Dodge, Overcome by Strength; Hindered, Immobile), Progressive, Reversible, Limited Degree • 2 points + 4)"
      },
      {
        "id": "prof_kinetic_powers_force_constructs",
        "name": "Force Constructs",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [],
        "notes": "You can project force fields to form different solid objects or constructs. See the Create effect for details (Deluxe Hero's Handbook, page 102). (Create Force Constructs • 2 points per rank)"
      },
      {
        "id": "prof_kinetic_powers_momentum_boost",
        "name": "Momentum Boost",
        "rank": 10,
        "effectId": "speed",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Kinetic, Movement effects",
        "extras": [
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can add to a subject's momentum, accelerating them to even greater speeds. The power is normally Sustained. If you provide a single burst of speed, apply the Fades modifier as well. (Enhanced Speed, Affects Others, Ranged, Variable Descriptor (movement effects) • 2 points +3 points)"
      },
      {
        "id": "prof_kinetic_powers_momentum_drain",
        "name": "Momentum Drain",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [],
        "notes": "You can drain or dampen a subject's momentum, causing them to slow towards an at-rest state with no movement speed (if they are weakened to less than speed rank 0). (Ranged Weaken Movement Effects, Affects Objects, Broad • 4 points per rank)"
      },
      {
        "id": "prof_kinetic_powers_tactile_telekinesis",
        "name": "Tactile Telekinesis",
        "rank": 1,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Kinetic, No Damage",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Lifting and Moving"
          }
        ],
        "notes": "You can exert force on objects simply by touching them, but the energy imparted comes from your power rather than your muscles, which do not have to do any of the work. This means you can exert the effective Strength of your power without having to move, so long as you are in close contact with the subject. (Enhanced Strength, Limited to Lifting and Moving (No Damage), Feature 1 (Able to Exert Strength Without Moving) • 1 point + 1 point per rank)"
      },
      {
        "id": "prof_kinetic_powers_damaging",
        "name": "Damaging (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [],
        "notes": "The Damaging extra \"restores\" the Damage aspect of Move Object's Strength. In par- (Feature • 1 point)"
      },
      {
        "id": "prof_kinetic_powers_noticeability",
        "name": "Noticeability (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [],
        "notes": "Note that Move Object is noticeable by default, involving some manifestation from (Feature • 1 point)"
      },
      {
        "id": "prof_kinetic_powers_range_modifiers",
        "name": "Range Modifiers (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [],
        "notes": "Since Move Object allows a character to manipulate objects remotely, the GM may (Feature • 1 point)"
      },
      {
        "id": "prof_kinetic_powers_area",
        "name": "Area (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Kinetic, Force",
        "extras": [],
        "flaws": [],
        "notes": "Area Move Object effects work on individual objects in the area equally-a Burst Area Move (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Life Powers",
    "profiles": [
      {
        "id": "prof_life_powers_telekinesis",
        "name": "Telekinesis",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [],
        "notes": "You can move objects at a distance without directly touching them. See The Move Object Effect at the start of this section for details. (Move Object • 2 points per rank A common Telekinesis variant is Psychokinesis, an often psionic or psychic power that only requires you be able to accurately see or sense your subject to move it. Psychokinesis is often Subtle as well, detectable only by mental or other exotic senses.)"
      },
      {
        "id": "prof_life_powers_psychokinesis",
        "name": "Psychokinesis",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [],
        "notes": "A common Telekinesis variant is Psychokinesis, an often psionic or psychic power that only requires you be able to accurately see or sense your subject to move it. Psychokinesis is often Subtle as well, detectable only by mental or other exotic senses. (Perception Ranged Move Object • 3 points per rank)"
      },
      {
        "id": "prof_life_powers_telekinetic_touch",
        "name": "Telekinetic Touch",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Life, Ranged Tactile",
        "extras": [],
        "flaws": [],
        "notes": "Your telekinetic powers have a sense of touch, allowing you to \"feel\" things at a distance with a kind of kinetic echolocation. Telekinetic characters with this power may have the Feedback flaw (Deluxe Hero's Handbook, page 200) on powers like Force Constructs or Telekinesis; they \"feel\" impacts and energy through their connection, enough to cause mental strain and psychosomatic reactions. (Senses 1 (Ranged Tactile) • 1 point.)"
      },
      {
        "id": "prof_life_powers_bio_disruption",
        "name": "Bio-Disruption",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A touch, you can cause a significant disruption of the biological systems of a target's body. The effect is temporary, but can be quite distracting, and often painful. If the Gamemaster allows, it can even be lethal, if pushed beyond mere incapacitation (see Lethal Damage in the Gamemaster's Guide, page 193). With the broad range of potential conditions this can cause, Bio-Disruption may have the Variable Conditions modifier (see Illusion Powers). If you can disrupt targets at a distance, add the Ranged or Perception Ranged modifier. With both Variable Conditions and Increased Range, Bio-Disruption can incorporate the other Affliction effects in this section. (Cumulative Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 2 points per rank)"
      },
      {
        "id": "prof_life_powers_bio_override",
        "name": "Bio-Override",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You exert control over your target's gross motor functions, manipulating them like a puppet. The victim's mind remains untouched, but you are in control of their body and actions. (Perception Ranged Cumulative Affliction (Resisted and Overcome by Fortitude; Entranced, Compelled, Controlled) • 4 points per rank)"
      },
      {
        "id": "prof_life_powers_bio_sculpting",
        "name": "Bio-Sculpting",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Like a sculptor working soft clay, you can reshape and mold a target's flesh, changing appearance or potentially adding or subtracting features. You can cripple any of the target's physical abilities: rendering limbs useless or covering sensory organs with a layer of skin, for example. Like Bio-Disruption, Bio-Sculpting is potentially lethal, if used with that intent. (Cumulative Affliction (Resisted and Overcome by Fortitude; Impaired, Disabled, Transformed) • 2 points per rank)"
      },
      {
        "id": "prof_life_powers_cellular_disruption",
        "name": "Cellular Disruption",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Fortitude",
        "extras": [],
        "flaws": [],
        "notes": "You inflict cellular damage on a living target by touch. (Damage, Alternate Resistance (Fortitude) • 1 point per rank)"
      },
      {
        "id": "prof_life_powers_pathogen",
        "name": "Pathogen",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can inflict a pathogen-a disease organism-on a target by touch. Like the Bio-Disruption power, this one may potentially inflict a wide range of conditions, in which case it may have the Variable Conditions modifier. The Insidious modifier is particularly dangerous, as the victim may not become aware of the pathogen's effects until it is too late to treat them. (Affliction (Resisted and Overcome by Fortitude; Impaired, Disabled, Incapacitated), Progressive • 3 points)"
      },
      {
        "id": "prof_life_powers_seizure",
        "name": "Seizure",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [],
        "notes": "You cause your target to suffer a seizure, stunning them for a time until they are able to shake off the effect. The basic power is often enhanced by extras like Perception Ranged, Cumulative, or Progressive, and may be Subtle or Insidious as well. (Affliction (Resisted and Overcome by Will; Dazed, Stunned, Incapacitated) • 1 point per rank)"
      },
      {
        "id": "prof_life_powers_bio_adaptation",
        "name": "Bio-Adaptation",
        "rank": 30,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Life, Fortitude effects",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "effects you have experienced at least once"
          }
        ],
        "notes": "Your body adapts to deal with harmful circumstances, a kind of hyper-Mithratism, where once you have suffered a harmful biological effect, you instantly develop a resistance or immunity. So you might suffer the effect of a flu strain, for example, after which you become completely immune to it. (Immunity 30 (Fortitude effects), Limited to effects you have experienced at least once • 15 points)"
      },
      {
        "id": "prof_life_powers_enhanced_immune_system",
        "name": "Enhanced Immune System",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Life, Diseases and parasitic infections",
        "extras": [],
        "flaws": [],
        "notes": "Your immune system is incredibly efficient, rendering you immune to ordinary pathogens and parasitic organisms, unless the GM specifically chooses to declare one a complication. (Immunity 2 (diseases and parasitic infections) • 2 points)"
      },
      {
        "id": "prof_life_powers_insensate",
        "name": "Insensate",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Life, Pain effects",
        "extras": [],
        "flaws": [],
        "notes": "You have voluntary control over the pain receptors and nerve endings in your body, allowing you to be aware of pain but otherwise unaffected by it. Effects with a pain descriptor do not work on you. Some with this power might have the additional complication of not being aware of pain at all, meaning they might suffer harm without the normal reflex to pull away or otherwise protect themselves. (Immunity 5 (pain effects) • 2 points)"
      },
      {
        "id": "prof_life_powers_lifeport",
        "name": "Lifeport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Not into areas where there is little or no life, -1 point"
          }
        ],
        "notes": "You can move from place to place through the field of \"life force\" surrounding concentrations of living beings. Your power cannot take you into areas that are truly lifeless or with nothing more than scattered life-forms. (Teleport, Quirk (Not into areas where there is little or no life, -1 point) • 1 point for rank 1, +2 points per rank)"
      },
      {
        "id": "prof_life_powers_adrenal_control",
        "name": "Adrenal Control",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You have conscious control over the body's production of adrenaline, capable of enhancing strength and athletic ability temporarily. Realistically, this power should be limited to just a few ranks, but there are instances of people under stress demonstrating incredible \"hysterical strength\" that could justify higher ranks. Some versions of Adrenal Control add the Side Effect flaw with an Affliction effect after the enhancement wears off (Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated). (Enhanced Strength, Fades • 1 point per rank)"
      },
      {
        "id": "prof_life_powers_biokinesis",
        "name": "Biokinesis",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Biological Material"
          }
        ],
        "notes": "You can move biological material (living or dead) with nothing more than your mind, a limited form of telekinesis. So you can lift a person (or other biological creature) or move things like wood, natural fiber cloth, or similar materials, but not plastics, metals, minerals, and so forth. The GM decides any cases where the nature of a material is in doubt. (Move Object, Limited to Biological Material • 1 point per rank)"
      },
      {
        "id": "prof_life_powers_cure",
        "name": "Cure",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Disease and Poison"
          }
        ],
        "notes": "You can treat conditions like disease and poisons, restoring the body to heal. (Healing, Limited to Disease and Poison • 1 point per rank)"
      },
      {
        "id": "prof_life_powers_energize",
        "name": "Energize",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Energizing"
          }
        ],
        "notes": "A touch, you banish fatigue and fill your subject with vital energy. (Healing, Energizing, Limited to Energizing • 2 points per rank)"
      },
      {
        "id": "prof_life_powers_life_sense",
        "name": "Life Sense",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Life, Detect Life, Ranged, Acute",
        "extras": [],
        "flaws": [],
        "notes": "You can sense the presence of living beings nearby, and have a general sense of their species and overall wellbeing (healthy, diseased, etc.). An Accurate version of Life Sense can target beings you sense with attacks, including other life powers. (Senses 3 (Detect Life, Ranged, Acute) • 3 points)"
      },
      {
        "id": "prof_life_powers_pharmacopeia",
        "name": "Pharmacopeia",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Alternate Effect: Bio-Disruption",
        "extras": [],
        "flaws": [],
        "notes": "You can produce the effects of a wide range of drug compounds in living targets by touching them. As an offensive effect, this power is the same as Bio-Disruption (under Offensive Powers) but it is usually coupled with an Alternate Effect capable of treating illnesses and imbalances and promoting healing. (Healing (Alternate Effect: Bio-Disruption) • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_life_powers_psychic_diagnosis",
        "name": "Psychic Diagnosis",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Life, Detect Health, Analytical",
        "extras": [],
        "flaws": [],
        "notes": "By examining a subject, you can determine the state of their physical health: the presence of injuries, organ damage, pathogens, toxins, and so forth. An Expertise check (Biology, Medicine, or related field) may be required to interpret what you perceive, but you are otherwise as detailed and accurate as a battery of conventional medical tests, and considerably faster. A use of Psychic Diagnosis may provide a circumstance bonus on checks to then treat the patient's conditions. (Senses 3 (Detect Health, Analytical) • 3 points SKIN-SHIFTING Your skin and outer layer of muscle is malleable and you can reshape them at will. This allows you to take on different appearances, limited only by your skeletal framework, meaning you cannot significantly change your size. If you have greater power to alter your body, see the Morphing Powers section.)"
      },
      {
        "id": "prof_life_powers_skin_shifting",
        "name": "Skin-Shifting",
        "rank": 2,
        "effectId": "morph",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "by size and shape"
          }
        ],
        "notes": "Your skin and outer layer of muscle is malleable and you can reshape them at will. This allows you to take on different appearances, limited only by your skeletal framework, meaning you cannot significantly change your size. If you have greater power to alter your body, see the Morphing Powers section. (Morph 2 (outward appearance limited by size and shape) • 10 points)"
      },
      {
        "id": "prof_life_powers_suspended_animation",
        "name": "Suspended Animation",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "subject is incapacitated"
          }
        ],
        "notes": "You can place yourself into a state where your life functions are nearly suspended, allowing you to go for a long period of time without food, water, or air, and halting the progression of any biological processes in your body (including the progress of disease or toxins, for example). If you can place other (willing) characters into suspended animation, apply the Affects Others modifier. (Immunity 5 (aging, starvation and dehydration, suffocation, ongoing biological effects), Limited (subject is incapacitated) • 3 points)"
      },
      {
        "id": "prof_life_powers_total_healing",
        "name": "Total Healing",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Your considerable healing powers can treat any harm, up to and including restoring life to the dead! Apply Affects Objects (increasing cost by +1 per rank) if you can also \"heal\" damage to non-living things. (Healing, Persistent, Restorative, Resurrection • 1 point + 6 points per rank)"
      },
      {
        "id": "prof_life_powers_total_self_healing",
        "name": "Total Self Healing",
        "rank": 10,
        "effectId": "healing",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Life, When hurt",
        "extras": [],
        "flaws": [],
        "notes": "Applying the Reaction and Self Only modifiers so that your Healing effect activates up to once per round, whenever you are harmed, to treat the conditions. Someone with this power can be hurt, but recovery is almost instant. The GM may wish to require an additional Limited flaw, defining some type of attack or condition the Total Healing will not treat. (Healing, Reaction (when hurt), Energizing, Persistent, Restorative, Resurrection, Self-Only • 1 point + 7)"
      },
      {
        "id": "prof_life_powers_life_force",
        "name": "Life Force (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Life, Biological",
        "extras": [],
        "flaws": [],
        "notes": "Life powers may reference the concept of \"life force\" for their origin or medium, using a wide (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Light Powers",
    "profiles": [
      {
        "id": "prof_light_powers_blinding_beam",
        "name": "Blinding Beam",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Light, Radiant",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "You project a beam of blinding light into a target's eyes. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Visually Impaired, Visually Disabled, Visually Unaware), Limited to Vision • 2 points per rank)"
      },
      {
        "id": "prof_light_powers_blinding_burst",
        "name": "Blinding Burst",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Light, Radiant",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "You similarly create a Blinding Burst of light, radiating in all directions, much like a powerful flash-bulb or strobe. The Blinding Burst originates from you; if it is something you can cast out to a distance, where it bursts (like a flashbomb), apply the Ranged modifier as well. (Burst Area Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Visually Impaired, Visually Disabled, Visually Unaware), Limited to Vision • 2 points per rank)"
      },
      {
        "id": "prof_light_powers_blinding_aura",
        "name": "Blinding Aura",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_perception",
            "name": "Area (Perception)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "A Blinding Aura, you continuously emit light bright enough to blind anyone looking directly at you. If you can maintain the Blinding Aura as a free action while doing other things, apply the Reaction modifier (increasing cost to 5 points per rank). (Perception Area Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Visually Impaired, Visually Disabled, Visually Unaware), Limited to Vision, Sustained Duration • 4 points per rank)"
      },
      {
        "id": "prof_light_powers_blinding_field",
        "name": "Blinding Field",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Light, All visual senses",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A Blinding Field fills an entire area with light bright enough to overwhelm all other visual input, rendering anyone in or looking at the area unable to see anything but pure, white light. A lesser effect can be achieved with an Environment effect which imposes a visibility modifier due to a bright (but not completely blinding) light. (Burst Area Visual Concealment 4 Attack (all visual senses) • 12 points + 4 points per +1 area distance rank)"
      },
      {
        "id": "prof_light_powers_dazzling_burst",
        "name": "Dazzling Burst",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Light, Radiant",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "An explosion of light and color radiates out from you, overwhelming the visual centers of nearby targets. For a Dazzling Beam attack, replace the Burst Area modifier with the Ranged modifier, allowing you to hit a single target at a distance. (Burst Area Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Dazed, Stunned, Incapacitated), Sight-Dependent • 2 points per rank)"
      },
      {
        "id": "prof_light_powers_hypnotic_strobe",
        "name": "Hypnotic Strobe",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "A pattern of flashing light and color, you place targets into a trance where they are open to suggestion and obedient to your commands. For a strobe affecting multiple targets, replace Perception Ranged and SightDependent with Perception Area. Add Selective if you can choose which targets you affect and Insidious if targets are unaware they are being influenced. (Perception Ranged Affliction (Resisted and Overcome by Will; Entranced, Compelled), Limited Degree, Sight-Dependent • 1 point per rank)"
      },
      {
        "id": "prof_light_powers_laser_beam",
        "name": "Laser Beam",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Light, Laser",
        "extras": [],
        "flaws": [],
        "notes": "You project a coherent beam of light able to deliver a blast of focused energy. Due to a laser's ability to travel great distances in a straight line, Extended Range is an appropriate extra. Penetrating is also suitable for laser attacks. (Ranged Damage (Laser) • 2 points per rank Rather than a sustained beam, you might create a Pulse Laser, firing off a series of high-intensity pulses you can focus or scatter, as you prefer.)"
      },
      {
        "id": "prof_light_powers_pulse_laser",
        "name": "Pulse Laser",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Light, Laser",
        "extras": [
          {
            "id": "multiattack",
            "name": "Multiattack",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Rather than a sustained beam, you might create a Pulse Laser, firing off a series of high-intensity pulses you can focus or scatter, as you prefer. (Ranged Multiattack Damage (Laser) • 3 points per rank A Laser Burst fires off beams in all directions around you, allowing you to hit multiple targets in the area, but hard on your allies. If you can control who gets hit within the burst, apply the Selective modifier as well. Added ranks of Area apply much like Extended Range for Laser Beam.)"
      },
      {
        "id": "prof_light_powers_laser_burst",
        "name": "Laser Burst",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Light, Laser",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A Laser Burst fires off beams in all directions around you, allowing you to hit multiple targets in the area, but hard on your allies. If you can control who gets hit within the burst, apply the Selective modifier as well. Added ranks of Area apply much like Extended Range for Laser Beam. (Burst Area Damage (Laser) • 2 points per rank Shifting the frequency of your beam out of the visible spectrum to create an X-ray or gamma-ray laser (\"graser\") projects an Invisible Laser Beam targets won't even see coming.)"
      },
      {
        "id": "prof_light_powers_invisible_laser_beam",
        "name": "Invisible Laser Beam",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Light, Laser",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "Shifting the frequency of your beam out of the visible spectrum to create an X-ray or gamma-ray laser (\"graser\") projects an Invisible Laser Beam targets won't even see coming. (Ranged Damage (Laser), Subtle • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_light_powers_targeting_laser",
        "name": "Targeting Laser",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "Point + 2 points per rank You may also be able to project a low-level Targeting Laser to \"paint\" your target and provide a sighting path for your beam, like a modern laser-sight. (Add Accurate to any Laser power • 1 point per rank (+2 attack bonus per rank).)"
      },
      {
        "id": "prof_light_powers_laser_weapon",
        "name": "Laser Weapon",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Light, Laser",
        "extras": [],
        "flaws": [],
        "notes": "You focus light into the shape of a melee weapon (like a sword, although it can just as easily be a hammer or other type of weapon). Some laser weapons may have properties like their actual counterparts; see the Melee Weapons table on page 217 of the Deluxe Hero's Handbook for some ideas. Energy-damage laser weapons may have the Penetrating modifier, while laser weapons made of \"solid light\" may be Strength-based Damage instead. (Damage (Laser) • 1 point per rank)"
      },
      {
        "id": "prof_light_powers_immunity_to_light",
        "name": "Immunity to Light",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Light, Light Effects",
        "extras": [],
        "flaws": [],
        "notes": "Your power over light makes you immune to its harmful effects. (Immunity 10 (Light Effects) • 10 points)"
      },
      {
        "id": "prof_light_powers_light_absorption",
        "name": "Light Absorption",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "the lesser of effect rank or absorbed energy rank"
          },
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You can absorb energy from light and channel it to enhance your light-based powers. You gain ranks in the Enhanced Trait equal to the absorbed effect, then they fade at a rate of 1 rank per round until gone or you absorb light energy again. Traits enhanced with this power are still subject to power level limits. This power often has Immunity to Light in conjunction with it, making you immune to the effects you absorb. (Enhanced Trait, Fades, Limited to the lesser of effect rank or absorbed energy rank • As base trait -2 per rank)"
      },
      {
        "id": "prof_light_powers_light_form",
        "name": "Light Form",
        "rank": 3,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Light, Energy Form - Light",
        "extras": [],
        "flaws": [],
        "notes": "You transform from a physical being into a form made of coherent light, able to pass harmlessly through transparent objects and shedding a bright enough glow to softly illuminate the area around you (but making it difficult to conceal your presence, particularly in dark surroundings). This power is often accompanied by other powers like Lightflight, Lightspeed, or Blinding Aura to reflect the additional capabilities of a Light Form. (Insubstantial 3 (Energy Form - Light) • 15 points)"
      },
      {
        "id": "prof_light_powers_photonic_shield",
        "name": "Photonic Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "You surround yourself with a glowing aura of \"hard light\" able to resist attacks. (Protection, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_light_powers_reflective",
        "name": "Reflective",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Light Effects"
          }
        ],
        "notes": "Like a \"living mirror,\" you can reflect light-based effects back at their source. If you can reflect an attack onto a target other than its source, apply the Redirect modifier for an additional +1 point per rank. (Deflect, Reflect, Close Range, Limited to Light Effects • 1 point per 2 ranks)"
      },
      {
        "id": "prof_light_powers_lightflight",
        "name": "Lightflight",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "You can fly through the air, surrounded by a glowing aura and perhaps leaving a brightly glowing contrail of light. (Flight • 2 points per rank Some characters-particularly those with the Light Constructs power (following)-fly via Light Bridge, a solid ramp or platform of light.)"
      },
      {
        "id": "prof_light_powers_light_bridge",
        "name": "Light Bridge",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "Some characters-particularly those with the Light Constructs power (following)-fly via Light Bridge, a solid ramp or platform of light. (Flight, Platform • 1 point per rank)"
      },
      {
        "id": "prof_light_powers_lightspeed",
        "name": "Lightspeed",
        "rank": 24,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Light, Space Travel 1",
        "extras": [],
        "flaws": [],
        "notes": "You can move from place to place at the speed of light! True \"light speed\" is rank 29, but speed rank 24 is sufficient to go anywhere on Earth in a single move action, with Space Travel 1 handling any movement away from the Earth. (Flight 24, Movement 1 (Space Travel 1) • 50 points)"
      },
      {
        "id": "prof_light_powers_banish_darkness",
        "name": "Banish Darkness",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Light, Radiant",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can counter any darkness effect in the area around you by radiating a clearing light. You can use this power as a model for creating other Nullify effects using light (see Countering under Light Descriptors). (Burst Area Nullify Darkness, Simultaneous • 3 points per rank)"
      },
      {
        "id": "prof_light_powers_healing_light",
        "name": "Healing Light",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "You channel a light energy that restores life-force and promotes healing. This power typically has a mystical descriptor like \"life\" or \"radiant\" (see Light Descriptors). (Healing • 2 points per rank)"
      },
      {
        "id": "prof_light_powers_holograms",
        "name": "Holograms",
        "rank": 10,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "Using projections of laser light, you can create holograms, realistic three-dimensional images. Your holograms are not solid and do not affect senses other than the visual. (Visual Illusion • 2 points per rank)"
      },
      {
        "id": "prof_light_powers_illuminate",
        "name": "Illuminate",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Light, Light",
        "extras": [],
        "flaws": [],
        "notes": "You can shed enough light to illuminate clearly over a wide area. For 1 point per rank, your illumination is similar to indoor lighting; for 2 points per rank, it is as bright as full daylight. (Environment (Light) • 1 or 2 points per rank)"
      },
      {
        "id": "prof_light_powers_laser_comm",
        "name": "Laser Comm",
        "rank": 10,
        "effectId": "communication",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Light, Visual, Laser",
        "extras": [],
        "flaws": [],
        "notes": "You can project and receive pulsed, encoded laser transmissions as a form of communication. This power tends to be restricted to rank 3 (Long Range), unless working with a satellite network able to \"bounce\" signals around the curvature of the Earth, and is limited to the speed of light, so cannot achieve rank 5 (Unlimited) distance. (Communication (Visual, Laser) • 4 points per rank)"
      },
      {
        "id": "prof_light_powers_laser_hearing",
        "name": "Laser Hearing",
        "rank": 5,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "Projecting a low-level laser against a source of vibrations (glass, metal, water, etc.), you can \"hear\" distant sounds causing those vibrations, such as a voice on the other side of a pane of one-way glass or a conversation at a table in a cafe. (Senses 5 (Extended Hearing, Hearing Penetrates Concealment) • 5 points +1 point per additional)"
      },
      {
        "id": "prof_light_powers_light_constructs",
        "name": "Light Constructs",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "You can create \"hard light\" constructs that function like physical objects. Light constructs are either translucent or opaque and generally glow softly. Apply other Create modifiers to the power to customize it as desired (see pages 154-155 of the Deluxe Hero's Handbook). For animate constructs, use the Summon effect instead (and see the Summoning Powers section). (Create • 2 points per rank)"
      },
      {
        "id": "prof_light_powers_solar_sustenance",
        "name": "Solar Sustenance",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Light, Sleep and starvation",
        "extras": [],
        "flaws": [],
        "notes": "So long as you are exposed to light, you have no need to eat or rest-the light energy providing you with your essential sustenance. (Immunity 2 (sleep and starvation), Source (light) • 1 point.)"
      },
      {
        "id": "prof_light_powers_vision_enhancement",
        "name": "Vision Enhancement",
        "rank": 10,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Light, Invisibility",
        "extras": [],
        "flaws": [],
        "notes": "Shaping, absorbing, and enhancing incoming light allows you to improve your vision in a variety of ways, seeing things others cannot. (Senses: choose any of Vision Counters Concealment (Invisibility), Vision Counters Illusion, Darkvision (all requiring 2 ranks), Extended Vision, Infravision, Low-Light Vision, Microscopic Vision, Radius Vision, and Ultravision • 1 point per rank)"
      },
      {
        "id": "prof_light_powers_warp_light",
        "name": "Warp Light",
        "rank": 2,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "By bending and warping light, you can become invisible to the naked eye or all wavelengths of light. If you can also bend light to make other people and things invisible, apply the Affects Others modifier. If you can do so against their will, apply the Attack modifier. In either case, add the Ranged modifier if you can make subjects invisible at a distance. (Visual Concealment 2 • 4 points, 4 ranks (8 points) for all visual senses. Rather than warping visible light, you might bend just infrared (IR) light around you, allowing you to pass through IR sensor or scanning beams without breaking them, rendering you essentially \"invisible\" to them.)"
      },
      {
        "id": "prof_light_powers_infrared_invisibility",
        "name": "Infrared Invisibility",
        "rank": 2,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Light, Radiant",
        "extras": [],
        "flaws": [],
        "notes": "All visual senses. Rather than warping visible light, you might bend just infrared (IR) light around you, allowing you to pass through IR sensor or scanning beams without breaking them, rendering you essentially \"invisible\" to them. (Infravision Concealment 2 • 4 points)"
      }
    ]
  },
  {
    "category": "Luck Powers",
    "profiles": [
      {
        "id": "prof_luck_powers_catastrophe",
        "name": "Catastrophe",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Luck, Accidents",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 2,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "An alternate version of Catastrophe applies the Alternate Resistance (Fortitude) modifier, producing \"accidental\" injuries rather than harmful accidents: the target might suffer a serious muscle pull, sprain, or even a broken bone or organ failure (in severe cases). This, however, has no effect on unliving targets with Immunity to Fortitude Effects. (Perception Ranged Damage, Indirect 4, Subtle 2, Variable Descriptor 1 (Accidents) • 7 points +3 points per rank)"
      },
      {
        "id": "prof_luck_powers_find_weakness",
        "name": "Find Weakness",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Luck, Penetrating",
        "extras": [
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Lower of Attack or Extra's Rank"
          },
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Limited to Lower of Attack or Extra's Rank, -1 point"
          }
        ],
        "notes": "You have a remarkable ability to find a target's \"weak spots\", allowing you to overcome otherwise impervious defenses. If you can provide this benefit to others-making their attacks \"lucky\" enough to hit the target's weak spotsapply the Affects Others and Perception Ranged modifiers, increasing cost to 3 points per rank. (Enhanced Extra (Penetrating), Variable Descriptor (Attacks), Quirk (Limited to Lower of Attack or Extra's Rank, -1 point) • 1 point per rank)"
      },
      {
        "id": "prof_luck_powers_jinx",
        "name": "Jinx",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Luck, Probability",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 2,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You \"curse\" a target with bad luck and difficulty in accomplishing tasks. One degree of effect halves the target's active defenses and imposes a -2 penalty on checks, while two degrees reduces active defenses to 0 and imposes a -5 penalty. The effect is such that the target is not even aware of the Jinx until things begin going awry. (Perception Ranged Affliction (Resisted and Overcome by Will; Impaired and Vulnerable, Defenseless and Disabled), Extra Condition, Indirect 4, Insidious, Subtle 2, Limited Degree • 7 points + 3 points per rank)"
      },
      {
        "id": "prof_luck_powers_lucky_shot",
        "name": "Lucky Shot",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Luck, Perception Range",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Lower of Attack or Extra's Rank"
          },
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Limited to Lower of Attack or Extra's Rank, -1 point"
          }
        ],
        "notes": "You can pull off an otherwise \"impossible\" shot. Your rank in this power determines the maximum effect of the attack: use the lower of the two, if they differ. So if you have 5 ranks of Lucky Shot, but use a light pistol (Damage 3), the attack still only does Damage 3. On the other hand, if you're using a Damage 9 blaster, you're limited to a Damage 5 Lucky Shot. Note that this effect precludes maneuvers like Power Attack since it bypasses the need for an attack check, although the GM may allow you to make extremely precise \"trick shots\" with it. Also note that, in spite of the name, you can use Lucky Shot with close attacks (unless it is additionally Limited to preclude them, a -1 flaw). (Enhanced Extra (Perception Range), Variable Descriptor (Attacks), Quirk (Limited to Lower of Attack or Extra's Rank, -1 point) • 1 point per rank)"
      },
      {
        "id": "prof_luck_powers_poltergeist",
        "name": "Poltergeist",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Luck, Probability",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 2,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "precise",
            "name": "Precise",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Targeting Move Object"
          }
        ],
        "notes": "A use of edit scene (Deluxe Hero's Handbook, page 20) may provide you with additional scenery or things to manipulate. By default, Poltergeist requires a moment's concentration (a standard action) but if you apply the Reaction modifier (increasing cost by 3 points per rank), the effects can occur at any time in reaction to your needs without an action on your part, freeing you to act on your own apart from your \"helper\". (Perception Ranged Move Object, Indirect 4, Precise, Subtle 2; Senses 10 (Radius Vision Counters and Penetrates All Concealment, Limited to Targeting Move Object) • 12 points +3 points per rank)"
      },
      {
        "id": "prof_luck_powers_breakfall",
        "name": "Breakfall",
        "rank": 1,
        "effectId": "movement",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Luck, Safe Fall",
        "extras": [],
        "flaws": [],
        "notes": "Hurled off a rooftop, you safely hit an awning. Falling from a bridge, you land in the back of a truck full of mattresses. No matter where you fall from-even if you're thrown out of a plane without a parachute-you somehow manage to survive, completely unscathed. (Movement 1 (Safe Fall), Reaction • 3 points)"
      },
      {
        "id": "prof_luck_powers_defensive_luck",
        "name": "Defensive Luck",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Luck, Probability",
        "extras": [],
        "flaws": [],
        "notes": "You are lucky enough that what would be a finishing blow for someone else becomes merely a graze or scratch for you, or even nothing at all, although you are physically no tougher than anyone else. (Protection, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_luck_powers_fortunate_failure",
        "name": "Fortunate Failure",
        "rank": 10,
        "effectId": "nullify",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Luck, Effects Countered by Coincidence",
        "extras": [],
        "flaws": [],
        "notes": "Circumstances seem to conspire to keep you safe from the effects of attackers' powers: a water main suddenly bursts, blocking a fire blast with a sheet of water; a gust of wind knocks aside an attacker's aim; a weapon jams or shorts out; perhaps you even slip or trip at an opportune moment, and so forth. When you are attacked by any power effect where you can provide an explanation of a \"lucky break,\" roll an opposed check of your rank in this power against the effect's rank. If you win, circumstances prevent the effect. If you lose, the effect works on your normally, although you're still entitled to any defenses or resistance checks. (Reaction Nullify (Effects Countered by Coincidence), Broad, Effortless, Simultaneous, Close Range • 6 points per rank)"
      },
      {
        "id": "prof_luck_powers_lucky_dodge",
        "name": "Lucky Dodge",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Luck, Uncanny Dodge",
        "extras": [],
        "flaws": [],
        "notes": "You have incredible luck in avoiding attacks, managing to not be there when the attack lands. You even avoid some unexpected attacks by circumstance: bending over the tie your shoelace or pick up a coin, for example, at just the right moment. (Enhanced Advantage 1 (Uncanny Dodge), Enhanced Dodge, Enhanced Parry • 1 point + 1 point per rank)"
      },
      {
        "id": "prof_luck_powers_lucky_escape",
        "name": "Lucky Escape",
        "rank": 1,
        "effectId": "immortality",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, Probability",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Circumstances of Plausible Survival"
          }
        ],
        "notes": "Advantage) allows a character to return from death two weeks later. Lucky Escape is such a common ability for comic book supervillains, the GM may wish to treat all important NPCs in the game as if they had at least one rank of it, and may even allow the 1 rank version as a heroic feat, available by spending a hero point (Deluxe Hero's Handbook, page 20). (Immortality, Limited to Circumstances of Plausible Survival • 1 point per rank)"
      },
      {
        "id": "prof_luck_powers_ease_of_movement",
        "name": "Ease of Movement",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Luck, Sure-Footed",
        "extras": [],
        "flaws": [],
        "notes": "You are untroubled by obstacles to your movement, evading them through sheer luck and good fortune. (Movement 2 (Sure-Footed) • 4 points)"
      },
      {
        "id": "prof_luck_powers_perfect_timing",
        "name": "Perfect Timing",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, Edit Scene to appear in it",
        "extras": [],
        "flaws": [],
        "notes": "You have an uncanny knack for showing up in the right place at the right time, whether it is an opportunity to \"run into\" someone you need to speak to or a last-minute save for a friend in need. You can do this a number of times per adventure equal to your rank. Like a number of luck powers, this one relies on some management by the Gamemaster, who decides when it comes into play, although you can offer suggestions and perhaps modify circumstances with a hero point used to further edit the scene. It is up to you and the GM to agree upon a plausible explanation for how you \"happen\" to show up where and when you do. This ability is separate from the Luck advantage, but the GM may wish to limit its rank to the series power level in a similar fashion. (Feature (Edit Scene to appear in it) • 1 point per rank)"
      },
      {
        "id": "prof_luck_powers_escape_notice",
        "name": "Escape Notice",
        "rank": 10,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, All Senses",
        "extras": [],
        "flaws": [],
        "notes": "You bend probability such that, while you are not truly \"invisible,\" no one seems to notice you until you do something to draw attention to yourself (such as making an attack or effect check). Otherwise, circumstances conspire so the people are looking the other way, distractions crop up at just the right moment, and so forth, allowing you to escape notice. (Concealment 10 (All Senses), Passive • 10 points)"
      },
      {
        "id": "prof_luck_powers_lucky",
        "name": "Lucky",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Luck, Luck",
        "extras": [],
        "flaws": [],
        "notes": "You're exceptionally fortunate, due to some supernatural blessing or an unconscious ability to bend probabilities in your favor. Your luck is finite, however, and can \"run out\" if you rely too heavily upon it. As with the regular Luck advantage, Lucky is limited to half the series power level and stacks with Luck (with the total rank being limited to half the series PL). If the Expanded Luck option (previously) is in use, then this power can provide any of the various types of Luck, up to the given power level limits. (Enhanced Advantage (Luck) • 1 point per rank)"
      },
      {
        "id": "prof_luck_powers_reality_control",
        "name": "Reality Control",
        "rank": 10,
        "effectId": "variable",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Luck, Probability Effects",
        "extras": [],
        "flaws": [],
        "notes": "Your influence over probability is so profound you can cause nearly anything to happen, so long as there's the slightest possibility, limited solely by your focus and concentration (and, in game terms, your available power points). Your power potential is so great you may encounter various complications related to it, as outside forces seek to exploit you... or eliminate you as a potential threat. Gamemasters should see the sidebar on page 186 of the Deluxe Hero's Handbook for some advice on allowing and managing Variable effects in the game. (Variable (Probability Effects), Free Action • 9 points per rank)"
      },
      {
        "id": "prof_luck_powers_sense_of_luck",
        "name": "Sense of Luck",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, Luck Awareness",
        "extras": [],
        "flaws": [],
        "notes": "You can sense when luck powers are used in your presence (or to affect things in your presence) unless those powers are completely Subtle (2 ranks). This includes uses of the Luck Control effect with a \"luck\" or related descriptor, but not routine spending of hero points or creation of complications by the GM, unless they have luck descriptors associated with them. At the Gamemaster's discretion, this power can add Counters Concealment (2 ranks) in order to detect even completely Subtle luck effects like some of the offensive luck powers in this section. (Senses 1 (Luck Awareness) • 1 point.)"
      },
      {
        "id": "prof_luck_powers_visions_of_fortune",
        "name": "Visions of Fortune",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, Precognition",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Luck Trends"
          }
        ],
        "notes": "You can sense a subject's future in terms of good and bad luck and probable outcomes: the GM tells you if the subject's luck is trending good or bad (or remaining largely neutral). A Perception check may be required for more detailed information, and the GM may also grant you spontaneous visions or impressions from time to time. This power is also a good means for receiving inspiration (Deluxe Hero's Handbook, page 21). (Senses 4 (Precognition), Limited to Luck Trends • 2 points)"
      },
      {
        "id": "prof_luck_powers_dice_versus_determinism",
        "name": "Dice Versus Determinism (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, Probability",
        "extras": [],
        "flaws": [],
        "notes": "Luck in an M&M game context is modeled by two main factors: the roll of the (Feature • 1 point)"
      },
      {
        "id": "prof_luck_powers_charmed_life",
        "name": "Charmed Life (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, Probability",
        "extras": [],
        "flaws": [],
        "notes": "You're largely immune to routine \"bad luck\". You never get a flat tire, have to wait in line, or (Feature • 1 point)"
      },
      {
        "id": "prof_luck_powers_gambler",
        "name": "Gambler (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, Probability",
        "extras": [],
        "flaws": [],
        "notes": "You can automatically win at games of chance, unless pitted against an opponent with this (Feature • 1 point)"
      },
      {
        "id": "prof_luck_powers_fortunate",
        "name": "Fortunate (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Luck, Probability",
        "extras": [],
        "flaws": [],
        "notes": "Many advantages, particularly Fortune Advantages, may also be Luck Features, essentially (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Magic Powers",
    "profiles": [
      {
        "id": "prof_magic_powers_mystic_bolt",
        "name": "Mystic Bolt",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Magic",
        "extras": [],
        "flaws": [],
        "notes": "There are some standard spells every novice in the mystic arts learns, simple enchantments and manifestations of the magical power permeating the cosmos. The following should be in most magicians' repertoires: Mystic Bolt is a raw blast of arcane power, manifested as a glowing light and striking with considerable force. (Ranged Damage (magic) • 2 points per rank Mystic Passage allows the caster to step from one point)"
      },
      {
        "id": "prof_magic_powers_mystic_passage",
        "name": "Mystic Passage",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Mystic Passage allows the caster to step from one point in space to another as easily as crossing a room. It's sisterspell, Mystic Portal, allows others to do so as well (adding the Portal modifier). (Teleport • 2 points per rank Mystic Shield protects the caster with an aura or a flat geometric shield of glowing magical force.)"
      },
      {
        "id": "prof_magic_powers_mystic_shield",
        "name": "Mystic Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Mystic Shield protects the caster with an aura or a flat geometric shield of glowing magical force. (Protection, Sustained • 1 point per rank Levitation allows a magician to float through the air, or at least hover while composed in meditation.)"
      },
      {
        "id": "prof_magic_powers_levitation",
        "name": "Levitation",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Levitation allows a magician to float through the air, or at least hover while composed in meditation. (Flight • 2 points per rank Scrying uses various \"windows\" to view distant places, from a magic mirror or crystal to a pool of still water.)"
      },
      {
        "id": "prof_magic_powers_scrying",
        "name": "Scrying",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Magic, Visual, Auditory, Mental",
        "extras": [],
        "flaws": [],
        "notes": "Scrying uses various \"windows\" to view distant places, from a magic mirror or crystal to a pool of still water. (Remote Sensing (Visual, Auditory, Mental) • 4 points per rank Comic book magicians frequently invoke the names and titles of mystic entities, calling upon them for power and assistance with their spells. These magical-sounding names and incantations can add flavor to a Magic power array (Deluxe Hero's Handbook, page 168). The following invocations and entreaties are fairly advanced magic. Feel free to use the spells presented here as-is or adapt them to your own M&M setting as desired, perhaps using them as inspiration for your own.)"
      },
      {
        "id": "prof_magic_powers_abjurations_of_abbridon",
        "name": "Abjurations of Abbridon",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Ed Abbridon may be a multifaceted entity or collective class of higher angelic beings, perhaps even an office held by one of them. Abbridon is also one of the three entities making up the mystic trinity of the Modrossus, along with Heshem and Lamal. Abjurations of Abbridon counteract darkness, bindings, and malevolent summoned creatures. (Nullify Binding, Darkness, and Evil Summon effects, Simultaneous • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_aegis_of_abbridon",
        "name": "Aegis of Abbridon",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Aegis of Abbridon calls forth a magical shield to protect the caster. The Aegis is one of the most commonly wielded defensive spells; even a novice mystic knows how to conjure one. (Impervious Protection, Sustained • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_all_revealing_light_of_abbridon",
        "name": "All-Revealing Light of Abbridon",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Points per rank All-Revealing Light of Abbridon banishes all concealing, obscuring, or illusory effects. (Burst Area Nullify Concealing or Illusory Effects, Simultaneous, Close Range • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_all_seening_eyes_of_abbridon",
        "name": "All-Seening Eyes of Abbridon",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Magic, Visual, Auditory, Mental",
        "extras": [],
        "flaws": [],
        "notes": "All-Seeing Eyes of Abbridon creates mystic \"sensors\" for the caster to scry. (Remote Sensing (Visual, Auditory, Mental) • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_illumination_of_abbridon",
        "name": "Illumination of Abbridon",
        "rank": 1,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Magic, Bright Light",
        "extras": [],
        "flaws": [],
        "notes": "Illumination of Abbridon is a simple spell for creating light as bright as normal daylight, although such light can also affect creatures specifically vulnerable to it. (Environment (Bright Light), Feature 1 (equal to daylight) • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_ahgrazul_s_compass",
        "name": "Ahgrazul’s Compass",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Magic, Visual",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Extended Searches"
          }
        ],
        "notes": "(ah-GRAH-zool) Archmage of Atlantis, The Explorer Ahgrazul was a mighty archmage in ancient Atlantis, best known as a seer and diviner. He first explored the Cosmic Coil and blazed paths for the mystics who would follow him. Legend says Ahgrazul foretold Atlantis's fall, but he departed for worlds beyond before the island-continent sank beneath the waves. Ahgrazul's Compass is a pathfinding spell, able to guide the caster to a desired destination. (Remote Sensing (Visual), Simultaneous, Limited to Extended Searches (see Search, Deluxe Hero's Handbook, page 123) • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_airts_of_ahgrazul",
        "name": "Airts of Ahgrazul",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Airts of Ahgrazul guide travelers on the winding coils between worlds. (Movement 2 (Dimension Travel 2, Mystic Dimensions) • 4 points +1 point per rank of Increased Mass.)"
      },
      {
        "id": "prof_magic_powers_auspicious_augury_of_ahgrazul",
        "name": "Auspicious Augury of Ahgrazul",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magic, Second Chance",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Second Chance"
          }
        ],
        "notes": "Auspicious Augury of Ahgrazul is a potent ritual involving omens of the future. It offers an effect similar to an enhanced Second Chance: after the spell is cast (taking a full-round action), the magician can thereafter spend a hero point to \"undo\" a single event, treating that event as a precognitive warning or vision rather than something that \"actually\" happened. (Enhanced Advantage 1 (Second Chance), Senses 4 (Precognition, Limited to Second Chance) • 3 points)"
      },
      {
        "id": "prof_magic_powers_baleful_bindings_of_bal_hemoth",
        "name": "Baleful Bindings of Bal’Hemoth",
        "rank": 2,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "affects_insubstantial",
            "name": "Affects Insubstantial",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Were overthrown through generations of slave rebellions against the Serpent People of Lemuria and their inheritors. Baleful Bindings of Bal'Hemoth are dark metallic chains that appear around the target of the spell. The Bindings are able to trap astral forms and spirits as well. (Ranged Affliction (Resisted by Dodge, Overcome by Will; Hindered and Vulnerable, Defenseless and Immobilized), Affects Insubstantial 2, Extra Condition, Limited Degree • 2 points + 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_beast_of_bal_hemoth",
        "name": "Beast of Bal’Hemoth",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Beast of Bal'Hemoth summons a demon warrior (M&M Gamemaster's Guide, page 137) or a monstrous spider (giant insect, M&M Gamemaster's Guide, 140) to do the magician's bidding. (Summon Minion 5 • 10 points Bidding of Bal'Hemoth ensnares the victim's will as surely as the Baleful Bindings ensnare the body.)"
      },
      {
        "id": "prof_magic_powers_bidding_of_bal_hemoth",
        "name": "Bidding of Bal’Hemoth",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Bidding of Bal'Hemoth ensnares the victim's will as surely as the Baleful Bindings ensnare the body. (Perception Ranged Cumulative Affliction (Resisted and Overcome by Will; Entranced, Compelled, Controlled) • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_bitter_lash",
        "name": "Bitter Lash",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Bitter Lash of Bal'Hemoth creates a crackling whip of dark energy in the caster's grasp. Its touch inflicts no physical harm, but rather it fills the target with a terrible feeling of hopelessness and indecision. (Cumulative Affliction (Resisted and Overcome by Will; Dazed, Stunned, Paralyzed), Reach 2 • 2 points +2 points)"
      },
      {
        "id": "prof_magic_powers_ghorummaz_s_dictum",
        "name": "Ghorummaz’s Dictum",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Entranced, Compelled",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "(go-ROO-maz) The Dragon Within the Earth, Lord of Storms, The Earth-Binder Ghorummaz is a primal, elemental force, often depicted as a serpentine dragon of stone and fire, spitting molten magma. It is strongly connected with \"dragon lines\" of force within the Earth and with the elements. Ghorummaz is Lord of Earthquakes and Storms, and a binder of what is unnatural. Ghorummaz's Dictum is a powerful abjuration of the unnatural that hedges out unnatural creatures (including those from other planes) in a 30-foot radius around the caster. (Burst Area Progressive Affliction (Entranced, Compelled), Limited Degree, Limited to Unnatural Creatures, Limited to Holding at Bay • 1 point)"
      },
      {
        "id": "prof_magic_powers_grasp_of_ghorummaz",
        "name": "Grasp of Ghorummaz",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Per rank Grasp of Ghorummaz creates a clawed hand of stone, bursting up from the earth to seize and hold a target. (Ranged Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree, Affects Incorporeal 2, Indirect 1 • 3 points +2 points per rank)"
      },
      {
        "id": "prof_magic_powers_gale_of_ghorummaz",
        "name": "Gale of Ghorummaz",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Impeded Movement 2, Visibility -5",
        "extras": [],
        "flaws": [],
        "notes": "Great Gale of Ghorummaz summons a powerful storm over an area, the equivalent of a 4-point Environmental Control effect (Distraction and Hamper Movement). The caster of the spell can direct the gale's effect, moving the center of it within range. (Environment (Impeded Movement 2, Visibility -5) • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_storm_of_ghorummaz",
        "name": "Storm of Ghorummaz",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Lightning",
        "extras": [],
        "flaws": [],
        "notes": "An additional use for the various spells described in this section is as a catalog of magical power stunts. Although each character has a set of \"rote\" or \"mastered\" spells-established Alternate Effects of a Magic array-any magician can attempt to improvise an entreaty to any of the various arcane powers. Indeed, many of the spells used by comic book magicians are one-time things: if they require preparation and ceremony, they're rituals (Magical Rituals, Deluxe Hero's Handbook, page 212), but if they're done on the spur of the moment, then they're best considered Magic power stunts. In keeping with the theme of magic carrying a price, the GM may, from time to time, choose to waive the fatigue caused by the extra effort of an improvised spell, instead imposing a future complication from calling upon that particular entity (for which the magician will not gain a hero point, since it was effectively \"cashed in\" for the spell itself ). Likewise, the GM can use entreaties and characters' relationships with the various Powers of Magic as a source of future complications in the game, as magicians encounter omens, unusual \"luck,\" and the like. (Ranged Damage (lightning), Indirect 2 • 2 points +2 points per rank)"
      },
      {
        "id": "prof_magic_powers_thunderous_tread",
        "name": "Thunderous Tread",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Thunderous Tread of Ghorummaz creates a localized earthquake around where the magician stomps the ground. (Burst Area Affliction (Resisted and Overcome by Fortitude; Vulnerable, Defenseless), Instant Recover, Limited Degree, Limited: caster and target much touch the ground • 1 point per rank)"
      },
      {
        "id": "prof_magic_powers_hand_of_heshem",
        "name": "Hand of Heshem",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Glowing eyes. Although stern and fierce, she can be a power for good, bringing light into the darkness. Heshem is one of the Three Powers of the Modrossus. Hand of Heshem (sometimes known as Heshem's Shadowy Hand) creates a shadowy ectoplasmic extension to the magician's grasp. (Move Object • 2 points per rank Heshem's Holy Hearth summons a golden light or an actual mystic flame whose light wards off creatures of evil and darkness.)"
      },
      {
        "id": "prof_magic_powers_holy_hearth",
        "name": "Holy Hearth",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Evil Creatures"
          }
        ],
        "notes": "Heshem's Holy Hearth summons a golden light or an actual mystic flame whose light wards off creatures of evil and darkness. (Burst Area Progressive Affliction (Resisted and Overcome by Will; Entranced, Compelled, Controlled), Limited to Evil Creatures, Limited to Holding at Bay • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_heshem_s_way",
        "name": "Heshem’s Way",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Dimensional 2",
        "extras": [
          {
            "id": "portal",
            "name": "Portal",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Heshem's Way conjures a dark mist that acts as a gateway into the astral plane or dream dimension. It's traditionally cast as a crossroads, but it can actually be used anywhere. (Movement 2 (Dimensional 2), Portal • 8 points Holy Hosts of Heshem invokes powerful forces of banishment in the form of a shadowy storm of wings.)"
      },
      {
        "id": "prof_magic_powers_holy_hosts",
        "name": "Holy Hosts",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Holy Hosts of Heshem invokes powerful forces of banishment in the form of a shadowy storm of wings. (Nullify Magic, Broad • 2 points per rank Hood of Heshem cloaks an area in impenetrable darkness.)"
      },
      {
        "id": "prof_magic_powers_hood_of_heshem",
        "name": "Hood of Heshem",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magic, All Visual",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Hood of Heshem cloaks an area in impenetrable darkness. (Cloud Area Concealment Attack 4 (All Visual) • 12 points + 4 points per additional area rank)"
      },
      {
        "id": "prof_magic_powers_hook_of_heshem",
        "name": "Hook of Heshem",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Hook of Heshem is similar to Hand of Heshem, except the shadowy extension around the caster's hand is tipped with wicked claws. (Penetrating Damage • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_crying_road",
        "name": "Crying Road",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Dimensional 1, Dream Dimension",
        "extras": [
          {
            "id": "portal",
            "name": "Portal",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Awareness from which all thought and imagination first arose. It is that portion of the Great Mind that will not be tamed or subject to order. It is insanity incarnate. Magicians calling on the power of the Howling Dream skirt the edges of madness themselves. The Crying Road is a path into the realm of dreams and nightmares. (Movement 1 (Dimensional 1, Dream Dimension), Portal • 4 points)"
      },
      {
        "id": "prof_magic_powers_curse_of_howling_madness",
        "name": "Curse of Howling Madness",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "causing erratic or insane behavior"
          }
        ],
        "notes": "Curse of Howling Madness drags the victim's psyche down into the depths of the Howling Dream, causing erratic, often insane, behavior. (Perception Ranged Affliction (Resisted and Overcome by Will; Entranced, Compelled, Controlled), Progressive, Limited to causing erratic or insane behavior • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_dream_dementia",
        "name": "Dream Dementia",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Magic, Emotions",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Dream Dementia calls forth powerful dream images into the waking mind, causing the subject to feel powerful emotions accompanied by hallucinations: so, a victim might see her greatest fear, perceive the magician as her one true love, and so forth. (Perception Ranged Affliction (Resisted and Overcome by Will; Entranced, Compelled, Controlled), Cumulative, Insidious, Variable Descriptor (Emotions) • 3 points + 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_dream_denizens",
        "name": "Dream Denizens",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Points + 4 points per rank Dream Denizens conjures up creatures out of nightmare, no two exactly alike. (Summon Dream Denizen, Active, Broad, Mental Link • 1 point + 5 points per rank)"
      },
      {
        "id": "prof_magic_powers_cloak_of_idolon",
        "name": "Cloak of Idolon",
        "rank": 2,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Magical",
        "extras": [],
        "flaws": [],
        "notes": "Assuming any appearance, for Idolon is a power of illusion and trickery. Mages call upon it for aid in concealment and crafting cunning images. Cloak of Idolon renders the \"wearer\" difficult to locate and detect using magical means. It's a known weapon in the arsenal of mage-killers, and sometimes used by magicians on the run to evade detection and capture. (Concealment 2 (Magical), Sustained • 4 points Illusions of Idolon creates convincing hallucinations in the minds of the subjects, causing them to perceive whatever the caster wishes.)"
      },
      {
        "id": "prof_magic_powers_illusions_of_idolon",
        "name": "Illusions of Idolon",
        "rank": 10,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Magic, All Senses",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Illusions of Idolon creates convincing hallucinations in the minds of the subjects, causing them to perceive whatever the caster wishes. (Illusion (All Senses), Resistible by Will, Selective • 5 points per rank)"
      },
      {
        "id": "prof_magic_powers_veil_of_idolon",
        "name": "Veil of Idolon",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Magic, Mental Senses and Remote Sensing",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Veil of Idolon is a ward against scrying, rendering an area \"dark\" to magical means of detection. Some magicians Veil their sanctums and working areas as a matter of course, to safeguard against spies. (Burst Area Concealment 3 (Mental Senses and Remote Sensing), Affects Others • 12 points + 3 points per +1)"
      },
      {
        "id": "prof_magic_powers_eight_eyes_of_ios",
        "name": "Eight Eyes of Ios",
        "rank": 13,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Was known for her devotion to seeking truth and her opposition to the ancient Cult of Idolon, infamous deceivers and spies that they were. The Eight Eyes of Ios are a glowing ring of unblinking golden orbs that float around the mage's head when summoned. They grant the ability to see in all directions through any concealment or illusion. (Senses 13 (Radius Vision, Vision Counters Illusion, Vision Counters and Penentrates All Concealment) • 13 points)"
      },
      {
        "id": "prof_magic_powers_enchantment_of_ios",
        "name": "Enchantment of Ios",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Fascinate",
        "extras": [],
        "flaws": [],
        "notes": "Enchantment of Ios allows the magician to capture and hold a subject's gaze, and attention, for as long as the caster continues to engage the subject using an interaction skill of choice. (Enhanced Advantage 1 (Fascinate) • 1 point.)"
      },
      {
        "id": "prof_magic_powers_everwatchful_eye_of_ios",
        "name": "Everwatchful Eye of Ios",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magic, Uncanny Dodge",
        "extras": [],
        "flaws": [],
        "notes": "Everwatchful Eye of Ios literally grants the magician \"eyes in the back of the head\" (one unseen magical eye, technically). (Enhanced Advantage 1 (Uncanny Dodge), Senses 3 (Danger Sense, Radius Vision) • 4 points)"
      },
      {
        "id": "prof_magic_powers_call_of_kar_kradas",
        "name": "Call of Kar’Kradas",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Glimpse. Magicians call on the Whisperer for powers of darkness, deception, and transcending time and space. Cults have worshipped Kar'Kradas throughout time, and some have sought to free him from his imprisonment, even though doing so would mean the unraveling of the Cosmic Coil and the end of all existence as we know it. Call of Kar'Kradas is a powerful demon-summoning spell. (Summon Demon, Active, Broad, Controlled • 5 points per rank)"
      },
      {
        "id": "prof_magic_powers_chains_of_kar_kradas",
        "name": "Chains of Kar’Kradas",
        "rank": 2,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "affects_insubstantial",
            "name": "Affects Insubstantial",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Chains of Kar'Kradas wrap the target in chain-like bonds forged of pure darkness. (Ranged Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobile), Affects Insubstantial 2, Cumulative, Extra Condition, Limited Degree • 2 points +)"
      },
      {
        "id": "prof_magic_powers_crooked_path_of_kar_kradas",
        "name": "Crooked Path of Kar’Kradas",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Magic, Shadows",
        "extras": [],
        "flaws": [],
        "notes": "3 points per rank Crooked Path of Kar'Kradas allows the magician to step into a shadow and vanish, reappearing out of another shadow some distance away. (Teleport, Accurate, Medium (Shadows) • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_hounds_of_kar_kradas",
        "name": "Hounds of Kar’Kradas",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Hounds of Kar'Kradas is a summoning spell, calling forth one or more \"dark hounds,\" relentless hunters and trackers. They have the game stats of lions (M&M Gamemaster's Guide, page 135), with the addition of Concealment 4 (Visual, Limited to shadows), Insubstantial 4, and Senses 3 (Acute Magical Awareness, Magical Tracking), raising total points to 75. (Summon Dark Hound 5 (75-point minion), Controlled, Heroic, Mental Link • 26 points + 10)"
      },
      {
        "id": "prof_magic_powers_umbral_kraken_of_kar_kradas",
        "name": "Umbral Kraken of Kar’Kradas",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Points per doubling of the number of hounds Umbral Kraken of Kar'Kradas is another summoning spell, calling up a massive tentacled creature of darkness from the depths. It's the equivalent of giant squid (M&M Gamemaster's Guide, page 135) with Insubstantial 4, and Burrowing rather than Swimming, if summoned on land. (Summon Umbral Kraken (75point minion), Active, Controlled, Heroic • 30 points)"
      },
      {
        "id": "prof_magic_powers_lamal_s_labyrinth",
        "name": "Lamal’s Labyrinth",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Know Lamal as \"the Wise\" and the \"Great Balance,\" a giver of laws, guidance, and wise judgment. For this reason, he is often a guide and patron of magicians seeking to use their powers wisely for the greater good. Lamal is one of the Three Powers of the Modrossus. Lamal's Labyrinth mystically traps a subject in psychic \"maze\" leaving them stupified and vulnerable. (Perception Ranged Affliction (Resisted and Overcome by Will; Entranced and Vulnerable, Defenseless and Immobile, Incapacitated), Extra Condition • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_lamal_s_mighty_hands",
        "name": "Lamal’s Mighty Hands",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "precise",
            "name": "Precise",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "4 points per rank Lamal's Mighty Hands are ghostly, invisible forces able to lift and move objects as the caster wills. (Move Object, Precise, Subtle • 2 points +2 points per rank)"
      },
      {
        "id": "prof_magic_powers_lamal_s_rebuke",
        "name": "Lamal’s Rebuke",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Extraplanar Creatures of Chaos"
          }
        ],
        "notes": "+2 points per rank Lamal's Rebuke is a powerful spell usable against extraplanar creatures of chaos. (Burst Area Affliction (Resisted and Overcome by Will; Dazed and Hindered, Disabled and Stunned, Incapacitated), Extra Condition, Limited to Extraplanar Creatures of Chaos • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_light_of_lamal",
        "name": "Light of Lamal",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Light of Lamal, also known as the \"Light of Law,\" calls forth a pure, streaming ray of white light. Those illuminated by it are compelled to speak the truth. (Ranged Affliction (Resisted and Overcome by Will; Controlled), Progressive, Limited Degree, Limited to Speaking the Truth • 1 point per rank)"
      },
      {
        "id": "prof_magic_powers_minion_of_malador",
        "name": "Minion of Malador",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, 32 undead",
        "extras": [],
        "flaws": [],
        "notes": "Within the Temple of Sirrion. Malador's name is still invoked by magicians seeking power over life and death. Malevolent Minion of Malador reanimates corpses as undead minions, either zombies or skeletons, under the caster's control. See the Gamemaster's Guide, page 144, for undead traits. (Summon Undead, Controlled, Horde, Multiple Minions (32 undead) • 14 points per rank)"
      },
      {
        "id": "prof_magic_powers_miasma_of_malador",
        "name": "Miasma of Malador",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Acid",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "Miasma of Malador summons a cloud of noxious, acidic vapor to burn and blind targets. (Ranged Cloud Area Damage (acid) Linked to Ranged Cloud Area Cumulative Affliction (Resisted and Overcome by Fortitude; Impaired, Disabled, Unaware), Limited to Vision • 6 points per rank)"
      },
      {
        "id": "prof_magic_powers_might_of_malador",
        "name": "Might of Malador",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Necomantic",
        "extras": [],
        "flaws": [],
        "notes": "Might of Malador hurls black necromantic lightning from the caster's hands to strike at enemies. (Ranged Damage (necomantic) • 2 points per rank Mists of Malador are dark grey, swirling clouds, quite similar to the Miasma of Malador and often mistaken for it, but merely obscuring the area they cover.)"
      },
      {
        "id": "prof_magic_powers_mists_of_malador",
        "name": "Mists of Malador",
        "rank": 4,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magic, Visual",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Per rank Mists of Malador are dark grey, swirling clouds, quite similar to the Miasma of Malador and often mistaken for it, but merely obscuring the area they cover. (Ranged Burst Area Concealment 4 Attack (Visual) • 16 points + 4 points per +1 area rank)"
      },
      {
        "id": "prof_magic_powers_mists_of_the_modrossus",
        "name": "Mists of the Modrossus",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Blanking Recent Memories"
          }
        ],
        "notes": "Mists of the Modrossus are sweet-smelling vapors able to blank out the memories of the uninitiated who witness those things they are not meant to know. (Burst Area Affliction (Resisted and Overcome by Will; Entranced, Compelled, Transformed), Progressive, Selective, Limited to Blanking Recent Memories • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_sign_of_the_modrossus",
        "name": "Sign of the Modrossus",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Magical Creatures"
          }
        ],
        "notes": "Sign of the Modrossus is a powerful ward against mystic creatures, visible as the glowing sign of the Triluminary drawn in fiery blue-white light. (Burst Area Affliction (Resisted and Overcome by Will; Dazed and Hindered, Stunned and Immobile, Incapacitated), Extra Condition, Limited to Magical Creatures • 2 points per rank +1 point per rank per +1 area rank)"
      },
      {
        "id": "prof_magic_powers_obsscuring_orb_of_obroros",
        "name": "Obsscuring Orb of Obroros",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magic, Visual and Mental",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Obroros on its eternal vigil, and the Spire remains silent on such matters. Its cries are terribly painful to dimensional intruders, driving them back whence they came. Obscuring Orb of Obroros mystically \"blinds\" the sight and psychic senses of those the mage chooses within its radius. (Ranged Burst Area Concealment Attack 6 (Visual and Mental), Selective • 30 points + 6 points)"
      },
      {
        "id": "prof_magic_powers_occult_exorcism",
        "name": "Occult Exorcism",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Per +1 area rank Occult Exorcism of Obroros is a powerful ban against outside mystic influences on the mind. (Nullify Mind-Influencing Effects, Simultaneous • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_omens_of_obroros",
        "name": "Omens of Obroros",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Magic, Vision",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "Omens of Obroros summons an extension of Obroros itself, a tall obelisk of polished obsidian appearing out of a cloud of grey smoke. It can answer questions posed to it by showing visions in its depths. (Remote Sensing (Vision), Dimensional 3, No Conduit, Subtle • 4 points + 3 points per rank)"
      },
      {
        "id": "prof_magic_powers_phantasms_of_the_phoros",
        "name": "Phantasms of the Phoros",
        "rank": 10,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Magic, Visual",
        "extras": [],
        "flaws": [],
        "notes": "Phantasms of Phoros, also known as the \"Fata of the Phoros,\" shapes flickering light to create visual Illusions, the simplest being the appearance of floating orbs of light similar to the Phoros themselves. Unlike many magically made illusions, the images are formed of light, so they're visible to all, not hallucinations in the targets' minds. (Illusion (Visual) • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_scourge_of_shatachna",
        "name": "Scourge of Shatachna",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "(sha-TAK-na) The Iron Queen, The Lady of Pain, Mistress of Curses The Iron Queen and Mistress of the Seven Hells, Shatachna is an ancient demon associated with pain and suffering. Those seeking power and dominion call her upon to inflict pain on others, and she has claimed the souls of more than a few would-be \"magisters\" as her personal slaves and attendants. Scourge of Shatachna conjures a many-tailed whip that inflicts burning pain with each strike. (Cumulative Affliction (Resisted and Overcome by Will; Dazed and Impaired, Defenseless and Stunned , Incapacitated), Extra Condition, Reach 4 • 4 points)"
      },
      {
        "id": "prof_magic_powers_scythe_of_shatachna",
        "name": "Scythe of Shatachna",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "+ 3 points per rank Scythe of Shatachna is a wicked, curved blade at the end of a long black handle, wielded as a two-handed weapon, preternaturally sharp and deadly. (Penetrating Damage, Reach 1 • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_servants_of_shatachna",
        "name": "Servants of Shatachna",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "+ 2 points per rank Servants of Shatachna is a demon-summoning spell. It's also a commonly enacted ritual for cults worshipping Shatachna, calling on one of her many demonic slaves for aid. Different versions may have additional Summon modifiers applied to them. (Summon Demon, Broad Type • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_shadows_of_shatachna",
        "name": "Shadows of Shatachna",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Points per rank Shadows of Shatachna are more than mere darkness; they are hungry shadows from the depths of a dark netherworld, a darkness that feeds fear like oxygen feeds a fire. Victims often run into obstacles in the darkness in their blind efforts to escape from the dreadful terrors they feel lurking there. (Ranged Burst Area Progressive Affliction (Resisted and Overcome by Will; Dazed and Impaired, Defenseless and Disabled, Paralyzed and Unaware), Extra Condition • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_seal_of_silence",
        "name": "Seal of Silence",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Shatachna's Seal of Silence places an enchantment on the subject, preventing them from speaking of or communicating about certain information in any way. The subject retains awareness of the information and of the spell, but they simply cannot communicate. (Perception Ranged Affliction (Resisted and Overcome by Will; Controlled), Progressive, Limited Degree, Limited to Communication, Limited to Specific Information • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_scarlet_shades_of_sirrion",
        "name": "Scarlet Shades of Sirrion",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magic, Visual",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Spells of summoning, protection, and binding, amongst others. Scarlet Shades of Sirrion summons \"vermillion darkness,\" a deep, red-tinted mist, blanketing a given area and blocking all sight. Some versions of the spell add other senses to the effect, particularly mental or mystical senses, making the Scarlet Shades even more difficult to penetrate. (Ranged Cloud Area Concealment Attack (Visual) 4 • 12 points + 4 points per +1 area rank)"
      },
      {
        "id": "prof_magic_powers_shining_shackles_of_sirrion",
        "name": "Shining Shackles of Sirrion",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Shining Shackles of Sirrion, also known as the Scarlet Shackles or Bonds of Sirrion, are glowing red metal chains or crimson bands of energy that trap their target. (Ranged Affliction (Resisted by Dodge, Overcome by Will; Hindered and Impaired, Disabled and Immobile), Extra Condition, Limited Degree • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_shining_shield_of_sirrion",
        "name": "Shining Shield of Sirrion",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Shining Shield of Sirrion summons up a glowing red aura or a disk-shaped shield of crimson force able to deflect attacks. Some verions of the Shining Shield are Impervious as well. (Sustained Protection • 1 point per rank Shining Suns of Sirrion calls forth a blazing reddish-gold light, used for several effects. Shining Suns of Sirrion Ranged Cumulative Affliction (Resisted and Overcome by Fortitude; Impaired, Disabled, Unaware), Limited to Vision • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_somnambulant_spell",
        "name": "Somnambulant Spell",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Somnambulant Spell of Sirrion creates thin, pinkish mist, rising up from the ground or pouring forth from the caster's hands or feet, putting targets into a deep sleep. (Cloud Area Cumulative Affliction (Resisted and Overcome by Will; Dazed, Stunned, Asleep) • 3 points per rank)"
      },
      {
        "id": "prof_magic_powers_star_demons_of_sirrion",
        "name": "Star Demons of Sirrion",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Star Demons of Sirrion conjures up one or more batwinged beings formed of deep reddish shadow with burning red eyes that obey their summoner's commands. Use the Imp archetype from page 137 of the Gamemaster's Guide, without Shrinking but with Insubstantial 4. (Summon Star Demon 6 (90-point minion), Controlled • 18 points + 12 points per doubling the)"
      },
      {
        "id": "prof_magic_powers_maw_of_vhoka",
        "name": "Maw of Vhoka",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Bite",
        "extras": [
          {
            "id": "homing",
            "name": "Homing",
            "rank": 3,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "Lord of the Yellow Sign, Rune of Madness The entity known as the Unspeakable One has been worshipped by mad cults since the days of Lemuria and the Serpent Empire. Its true name is known only to a few, for it is said to speak it invites its attention and, therefore, madness. The Unspeakable One is a force of priMaw of Vhoka is a ghostly toothed maw, appearing out of nowhere to savagely bite at a target chosen by the caster, then vanishing. If the Maw fails to strike, it tries again, up to three times before vanishing. Some versions of the spell are Penetrating, as well. (Ranged Damage (bite), Homing 3 • 3 points +2 points per rank)"
      },
      {
        "id": "prof_magic_powers_vile_venom",
        "name": "Vile Venom",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Points per rank Vile Venom of Vhoka is a deadly toxin that saps a victim's strength and can eventually kill them. At below Strength -5, the victim is paralyzed and begins losing Stamina instead. Below Stamina -5, the victim dies. (Weaken Strength, Progressive, Variable Descriptor (Weakens Stamina after Strength reaches 0) • 1 point + 3 points per rank)"
      },
      {
        "id": "prof_magic_powers_ward_of_weyan",
        "name": "Ward of Weyan",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Creatures of Chaos"
          }
        ],
        "notes": "Perfecting things, or for the tremendous power contained in the wheels he makes and puts into motion. Unlike, Lamal, however, Weyan is less concerned with matters of justice, and magicians wield his power for their own purposes. Ward of Weyan (not to be confused with the Wheel of Warding, the Third Wheel of Weyan) is a dictum of law, warding off all creatures of chaos and disorder. (Burst Area Progressive Affliction (Resisted and Overcome by Will; Entranced, Compelled, Controlled), Limited to Creatures of Chaos, Limited to Forcing Targets Away from Area • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_chant_of_chaos",
        "name": "Chant of Chaos",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Madness to all. A few with a slightly stronger grip on their sanity seek to use the Unspeakable One's power for their own purposes, but they constantly risk falling deeper into a psychic abyss from which there is no return. Chant of Chaos is a rising and falling chant in an alien tongue, the very sound of which is maddening. Continuing the chant gives the spell its cumulative effect. (Cumulative Hearing Area Affliction (Resisted and Overcome by Will; Entranced, Compelled, Transformed) • 3 points per rank)"
      },
      {
        "id": "prof_magic_powers_unspeakable_summoning",
        "name": "Unspeakable Summoning",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Unspeakable Summoning calls up a preternatural creature from the Unspeakable One's realm to serve the sorcerer. Use the Brute Demon (Gamemaster's Guide, page 137) as a starting archetype. (Summon Unspeakable Servitor 7, Heroic • 28 points)"
      },
      {
        "id": "prof_magic_powers_the_yellow_sign",
        "name": "The Yellow Sign",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "area_perception",
            "name": "Area (Perception)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Yellow Sign is the most infamous rite of the Unspeakable One, a sigil able to induce madness in those who see it. (Perception Area Progressive Affliction (Resisted and Overcome by Will; Entranced, Compelled, Transformed) • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_dance_of_vhoka",
        "name": "Dance of Vhoka",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Normal damage capabilities, the base traits of a construct (including Immunity to Fortitude and Will effects), Flight 1, and skill in wielding itself equal to the power level minus the weapon's effect rank. Take the weapon's cost in power points or equipment points, add the cost of its attack ranks (power level - effect rank) + 2 points for Flight to get its minion cost. (Summon Animated Weapon, Active, Controlled, General Type, Ranged • 6 points per rank)"
      },
      {
        "id": "prof_magic_powers_wondrous_working_of_weyan",
        "name": "Wondrous Working of Weyan",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Magic, Psychic backlash, see description",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Spell fails to work, the caster suffers psychic backlash, making a Will resistance check against a Damage effect equal to the rank of the highest affected magic trait. (Burst Area Weaken Magic, Affects Objects, Broad, Concentration, Simultaneous, Side Effect (psychic backlash, see description) • 5 points per rank)"
      },
      {
        "id": "prof_magic_powers_curse_of_yig",
        "name": "Curse of Yig",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Serpentine characteristics and call on him for magic dealing with serpents, venom, and similar such things. Curse of Yig brings the wrath of the reptile kingdom down upon the victim. It summons forth children of the Father of Serpents, typically poisonous vipers (Gamemaster's Guide, page 135). (Summon Snakes 3 (37-point minions), Multiple Minions 4 (16 snakes) • 18 points + 6 points per additional)"
      },
      {
        "id": "prof_magic_powers_fangs_of_yig",
        "name": "Fangs of Yig",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Doubling of minions. Fangs of Yig give the magician a poisonous touch. A single use may be enough to render an ordinary human completely paralyzed. (Affliction (Resisted and Overcome by Fortitude; Dazed, Disabled, Paralyzed), Progressive • 3 points per rank)"
      },
      {
        "id": "prof_magic_powers_yig_s_inexorable_transformation",
        "name": "Yig’s Inexorable Transformation",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Yig's Inexorable Transformation turns a humanoid victim into a savage Serpent Person. The victim receives one resistance check each day. After three failed checks, the victim is transformed into a Serpent Person. (Affliction (Resisted and Overcome by Will; Transformed), Progressive, Limited Degree, Limited to One Stage per Day • 1 point per rank)"
      },
      {
        "id": "prof_magic_powers_second_wheel_of_weyan",
        "name": "Second Wheel of Weyan",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Magic, Visual",
        "extras": [],
        "flaws": [],
        "notes": "Second Wheel of Weyan, or the Wheel of Watching, opens a circular \"window\" through which the magician can scry. The Wheel of Watching only provides visions of distant places; it does not transmit sound or other sensory impressions. Some verions of the spell add the Dimensional modifier as well. (Remote Sensing (Visual) • 2 points per rank The Third Wheel of Weyan, or the Wheel of Warding, can deflect and reflect attacks.)"
      },
      {
        "id": "prof_magic_powers_third_wheel_of_weyan",
        "name": "Third Wheel of Weyan",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [],
        "notes": "Per rank The Third Wheel of Weyan, or the Wheel of Warding, can deflect and reflect attacks. (Deflect, Reflect • 2 points per rank The Fourth Wheel of Weyan, or the Wheel of the Winds, can create powerful wind gusts at the caster's command.)"
      },
      {
        "id": "prof_magic_powers_fourth_wheel_of_weyan",
        "name": "Fourth Wheel of Weyan",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Magic, Mystical",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Pushing"
          }
        ],
        "notes": "Fourth Wheel of Weyan, or the Wheel of the Winds, can create powerful wind gusts at the caster's command. (Perception Ranged Move Object, Limited to Pushing • 2 points per rank)"
      },
      {
        "id": "prof_magic_powers_fifth_wheel_of_weyan",
        "name": "Fifth Wheel of Weyan",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magic, Incapacitated",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Fifth Wheel of Weyan, or the Wheel of Waiting, can actually stop time in a limited area. An advanced version of the spell adds Selective to the effect. (Burst Area Affliction (Incapacitated), Affects Objects, Progressive, Sustained, Instant Recovery, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_magic_powers_sixth_wheel_of_weyan",
        "name": "Sixth Wheel of Weyan",
        "rank": 10,
        "effectId": "communication",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Magic, Air and auditory",
        "extras": [],
        "flaws": [],
        "notes": "Sixth Wheel of Weyan, or the Wheel of Whispers, carries the magician's words over great distances. (Communication (air and auditory) • 4 points per rank)"
      },
      {
        "id": "prof_magic_powers_seventh_wheel_of_weyan",
        "name": "Seventh Wheel of Weyan",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magic, Dimensional 2 - Mystic Dimensions",
        "extras": [
          {
            "id": "portal",
            "name": "Portal",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Seventh Wheel of Weyan, or the Wheel of Worlds, opens wheel-shaped gateways between dimensions. (Movement 2 (Dimensional 2 - Mystic Dimensions), Portal • 8 points)"
      }
    ]
  },
  {
    "category": "Magnetic Powers",
    "profiles": [
      {
        "id": "prof_magnetic_powers_magnetic_binding",
        "name": "Magnetic Binding",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magnetic, Metal",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "A powerful magnetic field seizes and holds your target in place. A variant of this power uses magnetically controlled metal as a medium to bind the target, changing the check to overcome the Affliction to Damage and adding the Quirk: requires metal (-1 point). (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Strength; Hindered and Vulnerable, Defenseless and Immobile), Extra Condition, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_blast",
        "name": "Magnetic Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magnetic, Magnetic force",
        "extras": [],
        "flaws": [],
        "notes": "A focused blast of magnetic force strikes your target. (Ranged Damage (magnetic force) • 2 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_repulsion",
        "name": "Magnetic Repulsion",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Flinging Targets Away"
          }
        ],
        "notes": "A matched magnetic charge flings a target away from you. Targets can make a Strength resistance check against your effect rank + 10; success means no effect, but failure flings the target a distance rank of effect rank minus the target's mass rank. Apply the Burst Area and Close Range modifiers and all targets within 30 feet of you are flung away. (Move Object, Limited to Flinging Targets Away • 1 point per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_seizure",
        "name": "Magnetic Seizure",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Magnetic, Metal",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "You create an intense magnetic field that \"shorts out\" the electrical activity of your target's brain, causing a momentary seizure. (Perception Ranged Affliction (Resisted and Overcome by Will; Dazed, Stunned, Incapacitated), Subtle • 1 point + 3 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_railgun",
        "name": "Railgun",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magnetic, Projectile",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "requires objects as ammo, -1 point"
          }
        ],
        "notes": "You magnetically accelerate a small metal projectile to the speed of a bullet, launching it at your target. (Ranged Damage (projectile), Quirk (requires objects as ammo, -1 point) • 1 point for rank 1 + 2 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_deflection",
        "name": "Magnetic Deflection",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Magnetic, Metal",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Metallic Attacks"
          }
        ],
        "notes": "You can use magnetic fields to change the course of attacks by ferrous metal projectiles or weapons. (Perception Ranged Deflect, Limited to Metallic Attacks • 1 point per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_immunity",
        "name": "Magnetic Immunity",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Magnetic effects",
        "extras": [],
        "flaws": [],
        "notes": "Control over magnetism renders you immune to its effects, including those that normally do affect targets of your type (such as Magnetic Seizure or Magnetic Blast). (Immunity 5 (magnetic effects) • 5 points)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_shield",
        "name": "Magnetic Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "A shield of magnetic force surrounds your body, protecting you from harm. Like other forms of Protection, this power may be Impervious, perhaps even Impervious with the Limit Only Against Magnetic Attacks (reducing the cost of the Impervious modifier to 1 point per 2 ranks). A variant of this power temporarily assembles armor by shaping and molding metal around the character's body, holding it in place (and perhaps reinforcing it) with a powerful magnetic field. (Protection, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_cling",
        "name": "Magnetic Cling",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magnetic, Wall-Crawling",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Only Magnetic Surfaces, -1 point"
          }
        ],
        "notes": "Magnetizing your hands and feet, you can cling to ferrometallic surfaces, or even to the façades of buildings with steel superstructures (attracting the metal underneath). (Movement (Wall-Crawling), Quirk (Only Magnetic Surfaces, -1 point) • 1 point (rank 1) or 3 points)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_flight",
        "name": "Magnetic Flight",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magnetic, Metal",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "Concentrations of ferrous metals; for most series, this should be considered a Power Loss complication, unless adventures outside of a city environment are particularly common (at least half the time). Another variant of this power involves levitating a metallic object upon which the character stands, applying the Platform modifier to the effect. (Flight, Subtle • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_levitation",
        "name": "Magnetic Levitation",
        "rank": 3,
        "effectId": "speed",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "Although you cannot fly (see Magnetic Flight, previously) you can use magnetism to levitate a short distance off the ground-less than a foot-and impel you forward, like a maglev or \"bullet\" train, skimming at high speed along the ground and even over liquid surfaces. (Movement 3 (Sure-Footed, Trackless, Water Walking), Speed • 6 points + 1 point per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnoport",
        "name": "Magnoport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "You convert your body mass into a magnetic field and \"transmit\" it along the magnetic lines of force surrounding the Earth to reform elsewhere. Since you can only magnoport within a sufficiently strong planetary magnetic field, you may earn a Power Loss complication in circumstances where you cannot (such as in the depths of space or in an alien dimension). Earth's magnetic field is too ubiquitous to qualify for the Medium modifier of Teleport. (Teleport • 2 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_degauss",
        "name": "Degauss",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "You suspend or remove magnetism from a subject. Just as objects do not recover from losses in Toughness (Deluxe Hero's Handbook, page 244) the GM may rule that some magnets, once degaussed, remain so unless they are re-magnetized. Magnetic powers are temporarily nullified, but can recover. Degaussing also destroys magnetic storage media, such as audio and video tape or some types of magnetic computer disk drives, wiping out the stored information and leaving them blank. (Nullify Magnetism, Simultaneous • 2 points per rank A common variant of this power is a Degauss Burst or Ray, affecting all targets in a radius or a cone-shaped area. If the burst or cone originates from you, apply the Close Ranged flaw, keeping cost at 2 points per rank.)"
      },
      {
        "id": "prof_magnetic_powers_degauss_burst",
        "name": "Degauss Burst",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Magnetic, Metal",
        "extras": [
          {
            "id": "area_cone",
            "name": "Area (Cone 60ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A common variant of this power is a Degauss Burst or Ray, affecting all targets in a radius or a cone-shaped area. If the burst or cone originates from you, apply the Close Ranged flaw, keeping cost at 2 points per rank. (Nullify Magnetism, Simultaneous, Burst or Cone Area • 3 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_ferrokinesis",
        "name": "Ferrokinesis",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Ferrous Metals"
          }
        ],
        "notes": "This is the most common magnetic power: you can use magnetic fields to lift and move ferrous objects at a distance without touching them. As mentioned under Magnetic Descriptors, this power is often Subtle (magnetic fields being invisible to normal vision). Ferrokinesis normally only allows you to lift objects and move them around (or \"throw\" them). The Damaging modifier also allows you to use magnetic force to crush them, exerting your rank in Damage against the object's Toughness. A common power stunt for ferrokinetics is an Alternate Effect that drops the Limited to Ferrous Materials modifier to work on living targets by using the trace amounts of iron found in blood hemoglobin. (Perception Ranged Move Object, Limited to Ferrous Metals • 2 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetize",
        "name": "Magnetize",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magnetic, Attract or Repel",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Ferrous Metals"
          }
        ],
        "notes": "By creating a powerful magnetic field, you magnetize all of the ferrometallic objects in an area, causing them to attract each other and any nearby magnetic materials. The rank of the effect determines the Strength of the magnetic pull in terms of moving objects. This can stick objects in place or bury them underneath a pile of metallic debris. (Burst Area Move Object, Limited to Ferrous Metals, One Direction (Attract or Repel) • 1 point per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_encoding",
        "name": "Magnetic Encoding",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Machines",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Encoding Information"
          }
        ],
        "notes": "Very precise control over magnetic fields, you can encode information onto magnetic media like audio or video tape or computer disks as if using an encoding device (recorder or computer, for example). This allows you to do things like \"dictate\" text into computer files or produce audio-visual recordings of things you see and hear. Once created, this information exists on the medium like any other and can be manipulated, edited, or erased normally. (Comprehend 2 (Machines), Limited to Encoding Information • 2 points)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_form",
        "name": "Magnetic Form",
        "rank": 4,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Magnetic, All Visual",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Ferrous Metals"
          }
        ],
        "notes": "You transform from flesh and blood into a being of pure magnetism, an intelligent and mobile magnetic field in the shape of a person, essentially. You are invisible to normal vision-although powers like Magnetic Sense can detect you-and able to pass through most solid objects, unless they are specifically shielded against magnetism. You can still \"touch\" and manipulate ferrous metals using your magnetic field, but cannot otherwise interact with the material world. This form often includes magnetic sensory powers (Magnetic Radar, Sense, or Scan) but does not require them. It essentially includes 1 rank each of Ferrokinesis and Magnetic Flight and you can add additional ranks normally. (Concealment 4 (All Visual), Flight 1, Immunity 10 (Life Support), Insubstantial 4 (Incorporeal), Move Object 1 (Limited to Ferrous Metals) • 41 points)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_interference",
        "name": "Magnetic Interference",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Magnetic, All magnetic and radio",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create a powerful magnetic field that interferes with radio communication, radar, and magnetic navigation (via compass). (Burst Area Ranged Concealment Attack 2 (all magnetic and radio) • 8 points, +1 point per +1)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_radar",
        "name": "Magnetic Radar",
        "rank": 5,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "Emitting pulses of magnetic energy that \"ping\" off of nearby objects, you can form a picture of your surroundings, allowing you to know the locations and positions of things without having to see them. (Senses 5 (magnetic; Detect Objects, Accurate, Radius, Ranged) • 5 points)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_reading",
        "name": "Magnetic Reading",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Machines",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Reading Information"
          }
        ],
        "notes": "You can \"read\" encoded magnetic information from various media (audio and video tape, computer disks, even encoded magnetic strips on credit cards) as if you possessed an appropriate reader or player. If you have both this power and Magnetic Encoding (previously), you have both halves of the full Comprehend Machines effect, essentially removing the Limited flaw. (Comprehend 2 (Machines), Limited to Reading Information • 2 points)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_sense",
        "name": "Magnetic Sense",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Detect Magnetic Fields, Radius",
        "extras": [],
        "flaws": [],
        "notes": "You can detect nearby magnetic fields. Add the Acute option if you can sense their relative strength and Analytical if you can sense their exact wavelength like a sophisticated scientific instrument. If you can use this sense to target other effects, add the Accurate option. (Senses 2 (Detect Magnetic Fields, Radius) • 3 points, +1 point for Acute, +1 additional point for Analytical,)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_scan",
        "name": "Magnetic Scan",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Vision Penetrates Concealment",
        "extras": [],
        "flaws": [],
        "notes": "Magnetic waves penetrate objects, providing information about their interior like a magnetic resonance imaging (MRI) scan. This allows you to \"see\" inside of objects and through solid obstacles. (Senses 4 (Vision Penetrates Concealment) • 4 points)"
      },
      {
        "id": "prof_magnetic_powers_shape_metal",
        "name": "Shape Metal",
        "rank": 10,
        "effectId": "transform",
        "action": "Standard",
        "range": "Close",
        "duration": "Continuous",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "Precise magnetic fields allow you to bend and reshape metal, sculpting it however you wish as if you had very precise tools. Reshaped metal remains in its new form unless reshaped by another effect. You can sculpt up to your rank -6 mass rank of metal at one time, so reshaping a larger mass of metal can take longer; add the time rank you work to the effect rank and subtract 6 to determine total mass rank of metal shaped, such as Shape Metal 2 plus an hour's work (time rank 9) - 6, for a total mass rank of 5, or 1,600 lbs. of metal. This is a descriptor-based bending of the normal guideline of having Transform affect all of an object or none of it. (Transform (ferrous metal from one shape to another), Continuous • 3 points per rank)"
      },
      {
        "id": "prof_magnetic_powers_magnetic",
        "name": "Magnetic (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "A magnetic field is an energy field that exerts influence over ferromagnetic materials and (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_ferrous",
        "name": "Ferrous (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "Magnetism affects only ferrous or ferromagnetic metals, those with a sufficient quantity of (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_manhole_cover",
        "name": "Manhole cover (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "mass rank 1 (about 100 lbs.) • Lamp post: a 10 foot iron or steel lamp post (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_girder",
        "name": "Girder (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "about 22 lbs. per foot of length, so a 10 foot I-beam is mass rank 3 (between 200 (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_mid_size_car",
        "name": "Mid-size car (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "mass rank 6 (between 3,200 and 6,000 lbs.) +1 rank for a pickup or SUV. (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_shipping_container",
        "name": "Shipping container (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "mass rank 7 (between 6,000 and 12,000 lbs.) (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_suspension_bridge",
        "name": "Suspension bridge (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "mass rank 20 (between 12,000 and 25,000 tons). (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_minor_ferrokinesis",
        "name": "Minor Ferrokinesis (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "You can generate a strong enough magnetic field to move small (mass rank -5 (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_minor_magnetize",
        "name": "Minor Magnetize (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "You can magnetize a small (handsized) ferrous object of mass rank -5 or less by (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_magnetic_manipulation",
        "name": "Magnetic Manipulation (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "You can use magnetic fields to turn or operate small metal fasteners (Feature • 1 point)"
      },
      {
        "id": "prof_magnetic_powers_true_north",
        "name": "True North (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Magnetic, Metal",
        "extras": [],
        "flaws": [],
        "notes": "You have an \"internal compass\" - always able to sense magnetic north on a planet with (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Martial Powers",
    "profiles": [
      {
        "id": "prof_martial_powers_analyze_style",
        "name": "Analyze Style",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Your Attacks"
          }
        ],
        "notes": "By observing and analyzing a foe's fighting style and technique, you can find weaknesses you can exploit to your advantage. If the target fails to resist, you gain an advantage due to the drop in the target's active defenses until the target manages to cover the opening by realizing (through defensive fighting skill) what you are doing. A variant form of this power may impose different conditions, such as Impaired and Disabled. (Perception Ranged Affliction (Resisted and Overcome by Will; Vulnerable, Defenseless), Conditions Limited to Your Attacks, Limited Degree, Insidious, Subtle • 2 points +1 point per rank)"
      },
      {
        "id": "prof_martial_powers_breaking_blow",
        "name": "Breaking Blow",
        "rank": 10,
        "effectId": "damage",
        "action": "Move",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Objects"
          },
          {
            "id": "activation_move",
            "name": "Activation",
            "cost": 1,
            "isFlat": true
          }
        ],
        "notes": "A moment of focused concentration, you can strike \"through\" an object with tremendous force, allowing you to smash wood, or even stone and steel, with your bare hands. You may combine this with a Power Attack maneuver for additional effect. (Strength-based Damage, Penetrating, Limited to Objects, Activation (move action, -1 point) • 1)"
      },
      {
        "id": "prof_martial_powers_chi_strike",
        "name": "Chi Strike",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "You focus your internal energies into a powerful unarmed strike, greater than just your physical strength. This power often has a flaw like Tiring to represent the drain on the wielder's energy. (Strength-based Damage • 1 point per rank)"
      },
      {
        "id": "prof_martial_powers_dim_mak",
        "name": "Dim Mak",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          },
          {
            "id": "reversible",
            "name": "Reversible",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "You have mastered the legendary dim mak, or \"death touch\" attack, allowing you to introduce \"poison chi\" into a target's system that eventually destroys them from within. Progression beyond incapacitated takes the character's condition to dying. Some forms of Dim Mak are also Insidious and Subtle. (Affliction (Resisted and Overcome by Fortitude; Fatigued and Impaired, Disabled and Exhausted, Incapacitated), Extra Condition, Progressive, Reversible • 1 point + 4 points per rank)"
      },
      {
        "id": "prof_martial_powers_ear_boxing",
        "name": "Ear Boxing",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "A double-strike to a target's vulnerable ears provides a distraction. This power is an effective power stunt for Strength Damage for a martial artist faced with an incredibly tough or otherwise invulnerable target. (Affliction (Resisted and Overcome by Will; Dazed and Impaired, Disabled and Stunned), Extra Condition, Limited Degree • 1 point per rank)"
      },
      {
        "id": "prof_martial_powers_ghost_fighting",
        "name": "Ghost Fighting",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [
          {
            "id": "affects_insubstantial",
            "name": "Affects Insubstantial",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "You know esoteric techniques to focus your inner energies to strike ghosts and other incorporeal supernatural beings, where material attacks normally would not. (Strength Damage Affects Insubstantial • 1 point (half Damage rank) or 2 points (full Damage rank).)"
      },
      {
        "id": "prof_martial_powers_kiai_shout",
        "name": "Kiai Shout",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [
          {
            "id": "area_cone",
            "name": "Area (Cone 60ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You have learned the art of kiai, a fierce battle shout, combined with breath control and harnessing your personal energy to produce a variety of effects. The basic kiai shout is intended to rattle and unnerve your opponents, leaving them vulnerable when you attack. (Cone Area Affliction (Resisted and Overcome by Will; Dazed and Vulnerable, Stunned and Defenseless), Extra Condition, Hearing-Dependent, Limited Degree • 1 point)"
      },
      {
        "id": "prof_martial_powers_natural_fighter",
        "name": "Natural Fighter",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "While some gain their fighting talents from years of study and training, others are naturally gifted, or supernaturally gifted, gaining some advantages from esoteric arts, the blessings of higher (or lower) powers, mystical insights, and so forth. (Enhanced Advantage • 1 point per rank)"
      },
      {
        "id": "prof_martial_powers_catfall",
        "name": "Catfall",
        "rank": 1,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Martial, Instant Up",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "distance rank 0"
          }
        ],
        "notes": "Training and technique allow you to easily land on your feet after a fall and to twist, tumble, and roll so you suffer no harm in the process. (Enhanced Advantage 1 (Instant Up), Movement 1 (Safe Fall), Limited to distance rank 0 • 2 points)"
      },
      {
        "id": "prof_martial_powers_counterstrike",
        "name": "Counterstrike",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Martial, When attacked in close combat",
        "extras": [],
        "flaws": [],
        "notes": "Your fighting reflexes are so highly attuned that simply attacking you risks a forceful counterattack. The power's rank is limited to the Damage rank of your normal attack, typically Strength Damage. (Reaction Damage (when attacked in close combat), Attack Check Required • 3 points per rank)"
      },
      {
        "id": "prof_martial_powers_deflecting_projectile",
        "name": "Deflecting Projectile",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "requires a projectile or throwing weapon, -1 point"
          }
        ],
        "notes": "You can block ranged attacks by hitting them with a thrown or launched projectile of your own, from knocking a throwing star out of the air by tossing a pair of chopsticks (or another handy object) to deflecting a bullet by shooting it with one from your own gun, for example. (Deflect, Quirk (requires a projectile or throwing weapon, -1 point) • 1 point for rank 2, +1 point per)"
      },
      {
        "id": "prof_martial_powers_feather_step",
        "name": "Feather Step",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Martial, Trackless, Water-walking",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "solid surfaces"
          }
        ],
        "notes": "You can stand on surfaces that normally would not support your weight, like a thin tree branch, sheet of paper, or the top of snow, without sinking or damaging the surface, and able to move normally. (Movement 2 (Trackless, Water-walking), Limited to solid surfaces • 2 points)"
      },
      {
        "id": "prof_martial_powers_run_up_walls",
        "name": "Run Up Walls",
        "rank": 2,
        "effectId": "movement",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Martial, Wall-crawling",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "one move action"
          }
        ],
        "notes": "You can run short distances up or along vertical surfaces like walls. You can only do so while moving (you cannot stand still on a vertical surface) and only for one move action, after which you must move to a horizontal surface or fall. With an Acrobatics check, you can run up a wall, then kick off and flip over and behind a pursuer to catch them by surprise. Treat this like a use of Agile Feint (Deluxe Hero's Handbook, page 131). (Movement 2 (Wall-crawling), Limited to one move action, Limited to while moving • 1 point.)"
      },
      {
        "id": "prof_martial_powers_wire_fu",
        "name": "Wire-Fu",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "You have superhuman leaping and acrobatic abilities, like the \"wire work\" of characters in martial arts films. Typically this power is fairly automatic, but you might apply the Acrobatics Check Required modifier to lessen its cost. (Leaping • 1 point per rank)"
      },
      {
        "id": "prof_martial_powers_blind_fighting",
        "name": "Blind Fighting",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Martial, Accurate Hearing",
        "extras": [],
        "flaws": [],
        "notes": "You have trained to move and fight without the use of your eyes, allowing you to more easily deal with darkness, blindness, and foes concealed from you in various ways using only your ears. Some users of this technique are truly blind, compensating with this power for their fighting skills. (Senses 2 (Accurate Hearing) • 2 points A slightly less expensive (and cinematic) version of this power is Enhanced Advantage (Precise Attack) for close attacks against concealment. Unlike the full version, it does not affect ranged attacks or awareness of your surroundings, however.)"
      },
      {
        "id": "prof_martial_powers_chi_balance",
        "name": "Chi Balance",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "Manipulating trigger points and meridians and using your own internal energy allows you to balance an align a patient's energies to treat and cure various maladies. Healing modifiers like Energizing, Persistent, and Restorative are common for this power. A Quirk involving the treatment taking at least 10 minutes (making it usable only outside of action time) is also common, worth -2 points. (Healing (chi) • 2 points per rank)"
      },
      {
        "id": "prof_martial_powers_chi_focus",
        "name": "Chi Focus",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "By focusing your internal energy through meditation techniques, you can enhance your abilities in different ways. Common chi focus traits include Strength, Stamina, Agility, and Awareness, along with Fortitude and Will. If you can enhance different traits, but not all at once, make the additional ones Alternate Effects of the first. (Enhanced Trait, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_martial_powers_chi_reading",
        "name": "Chi Reading",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Martial, Detect Chi, Acute, Analytical",
        "extras": [],
        "flaws": [],
        "notes": "You can \"read\" or scan the internal energies of another creature, feeling their degree of health and balance from those energies. Among other things, Chi Reading is useful for diagnosing blockages and other maladies involving a subject's chi. Note that the base power is not ranged, requiring you to examine the subject close up (although you are not required to touch). To read chi from a greater distance, apply an additional rank of Senses for Ranged. (Senses 3 (Detect Chi, Acute, Analytical) • 3 points)"
      },
      {
        "id": "prof_martial_powers_second_wind",
        "name": "Second Wind",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Self"
          }
        ],
        "notes": "Your determination, willpower, and perhaps internal energy allow you to shake off the effects of damage and keep fighting. Once you have used your Second Wind in a conflict, you cannot use it again until you have had an opportunity to rest (\"resetting\" the Trigger modifier). (Healing, Triggered 1 (when suffering two or more degrees of damage), Limited to Self • 1 point + 1 point per rank)"
      },
      {
        "id": "prof_martial_powers_chi",
        "name": "Chi (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "Martial powers are often described as harnessing the internal \"energy\" of spirit, will, or life force, (Feature • 1 point)"
      },
      {
        "id": "prof_martial_powers_martial",
        "name": "Martial (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "Powers with this descriptor are broadly related to fighting, but most typically refer to differ- (Feature • 1 point)"
      },
      {
        "id": "prof_martial_powers_esoteric_style",
        "name": "Esoteric Style (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "You are trained in an especially obscure or secret style of martial arts. Only those fa- (Feature • 1 point)"
      },
      {
        "id": "prof_martial_powers_hands_as_weapons",
        "name": "Hands as Weapons (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "In situations where being armed is important, you are always considered armed, even (Feature • 1 point)"
      },
      {
        "id": "prof_martial_powers_potent_chi",
        "name": "Potent Chi (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Martial, Chi",
        "extras": [],
        "flaws": [],
        "notes": "Your life force is so abundant and focused that you can make it visible to others by concentrat- (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Mental Powers",
    "profiles": [
      {
        "id": "prof_mental_powers_emotion_control",
        "name": "Emotion Control",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Mental, Impaired, Disabled, Incapacitated",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can manipulate the emotions of others, distracting or incapacitating them with anger, sadness, or even peace or joy. The specific emotions are largely descriptors, but the GM might allow slightly different effects, particularly in the application of the impaired and disabled modifiers and at the third degree where, instead of being incapacitated, the target might behave as controlled, acting strongly on that emotion (such as anger or love). (Perception Ranged Cumulative Affliction (Impaired, Disabled, Incapacitated), Resisted and Overcome by Will, Subtle, Variable Descriptor (Emotions) • 2 points + 4)"
      },
      {
        "id": "prof_mental_powers_hallucination",
        "name": "Hallucination",
        "rank": 10,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Mental, All Senses",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "One Subject"
          }
        ],
        "notes": "You seize control of your target's perceptions, creating incredibly realistic hallucinations. Since the illusions exist solely in your target's mind, you can choose who can and cannot perceive them. This power affects all of a subject's senses by default, but may be limited to just some senses, lowering the cost per rank. (Illusion (All Senses), Selective, Limited to One Subject, Resistible by Will • 4 points per rank)"
      },
      {
        "id": "prof_mental_powers_mental_blast",
        "name": "Mental Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Mental, Will",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "You can strike a target's mind with a blast of mental force, causing pain or unconsciousness. Like other mental powers, your Mental Blast only affects targets with minds. (Perception Ranged Damage, Alternate Resistance (Will), Subtle • 1 point + 4 points per rank)"
      },
      {
        "id": "prof_mental_powers_mind_control",
        "name": "Mind Control",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Mental, Dazed, Compelled, Controlled",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Next scene, and only \"restarting the clock\" on overcoming them once things shift into action time again. In some cases, the GM may wish to award players hero points for this as a complication. falling victim to outside control. For \"implanted commands\" or \"post-hypnotic suggestions\" apply the Triggered modifier (possibly as an Alternate Effect or power stunt). (Perception Ranged Cumulative Affliction (Dazed, Compelled, Controlled), Resisted and Overcome by Will, Subtle • 1 point + 4 points per rank)"
      },
      {
        "id": "prof_mental_powers_mind_switch",
        "name": "Mind Switch",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Mental, Transformed",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You \"swap\" minds with the target, placing your mind (and mental traits) in the target's body and the target's mind in your own. (Perception Ranged Cumulative Affliction (Transformed), Resisted and Overcome by Will, Insidious, Subtle, Limited Degree (Third Only), Side Effect (Target's mind controls your body) • 2 points + 2 points per rank)"
      },
      {
        "id": "prof_mental_powers_possession",
        "name": "Possession",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Mental, Dazed,Compelled, Controlled",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Similar to Mind Control, except your physical body disappears, merging with the subject, while your mind controls their body. Physical harm to the subject has no effect on you-although you can no longer control an incapacitated subject. Mental attacks affect your mind rather than the subject's. Possession limited to having to touch the subject has a -2 modifier, while requiring eye contact is a -1 modifier. (Perception Ranged Cumulative Affliction (Dazed,Compelled, Controlled), Resisted and Overcome by Will,Extra: merge with subject, Subtle • 1 point + 5 points per rank)"
      },
      {
        "id": "prof_mental_powers_psychic_vampirism",
        "name": "Psychic Vampirism",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Mental, Fatigued, Exhausted, Incapacitated",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Energizing Only"
          }
        ],
        "notes": "You mentally drain the target's vitality to replenish your own. Some Psychic Vampirism is also Insidious; the target does not feel or notice its effects until incapacitated by it. If the series features lethal damage, then draining targets past incapacitated leaves them dying. Psychic Vampirism able to heal Damage conditions as well as fatigue has a +1 modifier (removing the Limit on Healing). Psychic Vampirism requiring you touch the target has a -2 modifier. (Perception Ranged Cumulative Affliction (Fatigued, Exhausted, Incapacitated), Resisted and Overcome by Will, Subtle, Linked to Healing, Subtle, Limited (Energizing Only), Limited (Self Only) • 2 points + 4 points)"
      },
      {
        "id": "prof_mental_powers_psychic_weapon",
        "name": "Psychic Weapon",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Mental, Will",
        "extras": [],
        "flaws": [],
        "notes": "You form a close combat weapon out of visible psychic energy. It attacks the target's mind or spirit rather than body, ignoring physical protection, but also having no effect on physical objects. Use your close combat modifier to attack with your Psychic Weapon against a difficulty based on your target's Parry defense. (Damage, Alternate Resistance (Will) • 2 points per rank)"
      },
      {
        "id": "prof_mental_powers_mental_invisibility",
        "name": "Mental Invisibility",
        "rank": 10,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Mental, All Senses",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Minds"
          }
        ],
        "notes": "You cloud the minds of others, rendering them unable to perceive you, although the particularly strong-willed can overcome the effect. Some forms of Mental Invisibility provide less than complete concealment; reduce the effect rank to reflect the senses not affected. (Concealment 10 (All Senses), Limited to Minds, Resistible by Will (DC 20) • 5 points +1 point per +1 to)"
      },
      {
        "id": "prof_mental_powers_mind_shield",
        "name": "Mind Shield",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Mental, Will",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Mental Powers"
          }
        ],
        "notes": "You possess a mental \"shield\" protecting your mind from outside influences. Because it is sustained, you can perform power stunts with your mind shield, including setting a Mind Trap (following) or \"extending\" your shield, an Alternate Effect applying Area and Affects Others, granting a lesser Will bonus to others over an area. (Enhanced Defense (Will), Impervious, Limited to Mental Powers, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_mental_powers_mind_trap",
        "name": "Mind Trap",
        "rank": 10,
        "effectId": "blast",
        "action": "Reaction",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Mental, Will",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "the source of the mental power"
          }
        ],
        "notes": "Anyone intruding in your mind is in for a nasty shock! You instinctively lash out with a Mental Blast against anyone contacting your mind against your will. Because the power's reaction is making a Will check, mental powers used on you willingly (where you choose to forego your resistance check) do not trigger the Mind Trap. Some Mind Traps react with attacks other than Mental Blast, substitute the appropriate offensive mental power for the Damage effect in the Mind Trap power. (Perception Ranged Damage, Alternate Resistance (Will), Reaction (When you make a Will resistance check against a mental power), Subtle, Limited to the source of the mental power • 1 point + 6 points per rank)"
      },
      {
        "id": "prof_mental_powers_predictive_defense",
        "name": "Predictive Defense",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Mental, Dodge and Parry",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "not against opponents Immune to Mental Powers, -2 points"
          }
        ],
        "notes": "You can telepathically \"read\" opponents sufficiently to anticipate and avoid their attacks, giving you a bonus to your active defenses. The value of the Quirk is based on opponents immune to mental powers being relatively rare. If they're particularly common, the Quirk may qualify as a Limit. If they're less common, treat it as an occasional Power Loss complication. (Enhanced Defenses (Dodge and Parry), Quirk (not against opponents Immune to Mental Powers, -2 points) • 2 points for the first 2 ranks, +2 points per)"
      },
      {
        "id": "prof_mental_powers_astral_projection",
        "name": "Astral Projection",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Mental, Visual, Aural, and Mental",
        "extras": [],
        "flaws": [],
        "notes": "You can separate your astral body-a vessel of your mind and spirit-from your physical body. Your astral form is largely undetectable: subjects you observe may sense a \"presence\" with an Insight check (DC 10 + your effect rank). It is unimpeded by physical barriers and can move anywhere within your range in an instant as a move action. Rank 21 is sufficient for your astral form to go anywhere on Earth. If your astral form can also visit other dimensions, apply the Dimensional modifier to it (Deluxe Hero's Handbook, page 192) based on the number of dimensions. You can use perception ranged effects while in your astral form and be affected by visual, aural, and mental sensory effects. (Remote Sensing (Visual, Aural, and Mental), Side-Effect (physical body is defenseless and immobile, -2) • 2 points per rank)"
      },
      {
        "id": "prof_mental_powers_aura_reading",
        "name": "Aura Reading",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Mental, Psionic",
        "extras": [],
        "flaws": [],
        "notes": "You can perceive the psychic auras of other minds, visible as faint haloes of colored light around their physical forms. A subject's aura gives you a general idea as to their emotional state and physical health. More capable aura readers may have Acute or Analytical effects to gain much more detail. At the GM's discretion, successfully reading a subject's aura grants a circumstance modifier for interaction skills checks, particularly Insight. (Senses 3 (Detect Emotional and Physical State, Ranged), visual and mental • 4 points)"
      },
      {
        "id": "prof_mental_powers_clairvoyance",
        "name": "Clairvoyance",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Mental, Visual",
        "extras": [],
        "flaws": [],
        "notes": "You can shift your senses away from your physical body, perceiving distant locations as if you were there. Clairvoyance is the displacement of visual senses, clairaudience the displacement of auditory senses, and clairsentience the general displacement of all your senses. (Remote Sensing (Visual) • 2 points per rank)"
      },
      {
        "id": "prof_mental_powers_clairaudience",
        "name": "Clairaudience",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Mental, Auditory",
        "extras": [],
        "flaws": [],
        "notes": "Clairaudience power from Mental Powers. (Remote Sensing (Auditory) • 1 point per rank)"
      },
      {
        "id": "prof_mental_powers_clairsentience",
        "name": "Clairsentience",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Mental, All Senses",
        "extras": [],
        "flaws": [],
        "notes": "Clairsentience power from Mental Powers. (Remote Sensing (All Senses) • 5 points per rank)"
      },
      {
        "id": "prof_mental_powers_empathy",
        "name": "Empathy",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Mental, Detect Emotion, Acute, Ranged",
        "extras": [],
        "flaws": [],
        "notes": "You can sense the emotions (but not thoughts) of other minds. Use the Insight skill in place of Perception with this sensory effect. As with Aura Reading, a successful use of Empathy may grant you a circumstance bonus on other interaction skill checks, including other uses of Insight. More capable empaths may have the Analytical effect as well, giving them even more information. In situations where subject attempt to conceal their true feelings, the GM may call for an opposed Insight check, giving the empath a circumstance bonus for a successful initial Insight check. (Senses 3 (Detect Emotion, Acute, Ranged) • 3 points per rank)"
      },
      {
        "id": "prof_mental_powers_knowledge_transplant",
        "name": "Knowledge Transplant",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Mental, Enhanced Skills and Languages",
        "extras": [
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Intellect skills"
          }
        ],
        "notes": "You can \"borrow\" a skill from someone else's mind, temporarily using it as your own or granting it to someone else. The \"borrowed\" skill lasts as long as you maintain the mental connection. Two ranks is sufficient to grant up to 20 ranks in any one skill, or temporarily \"teach\" a whole team a new language, for example. This power makes a useful power stunt for telepath as well. (Variable (Enhanced Skills and Languages), Affects Others, Free Action, Limited to Intellect skills, Limited to subject's skill rank, Perception Range, SenseDependent (mental contact with subjects) • 9 points per rank)"
      },
      {
        "id": "prof_mental_powers_mental_communication",
        "name": "Mental Communication",
        "rank": 10,
        "effectId": "communication",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Mental, Mental",
        "extras": [],
        "flaws": [],
        "notes": "You can communicate directly, mind-to-mind, with anyone in your range. The \"receiver\" for your communication is having a mind (see Mental Descriptors). Mindless subjects and those Immune to Mental Powers cannot receive your communication. Unlike Mind Reading (following) Mental Communication is language-dependent; you must share a language in common with your subject in order to communicate unless you also have a power like Telepathic Translation. Since Communication is a free action to use and maintain, you can set up a Mental Communication \"network\" with multiple minds in a single round, so long as they are all within your range, functioning as a \"mental switchboard\" for group telepathic communication. (Communication (Mental) • 4 points per rank)"
      },
      {
        "id": "prof_mental_powers_mental_awareness",
        "name": "Mental Awareness",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Mental, Awareness, Mental",
        "extras": [],
        "flaws": [],
        "notes": "You are aware of mental sensory effects used in your presence, so long as they are not Subtle. Those lacking mental awareness do not notice mental sensory effects unless they are the subject. Apply other Senses effects to extend the capabilities of your Mental Awareness. (Senses 1 (Awareness, Mental) • 1 point)"
      },
      {
        "id": "prof_mental_powers_minds",
        "name": "Minds (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Mental, Psionic",
        "extras": [],
        "flaws": [],
        "notes": "Mental powers generally involve mental sensory effects or Will-resisted effects which target (Feature • 1 point)"
      },
      {
        "id": "prof_mental_powers_subtlety",
        "name": "Subtlety (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Mental, Psionic",
        "extras": [],
        "flaws": [],
        "notes": "Note that instant, concentration, and sustained effects of mental powers are noticeable by (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Meta Powers",
    "profiles": [
      {
        "id": "prof_meta_powers_mental_detection",
        "name": "Mental Detection",
        "rank": 5,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You can detect the presence of other minds, whether you can perceive them with your physical senses or not. With the Acute modifier you can distinguish and identify individuals and, with the Accurate modifier, you can target perception ranged effects at minds you detect. Your Perception checks for Mental Detection still have the normal -1 per 10 feet between you and the subject, unless the sense is also Extended. (Senses 5 (Detect Minds, Ranged, Acute, Accurate) • 5 points)"
      },
      {
        "id": "prof_meta_powers_mind_reading",
        "name": "Mind Reading",
        "rank": 10,
        "effectId": "mind_reading",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You can read a target's thoughts and probe memories or even plumb their subconscious for information. Note that reading a subject's mind at the surface thoughts level allows them to mentally communicate to you (regardless of language) simply by thinking messages \"at\" you. (Mind Reading • 2 points per rank)"
      },
      {
        "id": "prof_meta_powers_sensory_link",
        "name": "Sensory Link",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, All Senses",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Subjects of Mental Communication or Mind Reading"
          }
        ],
        "notes": "You perceive whatever a subject you are in mental contact with perceives, at the same time they do. The Sense Dependent flaw in this instance means the effect is dependent on your subject's senses; anything affecting them limits your ability to sense through them. (Remote Sensing (All Senses), Limited to Subjects of Mental Communication or Mind Reading, Sense Dependent • 3 points per rank)"
      },
      {
        "id": "prof_meta_powers_telepathic_translation",
        "name": "Telepathic Translation",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Languages",
        "extras": [
          {
            "id": "area_perception",
            "name": "Area (Perception)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create a telepathic field around you, allowing everyone in the area able to hear you to perceive any linguistic communication in their own language. (Comprehend 3 (Languages), Affects Others, Perception Area (Hearing) • 12 points)"
      },
      {
        "id": "prof_meta_powers_nemesis",
        "name": "Nemesis",
        "rank": 10,
        "effectId": "variable",
        "action": "Move",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Meta, Powers Suited to an Opponent",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Choice of Powers"
          }
        ],
        "notes": "Nemesis is an adaptive power, granting you whatever traits you need to overcome a particular opponent. When you designate an opponent as the power's catalyst and exercise a moment's concentration, your Nemesis power re-allocates, granting you traits designed to target that opponent's weaknesses and protect you from their strengths. Apply the Free Action or Reaction modifiers to allow you to re-allocate your Nemesis power more quickly or in response to a foe's actions. Some characters may have a Power Loss complication associated with their Nemesis power: if they face more than one opponent at a time, their Nemesis power does not work at all! (Variable (Powers Suited to an Opponent), Move Action, Limited Choice of Powers • 7 points per rank)"
      },
      {
        "id": "prof_meta_powers_power_control",
        "name": "Power Control",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Meta, Third only",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You can exert control over a subject's powers, essentially causing them to work at your command. You can turn a power on or off or change how it is being used within the power's normal parameters. You do not control the subject's body, however, so targets retain their normal actions and your ability to target certain powers may be limited. For example, you can turn on a target's laser eye-beams, but not control where the target is looking. On the other hand, you can control a target's indirect or perception-ranged powers to affect anything in their normal range (unless the target chooses to block off the power's targeting senses). (Perception Ranged Cumulative Affliction (Resisted and Overcome by Will; Controlled), Limited Degree (third only), Limited to Controlling Target's Powers • 2 points per rank)"
      },
      {
        "id": "prof_meta_powers_power_nullification",
        "name": "Power Nullification",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You shut down a target's powers, rendering them unusable until the target overcomes your Power Nullification effect. By default, Power Nullification affects any one power of a particular descriptor (see Nullify, Deluxe Hero's Handbook, page 173). You can apply the Broad extra to allow for broader power descriptors, and the Simultaneous extra for the power to nullify all effects of its descriptor at once. (Nullify • 1 point per rank For a Nullification Field, apply the Area, Concentration, and Simultaneous modifiers. You create an area in which all power effects of a particular descriptor are nullified so long as you concentrate. Apply the Sustained modifier if maintaining the Nullification Field is a free action for you, and Broad if it affects a broad descriptor like mutant or technological powers. Note that you can create a Nullification Field anywhere within normal range; if you are limited to creating the field in a radius around yourself, apply the Close Range flaw.)"
      },
      {
        "id": "prof_meta_powers_nullification_field",
        "name": "Nullification Field",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Meta, Power",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Long as you concentrate. Apply the Sustained modifier if maintaining the Nullification Field is a free action for you, and Broad if it affects a broad descriptor like mutant or technological powers. Note that you can create a Nullification Field anywhere within normal range; if you are limited to creating the field in a radius around yourself, apply the Close Range flaw. (Burst Area Nullify, Concentration, Simultaneous • 4 points per rank)"
      },
      {
        "id": "prof_meta_powers_power_theft",
        "name": "Power Theft",
        "rank": 10,
        "effectId": "affliction",
        "action": "Free",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Meta, Powers Lost to Affliction",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Affliction Targets"
          },
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You \"steal\" a target's powers and gain the ability to use those powers yourself on a temporary basis. The standard form of Power Theft requires you to touch the target. You gain powers in direct proportion to the amount the target's powers are weakened, then lose them as the target recovers the weakened power ranks. Certain complications may be associated with Power Theft, particularly taking on some of the target's own complications, either psychological or physical. See MetaComplications for details. (Cumulative Affliction (Resisted and Overcome by Will; Powers Impaired, Powers Disabled, TransformedPowerless); Variable (Powers Lost to Affliction), Free Action, Fades (as target recovers), Limited to Affliction Targets • 9 points per rank)"
      },
      {
        "id": "prof_meta_powers_adaptation",
        "name": "Adaptation",
        "rank": 10,
        "effectId": "variable",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Meta, Powers Suited to a Challenge",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Choice of Powers"
          }
        ],
        "notes": "Pressure and Senses (Darkvision). However, when you encounter a great white shark, your adaptation does not assist you since it is an opponent rather than an environment. If you have the combined abilities of Adaptation and Nemesis, just remove the No Offensive Powers Limit from this power, increasing cost to 9 points per rank and allowing you to adapt to both foes and environments. (Variable (Powers Suited to a Challenge), Reaction, Limited Choice of Powers, Limited (No Offensive Powers) • 8 points per rank)"
      },
      {
        "id": "prof_meta_powers_adaptive_immunity",
        "name": "Adaptive Immunity",
        "rank": 140,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "effects you have experienced at least once"
          }
        ],
        "notes": "You cannot be defeated the same way twice: once you have suffered a particular effect or hazard, you adapt, becoming immune to it. This power is fairly specific, so if you adapt to one character's energy blast Damage, it does not necessarily make you immune to all energy blasts, unless they are Damage with the same descriptors. As in all cases involving effect descriptors, the GM adjudicates the exact applications. Keep track of the various effects to which you have become immune; the GM may require a \"reset\" to your power from time to time, effectively wiping out the list and starting over, as a Power Loss complication. This degree of Immunity may also be limited to GM-controlled characters, at the Gamemaster's discretion. (Immunity 140 (Fortitude, Toughness, and Will Effects), Limited to effects you have experienced at least once • 70 points)"
      },
      {
        "id": "prof_meta_powers_power_defense",
        "name": "Power Defense",
        "rank": 10,
        "effectId": "nullify",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Self"
          }
        ],
        "notes": "You have an automatic resistance to powers used on or against you. When targeted by an effect covered by your Power Defense, first make an opposed check of your power rank against the attacking effect's rank. If you win, the attacking effect is countered and does not affect you. If you lose the opposed check, you still get your normal resistance check against the effect (if any). Power Defense normally applies to any effect of a particular broad descriptor. The GM may require an additional +1 extra if it protects you from all power effects, regardless of descriptor. (Nullify, Broad, Reaction, Close Range, Limited to Self • 3 points per rank)"
      },
      {
        "id": "prof_meta_powers_power_immunity",
        "name": "Power Immunity",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You are immune to certain power effects or descriptorsthey simply have no effect when used on or against you. The cost of Power Immunity is based on how common the power effect or descriptor is, as designated by the GM based on the series. See Immunity on page 165 of the Deluxe Hero's Handbook for examples. (Immunity 2, 5, 10, or 20 • 1 point per rank)"
      },
      {
        "id": "prof_meta_powers_power_seeker",
        "name": "Power-Seeker",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "the Nearest Power Source"
          }
        ],
        "notes": "You have the ability to \"lock on\" to the nearest source of particular powers within your range and instantly transport yourself to that location. Some use Power-Seeker as predators, finding catalysts for their other meta-powers, while other Power-Seekers hunt or track particular types of foes, from demons to aliens. A Power-Seeker may even have an Uncontrolled version of this power, \"jumping\" to a particular power source automatically, with no control over when it happens. (Teleport, Accurate, Extended, Limited to the Nearest Power Source • 3 points per rank)"
      },
      {
        "id": "prof_meta_powers_power_detection",
        "name": "Power Detection",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Meta, Detect Power, Ranged",
        "extras": [],
        "flaws": [],
        "notes": "You can detect the presence of particular powers and their general effects. Additional Senses modificationsincluding Acute, Analytical, and Tracking-can enhance the basic detection ability. (Senses 2 (Detect Power, Ranged) • 2 points per rank)"
      },
      {
        "id": "prof_meta_powers_power_enhancement",
        "name": "Power Enhancement",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Meta, Enhanced Power Ranks and Modifiers",
        "extras": [
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Others"
          }
        ],
        "notes": "You can enhance the powers of others. You essentially have a pool of power points you can allocate to increase effect ranks, add extras, and so forth. In the default version, you must touch the subject you wish to enhance and take a standard action to use your power. Apply the Ranged or Perception Ranged modifiers if you can enhance subjects at a greater distance, and the Move Action or Free Action modifiers if you can do so faster. (Variable (Enhanced Power Ranks and Modifiers), Affects Others, Limited to Others • 7 points per rank)"
      },
      {
        "id": "prof_meta_powers_power_mimicry",
        "name": "Power Mimicry",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Meta, Powers Possessed by Catalyst",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Catalysts in Perception Range"
          }
        ],
        "notes": "You can duplicate the powers of your catalyst, giving yourself the ability to use the same powers with the same effects, modifiers, and ranks. Take a standard action to select a catalyst character you can perceive (or sense with an ability like Power Detection) and re-allocate your Variable points to mimic their powers, up to your available points or their power costs, whichever is less. The powers last while you sustain the Variable effect. Apply the Move Action or Free Action modifiers to allow you to re-allocate your Power Mimicry points more quickly, although you can still only do so once per round. (Variable (Powers Possessed by Catalyst), Limited to Catalysts in Perception Range • 6 points per rank)"
      },
      {
        "id": "prof_meta_powers_meta",
        "name": "Meta (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "\"Meta-\" means \"above\" or \"outside of,\" so meta-powers are powers that alter, control, duplicate, (Feature • 1 point)"
      },
      {
        "id": "prof_meta_powers_catalyst",
        "name": "Catalyst (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "For meta-powers, a catalyst is the source the power reacts to, such as the person whose (Feature • 1 point)"
      },
      {
        "id": "prof_meta_powers_power",
        "name": "Power (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "Meta-powers by their nature affect \"powers,\" making \"power\" a descriptor unto itself. (Feature • 1 point)"
      },
      {
        "id": "prof_meta_powers_animal_mimicry",
        "name": "Animal Mimicry (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You are Limited to mimicking the traits of animals (this often replaces being Limited to (Feature • 1 point)"
      },
      {
        "id": "prof_meta_powers_contact_mimicry",
        "name": "Contact Mimicry (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You must touch a subject in order to mimic them, requiring a successful unarmed (Feature • 1 point)"
      },
      {
        "id": "prof_meta_powers_machine_mimicry",
        "name": "Machine Mimicry (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You are limited to mimicking the traits of machines. If you actually transform into (Feature • 1 point)"
      },
      {
        "id": "prof_meta_powers_material_mimicry",
        "name": "Material Mimicry (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You mimic the properties of different substances. This may require you to touch a (Feature • 1 point)"
      },
      {
        "id": "prof_meta_powers_memento_mimicry",
        "name": "Memento Mimicry (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You mimic others by using objects connected with them, such as personal pos- (Feature • 1 point)"
      },
      {
        "id": "prof_meta_powers_vampiric_mimicry",
        "name": "Vampiric Mimicry (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Meta, Power",
        "extras": [],
        "flaws": [],
        "notes": "You must consume part of the catalyst to mimic them! Typically this is an amount of (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Morphing Powers",
    "profiles": [
      {
        "id": "prof_morphing_powers_serial_super_forms",
        "name": "Serial Super Forms",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Personal",
        "duration": "Continuous",
        "descriptor": "Morphing, Serial Form Traits",
        "extras": [],
        "flaws": [],
        "notes": "Time needed to assume a different form. Typically, you should assign points to a rank of Morph for your new form's appearance, unless you have Morph as a separate effect (again, see the Morphing Powers section). Serial Super Forms is typically Continuous, meaning the form you assume is stable unless your power is countered or you choose to change back. (Variable (Serial Form Traits), Continuous • 8 points per rank)"
      },
      {
        "id": "prof_morphing_powers_skill_download",
        "name": "Skill Download",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Skills and Advantages",
        "extras": [],
        "flaws": [],
        "notes": "You have the ability to \"download\" different skills into your mind, gaining temporary ranks in a skill which you can \"swap out\". This may be a literal skill download, placing a digital \"model\" of the skill into your brain (or a connected computer), or it can represent access to the Akashic Records, race memory, or some \"universal knowledge field\". The action required for your Variable effect is the time needed to swap out existing traits for others; apply the Move Action or Free Action modifiers in order to do it quicker. For a similar power affecting others, see Knowledge Transplant in the Mental Powers section. (Variable (Skills and Advantages) • 7 points per rank)"
      },
      {
        "id": "prof_morphing_powers_skill_mimicry",
        "name": "Skill Mimicry",
        "rank": 10,
        "effectId": "variable",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Physical Skills and Advantages",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Traits Seen in Action"
          }
        ],
        "notes": "You can duplicate the physical skills of others simply by seeing them performed once. For example, after watching a high-wire aerialist, you could perform the same type of acrobatics, and after observing a master martial artist, you could fight in their style at their level of skill. Your mimicked skills are based on your own physical ability ranks, which may make you somewhat less proficient than your catalyst, but never more; if your ability rank is higher, you gain fewer skill ranks, bringing you even with your catalyst's total skill bonus. (Variable (Physical Skills and Advantages), Free Action, Limited to Traits Seen in Action, Limited to Catalyst's Total Bonus • 7 points per rank)"
      },
      {
        "id": "prof_morphing_powers_baneful_transformation",
        "name": "Baneful Transformation",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Morphing, Metamorphic",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You transform a target of your choice into some harmless or helpless form, such as turning them to stone or a tiny animal. Certain transformations may call for different lower degree conditions, while others have Limited Degree (Third Only), having no effect unless or until the subject is fully transformed. If you can choose a range of baneful transformations, apply the Variable Descriptor modifier; +1 point for any related group of forms like animals or inanimate materials, +2 points for any baneful form suiting your power's other descriptors. (Ranged Cumulative Affliction (Resisted and Overcome by Will; Hindered, Stunned, Transformed) • 3 points per rank)"
      },
      {
        "id": "prof_morphing_powers_natural_weapons",
        "name": "Natural Weapons",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You morph your limbs or head to acquire natural weapons like claws, talons, fangs, pincers, or even hammeror bladelike hands. Especially sharp or hard natural weapons may also have the Penetrating modifier. (Strength-based Damage • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_pseudopods",
        "name": "Pseudopods",
        "rank": 10,
        "effectId": "extra_limbs",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You alter your form to produce additional limbs, either jointed or like pseudopods or tentacles. The effect rank determines how many pseudopods you can create and control at once. Apply the Feature Ambidextrous (1 rank) if you can use any of your limbs equally. (Extra Limbs, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_slingshot",
        "name": "Slingshot",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Throwing"
          }
        ],
        "notes": "Using your elastic arm or body, you can create a slingshot to propel an object (or even a teammate) at a target. Add your power's rank to your Strength to fling the object and for determining its effective damage, but not lifting rank. (Enhanced Strength, Limited to Throwing • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_bounceback_attack",
        "name": "Bounceback Attack",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "A moment's concentration, you can cause a physical attack to rebound off your malleable form to hit the attacker. (Deflect, Reflect, Close Range • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_metamorphic_healing",
        "name": "Metamorphic Healing",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Self"
          }
        ],
        "notes": "A moment's concentration, you can shift your body to repair damage done to it. (Healing, Limited to Self • 1 point per rank Some may have largely unconscious metamorphic healing abilities, which work of their own volition, but more slowly than healing damage all at once.)"
      },
      {
        "id": "prof_morphing_powers_metamorphic_regeneration",
        "name": "Metamorphic Regeneration",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "Per rank Some may have largely unconscious metamorphic healing abilities, which work of their own volition, but more slowly than healing damage all at once. (Regeneration • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_flat_form",
        "name": "Flat Form",
        "rank": 4,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Visual",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "One Edge"
          }
        ],
        "notes": "You can flatten your body to become almost two-dimensional (like a thin sheet of paper). You become virtually invisible when seen on edge, able to slip through narrow cracks and openings, and lie flat against walls (perhaps even posing as part of a painting or mural). (Concealment 4 (Visual), Limited to One Edge, Partial; Insubstantial 1, Limited by Width • 6 points)"
      },
      {
        "id": "prof_morphing_powers_malleable_form",
        "name": "Malleable Form",
        "rank": 1,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You render your body malleable and fluid, able to squeeze and flow through small gaps and openings. (Insubstantial 1 • 5 points)"
      },
      {
        "id": "prof_morphing_powers_transformed_toughness",
        "name": "Transformed Toughness",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You can transform your body to toughen it, gaining harder skin, armor, and less vulnerable organs, or perhaps an elastic form able to stretch under pressure and resist damage. (Protection • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_bouncing_ball",
        "name": "Bouncing Ball",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You roll or inflate your form into a bouncing, rubbery ball, or perhaps transform your legs into a spring, allowing you to bounce over considerable distances. (Leaping • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_living_glider",
        "name": "Living Glider",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You stretch and flatten out to become a living glider or parachute, allowing you to glide from a height, possibly carrying your Strength rank in weight slung beneath you. If you're solely limited to a parachute-like form (falling almost straight down, with little control over your direction), change Flight to the Movement 1 (Safe Fall) effect. (Flight, Gliding • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_living_trampoline",
        "name": "Living Trampoline",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Safe Fall",
        "extras": [
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You morph and stretch into a living trampoline, able to break someone's fall. Note that Insubstantial 1 includes a version of this ability, allowing you to subtract your Toughness from the target's falling damage, with you and the target resisting the remaining damage rank (if any). This version eliminates any chance of damage. (Movement 1 (Safe Fall), Affects Others • 3 points)"
      },
      {
        "id": "prof_morphing_powers_stretching_stride",
        "name": "Stretching Stride",
        "rank": 10,
        "effectId": "speed",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You elongate your legs like stilts to cover great distances with each stride. Generally, this is limited to no more than 3 or 4 ranks. (Speed • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_swinging_arms",
        "name": "Swinging Arms",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Swinging",
        "extras": [],
        "flaws": [],
        "notes": "You can elongate your arms, allowing you to swing from them as if they were extended swing-lines. (Movement 1 (Swinging) • 2 points)"
      },
      {
        "id": "prof_morphing_powers_wings",
        "name": "Wings",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You transform to gain wings (possibly modifying your arms), allowing you to fly. (Flight, Wings • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_extended_eyes",
        "name": "Extended Eyes",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Morphing, Visual",
        "extras": [],
        "flaws": [],
        "notes": "You extend your eyes out to peer around corners or over obstacles while the rest of you remains hidden. This power is rarely more than 2-3 ranks, enough range to extend well over 100 feet. You may also be able to extend your ears in a similar fashion (adding 1 point per rank to the cost). (Remote Sensing (Visual) • 2 points per rank)"
      },
      {
        "id": "prof_morphing_powers_fingertip_lockpick",
        "name": "Fingertip Lockpick",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "You extend a finger into a mechanical lock and morph it to match the interior of the mechanism, forming a key to open it. (Feature (+10 circumstance bonus to Technology checks to pick mechanical locks) • 1 point per rank)"
      },
      {
        "id": "prof_morphing_powers_metamorphic_minions",
        "name": "Metamorphic Minions",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Morphing, Up to eight minions",
        "extras": [],
        "flaws": [],
        "notes": "You transform bystanders into minions to serve you. This is almost universally a villainous power, given how it usurps the targets' free will and places them in danger. Given that, the transformation of bystanders is a descriptor for the Summon effect rather than focusing on the transformation itself. The key effect of the power is the summoning of minions, while the need for bystanders to transform is largely balanced by the potential complications this poses for the heroes. If you wish, apply a Limit modifier to the power to reflect its need for \"raw materials\". (Summon, Controlled, Horde, Multiple Minions 3 (up to eight minions) • 10 points per rank)"
      },
      {
        "id": "prof_morphing_powers_shapeshift",
        "name": "Shapeshift",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "Options. This is generally a 1-point Quirk. Slow: The opposite of the Action extra, this flaw means the character only changes form outside of action time, typically between scenes. This might reflect a kind of \"form change\" involving reconfiguring components of a machine, for example, or a similar \"refit\" that has to take place in a workshop or lab. (Variable (assumed forms, allocate 5 power points per rank) • 7 points per rank)"
      },
      {
        "id": "prof_morphing_powers_form",
        "name": "Form (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "A \"form\" is generally a specific set of physical traits and a physical appearance. A change in any of (Feature • 1 point)"
      },
      {
        "id": "prof_morphing_powers_physical",
        "name": "Physical (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Morphing, Metamorphic",
        "extras": [],
        "flaws": [],
        "notes": "Morphing powers often refer to a subject's \"physical\" traits. These are traits associated (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Plant Powers",
    "profiles": [
      {
        "id": "prof_plant_powers_control_plants",
        "name": "Control Plants",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Plant, -2",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Plants"
          }
        ],
        "notes": "You can exert control over animate plant creatures (rather than granting animation to normally immobile plants, see Animate Plants). (Perception Ranged Cumulative Affliction (Resisted and Overcome by Will; Dazed, Compelled, Controlled), Limited to Plants (-2), Subtle • 1 point + 2)"
      },
      {
        "id": "prof_plant_powers_internal_flora",
        "name": "Internal Flora",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Plant, Flora",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "By exerting power over the plant-like flora found in the digestive tracts of many animals, you can induce nausea, cramping, and similar unpleasant and potentially incapacitating effects. (Perception Ranged Cumulative Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated), Subtle • 1 point + 4 points per rank)"
      },
      {
        "id": "prof_plant_powers_phytotoxin",
        "name": "Phytotoxin",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Plant, Flora",
        "extras": [
          {
            "id": "secondary_effect",
            "name": "Secondary Effect",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can produce or mimic the effects of plant-based poison. Different phytotoxins may cause different conditions; if you have the power to produce a wide range of toxins, you may have different Alternate Effects, or apply the Variable Conditions modifier (see the Illusion Powers section). For a deadly toxin, substitute Weaken Stamina for the Affliction effect. If you use the Illusions as Affliction option (see the Illusion Powers section) Phytotoxins can cause hallucinations as one of their conditions. This power requires touching the target by default, if you can poison a target at a distance, apply the Ranged modifier. (Affliction (Resisted and Overcome by Fortitude; Impaired, Disabled, Paralyzed), Secondary Effect • 2 points)"
      },
      {
        "id": "prof_plant_powers_pollen_cloud",
        "name": "Pollen Cloud",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Plant, Flora",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You release a cloud of plant-based pollen or spores, creating a biological reaction in your targets. As with Phytotoxin (previously) different combinations of pollens or spores can cause different conditions. A strong pollen cloud may have the Cumulative or even Progressive modifiers. By default, you produce a pollen cloud in all directions around you. If you can create a cloud at a distance (hurling a pod that bursts open on target, for example) apply the Ranged modifier. If you cause plants near or around the targets to emit the cloud, apply the Ranged and Indirect modifiers. (Cloud Area Affliction (Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated) • 2 points)"
      },
      {
        "id": "prof_plant_powers_sap_snare",
        "name": "Sap Snare",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Plant, Flora",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You hurl a blob of sticky, fast-hardening sap at your target, binding them up and sticking them to any surface they are touching. If you create a Sap Snare big enough to trap multiple targets, apply the Burst Area modifier to the power, increasing cost by 1 per rank. If you cause plants near or around the target to emit the snare, apply the Indirect modifier. A sticky Sap Snare may also be Contagious, trapping anyone else touching the victim. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_plant_powers_tanglevines",
        "name": "Tanglevines",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Plant, Flora",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You cause masses of animated vines and similar vegetation to spring up from the ground, wrap around targets and hold them in place. A more precise version of this power applies the Selective modifier, allowing you to only entangle the targets you wish, excluding allies from the effect. (Ranged Burst Area Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Indirect 3, Limited Degree • 3 points + 3 points per rank)"
      },
      {
        "id": "prof_plant_powers_thornskin",
        "name": "Thornskin",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Plant, Piercing",
        "extras": [],
        "flaws": [],
        "notes": "Sharp, woody thorns sprout from your skin, making it dangerous to touch or strike you and causing your unarmed strikes and grabs to inflict additional damage. (Damage (piercing), Reaction (to being touched or struck) • 4 points per rank)"
      },
      {
        "id": "prof_plant_powers_throwing_thorns",
        "name": "Throwing Thorns",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Plant, Piercing",
        "extras": [
          {
            "id": "multiattack",
            "name": "Multiattack",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can fling volleys of sharp thorns at targets. Throwing Thorns may be Linked with a power like Phytotoxin (previously) tipping the thorns with a plant-based poison they introduce into the targets. In this case, the Phytotoxin Affliction must also have the Ranged and Multiattack modifiers. If you cause plants near or around the targets to grow and fling thorns, apply the Indirect modifier. (Ranged Damage (piercing), Multiattack • 3 points per rank)"
      },
      {
        "id": "prof_plant_powers_photosynthesis",
        "name": "Photosynthesis",
        "rank": 1,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Plant, Starvation",
        "extras": [],
        "flaws": [],
        "notes": "Like a plant, you are able to convert light and water into nutrients. You have no need to consume nourishment so long as you are exposed to light. Possessing this power may turn a character's skin green with chlorophyll. (Immunity 1 (starvation) • 1 point)"
      },
      {
        "id": "prof_plant_powers_regrowth",
        "name": "Regrowth",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [],
        "notes": "Like a plant, you can regenerate and regrow, except you do so far faster. Extreme levels of Regrowth may incorporate ranks of Immortality, allowing you to regrow your entire body from nothing more than a single fragment, seed, or shoot. The Source modifier may be appropriate, requiring normal plant growth conditions. (Regeneration • 1 point per rank)"
      },
      {
        "id": "prof_plant_powers_woodskin",
        "name": "Woodskin",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [
          {
            "id": "noticeable",
            "name": "Noticeable",
            "cost": 1,
            "isFlat": true
          }
        ],
        "notes": "Your flesh takes on the hardness and strength of wood while retaining its normal flexibility. If you can transform from ordinary flesh to Woodskin, apply the Sustained modifier. Otherwise, this power is a permanent change. (Protection, Noticeable • 1 point for 2 ranks + 1 point per rank)"
      },
      {
        "id": "prof_plant_powers_brachiation",
        "name": "Brachiation",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Plant, Swinging",
        "extras": [],
        "flaws": [],
        "notes": "You can swing through areas of vegetation, grabbing branches and vines, perhaps even growing them as needed. If you're dependent on areas of heavy vegetation, apply a Limited flaw to the power, reducing its cost to 1 point. (Movement 1 (Swinging) • 2 points)"
      },
      {
        "id": "prof_plant_powers_carrier_vine",
        "name": "Carrier Vine",
        "rank": 1,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [],
        "notes": "You can ride a growing, animated vine or branch that carries or lifts you into the air like a living ladder. A Carrier Vine is typically fairly slow, not good for more than 2-3 ranks at the most. (Flight 1, Platform • 1 point per rank)"
      },
      {
        "id": "prof_plant_powers_pass_through_plants",
        "name": "Pass Through Plants",
        "rank": 3,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Plant, Permeate 3",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vegetation"
          }
        ],
        "notes": "You can pass through areas of vegetation and large plants (such as trees) as if they were not even there. Plants and foliage do not impede your movement in the slightest. (Movement 3 (Permeate 3), Limited to Vegetation • 3 points)"
      },
      {
        "id": "prof_plant_powers_root_digging",
        "name": "Root Digging",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [],
        "notes": "Like powerful roots, you can dig deeply through the earth, allowing you to move underground for a distance and reemerge onto the surface. (Burrowing • 1 point per rank)"
      },
      {
        "id": "prof_plant_powers_root_transport",
        "name": "Root Transport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Plant, Plants",
        "extras": [],
        "flaws": [],
        "notes": "You step or meld into a plant or area of plant-life, emerging from another plant or area of vegetation some distance away. You can only transport from and to areas with plant life. Apply other Teleport modifiers (Deluxe Hero's Handbook, page 183) to customize the power. (Teleport, Medium (Plants) • 1 point per rank)"
      },
      {
        "id": "prof_plant_powers_woods_walk",
        "name": "Woods Walk",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Plant, Trackless",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Plant Life"
          }
        ],
        "notes": "When you move through an environment rich with plant life, you do not disturb the vegetation or leave any trail to follow. (Movement 2 (Trackless), Limited to Plant Life • 1 point.)"
      },
      {
        "id": "prof_plant_powers_animate_plants",
        "name": "Animate Plants",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [],
        "notes": "You can grant plants mobility and limited awareness, allowing them to carry out your commands. Your power may also grow them to considerable size. Animated plants can grab and hold targets, flail with limbs, vines, or branches, or become shambling soldiers, in the case of animated trees. Plant controllers often apply the Multiple Minions and Horde modifiers to this power, allowing them to animate entire groups of plants at once. While animated plants are typically minions, this power might have the Heroic modifier, removing the minion template from the animated plants. (Summon Animated Plant, Controlled, General Type • 4 points per rank)"
      },
      {
        "id": "prof_plant_powers_green_memory",
        "name": "Green Memory",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Plant, Postcognition",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Areas of Plant-Life"
          }
        ],
        "notes": "By coming into contact with a plant or area of plants, you can recall events which happened in their presence. See the Postcognition effect (Deluxe Hero's Handbook, page 178) for details. (Senses 4 (Postcognition), Limited to Areas of Plant-Life • 2 points)"
      },
      {
        "id": "prof_plant_powers_green_network",
        "name": "Green Network",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Plant, Visual, auditory, tactile",
        "extras": [],
        "flaws": [],
        "notes": "You can mentally link with plant-life, allowing you to perceive what is near those plants as if you were actually present, using your own sensory abilities (rather than being limited to the plants' senses). The Feedback flaw is a common one for this power, applying whenever the plants you are using as your medium are attacked or damaged. (Remote Sensing (visual, auditory, tactile), Medium (Plants) • 3 points per rank)"
      },
      {
        "id": "prof_plant_powers_plant_form",
        "name": "Plant Form",
        "rank": 3,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Plant, Sleep, Starvation, Suffocation",
        "extras": [],
        "flaws": [
          {
            "id": "noticeable",
            "name": "Noticeable",
            "cost": 1,
            "isFlat": true
          }
        ],
        "notes": "You combine humanoid and plant traits: retaining normal capabilities of movement, speech, and senses while having a plant's resistance to many animal needs and concerns. Some of Plant Form's benefits are definitely tradeoffs: you become immune to human diseases and toxins, for example, but vulnerable to plant diseases and toxins (herbicides). Note that this power includes the benefits of Photosynthesis and Woodskin (under Defensive Powers). If your plant form is not your permanent state of being, make its powers sustained or include an Activation modifier (Deluxe Hero's Handbook, page 197). (Immunity 3 (Sleep, Starvation, Suffocation), Protection, Noticeable • 2 points +1 point per rank)"
      },
      {
        "id": "prof_plant_powers_plant_growth",
        "name": "Plant Growth",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [],
        "notes": "Under the influence of your power, plants grow from seeds or shoots to fully mature in seconds. Even massive trees can appear virtually out of nowhere. You can use this power to create an instantaneous hedge or barricade, or living pillars or bridges, shaping and directing the plants as they grow. New areas of foliage can provide concealment while larger plants like tree trunks can offer cover as well. The Movable modifier is common for this power, allowing you to continue to move the plants you create after they have grown and providing the benefits of Move Object at your rank, using the plant-life as a medium. (Create Plants, Permanent • 2 points per rank)"
      },
      {
        "id": "prof_plant_powers_speak_with_plants",
        "name": "Speak With Plants",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Plant, Plants",
        "extras": [],
        "flaws": [],
        "notes": "You can communicate with ordinary plants as well as intelligent plant creatures. Non-intelligent plants have fairly little of interest to say and a different sense of time compared to animals, but can relate conditions and events which occurred around them, although not in the same detail as the visions provided by Green Memory (previously). (Comprehend 2 (Plants) • 4 points)"
      },
      {
        "id": "prof_plant_powers_warp_wood",
        "name": "Warp Wood",
        "rank": 10,
        "effectId": "transform",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [],
        "notes": "Your power over plants allows you to reshape even dead wood, molding it into new forms. For +1 point per rank you also have the power to enliven dead wood, causing it to rapidly put forth new roots, branches, leaves, and even flowers, seeds, or fruit. The newly restored plant only live for as long as conditions allow. (Transform (wooden objects into different shapes) • 2 points per rank)"
      },
      {
        "id": "prof_plant_powers_plant",
        "name": "Plant (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [],
        "notes": "Plants are a classification of life, primarily associated with producing their own food via photosyn- (Feature • 1 point)"
      },
      {
        "id": "prof_plant_powers_wood",
        "name": "Wood (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Plant, Flora",
        "extras": [],
        "flaws": [],
        "notes": "The hard, fibrous tissue of trees, primarily made up of cellulose. Wood is a primary plant (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Radiation Powers",
    "profiles": [
      {
        "id": "prof_radiation_powers_blinding_radiance",
        "name": "Blinding Radiance",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Radiation, Nuclear",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "You emit a bright beam of visible light able to temporarily blind a target. With the Burst Area modifier, this power can also create a blinding burst of light at the target point, able to blind all nearby, or remove the Ranged modifier to create a blinding burst in all directions around you. A variant form of Blinding Radiance swaps Perception (Visual) Area for Ranged for the same cost. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Impaired, Disabled, Unaware), Limited to Vision • 2 points per rank)"
      },
      {
        "id": "prof_radiation_powers_melting_heat",
        "name": "Melting Heat",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Radiation, Melting",
        "extras": [],
        "flaws": [],
        "notes": "You bombard an object with radiation, causing molecular agitation and raising its temperature, causing it to melt or burn from the inside out, weakening its structure until it is destroyed. (Ranged Weaken Toughness (melting) • 2 points per rank)"
      },
      {
        "id": "prof_radiation_powers_mutation",
        "name": "Mutation",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Radiation, Nuclear",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Bombarding a target with different radiation wavelengths, you induce rapid and massive cellular mutations. The transformed condition is limited to not increasing the target's point total, but can otherwise change any traits. Some versions of this power are further limited by the types of transformations or mutations they can cause. (Progressive Ranged Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Transformed) • 4 points per rank)"
      },
      {
        "id": "prof_radiation_powers_radiation_blast",
        "name": "Radiation Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Radiation, Radiation",
        "extras": [],
        "flaws": [],
        "notes": "You project a damaging beam of radiation at your target. A radiation blast is normally visible as a brightly colored energy, but more realistic radiation blasts are Subtle and invisible to the naked eye. Given their ability to pass through all but the heaviest shielding, radiation blasts may be Penetrating or even Indirect. (Ranged Damage (radiation) • 2 points per rank)"
      },
      {
        "id": "prof_radiation_powers_radiation_burst",
        "name": "Radiation Burst",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Radiation, Radiation",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your radiation blast (previously) strikes a target point and blossoms out into a burst of energy, affecting all targets within its area. A common variant is the \"Ground Zero\" burst, which removes the Ranged modifier, causing the radiation blast to center on the user. (Ranged Burst Area Damage (radiation) • 3 points per rank)"
      },
      {
        "id": "prof_radiation_powers_radiation_sickness",
        "name": "Radiation Sickness",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Radiation, Nuclear",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A bombardment of radiation induces cellular damage and severe illness in a living target, as compromised systems try to fight off and recover from the internal damage. More realistic radiation sickness is slow, affecting the victim only once per hour or day, depending on the intensity of the dosage. However, it is also potentially fatal, with dying the condition beyond incapacitated, if the sickness progresses that far. (Progressive Ranged Affliction (Resisted and Overcome by Fortitude; Impaired, Disabled, Incapacitated) • 4 points per rank)"
      },
      {
        "id": "prof_radiation_powers_radioactive_aura",
        "name": "Radioactive Aura",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Radiation, Being touched, radiation",
        "extras": [],
        "flaws": [],
        "notes": "You surround yourself with a glowing aura of radiation able to inflict damage on anything you touch (or that touches you). Apply the Precise modifier, if you are able to control what areas of your body your aura covers, such as being able to uncover your hands to handle objects without irradiating them. (Reaction Damage (being touched, radiation) • 4 points per rank)"
      },
      {
        "id": "prof_radiation_powers_deflection_field",
        "name": "Deflection Field",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Radiation, Deflection field",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "An aura of focused radiation strips away the kinetic force of incoming objects while simultaneously absorbing and deflecting radiant energy, providing you with broad-spectrum protection against attack. (Impervious Protection (deflection field), Sustained • 2 points per rank)"
      },
      {
        "id": "prof_radiation_powers_kinetic_nullification",
        "name": "Kinetic Nullification",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Radiation, Nuclear",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Kinetic Attacks"
          }
        ],
        "notes": "A burst of focused radiation strips the kinetic energy potential from a target, deflecting a projectile out of the air. In addition to the deflection benefit, with a ready action (or a hero point) this power can be used to counter kinetic effects (see Countering, Deluxe Hero's Handbook, pages 147-148). (Deflect, Limited to Kinetic Attacks • 1 point per 2 ranks)"
      },
      {
        "id": "prof_radiation_powers_radiation_absorption",
        "name": "Radiation Absorption",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Radiation, Radiation",
        "extras": [],
        "flaws": [
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You can absorb radiant energy attacks and use them to fuel your other powers or abilities. Note that this power does not provide you with any protection from radiation although it is often coupled with powers like Radiation Immunity or Radiation Shield. (Enhanced Trait, Fades, Source (radiation) • 1 point per 3 points of Enhanced Trait cost.)"
      },
      {
        "id": "prof_radiation_powers_radiation_immunity",
        "name": "Radiation Immunity",
        "rank": 1,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Radiation, Nuclear",
        "extras": [],
        "flaws": [],
        "notes": "You are immune to certain forms of radiation. The degree of immunity varies from the effects of environmental or background radiation (1 rank) to a specific type of radiation (such as gamma rays, 2 ranks), a specific effect with a radiation descriptor (such as Affliction or Damage, 5 ranks), or all radiation effects (10 ranks). (Immunity 1, 2, 5, or 10 • 1, 2, 5, or 10 points)"
      },
      {
        "id": "prof_radiation_powers_radiation_shield",
        "name": "Radiation Shield",
        "rank": 1,
        "effectId": "immunity",
        "action": "None",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Radiation, Background radiation",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can absorb or deflect radiation in an area around you, setting up a \"safe zone\" where those inside are protected against harmful irradiation due to the environment. You can create similar, more powerful, versions of higher ranks of Radiation Immunity by applying Affects Others, Burst Area, and Sustained to those effects, essentially tripling their cost. So a Radiation Shield providing complete immunity to all radiation effects costs 30 points. (Immunity 1 (background radiation), Affects Others, Burst Area, Sustained • 3 points)"
      },
      {
        "id": "prof_radiation_powers_air_wave",
        "name": "Air Wave",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Radiation, Radio transmissions",
        "extras": [],
        "flaws": [],
        "notes": "Shifting your body from matter to a packet of radio waves, you \"ride\" transmission signals from place to place. Various Teleport modifiers, including Accurate, Easy, and Extended, are common (but not required) for this power. (Teleport, Medium (radio transmissions) • 1 point per rank)"
      },
      {
        "id": "prof_radiation_powers_melt_through",
        "name": "Melt Through",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Radiation, Nuclear",
        "extras": [],
        "flaws": [],
        "notes": "Focusing radiation emissions to create terrific heat or radioactive plasma, you can melt through obstacles like a blowtorch through ice. (Burrowing • 1 point per rank)"
      },
      {
        "id": "prof_radiation_powers_nuclear_shift",
        "name": "Nuclear Shift",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Radiation, Radiation sources",
        "extras": [],
        "flaws": [],
        "notes": "Shifting your physical form into radioactive particles, you can merge with and vanish into a radiation source, reappearing from another some distance away via complex quantum interaction. Like Air Wave (previously), the Easy and Extended modifiers are common for this power. (Teleport, Medium (radiation sources) • 1 point per rank)"
      },
      {
        "id": "prof_radiation_powers_carbon_dating",
        "name": "Carbon Dating",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Radiation, Detect Age, Acute",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Nonliving Items"
          }
        ],
        "notes": "By \"reading\" the radioactive decay rate of carbon molecules, you can establish the approximate age of a sample of non-living material. (Senses 2 (Detect Age, Acute), Limited to Nonliving Items • 1 point.)"
      },
      {
        "id": "prof_radiation_powers_irradiate",
        "name": "Irradiate",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Radiation, Radiation, equivalent to heat",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "You can create a high enough level of radiation in the environment around you to render it toxic to living creatures after a relatively short amount of exposure. High ranks of Irradiate can blanket an entire city or even continent in deadly radiation! The effect is similar to the heat option of the Environment effect except it produces no actual heat and the effect is Subtle, since the radiation is invisible to all but senses able to detect it. Cost per rank determines the intensity of the exposure (frequency of Fortitude resistance checks). (Subtle Environment (radiation, equivalent to heat) • 1 point + 1 or 2 points per rank)"
      },
      {
        "id": "prof_radiation_powers_radar",
        "name": "Radar",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Radiation, Accurate Radio",
        "extras": [],
        "flaws": [],
        "notes": "You emit radio wave \"pings\" that bounce back from nearby objects, giving you a three-dimensional picture of your surroundings. Note that this power includes the benefits of Radio Hearing (following). (Senses 3 (Accurate Radio) • 3 points)"
      },
      {
        "id": "prof_radiation_powers_radio_hearing",
        "name": "Radio Hearing",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Radiation, Radio",
        "extras": [],
        "flaws": [],
        "notes": "You can detect and interpret radio waves and microwaves, allowing you to listen in on radio broadcasts, including devices like cell phones and microwave transmitters. (Senses 1 (Radio) • 1 point.)"
      },
      {
        "id": "prof_radiation_powers_radiation_form",
        "name": "Radiation Form",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Radiation, Life Support",
        "extras": [],
        "flaws": [],
        "notes": "You transform from flesh and blood into a being of coherent radioactive energy, able to pass through unshielded solid objects, largely immune to physical harm and needs. This power often grants other radiation-based powers, particularly Radioactive Aura and Irradiate, allowing you to emit damaging energy while in Radiation Form. (Immunity 10 (Life Support), Insubstantial 3 (radiation) • 25 points)"
      },
      {
        "id": "prof_radiation_powers_scrub_radiation",
        "name": "Scrub Radiation",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Radiation, Nuclear",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your power over radiation allows you to \"scrub\" it from the environment, causing rapid nuclear decay to break down radioactive elements or otherwise absorbing or neutralizing it, rendering the area clean and safe for living things. If you can only scrub radiation from the area immediately around you, apply the Close Range flaw to the power, reducing its cost by 1 per rank. (Nullify Radiation, Burst Area, Simultaneous • 3 points per rank)"
      },
      {
        "id": "prof_radiation_powers_sense_radiation",
        "name": "Sense Radiation",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Radiation, Detect Radiation, Ranged",
        "extras": [],
        "flaws": [],
        "notes": "You can sense even ordinarily invisible radiation like a living Geiger counter, detecting intense sources of radiation or irradiated areas nearby. This sense may be Acute or Analytical, allowing you to pick up on the type of radiation and its intensity (acute) or its exact wavelength, half-life, nuclear decay rate, and so forth (analytical). As with other senses, the GM may require an appropriate Expertise check to interpret the data you perceive. (Senses 2 (Detect Radiation, Ranged) • 2 points)"
      },
      {
        "id": "prof_radiation_powers_static_field",
        "name": "Static Field",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Radiation, All radio",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You emit a field of radio \"noise\" that overwhelms and jams other signals nearby, preventing radio communication and things like remote signals from working. (Ranged Burst Area Concealment Attack 2 (all radio) • 8 points + 2 points per +1 distance rank to area.)"
      },
      {
        "id": "prof_radiation_powers_x_ray_vision",
        "name": "X-Ray Vision",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Radiation, Nuclear",
        "extras": [],
        "flaws": [],
        "notes": "Able to perceive into the higher portions of the electromagnetic spectrum, you can \"see\" through solid objects by perceiving X-rays and other radiation passing through them. Radiation shielding or heavy layers of dense matter (such as lead) prevent radiation from passing through, so you cannot see through them. (Senses 4 (Vision Penetrates Concealment, except for lead and radiation shielding) • 4 points)"
      },
      {
        "id": "prof_radiation_powers_radiation",
        "name": "Radiation (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Radiation, Nuclear",
        "extras": [],
        "flaws": [],
        "notes": "The radiation descriptor can apply to a wide range of electromagnetic energies, but generally (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Sensory Powers",
    "profiles": [
      {
        "id": "prof_sensory_powers_dazzle",
        "name": "Dazzle",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Sensory, Perception",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "One Sense"
          }
        ],
        "notes": "You unleash a blast or beam able to overwhelm a particular sense, such as a blinding beam of light or a deafening blast of focused sound. Dazzle affects a single target by default. Apply the Perception Area modifier for an attack affecting any target able to perceive it, such as a flash-bomb or sonic wave. If the Perception Area is always centered on you, remove the Ranged modifier as well. For a general Sensory Impairment power, remove the Limited flaw so the Affliction affects all of the target's senses. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Senses Impaired, Senses Disabled, Unaware), Limited to One Sense • 2 points per rank)"
      },
      {
        "id": "prof_sensory_powers_obscure",
        "name": "Obscure",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Sensory, Perception",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Additional ranks extend the power to cover additional senses, while additional ranks of the Area modifier extend the distance the power covers (increasing the area's distance rank by one per modifier rank). Gamemasters can assume an Area Concealment Attack does not offer a resistance check, since successful resistance means everyone else gains concealment! (Ranged Burst Area Concealment Attack • 4 points per rank, +1 point per rank per +1 area distance rank)"
      },
      {
        "id": "prof_sensory_powers_sensory_overload",
        "name": "Sensory Overload",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Sensory, Perception",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You produce a sensory overload so forceful your target is stunned. The power is ranged and single target by default; apply the Perception Area modifier for a Sensory Overload able to affect any target able to perceive it. Remove Ranged if the effect is always centered on you. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 2 points per rank)"
      },
      {
        "id": "prof_sensory_powers_danger_sense",
        "name": "Danger Sense",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Danger Sense",
        "extras": [],
        "flaws": [],
        "notes": "You have a superhuman sense for when danger is about to strike, giving you the moment's warning you need to avoid the worst effects of an ambush, surprise, or trap. Although this power is often just the Danger Sense effect by itself, it may also include additional effects like Enhanced Advantage (Uncanny Dodge) or Precognition Limited to momentary visions of impending danger. (Senses 1 (Danger Sense) • 1 point.)"
      },
      {
        "id": "prof_sensory_powers_defensive_awareness",
        "name": "Defensive Awareness",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Sensory, Defensive Roll",
        "extras": [],
        "flaws": [],
        "notes": "Your enhanced senses allow you to avoid the worst effects of damaging attacks by dodging or rolling with the attack at the last second. (Enhanced Advantage (Defensive Roll) • 1 point per rank)"
      },
      {
        "id": "prof_sensory_powers_invisibility",
        "name": "Invisibility",
        "rank": 2,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Sensory, Normal sight",
        "extras": [],
        "flaws": [],
        "notes": "While invisible. For an additional 2 ranks, your power conceals you from all visual senses, but other senses may still detect you. Anything you are wearing or carrying becomes invisible along with you. If you can make others invisible by touch, apply the Affects Others modifier (plus the Ranged modifier, if you can do so at a distance). (Concealment 2 (normal sight) • 4 points)"
      },
      {
        "id": "prof_sensory_powers_sensory_shield",
        "name": "Sensory Shield",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Effects against one sense",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Half Effect"
          }
        ],
        "notes": "Your senses are protected against outside effects which might disable or overwhelm them. Note that this power protects your senses, not necessarily you, although you may reap some benefits. So, for example, you are protected against blinding light, but not a Vision-Dependent hypnotic stare. (Immunity 2 (effects against one sense), Immunity 5 (effects against all senses), Limited to Half Effect • 1 or 3 points)"
      },
      {
        "id": "prof_sensory_powers_silence",
        "name": "Silence",
        "rank": 1,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Sensory, Auditory",
        "extras": [],
        "flaws": [],
        "notes": "You can become completely silent, making no noise when you move and emitting no sound from your heartbeat, breathing, and so forth. Similarly, nothing you wear or carry emits any sound. Things not on your person may do so, however-knocking something to the floor still makes noise. You're still detectable by ultrasonics and echolocation; with an additional rank, you're concealed from those as well. You have full concealment from auditory senses and only need to make Stealth checks if others are able to sense you in some way other than hearing. If you can extend your Silence effect to others by touch, add the Affects Others modifier. If you can also do so at a distance, add the Ranged modifier. (Concealment 1 (Auditory) • 2 points)"
      },
      {
        "id": "prof_sensory_powers_pathfinder",
        "name": "Pathfinder",
        "rank": 8,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Sensory, Perception",
        "extras": [],
        "flaws": [],
        "notes": "2 miles, while Obscure 20 has a radius of 2,000 miles! concealed from your sense, you lose the ability to follow it. Choose a particular sense type for this power when you acquire it. Your ability to follow a path is limited by your movement type; if you come to a point where you are no longer capable of following it-such as the trail going off into empty air or deep space-then you know it. (Senses 8 (Detect Path, Accurate, Acute, Direction Sense, Distance Sense, Ranged, Tracking 2) • 9 points)"
      },
      {
        "id": "prof_sensory_powers_tracking_teleport",
        "name": "Tracking Teleport",
        "rank": 2,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Sensory, Teleport Awareness, Tracking",
        "extras": [],
        "flaws": [],
        "notes": "You can \"follow\" another teleporter, provided your Teleport range is at least equal to theirs (if it is not, you automatically fail to track them). Make a Perception check, DC 10 +1 per round since the target teleported, +1 per 10 feet between you and the departure point (no modifier if you are standing on the same spot). If you succeed, you can teleport to the same place the target did (or the nearest open space, if something presently occupies that space). If the Perception check fails, you do not go anywhere. Additionally, you can make a Perception check (DC 10, +1 per 10 feet between you and the teleport point) to sense someone teleporting in or out nearby, even if you cannot otherwise sense them. (Senses 2 (Teleport Awareness, Tracking) • 2 points)"
      },
      {
        "id": "prof_sensory_powers_aura_reading",
        "name": "Aura Reading",
        "rank": 5,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Sensory, Perception",
        "extras": [],
        "flaws": [],
        "notes": "You possess an additional sense beyond the normal human sensory abilities. Aura Reading: You can \"read\" the invisible psychic auras around all creatures, showing their mood, physical condition, and any outside psychic influences. Aura Reading is a mental sense, although the information (the aura) is perceived visually. (Senses 5 (Detect Mood, Ranged; Detect Physical Condition, Ranged; Psychic Awareness) • 5 points)"
      },
      {
        "id": "prof_sensory_powers_cosmic_awareness",
        "name": "Cosmic Awareness",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Directed inspiration",
        "extras": [],
        "flaws": [],
        "notes": "GM's discretion). Additionally, once per adventure you can ask \"the Universe\" (the Gamemaster) a direct question and get an answer (essentially a specialized use of the inspiration aspect of spending hero points). Each additional Feature rank provides an additional question per adventure. This power is also a good justification for other powers where the character \"just knows\" things. (Feature 1 (directed inspiration), Senses 1 (Cosmic Awareness) • 2 points)"
      },
      {
        "id": "prof_sensory_powers_lie_detector",
        "name": "Lie Detector",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Sensory, Perception",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Detecting Deception"
          }
        ],
        "notes": "Lie Detector: With enhanced awareness of nonverbal cues and things like heartbeat and perspiration, you can more easily sense when someone is lying. (Enhanced Insight, Limited to Detecting Deception • 1 point per 2 ranks (+2 Insight per rank))"
      },
      {
        "id": "prof_sensory_powers_radar",
        "name": "Radar",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Accurate Radio",
        "extras": [],
        "flaws": [],
        "notes": "Radar: By sending out radio wave emissions that reflect off solid surfaces, you can build an accurate picture of your surroundings. (Senses 2 (Accurate Radio) • 2 points)"
      },
      {
        "id": "prof_sensory_powers_sonar",
        "name": "Sonar",
        "rank": 3,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Accurate Hearing, Ultra-Hearing",
        "extras": [],
        "flaws": [],
        "notes": "Sonar: By sending out ultrasonic emissions that reflect off solid surfaces, you can build an accurate picture of your surroundings. (Senses 3 (Accurate Hearing, Ultra-Hearing) • 3 points)"
      },
      {
        "id": "prof_sensory_powers_spatial_awareness",
        "name": "Spatial Awareness",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Ranged",
        "duration": "Permanent",
        "descriptor": "Sensory, Perception",
        "extras": [],
        "flaws": [],
        "notes": "Spatial Awareness: You are mentally aware of your surroundings, even when you cannot see them. (Senses 4 (Accurate, Radius, Ranged Mental Sense) • 4 points)"
      },
      {
        "id": "prof_sensory_powers_x_ray_vision",
        "name": "X-Ray Vision",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Vision Penetrates Concealment",
        "extras": [],
        "flaws": [],
        "notes": "X-Ray Vision: You can see through solid objects as if they weren't there. A subject with no concealment relative to you cannot use Stealth to hide from you. X-Ray Vision may be Limited to particular substances (natural earth, for example) or have a Quirk of being unable to penetrate a particular substance (like lead) worth -1 point. (Senses 4 (Vision Penetrates Concealment) • 4 points)"
      },
      {
        "id": "prof_sensory_powers_enhanced_senses",
        "name": "Enhanced Senses",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Sensory, Perception",
        "extras": [],
        "flaws": [],
        "notes": "Your normal human sensory abilities are enhanced, sharpening your perceptions. If this power is limited to a single sense-such as vision or hearing-apply the Limited modifier, reducing the cost to 1 point per 2 ranks (or 1 point per +4 Perception ranks). (Enhanced Perception • 1 point per rank (+2 Perception per rank))"
      },
      {
        "id": "prof_sensory_powers_synesthesia",
        "name": "Synesthesia",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Senses",
        "extras": [],
        "flaws": [],
        "notes": "You can switch the \"input\" of your senses, perceiving information from one with another, such as \"seeing\" sound as colorful patterns, \"hearing\" scents as different tones, or even \"smelling\" or \"tasting\" colors, to name a few. Switching sensory inputs is a free action and a sustained effect. The primary benefit (apart from recreation) is the ability to interpret sensory input through a different sense. You can use bonuses associated with the new sense (such as the acute nature of vision while \"seeing\" scents) and shift effects targeting one sense to the new sense; an Affliction that would normally leave you blind (visually unaware) leaves you deafened (aurally unaware instead) instead when your vision is shifted to hearing. (Variable Descriptor 2 (Senses) • 2 points)"
      },
      {
        "id": "prof_sensory_powers_sensory",
        "name": "Sensory (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Perception",
        "extras": [],
        "flaws": [],
        "notes": "It is important to distinguish between sensory powers (one or more effects with a \"sensory\" descriptor) (Feature • 1 point)"
      },
      {
        "id": "prof_sensory_powers_heads_up_display",
        "name": "Heads-Up Display (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Perception",
        "extras": [],
        "flaws": [],
        "notes": "You can overlay visual data relating to your status or incoming perceptions in your (Feature • 1 point)"
      },
      {
        "id": "prof_sensory_powers_precise",
        "name": "Precise (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sensory, Perception",
        "extras": [],
        "flaws": [],
        "notes": "You can mix-and-match your different sensory abilities, turning them on and off at will as a (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Size Powers",
    "profiles": [
      {
        "id": "prof_size_powers_growth_momentum",
        "name": "Growth Momentum",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "size rank difference between you and your target"
          }
        ],
        "notes": "You use the momentum of your increase in size to inflict additional damage with a close attack, literally growing up underneath your target. Take as many ranks as you expect to change size ranks; if you have Shrinking 16, you can have up to 4 ranks of Growth Momentum damage (at which point you reach your normal size rank and cannot grow any further). The additional damage is still limited by power level. (Strength-based Damage, Limited to size rank difference between you and your target • 1 point)"
      },
      {
        "id": "prof_size_powers_internal_attack",
        "name": "Internal Attack",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Size, Mass",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "affects_corporeal",
            "name": "Affects Corporeal",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Must use the Atomic modifier on Shrinking, -1 point"
          }
        ],
        "notes": "By shrinking down to microscopic size, you can attack your target from within, bypassing external defenses. You may vary the conditions imposed by the Affliction to suit the type of attack, perhaps having an array of different Afflictions or applying the Variable Condition modifier from the Illusion Powers section. (Cumulative Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated), Affects Corporeal, Subtle, Quirk (Must use the Atomic modifier on Shrinking, -1 point) • 3 points per rank)"
      },
      {
        "id": "prof_size_powers_phase_attack",
        "name": "Phase Attack",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Size, Mass",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "affects_corporeal",
            "name": "Affects Corporeal",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A similar power is a Phase Attack: passing through the target in a near zero-density state and then partially solidifying for an instant, causing a painful disruption. This type of attack may be Tiring or have an unpleasant Side-Effect. It could also be a Damage effect rather than Affliction. (Cumulative Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated), Affects Corporeal • 3 points per rank)"
      },
      {
        "id": "prof_size_powers_massive_missile",
        "name": "Massive Missile",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Size, Mass",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Requires objects to throw, -1 point"
          }
        ],
        "notes": "You can take a small object able to fit into the palm of your hand and throw it, causing it to grow as it flies, until it lands on your target as a massive area attack! (Burst Area Ranged Damage, Quirk (Requires objects to throw, -1 point) • 2 points for rank 1 +)"
      },
      {
        "id": "prof_size_powers_shrink_ray",
        "name": "Shrink-Ray",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Size, Third Degree Only",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Third Degree Only"
          }
        ],
        "notes": "You project a beam that causes your target to shrink to a tiny-and largely helpless-size. Drop the Ranged modifier if you must touch a target to shrink it. Apply a suitable Area modifier like Cone for a \"wide angle\" beam or Cloud for a \"shrinking gas bomb\". (Ranged Progressive Affliction (Resisted by Dodge, Overcome by Fortitude; Transformed - reduced to tiny size), Limited (Third Degree Only) • 3 points per rank)"
      },
      {
        "id": "prof_size_powers_density_decrease",
        "name": "Density Decrease",
        "rank": 4,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Size, Incorporeal",
        "extras": [],
        "flaws": [],
        "notes": "You reduce your body's density to the point of becoming ghost-like, unaffected by most forms of physical attack. (Insubstantial 4 (Incorporeal) • 20 points)"
      },
      {
        "id": "prof_size_powers_massive_armor",
        "name": "Massive Armor",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Size, Mass",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "At increased size, your skin and muscle become more dense and resistant to injury. (Impervious modifier on Toughness • 1 point per rank)"
      },
      {
        "id": "prof_size_powers_shrinking_dodge",
        "name": "Shrinking Dodge",
        "rank": 10,
        "effectId": "shrinking",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Size, When attacked",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Reflexively reducing your size, you become a smaller target to avoid attacks. Compare the attack check against your modified Dodge and Parry defenses to determine if it hits. (Reaction modifier on Shrinking (when attacked) • 1 point per Shrinking rank)"
      },
      {
        "id": "prof_size_powers_microflight",
        "name": "Microflight",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Must be using Shrinking, -1 point"
          }
        ],
        "notes": "At reduced size, you can fly through the air. This may involve channeling the kinetic energy of your size-change or you may have the Gliding modifier to ride air currents at your reduced weight. Increase the value of the Quirk 1 point if the character must be particularly small to fly. (Flight, Quirk (Must be using Shrinking, -1 point) • 1 point for rank 1 + 2 points per additional rank)"
      },
      {
        "id": "prof_size_powers_microport",
        "name": "Microport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Size, Transmission networks",
        "extras": [],
        "flaws": [],
        "notes": "Shrinking to atomic size, you can \"ride\" a carrier wave like an electrical or radio transmission, disappearing into the transmission from one end and emerging from the other. (Teleport, Accurate, Extended, Medium (transmission networks) • 3 points per rank)"
      },
      {
        "id": "prof_size_powers_microverse",
        "name": "Microverse",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Size, Dimensional Travel 1, microverse",
        "extras": [],
        "flaws": [],
        "notes": "You can shrink down past the atomic level to the point where you shift out of the physical universe altogether and into an alternate \"micro-universe\". You reverse the process in order to return to the physical universe in the same spot you left. In addition to this power, you may also have an Alternate Effect, making your Shrinking into equal power points of Growth while you are in the microverse. (Movement 1 (Dimensional Travel 1, microverse) • 2 points)"
      },
      {
        "id": "prof_size_powers_density_increase",
        "name": "Density Increase",
        "rank": 10,
        "effectId": "growth",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Size, +0 modifier",
        "extras": [],
        "flaws": [],
        "notes": "Rather than increasing your size, you increase only your mass, becoming more dense, and therefore stronger and tougher, without changing size. This removes the following modifiers from Growth: active defenses (Dodge and Parry), Intimidation checks, and size rank. Only Strength, Stamina, and mass ranks increase. Speed rank actually decreases: -1 to speed per 4 ranks. Gamemasters should enforce the significant limitations of the character's increased mass; a character with 10 ranks of Density Increase weighs 100 tons! Few, if any, conventional structures will support the character's weight. (Growth, Does Not Change Size (+0 modifier) • 2 points per rank)"
      },
      {
        "id": "prof_size_powers_mass_compaction",
        "name": "Mass Compaction",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "active Shrinking rank"
          }
        ],
        "notes": "Smaller you become, the more dense you become, compacting your body mass, making your smaller size effectively stronger and tougher. You must have Shrinking with the Normal Strength modifier to take this power. Typically, due to power level limits, the character should hit the limits at minimum size, being well below them while normal-sized. (Enhanced Strength and Toughness, Limited to active Shrinking rank • 2 points per rank)"
      },
      {
        "id": "prof_size_powers_mass_dispersal",
        "name": "Mass Dispersal",
        "rank": 1,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Size, -2",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Increasing Size Only"
          }
        ],
        "notes": "Larger you get, the less dense you become, spreading your body mass out until you become a giant cloud. In your dispersed form you may have additional powers based on the forms found in the Air Powers and Water Powers sections. (Insubstantial Linked to Growth, Limited to Increasing Size Only (-2) • 5 points per Insubstantial rank + 1)"
      },
      {
        "id": "prof_size_powers_microvision",
        "name": "Microvision",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Size, Microscopic Vision",
        "extras": [],
        "flaws": [],
        "notes": "You can perceive extremely small things close up, perhaps down into the microscopic, molecular, or atomic levels. If you can peer into micro-universes as well (see the Microverse power) apply a rank of the Dimensional modifier. (Senses (Microscopic Vision) • 1 point per rank (to a maximum of 4 ranks).)"
      },
      {
        "id": "prof_size_powers_shrinking_storage",
        "name": "Shrinking Storage",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [],
        "notes": "You can shrink various items in order to more easily keep them on your person (in pockets or pouches, for example). Your Feature rank is the total mass rank in material you can carry with no effort whatsoever. You can withdraw and restore an item to its normal (fully-functional) size as a free action. With sufficient ranks (7 or more), you could even store an entire vehicle in your pocket! You pay normally for any equipment or devices that you carry, although this power is an excellent explanation for an \"I just happen to have...\" power stunt for a new item of equipment (see On-Hand Equipment, Deluxe Hero's Handbook, page 213). (Feature (reduce mass of carried items by rank) • 1 point per rank)"
      },
      {
        "id": "prof_size_powers_size",
        "name": "Size (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [],
        "notes": "The effects of different size ranks are summarized in the Size Rank Modifiers table (page 312 of the Deluxe (Feature • 1 point)"
      },
      {
        "id": "prof_size_powers_activation",
        "name": "Activation (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [],
        "notes": "This is the appropriate modifier for a Growth or Shrinking effect requiring additional time (Feature • 1 point)"
      },
      {
        "id": "prof_size_powers_fades",
        "name": "Fades (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [],
        "notes": "This modifier can reflect a character who slowly returns to normal size after a size change, then (Feature • 1 point)"
      },
      {
        "id": "prof_size_powers_quirk",
        "name": "Quirk (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [],
        "notes": "A common 1-point Quirk for size-changing powers is \"maximum rank only\" where the charac- (Feature • 1 point)"
      },
      {
        "id": "prof_size_powers_tiring",
        "name": "Tiring (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Size, Mass",
        "extras": [],
        "flaws": [],
        "notes": "Higher ranks of Growth or Shrinking with this modifier may represent the strain of achieving (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Sonic Powers",
    "profiles": [
      {
        "id": "prof_sonic_powers_buzzsaw",
        "name": "Buzzsaw",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Sonic, Cutting, vibrational",
        "extras": [
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You vibrate your hands at a high frequency, or surround them with a high-frequency sonic field, turning them into powerful cutting implements. (Penetrating Damage (cutting, vibrational) • 2 points per rank)"
      },
      {
        "id": "prof_sonic_powers_deafening_shriek",
        "name": "Deafening Shriek",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Sonic, Sound",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "One Sense"
          }
        ],
        "notes": "You hit targets with a blast of sound intense enough to temporarily deafen them. A common variant of this power substitutes the Burst Area or Perception (Hearing) Area modifier for Ranged, or applies both a Ranged and Area modifier for a power affecting an area at a distance. (Ranged Cumulative Affliction (Resisted and Overcome by Fortitude; Hearing Impaired, Hearing Disabled, Hearing Unaware), Limited to One Sense • 2 points per rank)"
      },
      {
        "id": "prof_sonic_powers_hypnotic_song",
        "name": "Hypnotic Song",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Concentration",
        "descriptor": "Sonic, Sound",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You emit sound able to influence the minds of all able to hear it, ranging from an enchanting song to mind-altering hypersonics. Once the sound stops, however, the targets quickly recover. Apply the Insidious modifier for a subliminal mindaltering sound and the Subtle modifier for an ultrasonic signal beyond the normal hearing range. If the effect lasts beyond the initial sound, remove the Instant Recovery flaw. (Cumulative Hearing Area Affliction (Resisted and Overcome by Will; Entranced, Compelled, Controlled), Concentration Duration, Instant Recovery • 3 points per rank)"
      },
      {
        "id": "prof_sonic_powers_shatter",
        "name": "Shatter",
        "rank": 10,
        "effectId": "weaken",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "An intense beam of ultrasound can shatter crystalline objects and even liquefy solid matter. If Limited to only crystalline objects, apply a -1 flaw to the power. (Ranged Weaken Toughness, Affects Only Objects • 2 points per rank)"
      },
      {
        "id": "prof_sonic_powers_sonic_blast",
        "name": "Sonic Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Sonic, Sonic",
        "extras": [],
        "flaws": [],
        "notes": "A focused blast of sound can smash solid objects and do considerable damage to foes. A common modifier on this power is a Burst Area or Auditory Area extra in place of the Ranged extra (for a blast originating from you) or along with it, for a sonic blast that spreads from a target point. The Cone Area modifier in place of Ranged can represent a sonic blast that spreads out from its point of origin. (Ranged Damage (sonic) • 2 points per rank)"
      },
      {
        "id": "prof_sonic_powers_vertigo",
        "name": "Vertigo",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Sonic, Sound",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your emit sound waves that upset the inner ear, causing dizziness and disorientation. A Burst or Cloud Area version (replacing the Ranged modifier) is good for a close radius effect, while an Auditory Area version (replacing both Ranged and Hearing-Dependent) increases cost to 4 points per rank, but affects a wider area. (Ranged Progressive Affliction (Resisted and Overcome by Will; Dazed, Stunned, Incapacitated), HearingDependent • 3 points per rank)"
      },
      {
        "id": "prof_sonic_powers_protected_hearing",
        "name": "Protected Hearing",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Harmful Hearing-Dependent effects",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Half Effect"
          }
        ],
        "notes": "Your hearing is shielded against harmful effects, making it easier to resist and recover from them. (Immunity 5 (harmful Hearing-Dependent effects), Limited to Half Effect • 3 points)"
      },
      {
        "id": "prof_sonic_powers_sonic_absorption",
        "name": "Sonic Absorption",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "rank of absorbed sonic effect"
          },
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You absorb the energy of incoming sound waves, converting it to enhance one of your existing traits. This power is often coupled with a degree of Sonic Immunity (following). (Enhanced Trait, Fades, Limited to rank of absorbed sonic effect • 1 point per 3 ranks)"
      },
      {
        "id": "prof_sonic_powers_immunity_to_sonic_damage",
        "name": "Immunity to Sonic Damage",
        "rank": 5,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Sonic, Sonic damage",
        "extras": [],
        "flaws": [],
        "notes": "Your powers make you immune to either damage from sonic attacks or completely immune to all sonic effects. (Immunity 5 (sonic damage) • 5 points)"
      },
      {
        "id": "prof_sonic_powers_sonic_immunity",
        "name": "Sonic Immunity",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Sonic effects",
        "extras": [],
        "flaws": [],
        "notes": "Sonic Immunity power from Sonic Powers. (Immunity 10 (sonic effects) • 10 points)"
      },
      {
        "id": "prof_sonic_powers_sonic_shield",
        "name": "Sonic Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "A thin field of intense vibratory energy or \"solid sound\" surrounds your body, protecting you from harm. (Protection, Sustained • 1 point per rank)"
      },
      {
        "id": "prof_sonic_powers_sonic_drilling",
        "name": "Sonic Drilling",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "You can use sound to bore through solid material like a vibratory drill. (Burrowing • 1 point per rank)"
      },
      {
        "id": "prof_sonic_powers_sonic_flight",
        "name": "Sonic Flight",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [
          {
            "id": "noticeable",
            "name": "Noticeable",
            "cost": 1,
            "isFlat": true
          }
        ],
        "notes": "You are borne aloft on sound waves. This form of flight produces a lot of noise, making it more noticeable than usual. If you need some type of parasail or glider to catch and reflect the vibrations to fly, apply the Platform or Wings flaw to the power. (Flight, Noticeable • 1 point for rank 1, + 2 points per additional rank)"
      },
      {
        "id": "prof_sonic_powers_sound_wave",
        "name": "Sound Wave",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "You can transform momentarily into sound, pass through a medium, and reform at a distant point, moving almost instantly across up to distance rank 7 (about half a mile). Further than that should take longer than a move action, given the speed of sound, so the GM may wish to limit this power to a maximum rank of 7. (Teleport, Medium (sound) • 1 point per rank)"
      },
      {
        "id": "prof_sonic_powers_enhanced_hearing",
        "name": "Enhanced Hearing",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Extended Hearing",
        "extras": [],
        "flaws": [],
        "notes": "You can pick up on distant sounds more easily. A common enhancement to this power is the Penetrates Concealment effect for hearing (4 ranks), allowing you to ignore muffling physical barriers (like walls and doors) when making hearing Perception checks. (Senses (Extended Hearing) • 1 point per rank)"
      },
      {
        "id": "prof_sonic_powers_phase_cancellation",
        "name": "Phase Cancellation",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Sonic, Sound",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A counter-wave or suppression field nullifies sonic effects in the targeted area. As a default, this power only nullifies sonic powers manipulating sounds or creating sound over a certain threshold; it does not, for example, silence all sound in the area. For that, Link the Silence power (previously) to this one. Apply the Sustained modifier to maintain this power as a free action. If you can only create a white sound field around yourself, apply the Close flaw. (Burst Area Nullify Sonic Effects, Concentration, Simultaneous • 4 points per rank)"
      },
      {
        "id": "prof_sonic_powers_silence",
        "name": "Silence",
        "rank": 10,
        "effectId": "concealment",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Sonic, Sound",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A counter-wave or suppression field blocks out sound in an area, leaving it completely silent. This does not necessarily nullify sonic powers in the area-see Countering under Sonic Descriptors and White Sound, later in this section, for details. (Burst Area Auditory Concealment Attack • 6 points + 2 points per +1 distance rank to area.)"
      },
      {
        "id": "prof_sonic_powers_solid_sound",
        "name": "Solid Sound",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "You can project sound as solid force fields, which you can shape into different forms. The default version of the power assumes the solidified sound is visible, perhaps as a glowing or shimmering colored field. If it is invisible, apply the Subtle modifier. (Create Solid Sound Objects • 2 points per rank)"
      },
      {
        "id": "prof_sonic_powers_sonar",
        "name": "Sonar",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Accurate Hearing",
        "extras": [],
        "flaws": [],
        "notes": "Using hypersonic emissions and echolocation, you can sense your surroundings without needing to see them. If you can produce an \"ultrasound scan\" able to \"see\" through or inside solid objects, add the Penetrates Concealment effect of Senses to the power, increasing cost by 4 points. (Senses (Accurate Hearing) • 2 points)"
      },
      {
        "id": "prof_sonic_powers_sonic_form",
        "name": "Sonic Form",
        "rank": 1,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Sonic, Sonic",
        "extras": [],
        "flaws": [],
        "notes": "You can transform into a being of pure sound, giving you the ability to move through different mediums like sound does and to strike with a powerful vibrational force. The default version of this power assumes your sound \"body\" is still visible. If it is not, add Concealment 4 (Visual) as well. (Damage 1 (sonic), Flight 8, Immunity 10 (life support), Insubstantial 3 • 42 points +1 point per +1 rank of)"
      },
      {
        "id": "prof_sonic_powers_sonic_masking",
        "name": "Sonic Masking",
        "rank": 2,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Sonic, Auditory",
        "extras": [],
        "flaws": [],
        "notes": "You can suppress or mask your own sound emissions, making yourself completely silent, although the effects of your actions can still be heard; so your footfalls and breathing, for example, are masked, but knocking over a garbage can in an alley still creates noise when it hits the pavement. (Concealment 2 (auditory) • 4 points)"
      },
      {
        "id": "prof_sonic_powers_sonic_projection",
        "name": "Sonic Projection",
        "rank": 10,
        "effectId": "illusion",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Sonic, Aural",
        "extras": [],
        "flaws": [],
        "notes": "You can re-create different sounds, with the difficulty of determining they are not the original based on your rank (Perception check, DC 10 + rank). Additionally, you can manipulate existing sounds. In the same way a visual illusion might change the appearance of a real object, you can change the perception of a real sound, causing sirens to sound like music (or vice versa) or spoken words to say something completely different. The difficulty for a Perception check to detect your manipulation is the same: DC 10 + rank. (Illusion (Aural) • 1 point per rank)"
      },
      {
        "id": "prof_sonic_powers_sound_analysis",
        "name": "Sound Analysis",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Analytical Hearing",
        "extras": [],
        "flaws": [],
        "notes": "Like a sophisticated analysis program, you can break down any sound you hear, analyzing its component elements. Amongst other things, you can determine a sound's likely origin, match voice-prints and other sound waves, and possibly pull clues from background noises on recordings or auditory broadcasts. If you have additional hearing capabilities (like Ultra-Hearing), you can take an additional rank to apply this power to them as well. (Senses 1 (Analytical Hearing) • 1 point)"
      },
      {
        "id": "prof_sonic_powers_sound_creatures",
        "name": "Sound Creatures",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "You create or summon creatures made of \"living sound\" that obey your commands. These creatures can take on virtually any form or appearance, from featureless humanoids to strange monsters. For close combat creatures, substitute sonic Damage or Affects Corporeal Strength for the Sonic Blast power and the appropriate Close Combat skill for the Ranged Combat skill. (Summon Sound Creature 5, Controlled • 15 points + 10 points per doubling of number of creatures + 5)"
      },
      {
        "id": "prof_sonic_powers_ultrasonic_hearing",
        "name": "Ultrasonic Hearing",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Ultra-Hearing",
        "extras": [],
        "flaws": [],
        "notes": "Your hearing is sensitive to frequencies much higher than the normal human range, allowing you to hear ultrasonic tones like dog whistles and certain ultrasonic remote signals. (Senses 1 (Ultra-Hearing) • 1 point.)"
      },
      {
        "id": "prof_sonic_powers_white_noise",
        "name": "White Noise",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Sonic, Visibility",
        "extras": [],
        "flaws": [],
        "notes": "You create countervailing noise or dampen existing sound in the area, making it difficult to hear and imposing either a -2 or -5 circumstance penalty on all hearingrelated checks. (Environment (Visibility), Affects Hearing Instead of Vision (+0) • 1 point per rank for -2 penalty, 2 points per)"
      },
      {
        "id": "prof_sonic_powers_sound",
        "name": "Sound (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "Sonic powers are based on sound, a pressure wave transmitted through a medium like air, (Feature • 1 point)"
      },
      {
        "id": "prof_sonic_powers_vibration",
        "name": "Vibration (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "Vibration creates sound, and some powers distinguish between creating and control- (Feature • 1 point)"
      },
      {
        "id": "prof_sonic_powers_instruments",
        "name": "Instruments (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Sonic, Sound",
        "extras": [],
        "flaws": [],
        "notes": "While many can wield sonic powers with nothing more than their voice or a simple act (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Speed Powers",
    "profiles": [
      {
        "id": "prof_speed_powers_flattening_wake",
        "name": "Flattening Wake",
        "rank": 10,
        "effectId": "affliction",
        "action": "Reaction",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Speed, While moving at high speed",
        "extras": [
          {
            "id": "area_line",
            "name": "Area (Line 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "By zooming through an area at high speed, you can knock people over like tenpins, making it that much easier for you or your allies to mop them up. (Reaction (while moving at high speed) Line Area Affliction (Resisted by Dodge; Dazed, Prone), Instant Recovery, Limited Degree, Limited to Directly Behind You • 2 points per rank)"
      },
      {
        "id": "prof_speed_powers_lightning_disarm",
        "name": "Lightning Disarm",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Speed, Velocity",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "One moment you're surrounded by people with guns, the next, you're surrounded by startled opponents, wondering how all their guns ended up in a pile at your feet! (Burst Area on Strength for Disarming, Selective • 2 points per rank (maximum rank equal to Strength).)"
      },
      {
        "id": "prof_speed_powers_rapid_strike",
        "name": "Rapid Strike",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Speed, Velocity",
        "extras": [
          {
            "id": "multiattack",
            "name": "Multiattack",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can land multiple hits in the time it takes most people to make one. (Multiattack on Strength Damage • 1 point per rank up to Strength rank, 2 points per additional rank)"
      },
      {
        "id": "prof_speed_powers_sonic_boom",
        "name": "Sonic Boom",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [],
        "notes": "A deceptively simple attack: you snap your fingers at super-sonic speed, creating a micro sonic boom able to momentarily stun or even incapacitate a target at close range. A speedster with this power and the Move-by Action advantage might also create a sonic boom by zipping past a target at high speed, perhaps even adding the Burst Area modifier to the power. (Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated) • 1 point per rank)"
      },
      {
        "id": "prof_speed_powers_super_sonic_punch",
        "name": "Super-Sonic Punch",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Speed, Momentum",
        "extras": [],
        "flaws": [],
        "notes": "You put a lot of momentum behind your punch, allowing you to hit an opponent like a freight train! (Strength-based Damage (momentum) • 1 point per rank)"
      },
      {
        "id": "prof_speed_powers_vacuum",
        "name": "Vacuum",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Speed, Velocity",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Moving at super-speed, you whip up a whirlwind that draws all the air from an area, causing the targets to suffocate. (Burst Area Affliction (Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated), Concentration, Cumulative • 4 points per rank)"
      },
      {
        "id": "prof_speed_powers_whirlwind_attack",
        "name": "Whirlwind Attack",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Speed, Velocity",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You are everywhere on the battlefield at once, striking at will against multiple opponents, taking on whole groups by yourself. (Burst Area on Strength Damage, Selective • 2 points per rank up to Strength rank, 3 points per additional rank)"
      },
      {
        "id": "prof_speed_powers_fast_defense",
        "name": "Fast Defense",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [],
        "notes": "Your power enhances your reaction time, allowing you to more easily dodge and evade attacks. (Enhanced Dodge, Enhanced Parry • 1 point per rank of Enhanced Defense, 2 points per rank for both.)"
      },
      {
        "id": "prof_speed_powers_frictionless",
        "name": "Frictionless",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Speed, Grab and entrapment effects",
        "extras": [],
        "flaws": [],
        "notes": "Even more than just basic immunity to the friction effects of moving at high speeds (see Features) you are immune to all effects relying upon friction, including grabs and various types of bindings; you slip out of them easily, so long as there is any means for you to do so. (Immunity 5 (grab and entrapment effects) • 5 points)"
      },
      {
        "id": "prof_speed_powers_throwback",
        "name": "Throwback",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Projectiles"
          }
        ],
        "notes": "When you defend, you can react fast enough to catch an incoming projectile-even a bullet-and hurl it back at the attacker at the same speed. The power's range allows you to intercept attacks on others within your range. If you can throw the attack at any target, rather than just back at the attacker, apply the Redirect modifier, increasing cost by 1 point per rank. (Deflect, Reflect, Limited to Projectiles • 1 point per rank)"
      },
      {
        "id": "prof_speed_powers_untouchable",
        "name": "Untouchable",
        "rank": 80,
        "effectId": "speed",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Concentration",
        "descriptor": "Speed, Dodge and Parry based attacks",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "not against surprise attacks or sufficiently large area effects"
          }
        ],
        "notes": "You react so fast that when you go on the defensive (taking your standard action each round to \"concentrate\"), you are practically untouchable: when you perceive an attack, you can instantly move somewhere else. Only attacks which catch you by surprise, or which cannot be avoided by Dodge or Parry, have a chance of affecting you. A sufficiently large area effect might do so as well, if your Speed is insufficient to move you entirely out of the targeted area (unlikely except for large area effects). (Immunity 80 (Dodge and Parry based attacks), Concentration, Limited (not against surprise attacks or sufficiently large area effects); Reaction (when targeted by an attack) on Speed 1 • 30 points + 3 points per additional)"
      },
      {
        "id": "prof_speed_powers_vibrational_phasing",
        "name": "Vibrational Phasing",
        "rank": 4,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Incorporeal",
        "extras": [],
        "flaws": [],
        "notes": "By vibrating your molecules you can shift out of phase with ordinary matter, passing through it like a phantom. This is especially useful for speedsters able to run at speeds where a collision with a solid object would be devastating, and it allows you to take straight paths through obstacles rather than having to go around them. (Insubstantial 4 (Incorporeal) • 20 points If you are only able to vibrate to pass through obstacles while moving at high speeds, rather than becoming incorporeal at will to avoid attacks and such, use the following (less expensive) version:)"
      },
      {
        "id": "prof_speed_powers_air_brakes",
        "name": "Air Brakes",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Safe Fall",
        "extras": [],
        "flaws": [],
        "notes": "Stirring the air with your hands at super-speed whips up a powerful enough downdraft to provide an air \"cushion\" to slow your fall and allow you to land safely. (Movement 1 (Safe Fall) • 2 points Many speedsters also develop the ability to whip up Air Cushions for other people, catching them in a powerful updraft like a \"net\" of compressed air.)"
      },
      {
        "id": "prof_speed_powers_air_cushion",
        "name": "Air Cushion",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Speed, Safe Fall",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Many speedsters also develop the ability to whip up Air Cushions for other people, catching them in a powerful updraft like a \"net\" of compressed air. (Movement 1 (Safe Fall), Affects Others, Burst Area • 3 points)"
      },
      {
        "id": "prof_speed_powers_dimensional_vibration",
        "name": "Dimensional Vibration",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [],
        "notes": "Combining high speeds and changes in your molecular vibratory frequency, you can phase shift out of this dimension altogether and into others. Many speedsters encounter this effect as a complication of their powers rather than an ability they control although they may develop it as a regular power stunt in order to get back home. (Movement 2 (Dimensional Travel, parallel universes) • 4 points)"
      },
      {
        "id": "prof_speed_powers_run_on_water",
        "name": "Run On Water",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Water-Walking",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "while moving"
          }
        ],
        "notes": "You move fast enough that your feet are like stones skipping across the surface of a pond, allowing you to run across the surface of water without breaking the surface tension enough to sink. (Movement 1 (Water-Walking), Limited to while moving • 1 point.)"
      },
      {
        "id": "prof_speed_powers_run_up_walls",
        "name": "Run Up Walls",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Wall-crawling",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "while moving"
          }
        ],
        "notes": "You can run fast enough to defy gravity over short distances, allowing you to run up the sides of sheer surfaces, barely slowing down. (Movement 1 (Wall-crawling), Limited to while moving • 1 point.)"
      },
      {
        "id": "prof_speed_powers_running_jump",
        "name": "Running Jump",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Requires a running start, -1 point"
          }
        ],
        "notes": "You take advantage of the considerable momentum of your movement to fling yourself through the air like a catapult. (Leaping, Quirk (Requires a running start, -1 point) • 1 point for 2 ranks, then +1 point per rank)"
      },
      {
        "id": "prof_speed_powers_running_speed",
        "name": "Running Speed",
        "rank": 10,
        "effectId": "speed",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [],
        "notes": "One of the primary speed powers, you have considerable running speed. At low ranks, you're as fast as a swift land animal (like a horse or cheetah), while at high ranks, you are faster than even the fastest aircraft! Note that this power is strictly linear movement speed, in order to accomplish tasks (other than moving from place to place) faster, see the Fast Action power. The combination of the two lets you do things like search an entire building: moving at great speed and also opening, closing, and looking through hiding places quickly. (Speed • 1 point per rank Some speedsters have high flight speed rather than ground speed, substituting Flight for Speed.)"
      },
      {
        "id": "prof_speed_powers_flight_speed",
        "name": "Flight Speed",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [],
        "notes": "Some speedsters have high flight speed rather than ground speed, substituting Flight for Speed. (Flight • 2 points per rank)"
      },
      {
        "id": "prof_speed_powers_share_speed",
        "name": "Share Speed",
        "rank": 10,
        "effectId": "speed",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Velocity",
        "extras": [
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You enable others to move as fast as you. Some speedsters may have this modifier for powers like Fast Action and Lightning Reflexes as well as Running Speed. If you can Share Speed at a distance, add the Ranged modifier. (Affects Others on Running Speed • 1 point per rank)"
      },
      {
        "id": "prof_speed_powers_spinning_drill",
        "name": "Spinning Drill",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [],
        "notes": "By spinning rapidly in place, you become like a human drillbit, able to bore down into the earth or even through harder materials (using your speed and vibratory rate like an actual drill). You can even shift direction as you bore downwards, moving through the earth like a drilling machine. (Burrowing • 1 point per rank SUPER-TEMPORAL SPEED A combination of tremendous speed (although it may not need to be more than 88 miles per hour...) and vibrational control allows you to break the \"time barrier\" and travel through time. Like Dimensional Vibration (previously) speedsters often discover this power by accident after being pushed to their limits in other circumstances, having to duplicate it as a power stunt in order to return to their own time (after having an adventure or two in other time periods).)"
      },
      {
        "id": "prof_speed_powers_super_temporal_speed",
        "name": "Super-Temporal Speed",
        "rank": 3,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Time Travel",
        "extras": [],
        "flaws": [],
        "notes": "A combination of tremendous speed (although it may not need to be more than 88 miles per hour...) and vibrational control allows you to break the \"time barrier\" and travel through time. Like Dimensional Vibration (previously) speedsters often discover this power by accident after being pushed to their limits in other circumstances, having to duplicate it as a power stunt in order to return to their own time (after having an adventure or two in other time periods). (Movement 3 (Time Travel) • 6 points)"
      },
      {
        "id": "prof_speed_powers_cyclone",
        "name": "Cyclone",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Speed, Velocity",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "fine movement and powerful winds"
          }
        ],
        "notes": "Stirring the air at super-speed, you kick up a powerful cyclone capable of picking up and moving objects where you direct them. The effect is relatively crude, capable of moving things, but no good for delicate work or much more than moving something someplace and then setting it down with a final gust. The winds kicked up by the cyclone may also stir up dust and small loose objects. (Burst Area Move Object, Concentration, Side-Effect (limited fine movement and powerful winds) • 1 point per rank)"
      },
      {
        "id": "prof_speed_powers_fast_action",
        "name": "Fast Action",
        "rank": 10,
        "effectId": "quickness",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [],
        "notes": "City with just enough ranks of Quickness to cover the time, unless you also have the Speed to cover the distance. The same with searching through every volume in a vast library. On the other hand, you can read a book amazingly fast, or attempt all the possible code combinations in a lock, or assemble (or disassemble) a machine, and so forth. (Quickness • 1 point per rank)"
      },
      {
        "id": "prof_speed_powers_lightspeed",
        "name": "Lightspeed (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Speed, Velocity",
        "extras": [],
        "flaws": [],
        "notes": "The speed of light is 186,000 miles per second, putting it at nearly 670 million miles per hour, (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Strength Powers",
    "profiles": [
      {
        "id": "prof_strength_powers_fast_healing",
        "name": "Fast Healing",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [],
        "notes": "Your metabolism is so fast you can heal in a mere fraction of the usual time. (Regeneration • 1 point per rank)"
      },
      {
        "id": "prof_strength_powers_lightning_reflexes",
        "name": "Lightning Reflexes",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Strength, Improved Initiative",
        "extras": [],
        "flaws": [],
        "notes": "Along with moving and acting fast, the third major component of super-speed is reacting quickly. This power improves your initiative modifier, often so much that only other speedsters have any chance at all of beating you when it comes to acting first in the initiative order. (Enhanced Advantage (Improved Initiative) • 1 point per rank)"
      },
      {
        "id": "prof_strength_powers_quicker_than_the_eye",
        "name": "Quicker Than the Eye",
        "rank": 4,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Strength, Visual",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "while moving"
          }
        ],
        "notes": "You move in a blur of motion, almost impossible to see (although others with Quickness or Rapid Vision might be able to counter this power). (Concealment 4 (Visual), Limited to while moving • 4 points)"
      },
      {
        "id": "prof_strength_powers_speed_learning",
        "name": "Speed-Learning",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Strength, Beginner's Luck",
        "extras": [],
        "flaws": [],
        "notes": "You can \"cram\" at super-speed, instantly learning how to do something. The knowledge doesn't \"stick\" however, so you don't retain the information for more than one use of the skill. (Enhanced Advantage 1 (Beginner's Luck) • 1 point.)"
      },
      {
        "id": "prof_strength_powers_bullet_toss",
        "name": "Bullet Toss",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Strength, Ballistic",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "requires objects to throw, -1 point"
          }
        ],
        "notes": "You can fling small, hard objects like pebbles or coins with enough velocity that they hit like bullets. The listed power is for flinging one or two projectiles at a single target, if you can use a handful of them, and spread them out over multiple targets, add the Multiattack modifier, increasing cost by +1 per rank. (Ranged Damage (ballistic), Quirk (requires objects to throw, -1 point) • 1 point for rank 1, +2 points per)"
      },
      {
        "id": "prof_strength_powers_cracking_the_whip",
        "name": "Cracking the Whip",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Strength, Physical",
        "extras": [
          {
            "id": "area_line",
            "name": "Area (Line 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "You can tear up flooring, pavement, or even sod and snap it like a carpet, creating a wave that bowls over anyone in its path. The default version is a standard line area: 5 feet wide and 30 feet long. (Line Area Affliction (Resisted by Dodge, Overcome by Fortitude; Dazed and Vulnerable, Prone and Stunned), Extra Condition, Limited Degree, Limited to targets on an appropriate surface • 1 point per rank, +1 point)"
      },
      {
        "id": "prof_strength_powers_cutting_loose",
        "name": "Cutting Loose",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Strength, Physical",
        "extras": [
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "When you cut loose, there's almost nothing your strength can't tear or smash through. (Penetrating on Strength Damage • 1 point per rank)"
      },
      {
        "id": "prof_strength_powers_finger_flick",
        "name": "Finger Flick",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Strength, Physical",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "So great is your strength that the merest flick of your finger is enough to do damage. Even a foe engaged in fighting you is hard-pressed to notice this casual gesture as a threat. The casualness of it can make an effective surprise attack, as well as a potential circumstance bonus to Intimidation checks against those who see it in action! (Subtle 1 on Strength Damage • 1 point.)"
      },
      {
        "id": "prof_strength_powers_massive_knockback",
        "name": "Massive Knockback",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Flinging Targets Away"
          }
        ],
        "notes": "You not only hit hard, but deliver considerable momentum with your punches, enough to send targets flying. If you successfully hit, and the target fails a Strength check against your effect rank, they are flung back a distance equal to your effect rank minus their mass rank. (Move Object, Close Range, Limited to Flinging Targets Away, Linked to Strength Damage • 1 point)"
      },
      {
        "id": "prof_strength_powers_shockwave",
        "name": "Shockwave",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Strength, Physical",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "A stomp or strike to the ground, you create powerful shock waves that ripple out, knocking everyone within a 30 foot radius of you off their feet. (Burst Area Affliction (Resisted by Dodge, Overcome by Fortitude; Dazed and Vulnerable, Stunned and Prone), Extra Condition, Limited Degree, Limited to targets on the ground • 1 point per rank, +1 point per rank)"
      },
      {
        "id": "prof_strength_powers_sleeper_hold",
        "name": "Sleeper Hold",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Strength, Physical",
        "extras": [
          {
            "id": "progressive",
            "name": "Progressive",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "grab_based",
            "name": "Grab-Based",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You can apply your strength to pressure points, quickly rendering a grabbed opponent unconscious. This is a more effective form of the Chokehold advantage, since it has its own resistance rank rather than starting at DC 10 and escalating like normal suffocation. If the target escapes from your grab, the effect ends. (Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated), Progressive, Grab-Based • 2 points per rank)"
      },
      {
        "id": "prof_strength_powers_thunderclap",
        "name": "Thunderclap",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Strength, Physical",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "Just clapping your hands together can create a loud shock wave capable of stunning everyone in a 30 foot radius around you. If the Thunderclap is loud enough to potentially deafen targets in the area, apply an additional Extra Condition for Impaired and Disabled hearing. (Burst Area Affliction (Resisted by Fortitude, Overcome by Fortitude; Dazed and Vulnerable, Defenseless and Stunned), Extra Condition, Limited Degree • 2 points)"
      },
      {
        "id": "prof_strength_powers_bracing",
        "name": "Bracing",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Strength, Being moved",
        "extras": [],
        "flaws": [],
        "notes": "When you plant your feet and focus, you are strong enough that nothing can move you against your will. (Immunity 10 (being moved), Sustained • 10 points)"
      },
      {
        "id": "prof_strength_powers_stonewall",
        "name": "Stonewall",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Strength, To being hit",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "effect rank or attack's Damage rank"
          }
        ],
        "notes": "Foes striking you bare-handed are in for a surprise, since punching you is literally like \"hitting a stone wall\"-attackers are more likely to hurt themselves than they are you! (Reaction Damage (to being hit), Limited to effect rank or attack's Damage rank, whichever is less • 3 points)"
      },
      {
        "id": "prof_strength_powers_super_endurance",
        "name": "Super-Endurance",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Strength, Life Support",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "approximately 30 minutes at a time"
          },
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "limited to approximately 30 minutes at a time, -1 point"
          }
        ],
        "notes": "You may not be completely immune to harsh environmental conditions, but you can ignore them far longer than ordinary people, even enduring hazards like the vacuum of space or the depths of the ocean for a time. (Immunity 10 (Life Support), Quirk (limited to approximately 30 minutes at a time, -1 point) • 9 points)"
      },
      {
        "id": "prof_strength_powers_super_toughness",
        "name": "Super-Toughness",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [],
        "notes": "You are incredibly tough. Whether it is thick slabs of dense muscle and bone like rock, armor plating, a leathery hide, or some mysterious force permeating your entire being, you shrug off damage that would seriously hurt most people. Super-Toughness is often Impervious, allowing you to completely ignore lesser attacks. If its effects are obvious (having a rocky hide or armored scaled, for example), apply the Noticeable modifier. Otherwise, you look just like anyone else-until somebody hits you. (Protection • 1 point per rank)"
      },
      {
        "id": "prof_strength_powers_tug_of_war",
        "name": "Tug of War",
        "rank": 10,
        "effectId": "damage",
        "action": "Reaction",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Strength, When grabbed",
        "extras": [],
        "flaws": [],
        "notes": "You are strong enough to simply flex an opponent grabbing you right into a punch, head-butt, or other strike, making wrestling you a much more difficult proposition. This includes yanking ranged grabbers using an effect with a descriptor that allows you to exert force on them, such as a tether or similar connection. (Reaction on Strength Damage (when grabbed) • 3 points per rank)"
      },
      {
        "id": "prof_strength_powers_makeshift_handholds",
        "name": "Makeshift Handholds",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Strength, Wall-crawling",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "surfaces with material Toughness less than Strength modifier"
          }
        ],
        "notes": "You can dig your hands and feet into hard surfaces in order to climb them more easily. When climbing any surface with a material Toughness (Deluxe Hero's Handbook, page 157) less than your Strength modifier, you do not need to make Athletics skill checks to climb. One rank lets you climb at your ground speed minus 1 rank; two ranks lets you climb at your full ground speed, plus you are not vulnerable while climbing. (Movement 1 (Wall-crawling), Limited to surfaces with material Toughness less than Strength modifier • 1 point per rank)"
      },
      {
        "id": "prof_strength_powers_super_leaping",
        "name": "Super-Leaping",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [],
        "notes": "Super-strong leg muscles can send you hurtling through the air with powerful leaps, perhaps even carrying you for miles! (Leaping • 1 point per rank)"
      },
      {
        "id": "prof_strength_powers_unstoppable",
        "name": "Unstoppable",
        "rank": 10,
        "effectId": "burrowing",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Strength, Physical",
        "extras": [
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Once you get moving, nothing stands in your way for long. You simply smash through anything in front of you and continue moving at a steady pace, leaving a trail of destruction in your wake. (Penetrating Burrowing • 2 points per rank)"
      },
      {
        "id": "prof_strength_powers_power_lifting",
        "name": "Power-Lifting",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Lifting"
          }
        ],
        "notes": "You have sheer lifting ability out of proportion with your size and apparent strength. (Enhanced Strength, Limited to Lifting • 1 point per rank)"
      },
      {
        "id": "prof_strength_powers_strength_boost",
        "name": "Strength Boost",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You can temporarily increase your Strength rank, going from normal to superhuman strength or from superhuman to truly godlike. The default Strength Boost simply requires a moment's concentration to activate, and then fades away at a rate of 1 rank per round. Your boosted Strength must remain within the limits of the series power level, so some characters have normal Strength below the limit or apply the Inaccurate modifier to compensate. (Enhanced Strength, Fades • 1 point per rank Other types of Strength Boost are circumstantial, such as the following examples:)"
      },
      {
        "id": "prof_strength_powers_strength",
        "name": "Strength (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [],
        "notes": "M&M quantifies \"strength\" with the ability of the same name, which includes certain \"built in\" (Feature • 1 point)"
      },
      {
        "id": "prof_strength_powers_toughness",
        "name": "Toughness (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [],
        "notes": "Similar to Strength, M&M quantifies a character's \"toughness\" with a numerical defense (Feature • 1 point)"
      },
      {
        "id": "prof_strength_powers_hands_like_tools",
        "name": "Hands Like Tools (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [],
        "notes": "You have sufficient strength and toughness to use your bare hands to do things like (Feature • 1 point)"
      },
      {
        "id": "prof_strength_powers_strongest_there_is",
        "name": "Strongest There Is (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [],
        "notes": "In any contest or comparison of Strength, you win against anyone else with the same (Feature • 1 point)"
      },
      {
        "id": "prof_strength_powers_mental_strength",
        "name": "Mental Strength (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Strength, Physical",
        "extras": [],
        "flaws": [],
        "notes": "Your strength is more a manifestation of mind-over-matter than physical muscle (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Summoning Powers",
    "profiles": [
      {
        "id": "prof_summoning_powers_absorption_boost",
        "name": "Absorption Boost",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "the lesser of effect rank or absorbed energy rank"
          },
          {
            "id": "fades",
            "name": "Fades",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "May be electricity, heat, kinetic, or any other suitable source. Note that the power does not grant any resistance to the energy source; apply the appropriate Immunity effect for that. See energy-based sections like Electrical Powers and Kinetic Powers for examples. (Enhanced Strength, Fades, Limited to the lesser of effect rank or absorbed energy rank • 1 point per 2 ranks)"
      },
      {
        "id": "prof_summoning_powers_raging_strength",
        "name": "Raging Strength",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "while angry"
          }
        ],
        "notes": "Madder you get, the stronger you get. Your higher Strength rank is Limited to when you are angry (see the Temper complication, following); at your emotional \"baseline\" you cannot access your Enhanced Strength. Raging Strength may also be accompanied by Side Effects like becoming vulnerable (heedless of your own defense) while raging. (Enhanced Strength, Limited to while angry • 1 point per rank)"
      },
      {
        "id": "prof_summoning_powers_animation",
        "name": "Animation",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Available Objects"
          }
        ],
        "notes": "You can imbue objects in your line of sight with animation and a semblance of life, making them constructs under your control (see Constructs, Deluxe Hero's Handbook, page 231). Create the object as a construct with (Summon rank × 15) total power points. Constructs-like other agents-are subject to the series power level limits. The object gains movement according to its form: statues can get up and walk, for example, rugs can crawl, balls roll, cars drive, etc. Some animators are additionally Limited to a particular type of objects, such as pictures, statues, machines, stonework, and so forth. (Perception Range Summon Animated Object, Limited to Available Objects • 3 points per rank)"
      },
      {
        "id": "prof_summoning_powers_constructs",
        "name": "Constructs",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "You create mobile constructs out of a particular medium, typically some type of energy: light, sound, shadows, and so forth. Constructs under your control act as you direct (with the standard Summon parameters of a move action to issue orders and agents taking only a single action per turn, unless modified). (Ranged Summon Construct, Broad Type, Controlled • 5 points per rank)"
      },
      {
        "id": "prof_summoning_powers_duplication",
        "name": "Duplication",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "Tered. You can also make your duplicate disappear at will by turning off your power. Apply the Multiple Minions extra if you can summon more than one duplicate, and the Horde extra if you can summon them all at once. Given the power's cost, duplicators tend to be less superhuman-built on fewer power points-the more duplicates they can summon. (Summon Duplicate, Heroic • 4 points per rank)"
      },
      {
        "id": "prof_summoning_powers_necromancy",
        "name": "Necromancy",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Summoning, 32 total",
        "extras": [],
        "flaws": [],
        "notes": "You can imbue corpses, even skeletal remains, with a semblance of life, turning them into undead creatures that rise up at your command. Use the zombie archetypes from the Gamemaster's Guide (page 144) or apply the zombie template (page 145) to a different archetype for things like creating zombie or skeletal dinosaurs or other creatures. Although the power as listed has a substantial cost per rank, only 1 or 2 ranks are needed to cover the undead's power level and costs; Summon Zombies costs 14 points while Summon Skeletons costs 28 points. (Summon Undead, Controlled, Horde, Multiple Minions (32 total) • 14 points per rank)"
      },
      {
        "id": "prof_summoning_powers_swarm",
        "name": "Swarm",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Summoning, Active, Controlled",
        "extras": [],
        "flaws": [],
        "notes": "Is immune to direct physical attacks like punches and slashes, but still affected by area or energy attacks. Larger swarms may have ranks of Growth and the Area modifier on their Swarm Attack to represent their greater overall size. Applying the Multiple Minions modifier allows you to summon multiple swarms able to split up and act independently of each other. (Summon Swarm (Active, Controlled) • 4 points per rank SWARM PL8 • MR3 STR - STA 2 AGL 0 DEX 0 FGT 0 INT - AWE 0 PRE 0)"
      },
      {
        "id": "prof_summoning_powers_decoys",
        "name": "Decoys",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Summoning, All Visual Senses",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Decoy Images"
          }
        ],
        "notes": "You summon up a mass of seemingly identical duplicates, but they are not real and cannot physically interact, but do provide useful cover, allowing you to lose yourself amongst them. You gain the defensive benefits of total concealment (a -5 circumstance penalty to attacks against you, and opponents must guess your location) although none of the other benefits. (Concealment 4 (All Visual Senses), Limited to Decoy Images • 4 points)"
      },
      {
        "id": "prof_summoning_powers_sacrifice",
        "name": "Sacrifice",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "You can shift a successful attack on you to one of your minions instead by spending a hero point. If a Gamemaster character uses this power, award the affected player a hero point instead. Gamemasters may wish to prohibit minions from having the Interpose advantage, requiring this power instead. (Add Sacrifice modifier to Summon • 1 point.)"
      },
      {
        "id": "prof_summoning_powers_castling",
        "name": "Castling",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Summoning, Wherever duplicate is",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Switching Places With Duplicate"
          }
        ],
        "notes": "You can \"swap\" places with one of your duplicates (see Duplication, previously) instantly. You appear in the duplicate's place and it appears in yours, so long as you are within the Teleport effect's range of each other. If you apply the Subtle modifier, those around you may not even be able to tell you have switched places! (Teleport, Accurate (wherever duplicate is), Easy, Extended, Limited to Switching Places With Duplicate (-2), Medium (Duplicate) • 2 points per rank)"
      },
      {
        "id": "prof_summoning_powers_duplicate_ladder",
        "name": "Duplicate Ladder",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "You summon a \"chain\" of duplicates to cover a distance, then re-absorb them at the destination point, essentially allowing you to \"leap\" across a span like an instant, living bridge. The number of duplicates is largely irrelevant, a descriptor of the effect, although this power is most often connected with Duplication (previously). A version of it might work with other Summon effects as well. This is also an effective power stunt for duplicators who occasionally find a need for it and can expend the extra effort (and/or the hero point). (Leaping • 1 point per rank)"
      },
      {
        "id": "prof_summoning_powers_summon_steed",
        "name": "Summon Steed",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Continuous",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "You summon a steed with traits equal to the horse archetype (Gamemaster's Guide, page 134) with 6 additional power points of traits-most likely effects such as Flight or Movement. More unusual steeds should be created as full characters to determine the Summon rank needed for them. (Summon Steed 1, Continuous • 3 points)"
      },
      {
        "id": "prof_summoning_powers_power",
        "name": "Power",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "You conjure up a vehicle to transport you (and possibly others). Create it according to the usual vehicle rules (Deluxe Hero's Handbook, page 221) based on (rank × 15 points). Cost-wise, this is similar to the Equipment advantage (which costs 1 point per 5 points of the vehicle's cost) but sustained rather than continuous and with different descriptors. You may pilot the vehicle yourself or have someone else do so. If the vehicle is capable of driving itself, apply the Responsive modifier of Summon; it essentially removes the move action required to pilot. If the vehicle is remotecontrolled and must come to you, rather than simply appearing, apply the Self-Powered modifier. (Summon Vehicle, Controlled • 3 points per rank)"
      },
      {
        "id": "prof_summoning_powers_anatomic_split",
        "name": "Anatomic Split",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Summoning, Lose use of the separated part",
        "extras": [],
        "flaws": [],
        "notes": "You can split off different parts of your body without harm, allowing them to act semi-independently. Their movement abilities tend to be limited to crawling or shuffling, but a separated eye can still see and a separated ear can still hear, and so forth. The power format assumes the ability to make up to eight splits, with each part as a relatively low-cost \"agent\" (having only a portion of your capabilities) requiring only 1 or perhaps 2 ranks. If your separated parts have more significant capabilities, increase the Summon rank to account for the added cost. (Summon Body Part, Controlled, Mental Link, Multiple Minions 3, Side-Effect (Lose use of the separated part) • 1 point + 8 points per rank)"
      },
      {
        "id": "prof_summoning_powers_combine",
        "name": "Combine",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Summoning, Requires all components be present",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "requires all components be present"
          },
          {
            "id": "feedback",
            "name": "Feedback",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "Obey any series power level limits, although the GM is free to set different limits for the component characters and the combined form, as appropriate for the series. This power best suits when a group of characters summons an even more powerful combined agent; for instances where a character has two or more \"normal\" components, consider an Identity complication and Activation modifier instead. (Summon Combined Form, Heroic, Feedback, Limited (requires all components be present), Limited (components vanish while combined form is present) • 1 point per rank)"
      },
      {
        "id": "prof_summoning_powers_dimensional",
        "name": "Dimensional (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "The power summons agents from other dimensions, from parallel universe soldiers to demons (Feature • 1 point)"
      },
      {
        "id": "prof_summoning_powers_duplicate",
        "name": "Duplicate (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "The agents are duplicates of an existing character, often the summoner, but a power might (Feature • 1 point)"
      },
      {
        "id": "prof_summoning_powers_necromantic",
        "name": "Necromantic (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "These Summon effects call upon the dead, typically undead creatures like zombies or (Feature • 1 point)"
      },
      {
        "id": "prof_summoning_powers_monitor",
        "name": "Monitor (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "You always know the condition of any of your agents. So if one goes from normal to incapaci- (Feature • 1 point)"
      },
      {
        "id": "prof_summoning_powers_servants",
        "name": "Servants (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Summoning, Minion",
        "extras": [],
        "flaws": [],
        "notes": "You can summon \"servant\" agents to handle various routine, mundane tasks but not (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Talent Powers",
    "profiles": [
      {
        "id": "prof_talent_powers_empower",
        "name": "Empower",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Available Subjects"
          }
        ],
        "notes": "Ment. For villains, Empowerment is more of a plot device and may be treated as such without worrying about the construction or point allocations of this power. (Summon Empowered Version, General Type, Limited to Available Subjects • 2 points per rank)"
      },
      {
        "id": "prof_talent_powers_fearsome_presence",
        "name": "Fearsome Presence",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Talent, Visual",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          },
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your very presence can strike terror into the hearts of your foes, allowing you to win some battles without having to do anything more than show up! Fearsome Presence is also an effective model for other interaction talents with extraordinary influence over people, such as a Befuddling Lie based on a Deception check and inflicting the Entranced, Stunned, and Unaware conditions, for example. (Perception (Visual) Area Affliction (Resisted and Overcome by Will; Impaired, Disabled, Paralyzed), Selective, Subtle, Intimidation Check Required (DC 11) • 3 points per rank)"
      },
      {
        "id": "prof_talent_powers_flurry",
        "name": "Flurry",
        "rank": 10,
        "effectId": "variable",
        "action": "Standard",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Talent, Training",
        "extras": [
          {
            "id": "multiattack",
            "name": "Multiattack",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can launch a virtual whirlwind of attacks against your foes, applying the Multiattack modifier to your attack, up to the rank of the modifier or the attack, whichever is lower. Therefore with 3 ranks in Flurry, you can Multiattack with a light pistol (Damage 3) even though it is normally not capable of Multiattack fire. If you only flurry with a subset of attacks-such as guns or melee weaponsreduce the Variable Descriptor modifier to 1 rank. (Multiattack, Variable Descriptor 2 (any attack effect you wield, only up to the attack's rank) • 2 points +1 point per rank)"
      },
      {
        "id": "prof_talent_powers_hurt_anything",
        "name": "Hurt Anything",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Talent, Any Damage Effect you wield",
        "extras": [
          {
            "id": "penetrating",
            "name": "Penetrating",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Everything has a weak point, at least so far as you are concerned. Any Damage you wield is Penetrating, up to the rank you choose, allowing you to potentially affect targets others with the same attack could not. (Penetrating, Variable Descriptor (any Damage Effect you wield) • 1 point +1 point per rank)"
      },
      {
        "id": "prof_talent_powers_pressure_points",
        "name": "Pressure Points",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Talent, Dazed, Stunned, Incapacitated",
        "extras": [],
        "flaws": [],
        "notes": "You're trained in how to precisely apply pressure to certain points of the body to cause disorientation, pain, and even unconsciousness. Generally, this ability is acquired as an Alternate Effect of your Strength Damage at a rank equal to your Strength rank (also making it a useful power stunt). You can even acquire multiple versions of this attack, representing different types of strikes or nerve manipulation, with different conditions imposed by the Affliction. True mastery of Pressure Points might apply the Variable Condition modifier to the Affliction (see the Illusion Powers section). (Affliction (Dazed, Stunned, Incapacitated), Resisted and Overcome by Fortitude • 1 point per rank)"
      },
      {
        "id": "prof_talent_powers_striking_power",
        "name": "Striking Power",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [],
        "notes": "You have trained to harden and strengthen your hands and to focus the power of your blows, increasing your sheer striking power. The GM may limit this power to just a few ranks (say 2-3) or to a maximum you can increase your total Strength damage, such as rank 6. (Strength-based Damage • 1 point per rank)"
      },
      {
        "id": "prof_talent_powers_acquired_immunity",
        "name": "Acquired Immunity",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Diseases and poisons",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Half Effect"
          }
        ],
        "notes": "Through natural talent or careful buildup, you have an acquired immunity to toxins and pathogens that allows you to more easily resist their effects. (Immunity 2 (diseases and poisons), Limited to Half Effect • 1 point)"
      },
      {
        "id": "prof_talent_powers_perfect_defense",
        "name": "Perfect Defense",
        "rank": 40,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Concentration",
        "descriptor": "Talent, Attacks targeting Dodge or Parry",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your mastery of combat technique is so great that when you choose to go on the defensive, you are virtually untouchable. You either parry and slip around close attacks, or nimbly dodge and evade ranged attacks. Doing so takes virtually all your concentration, however; you're limited to move and free actions while using your Perfect Defense, and it does not protect you from attacks that do not target you in the ways you are trained to avoid, so things like area and perception ranged attacks still affect you normally. You must also be able to defend yourself: If you are vulnerable or defenseless, your Perfect Defense does not work, either. (Immunity 40 (attacks targeting Dodge or Parry), Concentration Duration • 20 points (40 for both))"
      },
      {
        "id": "prof_talent_powers_tough",
        "name": "Tough",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [],
        "notes": "You are tougher than you look, perhaps a good deal tougher. You have ranks of Protection (increasing your Toughness defense) attributed to natural ability or training. Like other talent powers, the GM may limit you to no more than 2-3 ranks. (Protection • 1 point per rank)"
      },
      {
        "id": "prof_talent_powers_unfazeable",
        "name": "Unfazeable",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Interaction Skills",
        "extras": [],
        "flaws": [],
        "notes": "Nothing seems to shake your perfect composure, whether due to an icy calm, a devil-may-care attitude, or just a stoic stubbornness. Someone may as well be trying to sway a force of nature. (Immunity 5 (Interaction Skills) • 5 points)"
      },
      {
        "id": "prof_talent_powers_parkour",
        "name": "Parkour",
        "rank": 5,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Talent, Environmental Adaptation (Urban",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Moving in Urban Environments"
          }
        ],
        "notes": "You're a master of parkour, or \"free-running,\" a style of moving quickly through crowded urban environments. Essentially, you suffer no movement penalties of any kind in an urban environment, you can vault and climb quickly, and you suffer no effect from slips or falls, so long as you are near a hand hold or other means of catching yourself. Circumstance penalties for your environment may still apply, but movement penalties do not. (Movement 5 (Environmental Adaptation (Urban), Safe Fall, Sure-Footed 2, Wall-Crawling 1), Limited to Moving in Urban Environments (4 ranks) • 6 points)"
      },
      {
        "id": "prof_talent_powers_perfect_balance",
        "name": "Perfect Balance",
        "rank": 2,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Talent, Wall-crawling 2",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "upright movement"
          }
        ],
        "notes": "You have such exceptional balance that you can move along the narrowest of paths without slowing or falling. You move at your normal speed, even along a tightrope or high-wire, and never have to make a check to avoid falling under such circumstances. (Movement 2 (Wall-crawling 2), Limited to upright movement • 2 points)"
      },
      {
        "id": "prof_talent_powers_speed_climbing",
        "name": "Speed-Climbing",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Talent, Wall-crawling 1",
        "extras": [],
        "flaws": [],
        "notes": "You can climb quickly and easily, like a trained \"human fly\". With the Check Required modifier, you still suffer the normal results of failing an Athletics check while climbing (Deluxe Hero's Handbook, page 116) but you move twice as fast (speed -1 rather than speed -2). With 2 ranks of Movement, you climb very quickly (at your normal ground speed). Without the flaw, you also climb unerringly: you never fall or fail to make a climb. (Movement 1 (Wall-crawling 1), Athletics Check Required (DC 11) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_speed_swimming",
        "name": "Speed-Swimming",
        "rank": 1,
        "effectId": "swimming",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [],
        "notes": "You're a powerful swimmer, swimming at your speed rank -1 (rather than -2 like most swimmers). Note this talent does not exempt you from Athletics checks to swim, or allow you to breathe underwater. (Swimming 1 • 1 point.)"
      },
      {
        "id": "prof_talent_powers_vaulting",
        "name": "Vaulting",
        "rank": 2,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Talent, DC 11",
        "extras": [],
        "flaws": [],
        "notes": "You're capable of remarkable leaps, spanning up to 30 feet (slightly more than the world's record for a running long jump). Without the Check Required modifier, you can do it effortlessly. (Leaping 2, Acrobatics Check Required (DC 11) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_triple_jointed",
        "name": "Triple-Jointed",
        "rank": 4,
        "effectId": "shrinking",
        "action": "Free",
        "range": "Personal",
        "duration": "Concentration",
        "descriptor": "Talent, DC 12",
        "extras": [],
        "flaws": [],
        "notes": "You can bend and contort to fit into surprisingly small spaces and areas (half human normal size). (Shrinking 4, Innate, Concentration, Acrobatics or Sleight of Hand Check Required (DC 12) • 3 points)"
      },
      {
        "id": "prof_talent_powers_perfect_pitch",
        "name": "Perfect Pitch",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Analytical Auditory",
        "extras": [],
        "flaws": [],
        "notes": "You have a degree of sensory refinement most people do not. While vision and hearing are normally acute, those with this talent have additional acute senses. You can, for example, easily distinguish between different wine vintages by taste with Refined Palate, pick out specific notes with Perfect Pitch, or recognize a specific brand of perfume with Sensitive Smell. (Senses 1 (Analytical Auditory) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_refined_palate",
        "name": "Refined Palate",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Acute Taste",
        "extras": [],
        "flaws": [],
        "notes": "Refined Palate power from Talent Powers. (Senses 1 (Acute Taste) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_sensitive_smell",
        "name": "Sensitive Smell",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Acute Olfactory",
        "extras": [],
        "flaws": [],
        "notes": "Sensitive Smell power from Talent Powers. (Senses 1 (Acute Olfactory) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_ambidexterous",
        "name": "Ambidexterous",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [],
        "notes": "You are truly ambidextrous, able to use either hand (or all of your hands, if you have more than two) equally well. You suffer no circumstance penalties due to which hand you use to perform a task. (Feature 1 (no circumstance penalties for off-hand use) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_at_a_glance",
        "name": "At a Glance",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Rapid Vision",
        "extras": [],
        "flaws": [],
        "notes": "You take things in quickly, instantly assessing a scene with a single glance. (Senses 1 (Rapid Vision) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_brilliant_deduction",
        "name": "Brilliant Deduction",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Postcognition",
        "extras": [],
        "flaws": [],
        "notes": "Whether it is a few scuffs in the dirt or some stray hairs on someone's collar, you can reconstruct entire past events with amazing accuracy just by examining the available evidence. You can substitute an Investigation check for the Perception check normally required for Postcognition if your examination of the evidence is successful. (Senses 4 (Postcognition), Investigation Check Required (DC 12) • 2 points)"
      },
      {
        "id": "prof_talent_powers_daredevil",
        "name": "Daredevil",
        "rank": 10,
        "effectId": "luck_control",
        "action": "Reaction",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [],
        "notes": "They say \"fortune favors the bold,\" and that has certainly always been your experience. You've lost count of the times when the chips have been down and fate has handed you and your friends a lucky break. (Luck Control • 3 points per rank EAGLE-EYED You are sharp-eyed over much greater distances than most people.)"
      },
      {
        "id": "prof_talent_powers_eagle_eyed",
        "name": "Eagle-Eyed",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Extended Vision",
        "extras": [],
        "flaws": [],
        "notes": "You are sharp-eyed over much greater distances than most people. (Senses 1 (Extended Vision) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_light_sleeper",
        "name": "Light Sleeper",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [],
        "notes": "You are unaffected by circumstance penalties to your Perception checks to hear things due to being asleep (normally a +10 DC, Deluxe Hero's Handbook, page 124). Thus, you're more likely to hear (and be awakened by) any sound. (Feature 1 (ignore hearing penalties for sleeping) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_master_escape_artist",
        "name": "Master Escape Artist",
        "rank": 1,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Escaping"
          }
        ],
        "notes": "You can escape from virtually any bonds or containment, so long as you are capable of taking action. While this talent allows you to easily slip free of ropes, handcuffs, straitjackets and other bindings, and to escape most cages and the like, it may be ineffective against some traps (at the GM's discretion), and is often coupled with ranks in the Sleight of Hand skill and possibly the Ultimate Effort (Sleight of Hand) advantage. (Insubstantial 1, Limited to Escaping • 4 points)"
      },
      {
        "id": "prof_talent_powers_master_linguist",
        "name": "Master Linguist",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "takes at least a scene to pick up a new language"
          }
        ],
        "notes": "You have such a talent for languages that you speak virtually all of them, and can quickly figure out a new language if you are exposed to it for a while. (Comprehend 2 (Languages, Understand and Be Understood), Quirk (takes at least a scene to pick up a new language) • 3 points)"
      },
      {
        "id": "prof_talent_powers_number_cruncher",
        "name": "Number Cruncher",
        "rank": 10,
        "effectId": "quickness",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Mathematical Calculations"
          }
        ],
        "notes": "You can perform mathematical calculations rapidly in your head. The basic talent subtracts 3 ranks from the time value to perform a calculation; each additional power point adds 3 more ranks. A realistic limit is probably 3 to 4 points (for a total of 9 to 12 ranks). (Quickness, Limited to Mathematical Calculations • 1 point per 3 ranks)"
      },
      {
        "id": "prof_talent_powers_situational_awareness",
        "name": "Situational Awareness",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Talent, Danger Sense, visual",
        "extras": [],
        "flaws": [],
        "notes": "You are hyper-aware of your surroundings, making you particularly sensitive to potential threats. You have a fair chance of avoiding surprises and ambushes others might walk into. (Senses 1 (Danger Sense, visual) • 1 point.)"
      },
      {
        "id": "prof_talent_powers_speed_reader",
        "name": "Speed Reader",
        "rank": 10,
        "effectId": "quickness",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Talent, Training",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Reading"
          }
        ],
        "notes": "This talent is like Number Cruncher (previously) except it applies to reading text rather than performing calculations. Each power point invested subtracts 3 from the time value required to read a document. (Quickness, Limited to Reading • 1 point per 3 ranks)"
      }
    ]
  },
  {
    "category": "Tech Powers",
    "profiles": [
      {
        "id": "prof_tech_powers_animate_machines",
        "name": "Animate Machines",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Tech, Machines",
        "extras": [],
        "flaws": [
          {
            "id": "self_powered",
            "name": "Self-Powered",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "This power assumes the ability to modify the animated machines, reconfiguring them to provide any traits or effects reasonable for the descriptor (see Tech Descriptors). So you can transform a car or even a pile of mechanical junk into a robot, for example. If lacking this capability, the GM may allow an additional Limit on the power. (Summon Animated Object, Controlled, General Type (Machines), Self-Powered (see Summoning Powers section) • 3 points per rank)"
      },
      {
        "id": "prof_tech_powers_control_technology",
        "name": "Control Technology",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Tech, Device",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "third degree only"
          }
        ],
        "notes": "You can exert control over the technological devices and equipment of other characters. Your power does not control the character's actions, but affects the technology instead. This allows you to cause a weapon to fire, or suit of power armor to act on its own, contrary to its wearer's wishes. The device cannot do anything it is not normally capable of doing, such as aim itself, without the use of a power like Animate Machines (previously). At the GM's discretion, the Technology skill may be used to overcome this power's Affliction rather than a Will resistance check, representing someone jury-rigging or resetting the device to prevent you from controlling it. (Perception Ranged Cumulative Affliction (Controlled; Resisted by Fortitude, Overcome by skill or Fortitude), Limited to third degree only, Affects Objects Only, Limited to Technology • 2 point per rank)"
      },
      {
        "id": "prof_tech_powers_deactivate_technology",
        "name": "Deactivate Technology",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Tech, 30foot radius",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You deactivate technology in an area. Shutting down a specific machine may simply be a matter of using a tech power as a countering effect (see Countering, previously). This power is wider-reaching, affecting all technology in a particular area. If you can choose which targets in the area are affected and which are not, apply the Selective modifier. Otherwise, you deactivate all technology effects in the targeted area. If you can deactivate technology around a point at a distance, rather than in a radius around you, apply the Ranged modifier. (Nullify Technology, Burst Area (30foot radius), Broad (Technological), Simultaneous • 4 points)"
      },
      {
        "id": "prof_tech_powers_disassemble",
        "name": "Disassemble",
        "rank": 10,
        "effectId": "transform",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Continuous",
        "descriptor": "Tech, Assembled to disassembled",
        "extras": [],
        "flaws": [],
        "notes": "You can reduce a target machine to its component parts, literally causing it to fall to pieces. This power leaves the machine in pieces until it can be reassembled. The Assemble power (see Utility Powers) can counter this one. (Ranged Continuous Transform (assembled to disassembled) • 4 points per rank)"
      },
      {
        "id": "prof_tech_powers_machine_body",
        "name": "Machine Body",
        "rank": 30,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Fortitude effects",
        "extras": [],
        "flaws": [],
        "notes": "You are a machine, or at least you have the body of one, rendering you immune to many of the mundane concerns of living creatures. This power assumes you are self-repairing to some degree (allowing you to recover from damage normally). (Immunity 30 (Fortitude effects) • 30 points A machine character might be a true construct (Deluxe Hero's Handbook, page 231) having no Stamina rank and no ability to recover from damage other than being repaired in addition to the immunity provided by a machine body. A mobile construct must also buy Intellect and Presence ranks up from nonexistence (starting at rank -5) rather than having them at rank 0.)"
      },
      {
        "id": "prof_tech_powers_construct_body",
        "name": "Construct Body",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "A machine character might be a true construct (Deluxe Hero's Handbook, page 231) having no Stamina rank and no ability to recover from damage other than being repaired in addition to the immunity provided by a machine body. A mobile construct must also buy Intellect and Presence ranks up from nonexistence (starting at rank -5) rather than having them at rank 0. (Construct • 0 points In either case, your mind is still essentially the same as an ordinary person's, although it may or may not be an actual, biological, brain. Characters with digital (computerized) minds may wish to have the Computer Mind and Machine Mind powers as well.)"
      },
      {
        "id": "prof_tech_powers_machine_mind",
        "name": "Machine Mind",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Mental powers",
        "extras": [],
        "flaws": [],
        "notes": "Rather than a biological brain, you have a digital \"mind,\" most likely a computer of some sort. Your lack of a mind gives you full immunity to powers that affect minds, or apply the Limited to Half Effect modifier if you are partially susceptible. You may be affected, on the other hand, by powers which work specifically on computers. The GM may consider this a form of Power Loss for your Immunity and award you hero points for the complication when it occurs. (Immunity 10 (mental powers) • 10 points Some Machine Minds may have additional Immunities, such interaction skills or even all Will effects.)"
      },
      {
        "id": "prof_tech_powers_cyberspace",
        "name": "Cyberspace",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Tech, Dimensional Travel, Cyberspace",
        "extras": [],
        "flaws": [],
        "notes": "You can transfer your consciousness (and perhaps even your body) into a virtual \"world\" that exists \"inside\" a computer or computer network, allowing you to interact with that world as if it were real and physical: data and software manifests as objects and other beings and interactions with them affects the computer systems. The GM decides if some form of cyberspace even exists in the setting and, if so, how you interact with it, but generally your mental abilities and skills like Technology have the greatest impact. Apply the Limited modifier if only your mind travels into cyberspace, leaving your body behind. (Movement 1 (Dimensional Travel, Cyberspace) • 2 points)"
      },
      {
        "id": "prof_tech_powers_network_jump",
        "name": "Network Jump",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Tech, Networks",
        "extras": [],
        "flaws": [],
        "notes": "You transform into digital data or electricity to travel instantly through a computer or communications network, reappearing from a connected device at your destination. If you are able to stay \"inside\" the network, see the Cyberspace power (previously). (Teleport, Accurate, Extended, Medium (Networks) • 3 points per rank)"
      },
      {
        "id": "prof_tech_powers_power",
        "name": "Power",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Requires available technology or machine parts (-1 point)"
          }
        ],
        "notes": "You can turn nearby technology or parts into a platform able to carry you aloft. It may be self-propelled (with anything from rockets to anti-gravity) or levitated by your own animating power, a kind of \"technokinesis\". If the platform is a regular device rather than something you create as needed, replace the Quirk with the Removable modifier. Otherwise, you can assemble your Transport Platform out of any available tech. This power often complements the broader Assemble power (following). (Flight, Platform, Quirk: Requires available technology or machine parts (-1 point) • 1 point for 2 ranks + 1 point per)"
      },
      {
        "id": "prof_tech_powers_assemble",
        "name": "Assemble",
        "rank": 10,
        "effectId": "transform",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Continuous",
        "descriptor": "Tech, Parts into finished machine",
        "extras": [],
        "flaws": [],
        "notes": "You can assemble technology instantly out of collections of parts, causing the disparate parts to fly together of their own accord, even modifying them to suit the needs of the particular machine, as if working them with tools. If the GM allows, Assemble can reduce the time required for the construction check of an invention (Deluxe Hero's Handbook, page 211) possibly one created by a Tech Savant (see the Tech Savant power). If allowed, the GM may wish to treat multiple inventions in the same scene as extra effort, requiring fatigue or hero points, in order to balance the speed with which the character can create them. (Ranged Continuous Transform (parts into finished machine) • 4 points per rank)"
      },
      {
        "id": "prof_tech_powers_computer_mind",
        "name": "Computer Mind",
        "rank": 10,
        "effectId": "quickness",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Tech, Eidetic Memory",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Mental Tasks"
          }
        ],
        "notes": "Your mind functions like a computer, with perfect recall and able to think faster than an ordinary human, and may even be a computer! Note this differs from the Machine Mind power (previously) in that it does not provide any particular resistance to mental powers, although the two powers are often found together. (Enhanced Advantages (Eidetic Memory) plus Quickness, Limited to Mental Tasks • 1 point + 1 point)"
      },
      {
        "id": "prof_tech_powers_interface",
        "name": "Interface",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "You can mentally interface with computers and computer networks, operating them as if you were a connected computer yourself. You still use the Technology skill to make checks to program or otherwise interact with the computers, although characters often have Tech Savant (following) to go along with this power; and instinctive knowledge of how machines work. By default, Interface operates by touch: either an input/ output port, network hub, or similar device. You might have a socket or interface plug yourself, or simply be able to touch the target. If you can also use Interface at a distance, add the Communication (Radio) effect, essentially turning you into a wireless network able to communicate with computers within your range. (Comprehend Machines 2 • 4 points)"
      },
      {
        "id": "prof_tech_powers_manipulate_technology",
        "name": "Manipulate Technology",
        "rank": 1,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Tech, Device",
        "extras": [
          {
            "id": "precise",
            "name": "Precise",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Operating Machines"
          }
        ],
        "notes": "You cannot move a gate which has no mechanism. This power also cannot supply power other than the kinetic or \"muscle\" power needed to move a mechanism, so it cannot, for example, manipulate technology that has no power source. If the power has no obvious effect apart from the target technology operating on its own, apply the Subtle modifier as well. (Perception Ranged Move Object 1, Precise, Limited to Operating Machines • 3 points)"
      },
      {
        "id": "prof_tech_powers_sensor_masking",
        "name": "Sensor Masking",
        "rank": 10,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, All Senses",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Technology"
          }
        ],
        "notes": "You can \"blind\" electronic sensors and computer-connected devices to your presence, giving you total concealment from them. This has no effect on minds, just technology, so while a security monitor will not pick up your presence, a human guard can still perceive you (provided he is present to do so and not monitoring the area remotely via technology). Some characters may even have Permanent Concealment; machines cannot detect them even if they want them to! (Concealment 10 (All Senses), Limited to Technology • 10 points)"
      },
      {
        "id": "prof_tech_powers_sensor_network",
        "name": "Sensor Network",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Tech, Visual and Auditory",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Technological Sensors"
          }
        ],
        "notes": "Have the Interface power (previously). The availability of things like chemical sensors or brain scanners or the like within range of your power is generally rare enough to not increase its cost per rank to account for them. If a player wants to have an unusual sensor \"happen\" to be present, this is a good application of the Edit Scene use of hero points (Deluxe Hero's Handbook, page 20). (Remote Sensing (Visual and Auditory), Limited to Technological Sensors • 2 points per rank)"
      },
      {
        "id": "prof_tech_powers_technomorph",
        "name": "Technomorph",
        "rank": 10,
        "effectId": "variable",
        "action": "Move",
        "range": "Personal",
        "duration": "Continuous",
        "descriptor": "Tech, Tech Powers",
        "extras": [],
        "flaws": [],
        "notes": "You might be made up of nanotechnology, microscopic machines able to reorganize themselves into different forms, or simply able to alter your molecular structure in different ways to mimic machines and technology. Your potential powers could include any of those given in this section, as well as other powers with the technology descriptor found in other sections. (Variable (Tech Powers), Continuous Duration, Move Action • 9 points per rank)"
      },
      {
        "id": "prof_tech_powers_tech_savant",
        "name": "Tech Savant",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Tech, Technology",
        "extras": [],
        "flaws": [],
        "notes": "You have considerable intuitive ability where technology is concerned, you \"just know\" how to work with, operate, and even build or repair technology without any formal training or experience. (Enhanced Skill (Technology) • 1 point per rank (+2 skill ranks per power rank). Some tech savants couple extraordinary inventive abilities with their insights, making them Tech Geniuses able to take otherwise ordinary technological components and cobble them together into amazing-albeit temporarydevices. Especially brilliant Tech Geniuses might have the Computer Mind power (speeding up the time of the design check for inventing) or ranks of Quickness added to Tech Genius, Limited to Design Checks (and therefore costing 1 power point per 3 Quickness ranks).)"
      },
      {
        "id": "prof_tech_powers_tech_genius",
        "name": "Tech Genius",
        "rank": 10,
        "effectId": "enhanced_trait",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Tech, Inventor",
        "extras": [],
        "flaws": [],
        "notes": "Take otherwise ordinary technological components and cobble them together into amazing-albeit temporarydevices. Especially brilliant Tech Geniuses might have the Computer Mind power (speeding up the time of the design check for inventing) or ranks of Quickness added to Tech Genius, Limited to Design Checks (and therefore costing 1 power point per 3 Quickness ranks). (Enhanced Advantage (Inventor) • 1 point.)"
      },
      {
        "id": "prof_tech_powers_concentration",
        "name": "Concentration (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "Trouble with the hero's power makes it require greater than normal effort to maintain. (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_distracting",
        "name": "Distracting (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "Similar to concentration, but the effort impairs the hero's defense instead, causing the vul- (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_limited",
        "name": "Limited (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "Circumstances might cause the hero's powers to temporarily acquire a limit, perhaps a psy- (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_removable",
        "name": "Removable (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "As previously mentioned, the Power Loss complication can be an instance of Removable (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_side_effect",
        "name": "Side-Effect (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "The power manifests an unexpected (but temporary) side effect flaw. (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_uncontrolled",
        "name": "Uncontrolled (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "The hero temporarily loses control over the power, causing it to act in unpredictable ways. (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_unreliable",
        "name": "Unreliable (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "The power becomes fickle and sometimes ceases to work. (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_temporary_flaw",
        "name": "Temporary Flaw (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "One or more of the hero's powers develops a temporary flaw with a value of at least -1 (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_remote",
        "name": "Remote (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "You can function like a \"universal remote control\" in relationship to machines that include (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_machines_like_me",
        "name": "Machines Like Me (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "Routine break-downs, crashes, and similar problems do not affect you or the technol- (Feature • 1 point)"
      },
      {
        "id": "prof_tech_powers_built_in_functionality",
        "name": "Built-in Functionality (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Tech, Device",
        "extras": [],
        "flaws": [],
        "notes": "You have a \"built-in\" capability similar to a 1-point piece of equipment, such as a (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Teleport Powers",
    "profiles": [
      {
        "id": "prof_teleport_powers_apport",
        "name": "Apport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Teleport, Spatial",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Also known as Projecting Teleport, you can teleport targets other than yourself. You must touch the target with a successful close attack check. Unwilling targets get a Dodge resistance check to avoid being teleported, DC 10 + your effect rank. Objects do not get a resistance check, so long as they are within your weight limit. See Dropping Things under Teleport Tricks if you teleport a target up into the air or teleport an object to drop onto a target. If you can apport at a distance (making a ranged attack check), apply the Ranged modifier. If you can apport a target simply by seeing it, apply the Perception Ranged modifier. (Teleport Attack • 2 points per rank)"
      },
      {
        "id": "prof_teleport_powers_apportive_attack",
        "name": "Apportive Attack",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You teleport projectiles into your target, causing damage and injury and bypassing your target's external defenses. A similar power involves teleporting parts of the target away, tearing them apart with your power, rather than teleporting weapons into them. The effect is the same, but the descriptors differ. (Perception Ranged Damage, Resisted by Fortitude • 4 points per rank)"
      },
      {
        "id": "prof_teleport_powers_portal_blast",
        "name": "Portal Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Teleport, Environmental Effects",
        "extras": [],
        "flaws": [],
        "notes": "You open a small portal to project a stream of matter or energy from another location, aiming it at your target. The Variable Descriptor modifier allows you to project any Damage effect with an environmental descriptor: cold, fire, lighting, water, and so forth. If you can place the portal (the origin point of the attack) somewhere other than directly in front of you, apply the Indirect modifier as well. (Ranged Damage, Variable Descriptor 1 (Environmental Effects) • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_teleport_powers_portal_punch",
        "name": "Portal Punch",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You open a small portal in front of your fist, allowing you to \"telegraph\" a punch across a distance and hit a target out of your normal reach. The normal rank limit for the power is equal to your Strength rank. Indirect is a common modifier for this power. (Ranged Damage • 2 points per rank)"
      },
      {
        "id": "prof_teleport_powers_teleport_sickness",
        "name": "Teleport Sickness",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Teleport Passengers"
          }
        ],
        "notes": "You can cause a disorienting effect by teleporting a target. It takes your standard action to impose the effect, your move action to teleport. If you suffer from teleport sickness, apply a Side Effect modifier to your Teleport power. (Affliction (Resisted and Overcome by Fortitude; Dazed, Stunned, Incapacitated), Limited to Teleport Passengers • 1 point per 2 ranks)"
      },
      {
        "id": "prof_teleport_powers_teleporting_flurry",
        "name": "Teleporting Flurry",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Teleport, Spatial",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You rapidly teleport around an area, making attacks against the available targets there before teleporting back to your starting point. (Ranged Shapeable Area on Strength Damage, Selective • 3 points per rank)"
      },
      {
        "id": "prof_teleport_powers_blink_teleport",
        "name": "Blink Teleport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Teleport, Imminent Attack",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You teleport reflexively in response to imminent danger, allowing you to avoid any attack you can detect so long as your teleport distance takes you out of the affected area. Surprise attacks can still catch you off-guard, including those so Subtle you cannot detect them. This power tends to be low ranked, just enough to clear most areas. (Reaction Teleport (Imminent Attack) • 5 points per rank)"
      },
      {
        "id": "prof_teleport_powers_immunity_to_teleport",
        "name": "Immunity to Teleport",
        "rank": 2,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Teleport, Teleport Effects",
        "extras": [],
        "flaws": [],
        "notes": "You are immune to powers which attempt to teleport you against your will, either because you can instantly \"counter-port\" or because you are somehow \"anchored\" in space-time except when you choose to move. (Immunity 2 (Teleport Effects) • 2 points)"
      },
      {
        "id": "prof_teleport_powers_redirecting_warp",
        "name": "Redirecting Warp",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You warp away incoming attacks, allowing you to redirect them at new targets. (Deflect, Reflect, Redirect • 3 points per rank)"
      },
      {
        "id": "prof_teleport_powers_teleporting_dodge",
        "name": "Teleporting Dodge",
        "rank": 4,
        "effectId": "concealment",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Teleport, Spatial",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "visible until attacked, -1 point"
          }
        ],
        "notes": "Rapidly and randomly teleporting in and out grants you a bonus to your active defenses, making it more difficult to target you with attacks. You gain the benefits of total concealment against attack (a +5 circumstance bonus to active defenses). (Visual Concealment 4, Quirk (visible until attacked, -1 point) • 7 points)"
      },
      {
        "id": "prof_teleport_powers_astroport",
        "name": "Astroport",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Teleport, Space Travel",
        "extras": [],
        "flaws": [],
        "notes": "You can teleport over very long distances, from one planet or star system to another! As mentioned on page 173 of the Deluxe Hero's Handbook, this type of movement is largely plot-based and should be limited to covering interplanetary distances, not going from place to place on a single planet. (Movement (Space Travel) • 2 points per rank)"
      },
      {
        "id": "prof_teleport_powers_portal_platform",
        "name": "Portal Platform",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You create a partial teleportal (see Teleportal, following) beneath you and use it to negate the effects of gravity. By moving the portal, you can fly through the air. (Flight, Platform • 1 point per rank)"
      },
      {
        "id": "prof_teleport_powers_teleport",
        "name": "Teleport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "Basic teleport power: you can move instantly from one place to another, without crossing the distance in between, as a move action. You can \"double teleport\" as two move actions on your turn (materializing briefly in between), or make an extended teleport if you have the Extended modifier. See the Teleport effect description (Deluxe Hero's Handbook, page 183) for details. The descriptors associated with your Teleport are up to you, but unless it is Subtle, it must have some noticeable effect: flash of light, bang or popping noise, puff of smoke, or the like. (Teleport • 2 points per rank)"
      },
      {
        "id": "prof_teleport_powers_affects_others",
        "name": "Affects Others (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "Teleport already has a degree of this in that teleporters can carry an amount of additional (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_area",
        "name": "Area (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "As with Affects Others, Teleport has a measure of this built-in with the ability to carry extra mass, so (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_increased_mass",
        "name": "Increased Mass (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "This extra is a flat increase in the mass rank you can carry with you when you tele- (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_precise",
        "name": "Precise (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You normally teleport yourself and whatever you are wearing or carrying (within your mass (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_reaction",
        "name": "Reaction (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "Teleport with this modifier occurs in response to a particular circumstance-you might (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_subtle",
        "name": "Subtle (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "A Teleport effect is normally noticeable in some way: a flash of light, an audible bang or pop of (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_check_required",
        "name": "Check Required (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "Checks required for Teleport effects may involve complex hyperspatial calculations or (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_distracting",
        "name": "Distracting (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "This flaw leaves you vulnerable until the start of your next turn any time you teleport, not just (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_limited_location",
        "name": "Limited Location (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You can only teleport to particular locations, such as only sites with dedicated teleport (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_transit_time",
        "name": "Transit Time (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You do not teleport instantly. Each rank in this flaw increases the time it takes you to (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_teleport_memory",
        "name": "Teleport Memory (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You can \"attune\" to one location per rank in this Feature by spending a minute of time (Feature • 1 point)"
      },
      {
        "id": "prof_teleport_powers_summon_item",
        "name": "Summon Item (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Teleport, Spatial",
        "extras": [],
        "flaws": [],
        "notes": "You have a \"bond\" with a Device or item of equipment, allowing you to summon it to (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Time Powers",
    "profiles": [
      {
        "id": "prof_time_powers_teleportal",
        "name": "Teleportal",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Time, Temporal",
        "extras": [
          {
            "id": "portal",
            "name": "Portal",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "So long as you take a standard action each round to maintain it. Apply the Increased Duration extra to maintain a Teleportal as a free action. If you can move your Teleportal, using it to \"engulf\" someone or something so they are transported through it, take an Alternate Effect version of it with the Attack extra and make a successful ranged attack check to use it. (Teleport, Portal • 4 points per rank +1 point per rank per +1 distance rank to portal size.)"
      },
      {
        "id": "prof_time_powers_nullify_teleport",
        "name": "Nullify Teleport",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Concentration",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "You can nullify a target's ability to use Teleport powers. If you can do so over an area, apply the Area modifier to create a nullifying field. Some technological devices may create null teleport fields to guard against intrusion via teleportation. (Nullify Teleport, Concentration • 2 points per rank)"
      },
      {
        "id": "prof_time_powers_peephole",
        "name": "Peephole",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [
          {
            "id": "feedback",
            "name": "Feedback",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "noticeable",
            "name": "Noticeable",
            "cost": 1,
            "isFlat": true
          }
        ],
        "notes": "You open a small portal that allows you to peer into a distant spot. Increase cost per rank if you can perceive with additional senses beyond just your vision. (Remote Sensing, Simultaneous, Feedback, Noticeable • 1 point for rank 1, +2 points per additional rank)"
      },
      {
        "id": "prof_time_powers_spatial_beacon",
        "name": "Spatial Beacon",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Time, Temporal",
        "extras": [
          {
            "id": "affects_others",
            "name": "Affects Others",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Teleporters"
          }
        ],
        "notes": "Opposite of a null teleport field (previously), you create a \"weak point\" in the fabric of space, allowing teleporters to \"home in\" on it from a greater distance. You subtract your effect rank from the distance rank between you and any teleporter. For example, Spatial Beacon 5 reduces the teleporting distance rank between you and any teleporter by 5, allowing someone with Teleport 5 who is 4 miles (distance rank 10) away from you to teleport to your side. Spatial Beacon can counter a Nullify Teleport power and vice versa. (Enhanced Teleport, Affects Others Only, Limited to Teleporters • 1 point per rank)"
      },
      {
        "id": "prof_time_powers_teleport_awareness",
        "name": "Teleport Awareness",
        "rank": 1,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Time, Teleport Awareness, mental",
        "extras": [],
        "flaws": [],
        "notes": "You can sense disruptions in the fabric of space caused by teleportation, even normally Subtle forms of the power (but not those with 2 ranks of the Subtle modifier). (Senses 1 (Teleport Awareness, mental) • 1 point.)"
      },
      {
        "id": "prof_time_powers_age_manipulation",
        "name": "Age Manipulation",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Time, Temporal",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Target's aging both forwards or backwards, apply 1 rank of the Variable Descriptor modifier. By default, this power only works on living beings you can touch. If you do not need to touch the target, apply Ranged or Perception Ranged. If you can also rapidly age objects, to the point of causing them to break down and decay, apply the Affects Objects modifier as well. (Cumulative Affliction (aging; Resisted and Overcome by Fortitude; Impaired, Disabled, Transformed) • 2 points per rank)"
      },
      {
        "id": "prof_time_powers_temporal_ambush",
        "name": "Temporal Ambush",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Time, Objects and hazards of opportunity",
        "extras": [],
        "flaws": [],
        "notes": "By stopping (or vastly slowing) time, you can \"set up\" a target for an attack: placing an object to drop onto them, for example, or a projectile to hit them. When you restart time again, from the target's perspective, the attack appears out of nowhere. This power is often used in conjunction with Temporal Shift, Temporal Movement, and Time Stop, which also rely on stopping time. (Percpetion Ranged Damage (objects and hazards of opportunity), Indirect 4, Variable Descriptor 1 • 5 points +3 points per rank)"
      },
      {
        "id": "prof_time_powers_time_freeze",
        "name": "Time Freeze",
        "rank": 10,
        "effectId": "affliction",
        "action": "Free",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Time, Temporal",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You trap a target in a \"bubble\" of stopped (or vastly slowed) time, essentially freezing them from the perspective of the outside world. You must touch the target by default. If you can use this power at a distance, apply the Ranged or Perception Ranged modifiers. (Cumulative Affliction (time freeze; Resisted and Overcome by Will; Dazed, Stunned, Incapacitated) • 2 points)"
      },
      {
        "id": "prof_time_powers_temporal_phase",
        "name": "Temporal Phase",
        "rank": 4,
        "effectId": "insubstantial",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "Shifting just a moment \"out of phase\" with ordinary time, you become an immaterial phantom image, able to pass through solid objects, and you are immune to harm. Some forms of Temporal Phase also render you undetectable to anyone existing in normal time. In this case, add Concealment 10 to the power, giving you total concealment from all but specific exotic senses like Time Sense. (Insubstantial 4 • 20 points)"
      },
      {
        "id": "prof_time_powers_temporal_sidestep",
        "name": "Temporal Sidestep",
        "rank": 80,
        "effectId": "teleport",
        "action": "Reaction",
        "range": "Personal",
        "duration": "Concentration",
        "descriptor": "Time, Dodge and Parry based attacks",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "not against surprise attacks"
          }
        ],
        "notes": "You can evade attacks by stopping time, moving out of the path of the \"frozen\" attack, and re-starting time again, making it appear that you have moved faster than the eye can follow, or simply teleported from place to place. Temporal Sidestep requires some conscious effort on your part (to know when to stop time and move), so it is useless against attacks you can't perceive or that catch you by surprise. (Immunity 80 (Dodge and Parry based attacks), Concentration, Limited (not against surprise attacks); Reaction Teleport 1 (when attacked) • 32 points + 5)"
      },
      {
        "id": "prof_time_powers_timeless",
        "name": "Timeless",
        "rank": 5,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal effects",
        "extras": [],
        "flaws": [],
        "notes": "You are a \"fixed\" point in time, completely unaffected by its passage or any other temporal effects. This power includes immunity to aging from the normal passage of time. It may also include the benefits of the Chronal Bulwark and Chronal Memory Features (see Features), depending on how time travel works in the setting. More extreme forms of this power include the benefits of Accelerated Healing and even Immortality, giving you a natural tendency to revert back to your \"fixed\" state when your condition is changed by damage or injury. (Immunity 5 (temporal effects) • 5 points)"
      },
      {
        "id": "prof_time_powers_temporal_shift",
        "name": "Temporal Shift",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "places you can reach physically"
          }
        ],
        "notes": "By stopping time, moving to a different spot, then restarting the flow of time again, you make it appear as if you have \"jumped\" from one location to another without crossing the space in between, even though you actually did so \"outside\" of ordinary time. The power's rank isn't technically the distance you can go, it's the time you have to move while time is stopped for everyone else. (Accurate Teleport, Limited to places you can reach physically • 2 points per rank)"
      },
      {
        "id": "prof_time_powers_manipulative_temporal_shift",
        "name": "Manipulative Temporal Shift",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Time, Temporal",
        "extras": [
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "things you can physically move"
          }
        ],
        "notes": "You when you shift \"outside\" of time, in which case, apply the Perception Range and Attack modifiers to this power. This allows you to, for example, snatch something out of someone's hand (or off a table, etc.), making it \"disappear\" from their perspective, or to move a frozen person from one spot to another, making them \"jump\" from place to place like you do. (Perception Range Teleport Attack (Resisted by (Choose a Defense when purchased)), Limited to things you can physically move • 4 points per rank)"
      },
      {
        "id": "prof_time_powers_manipulative_area_temporal_shift",
        "name": "Manipulative Area Temporal Shift",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Perception",
        "duration": "Instant",
        "descriptor": "Time, Temporal",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "things you can physically move"
          }
        ],
        "notes": "Ultimate version of this power allows you to \"rearrange\" anything in an entire area, setting a whole range of events in motion for when time resumes its normal flow. With the Area modifier, you can shift around any subject. From their perspective, everything \"jumps\" to different locations instantly. (Perception Range Burst Area Teleport Attack (Resisted by (Choose a Defense when purchased)), Limited to things you can physically move • 5 points per rank)"
      },
      {
        "id": "prof_time_powers_time_portal",
        "name": "Time Portal",
        "rank": 3,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Time, Time Travel 3",
        "extras": [
          {
            "id": "portal",
            "name": "Portal",
            "rank": 1,
            "cost": 2,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You can open a portal or gateway to a different point in time, allowing yourself or others to step through it and travel to that time. The exact effects of time travel depend on the nature of the setting; see the Temporal Tampering section. (Movement 3 (Time Travel 3), Portal • 15 points)"
      },
      {
        "id": "prof_time_powers_time_travel",
        "name": "Time Travel",
        "rank": 10,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Time, Time Travel",
        "extras": [],
        "flaws": [],
        "notes": "You can transport yourself (and anything you are wearing or carrying) to a different point in time. The exact effects of time travel depend on the nature of the setting; see the Temporal Tampering section. Apply the Increased Mass extra if you can carry along additional cargo or passengers when you time travel. The Time Portal and Time Travel powers are frequently provided by either vehicles (time machines or time-travel capsules) or headquarters (installations with a time portal of some sort), providing a useful way to regulate them. (Movement (Time Travel) • 2 points per rank up to rank 3 (6 points).)"
      },
      {
        "id": "prof_time_powers_accelerated_healing",
        "name": "Accelerated Healing",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "Speeding up your own natural healing process, you can recover from injury in moments. (Regeneration • 1 point per rank)"
      },
      {
        "id": "prof_time_powers_rapid_perception",
        "name": "Rapid Perception",
        "rank": 2,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Rapid, all senses",
        "extras": [],
        "flaws": [],
        "notes": "You speed up your ability to perceive relative to the normal flow of time. Each rank increases your speed of perception by a factor of 10. (Senses (Rapid, all senses) • 5 points per rank)"
      },
      {
        "id": "prof_time_powers_replay",
        "name": "Replay",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Precognition",
        "extras": [],
        "flaws": [],
        "notes": "You cause time to \"jump\" backwards, essentially replaying the recent past in a way that allows events to occur differently for a different outcome. For example, after a victim is struck by an oncoming car, you might replay the moment the victim steps off the sidewalk, allowing you the opportunity to intervene and save them. In game terms, this power is a Feature added to Precognition; you gain knowledge of the future by living through it, and can use that knowledge to \"re-do\" certain events, trying to cause them to come out differently. You can do this once per game session per rank in Feature. (Senses 4 (Precognition), Feature 1 (retcon events) • 5 points +1 point per additional Feature rank)"
      },
      {
        "id": "prof_time_powers_see_the_future",
        "name": "See the Future",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Precognition",
        "extras": [],
        "flaws": [],
        "notes": "You have visions of the future. They are most likely visions of possible futures, depending on how temporal tampering is handled in the series. Gamemasters should see the Adventure Elements section of the Gamemaster's Guide for additional suggestions on handling potentially plotbreaking powers like precognition. (Senses 4 (Precognition) • 4 points)"
      },
      {
        "id": "prof_time_powers_temporal_duplication",
        "name": "Temporal Duplication",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "Close connection between temporal duplicates may call for the Feedback flaw on the power. The potential for duplicates to differ slightly from you allows for differences in game traits. If you can summon a duplicate from the future (or a timeline with more advanced knowledge) the GM may choose to treat this as an Inspiration use of hero points (Deluxe Hero's Handbook, page 21). (Summon Duplicate, Heroic • 4 points per rank)"
      },
      {
        "id": "prof_time_powers_temporal_summoning",
        "name": "Temporal Summoning",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Time, Beings from history",
        "extras": [],
        "flaws": [],
        "notes": "You summon assistance from elsewhere in the timestream. This power can range from the ability to call up soldiers from different points in history, summoning dinosaurs and other creatures of bygone ages, or even calling upon beings from the distant future (cyborgs, aliens, or superadvanced forms of life). The basic power summons a single being as a minion, apply the Summon modifiers from the Deluxe Hero's Handbook to customize the power, including summoning Heroic beings or a Horde of Multiple Minions. Villains with this power may have access to vast armies of temporal minions as a plot device, which is not really worth pricing out as a power. (Summon, Broad Type (beings from history) • 4 points per rank)"
      },
      {
        "id": "prof_time_powers_time_sense",
        "name": "Time Sense",
        "rank": 1,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal Awareness",
        "extras": [],
        "flaws": [],
        "notes": "You can sense temporal disturbances and the use of time powers nearby with a successful Perception check. (Senses 1 (Temporal Awareness) • 1 point.)"
      },
      {
        "id": "prof_time_powers_time_stop",
        "name": "Time Stop",
        "rank": 10,
        "effectId": "speed",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Time, Subtle 2",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 2,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "routine actions while active"
          },
          {
            "id": "quirk",
            "name": "Quirk",
            "rank": 1,
            "cost": 1,
            "isFlat": true,
            "description": "Limited to routine actions while active (-4 points)"
          }
        ],
        "notes": "You can put time on \"pause\", freezing the entire world and allowing you to move and look around at the tableau at your leisure. You cannot affect anything while time is stopped (for that, see Temporal Ambush). Still, this power allows you considerable opportunity for scouting and surveillance, such as stopping time, walking into a place and having a good look around before walking out and restarting time again. Your effect rank determines how much subjective time you get; with rank 9, for example, you have an hour \"outside\" of time to do things, then time returns to its normal flow. The Subtle modifier means no one notices you \"move\" when time is stopped. (Quickness (Subtle 2), Speed (Subtle 2), Quirk: Limited to routine actions while active (-4 points) • 2 points per rank)"
      },
      {
        "id": "prof_time_powers_chronal_memory",
        "name": "Chronal Memory (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "You have the ability to \"remember\" other timelines. If someone changes history, (Feature • 1 point)"
      },
      {
        "id": "prof_time_powers_chronal_bulwark",
        "name": "Chronal Bulwark (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "You are \"fixed\" in time such that when history is changed (see Temporal Tampering, (Feature • 1 point)"
      },
      {
        "id": "prof_time_powers_immutable_time",
        "name": "Immutable Time (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "Historical events are essentially \"fixed\" in time and time-travelers cannot change (Feature • 1 point)"
      },
      {
        "id": "prof_time_powers_resistant_time",
        "name": "Resistant Time (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "History can be changed, but it tends to resist change, trying to \"snap back\" to its previous shape (Feature • 1 point)"
      },
      {
        "id": "prof_time_powers_mutable_time",
        "name": "Mutable Time (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "Historical events are not fixed, and changing them creates a whole new sequence of (Feature • 1 point)"
      },
      {
        "id": "prof_time_powers_quantum_time",
        "name": "Quantum Time (Feature)",
        "rank": 1,
        "effectId": "feature",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Time, Temporal",
        "extras": [],
        "flaws": [],
        "notes": "This is a combination of Mutable and Immutable Time; history can be changed, but (Feature • 1 point)"
      }
    ]
  },
  {
    "category": "Water Powers",
    "profiles": [
      {
        "id": "prof_water_powers_view_the_past",
        "name": "View the Past",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Water, Postcognition",
        "extras": [],
        "flaws": [],
        "notes": "Changed what occurred. As with See the Future, the GM may wish to take this power into consideration when creating suitable challenges for the heroes. (Senses 4 (Postcognition) • 4 points)"
      },
      {
        "id": "prof_water_powers_blinding_splash",
        "name": "Blinding Splash",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Water, Aquatic",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "A shocking splash of water in the eyes temporarily blinds your target. For a broader effect, substitute Cone Area for the Ranged modifier, sending out a blinding splash in an arc in front of you over a short distance. (Ranged Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Impaired, Disabled, Unaware), Limited to Vision • 2 points per rank)"
      },
      {
        "id": "prof_water_powers_dehydrate",
        "name": "Dehydrate",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Water, Fatigued, Exhausted, Incapacitated",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You remove the moisture from the target's body by touch, causing weakness and fatigue. Ranged Dehydrate has a +1 modifier while Perception Ranged is a +2 modifier. (Cumulative Affliction (Fatigued, Exhausted, Incapacitated), Resisted and Overcome by Fortitude • 2 points per rank)"
      },
      {
        "id": "prof_water_powers_drown",
        "name": "Drown",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Water, Aquatic",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Your target's lungs fill with water, or perhaps the target is enveloped in water, causing the target to drown. If you maintain this effect without any action on your part, replace the Concentration modifier with Progressive (+1 cost per rank). (Ranged Cumulative Affliction (Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated), Concentration • 4 points per rank)"
      },
      {
        "id": "prof_water_powers_tsunami",
        "name": "Tsunami",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Water, 250 feet long, 60 feet inland",
        "extras": [
          {
            "id": "area_line",
            "name": "Area (Line 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Along Shoreline"
          }
        ],
        "notes": "You command the unleashed fury of the sea in the form of a massive tidal wave that engulfs a shoreline area. Half of the increased ranks of Line Area increase the length (along the shoreline) while half increase its width (distance inland). Much higher ranks of Area may be more of a plot device or villainous plot than a common power for a hero. (Ranged Damage, Line Area 7 (250 feet long, 60 feet inland), Limited to Along Shoreline, Limited to Originating from Bodies of Water • 7 points per rank)"
      },
      {
        "id": "prof_water_powers_water_blast",
        "name": "Water Blast",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Water, Water impact",
        "extras": [],
        "flaws": [],
        "notes": "You strike with a blast of water strong enough to smash and damage targets. Since a focused stream of water can be strong enough to create a cutting \"water saw\" you can add the Penetrating modifier, if desired. (Ranged Damage (water impact) • 2 points per rank)"
      },
      {
        "id": "prof_water_powers_water_cannon",
        "name": "Water Cannon",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Water, Aquatic",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_line",
            "name": "Area (Line 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "A powerful stream of water can daze and knock down targets in its path. (Line Area Cumulative Affliction (Resisted by Dodge, Overcome by Fortitude; Dazed, Prone), Limited Degree; 5 feet wide, 30 feet long • 2 points per rank + 1 point)"
      },
      {
        "id": "prof_water_powers_water_weapon",
        "name": "Water Weapon",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [],
        "notes": "You form a melee weapon out of \"hard\" or \"concentrated\" water, as solid and sharp as a conventional weapon, perhaps more so. If you can form different types of weapons, apply the Variable Descriptor modifier, good for a rank of Improved Critical, Reach, or a similar 1-point modifier based on weapon form and type. (Strength-based Damage • 1 point per rank)"
      },
      {
        "id": "prof_water_powers_aquatic_regeneration",
        "name": "Aquatic Regeneration",
        "rank": 10,
        "effectId": "regeneration",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Water, Water",
        "extras": [],
        "flaws": [],
        "notes": "Immersion in water allows you to recover quickly from most injuries. (Regeneration, Medium (Water) • 1 point per 2 ranks)"
      },
      {
        "id": "prof_water_powers_fire_resistance",
        "name": "Fire Resistance",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Water, Fire Effects",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Half Effect"
          }
        ],
        "notes": "Your watery powers make you resistant to the effects of fire. (Immunity 10 (Fire Effects), Limited to Half Effect • 5 points)"
      },
      {
        "id": "prof_water_powers_mist",
        "name": "Mist",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Water, Limited Visibility",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Visibility"
          }
        ],
        "notes": "You can fill the air with condensing water vapor, creating a heavy mist that obscures vision. This power may also be able to counteract water-based mist or fog (natural or created by other powers) as a countering effect. (Environment (Limited Visibility) • 2 points per rank)"
      },
      {
        "id": "prof_water_powers_wall_of_water",
        "name": "Wall of Water",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Walls"
          }
        ],
        "notes": "A cascading barrier of water forms at your command, blocking incoming attacks or movement. (Create Barrier, Limited to Walls • 1 point per rank More full-fledged \"water shaping\" drops the Limit modifier, able to form any shape with the effect rank's volume.)"
      },
      {
        "id": "prof_water_powers_water_shaping",
        "name": "Water Shaping",
        "rank": 10,
        "effectId": "create",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [],
        "notes": "More full-fledged \"water shaping\" drops the Limit modifier, able to form any shape with the effect rank's volume. (Create Water Shapes • 2 points per rank)"
      },
      {
        "id": "prof_water_powers_waterproof",
        "name": "Waterproof",
        "rank": 10,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Water, Water Effects",
        "extras": [],
        "flaws": [],
        "notes": "Your powers protect you from the harmful effects of water: water-based effects do not work on your, you cannot drown from immersion, even your clothing and items you carry are protected from water damage or even getting wet, if you do not wish them to. (Immunity 10 (Water Effects) • 10 points)"
      },
      {
        "id": "prof_water_powers_water_shield",
        "name": "Water Shield",
        "rank": 10,
        "effectId": "protection",
        "action": "None",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Water, Aquatic",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "A thin layer of \"hard\" water surrounds you, lessening the impact of attacks and dissipating energy attacks directed against you. (Impervious Protection, Sustained • 2 points per rank)"
      },
      {
        "id": "prof_water_powers_aqua_port",
        "name": "Aqua-Port",
        "rank": 10,
        "effectId": "teleport",
        "action": "Move",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Water, Bodies of Water",
        "extras": [],
        "flaws": [],
        "notes": "You can vanish into a body or source of water-from a river to a faucet-and immediately emerge from another some distance away without crossing the space in between. Additional Teleport modifiers, particularly Accurate, Easy, and Extended, are common for this power. (Teleport, Medium (Bodies of Water) • 1 point per rank)"
      },
      {
        "id": "prof_water_powers_dolphin_leap",
        "name": "Dolphin Leap",
        "rank": 10,
        "effectId": "leaping",
        "action": "Free",
        "range": "Personal",
        "duration": "Instant",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Leaping From Water"
          }
        ],
        "notes": "You can vault from the water high into the air like a leaping dolphin. Rather than a standalone power, this one is commonly an Alternate Effect of another movement power like Swimming (see the following). At higher ranks, this power goes beyond mere leaping to riding a powerful waterspout or geyser capable of carrying you for miles! (Leaping, Limited to Leaping From Water • 1 point per 2 ranks)"
      },
      {
        "id": "prof_water_powers_swimming",
        "name": "Swimming",
        "rank": 10,
        "effectId": "swimming",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [],
        "notes": "You move through the water at great speed, either propelled by conventional swimming or your control over the watery medium itself. (Swimming • 1 point per rank)"
      },
      {
        "id": "prof_water_powers_water_walking",
        "name": "Water Walking",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Water, Water-Walking",
        "extras": [],
        "flaws": [],
        "notes": "You can walk on the surface of water as if it were solid ground. (Movement 1 (Water-Walking) • 2 points)"
      },
      {
        "id": "prof_water_powers_aqua_healing",
        "name": "Aqua-Healing",
        "rank": 10,
        "effectId": "healing",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [],
        "notes": "Water is mystically associated with healing. You can draw upon this power to heal others. (Healing • 2 points per rank)"
      },
      {
        "id": "prof_water_powers_aquatic",
        "name": "Aquatic",
        "rank": 3,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Water, Cold, Drowning, Pressure",
        "extras": [],
        "flaws": [],
        "notes": "You're adapted to survive underwater: you can breathe water and ignore the cold and extreme pressures of the ocean depths. Your vision is adapted to the dimmer light of the depths and you are not impeded moving underwater, although you still move at normal swimming speeds unless you also have the Swimming power (previously). (Immunity 3 (Cold, Drowning, Pressure), Movement 1 (Environmental Adaptation: Aquatic), Senses 1 (Low-light Vision) • 6 points)"
      },
      {
        "id": "prof_water_powers_environment",
        "name": "Environment",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Instant",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [],
        "notes": "Addition to being adapted to the aquatic environment, some characters actually favor it. Beyond the advantages they have over most air-breathers they have an additional edge on their \"home surf\". Aquatic Advantage: Add Enhanced Advantage (Favored (Aquatic) to the previous power • 1 point.)"
      },
      {
        "id": "prof_water_powers_dousing",
        "name": "Dousing",
        "rank": 10,
        "effectId": "nullify",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [],
        "notes": "There's nothing like a splash of cold water to douse a fire, short out an electrical system, or even shock people back to their senses. These and other \"water-soluble\" effects, as defined by the GM, can be countered by a targeted dousing all at once. If you can douse a whole area, apply the Area modifier to the effect as well. This is similar to a regular use of countering, but more wide-reaching. (Nullify Water-Soluble Effects, Broad, Simultaneous • 3 points per rank)"
      },
      {
        "id": "prof_water_powers_hydrokinesis",
        "name": "Hydrokinesis",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Perception",
        "duration": "Sustained",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Water"
          }
        ],
        "notes": "Water moves and shifts at your command, moving almost like a living thing. You can affect a total mass of water based on your rank. (Move Object, Perception Range, Limited to Water • 2 points per rank)"
      },
      {
        "id": "prof_water_powers_marine_mastery",
        "name": "Marine Mastery",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Water, Marine Life",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "in or near water"
          },
          {
            "id": "self_powered",
            "name": "Self-Powered",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "notes": "You have power over marine life and can summon aquatic creatures to aid you and obey your commands. The creatures must travel to you using their own movement. Schools of small sea creatures may be considered aquatic swarms (see the Summoning Powers section). You can use the crocodile, dolphin, shark, squid, and whale archetypes for some of the creatures you can summon (see pages 134-136 of the M&M Gamemaster's Guide). (Summon Marine Life, Horde, Mental Link, Multiple Minions, Variable General Type (Marine Life), Limited to in or near water, Self-Powered (see the Summoning Powers section) • 1 point + 4 points per rank,)"
      },
      {
        "id": "prof_water_powers_marine_telepathy",
        "name": "Marine Telepathy",
        "rank": 10,
        "effectId": "comprehend",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Water, Animals",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Marine Life"
          }
        ],
        "notes": "You can communicate with the creatures of the deep. You do not control them (see Marine Mastery, previously) but can use interaction skills with them and may be able to convince them to do favors for you. You can also ask them for information, convince them not to attack, and so forth. (Comprehend 2 (Animals), Limited to Marine Life • 2 points)"
      },
      {
        "id": "prof_water_powers_water_creatures",
        "name": "Water Creatures",
        "rank": 10,
        "effectId": "summon",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [],
        "notes": "You can summon or create semi-independent creatures formed out of water that obey your commands. The creatures you summon are not truly alive, merely animated masses of water. They can look like virtually anything, from humanoids to mythic creatures like mermaids or sea serpents. You can apply the various modifiers for the Summon effect to get additional water creatures or to make them more active or capable (removing the minion type from the template). (Summon Water Creature 8 • 120-point minion (see following template) • 16 points)"
      },
      {
        "id": "prof_water_powers_water_form",
        "name": "Water Form",
        "rank": 4,
        "effectId": "immunity",
        "action": "Move",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Water, Visual, Limited to Underwater",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Underwater"
          },
          {
            "id": "activation_move",
            "name": "Activation",
            "cost": 1,
            "isFlat": true
          }
        ],
        "notes": "Your Strength in order to solidify your form enough to exert some degree of force. You're immune to most fleshand-blood concerns in water form, virtually invisible when you are merged with a larger body of water, and able to move easily through the water. You may also have other powers, such as Aqua-Port, Hydrokinesis, or various offensive water powers while you are in water form. (Concealment 4 (Visual, Limited to Underwater), Immunity 30 (Fortitude Effects), Insubstantial 2, Swimming 2 (2 MPH), Activation (Move Action, -1 point) • 45 points +1)"
      },
      {
        "id": "prof_water_powers_amass_water",
        "name": "Amass Water",
        "rank": 10,
        "effectId": "growth",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Water, Aquatic",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "While in Water Form and in a large body of water"
          }
        ],
        "notes": "Point per additional Swimming rank for underwater movement. Some water forms have the ability to absorb additional mass from a surrounding body of water, incorporating it and growing to gigantic size. If so, add the following to the Water Form power: (Growth, Limited to While in Water Form and in a large body of water • 1 point per rank)"
      },
      {
        "id": "prof_water_powers_water_scrying",
        "name": "Water Scrying",
        "rank": 10,
        "effectId": "remote_sensing",
        "action": "Free",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Water, Visual and Auditory",
        "extras": [],
        "flaws": [],
        "notes": "You can use the reflective surface of a body of water, from an ocean to a puddle or even the contents of a cup as a medium for visions of distant places, allowing you to see and hear as if you were looking through a watery window into that location. Some mystic water scryers add mental senses to the effect as well, allowing them to target certain mental sensory powers through their scrying window (see the Mental Powers section for some ideas). (Remote Sensing (Visual and Auditory), Medium (Water) • 2 points per rank)"
      }
    ]
  },
  {
    "category": "Weather Powers",
    "profiles": [
      {
        "id": "prof_weather_powers_arctic_freeze",
        "name": "Arctic Freeze",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Weather, Storm",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Degree"
          }
        ],
        "notes": "A blast of freezing air causes the temperature to plummet around your target, masses of ice and snow forming instantly around them. (Cumulative Ranged Affliction (Resisted by Dodge, Overcome by Damage; Hindered and Vulnerable, Defenseless and Immobilized), Extra Condition, Limited Degree • 3 points per rank)"
      },
      {
        "id": "prof_weather_powers_blinding_arc",
        "name": "Blinding Arc",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Weather, Storm",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Vision"
          }
        ],
        "notes": "A blazingly bright arc of lightning temporarily blinds your target. (Cumulative Ranged Affliction (Resisted by Dodge, Overcome by Fortitude; Impaired, Disabled, Unaware), Limited to Vision • 2 points per rank)"
      },
      {
        "id": "prof_weather_powers_cyclone",
        "name": "Cyclone",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Concentration",
        "descriptor": "Weather, Strength",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You create a contained cyclone or hurricane-force storm capable of battering and hindering foes. (Burst Area Ranged Affliction (Resisted and Overcome by Strength; Hindered and Impaired, Prone and Stunned, Incapacitated), Alternate Resistance (Strength), Concentration, Extra Condition, Instant Recovery • 4 points)"
      },
      {
        "id": "prof_weather_powers_exposure",
        "name": "Exposure",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Weather, Storm",
        "extras": [
          {
            "id": "subtle",
            "name": "Subtle",
            "rank": 1,
            "cost": 1,
            "isFlat": true
          }
        ],
        "flaws": [],
        "notes": "You alter the atmosphere around your target to cause dehydration, heatstroke, or even early stage frostbite by raising or lowering the temperature and humidity. Victims often begin suffering effects before they realize what is happening. Apply the Area modifier to affect multiple targets in an area all at once. (Ranged Affliction (Resisted and Overcome by Fortitude; Fatigued, Exhausted, Incapacitated), Subtle • 1 point + 2 points per rank)"
      },
      {
        "id": "prof_weather_powers_hailstorm",
        "name": "Hailstorm",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Weather, Bludgeoning",
        "extras": [
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Frozen chunks of wind-driven hail pummel the targets in the area of the sudden storm. (Burst Area Ranged Damage (bludgeoning), Indirect 2 (falling from above) • 2 points + 3 points per rank)"
      },
      {
        "id": "prof_weather_powers_lightning_bolt",
        "name": "Lightning Bolt",
        "rank": 10,
        "effectId": "blast",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Weather, Electrical",
        "extras": [],
        "flaws": [],
        "notes": "You hurl a bolt of lightning from your person-hands, eyes, etc.-to strike your target with the fury of a storm. If you call down lightning from above instead, apply 2 ranks of the Indirect modifier as well (Deluxe Hero's Handbook, page 193). (Ranged Damage (electrical) • 2 points per rank)"
      },
      {
        "id": "prof_weather_powers_thunderclap",
        "name": "Thunderclap",
        "rank": 10,
        "effectId": "affliction",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Weather, Storm",
        "extras": [
          {
            "id": "cumulative",
            "name": "Cumulative",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Hearing"
          }
        ],
        "notes": "A thunderous boom deafens your target. Thunderclap is often Linked with a Lightning Bolt attack, simultaneously damaging and deafening a target, perhaps even connected with a Blinding Arc as well, expanding the effect of the Affliction (simply removing the Limited to Vision flaw from Blinding Arc's Affliction effect). (Cumulative Ranged Affliction (Resisted by Dodge, Overcome by Fortitude; Impaired, Disabled, Unaware), Limited to Hearing • 2 points per rank)"
      },
      {
        "id": "prof_weather_powers_wind_blast",
        "name": "Wind Blast",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Weather, Storm",
        "extras": [
          {
            "id": "area_cone",
            "name": "Area (Cone 60ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Pushing Away"
          }
        ],
        "notes": "A powerful blast of wind sends targets scattering like fallen leaves. The effective Strength of the Wind Blast equals its Move Object rank. Targets make a Strength resistance check against your power's Strength (half that if they succeed on their initial Dodge check against the area effect), success allows them to hold their ground while failure means they are thrown a distance value equal to your Move Object rank minus their weight rank. (Cone Area Move Object, Close Range, Limited to Pushing Away • 1 point per rank)"
      },
      {
        "id": "prof_weather_powers_fog",
        "name": "Fog",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Weather, Visibility",
        "extras": [],
        "flaws": [],
        "notes": "A thick bank of fog rolls in, impairing or disabling visibility in the area (a -2 or -5 modifier to Perception and related visual checks). (Environment (Visibility) • 1 point per rank (impairment) or 2 points per rank (disabling).)"
      },
      {
        "id": "prof_weather_powers_immunity_to_weather",
        "name": "Immunity to Weather",
        "rank": 2,
        "effectId": "immunity",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Weather, Earthly Weather",
        "extras": [],
        "flaws": [],
        "notes": "Your powers protect you from the harmful effects of weather; you're never hot or cold or affected by exposure or other (Earth-like) weather conditions. Some weathercontrollers may have lesser degrees of Immunity to singular environmental conditions like cold or heat, rather than weather in general. (Immunity 2 (Earthly Weather) • 2 points Some have a greater degree of immunity, extending to all effects with the \"weather\" descriptor, including Afflictions or Damage. This includes attacks like lightning, provided they have the \"weather\" descriptor; immunity to all electricity requires additional ranks as a separate common descriptor.)"
      },
      {
        "id": "prof_weather_powers_whirlwind",
        "name": "Whirlwind",
        "rank": 10,
        "effectId": "deflect",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Instant",
        "descriptor": "Weather, 30-foot radius",
        "extras": [
          {
            "id": "area_cloud",
            "name": "Area (Cloud 15ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "attack",
            "name": "Attack",
            "rank": 1,
            "cost": 0,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Attacks Targeting Dodge"
          }
        ],
        "notes": "You create and maintain an area of powerful winds that disrupt ranged attacks. (Deflect, Cloud Area 2 (30-foot radius), Limited to Attacks Targeting Dodge • 2 points per rank)"
      },
      {
        "id": "prof_weather_powers_wind_screen",
        "name": "Wind Screen",
        "rank": 10,
        "effectId": "damage",
        "action": "Standard",
        "range": "Close",
        "duration": "Sustained",
        "descriptor": "Weather, Storm",
        "extras": [
          {
            "id": "impervious",
            "name": "Impervious",
            "rank": 10,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Physical Damage"
          }
        ],
        "notes": "Swirling winds moving at high speeds around you deflect physical projectiles and attacks before they can strike you. (Impervious Protection, Sustained, Limited to Physical Damage • 1 point per rank)"
      },
      {
        "id": "prof_weather_powers_weatherproof",
        "name": "Weatherproof",
        "rank": 1,
        "effectId": "movement",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Weather, Environmental Adaptation: Weather",
        "extras": [],
        "flaws": [],
        "notes": "Your movement is unimpeded by the effects of the weather and you suffer no circumstance penalties for weather-related environments. So you can move at normal speed in a storm or high winds and ignore things like visibility modifiers (for anything less than total concealment). (Movement 1 (Environmental Adaptation: Weather) • 2 points)"
      },
      {
        "id": "prof_weather_powers_wind_riding",
        "name": "Wind-Riding",
        "rank": 10,
        "effectId": "flight",
        "action": "Free",
        "range": "Personal",
        "duration": "Sustained",
        "descriptor": "Weather, Storm",
        "extras": [],
        "flaws": [],
        "notes": "You can harness the power of the winds to soar through the air as fast as they can carry you. Wind-Riding tends to be limited to the speed of rank of hurricane-force winds on Earth, rarely more than rank 6 (120 miles per hour). Weather controllers with Wind Lifting (following) may use it to carry others aloft on the winds with them, flying at their normal speed so long as the weight value they carry is within their effect limits. (Flight • 2 points per rank)"
      },
      {
        "id": "prof_weather_powers_weather_control",
        "name": "Weather Control",
        "rank": 10,
        "effectId": "environment",
        "action": "Standard",
        "range": "Rank",
        "duration": "Sustained",
        "descriptor": "Weather, Storm",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "Up to your effect rank in weather conditions in your area as well, creating calm, clear weather. So you could, for example, eliminate intense cold and impeded movement (due to ice and snow) in your area, transforming it from the depths of winter to a temperate, Spring-like day. Normal weather conditions reassert themselves once you stop maintaining the effect. (Environment (3 points of effect), Selective • 4 points per rank)"
      },
      {
        "id": "prof_weather_powers_weather_prediction",
        "name": "Weather Prediction",
        "rank": 4,
        "effectId": "senses",
        "action": "None",
        "range": "Personal",
        "duration": "Permanent",
        "descriptor": "Weather, Precognition",
        "extras": [],
        "flaws": [
          {
            "id": "limited",
            "name": "Limited",
            "rank": 1,
            "cost": 1,
            "isFlat": false,
            "description": "Weather"
          }
        ],
        "notes": "You can sense weather patterns in your area, predicting weather conditions in the coming hours and days. The GM may require a secret Perception or Expertise (Meteorology) skill check for detailed or long-range information. (Senses 4 (Precognition), Limited to Weather • 2 points)"
      },
      {
        "id": "prof_weather_powers_wind_lifting",
        "name": "Wind-Lifting",
        "rank": 10,
        "effectId": "move_object",
        "action": "Standard",
        "range": "Ranged",
        "duration": "Sustained",
        "descriptor": "Weather, Storm",
        "extras": [
          {
            "id": "selective",
            "name": "Selective",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          },
          {
            "id": "area_burst",
            "name": "Area (Burst 30ft)",
            "rank": 1,
            "cost": 1,
            "isFlat": false
          }
        ],
        "flaws": [],
        "notes": "You focus powerful gusts of air or even mini-tornadoes to lift and move objects around, push things over, and so forth. Each individual object in the affected area cannot exceed your effective lifting Strength, although their combined weight value may do so. So, for example, if your effect rank is 4, each object you move cannot exceed 800 lbs., but you can move as many as fit into your area of effect. (Burst Area Move Object, Selective • 4 points per rank)"
      }
    ]
  }
];
