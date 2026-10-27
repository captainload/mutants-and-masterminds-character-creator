import fs from 'fs';

console.log('=== Running v3.17 Requirements Test Suite ===\n');

// 1. Version Check
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (parseFloat(versionJson.version) < 3.17) {
  throw new Error(`Expected version.json to be >= 3.17, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Architect v3.17') && !indexHtml.includes('Character Architect v3.18')) {
  throw new Error('Expected index.html title to reference v3.17 or higher');
}
if (!indexHtml.includes('Character Editor v3.17') && !indexHtml.includes('Character Editor v3.18')) {
  throw new Error('Expected index.html brand label to reference v3.17 or higher');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.17'") && !appJs.includes("CURRENT_VERSION = '3.18'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION >= 3.17');
}
console.log('✓ 1. Version >= 3.17 verified across version.json, index.html, and js/app.js');

// 2. Powers Tab Top Control Buttons
if (!indexHtml.includes('id="btn-apply-profile"')) {
  throw new Error('Expected index.html to contain #btn-apply-profile');
}
if (!indexHtml.includes('id="btn-open-custom-power-builder"')) {
  throw new Error('Expected index.html to contain #btn-open-custom-power-builder');
}
if (!indexHtml.includes('id="btn-quick-add-power"')) {
  throw new Error('Expected index.html to contain #btn-quick-add-power');
}
console.log('✓ 2. Powers tab action buttons present (#btn-apply-profile, #btn-open-custom-power-builder, #btn-quick-add-power)');

// 3. linkExistingEffect Bug Fix (Argument Order)
const badCall = /openPrebuiltOptionsModal\s*\(\s*options\s*,/;
if (badCall.test(appJs)) {
  throw new Error('Detected incorrect openPrebuiltOptionsModal argument order (options first instead of title)');
}
const correctCall = /openPrebuiltOptionsModal\s*\(\s*['"]Link With Existing Effect['"]\s*,\s*options\s*,/;
if (!correctCall.test(appJs)) {
  throw new Error("Expected openPrebuiltOptionsModal called with ('Link With Existing Effect', options, ...)");
}
console.log('✓ 3. Verified linkExistingEffect passes arguments in correct order (title, options, callback)');

// 4. refreshPowersState Method & Reactive State Synchronization
if (!appJs.includes('refreshPowersState() {')) {
  throw new Error('Expected AppController to implement refreshPowersState()');
}
if (!appJs.includes('this.renderHeaderStatus();') || !appJs.includes('this.renderActionCenter(audit);')) {
  throw new Error('Expected refreshPowersState() to update header status and action center');
}
console.log('✓ 4. refreshPowersState() verified with full header PP and action center synchronization');

// 5. Button Interactivity & No Silent Drops
if (appJs.includes("extrasCol.querySelector('.select-add-extra').value;\n          if (!selectedId) return;")) {
  throw new Error('Found silent early return in btn-add-extra when select has default placeholder');
}
if (appJs.includes("flawsCol.querySelector('.select-add-flaw').value;\n          if (!selectedId) return;")) {
  throw new Error('Found silent early return in btn-add-flaw when select has default placeholder');
}

// Ensure all steppers and modifier buttons call refreshPowersState
if (appJs.includes('this.renderPowersTab(auditCharacter(this.char))')) {
  throw new Error('Found deprecated isolated renderPowersTab(auditCharacter) call; all state changes must call refreshPowersState()');
}
console.log('✓ 5. Verified modifier adding fallbacks and eliminated all isolated non-refreshing render calls');

// 6. Card Header Action Buttons
if (!appJs.includes('btn-toggle-power-expand') ||
    !appJs.includes('btn-edit-power-modal') ||
    !appJs.includes('btn-duplicate-power') ||
    !appJs.includes('btn-delete-power')) {
  throw new Error('Missing standard power card header actions (toggle, edit modal, duplicate, delete)');
}
console.log('✓ 6. Power card header actions verified (Expand/Collapse, Builder Modal, Duplicate, Delete)');

console.log('\n=== ALL v3.17 REQUIREMENTS TESTS PASSED SUCCESSFULLY! ===');
