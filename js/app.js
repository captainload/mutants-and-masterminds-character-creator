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
  getStrengthLiftingCapacity,
  getTraitDefinition,
  computePowerRangeAndDuration,
  validateModifierLegality
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
import { DiscordConfig, discordIntegrator } from './discord.js';
import { helpManager } from './help.js';
import { storageManager } from './storage.js';
import { BASIC_CONDITIONS, COMBINED_CONDITIONS, calculateConditionModifiers } from './conditions.js';

class AppController {
  constructor() {
    this.char = storageManager.getActiveCharacter();
    this.activePowerEditing = null;
    this.currentFileHandle = null;
    this.expandedPowerIds = new Set();

    // Interactive Archetype Wizard State (No default archetype loaded)
    this.wizardState = {
      step: 1,
      selectedArchetypeId: null,
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
    this.setupDiceRollerBar();
    this.setupTables();
    this.setupMenuDropdown();
    this.setupCharacterModals();
    this.setupSettingsFlyout();
    this.setupHelpModal();
    this.setupHeroPointModal();
    this.setupPointerPopup();
    this.setupPowerProfiles();
    this.setupCustomPowerBuilder();
    this.setupGearAndHQ();
    this.setupHistoryTab();
    this.setupArchetypeWizard();
    this.setupUpdateChecker();
    this.renderAll();
    this.checkForUpdates({ isManual: false });
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
        if (!this.wizardState.selectedArchetypeId) {
          alert('Please select an archetype from the list before proceeding.');
          return;
        }
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
      selectedArchetypeId: null,
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
    nextBtn.textContent = this.wizardState.step === 3 ? '⚡ Apply Archetype' : 'Next Step ➜';

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
    const activeName = this.char.name || 'Current Character';
    const confirmed = window.confirm(
      `⚠️ WARNING: Applying this archetype will overwrite all currently loaded character data for "${activeName}".\n\nAre you sure you want to proceed and replace the active character?`
    );
    if (!confirmed) {
      return;
    }

    const heroName = (document.getElementById('wizard-hero-name')?.value || this.wizardState.heroName || 'Champion').trim();
    const newHero = buildCustomizedArchetype(
      this.wizardState.selectedArchetypeId,
      heroName,
      this.wizardState.selectedSpecializationId,
      this.wizardState.selectedComplication
    );

    newHero.id = this.char.id; // overwrite active character slot
    newHero.userApplied = true;
    this.char = newHero;
    storageManager.saveCharacter(this.char);
    this.closeModal('modal-archetype-wizard');
    this.renderAll();
    alert(`Archetype successfully applied! "${newHero.name}" is now the active character.`);
  }

  getCurrentDC() {
    const isDcActive = !!document.getElementById('action-dc-enable')?.checked;
    if (!isDcActive) return null;
    const dcValEl = document.getElementById('action-dc-val');
    return parseInt(dcValEl?.textContent, 10) || 15;
  }

  // =======================================================
  // 6. DICE ROLLER BAR & RESULT DISPLAY
  // =======================================================
  setupDiceRollerBar() {
    const rollBtn = document.getElementById('btn-action-roll-dice');
    const input = document.getElementById('action-dice-input');
    const dcValEl = document.getElementById('action-dc-val');
    const dcCheckbox = document.getElementById('action-dc-enable');
    const dcStepperControl = document.getElementById('action-dc-stepper-control');
    const dcMinusBtn = document.getElementById('btn-action-dc-minus');
    const dcPlusBtn = document.getElementById('btn-action-dc-plus');
    const dcLabel = document.getElementById('action-dc-label');
    let targetDC = 15;

    const updateDcState = () => {
      const active = !!dcCheckbox?.checked;
      if (dcStepperControl) dcStepperControl.style.opacity = active ? '1' : '0.45';
      if (dcMinusBtn) dcMinusBtn.disabled = !active;
      if (dcPlusBtn) dcPlusBtn.disabled = !active;
      if (dcLabel) dcLabel.style.color = active ? 'var(--hero-cyan)' : 'var(--text-muted)';
    };

    dcCheckbox?.addEventListener('change', () => {
      updateDcState();
    });
    updateDcState();

    dcMinusBtn?.addEventListener('click', () => {
      if (!dcCheckbox?.checked) return;
      targetDC = Math.max(0, targetDC - 1);
      if (dcValEl) dcValEl.textContent = targetDC;
    });

    dcPlusBtn?.addEventListener('click', () => {
      if (!dcCheckbox?.checked) return;
      targetDC++;
      if (dcValEl) dcValEl.textContent = targetDC;
    });

    const executeRoll = () => {
      const raw = input.value.trim().toLowerCase();
      if (raw === 'init' || raw === 'initiative' || raw === '/init' || raw === '/initiative') {
        document.getElementById('btn-roll-initiative')?.click();
        return;
      }
      const notation = input.value.trim() || 'd20';
      const dcCurrent = this.getCurrentDC();

      try {
        const roll = diceRoller.rollNotation(notation, this.char.name, dcCurrent);
        this.displayRollResult(roll);
      } catch (err) {
        alert(err.message);
      }
    };

    rollBtn?.addEventListener('click', executeRoll);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') executeRoll();
    });

    // Initiative Roll Button
    document.getElementById('btn-roll-initiative')?.addEventListener('click', () => {
      const mods = calculateConditionModifiers(this.char.conditions || {}, this.char.bruises || 0);
      const agi = parseInt(this.char.abilities?.agi, 10) || 0;
      let impInitRanks = 0;
      (this.char.advantages || []).forEach(a => {
        if (a.id === 'improved_initiative') impInitRanks += parseInt(a.rank, 10) || 1;
      });
      const baseMod = agi + (impInitRanks * 4);
      const effMod = baseMod + mods.checkPenalty;

      diceRoller.rollCheck({
        title: 'Initiative',
        characterName: this.char.name,
        modifier: effMod,
        rollType: 'initiative',
        targetDC: null,
        extraText: `AGI ${agi >= 0 ? '+' + agi : agi}${impInitRanks > 0 ? `, Imp Init +${impInitRanks * 4}` : ''}${mods.checkPenalty ? ` ${mods.checkPenalty} Cond` : ''}`
      });
    });

    // Bruises Steppers
    document.getElementById('btn-bruise-plus')?.addEventListener('click', () => {
      this.char.bruises = (this.char.bruises || 0) + 1;
      this.saveAndAudit();
      this.renderActionCenter(auditCharacter(this.char));
    });

    document.getElementById('btn-bruise-minus')?.addEventListener('click', () => {
      if ((this.char.bruises || 0) > 0) {
        this.char.bruises--;
        this.saveAndAudit();
        this.renderActionCenter(auditCharacter(this.char));
      }
    });

    // Reset All Damage & Conditions
    document.getElementById('btn-action-clear-damage')?.addEventListener('click', () => {
      this.char.bruises = 0;
      this.char.conditions = {};
      delete this.char.activeCombinedCondition;
      this.saveAndAudit();
      this.renderActionCenter(auditCharacter(this.char));
    });

    // Combined Conditions Dropdown
    document.getElementById('select-combined-condition')?.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (!this.char.conditions) this.char.conditions = {};

      if (this.char.activeCombinedCondition) {
        const prevDef = COMBINED_CONDITIONS.find(c => c.id === this.char.activeCombinedCondition);
        if (prevDef) {
          prevDef.constituents.forEach(bId => {
            delete this.char.conditions[bId];
          });
        }
      }

      if (selectedId) {
        const newDef = COMBINED_CONDITIONS.find(c => c.id === selectedId);
        if (newDef) {
          newDef.constituents.forEach(bId => {
            this.char.conditions[bId] = true;
          });
          this.char.activeCombinedCondition = selectedId;
        }
      } else {
        delete this.char.activeCombinedCondition;
      }

