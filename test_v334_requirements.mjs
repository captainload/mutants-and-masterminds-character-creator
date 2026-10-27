import fs from 'fs';
import { archetypeManager } from './js/archetype_window.js';

console.log('=== Running v3.34 Requirements Test Suite ===\n');

// 1. Version Check: 3.34 across version.json, index.html, and js/app.js
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.34') {
  throw new Error(`Expected version.json to be 3.34, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.34')) {
  throw new Error('Expected index.html title to reference Character Editor v3.34');
}
if (!indexHtml.includes('css/styles.css?v=3.34')) {
  throw new Error('Expected styles.css query param to be v3.34');
}
if (!indexHtml.includes('js/app.js?v=3.34')) {
  throw new Error('Expected app.js script query param to be v3.34');
}
if (!indexHtml.includes('>v3.34</span>')) {
  throw new Error('Expected header version badge to display v3.34');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.34'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.34"');
}
console.log('✓ 1. Version 3.34 verified across version.json, index.html, and js/app.js');

// 2. Archetype Popout button in index.html
if (!indexHtml.includes('id="btn-archetype-popout"')) {
  throw new Error('Expected #btn-archetype-popout in index.html');
}
if (!indexHtml.includes('🗗 Pop-Out Window')) {
  throw new Error('Expected Pop-Out Window label in index.html');
}
console.log('✓ 2. Archetype Pop-Out button verified in index.html header actions');

// 3. ArchetypeWindowManager Methods & Popout HTML
if (typeof archetypeManager.getSavedCoords !== 'function') throw new Error('Missing getSavedCoords');
if (typeof archetypeManager.saveCoords !== 'function') throw new Error('Missing saveCoords');
if (typeof archetypeManager.savePopoutOpenedState !== 'function') throw new Error('Missing savePopoutOpenedState');
if (typeof archetypeManager.savePopoutClosedState !== 'function') throw new Error('Missing savePopoutClosedState');
if (typeof archetypeManager.wasClosedWhilePoppedOut !== 'function') throw new Error('Missing wasClosedWhilePoppedOut');
if (typeof archetypeManager.setClosedWhilePoppedOut !== 'function') throw new Error('Missing setClosedWhilePoppedOut');
if (typeof archetypeManager.canDisplayPopout !== 'function') throw new Error('Missing canDisplayPopout');
if (typeof archetypeManager.isPoppedOut !== 'function') throw new Error('Missing isPoppedOut');
if (typeof archetypeManager.openPopout !== 'function') throw new Error('Missing openPopout');

const archWindowJs = fs.readFileSync('js/archetype_window.js', 'utf8');
if (!archWindowJs.includes('btn-popout-close')) {
  throw new Error('Expected #btn-popout-close in archetype_window.js popout HTML');
}
if (!archWindowJs.includes('archetype-wizard-body')) {
  throw new Error('Expected #archetype-wizard-body in archetype_window.js popout HTML');
}
if (!archWindowJs.includes('btn-wizard-back') || !archWindowJs.includes('btn-wizard-next')) {
  throw new Error('Expected wizard navigation buttons in archetype_window.js popout HTML');
}
if (!archWindowJs.includes('beforeunload')) {
  throw new Error('Expected beforeunload listener in archetype_window.js popout HTML');
}
console.log('✓ 3. ArchetypeWindowManager methods and pop-out window structure verified');

// 4. Position and size memory
archetypeManager.saveCoords({ left: 150, top: 200, width: 920, height: 800 });
const savedCoords = archetypeManager.getSavedCoords();
if (savedCoords.left !== 150 || savedCoords.top !== 200 || savedCoords.width !== 920 || savedCoords.height !== 800) {
  throw new Error(`Expected saved coords to be 150,200,920,800; got ${JSON.stringify(savedCoords)}`);
}
console.log('✓ 4. Window position and size coordinate persistence verified');

// 5. State memory & preference restoration
archetypeManager.setClosedWhilePoppedOut(true);
if (!archetypeManager.wasClosedWhilePoppedOut()) {
  throw new Error('Expected wasClosedWhilePoppedOut to be true');
}
archetypeManager.setClosedWhilePoppedOut(false);
if (archetypeManager.wasClosedWhilePoppedOut()) {
  throw new Error('Expected wasClosedWhilePoppedOut to be false');
}

// Check app.js toggle & popout restoration integration
if (!appJs.includes('archetypeManager.wasClosedWhilePoppedOut() && archetypeManager.canDisplayPopout()')) {
  throw new Error('Expected app.js to check wasClosedWhilePoppedOut and canDisplayPopout');
}
if (!appJs.includes('this.openArchetypePopout()')) {
  throw new Error('Expected app.js to call openArchetypePopout()');
}
if (!appJs.includes('archetypeManager.popoutWindow.close()')) {
  throw new Error('Expected app.js to support closing popout on toggle');
}
console.log('✓ 5. State memory, display width check, and popup toggle logic verified');

// 6. Multi-target rendering for wizard
if (!appJs.includes('renderWizardStepToTarget(targetDoc)')) {
  throw new Error('Expected renderWizardStepToTarget method in app.js');
}
if (!appJs.includes('archetypeManager.popoutWindow.document')) {
  throw new Error('Expected renderWizardStep to target popoutWindow.document');
}
console.log('✓ 6. Multi-target wizard step rendering (modal + popout) verified');

console.log('\n=== All v3.34 Requirements Tests Passed Successfully! ===');
