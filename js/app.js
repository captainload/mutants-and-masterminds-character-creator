/**
 * Mutants & Masterminds 3E Character Architect & Interactive Record
 * Primary Application Controller - Version 2.2
 * Optimized for 1080px display width, persistent top header & tabs,
 * and interactive archetype wizard.
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

import {
  MEASUREMENTS_TABLE,
  POWER_LEVEL_GUIDELINES,
  DAMAGE_CONDITIONS_TABLE,
  COMBAT_MANEUVERS_TABLE,
  MATERIAL_TOUGHNESS_TABLE,
  HQ_SIZES_TABLE,
  HQ_FEATURES_LIST,
  tablesManager
} from './tables.js';

import { POWER_PROFILES_LIBRARY } from './power_profiles.js';
import { ARCHETYPES } from './archetypes.js';
import { ARCHETYPE_CUSTOMIZATION_OPTIONS, buildCustomizedArchetype } from './archetype_builder.js';
import { diceRoller } from './dice.js';
import { discordIntegrator } from './discord.js';
import { storageManager } from './storage.js';

class AppController {
  constructor() {
    this.char = storageManager.getActiveCharacter();
    this.activePowerEditing = null;

    // Interactive Archetype Wizard State
    this.wizardState = {
      step: 1,
      selectedArchetypeId: 'battlesuit',
      selectedSpecializationId: null,
      selectedComplication: null,
      heroName: ''
    };

    this.init();
  }

  init() {
    this.checkDisplayWidth();
    window.addEventListener('resize', () => this.checkDisplayWidth());

    this.initFontSize();
    this.setupHeaderBindings();
    this.setupNavigation();
    this.setupDiceLog();
    this.setupDiceRollerBar();
    this.setupTables();
    this.setupMenuModal();
    this.setupHeroPointModal();
    this.setupPointerPopup();
    this.setupPowerProfiles();
    this.setupCustomPowerBuilder();
    this.setupGearAndHQ();
    this.setupHistoryTab();
    this.setupSettingsTab();
    this.setupArchetypeWizard();
    this.renderAll();
  }

  // =======================================================
  // 1. DISPLAY WIDTH WARNING CHECK (< 1080px)
  // =======================================================
  checkDisplayWidth() {
    const banner = document.getElementById('width-warning-banner');
    if (!banner) return;
    const isDismissed = sessionStorage.getItem('mm3e_width_dismissed') === 'true';

    if (window.innerWidth < 1080 && !isDismissed) {
      banner.classList.add('visible');
    } else {
      banner.classList.remove('visible');
    }

    const dismissBtn = document.getElementById('btn-dismiss-width-warning');
    if (dismissBtn && !dismissBtn.dataset.wired) {
      dismissBtn.dataset.wired = 'true';
      dismissBtn.addEventListener('click', () => {
        banner.classList.remove('visible');
        sessionStorage.setItem('mm3e_width_dismissed', 'true');
      });
    }
  }

  // =======================================================
  // 2. FONT SIZING
  // =======================================================
  initFontSize() {
    const saved = localStorage.getItem('mm3e_font_size') || 'normal';
    document.documentElement.setAttribute('data-font-size', saved);
    document.querySelectorAll('.font-size-toggle').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === saved);
      btn.addEventListener('click', () => {
        const size = btn.dataset.size;
        document.documentElement.setAttribute('data-font-size', size);
        localStorage.setItem('mm3e_font_size', size);
        document.querySelectorAll('.font-size-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // =======================================================
  // 3. HEADER TWO-ROW BINDINGS
  // =======================================================
  setupHeaderBindings() {
    // Menu button
    document.getElementById('btn-open-menu').addEventListener('click', () => {
      this.populateMenuRoster();
      this.openModal('modal-menu');
    });

    // Player Name
    const playerNameInput = document.getElementById('header-player-name');
    playerNameInput.value = this.char.playerName || '';
    playerNameInput.addEventListener('input', (e) => {
      this.char.playerName = e.target.value;
      storageManager.saveCharacter(this.char);
    });

    // Character Name
    const charNameInput = document.getElementById('header-char-name');
    charNameInput.value = this.char.name || '';
    charNameInput.addEventListener('input', (e) => {
      this.char.name = e.target.value;
      storageManager.saveCharacter(this.char);
      this.populateMenuRoster();
    });

    // Campaign Name
    const campaignInput = document.getElementById('header-campaign-name');
    campaignInput.value = this.char.campaign || 'Earth-Prime';
    campaignInput.addEventListener('input', (e) => {
      this.char.campaign = e.target.value;
      storageManager.saveCharacter(this.char);
    });

    // Hero Points Stepper
    document.getElementById('btn-hp-plus').addEventListener('click', () => {
      this.char.heroPoints = (this.char.heroPoints || 0) + 1;
      this.saveAndAudit();
      this.renderHeaderStatus();
    });

    document.getElementById('btn-hp-minus').addEventListener('click', () => {
      if ((this.char.heroPoints || 0) > 0) {
        this.char.heroPoints--;
        this.saveAndAudit();
        this.renderHeaderStatus();
      }
    });

    document.getElementById('btn-quick-spend-hp').addEventListener('click', () => {
      this.openModal('modal-hero-point');
    });

    // Archetypes Button (Row 2 Right)
    document.getElementById('btn-open-archetypes').addEventListener('click', () => {
      this.openArchetypeWizard();
    });

    // Tables Button (Row 2 Right)
    document.getElementById('btn-open-tables').addEventListener('click', () => {
      this.openModal('modal-tables');
    });
  }

  // =======================================================
  // 4. NAVIGATION TABS
  // =======================================================
  setupNavigation() {
    const tabs = document.querySelectorAll('.nav-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const pane = document.getElementById(target);
        if (pane) pane.classList.add('active');
      });
    });
  }

  // =======================================================
  // 5. INTERACTIVE ARCHETYPE BUILDER WIZARD
  // =======================================================
  setupArchetypeWizard() {
    document.getElementById('btn-close-archetype-wizard').addEventListener('click', () => {
      this.closeModal('modal-archetype-wizard');
    });

    document.getElementById('btn-wizard-back').addEventListener('click', () => {
      if (this.wizardState.step > 1) {
        this.wizardState.step--;
        this.renderWizardStep();
      }
    });

    document.getElementById('btn-wizard-next').addEventListener('click', () => {
      if (this.wizardState.step === 1) {
        this.wizardState.step = 2;
        this.renderWizardStep();
      } else if (this.wizardState.step === 2) {
        this.wizardState.step = 3;
        this.renderWizardStep();
      } else if (this.wizardState.step === 3) {
        this.finishArchetypeWizard();
      }
    });
  }

  openArchetypeWizard() {
    this.wizardState = {
      step: 1,
      selectedArchetypeId: 'battlesuit',
      selectedSpecializationId: null,
      selectedComplication: null,
      heroName: ''
    };
    this.renderWizardStep();
    this.openModal('modal-archetype-wizard');
  }

  renderWizardStep() {
    const body = document.getElementById('archetype-wizard-body');
    const backBtn = document.getElementById('btn-wizard-back');
    const nextBtn = document.getElementById('btn-wizard-next');

    backBtn.style.display = this.wizardState.step === 1 ? 'none' : 'inline-flex';
    nextBtn.textContent = this.wizardState.step === 3 ? '⚡ Generate & Equip Hero' : 'Next Step ➜';

    if (this.wizardState.step === 1) {
      // Step 1: Select Archetype
      let html = `
        <div style="font-weight: 800; font-size: var(--font-size-md); color: var(--hero-cyan); margin-bottom: 0.35rem;">
          Step 1: Choose Your Superhero Archetype
        </div>
        <p style="font-size: var(--font-size-xs); color: var(--text-muted); margin-bottom: 0.85rem;">
          Select a core archetype from the Deluxe Hero's Handbook. Each is built to standard PL 10 (150 PP):
        </p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem;">
      `;

      ARCHETYPES.forEach(arch => {
        const isSel = this.wizardState.selectedArchetypeId === arch.id;
        html += `
          <div class="wizard-option-card ${isSel ? 'selected' : ''}" data-arch-id="${arch.id}">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <strong style="color: ${isSel ? 'var(--hero-purple)' : 'var(--text-bright)'}; font-size: var(--font-size-sm);">${arch.name}</strong>
              <span style="font-size: 0.65rem; color: var(--hero-gold); font-weight: 700;">PL ${arch.powerLevel}</span>
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--hero-cyan); margin: 2px 0;">${arch.tagline}</div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted);">${arch.concept}</div>
          </div>
        `;
      });

      html += `</div>`;
      body.innerHTML = html;

      body.querySelectorAll('[data-arch-id]').forEach(card => {
        card.addEventListener('click', () => {
          this.wizardState.selectedArchetypeId = card.dataset.archId;
          this.wizardState.selectedSpecializationId = null;
          this.renderWizardStep();
        });
      });

    } else if (this.wizardState.step === 2) {
      // Step 2: Select Specialization Package
      const customData = ARCHETYPE_CUSTOMIZATION_OPTIONS[this.wizardState.selectedArchetypeId] || { specializations: [] };
      const archDef = ARCHETYPES.find(a => a.id === this.wizardState.selectedArchetypeId);

      if (!this.wizardState.selectedSpecializationId && customData.specializations.length > 0) {
        this.wizardState.selectedSpecializationId = customData.specializations[0].id;
      }

      let html = `
        <div style="font-weight: 800; font-size: var(--font-size-md); color: var(--hero-cyan); margin-bottom: 0.35rem;">
          Step 2: Customization Package for ${archDef?.name}
        </div>
        <p style="font-size: var(--font-size-xs); color: var(--text-muted); margin-bottom: 0.85rem;">
          Pick the power profile, combat specialization, and tactical focus defined in the rules:
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.65rem;">
      `;

      customData.specializations.forEach(spec => {
        const isSel = this.wizardState.selectedSpecializationId === spec.id;
        html += `
          <div class="wizard-option-card ${isSel ? 'selected' : ''}" data-spec-id="${spec.id}">
            <div style="font-weight: 800; color: ${isSel ? 'var(--hero-purple)' : 'var(--text-bright)'}; font-size: var(--font-size-sm); margin-bottom: 2px;">
              ${spec.name}
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-bottom: 4px;">
              ${spec.desc}
            </div>
            <div style="display: flex; gap: 1rem; font-size: 0.7rem; color: var(--hero-cyan); font-weight: 700;">
              <span>⚡ Attack: ${spec.attackDescriptor}</span>
              <span>🎯 Focus: ${spec.skillFocus}</span>
            </div>
          </div>
        `;
      });

      html += `</div>`;
      body.innerHTML = html;

      body.querySelectorAll('[data-spec-id]').forEach(card => {
        card.addEventListener('click', () => {
          this.wizardState.selectedSpecializationId = card.dataset.specId;
          this.renderWizardStep();
        });
      });

    } else if (this.wizardState.step === 3) {
      // Step 3: Hero Name & Core Complication
      const customData = ARCHETYPE_CUSTOMIZATION_OPTIONS[this.wizardState.selectedArchetypeId] || { complications: [] };
      const archDef = ARCHETYPES.find(a => a.id === this.wizardState.selectedArchetypeId);

      if (!this.wizardState.selectedComplication && customData.complications.length > 0) {
        this.wizardState.selectedComplication = customData.complications[0];
      }

      if (!this.wizardState.heroName) {
        this.wizardState.heroName = archDef?.name || 'New Hero';
      }

      let html = `
        <div style="font-weight: 800; font-size: var(--font-size-md); color: var(--hero-cyan); margin-bottom: 0.35rem;">
          Step 3: Character Identity & Motivations
        </div>
        <div style="margin-bottom: 0.85rem;">
          <label style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Superhero Name</label>
          <input type="text" id="wizard-hero-name" value="${this.wizardState.heroName}" style="width: 100%; font-size: var(--font-size-md); font-weight: 800; margin-top: 2px;">
        </div>
        <div style="font-weight: 800; font-size: var(--font-size-xs); color: var(--hero-gold); text-transform: uppercase; margin-bottom: 0.35rem;">
          Select Primary Complication (Earns Hero Points in play)
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      `;

      customData.complications.forEach((comp, idx) => {
        const isSel = this.wizardState.selectedComplication?.name === comp.name;
        html += `
          <div class="wizard-option-card ${isSel ? 'selected' : ''}" data-comp-idx="${idx}">
            <strong style="color: ${isSel ? 'var(--hero-purple)' : 'var(--text-bright)'}; font-size: var(--font-size-xs);">
              ${comp.type}: ${comp.name}
            </strong>
            <div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 2px;">
              ${comp.desc}
            </div>
          </div>
        `;
      });

      html += `</div>`;
      body.innerHTML = html;

      const nameInput = document.getElementById('wizard-hero-name');
      nameInput.addEventListener('input', (e) => {
        this.wizardState.heroName = e.target.value.trim();
      });

      body.querySelectorAll('[data-comp-idx]').forEach(card => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.dataset.compIdx, 10);
          this.wizardState.selectedComplication = customData.complications[idx];
          this.renderWizardStep();
        });
      });
    }
  }

  finishArchetypeWizard() {
    const heroName = (document.getElementById('wizard-hero-name')?.value || this.wizardState.heroName || 'Champion').trim();
    const newHero = buildCustomizedArchetype(
      this.wizardState.selectedArchetypeId,
      heroName,
      this.wizardState.selectedSpecializationId,
      this.wizardState.selectedComplication
    );

    storageManager.characters.push(newHero);
    storageManager.activeId = newHero.id;
    storageManager.saveAll();

    this.char = newHero;
    this.closeModal('modal-archetype-wizard');
    this.populateMenuRoster();
    this.renderAll();
    alert(`Equipped ${newHero.name} (${newHero.concept})! Ready for action!`);
  }

  // =======================================================
  // 6. DICE ROLLER BAR & LOG
  // =======================================================
  setupDiceRollerBar() {
    const rollBtn = document.getElementById('btn-action-roll-dice');
    const input = document.getElementById('action-dice-input');
    const dcInput = document.getElementById('action-dice-dc');

    const executeRoll = () => {
      const notation = input.value.trim() || 'd20';
      const dcVal = dcInput.value.trim();
      const targetDC = dcVal !== '' ? parseInt(dcVal, 10) : null;

      try {
        const roll = diceRoller.rollNotation(notation, this.char.name, targetDC);
        discordIntegrator.sendRollEmbed(roll);
      } catch (err) {
        alert(err.message);
      }
    };

    rollBtn.addEventListener('click', executeRoll);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') executeRoll();
    });

    // Initiative Roll Button
    document.getElementById('btn-roll-initiative').addEventListener('click', () => {
      const agi = parseInt(this.char.abilities?.agi, 10) || 0;
      let impInitRanks = 0;
      (this.char.advantages || []).forEach(a => {
        if (a.id === 'improved_initiative') impInitRanks += parseInt(a.rank, 10) || 1;
      });
      const mod = agi + (impInitRanks * 4);

      const roll = diceRoller.rollCheck({
        title: 'Initiative Check',
        characterName: this.char.name,
        modifier: mod,
        rollType: 'initiative',
        extraText: `Base AGI (${agi}) + Improved Initiative (+${impInitRanks * 4})`
      });
      discordIntegrator.sendRollEmbed(roll);
    });

    // Bruises and conditions
    document.getElementById('btn-bruise-plus').addEventListener('click', () => {
      this.char.bruises = (this.char.bruises || 0) + 1;
      this.saveAndAudit();
      this.renderActionCenter(auditCharacter(this.char));
    });

    document.getElementById('btn-bruise-minus').addEventListener('click', () => {
      if ((this.char.bruises || 0) > 0) {
        this.char.bruises--;
        this.saveAndAudit();
        this.renderActionCenter(auditCharacter(this.char));
      }
    });

    document.getElementById('btn-action-clear-damage').addEventListener('click', () => {
      this.char.bruises = 0;
      this.char.conditions = { dazed: false, staggered: false, defenseless: false, vulnerable: false };
      this.saveAndAudit();
      this.renderActionCenter(auditCharacter(this.char));
    });

    document.querySelectorAll('.condition-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const cond = btn.dataset.cond;
        if (!this.char.conditions) this.char.conditions = {};
        this.char.conditions[cond] = !this.char.conditions[cond];
        this.saveAndAudit();
        this.renderActionCenter(auditCharacter(this.char));
      });
    });

    document.getElementById('btn-clear-dice-log').addEventListener('click', () => {
      diceRoller.history = [];
      document.getElementById('dice-log-feed').innerHTML = '';
    });
  }

  setupDiceLog() {
    diceRoller.onRoll((roll) => {
      const container = document.getElementById('dice-log-feed');
      if (!container) return;

      const entry = document.createElement('div');
      entry.style.cssText = `
        background-color: var(--bg-input);
        border-left: 4px solid ${roll.outcomeClass === 'success' ? 'var(--hero-green)' : roll.outcomeClass === 'failure' ? 'var(--hero-red)' : 'var(--hero-blue)'};
        border-radius: var(--radius-sm);
        padding: 0.45rem 0.65rem;
        font-size: var(--font-size-xs);
      `;

      entry.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-weight: 800; color: var(--text-bright);">
          <span>${roll.title}</span>
          <span style="font-size: 0.65rem; color: var(--text-muted);">${roll.timestamp}</span>
        </div>
        <div style="font-size: var(--font-size-md); font-weight: 900; margin: 2px 0;">
          ${roll.total} <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 600;">(${roll.extraText || `d20 (${roll.rawDie}) + ${roll.modifier}`}${roll.targetDC ? ` vs DC ${roll.targetDC}` : ''})</span>
        </div>
        ${roll.outcome ? `<div style="font-weight: 700; color: ${roll.outcomeClass === 'success' ? 'var(--hero-green)' : 'var(--hero-red)'};">${roll.outcomeClass === 'success' ? '✅' : '❌'} ${roll.outcomeDescription}</div>` : ''}
        ${discordIntegrator.enabled ? `<span style="font-size: 0.65rem; color: #5865f2; font-weight: 700;">🤖 Discord Echoed</span>` : ''}
      `;

      container.insertBefore(entry, container.firstChild);
    });
  }

  // =======================================================
  // 7. TABLES POP-UP & POP-OUT MANAGER
  // =======================================================
  setupTables() {
    const measTbody = document.querySelector('#table-measurements tbody');
    if (measTbody) {
      measTbody.innerHTML = MEASUREMENTS_TABLE.map(r => `
        <tr><td><strong>Rank ${r.rank}</strong></td><td>${r.mass}</td><td>${r.distance}</td><td>${r.time}</td><td>${r.volume}</td></tr>
      `).join('');
    }

    const plTbody = document.querySelector('#table-pl-guidelines tbody');
    if (plTbody) {
      plTbody.innerHTML = POWER_LEVEL_GUIDELINES.map(g => `
        <tr><td><strong>PL ${g.pl}</strong></td><td>${g.pp} PP</td><td>Max +${g.maxAttackEffect}</td><td>Max +${g.maxDefTough}</td><td>Max +${g.maxFortWill}</td><td>Max +${g.maxSkill}</td><td>${g.description}</td></tr>
      `).join('');
    }

    const dmgTbody = document.querySelector('#table-damage-conditions tbody');
    if (dmgTbody) {
      dmgTbody.innerHTML = DAMAGE_CONDITIONS_TABLE.map(d => `
        <tr><td><strong>${d.degree}</strong></td><td><span style="color: var(--hero-red); font-weight: 800;">${d.result}</span></td><td>${d.description}</td></tr>
      `).join('');
    }

    const manTbody = document.querySelector('#table-combat-maneuvers tbody');
    if (manTbody) {
      manTbody.innerHTML = COMBAT_MANEUVERS_TABLE.map(m => `
        <tr><td><strong>${m.maneuver}</strong></td><td style="color: var(--hero-cyan);">${m.tradeOff}</td><td>${m.requirement}</td></tr>
      `).join('');
    }

    const matTbody = document.querySelector('#table-materials tbody');
    if (matTbody) {
      matTbody.innerHTML = MATERIAL_TOUGHNESS_TABLE.map(m => `
        <tr><td>${m.material}</td><td><strong>Toughness ${m.toughness}</strong></td></tr>
      `).join('');
    }

    document.querySelectorAll('.collapsible-header').forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        if (content) content.classList.toggle('collapsed');
      });
    });

    document.getElementById('btn-tables-expand-all').addEventListener('click', () => {
      document.querySelectorAll('.collapsible-content').forEach(c => c.classList.remove('collapsed'));
    });
    document.getElementById('btn-tables-collapse-all').addEventListener('click', () => {
      document.querySelectorAll('.collapsible-content').forEach(c => c.classList.add('collapsed'));
    });

    document.getElementById('btn-close-tables').addEventListener('click', () => {
      this.closeModal('modal-tables');
    });

    document.getElementById('btn-tables-popout').addEventListener('click', () => {
      tablesManager.openPopout();
      this.closeModal('modal-tables');
    });
  }

  // =======================================================
  // 8. POINTER-ANCHORED RULES POPUP (Verbatim 3E text)
  // =======================================================
  setupPointerPopup() {
    const popup = document.getElementById('pointer-rules-popup');
    window.tablesManager = tablesManager;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('.rules-link');
      if (link) {
        e.preventDefault();
        e.stopPropagation();

        const name = link.dataset.name || link.textContent;
        const desc = link.dataset.desc || '';
        const cat = link.dataset.cat || 'Official 3E Rules';

        document.getElementById('popup-item-name').textContent = name;
        document.getElementById('popup-item-cat').textContent = cat;
        document.getElementById('popup-item-body').textContent = desc;

        popup.style.display = 'block';
        const posX = Math.min(window.innerWidth - 340, Math.max(10, e.pageX + 10));
        const posY = e.pageY + 10;
        popup.style.left = `${posX}px`;
        popup.style.top = `${posY}px`;
      } else if (!e.target.closest('#pointer-rules-popup')) {
        popup.style.display = 'none';
      }
    });
  }

  // =======================================================
  // 9. MENU MODAL (Save, Save As, Load, Import/Export)
  // =======================================================
  setupMenuModal() {
    document.getElementById('btn-close-menu').addEventListener('click', () => {
      this.closeModal('modal-menu');
    });

    document.getElementById('menu-btn-save').addEventListener('click', () => {
      this.saveAndAudit();
      this.closeModal('modal-menu');
      alert(`Character "${this.char.name}" saved!`);
    });

    document.getElementById('menu-btn-save-as').addEventListener('click', () => {
      const clone = storageManager.cloneCharacter(this.char.id);
      if (clone) {
        this.char = clone;
        this.populateMenuRoster();
        this.renderAll();
        this.closeModal('modal-menu');
        alert(`Cloned as "${clone.name}"!`);
      }
    });

    document.getElementById('menu-btn-load-char').addEventListener('click', () => {
      const select = document.getElementById('menu-char-roster');
      storageManager.setActiveCharacter(select.value);
      this.char = storageManager.getActiveCharacter();
      this.renderAll();
      this.closeModal('modal-menu');
    });

    document.getElementById('menu-btn-delete-char').addEventListener('click', () => {
      if (confirm(`Delete character "${this.char.name}"?`)) {
        storageManager.deleteCharacter(this.char.id);
        this.char = storageManager.getActiveCharacter();
        this.populateMenuRoster();
        this.renderAll();
        this.closeModal('modal-menu');
      }
    });

    document.getElementById('menu-btn-new-freeform').addEventListener('click', () => {
      const name = prompt('Enter superhero name for freeform creation:', 'New Champion');
      if (name) {
        const newHero = storageManager.createFreeformCharacter(name.trim(), 10, 150);
        this.char = newHero;
        this.populateMenuRoster();
        this.renderAll();
        this.closeModal('modal-menu');
      }
    });

    document.getElementById('menu-btn-archetypes-wizard').addEventListener('click', () => {
      this.closeModal('modal-menu');
      this.openArchetypeWizard();
    });

    document.getElementById('menu-btn-export').addEventListener('click', () => {
      storageManager.exportCharacterToJSON(this.char);
      this.closeModal('modal-menu');
    });

    const fileInput = document.getElementById('menu-file-input');
    document.getElementById('menu-btn-import').addEventListener('click', () => {
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
          this.populateMenuRoster();
          this.renderAll();
          this.closeModal('modal-menu');
          alert(`Imported ${imported.name}!`);
        }
      };
      reader.readAsText(file);
      fileInput.value = '';
    });
  }

  populateMenuRoster() {
    const select = document.getElementById('menu-char-roster');
    if (!select) return;
    select.innerHTML = '';
    storageManager.characters.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.name} (PL ${c.powerLevel})`;
      if (c.id === this.char.id) opt.selected = true;
      select.appendChild(opt);
    });
  }

  // =======================================================
  // 10. HERO POINT SPEND MODAL
  // =======================================================
  setupHeroPointModal() {
    document.getElementById('btn-close-hp-modal').addEventListener('click', () => {
      this.closeModal('modal-hero-point');
    });

    document.getElementById('btn-hp-exec-reroll').addEventListener('click', () => {
      if ((this.char.heroPoints || 0) <= 0) {
        alert('You have no Hero Points left!');
        return;
      }
      this.char.heroPoints--;
      const roll = diceRoller.rollCheck({
        title: 'Hero Point Reroll Check',
        characterName: this.char.name,
        modifier: parseInt(this.char.abilities?.fgt, 10) || 0,
        isHeroPointReroll: true,
        rollType: 'hero_point'
      });
      discordIntegrator.sendHeroPointSpend(this.char.name, 'Reroll (1-10 + 10 Rule)', `Result: **${roll.total}**`);
      discordIntegrator.sendRollEmbed(roll);
      this.saveAndAudit();
      this.renderHeaderStatus();
      this.closeModal('modal-hero-point');
    });

    const spendActions = [
      { id: 'btn-hp-extra-effort', name: 'Extra Effort', desc: 'Extra standard action / +2 check / power stunt.' },
      { id: 'btn-hp-edit-scene', name: 'Edit Scene', desc: 'Introduced an advantageous plot element.' },
      { id: 'btn-hp-instant-counter', name: 'Instant Counter', desc: 'Instant reaction counter on incoming power.' },
      { id: 'btn-hp-inspiration', name: 'Inspiration', desc: 'Received a vital hint from the Gamemaster.' },
      { id: 'btn-hp-recovery', name: 'Recovery / Escape Death', desc: 'Removed worst condition or stabilized.' }
    ];

    spendActions.forEach(action => {
      document.getElementById(action.id)?.addEventListener('click', () => {
        if ((this.char.heroPoints || 0) <= 0) {
          alert('You have no Hero Points left!');
          return;
        }
        this.char.heroPoints--;
        if (action.id === 'btn-hp-recovery') {
          if (this.char.conditions?.staggered) this.char.conditions.staggered = false;
          else if (this.char.conditions?.dazed) this.char.conditions.dazed = false;
          else if ((this.char.bruises || 0) > 0) this.char.bruises--;
        }
        discordIntegrator.sendHeroPointSpend(this.char.name, action.name, action.desc);
        this.saveAndAudit();
        this.renderHeaderStatus();
        this.renderActionCenter(auditCharacter(this.char));
        this.closeModal('modal-hero-point');
      });
    });
  }

  // =======================================================
  // 11. POWER PROFILES (Official 3E Profiles Library)
  // =======================================================
  setupPowerProfiles() {
    const select = document.getElementById('power-profiles-select');
    select.innerHTML = '';

    POWER_PROFILES_LIBRARY.forEach(group => {
      const optGroup = document.createElement('optgroup');
      optGroup.label = group.category;
      group.profiles.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} (Rank ${p.rank}) [${p.descriptor}]`;
        optGroup.appendChild(opt);
      });
      select.appendChild(optGroup);
    });

    document.getElementById('btn-apply-profile').addEventListener('click', () => {
      const profileId = select.value;
      let matchedProfile = null;
      for (const grp of POWER_PROFILES_LIBRARY) {
        const found = grp.profiles.find(p => p.id === profileId);
        if (found) { matchedProfile = found; break; }
      }

      if (!matchedProfile) return;

      const baseEffect = POWER_EFFECTS_CATALOG.find(e => e.id === matchedProfile.effectId) || { id: matchedProfile.effectId, baseCost: 1 };
      const newPower = {
        id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name: matchedProfile.name,
        rank: matchedProfile.rank,
        effect: baseEffect,
        action: matchedProfile.action,
        range: matchedProfile.range,
        duration: matchedProfile.duration,
        descriptor: matchedProfile.descriptor,
        extras: JSON.parse(JSON.stringify(matchedProfile.extras || [])),
        flaws: JSON.parse(JSON.stringify(matchedProfile.flaws || [])),
        alternateEffects: [],
        notes: matchedProfile.notes || ''
      };

      if (!this.char.powers) this.char.powers = [];
      this.char.powers.push(newPower);
      this.saveAndAudit();
      this.renderAll();
      alert(`Power Profile "${matchedProfile.name}" added to character!`);
    });

    document.getElementById('btn-open-custom-power-builder').addEventListener('click', () => {
      this.openCustomPowerBuilder(null);
    });
  }

  // =======================================================
  // 12. CUSTOM POWER BUILDER
  // =======================================================
  setupCustomPowerBuilder() {
    const effectSelect = document.getElementById('builder-base-effect');
    effectSelect.innerHTML = '';
    POWER_EFFECTS_CATALOG.forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.id;
      opt.textContent = `${e.name} (${e.baseCost} PP/rank) [${e.range}, ${e.duration}]`;
      effectSelect.appendChild(opt);
    });

    effectSelect.addEventListener('change', () => {
      const def = POWER_EFFECTS_CATALOG.find(e => e.id === effectSelect.value);
      if (def) {
        document.getElementById('builder-action').value = def.action || 'Standard';
        document.getElementById('builder-range').value = def.range || 'Close';
        document.getElementById('builder-duration').value = def.duration || 'Instant';
      }
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-builder-rank-plus').addEventListener('click', () => {
      const valEl = document.getElementById('builder-rank-val');
      valEl.textContent = parseInt(valEl.textContent, 10) + 1;
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-builder-rank-minus').addEventListener('click', () => {
      const valEl = document.getElementById('builder-rank-val');
      valEl.textContent = Math.max(1, parseInt(valEl.textContent, 10) - 1);
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-builder-add-extra').addEventListener('click', () => {
      this.addBuilderExtraRow();
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-builder-add-flaw').addEventListener('click', () => {
      this.addBuilderFlawRow();
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-builder-add-ae').addEventListener('click', () => {
      this.addBuilderAeRow();
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-close-power-builder').addEventListener('click', () => {
      this.closeModal('modal-power-builder');
    });

    document.getElementById('btn-cancel-power-builder').addEventListener('click', () => {
      this.closeModal('modal-power-builder');
    });

    document.getElementById('btn-save-power-builder').addEventListener('click', () => {
      this.savePowerFromBuilder();
    });
  }

  openCustomPowerBuilder(powerToEdit = null) {
    this.activePowerEditing = powerToEdit ? JSON.parse(JSON.stringify(powerToEdit)) : null;
    const isEdit = !!powerToEdit;

    document.getElementById('builder-modal-title').textContent = isEdit
      ? `⚡ Edit Power: ${powerToEdit.name}`
      : '⚡ 3E Power Builder';

    if (isEdit) {
      document.getElementById('builder-power-name').value = powerToEdit.name;
      document.getElementById('builder-power-descriptor').value = powerToEdit.descriptor || '';
      document.getElementById('builder-rank-val').textContent = powerToEdit.rank || 10;
      document.getElementById('builder-base-effect').value = powerToEdit.effect?.id || 'damage';
      document.getElementById('builder-action').value = powerToEdit.action || 'Standard';
      document.getElementById('builder-range').value = powerToEdit.range || 'Close';
      document.getElementById('builder-duration').value = powerToEdit.duration || 'Instant';
      document.getElementById('builder-power-notes').value = powerToEdit.notes || '';
    } else {
      document.getElementById('builder-power-name').value = '';
      document.getElementById('builder-power-descriptor').value = 'Energy, Technology';
      document.getElementById('builder-rank-val').textContent = '10';
      document.getElementById('builder-base-effect').value = 'damage';
      document.getElementById('builder-action').value = 'Standard';
      document.getElementById('builder-range').value = 'Close';
      document.getElementById('builder-duration').value = 'Instant';
      document.getElementById('builder-power-notes').value = '';
    }

    const extrasList = document.getElementById('builder-extras-list');
    extrasList.innerHTML = '';
    (isEdit ? powerToEdit.extras || [] : []).forEach(e => this.addBuilderExtraRow(e));

    const flawsList = document.getElementById('builder-flaws-list');
    flawsList.innerHTML = '';
    (isEdit ? powerToEdit.flaws || [] : []).forEach(f => this.addBuilderFlawRow(f));

    const aeList = document.getElementById('builder-ae-list');
    aeList.innerHTML = '';
    (isEdit ? powerToEdit.alternateEffects || [] : []).forEach(ae => this.addBuilderAeRow(ae));

    this.recalculateCustomBuilder();
    this.openModal('modal-power-builder');
  }

  addBuilderExtraRow(saved = null) {
    const list = document.getElementById('builder-extras-list');
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.35rem; align-items: center;';

    const sel = document.createElement('select');
    sel.style.flex = '1';
    EXTRAS_CATALOG.forEach(ex => {
      const opt = document.createElement('option');
      opt.value = ex.id;
      opt.textContent = `${ex.name} (${ex.isFlat ? `+${ex.cost} flat` : `+${ex.cost}/rank`})`;
      if (saved && saved.id === ex.id) opt.selected = true;
      sel.appendChild(opt);
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline';
    delBtn.style.padding = '0.1rem 0.35rem';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => { row.remove(); this.recalculateCustomBuilder(); });

    sel.addEventListener('change', () => this.recalculateCustomBuilder());

    row.appendChild(sel);
    row.appendChild(delBtn);
    list.appendChild(row);
  }

  addBuilderFlawRow(saved = null) {
    const list = document.getElementById('builder-flaws-list');
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.35rem; align-items: center;';

    const sel = document.createElement('select');
    sel.style.flex = '1';
    FLAWS_CATALOG.forEach(fl => {
      const opt = document.createElement('option');
      opt.value = fl.id;
      opt.textContent = `${fl.name} (${fl.isDevice ? `Device -${fl.discountPer5}/5` : fl.isFlat ? `-${fl.cost} flat` : `-${fl.cost}/rank`})`;
      if (saved && saved.id === fl.id) opt.selected = true;
      sel.appendChild(opt);
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline';
    delBtn.style.padding = '0.1rem 0.35rem';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => { row.remove(); this.recalculateCustomBuilder(); });

    sel.addEventListener('change', () => this.recalculateCustomBuilder());

    row.appendChild(sel);
    row.appendChild(delBtn);
    list.appendChild(row);
  }

  addBuilderAeRow(saved = null) {
    const list = document.getElementById('builder-ae-list');
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.35rem; align-items: center;';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Alt Effect Name (e.g. Cone Blast)';
    input.value = saved ? saved.name : 'Alternate Attack Form';
    input.style.flex = '1';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline';
    delBtn.style.padding = '0.1rem 0.35rem';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => { row.remove(); this.recalculateCustomBuilder(); });

    row.appendChild(input);
    row.appendChild(delBtn);
    list.appendChild(row);
  }

  recalculateCustomBuilder() {
    const power = this.collectPowerFromBuilder();
    const cost = calculatePowerCost(power);
    document.getElementById('builder-total-pp-display').textContent = `${cost} PP`;
    document.getElementById('builder-formula-display').textContent = `Rank ${power.rank} • Cost: ${cost} Power Points`;
  }

  collectPowerFromBuilder() {
    const effectId = document.getElementById('builder-base-effect').value;
    const effect = POWER_EFFECTS_CATALOG.find(e => e.id === effectId) || { id: effectId, baseCost: 1 };
    const rank = parseInt(document.getElementById('builder-rank-val').textContent, 10) || 1;

    const extras = [];
    document.querySelectorAll('#builder-extras-list select').forEach(s => {
      const def = EXTRAS_CATALOG.find(e => e.id === s.value);
      if (def) extras.push({ id: def.id, name: def.name, cost: def.cost, isFlat: def.isFlat });
    });

    const flaws = [];
    document.querySelectorAll('#builder-flaws-list select').forEach(s => {
      const def = FLAWS_CATALOG.find(f => f.id === s.value);
      if (def) flaws.push({ id: def.id, name: def.name, cost: def.cost, isFlat: def.isFlat, isDevice: def.isDevice });
    });

    const alternateEffects = [];
    document.querySelectorAll('#builder-ae-list input').forEach(input => {
      if (input.value.trim()) {
        alternateEffects.push({
          id: 'ae_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          name: input.value.trim(),
          rank
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

  savePowerFromBuilder() {
    const power = this.collectPowerFromBuilder();
    if (!this.char.powers) this.char.powers = [];

    const existingIdx = this.char.powers.findIndex(p => p.id === power.id);
    if (existingIdx !== -1) {
      this.char.powers[existingIdx] = power;
    } else {
      this.char.powers.push(power);
    }

    this.saveAndAudit();
    this.renderAll();
    this.closeModal('modal-power-builder');
  }

  // =======================================================
  // 13. GEAR & HEADQUARTERS (HQ) TAB
  // =======================================================
  setupGearAndHQ() {
    document.getElementById('btn-add-item-gear').addEventListener('click', () => {
      const name = document.getElementById('new-item-name').value.trim();
      const cost = parseInt(document.getElementById('new-item-cost').value, 10) || 1;
      const desc = document.getElementById('new-item-desc').value.trim();

      if (!name) { alert('Enter gear name.'); return; }
      if (!this.char.gear) this.char.gear = [];
      this.char.gear.push({ name, cost, desc });

      document.getElementById('new-item-name').value = '';
      document.getElementById('new-item-desc').value = '';

      this.saveAndAudit();
      this.renderGearTab(auditCharacter(this.char));
    });

    const sizeSelect = document.getElementById('hq-size-select');
    sizeSelect.innerHTML = HQ_SIZES_TABLE.map(s => `
      <option value="${s.name}" data-ep="${s.ep}">${s.name} (${s.ep >= 0 ? `+${s.ep}` : s.ep} EP) - ${s.desc}</option>
    `).join('');

    sizeSelect.addEventListener('change', () => {
      if (!this.char.hq) this.char.hq = {};
      this.char.hq.size = sizeSelect.value;
      this.saveAndAudit();
      this.renderGearTab(auditCharacter(this.char));
    });

    document.getElementById('btn-hq-tough-plus').addEventListener('click', () => {
      if (!this.char.hq) this.char.hq = {};
      this.char.hq.toughness = (this.char.hq.toughness || 8) + 1;
      this.saveAndAudit();
      this.renderGearTab(auditCharacter(this.char));
    });

    document.getElementById('btn-hq-tough-minus').addEventListener('click', () => {
      if (!this.char.hq) this.char.hq = {};
      this.char.hq.toughness = Math.max(1, (this.char.hq.toughness || 8) - 1);
      this.saveAndAudit();
      this.renderGearTab(auditCharacter(this.char));
    });

    const hqNameInput = document.getElementById('hq-name-input');
    hqNameInput.addEventListener('input', (e) => {
      if (!this.char.hq) this.char.hq = {};
      this.char.hq.name = e.target.value;
      storageManager.saveCharacter(this.char);
    });

    const featuresContainer = document.getElementById('hq-features-checklist');
    featuresContainer.innerHTML = HQ_FEATURES_LIST.map(f => `
      <label style="display: flex; align-items: center; gap: 0.35rem; background-color: var(--bg-input); padding: 0.3rem 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: var(--font-size-xs); cursor: pointer;">
        <input type="checkbox" data-feat-id="${f.id}" class="hq-feat-checkbox">
        <span class="rules-link" data-name="${f.name}" data-desc="${f.desc}" data-cat="HQ Feature">${f.name}</span>
      </label>
    `).join('');

    featuresContainer.querySelectorAll('.hq-feat-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        if (!this.char.hq) this.char.hq = { features: [] };
        if (!this.char.hq.features) this.char.hq.features = [];
        const featId = cb.dataset.featId;
        if (cb.checked) {
          if (!this.char.hq.features.includes(featId)) this.char.hq.features.push(featId);
        } else {
          this.char.hq.features = this.char.hq.features.filter(id => id !== featId);
        }
        this.saveAndAudit();
        this.renderGearTab(auditCharacter(this.char));
      });
    });
  }

  // =======================================================
  // 14. HISTORY & LORE TAB
  // =======================================================
  setupHistoryTab() {
    const originText = document.getElementById('history-origin-text');
    originText.value = this.char.bio || '';
    originText.addEventListener('input', (e) => {
      this.char.bio = e.target.value;
      storageManager.saveCharacter(this.char);
    });

    const contactsText = document.getElementById('history-contacts-text');
    contactsText.value = this.char.contactsLore || '';
    contactsText.addEventListener('input', (e) => {
      this.char.contactsLore = e.target.value;
      storageManager.saveCharacter(this.char);
    });

    document.getElementById('btn-add-session-entry').addEventListener('click', () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const title = prompt('Enter game session title:', `Session of ${dateStr}`);
      if (!title) return;
      const notes = prompt('Enter session notes / recap:', 'Infiltration into villain stronghold; gained 1 PP.');

      if (!this.char.historyLog) this.char.historyLog = [];
      this.char.historyLog.unshift({
        id: 'sess_' + Date.now(),
        date: dateStr,
        time: timeStr,
        title,
        notes: notes || ''
      });

      this.saveAndAudit();
      this.renderHistoryTab();
    });
  }

  // =======================================================
  // 15. SETTINGS & DISCORD
  // =======================================================
  setupSettingsTab() {
    document.getElementById('settings-discord-url').value = discordIntegrator.webhookUrl;
    document.getElementById('settings-discord-botname').value = discordIntegrator.botName;
    document.getElementById('settings-discord-toggle').checked = discordIntegrator.enabled;

    document.getElementById('btn-save-discord-config').addEventListener('click', () => {
      discordIntegrator.saveSettings({
        webhookUrl: document.getElementById('settings-discord-url').value,
        enabled: document.getElementById('settings-discord-toggle').checked,
        botName: document.getElementById('settings-discord-botname').value
      });
      alert('Discord settings saved!');
    });

    document.getElementById('btn-test-discord-echo').addEventListener('click', async () => {
      try {
        await discordIntegrator.testConnection();
        alert('Test notification sent to Discord!');
      } catch (err) {
        alert('Discord test failed: ' + err.message);
      }
    });

    document.getElementById('settings-campaign-pl').value = this.char.powerLevel || 10;
    document.getElementById('settings-campaign-budget').value = this.char.powerPointsBudget || 150;

    document.getElementById('btn-apply-campaign-rules').addEventListener('click', () => {
      this.char.powerLevel = parseInt(document.getElementById('settings-campaign-pl').value, 10) || 10;
      this.char.powerPointsBudget = parseInt(document.getElementById('settings-campaign-budget').value, 10) || 150;
      this.saveAndAudit();
      this.renderAll();
      alert(`Updated to PL ${this.char.powerLevel} (${this.char.powerPointsBudget} PP)!`);
    });
  }

  // =======================================================
  // 16. MASTER RENDER ALL
  // =======================================================
  saveAndAudit() {
    storageManager.saveCharacter(this.char);
    return auditCharacter(this.char);
  }

  renderAll() {
    const audit = this.saveAndAudit();
    this.renderHeaderStatus();
    this.renderActionCenter(audit);
    this.renderAbilitiesTab(audit);
    this.renderSkillsTab(audit);
    this.renderAdvantagesTab(audit);
    this.renderPowersTab(audit);
    this.renderGearTab(audit);
    this.renderHistoryTab();
  }

  renderHeaderStatus() {
    const audit = auditCharacter(this.char);
    document.getElementById('header-pp-used').textContent = `${audit.totalSpent} / ${audit.budget} used`;
    document.getElementById('header-pl-display').textContent = `PL ${audit.powerLevel}`;
    document.getElementById('header-hp-val').textContent = this.char.heroPoints ?? 1;

    document.getElementById('header-player-name').value = this.char.playerName || '';
    document.getElementById('header-char-name').value = this.char.name || '';
    document.getElementById('header-campaign-name').value = this.char.campaign || 'Earth-Prime';
  }

  renderActionCenter(audit) {
    document.getElementById('action-bruise-val').textContent = this.char.bruises || 0;

    const conds = this.char.conditions || {};
    ['dazed', 'staggered', 'vulnerable', 'defenseless'].forEach(c => {
      const btn = document.getElementById(`cond-btn-${c}`);
      if (btn) btn.classList.toggle('btn-danger', !!conds[c]);
    });

    // Defenses Grid
    const defGrid = document.getElementById('action-defenses-grid');
    defGrid.innerHTML = '';
    const bruises = this.char.bruises || 0;

    DEFENSES.forEach(def => {
      const box = document.createElement('div');
      box.style.cssText = 'background-color: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.5rem; text-align: center;';

      let score = audit.computedDefenses[def.id] || 0;
      let effectiveScore = score;
      if (def.id === 'toughness') effectiveScore = score - bruises;

      box.innerHTML = `
        <div style="font-size: var(--font-size-xs); font-weight: 800; color: var(--text-muted); text-transform: uppercase;">${def.name}</div>
        <div style="font-size: var(--font-size-xl); font-weight: 900; color: var(--text-bright);">${effectiveScore}</div>
        ${def.id === 'toughness' && bruises > 0 ? `<div style="font-size: 0.65rem; color: var(--hero-red);">(-${bruises} bruises)</div>` : ''}
        <button class="btn-touch-roll defense" style="margin-top: 0.35rem; width: 100%;" data-def="${def.id}">🎲 Save</button>
      `;

      box.querySelector('button').addEventListener('click', () => {
        const dcPrompt = prompt(`Enter DC for ${def.name} check (or leave blank for raw check):`, def.id === 'toughness' ? '20' : '15');
        const targetDC = dcPrompt !== null && dcPrompt.trim() !== '' ? parseInt(dcPrompt, 10) : null;

        const roll = diceRoller.rollCheck({
          title: `${def.name} Defense Check`,
          characterName: this.char.name,
          modifier: effectiveScore,
          targetDC,
          rollType: def.id === 'toughness' ? 'toughness' : 'defense',
          extraText: def.id === 'toughness' && bruises > 0 ? `Bruise Penalty: -${bruises}` : ''
        });

        if (def.id === 'toughness' && roll.outcomeClass === 'failure') {
          this.char.bruises = (this.char.bruises || 0) + 1;
          if (roll.degrees >= 2) this.char.conditions.dazed = true;
          if (roll.degrees >= 3) this.char.conditions.staggered = true;
          this.saveAndAudit();
          this.renderActionCenter(auditCharacter(this.char));
        }

        discordIntegrator.sendRollEmbed(roll);
      });

      defGrid.appendChild(box);
    });

    // Attacks Table
    const attacksTbody = document.getElementById('action-attacks-tbody');
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

    const unarmedRow = document.createElement('tr');
    unarmedRow.innerHTML = `
      <td><strong>👊 Unarmed Strike</strong></td>
      <td>Close • Bludgeoning</td>
      <td><span style="font-weight: 800; color: var(--hero-blue);">+${unarmedBonus}</span></td>
      <td>Damage ${str} (DC ${15 + str})</td>
      <td style="text-align: right;">
        <button class="btn-touch-roll attack">🎲 Attack</button>
      </td>
    `;
    unarmedRow.querySelector('button').addEventListener('click', () => {
      const defTarget = prompt('Enter Target Parry Defense:', '15');
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

    // Power Attacks
    (this.char.powers || []).forEach(p => {
      if (p.effect?.isAttack || ['damage', 'blast', 'affliction', 'move_object'].includes(p.effect?.id)) {
        const isRanged = p.range === 'Ranged' || p.effect?.id === 'blast';
        const dex = parseInt(this.char.abilities?.dex, 10) || 0;
        let bonus = isRanged ? dex : fgt;

        (p.extras || []).forEach(ex => {
          if (ex.id === 'accurate') bonus += (parseInt(ex.rank, 10) || 1) * 2;
        });

        const rank = parseInt(p.rank, 10) || 1;
        const dc = (p.effect?.dcBase || 15) + rank;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><strong>⚡ ${p.name}</strong></td>
          <td>${p.range} • ${p.descriptor}</td>
          <td><span style="font-weight: 800; color: var(--hero-blue);">+${bonus}</span></td>
          <td>Rank ${rank} (DC ${dc})</td>
          <td style="text-align: right;">
            <button class="btn-touch-roll attack">🎲 Attack</button>
          </td>
        `;
        row.querySelector('button').addEventListener('click', () => {
          const defTarget = prompt(`Enter Target Defense for ${p.name}:`, '15');
          const targetDC = defTarget !== null && defTarget.trim() !== '' ? parseInt(defTarget, 10) : null;
          const roll = diceRoller.rollCheck({
            title: `Attack: ${p.name}`,
            characterName: this.char.name,
            modifier: bonus,
            targetDC,
            rollType: 'attack',
            damageRank: rank,
            descriptor: p.descriptor
          });
          discordIntegrator.sendRollEmbed(roll);
        });
        attacksTbody.appendChild(row);
      }
    });

    // Known Skills Quick Checks
    const skillsTbody = document.getElementById('action-skills-tbody');
    skillsTbody.innerHTML = '';
    audit.computedSkills.forEach(sk => {
      if (sk.ranks > 0) {
        const skillDef = SKILLS_LIST.find(s => s.id === sk.id);
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <span class="rules-link" data-name="${sk.name}" data-desc="${skillDef?.desc || ''}" data-cat="Official 3E Skill">
              ${sk.name}${sk.specialty ? ` (${sk.specialty})` : ''}
            </span>
          </td>
          <td>${sk.ability.toUpperCase()}</td>
          <td><strong style="color: var(--hero-cyan); font-size: var(--font-size-md);">${sk.totalBonus >= 0 ? '+' : ''}${sk.totalBonus}</strong></td>
          <td style="text-align: right;">
            <button class="btn-touch-roll" style="min-height: 32px;">🎲 Roll</button>
          </td>
        `;
        row.querySelector('button').addEventListener('click', () => {
          const dcPrompt = prompt(`Enter DC for ${sk.name} check:`, '15');
          const targetDC = dcPrompt !== null && dcPrompt.trim() !== '' ? parseInt(dcPrompt, 10) : null;
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
  }

  // =======================================================
  // 17. ABILITIES & DEFENSES TAB
  // =======================================================
  renderAbilitiesTab(audit) {
    document.getElementById('abilities-cost-display').textContent = `${audit.abilitiesCost} PP`;
    document.getElementById('defenses-cost-display').textContent = `${audit.defensesCost} PP`;

    const abGrid = document.getElementById('abilities-stepper-grid');
    abGrid.innerHTML = '';

    ABILITIES.forEach(ab => {
      const val = parseInt(this.char.abilities?.[ab.id], 10) || 0;
      const card = document.createElement('div');
      card.style.cssText = 'background-color: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.5rem; text-align: center;';
      card.innerHTML = `
        <div style="font-size: var(--font-size-xs); font-weight: 800; color: var(--text-muted);">
          <span class="rules-link" data-name="${ab.name}" data-desc="${ab.desc}" data-cat="Ability">${ab.name} (${ab.short})</span>
        </div>
        <div style="font-size: 0.7rem; color: var(--hero-gold);">${val * 2} PP</div>
        <div class="stepper-control" style="margin-top: 0.35rem; width: 100%; justify-content: center;">
          <button class="btn-stepper compact" data-ab="${ab.id}" data-dir="-1">-</button>
          <span class="stepper-value compact">${val}</span>
          <button class="btn-stepper compact" data-ab="${ab.id}" data-dir="1">+</button>
        </div>
        ${ab.id === 'str' ? `<div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 2px;">Lift: ${getStrengthLiftingCapacity(val)}</div>` : ''}
      `;

      card.querySelectorAll('.btn-stepper').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10);
          this.char.abilities[ab.id] = Math.max(-5, (parseInt(this.char.abilities[ab.id], 10) || 0) + dir);
          this.renderAll();
        });
      });

      abGrid.appendChild(card);
    });

    const defGrid = document.getElementById('defenses-stepper-grid');
    defGrid.innerHTML = '';

    DEFENSES.forEach(def => {
      const baseVal = parseInt(this.char.abilities?.[def.ability], 10) || 0;
      const bought = parseInt(this.char.defenses?.[def.id], 10) || 0;
      const total = audit.computedDefenses[def.id] || 0;

      const card = document.createElement('div');
      card.style.cssText = 'background-color: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.5rem; text-align: center;';
      card.innerHTML = `
        <div style="font-size: var(--font-size-xs); font-weight: 800; color: var(--text-muted);">
          <span class="rules-link" data-name="${def.name}" data-desc="${def.desc}" data-cat="Defense">${def.name}</span>
        </div>
        <div style="font-size: var(--font-size-lg); font-weight: 900; color: var(--text-bright);">${total}</div>
        <div style="font-size: 0.65rem; color: var(--text-muted);">Base (${baseVal}) + Bought (${bought})</div>
        <div class="stepper-control" style="margin-top: 0.35rem; width: 100%; justify-content: center;">
          <button class="btn-stepper compact" data-def="${def.id}" data-dir="-1">-</button>
          <span class="stepper-value compact">${bought}</span>
          <button class="btn-stepper compact" data-def="${def.id}" data-dir="1">+</button>
        </div>
      `;

      card.querySelectorAll('.btn-stepper').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10);
          if (!this.char.defenses) this.char.defenses = {};
          this.char.defenses[def.id] = Math.max(0, (parseInt(this.char.defenses[def.id], 10) || 0) + dir);
          this.renderAll();
        });
      });

      defGrid.appendChild(card);
    });

    const pl2 = audit.powerLevel * 2;
    document.getElementById('pl-caps-report').innerHTML = `
      <div style="background-color: var(--bg-input); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <strong>Dodge + Toughness:</strong> ${audit.computedDefenses.dodge + audit.computedDefenses.toughness} / ${pl2}
      </div>
      <div style="background-color: var(--bg-input); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <strong>Parry + Toughness:</strong> ${audit.computedDefenses.parry + audit.computedDefenses.toughness} / ${pl2}
      </div>
      <div style="background-color: var(--bg-input); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <strong>Fortitude + Will:</strong> ${audit.computedDefenses.fortitude + audit.computedDefenses.will} / ${pl2}
      </div>
    `;
  }

  // =======================================================
  // 18. SKILLS CATALOG TAB
  // =======================================================
  renderSkillsTab(audit) {
    document.getElementById('skills-cost-display').textContent = `${audit.skillsCost} PP`;
    const tbody = document.getElementById('skills-catalog-tbody');
    tbody.innerHTML = '';

    SKILLS_LIST.forEach(skillDef => {
      const existing = (this.char.skills || []).find(s => s.id === skillDef.id);
      const ranks = existing ? (parseInt(existing.ranks, 10) || 0) : 0;
      const specialty = existing?.specialty || '';
      const baseVal = parseInt(this.char.abilities?.[skillDef.ability], 10) || 0;
      const totalBonus = baseVal + ranks;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <span class="rules-link" data-name="${skillDef.name}" data-desc="${skillDef.desc}" data-cat="Official 3E Skill">
            ${skillDef.name}
          </span>
          ${skillDef.hasSpecialty ? `<span style="font-size: 0.75rem; color: var(--hero-gold); margin-left: 0.5rem;">[${specialty || 'No Specialty'}]</span>` : ''}
        </td>
        <td>${skillDef.ability.toUpperCase()}</td>
        <td>${baseVal >= 0 ? '+' : ''}${baseVal}</td>
        <td>
          <div class="stepper-control">
            <button class="btn-stepper compact" data-skill="${skillDef.id}" data-dir="-1">-</button>
            <span class="stepper-value compact">${ranks}</span>
            <button class="btn-stepper compact" data-skill="${skillDef.id}" data-dir="1">+</button>
          </div>
        </td>
        <td><strong style="color: var(--hero-cyan); font-size: var(--font-size-md);">${totalBonus >= 0 ? '+' : ''}${totalBonus}</strong></td>
        <td style="text-align: right;">
          ${skillDef.hasSpecialty ? `
            <button class="btn btn-outline" style="min-height: 32px; font-size: var(--font-size-xs);" data-prebuilt-skill="${skillDef.id}">+ Specialty</button>
          ` : `<span></span>`}
        </td>
      `;

      row.querySelectorAll('.btn-stepper').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10);
          this.updateSkillRanks(skillDef.id, skillDef.name, ranks + dir);
        });
      });

      if (skillDef.hasSpecialty) {
        row.querySelector('[data-prebuilt-skill]').addEventListener('click', () => {
          this.openPrebuiltOptionsModal(`Select Specialty for ${skillDef.name}`, skillDef.options, (selected) => {
            this.setSkillSpecialty(skillDef.id, skillDef.name, selected);
          });
        });
      }

      tbody.appendChild(row);
    });
  }

  updateSkillRanks(id, name, newRanks) {
    if (!this.char.skills) this.char.skills = [];
    let item = this.char.skills.find(s => s.id === id);
    if (!item) {
      item = { id, name, ranks: 0 };
      this.char.skills.push(item);
    }
    item.ranks = Math.max(0, newRanks);
    this.renderAll();
  }

  setSkillSpecialty(id, name, specialty) {
    if (!this.char.skills) this.char.skills = [];
    let item = this.char.skills.find(s => s.id === id);
    if (!item) {
      item = { id, name, ranks: 0 };
      this.char.skills.push(item);
    }
    item.specialty = specialty;
    this.saveAndAudit();
    this.renderAll();
  }

  // =======================================================
  // 19. ADVANTAGES CATALOG TAB
  // =======================================================
  renderAdvantagesTab(audit) {
    document.getElementById('advantages-cost-display').textContent = `${audit.advantagesCost} PP`;
    const grid = document.getElementById('advantages-catalog-grid');
    grid.innerHTML = '';

    const search = (document.getElementById('adv-search-box')?.value || '').toLowerCase();
    const filterCat = document.getElementById('adv-filter-cat')?.value || 'all';

    ADVANTAGES_DATABASE.forEach(advDef => {
      if (filterCat !== 'all' && advDef.category !== filterCat) return;
      if (search && !advDef.name.toLowerCase().includes(search) && !advDef.desc.toLowerCase().includes(search)) return;

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
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <span class="rules-link" data-name="${advDef.name}" data-desc="${advDef.desc}" data-cat="${advDef.category} Advantage">
              ${advDef.name}
            </span>
            <span style="font-size: 0.65rem; background: rgba(255,255,255,0.06); padding: 0.1rem 0.35rem; border-radius: 3px;">${advDef.category}</span>
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted);">${advDef.desc.substring(0, 95)}...</div>
          ${existing?.note ? `<div style="font-size: 0.7rem; color: var(--hero-gold); margin-top: 0.25rem;">[${existing.note}]</div>` : ''}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; border-top: 1px solid var(--border-color); padding-top: 0.45rem;">
          ${advDef.maxRank > 1 ? `
            <div class="stepper-control">
              <button class="btn-stepper compact" data-adv="${advDef.id}" data-dir="-1">-</button>
              <span class="stepper-value compact">${currentRank}</span>
              <button class="btn-stepper compact" data-adv="${advDef.id}" data-dir="1">+</button>
            </div>
          ` : `<span></span>`}

          <div style="display: flex; gap: 0.35rem;">
            ${advDef.hasOptions ? `
              <button class="btn btn-outline" style="min-height: 32px; font-size: var(--font-size-xs);" data-opt-adv="${advDef.id}">+ Option</button>
            ` : ''}
            <button class="btn ${isSelected ? 'btn-danger' : 'btn-primary'}" style="min-height: 32px; font-size: var(--font-size-xs);" data-toggle-adv="${advDef.id}">
              ${isSelected ? 'Remove' : '+ Add'}
            </button>
          </div>
        </div>
      `;

      card.querySelectorAll('.btn-stepper').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10);
          this.setAdvantageRank(advDef.id, advDef.name, currentRank + dir, advDef.maxRank);
        });
      });

      card.querySelector('[data-toggle-adv]').addEventListener('click', () => {
        if (!this.char.advantages) this.char.advantages = [];
        if (isSelected) {
          this.char.advantages = this.char.advantages.filter(a => a.id !== advDef.id);
        } else {
          this.char.advantages.push({ id: advDef.id, name: advDef.name, rank: 1 });
        }
        this.renderAll();
      });

      if (advDef.hasOptions) {
        card.querySelector('[data-opt-adv]').addEventListener('click', () => {
          this.openPrebuiltOptionsModal(`Select Option for ${advDef.name}`, advDef.options, (selected) => {
            let item = (this.char.advantages || []).find(a => a.id === advDef.id);
            if (!item) {
              item = { id: advDef.id, name: advDef.name, rank: 1 };
              this.char.advantages.push(item);
            }
            item.note = selected;
            this.saveAndAudit();
            this.renderAll();
          });
        });
      }

      grid.appendChild(card);
    });

    const searchBox = document.getElementById('adv-search-box');
    if (!searchBox.dataset.wired) {
      searchBox.dataset.wired = 'true';
      searchBox.addEventListener('input', () => this.renderAdvantagesTab(auditCharacter(this.char)));
      document.getElementById('adv-filter-cat').addEventListener('change', () => this.renderAdvantagesTab(auditCharacter(this.char)));
    }
  }

  setAdvantageRank(id, name, rank, maxRank) {
    if (!this.char.advantages) this.char.advantages = [];
    const val = Math.max(0, Math.min(maxRank, rank));
    if (val === 0) {
      this.char.advantages = this.char.advantages.filter(a => a.id !== id);
    } else {
      let item = this.char.advantages.find(a => a.id === id);
      if (!item) {
        item = { id, name, rank: val };
        this.char.advantages.push(item);
      } else {
        item.rank = val;
      }
    }
    this.renderAll();
  }

  // =======================================================
  // 20. PREBUILT OPTIONS MODAL
  // =======================================================
  openPrebuiltOptionsModal(title, optionsList, onSelectCallback) {
    document.getElementById('prebuilt-modal-title').textContent = title;
    const container = document.getElementById('prebuilt-options-list');
    container.innerHTML = '';

    (optionsList || []).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline';
      btn.style.cssText = 'text-align: left; justify-content: flex-start; padding: 0.5rem 0.85rem;';
      btn.textContent = opt;

      btn.addEventListener('click', () => {
        onSelectCallback(opt);
        this.closeModal('modal-prebuilt-options');
      });

      container.appendChild(btn);
    });

    document.getElementById('btn-close-prebuilt').addEventListener('click', () => {
      this.closeModal('modal-prebuilt-options');
    });

    this.openModal('modal-prebuilt-options');
  }

  // =======================================================
  // 21. POWERS TAB RENDER
  // =======================================================
  renderPowersTab(audit) {
    document.getElementById('powers-cost-display').textContent = `${audit.powersCost} PP`;
    const list = document.getElementById('character-powers-list');
    list.innerHTML = '';

    if (!this.char.powers || this.char.powers.length === 0) {
      list.innerHTML = `<div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: var(--font-size-sm);">
        No powers built yet. Choose a profile from the <strong>Power Profiles Library</strong> above or click <strong>Custom Power Builder</strong>.
      </div>`;
      return;
    }

    this.char.powers.forEach((p, idx) => {
      const cost = calculatePowerCost(p);
      const isDevice = p.flaws?.some(f => f.isDevice);

      const card = document.createElement('div');
      card.style.cssText = `
        background-color: var(--bg-input);
        border: 1px solid var(--border-color);
        ${isDevice ? 'border-left: 4px solid var(--hero-gold);' : ''}
        border-radius: var(--radius-sm);
        padding: 0.65rem 0.85rem;
      `;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
          <strong style="color: var(--text-bright); font-size: var(--font-size-md);">⚡ ${p.name} (Rank ${p.rank})</strong>
          <span class="pp-status-value">${cost} PP</span>
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--hero-cyan); font-weight: 600;">
          [${p.descriptor}] • ${p.action} • ${p.range} • ${p.duration}
        </div>
        ${p.notes ? `<div style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: 0.25rem;">${p.notes}</div>` : ''}
        
        <div style="display: flex; justify-content: flex-end; gap: 0.35rem; margin-top: 0.45rem;">
          <button class="btn btn-outline" style="min-height: 28px; font-size: var(--font-size-xs);" data-edit-p="${p.id}">✏️ Edit</button>
          <button class="btn btn-danger" style="min-height: 28px; font-size: var(--font-size-xs);" data-del-p="${p.id}">🗑️ Delete</button>
        </div>
      `;

      card.querySelector('[data-edit-p]').addEventListener('click', () => {
        this.openCustomPowerBuilder(p);
      });

      card.querySelector('[data-del-p]').addEventListener('click', () => {
        if (confirm(`Delete "${p.name}"?`)) {
          this.char.powers.splice(idx, 1);
          this.saveAndAudit();
          this.renderAll();
        }
      });

      list.appendChild(card);
    });
  }

  // =======================================================
  // 22. GEAR & HQ RENDER
  // =======================================================
  renderGearTab(audit) {
    let eqAdvRanks = 0;
    (this.char.advantages || []).forEach(a => { if (a.id === 'equipment') eqAdvRanks += parseInt(a.rank, 10) || 1; });
    const epBudget = eqAdvRanks * 5;

    let gearSpent = 0;
    (this.char.gear || []).forEach(g => gearSpent += parseInt(g.cost, 10) || 0);

    const hq = this.char.hq || {};
    const sizeDef = HQ_SIZES_TABLE.find(s => s.name === hq.size) || { ep: 0 };
    const toughCost = Math.max(0, (hq.toughness || 8) - 8);
    const featuresCost = (hq.features || []).length;
    const hqTotalEp = Math.max(0, sizeDef.ep + toughCost + featuresCost);

    document.getElementById('gear-ep-badge').textContent = `${gearSpent + hqTotalEp} / ${epBudget} EP Used`;
    document.getElementById('hq-ep-badge').textContent = `Total HQ: ${hqTotalEp} EP`;

    const tbody = document.getElementById('gear-items-tbody');
    tbody.innerHTML = '';
    (this.char.gear || []).forEach((item, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td><strong style="color: var(--hero-gold);">${item.cost} EP</strong></td>
        <td>${item.desc || ''}</td>
        <td style="text-align: right;">
          <button class="btn btn-danger" style="min-height: 28px; font-size: var(--font-size-xs);">🗑️</button>
        </td>
      `;
      row.querySelector('button').addEventListener('click', () => {
        this.char.gear.splice(idx, 1);
        this.saveAndAudit();
        this.renderGearTab(auditCharacter(this.char));
      });
      tbody.appendChild(row);
    });

    document.getElementById('hq-name-input').value = hq.name || '';
    document.getElementById('hq-size-select').value = hq.size || 'Small';
    document.getElementById('hq-tough-val').textContent = hq.toughness || 8;

    document.querySelectorAll('.hq-feat-checkbox').forEach(cb => {
      cb.checked = (hq.features || []).includes(cb.dataset.featId);
    });
  }

  // =======================================================
  // 23. HISTORY TAB RENDER
  // =======================================================
  renderHistoryTab() {
    const list = document.getElementById('session-log-list');
    list.innerHTML = '';

    if (!this.char.historyLog || this.char.historyLog.length === 0) {
      list.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: var(--font-size-xs); padding: 1rem;">
        No game sessions logged yet. Click "+ Log Game Session" to record session recaps, dates, and campaign notes.
      </div>`;
      return;
    }

    this.char.historyLog.forEach((sess, idx) => {
      const entry = document.createElement('div');
      entry.className = 'history-entry';
      entry.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
          <strong style="color: var(--hero-cyan);">${sess.title}</strong>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${sess.date} • ${sess.time}</span>
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-bright);">${sess.notes}</div>
        <div style="text-align: right; margin-top: 0.25rem;">
          <button class="btn btn-danger" style="min-height: 24px; padding: 0.1rem 0.35rem; font-size: 0.65rem;">Delete</button>
        </div>
      `;
      entry.querySelector('button').addEventListener('click', () => {
        this.char.historyLog.splice(idx, 1);
        this.saveAndAudit();
        this.renderHistoryTab();
      });
      list.appendChild(entry);
    });
  }

  openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }

  closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
