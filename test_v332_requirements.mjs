import fs from 'fs';

console.log('=== Running v3.32 Requirements Test Suite ===\n');

// 1. Version Check: 3.32 across version.json, index.html, and js/app.js
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.32') {
  throw new Error(`Expected version.json to be 3.32, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.32')) {
  throw new Error('Expected index.html title to reference Character Editor v3.32');
}
if (!indexHtml.includes('css/styles.css?v=3.32')) {
  throw new Error('Expected styles.css query param to be v3.32');
}
if (!indexHtml.includes('js/app.js?v=3.32')) {
  throw new Error('Expected app.js script query param to be v3.32');
}
if (!indexHtml.includes('>v3.32</span>')) {
  throw new Error('Expected header version badge to display v3.32');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.32'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.32"');
}
console.log('✓ 1. Version 3.32 verified across version.json, index.html, and js/app.js');

// 2. Textareas fixed non-resizable (resize: none) in CSS and HTML
const css = fs.readFileSync('css/styles.css', 'utf8');
if (!css.includes('resize: none !important')) {
  throw new Error('Expected resize: none !important in css/styles.css for textareas');
}
if (!indexHtml.includes('resize: none')) {
  throw new Error('Expected resize: none on textarea elements in index.html');
}
console.log('✓ 2. Textareas fixed with manual drag resizing disabled (resize: none)');

// 3. Auto-resizing text windows up to limit of visible whitespace below in browser window
if (!appJs.includes('setupAutoResizingTextareas') || !appJs.includes('resizeAllTextareas')) {
  throw new Error('Expected setupAutoResizingTextareas and resizeAllTextareas in js/app.js');
}
if (!appJs.includes('getBoundingClientRect') || !appJs.includes('window.innerHeight')) {
  throw new Error('Expected visible viewport space calculation in auto-resize logic');
}
if (!appJs.includes('maxAvailable') || !appJs.includes('scrollHeight')) {
  throw new Error('Expected auto-resize to fit scrollHeight up to maxAvailable visible space');
}
console.log('✓ 3. Auto-resizing vertically to fit content up to viewport bottom limit verified');

// 4. Equal width for background and contacts textareas
if (!indexHtml.includes('grid-template-columns: 1fr 1fr') || !indexHtml.includes('history-origin-text') || !indexHtml.includes('history-contacts-text')) {
  throw new Error('Expected 1fr 1fr equal columns for history-origin-text and history-contacts-text in index.html');
}
if (!css.includes('#history-origin-text,\n#history-contacts-text') && !css.includes('#history-origin-text,\r\n#history-contacts-text')) {
  throw new Error('Expected equal-width styles for history-origin-text and history-contacts-text in css/styles.css');
}
console.log('✓ 4. Background and contacts textareas equal width verified');

// 5. Active tabs: extended colored underline to full outline
if (!css.includes('.nav-tab-btn.active') || !css.includes('border-color: var(--hero-cyan)') && !css.includes('border: 2px solid var(--hero-cyan)')) {
  throw new Error('Expected full colored outline on .nav-tab-btn.active in css/styles.css');
}
if (css.includes('border-bottom: 3px solid transparent') || css.includes('border-bottom-color: var(--hero-cyan)')) {
  throw new Error('Expected bottom-only underline to be replaced by full outline on .nav-tab-btn');
}
console.log('✓ 5. Active navigation tabs full outline verified');

console.log('\nAll v3.32 requirements passed successfully!');
