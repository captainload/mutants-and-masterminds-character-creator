import assert from 'node:assert/strict';
import {
  POWER_EFFECTS_CATALOG,
  computePowerRangeAndDuration,
  computePowerEffectiveStats,
  isModifierLegalForEffect,
  validateModifierLegality
} from './js/rules.js?v=3.95';
import { CampaignTrackerManager } from './js/party.js?v=3.95';

console.log('--- TEST SUITE: v3.95 Features ---');

// 1. Alphabetical sorting of POWER_EFFECTS_CATALOG
console.log('Test 1: Verify POWER_EFFECTS_CATALOG is alphabetically sorted');
for (let i = 0; i < POWER_EFFECTS_CATALOG.length - 1; i++) {
  const current = POWER_EFFECTS_CATALOG[i];
  const next = POWER_EFFECTS_CATALOG[i + 1];
  assert(
    current.name.localeCompare(next.name) <= 0,
    `POWER_EFFECTS_CATALOG is not alphabetically sorted at index ${i}: "${current.name}" should precede "${next.name}"`
  );
}
const blastIdx = POWER_EFFECTS_CATALOG.findIndex(e => e.id === 'blast');
const quicknessIdx = POWER_EFFECTS_CATALOG.findIndex(e => e.id === 'quickness');
const regenIdx = POWER_EFFECTS_CATALOG.findIndex(e => e.id === 'regeneration');
assert.equal(blastIdx, quicknessIdx + 1, 'Ranged Damage should immediately follow Quickness');
assert.equal(blastIdx, regenIdx - 1, 'Ranged Damage should immediately precede Regeneration');
console.log('✓ POWER_EFFECTS_CATALOG is fully and strictly alphabetically sorted.');

// 2. Power Range Calculation for Rank 5 Ranged, Increased Range, Reduced Range
console.log('Test 2: Power Range Calculations for Rank 5');
const rangedEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'blast'); // Ranged Damage (Ranged)
const closeEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage'); // Damage (Close)

// Rank 5 Ranged Damage
const statsRanged5 = computePowerEffectiveStats(rangedEffect, [], [], null, 5);
assert.equal(statsRanged5.effectiveRange, 'Ranged');
assert.equal(statsRanged5.rangeMeasurement, '125/250/500 ft.', `Expected 125/250/500 ft., got ${statsRanged5.rangeMeasurement}`);
assert.equal(statsRanged5.rangeDisplay, 'Ranged (125/250/500 ft.)');
console.log('✓ Rank 5 Ranged Damage has correct range brackets (125/250/500 ft.).');

// Rank 5 Close Damage
const statsClose5 = computePowerEffectiveStats(closeEffect, [], [], null, 5);
assert.equal(statsClose5.effectiveRange, 'Close');
assert.equal(statsClose5.rangeMeasurement, '5 ft.');
assert.equal(statsClose5.rangeDisplay, 'Close (5 ft.)');

// 1 rank of Increased Range on Close Damage 5 -> becomes Ranged (125/250/500 ft.)
const statsIncRange = computePowerEffectiveStats(closeEffect, [{ id: 'increased_range', rank: 1 }], [], null, 5);
assert.equal(statsIncRange.effectiveRange, 'Ranged');
assert.equal(statsIncRange.rangeMeasurement, '125/250/500 ft.', `Increased Range should increase Close 5ft to Ranged 125/250/500 ft, got ${statsIncRange.rangeMeasurement}`);
assert.equal(statsIncRange.rangeDisplay, 'Ranged (125/250/500 ft.)');
console.log('✓ 1 rank of Increased Range on Rank 5 Close effect gives Ranged (125/250/500 ft.).');

