import fs from 'fs';

let content = fs.readFileSync('js/app.js', 'utf8');

// 1. Version bump
content = content.replace("const CURRENT_VERSION = '3.23';", "const CURRENT_VERSION = '3.24';");

// 2. Setup power profiles: copy descriptor
const oldPpDescriptor = `        range: matchedProfile.range,
        duration: matchedProfile.duration,
        descriptor: '',
        extras: JSON.parse(JSON.stringify(matchedProfile.extras || [])),`;

const newPpDescriptor = `        range: matchedProfile.range,
        duration: matchedProfile.duration,
        descriptor: matchedProfile.descriptor || '',
        extras: JSON.parse(JSON.stringify(matchedProfile.extras || [])),`;

content = content.replace(oldPpDescriptor, newPpDescriptor);

// 3. Custom builder modal: sort extras
const oldBuilderExtra = `    const sel = document.createElement('select');
    sel.style.cssText = 'flex: 1; min-height: 34px; font-size: var(--font-size-base); font-weight: 600;';
    EXTRAS_CATALOG.forEach(ex => {`;

const newBuilderExtra = `    const sel = document.createElement('select');
    sel.style.cssText = 'flex: 1; min-height: 34px; font-size: var(--font-size-base); font-weight: 600;';
    const sortedExtras = [...EXTRAS_CATALOG].sort((a, b) => a.name.replace(/^★\\s*/, '').localeCompare(b.name.replace(/^★\\s*/, '')));
    sortedExtras.forEach(ex => {`;

content = content.replace(oldBuilderExtra, newBuilderExtra);

// 4. Custom builder modal: sort flaws
const oldBuilderFlaw = `    const sel = document.createElement('select');
    sel.style.cssText = 'flex: 1; min-height: 34px; font-size: var(--font-size-base); font-weight: 600;';
    FLAWS_CATALOG.forEach(fl => {`;

const newBuilderFlaw = `    const sel = document.createElement('select');
    sel.style.cssText = 'flex: 1; min-height: 34px; font-size: var(--font-size-base); font-weight: 600;';
    const sortedFlaws = [...FLAWS_CATALOG].sort((a, b) => a.name.replace(/^★\\s*/, '').localeCompare(b.name.replace(/^★\\s*/, '')));
    sortedFlaws.forEach(fl => {`;

content = content.replace(oldBuilderFlaw, newBuilderFlaw);

// 5. Modifier columns: sort legalExtras
const oldLegalExtras = `    const legalExtras = EXTRAS_CATALOG.filter(ex => {
      if (ex.id === 'linked') return false;
      if (activeExtraIds.has(ex.id)) return false;
      return isModifierLegalForEffect(ex, targetObj.effect, targetObj.extras, targetObj.flaws).legal;
    });`;

const newLegalExtras = `    const legalExtras = EXTRAS_CATALOG.filter(ex => {
      if (ex.id === 'linked') return false;
      if (activeExtraIds.has(ex.id)) return false;
      return isModifierLegalForEffect(ex, targetObj.effect, targetObj.extras, targetObj.flaws).legal;
    }).sort((a, b) => a.name.replace(/^★\\s*/, '').localeCompare(b.name.replace(/^★\\s*/, '')));`;

content = content.replace(oldLegalExtras, newLegalExtras);

// 6. Modifier columns: sort legalFlaws
const oldLegalFlaws = `    const legalFlaws = FLAWS_CATALOG.filter(fl => {
      if (activeFlawIds.has(fl.id)) return false;
      return isModifierLegalForEffect(fl, targetObj.effect, targetObj.extras, targetObj.flaws).legal;
    });`;

const newLegalFlaws = `    const legalFlaws = FLAWS_CATALOG.filter(fl => {
      if (activeFlawIds.has(fl.id)) return false;
      return isModifierLegalForEffect(fl, targetObj.effect, targetObj.extras, targetObj.flaws).legal;
    }).sort((a, b) => a.name.replace(/^★\\s*/, '').localeCompare(b.name.replace(/^★\\s*/, '')));`;

content = content.replace(oldLegalFlaws, newLegalFlaws);

fs.writeFileSync('js/app.js', content, 'utf8');
console.log('Successfully updated js/app.js');
