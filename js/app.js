/**
 * Mutants & Masterminds 3e Character Architect & Interactive Record
 * Primary Application Controller
 */

import {
  ABILITIES,
  DEFENSES,
  SKILLS_LIST,
  ADVANTAGES_DATABASE,
  POWER_EFFECTS_CATALOG,
  EXTRAS_CATALOG,
  FLAWS_CATALOG,
  calculatePowerCost,
  auditCharacter,
  getStrengthLiftingCapacity
} from './rules.js';

import { ARCHETYPES, getArchetypeById } from './archetypes.js';
import { diceRoller } from './dice.js';
import { discordIntegrator } from './discord.js';
import { storageManager } from './storage.js';

class AppController {
  constructor() {
    this.char = storageManager.getActiveCharacter();
    this.activePowerEditing = null; // currently opened power in builder
    this.init();
  }

  init() {
    this.initFontSize();
    this.setupNavigation();
    this.setupDiceLog();
    this.setupSidebarControls();
    this.setupModals();
    this.setupRoster();
    this.setupSettingsTab();
    this.renderAll();
  }

  // ==========================================
  // FONT SIZE CONTROLS
  // ==========================================
  initFontSize() {
    const savedSize = localStorage.getItem('mm3e_font_size') || 'normal';
    document.documentElement.setAttribute('data-font-size', savedSize);
    document.querySelectorAll('.font-size-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === savedSize);
      btn.addEventListener('click', () => {
        const size = btn.dataset.size;
        document.documentElement.setAttribute('data-font-size', size);
        localStorage.setItem('mm3e_font_size', size);
        document.querySelectorAll('.font-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.showToast(`Font size set to ${size.toUpperCase()}`);
      });
    });
  }