// 1 rank of Reduced Range on Ranged Damage 5 -> becomes Close (5 ft.)
const statsRedRange = computePowerEffectiveStats(rangedEffect, [], [{ id: 'reduced_range', rank: 1 }], null, 5);
assert.equal(statsRedRange.effectiveRange, 'Close');
assert.equal(statsRedRange.rangeMeasurement, '5 ft.', `Reduced Range should reduce Ranged to Close 5 ft, got ${statsRedRange.rangeMeasurement}`);
assert.equal(statsRedRange.rangeDisplay, 'Close (5 ft.)');
console.log('✓ 1 rank of Reduced Range on Rank 5 Ranged effect gives Close (5 ft.).');

// Diminished Range & Extended Range on Rank 5 Ranged
const statsDimRange = computePowerEffectiveStats(rangedEffect, [], [{ id: 'diminished_range', rank: 1 }], null, 5);
assert.equal(statsDimRange.rangeMeasurement, '50/125/250 ft.');

const statsExtRange = computePowerEffectiveStats(rangedEffect, [{ id: 'extended_range', rank: 1 }], [], null, 5);
assert.equal(statsExtRange.rangeMeasurement, '250/500/1000 ft.');
console.log('✓ Diminished Range and Extended Range adjust multipliers correctly.');

// Rank-based range (Communication, Remote Sensing)
const commEffect = POWER_EFFECTS_CATALOG.find(e => e.id === 'communication');
const statsComm5 = computePowerEffectiveStats(commEffect, [], [], null, 5);
assert.equal(statsComm5.effectiveRange, 'Rank');
assert.equal(statsComm5.rangeMeasurement, '900 feet');
console.log('✓ Communication Rank 5 correctly uses distance rank from Measurements Table.');

// Illegal Increased/Reduced range on Rank-based power
const legalIncOnRank = isModifierLegalForEffect({ id: 'increased_range', name: 'Increased Range' }, commEffect);
assert.equal(legalIncOnRank.legal, false);
const legalRedOnRank = isModifierLegalForEffect({ id: 'reduced_range', name: 'Reduced Range' }, commEffect);
assert.equal(legalRedOnRank.legal, false);
console.log('✓ Increased Range and Reduced Range are disallowed on Rank-based powers.');

// 3. Campaign Browser Content Generation (No ReferenceError, Content is Rendered)
console.log('Test 3: Campaign Browser Content Generation');
// Mock window & document for node test environment
globalThis.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  appController: {
    storage: {
      getCharacters: () => []
    }
  }
};
globalThis.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};

const manager = new CampaignTrackerManager();
// Set up mock campaigns: one created by someone else (isCreator: false) and one created by user
localStorage.setItem('mm3e_campaign_registry', JSON.stringify({
  'CAMP1': {
    campaignId: 'CAMP1',
    campaignName: 'Metropolis Guardians',
    creatorName: 'OtherGM',
    powerLevel: 10,
    isPublic: true,
    notes: 'Public campaign looking for players'
  },
  'CAMP2': {
    campaignId: 'CAMP2',
    campaignName: 'Gotham Nights',
    creatorName: 'OtherGM2',
    powerLevel: 12,
    // isPublic undefined -> should default to public
    notes: 'Dark detective adventures'
  }
}));

const browsable = manager.getBrowsableCampaigns();
assert(browsable.length >= 2, `Expected at least 2 browsable campaigns, got ${browsable.length}`);
console.log(`✓ getBrowsableCampaigns returned ${browsable.length} campaigns (including ones with undefined isPublic).`);

// generateCampaignBrowserHTML should execute without throwing ReferenceError: isJoinedOrCreated is not defined
let html = '';
assert.doesNotThrow(() => {
  html = manager.generateCampaignBrowserHTML();
}, 'generateCampaignBrowserHTML should not throw an exception');

assert(html.includes('Metropolis Guardians'), 'HTML should contain Metropolis Guardians card');
assert(html.includes('Gotham Nights'), 'HTML should contain Gotham Nights card');
assert(html.includes('campaign-browser-card'), 'HTML should contain campaign-browser-card elements');
console.log('✓ Campaign Browser generates cards successfully without ReferenceError.');

console.log('\n--- ALL v3.95 TESTS PASSED SUCCESSFULLY! ---');
