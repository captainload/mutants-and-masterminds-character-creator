import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const pdfPath = 'H:/My Drive/Friends/_SUPERHERO/Mutants & Masterminds 3rd Ed/power profiles.pdf';
const buf = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data: buf });

const CHAPTERS = [
  { name: 'Air Powers', start: 5, end: 9, defaultDesc: 'Air, Wind' },
  { name: 'Armor Powers', start: 10, end: 14, defaultDesc: 'Armor, Technology' },
  { name: 'Animal Powers', start: 15, end: 19, defaultDesc: 'Animal, Biological' },
  { name: 'Cold Powers', start: 20, end: 24, defaultDesc: 'Cold, Ice' },
  { name: 'Cosmic Powers', start: 25, end: 29, defaultDesc: 'Cosmic, Energy' },
  { name: 'Darkness Powers', start: 30, end: 34, defaultDesc: 'Darkness, Shadow' },
  { name: 'Death Powers', start: 35, end: 39, defaultDesc: 'Death, Necromantic' },
  { name: 'Dimension Powers', start: 42, end: 46, defaultDesc: 'Dimensional, Quantum' },
  { name: 'Dream Powers', start: 47, end: 51, defaultDesc: 'Dream, Mental' },
  { name: 'Earth Powers', start: 52, end: 56, defaultDesc: 'Earth, Mineral' },
  { name: 'Electrical Powers', start: 57, end: 61, defaultDesc: 'Electricity, Lightning' },
  { name: 'Element Powers', start: 62, end: 66, defaultDesc: 'Element, Chemical' },
  { name: 'Fire Powers', start: 67, end: 71, defaultDesc: 'Fire, Heat' },
  { name: 'Gravity Powers', start: 72, end: 76, defaultDesc: 'Gravity, Force' },
  { name: 'Illusion Powers', start: 78, end: 82, defaultDesc: 'Illusion, Sensory' },
  { name: 'Kinetic Powers', start: 83, end: 87, defaultDesc: 'Kinetic, Force' },
  { name: 'Life Powers', start: 88, end: 92, defaultDesc: 'Life, Biological' },
  { name: 'Light Powers', start: 93, end: 97, defaultDesc: 'Light, Radiant' },
  { name: 'Luck Powers', start: 98, end: 102, defaultDesc: 'Luck, Probability' },
  { name: 'Magic Powers', start: 103, end: 114, defaultDesc: 'Magic, Mystical' },
  { name: 'Magnetic Powers', start: 115, end: 119, defaultDesc: 'Magnetic, Metal' },
  { name: 'Martial Powers', start: 120, end: 124, defaultDesc: 'Martial, Chi' },
  { name: 'Mental Powers', start: 127, end: 131, defaultDesc: 'Mental, Psionic' },
  { name: 'Meta Powers', start: 132, end: 136, defaultDesc: 'Meta, Power' },
  { name: 'Morphing Powers', start: 137, end: 141, defaultDesc: 'Morphing, Metamorphic' },
  { name: 'Plant Powers', start: 143, end: 147, defaultDesc: 'Plant, Flora' },
  { name: 'Radiation Powers', start: 148, end: 152, defaultDesc: 'Radiation, Nuclear' },
  { name: 'Sensory Powers', start: 153, end: 157, defaultDesc: 'Sensory, Perception' },
  { name: 'Size Powers', start: 158, end: 162, defaultDesc: 'Size, Mass' },
  { name: 'Sonic Powers', start: 166, end: 170, defaultDesc: 'Sonic, Sound' },
  { name: 'Speed Powers', start: 171, end: 175, defaultDesc: 'Speed, Velocity' },
  { name: 'Strength Powers', start: 176, end: 180, defaultDesc: 'Strength, Physical' },
  { name: 'Summoning Powers', start: 181, end: 185, defaultDesc: 'Summoning, Minion' },
  { name: 'Talent Powers', start: 186, end: 190, defaultDesc: 'Talent, Training' },
  { name: 'Tech Powers', start: 192, end: 196, defaultDesc: 'Tech, Device' },
  { name: 'Teleport Powers', start: 197, end: 201, defaultDesc: 'Teleport, Spatial' },
  { name: 'Time Powers', start: 202, end: 206, defaultDesc: 'Time, Temporal' },
  { name: 'Water Powers', start: 207, end: 211, defaultDesc: 'Water, Aquatic' },
  { name: 'Weather Powers', start: 212, end: 216, defaultDesc: 'Weather, Storm' }
];

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/(\w+)-\s+(\w+)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePowerFromDetails(name, detailsStr, costStr, descStr, defaultDesc, catName) {
  const d = cleanText(detailsStr);
  const cost = cleanText(costStr);
  const desc = cleanText(descStr);

  // Extract descriptor from parentheses if present, e.g. Ranged Damage (air pressure)
  let descriptor = defaultDesc;
  const descParen = d.match(/\(([^;)]+)\)/);
  if (descParen && !descParen[1].includes('Resisted') && !descParen[1].includes('rank') && !descParen[1].includes('point') && !descParen[1].includes('–')) {
    const customDesc = descParen[1].trim();
    if (customDesc.length > 0 && customDesc.length < 35) {
      descriptor = `${defaultDesc.split(',')[0]}, ${customDesc.charAt(0).toUpperCase() + customDesc.slice(1)}`;
    }
  }

  // Detect base effect
  let effectId = 'damage';
  let defaultAction = 'Standard';
  let defaultRange = 'Close';
  let defaultDuration = 'Instant';

  if (/Affliction/i.test(d)) {
    effectId = 'affliction';
    defaultAction = 'Standard';
    defaultRange = 'Close';
    defaultDuration = 'Instant';
  } else if (/Damage/i.test(d)) {
    effectId = /Ranged/i.test(d) ? 'blast' : 'damage';
    defaultAction = 'Standard';
    defaultRange = /Ranged/i.test(d) ? 'Ranged' : 'Close';
    defaultDuration = 'Instant';
  } else if (/Protection/i.test(d)) {
    effectId = 'protection';
    defaultAction = 'None';
    defaultRange = 'Personal';
    defaultDuration = 'Permanent';
  } else if (/Flight/i.test(d)) {
    effectId = 'flight';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Speed/i.test(d) && !/Move Object/i.test(d)) {
    effectId = 'speed';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Quickness/i.test(d)) {
    effectId = 'quickness';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Leaping/i.test(d)) {
    effectId = 'leaping';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Instant';
  } else if (/Teleport/i.test(d)) {
    effectId = 'teleport';
    defaultAction = 'Move';
    defaultRange = 'Personal';
    defaultDuration = 'Instant';
  } else if (/Move Object/i.test(d)) {
    effectId = 'move_object';
    defaultAction = 'Standard';
    defaultRange = 'Ranged';
    defaultDuration = 'Sustained';
  } else if (/Create/i.test(d)) {
    effectId = 'create';
    defaultAction = 'Standard';
    defaultRange = 'Ranged';
    defaultDuration = 'Sustained';
  } else if (/Illusion/i.test(d)) {
    effectId = 'illusion';
    defaultAction = 'Standard';
    defaultRange = 'Perception';
    defaultDuration = 'Sustained';
  } else if (/Healing/i.test(d)) {
    effectId = 'healing';
    defaultAction = 'Standard';
    defaultRange = 'Close';
    defaultDuration = 'Instant';
  } else if (/Regeneration/i.test(d)) {
    effectId = 'regeneration';
    defaultAction = 'None';
    defaultRange = 'Personal';
    defaultDuration = 'Permanent';
  } else if (/Immortality/i.test(d)) {
    effectId = 'immortality';
    defaultAction = 'None';
    defaultRange = 'Personal';
    defaultDuration = 'Permanent';
  } else if (/Immunity/i.test(d)) {
    effectId = 'immunity';
    defaultAction = 'None';
    defaultRange = 'Personal';
    defaultDuration = 'Permanent';
  } else if (/Insubstantial/i.test(d)) {
    effectId = 'insubstantial';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Morph/i.test(d)) {
    effectId = 'morph';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Senses/i.test(d)) {
    effectId = 'senses';
    defaultAction = 'None';
    defaultRange = 'Personal';
    defaultDuration = 'Permanent';
  } else if (/Concealment/i.test(d)) {
    effectId = 'concealment';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Remote Sensing/i.test(d)) {
    effectId = 'remote_sensing';
    defaultAction = 'Free';
    defaultRange = 'Rank';
    defaultDuration = 'Sustained';
  } else if (/Deflect/i.test(d)) {
    effectId = 'deflect';
    defaultAction = 'Standard';
    defaultRange = 'Ranged';
    defaultDuration = 'Instant';
  } else if (/Nullify/i.test(d)) {
    effectId = 'nullify';
    defaultAction = 'Standard';
    defaultRange = 'Ranged';
    defaultDuration = 'Instant';
  } else if (/Weaken/i.test(d)) {
    effectId = 'weaken';
    defaultAction = 'Standard';
    defaultRange = 'Close';
    defaultDuration = 'Instant';
  } else if (/Enhanced Trait|Enhanced Strength|Enhanced Advantage|Enhanced Defense|Enhanced Skill/i.test(d)) {
    effectId = 'enhanced_trait';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Comprehend/i.test(d)) {
    effectId = 'comprehend';
    defaultAction = 'None';
    defaultRange = 'Personal';
    defaultDuration = 'Permanent';
  } else if (/Burrowing/i.test(d)) {
    effectId = 'burrowing';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Swimming/i.test(d)) {
    effectId = 'swimming';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Movement/i.test(d)) {
    effectId = 'movement';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Mind Reading/i.test(d)) {
    effectId = 'mind_reading';
    defaultAction = 'Standard';
    defaultRange = 'Perception';
    defaultDuration = 'Sustained';
  } else if (/Environment/i.test(d)) {
    effectId = 'environment';
    defaultAction = 'Standard';
    defaultRange = 'Rank';
    defaultDuration = 'Sustained';
  } else if (/Summon/i.test(d)) {
    effectId = 'summon';
    defaultAction = 'Standard';
    defaultRange = 'Close';
    defaultDuration = 'Sustained';
  } else if (/Transform/i.test(d)) {
    effectId = 'transform';
    defaultAction = 'Standard';
    defaultRange = 'Close';
    defaultDuration = 'Sustained';
  } else if (/Variable/i.test(d)) {
    effectId = 'variable';
    defaultAction = 'Standard';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Communication/i.test(d)) {
    effectId = 'communication';
    defaultAction = 'Free';
    defaultRange = 'Rank';
    defaultDuration = 'Sustained';
  } else if (/Feature/i.test(d)) {
    effectId = 'feature';
    defaultAction = 'None';
    defaultRange = 'Personal';
    defaultDuration = 'Permanent';
  } else if (/Elongation/i.test(d)) {
    effectId = 'elongation';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Growth/i.test(d)) {
    effectId = 'growth';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Shrinking/i.test(d)) {
    effectId = 'shrinking';
    defaultAction = 'Free';
    defaultRange = 'Personal';
    defaultDuration = 'Sustained';
  } else if (/Luck Control/i.test(d)) {
    effectId = 'luck_control';
    defaultAction = 'Reaction';
    defaultRange = 'Perception';
    defaultDuration = 'Instant';
  } else if (/Extra Limbs/i.test(d)) {
    effectId = 'extra_limbs';
    defaultAction = 'None';
    defaultRange = 'Personal';
    defaultDuration = 'Permanent';
  }

  // Action adjustments
  let action = defaultAction;
  if (/Reaction/i.test(d)) action = 'Reaction';
  else if (/Free Action|Free/i.test(d) && !/Standard Action/i.test(d)) action = 'Free';
  else if (/Move Action/i.test(d)) action = 'Move';

  // Range adjustments
  let range = defaultRange;
  if (/Perception Ranged|Perception Range/i.test(d)) range = 'Perception';
  else if (/Ranged/i.test(d) || /Burst Area|Cone Area|Line Area|Cloud Area|Cylinder Area/i.test(d)) range = 'Ranged';
  else if (/Close Range|Close/i.test(d)) range = 'Close';
  else if (/Personal/i.test(d)) range = 'Personal';

  // Duration adjustments
  let duration = defaultDuration;
  if (/Continuous/i.test(d)) duration = 'Continuous';
  else if (/Sustained/i.test(d)) duration = 'Sustained';
  else if (/Concentration/i.test(d)) duration = 'Concentration';
  else if (/Permanent/i.test(d)) duration = 'Permanent';

  // Parse Rank
  let rank = 10;
  const explicitRankMatch = d.match(/(?:Flight|Speed|Quickness|Leaping|Teleport|Move Object|Create|Illusion|Healing|Regeneration|Immortality|Immunity|Insubstantial|Morph|Senses|Concealment|Remote Sensing|Deflect|Nullify|Weaken|Burrowing|Swimming|Movement|Mind Reading|Environment|Summon|Transform|Variable|Communication|Feature|Elongation|Growth|Shrinking|Luck Control|Extra Limbs|Protection|Damage)\s+([0-9]+)/i);
  if (explicitRankMatch) {
    rank = parseInt(explicitRankMatch[1], 10);
  } else {
    if (['feature', 'immortality'].includes(effectId)) rank = 1;
    else if (['insubstantial'].includes(effectId)) rank = /Insubstantial 2/i.test(d) ? 2 : /Insubstantial 3/i.test(d) ? 3 : /Insubstantial 4/i.test(d) ? 4 : 1;
    else if (['immunity'].includes(effectId)) {
      const immMatch = d.match(/Immunity\s+([0-9]+)/i);
      rank = immMatch ? parseInt(immMatch[1], 10) : 5;
    } else if (['morph'].includes(effectId)) {
      const morphMatch = d.match(/Morph\s+([0-9]+)/i);
      rank = morphMatch ? parseInt(morphMatch[1], 10) : 2;
    } else if (['senses'].includes(effectId)) {
      const sensesMatch = d.match(/Senses\s+([0-9]+)/i);
      rank = sensesMatch ? parseInt(sensesMatch[1], 10) : 2;
    }
  }

  // Parse extras
  const extras = [];
  if (/Subtle 2/i.test(d)) extras.push({ id: 'subtle', name: 'Subtle', rank: 2, cost: 1, isFlat: true });
  else if (/Subtle/i.test(d)) extras.push({ id: 'subtle', name: 'Subtle', rank: 1, cost: 1, isFlat: true });

  if (/Precise/i.test(d)) extras.push({ id: 'precise', name: 'Precise', rank: 1, cost: 1, isFlat: true });
  if (/Multiattack/i.test(d)) extras.push({ id: 'multiattack', name: 'Multiattack', rank: 1, cost: 1, isFlat: false });
  if (/Penetrating/i.test(d)) extras.push({ id: 'penetrating', name: 'Penetrating', rank: 1, cost: 1, isFlat: false });
  if (/Cumulative/i.test(d)) extras.push({ id: 'cumulative', name: 'Cumulative', rank: 1, cost: 1, isFlat: false });
  if (/Progressive/i.test(d)) extras.push({ id: 'progressive', name: 'Progressive', rank: 1, cost: 2, isFlat: false });
  if (/Secondary Effect/i.test(d)) extras.push({ id: 'secondary_effect', name: 'Secondary Effect', rank: 1, cost: 1, isFlat: false });
  if (/Selective/i.test(d)) extras.push({ id: 'selective', name: 'Selective', rank: 1, cost: 1, isFlat: false });
  if (/Burst Area/i.test(d)) extras.push({ id: 'area_burst', name: 'Area (Burst 30ft)', rank: 1, cost: 1, isFlat: false });
  else if (/Cone Area/i.test(d)) extras.push({ id: 'area_cone', name: 'Area (Cone 60ft)', rank: 1, cost: 1, isFlat: false });
  else if (/Line Area/i.test(d)) extras.push({ id: 'area_line', name: 'Area (Line 30ft)', rank: 1, cost: 1, isFlat: false });
  else if (/Cloud Area/i.test(d)) extras.push({ id: 'area_cloud', name: 'Area (Cloud 15ft)', rank: 1, cost: 1, isFlat: false });
  else if (/Cylinder Area/i.test(d)) extras.push({ id: 'area_cylinder', name: 'Area (Cylinder 30ft)', rank: 1, cost: 1, isFlat: false });
  else if (/Perception Area/i.test(d)) extras.push({ id: 'area_perception', name: 'Area (Perception)', rank: 1, cost: 1, isFlat: false });

  if (/Homing/i.test(d)) {
    const homMatch = d.match(/Homing\s+([0-9]+)/i);
    extras.push({ id: 'homing', name: 'Homing', rank: homMatch ? parseInt(homMatch[1], 10) : 1, cost: 1, isFlat: true });
  }
  if (/Impervious/i.test(d)) extras.push({ id: 'impervious', name: 'Impervious', rank: rank, cost: 1, isFlat: false });
  if (/Reversible/i.test(d)) extras.push({ id: 'reversible', name: 'Reversible', rank: 1, cost: 1, isFlat: true });
  if (/Incurable/i.test(d)) extras.push({ id: 'incurable', name: 'Incurable', rank: 1, cost: 1, isFlat: true });
  if (/Affects Corporeal/i.test(d)) extras.push({ id: 'affects_corporeal', name: 'Affects Corporeal', rank: 1, cost: 1, isFlat: false });
  if (/Affects Insubstantial/i.test(d)) extras.push({ id: 'affects_insubstantial', name: 'Affects Insubstantial', rank: 1, cost: 1, isFlat: true });
  if (/Affects Others/i.test(d)) extras.push({ id: 'affects_others', name: 'Affects Others', rank: 1, cost: 1, isFlat: false });
  if (/Attack/i.test(d) && !/Move Object/i.test(d) && !/Damage/i.test(d) && !/Affliction/i.test(d)) extras.push({ id: 'attack', name: 'Attack', rank: 1, cost: 0, isFlat: false });
  if (/Psychic/i.test(d) && effectId === 'illusion') extras.push({ id: 'psychic', name: 'Psychic', rank: 1, cost: 1, isFlat: false });
  if (/Variable Conditions/i.test(d) && effectId === 'affliction') extras.push({ id: 'variable_conditions', name: 'Variable Conditions', rank: 1, cost: 2, isFlat: false });
  if (/Responsive/i.test(d) && effectId === 'summon') extras.push({ id: 'responsive', name: 'Responsive', rank: 1, cost: 1, isFlat: false });
  if (/Portal/i.test(d)) extras.push({ id: 'portal', name: 'Portal', rank: 1, cost: 2, isFlat: false });
  if (/Increased Mass/i.test(d)) extras.push({ id: 'increased_mass', name: 'Increased Mass', rank: 1, cost: 1, isFlat: true });
  if (/Turnabout/i.test(d)) extras.push({ id: 'turnabout', name: 'Turnabout', rank: 1, cost: 1, isFlat: true });

  // Parse flaws
  const flaws = [];
  if (/Easily Removable/i.test(d)) flaws.push({ id: 'easily_removable', name: 'Easily Removable', cost: 0, isFlat: false, isDevice: true, discountPer5: 2 });
  else if (/Removable/i.test(d)) flaws.push({ id: 'removable', name: 'Removable', cost: 0, isFlat: false, isDevice: true, discountPer5: 1 });

  if (/Limited/i.test(d)) {
    const limMatch = d.match(/Limited\s*(?:to\s*)?\(([^)]+)\)|Limited\s*(?:to\s*)?([A-Za-z0-9'’ -]+)/i);
    const limDesc = limMatch ? (limMatch[1] || limMatch[2]).trim() : 'Specific Conditions';
    flaws.push({ id: 'limited', name: 'Limited', rank: 1, cost: 1, isFlat: false, description: limDesc });
  }
  if (/Quirk/i.test(d)) {
    const qMatch = d.match(/Quirk\s*(?:to\s*)?\(([^)]+)\)|Quirk\s*:\s*([^,•]+)/i);
    const qDesc = qMatch ? (qMatch[1] || qMatch[2]).trim() : 'Minor limitation';
    flaws.push({ id: 'quirk', name: 'Quirk', rank: 1, cost: 1, isFlat: true, description: qDesc });
  }
  if (/Tiring/i.test(d)) flaws.push({ id: 'tiring', name: 'Tiring', rank: 1, cost: 1, isFlat: false });
  if (/Distracting/i.test(d)) flaws.push({ id: 'distracting', name: 'Distracting', rank: 1, cost: 1, isFlat: false });
  if (/Activation/i.test(d)) flaws.push({ id: /Move/i.test(d) ? 'activation_move' : 'activation_standard', name: 'Activation', cost: 1, isFlat: true });
  if (/Fades/i.test(d)) flaws.push({ id: 'fades', name: 'Fades', rank: 1, cost: 1, isFlat: false });
  if (/Feedback/i.test(d)) flaws.push({ id: 'feedback', name: 'Feedback', rank: 1, cost: 1, isFlat: false });
  if (/Grab-Based/i.test(d)) flaws.push({ id: 'grab_based', name: 'Grab-Based', rank: 1, cost: 1, isFlat: false });
  if (/Noticeable/i.test(d)) flaws.push({ id: 'noticeable', name: 'Noticeable', cost: 1, isFlat: true });
  if (/Self-Powered/i.test(d) && effectId === 'summon') flaws.push({ id: 'self_powered', name: 'Self-Powered', rank: 1, cost: 1, isFlat: false });
  if (/Transit Time/i.test(d)) flaws.push({ id: 'transit_time', name: 'Transit Time', rank: 1, cost: 1, isFlat: true });

  const cleanId = 'prof_' + catName.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + name.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  let notes = desc;
  if (!notes || notes.length < 5) {
    notes = `${name} power from ${catName}.`;
  }
  notes += ` (${d} • ${cost})`;

  return {
    id: cleanId,
    name: name,
    rank: rank,
    effectId: effectId,
    action: action,
    range: range,
    duration: duration,
    descriptor: descriptor,
    extras: extras,
    flaws: flaws,
    notes: notes
  };
}

