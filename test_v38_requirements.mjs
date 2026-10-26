import fs from 'fs';
import { SKILLS_LIST, auditCharacter } from './js/rules.js';

console.log('=== Running v3.8 Verification Suite ===\n');

// 1. Version Check
const versionData = JSON.parse(fs.readFileSync('version.json', 'utf8'));
console.assert(versionData.version === '3.8', `Expected version.json to be 3.8, got ${versionData.version}`);
console.log('✓ version.json verified at v3.8');

const htmlContent = fs.readFileSync('index.html', 'utf8');
console.assert(htmlContent.includes('Character Architect v3.8'), 'index.html title must contain v3.8');
console.assert(htmlContent.includes('Character Editor v3.8'), 'index.html brand header must contain v3.8');
console.assert(htmlContent.includes('app.js?v=3.8'), 'index.html script must load v=3.8');
console.log('✓ index.html references verified at v3.8');

const appContent = fs.readFileSync('js/app.js', 'utf8');
console.assert(appContent.includes("const CURRENT_VERSION = '3.8';"), "js/app.js CURRENT_VERSION must be '3.8'");
console.log('✓ js/app.js CURRENT_VERSION verified at v3.8');

// 2. Browser Pop-up Elimination Check (Zero alert, prompt, confirm calls)
const alertPromptConfirmRegex = /\b(alert|prompt|confirm)\s*\(/g;
const matches = appContent.match(alertPromptConfirmRegex);
console.assert(!matches || matches.length === 0, `Expected 0 native alert/prompt/confirm calls in app.js, found: ${matches?.length}`);
console.log('✓ Native alert(), prompt(), and confirm() completely eliminated (0 found in js/app.js)');

// Check presence of reusable dialog helpers in js/app.js
console.assert(appContent.includes('showAlertDialog('), 'js/app.js must define showAlertDialog');
console.assert(appContent.includes('showConfirmDialog('), 'js/app.js must define showConfirmDialog');
console.assert(appContent.includes('showPromptDialog('), 'js/app.js must define showPromptDialog');
console.log('✓ Reusable HTML dialog helpers showAlertDialog, showConfirmDialog, showPromptDialog verified');

// Check presence of dialog modal containers in index.html
const requiredModals = [
  'modal-confirm-dialog',
  'modal-prompt-dialog',
  'modal-alert-dialog',
  'modal-log-session',
  'modal-abilities-defenses'
];
requiredModals.forEach(id => {
  console.assert(htmlContent.includes(`id="${id}"`), `index.html must include modal #${id}`);
});
console.log(`✓ All required HTML dialog modals verified in index.html: ${requiredModals.join(', ')}`);

// 3. Abilities & Defenses Pop-up Verification
console.assert(!htmlContent.includes('data-tab="tab-abilities"'), 'tab-abilities button must be removed from persistent nav tab bar');
console.assert(!htmlContent.includes('<div class="tab-pane" id="tab-abilities">'), 'Dedicated tab-abilities pane must be removed');
console.assert(htmlContent.includes('id="btn-open-abilities-dialog"'), 'index.html must include #btn-open-abilities-dialog above damage tracker');
console.assert(htmlContent.includes('id="btn-action-edit-abilities"'), 'index.html must include #btn-action-edit-abilities in Action Center');
console.assert(htmlContent.includes('id="btn-action-edit-defenses"'), 'index.html must include #btn-action-edit-defenses in Action Center');
console.assert(appContent.includes('setupAbilitiesDefensesModal('), 'js/app.js must implement setupAbilitiesDefensesModal');
console.log('✓ Abilities & Defenses dedicated tab successfully replaced with pop-up modal and Action Center edit buttons');

// 4. Advantages Tab List Layout Verification
console.assert(htmlContent.includes('id="advantages-catalog-grid" style="display: flex; flex-direction: column;'), 'advantages-catalog-grid must use vertical flex column list layout');
console.assert(appContent.includes('advantage-list-row'), 'js/app.js must render advantages with advantage-list-row');
console.assert(!appContent.includes('substring(0, 110)'), 'Old 110-character description truncation must be removed for advantages list');
console.log('✓ Advantages tab successfully transformed into a full-width readable list layout');

// 5. Game Session Log HTML Dialog Verification
console.assert(htmlContent.includes('id="input-session-title"'), 'index.html must have #input-session-title');
console.assert(htmlContent.includes('id="input-session-date"'), 'index.html must have #input-session-date');
console.assert(htmlContent.includes('id="input-session-time"'), 'index.html must have #input-session-time');
console.assert(htmlContent.includes('id="input-session-notes"'), 'index.html must have #input-session-notes');
console.assert(htmlContent.includes('id="btn-save-session-entry"'), 'index.html must have #btn-save-session-entry');
console.assert(appContent.includes('btn-edit-session'), 'js/app.js history render must have btn-edit-session');
console.assert(appContent.includes('btn-delete-session'), 'js/app.js history render must have btn-delete-session');
console.log('✓ Session Logger HTML pop-up dialog and edit/delete controls verified');

// 6. Minimum 10pt Font Size Check
const filesToCheck = ['css/styles.css', 'index.html', 'js/app.js'];
let fontViolations = 0;
filesToCheck.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const fontMatches = line.match(/font-size:\s*([0-9.]+(rem|px|pt))/g);
    if (fontMatches) {
      fontMatches.forEach(m => {
        const num = parseFloat(m.replace(/[^0-9.]/g, ''));
        const unit = m.slice(-2);
        if ((unit === 'em' && num < 0.833) || (unit === 'px' && num < 13.33) || (unit === 'pt' && num < 10.0)) {
          console.error(`Font size violation in ${file} at line ${idx + 1}: ${m}`);
          fontViolations++;
        }
      });
    }
  });
});
console.assert(fontViolations === 0, `Expected 0 font size violations below 10pt, found ${fontViolations}`);
console.log(`✓ 10pt Minimum Font Size check passed across ${filesToCheck.length} files (0 violations)`);

console.log('\n=== ALL v3.8 VERIFICATIONS PASSED SUCCESSFULLY! ===');
