import { readFileSync } from 'fs';
import assert from 'assert';

console.log('--- Testing v3.66 Cloud Backups & Import/Export Suite ---');

// 1. Verify index.html markup
const indexHtml = readFileSync('index.html', 'utf8');

assert(indexHtml.includes('id="menu-action-cloud-backup"'), 'menu-action-cloud-backup missing in index.html');
assert(indexHtml.includes('id="menu-action-cloud-restore"'), 'menu-action-cloud-restore missing in index.html');
assert(indexHtml.includes('id="menu-action-export-pdf"'), 'menu-action-export-pdf missing in index.html');
assert(!indexHtml.includes('id="menu-action-export-mm3"'), 'menu-action-export-mm3 should be removed');
assert(!indexHtml.includes('id="menu-action-import-mm3"'), 'menu-action-import-mm3 should be removed');
assert(indexHtml.includes('id="modal-cloud-restore"'), 'modal-cloud-restore missing in index.html');
assert(indexHtml.includes('id="cloud-restore-list"'), 'cloud-restore-list missing in index.html');
assert(indexHtml.includes('id="btn-close-cloud-restore"'), 'btn-close-cloud-restore missing in index.html');
assert(indexHtml.includes('id="btn-close-cloud-restore-footer"'), 'btn-close-cloud-restore-footer missing in index.html');
assert(indexHtml.includes('auth-tab-btn'), 'auth-tab-btn class missing in index.html');
assert(indexHtml.includes('id="header-auth-icon"'), 'header-auth-icon missing in index.html');
assert(indexHtml.includes('id="header-auth-label"'), 'header-auth-label missing in index.html');
assert(indexHtml.includes('id="header-user-dropdown"'), 'header-user-dropdown missing in index.html');
assert(indexHtml.includes('id="btn-header-user-settings"'), 'btn-header-user-settings missing in index.html');
assert(indexHtml.includes('id="flyout-user-settings-panel"'), 'flyout-user-settings-panel missing in index.html');
assert(indexHtml.includes('id="btn-user-settings-reset-password"'), 'btn-user-settings-reset-password missing in index.html');
assert(indexHtml.includes('id="btn-user-settings-delete-account"'), 'btn-user-settings-delete-account missing in index.html');
assert(indexHtml.includes('font-size: 14px;'), '14px font size used on login button in index.html');
console.log('✓ UI elements and modals verified in index.html');

// 2. Verify styles.css
const stylesCss = readFileSync('css/styles.css', 'utf8');
assert(stylesCss.includes('.auth-tab-btn.active'), '.auth-tab-btn.active rule missing in styles.css');
assert(stylesCss.includes('.btn-header-user-link'), '.btn-header-user-link rule missing in styles.css');
assert(stylesCss.includes('.header-user-icon-connected'), '.header-user-icon-connected rule missing in styles.css');
console.log('✓ Active tab highlight and header user styles verified in styles.css');

// 3. Verify supabase_client.js features
import { supabaseService } from './js/supabase_client.js';

assert(typeof supabaseService.backupCharacter === 'function', 'backupCharacter method missing');
assert(typeof supabaseService.getCharacterBackups === 'function', 'getCharacterBackups method missing');
assert(typeof supabaseService.deleteCharacterBackup === 'function', 'deleteCharacterBackup method missing');
assert(typeof supabaseService.deleteCurrentUserAccount === 'function', 'deleteCurrentUserAccount method missing');

// Mock client to test backupCharacter & getCharacterBackups
let capturedUpsert = null;
let capturedDelete = null;
supabaseService.client = {
  from(table) {
    if (table === 'character_backups') {
      return {
        upsert(record, opts) {
          capturedUpsert = { record, opts };
          return {
            select() {
              return {
                single() {
                  return Promise.resolve({ data: record, error: null });
                }
              };
            }
          };
        },
        select(cols) {
          return {
            eq(col, val) {
              return {
                order(field, dir) {
                  return Promise.resolve({
                    data: [
                      {
                        id: 'b1',
                        character_id: 'char_123',
                        name: 'Apex Hero',
                        power_level: 10,
                        concept: 'Defender of Freedom',
                        updated_at: new Date().toISOString(),
                        character_data: { name: 'Apex Hero', powerLevel: 10 }
                      }
                    ],
                    error: null
                  });
                }
              };
            }
          };
        },
        delete() {
          return {
            eq(col1, val1) {
              return {
                eq(col2, val2) {
                  capturedDelete = { [col1]: val1, [col2]: val2 };
                  return Promise.resolve({ error: null });
                }
              };
            }
          };
        }
      };
    }
    return {};
  }
};
supabaseService.currentUser = { id: 'user_test_999', email: 'tester@example.com' };

// Test backupCharacter
const testHero = {
  id: 'char_apex_1',
  name: 'Apex Hero',
  powerLevel: 10,
  concept: 'Defender of Freedom',
  abilities: { str: { base: 5 } }
};

const backedUp = await supabaseService.backupCharacter(testHero);
assert(capturedUpsert !== null, 'upsert was not called');
assert.strictEqual(capturedUpsert.record.user_id, 'user_test_999');
assert.strictEqual(capturedUpsert.record.character_id, 'char_apex_1');
assert.strictEqual(capturedUpsert.record.name, 'Apex Hero');
assert.strictEqual(capturedUpsert.record.power_level, 10);
assert.strictEqual(capturedUpsert.record.concept, 'Defender of Freedom');
assert.deepStrictEqual(capturedUpsert.record.character_data, testHero);
console.log('✓ supabaseService.backupCharacter upsert logic verified');

// Test getCharacterBackups
const backups = await supabaseService.getCharacterBackups();
assert(Array.isArray(backups) && backups.length === 1);
assert.strictEqual(backups[0].name, 'Apex Hero');
console.log('✓ supabaseService.getCharacterBackups query verified');

// Test deleteCharacterBackup
await supabaseService.deleteCharacterBackup('b1');
assert(capturedDelete !== null);
assert.strictEqual(capturedDelete.id, 'b1');
assert.strictEqual(capturedDelete.user_id, 'user_test_999');
console.log('✓ supabaseService.deleteCharacterBackup logic verified');

console.log('ALL v3.66 CLOUD BACKUP & IMPORT/EXPORT TESTS PASSED CLEANLY!');