      this.saveAndAudit();
      this.renderActionCenter(auditCharacter(this.char));
    });

    // Wire global roller listener
    diceRoller.onRoll((roll) => this.displayRollResult(roll));
  }

  displayRollResult(roll) {
    const resEl = document.getElementById('action-dice-result');
    if (!resEl) return;

    resEl.className = 'dice-result-badge';

    // Special handling for Initiative: turn order only, no DC, no success/failure
    if (roll.rollType === 'initiative') {
      resEl.classList.add('result-initiative');
      const modStr = roll.modifier >= 0 ? '+' + roll.modifier : roll.modifier;
      const formula = `d20(${roll.rawDie})${modStr}${roll.extraText ? ` (${roll.extraText})` : ''}`;
      resEl.innerHTML = `
        <strong style="color: #fff; margin-right: 0.4rem;">${roll.title}:</strong>
        <span style="font-size: 0.95rem; font-weight: 900; color: var(--hero-gold); margin-right: 0.4rem;">${roll.total}</span>
        <span style="color: var(--text-muted);">[${formula}]</span>
      `;
      discordIntegrator.sendRollEmbed(roll);
      return;
    }

    let outcomeTag = '';
    if (roll.isCriticalHit) {
      resEl.classList.add('result-critical');
      outcomeTag = '💥 CRIT!';
    } else if (roll.outcomeClass === 'success') {
      resEl.classList.add('result-success');
      outcomeTag = `✅ ${roll.degrees ? roll.degrees + '° ' : ''}Success`;
    } else if (roll.outcomeClass === 'failure') {
      resEl.classList.add('result-failure');
      if (roll.rollType === 'toughness' && roll.degrees) {
        const toughLabels = ['', 'Bruise', 'Dazed+Bruise', 'Staggered+Bruise', 'Incapacitated!'];
        outcomeTag = `❌ ${roll.degrees}° Fail (${toughLabels[roll.degrees] || 'Bruise'})`;
      } else {
        outcomeTag = `❌ ${roll.degrees ? roll.degrees + '° ' : ''}Fail`;
      }
    }

    const dcText = roll.targetDC !== null && roll.targetDC !== undefined ? ` vs DC ${roll.targetDC}` : '';
    const formula = roll.extraText || `d20(${roll.rawDie})${roll.modifier >= 0 ? '+' + roll.modifier : roll.modifier}`;
    resEl.innerHTML = `
      <strong style="color: #fff; margin-right: 0.4rem;">${roll.title}:</strong>
      <span style="font-size: 0.95rem; font-weight: 900; margin-right: 0.4rem;">${roll.total}</span>
      <span style="color: var(--text-muted); margin-right: 0.5rem;">[${formula}${dcText}]</span>
      ${outcomeTag ? `<span>${outcomeTag}</span>` : ''}
    `;

    discordIntegrator.sendRollEmbed(roll);
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
  formatRulesDescription(rawText) {
    if (!rawText) return '<em>No detailed description available.</em>';

    // If already contains HTML formatting, pass through cleanly
    if (rawText.includes('<p>') || rawText.includes('<ul>') || rawText.includes('<div>')) {
      return rawText;
    }

    const lines = rawText.split('\n');
    let html = '';
    let inList = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        return;
      }

      if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) {
          html += '<ul style="margin: 0.35rem 0 0.5rem 1.15rem; padding: 0;">';
          inList = true;
        }
        const itemContent = trimmed.replace(/^[•\-\*]\s*/, '');
        // Highlight prefix before colon (e.g. "Wealth:" or "Rank 1 (Well-off):")
        const formattedItem = itemContent.replace(/^([^:]+):/, '<strong style="color: var(--hero-gold);">$1:</strong>');
        html += `<li style="margin-bottom: 0.3rem;">${formattedItem}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<p style="margin: 0 0 0.5rem 0;">${trimmed}</p>`;
      }
    });

    if (inList) html += '</ul>';
    return html;
  }

  setupPointerPopup() {
    const popup = document.getElementById('pointer-rules-popup');
    window.tablesManager = tablesManager;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('.rules-link');
      if (link) {
        e.preventDefault();
        e.stopPropagation();

        const id = link.dataset.id || '';
        const type = link.dataset.type || '';
        let name = (link.dataset.name || link.textContent || '').trim();
        let cat = link.dataset.cat || 'Official 3E Rules';
        let desc = link.dataset.desc || '';

        // Close if clicking the same link a second time
        if (popup.style.display === 'block' && popup.dataset.activeItem === name) {
          popup.style.display = 'none';
          popup.dataset.activeItem = '';
          return;
        }

        // Look up rich trait details from the official rules database
        const trait = getTraitDefinition(id, type, name);
        if (trait) {
          if (trait.name) name = trait.name;
          if (trait.desc) desc = trait.desc;
          if (trait.category) cat = `${trait.category} ${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Trait'}`;
        }

        popup.dataset.activeItem = name;
        document.getElementById('popup-item-name').textContent = name;
        document.getElementById('popup-item-cat').textContent = cat;
        document.getElementById('popup-item-body').innerHTML = this.formatRulesDescription(desc);

        popup.style.display = 'block';
        const popupWidth = Math.min(440, window.innerWidth - 30);
        let posX = e.pageX + 10;
        if (posX + popupWidth > window.innerWidth) {
          posX = Math.max(10, window.innerWidth - popupWidth - 20);
        }
        let posY = e.pageY + 10;
        if (e.clientY > window.innerHeight - 340 && e.pageY > 360) {
          posY = e.pageY - 340;
        }
        popup.style.left = `${posX}px`;
        popup.style.top = `${posY}px`;
      } else if (!e.target.closest('#pointer-rules-popup')) {
        popup.style.display = 'none';
        popup.dataset.activeItem = '';
      }
    });
  }

  // =======================================================
  // 9. MENU DROP-DOWN & CHARACTER MODALS
  // =======================================================
  setupMenuDropdown() {
    const menuBtn = document.getElementById('btn-open-menu');
    const menuList = document.getElementById('menu-dropdown-list');

    if (!menuBtn || !menuList) return;

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuList.classList.toggle('show');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      const container = document.querySelector('.menu-dropdown-container');
      if (container && !container.contains(e.target)) {
        menuList.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        menuList.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    const closeDropdown = () => {
      menuList.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    // 1. New Freeform Hero
    document.getElementById('menu-action-new')?.addEventListener('click', () => {
      closeDropdown();
      const name = prompt('Enter superhero name for freeform creation:', 'New Champion');
      if (name && name.trim()) {
        const newHero = storageManager.createFreeformCharacter(name.trim(), 10, 150);
        this.char = newHero;
        this.renderAll();
      }
    });

    // 2. Save (.MM3) - Overwrite existing file version
    document.getElementById('menu-action-save')?.addEventListener('click', async () => {
      closeDropdown();
      await this.saveCharacterFile({ forceSaveAs: false });
    });

    // 3. Save As... (.MM3) - Clone with different name
    document.getElementById('menu-action-save-as')?.addEventListener('click', async () => {
      closeDropdown();
      await this.saveCharacterFile({ forceSaveAs: true });
    });

    // 4. Load Character... (.MM3) - Load from file
    document.getElementById('menu-action-load')?.addEventListener('click', async () => {
      closeDropdown();
      await this.loadCharacterFile();
    });

    // 5. Export Character (PDF)
    document.getElementById('menu-action-export-pdf')?.addEventListener('click', () => {
      closeDropdown();
      window.print();
    });

    const fileInput = document.getElementById('menu-file-input');
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const loadedChar = storageManager.parseMM3File(event.target.result);
          if (loadedChar) {
            this.char = loadedChar;
            this.currentFileHandle = null;
            this.saveAndAudit();
            this.loadCharacterToUI();
            alert(`Successfully loaded "${loadedChar.name}"!`);
          }
        } catch (err) {
          alert('Failed to load character file: ' + err.message);
        }
      };
      reader.readAsText(file);
      fileInput.value = '';
    });

    // 7. Settings Fly-out
    document.getElementById('menu-action-settings')?.addEventListener('click', () => {
      closeDropdown();
      this.openSettingsFlyout();
    });

    // 8. Help & Documentation
    document.getElementById('menu-action-help')?.addEventListener('click', () => {
      closeDropdown();
      helpManager.openToSection('help-overview');
    });

    // 9. Check for Updates
    document.getElementById('menu-action-updates')?.addEventListener('click', () => {
      closeDropdown();
      this.checkForUpdates({ isManual: true });
    });
  }

  setupUpdateChecker() {
    document.getElementById('btn-close-update-alert')?.addEventListener('click', () => this.closeModal('modal-update-alert'));
    document.getElementById('btn-update-later')?.addEventListener('click', () => this.closeModal('modal-update-alert'));
    document.getElementById('btn-update-reload')?.addEventListener('click', () => {
      window.location.reload(true);
    });
  }

  async checkForUpdates({ isManual = false } = {}) {
    const CURRENT_VERSION = '3.5';
    if (typeof window === 'undefined' || !window.location || !window.location.href || window.location.href === 'about:blank') return;
    try {
      const url = new URL('version.json', window.location.href);
      url.searchParams.set('t', Date.now().toString());
      const res = await fetch(url.toString(), { cache: 'no-store' });
      if (!res.ok) {
        if (isManual) alert('Could not check for updates (server responded with error).');
        return;
      }
      const data = await res.json();
      const remoteVersion = data.version;
      if (remoteVersion && remoteVersion !== CURRENT_VERSION) {
        const currEl = document.getElementById('update-curr-version');
        const newEl = document.getElementById('update-new-version');
        const notesEl = document.getElementById('update-notes');
        if (currEl) currEl.textContent = `v${CURRENT_VERSION}`;
        if (newEl) newEl.textContent = `v${remoteVersion}`;
        if (notesEl) notesEl.textContent = data.releaseNotes || 'Bug fixes and performance improvements.';
        this.openModal('modal-update-alert');
      } else if (isManual) {
        alert(`You are up to date! Mutants & Masterminds Character Editor is running the latest version (v${CURRENT_VERSION}).`);
      }
    } catch (err) {
      if (isManual) alert('Could not check for updates. Please check your internet connection.');
    }
  }

  setupCharacterModals() {
    // Load Modal handlers
    document.getElementById('btn-close-load-modal')?.addEventListener('click', () => {
      this.closeModal('modal-load-character');
    });
    document.getElementById('btn-cancel-load-modal')?.addEventListener('click', () => {
      this.closeModal('modal-load-character');
    });
    document.getElementById('btn-load-modal-new-freeform')?.addEventListener('click', () => {
      this.closeModal('modal-load-character');
      const name = prompt('Enter superhero name for freeform creation:', 'New Champion');
      if (name && name.trim()) {
        const newHero = storageManager.createFreeformCharacter(name.trim(), 10, 150);
        this.char = newHero;
        this.renderAll();
      }
    });

    // Save As Modal handlers
    document.getElementById('btn-close-save-as-modal')?.addEventListener('click', () => {
      this.closeModal('modal-save-as');
    });
    document.getElementById('btn-cancel-save-as')?.addEventListener('click', () => {
      this.closeModal('modal-save-as');
    });
    document.getElementById('btn-confirm-save-as')?.addEventListener('click', async () => {
      const newName = (document.getElementById('save-as-hero-name')?.value || '').trim();
      if (!newName) {
        alert('Please enter a superhero name.');
        return;
      }
      this.closeModal('modal-save-as');
      await this.saveCharacterFile({ forceSaveAs: true, cloneName: newName });
    });
  }

  openLoadCharacterModal() {
    this.renderLoadCharacterRoster();
    this.openModal('modal-load-character');
  }

  renderLoadCharacterRoster() {
    const list = document.getElementById('load-roster-list');
    if (!list) return;

    if (storageManager.characters.length === 0) {
      list.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No saved characters found.</div>`;
      return;
    }

    list.innerHTML = '';
    storageManager.characters.forEach(c => {
      const isCurrent = c.id === this.char.id;
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.65rem 0.85rem;
        background-color: ${isCurrent ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-input)'};
        border: 1px solid ${isCurrent ? 'var(--hero-cyan)' : 'var(--border-color)'};
        border-radius: var(--radius-sm);
      `;

      card.innerHTML = `
        <div style="flex: 1;">
          <div style="font-weight: 800; font-size: var(--font-size-sm); color: ${isCurrent ? 'var(--hero-cyan)' : '#fff'};">
            ${c.name || 'Unnamed Hero'} ${isCurrent ? '<span style="font-size: 0.65rem; background: var(--hero-cyan); color: #000; padding: 1px 5px; border-radius: 3px; font-weight: 800; margin-left: 0.4rem;">ACTIVE</span>' : ''}
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">
            PL ${c.powerLevel || 10} • ${c.campaign || 'Earth-Prime'} • ${c.powerPointsBudget || 150} PP
          </div>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          ${!isCurrent ? `<button class="btn btn-primary btn-load-char" data-id="${c.id}" style="font-size: 0.75rem; min-height: 30px; padding: 0.2rem 0.6rem;">Load</button>` : ''}
          <button class="btn btn-danger btn-delete-char" data-id="${c.id}" style="font-size: 0.75rem; min-height: 30px; padding: 0.2rem 0.6rem;" title="Delete hero">🗑️</button>
        </div>
      `;

      card.querySelector('.btn-load-char')?.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        storageManager.setActiveCharacter(id);
        this.char = storageManager.getActiveCharacter();
        this.renderAll();
        this.closeModal('modal-load-character');
      });

      card.querySelector('.btn-delete-char')?.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm(`Delete character "${c.name}"?`)) {
          storageManager.deleteCharacter(id);
          this.char = storageManager.getActiveCharacter();
          this.renderAll();
          this.renderLoadCharacterRoster();
        }
      });

      list.appendChild(card);
    });
  }

  openSaveAsModal() {
    const input = document.getElementById('save-as-hero-name');
    if (input) input.value = `${this.char.name} (Copy)`;
    this.openModal('modal-save-as');
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
        title: 'Hero Point Reroll',
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
      if (!this.expandedPowerIds) this.expandedPowerIds = new Set();
      this.expandedPowerIds.add(newPower.id);
      this.saveAndAudit();
      this.renderAll();
      alert(`Power Profile "${matchedProfile.name}" added to character!`);
    });

    document.getElementById('btn-open-custom-power-builder').addEventListener('click', () => {
      this.addNewCustomPower();
    });
  }

  addNewCustomPower() {
    if (!this.char.powers) this.char.powers = [];
    const baseEff = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage') || POWER_EFFECTS_CATALOG[0];
    const newPower = {
      id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: 'New Power',
      descriptor: 'Energy',
      rank: 10,
      effect: baseEff,
      action: baseEff.action || 'Standard',
      range: baseEff.range || 'Close',
      duration: baseEff.duration || 'Instant',
      extras: [],
      flaws: [],
      alternateEffects: [],
      linkedEffects: [],
      isDynamicArray: false,
      notes: ''
    };
    this.char.powers.push(newPower);
    if (!this.expandedPowerIds) this.expandedPowerIds = new Set();
    this.expandedPowerIds.add(newPower.id);
    this.saveAndAudit();
    this.renderAll();
  }

  duplicatePower(powerId) {
    const original = (this.char.powers || []).find(p => p.id === powerId);
    if (!original) return;
    const clone = JSON.parse(JSON.stringify(original));
    clone.id = 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    clone.name = `${original.name} (Copy)`;
    this.char.powers.push(clone);
    if (!this.expandedPowerIds) this.expandedPowerIds = new Set();
    this.expandedPowerIds.add(clone.id);
    this.saveAndAudit();
    this.renderAll();
  }

  deletePower(powerId) {
    const p = (this.char.powers || []).find(p => p.id === powerId);
    if (!p) return;
    if (confirm(`Delete power "${p.name}"?`)) {
      this.char.powers = this.char.powers.filter(item => item.id !== powerId);
      if (this.expandedPowerIds) this.expandedPowerIds.delete(powerId);
      this.saveAndAudit();
      this.renderAll();
    }
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
        const rd = computePowerRangeAndDuration(def);
        const rEl = document.getElementById('builder-derived-range');
        const dEl = document.getElementById('builder-derived-duration');
        if (rEl) rEl.textContent = rd.effectiveRange;
        if (dEl) dEl.textContent = rd.effectiveDuration;
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
      const rd = computePowerRangeAndDuration(powerToEdit.effect, powerToEdit.extras, powerToEdit.flaws);
      const rEl = document.getElementById('builder-derived-range');
      const dEl = document.getElementById('builder-derived-duration');
      if (rEl) rEl.textContent = rd.effectiveRange;
      if (dEl) dEl.textContent = rd.effectiveDuration;
      document.getElementById('builder-power-notes').value = powerToEdit.notes || '';
    } else {
      document.getElementById('builder-power-name').value = '';
      document.getElementById('builder-power-descriptor').value = 'Energy, Technology';
      document.getElementById('builder-rank-val').textContent = '10';
      document.getElementById('builder-base-effect').value = 'damage';
      document.getElementById('builder-action').value = 'Standard';
      const rd = computePowerRangeAndDuration(POWER_EFFECTS_CATALOG[0]);
      const rEl = document.getElementById('builder-derived-range');
      const dEl = document.getElementById('builder-derived-duration');
      if (rEl) rEl.textContent = rd.effectiveRange;
      if (dEl) dEl.textContent = rd.effectiveDuration;
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

    const rd = computePowerRangeAndDuration(effect, extras, flaws);

    return {
      id: this.activePowerEditing ? this.activePowerEditing.id : ('p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)),
      name: document.getElementById('builder-power-name').value.trim() || `${effect.name} Power`,
      descriptor: document.getElementById('builder-power-descriptor').value.trim() || 'Energy',
      rank,
      effect,
      action: document.getElementById('builder-action').value,
      range: rd.effectiveRange,
      duration: rd.effectiveDuration,
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
  // 15. SETTINGS FLY-OUT & MULTI-DISCORD CONFIGURATIONS
  // =======================================================
  setupSettingsFlyout() {
    const backdrop = document.getElementById('flyout-settings-backdrop');
    const panel = document.getElementById('flyout-settings-panel');
    const closeBtn = document.getElementById('btn-close-settings-flyout');
    const doneBtn = document.getElementById('btn-close-settings-done');

    const closeFlyout = () => {
      backdrop?.classList.remove('open');
      panel?.classList.remove('open');
    };

    closeBtn?.addEventListener('click', closeFlyout);
    doneBtn?.addEventListener('click', closeFlyout);
    backdrop?.addEventListener('click', closeFlyout);

    // Discord Add Config button
    document.getElementById('btn-discord-add-config')?.addEventListener('click', () => {
      this.openDiscordConfigEditor(null);
    });

    // Discord Help Jump button
    document.getElementById('btn-discord-help-jump')?.addEventListener('click', () => {
      closeFlyout();
      helpManager.openToSection('help-discord');
    });

    // Discord Config Editor mode switcher
    const typeWebhook = document.getElementById('discord-type-webhook');
    const typeBot = document.getElementById('discord-type-bot');
    const fieldsWebhook = document.getElementById('discord-fields-webhook');
    const fieldsBot = document.getElementById('discord-fields-bot');

    typeWebhook?.addEventListener('change', () => {
      if (typeWebhook.checked) {
        if (fieldsWebhook) fieldsWebhook.style.display = 'flex';
        if (fieldsBot) fieldsBot.style.display = 'none';
      }
    });

    typeBot?.addEventListener('change', () => {
      if (typeBot.checked) {
        if (fieldsWebhook) fieldsWebhook.style.display = 'none';
        if (fieldsBot) fieldsBot.style.display = 'flex';
      }
    });

    // Discord Save Editor
    document.getElementById('btn-discord-save-editor')?.addEventListener('click', () => {
      const mode = typeBot?.checked ? 'bot' : 'webhook';
      const configData = {
        id: this.editingDiscordConfigId || undefined,
        name: (document.getElementById('discord-input-name')?.value || '').trim(),
        serverName: (document.getElementById('discord-input-server')?.value || '').trim(),
        channelName: (document.getElementById('discord-input-channel')?.value || '').trim(),
        type: mode,
        webhookUrl: (document.getElementById('discord-input-webhook-url')?.value || '').trim(),
        botToken: (document.getElementById('discord-input-bot-token')?.value || '').trim(),
        channelId: (document.getElementById('discord-input-bot-channel-id')?.value || '').trim(),
        botName: (document.getElementById('discord-input-bot-name')?.value || '').trim(),
        avatarUrl: (document.getElementById('discord-input-avatar-url')?.value || '').trim(),
        enabled: document.getElementById('discord-input-enabled')?.checked ?? true
      };

      if (mode === 'webhook' && !configData.webhookUrl) {
        alert('Please enter a Discord Webhook URL.');
        return;
      }
      if (mode === 'bot' && (!configData.botToken || !configData.channelId)) {
        alert('Please enter both Bot Token and Channel ID for Bot mode.');
        return;
      }

      discordIntegrator.saveConfig(configData);
      this.closeDiscordConfigEditor();
      this.renderDiscordConfigsList();
    });

    // Discord Test Editor button
    document.getElementById('btn-discord-test-editor')?.addEventListener('click', async () => {
      const mode = typeBot?.checked ? 'bot' : 'webhook';
      const tempConfig = new DiscordConfig({
        name: (document.getElementById('discord-input-name')?.value || '').trim(),
        serverName: (document.getElementById('discord-input-server')?.value || '').trim(),
        channelName: (document.getElementById('discord-input-channel')?.value || '').trim(),
        type: mode,
        webhookUrl: (document.getElementById('discord-input-webhook-url')?.value || '').trim(),
        botToken: (document.getElementById('discord-input-bot-token')?.value || '').trim(),
        channelId: (document.getElementById('discord-input-bot-channel-id')?.value || '').trim(),
        botName: (document.getElementById('discord-input-bot-name')?.value || '').trim(),
        avatarUrl: (document.getElementById('discord-input-avatar-url')?.value || '').trim()
      });

      try {
        await discordIntegrator.testConfig(tempConfig);
        alert(`Test message successfully posted to ${tempConfig.getDisplayName()}!`);
      } catch (err) {
        alert(`Discord Test Failed: ${err.message}`);
      }
    });

    // Discord Cancel Editor button
    document.getElementById('btn-discord-cancel-editor')?.addEventListener('click', () => {
      this.closeDiscordConfigEditor();
    });

    // Campaign Defaults
    const campaignPlInput = document.getElementById('settings-campaign-pl');
    const campaignBudgetInput = document.getElementById('settings-campaign-budget');
    if (campaignPlInput) campaignPlInput.value = this.char.powerLevel || 10;
    if (campaignBudgetInput) campaignBudgetInput.value = this.char.powerPointsBudget || 150;

    document.getElementById('btn-apply-campaign-rules')?.addEventListener('click', () => {
      this.char.powerLevel = parseInt(campaignPlInput?.value, 10) || 10;
      this.char.powerPointsBudget = parseInt(campaignBudgetInput?.value, 10) || 150;
      this.saveAndAudit();
      this.renderAll();
      alert(`Applied: PL ${this.char.powerLevel} with ${this.char.powerPointsBudget} PP budget!`);
    });

    this.renderDiscordConfigsList();
  }

  openSettingsFlyout() {
    const backdrop = document.getElementById('flyout-settings-backdrop');
    const panel = document.getElementById('flyout-settings-panel');
    backdrop?.classList.add('open');
    panel?.classList.add('open');
    this.renderDiscordConfigsList();
  }

  renderDiscordConfigsList() {
    const container = document.getElementById('discord-configs-list-container');
    if (!container) return;

    const configs = discordIntegrator.getConfigs();
    if (configs.length === 0) {
      container.innerHTML = `
        <div style="background-color: var(--bg-input); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-color); text-align: center; color: var(--text-muted); font-size: 0.75rem;">
          No Discord channels configured. Click <strong>+ Add Channel</strong> to connect a webhook or bot.
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    configs.forEach(cfg => {
      const card = document.createElement('div');
      card.className = `discord-config-card ${cfg.enabled ? 'active-config' : ''}`;
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
          <div>
            <div style="font-weight: 800; font-size: var(--font-size-sm); color: #fff;">
              ${cfg.getDisplayName()}
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem; margin-top: 2px;">
              <span class="discord-badge ${cfg.type === 'bot' ? 'discord-badge-bot' : 'discord-badge-webhook'}">
                ${cfg.type === 'bot' ? '🤖 Bot API' : '🔗 Webhook'}
              </span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">
                ${cfg.serverName ? cfg.serverName : ''} ${cfg.channelName ? '#' + cfg.channelName : ''}
              </span>
            </div>
          </div>
          <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.72rem; font-weight: 700; cursor: pointer; color: ${cfg.enabled ? 'var(--hero-cyan)' : 'var(--text-muted)'};">
            <input type="checkbox" class="cfg-toggle-enabled" data-id="${cfg.id}" ${cfg.enabled ? 'checked' : ''}> Echo
          </label>
        </div>
        <div style="display: flex; gap: 0.35rem; justify-content: flex-end; margin-top: 0.4rem;">
          <button class="btn btn-outline cfg-btn-test" data-id="${cfg.id}" style="font-size: 0.7rem; padding: 0.15rem 0.5rem; min-height: 26px;">🔔 Test</button>
          <button class="btn btn-outline cfg-btn-edit" data-id="${cfg.id}" style="font-size: 0.7rem; padding: 0.15rem 0.5rem; min-height: 26px;">✏️ Edit</button>
          <button class="btn btn-danger cfg-btn-delete" data-id="${cfg.id}" style="font-size: 0.7rem; padding: 0.15rem 0.5rem; min-height: 26px;">🗑️</button>
        </div>
      `;

      card.querySelector('.cfg-toggle-enabled')?.addEventListener('change', (e) => {
        discordIntegrator.toggleConfigEnabled(cfg.id, e.target.checked);
        this.renderDiscordConfigsList();
      });

      card.querySelector('.cfg-btn-test')?.addEventListener('click', async () => {
        try {
          await discordIntegrator.testConfig(cfg);
          alert(`Test roll card sent to ${cfg.getDisplayName()}!`);
        } catch (err) {
          alert(`Test failed: ${err.message}`);
        }
      });

      card.querySelector('.cfg-btn-edit')?.addEventListener('click', () => {
        this.openDiscordConfigEditor(cfg.id);
      });

      card.querySelector('.cfg-btn-delete')?.addEventListener('click', () => {
        if (confirm(`Remove Discord channel "${cfg.getDisplayName()}"?`)) {
          discordIntegrator.deleteConfig(cfg.id);
          this.renderDiscordConfigsList();
        }
      });

      container.appendChild(card);
    });
  }

  openDiscordConfigEditor(configId) {
    this.editingDiscordConfigId = configId;
    const editor = document.getElementById('discord-config-editor');
    const title = document.getElementById('discord-editor-title');
    const nameInput = document.getElementById('discord-input-name');
    const serverInput = document.getElementById('discord-input-server');
    const channelInput = document.getElementById('discord-input-channel');
    const webhookUrlInput = document.getElementById('discord-input-webhook-url');
    const botTokenInput = document.getElementById('discord-input-bot-token');
    const channelIdInput = document.getElementById('discord-input-bot-channel-id');
    const botNameInput = document.getElementById('discord-input-bot-name');
    const avatarUrlInput = document.getElementById('discord-input-avatar-url');
    const enabledInput = document.getElementById('discord-input-enabled');
    const typeWebhook = document.getElementById('discord-type-webhook');
    const typeBot = document.getElementById('discord-type-bot');
    const fieldsWebhook = document.getElementById('discord-fields-webhook');
    const fieldsBot = document.getElementById('discord-fields-bot');

    if (!editor) return;
    editor.style.display = 'block';

    if (configId) {
      const cfg = discordIntegrator.getConfig(configId);
      if (title) title.textContent = `Edit Destination: ${cfg.getDisplayName()}`;
      if (nameInput) nameInput.value = cfg.name || '';
      if (serverInput) serverInput.value = cfg.serverName || '';
      if (channelInput) channelInput.value = cfg.channelName || '';
      if (webhookUrlInput) webhookUrlInput.value = cfg.webhookUrl || '';
      if (botTokenInput) botTokenInput.value = cfg.botToken || '';
      if (channelIdInput) channelIdInput.value = cfg.channelId || '';
      if (botNameInput) botNameInput.value = cfg.botName || 'M&M 3E Hero Roller';
      if (avatarUrlInput) avatarUrlInput.value = cfg.avatarUrl || '';
      if (enabledInput) enabledInput.checked = cfg.enabled;

      if (cfg.type === 'bot') {
        if (typeBot) typeBot.checked = true;
        if (fieldsWebhook) fieldsWebhook.style.display = 'none';
        if (fieldsBot) fieldsBot.style.display = 'flex';
      } else {
        if (typeWebhook) typeWebhook.checked = true;
        if (fieldsWebhook) fieldsWebhook.style.display = 'flex';
        if (fieldsBot) fieldsBot.style.display = 'none';
      }
    } else {
      if (title) title.textContent = 'Add New Discord Destination';
      if (nameInput) nameInput.value = '';
      if (serverInput) serverInput.value = '';
      if (channelInput) channelInput.value = '';
      if (webhookUrlInput) webhookUrlInput.value = '';
      if (botTokenInput) botTokenInput.value = '';
      if (channelIdInput) channelIdInput.value = '';
      if (botNameInput) botNameInput.value = 'M&M 3E Hero Roller';
      if (avatarUrlInput) avatarUrlInput.value = 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f9b8.png';
      if (enabledInput) enabledInput.checked = true;
      if (typeWebhook) typeWebhook.checked = true;
      if (fieldsWebhook) fieldsWebhook.style.display = 'flex';
      if (fieldsBot) fieldsBot.style.display = 'none';
    }
  }

  closeDiscordConfigEditor() {
    this.editingDiscordConfigId = null;
    const editor = document.getElementById('discord-config-editor');
    if (editor) editor.style.display = 'none';
  }

  // =======================================================
  // 16. SEARCHABLE HELP MODAL
  // =======================================================
  setupHelpModal() {
    helpManager.init();
    document.getElementById('btn-close-help')?.addEventListener('click', () => {
      this.closeModal('modal-help');
    });
  }

  // =======================================================
  // 15b. FILE MANAGEMENT (.MM3 FILESYSTEM & PDF EXPORT)
  // =======================================================
  async saveCharacterFile({ forceSaveAs = false, cloneName = '' } = {}) {
    let targetChar = this.char;
    if (forceSaveAs) {
      const suggestedCloneName = cloneName || `${this.char.name} (Clone)`;
      const newName = cloneName || prompt('Enter superhero name for this clone / copy:', suggestedCloneName);
      if (!newName || !newName.trim()) return; // User cancelled
      // Clone character object
      targetChar = JSON.parse(JSON.stringify(this.char));
      targetChar.id = 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
      targetChar.name = newName.trim();
      this.char = targetChar;
      this.currentFileHandle = null;
    }

    const payload = {
      format: 'MM3',
      schemaVersion: '3.0',
      exportedAt: new Date().toISOString(),
      character: targetChar
    };
    const fileContent = JSON.stringify(payload, null, 2);
    const suggestedFileName = `${(targetChar.name || 'Hero').trim().replace(/[^a-zA-Z0-9_\- ]/g, '')}.mm3`;

    // Modern browsers with File System Access API (Folder tree browser)
    if (typeof window !== 'undefined' && window.showSaveFilePicker) {
      try {
        let handle = this.currentFileHandle;
        if (forceSaveAs || !handle) {
          handle = await window.showSaveFilePicker({
            id: 'mm3_character_editor',
            startIn: 'documents',
            suggestedName: suggestedFileName,
            types: [{
              description: 'Mutants & Masterminds Character File (*.mm3)',
              accept: { 'application/x-mm3': ['.mm3'], 'application/json': ['.mm3', '.json'] }
            }]
          });
          this.currentFileHandle = handle;
        }

        const writable = await handle.createWritable();
        await writable.write(fileContent);
        await writable.close();

        this.saveAndAudit();
        this.loadCharacterToUI();
        alert(`Successfully saved "${targetChar.name}" to ${handle.name || 'file'}!`);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return; // User cancelled dialog
        console.warn('File System Access API failed, falling back to download:', err);
      }
    }

    // Fallback: download .mm3 file
    storageManager.exportCharacterToMM3(targetChar);
    this.saveAndAudit();
    this.loadCharacterToUI();
    alert(`Saved "${targetChar.name}" as ${suggestedFileName}!`);
  }

  async loadCharacterFile() {
    const confirmLoad = confirm('Loading a character file will replace the current hero in the workspace. Any unsaved changes will be overwritten. Proceed?');
    if (!confirmLoad) return;

    if (typeof window !== 'undefined' && window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          id: 'mm3_character_editor',
          startIn: 'documents',
          types: [{
            description: 'Mutants & Masterminds Character File (*.mm3)',
            accept: { 'application/x-mm3': ['.mm3'], 'application/json': ['.mm3', '.json'] }
          }]
        });
        if (!handle) return;

        const file = await handle.getFile();
        const text = await file.text();
        const loadedChar = storageManager.parseMM3File(text);

        this.char = loadedChar;
        this.currentFileHandle = handle;
        this.saveAndAudit();
        this.loadCharacterToUI();
        alert(`Successfully loaded "${loadedChar.name}" from ${file.name}!`);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return; // User cancelled
        console.warn('File System Access API open failed, falling back to file input:', err);
      }
    }

    // Fallback: file input
    const fileInput = document.getElementById('menu-file-input');
    fileInput?.click();
  }

  computeMovementModes(mods) {
    const SPEED_TABLE = {
      '-2': { rate: '6 ft/rnd', mph: '0.5 mph' },
      '-1': { rate: '15 ft/rnd', mph: '1 mph' },
      '0': { rate: '30 ft/rnd', mph: '2 mph' },
      '1': { rate: '60 ft/rnd', mph: '4 mph' },
      '2': { rate: '120 ft/rnd', mph: '8 mph' },
      '3': { rate: '250 ft/rnd', mph: '16 mph' },
      '4': { rate: '500 ft/rnd', mph: '30 mph' },
      '5': { rate: '900 ft/rnd', mph: '60 mph' },
      '6': { rate: '1,800 ft/rnd', mph: '120 mph' },
      '7': { rate: '1/2 mi/rnd', mph: '250 mph' },
      '8': { rate: '1 mi/rnd', mph: '500 mph' },
      '9': { rate: '2 mi/rnd', mph: '1,000 mph' },
      '10': { rate: '4 mi/rnd', mph: '2,000 mph' },
      '11': { rate: '8 mi/rnd', mph: '4,000 mph' },
      '12': { rate: '16 mi/rnd', mph: '8,000 mph' },
      '13': { rate: '30 mi/rnd', mph: '16,000 mph' },
      '14': { rate: '60 mi/rnd', mph: '32,000 mph' }
    };

    const getSpeedEntry = (rank) => {
      if (SPEED_TABLE[rank]) return SPEED_TABLE[rank];
      if (rank < -2) return { rate: `${Math.max(1, Math.floor(6 / Math.pow(2, -2 - rank)))} ft/rnd`, mph: '<0.5 mph' };
      const dist = Math.round(60 * Math.pow(2, rank - 14));
      return { rate: `${dist.toLocaleString()} mi/rnd`, mph: `${(dist * 500).toLocaleString()} mph` };
    };

    const modes = [];
    let speedRank = 0;
    let flightRank = 0;
    let swimRank = null;
    let leapRank = 0;
    let burrowRank = 0;
    let teleportRank = 0;
    let spaceRank = 0;
    const specialModes = [];

    (this.char.powers || []).forEach(p => {
      const effId = p.effect?.id || '';
      const name = (p.name || '').toLowerCase();
      const rank = parseInt(p.rank, 10) || 1;

      if (effId === 'speed' || name.includes('super-speed') || (name.includes('speed') && !name.includes('remote'))) {
        speedRank = Math.max(speedRank, rank);
      }
      if (effId === 'flight' || name.includes('flight') || name.includes('fly') || name.includes('wings')) {
        flightRank = Math.max(flightRank, rank);
      }
      if (effId === 'swimming' || name.includes('swim') || name.includes('aquatic')) {
        swimRank = Math.max(swimRank !== null ? swimRank : -2, rank);
      }
      if (effId === 'leaping' || name.includes('leap') || name.includes('jump')) {
        leapRank = Math.max(leapRank, rank);
      }
      if (effId === 'burrowing' || name.includes('burrow') || name.includes('tunnel')) {
        burrowRank = Math.max(burrowRank, rank);
      }
      if (effId === 'teleport' || name.includes('teleport')) {
        teleportRank = Math.max(teleportRank, rank);
      }
      if (effId === 'movement' || name.includes('space travel') || name.includes('space flight')) {
        if (name.includes('space') || (p.descriptor || '').toLowerCase().includes('space')) {
          spaceRank = Math.max(spaceRank, rank);
        } else if (name.includes('wall') || (p.descriptor || '').toLowerCase().includes('wall')) {
          specialModes.push({ mode: 'Wall-Crawl', icon: '🧗', rate: 'At Speed', mph: '' });
        } else if (name.includes('water') || (p.descriptor || '').toLowerCase().includes('water')) {
          specialModes.push({ mode: 'Water-Walk', icon: '🌊', rate: 'At Speed', mph: '' });
        }
      }
    });

    // 1. Ground Mode
    if (mods.isImmobilized) {
      modes.push({ mode: 'Ground', icon: '🚶', rate: '0 ft (Immobilized)', mph: '0 mph', desc: 'Cannot move due to condition' });
    } else if (mods.isProne) {
      modes.push({ mode: 'Ground (Prone)', icon: '🚶', rate: '6 ft/rnd (Crawling)', mph: '0.5 mph', desc: 'Prone crawling speed' });
    } else {
      let groundRank = speedRank;
      if (mods.isHindered) groundRank = Math.max(-2, groundRank - 1);
      const entry = getSpeedEntry(groundRank);
      modes.push({
        mode: speedRank > 0 ? `Ground (Rank ${groundRank})` : 'Ground',
        icon: '🚶',
        rate: entry.rate,
        mph: entry.mph,
        desc: `Standard ground running speed${mods.isHindered ? ' (Hindered: -1 rank)' : ''}`
      });
    }

    // 2. Swimming Mode (Always possessed: base -2 / 6 ft, or powered)
    const effSwimRank = swimRank !== null ? swimRank : -2;
    const swimEntry = getSpeedEntry(effSwimRank);
    modes.push({
      mode: swimRank !== null ? `Swim (Rank ${effSwimRank})` : 'Swim',
      icon: '🏊',
      rate: swimEntry.rate,
      mph: swimEntry.mph,
      desc: 'Aquatic swimming movement speed'
    });

    // 3. Flight Mode (If possessed)
    if (flightRank > 0) {
      const flightEntry = getSpeedEntry(flightRank);
      modes.push({
        mode: `Flight (Rank ${flightRank})`,
        icon: '🦅',
        rate: flightEntry.rate,
        mph: flightEntry.mph,
        desc: 'Aerial flight speed'
      });
    }

    // 4. Space Mode (If possessed)
    if (spaceRank > 0) {
      const spaceDesc = spaceRank === 1 ? 'Sub-light' : spaceRank === 2 ? 'Interstellar' : 'Intergalactic';
      modes.push({
        mode: `Space (Rank ${spaceRank})`,
        icon: '🚀',
        rate: spaceDesc,
        mph: spaceRank >= 2 ? 'FTL' : 'Sub-light',
        desc: 'Space Travel capability'
      });
    }

    // 5. Leaping Mode (If possessed)
    if (leapRank > 0) {
      const leapEntry = getSpeedEntry(leapRank);
      modes.push({
        mode: `Leap (Rank ${leapRank})`,
        icon: '🦘',
        rate: leapEntry.rate,
        mph: '',
        desc: 'Standing leap distance without run-up'
      });
    }

    // 6. Burrowing Mode (If possessed)
    if (burrowRank > 0) {
      const burrowEntry = getSpeedEntry(burrowRank);
      modes.push({
        mode: `Burrow (Rank ${burrowRank})`,
        icon: '⛏️',
        rate: burrowEntry.rate,
        mph: burrowEntry.mph,
        desc: 'Tunneling underground speed'
      });
    }

    // 7. Teleportation Mode (If possessed)
    if (teleportRank > 0) {
      const teleEntry = getSpeedEntry(teleportRank);
      modes.push({
        mode: `Teleport (Rank ${teleportRank})`,
        icon: '🌀',
        rate: teleEntry.rate,
        mph: 'Instant',
        desc: 'Instant displacement range per move action'
      });
    }

    specialModes.forEach(sm => modes.push(sm));
    return modes;
  }

  // =======================================================
  // 16. MASTER RENDER ALL
  // =======================================================
  saveAndAudit() {
    storageManager.saveCharacter(this.char);
    return auditCharacter(this.char);
  }

  loadCharacterToUI() {
    this.renderAll();
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
    const bruises = this.char.bruises || 0;
    const conds = this.char.conditions || {};
    const mods = calculateConditionModifiers(conds, bruises);

    // 1. Update Bruises & Summary
    const bruiseValEl = document.getElementById('action-bruise-val');
    if (bruiseValEl) bruiseValEl.textContent = bruises;

    const summaryEl = document.getElementById('conditions-summary-badge');
    if (summaryEl) {
      if (mods.summaryText === 'Normal') {
        summaryEl.innerHTML = `<span style="color: var(--hero-green); font-weight: 700;">🟢 Status: Normal & Healthy</span>`;
      } else {
        summaryEl.innerHTML = `<span style="color: var(--hero-red); font-weight: 800;">⚠️ Active Modifiers: ${mods.summaryText}</span>`;
      }
    }

    // 2. Render Individual Conditions Grid (14 basic conditions)
    const indGrid = document.getElementById('individual-conditions-grid');
    if (indGrid) {
      indGrid.innerHTML = '';
      BASIC_CONDITIONS.forEach(c => {
        const isActive = !!conds[c.id];
        const btn = document.createElement('button');
        btn.className = `condition-btn ${isActive ? 'active' : ''}`;
        btn.textContent = c.name;
        btn.title = `${c.name}: ${c.desc}`;
        btn.addEventListener('click', () => {
          this.char.conditions[c.id] = !this.char.conditions[c.id];
          if (!this.char.conditions[c.id]) delete this.char.conditions[c.id];

          // Check if combined condition is affected
          if (this.char.activeCombinedCondition) {
            const combDef = COMBINED_CONDITIONS.find(comb => comb.id === this.char.activeCombinedCondition);
            if (combDef && !combDef.constituents.every(id => !!this.char.conditions[id])) {
              delete this.char.activeCombinedCondition;
            }
          }
          this.saveAndAudit();
          this.renderActionCenter(auditCharacter(this.char));
        });
        indGrid.appendChild(btn);
      });
    }

    // 3. Sync Combined Condition Dropdown
    const combinedSelect = document.getElementById('select-combined-condition');
    if (combinedSelect) {
      let matchedCombined = this.char.activeCombinedCondition || '';
      if (!matchedCombined) {
        const found = COMBINED_CONDITIONS.find(comb => comb.constituents.every(id => !!conds[id]));
        if (found) matchedCombined = found.id;
      }
      combinedSelect.value = matchedCombined;
    }

    // 4. Render Main Abilities in Action Center
    const abilitiesGrid = document.getElementById('action-abilities-grid');
    if (abilitiesGrid) {
      abilitiesGrid.innerHTML = '';

      ABILITIES.forEach(ab => {
        const abShort = (ab.short || ab.id).toUpperCase();
        const baseRank = parseInt(this.char.abilities?.[ab.id], 10) || 0;
        const effRank = baseRank + mods.checkPenalty;
        
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'action-ability-card action-roll-card';
        btn.setAttribute('data-ab', ab.id);
        btn.title = `Roll ${ab.name} Check (${effRank >= 0 ? '+' + effRank : effRank})`;
        btn.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 0.15rem;">
            <span style="font-size: 0.95rem; font-weight: 800; color: var(--hero-gold); letter-spacing: 0.04em;">${abShort}</span>
            <span class="rules-link rules-info-badge" data-id="${ab.id}" data-type="ability" data-name="${ab.name}" data-cat="Ability" title="${ab.name} (Click for rules)" style="font-size: 0.75rem; opacity: 0.7; cursor: pointer; padding: 2px 4px; border-radius: 3px;">ℹ️</span>
          </div>
          <div style="display: flex; align-items: baseline; justify-content: space-between; width: 100%;">
            <strong style="font-size: 1.35rem; font-weight: 900; line-height: 1; color: ${effRank !== baseRank ? 'var(--hero-red)' : '#fff'};">${effRank >= 0 ? '+' + effRank : effRank}</strong>
            ${mods.checkPenalty !== 0 ? `<span style="font-size: 0.75rem; color: var(--hero-red); font-weight: 800;">(${mods.checkPenalty})</span>` : ''}
          </div>
        `;

        btn.querySelector('.rules-info-badge')?.addEventListener('click', (e) => {
          e.stopPropagation();
        });

        btn.addEventListener('click', (e) => {
          if (e.target.closest('.rules-link')) return;
          const roll = diceRoller.rollCheck({
            title: `${ab.name} Check`,
            characterName: this.char.name,
            modifier: effRank,
            targetDC: this.getCurrentDC(),
            rollType: 'ability',
            extraText: `Base ${abShort} (${baseRank >= 0 ? '+' + baseRank : baseRank})${mods.checkPenalty ? ` ${mods.checkPenalty} (Conditions)` : ''}`
          });
          this.displayRollResult(roll);
        });

        abilitiesGrid.appendChild(btn);
      });
    }

    // 5. Render Defenses & Resistance Checks in Action Center
    const defGrid = document.getElementById('action-defenses-grid');
    if (defGrid) {
      defGrid.innerHTML = '';

      DEFENSES.forEach(def => {
        const baseScore = audit.computedDefenses[def.id] || 0;
        let effScore = baseScore;
        let modNotes = [];

        if (def.id === 'dodge' || def.id === 'parry') {
          if (mods.isDefenseless) {
            effScore = 0;
            modNotes.push('Defenseless');
          } else if (mods.isVulnerable) {
            effScore = Math.floor(baseScore / 2);
            modNotes.push('Vulnerable');
          }
          effScore = Math.max(0, effScore + mods.dodgeParryPenalty);
          if (mods.dodgeParryPenalty !== 0) modNotes.push(`${mods.dodgeParryPenalty}`);
        } else if (def.id === 'toughness') {
          effScore = Math.max(0, baseScore + mods.toughnessPenalty);
          if (mods.bruiseCount > 0) modNotes.push(`-${mods.bruiseCount} Bruises`);
          if (mods.checkPenalty !== 0) modNotes.push(`${mods.checkPenalty} Cond`);
        } else {
          effScore = baseScore + mods.checkPenalty;
          if (mods.checkPenalty !== 0) modNotes.push(`${mods.checkPenalty} Cond`);
        }

        const noteText = modNotes.length > 0 ? modNotes.join(', ') : `Base ${baseScore}`;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'action-save-card action-roll-card';
        btn.setAttribute('data-def', def.id);
        btn.title = `Roll ${def.name} Resistance (+${effScore})`;

        btn.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 0.15rem;">
            <span style="font-size: 0.95rem; font-weight: 800; color: var(--hero-cyan); text-transform: uppercase; letter-spacing: 0.04em;">${def.name}</span>
            <span class="rules-link rules-info-badge" data-id="${def.id}" data-type="defense" data-name="${def.name}" data-cat="Defense" title="${def.name} (Click for rules)" style="font-size: 0.75rem; opacity: 0.7; cursor: pointer; padding: 2px 4px; border-radius: 3px;">ℹ️</span>
          </div>
          <div style="display: flex; align-items: baseline; justify-content: space-between; width: 100%; gap: 0.35rem;">
            <div style="display: flex; align-items: baseline; gap: 0.25rem;">
              <strong style="font-size: 1.35rem; font-weight: 900; line-height: 1; color: ${effScore !== baseScore ? 'var(--hero-red)' : 'var(--text-bright)'};">${effScore >= 0 ? '+' + effScore : effScore}</strong>
              ${effScore !== baseScore ? `<span style="font-size: 0.75rem; color: var(--hero-red); font-weight: 800;">*</span>` : ''}
            </div>
            <span style="font-size: 0.75rem; color: ${effScore !== baseScore ? 'var(--hero-red)' : 'var(--text-muted)'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: right; max-width: 110px;" title="${noteText}">
              ${noteText}
            </span>
          </div>
        `;

        btn.querySelector('.rules-info-badge')?.addEventListener('click', (e) => {
          e.stopPropagation();
        });

        btn.addEventListener('click', (e) => {
          if (e.target.closest('.rules-link')) return;
          const roll = diceRoller.rollCheck({
            title: `${def.name} Resistance`,
            characterName: this.char.name,
            modifier: effScore,
            targetDC: this.getCurrentDC(),
            rollType: def.id === 'toughness' ? 'toughness' : 'resistance',
            extraText: modNotes.length > 0 ? `Modifiers: ${modNotes.join(', ')}` : ''
          });

          if (def.id === 'toughness' && roll.outcomeClass === 'failure') {
            this.char.bruises = (this.char.bruises || 0) + 1;
            if (roll.degrees >= 2) this.char.conditions.dazed = true;
            if (roll.degrees >= 3) {
              this.char.conditions.staggered = true;
              this.char.conditions.dazed = true;
              this.char.conditions.hindered = true;
            }
            if (roll.degrees >= 4) {
              this.char.conditions.incapacitated = true;
              this.char.conditions.defenseless = true;
              this.char.conditions.stunned = true;
              this.char.conditions.unaware = true;
              this.char.conditions.prone = true;
            }
            this.saveAndAudit();
            this.renderActionCenter(auditCharacter(this.char));
          }

          this.displayRollResult(roll);
        });

        defGrid.appendChild(btn);
      });
    }

    // 5b. Render Dedicated Initiative & Movement Speeds Block
    const initBtn = document.getElementById('btn-roll-initiative');
    const initFormula = document.getElementById('action-init-formula');
    if (initBtn) {
      const agi = parseInt(this.char.abilities?.agi, 10) || 0;
      let impInitRanks = 0;
      (this.char.advantages || []).forEach(a => {
        if (a.id === 'improved_initiative') impInitRanks += parseInt(a.rank, 10) || 1;
      });
      const baseMod = agi + (impInitRanks * 4);
      const effMod = baseMod + mods.checkPenalty;
      initBtn.textContent = `⚡ Roll Initiative (${effMod >= 0 ? '+' + effMod : effMod})`;
      initBtn.title = `Roll Initiative: d20 + ${effMod}`;
      if (initFormula) {
        initFormula.textContent = `(AGI ${agi >= 0 ? '+' + agi : agi}${impInitRanks > 0 ? `, Imp Init +${impInitRanks * 4}` : ''}${mods.checkPenalty ? ` ${mods.checkPenalty} Cond` : ''})`;
      }
    }

    const movementContainer = document.getElementById('action-movement-speeds');
    if (movementContainer) {
      movementContainer.innerHTML = '';
      const modes = this.computeMovementModes(mods);
      modes.forEach(m => {
        const badge = document.createElement('div');
        badge.className = 'movement-badge';
        badge.innerHTML = `
          <span>${m.icon}</span>
          <strong>${m.mode}:</strong>
          <span class="movement-rate">${m.rate}</span>
          ${m.mph ? `<span class="movement-mph">(${m.mph})</span>` : ''}
        `;
        badge.title = m.desc || `${m.mode} movement rate`;
        movementContainer.appendChild(badge);
      });
    }

    // 6. Render Attacks Table in Action Center
    const attacksTbody = document.getElementById('action-attacks-tbody');
    if (attacksTbody) {
      attacksTbody.innerHTML = '';
      const dcValEl = document.getElementById('action-dc-val');
      const currentDC = parseInt(dcValEl?.textContent, 10) || 15;

      const str = parseInt(this.char.abilities?.str, 10) || 0;
      const fgt = parseInt(this.char.abilities?.fgt, 10) || 0;
      let unarmedBaseBonus = fgt;
      (this.char.skills || []).forEach(sk => {
        if (sk.id === 'close_combat' && (sk.specialty || '').toLowerCase().includes('unarmed')) {
          unarmedBaseBonus += parseInt(sk.ranks, 10) || 0;
        }
      });

      const unarmedEffBonus = unarmedBaseBonus + mods.attackPenalty + (mods.isProne ? -5 : 0);

      const unarmedRow = document.createElement('tr');
      unarmedRow.innerHTML = `
        <td><strong>👊 Unarmed Strike</strong></td>
        <td>Close • Bludgeoning</td>
        <td><span style="font-weight: 800; color: ${unarmedEffBonus !== unarmedBaseBonus ? 'var(--hero-red)' : 'var(--hero-blue)'};">${unarmedEffBonus >= 0 ? '+' + unarmedEffBonus : unarmedEffBonus}</span></td>
        <td>Damage ${str} (DC ${15 + str})</td>
        <td style="text-align: right;">
          <button class="btn-touch-roll attack">🎲 Attack</button>
        </td>
      `;
      unarmedRow.querySelector('button')?.addEventListener('click', () => {
        const roll = diceRoller.rollCheck({
          title: 'Unarmed Strike',
          characterName: this.char.name,
          modifier: unarmedEffBonus,
          targetDC: this.getCurrentDC(),
          rollType: 'attack',
          damageRank: str,
          descriptor: 'Close, Bludgeoning',
          extraText: unarmedEffBonus !== unarmedBaseBonus ? `Base +${unarmedBaseBonus}${mods.attackPenalty ? ` ${mods.attackPenalty} (Conditions)` : ''}${mods.isProne ? ' -5 (Prone)' : ''}` : ''
        });
        this.displayRollResult(roll);
      });
      attacksTbody.appendChild(unarmedRow);

      (this.char.powers || []).forEach(p => {
        if (p.effect?.isAttack || ['damage', 'blast', 'affliction', 'move_object'].includes(p.effect?.id)) {
          const isRanged = p.range === 'Ranged' || p.effect?.id === 'blast';
          const dex = parseInt(this.char.abilities?.dex, 10) || 0;
          let baseBonus = isRanged ? dex : fgt;

          (p.extras || []).forEach(ex => {
            if (ex.id === 'accurate') baseBonus += (parseInt(ex.rank, 10) || 1) * 2;
          });

          const effBonus = baseBonus + mods.attackPenalty + (!isRanged && mods.isProne ? -5 : 0);
          const rank = parseInt(p.rank, 10) || 1;
          const dc = (p.effect?.dcBase || 15) + rank;
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><strong>⚡ ${p.name}</strong></td>
            <td>${p.range} • ${p.descriptor}</td>
            <td><span style="font-weight: 800; color: ${effBonus !== baseBonus ? 'var(--hero-red)' : 'var(--hero-blue)'};">${effBonus >= 0 ? '+' + effBonus : effBonus}</span></td>
            <td>Rank ${rank} (DC ${dc})</td>
            <td style="text-align: right;">
              <button class="btn-touch-roll attack">🎲 Attack</button>
            </td>
          `;
          row.querySelector('button')?.addEventListener('click', () => {
            const roll = diceRoller.rollCheck({
              title: p.name,
              characterName: this.char.name,
              modifier: effBonus,
              targetDC: this.getCurrentDC(),
              rollType: 'attack',
              damageRank: rank,
              descriptor: `${p.range}, ${p.descriptor}`,
              extraText: effBonus !== baseBonus ? `Base +${baseBonus}${mods.attackPenalty ? ` ${mods.attackPenalty} (Conditions)` : ''}` : ''
            });
            this.displayRollResult(roll);
          });
          attacksTbody.appendChild(row);
        }
      });
    }

    // 7. Render Skills Table in Action Center (All Untrained Skills + Trained Skills)
    const skillsTbody = document.getElementById('action-skills-tbody');
    if (skillsTbody) {
      skillsTbody.innerHTML = '';

      const skillsToRender = [];

      // 1. Add all skills that can be used untrained (trainedOnly === false)
      SKILLS_LIST.forEach(def => {
        const existing = (this.char.skills || []).find(s => s.id === def.id);
        const ranks = existing ? (parseInt(existing.ranks, 10) || 0) : 0;
        const baseAbVal = parseInt(this.char.abilities?.[def.ability], 10) || 0;
        const totalBonus = baseAbVal + ranks;

        if (!def.trainedOnly) {
          skillsToRender.push({
            id: def.id,
            name: def.name,
            specialty: existing?.specialty || '',
            ability: def.ability,
            ranks,
            isUntrained: ranks === 0,
            baseBonus: totalBonus
          });
        }
      });

      // 2. Add any trained-only skills where character has ranks
      (this.char.skills || []).forEach(sk => {
        const ranks = parseInt(sk.ranks, 10) || 0;
        if (ranks > 0) {
          const def = SKILLS_LIST.find(s => s.id === sk.id);
          if (def && def.trainedOnly) {
            const baseAbVal = parseInt(this.char.abilities?.[def.ability], 10) || 0;
            skillsToRender.push({
              id: sk.id,
              name: def.name,
              specialty: sk.specialty || '',
              ability: def.ability,
              ranks,
              isUntrained: false,
              baseBonus: baseAbVal + ranks
            });
          }
        }
      });

      // Sort alphabetically by skill name
      skillsToRender.sort((a, b) => a.name.localeCompare(b.name));

      skillsToRender.forEach(sk => {
        const effBonus = sk.baseBonus + mods.checkPenalty;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <span class="rules-link" data-id="${sk.id}" data-type="skill" data-name="${sk.name}" data-cat="Official 3E Skill" style="cursor: pointer; font-weight: 700;">
              ${sk.name}${sk.specialty ? ` (${sk.specialty})` : ''}
            </span>
            ${sk.isUntrained 
              ? `<span style="font-size: 0.68rem; background: rgba(255,255,255,0.06); padding: 0.1rem 0.35rem; border-radius: 3px; color: var(--text-muted); margin-left: 0.4rem;">Untrained</span>`
              : `<span style="font-size: 0.68rem; background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.3); padding: 0.1rem 0.35rem; border-radius: 3px; color: var(--hero-cyan); margin-left: 0.4rem;">Rank ${sk.ranks}</span>`
            }
          </td>
          <td><strong style="color: var(--text-muted);">${sk.ability.toUpperCase()}</strong></td>
          <td><strong style="color: ${effBonus !== sk.baseBonus ? 'var(--hero-red)' : 'var(--hero-cyan)'}; font-size: var(--font-size-md); font-weight: 900;">${effBonus >= 0 ? '+' : ''}${effBonus}</strong></td>
          <td style="text-align: right;">
            <button class="btn-touch-roll" style="min-height: 28px; padding: 0.2rem 0.65rem; font-size: 0.88rem;">🎲 Roll</button>
          </td>
        `;

        row.querySelector('button')?.addEventListener('click', () => {
          const roll = diceRoller.rollCheck({
            title: `${sk.name} Check`,
            characterName: this.char.name,
            modifier: effBonus,
            targetDC: this.getCurrentDC(),
            rollType: 'skill',
            extraText: effBonus !== sk.baseBonus ? `Base +${sk.baseBonus}${mods.checkPenalty ? ` ${mods.checkPenalty} (Conditions)` : ''}` : ''
          });
          this.displayRollResult(roll);
        });

        skillsTbody.appendChild(row);
      });
    }
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
      card.className = 'ability-stepper-card-compact';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; line-height: 1.1;">
          <span class="rules-link" data-id="${ab.id}" data-type="ability" data-name="${ab.name}" data-cat="Ability" style="font-weight: 800; font-size: 0.72rem; color: var(--hero-gold); cursor: pointer;" title="${ab.name}${ab.id === 'str' ? ` (Lift: ${getStrengthLiftingCapacity(val)})` : ''}">${ab.short}</span>
          <span style="font-size: 0.62rem; color: var(--text-muted);">${val * 2} PP</span>
        </div>
        <div class="stepper-control compact" style="width: 100%; justify-content: center; margin-top: 0.15rem;">
          <button class="btn-stepper compact" data-ab="${ab.id}" data-dir="-1">-</button>
          <span class="stepper-value compact">${val}</span>
          <button class="btn-stepper compact" data-ab="${ab.id}" data-dir="1">+</button>
        </div>
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
      card.className = 'defense-stepper-card-compact';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; line-height: 1.1;">
          <span class="rules-link" data-id="${def.id}" data-type="defense" data-name="${def.name}" data-cat="Defense" style="font-weight: 800; font-size: 0.72rem; color: var(--hero-cyan); text-transform: uppercase; cursor: pointer;" title="${def.name}">${def.name}</span>
          <strong style="font-size: var(--font-size-sm); font-weight: 900; color: var(--text-bright);">${total}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 0.15rem; gap: 0.2rem;">
          <span style="font-size: 0.6rem; color: var(--text-muted);" title="Base (${baseVal}) + Bought (${bought})">B${baseVal}+${bought}</span>
          <div class="stepper-control compact">
            <button class="btn-stepper compact" data-def="${def.id}" data-dir="-1">-</button>
            <span class="stepper-value compact">${bought}</span>
            <button class="btn-stepper compact" data-def="${def.id}" data-dir="1">+</button>
          </div>
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
  // =======================================================
  // 18. SKILLS CATALOG TAB (Supports Multiple Instances per Specialty)
  // =======================================================
  renderSkillsTab(audit) {
    document.getElementById('skills-cost-display').textContent = `${audit.skillsCost} PP`;
    const tbody = document.getElementById('skills-catalog-tbody');
    tbody.innerHTML = '';

    // Ensure all skills have an instanceId
    if (this.char.skills) {
      this.char.skills.forEach((s, idx) => {
        if (!s.instanceId) s.instanceId = `sk_${s.id}_${idx}_${Math.random().toString(36).substr(2, 4)}`;
      });
    }

    SKILLS_LIST.forEach(skillDef => {
      const baseVal = parseInt(this.char.abilities?.[skillDef.ability], 10) || 0;

      if (!skillDef.hasSpecialty) {
        // Standard single skill
        let existing = (this.char.skills || []).find(s => s.id === skillDef.id);
        const ranks = existing ? (parseInt(existing.ranks, 10) || 0) : 0;
        const totalBonus = baseVal + ranks;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <span class="rules-link" data-id="${skillDef.id}" data-type="skill" data-name="${skillDef.name}" data-cat="Official 3E Skill" style="cursor: pointer; font-weight: 700;">
              ${skillDef.name}
            </span>
          </td>
          <td><strong style="color: var(--text-muted);">${skillDef.ability.toUpperCase()}</strong></td>
          <td>${baseVal >= 0 ? '+' : ''}${baseVal}</td>
          <td>
            <div class="stepper-control">
              <button class="btn-stepper compact" data-skill="${skillDef.id}" data-dir="-1">-</button>
              <span class="stepper-value compact">${ranks}</span>
              <button class="btn-stepper compact" data-skill="${skillDef.id}" data-dir="1">+</button>
            </div>
          </td>
          <td><strong style="color: var(--hero-cyan); font-size: var(--font-size-md);">${totalBonus >= 0 ? '+' : ''}${totalBonus}</strong></td>
          <td style="text-align: right;"></td>
        `;

        row.querySelectorAll('.btn-stepper').forEach(btn => {
          btn.addEventListener('click', () => {
            const dir = parseInt(btn.dataset.dir, 10);
            this.updateSkillRanks(skillDef.id, skillDef.name, ranks + dir);
          });
        });

        tbody.appendChild(row);
      } else {
        // Multi-instance specialty skill (Close Combat, Ranged Combat, Expertise)
        const instances = (this.char.skills || []).filter(s => s.id === skillDef.id);

        if (instances.length === 0) {
          // Render default 0-rank row with "+ Add Specialty"
          const totalBonus = baseVal;
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>
              <span class="rules-link" data-id="${skillDef.id}" data-type="skill" data-name="${skillDef.name}" data-cat="Official 3E Skill" style="cursor: pointer; font-weight: 700;">
                ${skillDef.name}
              </span>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 0.5rem; font-style: italic;">[No Specialty Assigned]</span>
            </td>
            <td><strong style="color: var(--text-muted);">${skillDef.ability.toUpperCase()}</strong></td>
            <td>${baseVal >= 0 ? '+' : ''}${baseVal}</td>
            <td>
              <div class="stepper-control">
                <button class="btn-stepper compact" data-dir="-1" disabled>-</button>
                <span class="stepper-value compact">0</span>
                <button class="btn-stepper compact" data-dir="1">+</button>
              </div>
            </td>
            <td><strong style="color: var(--hero-cyan); font-size: var(--font-size-md);">${totalBonus >= 0 ? '+' : ''}${totalBonus}</strong></td>
            <td style="text-align: right;">
              <button class="btn btn-outline btn-skill-add-specialty" style="min-height: 28px; font-size: var(--font-size-xs); padding: 0.15rem 0.5rem;">+ Specialty</button>
            </td>
          `;

          const addSpecialtyAction = () => {
            this.openPrebuiltOptionsModal(`Choose Specialty for ${skillDef.name}`, skillDef.options, (selected) => {
              this.addSkillInstance(skillDef.id, skillDef.name, selected, 1);
            });
          };

          row.querySelector('.btn-skill-add-specialty')?.addEventListener('click', addSpecialtyAction);
          row.querySelector('[data-dir="1"]')?.addEventListener('click', addSpecialtyAction);

          tbody.appendChild(row);
        } else {
          // Render each instance
          instances.forEach((inst) => {
            const ranks = parseInt(inst.ranks, 10) || 0;
            const totalBonus = baseVal + ranks;
            const specialty = inst.specialty || '';

            const row = document.createElement('tr');
            row.innerHTML = `
              <td>
                <span class="rules-link" data-id="${skillDef.id}" data-type="skill" data-name="${skillDef.name}" data-cat="Official 3E Skill" style="cursor: pointer; font-weight: 700;">
                  ${skillDef.name}
                </span>
                <span class="skill-specialty-badge" style="font-size: 0.78rem; color: var(--hero-gold); margin-left: 0.5rem; font-weight: 800; cursor: pointer; text-decoration: underline dotted;" title="Click to edit specialty">
                  [${specialty || 'Unspecified Specialty'}]
                </span>
              </td>
              <td><strong style="color: var(--text-muted);">${skillDef.ability.toUpperCase()}</strong></td>
              <td>${baseVal >= 0 ? '+' : ''}${baseVal}</td>
              <td>
                <div class="stepper-control">
                  <button class="btn-stepper compact" data-inst-dir="-1">-</button>
                  <span class="stepper-value compact">${ranks}</span>
                  <button class="btn-stepper compact" data-inst-dir="1">+</button>
                </div>
              </td>
              <td><strong style="color: var(--hero-cyan); font-size: var(--font-size-md);">${totalBonus >= 0 ? '+' : ''}${totalBonus}</strong></td>
              <td style="text-align: right; white-space: nowrap;">
                <button class="btn btn-outline btn-edit-inst-specialty" style="min-height: 28px; font-size: 0.72rem; padding: 0.15rem 0.45rem;" title="Change Specialty">✏️ Specialty</button>
                <button class="btn btn-danger btn-delete-inst" style="min-height: 28px; font-size: 0.72rem; padding: 0.15rem 0.45rem; margin-left: 0.25rem;" title="Remove this specialty instance">🗑️</button>
              </td>
            `;

            const editSpecialty = () => {
              this.openPrebuiltOptionsModal(`Change Specialty for ${skillDef.name}`, skillDef.options, (selected) => {
                inst.specialty = selected;
                this.saveAndAudit();
                this.renderAll();
              });
            };

            row.querySelector('.skill-specialty-badge')?.addEventListener('click', editSpecialty);
            row.querySelector('.btn-edit-inst-specialty')?.addEventListener('click', editSpecialty);

            row.querySelector('[data-inst-dir="-1"]')?.addEventListener('click', () => {
              inst.ranks = Math.max(0, (parseInt(inst.ranks, 10) || 0) - 1);
              this.saveAndAudit();
              this.renderAll();
            });
            row.querySelector('[data-inst-dir="1"]')?.addEventListener('click', () => {
              inst.ranks = (parseInt(inst.ranks, 10) || 0) + 1;
              this.saveAndAudit();
              this.renderAll();
            });

            row.querySelector('.btn-delete-inst')?.addEventListener('click', () => {
              this.removeSkillInstance(inst.instanceId);
            });

            tbody.appendChild(row);
          });

          // Sub-row to Add Another Instance of this skill
          const addRow = document.createElement('tr');
          addRow.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
          addRow.innerHTML = `
            <td colspan="6" style="padding: 0.35rem 0.6rem; text-align: left;">
              <button class="btn btn-outline btn-add-another-skill" style="min-height: 26px; font-size: 0.74rem; padding: 0.15rem 0.55rem; border-color: rgba(6, 182, 212, 0.4); color: var(--hero-cyan);">
                ➕ Add Another ${skillDef.name} Specialty
              </button>
            </td>
          `;

          addRow.querySelector('.btn-add-another-skill')?.addEventListener('click', () => {
            this.openPrebuiltOptionsModal(`Add Another Specialty for ${skillDef.name}`, skillDef.options, (selected) => {
              this.addSkillInstance(skillDef.id, skillDef.name, selected, 1);
            });
          });

          tbody.appendChild(addRow);
        }
      }
    });
  }

  addSkillInstance(id, name, specialty = '', ranks = 0) {
    if (!this.char.skills) this.char.skills = [];
    const newInst = {
      id,
      instanceId: `sk_${id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name,
      specialty,
      ranks
    };
    this.char.skills.push(newInst);
    this.saveAndAudit();
    this.renderAll();
  }

  removeSkillInstance(instanceId) {
    if (!this.char.skills) return;
    this.char.skills = this.char.skills.filter(s => s.instanceId !== instanceId);
    this.saveAndAudit();
    this.renderAll();
  }

  updateSkillRanks(id, name, newRanks) {
    if (!this.char.skills) this.char.skills = [];
    let item = this.char.skills.find(s => s.id === id);
    if (!item) {
      item = { id, instanceId: `sk_${id}_${Date.now()}`, name, ranks: 0 };
      this.char.skills.push(item);
    }
    item.ranks = Math.max(0, newRanks);
    this.renderAll();
  }

  setSkillSpecialty(id, name, specialty) {
    if (!this.char.skills) this.char.skills = [];
    let item = this.char.skills.find(s => s.id === id);
    if (!item) {
      item = { id, instanceId: `sk_${id}_${Date.now()}`, name, ranks: 0 };
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

      const previewDesc = (advDef.desc.split('\n')[0] || advDef.desc).substring(0, 110);
      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <span class="rules-link" data-id="${advDef.id}" data-type="advantage" data-name="${advDef.name}" data-cat="${advDef.category} Advantage">
              ${advDef.name}
            </span>
            <span style="font-size: 0.65rem; background: rgba(255,255,255,0.06); padding: 0.1rem 0.35rem; border-radius: 3px;">${advDef.category}</span>
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted);">${previewDesc}...</div>
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
  // 20. PREBUILT OPTIONS MODAL (Includes Custom "Other" Input Field)
  // =======================================================
  openPrebuiltOptionsModal(title, optionsList, onSelectCallback) {
    document.getElementById('prebuilt-modal-title').textContent = title;
    const container = document.getElementById('prebuilt-options-list');
    container.innerHTML = '';

    const otherInput = document.getElementById('prebuilt-other-input');
    const applyOtherBtn = document.getElementById('btn-prebuilt-apply-other');
    if (otherInput) {
      otherInput.value = '';
      otherInput.placeholder = 'Other';
    }

    const applyOther = () => {
      const val = (otherInput?.value || '').trim();
      if (val) {
        onSelectCallback(val);
        this.closeModal('modal-prebuilt-options');
      } else {
        alert('Please enter a custom specialization name or choose one from the list below.');
      }
    };

    if (applyOtherBtn) {
      applyOtherBtn.onclick = applyOther;
    }
    if (otherInput) {
      otherInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyOther();
        }
      };
    }

    (optionsList || []).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline';
      btn.style.cssText = 'text-align: left; justify-content: flex-start; padding: 0.5rem 0.85rem; font-size: 0.88rem;';
      btn.textContent = opt;

      btn.addEventListener('click', () => {
        onSelectCallback(opt);
        this.closeModal('modal-prebuilt-options');
      });

      container.appendChild(btn);
    });

    const otherOptionBtn = document.createElement('button');
    otherOptionBtn.className = 'btn btn-outline';
    otherOptionBtn.style.cssText = 'text-align: left; justify-content: flex-start; padding: 0.5rem 0.85rem; font-size: 0.88rem; border-style: dashed; color: var(--hero-gold);';
    otherOptionBtn.textContent = '✏️ Other (Specify Custom Specialization...)';
    otherOptionBtn.addEventListener('click', () => {
      otherInput?.focus();
    });
    container.appendChild(otherOptionBtn);

    document.getElementById('btn-close-prebuilt').onclick = () => {
      this.closeModal('modal-prebuilt-options');
    };

    this.openModal('modal-prebuilt-options');
    setTimeout(() => otherInput?.focus(), 50);
  }

  // =======================================================
  // 21. POWERS TAB RENDER (In-Place Collapsible Power Cards)
  // =======================================================
  renderPowersTab(audit) {
    document.getElementById('powers-cost-display').textContent = `${audit.powersCost} PP`;
    const list = document.getElementById('character-powers-list');
    list.innerHTML = '';

    if (!this.expandedPowerIds) this.expandedPowerIds = new Set();

    if (!this.char.powers || this.char.powers.length === 0) {
      list.innerHTML = `<div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: var(--font-size-sm);">
        No powers built yet. Choose a profile from the <strong>Power Profiles Library</strong> above or click <strong>➕ Custom Power Builder</strong> to build one in-place.
      </div>`;
      return;
    }

    this.char.powers.forEach((p, idx) => {
      if (!p.id) p.id = 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

      // Ensure effect is valid
      if (!p.effect || typeof p.effect !== 'object') {
        const found = POWER_EFFECTS_CATALOG.find(e => e.id === p.effect) || POWER_EFFECTS_CATALOG[0];
        p.effect = found;
      }

      // Compute derived range and duration (No manual dropdowns!)
      const rd = computePowerRangeAndDuration(p.effect, p.extras, p.flaws);
      p.range = rd.effectiveRange;
      p.duration = rd.effectiveDuration;

      // Validate legality of modifiers
      const valResult = validateModifierLegality(p.effect, p.extras, p.flaws);

      const cost = calculatePowerCost(p);
      const isDevice = (p.flaws || []).some(f => f.isDevice);
      const isExpanded = this.expandedPowerIds.has(p.id);

      const card = document.createElement('div');
      card.className = `power-card-collapsible ${isExpanded ? 'expanded' : 'collapsed'}`;
      if (isDevice) card.classList.add('device-card');

      // Collapsed Single-Title-Line Header
      const header = document.createElement('div');
      header.className = 'power-card-header';
      header.innerHTML = `
        <div class="power-card-header-left">
          <span class="power-toggle-icon">${isExpanded ? '▼' : '▶'}</span>
          <strong class="power-title-name">⚡ ${p.name || 'Unnamed Power'}</strong>
          <span class="power-title-sep">—</span>
          <span class="power-title-effect">${p.effect?.name || 'Effect'} Rank ${p.rank || 1}</span>
          <span class="power-title-details">(${cost} PP • ${rd.effectiveRange}, ${rd.effectiveDuration})</span>
          ${p.isDynamicArray ? '<span class="badge-tag dynamic">Dynamic Array</span>' : ''}
          ${p.alternateEffects?.length ? `<span class="badge-tag ae">${p.alternateEffects.length} AE</span>` : ''}
          ${p.linkedEffects?.length ? `<span class="badge-tag linked">${p.linkedEffects.length} Linked</span>` : ''}
          ${!valResult.valid ? '<span class="badge-tag" style="background: rgba(239, 68, 68, 0.25); color: var(--hero-red); border: 1px solid var(--hero-red);" title="Rule conflicts detected">⚠️ Conflict</span>' : ''}
        </div>
        <div class="power-card-header-actions" onclick="event.stopPropagation()">
          <button class="btn btn-outline btn-duplicate-power" data-p-id="${p.id}" title="Duplicate Power" style="min-height: 26px; padding: 0.1rem 0.45rem; font-size: 0.72rem;">📋 Duplicate</button>
          <button class="btn btn-danger btn-delete-power" data-p-id="${p.id}" title="Delete Power" style="min-height: 26px; padding: 0.1rem 0.45rem; font-size: 0.72rem;">🗑️ Delete</button>
        </div>
      `;

      header.addEventListener('click', () => {
        if (this.expandedPowerIds.has(p.id)) {
          this.expandedPowerIds.delete(p.id);
        } else {
          this.expandedPowerIds.add(p.id);
        }
        this.renderPowersTab(auditCharacter(this.char));
      });

      header.querySelector('.btn-duplicate-power')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.duplicatePower(p.id);
      });

      header.querySelector('.btn-delete-power')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deletePower(p.id);
      });

      card.appendChild(header);

      if (isExpanded) {
        // Expanded In-Place Editor Body
        const body = document.createElement('div');
        body.className = 'power-card-body';

        // Row 1: Power Name, Descriptors, Rank Stepper, Action
        const row1 = document.createElement('div');
        row1.style.cssText = 'display: grid; grid-template-columns: 2fr 2fr 110px 130px; gap: 0.65rem;';
        row1.innerHTML = `
          <div>
            <label style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Power Name</label>
            <input type="text" class="input-power-name" value="${p.name || ''}" placeholder="e.g. Plasma Ray, Force Field" style="width: 100%;">
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Descriptors</label>
            <input type="text" class="input-power-desc" value="${p.descriptor || ''}" placeholder="e.g. Fire, Energy, Technology" style="width: 100%;">
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Rank</label>
            <div class="stepper-control" style="width: 100%;">
              <button class="btn-stepper compact btn-p-rank-minus">-</button>
              <span class="stepper-value compact val-p-rank">${p.rank || 1}</span>
              <button class="btn-stepper compact btn-p-rank-plus">+</button>
            </div>
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Action</label>
            <select class="select-power-action" style="width: 100%;">
              ${['Standard', 'Move', 'Free', 'Reaction', 'None'].map(act => `<option value="${act}" ${p.action === act ? 'selected' : ''}>${act}</option>`).join('')}
            </select>
          </div>
        `;

        row1.querySelector('.input-power-name')?.addEventListener('input', (e) => {
          p.name = e.target.value;
          this.saveAndAudit();
        });
        row1.querySelector('.input-power-desc')?.addEventListener('input', (e) => {
          p.descriptor = e.target.value;
          this.saveAndAudit();
        });
        row1.querySelector('.btn-p-rank-minus')?.addEventListener('click', () => {
          p.rank = Math.max(1, (parseInt(p.rank, 10) || 1) - 1);
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });
        row1.querySelector('.btn-p-rank-plus')?.addEventListener('click', () => {
          p.rank = (parseInt(p.rank, 10) || 1) + 1;
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });
        row1.querySelector('.select-power-action')?.addEventListener('change', (e) => {
          p.action = e.target.value;
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });
        body.appendChild(row1);

        // Row 2: Base Effect Selector, Derived Range Badge, Derived Duration Badge (NO DROPDOWNS!)
        const row2 = document.createElement('div');
        row2.style.cssText = 'display: grid; grid-template-columns: 2fr 1.5fr 1.5fr 120px; gap: 0.65rem; align-items: end;';
        row2.innerHTML = `
          <div>
            <label style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Base Effect</label>
            <select class="select-power-effect" style="width: 100%;">
              ${POWER_EFFECTS_CATALOG.map(e => `<option value="${e.id}" ${p.effect?.id === e.id ? 'selected' : ''}>${e.name} (${e.baseCost} PP/rank) [Base: ${e.range}, ${e.duration}]</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Derived Range (3E Modifiers)</label>
            <div style="min-height: 38px; display: flex; flex-direction: column; justify-content: center; padding: 0.3rem 0.6rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
              <span style="font-size: var(--font-size-sm); font-weight: 800; color: var(--hero-cyan);">${rd.effectiveRange}</span>
              <span style="font-size: 0.68rem; color: var(--text-muted);">${rd.rangeNotes || 'Base ' + rd.baseRange}</span>
            </div>
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Derived Duration (3E Modifiers)</label>
            <div style="min-height: 38px; display: flex; flex-direction: column; justify-content: center; padding: 0.3rem 0.6rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
              <span style="font-size: var(--font-size-sm); font-weight: 800; color: var(--hero-gold);">${rd.effectiveDuration}</span>
              <span style="font-size: 0.68rem; color: var(--text-muted);">${rd.durationNotes || 'Base ' + rd.baseDuration}</span>
            </div>
          </div>
          <div style="text-align: right; padding-bottom: 0.4rem;">
            <span style="font-size: var(--font-size-xs); color: var(--text-muted); display: block;">Base Cost:</span>
            <strong style="color: var(--hero-gold); font-size: var(--font-size-md);">${p.effect?.baseCost || 1} PP/rank</strong>
          </div>
        `;

        row2.querySelector('.select-power-effect')?.addEventListener('change', (e) => {
          const newEff = POWER_EFFECTS_CATALOG.find(eff => eff.id === e.target.value) || POWER_EFFECTS_CATALOG[0];
          p.effect = newEff;
          p.action = newEff.action || 'Standard';
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });
        body.appendChild(row2);

        // Validation Banner (Errors and Warnings)
        if (valResult.errors.length > 0 || valResult.warnings.length > 0) {
          const valBox = document.createElement('div');
          valBox.style.cssText = 'display: flex; flex-direction: column; gap: 0.35rem;';
          if (valResult.errors.length > 0) {
            valBox.innerHTML += `
              <div class="power-validation-alert">
                <strong style="color: #ef4444;">⚠️ Rule Conflict Detected:</strong>
                ${valResult.errors.map(err => `<div>• ${err}</div>`).join('')}
              </div>
            `;
          }
          if (valResult.warnings.length > 0) {
            valBox.innerHTML += `
              <div class="power-validation-warning">
                <strong style="color: #f59e0b;">ℹ️ Modifier Advisory:</strong>
                ${valResult.warnings.map(w => `<div>• ${w}</div>`).join('')}
              </div>
            `;
          }
          body.appendChild(valBox);
        }

        // Row 3: Modifiers (Extras & Flaws) with Steppers, Enforced Limits, and ★ Stars
        const modGrid = document.createElement('div');
        modGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;';

        // --- Extras Column ---
        const extrasCol = document.createElement('div');
        extrasCol.className = 'power-section-box';
        extrasCol.innerHTML = `
          <div class="power-section-header">
            <span style="font-weight: 800; font-size: var(--font-size-xs); color: var(--hero-green);">➕ Extras (★ = Unique Modifier)</span>
          </div>
          <div style="display: flex; gap: 0.35rem; margin-bottom: 0.45rem;">
            <select class="select-add-extra" style="flex: 1; font-size: var(--font-size-xs);">
              ${EXTRAS_CATALOG.map(ex => `<option value="${ex.id}">${ex.name} (${ex.isFlat ? `+${ex.cost} flat` : `+${ex.cost}/rank`})</option>`).join('')}
            </select>
            <button class="btn btn-outline btn-add-extra" style="font-size: 0.72rem; min-height: 28px; padding: 0.15rem 0.5rem; white-space: nowrap;">+ Add Extra</button>
          </div>
          <div class="extras-items-container" style="display: flex; flex-direction: column; gap: 0.35rem;"></div>
        `;

        const extrasContainer = extrasCol.querySelector('.extras-items-container');
        (p.extras || []).forEach((ex, exIdx) => {
          const exDef = EXTRAS_CATALOG.find(e => e.id === ex.id) || ex;
          const r = parseInt(ex.rank, 10) || 1;
          const maxR = exDef.maxRankByEffect ? (parseInt(p.rank, 10) || 10) : (exDef.maxRank || 10);
          const minR = exDef.minRank || 1;

          const exRow = document.createElement('div');
          exRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 0.3rem 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05);';
          exRow.innerHTML = `
            <div style="flex: 1;">
              <span style="font-size: var(--font-size-xs); font-weight: 700; color: ${exDef.isUnique ? 'var(--hero-gold)' : 'var(--text-bright)'};">
                ${exDef.name}
              </span>
              <span style="font-size: 0.68rem; color: var(--text-muted); margin-left: 0.35rem;">
                ${exDef.isFlat ? `(+${exDef.cost} flat)` : `(+${exDef.cost}/rank)`}
              </span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              ${exDef.isRanked ? `
                <div class="stepper-control">
                  <button class="btn-stepper compact btn-ex-minus" ${r <= minR ? 'disabled' : ''}>-</button>
                  <span class="stepper-value compact">${r}</span>
                  <button class="btn-stepper compact btn-ex-plus" ${r >= maxR ? 'disabled' : ''}>+</button>
                </div>
              ` : ''}
              <button class="btn btn-outline btn-remove-extra" style="padding: 0.1rem 0.35rem; min-height: 24px; font-size: 0.68rem;">✕</button>
            </div>
          `;

          exRow.querySelector('.btn-ex-minus')?.addEventListener('click', () => {
            ex.rank = Math.max(minR, r - 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });
          exRow.querySelector('.btn-ex-plus')?.addEventListener('click', () => {
            ex.rank = Math.min(maxR, r + 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });
          exRow.querySelector('.btn-remove-extra')?.addEventListener('click', () => {
            p.extras.splice(exIdx, 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });

          extrasContainer.appendChild(exRow);
        });

        extrasCol.querySelector('.btn-add-extra')?.addEventListener('click', () => {
          const selectedId = extrasCol.querySelector('.select-add-extra').value;
          const exDef = EXTRAS_CATALOG.find(e => e.id === selectedId);
          if (!p.extras) p.extras = [];
          p.extras.push({
            id: exDef.id,
            name: exDef.name,
            cost: exDef.cost,
            isFlat: exDef.isFlat,
            isRanked: exDef.isRanked,
            rank: 1
          });
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });

        // --- Flaws Column ---
        const flawsCol = document.createElement('div');
        flawsCol.className = 'power-section-box';
        flawsCol.innerHTML = `
          <div class="power-section-header">
            <span style="font-weight: 800; font-size: var(--font-size-xs); color: var(--hero-red);">➖ Flaws & Devices (★ = Unique Modifier)</span>
          </div>
          <div style="display: flex; gap: 0.35rem; margin-bottom: 0.45rem;">
            <select class="select-add-flaw" style="flex: 1; font-size: var(--font-size-xs);">
              ${FLAWS_CATALOG.map(fl => `<option value="${fl.id}">${fl.name} (${fl.isDevice ? `Device -${fl.discountPer5}/5` : fl.isFlat ? `-${fl.cost} flat` : `-${fl.cost}/rank`})</option>`).join('')}
            </select>
            <button class="btn btn-outline btn-add-flaw" style="font-size: 0.72rem; min-height: 28px; padding: 0.15rem 0.5rem; white-space: nowrap;">+ Add Flaw</button>
          </div>
          <div class="flaws-items-container" style="display: flex; flex-direction: column; gap: 0.35rem;"></div>
        `;

        const flawsContainer = flawsCol.querySelector('.flaws-items-container');
        (p.flaws || []).forEach((fl, flIdx) => {
          const flDef = FLAWS_CATALOG.find(f => f.id === fl.id) || fl;
          const r = parseInt(fl.rank, 10) || 1;
          const maxR = flDef.maxRank || 5;
          const minR = flDef.minRank || 1;

          const flRow = document.createElement('div');
          flRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 0.3rem 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05);';
          flRow.innerHTML = `
            <div style="flex: 1;">
              <span style="font-size: var(--font-size-xs); font-weight: 700; color: ${flDef.isUnique ? 'var(--hero-gold)' : 'var(--text-bright)'};">
                ${flDef.name}
              </span>
              <span style="font-size: 0.68rem; color: var(--text-muted); margin-left: 0.35rem;">
                ${flDef.isDevice ? `(Device -${flDef.discountPer5}/5 PP)` : flDef.isFlat ? `(-${flDef.cost} flat)` : `(-${flDef.cost}/rank)`}
              </span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              ${flDef.isRanked ? `
                <div class="stepper-control">
                  <button class="btn-stepper compact btn-fl-minus" ${r <= minR ? 'disabled' : ''}>-</button>
                  <span class="stepper-value compact">${r}</span>
                  <button class="btn-stepper compact btn-fl-plus" ${r >= maxR ? 'disabled' : ''}>+</button>
                </div>
              ` : ''}
              <button class="btn btn-outline btn-remove-flaw" style="padding: 0.1rem 0.35rem; min-height: 24px; font-size: 0.68rem;">✕</button>
            </div>
          `;

          flRow.querySelector('.btn-fl-minus')?.addEventListener('click', () => {
            fl.rank = Math.max(minR, r - 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });
          flRow.querySelector('.btn-fl-plus')?.addEventListener('click', () => {
            fl.rank = Math.min(maxR, r + 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });
          flRow.querySelector('.btn-remove-flaw')?.addEventListener('click', () => {
            p.flaws.splice(flIdx, 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });

          flawsContainer.appendChild(flRow);
        });

        flawsCol.querySelector('.btn-add-flaw')?.addEventListener('click', () => {
          const selectedId = flawsCol.querySelector('.select-add-flaw').value;
          const flDef = FLAWS_CATALOG.find(f => f.id === selectedId);
          if (!p.flaws) p.flaws = [];
          p.flaws.push({
            id: flDef.id,
            name: flDef.name,
            cost: flDef.cost,
            isFlat: flDef.isFlat,
            isRanked: flDef.isRanked,
            isDevice: flDef.isDevice,
            discountPer5: flDef.discountPer5,
            rank: 1
          });
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });

        modGrid.appendChild(extrasCol);
        modGrid.appendChild(flawsCol);
        body.appendChild(modGrid);

        // Row 4: Power Arrays & Alternate Effects (Standard 1 PP, Dynamic 2 PP)
        const aeSection = document.createElement('div');
        aeSection.className = 'power-section-box';
        aeSection.innerHTML = `
          <div class="power-section-header">
            <div>
              <strong style="color: var(--hero-blue); font-size: var(--font-size-xs);">⚡ Power Array & Alternate Effects (AE)</strong>
              <label style="font-size: 0.72rem; color: var(--text-muted); margin-left: 0.85rem; cursor: pointer;">
                <input type="checkbox" class="cb-dynamic-array" ${p.isDynamicArray ? 'checked' : ''} style="vertical-align: middle; margin-right: 0.3rem;">
                Dynamic Array (+1 PP base)
              </label>
            </div>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn btn-outline btn-add-standard-ae" style="font-size: 0.7rem; min-height: 26px; padding: 0.1rem 0.45rem;">➕ Standard AE (1 PP)</button>
              <button class="btn btn-outline btn-add-dynamic-ae" style="font-size: 0.7rem; min-height: 26px; padding: 0.1rem 0.45rem; border-color: rgba(245, 158, 11, 0.5); color: var(--hero-gold);">➕ Dynamic AE (2 PP)</button>
            </div>
          </div>
          <div class="ae-items-container" style="display: flex; flex-direction: column; gap: 0.3rem;"></div>
        `;

        aeSection.querySelector('.cb-dynamic-array')?.addEventListener('change', (e) => {
          p.isDynamicArray = e.target.checked;
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });

        const aeContainer = aeSection.querySelector('.ae-items-container');
        (p.alternateEffects || []).forEach((ae, aeIdx) => {
          const aeRow = document.createElement('div');
          aeRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 0.3rem 0.5rem; border-radius: 4px;';
          aeRow.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
              <span class="badge-tag ${ae.isDynamic ? 'dynamic' : 'ae'}">${ae.isDynamic ? 'Dynamic (2 PP)' : 'Standard (1 PP)'}</span>
              <input type="text" class="input-ae-name" value="${ae.name || 'Alternate Power'}" style="flex: 1; padding: 0.2rem 0.4rem; font-size: var(--font-size-xs);">
            </div>
            <div style="margin-left: 0.5rem;">
              <button class="btn btn-danger btn-delete-ae" style="padding: 0.1rem 0.35rem; min-height: 24px; font-size: 0.68rem;">🗑️</button>
            </div>
          `;

          aeRow.querySelector('.input-ae-name')?.addEventListener('input', (e) => {
            ae.name = e.target.value;
            this.saveAndAudit();
          });
          aeRow.querySelector('.btn-delete-ae')?.addEventListener('click', () => {
            p.alternateEffects.splice(aeIdx, 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });

          aeContainer.appendChild(aeRow);
        });

        aeSection.querySelector('.btn-add-standard-ae')?.addEventListener('click', () => {
          if (!p.alternateEffects) p.alternateEffects = [];
          p.alternateEffects.push({
            id: 'ae_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name: `${p.name} (Alt Form)`,
            isDynamic: false,
            rank: p.rank
          });
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });

        aeSection.querySelector('.btn-add-dynamic-ae')?.addEventListener('click', () => {
          if (!p.alternateEffects) p.alternateEffects = [];
          p.alternateEffects.push({
            id: 'ae_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name: `${p.name} (Dynamic Alt)`,
            isDynamic: true,
            rank: p.rank
          });
          p.isDynamicArray = true;
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });

        body.appendChild(aeSection);

        // Row 5: Linked Powers
        const linkedSection = document.createElement('div');
        linkedSection.className = 'power-section-box';
        linkedSection.innerHTML = `
          <div class="power-section-header">
            <div>
              <strong style="color: var(--hero-purple); font-size: var(--font-size-xs);">🔗 Linked Powers (Simultaneous Actions)</strong>
              <span style="font-size: 0.7rem; color: var(--text-muted); margin-left: 0.5rem;">Shares action (${p.action}), range (${rd.effectiveRange}), and duration (${rd.effectiveDuration}). Costs sum together.</span>
            </div>
            <button class="btn btn-outline btn-add-linked-effect" style="font-size: 0.7rem; min-height: 26px; padding: 0.1rem 0.45rem;">➕ Add Linked Effect</button>
          </div>
          <div class="linked-items-container" style="display: flex; flex-direction: column; gap: 0.35rem;"></div>
        `;

        const linkedContainer = linkedSection.querySelector('.linked-items-container');
        (p.linkedEffects || []).forEach((le, leIdx) => {
          const leCost = calculatePowerCost({ ...le, alternateEffects: [], linkedEffects: [] });
          const leRow = document.createElement('div');
          leRow.style.cssText = 'display: grid; grid-template-columns: 2fr 2fr 100px 70px 40px; gap: 0.4rem; align-items: center; background: rgba(0,0,0,0.2); padding: 0.3rem 0.5rem; border-radius: 4px;';
          leRow.innerHTML = `
            <div>
              <input type="text" class="input-le-name" value="${le.name || 'Linked Effect'}" placeholder="Linked Effect Name" style="width: 100%; font-size: var(--font-size-xs); padding: 0.2rem 0.4rem;">
            </div>
            <div>
              <select class="select-le-effect" style="width: 100%; font-size: var(--font-size-xs);">
                ${POWER_EFFECTS_CATALOG.map(e => `<option value="${e.id}" ${le.effect?.id === e.id ? 'selected' : ''}>${e.name} (${e.baseCost} PP/rank)</option>`).join('')}
              </select>
            </div>
            <div class="stepper-control">
              <button class="btn-stepper compact btn-le-minus">-</button>
              <span class="stepper-value compact">${le.rank || 1}</span>
              <button class="btn-stepper compact btn-le-plus">+</button>
            </div>
            <div style="font-weight: 800; color: var(--hero-purple); font-size: var(--font-size-xs); text-align: right;">
              +${leCost} PP
            </div>
            <div style="text-align: right;">
              <button class="btn btn-danger btn-delete-le" style="padding: 0.1rem 0.35rem; min-height: 24px; font-size: 0.68rem;">🗑️</button>
            </div>
          `;

          leRow.querySelector('.input-le-name')?.addEventListener('input', (e) => {
            le.name = e.target.value;
            this.saveAndAudit();
          });
          leRow.querySelector('.select-le-effect')?.addEventListener('change', (e) => {
            le.effect = POWER_EFFECTS_CATALOG.find(eff => eff.id === e.target.value) || POWER_EFFECTS_CATALOG[0];
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });
          leRow.querySelector('.btn-le-minus')?.addEventListener('click', () => {
            le.rank = Math.max(1, (parseInt(le.rank, 10) || 1) - 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });
          leRow.querySelector('.btn-le-plus')?.addEventListener('click', () => {
            le.rank = (parseInt(le.rank, 10) || 1) + 1;
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });
          leRow.querySelector('.btn-delete-le')?.addEventListener('click', () => {
            p.linkedEffects.splice(leIdx, 1);
            this.saveAndAudit();
            this.renderPowersTab(auditCharacter(this.char));
          });

          linkedContainer.appendChild(leRow);
        });

        linkedSection.querySelector('.btn-add-linked-effect')?.addEventListener('click', () => {
          if (!p.linkedEffects) p.linkedEffects = [];
          const affEff = POWER_EFFECTS_CATALOG.find(e => e.id === 'affliction') || POWER_EFFECTS_CATALOG[0];
          p.linkedEffects.push({
            id: 'le_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name: 'Secondary Effect',
            effect: affEff,
            rank: p.rank || 10,
            action: p.action,
            range: rd.effectiveRange,
            duration: rd.effectiveDuration,
            extras: [],
            flaws: []
          });
          this.saveAndAudit();
          this.renderPowersTab(auditCharacter(this.char));
        });

        body.appendChild(linkedSection);

        // Row 6: Notes & Collapse Bar
        const footerBar = document.createElement('div');
        footerBar.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.65rem;';
        footerBar.innerHTML = `
          <div style="flex: 1; margin-right: 1rem;">
            <input type="text" class="input-power-notes" value="${p.notes || ''}" placeholder="Power Notes & Mechanics (e.g. DC, special conditions)" style="width: 100%; font-size: var(--font-size-xs);">
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="font-weight: 900; color: var(--hero-gold); font-size: var(--font-size-md);">
              Total: ${cost} PP
            </div>
            <button class="btn btn-outline btn-collapse-card" style="font-size: var(--font-size-xs); min-height: 30px;">
              ▲ Collapse Card
            </button>
          </div>
        `;

        footerBar.querySelector('.input-power-notes')?.addEventListener('input', (e) => {
          p.notes = e.target.value;
          this.saveAndAudit();
        });
        footerBar.querySelector('.btn-collapse-card')?.addEventListener('click', () => {
          this.expandedPowerIds.delete(p.id);
          this.renderPowersTab(auditCharacter(this.char));
        });

        body.appendChild(footerBar);
        card.appendChild(body);
      }

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

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      window.app = new AppController();
    });
  } else {
    window.app = new AppController();
  }
}
