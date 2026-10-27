import fs from 'fs';

console.log('=== Running v3.31 Requirements Test Suite ===\n');

// 1. Version Check: 3.31 across version.json, index.html, and js/app.js
const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
if (versionJson.version !== '3.31') {
  throw new Error(`Expected version.json to be 3.31, got ${versionJson.version}`);
}

const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('Character Editor v3.31')) {
  throw new Error('Expected index.html title to reference Character Editor v3.31');
}
if (!indexHtml.includes('css/styles.css?v=3.31')) {
  throw new Error('Expected styles.css query param to be v3.31');
}
if (!indexHtml.includes('js/app.js?v=3.31')) {
  throw new Error('Expected app.js script query param to be v3.31');
}
if (!indexHtml.includes('>v3.31</span>')) {
  throw new Error('Expected header version badge to display v3.31');
}

const appJs = fs.readFileSync('js/app.js', 'utf8');
if (!appJs.includes("CURRENT_VERSION = '3.31'")) {
  throw new Error('Expected js/app.js to define CURRENT_VERSION = "3.31"');
}
console.log('✓ 1. Version 3.31 verified across version.json, index.html, and js/app.js');

// 2. Echo spending of HP (including how spent) to chat
const discordJs = fs.readFileSync('js/discord.js', 'utf8');
if (!discordJs.includes("content: `⚡ **${characterName || 'Hero'}** expended 1 Hero Point for **${spendType}** (${spendDetails})`")) {
  throw new Error('Expected js/discord.js to send content text string for chat feeds');
}
if (!appJs.includes("discordIntegrator.sendHeroPointSpend(this.char.name, 'Hero Point Expended', 'Manually deducted from character sheet')")) {
  throw new Error('Expected manual HP deduction to echo spend to chat');
}
if (!appJs.includes("action-dice-result") || !appJs.includes("⚡ Hero Point Expended")) {
  throw new Error('Expected HP spend to echo in action-dice-result banner');
}
console.log('✓ 2. HP spending echo to chat and action center verified');

// 3. Hide the Spend HP button unless the action center is the active tab
if (!appJs.includes("spendBtn.style.display = (activeTab === 'tab-action') ? '' : 'none'")) {
  throw new Error('Expected Spend HP button to be visible only when active tab is tab-action');
}
console.log('✓ 3. Spend HP button visibility restricted to Action Center tab');

// 4. Session log dialog HP and PP adjust fields with steppers
if (!indexHtml.includes('id="input-session-hp-adjust"')) {
  throw new Error('Expected input-session-hp-adjust in index.html');
}
if (!indexHtml.includes('id="btn-session-hp-minus"') || !indexHtml.includes('id="btn-session-hp-plus"')) {
  throw new Error('Expected HP stepper buttons in index.html');
}
if (!indexHtml.includes('id="input-session-pp-adjust"')) {
  throw new Error('Expected input-session-pp-adjust in index.html');
}
if (!indexHtml.includes('id="btn-session-pp-minus"') || !indexHtml.includes('id="btn-session-pp-plus"')) {
  throw new Error('Expected PP stepper buttons in index.html');
}
if (!indexHtml.includes('id="session-hp-current-display"') || !indexHtml.includes('id="session-pp-current-display"')) {
  throw new Error('Expected current display labels for HP and PP in index.html');
}
console.log('✓ 4. Session log HP/PP adjust fields and steppers verified');

// 5. Game session logs display HP and PP totals
if (!appJs.includes("HP: ${sess.characterHP ?? '—'}") || !appJs.includes("PP: ${sess.characterPP ?? '—'}")) {
  throw new Error('Expected session log entries to display character HP and PP totals');
}
console.log('✓ 5. Session log entry displays HP and PP totals at save time');

// 6. Alert user when enough PP are gained to raise PL
if (!appJs.includes("Power Level Advancement Available") || !appJs.includes("newPotentialPL = Math.floor(newPP / 15)")) {
  throw new Error('Expected PL advancement calculation and alert when threshold is met');
}
console.log('✓ 6. PL advancement threshold calculation and user alert verified');

