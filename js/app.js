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
  AFFLICTION_CONDITIONS,
  IMMUNITY_OPTIONS_CATALOG,
  WEAKEN_CONFIG_OPTIONS,
  NULLIFY_CONFIG_OPTIONS,
  SENSES_OPTIONS_CATALOG,
  calculatePowerCost,
  auditCharacter,
  getStrengthLiftingCapacity,
  getTraitDefinition,
  computePowerRangeAndDuration,
  computePowerEffectiveStats,
  validateModifierLegality,
  isModifierLegalForEffect
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
    this.expandedAeIds = new Set();

    // Interactive Archetype Wizard State (No default archetype loaded)
    this.wizardState = {
      step: 1,
      selectedArchetypeId: null,
      selectedSpecializationId: null,
      selectedComplication: null,
      heroName: ''
    };

    this.lastFailedCheck = null;
    this.lastCheck = null;

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
    this.setupAbilitiesDefensesModal();
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

    // Power Level (PL) Steppers & Lock (Top Row)
    const plMinusBtn = document.getElementById('btn-pl-minus');
    const plPlusBtn = document.getElementById('btn-pl-plus');
    const plLockCb = document.getElementById('header-pl-lock');

    plLockCb?.addEventListener('change', (e) => {
      this.char.plLocked = e.target.checked;
      this.saveAndAudit();
      this.renderHeaderStatus();
    });

    plPlusBtn?.addEventListener('click', () => {
      if (this.char.plLocked) return;
      const currentPL = parseInt(this.char.powerLevel, 10) || 10;
      if (currentPL >= 25) return;
      const nextPL = currentPL + 1;
      this.char.powerLevel = nextPL;
      this.char.powerPointsBudget = nextPL * 15;
      this.saveAndAudit();
      this.renderAll();
    });

    plMinusBtn?.addEventListener('click', async () => {
      if (this.char.plLocked) return;
      const currentPL = parseInt(this.char.powerLevel, 10) || 10;
      if (currentPL <= 1) return;
      const prevPL = currentPL - 1;
      const newBudget = prevPL * 15;
      const audit = auditCharacter(this.char);

      if (audit.totalSpent > newBudget) {
        await this.showAlertDialog(
          `Cannot reduce Power Level to PL ${prevPL}.\n\nTotal spent Power Points (${audit.totalSpent} PP) would cause a PP cost overrun against the new budget of ${newBudget} PP (15 PP per PL).\n\nPlease recover spent PP first by reducing abilities, defenses, skills, advantages, or powers.`,
          { title: 'Power Points Cost Overrun' }
        );
        return;
      }

      this.char.powerLevel = prevPL;
      this.char.powerPointsBudget = newBudget;
      this.saveAndAudit();
      this.renderAll();
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
  // 4b. ABILITIES & DEFENSES POP-UP DIALOG
  // =======================================================
  setupAbilitiesDefensesModal() {
    const openBtn = document.getElementById('btn-open-abilities-dialog');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        this.openModal('modal-abilities-defenses');
      });
    }
    const editAbilitiesBtn = document.getElementById('btn-action-edit-abilities');
    if (editAbilitiesBtn) {
      editAbilitiesBtn.addEventListener('click', () => {
        this.openModal('modal-abilities-defenses');
      });
    }
    const editDefensesBtn = document.getElementById('btn-action-edit-defenses');
    if (editDefensesBtn) {
      editDefensesBtn.addEventListener('click', () => {
        this.openModal('modal-abilities-defenses');
      });
    }
    const closeBtn = document.getElementById('btn-close-abilities-dialog');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal('modal-abilities-defenses');
      });
    }
    const doneBtn = document.getElementById('btn-done-abilities-dialog');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        this.closeModal('modal-abilities-defenses');
      });
    }
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

    document.getElementById('btn-wizard-next').addEventListener('click', async () => {
      if (this.wizardState.step === 1) {
        if (!this.wizardState.selectedArchetypeId) {
          await this.showAlertDialog('Please select an archetype from the list before proceeding.', { title: 'Selection Required' });
          return;
        }
        this.wizardState.step = 2;
        this.renderWizardStep();
      } else if (this.wizardState.step === 2) {
        this.wizardState.step = 3;
        this.renderWizardStep();
      } else if (this.wizardState.step === 3) {
        await this.finishArchetypeWizard();
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
              <span style="font-size: var(--font-size-xs); color: var(--hero-gold); font-weight: 700;">PL ${arch.powerLevel}</span>
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
            <div style="display: flex; gap: 1rem; font-size: var(--font-size-xs); color: var(--hero-cyan); font-weight: 700;">
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

  async finishArchetypeWizard() {
    const activeName = this.char.name || 'Current Character';
    const confirmed = await this.showConfirmDialog(
      `⚠️ WARNING: Applying this archetype will overwrite all currently loaded character data for "${activeName}".\n\nAre you sure you want to proceed and replace the active character?`,
      { title: 'Overwrite Character', confirmText: 'Apply Archetype', confirmClass: 'btn-danger' }
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
    await this.showAlertDialog(`Archetype successfully applied! "${newHero.name}" is now the active character.`, { title: 'Archetype Applied' });
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

    const executeRoll = async () => {
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
        await this.showAlertDialog(err.message, { title: 'Dice Roll Error' });
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
    if (roll && roll.rollType !== 'initiative') {
      this.lastCheck = roll;
      if (roll.outcomeClass === 'failure' || roll.outcome === 'Failure') {
        this.lastFailedCheck = roll;
      }
    }

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

  showTraitRulesDialog(id, type, name) {
    const trait = getTraitDefinition(id, type, name);
    if (!trait) return;
    const cat = trait.traitType ? (trait.traitType.charAt(0).toUpperCase() + trait.traitType.slice(1)) : (type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Official 3E Rule');
    const title = `${trait.name || name}${trait.short ? ` (${trait.short})` : ''} • ${cat}`;
    let body = trait.desc || 'No official rules description available.';
    if (trait.ability) {
      const ab = ABILITIES.find(a => a.id === trait.ability);
      body += `\n\nGoverning Ability: ${ab ? `${ab.name} (${ab.short})` : trait.ability.toUpperCase()}`;
    }
    this.showAlertDialog(body, { title, icon: '📖' });
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
    document.getElementById('menu-action-new')?.addEventListener('click', async () => {
      closeDropdown();
      const name = await this.showPromptDialog({
        title: 'New Superhero',
        label: 'Enter superhero name for freeform creation:',
        defaultValue: 'New Champion',
        confirmText: 'Create Hero'
      });
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
      reader.onload = async (event) => {
        try {
          const loadedChar = storageManager.parseMM3File(event.target.result);
          if (loadedChar) {
            this.char = loadedChar;
            this.currentFileHandle = null;
            this.saveAndAudit();
            this.loadCharacterToUI();
            await this.showAlertDialog(`Successfully loaded "${loadedChar.name}"!`, { title: 'Character Loaded' });
          }
        } catch (err) {
          await this.showAlertDialog('Failed to load character file: ' + err.message, { title: 'Load Error' });
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
    document.getElementById('btn-header-update-alert')?.addEventListener('click', () => {
      this.checkForUpdates({ isManual: true });
    });
  }

  async checkForUpdates({ isManual = false } = {}) {
    const CURRENT_VERSION = '3.24';
    const versionEl = document.getElementById('header-version-tag');
    const updateBtn = document.getElementById('btn-header-update-alert');
    if (typeof window === 'undefined' || !window.location || !window.location.href || window.location.href === 'about:blank') return;
    try {
      const url = new URL('version.json', window.location.href);
      url.searchParams.set('t', Date.now().toString());
      const res = await fetch(url.toString(), { cache: 'no-store' });
      if (!res.ok) {
        if (versionEl) {
          versionEl.textContent = `v${CURRENT_VERSION}`;
          versionEl.className = 'header-version-tag up-to-date';
        }
        if (isManual) await this.showAlertDialog('Could not check for updates (server responded with error).', { title: 'Update Check' });
        return;
      }
      const data = await res.json();
      const remoteVersion = data.version;
      const isOutdated = !!(remoteVersion && remoteVersion !== CURRENT_VERSION);

      if (versionEl) {
        versionEl.textContent = `v${CURRENT_VERSION}`;
        versionEl.className = `header-version-tag ${isOutdated ? 'out-of-date' : 'up-to-date'}`;
        versionEl.title = isOutdated ? `Update available: v${remoteVersion}` : `Up to date (v${CURRENT_VERSION})`;
      }
      if (updateBtn) {
        updateBtn.className = `btn-header-update-alert ${isOutdated ? 'out-of-date' : 'up-to-date'}`;
        updateBtn.title = isOutdated ? `Update available (v${remoteVersion}). Click to view.` : 'You are running the latest version. Click to recheck.';
      }

      if (isOutdated) {
        const currEl = document.getElementById('update-curr-version');
        const newEl = document.getElementById('update-new-version');
        const notesEl = document.getElementById('update-notes');
        if (currEl) currEl.textContent = `v${CURRENT_VERSION}`;
        if (newEl) newEl.textContent = `v${remoteVersion}`;
        if (notesEl) notesEl.textContent = data.releaseNotes || 'Bug fixes and performance improvements.';
        this.openModal('modal-update-alert');
      } else if (isManual) {
        await this.showAlertDialog(`You are up to date! Mutants & Masterminds Character Editor is running the latest version (v${CURRENT_VERSION}).`, { title: 'Up to Date' });
      }
    } catch (err) {
      if (versionEl) {
        versionEl.textContent = `v${CURRENT_VERSION}`;
        versionEl.className = 'header-version-tag up-to-date';
      }
      if (isManual) await this.showAlertDialog('Could not check for updates. Please check your internet connection.', { title: 'Update Check' });
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
    document.getElementById('btn-load-modal-new-freeform')?.addEventListener('click', async () => {
      this.closeModal('modal-load-character');
      const name = await this.showPromptDialog({
        title: 'New Superhero',
        label: 'Enter superhero name for freeform creation:',
        defaultValue: 'New Champion',
        confirmText: 'Create Hero'
      });
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
        await this.showAlertDialog('Please enter a superhero name.', { title: 'Required Field' });
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
            ${c.name || 'Unnamed Hero'} ${isCurrent ? '<span style="font-size: var(--font-size-xs); background: var(--hero-cyan); color: #000; padding: 1px 5px; border-radius: 3px; font-weight: 800; margin-left: 0.4rem;">ACTIVE</span>' : ''}
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
            PL ${c.powerLevel || 10} • ${c.campaign || 'Earth-Prime'} • ${c.powerPointsBudget || 150} PP
          </div>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          ${!isCurrent ? `<button class="btn btn-primary btn-load-char" data-id="${c.id}" style="font-size: var(--font-size-sm); min-height: 30px; padding: 0.2rem 0.6rem;">Load</button>` : ''}
          <button class="btn btn-danger btn-delete-char" data-id="${c.id}" style="font-size: var(--font-size-sm); min-height: 30px; padding: 0.2rem 0.6rem;" title="Delete hero">🗑️</button>
        </div>
      `;

      card.querySelector('.btn-load-char')?.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        storageManager.setActiveCharacter(id);
        this.char = storageManager.getActiveCharacter();
        this.renderAll();
        this.closeModal('modal-load-character');
      });

      card.querySelector('.btn-delete-char')?.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        const confirmed = await this.showConfirmDialog(`Delete character "${c.name}"?`, {
          title: 'Delete Character',
          confirmText: 'Delete',
          confirmClass: 'btn-danger'
        });
        if (confirmed) {
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

    document.getElementById('btn-hp-exec-reroll').addEventListener('click', async () => {
      if ((this.char.heroPoints || 0) <= 0) {
        await this.showAlertDialog('You have no Hero Points left!', { title: 'Hero Points' });
        return;
      }

      const targetCheck = this.lastFailedCheck || diceRoller.lastFailedCheck || this.lastCheck || diceRoller.mostRecentCheck;
      if (!targetCheck) {
        await this.showAlertDialog('No previous check has been rolled to reroll yet! Make an attack, resistance, or skill check first.', { title: 'No Check to Reroll' });
        return;
      }

      // Revert previous failed check conditions if it was a toughness failure
      if (targetCheck.rollType === 'toughness' && (targetCheck.outcomeClass === 'failure' || targetCheck.outcome === 'Failure')) {
        if (targetCheck.appliedToughnessPenalties) {
          const pen = targetCheck.appliedToughnessPenalties;
          if (pen.bruiseAdded && (this.char.bruises || 0) > 0) {
            this.char.bruises = Math.max(0, this.char.bruises - pen.bruiseAdded);
          }
          if (pen.dazedAdded && this.char.conditions) this.char.conditions.dazed = false;
          if (pen.staggeredAdded && this.char.conditions) this.char.conditions.staggered = false;
          if (pen.hinderedAdded && this.char.conditions) this.char.conditions.hindered = false;
          if (pen.incapacitatedAdded && this.char.conditions) this.char.conditions.incapacitated = false;
          if (pen.defenselessAdded && this.char.conditions) this.char.conditions.defenseless = false;
          if (pen.stunnedAdded && this.char.conditions) this.char.conditions.stunned = false;
          if (pen.unawareAdded && this.char.conditions) this.char.conditions.unaware = false;
          if (pen.proneAdded && this.char.conditions) this.char.conditions.prone = false;
        } else {
          if ((this.char.bruises || 0) > 0) this.char.bruises--;
          if (this.char.conditions) {
            if (targetCheck.degrees >= 2) this.char.conditions.dazed = false;
            if (targetCheck.degrees >= 3) {
              this.char.conditions.staggered = false;
              this.char.conditions.hindered = false;
            }
            if (targetCheck.degrees >= 4) {
              this.char.conditions.incapacitated = false;
              this.char.conditions.defenseless = false;
              this.char.conditions.stunned = false;
              this.char.conditions.unaware = false;
              this.char.conditions.prone = false;
            }
          }
        }
      }

      // Deduct 1 Hero Point
      this.char.heroPoints--;

      // Reroll the exact check using M&M 3e Hero Point rule (1-10 + 10)
      const reroll = diceRoller.rollCheck({
        title: `${targetCheck.title || 'Check'} (HP Reroll)`,
        characterName: this.char.name,
        modifier: targetCheck.modifier,
        targetDC: targetCheck.targetDC,
        critThreshold: targetCheck.critThreshold || 20,
        isHeroPointReroll: true,
        rollType: targetCheck.rollType || 'general',
        descriptor: targetCheck.descriptor || '',
        damageRank: targetCheck.damageRank,
        extraText: targetCheck.extraText ? `${targetCheck.extraText} [HP 1-10 + 10]` : '[HP 1-10 + 10]'
      });

      // If this was a toughness check and failed again, reapply damage penalties
      if (reroll.rollType === 'toughness' && (reroll.outcomeClass === 'failure' || reroll.outcome === 'Failure')) {
        reroll.appliedToughnessPenalties = {
          bruiseAdded: 1,
          dazedAdded: !this.char.conditions?.dazed && reroll.degrees >= 2,
          staggeredAdded: !this.char.conditions?.staggered && reroll.degrees >= 3,
          hinderedAdded: !this.char.conditions?.hindered && reroll.degrees >= 3,
          incapacitatedAdded: !this.char.conditions?.incapacitated && reroll.degrees >= 4,
          defenselessAdded: !this.char.conditions?.defenseless && reroll.degrees >= 4,
          stunnedAdded: !this.char.conditions?.stunned && reroll.degrees >= 4,
          unawareAdded: !this.char.conditions?.unaware && reroll.degrees >= 4,
          proneAdded: !this.char.conditions?.prone && reroll.degrees >= 4
        };
        this.char.bruises = (this.char.bruises || 0) + 1;
        if (!this.char.conditions) this.char.conditions = {};
        if (reroll.degrees >= 2) this.char.conditions.dazed = true;
        if (reroll.degrees >= 3) {
          this.char.conditions.staggered = true;
          this.char.conditions.dazed = true;
          this.char.conditions.hindered = true;
        }
        if (reroll.degrees >= 4) {
          this.char.conditions.incapacitated = true;
          this.char.conditions.defenseless = true;
          this.char.conditions.stunned = true;
          this.char.conditions.unaware = true;
          this.char.conditions.prone = true;
        }
        this.lastFailedCheck = reroll;
        diceRoller.lastFailedCheck = reroll;
      } else if (reroll.outcomeClass === 'success' || reroll.outcome === 'Success') {
        // Successful reroll clears the failed check
        this.lastFailedCheck = null;
        diceRoller.lastFailedCheck = null;
      }

      discordIntegrator.sendHeroPointSpend(
        this.char.name,
        'Reroll (1-10 + 10 Rule)',
        `Rerolled **${targetCheck.title || 'Previous Check'}**: **${reroll.total}** (${reroll.outcomeDescription || reroll.outcome || 'Total ' + reroll.total})`
      );
      discordIntegrator.sendRollEmbed(reroll);
      this.saveAndAudit();
      this.renderHeaderStatus();
      this.renderActionCenter(auditCharacter(this.char));
      this.displayRollResult(reroll);
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
      document.getElementById(action.id)?.addEventListener('click', async () => {
        if ((this.char.heroPoints || 0) <= 0) {
          await this.showAlertDialog('You have no Hero Points left!', { title: 'Hero Points' });
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

  updateHeroPointModal() {
    const targetCheck = this.lastFailedCheck || diceRoller.lastFailedCheck || this.lastCheck || diceRoller.mostRecentCheck;
    const infoEl = document.getElementById('hp-reroll-target-info');
    const btnEl = document.getElementById('btn-hp-exec-reroll');

    if (infoEl) {
      if (targetCheck) {
        const isFailed = targetCheck.outcomeClass === 'failure' || targetCheck.outcome === 'Failure';
        const dcText = (targetCheck.targetDC !== null && targetCheck.targetDC !== undefined && targetCheck.targetDC !== '') ? ` vs DC ${targetCheck.targetDC}` : '';
        const modStr = (targetCheck.modifier !== undefined && targetCheck.modifier !== null) ? (targetCheck.modifier >= 0 ? `+${targetCheck.modifier}` : `${targetCheck.modifier}`) : '';
        const outcomeDesc = targetCheck.outcomeDescription || targetCheck.outcome || (isFailed ? 'Failure' : 'Success');
        infoEl.innerHTML = `
          <div style="font-weight: 700; color: #fff;">
            ${isFailed ? '⚠️ Failed Check:' : 'Last Check:'} 
            <span style="color: var(--hero-gold);">${targetCheck.title || 'Check'}</span> 
            <span style="color: var(--text-muted); font-size: var(--font-size-xs);">(${modStr || 'no mod'}${dcText})</span>
          </div>
          <div style="font-size: var(--font-size-xs); color: ${isFailed ? 'var(--hero-red)' : 'var(--hero-green)'}; margin-top: 0.2rem;">
            Rolled: <strong>${targetCheck.total}</strong> [${targetCheck.extraText || `d20(${targetCheck.rawDie})${modStr}`}] &bull; ${outcomeDesc}
          </div>
        `;
      } else {
        infoEl.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">No previous check recorded yet.</span>`;
      }
    }

    if (btnEl) {
      if (targetCheck) {
        btnEl.textContent = `🎲 Reroll: ${targetCheck.title || 'Previous Check'}`;
      } else {
        btnEl.textContent = 'Reroll Previous Failed Check';
      }
    }
  }

  // =======================================================
  // 11. POWER PROFILES (Official 3E Profiles Library)
  // =======================================================
  setupPowerProfiles() {
    const select = document.getElementById('power-profiles-select');
    if (!select) return;
    select.innerHTML = '<option value="" disabled selected>-select power profile-</option>';

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

    document.getElementById('btn-apply-profile')?.addEventListener('click', async () => {
      const profileId = select.value;
      if (!profileId) {
        await this.showAlertDialog('Please select a power profile from the library first.', { title: 'No Profile Selected' });
        return;
      }
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
        descriptor: '',
        extras: JSON.parse(JSON.stringify(matchedProfile.extras || [])),
        flaws: JSON.parse(JSON.stringify(matchedProfile.flaws || [])),
        alternateEffects: [],
        notes: matchedProfile.notes || ''
      };

      if (!this.char.powers) this.char.powers = [];
      this.char.powers.push(newPower);
      if (!this.expandedPowerIds) this.expandedPowerIds = new Set();
      this.expandedPowerIds.add(newPower.id);
      this.refreshPowersState();
      await this.showAlertDialog(`Power Profile "${matchedProfile.name}" added to character!`, { title: 'Power Profile Added' });
    });

    document.getElementById('btn-open-custom-power-builder')?.addEventListener('click', () => {
      this.addNewCustomPower();
    });

    document.getElementById('btn-quick-add-power')?.addEventListener('click', () => {
      this.addNewCustomPower();
    });
  }

  refreshPowersState() {
    const audit = this.saveAndAudit();
    this.renderHeaderStatus();
    this.renderPowersTab(audit);
    this.renderActionCenter(audit);
  }

  addNewCustomPower() {
    if (!this.char.powers) this.char.powers = [];
    const baseEff = POWER_EFFECTS_CATALOG.find(e => e.id === 'damage') || POWER_EFFECTS_CATALOG[0];
    const newPower = {
      id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: 'New Power',
      descriptor: '',
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
    this.refreshPowersState();
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
    this.refreshPowersState();
  }

  async deletePower(powerId) {
    const p = (this.char.powers || []).find(p => p.id === powerId);
    if (!p) return;
    const confirmed = await this.showConfirmDialog(`Delete power "${p.name}"?`, {
      title: 'Delete Power',
      confirmText: 'Delete',
      confirmClass: 'btn-danger'
    });
    if (confirmed) {
      this.char.powers = this.char.powers.filter(item => item.id !== powerId);
      if (this.expandedPowerIds) this.expandedPowerIds.delete(powerId);
      this.refreshPowersState();
    }
  }

  // =======================================================
  // 12. CUSTOM POWER BUILDER
  // =======================================================
  setupCustomPowerBuilder() {
    const effectSelect = document.getElementById('builder-base-effect');
    if (effectSelect) {
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
          const actionEl = document.getElementById('builder-action');
          if (actionEl) actionEl.value = def.action || 'Standard';
        }
        this.recalculateCustomBuilder();
      });
    }

    document.getElementById('builder-action')?.addEventListener('change', () => {
      this.recalculateCustomBuilder();
    });

    document.getElementById('builder-power-name')?.addEventListener('input', () => {
      this.recalculateCustomBuilder();
    });

    document.getElementById('builder-power-descriptor')?.addEventListener('input', () => {
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-builder-rank-plus')?.addEventListener('click', () => {
      const valEl = document.getElementById('builder-rank-val');
      if (valEl) {
        valEl.textContent = parseInt(valEl.textContent, 10) + 1;
        this.recalculateCustomBuilder();
      }
    });

    document.getElementById('btn-builder-rank-minus')?.addEventListener('click', () => {
      const valEl = document.getElementById('builder-rank-val');
      if (valEl) {
        valEl.textContent = Math.max(1, parseInt(valEl.textContent, 10) - 1);
        this.recalculateCustomBuilder();
      }
    });

    document.getElementById('btn-builder-add-extra')?.addEventListener('click', () => {
      this.addBuilderExtraRow();
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-builder-add-flaw')?.addEventListener('click', () => {
      this.addBuilderFlawRow();
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-builder-add-ae')?.addEventListener('click', () => {
      this.addBuilderAeRow();
      this.recalculateCustomBuilder();
    });

    document.getElementById('btn-close-power-builder')?.addEventListener('click', () => {
      this.closeModal('modal-power-builder');
    });

    document.getElementById('btn-cancel-power-builder')?.addEventListener('click', () => {
      this.closeModal('modal-power-builder');
    });

    document.getElementById('btn-save-power-builder')?.addEventListener('click', () => {
      this.savePowerFromBuilder();
    });
  }

  openCustomPowerBuilder(powerToEdit = null) {
    if (!powerToEdit) {
      this.addNewCustomPower();
    } else {
      if (!this.expandedPowerIds) this.expandedPowerIds = new Set();
      this.expandedPowerIds.add(powerToEdit.id);
      this.refreshPowersState();
    }
  }

  addBuilderExtraRow(saved = null) {
    const list = document.getElementById('builder-extras-list');
    if (!list) return;
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.45rem; align-items: center; margin-bottom: 0.35rem;';

    const sel = document.createElement('select');
    sel.style.cssText = 'flex: 1; min-height: 34px; font-size: var(--font-size-base); font-weight: 600;';
    const sortedExtras = [...EXTRAS_CATALOG].sort((a, b) => a.name.replace(/^★\s*/, '').localeCompare(b.name.replace(/^★\s*/, '')));
    sortedExtras.forEach(ex => {
      const opt = document.createElement('option');
      opt.value = ex.id;
      opt.textContent = `${ex.name} (${ex.isFlat ? `+${ex.cost} flat` : `+${ex.cost}/rank`})`;
      if (saved && saved.id === ex.id) opt.selected = true;
      sel.appendChild(opt);
    });

    const rankInput = document.createElement('input');
    rankInput.type = 'number';
    rankInput.min = '1';
    rankInput.max = '20';
    rankInput.value = (saved && saved.rank) ? saved.rank : 1;
    rankInput.style.cssText = 'width: 60px; min-height: 34px; font-size: var(--font-size-base); text-align: center; font-weight: 700;';
    rankInput.title = 'Extra Rank';

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'btn btn-outline';
    delBtn.style.cssText = 'min-height: 34px; padding: 0.2rem 0.55rem; font-size: var(--font-size-base); color: #fff; border-color: rgba(255, 255, 255, 0.25);';
    delBtn.textContent = '✕';
    delBtn.title = 'Remove Extra';
    delBtn.addEventListener('click', () => {
      row.remove();
      this.recalculateCustomBuilder();
    });

    sel.addEventListener('change', () => this.recalculateCustomBuilder());
    rankInput.addEventListener('input', () => this.recalculateCustomBuilder());

    row.appendChild(sel);
    row.appendChild(rankInput);
    row.appendChild(delBtn);
    list.appendChild(row);
  }

  addBuilderFlawRow(saved = null) {
    const list = document.getElementById('builder-flaws-list');
    if (!list) return;
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.45rem; align-items: center; margin-bottom: 0.35rem;';

    const sel = document.createElement('select');
    sel.style.cssText = 'flex: 1; min-height: 34px; font-size: var(--font-size-base); font-weight: 600;';
    const sortedFlaws = [...FLAWS_CATALOG].sort((a, b) => a.name.replace(/^★\s*/, '').localeCompare(b.name.replace(/^★\s*/, '')));
    sortedFlaws.forEach(fl => {
      const opt = document.createElement('option');
      opt.value = fl.id;
      opt.textContent = `${fl.name} (${fl.isDevice ? `Device -${fl.discountPer5}/5` : fl.isFlat ? `-${fl.cost} flat` : `-${fl.cost}/rank`})`;
      if (saved && saved.id === fl.id) opt.selected = true;
      sel.appendChild(opt);
    });

    const rankInput = document.createElement('input');
    rankInput.type = 'number';
    rankInput.min = '1';
    rankInput.max = '20';
    rankInput.value = (saved && saved.rank) ? saved.rank : 1;
    rankInput.style.cssText = 'width: 60px; min-height: 34px; font-size: var(--font-size-base); text-align: center; font-weight: 700;';
    rankInput.title = 'Flaw Rank';

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'btn btn-outline';
    delBtn.style.cssText = 'min-height: 34px; padding: 0.2rem 0.55rem; font-size: var(--font-size-base); color: #fff; border-color: rgba(255, 255, 255, 0.25);';
    delBtn.textContent = '✕';
    delBtn.title = 'Remove Flaw';
    delBtn.addEventListener('click', () => {
      row.remove();
      this.recalculateCustomBuilder();
    });

    sel.addEventListener('change', () => this.recalculateCustomBuilder());
    rankInput.addEventListener('input', () => this.recalculateCustomBuilder());

    row.appendChild(sel);
    row.appendChild(rankInput);
    row.appendChild(delBtn);
    list.appendChild(row);
  }

  addBuilderAeRow(saved = null) {
    const list = document.getElementById('builder-ae-list');
    if (!list) return;
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 0.45rem; align-items: center; margin-bottom: 0.35rem;';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Alt Effect Name (e.g. Cone Blast)';
    input.value = saved ? (saved.name || '') : 'Alternate Attack Form';
    input.style.cssText = 'flex: 1; min-height: 34px; font-size: var(--font-size-base);';

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'btn btn-outline';
    delBtn.style.cssText = 'min-height: 34px; padding: 0.2rem 0.55rem; font-size: var(--font-size-base); color: #fff; border-color: rgba(255, 255, 255, 0.25);';
    delBtn.textContent = '✕';
    delBtn.title = 'Remove Alternate Effect';
    delBtn.addEventListener('click', () => {
      row.remove();
      this.recalculateCustomBuilder();
    });

    input.addEventListener('input', () => this.recalculateCustomBuilder());

    row.appendChild(input);
    row.appendChild(delBtn);
    list.appendChild(row);
  }

  recalculateCustomBuilder() {
    const power = this.collectPowerFromBuilder();
    const cost = calculatePowerCost(power);
    const effStats = computePowerEffectiveStats(power.effect, power.extras, power.flaws, power.action);
    const rEl = document.getElementById('builder-derived-range');
    const dEl = document.getElementById('builder-derived-duration');
    const aEl = document.getElementById('builder-derived-area');
    if (rEl) rEl.textContent = effStats.effectiveRange;
    if (dEl) dEl.textContent = effStats.effectiveDuration;
    if (aEl) aEl.textContent = effStats.area;
    document.getElementById('builder-total-pp-display').textContent = `${cost} PP`;
    document.getElementById('builder-formula-display').textContent = `Rank ${power.rank} • Cost: ${cost} Power Points • ${effStats.effectiveRange}, ${effStats.effectiveDuration}, ${effStats.area}`;
  }

  collectPowerFromBuilder() {
    const effectId = document.getElementById('builder-base-effect')?.value || 'damage';
    const effect = POWER_EFFECTS_CATALOG.find(e => e.id === effectId) || { id: effectId, baseCost: 1 };
    const rank = parseInt(document.getElementById('builder-rank-val')?.textContent, 10) || 1;
    const action = document.getElementById('builder-action')?.value || 'Standard';

    const extras = [];
    document.querySelectorAll('#builder-extras-list > div').forEach(row => {
      const s = row.querySelector('select');
      const rInput = row.querySelector('input');
      const def = EXTRAS_CATALOG.find(e => e.id === s?.value);
      if (def) {
        const r = parseInt(rInput?.value, 10) || 1;
        extras.push({
          id: def.id,
          name: def.name,
          cost: def.cost,
          isFlat: def.isFlat,
          isRanked: def.isRanked,
          rank: r
        });
      }
    });

    const flaws = [];
    document.querySelectorAll('#builder-flaws-list > div').forEach(row => {
      const s = row.querySelector('select');
      const rInput = row.querySelector('input');
      const def = FLAWS_CATALOG.find(f => f.id === s?.value);
      if (def) {
        const r = parseInt(rInput?.value, 10) || 1;
        flaws.push({
          id: def.id,
          name: def.name,
          cost: def.cost,
          isFlat: def.isFlat,
          isRanked: def.isRanked,
          isDevice: def.isDevice,
          discountPer5: def.discountPer5,
          rank: r
        });
      }
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
      name: document.getElementById('builder-power-name')?.value.trim() || `${effect.name} Power`,
      descriptor: document.getElementById('builder-power-descriptor')?.value.trim() || '',
      rank,
      effect,
      action,
      range: rd.effectiveRange,
      duration: rd.effectiveDuration,
      extras,
      flaws,
      alternateEffects,
      linkedEffects: this.activePowerEditing?.linkedEffects || [],
      notes: document.getElementById('builder-power-notes')?.value.trim() || ''
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
    if (!this.expandedPowerIds) this.expandedPowerIds = new Set();
    this.expandedPowerIds.add(power.id);

    this.closeModal('modal-power-builder');
    this.refreshPowersState();
  }

  // =======================================================
  // 13. GEAR & HEADQUARTERS (HQ) TAB
  // =======================================================
  setupGearAndHQ() {
    document.getElementById('btn-add-item-gear').addEventListener('click', async () => {
      const name = document.getElementById('new-item-name').value.trim();
      const cost = parseInt(document.getElementById('new-item-cost').value, 10) || 1;
      const desc = document.getElementById('new-item-desc').value.trim();

      if (!name) {
        await this.showAlertDialog('Please enter a gear name.', { title: 'Required Field' });
        return;
      }
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

    const openAddSessionModal = () => {
      this.editingSessionId = null;
      const titleEl = document.getElementById('modal-session-title');
      if (titleEl) titleEl.innerHTML = '<span>📜</span> Log Game Session Entry';

      const now = new Date();
      const dateInput = document.getElementById('input-session-date');
      const timeInput = document.getElementById('input-session-time');
      const titleInput = document.getElementById('input-session-title');
      const notesInput = document.getElementById('input-session-notes');

      if (dateInput) dateInput.value = now.toLocaleDateString();
      if (timeInput) timeInput.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (titleInput) titleInput.value = `Session of ${now.toLocaleDateString()}`;
      if (notesInput) notesInput.value = '';

      this.openModal('modal-log-session');
      setTimeout(() => titleInput?.focus(), 50);
    };

    document.getElementById('btn-add-session-entry')?.addEventListener('click', openAddSessionModal);
    document.getElementById('btn-close-session-modal')?.addEventListener('click', () => this.closeModal('modal-log-session'));
    document.getElementById('btn-cancel-session-modal')?.addEventListener('click', () => this.closeModal('modal-log-session'));

    document.getElementById('btn-save-session-entry')?.addEventListener('click', async () => {
      const title = (document.getElementById('input-session-title')?.value || '').trim();
      if (!title) {
        await this.showAlertDialog('Please enter a session title.', { title: 'Required Field' });
        return;
      }
      const date = (document.getElementById('input-session-date')?.value || new Date().toLocaleDateString()).trim();
      const time = (document.getElementById('input-session-time')?.value || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).trim();
      const notes = (document.getElementById('input-session-notes')?.value || '').trim();

      if (!this.char.historyLog) this.char.historyLog = [];

      if (this.editingSessionId) {
        const item = this.char.historyLog.find(s => s.id === this.editingSessionId);
        if (item) {
          item.title = title;
          item.date = date;
          item.time = time;
          item.notes = notes;
        }
      } else {
        this.char.historyLog.unshift({
          id: 'sess_' + Date.now(),
          date,
          time,
          title,
          notes
        });
      }

      this.saveAndAudit();
      this.renderHistoryTab();
      this.closeModal('modal-log-session');
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
    document.getElementById('btn-discord-save-editor')?.addEventListener('click', async () => {
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
        await this.showAlertDialog('Please enter a Discord Webhook URL.', { title: 'Required Field' });
        return;
      }
      if (mode === 'bot' && (!configData.botToken || !configData.channelId)) {
        await this.showAlertDialog('Please enter both Bot Token and Channel ID for Bot mode.', { title: 'Required Field' });
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
        await this.showAlertDialog(`Test message successfully posted to ${tempConfig.getDisplayName()}!`, { title: 'Discord Connected' });
      } catch (err) {
        await this.showAlertDialog(`Discord Test Failed: ${err.message}`, { title: 'Discord Error' });
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

    document.getElementById('btn-apply-campaign-rules')?.addEventListener('click', async () => {
      this.char.powerLevel = parseInt(campaignPlInput?.value, 10) || 10;
      this.char.powerPointsBudget = parseInt(campaignBudgetInput?.value, 10) || 150;
      this.saveAndAudit();
      this.renderAll();
      await this.showAlertDialog(`Applied: PL ${this.char.powerLevel} with ${this.char.powerPointsBudget} PP budget!`, { title: 'Campaign Rules Updated' });
    });

    // House Rule: Specializations (M&M 4E)
    const specializationsToggle = document.getElementById('settings-toggle-specializations');
    if (specializationsToggle) {
      specializationsToggle.checked = this.isSpecializationRuleEnabled();
      specializationsToggle.addEventListener('change', (e) => {
        this.setSpecializationRule(e.target.checked);
      });
    }

    this.renderDiscordConfigsList();
  }

  isSpecializationRuleEnabled() {
    if (this.char && this.char.settings && typeof this.char.settings.enableSpecializations === 'boolean') {
      return this.char.settings.enableSpecializations;
    }
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('mm3e_houserule_specializations');
      if (saved !== null) return saved === 'true';
    }
    return false; // Default: disabled (official 3E rules)
  }

  setSpecializationRule(enabled) {
    if (!this.char.settings) this.char.settings = {};
    this.char.settings.enableSpecializations = !!enabled;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('mm3e_houserule_specializations', enabled ? 'true' : 'false');
    }
    this.saveAndAudit();
    this.renderAll();
  }

  openSettingsFlyout() {
    const backdrop = document.getElementById('flyout-settings-backdrop');
    const panel = document.getElementById('flyout-settings-panel');
    backdrop?.classList.add('open');
    panel?.classList.add('open');

    const specializationsToggle = document.getElementById('settings-toggle-specializations');
    if (specializationsToggle) {
      specializationsToggle.checked = this.isSpecializationRuleEnabled();
    }

    this.renderDiscordConfigsList();
  }

  renderDiscordConfigsList() {
    const container = document.getElementById('discord-configs-list-container');
    if (!container) return;

    const configs = discordIntegrator.getConfigs();
    if (configs.length === 0) {
      container.innerHTML = `
        <div style="background-color: var(--bg-input); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-color); text-align: center; color: var(--text-muted); font-size: var(--font-size-xs);">
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
              <span style="font-size: var(--font-size-xs); color: var(--text-muted);">
                ${cfg.serverName ? cfg.serverName : ''} ${cfg.channelName ? '#' + cfg.channelName : ''}
              </span>
            </div>
          </div>
          <label style="display: flex; align-items: center; gap: 0.3rem; font-size: var(--font-size-xs); font-weight: 700; cursor: pointer; color: ${cfg.enabled ? 'var(--hero-cyan)' : 'var(--text-muted)'};">
            <input type="checkbox" class="cfg-toggle-enabled" data-id="${cfg.id}" ${cfg.enabled ? 'checked' : ''}> Echo
          </label>
        </div>
        <div style="display: flex; gap: 0.35rem; justify-content: flex-end; margin-top: 0.4rem;">
          <button class="btn btn-outline cfg-btn-test" data-id="${cfg.id}" style="font-size: var(--font-size-sm); padding: 0.2rem 0.6rem; min-height: 28px;">🔔 Test</button>
          <button class="btn btn-outline cfg-btn-edit" data-id="${cfg.id}" style="font-size: var(--font-size-sm); padding: 0.2rem 0.6rem; min-height: 28px;">✏️ Edit</button>
          <button class="btn btn-danger cfg-btn-delete" data-id="${cfg.id}" style="font-size: var(--font-size-sm); padding: 0.2rem 0.6rem; min-height: 28px;">🗑️</button>
        </div>
      `;

      card.querySelector('.cfg-toggle-enabled')?.addEventListener('change', (e) => {
        discordIntegrator.toggleConfigEnabled(cfg.id, e.target.checked);
        this.renderDiscordConfigsList();
      });

      card.querySelector('.cfg-btn-test')?.addEventListener('click', async () => {
        try {
          await discordIntegrator.testConfig(cfg);
          await this.showAlertDialog(`Test roll card sent to ${cfg.getDisplayName()}!`, { title: 'Discord Connected' });
        } catch (err) {
          await this.showAlertDialog(`Test failed: ${err.message}`, { title: 'Discord Error' });
        }
      });

      card.querySelector('.cfg-btn-edit')?.addEventListener('click', () => {
        this.openDiscordConfigEditor(cfg.id);
      });

      card.querySelector('.cfg-btn-delete')?.addEventListener('click', async () => {
        const confirmed = await this.showConfirmDialog(`Remove Discord channel "${cfg.getDisplayName()}"?`, {
          title: 'Remove Discord Channel',
          confirmText: 'Remove',
          confirmClass: 'btn-danger'
        });
        if (confirmed) {
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
      const newName = cloneName || await this.showPromptDialog({
        title: 'Save As (Clone Character)',
        label: 'Enter superhero name for this clone / copy:',
        defaultValue: suggestedCloneName,
        confirmText: 'Save Clone'
      });
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
        await this.showAlertDialog(`Successfully saved "${targetChar.name}" to ${handle.name || 'file'}!`, { title: 'Character Saved' });
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
    await this.showAlertDialog(`Saved "${targetChar.name}" as ${suggestedFileName}!`, { title: 'Character Saved' });
  }

  async loadCharacterFile() {
    const confirmLoad = await this.showConfirmDialog(
      'Loading a character file will replace the current hero in the workspace. Any unsaved changes will be overwritten. Proceed?',
      { title: 'Load Character File', confirmText: 'Load File', confirmClass: 'btn-danger' }
    );
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
        await this.showAlertDialog(`Successfully loaded "${loadedChar.name}" from ${file.name}!`, { title: 'Character Loaded' });
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
    const ppUsedEl = document.getElementById('header-pp-used');
    if (ppUsedEl) ppUsedEl.textContent = `${audit.totalSpent} / ${audit.budget} used`;

    const plDisplayEl = document.getElementById('header-pl-display');
    if (plDisplayEl) plDisplayEl.textContent = `${audit.powerLevel}`;

    const plMinusBtn = document.getElementById('btn-pl-minus');
    const plPlusBtn = document.getElementById('btn-pl-plus');
    const plLockCb = document.getElementById('header-pl-lock');
    const plStepper = document.getElementById('header-pl-stepper');

    const isLocked = !!this.char.plLocked;
    if (plLockCb) plLockCb.checked = isLocked;

    if (isLocked) {
      if (plMinusBtn) plMinusBtn.disabled = true;
      if (plPlusBtn) plPlusBtn.disabled = true;
      if (plStepper) plStepper.style.opacity = '0.55';
    } else {
      if (plMinusBtn) plMinusBtn.disabled = (audit.powerLevel <= 1);
      if (plPlusBtn) plPlusBtn.disabled = (audit.powerLevel >= 25);
      if (plStepper) plStepper.style.opacity = '1';
    }

    const hpValEl = document.getElementById('header-hp-val');
    if (hpValEl) hpValEl.textContent = this.char.heroPoints ?? 1;

    const pNameEl = document.getElementById('header-player-name');
    if (pNameEl) pNameEl.value = this.char.playerName || '';
    const cNameEl = document.getElementById('header-char-name');
    if (cNameEl) cNameEl.value = this.char.name || '';
    const campEl = document.getElementById('header-campaign-name');
    if (campEl) campEl.value = this.char.campaign || 'Earth-Prime';
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
            <span class="rules-link rules-info-badge" data-id="${ab.id}" data-type="ability" data-name="${ab.name}" data-cat="Ability" title="${ab.name} (Click for rules)" style="font-size: var(--font-size-xs); opacity: 0.7; cursor: pointer; padding: 2px 4px; border-radius: 3px;">ℹ️</span>
          </div>
          <div style="display: flex; align-items: baseline; justify-content: space-between; width: 100%;">
            <strong style="font-size: 1.35rem; font-weight: 900; line-height: 1; color: ${effRank !== baseRank ? 'var(--hero-red)' : '#fff'};">${effRank >= 0 ? '+' + effRank : effRank}</strong>
            ${mods.checkPenalty !== 0 ? `<span style="font-size: var(--font-size-xs); color: var(--hero-red); font-weight: 800;">(${mods.checkPenalty})</span>` : ''}
          </div>
        `;

        btn.querySelector('.rules-info-badge')?.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.showTraitRulesDialog(ab.id, 'ability', ab.name);
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
            <span class="rules-link rules-info-badge" data-id="${def.id}" data-type="defense" data-name="${def.name}" data-cat="Defense" title="${def.name} (Click for rules)" style="font-size: var(--font-size-xs); opacity: 0.7; cursor: pointer; padding: 2px 4px; border-radius: 3px;">ℹ️</span>
          </div>
          <div style="display: flex; align-items: baseline; justify-content: space-between; width: 100%; gap: 0.35rem;">
            <div style="display: flex; align-items: baseline; gap: 0.25rem;">
              <strong style="font-size: 1.35rem; font-weight: 900; line-height: 1; color: ${effScore !== baseScore ? 'var(--hero-red)' : 'var(--text-bright)'};">${effScore >= 0 ? '+' + effScore : effScore}</strong>
              ${effScore !== baseScore ? `<span style="font-size: var(--font-size-xs); color: var(--hero-red); font-weight: 800;">*</span>` : ''}
            </div>
            <span style="font-size: var(--font-size-xs); color: ${effScore !== baseScore ? 'var(--hero-red)' : 'var(--text-muted)'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: right; max-width: 110px;" title="${noteText}">
              ${noteText}
            </span>
          </div>
        `;

        btn.querySelector('.rules-info-badge')?.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.showTraitRulesDialog(def.id, 'defense', def.name);
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
            roll.appliedToughnessPenalties = {
              bruiseAdded: 1,
              dazedAdded: !this.char.conditions?.dazed && roll.degrees >= 2,
              staggeredAdded: !this.char.conditions?.staggered && roll.degrees >= 3,
              hinderedAdded: !this.char.conditions?.hindered && roll.degrees >= 3,
              incapacitatedAdded: !this.char.conditions?.incapacitated && roll.degrees >= 4,
              defenselessAdded: !this.char.conditions?.defenseless && roll.degrees >= 4,
              stunnedAdded: !this.char.conditions?.stunned && roll.degrees >= 4,
              unawareAdded: !this.char.conditions?.unaware && roll.degrees >= 4,
              proneAdded: !this.char.conditions?.prone && roll.degrees >= 4
            };
            this.char.bruises = (this.char.bruises || 0) + 1;
            if (!this.char.conditions) this.char.conditions = {};
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
      const houseRuleActive = this.isSpecializationRuleEnabled();

      // 1. Add all skills that can be used untrained (trainedOnly === false)
      SKILLS_LIST.forEach(def => {
        const instances = (this.char.skills || []).filter(s => s.id === def.id);
        const baseAbVal = parseInt(this.char.abilities?.[def.ability], 10) || 0;

        if (!def.trainedOnly) {
          if (!houseRuleActive && !def.requiresOption3E) {
            // Standard 3E skill: specialty inactive when house rule is disabled
            const ranks = instances.reduce((sum, i) => sum + (parseInt(i.ranks, 10) || 0), 0);
            skillsToRender.push({
              id: def.id,
              name: def.name,
              specialty: '', // Inactive
              ability: def.ability,
              ranks,
              isUntrained: ranks === 0,
              baseBonus: baseAbVal + ranks
            });
          } else {
            // House rule active OR requiresOption3E
            if (instances.length === 0) {
              skillsToRender.push({
                id: def.id,
                name: def.name,
                specialty: '',
                ability: def.ability,
                ranks: 0,
                isUntrained: true,
                baseBonus: baseAbVal
              });
            } else {
              instances.forEach(inst => {
                const ranks = parseInt(inst.ranks, 10) || 0;
                skillsToRender.push({
                  id: def.id,
                  name: def.name,
                  specialty: inst.specialty || '',
                  ability: def.ability,
                  ranks,
                  isUntrained: ranks === 0,
                  baseBonus: baseAbVal + ranks
                });
              });
            }
          }
        }
      });

      // 2. Add any trained-only skills where character has ranks
      (this.char.skills || []).forEach(sk => {
        const ranks = parseInt(sk.ranks, 10) || 0;
        if (ranks > 0) {
          const def = SKILLS_LIST.find(s => s.id === sk.id);
          if (def && def.trainedOnly) {
            const baseAbVal = parseInt(this.char.abilities?.[def.ability], 10) || 0;
            const isSpecialtyActive = houseRuleActive || def.requiresOption3E;
            skillsToRender.push({
              id: sk.id,
              name: def.name,
              specialty: isSpecialtyActive ? (sk.specialty || '') : '',
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
              ? `<span style="font-size: var(--font-size-xs); background: rgba(255,255,255,0.06); padding: 0.1rem 0.35rem; border-radius: 3px; color: var(--text-muted); margin-left: 0.4rem;">Untrained</span>`
              : `<span style="font-size: var(--font-size-xs); background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.3); padding: 0.1rem 0.35rem; border-radius: 3px; color: var(--hero-cyan); margin-left: 0.4rem;">Rank ${sk.ranks}</span>`
            }
          </td>
          <td><strong style="color: var(--text-muted);">${sk.ability.toUpperCase()}</strong></td>
          <td><strong style="color: ${effBonus !== sk.baseBonus ? 'var(--hero-red)' : 'var(--hero-cyan)'}; font-size: var(--font-size-md); font-weight: 900;">${effBonus >= 0 ? '+' : ''}${effBonus}</strong></td>
          <td style="text-align: right;">
            <button class="btn-touch-roll" style="min-height: 30px; padding: 0.2rem 0.65rem; font-size: var(--font-size-sm);">🎲 Roll</button>
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
  // =======================================================
  // 17. ABILITIES & DEFENSES POP-UP TAB RENDER
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
      card.style.cssText = `
        background-color: var(--bg-input);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 0.5rem 0.4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        gap: 0.3rem;
        box-sizing: border-box;
      `;
      card.innerHTML = `
        <div style="width: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
            <div style="display: flex; align-items: center; gap: 0.25rem;">
              <span class="rules-link" data-id="${ab.id}" data-type="ability" data-name="${ab.name}" data-cat="Ability" style="font-weight: 800; font-size: var(--font-size-sm); color: var(--hero-gold); cursor: pointer;" title="Click for rules">${ab.short}</span>
              <span class="rules-info-badge" style="font-size: var(--font-size-xs); opacity: 0.8; cursor: pointer; padding: 1px 3px;" title="View ${ab.name} rules">ℹ️</span>
            </div>
            <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 600;">${val * 2} PP</span>
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--text-muted); text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer;" class="ability-name-label" title="Click for rules">${ab.name}</div>
        </div>
        <div class="stepper-control compact" style="justify-content: center;">
          <button class="btn-stepper compact" data-ab="${ab.id}" data-dir="-1" title="Decrease ${ab.name}">-</button>
          <span class="stepper-value compact" style="min-width: 28px; font-weight: 800;">${val}</span>
          <button class="btn-stepper compact" data-ab="${ab.id}" data-dir="1" title="Increase ${ab.name}">+</button>
        </div>
        <div style="font-size: var(--font-size-xs); color: ${ab.id === 'str' ? 'var(--hero-cyan)' : 'var(--text-muted)'}; min-height: 18px; line-height: 1.2;">
          ${ab.id === 'str' ? `Lift: ${getStrengthLiftingCapacity(val)}` : `Mod: ${val >= 0 ? `+${val}` : val}`}
        </div>
      `;

      const openAbRules = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.showTraitRulesDialog(ab.id, 'ability', ab.name);
      };
      card.querySelector('.rules-link')?.addEventListener('click', openAbRules);
      card.querySelector('.rules-info-badge')?.addEventListener('click', openAbRules);
      card.querySelector('.ability-name-label')?.addEventListener('click', openAbRules);

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
      const abDef = ABILITIES.find(a => a.id === def.ability);
      const abName = abDef ? abDef.short : def.ability.toUpperCase();

      const card = document.createElement('div');
      card.className = 'defense-stepper-card-compact';
      card.style.cssText = `
        background-color: var(--bg-input);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 0.55rem 0.65rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.4rem;
        box-sizing: border-box;
      `;
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span class="rules-link" data-id="${def.id}" data-type="defense" data-name="${def.name}" data-cat="Defense" style="font-weight: 800; font-size: var(--font-size-sm); color: var(--hero-cyan); cursor: pointer;" title="Click for rules">${def.name}</span>
            <span class="rules-info-badge" style="font-size: var(--font-size-xs); opacity: 0.8; cursor: pointer; padding: 1px 3px;" title="View ${def.name} rules">ℹ️</span>
            <span style="font-size: var(--font-size-xs); color: var(--text-muted); margin-left: 0.15rem;">[${abName}]</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 0.35rem;">
            <span style="font-size: var(--font-size-xs); color: var(--text-muted);">Total:</span>
            <strong style="font-size: var(--font-size-md); font-weight: 900; color: var(--text-bright);">${total}</strong>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; font-size: var(--font-size-xs); color: var(--text-muted); background: rgba(0,0,0,0.18); padding: 0.2rem 0.45rem; border-radius: 3px;">
          <span>Base (${abName}): <strong>${baseVal}</strong></span>
          <span>+ Bought: <strong>${bought} PP</strong></span>
        </div>

        <div style="display: flex; justify-content: center; width: 100%;">
          <div class="stepper-control compact">
            <button class="btn-stepper compact" data-def="${def.id}" data-dir="-1" title="Decrease Bought Ranks">-</button>
            <span class="stepper-value compact" style="min-width: 32px; font-weight: 800;">${bought}</span>
            <button class="btn-stepper compact" data-def="${def.id}" data-dir="1" title="Increase Bought Ranks">+</button>
          </div>
        </div>
      `;

      const openDefRules = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.showTraitRulesDialog(def.id, 'defense', def.name);
      };
      card.querySelector('.rules-link')?.addEventListener('click', openDefRules);
      card.querySelector('.rules-info-badge')?.addEventListener('click', openDefRules);

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
    const dtSum = audit.computedDefenses.dodge + audit.computedDefenses.toughness;
    const ptSum = audit.computedDefenses.parry + audit.computedDefenses.toughness;
    const fwSum = audit.computedDefenses.fortitude + audit.computedDefenses.will;

    const dtOver = dtSum > pl2;
    const ptOver = ptSum > pl2;
    const fwOver = fwSum > pl2;

    document.getElementById('pl-caps-report').innerHTML = `
      <div style="background-color: var(--bg-input); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border: 1px solid ${dtOver ? 'var(--hero-red)' : 'var(--border-color)'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <strong style="color: ${dtOver ? 'var(--hero-red)' : 'var(--text-bright)'}; font-size: var(--font-size-sm);">Dodge + Toughness</strong>
          <span style="font-weight: 900; font-size: var(--font-size-sm); color: ${dtOver ? 'var(--hero-red)' : 'var(--hero-green)'};">${dtSum} / ${pl2}</span>
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-muted); line-height: 1.45;">
          <strong>Ranged Defense Cap:</strong> Dodge (${audit.computedDefenses.dodge}) + Toughness (${audit.computedDefenses.toughness}). Governs your protection against ranged attacks.
        </div>
      </div>
      <div style="background-color: var(--bg-input); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border: 1px solid ${ptOver ? 'var(--hero-red)' : 'var(--border-color)'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <strong style="color: ${ptOver ? 'var(--hero-red)' : 'var(--text-bright)'}; font-size: var(--font-size-sm);">Parry + Toughness</strong>
          <span style="font-weight: 900; font-size: var(--font-size-sm); color: ${ptOver ? 'var(--hero-red)' : 'var(--hero-green)'};">${ptSum} / ${pl2}</span>
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-muted); line-height: 1.45;">
          <strong>Close Combat Cap:</strong> Parry (${audit.computedDefenses.parry}) + Toughness (${audit.computedDefenses.toughness}). Governs your protection against melee attacks.
        </div>
      </div>
      <div style="background-color: var(--bg-input); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border: 1px solid ${fwOver ? 'var(--hero-red)' : 'var(--border-color)'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <strong style="color: ${fwOver ? 'var(--hero-red)' : 'var(--text-bright)'}; font-size: var(--font-size-sm);">Fortitude + Will</strong>
          <span style="font-weight: 900; font-size: var(--font-size-sm); color: ${fwOver ? 'var(--hero-red)' : 'var(--hero-green)'};">${fwSum} / ${pl2}</span>
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-muted); line-height: 1.45;">
          <strong>Resistance Checks Cap:</strong> Fortitude (${audit.computedDefenses.fortitude}) + Will (${audit.computedDefenses.will}). Governs biological health vs psychic/mental resolve.
        </div>
      </div>
    `;

    const pill = document.getElementById('pl-compliance-pill');
    if (pill) {
      if (audit.violations.length === 0) {
        pill.textContent = `PL ${audit.powerLevel} Legal`;
        pill.style.background = 'rgba(16,185,129,0.15)';
        pill.style.color = 'var(--hero-green)';
      } else {
        pill.textContent = `${audit.violations.length} Violation${audit.violations.length > 1 ? 's' : ''}`;
        pill.style.background = 'rgba(239,68,68,0.15)';
        pill.style.color = 'var(--hero-red)';
      }
    }
  }

  // =======================================================
  // 18. SKILLS CATALOG TAB (Supports Multiple Instances per Specialty & House Rule)
  // =======================================================
  renderSkillsTab(audit) {
    document.getElementById('skills-cost-display').textContent = `${audit.skillsCost} PP`;
    const tbody = document.getElementById('skills-catalog-tbody');
    tbody.innerHTML = '';

    const houseRuleActive = this.isSpecializationRuleEnabled();

    // Synchronize both House Rule checkboxes
    const hrSkillCb = document.getElementById('toggle-house-rule-specializations');
    if (hrSkillCb) {
      hrSkillCb.checked = houseRuleActive;
      if (!hrSkillCb.dataset.wired) {
        hrSkillCb.dataset.wired = 'true';
        hrSkillCb.addEventListener('change', (e) => {
          this.setSpecializationRule(e.target.checked);
        });
      }
    }
    const hrSettingsCb = document.getElementById('settings-toggle-specializations');
    if (hrSettingsCb) {
      hrSettingsCb.checked = houseRuleActive;
      if (!hrSettingsCb.dataset.wired) {
        hrSettingsCb.dataset.wired = 'true';
        hrSettingsCb.addEventListener('change', (e) => {
          this.setSpecializationRule(e.target.checked);
        });
      }
    }

    // Ensure all skills have an instanceId
    if (this.char.skills) {
      this.char.skills.forEach((s, idx) => {
        if (!s.instanceId) s.instanceId = `sk_${s.id}_${idx}_${Math.random().toString(36).substr(2, 4)}`;
      });
    }

    SKILLS_LIST.forEach(skillDef => {
      const baseVal = parseInt(this.char.abilities?.[skillDef.ability], 10) || 0;
      const isAssignedFocus = !!skillDef.isAssignedFocus;
      const maxRank = skillDef.maxRankPerInstance || 999;
      const allowsSpecialty = skillDef.requiresOption3E || isAssignedFocus || houseRuleActive;

      if (!allowsSpecialty) {
        // Standard 3E skill row (Specialization house rule disabled, and not Close Combat/Expertise/Ranged Combat/Languages/Skill Mastery)
        const instances = (this.char.skills || []).filter(s => s.id === skillDef.id);
        const ranks = instances.reduce((sum, inst) => sum + (parseInt(inst.ranks, 10) || 0), 0);
        const totalBonus = baseVal + ranks;
        const hasStoredSpecialty = instances.some(i => i.specialty);

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <span class="rules-link" data-id="${skillDef.id}" data-type="skill" data-name="${skillDef.name}" data-cat="Official 3E Skill" style="cursor: pointer; font-weight: 700;">
              ${skillDef.name}
            </span>
            ${skillDef.trainedOnly ? '<span style="font-size: var(--font-size-xs); color: var(--hero-red); margin-left: 0.4rem; font-weight: 600;">[Trained Only]</span>' : ''}
            ${hasStoredSpecialty ? '<span style="font-size: var(--font-size-xs); color: var(--text-muted); margin-left: 0.4rem; font-style: italic;" title="Specialization inactive while House Rule is disabled (remembered in data)">[Specialty Inactive]</span>' : ''}
          </td>
          <td><strong style="color: var(--text-muted);">${skillDef.ability.toUpperCase()}</strong></td>
          <td>${baseVal >= 0 ? '+' : ''}${baseVal}</td>
          <td>
            <div class="stepper-control">
              <button class="btn-stepper compact btn-std-minus" ${ranks <= 0 ? 'disabled' : ''}>-</button>
              <span class="stepper-value compact">${ranks}</span>
              <button class="btn-stepper compact btn-std-plus">+</button>
            </div>
          </td>
          <td><strong style="color: var(--hero-cyan); font-size: var(--font-size-md);">${totalBonus >= 0 ? '+' : ''}${totalBonus}</strong></td>
          <td style="text-align: right; color: var(--text-muted); font-size: var(--font-size-xs); font-style: italic;">
            Standard 3E Skill
          </td>
        `;

        row.querySelector('.btn-std-minus')?.addEventListener('click', () => {
          this.updateStandardSkillRanks(skillDef.id, skillDef.name, Math.max(0, ranks - 1));
        });
        row.querySelector('.btn-std-plus')?.addEventListener('click', () => {
          this.updateStandardSkillRanks(skillDef.id, skillDef.name, ranks + 1);
        });

        tbody.appendChild(row);
      } else {
        // Multi-instance specialty/focus skill (Close Combat, Ranged Combat, Expertise, Languages, Skill Mastery, OR any skill when house rule is active)
        const instances = (this.char.skills || []).filter(s => s.id === skillDef.id);

        if (instances.length === 0) {
          // Render default 0-rank row with "+ Specialty" or "+ Focus"
          const totalBonus = baseVal;
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>
              <span class="rules-link" data-id="${skillDef.id}" data-type="skill" data-name="${skillDef.name}" data-cat="${isAssignedFocus ? 'Assigned Focus Skill' : 'Official 3E Skill'}" style="cursor: pointer; font-weight: 700;">
                ${skillDef.name}
              </span>
              ${skillDef.trainedOnly ? '<span style="font-size: var(--font-size-xs); color: var(--hero-red); margin-left: 0.4rem; font-weight: 600;">[Trained Only]</span>' : ''}
              <span style="font-size: var(--font-size-xs); color: var(--text-muted); margin-left: 0.5rem; font-style: italic;">[${isAssignedFocus ? 'No Focus Assigned' : 'No Specialty Assigned'}]</span>
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
              <button class="btn btn-outline btn-skill-add-specialty" style="min-height: 36px; font-size: var(--font-size-base); font-weight: 800; padding: 0.35rem 0.8rem;">+ ${isAssignedFocus ? 'Focus' : 'Specialty'}</button>
            </td>
          `;

          const addAction = () => {
            this.openPrebuiltOptionsModal(`Choose ${isAssignedFocus ? 'Focus' : 'Specialty'} for ${skillDef.name}`, skillDef.options, (selected) => {
              this.addSkillInstance(skillDef.id, skillDef.name, selected, 1);
            });
          };

          row.querySelector('.btn-skill-add-specialty')?.addEventListener('click', addAction);
          row.querySelector('[data-dir="1"]')?.addEventListener('click', addAction);

          tbody.appendChild(row);
        } else {
          // Render each instance
          instances.forEach((inst) => {
            const ranks = parseInt(inst.ranks, 10) || 0;
            const totalBonus = baseVal + ranks;
            const specialty = inst.specialty || '';
            const isCapped = isAssignedFocus && ranks >= maxRank;

            const row = document.createElement('tr');
            row.innerHTML = `
              <td>
                <span class="rules-link" data-id="${skillDef.id}" data-type="skill" data-name="${skillDef.name}" data-cat="${isAssignedFocus ? 'Assigned Focus Skill' : 'Official 3E Skill'}" style="cursor: pointer; font-weight: 700;">
                  ${skillDef.name}
                </span>
                <span class="skill-specialty-badge" style="font-size: var(--font-size-sm); color: var(--hero-gold); margin-left: 0.5rem; font-weight: 800; cursor: pointer; text-decoration: underline dotted;" title="Click to edit ${isAssignedFocus ? 'focus' : 'specialty'}">
                  [${specialty || (isAssignedFocus ? 'Focus Unassigned' : 'General / Unspecified')}]
                </span>
                ${isAssignedFocus ? '<span style="font-size: var(--font-size-xs); color: var(--hero-cyan); margin-left: 0.35rem; font-style: italic;">(1-Rank Focus)</span>' : ''}
              </td>
              <td><strong style="color: var(--text-muted);">${skillDef.ability.toUpperCase()}</strong></td>
              <td>${baseVal >= 0 ? '+' : ''}${baseVal}</td>
              <td>
                <div class="stepper-control">
                  <button class="btn-stepper compact" data-inst-dir="-1" ${ranks <= 0 ? 'disabled' : ''}>-</button>
                  <span class="stepper-value compact">${ranks}</span>
                  <button class="btn-stepper compact" data-inst-dir="1" ${isCapped ? 'disabled title="Max 1 rank per focus. Add another focus for additional ranks."' : ''}>+</button>
                </div>
              </td>
              <td><strong style="color: var(--hero-cyan); font-size: var(--font-size-md);">${totalBonus >= 0 ? '+' : ''}${totalBonus}</strong></td>
              <td style="text-align: right; white-space: nowrap;">
                <button class="btn btn-outline btn-edit-inst-specialty" style="min-height: 36px; font-size: var(--font-size-base); font-weight: 700; padding: 0.35rem 0.75rem;" title="Change ${isAssignedFocus ? 'Focus' : 'Specialty'}">✏️ ${isAssignedFocus ? 'Focus' : 'Specialty'}</button>
                <button class="btn btn-danger btn-delete-inst" style="min-height: 36px; font-size: var(--font-size-base); padding: 0.35rem 0.75rem; margin-left: 0.25rem;" title="Remove this instance">🗑️</button>
              </td>
            `;

            const editAction = () => {
              this.openPrebuiltOptionsModal(`Change ${isAssignedFocus ? 'Focus' : 'Specialty'} for ${skillDef.name}`, skillDef.options, (selected) => {
                inst.specialty = selected;
                this.saveAndAudit();
                this.renderAll();
              });
            };

            row.querySelector('.skill-specialty-badge')?.addEventListener('click', editAction);
            row.querySelector('.btn-edit-inst-specialty')?.addEventListener('click', editAction);

            row.querySelector('[data-inst-dir="-1"]')?.addEventListener('click', () => {
              const curRanks = parseInt(inst.ranks, 10) || 0;
              if (isAssignedFocus && curRanks <= 1) {
                this.removeSkillInstance(inst.instanceId);
              } else {
                inst.ranks = Math.max(0, curRanks - 1);
                this.saveAndAudit();
                this.renderAll();
              }
            });
            row.querySelector('[data-inst-dir="1"]')?.addEventListener('click', () => {
              const curRanks = parseInt(inst.ranks, 10) || 0;
              if (isAssignedFocus && curRanks >= maxRank) {
                return;
              }
              inst.ranks = curRanks + 1;
              this.saveAndAudit();
              this.renderAll();
            });

            row.querySelector('.btn-delete-inst')?.addEventListener('click', () => {
              this.removeSkillInstance(inst.instanceId);
            });

            tbody.appendChild(row);
          });

          // Sub-row to Add Another Specialty / Focus
          const addRow = document.createElement('tr');
          addRow.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
          addRow.innerHTML = `
            <td colspan="6" style="padding: 0.45rem 0.65rem; text-align: left;">
              <button class="btn btn-outline btn-add-another-skill" style="min-height: 38px; font-size: var(--font-size-base); font-weight: 800; padding: 0.4rem 1rem; border-color: rgba(6, 182, 212, 0.5); color: var(--hero-cyan);">
                ➕ Add Another ${skillDef.name} ${isAssignedFocus ? 'Focus' : 'Specialty'}
              </button>
            </td>
          `;

          addRow.querySelector('.btn-add-another-skill')?.addEventListener('click', () => {
            this.openPrebuiltOptionsModal(`Add Another ${isAssignedFocus ? 'Focus' : 'Specialty'} for ${skillDef.name}`, skillDef.options, (selected) => {
              this.addSkillInstance(skillDef.id, skillDef.name, selected, 1);
            });
          });

          tbody.appendChild(addRow);
        }
      }
    });
  }

  updateStandardSkillRanks(id, name, newRanks) {
    if (!this.char.skills) this.char.skills = [];
    const validRanks = Math.max(0, newRanks);
    let instances = this.char.skills.filter(s => s.id === id);

    if (instances.length === 0) {
      if (validRanks > 0) {
        this.char.skills.push({
          id,
          instanceId: `sk_${id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          name,
          specialty: '',
          ranks: validRanks
        });
      }
    } else {
      instances[0].ranks = validRanks;
      for (let i = 1; i < instances.length; i++) {
        instances[i].ranks = 0;
      }
    }

    this.saveAndAudit();
    this.renderAll();
  }

  addSkillInstance(id, name, specialty = '', ranks = 1) {
    if (!this.char.skills) this.char.skills = [];
    const skillDef = SKILLS_LIST.find(s => s.id === id);
    const maxRank = skillDef?.maxRankPerInstance || 999;
    const initialRanks = Math.min(Math.max(1, ranks), maxRank);
    const newInst = {
      id,
      instanceId: `sk_${id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name,
      specialty,
      ranks: initialRanks
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
    this.updateStandardSkillRanks(id, name, newRanks);
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
    const showDescriptions = document.getElementById('adv-show-descriptions')?.checked ?? true;

    ADVANTAGES_DATABASE.forEach(advDef => {
      if (filterCat !== 'all' && advDef.category !== filterCat) return;
      if (search && !advDef.name.toLowerCase().includes(search) && !advDef.desc.toLowerCase().includes(search)) return;

      const existing = (this.char.advantages || []).find(a => a.id === advDef.id);
      const isSelected = !!existing;
      const currentRank = existing ? (parseInt(existing.rank, 10) || 1) : 0;

      const row = document.createElement('div');
      row.className = 'advantage-list-row';
      row.style.cssText = `
        background-color: var(--bg-card);
        border: 1px solid ${isSelected ? 'var(--hero-blue)' : 'var(--border-color)'};
        ${isSelected ? 'box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.25);' : ''}
        border-radius: var(--radius-sm);
        padding: 0.65rem 0.85rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        transition: border-color 0.15s ease;
      `;

      row.innerHTML = `
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 0.25rem;">
            <span class="rules-link adv-name-link" data-id="${advDef.id}" data-type="advantage" data-name="${advDef.name}" data-cat="${advDef.category} Advantage" data-desc="${(advDef.desc || '').replace(/"/g, '&quot;')}" style="font-weight: 700; font-size: var(--font-size-base); color: var(--hero-cyan); cursor: pointer;" title="Click to view description in pop-up">
              ${advDef.name}
            </span>
            <span style="font-size: var(--font-size-xs); background: rgba(255,255,255,0.08); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--text-muted); font-weight: 600;">
              ${advDef.category}
            </span>
            ${isSelected ? `
              <span style="font-size: var(--font-size-xs); background: rgba(37, 99, 235, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); color: #93c5fd; padding: 0.1rem 0.45rem; border-radius: 4px; font-weight: 700;">
                Rank ${currentRank}${advDef.maxRank > 1 ? ` / ${advDef.maxRank}` : ''}
              </span>
            ` : ''}
            ${existing?.note ? `
              <span style="font-size: var(--font-size-xs); background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.35); color: var(--hero-gold); padding: 0.1rem 0.45rem; border-radius: 4px; font-weight: 600;">
                🏷️ ${existing.note}
              </span>
            ` : ''}
          </div>
          ${showDescriptions ? `
            <div class="adv-desc-text" style="font-size: var(--font-size-sm); color: var(--text-muted); line-height: 1.45;">
              ${advDef.desc}
            </div>
          ` : ''}
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
          ${advDef.maxRank > 1 ? `
            <div class="stepper-control" style="background: rgba(0,0,0,0.25);">
              <button class="btn-stepper compact" data-adv="${advDef.id}" data-dir="-1" title="Decrease Rank" ${currentRank <= 0 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''} style="width: 34px; height: 38px; font-size: 1.15rem;">-</button>
              <span class="stepper-value compact" style="min-width: 34px; height: 38px; font-weight: 800; font-size: var(--font-size-base);">${currentRank}</span>
              <button class="btn-stepper compact" data-adv="${advDef.id}" data-dir="1" title="Increase Rank" ${currentRank >= advDef.maxRank ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''} style="width: 34px; height: 38px; font-size: 1.15rem;">+</button>
            </div>
          ` : ''}

          ${advDef.hasOptions ? `
            <button class="btn btn-outline" style="min-height: 38px; font-size: var(--font-size-base); font-weight: 700; padding: 0.35rem 0.8rem;" data-opt-adv="${advDef.id}">
              ${existing?.note ? '✏️ Option' : '+ Option'}
            </button>
          ` : ''}

          <button class="btn ${isSelected ? 'btn-danger' : 'btn-primary'}" style="min-height: 38px; font-size: var(--font-size-base); font-weight: 800; min-width: 84px; padding: 0.35rem 0.9rem;" data-toggle-adv="${advDef.id}">
            ${isSelected ? 'Remove' : '+ Add'}
          </button>
        </div>
      `;

      row.querySelectorAll('.btn-stepper').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = parseInt(btn.dataset.dir, 10);
          this.setAdvantageRank(advDef.id, advDef.name, currentRank + dir, advDef.maxRank);
        });
      });

      row.querySelector('[data-toggle-adv]').addEventListener('click', () => {
        if (!this.char.advantages) this.char.advantages = [];
        if (isSelected) {
          this.char.advantages = this.char.advantages.filter(a => a.id !== advDef.id);
        } else {
          this.char.advantages.push({ id: advDef.id, name: advDef.name, rank: 1 });
        }
        this.renderAll();
      });

      if (advDef.hasOptions) {
        row.querySelector('[data-opt-adv]').addEventListener('click', () => {
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

      grid.appendChild(row);
    });

    const searchBox = document.getElementById('adv-search-box');
    if (!searchBox.dataset.wired) {
      searchBox.dataset.wired = 'true';
      searchBox.addEventListener('input', () => this.renderAdvantagesTab(auditCharacter(this.char)));
      document.getElementById('adv-filter-cat')?.addEventListener('change', () => this.renderAdvantagesTab(auditCharacter(this.char)));
      document.getElementById('adv-show-descriptions')?.addEventListener('change', () => this.renderAdvantagesTab(auditCharacter(this.char)));
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

    const applyOther = async () => {
      const val = (otherInput?.value || '').trim();
      if (val) {
        onSelectCallback(val);
        this.closeModal('modal-prebuilt-options');
      } else {
        await this.showAlertDialog('Please enter a custom specialization name or choose one from the list below.', { title: 'Input Required' });
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
      btn.style.cssText = 'text-align: left; justify-content: flex-start; padding: 0.5rem 0.85rem; font-size: var(--font-size-sm); min-height: 36px;';
      btn.textContent = opt;

      btn.addEventListener('click', () => {
        onSelectCallback(opt);
        this.closeModal('modal-prebuilt-options');
      });

      container.appendChild(btn);
    });

    const otherOptionBtn = document.createElement('button');
    otherOptionBtn.className = 'btn btn-outline';
    otherOptionBtn.style.cssText = 'text-align: left; justify-content: flex-start; padding: 0.5rem 0.85rem; font-size: var(--font-size-sm); min-height: 36px; border-style: dashed; color: var(--hero-gold);';
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

  async linkExistingEffect(power) {
    const otherEffects = (this.char.powers || []).filter(item => item.id !== power.id);
    if (otherEffects.length === 0) {
      await this.showAlertDialog('No other effects added yet. Create another effect on this character first before linking.', {
        title: 'No Other Effects Added Yet',
        icon: '⚠️'
      });
      return;
    }

    const options = otherEffects.map(oe => `${oe.name || 'Unnamed Power'} (${oe.effect?.name || 'Effect'} Rank ${oe.rank || 1})`);
    this.openPrebuiltOptionsModal(
      'Link With Existing Effect',
      options,
      (selectedOpt) => {
        const idx = options.indexOf(selectedOpt);
        const chosen = idx >= 0 ? otherEffects[idx] : otherEffects.find(oe => selectedOpt.startsWith(oe.name));
        if (!chosen) return;
        if (!power.linkedEffects) power.linkedEffects = [];
        power.linkedEffects.push({
          id: 'le_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          name: chosen.name || chosen.effect?.name || 'Linked Effect',
          effect: chosen.effect || POWER_EFFECTS_CATALOG[0],
          rank: chosen.rank || 1,
          action: power.action,
          range: power.effect?.range || 'Personal',
          duration: power.effect?.duration || 'Instant',
          extras: chosen.extras ? JSON.parse(JSON.stringify(chosen.extras)) : [],
          flaws: chosen.flaws ? JSON.parse(JSON.stringify(chosen.flaws)) : []
        });

        if (!power.extras) power.extras = [];
        if (!power.extras.some(ex => ex.id === 'linked')) {
          const linkedDef = EXTRAS_CATALOG.find(x => x.id === 'linked');
          if (linkedDef) power.extras.push({ ...linkedDef, rank: 1 });
        }

        this.refreshPowersState();
      }
    );
  }

  renderEffectConfigSection(p) {
    const effId = p.effect?.id;
    if (!['affliction', 'immunity', 'weaken', 'nullify', 'senses'].includes(effId)) {
      return null;
    }

    const box = document.createElement('div');
    box.className = 'power-unified-subblock';
    box.style.marginTop = '0.35rem';

    if (effId === 'affliction') {
      if (!p.afflictionConfig) {
        p.afflictionConfig = {
          resistedBy: 'Fortitude',
          degree1: 'Dazed',
          degree2: 'Stunned',
          degree3: 'Incapacitated'
        };
      }
      box.innerHTML = `
        <div class="power-section-header">
          <strong style="color: var(--hero-blue); font-size: var(--font-size-xs);">⚙️ Affliction Configuration (3E Degrees of Failure)</strong>
          <span style="font-size: var(--font-size-xs); color: var(--text-muted);">Configure resistance defense and condition per degree</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem; margin-top: 0.4rem;">
          <div>
            <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Resisted / Overcome By:</label>
            <select class="select-aff-resisted" style="width: 100%; font-size: var(--font-size-xs);">
              ${AFFLICTION_CONDITIONS.resistedBy.map(d => `<option value="${d}" ${p.afflictionConfig.resistedBy === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.2rem;">1st Degree (1-5):</label>
            <select class="select-aff-deg1" style="width: 100%; font-size: var(--font-size-xs);">
              ${AFFLICTION_CONDITIONS.degree1.map(c => `<option value="${c}" ${p.afflictionConfig.degree1 === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.2rem;">2nd Degree (6-10):</label>
            <select class="select-aff-deg2" style="width: 100%; font-size: var(--font-size-xs);">
              ${AFFLICTION_CONDITIONS.degree2.map(c => `<option value="${c}" ${p.afflictionConfig.degree2 === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.2rem;">3rd Degree (11+):</label>
            <select class="select-aff-deg3" style="width: 100%; font-size: var(--font-size-xs);">
              ${AFFLICTION_CONDITIONS.degree3.map(c => `<option value="${c}" ${p.afflictionConfig.degree3 === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
      `;

      box.querySelector('.select-aff-resisted')?.addEventListener('change', (e) => {
        p.afflictionConfig.resistedBy = e.target.value;
        this.saveAndAudit();
      });
      box.querySelector('.select-aff-deg1')?.addEventListener('change', (e) => {
        p.afflictionConfig.degree1 = e.target.value;
        this.saveAndAudit();
      });
      box.querySelector('.select-aff-deg2')?.addEventListener('change', (e) => {
        p.afflictionConfig.degree2 = e.target.value;
        this.saveAndAudit();
      });
      box.querySelector('.select-aff-deg3')?.addEventListener('change', (e) => {
        p.afflictionConfig.degree3 = e.target.value;
        this.saveAndAudit();
      });
    } else if (effId === 'immunity') {
      if (!Array.isArray(p.immunityOptions)) {
        p.immunityOptions = [];
      }
      const totalRanks = p.immunityOptions.reduce((acc, cur) => acc + (parseInt(cur.ranks, 10) || 1), 0);

      box.innerHTML = `
        <div class="power-section-header">
          <div>
            <strong style="color: var(--hero-blue); font-size: var(--font-size-xs);">🛡️ Immunity Configuration (Total: ${totalRanks} Ranks)</strong>
            <span style="font-size: var(--font-size-xs); color: var(--text-muted); margin-left: 0.5rem;">Click "+" next to any immunity option to assign it</span>
          </div>
        </div>
        <div style="margin-top: 0.4rem; margin-bottom: 0.5rem;">
          <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Assigned Immunities:</label>
          <div class="assigned-immunities-list" style="display: flex; flex-wrap: wrap; gap: 0.35rem; min-height: 28px; align-items: center; background: rgba(0,0,0,0.2); padding: 0.35rem; border-radius: var(--radius-sm);">
            ${p.immunityOptions.length === 0 ? '<span style="font-size: var(--font-size-xs); color: var(--text-muted); font-style: italic;">No immunities specifically configured yet. Click "+" on options below.</span>' : ''}
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <label style="font-size: var(--font-size-xs); color: var(--text-muted);">Available 3E Immunity Options:</label>
            <input type="text" class="input-filter-immunity" placeholder="Search immunities..." style="font-size: var(--font-size-xs); padding: 0.15rem 0.4rem; max-width: 180px;">
          </div>
          <div class="immunity-options-catalog-list" style="max-height: 190px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem; background: rgba(0,0,0,0.25); padding: 0.4rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          </div>
        </div>
      `;

      const assignedContainer = box.querySelector('.assigned-immunities-list');
      p.immunityOptions.forEach((opt, idx) => {
        const badge = document.createElement('span');
        badge.style.cssText = 'display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(59, 130, 246, 0.18); border: 1px solid var(--hero-blue); border-radius: 4px; padding: 0.15rem 0.4rem; font-size: var(--font-size-xs); color: #fff;';
        badge.innerHTML = `
          <strong>${opt.name}</strong>
          <span style="color: var(--hero-gold); font-weight: 700;">(${opt.ranks} rk)</span>
          <button type="button" class="btn-del-imm-opt" data-idx="${idx}" style="background: none; border: none; color: #fff; cursor: pointer; padding: 0.1rem 0.3rem; font-size: var(--font-size-sm); line-height: 1; opacity: 0.85;" title="Remove immunity">✕</button>
        `;
        badge.querySelector('.btn-del-imm-opt')?.addEventListener('click', () => {
          p.immunityOptions.splice(idx, 1);
          p.rank = Math.max(1, p.immunityOptions.reduce((acc, cur) => acc + (parseInt(cur.ranks, 10) || 1), 0));
          this.refreshPowersState();
        });
        assignedContainer.appendChild(badge);
      });

      const catList = box.querySelector('.immunity-options-catalog-list');
      const renderCatalog = (filterText = '') => {
        catList.innerHTML = '';
        const filterLower = filterText.toLowerCase();
        const filtered = IMMUNITY_OPTIONS_CATALOG.filter(item => !filterText || item.name.toLowerCase().includes(filterLower) || item.category.toLowerCase().includes(filterLower));
        
        let curCat = '';
        filtered.forEach(item => {
          if (item.category !== curCat) {
            curCat = item.category;
            const catHeader = document.createElement('div');
            catHeader.style.cssText = 'font-size: var(--font-size-xs); font-weight: 800; color: var(--hero-blue); text-transform: uppercase; margin-top: 0.35rem; margin-bottom: 0.15rem; padding-bottom: 0.1rem; border-bottom: 1px solid rgba(255,255,255,0.08);';
            catHeader.textContent = curCat;
            catList.appendChild(catHeader);
          }
          const row = document.createElement('div');
          row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0.4rem; background: rgba(255,255,255,0.03); border-radius: 3px; font-size: var(--font-size-xs);';
          row.innerHTML = `
            <div style="flex: 1; margin-right: 0.5rem;">
              <span style="color: var(--text-bright);">${item.name}</span>
              <span style="color: var(--hero-blue); font-weight: 700; margin-left: 0.35rem;">(${item.ranks} ${item.ranks === 1 ? 'rank' : 'ranks'})</span>
            </div>
            <button type="button" class="btn btn-outline btn-add-imm-item" style="padding: 0.15rem 0.55rem; min-height: 28px; font-size: var(--font-size-sm); white-space: nowrap; border-color: var(--hero-blue); color: #fff;">
              ➕ Add
            </button>
          `;
          row.querySelector('.btn-add-imm-item')?.addEventListener('click', () => {
            p.immunityOptions.push({ id: item.id, name: item.name, ranks: item.ranks });
            p.rank = Math.max(1, p.immunityOptions.reduce((acc, cur) => acc + (parseInt(cur.ranks, 10) || 1), 0));
            this.refreshPowersState();
          });
          catList.appendChild(row);
        });
      };

      renderCatalog();
      box.querySelector('.input-filter-immunity')?.addEventListener('input', (e) => {
        renderCatalog(e.target.value);
      });
    } else if (effId === 'senses') {
      if (!Array.isArray(p.sensesOptions)) {
        p.sensesOptions = [];
      }
      const totalRanks = p.sensesOptions.reduce((acc, cur) => acc + (parseInt(cur.ranks, 10) || 1), 0);

      box.innerHTML = `
        <div class="power-section-header">
          <div>
            <strong style="color: var(--hero-blue); font-size: var(--font-size-xs);">👁️ Senses Configuration (Total: ${totalRanks} Ranks)</strong>
            <span style="font-size: var(--font-size-xs); color: var(--text-muted); margin-left: 0.5rem;">Click "+" next to any sensory trait to assign it</span>
          </div>
        </div>
        <div style="margin-top: 0.4rem; margin-bottom: 0.5rem;">
          <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Assigned Senses:</label>
          <div class="assigned-senses-list" style="display: flex; flex-wrap: wrap; gap: 0.35rem; min-height: 28px; align-items: center; background: rgba(0,0,0,0.2); padding: 0.35rem; border-radius: var(--radius-sm);">
            ${p.sensesOptions.length === 0 ? '<span style="font-size: var(--font-size-xs); color: var(--text-muted); font-style: italic;">No senses configured yet. Click "+" on options below.</span>' : ''}
          </div>
        </div>
        <div>
          <div style="margin-bottom: 0.35rem;">
            <label style="font-size: var(--font-size-xs); color: var(--text-muted);">Available 3E Senses Options:</label>
          </div>
          <div class="senses-options-catalog-list" style="max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem; background: rgba(0,0,0,0.25); padding: 0.4rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          </div>
        </div>
      `;

      const assignedContainer = box.querySelector('.assigned-senses-list');
      p.sensesOptions.forEach((opt, idx) => {
        const badge = document.createElement('span');
        badge.style.cssText = 'display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(59, 130, 246, 0.18); border: 1px solid var(--hero-blue); border-radius: 4px; padding: 0.15rem 0.4rem; font-size: var(--font-size-xs); color: #fff;';
        badge.innerHTML = `
          <strong>${opt.name}</strong>
          <span style="color: var(--hero-gold); font-weight: 700;">(${opt.ranks} rk)</span>
          <button type="button" class="btn-del-sens-opt" data-idx="${idx}" style="background: none; border: none; color: #fff; cursor: pointer; padding: 0.1rem 0.3rem; font-size: var(--font-size-sm); line-height: 1; opacity: 0.85;" title="Remove sense">✕</button>
        `;
        badge.querySelector('.btn-del-sens-opt')?.addEventListener('click', () => {
          p.sensesOptions.splice(idx, 1);
          p.rank = Math.max(1, p.sensesOptions.reduce((acc, cur) => acc + (parseInt(cur.ranks, 10) || 1), 0));
          this.refreshPowersState();
        });
        assignedContainer.appendChild(badge);
      });

      const catList = box.querySelector('.senses-options-catalog-list');
      SENSES_OPTIONS_CATALOG.forEach(item => {
        const row = document.createElement('div');
        row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0.4rem; background: rgba(255,255,255,0.03); border-radius: 3px; font-size: var(--font-size-xs);';
        row.innerHTML = `
          <div style="flex: 1; margin-right: 0.5rem;">
            <span style="color: var(--text-bright);">${item.name}</span>
            <span style="color: var(--hero-blue); font-weight: 700; margin-left: 0.35rem;">(${item.ranks} ${item.ranks === 1 ? 'rank' : 'ranks'})</span>
            <span style="color: var(--text-muted); font-size: var(--font-size-xs); margin-left: 0.4rem;">- ${item.desc}</span>
          </div>
          <button type="button" class="btn btn-outline btn-add-sens-item" style="padding: 0.15rem 0.55rem; min-height: 28px; font-size: var(--font-size-sm); white-space: nowrap; border-color: var(--hero-blue); color: #fff;">
            ➕ Add
          </button>
        `;
        row.querySelector('.btn-add-sens-item')?.addEventListener('click', () => {
          p.sensesOptions.push({ id: item.id, name: item.name, ranks: item.ranks });
          p.rank = Math.max(1, p.sensesOptions.reduce((acc, cur) => acc + (parseInt(cur.ranks, 10) || 1), 0));
          this.refreshPowersState();
        });
        catList.appendChild(row);
      });
    } else if (effId === 'weaken') {
      if (!p.weakenConfig) {
        p.weakenConfig = { resistedBy: 'Fortitude', trait: 'Strength' };
      }
      box.innerHTML = `
        <div class="power-section-header">
          <strong style="color: var(--hero-blue); font-size: var(--font-size-xs);">⚙️ Weaken Configuration</strong>
          <span style="font-size: var(--font-size-xs); color: var(--text-muted);">Configure resistance defense and targeted trait</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.4rem;">
          <div>
            <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Resisted / Overcome By:</label>
            <select class="select-weaken-resisted" style="width: 100%; font-size: var(--font-size-xs);">
              ${WEAKEN_CONFIG_OPTIONS.resistedBy.map(d => `<option value="${d}" ${p.weakenConfig.resistedBy === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Targeted Trait:</label>
            <select class="select-weaken-trait" style="width: 100%; font-size: var(--font-size-xs);">
              ${WEAKEN_CONFIG_OPTIONS.traits.map(t => `<option value="${t}" ${p.weakenConfig.trait === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
        </div>
      `;

      box.querySelector('.select-weaken-resisted')?.addEventListener('change', (e) => {
        p.weakenConfig.resistedBy = e.target.value;
        this.saveAndAudit();
      });
      box.querySelector('.select-weaken-trait')?.addEventListener('change', (e) => {
        p.weakenConfig.trait = e.target.value;
        this.saveAndAudit();
      });
    } else if (effId === 'nullify') {
      if (!p.nullifyConfig) {
        p.nullifyConfig = { descriptor: 'Magic', scope: 'Single Descriptor (+0 cost)' };
      }
      box.innerHTML = `
        <div class="power-section-header">
          <strong style="color: var(--hero-blue); font-size: var(--font-size-xs);">⚙️ Nullify Configuration</strong>
          <span style="font-size: var(--font-size-xs); color: var(--text-muted);">Configure nullified descriptor and scope</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.4rem;">
          <div>
            <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Target Descriptor:</label>
            <select class="select-nullify-desc" style="width: 100%; font-size: var(--font-size-xs);">
              ${NULLIFY_CONFIG_OPTIONS.descriptors.map(d => `<option value="${d}" ${p.nullifyConfig.descriptor === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size: var(--font-size-xs); color: var(--text-muted); display: block; margin-bottom: 0.2rem;">Scope:</label>
            <select class="select-nullify-scope" style="width: 100%; font-size: var(--font-size-xs);">
              ${NULLIFY_CONFIG_OPTIONS.scopes.map(s => `<option value="${s}" ${p.nullifyConfig.scope === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
      `;

      box.querySelector('.select-nullify-desc')?.addEventListener('change', (e) => {
        p.nullifyConfig.descriptor = e.target.value;
        this.saveAndAudit();
      });
      box.querySelector('.select-nullify-scope')?.addEventListener('change', (e) => {
        p.nullifyConfig.scope = e.target.value;
        this.saveAndAudit();
      });
    }

    return box;
  }

  showModifierDescriptionDialog(modDef) {
    const isExtra = !!EXTRAS_CATALOG.find(e => e.id === modDef.id);
    const cat = isExtra ? (modDef.isFlat ? 'Flat Extra' : 'Extra') : (modDef.isDevice ? 'Device Discount' : (modDef.isFlat ? 'Flat Flaw' : 'Flaw'));
    const costText = isExtra
      ? (modDef.isFlat ? `+${modDef.cost} flat PP` : `+${modDef.cost} PP/rank`)
      : (modDef.isDevice ? `Device discount (-${modDef.discountPer5}/5 PP)` : (modDef.isFlat ? `-${modDef.cost} flat PP` : `-${modDef.cost} PP/rank`));

    const html = `
      <div style="font-size: var(--font-size-base); line-height: 1.5; color: var(--text-bright);">
        <div style="margin-bottom: 0.65rem;">
          <strong style="color: var(--hero-gold);">${modDef.name}</strong>
          <span style="color: var(--text-muted); margin-left: 0.4rem;">(${cat} • ${costText})</span>
        </div>
        <div style="color: var(--text-bright); margin-bottom: 0.5rem;">
          ${modDef.desc || 'No detailed rules description available.'}
        </div>
      </div>
    `;
    this.showAlertDialog(html, { title: `${modDef.name} — Rules Reference`, icon: '📖' });
  }

  showEffectDescriptionDialog(effectDef) {
    const eff = effectDef || POWER_EFFECTS_CATALOG[0];
    const html = `
      <div style="font-size: var(--font-size-base); line-height: 1.5; color: var(--text-bright);">
        <div style="margin-bottom: 0.65rem;">
          <strong style="color: var(--hero-blue); font-size: 1.15em;">${eff.name}</strong>
          <span style="color: var(--hero-gold); margin-left: 0.5rem; font-weight: 700;">(${eff.baseCost} PP / rank)</span>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: var(--font-size-sm); color: var(--text-muted);">
          <span><strong>Action:</strong> ${eff.action || 'Standard'}</span>
          <span>•</span>
          <span><strong>Range:</strong> ${eff.range || 'Close'}</span>
          <span>•</span>
          <span><strong>Duration:</strong> ${eff.duration || 'Instant'}</span>
          ${eff.resist ? `<span>•</span><span><strong>Resist:</strong> ${eff.resist}</span>` : ''}
        </div>
        <div style="color: var(--text-bright);">
          ${eff.desc || 'No detailed rules description available.'}
        </div>
      </div>
    `;
    this.showAlertDialog(html, { title: `${eff.name} — Effect Description`, icon: 'ℹ️' });
  }

  renderEffectStatsSummaryBar(targetObj) {
    const stats = computePowerEffectiveStats(targetObj.effect, targetObj.extras || [], targetObj.flaws || [], null, targetObj.rank);
    const row = document.createElement('div');
    row.className = 'power-stats-summary-bar power-effective-stats-bar';
    row.innerHTML = `
      <div class="stats-summary-left" style="display: flex; gap: 0.65rem; align-items: center; flex-wrap: wrap;">
        <span class="stats-summary-title">Stats:</span>
        <span class="stat-item effective-stat-chip stat-action"><span class="stat-lbl effective-stat-label">Action:</span> <span class="stat-val effective-stat-val text-gold">${stats.action}</span></span>
        <span class="stat-sep">•</span>
        <span class="stat-item effective-stat-chip stat-range"><span class="stat-lbl effective-stat-label">Range:</span> <span class="stat-val effective-stat-val text-gold">${stats.rangeDisplay}</span></span>
        <span class="stat-sep">•</span>
        <span class="stat-item effective-stat-chip stat-duration"><span class="stat-lbl effective-stat-label">Duration:</span> <span class="stat-val effective-stat-val text-gold">${stats.effectiveDuration}</span></span>
        <span class="stat-sep">•</span>
        <span class="stat-item effective-stat-chip stat-area"><span class="stat-lbl effective-stat-label">Area:</span> <span class="stat-val effective-stat-val text-gold">${stats.area}</span></span>
      </div>
    `;
    return row;
  }

  renderModifierColumns(targetObj, powerContext = null) {
    if (!targetObj.extras) targetObj.extras = [];
    if (!targetObj.flaws) targetObj.flaws = [];

    const checkAeOverrun = (testExtras, testFlaws) => {
      if (!powerContext || powerContext === targetObj) return false;
      const mainCost = calculatePowerCost({
        ...powerContext,
        isAlternateEffect: false,
        alternateEffects: [],
        linkedEffects: [],
        isDynamicArray: false
      });
      const testCost = calculatePowerCost({
        ...targetObj,
        extras: testExtras !== undefined ? testExtras : targetObj.extras || [],
        flaws: testFlaws !== undefined ? testFlaws : targetObj.flaws || [],
        isAlternateEffect: false,
        alternateEffects: [],
        linkedEffects: [],
        isDynamicArray: false
      });
      if (testCost > mainCost) {
        this.showAlertDialog(
          `Cannot apply modifier: An Alternate Effect cannot cost more than the primary effect (${mainCost} PP). Standalone cost would increase to ${testCost} PP.`,
          { title: 'Alternate Effect Cost Limit', icon: '⚠️' }
        );
        return true;
      }
      return false;
    };

    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 0.45rem;';

    const activeExtraIds = new Set(targetObj.extras.map(e => e.id));
    const activeFlawIds = new Set(targetObj.flaws.map(f => f.id));

    // Row 3: Per-Rank Extras & Flaws
    const row3 = document.createElement('div');
    row3.className = 'power-unified-row';
    row3.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 0.45rem;';

    // Extras Column (Per-Rank & Flat Extras)
    const extrasCol = document.createElement('div');
    extrasCol.className = 'power-unified-subblock';
    const legalExtras = EXTRAS_CATALOG.filter(ex => {
      if (ex.id === 'linked') return false;
      if (activeExtraIds.has(ex.id)) return false;
      return isModifierLegalForEffect(ex, targetObj.effect, targetObj.extras, targetObj.flaws).legal;
    }).sort((a, b) => a.name.replace(/^★\s*/, '').localeCompare(b.name.replace(/^★\s*/, '')));

    extrasCol.innerHTML = `
      <div class="power-section-header">
        <span style="font-weight: 800; font-size: var(--font-size-base); color: var(--hero-blue);">➕ Extras (★ = Effect-Specific) (+PP)</span>
      </div>
      <div style="display: flex; gap: 0.4rem; margin-bottom: 0.4rem; align-items: center; width: 100%; box-sizing: border-box;">
        <select class="select-add-extra" style="flex: 1; min-width: 0; width: 100%; max-width: calc(100% - 95px); font-size: var(--font-size-sm); min-height: 32px; text-overflow: ellipsis; overflow: hidden;">
          ${legalExtras.length === 0
            ? '<option value="" disabled selected>No additional legal extras available</option>'
            : '<option value="" disabled selected>Select extra to add...</option>' + legalExtras.map(ex => `<option value="${ex.id}">${ex.name} (${ex.isFlat ? `+${ex.cost} flat` : `+${ex.cost}/rank`})</option>`).join('')}
        </select>
        <button class="btn btn-outline btn-add-extra" style="font-size: var(--font-size-sm); min-height: 32px; padding: 0.2rem 0.55rem; white-space: nowrap; flex-shrink: 0; border-color: var(--hero-blue); color: #fff;" ${legalExtras.length === 0 ? 'disabled' : ''}>+ Add Extra</button>
      </div>
      <div class="extras-items-container" style="display: flex; flex-direction: column; gap: 0.35rem;"></div>
    `;

    const extrasContainer = extrasCol.querySelector('.extras-items-container');
    targetObj.extras.filter(ex => ex.id !== 'linked').forEach((ex) => {
      const exDef = EXTRAS_CATALOG.find(e => e.id === ex.id) || ex;
      const r = parseInt(ex.rank, 10) || 1;
      const maxR = exDef.maxRankByEffect ? (parseInt(targetObj.rank, 10) || 10) : (exDef.maxRank || 10);

      const exRow = document.createElement('div');
      exRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); padding: 0.35rem 0.55rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.08);';
      exRow.innerHTML = `
        <div style="flex: 1; display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
          <button type="button" class="btn-modifier-info-link" style="color: ${(exDef.isEffectSpecific || exDef.isUnique) ? 'var(--hero-gold)' : 'var(--text-bright)'};" title="Click to view rules description">
            ${exDef.name}
          </button>
          <span style="font-size: var(--font-size-sm); color: var(--text-muted);">
            (${exDef.isFlat ? `+${exDef.cost} flat` : `+${exDef.cost}/rank`})
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.45rem;">
          ${exDef.isRanked ? `
            <div class="stepper-control">
              <button class="btn-stepper compact btn-ex-minus" title="Decrease rank (removes at 0)">-</button>
              <span class="stepper-value compact">${r}</span>
              <button class="btn-stepper compact btn-ex-plus" ${r >= maxR ? 'disabled' : ''}>+</button>
            </div>
          ` : ''}
          <button class="btn btn-outline btn-remove-extra" style="padding: 0.15rem 0.45rem; min-height: 28px; font-size: var(--font-size-sm); color: #fff; border-color: rgba(255,255,255,0.25);" title="Remove extra">✕</button>
        </div>
      `;

      exRow.querySelector('.btn-modifier-info-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.showModifierDescriptionDialog(exDef);
      });
      exRow.querySelector('.btn-ex-minus')?.addEventListener('click', () => {
        if (r <= 1) {
          const exIdx = targetObj.extras.findIndex(item => item.id === ex.id);
          if (exIdx >= 0) targetObj.extras.splice(exIdx, 1);
        } else {
          ex.rank = r - 1;
        }
        this.refreshPowersState();
      });
      exRow.querySelector('.btn-ex-plus')?.addEventListener('click', () => {
        const testExtras = targetObj.extras.map(item => item.id === ex.id ? { ...item, rank: item.rank + 1 } : item);
        if (checkAeOverrun(testExtras, undefined)) return;
        ex.rank = Math.min(maxR, r + 1);
        this.refreshPowersState();
      });
      exRow.querySelector('.btn-remove-extra')?.addEventListener('click', () => {
        const exIdx = targetObj.extras.findIndex(item => item.id === ex.id);
        if (exIdx >= 0) targetObj.extras.splice(exIdx, 1);
        this.refreshPowersState();
      });

      extrasContainer.appendChild(exRow);
    });

    extrasCol.querySelector('.btn-add-extra')?.addEventListener('click', () => {
      let selectedId = extrasCol.querySelector('.select-add-extra').value;
      if (!selectedId && legalExtras.length > 0) selectedId = legalExtras[0].id;
      if (!selectedId) return;
      const exDef = EXTRAS_CATALOG.find(e => e.id === selectedId);
      if (!exDef) return;
      const legality = isModifierLegalForEffect(exDef, targetObj.effect, targetObj.extras, targetObj.flaws);
      if (!legality.legal) {
        this.showAlertDialog(`Cannot add ${exDef.name}: ${legality.reason}`, { title: 'Illegal Modifier Combination' });
        return;
      }
      const testExtras = [...targetObj.extras, { id: exDef.id, name: exDef.name, cost: exDef.cost, isFlat: !!exDef.isFlat, isRanked: !!exDef.isRanked, rank: 1 }];
      if (checkAeOverrun(testExtras, undefined)) return;
      targetObj.extras.push({ id: exDef.id, name: exDef.name, cost: exDef.cost, isFlat: !!exDef.isFlat, isRanked: !!exDef.isRanked, rank: 1 });
      this.refreshPowersState();
    });

    // Flaws Column (All Flaws, Flat Flaws & Devices)
    const flawsCol = document.createElement('div');
    flawsCol.className = 'power-unified-subblock';
    const legalFlaws = FLAWS_CATALOG.filter(fl => {
      if (activeFlawIds.has(fl.id)) return false;
      return isModifierLegalForEffect(fl, targetObj.effect, targetObj.extras, targetObj.flaws).legal;
    }).sort((a, b) => a.name.replace(/^★\s*/, '').localeCompare(b.name.replace(/^★\s*/, '')));

    flawsCol.innerHTML = `
      <div class="power-section-header">
        <span style="font-weight: 800; font-size: var(--font-size-base); color: var(--hero-blue);">➖ Flaws (★ = Effect-Specific) (-PP)</span>
      </div>
      <div style="display: flex; gap: 0.4rem; margin-bottom: 0.4rem; align-items: center; width: 100%; box-sizing: border-box;">
        <select class="select-add-flaw" style="flex: 1; min-width: 0; width: 100%; max-width: calc(100% - 95px); font-size: var(--font-size-sm); min-height: 32px; text-overflow: ellipsis; overflow: hidden;">
          ${legalFlaws.length === 0
            ? '<option value="" disabled selected>No additional legal flaws available</option>'
            : '<option value="" disabled selected>Select flaw to add...</option>' + legalFlaws.map(fl => `<option value="${fl.id}">${fl.name} (${fl.isDevice ? `Device -${fl.discountPer5}/5` : (fl.isFlat ? `-${fl.cost} flat` : `-${fl.cost}/rank`)})</option>`).join('')}
        </select>
        <button class="btn btn-outline btn-add-flaw" style="font-size: var(--font-size-sm); min-height: 32px; padding: 0.2rem 0.55rem; white-space: nowrap; flex-shrink: 0; border-color: var(--hero-blue); color: #fff;" ${legalFlaws.length === 0 ? 'disabled' : ''}>+ Add Flaw</button>
      </div>
      <div class="flaws-items-container" style="display: flex; flex-direction: column; gap: 0.35rem;"></div>
    `;

    const flawsContainer = flawsCol.querySelector('.flaws-items-container');
    targetObj.flaws.forEach((fl) => {
      const flDef = FLAWS_CATALOG.find(f => f.id === fl.id) || fl;
      const r = parseInt(fl.rank, 10) || 1;
      const maxR = flDef.maxRank || 5;

      const flRow = document.createElement('div');
      flRow.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem; background: rgba(0,0,0,0.25); padding: 0.35rem 0.55rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.08);';

      const flCostDisplay = flDef.isDevice ? `(Device -${flDef.discountPer5}/5 PP)` : (flDef.isFlat ? `(-${flDef.cost} flat)` : `(-${flDef.cost}/rank)`);

      flRow.innerHTML = `
        <div style="flex: 1; display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="flex: 1; display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
            <button type="button" class="btn-modifier-info-link" style="color: ${(flDef.isEffectSpecific || flDef.isUnique) ? 'var(--hero-gold)' : 'var(--text-bright)'};" title="Click to view rules description">
              ${flDef.name}
            </button>
            <span style="font-size: var(--font-size-sm); color: var(--text-muted);">
              ${flCostDisplay}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem;">
            ${flDef.isRanked ? `
              <div class="stepper-control">
                <button class="btn-stepper compact btn-fl-minus" title="Decrease rank (removes at 0)">-</button>
                <span class="stepper-value compact">${r}</span>
                <button class="btn-stepper compact btn-fl-plus" ${r >= maxR ? 'disabled' : ''}>+</button>
              </div>
            ` : ''}
            <button class="btn btn-outline btn-remove-flaw" style="padding: 0.15rem 0.45rem; min-height: 28px; font-size: var(--font-size-sm); color: #fff; border-color: rgba(255,255,255,0.25);" title="Remove flaw">✕</button>
          </div>
        </div>
        ${fl.id === 'quirk' ? `
          <div style="width: 100%; margin-top: 0.15rem;">
            <input type="text" class="input-quirk-desc" value="${fl.description || ''}" placeholder="Describe quirk (e.g. Only when angry, Cannot affect lead, Requires spoken words)..." style="width: 100%; font-size: var(--font-size-xs); padding: 0.2rem 0.45rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.15); border-radius: 3px; color: var(--hero-gold);">
          </div>
        ` : ''}
      `;

      flRow.querySelector('.btn-modifier-info-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.showModifierDescriptionDialog(flDef);
      });
      flRow.querySelector('.input-quirk-desc')?.addEventListener('input', (e) => {
        fl.description = e.target.value;
        this.saveAndAudit();
      });
      flRow.querySelector('.btn-fl-minus')?.addEventListener('click', () => {
        let testFlaws;
        if (r <= 1) {
          testFlaws = targetObj.flaws.filter(item => item.id !== fl.id);
        } else {
          testFlaws = targetObj.flaws.map(item => item.id === fl.id ? { ...item, rank: item.rank - 1 } : item);
        }
        if (checkAeOverrun(undefined, testFlaws)) return;

        if (r <= 1) {
          const flIdx = targetObj.flaws.findIndex(item => item.id === fl.id);
          if (flIdx >= 0) targetObj.flaws.splice(flIdx, 1);
        } else {
          fl.rank = r - 1;
        }
        this.refreshPowersState();
      });
      flRow.querySelector('.btn-fl-plus')?.addEventListener('click', () => {
        fl.rank = Math.min(maxR, r + 1);
        this.refreshPowersState();
      });
      flRow.querySelector('.btn-remove-flaw')?.addEventListener('click', () => {
        const testFlaws = targetObj.flaws.filter(item => item.id !== fl.id);
        if (checkAeOverrun(undefined, testFlaws)) return;
        const flIdx = targetObj.flaws.findIndex(item => item.id === fl.id);
        if (flIdx >= 0) targetObj.flaws.splice(flIdx, 1);
        this.refreshPowersState();
      });

      flawsContainer.appendChild(flRow);
    });

    flawsCol.querySelector('.btn-add-flaw')?.addEventListener('click', () => {
      let selectedId = flawsCol.querySelector('.select-add-flaw').value;
      if (!selectedId && legalFlaws.length > 0) selectedId = legalFlaws[0].id;
      if (!selectedId) return;
      const flDef = FLAWS_CATALOG.find(f => f.id === selectedId);
      if (!flDef) return;
      const legality = isModifierLegalForEffect(flDef, targetObj.effect, targetObj.extras, targetObj.flaws);
      if (!legality.legal) {
        this.showAlertDialog(`Cannot add ${flDef.name}: ${legality.reason}`, { title: 'Illegal Modifier Combination' });
        return;
      }
      targetObj.flaws.push({
        id: flDef.id,
        name: flDef.name,
        cost: flDef.cost,
        isFlat: flDef.isFlat,
        isRanked: flDef.isRanked,
        isDevice: flDef.isDevice,
        discountPer5: flDef.discountPer5,
        rank: 1,
        description: flDef.id === 'quirk' ? '' : undefined
      });
      this.refreshPowersState();
    });

    row3.appendChild(extrasCol);
    row3.appendChild(flawsCol);
    container.appendChild(row3);

    return container;
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
        No powers built yet. Choose a profile from the <strong>Power Profiles Library</strong> above or click <strong>➕ Build new power</strong> to build one in-place.
      </div>`;
      return;
    }

    this.char.powers.forEach((p, idx) => {
      if (!p.id) p.id = 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

      if (!p.extras) p.extras = [];
      if (!p.flaws) p.flaws = [];
      if (!p.alternateEffects) p.alternateEffects = [];
      if (!p.linkedEffects) p.linkedEffects = [];

      // Ensure effect is valid
      if (!p.effect || typeof p.effect !== 'object') {
        const effId = p.effectId || p.effect;
        const found = POWER_EFFECTS_CATALOG.find(e => e.id === effId) || POWER_EFFECTS_CATALOG[0];
        p.effect = found;
      } else {
        const fullEff = POWER_EFFECTS_CATALOG.find(e => e.id === p.effect.id);
        if (fullEff) {
          p.effect = { ...fullEff, ...p.effect };
        }
      }

      // Compute derived range, duration, action, and area (Effective Stats Block)
      const effStats = computePowerEffectiveStats(p.effect, p.extras, p.flaws, null, p.rank);
      const rd = effStats;
      p.action = effStats.action;
      p.range = effStats.effectiveRange;
      p.duration = effStats.effectiveDuration;

      // Validate legality of modifiers
      const valResult = validateModifierLegality(p.effect, p.extras, p.flaws);

      const cost = calculatePowerCost(p);
      const isDevice = (p.flaws || []).some(f => f.isDevice);
      const isExpanded = this.expandedPowerIds.has(p.id);

      const card = document.createElement('div');
      card.className = `power-card-collapsible ${isExpanded ? 'expanded' : 'collapsed'}`;
      if (isDevice) card.classList.add('device-card');

      // Collapsed Single-Title-Line Header with All Effective Stats
      const header = document.createElement('div');
      header.className = 'power-card-header';
      header.innerHTML = `
        <div class="power-card-header-left">
          <span class="power-toggle-icon">${isExpanded ? '▼' : '▶'}</span>
          <strong class="power-title-name">⚡ ${p.name || 'Unnamed Power'}</strong>
          <span class="power-title-sep">—</span>
          <span class="power-title-effect">${p.effect?.name || 'Effect'} Rank ${p.rank || 1}</span>
          <span class="power-title-details">(${cost} PP • ${effStats.action} • ${effStats.effectiveRange} • ${effStats.effectiveDuration} • ${effStats.area})</span>
          ${p.isDynamicArray ? '<span class="badge-tag dynamic">Dynamic Array</span>' : ''}
          ${p.alternateEffects?.length ? `<span class="badge-tag ae">${p.alternateEffects.length} AE</span>` : ''}
          ${p.linkedEffects?.length ? `<span class="badge-tag linked">${p.linkedEffects.length} Linked</span>` : ''}
          ${!valResult.valid ? '<span class="badge-tag conflict" title="Rule conflicts detected">⚠️ Conflict</span>' : ''}
        </div>
        <div class="power-card-header-actions">
          <button class="btn btn-outline btn-toggle-power-expand" style="min-height: 32px; padding: 0.2rem 0.65rem; font-size: var(--font-size-base); font-weight: 700;">${isExpanded ? '▲ Collapse' : '▼ Configure'}</button>
          <button class="btn btn-outline btn-duplicate-power" data-p-id="${p.id}" title="Duplicate Power" style="min-height: 32px; padding: 0.2rem 0.65rem; font-size: var(--font-size-base); font-weight: 700;">📋 Duplicate</button>
          <button class="btn btn-outline btn-delete-power" data-p-id="${p.id}" title="Delete Power" style="min-height: 32px; padding: 0.2rem 0.65rem; font-size: var(--font-size-base); font-weight: 700; color: #fff; border-color: rgba(255, 255, 255, 0.25);">🗑️ Delete</button>
        </div>
      `;

      header.addEventListener('click', (e) => {
        if (e.target.closest('.power-card-header-actions')) return;
        if (this.expandedPowerIds.has(p.id)) {
          this.expandedPowerIds.delete(p.id);
        } else {
          this.expandedPowerIds.add(p.id);
        }
        this.refreshPowersState();
      });

      header.querySelector('.power-card-header-actions')?.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      header.querySelector('.btn-toggle-power-expand')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.expandedPowerIds.has(p.id)) {
          this.expandedPowerIds.delete(p.id);
        } else {
          this.expandedPowerIds.add(p.id);
        }
        this.refreshPowersState();
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
        try {
          // Expanded In-Place Editor Body
          const body = document.createElement('div');
          body.className = 'power-card-body';

        // Row 1: Core Configuration (Power Name, Descriptors, Base Effect, Rank Stepper, Dynamic Checkbox, Linked Checkbox, Cost)
        const row1 = document.createElement('div');
        row1.style.cssText = 'display: flex; gap: 0.65rem; align-items: flex-end; flex-wrap: wrap; margin-bottom: 0.5rem;';
        row1.innerHTML = `
          <div style="flex: 2; min-width: 180px;">
            <label class="field-label">Power Name</label>
            <input type="text" class="input-power-name" value="${p.name || ''}" placeholder="e.g. Plasma Ray, Force Field" style="width: 100%; font-size: var(--font-size-base); min-height: 36px;">
          </div>
          <div style="flex: 1.3; min-width: 140px;">
            <label class="field-label">Descriptors</label>
            <input type="text" class="input-power-desc" value="${p.descriptor || ''}" placeholder="e.g. Fire, Energy, Technology" style="width: 100%; font-size: var(--font-size-base); min-height: 36px;">
          </div>
          <div style="flex: 1.6; min-width: 160px;">
            <label class="field-label" style="display: flex; align-items: center; justify-content: space-between;">
              <span>Base Effect</span>
              <button type="button" class="btn-effect-info" title="View effect rules description" style="background: none; border: none; cursor: pointer; font-size: var(--font-size-base); padding: 0 0.2rem; color: var(--hero-blue); line-height: 1;">ℹ️</button>
            </label>
            <select class="select-power-effect" style="width: 100%; font-size: var(--font-size-base); min-height: 36px;">
              ${POWER_EFFECTS_CATALOG.map(e => `<option value="${e.id}" ${p.effect?.id === e.id ? 'selected' : ''}>${e.name} (${e.baseCost} PP/rk)</option>`).join('')}
            </select>
          </div>
          <div style="width: 110px;">
            <label class="field-label">Rank</label>
            <div class="stepper-control" style="width: 100%;">
              <button class="btn-stepper compact btn-p-rank-minus" style="min-height: 36px;">-</button>
              <span class="stepper-value compact val-p-rank" style="min-height: 36px; display: flex; align-items: center; justify-content: center; font-weight: 800;">${p.rank || 1}</span>
              <button class="btn-stepper compact btn-p-rank-plus" style="min-height: 36px;">+</button>
            </div>
          </div>
          <div style="display: flex; align-items: center; min-height: 36px; padding-bottom: 2px;">
            <label style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: var(--font-size-base); color: var(--hero-gold); font-weight: 700; cursor: pointer; user-select: none;" title="First effect in array can be dynamic (+1 PP base)">
              <input type="checkbox" class="cb-primary-dynamic" ${p.isDynamicArray ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--hero-gold); cursor: pointer;">
              <span>Dynamic</span>
            </label>
          </div>
          <div style="display: flex; align-items: center; min-height: 36px; padding-bottom: 2px;">
            <label style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: var(--font-size-base); color: var(--hero-blue); font-weight: 700; cursor: pointer; user-select: none;" title="Link this effect with another">
              <input type="checkbox" class="cb-effect-linked" ${(p.isLinked || p.linkedToId || p.extras?.some(e => e.id === 'linked')) ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--hero-blue); cursor: pointer;">
              <span>🔗 Linked${p.linkedToId ? ` (${(this.char.powers || []).find(x => x.id === p.linkedToId)?.name || 'Linked'})` : ''}</span>
            </label>
          </div>
          <div style="min-width: 75px; text-align: right; padding-bottom: 0.35rem; margin-left: auto;">
            <span class="field-label" style="display: block; margin-bottom: 0.15rem;">Cost</span>
            <strong style="color: var(--hero-gold); font-size: var(--font-size-md);">${cost} PP</strong>
          </div>
        `;

        row1.querySelector('.input-power-name')?.addEventListener('input', (e) => {
          p.name = e.target.value;
          this.saveAndAudit();
          this.renderHeaderStatus();
        });
        row1.querySelector('.input-power-desc')?.addEventListener('input', (e) => {
          p.descriptor = e.target.value;
          this.saveAndAudit();
        });
        row1.querySelector('.btn-effect-info')?.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.showEffectDescriptionDialog(p.effect);
        });
        row1.querySelector('.select-power-effect')?.addEventListener('change', async (e) => {
          const newEff = POWER_EFFECTS_CATALOG.find(eff => eff.id === e.target.value) || POWER_EFFECTS_CATALOG[0];
          if (p.alternateEffects && p.alternateEffects.length > 0) {
            const testMainCost = calculatePowerCost({
              ...p,
              effect: newEff,
              isAlternateEffect: false,
              alternateEffects: [],
              linkedEffects: [],
              isDynamicArray: false
            });
            for (let i = 0; i < p.alternateEffects.length; i++) {
              const ae = p.alternateEffects[i];
              const aeCost = calculatePowerCost({
                ...ae,
                isAlternateEffect: false,
                alternateEffects: [],
                linkedEffects: [],
                isDynamicArray: false
              });
              if (aeCost > testMainCost) {
                e.target.value = p.effect?.id || POWER_EFFECTS_CATALOG[0].id;
                await this.showAlertDialog(
                  `Cannot change primary effect to "${newEff.name}": Alternate Effect "${ae.name || 'ALTERNATE ' + (i + 1)}" costs ${aeCost} PP, which would exceed the new primary power cost (${testMainCost} PP). In official M&M 3E rules, alternate effects cannot cost more than the primary effect. Adjust the alternate effect first.`,
                  { title: 'Alternate Effect Cost Limit' }
                );
                return;
              }
            }
          }
          p.effect = newEff;
          p.action = newEff.action || 'Standard';
          this.refreshPowersState();
        });
        row1.querySelector('.btn-p-rank-minus')?.addEventListener('click', async () => {
          const currentRank = parseInt(p.rank, 10) || 1;
          const newRank = Math.max(1, currentRank - 1);
          if (newRank === currentRank) return;

          if (p.alternateEffects && p.alternateEffects.length > 0) {
            const testMainCost = calculatePowerCost({
              ...p,
              rank: newRank,
              isAlternateEffect: false,
              alternateEffects: [],
              linkedEffects: [],
              isDynamicArray: false
            });
            for (let i = 0; i < p.alternateEffects.length; i++) {
              const ae = p.alternateEffects[i];
              const aeCost = calculatePowerCost({
                ...ae,
                isAlternateEffect: false,
                alternateEffects: [],
                linkedEffects: [],
                isDynamicArray: false
              });
              if (aeCost > testMainCost) {
                await this.showAlertDialog(
                  `Cannot reduce primary power rank: Alternate Effect "${ae.name || 'ALTERNATE ' + (i + 1)}" costs ${aeCost} PP, which would exceed the new primary power cost (${testMainCost} PP). In official M&M 3E rules, alternate effects cannot cost more than the primary effect. Adjust the alternate effect first.`,
                  { title: 'Alternate Effect Cost Limit' }
                );
                return;
              }
            }
          }

          p.rank = newRank;
          this.refreshPowersState();
        });
        row1.querySelector('.btn-p-rank-plus')?.addEventListener('click', () => {
          p.rank = (parseInt(p.rank, 10) || 1) + 1;
          this.refreshPowersState();
        });
        row1.querySelector('.cb-primary-dynamic')?.addEventListener('change', (e) => {
          p.isDynamicArray = e.target.checked;
          this.refreshPowersState();
        });
        row1.querySelector('.cb-effect-linked')?.addEventListener('change', async (e) => {
          const isNowChecked = e.target.checked;
          if (isNowChecked) {
            const otherEligible = (this.char.powers || []).filter(op => op.id !== p.id && !op.isLinked && !op.linkedToId);
            if (otherEligible.length === 0) {
              e.target.checked = false;
              await this.showAlertDialog('No other eligible unlinked effects found to link with. Build another power first.', { title: 'No Eligible Effects' });
              return;
            }
            const options = otherEligible.map(oe => `${oe.name || 'Unnamed Power'} (${oe.effect?.name || 'Effect'} Rank ${oe.rank || 1})`);
            this.openPrebuiltOptionsModal(
              `Link "${p.name || 'Power'}" With Existing Effect`,
              options,
              (selectedOpt) => {
                const idx = options.indexOf(selectedOpt);
                const targetPower = idx >= 0 ? otherEligible[idx] : otherEligible[0];
                if (!targetPower) {
                  e.target.checked = false;
                  return;
                }
                p.isLinked = true;
                p.linkedToId = targetPower.id;
                if (!p.extras) p.extras = [];
                if (!p.extras.some(ex => ex.id === 'linked')) {
                  p.extras.push({ id: 'linked', name: 'Linked', cost: 0, isFlat: true, rank: 1 });
                }
                targetPower.isLinked = true;
                targetPower.linkedToId = p.id;
                if (!targetPower.extras) targetPower.extras = [];
                if (!targetPower.extras.some(ex => ex.id === 'linked')) {
                  targetPower.extras.push({ id: 'linked', name: 'Linked', cost: 0, isFlat: true, rank: 1 });
                }
                this.refreshPowersState();
              }
            );
          } else {
            p.isLinked = false;
            const targetId = p.linkedToId;
            p.linkedToId = null;
            p.extras = (p.extras || []).filter(ex => ex.id !== 'linked');
            if (targetId) {
              const targetPower = (this.char.powers || []).find(op => op.id === targetId);
              if (targetPower) {
                targetPower.isLinked = false;
                targetPower.linkedToId = null;
                targetPower.extras = (targetPower.extras || []).filter(ex => ex.id !== 'linked');
              }
            }
            this.refreshPowersState();
          }
        });

        // Unified Main Effect Block: Visually combine all separate blocks in the primary effect
        const mainBlock = document.createElement('div');
        mainBlock.className = 'power-main-effect-unified';

        mainBlock.appendChild(row1);

        // Row 2: Final Effect Stats Summary Bar (Action, Range with measurement, Duration, Area)
        const row2 = this.renderEffectStatsSummaryBar(p);
        mainBlock.appendChild(row2);

        // Power Effect Specific Configuration (Affliction, Immunity, Senses, Weaken, Nullify)
        const configSection = this.renderEffectConfigSection(p);
        if (configSection) {
          mainBlock.appendChild(configSection);
        }

        // Validation Banner (Errors and Warnings)
        if (valResult.errors.length > 0 || valResult.warnings.length > 0) {
          const valBox = document.createElement('div');
          valBox.style.cssText = 'display: flex; flex-direction: column; gap: 0.35rem;';
          if (valResult.errors.length > 0) {
            valBox.innerHTML += `
              <div class="power-validation-alert">
                <strong style="color: var(--hero-blue);">⚠️ Rule Conflict Detected:</strong>
                ${valResult.errors.map(err => `<div>• ${err}</div>`).join('')}
              </div>
            `;
          }
          if (valResult.warnings.length > 0) {
            valBox.innerHTML += `
              <div class="power-validation-warning">
                <strong style="color: var(--hero-gold);">ℹ️ Modifier Advisory:</strong>
                ${valResult.warnings.map(w => `<div>• ${w}</div>`).join('')}
              </div>
            `;
          }
          mainBlock.appendChild(valBox);
        }

        // Row 3: Modifiers (Extras & Flaws)
        const modCols = this.renderModifierColumns(p, p);
        mainBlock.appendChild(modCols);

        // Primary Effect Notes Input
        const notesRow = document.createElement('div');
        notesRow.style.cssText = 'margin-top: 0.25rem;';
        notesRow.innerHTML = `
          <input type="text" class="input-power-notes" value="${p.notes || ''}" placeholder="Power notes & mechanics (e.g. DC, special conditions)" style="width: 100%; font-size: var(--font-size-xs);">
        `;
        notesRow.querySelector('.input-power-notes')?.addEventListener('input', (e) => {
          p.notes = e.target.value;
          this.saveAndAudit();
        });
        mainBlock.appendChild(notesRow);

        body.appendChild(mainBlock);

        // Row 5: Power Arrays & Alternate Effects (Standard 1 PP, Dynamic 2 PP)
        const aeSection = document.createElement('div');
        aeSection.className = 'power-section-box';
        aeSection.style.marginTop = '0.75rem';
        aeSection.innerHTML = `
          <div class="power-section-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: var(--hero-blue); font-size: var(--font-size-base);">🔄 Power Array & Alternate Effects (AE)</strong>
              <span style="font-size: var(--font-size-sm); color: var(--text-muted); margin-left: 0.65rem;">Primary effect is above.</span>
            </div>
            <button class="btn btn-outline btn-add-ae-effect" style="font-size: var(--font-size-sm); min-height: 32px; padding: 0.2rem 0.75rem; border-color: var(--hero-blue); color: #fff;">➕ Add Alternate Effect to Array</button>
          </div>
          <div class="ae-items-container" style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;"></div>
        `;

        const aeContainer = aeSection.querySelector('.ae-items-container');
        if (!p.alternateEffects) p.alternateEffects = [];
        if (!this.expandedAeIds) this.expandedAeIds = new Set();

        if (p.alternateEffects.length === 0) {
          aeContainer.innerHTML = `<div style="font-size: var(--font-size-sm); color: var(--text-muted); font-style: italic; padding: 0.25rem 0;">No alternate effects added. Click "➕ Add Alternate Effect to Array" above to add one.</div>`;
        } else {
          p.alternateEffects.forEach((ae, aeIdx) => {
            if (!ae.id) {
              ae.id = 'ae_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
            }
            if (!ae.extras) ae.extras = [];
            if (!ae.flaws) ae.flaws = [];
            if (!ae.effect) ae.effect = POWER_EFFECTS_CATALOG[0];
            if (typeof ae.rank !== 'number') ae.rank = parseInt(ae.rank, 10) || p.rank || 1;

            const isAeExpanded = this.expandedAeIds.has(ae.id);
            const aeStandaloneCost = calculatePowerCost({ ...ae, isAlternateEffect: false, alternateEffects: [], linkedEffects: [], isDynamicArray: false });
            const aeSlotCost = p.isDynamicArray ? 2 : (ae.isDynamic ? 2 : 1);
            const mainStandaloneCost = calculatePowerCost({ ...p, isAlternateEffect: false, alternateEffects: [], linkedEffects: [], isDynamicArray: false });

            const aeCard = document.createElement('div');
            aeCard.className = `power-ae-card power-ae-unified ${isAeExpanded ? 'expanded' : 'collapsed'}`;

            // Collapsible AE Header
            const aeHeader = document.createElement('div');
            aeHeader.className = 'power-ae-header';
            aeHeader.style.cursor = 'pointer';
            aeHeader.innerHTML = `
              <div style="display: flex; align-items: center; gap: 0.55rem; flex-wrap: wrap;">
                <span class="ae-toggle-icon" style="font-size: var(--font-size-sm); color: var(--hero-blue); line-height: 1;">${isAeExpanded ? '▼' : '▶'}</span>
                <strong style="color: var(--hero-gold); font-size: var(--font-size-base); letter-spacing: 0.04em;">⚡ ALTERNATE ${aeIdx + 1}</strong>
                <span style="font-weight: 600; color: var(--text-bright); font-size: var(--font-size-base);">${ae.name || 'Unnamed Effect'}</span>
                <span style="font-size: var(--font-size-sm); color: var(--hero-blue); font-weight: 600;">— ${ae.effect?.name || 'Effect'} Rank ${ae.rank || 1}</span>
                <span class="badge-tag ae" style="font-size: var(--font-size-xs);">+${aeSlotCost} PP slot</span>
                <span style="font-size: var(--font-size-sm); color: var(--text-muted);">(Standalone: ${aeStandaloneCost} PP / Max: ${mainStandaloneCost} PP)</span>
              </div>
              <div style="display: flex; gap: 0.45rem; align-items: center;">
                <button type="button" class="btn btn-outline btn-toggle-ae" style="padding: 0.2rem 0.65rem; min-height: 32px; font-size: var(--font-size-sm); color: var(--hero-blue); border-color: var(--hero-blue);">
                  ${isAeExpanded ? '▲ Collapse' : '▼ Configure'}
                </button>
                <button type="button" class="btn btn-outline btn-delete-ae" style="padding: 0.2rem 0.65rem; min-height: 32px; font-size: var(--font-size-sm); color: #fff; border-color: rgba(255, 255, 255, 0.25);" title="Remove this alternate effect">🗑️</button>
              </div>
            `;

            aeHeader.addEventListener('click', (e) => {
              if (e.target.closest('.btn-delete-ae')) return;
              if (this.expandedAeIds.has(ae.id)) {
                this.expandedAeIds.delete(ae.id);
              } else {
                this.expandedAeIds.add(ae.id);
              }
              this.refreshPowersState();
            });

            aeHeader.querySelector('.btn-delete-ae')?.addEventListener('click', (e) => {
              e.stopPropagation();
              if (this.expandedAeIds) this.expandedAeIds.delete(ae.id);
              p.alternateEffects.splice(aeIdx, 1);
              this.refreshPowersState();
            });

            aeCard.appendChild(aeHeader);

            // AE Body (shown when expanded)
            const aeBody = document.createElement('div');
            aeBody.className = 'power-ae-body';

            // Row 1 for AE: Name, Descriptors, Base Effect with Info Icon, Rank Stepper, Linked Checkbox, Cost
            const aeRow1 = document.createElement('div');
            aeRow1.style.cssText = 'display: flex; gap: 0.65rem; align-items: flex-end; flex-wrap: wrap; margin-bottom: 0.25rem;';
            aeRow1.innerHTML = `
              <div style="flex: 2; min-width: 180px;">
                <label class="field-label">Alternate Name</label>
                <input type="text" class="input-ae-name" value="${ae.name || ''}" placeholder="e.g. Ice Blast" style="width: 100%; font-size: var(--font-size-base); min-height: 36px;">
              </div>
              <div style="flex: 1.3; min-width: 140px;">
                <label class="field-label">Descriptors</label>
                <input type="text" class="input-ae-desc" value="${ae.descriptor || ''}" placeholder="e.g. Fire, Energy, Technology" style="width: 100%; font-size: var(--font-size-base); min-height: 36px;">
              </div>
              <div style="flex: 1.6; min-width: 160px;">
                <label class="field-label" style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Base Effect</span>
                  <button type="button" class="btn-ae-effect-info" title="View effect rules description" style="background: none; border: none; cursor: pointer; font-size: var(--font-size-base); padding: 0 0.2rem; color: var(--hero-blue); line-height: 1;">ℹ️</button>
                </label>
                <select class="select-ae-effect" style="width: 100%; font-size: var(--font-size-base); min-height: 36px;">
                  ${POWER_EFFECTS_CATALOG.map(e => `<option value="${e.id}" ${ae.effect?.id === e.id ? 'selected' : ''}>${e.name} (${e.baseCost} PP/rk)</option>`).join('')}
                </select>
              </div>
              <div style="width: 110px;">
                <label class="field-label">Rank</label>
                <div class="stepper-control" style="width: 100%;">
                  <button class="btn-stepper compact btn-ae-minus" style="min-height: 36px;">-</button>
                  <span class="stepper-value compact val-ae-rank" style="min-height: 36px; display: flex; align-items: center; justify-content: center; font-weight: 800;">${ae.rank || 1}</span>
                  <button class="btn-stepper compact btn-ae-plus" style="min-height: 36px;">+</button>
                </div>
              </div>
              <div style="display: flex; align-items: center; min-height: 36px; padding-bottom: 2px;">
                <label style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: var(--font-size-base); color: var(--hero-blue); font-weight: 700; cursor: pointer; user-select: none;" title="Link this alternate effect">
                  <input type="checkbox" class="cb-ae-linked" ${(ae.isLinked || ae.linkedToId || ae.extras?.some(e => e.id === 'linked')) ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--hero-blue); cursor: pointer;">
                  <span>🔗 Linked</span>
                </label>
              </div>
              <div style="min-width: 85px; text-align: right; padding-bottom: 0.35rem; margin-left: auto;">
                <span class="field-label" style="display: block; margin-bottom: 0.15rem;">Cost</span>
                <strong style="color: var(--hero-gold); font-size: var(--font-size-base);">${aeStandaloneCost} PP</strong>
              </div>
            `;

            aeRow1.querySelector('.input-ae-name')?.addEventListener('input', (e) => {
              ae.name = e.target.value;
              this.saveAndAudit();
            });
            aeRow1.querySelector('.input-ae-desc')?.addEventListener('input', (e) => {
              ae.descriptor = e.target.value;
              this.saveAndAudit();
            });
            aeRow1.querySelector('.btn-ae-effect-info')?.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.showEffectDescriptionDialog(ae.effect);
            });
            aeRow1.querySelector('.select-ae-effect')?.addEventListener('change', async (e) => {
              const newEff = POWER_EFFECTS_CATALOG.find(eff => eff.id === e.target.value) || POWER_EFFECTS_CATALOG[0];
              const testAe = { ...ae, effect: newEff };
              const testAeCost = calculatePowerCost({ ...testAe, isAlternateEffect: false, alternateEffects: [], linkedEffects: [], isDynamicArray: false });
              const mainCost = calculatePowerCost({ ...p, isAlternateEffect: false, alternateEffects: [], linkedEffects: [], isDynamicArray: false });
              if (testAeCost > mainCost) {
                e.target.value = ae.effect?.id || POWER_EFFECTS_CATALOG[0].id;
                await this.showAlertDialog(
                  `Cannot select "${newEff.name}": Alternate Effects cannot cost more than the primary effect (${mainCost} PP). With ${newEff.name}, this alternate effect would cost ${testAeCost} PP.`,
                  { title: 'Alternate Effect Cost Exceeded' }
                );
                return;
              }
              ae.effect = newEff;
              this.refreshPowersState();
            });
            aeRow1.querySelector('.btn-ae-minus')?.addEventListener('click', () => {
              ae.rank = Math.max(1, (parseInt(ae.rank, 10) || 1) - 1);
              this.refreshPowersState();
            });
            aeRow1.querySelector('.btn-ae-plus')?.addEventListener('click', async () => {
              const currentRank = parseInt(ae.rank, 10) || 1;
              const newRank = currentRank + 1;
              const testAe = { ...ae, rank: newRank };
              const testAeCost = calculatePowerCost({ ...testAe, isAlternateEffect: false, alternateEffects: [], linkedEffects: [], isDynamicArray: false });
              const mainCost = calculatePowerCost({ ...p, isAlternateEffect: false, alternateEffects: [], linkedEffects: [], isDynamicArray: false });
              if (testAeCost > mainCost) {
                await this.showAlertDialog(
                  `Cannot increase alternate effect rank: Alternate Effects cannot cost more than the primary effect (${mainCost} PP). At rank ${newRank}, this alternate effect would cost ${testAeCost} PP.`,
                  { title: 'Alternate Effect Cost Exceeded' }
                );
                return;
              }
              ae.rank = newRank;
              this.refreshPowersState();
            });
            aeRow1.querySelector('.cb-ae-linked')?.addEventListener('change', (e) => {
              ae.isLinked = e.target.checked;
              if (ae.isLinked) {
                if (!ae.extras.some(ex => ex.id === 'linked')) {
                  ae.extras.push({ id: 'linked', name: 'Linked', cost: 0, isFlat: true, rank: 1 });
                }
              } else {
                ae.extras = ae.extras.filter(ex => ex.id !== 'linked');
              }
              this.refreshPowersState();
            });
            aeBody.appendChild(aeRow1);

            // Row 2 for AE: Stats Summary Bar
            const aeStatsBar = this.renderEffectStatsSummaryBar(ae);
            aeBody.appendChild(aeStatsBar);

            // Effect Config Section for AE (Affliction, Immunity, Senses, Weaken, Nullify)
            const aeConfigSection = this.renderEffectConfigSection(ae);
            if (aeConfigSection) {
              aeBody.appendChild(aeConfigSection);
            }

            // Validation Banner for AE (Rule errors and modifier advisories only; NO static overrun banner)
            const aeValResult = validateModifierLegality(ae.effect, ae.extras, ae.flaws);
            if (aeValResult.errors.length > 0 || aeValResult.warnings.length > 0) {
              const valBox = document.createElement('div');
              valBox.style.cssText = 'display: flex; flex-direction: column; gap: 0.35rem;';
              if (aeValResult.errors.length > 0) {
                valBox.innerHTML += `
                  <div class="power-validation-alert">
                    <strong style="color: var(--hero-blue);">⚠️ Rule Conflict Detected:</strong>
                    ${aeValResult.errors.map(err => `<div>• ${err}</div>`).join('')}
                  </div>
                `;
              }
              if (aeValResult.warnings.length > 0) {
                valBox.innerHTML += `
                  <div class="power-validation-warning">
                    <strong style="color: var(--hero-gold);">ℹ️ Modifier Advisory:</strong>
                    ${aeValResult.warnings.map(w => `<div>• ${w}</div>`).join('')}
                  </div>
                `;
              }
              aeBody.appendChild(valBox);
            }

            // Row 3 for AE: Modifiers (Extras & Flaws) with powerContext passed
            const aeModifiersSection = this.renderModifierColumns(ae, p);
            aeBody.appendChild(aeModifiersSection);

            // AE Notes Input
            const aeNotesRow = document.createElement('div');
            aeNotesRow.style.cssText = 'margin-top: 0.25rem;';
            aeNotesRow.innerHTML = `
              <input type="text" class="input-ae-notes" value="${ae.notes || ''}" placeholder="Alternate effect notes & mechanics (e.g. DC, special conditions)" style="width: 100%; font-size: var(--font-size-xs);">
            `;
            aeNotesRow.querySelector('.input-ae-notes')?.addEventListener('input', (e) => {
              ae.notes = e.target.value;
              this.saveAndAudit();
            });
            aeBody.appendChild(aeNotesRow);

            aeCard.appendChild(aeBody);
            aeContainer.appendChild(aeCard);
          });
        }

        aeSection.querySelector('.btn-add-ae-effect')?.addEventListener('click', () => {
          if (!p.alternateEffects) p.alternateEffects = [];
          const nextNum = p.alternateEffects.length + 1;
          const mainCost = calculatePowerCost({
            ...p,
            isAlternateEffect: false,
            alternateEffects: [],
            linkedEffects: [],
            isDynamicArray: false
          });
          const defaultEffect = POWER_EFFECTS_CATALOG[0];
          const effCostPerRank = Math.max(1, defaultEffect.baseCost || 1);
          let initialRank = p.rank || 1;
          while (initialRank > 1 && (initialRank * effCostPerRank) > mainCost) {
            initialRank--;
          }
          const newAe = {
            id: 'ae_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            name: `${p.name || 'Power'} (Alt ${nextNum})`,
            descriptor: '',
            effect: defaultEffect,
            rank: initialRank,
            isDynamic: !!p.isDynamicArray,
            extras: [],
            flaws: [],
            notes: ''
          };
          p.alternateEffects.push(newAe);
          if (!this.expandedAeIds) this.expandedAeIds = new Set();
          this.expandedAeIds.add(newAe.id);
          this.refreshPowersState();
        });

        body.appendChild(aeSection);

        // Legacy Linked Effects Container (if present)
        if (p.linkedEffects && p.linkedEffects.length > 0) {
          const linkedSection = document.createElement('div');
          linkedSection.className = 'power-section-box';
          linkedSection.innerHTML = `
            <div class="power-section-header">
              <strong style="color: var(--hero-blue); font-size: var(--font-size-xs);">🔗 Linked Effects Sub-container</strong>
            </div>
            <div class="linked-items-container" style="display: flex; flex-direction: column; gap: 0.35rem;"></div>
          `;
          const linkedContainer = linkedSection.querySelector('.linked-items-container');
          p.linkedEffects.forEach((le, leIdx) => {
            const leCost = calculatePowerCost({ ...le, alternateEffects: [], linkedEffects: [] });
            const leRow = document.createElement('div');
            leRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 0.3rem 0.5rem; border-radius: 4px;';
            leRow.innerHTML = `
              <div><strong class="text-gold">${le.name || 'Linked Effect'}</strong> (${le.effect?.name || 'Effect'} Rank ${le.rank || 1}) - +${leCost} PP</div>
              <button class="btn btn-outline btn-delete-le" style="padding: 0.15rem 0.5rem; min-height: 28px; font-size: var(--font-size-sm); color: #fff; border-color: rgba(255, 255, 255, 0.25);">🗑️</button>
            `;
            leRow.querySelector('.btn-delete-le')?.addEventListener('click', () => {
              p.linkedEffects.splice(leIdx, 1);
              this.refreshPowersState();
            });
            linkedContainer.appendChild(leRow);
          });
          body.appendChild(linkedSection);
        }

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
            <button class="btn btn-outline btn-collapse-card" style="font-size: var(--font-size-sm); min-height: 30px;">
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
          this.refreshPowersState();
        });

        body.appendChild(footerBar);
        card.appendChild(body);
      } catch (cardRenderErr) {
        console.error(`Error rendering expanded power card ${p.name}:`, cardRenderErr);
        const errDiv = document.createElement('div');
        errDiv.className = 'power-validation-alert';
        errDiv.style.margin = '0.5rem';
        errDiv.innerHTML = `<strong>⚠️ Display Advisory:</strong> Unable to render full in-place controls for this power (${cardRenderErr.message}). You can still use the <strong>✏️ Builder</strong> button in the header.`;
        card.appendChild(errDiv);
      }
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
          <button class="btn btn-danger" style="min-height: 28px; font-size: var(--font-size-sm); padding: 0.15rem 0.5rem;">🗑️</button>
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
      list.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: var(--font-size-xs); padding: 1.5rem;">
        No game sessions logged yet. Click "+ Log Game Session" to record session recaps, dates, and campaign notes.
      </div>`;
      return;
    }

    this.char.historyLog.forEach((sess, idx) => {
      const entry = document.createElement('div');
      entry.className = 'history-entry';
      entry.style.cssText = `
        background-color: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 0.75rem 1rem;
        margin-bottom: 0.5rem;
      `;
      entry.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <strong style="color: var(--hero-cyan); font-size: var(--font-size-sm);">${sess.title}</strong>
          <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 600;">${sess.date} • ${sess.time}</span>
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-bright); line-height: 1.45; white-space: pre-line;">${sess.notes || '<span style="color: var(--text-muted); font-style: italic;">No session notes recorded.</span>'}</div>
        <div style="display: flex; justify-content: flex-end; gap: 0.4rem; margin-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.4rem;">
          <button class="btn btn-outline btn-edit-session" style="min-height: 28px; padding: 0.2rem 0.6rem; font-size: var(--font-size-sm);">✏️ Edit</button>
          <button class="btn btn-danger btn-delete-session" style="min-height: 28px; padding: 0.2rem 0.6rem; font-size: var(--font-size-sm);">🗑️ Delete</button>
        </div>
      `;

      entry.querySelector('.btn-edit-session')?.addEventListener('click', () => {
        this.editingSessionId = sess.id;
        const titleEl = document.getElementById('modal-session-title');
        if (titleEl) titleEl.innerHTML = '<span>✏️</span> Edit Game Session Entry';

        const dateInput = document.getElementById('input-session-date');
        const timeInput = document.getElementById('input-session-time');
        const titleInput = document.getElementById('input-session-title');
        const notesInput = document.getElementById('input-session-notes');

        if (dateInput) dateInput.value = sess.date;
        if (timeInput) timeInput.value = sess.time;
        if (titleInput) titleInput.value = sess.title;
        if (notesInput) notesInput.value = sess.notes || '';

        this.openModal('modal-log-session');
        setTimeout(() => titleInput?.focus(), 50);
      });

      entry.querySelector('.btn-delete-session')?.addEventListener('click', async () => {
        const confirmed = await this.showConfirmDialog(`Delete session "${sess.title}"?`, {
          title: 'Delete Session Entry',
          confirmText: 'Delete',
          confirmClass: 'btn-danger'
        });
        if (confirmed) {
          this.char.historyLog.splice(idx, 1);
          this.saveAndAudit();
          this.renderHistoryTab();
        }
      });

      list.appendChild(entry);
    });
  }

  openModal(id) {
    if (id === 'modal-hero-point') {
      this.updateHeroPointModal();
    }
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }

  closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  }

  showAlertDialog(message, { title = 'Notification', icon = 'ℹ️' } = {}) {
    return new Promise((resolve) => {
      const titleEl = document.getElementById('alert-dialog-title');
      if (titleEl) titleEl.innerHTML = `<span>${icon}</span> ${title}`;
      const msgEl = document.getElementById('alert-dialog-message');
      if (msgEl) msgEl.textContent = message;

      const okBtn = document.getElementById('btn-alert-dialog-ok');
      const closeBtn = document.getElementById('btn-alert-dialog-close');

      const onDone = () => {
        this.closeModal('modal-alert-dialog');
        okBtn?.removeEventListener('click', onDone);
        closeBtn?.removeEventListener('click', onDone);
        resolve();
      };

      okBtn?.addEventListener('click', onDone);
      closeBtn?.addEventListener('click', onDone);
      this.openModal('modal-alert-dialog');
      setTimeout(() => okBtn?.focus(), 50);
    });
  }

  showConfirmDialog(message, { title = 'Confirm Action', confirmText = 'Confirm', confirmClass = 'btn-primary' } = {}) {
    return new Promise((resolve) => {
      const titleEl = document.getElementById('confirm-dialog-title');
      if (titleEl) titleEl.textContent = title;
      const msgEl = document.getElementById('confirm-dialog-message');
      if (msgEl) msgEl.textContent = message;

      const okBtn = document.getElementById('btn-confirm-dialog-ok');
      const cancelBtn = document.getElementById('btn-confirm-dialog-cancel');
      const closeBtn = document.getElementById('btn-confirm-dialog-close');

      if (okBtn) {
        okBtn.textContent = confirmText;
        okBtn.className = `btn ${confirmClass}`;
      }

      const cleanup = () => {
        okBtn?.removeEventListener('click', onOk);
        cancelBtn?.removeEventListener('click', onCancel);
        closeBtn?.removeEventListener('click', onCancel);
      };

      const onOk = () => {
        cleanup();
        this.closeModal('modal-confirm-dialog');
        resolve(true);
      };

      const onCancel = () => {
        cleanup();
        this.closeModal('modal-confirm-dialog');
        resolve(false);
      };

      okBtn?.addEventListener('click', onOk);
      cancelBtn?.addEventListener('click', onCancel);
      closeBtn?.addEventListener('click', onCancel);
      this.openModal('modal-confirm-dialog');
      setTimeout(() => okBtn?.focus(), 50);
    });
  }

  showPromptDialog({ title = 'Input Required', label = '', defaultValue = '', placeholder = '', confirmText = 'OK' } = {}) {
    return new Promise((resolve) => {
      const titleEl = document.getElementById('prompt-dialog-title');
      if (titleEl) titleEl.textContent = title;
      const labelEl = document.getElementById('prompt-dialog-label');
      if (labelEl) labelEl.textContent = label;

      const input = document.getElementById('prompt-dialog-input');
      if (input) {
        input.value = defaultValue;
        input.placeholder = placeholder;
      }

      const okBtn = document.getElementById('btn-prompt-dialog-ok');
      const cancelBtn = document.getElementById('btn-prompt-dialog-cancel');
      const closeBtn = document.getElementById('btn-prompt-dialog-close');

      if (okBtn) okBtn.textContent = confirmText;

      const cleanup = () => {
        okBtn?.removeEventListener('click', onOk);
        cancelBtn?.removeEventListener('click', onCancel);
        closeBtn?.removeEventListener('click', onCancel);
        input?.removeEventListener('keydown', onKeyDown);
      };

      const onOk = () => {
        const val = input ? input.value : '';
        cleanup();
        this.closeModal('modal-prompt-dialog');
        resolve(val);
      };

      const onCancel = () => {
        cleanup();
        this.closeModal('modal-prompt-dialog');
        resolve(null);
      };

      const onKeyDown = (e) => {
        if (e.key === 'Enter') onOk();
        if (e.key === 'Escape') onCancel();
      };

      okBtn?.addEventListener('click', onOk);
      cancelBtn?.addEventListener('click', onCancel);
      closeBtn?.addEventListener('click', onCancel);
      input?.addEventListener('keydown', onKeyDown);

      this.openModal('modal-prompt-dialog');
      setTimeout(() => {
        if (input) {
          input.focus();
          input.select();
        }
      }, 50);
    });
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