  // ==========================================
  // TABS & NAVIGATION
  // ==========================================
  setupNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        tabButtons.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const content = document.getElementById(targetTab);
        if (content) content.classList.add('active');
      });
    });

    // Jump to powers tab shortcut
    document.getElementById('btn-goto-powers-tab')?.addEventListener('click', () => {
      document.querySelector('[data-tab="tab-powers"]')?.click();
    });
  }

  // ==========================================
  // ROSTER & MULTI-CHARACTER
  // ==========================================
  setupRoster() {
    const rosterSelect = document.getElementById('char-roster-select');
    this.updateRosterDropdown();

    rosterSelect.addEventListener('change', (e) => {
      storageManager.setActiveCharacter(e.target.value);
      this.char = storageManager.getActiveCharacter();
      this.renderAll();
      this.showToast(`Switched to ${this.char.name}`);
    });

    // New freeform character
    document.getElementById('btn-new-freeform').addEventListener('click', () => {
      const name = prompt('Enter superhero name for freeform creation:', 'New Champion');
      if (name) {
        const newChar = storageManager.createFreeformCharacter(name.trim(), 10, 150);
        this.char = newChar;
        this.updateRosterDropdown();
        this.renderAll();
        this.showToast(`Created new freeform hero: ${name}`);
      }
    });

    // Export to JSON
    document.getElementById('btn-export-char').addEventListener('click', () => {
      storageManager.exportCharacterToJSON(this.char);
      this.showToast(`Exported ${this.char.name} as JSON.`);
    });

    // Import from JSON
    const fileInput = document.getElementById('import-file-input');
    document.getElementById('btn-import-char').addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const imported = storageManager.importCharacterFromJSON(event.target.result);
        if (imported) {
          this.char = imported;
          this.updateRosterDropdown();
          this.renderAll();
          this.showToast(`Imported ${imported.name} successfully!`);
        }
      };
      reader.readAsText(file);
      fileInput.value = '';
    });
  }

  updateRosterDropdown() {
    const rosterSelect = document.getElementById('char-roster-select');
    rosterSelect.innerHTML = '';
    storageManager.characters.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.name} (PL ${c.powerLevel})`;
      if (c.id === this.char.id) opt.selected = true;
      rosterSelect.appendChild(opt);
    });
  }

  // ==========================================
  // SIDEBAR CONTROLS & ROLL20 LOG
  // ==========================================
  setupSidebarControls() {
    // Hero Points Spend Modal Open
    document.getElementById('btn-open-hp-modal').addEventListener('click', () => {
      this.openModal('modal-hero-point');
    });

    // Bruise counter controls
    document.getElementById('btn-bruise-plus').addEventListener('click', () => {
      this.char.bruises = (this.char.bruises || 0) + 1;
      this.saveAndAudit();
      this.renderSidebarHUD();
    });

    document.getElementById('btn-bruise-minus').addEventListener('click', () => {
      if ((this.char.bruises || 0) > 0) {
        this.char.bruises--;
        this.saveAndAudit();
        this.renderSidebarHUD();
      }
    });

    document.getElementById('btn-reset-damage').addEventListener('click', () => {
      this.char.bruises = 0;
      this.char.conditions = { dazed: false, staggered: false, defenseless: false, vulnerable: false };
      this.saveAndAudit();
      this.renderSidebarHUD();
      this.showToast('Conditions and bruises cleared!');
    });

    // Condition pills
    ['dazed', 'staggered', 'defenseless', 'vulnerable'].forEach(cond => {
      const el = document.getElementById(`cond-${cond}`);
      if (el) {
        el.addEventListener('click', () => {
          if (!this.char.conditions) this.char.conditions = {};
          this.char.conditions[cond] = !this.char.conditions[cond];
          this.saveAndAudit();
          this.renderSidebarHUD();
        });
      }
    });

    // Quick d20 roll
    document.getElementById('btn-quick-roll').addEventListener('click', () => {
      const mod = parseInt(document.getElementById('quick-roll-mod').value, 10) || 0;
      const dcVal = document.getElementById('quick-roll-dc').value;
      const targetDC = dcVal !== '' ? parseInt(dcVal, 10) : null;

      const roll = diceRoller.rollCheck({
        title: 'Quick d20 Check',
        characterName: this.char.name,
        modifier: mod,
        targetDC,
        rollType: 'general'
      });

      discordIntegrator.sendRollEmbed(roll);
    });

    // Clear roll log
    document.getElementById('btn-clear-log').addEventListener('click', () => {
      diceRoller.history = [];
      document.getElementById('dice-log-container').innerHTML = '';
      this.showToast('Dice log cleared.');
    });

    // Initiative Roll Button
    document.getElementById('btn-roll-initiative').addEventListener('click', () => {
      const agi = parseInt(this.char.abilities?.agi, 10) || 0;
      let impInitRanks = 0;
      (this.char.advantages || []).forEach(adv => {
        if (adv.id === 'improved_initiative') impInitRanks += parseInt(adv.rank, 10) || 1;
      });
      const totalMod = agi + (impInitRanks * 4);

      const roll = diceRoller.rollCheck({
        title: 'Initiative Check',
        characterName: this.char.name,
        modifier: totalMod,
        rollType: 'initiative',
        extraText: `Base AGI (${agi}) + Improved Initiative (+${impInitRanks * 4})`
      });

      discordIntegrator.sendRollEmbed(roll);
    });
  }

  setupDiceLog() {
    diceRoller.onRoll((roll) => {
      this.renderDiceLogEntry(roll);
    });
  }

  renderDiceLogEntry(roll) {
    const container = document.getElementById('dice-log-container');
    const entry = document.createElement('div');
    entry.className = `dice-log-entry ${roll.outcomeClass} ${roll.isCriticalHit ? 'critical' : ''} ${roll.isHeroPointReroll ? 'hero-point' : ''}`;

    let mathText = `d20 (${roll.rawDie})`;
    if (roll.heroPointAdjusted) {
      mathText = `d20 (${roll.rawDie} ➜ <b>${roll.effectiveDie}</b> HP +10)`;
    }
    const modText = roll.modifier >= 0 ? `+ ${roll.modifier}` : `- ${Math.abs(roll.modifier)}`;

    let outcomeHtml = '';
    if (roll.outcome) {
      outcomeHtml = `<div class="log-outcome ${roll.outcomeClass}">
        ${roll.outcomeClass === 'success' ? '✅' : '❌'} ${roll.outcome}: ${roll.outcomeDescription}
      </div>`;
    }

    if (roll.isCriticalHit) {
      outcomeHtml += `<div style="color: var(--hero-gold); font-weight: 800; font-size: 0.75rem; margin-top: 2px;">💥 CRITICAL HIT!</div>`;
    }

    entry.innerHTML = `
      <div class="log-entry-header">
        <span class="log-entry-title">${roll.title}</span>
        <span class="log-entry-time">${roll.timestamp}</span>
      </div>
      <div class="log-entry-roll">
        <span class="log-total">${roll.total}</span>
        <span class="log-breakdown">(${mathText} ${modText}${roll.targetDC ? ` vs DC ${roll.targetDC}` : ''})</span>
      </div>
      ${outcomeHtml}
      ${discordIntegrator.enabled ? `<div class="discord-echo-badge">🤖 Discord Echoed</div>` : ''}
    `;

    container.insertBefore(entry, container.firstChild);
  }

  // ==========================================
  // MODALS MANAGEMENT
  // ==========================================
  setupModals() {
    // Hero Point Spending Modal
    document.getElementById('btn-close-hp-modal').addEventListener('click', () => {
      this.closeModal('modal-hero-point');
    });

    // Spend Hero Point options:
    document.getElementById('btn-hp-exec-reroll').addEventListener('click', () => {
      if ((this.char.heroPoints || 0) <= 0) {
        alert('You have no Hero Points remaining!');
        return;
      }
      this.char.heroPoints--;
      const target = document.getElementById('hp-reroll-target').value;
      let mod = 0;
      let title = 'Hero Point Reroll';
      let dc = null;

      if (target === 'toughness') {
        const audit = auditCharacter(this.char);
        const bruises = this.char.bruises || 0;
        mod = audit.computedDefenses.toughness - bruises;
        title = `Hero Point Reroll: Toughness Check`;
      } else if (['dodge', 'parry', 'fortitude', 'will'].includes(target)) {
        const audit = auditCharacter(this.char);
        mod = audit.computedDefenses[target] || 0;
        title = `Hero Point Reroll: ${target.toUpperCase()} Check`;
      } else {
        // default attack
        const fgt = parseInt(this.char.abilities?.fgt, 10) || 0;
        mod = fgt;
        title = `Hero Point Reroll: Attack Check`;
      }

      const roll = diceRoller.rollCheck({
        title,
        characterName: this.char.name,
        modifier: mod,
        targetDC: dc,
        isHeroPointReroll: true,
        rollType: target
      });

      discordIntegrator.sendHeroPointSpend(this.char.name, 'Reroll Check (1-10 + 10 Rule)', `Rerolled ${title} for a total of **${roll.total}**!`);
      discordIntegrator.sendRollEmbed(roll);

      this.saveAndAudit();
      this.renderSidebarHUD();
      this.closeModal('modal-hero-point');
      this.showToast('Hero Point spent on Reroll!');
    });

    const spendActions = [
      { id: 'btn-hp-extra-effort', name: 'Extra Effort', desc: 'Gained extra action / +2 bonus / power stunt without immediate fatigue.' },
      { id: 'btn-hp-edit-scene', name: 'Edit Scene', desc: 'Introduced a plausible advantageous element or clue into the scene.' },
      { id: 'btn-hp-instant-counter', name: 'Instant Counter', desc: 'Countered an incoming power attack immediately without readying an action.' },
      { id: 'btn-hp-inspiration', name: 'Inspiration', desc: 'Received a crucial epiphany and guidance from the Gamemaster.' },
      { id: 'btn-hp-recovery', name: 'Recovery / Escape Death', desc: 'Recovered immediately from worst condition or stabilized from dying!' }
    ];

    spendActions.forEach(action => {
      document.getElementById(action.id)?.addEventListener('click', () => {
        if ((this.char.heroPoints || 0) <= 0) {
          alert('You have no Hero Points remaining!');
          return;
        }
        this.char.heroPoints--;
        if (action.id === 'btn-hp-recovery') {
          // auto remove worst condition
          if (this.char.conditions?.staggered) this.char.conditions.staggered = false;
          else if (this.char.conditions?.dazed) this.char.conditions.dazed = false;
          else if ((this.char.bruises || 0) > 0) this.char.bruises--;
        }

        discordIntegrator.sendHeroPointSpend(this.char.name, action.name, action.desc);
        diceRoller.notify({
          title: `⚡ HERO POINT: ${action.name}`,
          characterName: this.char.name,
          timestamp: new Date().toLocaleTimeString(),
          total: 'HP Spent',
          rawDie: '-',
          modifier: 0,
          outcome: action.name,
          outcomeClass: 'hero-point',
          outcomeDescription: action.desc,
          isHeroPointReroll: true
        });

        this.saveAndAudit();
        this.renderSidebarHUD();
        this.closeModal('modal-hero-point');
        this.showToast(`Hero Point spent on ${action.name}!`);
      });
    });

    // Archetype Generator Modal
    document.getElementById('btn-open-archetypes').addEventListener('click', () => {
      this.renderArchetypesPicker();
      this.openModal('modal-archetypes');
    });

    document.getElementById('btn-close-archetypes-modal').addEventListener('click', () => {
      this.closeModal('modal-archetypes');
    });

    // Power Builder Modal
    document.getElementById('btn-open-power-builder').addEventListener('click', () => {
      this.openPowerBuilderModal(null);
    });

    document.getElementById('btn-close-power-builder').addEventListener('click', () => {
      this.closeModal('modal-power-builder');
    });

    document.getElementById('btn-cancel-power-builder').addEventListener('click', () => {
      this.closeModal('modal-power-builder');
    });

    this.setupPowerBuilderEvents();
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  // ==========================================
  // ARCHETYPE PICKER
  // ==========================================
  renderArchetypesPicker() {
    const container = document.getElementById('archetypes-picker-container');
    container.innerHTML = '';

    ARCHETYPES.forEach(arch => {
      const card = document.createElement('div');
      card.className = 'archetype-card';
      card.innerHTML = `
        <div>
          <div class="archetype-card-name">${arch.name}</div>
          <div class="archetype-card-tagline">${arch.tagline}</div>
          <div class="archetype-card-concept">${arch.concept}</div>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 0.25rem;">
            <strong>Key Powers:</strong> ${(arch.powers || []).map(p => p.name).slice(0, 3).join(', ')}
          </div>
        </div>
        <div style="margin-top: 0.75rem; display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" style="font-size: var(--font-size-xs);" data-arch-id="${arch.id}">
            Select & Build
          </button>
        </div>
      `;

      card.querySelector('button').addEventListener('click', () => {
        const customName = prompt(`Enter superhero name for ${arch.name}:`, arch.name);
        if (customName !== null) {
          const newHero = storageManager.createFromArchetype(arch.id, customName.trim() || arch.name);
          this.char = newHero;
          this.updateRosterDropdown();
          this.renderAll();
          this.closeModal('modal-archetypes');
          this.showToast(`Loaded ${newHero.name} (${arch.name} Archetype)!`);
        }
      });

      container.appendChild(card);
    });
  }

  // ==========================================
  // HERO LAB POWER BUILDER
  // ==========================================
  setupPowerBuilderEvents() {
    const baseEffectSelect = document.getElementById('builder-base-effect');
    baseEffectSelect.innerHTML = '';
    POWER_EFFECTS_CATALOG.forEach(effect => {
      const opt = document.createElement('option');
      opt.value = effect.id;
      opt.textContent = `${effect.name} (${effect.baseCost} PP/rank) [${effect.range}, ${effect.duration}]`;
      baseEffectSelect.appendChild(opt);
    });

    baseEffectSelect.addEventListener('change', () => {
      const effect = POWER_EFFECTS_CATALOG.find(e => e.id === baseEffectSelect.value);
      if (effect) {
        document.getElementById('builder-action').value = effect.action || 'Standard';
        document.getElementById('builder-range').value = effect.range || 'Close';
        document.getElementById('builder-duration').value = effect.duration || 'Instant';
      }
      this.recalculateBuilderPreview();
    });

    document.getElementById('builder-power-rank').addEventListener('input', () => {
      this.recalculateBuilderPreview();
    });

    // Add extra button
    document.getElementById('btn-builder-add-extra').addEventListener('click', () => {
      this.addExtraRow();
      this.recalculateBuilderPreview();
    });

    // Add flaw button
    document.getElementById('btn-builder-add-flaw').addEventListener('click', () => {
      this.addFlawRow();
      this.recalculateBuilderPreview();
    });

    // Add alternate effect
    document.getElementById('btn-builder-add-ae').addEventListener('click', () => {
      this.addAlternateEffectRow();
      this.recalculateBuilderPreview();
    });

    // Save power
    document.getElementById('btn-save-power-builder').addEventListener('click', () => {
      this.savePowerFromBuilder();
    });
  }

  openPowerBuilderModal(powerToEdit = null) {
    this.activePowerEditing = powerToEdit ? JSON.parse(JSON.stringify(powerToEdit)) : null;
    const isEdit = !!powerToEdit;

    document.getElementById('builder-modal-title').textContent = isEdit
      ? `⚡ Edit Power: ${powerToEdit.name}`
      : '⚡ Build New Power (Hero Lab Model)';

    if (isEdit) {
      document.getElementById('builder-power-name').value = powerToEdit.name || '';
      document.getElementById('builder-power-descriptor').value = powerToEdit.descriptor || '';
      document.getElementById('builder-power-rank').value = powerToEdit.rank || 1;
      document.getElementById('builder-base-effect').value = powerToEdit.effect?.id || 'damage';
      document.getElementById('builder-action').value = powerToEdit.action || 'Standard';
      document.getElementById('builder-range').value = powerToEdit.range || 'Close';
      document.getElementById('builder-duration').value = powerToEdit.duration || 'Instant';
      document.getElementById('builder-power-notes').value = powerToEdit.notes || '';
    } else {
      document.getElementById('builder-power-name').value = '';
      document.getElementById('builder-power-descriptor').value = 'Energy, Technology';
      document.getElementById('builder-power-rank').value = 10;
      document.getElementById('builder-base-effect').value = 'damage';
      document.getElementById('builder-action').value = 'Standard';
      document.getElementById('builder-range').value = 'Close';
      document.getElementById('builder-duration').value = 'Instant';
      document.getElementById('builder-power-notes').value = '';
    }

    // Populate extras
    const extrasList = document.getElementById('builder-extras-list');
    extrasList.innerHTML = '';
    (isEdit ? powerToEdit.extras || [] : []).forEach(ex => this.addExtraRow(ex));

    // Populate flaws
    const flawsList = document.getElementById('builder-flaws-list');
    flawsList.innerHTML = '';
    (isEdit ? powerToEdit.flaws || [] : []).forEach(fl => this.addFlawRow(fl));

    // Populate AEs
    const aeList = document.getElementById('builder-ae-list');
    aeList.innerHTML = '';
    (isEdit ? powerToEdit.alternateEffects || [] : []).forEach(ae => this.addAlternateEffectRow(ae));

    this.recalculateBuilderPreview();
    this.openModal('modal-power-builder');
  }

  addExtraRow(savedExtra = null) {
    const container = document.getElementById('builder-extras-list');
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.35rem; align-items: center;';

    const select = document.createElement('select');
    select.style.flex = '1';
    EXTRAS_CATALOG.forEach(ex => {
      const opt = document.createElement('option');
      opt.value = ex.id;
      opt.textContent = `${ex.name} (${ex.isFlat ? `+${ex.cost} flat` : `+${ex.cost}/rank`})`;
      if (savedExtra && savedExtra.id === ex.id) opt.selected = true;
      select.appendChild(opt);
    });

    const rankInput = document.createElement('input');
    rankInput.type = 'number';
    rankInput.min = '1';
    rankInput.value = savedExtra ? (savedExtra.rank || 1) : 1;
    rankInput.style.width = '60px';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline';
    delBtn.style.padding = '0.2rem 0.4rem';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => {
      row.remove();
      this.recalculateBuilderPreview();
    });

    select.addEventListener('change', () => this.recalculateBuilderPreview());
    rankInput.addEventListener('input', () => this.recalculateBuilderPreview());

    row.appendChild(select);
    row.appendChild(rankInput);
    row.appendChild(delBtn);
    container.appendChild(row);
  }

  addFlawRow(savedFlaw = null) {
    const container = document.getElementById('builder-flaws-list');
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.35rem; align-items: center;';

    const select = document.createElement('select');
    select.style.flex = '1';
    FLAWS_CATALOG.forEach(fl => {
      const opt = document.createElement('option');
      opt.value = fl.id;
      opt.textContent = `${fl.name} (${fl.isDevice ? `Device -${fl.discountPer5} per 5` : fl.isFlat ? `-${fl.cost} flat` : `-${fl.cost}/rank`})`;
      if (savedFlaw && savedFlaw.id === fl.id) opt.selected = true;
      select.appendChild(opt);
    });

    const rankInput = document.createElement('input');
    rankInput.type = 'number';
    rankInput.min = '1';
    rankInput.value = savedFlaw ? (savedFlaw.rank || 1) : 1;
    rankInput.style.width = '60px';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline';
    delBtn.style.padding = '0.2rem 0.4rem';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => {
      row.remove();
      this.recalculateBuilderPreview();
    });

    select.addEventListener('change', () => this.recalculateBuilderPreview());
    rankInput.addEventListener('input', () => this.recalculateBuilderPreview());

    row.appendChild(select);
    row.appendChild(rankInput);
    row.appendChild(delBtn);
    container.appendChild(row);
  }

  addAlternateEffectRow(savedAe = null) {
    const container = document.getElementById('builder-ae-list');
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.35rem; align-items: center; margin-bottom: 0.25rem;';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Alt Effect Name (e.g. Cone Blast)';
    nameInput.value = savedAe ? savedAe.name : 'Alternate Attack Form';
    nameInput.style.flex = '2';

    const rankInput = document.createElement('input');
    rankInput.type = 'number';
    rankInput.placeholder = 'Rank';
    rankInput.value = savedAe ? (savedAe.rank || 10) : 10;
    rankInput.style.width = '70px';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline';
    delBtn.style.padding = '0.2rem 0.4rem';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => {
      row.remove();
      this.recalculateBuilderPreview();
    });

    row.appendChild(nameInput);
    row.appendChild(rankInput);
    row.appendChild(delBtn);
    container.appendChild(row);
  }

  collectPowerFromForm() {
    const effectId = document.getElementById('builder-base-effect').value;
    const effect = POWER_EFFECTS_CATALOG.find(e => e.id === effectId) || { id: effectId, baseCost: 1 };
    const rank = parseInt(document.getElementById('builder-power-rank').value, 10) || 1;

    const extras = [];
    document.querySelectorAll('#builder-extras-list > div').forEach(row => {
      const select = row.querySelector('select');
      const rankInput = row.querySelector('input');
      if (select) {
        const extraDef = EXTRAS_CATALOG.find(e => e.id === select.value);
        extras.push({
          id: select.value,
          name: extraDef?.name || select.value,
          rank: parseInt(rankInput.value, 10) || 1,
          cost: extraDef?.cost || 1,
          isFlat: extraDef?.isFlat || false
        });
      }
    });

    const flaws = [];
    document.querySelectorAll('#builder-flaws-list > div').forEach(row => {
      const select = row.querySelector('select');
      const rankInput = row.querySelector('input');
      if (select) {
        const flawDef = FLAWS_CATALOG.find(f => f.id === select.value);
        flaws.push({
          id: select.value,
          name: flawDef?.name || select.value,
          rank: parseInt(rankInput.value, 10) || 1,
          cost: flawDef?.cost || 1,
          isFlat: flawDef?.isFlat || false,
          isDevice: flawDef?.isDevice || false
        });
      }
    });

    const alternateEffects = [];
    document.querySelectorAll('#builder-ae-list > div').forEach(row => {
      const inputs = row.querySelectorAll('input');
      if (inputs.length >= 2) {
        alternateEffects.push({
          id: 'ae_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          name: inputs[0].value,
          rank: parseInt(inputs[1].value, 10) || 1,
          isDynamic: false
        });
      }
    });

    return {
      id: this.activePowerEditing ? this.activePowerEditing.id : ('p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)),
      name: document.getElementById('builder-power-name').value.trim() || `${effect.name} Power`,
      descriptor: document.getElementById('builder-power-descriptor').value.trim() || 'Energy',
      rank,
      effect,
      action: document.getElementById('builder-action').value,
      range: document.getElementById('builder-range').value,
      duration: document.getElementById('builder-duration').value,
      extras,
      flaws,
      alternateEffects,
      notes: document.getElementById('builder-power-notes').value.trim()
    };
  }

  recalculateBuilderPreview() {
    const power = this.collectPowerFromForm();
    const totalCost = calculatePowerCost(power);

    // Compute breakdown explanation
    const base = power.effect?.baseCost || 1;
    let extraRanks = 0;
    (power.extras || []).forEach(e => { if (!e.isFlat) extraRanks += (e.rank || 1) * e.cost; });
    let flawRanks = 0;
    (power.flaws || []).forEach(f => { if (!f.isFlat && !f.isDevice) flawRanks += (f.rank || 1) * f.cost; });

    const net = base + extraRanks - flawRanks;
    let formulaText = '';
    if (net >= 1) {
      formulaText = `Cost: (${base} base + ${extraRanks} extras - ${flawRanks} flaws) = ${net} PP/rank × ${power.rank} ranks`;
    } else {
      const divisor = 2 - net;
      formulaText = `Fractional: net rank cost ≤ 0 ➜ 1 PP per ${divisor} ranks (${Math.ceil(power.rank / divisor)} PP)`;
    }

    if (power.alternateEffects && power.alternateEffects.length > 0) {
      formulaText += ` + ${power.alternateEffects.length} AE (${power.alternateEffects.length} PP)`;
    }

    document.getElementById('builder-formula-display').textContent = formulaText;
    document.getElementById('builder-total-pp-display').textContent = `${totalCost} PP`;
  }

  savePowerFromBuilder() {
    const power = this.collectPowerFromForm();
    if (!this.char.powers) this.char.powers = [];

    const existingIdx = this.char.powers.findIndex(p => p.id === power.id);
    if (existingIdx !== -1) {
      this.char.powers[existingIdx] = power;
      this.showToast(`Updated power: ${power.name}`);
    } else {
      this.char.powers.push(power);
      this.showToast(`Added power: ${power.name}`);
    }

    this.saveAndAudit();
    this.renderAll();
    this.closeModal('modal-power-builder');
  }

  // ==========================================
  // SETTINGS & DISCORD CONFIGURATION
  // ==========================================
  setupSettingsTab() {
    document.getElementById('discord-webhook-url').value = discordIntegrator.webhookUrl;
    document.getElementById('discord-enabled-toggle').checked = discordIntegrator.enabled;
    document.getElementById('discord-bot-name').value = discordIntegrator.botName;
    document.getElementById('discord-bot-avatar').value = discordIntegrator.avatarUrl;

    document.getElementById('btn-save-discord').addEventListener('click', () => {
      discordIntegrator.saveSettings({
        webhookUrl: document.getElementById('discord-webhook-url').value,
        enabled: document.getElementById('discord-enabled-toggle').checked,
        botName: document.getElementById('discord-bot-name').value,
        avatarUrl: document.getElementById('discord-bot-avatar').value
      });
      this.showToast('Discord settings saved!');
    });

    document.getElementById('btn-test-discord').addEventListener('click', async () => {
      discordIntegrator.saveSettings({
        webhookUrl: document.getElementById('discord-webhook-url').value,
        enabled: true,
        botName: document.getElementById('discord-bot-name').value,
        avatarUrl: document.getElementById('discord-bot-avatar').value
      });
      document.getElementById('discord-enabled-toggle').checked = true;

      try {
        await discordIntegrator.testConnection();
        this.showToast('Discord test notification sent successfully!');
      } catch (err) {
        alert('Discord Webhook test failed: ' + err.message);
      }
    });

    // Campaign PL settings
    document.getElementById('settings-pl-input').value = this.char.powerLevel || 10;
    document.getElementById('settings-budget-input').value = this.char.powerPointsBudget || 150;

    document.getElementById('btn-save-pl-settings').addEventListener('click', () => {
      const pl = parseInt(document.getElementById('settings-pl-input').value, 10) || 10;
      const budget = parseInt(document.getElementById('settings-budget-input').value, 10) || (pl * 15);
      this.char.powerLevel = pl;
      this.char.powerPointsBudget = budget;
      this.saveAndAudit();
      this.renderAll();
      this.showToast(`Updated campaign settings: PL ${pl} (${budget} PP)`);
    });
  }

  // ==========================================
  // MASTER RENDER & AUDIT
  // ==========================================
  saveAndAudit() {
    storageManager.saveCharacter(this.char);
    return auditCharacter(this.char);
  }

  renderAll() {
    const audit = this.saveAndAudit();

    // 1. Top Bar status
    document.getElementById('header-pl-display').textContent = `PL ${audit.powerLevel}`;
    document.getElementById('header-pp-display').textContent = `${audit.totalSpent} / ${audit.budget} PP`;
    const complianceDisplay = document.getElementById('header-compliance-display');
    if (audit.isCompliant) {
      complianceDisplay.textContent = 'Legal';
      complianceDisplay.className = 'status-value green';
    } else {
      complianceDisplay.textContent = `${audit.violations.length} Over Cap`;
      complianceDisplay.className = 'status-value red';
    }

    // 2. Sidebar HUD
    this.renderSidebarHUD();

    // 3. Tab 1: Character Record (Roll20 Sheet)
    this.renderRecordTab(audit);

    // 4. Tab 2: Abilities & Defenses
    this.renderAbilitiesTab(audit);

    // 5. Tab 3: Skills
    this.renderSkillsTab(audit);

    // 6. Tab 4: Advantages
    this.renderAdvantagesTab(audit);

    // 7. Tab 5: Powers Builder
    this.renderPowersTab(audit);

    // 8. Tab 6: Gear
    this.renderGearTab(audit);

    // 9. Tab 7: Identity & Complications
    this.renderIdentityTab(audit);
  }

  renderSidebarHUD() {
    document.getElementById('sidebar-hp-number').textContent = this.char.heroPoints ?? 1;
    document.getElementById('bruise-count-display').textContent = this.char.bruises || 0;

    const conds = this.char.conditions || {};
    ['dazed', 'staggered', 'defenseless', 'vulnerable'].forEach(c => {
      const el = document.getElementById(`cond-${c}`);
      if (el) el.classList.toggle('active', !!conds[c]);
    });
  }

  // ==========================================
  // RENDER TAB 1: CHARACTER RECORD (ROLL20)
  // ==========================================
  renderRecordTab(audit) {
    const nameInput = document.getElementById('record-hero-name');
    nameInput.value = this.char.name || '';
    nameInput.oninput = (e) => {
      this.char.name = e.target.value;
      storageManager.saveCharacter(this.char);
      this.updateRosterDropdown();
    };

    const taglineInput = document.getElementById('record-hero-tagline');
    taglineInput.value = this.char.concept || this.char.tagline || '';
    taglineInput.oninput = (e) => {
      this.char.concept = e.target.value;
      storageManager.saveCharacter(this.char);
    };

    const identityInput = document.getElementById('record-hero-identity');
    identityInput.value = this.char.identity || '';
    identityInput.oninput = (e) => {
      this.char.identity = e.target.value;
      storageManager.saveCharacter(this.char);
    };

    // Defenses with roll buttons
    const defGrid = document.getElementById('record-defenses-grid');
    defGrid.innerHTML = '';
    const bruises = this.char.bruises || 0;

    DEFENSES.forEach(def => {
      const box = document.createElement('div');
      box.className = 'defense-box';
      let score = audit.computedDefenses[def.id] || 0;
      let effectiveScore = score;
      let subtitle = '';

      if (def.id === 'toughness') {
        effectiveScore = score - bruises;
        if (bruises > 0) subtitle = `(${effectiveScore} bruised)`;
      }

      box.innerHTML = `
        <div class="defense-name">${def.name}</div>
        <div class="defense-score">${effectiveScore}</div>
        ${subtitle ? `<div style="font-size: 0.7rem; color: var(--hero-red);">${subtitle}</div>` : ''}
        <button class="btn-roll btn-roll-defense" data-defense="${def.id}">🎲 Roll</button>
      `;

      box.querySelector('button').addEventListener('click', () => {
        const dcInput = prompt(`Enter DC for ${def.name} check (or leave blank for raw roll):`, def.id === 'toughness' ? '20' : '15');
        const targetDC = dcInput !== null && dcInput.trim() !== '' ? parseInt(dcInput, 10) : null;

        const roll = diceRoller.rollCheck({
          title: `${def.name} Defense Save`,
          characterName: this.char.name,
          modifier: effectiveScore,
          targetDC,
          rollType: def.id === 'toughness' ? 'toughness' : 'defense',
          extraText: def.id === 'toughness' && bruises > 0 ? `Bruise Penalty: -${bruises}` : ''
        });

        // If Toughness check failed, offer to automatically tick bruise
        if (def.id === 'toughness' && roll.outcomeClass === 'failure') {
          this.char.bruises = (this.char.bruises || 0) + 1;
          if (roll.degrees >= 2) this.char.conditions.dazed = true;
          if (roll.degrees >= 3) this.char.conditions.staggered = true;
          this.saveAndAudit();
          this.renderSidebarHUD();
        }

        discordIntegrator.sendRollEmbed(roll);
      });

      defGrid.appendChild(box);
    });

    // Attacks & Actions Table
    const attacksTbody = document.getElementById('record-attacks-tbody');
    attacksTbody.innerHTML = '';

    // Unarmed Attack
    const str = parseInt(this.char.abilities?.str, 10) || 0;
    const fgt = parseInt(this.char.abilities?.fgt, 10) || 0;
    let unarmedBonus = fgt;
    (this.char.skills || []).forEach(sk => {
      if (sk.id === 'close_combat' && (sk.specialty || '').toLowerCase().includes('unarmed')) {
        unarmedBonus += parseInt(sk.ranks, 10) || 0;
      }
    });
    let closeAdvBonus = 0;
    (this.char.advantages || []).forEach(adv => {
      if (adv.id === 'close_attack') closeAdvBonus += parseInt(adv.rank, 10) || 1;
    });
    unarmedBonus += closeAdvBonus;

    const unarmedRow = document.createElement('tr');
    unarmedRow.innerHTML = `
      <td><strong>👊 Unarmed Strike</strong></td>
      <td>Close • Bludgeoning</td>
      <td><span style="font-weight: 800; color: var(--hero-blue);">+${unarmedBonus}</span></td>
      <td>Damage ${str} (DC ${15 + str} Toughness)</td>
      <td style="text-align: right;">
        <button class="btn-roll btn-roll-attack" id="btn-roll-unarmed">🎲 Attack</button>
      </td>
    `;
    unarmedRow.querySelector('button').addEventListener('click', () => {
      const defTarget = prompt('Enter Target Parry Defense (or leave blank for raw attack roll):', '15');
      const targetDC = defTarget !== null && defTarget.trim() !== '' ? parseInt(defTarget, 10) : null;

      const roll = diceRoller.rollCheck({
        title: 'Attack: Unarmed Strike',
        characterName: this.char.name,
        modifier: unarmedBonus,
        targetDC,
        rollType: 'attack',
        damageRank: str,
        descriptor: 'Close, Bludgeoning'
      });
      discordIntegrator.sendRollEmbed(roll);
    });
    attacksTbody.appendChild(unarmedRow);

    // Attacks from Powers
    (this.char.powers || []).forEach(power => {
      if (power.effect?.isAttack || ['damage', 'blast', 'affliction', 'move_object', 'weaken', 'nullify'].includes(power.effect?.id)) {
        let attackMod = 0;
        const isRanged = power.range === 'Ranged' || power.effect?.id === 'blast';
        if (isRanged) {
          const dex = parseInt(this.char.abilities?.dex, 10) || 0;
          let rangedAdv = 0;
          (this.char.advantages || []).forEach(a => { if (a.id === 'ranged_attack') rangedAdv += parseInt(a.rank, 10) || 1; });
          attackMod = dex + rangedAdv;
          (this.char.skills || []).forEach(sk => {
            if (sk.id === 'ranged_combat' && (power.name.toLowerCase().includes((sk.specialty || '').toLowerCase()) || (sk.specialty || '').toLowerCase().includes(power.effect.id))) {
              attackMod += parseInt(sk.ranks, 10) || 0;
            }
          });
        } else {
          attackMod = fgt + closeAdvBonus;
          (this.char.skills || []).forEach(sk => {
            if (sk.id === 'close_combat' && power.name.toLowerCase().includes((sk.specialty || '').toLowerCase())) {
              attackMod += parseInt(sk.ranks, 10) || 0;
            }
          });
        }

        // Check for Accurate extra
        (power.extras || []).forEach(ex => {
          if (ex.id === 'accurate') attackMod += (parseInt(ex.rank, 10) || 1) * 2;
        });

        const rank = parseInt(power.rank, 10) || 1;
        const dc = (power.effect?.dcBase || 15) + rank;
        const resist = power.effect?.resist || 'Toughness';

        const row = document.createElement('tr');
        row.innerHTML = `
          <td><strong>⚡ ${power.name}</strong></td>
          <td>${power.range} • ${power.descriptor || 'Power'}</td>
          <td><span style="font-weight: 800; color: var(--hero-blue);">+${attackMod}</span></td>
          <td>Rank ${rank} (DC ${dc} ${resist})</td>
          <td style="text-align: right;">
            <button class="btn-roll btn-roll-attack">🎲 Attack</button>
          </td>
        `;

        row.querySelector('button').addEventListener('click', () => {
          const defTarget = prompt(`Enter Target Defense for ${power.name} (or leave blank):`, isRanged ? '15 (Dodge)' : '15 (Parry)');
          const targetDC = defTarget !== null && defTarget.trim() !== '' ? parseInt(defTarget, 10) : null;

          const roll = diceRoller.rollCheck({
            title: `Attack: ${power.name}`,
            characterName: this.char.name,
            modifier: attackMod,
            targetDC,
            rollType: 'attack',
            damageRank: rank,
            descriptor: power.descriptor || 'Power'
          });
          discordIntegrator.sendRollEmbed(roll);
        });

        attacksTbody.appendChild(row);

        // Also add Alternate Effects if any
        (power.alternateEffects || []).forEach(ae => {
          const aeRow = document.createElement('tr');
          aeRow.style.backgroundColor = 'rgba(6, 182, 212, 0.04)';
          aeRow.innerHTML = `
            <td style="padding-left: 1.5rem;">↳ <em>${ae.name}</em></td>
            <td>Alternate Effect</td>
            <td><span style="font-weight: 800; color: var(--hero-blue);">+${attackMod}</span></td>
            <td>Rank ${ae.rank || rank} (DC ${(ae.effect?.dcBase || 15) + (ae.rank || rank)})</td>
            <td style="text-align: right;">
              <button class="btn-roll btn-roll-attack" style="font-size: 0.7rem;">🎲 Roll</button>
            </td>
          `;
          aeRow.querySelector('button').addEventListener('click', () => {
            const defTarget = prompt(`Enter Target Defense for ${ae.name}:`, '15');
            const targetDC = defTarget !== null && defTarget.trim() !== '' ? parseInt(defTarget, 10) : null;
            const roll = diceRoller.rollCheck({
              title: `Attack: ${ae.name}`,
              characterName: this.char.name,
              modifier: attackMod,
              targetDC,
              rollType: 'attack',
              damageRank: ae.rank || rank,
              descriptor: power.descriptor || 'Power'
            });
            discordIntegrator.sendRollEmbed(roll);
          });
          attacksTbody.appendChild(aeRow);
        });
      }
    });

    // Quick Skills Checks
    const skillsTbody = document.getElementById('record-skills-tbody');
    skillsTbody.innerHTML = '';
    audit.computedSkills.forEach(sk => {
      if (sk.ranks > 0) {
        const row = document.createElement('tr');
        const sign = sk.totalBonus >= 0 ? '+' : '';
        row.innerHTML = `
          <td><strong>${sk.name}${sk.specialty ? ` (${sk.specialty})` : ''}</strong></td>
          <td><span style="font-weight: 800; color: var(--hero-cyan);">${sign}${sk.totalBonus}</span></td>
          <td style="text-align: right;">
            <button class="btn-roll" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">🎲 Check</button>
          </td>
        `;
        row.querySelector('button').addEventListener('click', () => {
          const dcInput = prompt(`Enter DC for ${sk.name} check (or leave blank for raw check):`, '15');
          const targetDC = dcInput !== null && dcInput.trim() !== '' ? parseInt(dcInput, 10) : null;
          const roll = diceRoller.rollCheck({
            title: `${sk.name} Skill Check`,
            characterName: this.char.name,
            modifier: sk.totalBonus,
            targetDC,
            rollType: 'skill'
          });
          discordIntegrator.sendRollEmbed(roll);
        });
        skillsTbody.appendChild(row);
      }
    });

    // Powers Summary Cards
    const powersSummary = document.getElementById('record-powers-summary');
    powersSummary.innerHTML = '';
    (this.char.powers || []).forEach(p => {
      const cost = calculatePowerCost(p);
      const card = document.createElement('div');
      card.className = `power-card ${p.flaws?.some(f => f.isDevice) ? 'device' : ''}`;
      card.innerHTML = `
        <div class="power-header">
          <div class="power-title">⚡ ${p.name} (Rank ${p.rank})</div>
          <span class="power-cost-tag">${cost} PP</span>
        </div>
        <div class="power-descriptors">${p.descriptor || 'General'} • ${p.action || 'Standard'} • ${p.range || 'Close'} • ${p.duration || 'Instant'}</div>
        <div style="font-size: var(--font-size-xs); color: var(--text-muted);">${p.notes || p.effect?.desc || ''}</div>
      `;
      powersSummary.appendChild(card);
    });
  }

  // ==========================================
  // RENDER TAB 2: ABILITIES & DEFENSES
  // ==========================================
  renderAbilitiesTab(audit) {
    document.getElementById('abilities-total-pp').textContent = `${audit.abilitiesCost} PP`;
    document.getElementById('defenses-total-pp').textContent = `${audit.defensesCost} PP`;

    const abGrid = document.getElementById('abilities-editor-grid');
    abGrid.innerHTML = '';

    ABILITIES.forEach(ab => {
      const currentVal = parseInt(this.char.abilities?.[ab.id], 10) || 0;
      const box = document.createElement('div');
      box.className = 'ability-box';
      box.innerHTML = `
        <div class="ability-name">${ab.name} (${ab.short})</div>
        <div class="ability-score">${currentVal}</div>
        <div class="ability-cost-tag">${currentVal * 2} PP</div>
        <div style="display: flex; gap: 0.35rem; margin-top: 0.5rem; align-items: center;">
          <button class="btn-step" data-ab="${ab.id}" data-dir="-1">-</button>
          <input type="number" value="${currentVal}" min="-5" max="25" style="width: 55px; text-align: center;" data-ab="${ab.id}">
          <button class="btn-step" data-ab="${ab.id}" data-dir="1">+</button>
        </div>
        ${ab.id === 'str' ? `<div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px;">Lift: ${getStrengthLiftingCapacity(currentVal)}</div>` : ''}
      `;

      box.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10);
          this.char.abilities[ab.id] = Math.max(-5, (parseInt(this.char.abilities[ab.id], 10) || 0) + dir);
          this.renderAll();
        });
      });

      box.querySelector('input').addEventListener('change', (e) => {
        this.char.abilities[ab.id] = parseInt(e.target.value, 10) || 0;
        this.renderAll();
      });

      abGrid.appendChild(box);
    });

    // Defenses editor
    const defGrid = document.getElementById('defenses-editor-grid');
    defGrid.innerHTML = '';

    DEFENSES.forEach(def => {
      const baseVal = parseInt(this.char.abilities?.[def.ability], 10) || 0;
      const boughtRanks = parseInt(this.char.defenses?.[def.id], 10) || 0;
      const total = audit.computedDefenses[def.id] || 0;

      const box = document.createElement('div');
      box.className = 'defense-box';
      box.innerHTML = `
        <div class="defense-name">${def.name}</div>
        <div class="defense-score">${total}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted);">Base (${baseVal}) + Bought (${boughtRanks})</div>
        <div style="display: flex; gap: 0.35rem; align-items: center; margin-top: 0.35rem;">
          <button class="btn-step" data-def="${def.id}" data-dir="-1">-</button>
          <input type="number" value="${boughtRanks}" min="0" max="25" style="width: 50px; text-align: center;" data-def="${def.id}">
          <button class="btn-step" data-def="${def.id}" data-dir="1">+</button>
        </div>
      `;

      box.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10);
          if (!this.char.defenses) this.char.defenses = {};
          this.char.defenses[def.id] = Math.max(0, (parseInt(this.char.defenses[def.id], 10) || 0) + dir);
          this.renderAll();
        });
      });

      box.querySelector('input').addEventListener('change', (e) => {
        if (!this.char.defenses) this.char.defenses = {};
        this.char.defenses[def.id] = Math.max(0, parseInt(e.target.value, 10) || 0);
        this.renderAll();
      });

      defGrid.appendChild(box);
    });

    // Caps audit details
    const auditDiv = document.getElementById('caps-audit-details');
    const pl2 = audit.powerLevel * 2;
    const pl10 = audit.powerLevel + 10;

    let auditHtml = `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; font-size: var(--font-size-xs);">
        <div style="background-color: var(--bg-input); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <strong>Dodge + Toughness:</strong> ${audit.computedDefenses.dodge + audit.computedDefenses.toughness} / ${pl2}
        </div>
        <div style="background-color: var(--bg-input); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <strong>Parry + Toughness:</strong> ${audit.computedDefenses.parry + audit.computedDefenses.toughness} / ${pl2}
        </div>
        <div style="background-color: var(--bg-input); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <strong>Fortitude + Will:</strong> ${audit.computedDefenses.fortitude + audit.computedDefenses.will} / ${pl2}
        </div>
      </div>
    `;

    if (audit.violations.length > 0) {
      auditHtml += `<div style="margin-top: 0.75rem; padding: 0.75rem; background-color: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: var(--radius-sm);">
        <div style="font-weight: 800; color: #f87171; margin-bottom: 0.25rem;">⚠️ Power Level Cap Violations:</div>
        <ul style="padding-left: 1.25rem; font-size: var(--font-size-xs); color: #fca5a5;">
          ${audit.violations.map(v => `<li>${v.message}</li>`).join('')}
        </ul>
      </div>`;
    }

    auditDiv.innerHTML = auditHtml;
  }

  // ==========================================
  // RENDER TAB 3: SKILLS
  // ==========================================
  renderSkillsTab(audit) {
    document.getElementById('skills-total-pp').textContent = `${audit.skillsCost} PP`;
    const tbody = document.getElementById('skills-editor-tbody');
    tbody.innerHTML = '';

    SKILLS_LIST.forEach(skillDef => {
      const existing = (this.char.skills || []).find(s => s.id === skillDef.id);
      const ranks = existing ? (parseInt(existing.ranks, 10) || 0) : 0;
      const specialty = existing?.specialty || skillDef.defaultSpecialty || '';
      const baseVal = parseInt(this.char.abilities?.[skillDef.ability], 10) || 0;
      const totalBonus = baseVal + ranks;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <strong>${skillDef.name}</strong>
          ${skillDef.hasSpecialty ? `<input type="text" value="${specialty}" style="margin-left: 0.5rem; width: 140px; font-size: 0.75rem;" placeholder="Specialty">` : ''}
        </td>
        <td>${skillDef.ability.toUpperCase()}</td>
        <td>${baseVal >= 0 ? `+${baseVal}` : baseVal}</td>
        <td>
          <div style="display: flex; gap: 0.35rem; align-items: center;">
            <button class="btn-step" data-dir="-1">-</button>
            <input type="number" value="${ranks}" min="0" max="25" style="width: 50px; text-align: center;">
            <button class="btn-step" data-dir="1">+</button>
          </div>
        </td>
        <td><strong style="color: var(--hero-cyan); font-size: var(--font-size-md);">${totalBonus >= 0 ? `+${totalBonus}` : totalBonus}</strong></td>
        <td style="text-align: right;">
          <button class="btn-roll" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">🎲 Roll</button>
        </td>
      `;

      // Update ranks
      const updateRanks = (newRanks) => {
        if (!this.char.skills) this.char.skills = [];
        let item = this.char.skills.find(s => s.id === skillDef.id);
        if (!item) {
          item = { id: skillDef.id, name: skillDef.name, ranks: 0 };
          this.char.skills.push(item);
        }
        item.ranks = Math.max(0, newRanks);
        this.renderAll();
      };

      row.querySelectorAll('.btn-step').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10);
          updateRanks(ranks + dir);
        });
      });

      row.querySelector('input[type="number"]').addEventListener('change', (e) => {
        updateRanks(parseInt(e.target.value, 10) || 0);
      });

      if (skillDef.hasSpecialty) {
        row.querySelector('input[type="text"]').addEventListener('change', (e) => {
          if (!this.char.skills) this.char.skills = [];
          let item = this.char.skills.find(s => s.id === skillDef.id);
          if (!item) {
            item = { id: skillDef.id, name: skillDef.name, ranks: 0 };
            this.char.skills.push(item);
          }
          item.specialty = e.target.value;
          this.saveAndAudit();
        });
      }

      row.querySelector('.btn-roll').addEventListener('click', () => {
        const dcInput = prompt(`Enter DC for ${skillDef.name} check:`, '15');
        const targetDC = dcInput !== null && dcInput.trim() !== '' ? parseInt(dcInput, 10) : null;
        const roll = diceRoller.rollCheck({
          title: `${skillDef.name} Skill Check`,
          characterName: this.char.name,
          modifier: totalBonus,
          targetDC,
          rollType: 'skill'
        });
        discordIntegrator.sendRollEmbed(roll);
      });

      tbody.appendChild(row);
    });
  }

  // ==========================================
  // RENDER TAB 4: ADVANTAGES
  // ==========================================
  renderAdvantagesTab(audit) {
    document.getElementById('advantages-total-pp').textContent = `${audit.advantagesCost} PP`;
    const container = document.getElementById('advantages-catalog-list');
    container.innerHTML = '';

    const filterText = (document.getElementById('adv-search-input')?.value || '').toLowerCase();
    const filterCat = document.getElementById('adv-category-filter')?.value || 'all';

    ADVANTAGES_DATABASE.forEach(advDef => {
      if (filterCat !== 'all' && advDef.category !== filterCat) return;
      if (filterText && !advDef.name.toLowerCase().includes(filterText) && !advDef.desc.toLowerCase().includes(filterText)) return;

      const existing = (this.char.advantages || []).find(a => a.id === advDef.id);
      const isSelected = !!existing;
      const currentRank = existing ? (parseInt(existing.rank, 10) || 1) : 0;

      const card = document.createElement('div');
      card.style.cssText = `
        background-color: var(--bg-input);
        border: 1px solid ${isSelected ? 'var(--hero-blue)' : 'var(--border-color)'};
        border-radius: var(--radius-sm);
        padding: 0.65rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      `;

      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: ${isSelected ? 'var(--hero-cyan)' : 'var(--text-bright)'}; font-size: var(--font-size-sm);">${advDef.name}</strong>
            <span style="font-size: 0.65rem; background: rgba(255,255,255,0.06); padding: 0.1rem 0.35rem; border-radius: 3px;">${advDef.category}</span>
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin: 0.35rem 0;">${advDef.desc}</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; border-top: 1px solid var(--border-color); padding-top: 0.35rem;">
          ${advDef.maxRank > 1 ? `
            <div style="display: flex; gap: 0.25rem; align-items: center;">
              <span style="font-size: 0.7rem; color: var(--text-muted);">Rank:</span>
              <input type="number" min="0" max="${advDef.maxRank}" value="${currentRank}" style="width: 50px; font-size: 0.75rem; padding: 0.15rem 0.3rem;" data-adv="${advDef.id}">
            </div>
          ` : `<span></span>`}
          <button class="btn ${isSelected ? 'btn-danger' : 'btn-primary'}" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;" data-adv="${advDef.id}">
            ${isSelected ? 'Remove' : '+ Add'}
          </button>
        </div>
      `;

      const btn = card.querySelector('button');
      btn.addEventListener('click', () => {
        if (!this.char.advantages) this.char.advantages = [];
        if (isSelected) {
          this.char.advantages = this.char.advantages.filter(a => a.id !== advDef.id);
        } else {
          this.char.advantages.push({ id: advDef.id, name: advDef.name, rank: 1 });
        }
        this.renderAll();
      });

      const rankInput = card.querySelector('input');
      if (rankInput) {
        rankInput.addEventListener('change', (e) => {
          const val = Math.max(0, parseInt(e.target.value, 10) || 0);
          if (!this.char.advantages) this.char.advantages = [];
          if (val === 0) {
            this.char.advantages = this.char.advantages.filter(a => a.id !== advDef.id);
          } else {
            let item = this.char.advantages.find(a => a.id === advDef.id);
            if (!item) {
              item = { id: advDef.id, name: advDef.name, rank: val };
              this.char.advantages.push(item);
            } else {
              item.rank = val;
            }
          }
          this.renderAll();
        });
      }

      container.appendChild(card);
    });

    // Wire search listeners once
    const searchInput = document.getElementById('adv-search-input');
    if (!searchInput.dataset.wired) {
      searchInput.dataset.wired = 'true';
      searchInput.addEventListener('input', () => this.renderAdvantagesTab(auditCharacter(this.char)));
      document.getElementById('adv-category-filter').addEventListener('change', () => this.renderAdvantagesTab(auditCharacter(this.char)));
    }
  }

  // ==========================================
  // RENDER TAB 5: POWERS
  // ==========================================
  renderPowersTab(audit) {
    document.getElementById('powers-total-pp').textContent = `${audit.powersCost} PP`;
    const container = document.getElementById('powers-builder-list');
    container.innerHTML = '';

    if (!this.char.powers || this.char.powers.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: var(--font-size-sm);">
        No powers built yet. Click <strong>"➕ Build New Power"</strong> to create custom powers using the Hero Lab model!
      </div>`;
      return;
    }

    this.char.powers.forEach((power, idx) => {
      const cost = calculatePowerCost(power);
      const isDevice = power.flaws?.some(f => f.isDevice);

      const card = document.createElement('div');
      card.className = `power-card ${isDevice ? 'device' : ''}`;

      let modifiersSummary = [];
      (power.extras || []).forEach(e => modifiersSummary.push(`+${e.name}`));
      (power.flaws || []).forEach(f => modifiersSummary.push(`-${f.name}`));

      let aeHtml = '';
      if (power.alternateEffects && power.alternateEffects.length > 0) {
        aeHtml = `
          <div style="margin-top: 0.5rem; padding-top: 0.35rem; border-top: 1px dashed var(--border-color); font-size: var(--font-size-xs);">
            <strong style="color: var(--hero-cyan);">Alternate Effects Array (${power.alternateEffects.length} AE):</strong>
            <ul style="padding-left: 1.25rem; color: var(--text-muted); margin-top: 2px;">
              ${power.alternateEffects.map(ae => `<li>${ae.name} (Rank ${ae.rank}) - 1 PP</li>`).join('')}
            </ul>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="power-header">
          <div class="power-title">
            ⚡ ${power.name} (Rank ${power.rank})
            ${isDevice ? `<span style="font-size: 0.65rem; background: #854d0e; color: #fef08a; padding: 0.1rem 0.35rem; border-radius: 3px;">DEVICE</span>` : ''}
          </div>
          <span class="power-cost-tag">${cost} PP</span>
        </div>
        <div class="power-descriptors">
          [${power.descriptor || 'Power'}] • Action: ${power.action || 'Standard'} • Range: ${power.range || 'Close'} • Duration: ${power.duration || 'Instant'}
        </div>
        ${modifiersSummary.length > 0 ? `<div style="font-size: var(--font-size-xs); color: var(--text-muted); margin: 0.25rem 0;"><strong>Modifiers:</strong> ${modifiersSummary.join(', ')}</div>` : ''}
        ${aeHtml}
        ${power.notes ? `<div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 0.35rem;">${power.notes}</div>` : ''}
        
        <div class="power-actions-row">
          <div></div>
          <div class="power-buttons">
            <button class="btn btn-outline" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;" data-action="edit">✏️ Edit</button>
            <button class="btn btn-danger" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;" data-action="delete">🗑️ Delete</button>
          </div>
        </div>
      `;

      card.querySelector('[data-action="edit"]').addEventListener('click', () => {
        this.openPowerBuilderModal(power);
      });

      card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        if (confirm(`Delete power "${power.name}"?`)) {
          this.char.powers.splice(idx, 1);
          this.saveAndAudit();
          this.renderAll();
          this.showToast(`Deleted ${power.name}`);
        }
      });

      container.appendChild(card);
    });
  }

  // ==========================================
  // RENDER TAB 6: GEAR & EQUIPMENT
  // ==========================================
  renderGearTab(audit) {
    let eqAdvRank = 0;
    (this.char.advantages || []).forEach(a => { if (a.id === 'equipment') eqAdvRank += parseInt(a.rank, 10) || 1; });
    const epBudget = eqAdvRank * 5;

    let epSpent = 0;
    (this.char.gear || []).forEach(g => epSpent += parseInt(g.cost, 10) || 0);

    document.getElementById('gear-ep-display').textContent = `${epSpent} / ${epBudget} EP`;

    const tbody = document.getElementById('gear-tbody');
    tbody.innerHTML = '';

    (this.char.gear || []).forEach((item, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td><span style="color: var(--hero-gold); font-weight: 800;">${item.cost} EP</span></td>
        <td>${item.desc || ''}</td>
        <td style="text-align: right;">
          <button class="btn btn-danger" style="font-size: 0.7rem; padding: 0.15rem 0.4rem;">🗑️</button>
        </td>
      `;
      row.querySelector('button').addEventListener('click', () => {
        this.char.gear.splice(idx, 1);
        this.saveAndAudit();
        this.renderGearTab(auditCharacter(this.char));
      });
      tbody.appendChild(row);
    });

    const addBtn = document.getElementById('btn-add-gear');
    if (!addBtn.dataset.wired) {
      addBtn.dataset.wired = 'true';
      addBtn.addEventListener('click', () => {
        const name = document.getElementById('new-gear-name').value.trim();
        const cost = parseInt(document.getElementById('new-gear-cost').value, 10) || 1;
        const desc = document.getElementById('new-gear-desc').value.trim();
        if (!name) {
          alert('Please enter an item name.');
          return;
        }
        if (!this.char.gear) this.char.gear = [];
        this.char.gear.push({ name, cost, desc });
        document.getElementById('new-gear-name').value = '';
        document.getElementById('new-gear-desc').value = '';
        this.saveAndAudit();
        this.renderGearTab(auditCharacter(this.char));
        this.showToast(`Added ${name}`);
      });
    }
  }

  // ==========================================
  // RENDER TAB 7: IDENTITY & COMPLICATIONS
  // ==========================================
  renderIdentityTab(audit) {
    const list = document.getElementById('complications-list');
    list.innerHTML = '';

    (this.char.complications || []).forEach((comp, idx) => {
      const card = document.createElement('div');
      card.style.cssText = 'background-color: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem;';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
          <strong style="color: var(--hero-gold); font-size: var(--font-size-sm);">${comp.type || 'Complication'}: ${comp.name}</strong>
          <button class="btn btn-danger" style="font-size: 0.7rem; padding: 0.15rem 0.4rem;">🗑️</button>
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-muted);">${comp.desc}</div>
      `;
      card.querySelector('button').addEventListener('click', () => {
        this.char.complications.splice(idx, 1);
        this.saveAndAudit();
        this.renderIdentityTab(auditCharacter(this.char));
      });
      list.appendChild(card);
    });

    const addCompBtn = document.getElementById('btn-add-complication');
    if (!addCompBtn.dataset.wired) {
      addCompBtn.dataset.wired = 'true';
      addCompBtn.addEventListener('click', () => {
        const type = prompt('Enter complication type (e.g. Motivation, Identity, Weakness, Enemy, Quirk, Prejudice):', 'Motivation');
        if (!type) return;
        const name = prompt('Enter complication name / title:', 'Doing Good');
        if (!name) return;
        const desc = prompt('Enter complication details (how GM can trigger it for Hero Points):', 'Hero will never compromise innocent lives.');
        if (!this.char.complications) this.char.complications = [];
        this.char.complications.push({ type, name, desc });
        this.saveAndAudit();
        this.renderIdentityTab(auditCharacter(this.char));
        this.showToast(`Added complication: ${name}`);
      });
    }

    const bioInput = document.getElementById('hero-bio-input');
    bioInput.value = this.char.bio || '';
    bioInput.oninput = (e) => {
      this.char.bio = e.target.value;
      storageManager.saveCharacter(this.char);
    };
  }

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '⚡' : '⚠️'}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
}

// Start application
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