// 7. Character backup snapshot, restore button with confirmation, delete warning, and export button
if (!appJs.includes("delete characterSnapshot.historyLog")) {
  throw new Error('Expected characterSnapshot to be created on session save without circular historyLog');
}
if (!appJs.includes("btn-restore-session") || !appJs.includes("Restore Backup")) {
  throw new Error('Expected Restore button with confirmation dialog for session backups');
}
if (!appJs.includes("WARNING: This session contains a saved character backup")) {
  throw new Error('Expected warning when deleting session log with saved character backup');
}
if (!appJs.includes("btn-export-session") || !appJs.includes("exportCharacterSnapshot")) {
  throw new Error('Expected session export button and exportCharacterSnapshot helper');
}
console.log('✓ 7. Session character backup snapshot, restore, delete warning, and export verified');

// 8. Tables popup close button and popout closed state memory
const tablesJs = fs.readFileSync('js/tables.js', 'utf8');
if (!indexHtml.includes('id="btn-close-tables-footer"')) {
  throw new Error('Expected btn-close-tables-footer in index.html');
}
if (!tablesJs.includes('savePopoutClosedState()') || !tablesJs.includes('savePopoutOpenedState()') || !tablesJs.includes('isPoppedOut()')) {
  throw new Error('Expected tables.js to implement popout state persistence methods');
}
if (!tablesJs.includes('btn-popout-close')) {
  throw new Error('Expected close button in popout window');
}
if (!appJs.includes("tablesManager.savePopoutClosedState()")) {
  throw new Error('Expected app.js to save popout closed state when closing tables');
}
console.log('✓ 8. Tables popup close button and popout closed state memory verified');

// 9. PP row whitespace reduction and widened Spend HP button
const cssContent = fs.readFileSync('css/styles.css', 'utf8');
if (!cssContent.includes('#btn-quick-spend-hp') || !cssContent.includes('white-space: nowrap') || !cssContent.includes('min-width: 130px')) {
  throw new Error('Expected widened non-wrapping #btn-quick-spend-hp styles in css/styles.css');
}
if (!cssContent.includes('gap: 0.65rem;') || !cssContent.includes('gap: 0.5rem;')) {
  throw new Error('Expected reduced horizontal whitespace on PP row and row-2-left in css/styles.css');
}
if (!indexHtml.includes('white-space: nowrap') || !indexHtml.includes('min-width: 130px')) {
  throw new Error('Expected widened non-wrapping #btn-quick-spend-hp in index.html');
}
console.log('✓ 9. PP row horizontal whitespace reduction and widened Spend HP button verified');

// 10. HP stepper and Spend HP button shifted for equal whitespace on either side
if (!cssContent.includes('margin-left: auto') || !cssContent.includes('margin-right: auto')) {
  throw new Error('Expected hp-status-group to have auto margins for equal whitespace distribution');
}
if (!indexHtml.includes('</div>\n\n          <div class="hp-status-group">') && !indexHtml.includes('</div>\r\n\r\n          <div class="hp-status-group">')) {
  throw new Error('Expected hp-status-group to be positioned between row-2-left and row-2-right');
}
console.log('✓ 10. HP stepper and Spend HP button centered with equal whitespace verified');

// 11. Restore button white text, session log character stats (Name, HP, PL, PP), and 4-entry scrollable pane
if (!appJs.includes('btn-restore-session') || !appJs.includes('color: #fff')) {
  throw new Error('Expected Restore button to have white text');
}
if (!appJs.includes('${charName}') || !appJs.includes('PL: ${charPL}')) {
  throw new Error('Expected session log entries to display character name and PL alongside HP and PP');
}
if (!cssContent.includes('#session-log-list') || !cssContent.includes('max-height') || !cssContent.includes('overflow-y: auto')) {
  throw new Error('Expected #session-log-list scrollable pane styling in css/styles.css');
}
if (!indexHtml.includes('max-height: 490px; overflow-y: auto')) {
  throw new Error('Expected scrollable container for session-log-list in index.html');
}
console.log('✓ 11. Restore button white text, log entry Name/HP/PL/PP display, and scrollable pane verified');

console.log('\nAll v3.31 requirements passed successfully!');