parser.getText().then(res => {
  console.log('Extracting all Power Profiles from PDF...');
  const library = [];
  let grandTotal = 0;

  for (const ch of CHAPTERS) {
    let text = '';
    for (let p = ch.start - 1; p < ch.end; p++) text += res.pages[p].text + '\n';
    const rawLines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const chapterProfiles = [];
    const seenNames = new Set();

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      if (line.match(/^[A-Z][A-Za-z0-9'’ -]+:/) && 
          !line.startsWith('•') && !line.startsWith('·') && !line.startsWith('-') &&
          !line.startsWith('Powers:') && !line.startsWith('Skills:') && !line.startsWith('Offense:') && 
          !line.startsWith('Defense:') && !line.startsWith('Totals')) {
        
        let block = line;
        let k = i + 1;
        while (k < rawLines.length) {
          const next = rawLines[k];
          if (next.match(/^[A-Z\s]{4,}$/) || next.match(/^[A-Z][A-Za-z0-9'’ -]+:/)) break;
          if ((next.startsWith('•') || next.startsWith('·')) && !next.match(/^[•·]\s*(\+?[0-9]+|as\s)/i)) break;
          block += ' ' + next;
          if (next.includes('points') || next.includes('point')) break;
          k++;
        }

        if (block.includes('•') || block.includes('·')) {
          const colonIdx = block.indexOf(':');
          const name = block.substring(0, colonIdx).trim();
          const rest = block.substring(colonIdx + 1).trim();
          const parts = rest.split(/[•·]/);
          const details = parts[0].trim();
          const cost = parts.slice(1).join('•').trim();

          // Get preceding description
          let descLines = [];
          let j = i - 1;
          while (j >= 0 && !rawLines[j].match(/^[A-Z0-9'’ -]{3,}$/) && !rawLines[j].includes('•') && j > i - 6) {
            descLines.unshift(rawLines[j]);
            j--;
          }
          const desc = descLines.join(' ');

          if (!seenNames.has(name.toLowerCase())) {
            seenNames.add(name.toLowerCase());
            const profile = parsePowerFromDetails(name, details, cost, desc, ch.defaultDesc, ch.name);
            chapterProfiles.push(profile);
          }
        }
      }
    }

    // Also parse Features for this chapter
    const featMatches = text.match(/[•·]\s*([A-Za-z0-9'’ -]+):\s*([^\n]+(?:\n[^\n]+)?)/g);
    if (featMatches) {
      for (const fm of featMatches) {
        const cleanedFm = fm.replace(/^[•·]\s*/, '').trim();
        const colonIdx = cleanedFm.indexOf(':');
        if (colonIdx > 0) {
          const fName = cleanedFm.substring(0, colonIdx).trim();
          const fDesc = cleanedFm.substring(colonIdx + 1).trim();
          // Filter out descriptors or non-feature bullets
          if (!['air', 'wind', 'armor', 'technological', 'magical', 'animal', 'natural', 'morphic', 'totem', 'cold', 'ice', 'cosmic', 'darkness', 'death', 'shadow', 'dimension', 'outsider', 'dream', 'mental', 'nightmare', 'sleep', 'earth', 'ground', 'stone', 'electrical', 'electronic', 'conductive', 'grounded', 'element', 'alchemy', 'chemical', 'fire', 'flame', 'gravity', 'weight', 'force', 'friction', 'inertia', 'kinetic', 'telekinetic', 'biological', 'life', 'divine', 'magic', 'light', 'heat', 'radiant', 'luck', 'coincidence', 'good fortune', 'talent', 'advantages', 'innate', 'computer', 'machine', 'technology', 'super-science', 'space', 'history', 'tachyon', 'time', 'water', 'wet', 'dousing', 'destructive', 'quenching', 'atmosphere', 'lightning', 'precipitation'].includes(fName.toLowerCase())) {
            if (!seenNames.has(fName.toLowerCase()) && fName.length < 30) {
              seenNames.add(fName.toLowerCase());
              chapterProfiles.push({
                id: 'prof_' + ch.name.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + fName.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
                name: fName + ' (Feature)',
                rank: 1,
                effectId: 'feature',
                action: 'None',
                range: 'Personal',
                duration: 'Permanent',
                descriptor: ch.defaultDesc,
                extras: [],
                flaws: [],
                notes: cleanText(fDesc) + ' (Feature • 1 point)'
              });
            }
          }
        }
      }
    }

    console.log(`${ch.name}: ${chapterProfiles.length} profiles`);
    grandTotal += chapterProfiles.length;
    library.push({
      category: ch.name,
      profiles: chapterProfiles
    });
  }

  console.log(`\nGrand Total Profiles: ${grandTotal}`);

  // Write out to js/power_profiles.js
  const fileHeader = `/**
 * Mutants & Masterminds 3E Official Power Profiles Library
 * Complete pre-configured power catalog from Green Ronin's "Power Profiles" sourcebook.
 * In case of conflict with core rules, Power Profiles takes precedence.
 *
 * Generated automatically from the official sourcebook:
 * 39 Power Categories, ${grandTotal} distinct pre-configured power profiles.
 */

export const POWER_PROFILES_LIBRARY = ${JSON.stringify(library, null, 2)};
`;

  fs.writeFileSync('js/power_profiles.js', fileHeader, 'utf8');
  console.log('Successfully written to js/power_profiles.js!');
});
