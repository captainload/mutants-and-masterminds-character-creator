/**
 * Character State Storage & Management
 * Supports auto-save, multi-character profiles, JSON export/import.
 */

import { ARCHETYPES } from './archetypes.js';

const STORAGE_KEY = 'mm3e_characters_collection';
const CURRENT_CHAR_KEY = 'mm3e_active_character_id';

export class StorageManager {
  constructor() {
    this.characters = this.loadAll();
    this.activeId = typeof localStorage !== 'undefined' ? localStorage.getItem(CURRENT_CHAR_KEY) : null;

    // Purge any pre-seeded or default archetype (e.g. Battlesuit) from previous sessions
    this.characters = this.characters.filter(c => !this.isPrebuiltArchetype(c));

    if (this.characters.length === 0) {
      // Create a clean, blank freeform hero by default (never seed an archetype)
      const defaultHero = this.buildBlankHero('New Hero', 10, 150);
      this.characters = [defaultHero];
      this.activeId = defaultHero.id;
      this.saveAll();
    } else if (!this.activeId || !this.characters.some(c => c.id === this.activeId)) {
      this.activeId = this.characters[0].id;
      this.saveAll();
    }
  }

  isPrebuiltArchetype(c) {
    if (!c) return false;
    if (c.userApplied) return false; // User explicitly applied this archetype in wizard
    if (c.name === 'Apex Guardian') return true;
    if (c.name === 'Battlesuit') return true;
    if (ARCHETYPES.some(a => a.name === c.name || a.id === c.id || a.id === c.archetypeId)) return true;
    if (c.concept === 'Genius inventor or pilot inside an advanced powered exoskeleton armor suit.' || c.concept === 'Armored Paragon') return true;
    if (Array.isArray(c.powers) && c.powers.some(p => (p.name || '').toLowerCase().includes('battlesuit'))) return true;
    return false;
  }

  buildBlankHero(name = 'New Hero', pl = 10, budget = 150) {
    return {
      id: 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name,
      player: '',
      campaign: 'Standard Issue',
      identity: 'Secret Identity',
      powerLevel: pl,
      powerPointsBudget: budget,
      heroPoints: 1,
      bruises: 0,
      concept: 'Freeform custom superhero',
      abilities: { str: 0, sta: 0, agi: 0, dex: 0, fgt: 0, int: 0, awe: 0, pre: 0 },
      defenses: { dodge: 0, parry: 0, fortitude: 0, toughness: 0, will: 0 },
      skills: [],
      advantages: [],
      powers: [],
      gear: [],
      complications: [
        { type: 'Motivation', name: 'Justice', desc: 'Driven to fight crime and protect innocents.' }
      ],
      conditions: { dazed: false, staggered: false, defenseless: false, vulnerable: false }
    };
  }

  loadAll() {
    try {
      if (typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Error loading characters from localStorage', e);
      return [];
    }
  }

  saveAll() {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.characters));
      localStorage.setItem(CURRENT_CHAR_KEY, this.activeId || '');
    } catch (e) {
      console.error('Error saving characters to localStorage', e);
    }
  }

  getActiveCharacter() {
    return this.characters.find(c => c.id === this.activeId) || this.characters[0];
  }

  setActiveCharacter(id) {
    if (this.characters.some(c => c.id === id)) {
      this.activeId = id;
      this.saveAll();
    }
  }

  saveCharacter(updatedChar) {
    const idx = this.characters.findIndex(c => c.id === updatedChar.id);
    if (idx !== -1) {
      this.characters[idx] = JSON.parse(JSON.stringify(updatedChar));
    } else {
      this.characters.push(JSON.parse(JSON.stringify(updatedChar)));
    }
    this.saveAll();
  }

  createFreeformCharacter(name = 'New Hero', pl = 10, budget = 150) {
    const newChar = this.buildBlankHero(name, pl, budget);
    this.characters.push(newChar);
    this.activeId = newChar.id;
    this.saveAll();
    return newChar;
  }

  createFromArchetype(archetypeId, customName = null) {
    const template = ARCHETYPES.find(a => a.id === archetypeId);
    if (!template) throw new Error('Archetype not found');

    const newChar = JSON.parse(JSON.stringify(template));
    newChar.id = 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    newChar.name = customName || `${template.name}`;
    newChar.identity = 'Secret Identity';
    newChar.heroPoints = 1;
    newChar.bruises = 0;
    newChar.conditions = { dazed: false, staggered: false, defenseless: false, vulnerable: false };

    this.characters.push(newChar);
    this.activeId = newChar.id;
    this.saveAll();
    return newChar;
  }

  cloneCharacter(charId) {
    const original = this.characters.find(c => c.id === charId);
    if (!original) return null;

    const clone = JSON.parse(JSON.stringify(original));
    clone.id = 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    clone.name = `${original.name} (Copy)`;
    this.characters.push(clone);
    this.activeId = clone.id;
    this.saveAll();
    return clone;
  }

  deleteCharacter(charId) {
    if (this.characters.length <= 1) {
      alert('You must keep at least one character in your roster.');
      return false;
    }
    this.characters = this.characters.filter(c => c.id !== charId);
    if (this.activeId === charId) {
      this.activeId = this.characters[0].id;
    }
    this.saveAll();
    return true;
  }

  exportCharacterToMM3(char) {
    const payload = {
      format: 'MM3',
      schemaVersion: '3.0',
      exportedAt: new Date().toISOString(),
      character: char
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/x-mm3' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cleanName = (char.name || 'Hero').trim().replace(/[^a-zA-Z0-9_\- ]/g, '');
    a.download = `${cleanName}.mm3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  parseMM3File(contentString) {
    try {
      const parsed = JSON.parse(contentString);
      const charData = parsed.character || parsed;
      if (!charData || !charData.name || charData.abilities === undefined) {
        throw new Error('File does not contain valid M&M 3E character data.');
      }
      return charData;
    } catch (e) {
      throw new Error('Failed to parse MM3 file: ' + e.message);
    }
  }

  exportCharacterToJSON(char) {
    const jsonStr = JSON.stringify(char, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${char.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_pl${char.powerLevel}.mm3e.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importCharacterFromJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.name || parsed.abilities === undefined) {
        throw new Error('Invalid Mutants & Masterminds character data.');
      }
      parsed.id = 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
      parsed.name = `${parsed.name} (Imported)`;
      this.characters.push(parsed);
      this.activeId = parsed.id;
      this.saveAll();
      return parsed;
    } catch (e) {
      alert('Failed to import character: ' + e.message);
      return null;
    }
  }
}

export const storageManager = new StorageManager();
