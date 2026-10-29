/**
 * Mutants & Masterminds 3E - Party Conditions & Toughness Tracker
 * Tracks conditions, bruises (toughness penalties), active forms/alts, and Hero Points
 * across party members. Supports local/multi-tab sync, external popout window, and Discord forwarding.
 */

export class PartyManager {
  constructor() {
    this.storageKey = 'mm3e_party_members';
    this.coordsKey = 'mm3e_party_window_coords';
    this.popoutWindow = null;
    this.isEmbeddedOpen = false;
    this.broadcastChannel = null;

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('mm3e_party_sync');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.type === 'PARTY_UPDATE') {
            this.renderAllOpenViews();
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported or blocked:', e);
      }
    }
  }

  getSavedCoords() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(this.coordsKey) : null;
      return raw ? JSON.parse(raw) : { left: 160, top: 160, width: 840, height: 680 };
    } catch {
      return { left: 160, top: 160, width: 840, height: 680 };
    }
  }

  saveCoords(coords) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.coordsKey, JSON.stringify(coords));
      }
    } catch (e) {
      console.warn('Failed to save party window coords', e);
    }
  }

  getPartyMembers() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(this.storageKey) : this._memoryFallback;
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Failed to parse party members:', e);
      return [];
    }
  }

  savePartyMembers(members) {
    try {
      const serialized = JSON.stringify(members);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, serialized);
      } else {
        this._memoryFallback = serialized;
      }
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({ type: 'PARTY_UPDATE' });
      }
      this.renderAllOpenViews();
    } catch (e) {
      console.error('Failed to save party members:', e);
    }
  }

  /**
   * Updates or registers the current local player character in the party list.
   */
  updateCurrentPlayer(char, primaryChar = null, activeAltId = null) {
    if (!char) return;

    const baseHero = primaryChar || char;
    const heroId = baseHero.id || 'hero_local';
    const isAltActive = !!activeAltId && char.id !== baseHero.id;

    // Collect active condition names
    const conditions = [];
    if (char.conditions) {
      Object.entries(char.conditions).forEach(([k, v]) => {
        if (v) conditions.push(k.charAt(0).toUpperCase() + k.slice(1));
      });
    }

    const bruises = parseInt(char.bruises, 10) || 0;
    const toughnessPenalty = -bruises;

    let activeAltLabel = null;
    let activeAltType = null;
    if (isAltActive) {
      activeAltType = char.altType || 'alt';
      const typeNames = {
        alternate_form: 'Alt Form',
        minion: 'Minion',
        sidekick: 'Sidekick'
      };
      activeAltLabel = `${typeNames[activeAltType] || 'Alt'}: ${char.name || 'Unnamed Alt'}`;
    }

    const memberData = {
      id: heroId,
      characterName: baseHero.name || 'Unnamed Hero',
      activeDisplayName: char.name || baseHero.name || 'Hero',
      playerName: baseHero.playerName || 'Player',
      campaign: baseHero.campaign || '',
      isAlt: isAltActive,
      activeAltLabel,
      activeAltType,
      bruises,
      toughnessPenalty,
      conditions,
      heroPoints: char.heroPoints ?? 1,
      powerLevel: char.powerLevel || 10,
      isLocal: true,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timestampMs: Date.now()
    };

    const members = this.getPartyMembers();
    const existingIndex = members.findIndex(m => m.id === heroId);
    if (existingIndex >= 0) {
      members[existingIndex] = { ...members[existingIndex], ...memberData };
    } else {
      members.push(memberData);
    }

    this.savePartyMembers(members);
  }

  addManualMember(data) {
    const members = this.getPartyMembers();
    const newMember = {
      id: 'manual_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      characterName: data.characterName || 'Ally Hero',
      activeDisplayName: data.characterName || 'Ally Hero',
      playerName: data.playerName || 'NPC / Ally',
      campaign: data.campaign || '',
      isAlt: !!data.isAlt,
      activeAltLabel: data.activeAltLabel || null,
      bruises: parseInt(data.bruises, 10) || 0,
      toughnessPenalty: -(parseInt(data.bruises, 10) || 0),
      conditions: Array.isArray(data.conditions) ? data.conditions : [],
      heroPoints: data.heroPoints !== undefined ? data.heroPoints : 1,
      powerLevel: data.powerLevel || 10,
      isLocal: false,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timestampMs: Date.now()
    };
    members.push(newMember);
    this.savePartyMembers(members);
    return newMember;
  }

  removeMember(id) {
    let members = this.getPartyMembers();
    members = members.filter(m => m.id !== id);
    this.savePartyMembers(members);
  }

  clearInactiveMembers() {
    let members = this.getPartyMembers();
    members = members.filter(m => m.isLocal);
    this.savePartyMembers(members);
  }

  /**
   * Generates Discord embed payload summarizing all party conditions.
   */
  buildPartyDiscordEmbed(campaignName = '') {
    const members = this.getPartyMembers();
    const titleCampaign = campaignName ? ` - ${campaignName}` : '';

    if (members.length === 0) {
      return {
        title: `🛡️ Party Conditions & Toughness Summary${titleCampaign}`,
        color: 0x3498db,
        description: '*No active party members currently registered.*',
        footer: { text: `Mutants & Masterminds 3e • ${new Date().toLocaleTimeString()}` }
      };
    }

    const fields = members.map(m => {
      const altTag = m.isAlt && m.activeAltLabel ? ` [${m.activeAltLabel}]` : '';
      const toughText = m.bruises > 0 
        ? `💥 **Toughness -${m.bruises}** (${m.bruises} Bruise${m.bruises > 1 ? 's' : ''})` 
        : `🛡️ **Toughness Normal**`;

      const condList = m.conditions && m.conditions.length > 0 
        ? m.conditions.join(', ') 
        : 'Normal (No Conditions)';

      return {
        name: `${m.characterName}${altTag} (${m.playerName})`,
        value: `${toughText} • **Cond:** ${condList} • **HP:** ${m.heroPoints}`,
        inline: true
      };
    });

    return {
      title: `🛡️ Party Conditions & Toughness Summary${titleCampaign}`,
      color: 0x2ecc71,
      fields,
      footer: { text: `Mutants & Masterminds 3e • ${new Date().toLocaleTimeString()}` }
    };
  }

  async broadcastToDiscord(discordIntegrator, campaignName = '') {
    if (!discordIntegrator || !discordIntegrator.enabled) return;
    const embed = this.buildPartyDiscordEmbed(campaignName);
    const activeConfigs = discordIntegrator.getConfigs().filter(c => c.enabled);
    const promises = activeConfigs.map(config => {
      const payload = {
        username: config.botName || 'M&M 3E Hero Roller',
        avatar_url: config.avatarUrl || undefined,
        embeds: [embed]
      };
      return discordIntegrator.dispatchToConfig(config, payload);
    });
    return Promise.allSettled(promises);
  }

  /**
   * Render HTML for the party list
   */
  generatePartyHTML() {
    const members = this.getPartyMembers();
    if (members.length === 0) {
      return `
        <div style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted); font-size: var(--font-size-sm); font-style: italic;">
          No party members recorded yet. As heroes make rolls, take bruises, or suffer conditions, they will appear here.
        </div>
      `;
    }

    return members.map(m => {
      const isDamaged = m.bruises > 0;
      const hasConditions = m.conditions && m.conditions.length > 0;
      
      const altBadge = m.isAlt && m.activeAltLabel ? `
        <span style="font-size: 11px; font-weight: 800; background: rgba(139, 92, 246, 0.2); color: var(--hero-purple); padding: 2px 7px; border-radius: 4px; border: 1px solid var(--hero-purple);">
          ⚡ Active: ${m.activeAltLabel}
        </span>
      ` : `
        <span style="font-size: 11px; font-weight: 700; color: var(--text-muted);">
          [Primary Hero]
        </span>
      `;

      const conditionPills = hasConditions 
        ? m.conditions.map(c => `
            <span style="display: inline-block; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: rgba(239, 68, 68, 0.18); color: var(--hero-red); border: 1px solid rgba(239, 68, 68, 0.4);">
              ⚠️ ${c}
            </span>
          `).join(' ')
        : `<span style="font-size: 11px; font-weight: 700; color: var(--hero-green);">✅ Normal / Unimpaired</span>`;

      const toughnessPill = isDamaged
        ? `<span style="font-size: 12px; font-weight: 800; color: var(--hero-red); background: rgba(239, 68, 68, 0.15); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-red);">
             💥 Toughness: -${m.bruises} (${m.bruises} Bruise${m.bruises > 1 ? 's' : ''})
           </span>`
        : `<span style="font-size: 12px; font-weight: 800; color: var(--hero-green); background: rgba(16, 185, 129, 0.15); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-green);">
             🛡️ Toughness: Normal (0 Bruises)
           </span>`;

      return `
        <div class="party-member-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 0.65rem; display: flex; flex-direction: column; gap: 0.45rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <strong style="font-size: 1.05rem; color: var(--text-bright);">${m.characterName}</strong>
              ${altBadge}
              <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 600;">Player: ${m.playerName}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span style="font-size: 12px; font-weight: 800; color: var(--hero-gold);">⚡ ${m.heroPoints} HP</span>
              ${!m.isLocal ? `<button type="button" class="btn-remove-party-member" data-id="${m.id}" style="background: none; border: none; color: var(--hero-red); cursor: pointer; font-size: 12px; font-weight: 700;">✕</button>` : ''}
            </div>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; padding-top: 0.2rem;">
            <div>${toughnessPill}</div>
            <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
              <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 700;">Conditions:</span>
              ${conditionPills}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Updated: ${m.lastUpdated}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderAllOpenViews() {
    // Update in-page modal if present
    const container = typeof document !== 'undefined' ? document.getElementById('party-tracker-content') : null;
    if (container) {
      container.innerHTML = this.generatePartyHTML();
      this.wireCardButtons(container);
    }
    // Update popout window if open
    if (this.popoutWindow && !this.popoutWindow.closed) {
      try {
        const popContainer = this.popoutWindow.document.getElementById('party-tracker-popout-content');
        if (popContainer) {
          popContainer.innerHTML = this.generatePartyHTML();
          this.wireCardButtons(popContainer);
        }
      } catch (e) {
        console.warn('Could not update party popout window view:', e);
      }
    }
  }

  wireCardButtons(parentEl) {
    if (!parentEl) return;
    parentEl.querySelectorAll('.btn-remove-party-member').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (id) this.removeMember(id);
      });
    });
  }

  openPopout() {
    if (this.popoutWindow && !this.popoutWindow.closed) {
      this.popoutWindow.focus();
      return;
    }

    const coords = this.getSavedCoords();
    const features = `width=${coords.width},height=${coords.height},left=${coords.left},top=${coords.top},resizable=yes,scrollbars=yes`;
    
    this.popoutWindow = window.open('', 'mm3e_party_popout', features);
    if (!this.popoutWindow) {
      alert('Pop-up was blocked by browser. Please allow pop-ups for this site.');
      return;
    }

    const currentTheme = (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || (typeof localStorage !== 'undefined' && localStorage.getItem('mm3e_theme')) || 'dark';

    const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="${currentTheme}">
<head>
  <meta charset="UTF-8">
  <title>Mutants & Masterminds 3E - Party Conditions & Toughness Tracker</title>
  <link rel="stylesheet" href="css/styles.css?v=3.59">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg-app, #0f172a);
      color: var(--text-main, #f8fafc);
      margin: 0;
      padding: 1rem;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .popout-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--border-color, #334155);
      padding-bottom: 0.6rem;
      margin-bottom: 1rem;
    }
    .popout-title {
      color: var(--hero-green, #10b981);
      font-size: 1.15rem;
      font-weight: 800;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .popout-scroll-body {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.35rem;
      margin-bottom: 1rem;
    }
    .popout-footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-color, #334155);
      padding-top: 0.75rem;
      background: var(--bg-app, #0f172a);
    }
  </style>
</head>
<body>
  <div class="popout-top-bar">
    <h2 class="popout-title">🛡️ Party Conditions & Toughness Tracker</h2>
    <div style="display: flex; gap: 0.5rem;">
      <button id="btn-popout-sync-discord" class="btn btn-outline" style="min-height: 28px; padding: 0.15rem 0.6rem; font-size: 11px; font-weight: 700;">📢 Broadcast to Discord</button>
      <button id="btn-popout-close" class="btn" style="background: #dc2626; color: #fff; border: none; padding: 5px 12px; border-radius: 4px; font-weight: 700; cursor: pointer;">✕ Close</button>
    </div>
  </div>
  <div class="popout-scroll-body" id="party-tracker-popout-content">
    ${this.generatePartyHTML()}
  </div>
  <div class="popout-footer-bar">
    <span style="font-size: 11px; color: var(--text-muted);">Real-time cross-tab and Discord condition sync</span>
    <div style="display: flex; gap: 0.45rem;">
      <button class="btn btn-outline" id="btn-popout-clear-inactive" style="font-size: 11px; padding: 0.2rem 0.6rem;">Clear Inactive</button>
    </div>
  </div>
  <script>
    // Theme sync listener
    window.addEventListener('storage', (e) => {
      if (e.key === 'mm3e_theme' && e.newValue) {
        document.documentElement.setAttribute('data-theme', e.newValue);
      }
      if (e.key === 'mm3e_party_members') {
        if (window.opener && window.opener.partyManager) {
          const c = document.getElementById('party-tracker-popout-content');
          if (c) {
            c.innerHTML = window.opener.partyManager.generatePartyHTML();
            window.opener.partyManager.wireCardButtons(c);
          }
        }
      }
    });

    window.addEventListener('focus', () => {
      if (window.opener && !window.opener.closed) {
        try {
          const t = window.opener.document.documentElement.getAttribute('data-theme');
          if (t && t !== document.documentElement.getAttribute('data-theme')) {
            document.documentElement.setAttribute('data-theme', t);
          }
        } catch(e) {}
      }
    });

    document.getElementById('btn-popout-close')?.addEventListener('click', () => {
      window.close();
    });

    document.getElementById('btn-popout-sync-discord')?.addEventListener('click', () => {
      if (window.opener && window.opener.appController) {
        window.opener.appController.broadcastPartyToDiscord();
      }
    });

    document.getElementById('btn-popout-clear-inactive')?.addEventListener('click', () => {
      if (window.opener && window.opener.partyManager) {
        window.opener.partyManager.clearInactiveMembers();
      }
    });

    window.addEventListener('beforeunload', () => {
      if (window.opener && window.opener.partyManager) {
        window.opener.partyManager.saveCoords({
          left: window.screenX,
          top: window.screenY,
          width: window.outerWidth,
          height: window.outerHeight
        });
      }
    });
  </script>
</body>
</html>`;

    this.popoutWindow.document.open();
    this.popoutWindow.document.write(htmlContent);
    this.popoutWindow.document.close();
  }
}

export const partyManager = new PartyManager();
