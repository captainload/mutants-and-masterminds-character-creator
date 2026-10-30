/**
 * Mutants & Masterminds 3E - Party Conditions & Toughness Tracker
 * Tracks conditions, bruises (toughness penalties), active forms/alts, and Hero Points
 * across party members. Supports Cloud Campaign synchronization via Supabase,
 * GM join approval queues, character sheet inspection, and P2P fallback.
 */

import { supabaseService } from './supabase_client.js';

export function formatCharacterSheetHTML(char) {
  if (!char) return '<div style="padding:1rem;color:var(--text-muted);">No character data available.</div>';
  const abilities = char.abilities || {};
  const defenses = char.defenses || {};
  const skills = Array.isArray(char.skills) ? char.skills : [];
  const advantages = Array.isArray(char.advantages) ? char.advantages : [];
  const powers = Array.isArray(char.powers) ? char.powers : [];
  const gear = Array.isArray(char.gear) ? char.gear : [];

  const abilityKeys = ['str', 'sta', 'agi', 'dex', 'fgt', 'int', 'awe', 'pre'];
  const abilityNames = { str: 'Strength', sta: 'Stamina', agi: 'Agility', dex: 'Dexterity', fgt: 'Fighting', int: 'Intellect', awe: 'Awareness', pre: 'Presence' };

  return `
    <div class="sheet-inspector-body" style="font-size: 10pt; color: var(--text-main); display: flex; flex-direction: column; gap: 1rem;">
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-bright);">${char.name || 'Unnamed Hero'}</div>
          <div style="font-size: 10pt; color: var(--text-muted);">${char.concept || 'Custom Superhero'} • Player: <strong>${char.playerName || char.player || 'Player'}</strong></div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span style="font-size: 10pt; font-weight: 800; background: rgba(59, 130, 246, 0.15); color: var(--hero-blue); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-blue);">PL ${char.powerLevel || 10}</span>
          <span style="font-size: 10pt; font-weight: 800; background: rgba(234, 179, 8, 0.15); color: var(--hero-gold); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-gold);">${char.totalSpentPP || char.powerPointsBudget || 150} PP</span>
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
        <div style="font-weight: 800; color: var(--hero-gold); font-size: 10pt; text-transform: uppercase; margin-bottom: 0.5rem;">Abilities</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 0.5rem; text-align: center;">
          ${abilityKeys.map(k => `
            <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.35rem;">
              <div style="font-size: 10pt; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${k}</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-bright);">${abilities[k] ?? 0}</div>
              <div style="font-size: 10pt; color: var(--text-muted);">${abilityNames[k]}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
        <div style="font-weight: 800; color: var(--hero-blue); font-size: 10pt; text-transform: uppercase; margin-bottom: 0.5rem;">Defenses</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.5rem; text-align: center;">
          ${Object.entries({ Dodge: defenses.dodge ?? 0, Parry: defenses.parry ?? 0, Fortitude: defenses.fortitude ?? 0, Toughness: defenses.toughness ?? 0, Will: defenses.will ?? 0 }).map(([name, val]) => `
            <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.35rem;">
              <div style="font-size: 10pt; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${name}</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-bright);">${val}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
        <div style="font-weight: 800; color: var(--hero-purple); font-size: 10pt; text-transform: uppercase; margin-bottom: 0.5rem;">Powers (${powers.length})</div>
        ${powers.length === 0 ? '<div style="color:var(--text-muted);font-style:italic;font-size: 10pt;">No powers recorded.</div>' : powers.map(p => `
          <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.45rem 0.65rem; margin-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
            <div>
              <strong style="color: var(--text-bright); font-size: 10pt;">${p.name || 'Power'}</strong>
              <span style="font-size: 10pt; color: var(--hero-gold); font-weight: 700;">Rank ${p.rank ?? 0}</span>
              ${p.descriptors ? `<span style="font-size: 10pt; color: var(--text-muted);">[${p.descriptors}]</span>` : ''}
              ${p.cost ? `<span style="font-size: 10pt; color: var(--hero-green); font-weight: 700;">(${p.cost} PP)</span>` : ''}
            </div>
            ${p.summary ? `<div style="font-size: 10pt; color: var(--text-muted); width: 100%;">${p.summary}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
          <div style="font-weight: 800; color: var(--hero-green); font-size: 10pt; text-transform: uppercase; margin-bottom: 0.5rem;">Skills (${skills.length})</div>
          ${skills.length === 0 ? '<div style="color:var(--text-muted);font-style:italic;font-size: 10pt;">No skills recorded.</div>' : skills.map(s => `
            <div style="display: flex; justify-content: space-between; font-size: 10pt; padding: 2px 0; border-bottom: 1px dashed rgba(255,255,255,0.08);">
              <span>${s.name || s.id} ${s.specialization ? `(${s.specialization})` : ''}</span>
              <strong style="color: var(--text-bright);">+${s.totalBonus ?? (s.ranks ?? 0)}</strong>
            </div>
          `).join('')}
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
          <div style="font-weight: 800; color: var(--hero-blue); font-size: 10pt; text-transform: uppercase; margin-bottom: 0.5rem;">Advantages (${advantages.length})</div>
          ${advantages.length === 0 ? '<div style="color:var(--text-muted);font-style:italic;font-size: 10pt;">No advantages recorded.</div>' : `
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
              ${advantages.map(a => `
                <span style="font-size: 10pt; background: var(--bg-input); border: 1px solid var(--border-color); padding: 2px 6px; border-radius: 4px; color: var(--text-bright);">
                  ${typeof a === 'string' ? a : (a.name + (a.rank > 1 ? ` ${a.rank}` : ''))}
                </span>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      ${gear.length > 0 ? `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
          <div style="font-weight: 800; color: var(--hero-gold); font-size: 10pt; text-transform: uppercase; margin-bottom: 0.5rem;">Equipment & Gear (${gear.length})</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            ${gear.map(g => `<span style="font-size: 10pt; background: var(--bg-input); border: 1px solid var(--border-color); padding: 2px 6px; border-radius: 4px;">${typeof g === 'string' ? g : g.name}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

const SHARED_LOCAL_FALLBACK = {};

export class CampaignTrackerManager {
  constructor() {
    this.storageKey = 'mm3e_party_members';
    this.coordsKey = 'mm3e_party_window_coords';
    this.campaignStateKey = 'mm3e_party_campaign_state';
    this.popoutWindow = null;
    this.isEmbeddedOpen = false;
    this.broadcastChannel = null;
    this._memoryFallback = {};
    this._sharedFallback = SHARED_LOCAL_FALLBACK;
    this._fallbackTabId = null;

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('mm3e_party_p2p_channel');
        this.broadcastChannel.onmessage = (event) => {
          const data = event.data;
          if (data && data.senderId && data.senderId === this.getTabSessionId()) return;
          const msg = data && data.msg ? data.msg : data;
          this.handleNetworkMessage(msg);
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported or blocked:', e);
      }
    }

    // Storage-event bus: Ensures real-time P2P sync across browser tabs even under file:///
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'mm3e_p2p_channel_bus' && e.newValue) {
          try {
            const envelope = JSON.parse(e.newValue);
            if (envelope && envelope.msg && envelope.senderId !== this.getTabSessionId()) {
              this.handleNetworkMessage(envelope.msg);
            }
          } catch (err) {}
        }
      });
    }

    this._heartbeatInterval = null;
    this.browserFilters = {
      query: '',
      searchName: true,
      searchDesc: true,
      searchPL: false,
      plMin: 1,
      plMax: 20,
      sortBy: 'default',
      hideHiatus: false
    };

    // Ensure users and GM start in disconnected campaign state on fresh app startup
    try {
      if (typeof sessionStorage !== 'undefined' && typeof sessionStorage.removeItem === 'function') {
        sessionStorage.removeItem(this.campaignStateKey);
        sessionStorage.removeItem(this.storageKey);
      }
      if (typeof localStorage !== 'undefined' && typeof localStorage.removeItem === 'function') {
        localStorage.removeItem(this.campaignStateKey);
      }
    } catch (e) {}

    // Automatically disconnect users and GM from campaigns when the app closes
    if (typeof window !== 'undefined') {
      const handleAppClose = () => {
        try {
          const current = this.getCampaignState();
          if (current && current.isConnected) {
            this.leaveCampaign();
          }
        } catch (e) {}
      };
      window.addEventListener('beforeunload', handleAppClose);
      window.addEventListener('pagehide', handleAppClose);
    }
  }

  getSavedCoords() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(this.coordsKey) : this._memoryFallback[this.coordsKey];
      return raw ? JSON.parse(raw) : { left: 160, top: 160, width: 840, height: 680 };
    } catch {
      return { left: 160, top: 160, width: 840, height: 680 };
    }
  }

  saveCoords(coords) {
    try {
      const serialized = JSON.stringify(coords);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.coordsKey, serialized);
      } else {
        this._memoryFallback[this.coordsKey] = serialized;
      }
    } catch (e) {
      console.warn('Failed to save party window coords', e);
    }
  }

  // =======================================================
  // CAMPAIGN CONNECTION STATE & P2P ACCESS CONTROL
  // =======================================================
  getTabSessionId() {
    if (typeof sessionStorage !== 'undefined') {
      let tid = sessionStorage.getItem('mm3e_session_tab_id');
      if (!tid) {
        tid = 'tab_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
        sessionStorage.setItem('mm3e_session_tab_id', tid);
      }
      return tid;
    }
    if (!this._fallbackTabId) {
      this._fallbackTabId = 'tab_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }
    return this._fallbackTabId;
  }

  getLocalMember() {
    const members = this.getPartyMembers();
    return members.find(m => m.isLocal) || null;
  }

  // =======================================================
  // PERSISTENT CAMPAIGN HISTORY & PARTICIPATION
  // =======================================================
  saveToCampaignHistory(campaignData) {
    if (!campaignData || !campaignData.campaignId) return;
    try {
      const cleanId = String(campaignData.campaignId).trim().toUpperCase().replace(/^#+/, '');
      const history = this.getCampaignHistory();
      const existing = history.find(c => c.campaignId === cleanId) || {};

      const isCreator = campaignData.isCreator !== undefined ? !!campaignData.isCreator : (campaignData.isHost !== undefined ? !!campaignData.isHost : !!existing.isCreator);
      const isOnHiatus = campaignData.isOnHiatus !== undefined ? !!campaignData.isOnHiatus : !!existing.isOnHiatus;
      const pendingTransfer = campaignData.pendingTransfer !== undefined ? campaignData.pendingTransfer : (existing.pendingTransfer || null);
      const isPublic = campaignData.isPublic !== undefined ? !!campaignData.isPublic : !!existing.isPublic;
      const notes = campaignData.notes !== undefined ? String(campaignData.notes) : (existing.notes || '');
      const createdAtMs = campaignData.createdAtMs || existing.createdAtMs || Date.now();
      const entry = {
        campaignId: cleanId,
        campaignName: (campaignData.campaignName || existing.campaignName || cleanId).trim(),
        pin: campaignData.pin !== undefined ? String(campaignData.pin).trim() : (existing.pin || ''),
        powerLevel: parseInt(campaignData.powerLevel, 10) || existing.powerLevel || 10,
        dontEnforcePL: campaignData.dontEnforcePL !== undefined ? !!campaignData.dontEnforcePL : !!existing.dontEnforcePL,
        creatorName: campaignData.creatorName || existing.creatorName || '',
        isCreator,
        isOnHiatus,
        isPublic,
        notes,
        createdAtMs,
        pendingTransfer,
        lastJoined: new Date().toLocaleDateString(),
        lastJoinedMs: Date.now()
      };

      const filtered = history.filter(c => c.campaignId !== cleanId);
      filtered.unshift(entry);
      const serialized = JSON.stringify(filtered);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaigns_history', serialized);
      } else {
        this._memoryFallback['mm3e_campaigns_history'] = serialized;
      }
    } catch (e) {
      console.warn('Failed to save campaign history:', e);
    }
  }

  getCampaignHistory() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('mm3e_campaigns_history') : this._memoryFallback['mm3e_campaigns_history'];
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  removeFromCampaignHistory(campaignId) {
    try {
      const cleanId = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
      const history = this.getCampaignHistory().filter(c => c.campaignId !== cleanId);
      const serialized = JSON.stringify(history);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaigns_history', serialized);
      } else {
        this._memoryFallback['mm3e_campaigns_history'] = serialized;
      }
      this.renderAllOpenViews();
    } catch (e) {}
  }

  // =======================================================
  // SESSION HEARTBEAT & ACTIVE SESSION DETECTION
  // =======================================================
  startSessionHeartbeat() {
    this.stopSessionHeartbeat();
    const emit = () => {
      const current = this.getCampaignState();
      if (current.isConnected && current.campaignId) {
        const cleanId = current.campaignId.replace(/^#+/, '');
        const payload = {
          campaignId: cleanId,
          campaignName: current.campaignName,
          powerLevel: current.powerLevel || 10,
          dontEnforcePL: !!current.dontEnforcePL,
          creatorName: current.creatorName || '',
          isHost: !!current.isHost,
          lastHeartbeat: Date.now()
        };
        try {
          const sessions = this.getActiveSessions();
          sessions[cleanId] = payload;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mm3e_active_sessions', JSON.stringify(sessions));
          } else {
            this._sharedFallback['mm3e_active_sessions'] = JSON.stringify(sessions);
          }
        } catch (e) {}

        this.broadcastMessage({
          type: 'SESSION_HEARTBEAT',
          ...payload
        });
      }
    };

    emit();
    this._heartbeatInterval = setInterval(emit, 4000);
    if (this._heartbeatInterval && typeof this._heartbeatInterval.unref === 'function') {
      this._heartbeatInterval.unref();
    }
  }

  stopSessionHeartbeat() {
    if (this._heartbeatInterval) {
      clearInterval(this._heartbeatInterval);
      this._heartbeatInterval = null;
    }
  }

  getActiveSessions() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('mm3e_active_sessions') : this._sharedFallback['mm3e_active_sessions'];
      const sessions = raw ? JSON.parse(raw) : {};
      const now = Date.now();
      const active = {};
      Object.entries(sessions).forEach(([id, s]) => {
        if (now - (s.lastHeartbeat || 0) < 12000) {
          active[id.replace(/^#+/, '')] = s;
        }
      });
      return active;
    } catch {
      return {};
    }
  }

  isSessionActive(campaignId) {
    if (!campaignId) return false;
    const cleanId = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    const active = this.getActiveSessions();
    return !!active[cleanId];
  }

  getCampaignRegistry() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('mm3e_campaign_registry') : this._sharedFallback['mm3e_campaign_registry'];
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  registerCampaignInfo(info) {
    if (!info || !info.campaignId) return;
    try {
      const reg = this.getCampaignRegistry();
      const id = String(info.campaignId).trim().toUpperCase().replace(/^#+/, "");
      const prev = reg[id] || {};
      reg[id] = {
        campaignId: id,
        campaignName: (info.campaignName || prev.campaignName || id).trim(),
        pin: info.pin !== undefined ? (info.pin || '').trim() : (prev.pin || ''),
        powerLevel: parseInt(info.powerLevel, 10) || prev.powerLevel || 10,
        dontEnforcePL: info.dontEnforcePL !== undefined ? !!info.dontEnforcePL : !!prev.dontEnforcePL,
        creatorName: info.creatorName || prev.creatorName || '',
        isHost: info.isHost !== undefined ? !!info.isHost : !!prev.isHost,
        isOnHiatus: info.isOnHiatus !== undefined ? !!info.isOnHiatus : !!prev.isOnHiatus,
        isPublic: info.isPublic !== undefined ? !!info.isPublic : !!prev.isPublic,
        notes: info.notes !== undefined ? String(info.notes) : (prev.notes || ''),
        createdAtMs: info.createdAtMs || prev.createdAtMs || Date.now(),
        pendingTransfer: info.pendingTransfer !== undefined ? info.pendingTransfer : (prev.pendingTransfer || null),
        lastUpdated: Date.now()
      };
      const serialized = JSON.stringify(reg);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaign_registry', serialized);
      } else {
        this._sharedFallback['mm3e_campaign_registry'] = serialized;
      }
    } catch (e) {
      console.warn('Failed to register campaign info', e);
    }
  }

  startSession(campaignId) {
    const current = this.getCampaignState();
    const cleanId = String(campaignId || current.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return;

    const info = this.getCampaignInfo(cleanId) || current;
    const histMatch = this.getCampaignHistory().find(c => c.campaignId === cleanId);
    if (info?.isOnHiatus || histMatch?.isOnHiatus) {
      throw new Error(`Campaign "${info?.campaignName || histMatch?.campaignName || cleanId}" is currently on hiatus. Resume the campaign from hiatus before starting a game session.`);
    }
    const campName = info?.campaignName || histMatch?.campaignName || current.campaignName || cleanId;
    const campPL = parseInt(info?.powerLevel ?? histMatch?.powerLevel ?? current.powerLevel ?? 10, 10) || 10;
    const dontEnforce = !!(info?.dontEnforcePL ?? histMatch?.dontEnforcePL ?? current.dontEnforcePL);

    // Connect GM to the live campaign room now that the session is starting
    const liveState = {
      ...current,
      isConnected: true,
      campaignId: cleanId,
      campaignName: campName,
      pin: info?.pin || current.pin || '',
      powerLevel: campPL,
      dontEnforcePL: dontEnforce,
      isHost: true,
      isCreator: true,
      connectedAt: new Date().toLocaleTimeString()
    };
    this.saveCampaignState(liveState);
    this.startSessionHeartbeat();
    this.broadcastMessage({
      type: 'SESSION_STARTED',
      campaignId: cleanId,
      campaignName: campName,
      powerLevel: campPL
    });
    this.renderAllOpenViews();
  }

  endSession(campaignId) {
    const current = this.getCampaignState();
    const cleanId = String(campaignId || current.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return;
    this.stopSessionHeartbeat();
    if (current.isHost || current.isCreator) {
      // Save copies of all connected campaign characters as they were at the end of the session
      const members = this.getPartyMembers();
      const sessionEndTimestamp = new Date().toISOString();
      members.forEach(m => {
        if (m.characterData) {
          this.saveCampaignSavedCharacter(cleanId, m.characterData, m.playerName, sessionEndTimestamp);
        }
      });
    }
    this.broadcastMessage({
      type: 'SESSION_ENDED',
      campaignId: cleanId
    });
    try {
      const sessions = this.getActiveSessions();
      delete sessions[cleanId];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_active_sessions', JSON.stringify(sessions));
      } else {
        this._sharedFallback['mm3e_active_sessions'] = JSON.stringify(sessions);
      }
    } catch (e) {}

    // Disconnect from live campaign room when session ends (no one stays connected without a session running)
    if (current.campaignId === cleanId || current.isConnected) {
      this.saveCampaignState({
        ...current,
        isConnected: false
      });
    }
    this.renderAllOpenViews();
  }


  // =======================================================
  // GM CAMPAIGN SAVED CHARACTERS & CHANGE DETECTION
  // =======================================================
  getCampaignSavedCharacters(campaignId) {
    if (!campaignId) return {};
    const clean = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    const key = `mm3e_campaign_saved_chars_${clean}`;
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : this._memoryFallback[key];
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  saveCampaignSavedCharacter(campaignId, charData, playerName = '', timestamp = null) {
    if (!campaignId || !charData) return;
    const clean = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    const key = `mm3e_campaign_saved_chars_${clean}`;
    const chars = this.getCampaignSavedCharacters(clean);
    const charId = String(charData.id || charData.name || 'hero').trim();
    const charKey = charId.toLowerCase();
    const nowIso = timestamp || new Date().toISOString();

    const record = {
      characterId: charId,
      characterName: charData.name || 'Hero',
      playerName: playerName || charData.playerName || '',
      timestamp: nowIso,
      characterData: JSON.parse(JSON.stringify(charData))
    };

    chars[charKey] = record;
    try {
      const serialized = JSON.stringify(chars);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, serialized);
      }
      this._memoryFallback[key] = serialized;
    } catch (e) {
      console.warn('Failed to save campaign character locally:', e);
    }

    if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
      supabaseService.saveCampaignCharacterSnapshot({
        campaignId: clean,
        characterId: charId,
        characterName: record.characterName,
        playerName: record.playerName,
        characterData: record.characterData,
        timestamp: nowIso
      }).catch(() => {});
    }
  }

  getCampaignSavedCharacter(campaignId, charId, charName = '') {
    const chars = this.getCampaignSavedCharacters(campaignId);
    if (charId && chars[String(charId).toLowerCase()]) {
      return chars[String(charId).toLowerCase()];
    }
    if (charName) {
      const targetName = String(charName).trim().toLowerCase();
      const match = Object.values(chars).find(c => String(c.characterName || '').trim().toLowerCase() === targetName);
      if (match) return match;
    }
    return null;
  }

  compareCharacterCopies(saved, incoming) {
    if (!saved || !incoming) return [];
    const diffs = [];

    // 1. Power Level
    const sPL = parseInt(saved.powerLevel || 10, 10);
    const iPL = parseInt(incoming.powerLevel || 10, 10);
    if (sPL !== iPL) {
      diffs.push(`Power Level: PL ${sPL} → PL ${iPL}`);
    }

    // 2. Abilities
    const abilities = ['str', 'sta', 'agi', 'dex', 'fgt', 'int', 'awe', 'pre'];
    const abilityLabels = { str: 'Strength', sta: 'Stamina', agi: 'Agility', dex: 'Dexterity', fgt: 'Fighting', int: 'Intellect', awe: 'Awareness', pre: 'Presence' };
    const sAb = saved.abilities || {};
    const iAb = incoming.abilities || {};
    abilities.forEach(k => {
      const sVal = parseInt(sAb[k] ?? 0, 10);
      const iVal = parseInt(iAb[k] ?? 0, 10);
      if (sVal !== iVal) {
        diffs.push(`${abilityLabels[k] || k.toUpperCase()}: ${sVal} → ${iVal}`);
      }
    });

    // 3. Defenses
    const defenses = ['dodge', 'parry', 'fortitude', 'toughness', 'will'];
    const sDef = saved.defenses || {};
    const iDef = incoming.defenses || {};
    defenses.forEach(k => {
      const sVal = parseInt(sDef[k]?.ranks ?? sDef[k] ?? 0, 10);
      const iVal = parseInt(iDef[k]?.ranks ?? iDef[k] ?? 0, 10);
      if (sVal !== iVal) {
        const dName = k.charAt(0).toUpperCase() + k.slice(1);
        diffs.push(`${dName} Defense: ${sVal} → ${iVal}`);
      }
    });

    // 4. Powers
    const sPowers = Array.isArray(saved.powers) ? saved.powers : [];
    const iPowers = Array.isArray(incoming.powers) ? incoming.powers : [];
    const sPowerMap = new Map();
    sPowers.forEach(p => sPowerMap.set(String(p.name || '').trim().toLowerCase(), p));
    const iPowerMap = new Map();
    iPowers.forEach(p => iPowerMap.set(String(p.name || '').trim().toLowerCase(), p));

    iPowers.forEach(ip => {
      const pName = String(ip.name || '').trim();
      const pKey = pName.toLowerCase();
      if (!sPowerMap.has(pKey)) {
        diffs.push(`New Power Added: "${pName}" (Rank ${ip.rank || 1})`);
      } else {
        const sp = sPowerMap.get(pKey);
        if (parseInt(sp.rank ?? 0, 10) !== parseInt(ip.rank ?? 0, 10)) {
          diffs.push(`Power "${pName}" Rank: ${sp.rank} → ${ip.rank}`);
        }
      }
    });

    sPowers.forEach(sp => {
      const pName = String(sp.name || '').trim();
      if (!iPowerMap.has(pName.toLowerCase())) {
        diffs.push(`Power Removed: "${pName}"`);
      }
    });

    // 5. Advantages
    const sAdv = (Array.isArray(saved.advantages) ? saved.advantages : []).map(a => typeof a === 'string' ? a : (a.name || '')).filter(Boolean);
    const iAdv = (Array.isArray(incoming.advantages) ? incoming.advantages : []).map(a => typeof a === 'string' ? a : (a.name || '')).filter(Boolean);
    const addedAdv = iAdv.filter(a => !sAdv.includes(a));
    const removedAdv = sAdv.filter(a => !iAdv.includes(a));
    if (addedAdv.length > 0) diffs.push(`Added Advantage(s): ${addedAdv.join(', ')}`);
    if (removedAdv.length > 0) diffs.push(`Removed Advantage(s): ${removedAdv.join(', ')}`);

    // 6. Skills
    const sSkills = Array.isArray(saved.skills) ? saved.skills : [];
    const iSkills = Array.isArray(incoming.skills) ? incoming.skills : [];
    const sSkillMap = new Map();
    sSkills.forEach(s => sSkillMap.set(String(s.name || '').toLowerCase(), parseInt(s.ranks ?? 0, 10)));
    iSkills.forEach(is => {
      const sName = String(is.name || '').trim();
      const sRanks = sSkillMap.get(sName.toLowerCase()) ?? 0;
      const iRanks = parseInt(is.ranks ?? 0, 10);
      if (sRanks !== iRanks && (sRanks > 0 || iRanks > 0)) {
        diffs.push(`Skill "${sName}" Ranks: ${sRanks} → ${iRanks}`);
      }
    });

    return diffs;
  }

  async handleGMIncomingCharacterCheck(campaignId, incomingChar, playerName, clientTimestamp) {
    if (!campaignId || !incomingChar) return;
    const clean = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    const current = this.getCampaignState();
    if (!current.isHost) return;

    const charId = incomingChar.id || incomingChar.name;
    const savedRecord = this.getCampaignSavedCharacter(clean, charId, incomingChar.name);

    if (!savedRecord || !savedRecord.characterData) {
      // First time connecting to GM's campaign: save initial snapshot
      this.saveCampaignSavedCharacter(clean, incomingChar, playerName, clientTimestamp || new Date().toISOString());
      return;
    }

    const diffs = this.compareCharacterCopies(savedRecord.characterData, incomingChar);
    if (!diffs || diffs.length === 0) return;

    const savedTime = savedRecord.timestamp ? new Date(savedRecord.timestamp).toLocaleString() : 'Last Session Snapshot';
    const incomingTime = clientTimestamp ? new Date(clientTimestamp).toLocaleString() : new Date().toLocaleString();

    const charName = incomingChar.name || 'Hero';
    const player = playerName || incomingChar.playerName || 'Player';

    // Store diff status on member card for campaign tracker
    const members = this.getPartyMembers();
    const mem = members.find(m => (m.characterName || '').toLowerCase() === charName.toLowerCase());
    if (mem) {
      mem.hasDiffAlert = true;
      mem.diffSummary = diffs;
      mem.savedTimestamp = savedTime;
      mem.incomingTimestamp = incomingTime;
      this.savePartyMembers(members);
    }

    const alertKey = `${clean}_${charId}_${diffs.join('|')}`;
    if (this._lastAlertedDiffKey === alertKey) return;
    this._lastAlertedDiffKey = alertKey;

    if (typeof window !== 'undefined' && window.appController && window.appController.showConfirmDialog) {
      const message = `Player "${player}" connected to campaign #${clean} with character "${charName}".\r\n\r\nChanges were detected compared to your campaign's saved copy from the end of the last session:\r\n\r\n` +
        `📅 GM Saved Copy Timestamp: ${savedTime}\r\n` +
        `📅 Player Local Copy Timestamp: ${incomingTime}\r\n\r\n` +
        `Detected Differences:\r\n• ${diffs.join('\r\n• ')}\r\n\r\n` +
        `Would you like to accept these changes and update your campaign records?`;

      const accepted = await window.appController.showConfirmDialog(message, {
        title: `⚠️ Character Changes: ${charName}`,
        confirmText: 'Accept Changes',
        cancelText: 'Keep GM Copy'
      });

      if (accepted) {
        this.saveCampaignSavedCharacter(clean, incomingChar, player, clientTimestamp || new Date().toISOString());
        if (mem) {
          delete mem.hasDiffAlert;
          delete mem.diffSummary;
          this.savePartyMembers(members);
        }
        this.renderAllOpenViews();
      }
    }
  }

  getCampaignInfo(idOrName) {
    if (!idOrName) return null;
    const clean = String(idOrName).trim().toUpperCase().replace(/^#+/, "");
    const reg = this.getCampaignRegistry();
    if (reg[clean]) return reg[clean];
    const matchReg = Object.values(reg).find(c => (c.campaignName || '').trim().toUpperCase() === clean);
    if (matchReg) return matchReg;
    const history = this.getCampaignHistory();
    const matchHist = history.find(c => c.campaignId === clean || (c.campaignName || '').trim().toUpperCase() === clean);
    if (matchHist) return matchHist;
    const sessions = this.getActiveSessions();
    const matchSess = Object.values(sessions).find(s => s.campaignId === clean || (s.campaignName || '').trim().toUpperCase() === clean);
    if (matchSess) return matchSess;
    return null;
  }

  getCampaignState() {
    try {
      // Use sessionStorage so individual browser tabs (e.g. GM tab vs Player tab) can connect independently
      const raw = typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem(this.campaignStateKey)
        : (typeof localStorage !== 'undefined' ? localStorage.getItem(this.campaignStateKey) : this._memoryFallback[this.campaignStateKey]);
      return raw ? JSON.parse(raw) : { isConnected: false, campaignId: '', campaignName: '', pin: '', powerLevel: 10, dontEnforcePL: false, isHost: false };
    } catch {
      return { isConnected: false, campaignId: '', campaignName: '', pin: '', powerLevel: 10, dontEnforcePL: false, isHost: false };
    }
  }

  saveCampaignState(state) {
    try {
      const serialized = JSON.stringify(state);
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(this.campaignStateKey, serialized);
      }
      this._memoryFallback[this.campaignStateKey] = serialized;
      this.updateHeaderBadge();
      this.renderAllOpenViews();
    } catch (e) {
      console.error('Failed to save campaign state', e);
    }
  }

  isPopoutOpen() {
    return !!(this.popoutWindow && !this.popoutWindow.closed);
  }

  isUserConnected() {
    const state = this.getCampaignState();
    return !!(state && state.isConnected && state.campaignId && this.isSessionActive(state.campaignId));
  }

  /**
   * Generates a clean, collision-free campaign ID code (e.g., "HERO-4829" or "JL-8192")
   */
  generateUniqueCampaignId(campaignName = 'Hero') {
    const cleanPrefix = (campaignName || 'HERO')
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase()
      .slice(0, 4) || 'CAMP';
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    return `${cleanPrefix}-${randDigits}`;
  }

  /**
   * Generates a deterministic campaign ID from a campaign name so players joining by name alone resolve consistently
   */
  generateDeterministicCampaignId(campaignName = 'Hero') {
    const clean = (campaignName || 'HERO').trim().toUpperCase();
    const prefix = clean.replace(/[^A-Z]/g, '').slice(0, 4) || 'CAMP';
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = ((hash << 5) - hash) + clean.charCodeAt(i);
      hash |= 0;
    }
    const digits = 1000 + (Math.abs(hash) % 9000);
    return `${prefix}-${digits}`;
  }

  /**
   * Generates a shareable campaign link for GMs to post to players
   */
  generateCampaignLink(campaign) {
    if (!campaign) return '';
    const cName = (campaign.campaignName || campaign.name || '').trim();
    const cId = (campaign.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cPL = campaign.powerLevel || 10;
    const baseUrl = (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null')
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://mm3e-hero-editor.app/';
    const params = new URLSearchParams();
    if (cName) params.set('campaign', cName);
    if (cId) params.set('id', cId);
    params.set('pl', String(cPL));
    if (campaign.dontEnforcePL) params.set('nopl', '1');
    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Parses either a pasted Campaign Link or a Campaign Name / ID
   */
  parseCampaignLinkOrName(rawInput) {
    const str = String(rawInput || '').trim();
    if (!str) return null;
    try {
      if (str.includes('campaign=') || str.includes('id=') || str.startsWith('http://') || str.startsWith('https://') || str.startsWith('mm3e://')) {
        const qIndex = str.indexOf('?');
        const queryString = qIndex >= 0 ? str.slice(qIndex + 1) : str;
        const params = new URLSearchParams(queryString);
        const nameParam = (params.get('campaign') || '').trim();
        const idParam = (params.get('id') || '').trim().toUpperCase().replace(/^#+/, '');
        const plParam = parseInt(params.get('pl') || '10', 10) || 10;
        const noPlParam = params.get('nopl') === '1';
        if (nameParam || idParam) {
          const existing = this.getCampaignInfo(idParam || nameParam);
          return {
            campaignName: nameParam || existing?.campaignName || idParam,
            campaignId: idParam || existing?.campaignId || this.generateDeterministicCampaignId(nameParam),
            powerLevel: existing?.powerLevel ?? plParam,
            dontEnforcePL: existing?.dontEnforcePL ?? noPlParam,
            isFromLink: true
          };
        }
      }
    } catch (e) {}

    const clean = str.replace(/^#+/, '').trim();
    const existing = this.getCampaignInfo(clean);
    if (existing) {
      return {
        campaignName: existing.campaignName || clean,
        campaignId: existing.campaignId,
        powerLevel: existing.powerLevel || 10,
        dontEnforcePL: !!existing.dontEnforcePL,
        isFromLink: false
      };
    }

    return {
      campaignName: clean,
      campaignId: this.generateDeterministicCampaignId(clean),
      powerLevel: 10,
      dontEnforcePL: false,
      isFromLink: false
    };
  }

  /**
   * Checks whether the user is already a member of the specified campaign
   */
  isUserMemberOfCampaign(campaignId, campaignName) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cleanName = String(campaignName || '').trim().toLowerCase();
    const history = this.getCampaignHistory();
    const inHistory = history.some(c =>
      (cleanId && c.campaignId === cleanId) ||
      (cleanName && (c.campaignName || '').trim().toLowerCase() === cleanName)
    );
    if (inHistory) return true;

    if (typeof window !== 'undefined' && window.appController) {
      const char = window.appController.char;
      if (char) {
        if ((cleanId && (char.campaignId || '').toUpperCase().replace(/^#+/, '') === cleanId) ||
            (cleanName && (char.campaign || '').trim().toLowerCase() === cleanName)) {
          return true;
        }
      }
      const storedChars = window.appController.storage?.getCharacters?.() || [];
      if (storedChars.some(ch =>
        (cleanId && (ch.campaignId || '').toUpperCase().replace(/^#+/, '') === cleanId) ||
        (cleanName && (ch.campaign || '').trim().toLowerCase() === cleanName)
      )) {
        return true;
      }
    }
    return false;
  }

  /**
   * Creates a new campaign.
   * Does NOT automatically start a session or connect to a live campaign room until startSession() is called.
   */
  createCampaign({ name, campaignId, pin, creatorName = 'GM', powerLevel = 10, dontEnforcePL = false, isPublic = false, notes = '' }) {
    if (this.isUserConnected()) {
      const current = this.getCampaignState();
      throw new Error(`You are currently connected to an active session in campaign "${current.campaignName || current.campaignId}" (ID: #${current.campaignId}). You must disconnect from your current session before creating a new campaign.`);
    }

    const assignedId = (campaignId || this.generateUniqueCampaignId(name)).trim().toUpperCase().replace(/^#+/, '');
    const cleanPin = (pin || '').trim();
    const pl = parseInt(powerLevel, 10) || 10;
    const noEnforce = !!dontEnforcePL;
    const cleanNotes = String(notes || '');
    const createdAtMs = Date.now();

    const newState = {
      isConnected: false,
      campaignId: assignedId,
      campaignName: (name || 'New Campaign').trim(),
      pin: cleanPin,
      powerLevel: pl,
      dontEnforcePL: noEnforce,
      isPublic: !!isPublic,
      notes: cleanNotes,
      createdAtMs,
      isHost: true,
      isCreator: true,
      creatorName,
      connectedAt: new Date().toLocaleTimeString(),
      campaignLink: ''
    };
    newState.campaignLink = this.generateCampaignLink(newState);

    this.saveCampaignState(newState);
    this.registerCampaignInfo(newState);
    this.saveToCampaignHistory(newState);

    // Announce creation to network
    this.broadcastMessage({
      type: 'CAMPAIGN_ANNOUNCE',
      campaignId: assignedId,
      campaignName: newState.campaignName,
      pin: cleanPin,
      powerLevel: pl,
      dontEnforcePL: noEnforce,
      isPublic: !!isPublic,
      notes: cleanNotes,
      createdAtMs,
      creatorName
    });

    return newState;
  }

  updateCampaignSettings({ campaignId, powerLevel, dontEnforcePL, isPublic, notes }) {
    const current = this.getCampaignState();
    const targetId = String(campaignId || current.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const histMatch = this.getCampaignHistory().find(c => c.campaignId === targetId);
    const regInfo = this.getCampaignInfo(targetId) || {};
    if (!current.isHost && !current.isCreator && !histMatch?.isCreator) return;

    const effPL = powerLevel !== undefined ? (parseInt(powerLevel, 10) || 10) : (histMatch?.powerLevel ?? regInfo.powerLevel ?? current.powerLevel ?? 10);
    const effDontEnforce = dontEnforcePL !== undefined ? !!dontEnforcePL : !!(histMatch?.dontEnforcePL ?? regInfo.dontEnforcePL ?? current.dontEnforcePL);
    const effPublic = isPublic !== undefined ? !!isPublic : !!(histMatch?.isPublic ?? regInfo.isPublic ?? current.isPublic);
    const effNotes = notes !== undefined ? String(notes) : (histMatch?.notes ?? regInfo.notes ?? current.notes ?? '');

    if (!campaignId || current.campaignId === targetId) {
      current.powerLevel = effPL;
      current.dontEnforcePL = effDontEnforce;
      current.isPublic = effPublic;
      current.notes = effNotes;
      this.saveCampaignState(current);
    }

    const updatedPayload = {
      ...regInfo,
      ...(histMatch || {}),
      campaignId: targetId || current.campaignId,
      campaignName: histMatch?.campaignName || regInfo.campaignName || current.campaignName || targetId,
      powerLevel: effPL,
      dontEnforcePL: effDontEnforce,
      isPublic: effPublic,
      notes: effNotes
    };

    this.registerCampaignInfo(updatedPayload);
    if (histMatch) {
      this.saveToCampaignHistory(updatedPayload);
    }
    this.broadcastMessage({
      type: 'CAMPAIGN_UPDATE',
      campaignId: updatedPayload.campaignId,
      campaignName: updatedPayload.campaignName,
      pin: updatedPayload.pin || current.pin,
      powerLevel: effPL,
      dontEnforcePL: effDontEnforce,
      isPublic: effPublic,
      notes: effNotes
    });
    this.renderAllOpenViews();
    return updatedPayload;
  }

  /**
   * Advertises a GM-owned campaign publicly in the Campaign Browser or unlists it.
   */
  setCampaignPublic(campaignId, isPublic = true) {
    return this.updateCampaignSettings({ campaignId, isPublic: !!isPublic });
  }

  /**
   * Updates the GM's campaign notes / description field.
   */
  setCampaignNotes(campaignId, notes = '') {
    return this.updateCampaignSettings({ campaignId, notes: String(notes || '') });
  }

  // =======================================================
  // CAMPAIGN BROWSER: SEARCH, LEGAL PL RANGE, SORT & FILTER
  // =======================================================
  setBrowserPLRange(minVal, maxVal, changedSide = 'min') {
    if (!this.browserFilters) {
      this.browserFilters = { query: '', searchName: true, searchDesc: true, searchPL: false, plMin: 1, plMax: 20, sortBy: 'default', hideHiatus: false };
    }
    let cleanMin = Math.max(1, Math.min(20, parseInt(minVal, 10) || 1));
    let cleanMax = Math.max(1, Math.min(20, parseInt(maxVal, 10) || 20));
    if (changedSide === 'min' && cleanMin > cleanMax) {
      cleanMax = cleanMin;
    } else if (changedSide === 'max' && cleanMax < cleanMin) {
      cleanMin = cleanMax;
    } else if (cleanMin > cleanMax) {
      cleanMax = cleanMin;
    }
    this.browserFilters.plMin = cleanMin;
    this.browserFilters.plMax = cleanMax;
    return { plMin: cleanMin, plMax: cleanMax };
  }

  setBrowserFilter(updates = {}) {
    if (!this.browserFilters) {
      this.browserFilters = { query: '', searchName: true, searchDesc: true, searchPL: false, plMin: 1, plMax: 20, sortBy: 'default', hideHiatus: false };
    }
    const prevMin = this.browserFilters.plMin;
    const prevMax = this.browserFilters.plMax;
    Object.assign(this.browserFilters, updates);
    const changedSide = updates.plMin !== undefined && updates.plMin !== prevMin ? 'min' : (updates.plMax !== undefined && updates.plMax !== prevMax ? 'max' : 'min');
    this.setBrowserPLRange(this.browserFilters.plMin, this.browserFilters.plMax, changedSide);
    return this.browserFilters;
  }

  getBrowsableCampaigns() {
    if (!this.browserFilters) {
      this.browserFilters = { query: '', searchName: true, searchDesc: true, searchPL: false, plMin: 1, plMax: 20, sortBy: 'default', hideHiatus: false };
    }
    const history = this.getCampaignHistory();
    const reg = this.getCampaignRegistry();
    const mergedMap = new Map();

    // 1. Add user's joined or created campaigns from history
    history.forEach(h => {
      const cleanId = String(h.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      if (!cleanId) return;
      const regEntry = reg[cleanId] || {};
      mergedMap.set(cleanId, {
        ...regEntry,
        ...h,
        campaignId: cleanId,
        isPublic: !!(h.isPublic ?? regEntry.isPublic),
        notes: String(h.notes ?? regEntry.notes ?? ''),
        isOnHiatus: !!(h.isOnHiatus ?? regEntry.isOnHiatus),
        createdAtMs: h.createdAtMs || regEntry.createdAtMs || h.lastJoinedMs || 0,
        isJoinedOrCreated: true
      });
    });

    // 2. Add all public advertised campaigns from the registry
    Object.values(reg).forEach(r => {
      const cleanId = String(r.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      if (!cleanId) return;
      if (mergedMap.has(cleanId)) return;
      const isMember = this.isUserMemberOfCampaign(cleanId, r.campaignName);
      if (r.isPublic || isMember) {
        mergedMap.set(cleanId, {
          ...r,
          campaignId: cleanId,
          isCreator: false,
          isPublic: !!r.isPublic,
          notes: String(r.notes || ''),
          isOnHiatus: !!r.isOnHiatus,
          createdAtMs: r.createdAtMs || r.lastUpdated || 0,
          isJoinedOrCreated: !!isMember
        });
      }
    });

    let list = Array.from(mergedMap.values());
    const f = this.browserFilters;

    // Filter out on-hiatus campaigns if checked
    if (f.hideHiatus) {
      list = list.filter(c => !c.isOnHiatus);
    }

    // Filter by Power Level range if checked
    if (f.searchPL) {
      const minPL = Math.min(f.plMin, f.plMax);
      const maxPL = Math.max(f.plMin, f.plMax);
      list = list.filter(c => {
        const pl = parseInt(c.powerLevel, 10) || 10;
        return pl >= minPL && pl <= maxPL;
      });
    }

    // Filter by search query across checked fields (campaign name, description/notes)
    const q = String(f.query || '').trim().toLowerCase();
    if (q) {
      list = list.filter(c => {
        const nameMatch = f.searchName && (
          String(c.campaignName || '').toLowerCase().includes(q) ||
          String(c.campaignId || '').toLowerCase().includes(q)
        );
        const descMatch = f.searchDesc && String(c.notes || '').toLowerCase().includes(q);
        if (!f.searchName && !f.searchDesc) {
          return String(c.campaignName || '').toLowerCase().includes(q) || String(c.notes || '').toLowerCase().includes(q);
        }
        return nameMatch || descMatch;
      });
    }

    // Sort results
    const sortMode = f.sortBy || 'default';
    list.sort((a, b) => {
      if (sortMode === 'default') {
        const aJoined = a.isJoinedOrCreated ? 1 : 0;
        const bJoined = b.isJoinedOrCreated ? 1 : 0;
        if (bJoined !== aJoined) return bJoined - aJoined;
        return (b.lastJoinedMs || b.createdAtMs || 0) - (a.lastJoinedMs || a.createdAtMs || 0);
      }
      if (sortMode === 'name_asc') {
        return String(a.campaignName || '').localeCompare(String(b.campaignName || ''));
      }
      if (sortMode === 'gm_asc') {
        return String(a.creatorName || 'GM').localeCompare(String(b.creatorName || 'GM'));
      }
      if (sortMode === 'age_desc') {
        return (b.createdAtMs || 0) - (a.createdAtMs || 0);
      }
      if (sortMode === 'age_asc') {
        return (a.createdAtMs || 0) - (b.createdAtMs || 0);
      }
      if (sortMode === 'pl_asc') {
        return (parseInt(a.powerLevel, 10) || 10) - (parseInt(b.powerLevel, 10) || 10);
      }
      if (sortMode === 'pl_desc') {
        return (parseInt(b.powerLevel, 10) || 10) - (parseInt(a.powerLevel, 10) || 10);
      }
      return 0;
    });

    return list;
  }

  /**
   * Joins / applies to a campaign (membership) by Campaign Name, Link, or ID.
   * Distinct from joining a live game session: works without a session running and does NOT connect to a room.
   */
  joinCampaign({ campaignId = '', campaignName = '', pin = '', playerName = 'Player', powerLevel = 10, dontEnforcePL = false } = {}) {
    const parsed = this.parseCampaignLinkOrName(campaignName || campaignId);
    if (!parsed) {
      throw new Error('Please enter a Campaign Name or paste a Campaign Link to join.');
    }

    const cleanId = (campaignId ? String(campaignId).trim().toUpperCase().replace(/^#+/, '') : parsed.campaignId);
    const cleanPin = (pin || '').trim();
    const info = this.getCampaignInfo(cleanId) || this.getCampaignInfo(parsed.campaignName);
    const effName = (campaignName && !campaignName.includes('campaign=') && !campaignName.startsWith('http'))
      ? campaignName.trim()
      : (info?.campaignName || parsed.campaignName || cleanId);
    const effPL = info?.powerLevel ?? parsed.powerLevel ?? (parseInt(powerLevel, 10) || 10);
    const effDontEnforce = info?.dontEnforcePL ?? parsed.dontEnforcePL ?? (!!dontEnforcePL);

    const alreadyMember = this.isUserMemberOfCampaign(cleanId, effName);
    const historyMatch = this.getCampaignHistory().find(c => c.campaignId === cleanId || (c.campaignName || '').toLowerCase() === effName.toLowerCase());
    const isCreator = !!historyMatch?.isCreator;

    const membershipEntry = {
      isConnected: false,
      campaignId: cleanId,
      campaignName: effName,
      pin: cleanPin,
      powerLevel: effPL,
      dontEnforcePL: effDontEnforce,
      isHost: isCreator,
      isCreator,
      playerName,
      alreadyMember,
      isSessionRunning: this.isSessionActive(cleanId)
    };

    this.registerCampaignInfo(membershipEntry);
    this.saveToCampaignHistory(membershipEntry);
    this.renderAllOpenViews();

    return membershipEntry;
  }

  /**
   * Alias for applying to / joining a campaign without requiring a session
   */
  applyToCampaign(opts) {
    return this.joinCampaign(opts);
  }

  /**
   * Joins an actively running game session in a campaign (connects to the live P2P campaign room).
   * Strictly prevents connecting to a campaign room if no game session is currently running.
   */
  joinGameSession({ campaignId, campaignName = '', pin = '', playerName = 'Player', powerLevel = 10, dontEnforcePL = false } = {}) {
    if (this.isUserConnected()) {
      const current = this.getCampaignState();
      const targetCheck = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      if (current.campaignId !== targetCheck) {
        throw new Error(`You are currently connected to a game session in "${current.campaignName || current.campaignId}". Disconnect first to join a different session.`);
      }
    }

    const parsed = this.parseCampaignLinkOrName(campaignId || campaignName);
    const cleanId = (campaignId ? String(campaignId).trim().toUpperCase().replace(/^#+/, '') : (parsed?.campaignId || ''));
    const cleanPin = (pin || '').trim();

    if (!cleanId) {
      throw new Error('Please specify a valid Campaign to join its game session.');
    }

    if (!this.isSessionActive(cleanId)) {
      throw new Error(`Cannot connect to campaign room #${cleanId}: No game session is currently running.`);
    }

    const info = this.getCampaignInfo(cleanId);
    const effName = campaignName || info?.campaignName || parsed?.campaignName || cleanId;
    const effPL = info?.powerLevel ?? (parseInt(powerLevel, 10) || 10);
    const effDontEnforce = info?.dontEnforcePL ?? (!!dontEnforcePL);

    const historyMatch = this.getCampaignHistory().find(c => c.campaignId === cleanId);
    const isCreator = !!historyMatch?.isCreator;

    const newState = {
      isConnected: true,
      campaignId: cleanId,
      campaignName: effName,
      pin: cleanPin,
      powerLevel: effPL,
      dontEnforcePL: effDontEnforce,
      isHost: isCreator,
      isCreator,
      playerName,
      connectedAt: new Date().toLocaleTimeString()
    };

    this.saveCampaignState(newState);
    this.saveToCampaignHistory(newState);

    // Request full roster from peers in this room, sending our local member if registered
    this.broadcastMessage({
      type: 'REQUEST_ROSTER',
      campaignId: cleanId,
      pin: cleanPin,
      playerName,
      member: this.getLocalMember()
    });

    return newState;
  }

  /**
   * Permanently leaves a campaign (membership), disconnecting if in a session and removing from participated campaigns
   */
  leaveCampaignPermanent(campaignId, campaignName = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cleanName = String(campaignName || '').trim().toLowerCase();

    const current = this.getCampaignState();
    if (current && ((cleanId && current.campaignId === cleanId) || (cleanName && (current.campaignName || '').trim().toLowerCase() === cleanName))) {
      if (current.isConnected) {
        this.leaveCampaign();
      } else {
        this.saveCampaignState({
          isConnected: false,
          campaignId: '',
          campaignName: '',
          pin: '',
          powerLevel: 10,
          dontEnforcePL: false,
          isHost: false
        });
      }
    }

    // Remove from campaign history
    try {
      const history = this.getCampaignHistory().filter(c => {
        const matchId = cleanId && c.campaignId === cleanId;
        const matchName = cleanName && (c.campaignName || '').trim().toLowerCase() === cleanName;
        return !matchId && !matchName;
      });
      const serialized = JSON.stringify(history);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaigns_history', serialized);
      } else {
        this._memoryFallback['mm3e_campaigns_history'] = serialized;
      }
    } catch (e) {}

    // Remove any party members tied to this campaign
    const members = this.getPartyMembers().filter(m => {
      const mId = String(m.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      const mName = String(m.campaign || '').trim().toLowerCase();
      return !((cleanId && mId === cleanId) || (cleanName && mName === cleanName));
    });
    this.savePartyMembers(members);
    this.renderAllOpenViews();
  }

  // =======================================================
  // GM HIATUS, CAMPAIGN DELETION & OWNERSHIP TRANSFER
  // =======================================================
  getCurrentUsername() {
    if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
      return supabaseService.getUsername();
    }
    if (typeof window !== 'undefined' && window.appController?.char?.playerName) {
      return window.appController.char.playerName.trim();
    }
    const state = this.getCampaignState();
    return (state.creatorName || state.playerName || 'Player').trim();
  }

  ownsAnyCampaign() {
    return this.getCampaignHistory().some(c => !!c.isCreator);
  }

  /**
   * Puts a GM-owned campaign on hiatus or resumes it from hiatus.
   * The GM still owns the campaign and it is not deleted.
   */
  setCampaignHiatus(campaignId, isOnHiatus = true, gmName = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return null;

    if (isOnHiatus && this.isSessionActive(cleanId)) {
      this.endSession(cleanId);
    }

    const hist = this.getCampaignHistory();
    const match = hist.find(c => c.campaignId === cleanId);
    const info = this.getCampaignInfo(cleanId) || match || {};
    const campName = match?.campaignName || info.campaignName || cleanId;
    const effectiveGM = gmName || match?.creatorName || info.creatorName || this.getCurrentUsername() || 'GM';

    const updatedEntry = {
      ...info,
      ...(match || {}),
      campaignId: cleanId,
      campaignName: campName,
      creatorName: effectiveGM,
      isCreator: match ? !!match.isCreator : true,
      isOnHiatus: !!isOnHiatus
    };

    this.registerCampaignInfo(updatedEntry);
    this.saveToCampaignHistory(updatedEntry);

    this.sendCampaignMessage({
      type: isOnHiatus ? 'CAMPAIGN_ON_HIATUS' : 'CAMPAIGN_RESUMED',
      recipientRole: 'PARTICIPANTS',
      campaignId: cleanId,
      campaignName: campName,
      gmName: effectiveGM,
      playerName: 'All Campaign Players',
      text: isOnHiatus
        ? `Campaign "${campName}" (#${cleanId}) has been placed on hiatus by GM ${effectiveGM}.`
        : `Campaign "${campName}" (#${cleanId}) has resumed from hiatus by GM ${effectiveGM}.`
    });

    this.broadcastMessage({
      type: 'CAMPAIGN_HIATUS_CHANGED',
      campaignId: cleanId,
      campaignName: campName,
      gmName: effectiveGM,
      isOnHiatus: !!isOnHiatus
    });

    this.renderAllOpenViews();
    return updatedEntry;
  }

  /**
   * Specifically deletes/cancels a campaign owned by the GM and notifies all participants.
   */
  deleteCampaignByGM(campaignId, gmName = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return false;

    if (this.isSessionActive(cleanId)) {
      this.endSession(cleanId);
    }

    const hist = this.getCampaignHistory();
    const match = hist.find(c => c.campaignId === cleanId);
    const info = this.getCampaignInfo(cleanId) || match || {};
    const campName = match?.campaignName || info.campaignName || cleanId;
    const effectiveGM = gmName || match?.creatorName || info.creatorName || this.getCurrentUsername() || 'GM';

    this.sendCampaignMessage({
      type: 'CAMPAIGN_CANCELLED',
      recipientRole: 'PARTICIPANTS',
      campaignId: cleanId,
      campaignName: campName,
      gmName: effectiveGM,
      playerName: 'All Campaign Players',
      text: `Campaign "${campName}" (#${cleanId}) has been cancelled and deleted by GM ${effectiveGM}.`
    });

    this.broadcastMessage({
      type: 'CAMPAIGN_DELETED',
      campaignId: cleanId,
      campaignName: campName,
      gmName: effectiveGM
    });

    // Remove from registry and history
    try {
      const reg = this.getCampaignRegistry();
      delete reg[cleanId];
      const serializedReg = JSON.stringify(reg);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaign_registry', serializedReg);
      } else {
        this._sharedFallback['mm3e_campaign_registry'] = serializedReg;
      }
    } catch (e) {}

    this.leaveCampaignPermanent(cleanId, campName);
    return true;
  }

  /**
   * Initiates a campaign ownership transfer offer to another user.
   * Sends the target user a message asking if they want to take ownership (Accept / Refuse).
   * The GM can withdraw the offer at any time until the target responds.
   */
  initiateOwnershipTransfer(campaignId, targetUser, gmName = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cleanTarget = String(targetUser || '').trim();
    if (!cleanId || !cleanTarget) {
      throw new Error('Please specify both a campaign and a target user to transfer ownership.');
    }

    const hist = this.getCampaignHistory();
    const match = hist.find(c => c.campaignId === cleanId);
    const info = this.getCampaignInfo(cleanId) || match || {};
    const campName = match?.campaignName || info.campaignName || cleanId;
    const effectiveGM = gmName || match?.creatorName || info.creatorName || this.getCurrentUsername() || 'GM';
    const isDuringHiatus = !!(match?.isOnHiatus || info.isOnHiatus);

    const offer = {
      offerId: 'xfer_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      campaignId: cleanId,
      campaignName: campName,
      fromGM: effectiveGM,
      targetUser: cleanTarget,
      isDuringHiatus,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const updated = {
      ...info,
      ...(match || {}),
      campaignId: cleanId,
      campaignName: campName,
      creatorName: effectiveGM,
      isCreator: true,
      pendingTransfer: offer
    };

    this.registerCampaignInfo(updated);
    this.saveToCampaignHistory(updated);

    const msg = this.sendCampaignMessage({
      id: offer.offerId,
      type: 'OWNERSHIP_TRANSFER_OFFER',
      offerId: offer.offerId,
      offerStatus: 'pending',
      recipientRole: 'USER',
      recipientUser: cleanTarget,
      campaignId: cleanId,
      campaignName: campName,
      gmName: effectiveGM,
      playerName: cleanTarget,
      text: `GM ${effectiveGM} has offered to transfer ownership of campaign "${campName}" (#${cleanId})${isDuringHiatus ? ' (currently on hiatus)' : ''} to you (${cleanTarget}). Would you like to accept or refuse ownership of this campaign?`
    });

    this.broadcastMessage({
      type: 'CAMPAIGN_TRANSFER_OFFERED',
      campaignId: cleanId,
      campaignName: campName,
      offer,
      message: msg
    });

    this.renderAllOpenViews();
    return offer;
  }

  /**
   * Allows the GM to withdraw a pending ownership transfer offer at any time before the target user responds.
   */
  withdrawOwnershipTransfer(campaignId, gmName = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return false;

    const hist = this.getCampaignHistory();
    const match = hist.find(c => c.campaignId === cleanId);
    const info = this.getCampaignInfo(cleanId) || match || {};
    const pending = match?.pendingTransfer || info.pendingTransfer;
    if (!pending || pending.status !== 'pending') {
      throw new Error('There is no pending ownership transfer offer to withdraw for this campaign.');
    }

    const campName = match?.campaignName || info.campaignName || cleanId;
    const effectiveGM = gmName || pending.fromGM || match?.creatorName || this.getCurrentUsername() || 'GM';
    const targetUser = pending.targetUser;

    const updated = {
      ...info,
      ...(match || {}),
      campaignId: cleanId,
      campaignName: campName,
      pendingTransfer: null
    };
    this.registerCampaignInfo(updated);
    this.saveToCampaignHistory(updated);

    // Mark the offer message as withdrawn so the target user can no longer accept it
    this.updateCampaignMessageOfferStatus(pending.offerId, cleanId, 'withdrawn');

    this.sendCampaignMessage({
      type: 'OWNERSHIP_TRANSFER_WITHDRAWN',
      recipientRole: 'USER',
      recipientUser: targetUser,
      campaignId: cleanId,
      campaignName: campName,
      gmName: effectiveGM,
      playerName: targetUser,
      text: `GM ${effectiveGM} withdrew the offer to transfer ownership of campaign "${campName}" (#${cleanId}).`
    });

    this.broadcastMessage({
      type: 'CAMPAIGN_TRANSFER_WITHDRAWN',
      campaignId: cleanId,
      offerId: pending.offerId,
      gmName: effectiveGM,
      targetUser
    });

    this.renderAllOpenViews();
    return true;
  }

  /**
   * Allows the target user to accept or refuse a pending campaign ownership transfer offer.
   */
  respondToOwnershipTransfer(campaignId, accept, responderName = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return null;

    const info = this.getCampaignInfo(cleanId) || {};
    const hist = this.getCampaignHistory();
    const match = hist.find(c => c.campaignId === cleanId);
    const pending = info.pendingTransfer || match?.pendingTransfer;

    if (!pending || pending.status !== 'pending') {
      throw new Error('This ownership transfer offer is no longer active or has been withdrawn by the GM.');
    }

    const campName = info.campaignName || match?.campaignName || pending.campaignName || cleanId;
    const previousGM = pending.fromGM || info.creatorName || 'GM';
    const newOwner = (responderName || pending.targetUser || this.getCurrentUsername() || 'New GM').trim();

    this.updateCampaignMessageOfferStatus(pending.offerId, cleanId, accept ? 'accepted' : 'refused');

    if (accept) {
      // Transfer ownership to newOwner
      const updatedReg = {
        ...info,
        campaignId: cleanId,
        campaignName: campName,
        creatorName: newOwner,
        isCreator: true,
        isHost: true,
        pendingTransfer: null
      };
      this.registerCampaignInfo(updatedReg);

      this.saveToCampaignHistory({
        ...(match || info),
        campaignId: cleanId,
        campaignName: campName,
        creatorName: newOwner,
        isCreator: true,
        isHost: true,
        pendingTransfer: null
      });

      this.sendCampaignMessage({
        type: 'OWNERSHIP_TRANSFERRED',
        recipientRole: 'ALL',
        campaignId: cleanId,
        campaignName: campName,
        gmName: newOwner,
        previousGmName: previousGM,
        playerName: newOwner,
        text: `Ownership of campaign "${campName}" (#${cleanId}) has been transferred from ${previousGM} to new GM ${newOwner}.`
      });

      this.broadcastMessage({
        type: 'CAMPAIGN_OWNERSHIP_TRANSFERRED',
        campaignId: cleanId,
        campaignName: campName,
        previousGM,
        newGM: newOwner,
        offerId: pending.offerId
      });

      this.renderAllOpenViews();
      return { status: 'accepted', newGM: newOwner, previousGM, campaignId: cleanId, campaignName: campName };
    } else {
      // Refused transfer offer
      const updatedReg = {
        ...info,
        campaignId: cleanId,
        campaignName: campName,
        pendingTransfer: null
      };
      this.registerCampaignInfo(updatedReg);
      if (match) {
        this.saveToCampaignHistory({
          ...match,
          pendingTransfer: null
        });
      }

      this.sendCampaignMessage({
        type: 'OWNERSHIP_TRANSFER_REFUSED',
        recipientRole: 'GM',
        recipientUser: previousGM,
        campaignId: cleanId,
        campaignName: campName,
        gmName: previousGM,
        playerName: newOwner,
        text: `Player "${newOwner}" refused the offer to take ownership of campaign "${campName}" (#${cleanId}).`
      });

      this.broadcastMessage({
        type: 'CAMPAIGN_TRANSFER_REFUSED',
        campaignId: cleanId,
        campaignName: campName,
        previousGM,
        refusedBy: newOwner,
        offerId: pending.offerId
      });

      this.renderAllOpenViews();
      return { status: 'refused', refusedBy: newOwner, previousGM, campaignId: cleanId, campaignName: campName };
    }
  }

  // =======================================================
  // OFFLINE & ONLINE JOIN REQUESTS (VIEWABLE WITHOUT SESSION)
  // =======================================================
  getAllJoinRequestsStore() {
    try {
      const raw = typeof localStorage !== 'undefined'
        ? localStorage.getItem('mm3e_campaign_join_requests')
        : this._sharedFallback['mm3e_campaign_join_requests'];
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveAllJoinRequestsStore(requests) {
    try {
      const serialized = JSON.stringify(requests);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaign_join_requests', serialized);
      } else {
        this._sharedFallback['mm3e_campaign_join_requests'] = serialized;
      }
    } catch (e) {}
  }

  submitCampaignJoinRequest({ campaignId, campaignName = '', gmName = '', playerName = 'Player', character = {} } = {}) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return null;

    const info = this.getCampaignInfo(cleanId) || {};
    const effCampName = campaignName || info.campaignName || cleanId;
    const effGM = gmName || info.creatorName || 'GM';
    const charName = (character.name || 'Hero').trim();
    const charPL = parseInt(character.powerLevel, 10) || 10;

    const requests = this.getAllJoinRequestsStore();
    const reqId = 'req_' + cleanId + '_' + (playerName || 'player').toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + (character.id || charName).toLowerCase().replace(/[^a-z0-9]/g, '');

    const record = {
      id: reqId,
      campaignId: cleanId,
      campaign_id: cleanId,
      campaignName: effCampName,
      gmName: effGM,
      username: playerName,
      character_id: character.id || 'hero',
      character_name: charName,
      power_level: charPL,
      character_data: JSON.parse(JSON.stringify(character)),
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const existingIdx = requests.findIndex(r => r.id === reqId);
    if (existingIdx >= 0) {
      requests[existingIdx] = record;
    } else {
      requests.unshift(record);
    }
    this.saveAllJoinRequestsStore(requests);

    // Notify GM via campaign messaging (noting Campaign, GM, and Player)
    this.sendCampaignMessage({
      type: 'JOIN_REQUEST',
      recipientRole: 'GM',
      recipientUser: effGM,
      campaignId: cleanId,
      campaignName: effCampName,
      gmName: effGM,
      playerName,
      characterName: charName,
      requestId: reqId,
      text: `Player "${playerName}" requested to join campaign "${effCampName}" (#${cleanId}) with character "${charName}" (PL ${charPL}).`
    });

    this.broadcastMessage({
      type: 'JOIN_REQUEST_SUBMITTED',
      campaignId: cleanId,
      request: record
    });

    this.renderAllOpenViews();
    return record;
  }

  /**
   * Returns join requests viewable by the campaign owner even when no campaign session is running.
   */
  getJoinRequestsForGM(campaignId = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const all = this.getAllJoinRequestsStore();
    if (cleanId) {
      return all.filter(r => String(r.campaignId || r.campaign_id || '').toUpperCase().replace(/^#+/, '') === cleanId);
    }
    const ownedIds = new Set(
      this.getCampaignHistory()
        .filter(c => !!c.isCreator)
        .map(c => c.campaignId)
    );
    return all.filter(r => ownedIds.has(String(r.campaignId || r.campaign_id || '').toUpperCase().replace(/^#+/, '')));
  }

  respondToCampaignJoinRequest(requestId, status, gmName = '') {
    if (status !== 'approved' && status !== 'rejected') return null;
    const requests = this.getAllJoinRequestsStore();
    const req = requests.find(r => r.id === requestId);
    if (!req) return null;

    req.status = status;
    req.updated_at = new Date().toISOString();
    this.saveAllJoinRequestsStore(requests);

    const effGM = gmName || req.gmName || this.getCurrentUsername() || 'GM';

    if (status === 'rejected') {
      this.sendCampaignMessage({
        type: 'JOIN_REQUEST_REJECTED',
        recipientRole: 'PLAYER',
        recipientUser: req.username,
        campaignId: req.campaignId,
        campaignName: req.campaignName,
        gmName: effGM,
        playerName: req.username,
        characterName: req.character_name,
        text: `GM ${effGM} rejected your request to join campaign "${req.campaignName}" (#${req.campaignId}) with character "${req.character_name}".`
      });
    } else if (status === 'approved') {
      if (req.character_data) {
        this.saveCampaignSavedCharacter(req.campaignId, req.character_data, req.username);
      }
      this.sendCampaignMessage({
        type: 'PLAYER_CHARACTER_JOINED',
        recipientRole: 'PARTICIPANTS',
        campaignId: req.campaignId,
        campaignName: req.campaignName,
        gmName: effGM,
        playerName: req.username,
        characterName: req.character_name,
        text: `New player/character joined: Player "${req.username}" with character "${req.character_name}" (PL ${req.power_level}) has joined campaign "${req.campaignName}" (#${req.campaignId}, GM: ${effGM}).`
      });
    }

    this.broadcastMessage({
      type: 'JOIN_REQUEST_RESPONDED',
      campaignId: req.campaignId,
      requestId,
      status,
      gmName: effGM
    });

    this.renderAllOpenViews();
    return req;
  }

  // =======================================================
  // CAMPAIGN & GM / PLAYER MESSAGING SYSTEM
  // =======================================================
  getAllCampaignMessages() {
    try {
      const raw = typeof localStorage !== 'undefined'
        ? localStorage.getItem('mm3e_campaign_messages')
        : this._sharedFallback['mm3e_campaign_messages'];
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveAllCampaignMessages(messages) {
    try {
      const serialized = JSON.stringify(messages);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaign_messages', serialized);
      } else {
        this._sharedFallback['mm3e_campaign_messages'] = serialized;
      }
    } catch (e) {}
  }

  /**
   * Creates and dispatches a structured campaign message.
   * Every message records Campaign, GM, and Player involved so GMs running multiple campaigns never confuse events.
   */
  sendCampaignMessage({
    id = '',
    type = 'INFO',
    recipientRole = 'ALL',
    recipientUser = '',
    campaignId = '',
    campaignName = '',
    gmName = '',
    previousGmName = '',
    playerName = '',
    characterName = '',
    senderUser = '',
    offerId = '',
    offerStatus = '',
    requestId = '',
    text = ''
  } = {}) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const info = this.getCampaignInfo(cleanId) || {};
    const histMatch = this.getCampaignHistory().find(c => c.campaignId === cleanId) || {};

    const resolvedCampName = (campaignName || histMatch.campaignName || info.campaignName || cleanId || 'Campaign').trim();
    const resolvedGM = (gmName || histMatch.creatorName || info.creatorName || 'GM').trim();
    const resolvedPlayer = (playerName || this.getCurrentUsername() || 'Player').trim();

    const msg = {
      id: id || ('msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)),
      type,
      recipientRole,
      recipientUser: (recipientUser || '').trim(),
      senderUser: (senderUser || this.getCurrentUsername() || '').trim(),
      campaignId: cleanId,
      campaignName: resolvedCampName,
      gmName: resolvedGM,
      previousGmName: previousGmName || '',
      playerName: resolvedPlayer,
      characterName: (characterName || '').trim(),
      offerId: offerId || '',
      offerStatus: offerStatus || '',
      requestId: requestId || '',
      text: text || `Campaign "${resolvedCampName}" (GM: ${resolvedGM}, Player: ${resolvedPlayer})`,
      timestamp: new Date().toISOString(),
      displayTime: new Date().toLocaleString(),
      read: false,
      readBy: []
    };

    const messages = this.getAllCampaignMessages();
    messages.unshift(msg);
    this.saveAllCampaignMessages(messages.slice(0, 200));

    this.broadcastMessage({
      type: 'CAMPAIGN_MESSAGE_DISPATCH',
      message: msg
    });

    this.updateHeaderBadge();
    return msg;
  }

  updateCampaignMessageOfferStatus(offerId, campaignId, newStatus) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const messages = this.getAllCampaignMessages();
    messages.forEach(m => {
      if (m.type === 'OWNERSHIP_TRANSFER_OFFER' && ((offerId && m.offerId === offerId) || (cleanId && m.campaignId === cleanId && m.offerStatus === 'pending'))) {
        m.offerStatus = newStatus;
        if (newStatus !== 'pending') m.read = true;
      }
    });
    this.saveAllCampaignMessages(messages);
    this.updateHeaderBadge();
  }

  /**
   * Filters messages relevant to the current user (either as GM of their campaigns, participant in their campaigns, or direct recipient).
   */
  getMessagesForCurrentUser() {
    const all = this.getAllCampaignMessages();
    const history = this.getCampaignHistory();
    const ownedIds = new Set(history.filter(c => !!c.isCreator).map(c => c.campaignId));
    const participatedIds = new Set(history.map(c => c.campaignId));
    const currentUser = (this.getCurrentUsername() || '').toLowerCase();

    return all.filter(m => {
      const mCampId = String(m.campaignId || '').toUpperCase().replace(/^#+/, '');
      const recUser = (m.recipientUser || '').toLowerCase();
      const sndUser = (m.senderUser || '').toLowerCase();

      if (recUser && currentUser && recUser === currentUser) return true;
      if (sndUser && currentUser && sndUser === currentUser) return true;
      if (m.recipientRole === 'GM') {
        return ownedIds.has(mCampId) || (currentUser && (m.gmName || '').toLowerCase() === currentUser);
      }
      if (m.recipientRole === 'USER') {
        // Direct user message (e.g. ownership transfer offer): show to target user or if in local single-browser testing
        return !recUser || !currentUser || recUser === currentUser || participatedIds.has(mCampId);
      }
      if (m.recipientRole === 'PLAYER') {
        return !recUser || !currentUser || recUser === currentUser || (participatedIds.has(mCampId) && !ownedIds.has(mCampId));
      }
      // PARTICIPANTS or ALL
      return participatedIds.has(mCampId) || ownedIds.has(mCampId);
    });
  }

  getUnreadMessageCount() {
    const readerKey = this.getTabSessionId();
    return this.getMessagesForCurrentUser().filter(m => !m.read && !(Array.isArray(m.readBy) && m.readBy.includes(readerKey))).length;
  }

  markMessageRead(msgId) {
    const readerKey = this.getTabSessionId();
    const messages = this.getAllCampaignMessages();
    const target = messages.find(m => m.id === msgId);
    if (target) {
      target.read = true;
      if (!Array.isArray(target.readBy)) target.readBy = [];
      if (!target.readBy.includes(readerKey)) target.readBy.push(readerKey);
      this.saveAllCampaignMessages(messages);
      this.updateHeaderBadge();
    }
  }

  markAllMessagesRead() {
    const readerKey = this.getTabSessionId();
    const userMsgIds = new Set(this.getMessagesForCurrentUser().map(m => m.id));
    const messages = this.getAllCampaignMessages();
    messages.forEach(m => {
      if (userMsgIds.has(m.id)) {
        m.read = true;
        if (!Array.isArray(m.readBy)) m.readBy = [];
        if (!m.readBy.includes(readerKey)) m.readBy.push(readerKey);
      }
    });
    this.saveAllCampaignMessages(messages);
    this.updateHeaderBadge();
  }

  clearReadMessages() {
    const readerKey = this.getTabSessionId();
    const userMsgIds = new Set(this.getMessagesForCurrentUser().map(m => m.id));
    const remaining = this.getAllCampaignMessages().filter(m => {
      if (!userMsgIds.has(m.id)) return true;
      const isRead = m.read || (Array.isArray(m.readBy) && m.readBy.includes(readerKey));
      return !isRead;
    });
    this.saveAllCampaignMessages(remaining);
    this.updateHeaderBadge();
  }

  // Event Notification Helpers (always noting Campaign, GM, and Player)
  notifyCharacterDetached({ campaignId, campaignName = '', gmName = '', playerName = '', characterName = 'Hero' } = {}) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const info = this.getCampaignInfo(cleanId) || {};
    const effCamp = campaignName || info.campaignName || cleanId;
    const effGM = gmName || info.creatorName || 'GM';
    const effPlayer = playerName || this.getCurrentUsername() || 'Player';
    return this.sendCampaignMessage({
      type: 'CHARACTER_DETACHED',
      recipientRole: 'ALL',
      campaignId: cleanId,
      campaignName: effCamp,
      gmName: effGM,
      playerName: effPlayer,
      characterName,
      text: `Player "${effPlayer}" detached character "${characterName}" from campaign "${effCamp}" (#${cleanId}, GM: ${effGM}).`
    });
  }

  notifyPlayerLeftCampaign({ campaignId, campaignName = '', gmName = '', playerName = '', characterNames = [] } = {}) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const info = this.getCampaignInfo(cleanId) || {};
    const effCamp = campaignName || info.campaignName || cleanId;
    const effGM = gmName || info.creatorName || 'GM';
    const effPlayer = playerName || this.getCurrentUsername() || 'Player';
    const charDesc = characterNames && characterNames.length > 0 ? ` (detached character(s): ${characterNames.join(', ')})` : '';
    return this.sendCampaignMessage({
      type: 'PLAYER_LEFT_CAMPAIGN',
      recipientRole: 'ALL',
      campaignId: cleanId,
      campaignName: effCamp,
      gmName: effGM,
      playerName: effPlayer,
      characterName: characterNames.join(', '),
      text: `Player "${effPlayer}" left campaign "${effCamp}" (#${cleanId}, GM: ${effGM})${charDesc}.`
    });
  }

  notifyCharacterRollback({ campaignId, campaignName = '', gmName = '', playerName = '', characterName = 'Hero', details = '' } = {}) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const info = this.getCampaignInfo(cleanId) || {};
    const effCamp = campaignName || info.campaignName || cleanId;
    const effGM = gmName || info.creatorName || 'GM';
    const effPlayer = playerName || this.getCurrentUsername() || 'Player';
    return this.sendCampaignMessage({
      type: 'CHARACTER_ROLLBACK',
      recipientRole: 'GM',
      campaignId: cleanId,
      campaignName: effCamp,
      gmName: effGM,
      playerName: effPlayer,
      characterName,
      text: `Player "${effPlayer}" rolled back / restored an earlier save of campaign character "${characterName}" in campaign "${effCamp}" (#${cleanId}, GM: ${effGM})${details ? ': ' + details : '.'}`
    });
  }

  notifyNewPlayerOrCharacterJoined({ campaignId, campaignName = '', gmName = '', playerName = '', characterName = 'Hero' } = {}) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const info = this.getCampaignInfo(cleanId) || {};
    const effCamp = campaignName || info.campaignName || cleanId;
    const effGM = gmName || info.creatorName || 'GM';
    const effPlayer = playerName || this.getCurrentUsername() || 'Player';
    return this.sendCampaignMessage({
      type: 'PLAYER_CHARACTER_JOINED',
      recipientRole: 'ALL',
      campaignId: cleanId,
      campaignName: effCamp,
      gmName: effGM,
      playerName: effPlayer,
      characterName,
      text: `Player "${effPlayer}" with character "${characterName}" joined campaign "${effCamp}" (#${cleanId}, GM: ${effGM}).`
    });
  }

  // =======================================================
  // USER NOTES (256 CHARS) & KNOWN USERS / DIRECT MESSAGING
  // =======================================================
  getUserNotesDirectory() {
    try {
      const raw = typeof localStorage !== 'undefined'
        ? localStorage.getItem('mm3e_user_notes_directory')
        : this._sharedFallback['mm3e_user_notes_directory'];
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  saveUserNotesDirectory(dir) {
    try {
      const serialized = JSON.stringify(dir || {});
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_user_notes_directory', serialized);
      } else {
        this._sharedFallback['mm3e_user_notes_directory'] = serialized;
      }
    } catch (e) {}
  }

  /**
   * Saves up to 256 characters of user notes in account settings.
   * Anyone the user has messaged can read these notes via the "i" button in the Known Users address book.
   */
  setUserNotes(notesText, username = '') {
    const cleanNotes = String(notesText || '').slice(0, 256);
    const effUser = String(username || this.getCurrentUsername() || 'Player').trim();
    if (effUser) {
      const dir = this.getUserNotesDirectory();
      dir[effUser.toLowerCase()] = {
        username: effUser,
        notes: cleanNotes,
        updatedAt: new Date().toISOString()
      };
      this.saveUserNotesDirectory(dir);
    }
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_my_user_notes', cleanNotes);
      } else {
        this._memoryFallback['mm3e_my_user_notes'] = cleanNotes;
      }
    } catch (e) {}

    this.broadcastMessage({
      type: 'USER_NOTES_UPDATED',
      username: effUser,
      notes: cleanNotes
    });

    return cleanNotes;
  }

  getUserNotes(username = '') {
    const targetUser = String(username || this.getCurrentUsername() || '').trim();
    if (targetUser) {
      const dir = this.getUserNotesDirectory();
      const entry = dir[targetUser.toLowerCase()];
      if (entry && entry.notes !== undefined) {
        return String(entry.notes).slice(0, 256);
      }
    }
    if (!username || targetUser.toLowerCase() === (this.getCurrentUsername() || '').toLowerCase()) {
      try {
        const own = typeof localStorage !== 'undefined'
          ? localStorage.getItem('mm3e_my_user_notes')
          : this._memoryFallback['mm3e_my_user_notes'];
        if (own) return String(own).slice(0, 256);
      } catch {}
    }
    return '';
  }

  getKnownUsersStore() {
    try {
      const raw = typeof localStorage !== 'undefined'
        ? localStorage.getItem('mm3e_known_users')
        : this._memoryFallback['mm3e_known_users'];
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  saveKnownUsersStore(store) {
    try {
      const serialized = JSON.stringify(store || {});
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_known_users', serialized);
      } else {
        this._memoryFallback['mm3e_known_users'] = serialized;
      }
    } catch (e) {}
  }

  addKnownUser(username, meta = {}) {
    const clean = String(username || '').trim();
    if (!clean || clean === 'All Campaign Players') return null;
    const myName = (this.getCurrentUsername() || '').trim().toLowerCase();
    if (myName && clean.toLowerCase() === myName) return null;

    const store = this.getKnownUsersStore();
    const key = clean.toLowerCase();
    const prev = store[key] || {};
    store[key] = {
      username: clean,
      role: meta.role || prev.role || 'User',
      campaignId: meta.campaignId || prev.campaignId || '',
      campaignName: meta.campaignName || prev.campaignName || '',
      addedAt: prev.addedAt || new Date().toISOString(),
      lastInteractionMs: Date.now()
    };
    this.saveKnownUsersStore(store);
    return store[key];
  }

  /**
   * Returns all known users for the current user:
   * - Anyone the user has ever sent a message to (added automatically)
   * - Anyone who has messaged the user
   * - GMs of campaigns the user participates in & players in campaigns the user GMs
   */
  getKnownUsers() {
    const myName = (this.getCurrentUsername() || '').trim().toLowerCase();
    const store = this.getKnownUsersStore();
    const map = new Map();

    const upsert = (uname, info = {}) => {
      const clean = String(uname || '').trim();
      if (!clean || clean === 'All Campaign Players' || clean === 'GM' || clean === 'Player') return;
      if (myName && clean.toLowerCase() === myName) return;
      const key = clean.toLowerCase();
      const existing = map.get(key) || {};
      map.set(key, {
        username: existing.username || clean,
        role: info.role || existing.role || 'Known User',
        campaignId: info.campaignId || existing.campaignId || '',
        campaignName: info.campaignName || existing.campaignName || '',
        notes: this.getUserNotes(clean)
      });
    };

    // 1. Explicitly stored known users (e.g. anyone messaged)
    Object.values(store).forEach(u => upsert(u.username, u));

    // 2. Campaign GMs and Players from participated/owned campaigns
    this.getCampaignHistory().forEach(c => {
      if (c.creatorName) {
        upsert(c.creatorName, { role: 'GM', campaignId: c.campaignId, campaignName: c.campaignName });
      }
      if (c.isCreator) {
        const reqs = this.getJoinRequestsForGM(c.campaignId);
        reqs.forEach(r => {
          if (r.username) upsert(r.username, { role: 'Player', campaignId: c.campaignId, campaignName: c.campaignName });
        });
        const savedChars = this.getCampaignSavedCharacters(c.campaignId);
        Object.values(savedChars).forEach(sc => {
          if (sc.playerName) upsert(sc.playerName, { role: 'Player', campaignId: c.campaignId, campaignName: c.campaignName });
        });
      }
    });

    // 3. Message history (anyone sent a message to or received a message from)
    this.getAllCampaignMessages().forEach(m => {
      const sender = (m.senderUser || '').trim();
      const recip = (m.recipientUser || '').trim();
      if (sender && (!myName || sender.toLowerCase() === myName) && recip) {
        upsert(recip, { role: 'Messaged', campaignId: m.campaignId, campaignName: m.campaignName });
      } else if (recip && (!myName || recip.toLowerCase() === myName) && sender) {
        upsert(sender, { role: 'Messaged You', campaignId: m.campaignId, campaignName: m.campaignName });
      }
      if (m.gmName) upsert(m.gmName, { role: 'GM', campaignId: m.campaignId, campaignName: m.campaignName });
      if (m.playerName) upsert(m.playerName, { role: 'Player', campaignId: m.campaignId, campaignName: m.campaignName });
    });

    return Array.from(map.values()).sort((a, b) => a.username.localeCompare(b.username));
  }

  /**
   * Sends a direct message between a Player and a GM or Known User without exposing email addresses.
   * Automatically adds the recipient to the sender's Known Users list and ensures the sender's User Notes are available to the recipient.
   */
  sendDirectUserMessage({ toUser, senderUser = '', campaignId = '', campaignName = '', gmName = '', text = '' } = {}) {
    const cleanTo = String(toUser || '').trim();
    const cleanText = String(text || '').trim();
    if (!cleanTo) {
      throw new Error('Please select or enter a recipient username.');
    }
    if (!cleanText) {
      throw new Error('Please enter a message to send.');
    }

    const effSender = String(senderUser || this.getCurrentUsername() || 'Player').trim();
    const cleanCampId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const info = cleanCampId ? (this.getCampaignInfo(cleanCampId) || {}) : {};
    const histMatch = cleanCampId ? (this.getCampaignHistory().find(c => c.campaignId === cleanCampId) || {}) : {};
    const effCampName = (campaignName || histMatch.campaignName || info.campaignName || (cleanCampId ? cleanCampId : 'Direct Message')).trim();
    const effGM = (gmName || histMatch.creatorName || info.creatorName || (this.ownsAnyCampaign() ? effSender : cleanTo)).trim();

    // Automatically add recipient to Known Users
    this.addKnownUser(cleanTo, {
      role: (effGM.toLowerCase() === cleanTo.toLowerCase()) ? 'GM' : 'Known User',
      campaignId: cleanCampId,
      campaignName: effCampName
    });

    // Ensure sender's current user notes are synced in the shared directory so recipient can view them via "i" button
    const myNotes = this.getUserNotes(effSender);
    if (myNotes) {
      this.setUserNotes(myNotes, effSender);
    }

    const msg = this.sendCampaignMessage({
      type: 'DIRECT_MESSAGE',
      recipientRole: 'USER',
      recipientUser: cleanTo,
      senderUser: effSender,
      campaignId: cleanCampId || 'DIRECT',
      campaignName: effCampName,
      gmName: effGM,
      playerName: effSender,
      text: `✉️ Direct Message from ${effSender} to ${cleanTo}: "${cleanText}"`
    });

    return msg;
  }

  leaveCampaign() {
    this.stopSessionHeartbeat();
    const current = this.getCampaignState();
    if (current && current.isConnected) {
      const cleanId = current.campaignId.replace(/^#+/, '');
      const localMember = this.getLocalMember();
      const localChar = this._lastLocalHero || (typeof window !== 'undefined' && window.appController ? window.appController.char : null);
      const leaveTimestamp = new Date().toISOString();

      this.broadcastMessage({
        type: 'MEMBER_LEFT',
        campaignId: cleanId,
        pin: current.pin,
        memberId: this._lastLocalHeroId || undefined,
        characterId: localChar?.id || localMember?.characterId,
        characterName: localChar?.name || localMember?.characterName,
        playerName: current.playerName || localMember?.playerName,
        timestamp: leaveTimestamp,
        characterData: localChar ? JSON.parse(JSON.stringify(localChar)) : null
      });

      if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn() && localChar) {
        supabaseService.upsertCampaignMember({
          campaignId: cleanId,
          character: localChar,
          characterData: localChar
        }).then(() => supabaseService.markMemberOffline(cleanId)).catch(() => {});
      }
      this.broadcastMessage({
        type: 'SESSION_ENDED',
        campaignId: cleanId
      });
      try {
        const sessions = this.getActiveSessions();
        delete sessions[cleanId];
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mm3e_active_sessions', JSON.stringify(sessions));
        } else {
          this._sharedFallback['mm3e_active_sessions'] = JSON.stringify(sessions);
        }
      } catch (e) {}
    }

    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(this.campaignStateKey);
      sessionStorage.removeItem(this.storageKey);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.campaignStateKey);
    }

    this.saveCampaignState({
      isConnected: false,
      campaignId: '',
      campaignName: '',
      pin: '',
      powerLevel: 10,
      dontEnforcePL: false,
      isHost: false
    });

    // Clear remote members, keep only local hero
    this.clearInactiveMembers();
  }

  // =======================================================
  // P2P NETWORK MESSAGE HANDLING & ISOLATION
  // =======================================================
  broadcastMessage(msg) {
    if (!msg) return;
    const senderId = this.getTabSessionId();

    // 1. BroadcastChannel transport
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ msg, senderId });
      } catch (e) {
        console.warn('Failed to broadcast via BroadcastChannel', e);
      }
    }

    // 2. localStorage storage-event bus transport (works across file:/// tabs and windows)
    if (typeof localStorage !== 'undefined') {
      try {
        const envelope = JSON.stringify({ msg, senderId, t: Date.now() + Math.random() });
        localStorage.setItem('mm3e_p2p_channel_bus', envelope);
      } catch (e) {
        console.warn('Failed to broadcast via localStorage bus', e);
      }
    }
  }

  handleNetworkMessage(raw) {
    if (raw && raw.senderId && raw.senderId === this.getTabSessionId()) return;
    const msg = (raw && raw.msg) ? raw.msg : raw;
    if (!msg || !msg.type) return;

    if (msg.type === 'CAMPAIGN_ANNOUNCE' || msg.type === 'CAMPAIGN_UPDATE') {
      this.registerCampaignInfo(msg);
      this.renderAllOpenViews();
    }

    if (msg.type === 'USER_NOTES_UPDATED' && msg.username) {
      const dir = this.getUserNotesDirectory();
      dir[String(msg.username).trim().toLowerCase()] = {
        username: String(msg.username).trim(),
        notes: String(msg.notes || '').slice(0, 256),
        updatedAt: new Date().toISOString()
      };
      this.saveUserNotesDirectory(dir);
      if (typeof window !== 'undefined' && window.appController?.renderCampaignMessagesModalIfOpen) {
        window.appController.renderCampaignMessagesModalIfOpen();
      }
      return;
    }

    if (msg.type === 'CAMPAIGN_MESSAGE_DISPATCH') {
      this.updateHeaderBadge();
      if (typeof window !== 'undefined' && window.appController?.renderCampaignMessagesModalIfOpen) {
        window.appController.renderCampaignMessagesModalIfOpen();
      }
      return;
    }

    if (msg.type === 'CAMPAIGN_HIATUS_CHANGED' && msg.campaignId) {
      const cleanId = String(msg.campaignId).trim().toUpperCase().replace(/^#+/, '');
      const hist = this.getCampaignHistory();
      const match = hist.find(c => c.campaignId === cleanId);
      if (match) {
        this.saveToCampaignHistory({ ...match, isOnHiatus: !!msg.isOnHiatus });
      }
      this.registerCampaignInfo({ campaignId: cleanId, campaignName: msg.campaignName, isOnHiatus: !!msg.isOnHiatus });
      this.renderAllOpenViews();
      return;
    }

    if (msg.type === 'CAMPAIGN_DELETED' && msg.campaignId) {
      const cleanId = String(msg.campaignId).trim().toUpperCase().replace(/^#+/, '');
      this.leaveCampaignPermanent(cleanId, msg.campaignName || '');
      this.renderAllOpenViews();
      return;
    }

    if (msg.type === 'CAMPAIGN_OWNERSHIP_TRANSFERRED' && msg.campaignId) {
      const cleanId = String(msg.campaignId).trim().toUpperCase().replace(/^#+/, '');
      const hist = this.getCampaignHistory();
      const match = hist.find(c => c.campaignId === cleanId);
      if (match) {
        const myName = (this.getCurrentUsername() || '').toLowerCase();
        const isNowCreator = !!(myName && msg.newGM && myName === msg.newGM.toLowerCase());
        this.saveToCampaignHistory({
          ...match,
          creatorName: msg.newGM,
          isCreator: isNowCreator,
          pendingTransfer: null
        });
      }
      this.renderAllOpenViews();
      return;
    }

    if (msg.type === 'SESSION_HEARTBEAT' && msg.campaignId) {
      try {
        const cleanId = String(msg.campaignId).trim().toUpperCase().replace(/^#+/, '');
        const sessions = this.getActiveSessions();
        sessions[cleanId] = { ...msg, campaignId: cleanId, lastHeartbeat: Date.now() };
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mm3e_active_sessions', JSON.stringify(sessions));
        } else {
          this._sharedFallback['mm3e_active_sessions'] = JSON.stringify(sessions);
        }
      } catch (e) {}
    }

    const current = this.getCampaignState();

    if (msg.type === 'SESSION_ENDED' && msg.campaignId) {
      try {
        const cleanId = String(msg.campaignId).trim().toUpperCase().replace(/^#+/, '');
        const sessions = this.getActiveSessions();
        delete sessions[cleanId];
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mm3e_active_sessions', JSON.stringify(sessions));
        } else {
          this._sharedFallback['mm3e_active_sessions'] = JSON.stringify(sessions);
        }
        if (current.isConnected && String(current.campaignId || '').trim().toUpperCase().replace(/^#+/, '') === cleanId) {
          this.saveCampaignState({ ...current, isConnected: false });
        }
        this.renderAllOpenViews();
      } catch (e) {}
    }

    if (!current.isConnected) return;

    // Isolate by Campaign ID and PIN:
    // Identically named campaigns with different PINs never mix data!
    const cleanMsgId = String(msg.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cleanCurId = String(current.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (cleanMsgId !== cleanCurId) return;
    if ((msg.pin || '').trim() !== (current.pin || '').trim()) return;

    switch (msg.type) {
      case 'CAMPAIGN_ANNOUNCE':
      case 'CAMPAIGN_UPDATE':
        if (!current.isHost) {
          if (msg.campaignName) current.campaignName = msg.campaignName;
          if (msg.powerLevel !== undefined) current.powerLevel = parseInt(msg.powerLevel, 10) || 10;
          if (msg.dontEnforcePL !== undefined) current.dontEnforcePL = !!msg.dontEnforcePL;
          this.saveCampaignState(current);
        }
        break;

      case 'REQUEST_ROSTER':
        // A new peer joined; if they sent their member data, ingest it immediately
        if (msg.member && msg.member.id) {
          this.ingestRemoteMember(msg.member);
        }
        if (current.isHost) {
          const incomingChar = msg.characterData || msg.member?.characterData;
          if (incomingChar) {
            this.handleGMIncomingCharacterCheck(cleanCurId, incomingChar, msg.playerName || msg.member?.playerName, msg.timestamp);
          }
        }
        // Send our local member data to welcome them
        this.broadcastLocalMemberData();
        break;

      case 'MEMBER_UPDATE':
        if (msg.member && msg.member.id) {
          this.ingestRemoteMember(msg.member);
        }
        if (current.isHost) {
          const incomingChar = msg.characterData || msg.member?.characterData;
          if (incomingChar) {
            this.handleGMIncomingCharacterCheck(cleanCurId, incomingChar, msg.playerName || msg.member?.playerName, msg.timestamp);
          }
        }
        break;

      case 'MEMBER_LEFT':
        if (msg.memberId) {
          this.removeMember(msg.memberId);
        }
        // Automatically save disconnected player's character in GM's campaign data
        if (current.isHost && msg.characterData) {
          this.saveCampaignSavedCharacter(cleanCurId, msg.characterData, msg.playerName, msg.timestamp || new Date().toISOString());
        }
        break;
    }
  }

  // =======================================================
  // PARTY MEMBERS ROSTER MANAGEMENT
  // =======================================================
  getPartyMembers() {
    try {
      const raw = typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem(this.storageKey)
        : (typeof localStorage !== 'undefined' ? localStorage.getItem(this.storageKey) : this._memoryFallback[this.storageKey]);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Failed to parse party members:', e);
      return [];
    }
  }

  savePartyMembers(members) {
    try {
      const serialized = JSON.stringify(members);
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(this.storageKey, serialized);
      }
      this._memoryFallback[this.storageKey] = serialized;
      this.renderAllOpenViews();
    } catch (e) {
      console.error('Failed to save party members:', e);
    }
  }

  updateCurrentPlayer(char, primaryChar = null, activeAltId = null) {
    if (!char) return;

    const baseHero = primaryChar || char;
    const tabSessionId = this.getTabSessionId();
    // Unique ID combining character ID and tab session so tabs on the same machine/profile never collide
    const heroId = (baseHero.id || 'hero') + '_' + tabSessionId;
    this._lastLocalHeroId = heroId;
    const isAltActive = !!activeAltId && char.id !== baseHero.id;

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

    const campaignState = this.getCampaignState();

    // When associated with a campaign:
    // Characters loaded into the client (including GM) do NOT automatically join the party
    // unless explicitly attached to this campaign!
    if (campaignState.campaignId) {
      const cleanCampId = (campaignState.campaignId || '').toUpperCase().replace(/^#+/, '');
      const charCampId = (baseHero.campaignId || '').toUpperCase().replace(/^#+/, '');
      const charCampName = (baseHero.campaign || '').trim().toLowerCase();
      const campName = (campaignState.campaignName || '').trim().toLowerCase();

      const isAttached = (charCampId && charCampId === cleanCampId) ||
                         (charCampName && campName && charCampName === campName);

      if (!isAttached) {
        // Character is not attached to this campaign. Remove from party roster if present.
        const members = this.getPartyMembers();
        const filtered = members.filter(m => m.id !== heroId);
        if (filtered.length !== members.length) {
          this.savePartyMembers(filtered);
          this.broadcastMessage({
            type: 'MEMBER_LEFT',
            campaignId: campaignState.campaignId,
            pin: campaignState.pin,
            memberId: heroId
          });
          this.renderAllOpenViews();
        }
        return;
      }
    }

    const isHost = campaignState.isHost;
    const charName = (baseHero.name || '').trim() || 'Hero';
    const activeDisplayName = (char.name || '').trim() || charName;
    const playerName = (baseHero.playerName || '').trim() || (isHost ? 'GM' : 'Player');

    const memberData = {
      id: heroId,
      characterName: charName,
      activeDisplayName,
      playerName,
      campaign: baseHero.campaign || campaignState.campaignName || '',
      campaignId: campaignState.campaignId || '',
      isAlt: isAltActive,
      activeAltLabel,
      activeAltType,
      bruises,
      toughnessPenalty,
      conditions,
      heroPoints: char.heroPoints ?? 1,
      powerLevel: char.powerLevel || 10,
      characterData: baseHero,
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

    // If connected to a campaign room, broadcast update to peers
    if (campaignState.isConnected) {
      this.broadcastMessage({
        type: 'MEMBER_UPDATE',
        campaignId: campaignState.campaignId,
        pin: campaignState.pin,
        member: memberData
      });
    }
  }

  broadcastLocalMemberData() {
    const members = this.getPartyMembers();
    const localMember = members.find(m => m.isLocal);
    const campaignState = this.getCampaignState();
    if (localMember && campaignState.isConnected) {
      const localChar = this._lastLocalHero || (typeof window !== 'undefined' && window.appController ? window.appController.char : null);
      this.broadcastMessage({
        type: 'MEMBER_UPDATE',
        campaignId: campaignState.campaignId,
        pin: campaignState.pin,
        member: {
          ...localMember,
          characterData: localChar ? JSON.parse(JSON.stringify(localChar)) : (localMember.characterData || null)
        },
        characterData: localChar ? JSON.parse(JSON.stringify(localChar)) : (localMember.characterData || null),
        playerName: localMember.playerName,
        timestamp: new Date().toISOString()
      });
    }
  }

  ingestRemoteMember(remoteMember) {
    if (!remoteMember || !remoteMember.id) return;
    const members = this.getPartyMembers();
    // Do not ingest our own local member as a remote member
    const localMember = members.find(m => m.isLocal);
    if (localMember && localMember.id === remoteMember.id) {
      return;
    }
    const existingIndex = members.findIndex(m => m.id === remoteMember.id);
    const remoteData = { ...remoteMember, isLocal: false };

    if (existingIndex >= 0) {
      members[existingIndex] = remoteData;
    } else {
      members.push(remoteData);
    }

    this.savePartyMembers(members);
  }

  addManualMember(data) {
    const members = this.getPartyMembers();
    const campaignState = this.getCampaignState();
    const newMember = {
      id: 'manual_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      characterName: data.characterName || 'Ally Hero',
      activeDisplayName: data.characterName || 'Ally Hero',
      playerName: data.playerName || 'NPC / Ally',
      campaign: data.campaign || campaignState.campaignName || '',
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

  updateHeaderBadge() {
    if (typeof document === 'undefined') return;
    const btn = document.getElementById('btn-open-campaigns') || document.getElementById('btn-open-party');
    const labelBtn = document.getElementById('btn-open-campaigns-label');
    const state = this.getCampaignState();
    if (state.isConnected && state.campaignId) {
      if (btn) {
        btn.innerHTML = `🛡️ Campaigns <span style="font-size: 10pt; font-weight: 900; background: #10b981; color: #fff; padding: 1px 5px; border-radius: 4px; margin-left: 2px;">#${state.campaignId}</span>`;
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';
      }
      if (labelBtn) {
        labelBtn.title = `Campaign: ${state.campaignName || ''} (#${state.campaignId}) [PL ${state.powerLevel || 10}]`;
      }
    } else {
      if (btn) {
        btn.innerHTML = `🛡️ Campaigns`;
        btn.style.borderColor = '';
        btn.style.color = '';
      }
      if (labelBtn) {
        labelBtn.title = 'Click to open Campaign Tracker & Settings';
      }
    }

    // Update new message count next to the user icon AND next to the Campaign Messages dropdown menu item (with pulsing effect when unread > 0)
    const unreadCount = this.getUnreadMessageCount();
    const totalMsgs = this.getMessagesForCurrentUser().length;
    const ownsCamp = this.ownsAnyCampaign();
    const msgBtn = document.getElementById('btn-header-messages');
    const msgCountEl = document.getElementById('header-message-count-badge');
    if (msgBtn && msgCountEl) {
      if (ownsCamp || totalMsgs > 0) {
        msgBtn.style.display = 'inline-flex';
        msgCountEl.textContent = String(unreadCount);
        msgCountEl.style.background = unreadCount > 0 ? 'var(--hero-red)' : 'rgba(148, 163, 184, 0.35)';
        msgCountEl.classList.toggle('unread-badge-pulse', unreadCount > 0);
      } else {
        msgBtn.style.display = 'none';
        msgCountEl.classList.remove('unread-badge-pulse');
      }
    }
    const dropdownMsgBadge = document.getElementById('dropdown-message-count-badge');
    if (dropdownMsgBadge) {
      dropdownMsgBadge.textContent = String(unreadCount);
      dropdownMsgBadge.style.display = 'inline-flex';
      dropdownMsgBadge.style.background = unreadCount > 0 ? 'var(--hero-red)' : 'rgba(148, 163, 184, 0.35)';
      dropdownMsgBadge.classList.toggle('unread-badge-pulse', unreadCount > 0);
    }
  }

  // =======================================================
  // DISCORD EMBED GENERATION
  // =======================================================
  buildPartyDiscordEmbed(campaignName = '') {
    const members = this.getPartyMembers();
    const state = this.getCampaignState();
    const effectiveCampaign = campaignName || state.campaignName || (state.campaignId ? `#${state.campaignId}` : '');
    const titleCampaign = effectiveCampaign ? ` - ${effectiveCampaign}` : '';

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
        ? `💥 **Toughness -${m.bruises} Penalty**` 
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

  // =======================================================
  // HTML RENDERING & VIEW SYNCHRONIZATION
  // =======================================================
  generatePartyHTML() {
    const members = this.getPartyMembers();
    const state = this.getCampaignState();
    const isLive = state.campaignId ? this.isSessionActive(state.campaignId) : false;
    const isConnectedToLiveSession = !!(state.isConnected && isLive);

    // Top Campaign & Game Session Bar:
    let connectionBar = '';
    if (isConnectedToLiveSession) {
      connectionBar = `
        <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid var(--hero-green); border-radius: 6px; padding: 0.65rem 0.85rem; margin-bottom: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981;"></span>
              <strong style="color: var(--text-bright); font-size: 1.05rem;">${state.campaignName || 'Campaign Room'}</strong>
              <span style="font-size: 10pt; background: rgba(0,0,0,0.15); padding: 2px 7px; border-radius: 4px; font-weight: 800; color: var(--hero-blue);">ID: #${state.campaignId}</span>
              <span style="font-size: 10pt; background: rgba(234, 179, 8, 0.15); border: 1px solid var(--hero-gold); padding: 2px 7px; border-radius: 4px; font-weight: 800; color: var(--hero-gold);">PL ${state.powerLevel || 10}</span>
              <span style="font-size: 10pt; color: #10b981; font-weight: 800;">🟢 Game Session Active</span>
              <span style="font-size: 10pt; color: var(--text-muted); font-weight: 600;">(${state.isHost ? 'GM / Host' : 'Connected Player'})</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <div style="display: inline-flex; align-items: center; gap: 0.3rem; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 6px;">
                <span style="font-size: 10pt; color: var(--text-muted); max-width: 190px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${this.generateCampaignLink(state)}">🔗 ${this.generateCampaignLink(state)}</span>
                <button type="button" class="btn btn-outline btn-copy-campaign-link" data-campid="${state.campaignId}" style="font-size: 10pt; font-weight: 800; padding: 1px 7px; min-height: 24px; color: var(--hero-blue); border-color: var(--hero-blue);">📋 Copy</button>
              </div>
              <button type="button" class="btn btn-outline btn-leave-campaign-room" style="font-size: 10pt; font-weight: 700; padding: 0.2rem 0.65rem; color: var(--hero-red); border-color: var(--hero-red);">🚪 Leave Session</button>
            </div>
          </div>
          ${(state.isCreator || this.getCampaignHistory().find(c => c.campaignId === state.campaignId)?.isCreator) ? `
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.45rem; padding-top: 0.45rem; border-top: 1px dashed rgba(255,255,255,0.15); font-size: 10pt; flex-wrap: wrap;">
              <span style="color: var(--hero-gold); font-weight: 800;">⚙️ GM Campaign Settings (Creator):</span>
              <button type="button" class="btn btn-outline btn-gm-toggle-session" data-action="end" data-campid="${state.campaignId}" style="font-size: 10pt; font-weight: 800; color: var(--hero-red); border-color: var(--hero-red); padding: 2px 9px; cursor: pointer;">⏹️ End Game Session</button>
              <span style="color: #10b981; font-size: 10pt; font-weight: 800;">🟢 Live Broadcasting</span>
              <label style="display: inline-flex; align-items: center; gap: 0.35rem; cursor: pointer; user-select: none; color: var(--text-bright); font-weight: 700; margin-left: 0.4rem;" title="When checked, characters of any Power Level can join without PL restrictions">
                <input type="checkbox" class="chk-campaign-dont-enforce-pl" ${state.dontEnforcePL ? 'checked' : ''} style="cursor: pointer; width: 14px; height: 14px; accent-color: var(--hero-gold);">
                <span>Don't enforce PL</span>
              </label>
              <div style="display: inline-flex; align-items: center; gap: 0.35rem; margin-left: 0.25rem;">
                <span style="color: var(--text-muted); font-size: 10pt; font-weight: 700;">PL:</span>
                <select class="sel-campaign-target-pl" style="background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 3px; padding: 1px 6px; font-size: 10pt; font-weight: 800;">
                  ${[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(pl => `<option value="${pl}" ${(state.powerLevel || 10) === pl ? 'selected' : ''}>PL ${pl}</option>`).join('')}
                </select>
              </div>
              <button type="button" class="btn btn-outline btn-open-join-requests" style="font-size: 10pt; font-weight: 700; color: var(--hero-blue); border-color: var(--hero-blue); padding: 1px 8px; margin-left: 0.35rem; cursor: pointer;">🔔 Join Requests</button>
            </div>
          ` : `
            <div style="margin-top: 0.35rem; font-size: 10pt; color: var(--text-muted);">
              ${state.dontEnforcePL ? '⚠️ PL Enforcement is disabled by GM (any character PL permitted)' : '🛡️ Strict PL Enforcement is active (characters must match campaign PL)'}
            </div>
          `}
        </div>
      `;
    } else {
      connectionBar = `
        <div style="background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 6px; padding: 0.75rem 0.85rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.65rem;">
          <div>
            <div style="font-weight: 800; color: var(--text-bright); font-size: var(--font-size-sm);">Game Session Status: Not Connected to a Live Session</div>
            <div style="font-size: 10pt; color: var(--text-muted);">Apply to join a campaign by Campaign Name or paste a GM's Campaign Link below. Connect to live rooms when a session is running.</div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
            <input type="text" class="input-join-campaign-link" placeholder="Paste campaign link or campaign name..." style="background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.28rem 0.6rem; font-size: 10pt; min-width: 240px;" />
            <button type="button" class="btn btn-outline btn-trigger-join-campaign" style="font-size: 10pt; font-weight: 700; padding: 0.25rem 0.75rem; color: var(--hero-blue); border-color: var(--hero-blue);">🔗 Join Campaign</button>
            <button type="button" class="btn btn-primary btn-trigger-create-campaign" style="font-size: 10pt; font-weight: 800; padding: 0.25rem 0.75rem;">➕ Create Campaign</button>
          </div>
        </div>
      `;
    }

    // Hero Attachment Status Bar (Allows GM or Player to manually attach or detach their loaded hero)
    let charAttachmentBar = '';
    const activeChar = (typeof window !== 'undefined' && window.appController?.char) || null;
    if ((isConnectedToLiveSession || state.campaignId) && activeChar) {
      const cleanCampId = (state.campaignId || '').toUpperCase().replace(/^#+/, '');
      const charCampId = (activeChar.campaignId || '').toUpperCase().replace(/^#+/, '');
      const charCampName = (activeChar.campaign || '').trim().toLowerCase();
      const campName = (state.campaignName || '').trim().toLowerCase();
      const isCharAttached = (charCampId && charCampId === cleanCampId) ||
                             (charCampName && campName && charCampName === campName);

      if (!isCharAttached) {
        charAttachmentBar = `
          <div style="background: rgba(59, 130, 246, 0.08); border: 1px dashed var(--hero-blue); border-radius: 6px; padding: 0.5rem 0.85rem; margin-bottom: 0.65rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-size: 10pt; color: var(--text-bright);">
              <span>🦸 Loaded Character: <strong>${activeChar.name || 'Hero'}</strong> (PL ${activeChar.powerLevel || 10}) is not in this campaign's party.</span>
            </div>
            <button type="button" class="btn btn-outline btn-attach-current-char" style="font-size: 10pt; font-weight: 700; color: var(--hero-blue); border-color: var(--hero-blue); padding: 2px 8px;">➕ Attach to Campaign Party</button>
          </div>
        `;
      } else {
        charAttachmentBar = `
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 6px; padding: 0.4rem 0.85rem; margin-bottom: 0.65rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-size: 10pt; color: var(--text-bright);">
              <span>🦸 Active Hero in Party: <strong>${activeChar.name || 'Hero'}</strong> (PL ${activeChar.powerLevel || 10})</span>
            </div>
            <button type="button" class="btn btn-outline btn-detach-current-char" style="font-size: 10pt; color: var(--text-muted); border-color: var(--border-color); padding: 1px 6px;">Detach from Party</button>
          </div>
        `;
      }
    }

    let memberCards = '';
    if (members.length === 0) {
      memberCards = `
        <div style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted); font-size: var(--font-size-sm); font-style: italic;">
          No party members recorded yet. When heroes connect or suffer conditions, they appear here live.
        </div>
      `;
    } else {
      memberCards = members.map(m => {
        const isDamaged = m.bruises > 0;
        const hasConditions = m.conditions && m.conditions.length > 0;
        
        const altBadge = m.isAlt && m.activeAltLabel ? `
          <span style="font-size: 10pt; font-weight: 800; background: rgba(139, 92, 246, 0.2); color: var(--hero-purple); padding: 2px 7px; border-radius: 4px; border: 1px solid var(--hero-purple);">
            ⚡ Active: ${m.activeAltLabel}
          </span>
        ` : `
          <span style="font-size: 10pt; font-weight: 700; color: var(--text-muted);">
            [Primary Hero]
          </span>
        `;

        const conditionPills = hasConditions 
          ? m.conditions.map(c => `
              <span style="display: inline-block; font-size: 10pt; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: rgba(239, 68, 68, 0.18); color: var(--hero-red); border: 1px solid rgba(239, 68, 68, 0.4);">
                ⚠️ ${c}
              </span>
            `).join(' ')
          : `<span style="font-size: 10pt; font-weight: 700; color: var(--hero-green);">✅ Normal / Unimpaired</span>`;

        const toughnessPill = isDamaged
          ? `<span style="font-size: 10pt; font-weight: 800; color: var(--hero-red); background: rgba(239, 68, 68, 0.15); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-red);">
               💥 Toughness: -${m.bruises} Penalty
             </span>`
          : `<span style="font-size: 10pt; font-weight: 800; color: var(--hero-green); background: rgba(16, 185, 129, 0.15); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-green);">
               🛡️ Toughness: Normal (No Penalty)
             </span>`;

        return `
          <div class="party-member-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 0.65rem; display: flex; flex-direction: column; gap: 0.45rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <strong style="font-size: 1.05rem; color: var(--text-bright);">${m.characterName}</strong>
                ${altBadge}
                <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 600;">Player: ${m.playerName}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 10pt; font-weight: 800; color: var(--hero-gold);">⚡ ${m.heroPoints} HP</span>
                <button type="button" class="btn btn-outline btn-inspect-member-sheet" data-memberid="${m.id}" title="Inspect full character sheet" style="font-size: 10pt; font-weight: 700; color: var(--hero-blue); border-color: var(--hero-blue); padding: 1px 7px; cursor: pointer;">👁️ View Sheet</button>
                ${!m.isLocal ? `<button type="button" class="btn-remove-party-member" data-id="${m.id}" title="Remove member" style="background: none; border: none; color: var(--hero-red); cursor: pointer; font-size: 10pt; font-weight: 700;">✕</button>` : ''}
              </div>
            </div>
            
            ${m.hasDiffAlert && state.isHost ? `
              <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid var(--hero-gold); border-radius: 4px; padding: 0.4rem 0.6rem; font-size: 10pt; color: var(--hero-gold); display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <div>
                  <strong>⚠️ Local Copy Differs from Last Session Snapshot</strong>
                  <div style="font-size: 10pt; color: var(--text-bright); margin-top: 2px;">
                    GM Copy: ${m.savedTimestamp || 'Last Session'} | Player: ${m.incomingTimestamp || 'Now'}
                  </div>
                </div>
                <button type="button" class="btn btn-primary btn-gm-review-diff" data-charname="${m.characterName}" style="font-size: 10pt; padding: 2px 8px; font-weight: 800;">Review Changes</button>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; padding-top: 0.2rem;">
              <div>${toughnessPill}</div>
              <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                <span style="font-size: var(--font-size-xs); color: var(--text-muted); font-weight: 700;">Conditions:</span>
                ${conditionPills}
              </div>
              <div style="font-size: 10pt; color: var(--text-muted);">
                Updated: ${m.lastUpdated}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }


    // Upgraded Campaign Browser (shows user's joined/created campaigns first with special icon + all public advertised campaigns)
    const browserCampaigns = this.getBrowsableCampaigns();
    const storedChars = (typeof window !== 'undefined' && window.appController?.storage?.getCharacters()) || [];
    const bf = this.browserFilters || { query: '', searchName: true, searchDesc: true, searchPL: false, plMin: 1, plMax: 20, sortBy: 'default', hideHiatus: false };

    const browserCards = browserCampaigns.map(c => {
      const regInfo = this.getCampaignInfo(c.campaignId) || {};
      const isOnHiatus = !!(c.isOnHiatus || regInfo.isOnHiatus);
      const isPublic = !!(c.isPublic || regInfo.isPublic);
      const notesText = String(c.notes ?? regInfo.notes ?? '');
      const pendingTransfer = c.pendingTransfer || regInfo.pendingTransfer || null;
      const isLive = !isOnHiatus && this.isSessionActive(c.campaignId);
      const isCur = state.isConnected && isLive && state.campaignId === c.campaignId;
      const isJoinedOrCreated = !!c.isJoinedOrCreated;
      const attached = storedChars.filter(ch => (ch.campaignId && ch.campaignId.toUpperCase().replace(/^#+/, '') === c.campaignId) || (ch.campaign && ch.campaign.trim().toLowerCase() === (c.campaignName || '').toLowerCase()));
      const attachedStr = attached.map(ch => ch.name || 'Hero').join(', ') || 'None';
      const pendingReqCount = c.isCreator ? this.getJoinRequestsForGM(c.campaignId).filter(r => r.status === 'pending').length : 0;
      const shareLink = this.generateCampaignLink(c);

      return `
        <div class="campaign-browser-card" data-campid="${c.campaignId}" style="background: var(--bg-card); border: 1px solid ${isOnHiatus ? 'rgba(245, 158, 11, 0.45)' : (isJoinedOrCreated ? 'rgba(59, 130, 246, 0.5)' : 'var(--border-color)')}; border-radius: 6px; padding: 0.65rem 0.85rem; margin-bottom: 0.55rem; display: flex; flex-direction: column; gap: 0.45rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.45rem;">
            <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
              ${isJoinedOrCreated ? `<span class="badge-joined-campaign" title="Campaign you have joined or created" style="font-size: 10pt; font-weight: 800; color: var(--hero-gold); background: rgba(234, 179, 8, 0.16); border: 1px solid rgba(234, 179, 8, 0.45); padding: 1px 6px; border-radius: 4px;">🌟 Joined</span>` : `<span style="font-size: 10pt; font-weight: 700; color: var(--hero-green); background: rgba(16, 185, 129, 0.14); border: 1px solid rgba(16, 185, 129, 0.4); padding: 1px 6px; border-radius: 4px;">🌐 Open to Join</span>`}
              <strong style="font-size: 10.5pt; color: var(--text-bright);">${c.campaignName}</strong>
              <span style="font-size: 10pt; background: rgba(0,0,0,0.15); padding: 1px 6px; border-radius: 4px; font-weight: 800; color: var(--hero-blue);">ID: #${c.campaignId}</span>
              <span style="font-size: 10pt; color: var(--hero-gold); font-weight: 800;">PL ${c.powerLevel || 10}</span>
              ${isPublic ? '<span style="font-size: 10pt; font-weight: 700; color: #10b981; background: rgba(16, 185, 129, 0.12); padding: 1px 5px; border-radius: 3px;">🌐 Public</span>' : '<span style="font-size: 10pt; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 1px 5px; border-radius: 3px;">🔒 Private</span>'}
              ${c.isCreator ? '<span style="font-size: 10pt; font-weight: 800; color: var(--hero-gold); background: rgba(234, 179, 8, 0.15); padding: 1px 5px; border-radius: 3px;">👑 GM (Owner)</span>' : (isJoinedOrCreated ? '<span style="font-size: 10pt; font-weight: 700; color: var(--hero-blue); background: rgba(59, 130, 246, 0.15); padding: 1px 5px; border-radius: 3px;">Player</span>' : '')}
              ${c.creatorName ? `<span style="font-size: 10pt; color: var(--text-muted);">GM: <strong>${c.creatorName}</strong></span>` : ''}
              ${isJoinedOrCreated ? `<span style="font-size: 10pt; color: var(--text-muted);">Attached: ${attachedStr}</span>` : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
              ${isOnHiatus ? '<span style="color: var(--hero-gold); font-weight: 800; font-size: 10pt;">⏸️ On Hiatus</span>' : (isLive ? '<span style="color: #10b981; font-weight: 800; font-size: 10pt;">🟢 Session Running</span>' : '<span style="color: var(--text-muted); font-size: 10pt;">⚪ No Session Running</span>')}
              ${c.isCreator && !isOnHiatus ? (isLive ? `
                <button type="button" class="btn btn-outline btn-gm-toggle-session" data-action="end" data-campid="${c.campaignId}" style="font-size: 10pt; padding: 2px 7px; color: var(--hero-red); border-color: var(--hero-red); font-weight: 700;">⏹️ End Session</button>
              ` : `
                <button type="button" class="btn btn-outline btn-gm-toggle-session" data-action="start" data-campid="${c.campaignId}" style="font-size: 10pt; padding: 2px 7px; color: var(--hero-green); border-color: var(--hero-green); font-weight: 700;">▶️ Start Session</button>
              `) : ''}
              ${isCur ? '<span style="font-size: 10pt; font-weight: 800; color: var(--hero-green);">[In Session]</span>' : (isLive && isJoinedOrCreated ? `
                <button type="button" class="btn btn-primary btn-join-game-session" data-campid="${c.campaignId}" style="font-size: 10pt; padding: 2px 8px; font-weight: 800; background: var(--hero-green); border-color: var(--hero-green);">🎮 Join Game Session</button>
              ` : '')}
              ${!isJoinedOrCreated ? `
                <button type="button" class="btn btn-primary btn-browser-apply-campaign" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; padding: 2px 9px; font-weight: 800; background: var(--hero-blue); border-color: var(--hero-blue);">📝 Apply to Join</button>
              ` : ''}
              ${!c.isCreator && c.creatorName ? `
                <button type="button" class="btn btn-outline btn-browser-message-gm" data-gm="${(c.creatorName || '').replace(/"/g, '&quot;')}" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" title="Send a message to GM ${c.creatorName}" style="font-size: 10pt; padding: 2px 7px; color: var(--hero-blue); border-color: var(--hero-blue); font-weight: 700;">✉️ Message GM</button>
              ` : ''}
              <div style="display: inline-flex; align-items: center; gap: 0.25rem; background: rgba(0,0,0,0.18); border: 1px solid var(--border-color); border-radius: 4px; padding: 1px 5px;">
                <span style="font-size: 10pt; color: var(--text-muted); max-width: 145px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${shareLink}">🔗 Link</span>
                <button type="button" class="btn btn-outline btn-copy-campaign-link" data-campid="${c.campaignId}" title="Copy shareable Campaign Link" style="font-size: 10pt; padding: 1px 6px; min-height: 22px; color: var(--hero-blue); border-color: var(--hero-blue); font-weight: 800;">📋 Copy</button>
              </div>
              ${attached.length > 0 ? `
                <button type="button" class="btn btn-outline btn-load-attached-char" data-campid="${c.campaignId}" style="font-size: 10pt; padding: 2px 8px; color: var(--hero-purple); border-color: var(--hero-purple);">🦸 Load Hero</button>
              ` : ''}
              ${c.isCreator ? `
                ${isOnHiatus ? `
                  <button type="button" class="btn btn-outline btn-gm-toggle-hiatus" data-action="resume" data-campid="${c.campaignId}" style="font-size: 10pt; padding: 2px 8px; color: var(--hero-green); border-color: var(--hero-green); font-weight: 700;">▶️ Resume Campaign</button>
                ` : `
                  <button type="button" class="btn btn-outline btn-gm-toggle-hiatus" data-action="hiatus" data-campid="${c.campaignId}" title="Put campaign on hiatus (you still own the campaign)" style="font-size: 10pt; padding: 2px 8px; color: var(--hero-gold); border-color: var(--hero-gold); font-weight: 700;">⏸️ Put on Hiatus</button>
                `}
              ` : (isJoinedOrCreated ? `
                <button type="button" class="btn btn-outline btn-leave-campaign-membership" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" title="Leave this campaign and detach characters" style="font-size: 10pt; padding: 2px 8px; color: var(--hero-red); border-color: rgba(239, 68, 68, 0.5); font-weight: 700;">🚪 Leave Campaign</button>
              ` : '')}
            </div>
          </div>

          ${c.isCreator ? `
            <div style="display: flex; align-items: center; gap: 0.5rem; width: 100%; margin-top: 0.15rem;">
              <label style="font-size: 10pt; font-weight: 700; color: var(--hero-gold); white-space: nowrap;">📝 Campaign Notes:</label>
              <textarea class="textarea-campaign-notes" rows="1" data-campid="${c.campaignId}" placeholder="Add campaign notes or description (expands up to 3 rows)...">${notesText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255,255,255,0.1); font-size: 10pt; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                <span style="color: var(--hero-gold); font-weight: 800;">⚙️ GM Settings:</span>
                <button type="button" class="btn btn-outline btn-gm-toggle-public" data-campid="${c.campaignId}" data-public="${isPublic ? '1' : '0'}" title="Advertise this campaign in the Campaign Browser so any app user can see it and apply to join" style="font-size: 10pt; padding: 1px 8px; font-weight: 800; color: ${isPublic ? '#10b981' : 'var(--hero-blue)'}; border-color: ${isPublic ? '#10b981' : 'var(--hero-blue)'}; cursor: pointer;">
                  ${isPublic ? '🌐 Public (Click to Unlist)' : '📢 Make Public'}
                </button>
                <label style="display: inline-flex; align-items: center; gap: 0.35rem; cursor: pointer; user-select: none; color: var(--text-bright); font-weight: 700;" title="When checked, characters of any Power Level can join without PL restrictions">
                  <input type="checkbox" class="chk-campaign-dont-enforce-pl" data-campid="${c.campaignId}" ${c.dontEnforcePL ? 'checked' : ''} style="cursor: pointer; width: 14px; height: 14px; accent-color: var(--hero-gold);">
                  <span>Don't enforce PL</span>
                </label>
                <div style="display: inline-flex; align-items: center; gap: 0.35rem;">
                  <span style="color: var(--text-muted); font-size: 10pt; font-weight: 700;">PL:</span>
                  <select class="sel-campaign-target-pl" data-campid="${c.campaignId}" style="background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 3px; padding: 1px 6px; font-size: 10pt; font-weight: 800;">
                    ${[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(pl => `<option value="${pl}" ${(c.powerLevel || 10) === pl ? 'selected' : ''}>PL ${pl}</option>`).join('')}
                  </select>
                </div>
                <button type="button" class="btn btn-outline btn-open-join-requests" data-campid="${c.campaignId}" style="font-size: 10pt; font-weight: 700; color: var(--hero-blue); border-color: var(--hero-blue); padding: 1px 8px; cursor: pointer;">🔔 Join Requests${pendingReqCount > 0 ? ` (${pendingReqCount})` : ''}</button>
              </div>
              <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                ${pendingTransfer && pendingTransfer.status === 'pending' ? `
                  <span style="font-size: 10pt; color: var(--hero-gold); font-weight: 700;">⏳ Transfer Offered to ${pendingTransfer.targetUser}</span>
                  <button type="button" class="btn btn-outline btn-gm-withdraw-transfer" data-campid="${c.campaignId}" style="font-size: 10pt; padding: 1px 8px; color: var(--hero-gold); border-color: var(--hero-gold); font-weight: 700; cursor: pointer;">↩️ Withdraw Offer</button>
                ` : `
                  <button type="button" class="btn btn-outline btn-gm-transfer-ownership" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; padding: 1px 8px; color: var(--hero-gold); border-color: var(--hero-gold); font-weight: 700; cursor: pointer;">👑 Transfer Ownership</button>
                `}
                <button type="button" class="btn btn-outline btn-gm-delete-campaign" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; padding: 1px 8px; color: var(--hero-red); border-color: rgba(239, 68, 68, 0.5); font-weight: 700; cursor: pointer;">🗑️ Delete Campaign</button>
              </div>
            </div>
          ` : (notesText ? `
            <div style="font-size: 10pt; color: var(--text-muted); background: rgba(0,0,0,0.15); border-left: 3px solid var(--hero-blue); padding: 0.3rem 0.6rem; border-radius: 3px; max-height: 75px; overflow-y: auto; white-space: pre-wrap;">${notesText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          ` : '')}
        </div>
      `;
    }).join('');

    const browserSection = `
      <div style="margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
        <div style="font-weight: 800; font-size: var(--font-size-sm); color: var(--text-bright); margin-bottom: 0.55rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
          <span>🌐 Campaign Browser (${browserCampaigns.length})</span>
          <span style="font-size: 10pt; color: var(--text-muted);">🌟 Joined &amp; created campaigns are shown first by default • Browse &amp; apply to public campaigns</span>
        </div>

        <!-- Campaign Browser Search, Checked Filters, Legal # to # PL Stepper, Sort & On Hiatus Filter Bar -->
        <div class="campaign-browser-toolbar" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.6rem 0.75rem; margin-bottom: 0.7rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <input type="text" class="input-browser-search" value="${(bf.query || '').replace(/"/g, '&quot;')}" placeholder="🔍 Search campaigns..." style="flex: 1; min-width: 190px; background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.28rem 0.6rem; font-size: 10pt;" />
            <div style="display: inline-flex; align-items: center; gap: 0.55rem; font-size: 10pt; flex-wrap: wrap;">
              <span style="color: var(--text-muted); font-weight: 700;">Search in:</span>
              <label style="display: inline-flex; align-items: center; gap: 0.25rem; cursor: pointer; font-weight: 700; color: var(--text-bright);">
                <input type="checkbox" class="chk-search-camp-name" ${bf.searchName ? 'checked' : ''} style="cursor: pointer; accent-color: var(--hero-blue);" />
                <span>Campaign Name</span>
              </label>
              <label style="display: inline-flex; align-items: center; gap: 0.25rem; cursor: pointer; font-weight: 700; color: var(--text-bright);">
                <input type="checkbox" class="chk-search-camp-desc" ${bf.searchDesc ? 'checked' : ''} style="cursor: pointer; accent-color: var(--hero-blue);" />
                <span>Description / Notes</span>
              </label>
              <label style="display: inline-flex; align-items: center; gap: 0.25rem; cursor: pointer; font-weight: 700; color: var(--text-bright);">
                <input type="checkbox" class="chk-search-camp-pl" ${bf.searchPL ? 'checked' : ''} style="cursor: pointer; accent-color: var(--hero-gold);" />
                <span>PL Range:</span>
              </label>
              <div class="pl-range-stepper-group" style="display: inline-flex; align-items: center; gap: 0.25rem; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 4px; padding: 1px 5px; opacity: ${bf.searchPL ? '1' : '0.65'};">
                <button type="button" class="btn btn-outline btn-pl-min-minus" title="Decrease minimum PL" style="min-height: 22px; padding: 0 5px; font-size: 10pt; font-weight: 800;">-</button>
                <input type="number" class="input-pl-range-min" min="1" max="20" value="${bf.plMin}" style="width: 42px; text-align: center; background: transparent; color: var(--hero-gold); border: none; font-size: 10pt; font-weight: 800;" />
                <button type="button" class="btn btn-outline btn-pl-min-plus" title="Increase minimum PL" style="min-height: 22px; padding: 0 5px; font-size: 10pt; font-weight: 800;">+</button>
                <span style="font-size: 10pt; color: var(--text-muted); font-weight: 700; padding: 0 2px;">to</span>
                <button type="button" class="btn btn-outline btn-pl-max-minus" title="Decrease maximum PL" style="min-height: 22px; padding: 0 5px; font-size: 10pt; font-weight: 800;">-</button>
                <input type="number" class="input-pl-range-max" min="1" max="20" value="${bf.plMax}" style="width: 42px; text-align: center; background: transparent; color: var(--hero-gold); border: none; font-size: 10pt; font-weight: 800;" />
                <button type="button" class="btn btn-outline btn-pl-max-plus" title="Increase maximum PL" style="min-height: 22px; padding: 0 5px; font-size: 10pt; font-weight: 800;">+</button>
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.6rem; flex-wrap: wrap; border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 0.4rem; font-size: 10pt;">
            <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
              <span style="color: var(--text-muted); font-weight: 700;">Sort by:</span>
              <select class="sel-browser-sort" style="background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 8px; font-size: 10pt; font-weight: 700;">
                <option value="default" ${bf.sortBy === 'default' ? 'selected' : ''}>🌟 Default (Joined / Created First)</option>
                <option value="name_asc" ${bf.sortBy === 'name_asc' ? 'selected' : ''}>🔤 Campaign Name (A–Z)</option>
                <option value="gm_asc" ${bf.sortBy === 'gm_asc' ? 'selected' : ''}>👑 GM Name (A–Z)</option>
                <option value="age_desc" ${bf.sortBy === 'age_desc' ? 'selected' : ''}>🕒 Campaign Age (Newest First)</option>
                <option value="age_asc" ${bf.sortBy === 'age_asc' ? 'selected' : ''}>🕰️ Campaign Age (Oldest First)</option>
                <option value="pl_asc" ${bf.sortBy === 'pl_asc' ? 'selected' : ''}>⚡ Power Level (Low to High)</option>
                <option value="pl_desc" ${bf.sortBy === 'pl_desc' ? 'selected' : ''}>⚡ Power Level (High to Low)</option>
              </select>
            </div>
            <label style="display: inline-flex; align-items: center; gap: 0.35rem; cursor: pointer; font-weight: 700; color: var(--text-bright);" title="When checked, filters out inactive campaigns that are currently on hiatus">
              <input type="checkbox" class="chk-filter-hide-hiatus" ${bf.hideHiatus ? 'checked' : ''} style="cursor: pointer; accent-color: var(--hero-gold);" />
              <span>⏸️ Hide "On Hiatus" (Inactive Campaigns)</span>
            </label>
          </div>
        </div>

        <div class="campaign-browser-list-container">
          ${browserCampaigns.length === 0 ? `
            <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 10pt; font-style: italic;">
              No campaigns match your current browser filters. Create a campaign, join by name/link, or adjust your search filters above.
            </div>
          ` : browserCards}
        </div>
      </div>
    `;

    return connectionBar + charAttachmentBar + memberCards + browserSection;
  }

  renderAllOpenViews() {
    this.updateHeaderBadge();
    if (this.isPopoutOpen()) {
      // Ensure in-app campaign modal is closed when popped out so both are never open simultaneously
      if (typeof document !== 'undefined') {
        document.getElementById('modal-campaign-tracker')?.classList.remove('active');
        document.getElementById('modal-party')?.classList.remove('active');
        if (typeof window !== 'undefined' && window.appController?.syncBodyScrollLock) {
          window.appController.syncBodyScrollLock();
        }
      }
      try {
        const popContainer = this.popoutWindow.document.getElementById('party-tracker-popout-content');
        if (popContainer) {
          popContainer.innerHTML = this.generatePartyHTML();
          this.wireCardButtons(popContainer);
        }
      } catch (e) {
        console.warn('Could not update party popout window view:', e);
      }
      return;
    }

    const container = typeof document !== 'undefined' ? (document.getElementById('campaign-tracker-content') || document.getElementById('party-tracker-content')) : null;
    if (container) {
      container.innerHTML = this.generatePartyHTML();
      this.wireCardButtons(container);
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

    parentEl.querySelectorAll('.btn-leave-campaign-room').forEach(btn => {
      btn.addEventListener('click', () => {
        this.leaveCampaign();
        this.renderAllOpenViews();
      });
    });

    parentEl.querySelectorAll('.btn-join-game-session, .btn-reconnect-campaign').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.campid;
        if (id && typeof window !== 'undefined' && window.appController) {
          window.appController.joinGameSession(id);
        }
      });
    });

    parentEl.querySelectorAll('.btn-copy-campaign-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.campid;
        if (id && typeof window !== 'undefined' && window.appController) {
          window.appController.copyCampaignLink(id);
        }
      });
    });

    parentEl.querySelectorAll('.btn-leave-campaign-membership, .btn-remove-campaign-history').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.campid;
        const name = e.currentTarget.dataset.campname || '';
        if (id && typeof window !== 'undefined' && window.appController) {
          window.appController.confirmAndLeaveCampaign(id, name);
        } else if (id) {
          this.leaveCampaignPermanent(id, name);
        }
      });
    });

    parentEl.querySelectorAll('.btn-load-attached-char').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.campid;
        if (id && typeof window !== 'undefined' && window.appController) {
          window.appController.checkOfferLoadAttachedCharacter(id, '');
        }
      });
    });

    parentEl.querySelectorAll('.btn-gm-toggle-session').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        const campId = e.currentTarget.dataset.campid;
        if (action === 'start') {
          this.startSession(campId);
        } else {
          this.endSession(campId);
        }
      });
    });

    parentEl.querySelectorAll('.btn-attach-current-char').forEach(btn => {
      btn.addEventListener('click', () => {
        const state = this.getCampaignState();
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.attachCurrentCharacterToCampaign(state.campaignId);
        }
      });
    });

    parentEl.querySelectorAll('.btn-open-join-requests').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid || '';
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openJoinRequestsModal(campId);
        }
      });
    });

    parentEl.querySelectorAll('.btn-gm-toggle-hiatus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        const action = e.currentTarget.dataset.action;
        if (campId && typeof window !== 'undefined' && window.appController) {
          window.appController.toggleCampaignHiatus(campId, action === 'hiatus');
        } else if (campId) {
          this.setCampaignHiatus(campId, action === 'hiatus');
        }
      });
    });

    parentEl.querySelectorAll('.btn-gm-transfer-ownership').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        const campName = e.currentTarget.dataset.campname || '';
        if (campId && typeof window !== 'undefined' && window.appController) {
          window.appController.openTransferOwnershipDialog(campId, campName);
        }
      });
    });

    parentEl.querySelectorAll('.btn-gm-withdraw-transfer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        if (campId && typeof window !== 'undefined' && window.appController) {
          window.appController.withdrawCampaignTransferOffer(campId);
        } else if (campId) {
          this.withdrawOwnershipTransfer(campId);
        }
      });
    });

    parentEl.querySelectorAll('.btn-gm-delete-campaign').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        const campName = e.currentTarget.dataset.campname || '';
        if (campId && typeof window !== 'undefined' && window.appController) {
          window.appController.confirmAndDeleteCampaignByGM(campId, campName);
        } else if (campId) {
          this.deleteCampaignByGM(campId);
        }
      });
    });

    parentEl.querySelectorAll('.btn-gm-review-diff').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charName = e.currentTarget.dataset.charname;
        const member = this.getPartyMembers().find(m => (m.characterName || '').toLowerCase() === (charName || '').toLowerCase());
        const state = this.getCampaignState();
        if (member && member.characterData) {
          delete this._lastAlertedDiffKey;
          this.handleGMIncomingCharacterCheck(state.campaignId, member.characterData, member.playerName, new Date().toISOString());
        }
      });
    });

    parentEl.querySelectorAll('.btn-inspect-member-sheet').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.memberid;
        const member = this.getPartyMembers().find(m => m.id === id);
        if (member && typeof window !== 'undefined' && window.appController) {
          window.appController.openCharacterInspectorModal(member.characterData || member);
        }
      });
    });

    parentEl.querySelectorAll('.btn-detach-current-char').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.detachCurrentCharacterFromCampaign();
        }
      });
    });

    parentEl.querySelectorAll('.chk-campaign-dont-enforce-pl').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const campId = e.currentTarget.dataset.campid;
        this.updateCampaignSettings({ campaignId: campId, dontEnforcePL: e.target.checked });
      });
    });

    parentEl.querySelectorAll('.sel-campaign-target-pl').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const campId = e.currentTarget.dataset.campid;
        this.updateCampaignSettings({ campaignId: campId, powerLevel: parseInt(e.target.value, 10) });
      });
    });

    parentEl.querySelectorAll('.btn-trigger-create-campaign').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openCreateCampaignDialog();
        }
      });
    });

    const linkInput = parentEl.querySelector('.input-join-campaign-link');
    if (linkInput) {
      linkInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const val = (linkInput.value || '').trim();
          if (typeof window !== 'undefined' && window.appController) {
            window.appController.openJoinCampaignDialog(val);
          }
        }
      });
    }

    parentEl.querySelectorAll('.btn-trigger-join-campaign').forEach(btn => {
      btn.addEventListener('click', () => {
        const inputEl = parentEl.querySelector('.input-join-campaign-link');
        const val = inputEl ? (inputEl.value || '').trim() : '';
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openJoinCampaignDialog(val);
        }
      });
    });

    // Make Public / Unlist toggle button for GMs
    parentEl.querySelectorAll('.btn-gm-toggle-public').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        const curPublic = e.currentTarget.dataset.public === '1';
        if (campId) {
          this.setCampaignPublic(campId, !curPublic);
          if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
            supabaseService.getCampaignByNameOrCode(campId).then(cloudCamp => {
              if (cloudCamp?.id) {
                supabaseService.updateCampaignSettings(cloudCamp.id, { isPublic: !curPublic }).catch(() => {});
              }
            }).catch(() => {});
          }
        }
      });
    });

    // Apply to Join Campaign button in Campaign Browser
    parentEl.querySelectorAll('.btn-browser-apply-campaign').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        const campName = e.currentTarget.dataset.campname || campId;
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openJoinCampaignDialog(campName || campId);
        } else if (campId) {
          this.joinCampaign({ campaignId: campId, campaignName: campName });
        }
      });
    });

    // Direct Message GM button in Campaign Browser
    parentEl.querySelectorAll('.btn-browser-message-gm').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const gm = e.currentTarget.dataset.gm || '';
        const campId = e.currentTarget.dataset.campid || '';
        if (gm) {
          this.addKnownUser(gm, { role: 'GM', campaignId: campId });
        }
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openCampaignMessagesModal(gm, campId);
        }
      });
    });

    // GM Campaign Notes (1 row default, expands up to 3 viewable rows before scrolling)
    parentEl.querySelectorAll('.textarea-campaign-notes').forEach(textarea => {
      const autoResizeNotes = () => {
        textarea.style.height = 'auto';
        const nextH = Math.min(Math.max(textarea.scrollHeight || 28, 28), 75);
        textarea.style.height = `${nextH}px`;
      };
      autoResizeNotes();
      textarea.addEventListener('input', (e) => {
        autoResizeNotes();
        const campId = e.currentTarget.dataset.campid;
        const val = e.currentTarget.value;
        if (campId) {
          const histMatch = this.getCampaignHistory().find(c => c.campaignId === campId);
          const regInfo = this.getCampaignInfo(campId) || {};
          this.registerCampaignInfo({ ...regInfo, ...(histMatch || {}), campaignId: campId, notes: val });
          if (histMatch) {
            this.saveToCampaignHistory({ ...histMatch, notes: val });
          }
        }
      });
      textarea.addEventListener('change', (e) => {
        const campId = e.currentTarget.dataset.campid;
        const val = e.currentTarget.value;
        if (campId) {
          this.setCampaignNotes(campId, val);
          if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
            supabaseService.getCampaignByNameOrCode(campId).then(cloudCamp => {
              if (cloudCamp?.id) {
                supabaseService.updateCampaignSettings(cloudCamp.id, { notes: val }).catch(() => {});
              }
            }).catch(() => {});
          }
        }
      });
    });

    // Campaign Browser Search, Checked Fields, Legal PL Stepper, Sort & On Hiatus Filter
    const searchInput = parentEl.querySelector('.input-browser-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const cursorPos = e.target.selectionStart;
        this.setBrowserFilter({ query: e.target.value });
        this.renderAllOpenViews();
        const newSearchInput = parentEl.querySelector('.input-browser-search');
        if (newSearchInput) {
          newSearchInput.focus();
          try { newSearchInput.setSelectionRange(cursorPos, cursorPos); } catch {}
        }
      });
    }

    parentEl.querySelector('.chk-search-camp-name')?.addEventListener('change', (e) => {
      this.setBrowserFilter({ searchName: e.target.checked });
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.chk-search-camp-desc')?.addEventListener('change', (e) => {
      this.setBrowserFilter({ searchDesc: e.target.checked });
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.chk-search-camp-pl')?.addEventListener('change', (e) => {
      this.setBrowserFilter({ searchPL: e.target.checked });
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.btn-pl-min-minus')?.addEventListener('click', () => {
      this.setBrowserPLRange((this.browserFilters?.plMin || 1) - 1, this.browserFilters?.plMax || 20, 'min');
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.btn-pl-min-plus')?.addEventListener('click', () => {
      this.setBrowserPLRange((this.browserFilters?.plMin || 1) + 1, this.browserFilters?.plMax || 20, 'min');
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.btn-pl-max-minus')?.addEventListener('click', () => {
      this.setBrowserPLRange(this.browserFilters?.plMin || 1, (this.browserFilters?.plMax || 20) - 1, 'max');
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.btn-pl-max-plus')?.addEventListener('click', () => {
      this.setBrowserPLRange(this.browserFilters?.plMin || 1, (this.browserFilters?.plMax || 20) + 1, 'max');
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.input-pl-range-min')?.addEventListener('change', (e) => {
      this.setBrowserPLRange(parseInt(e.target.value, 10) || 1, this.browserFilters?.plMax || 20, 'min');
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.input-pl-range-max')?.addEventListener('change', (e) => {
      this.setBrowserPLRange(this.browserFilters?.plMin || 1, parseInt(e.target.value, 10) || 20, 'max');
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.sel-browser-sort')?.addEventListener('change', (e) => {
      this.setBrowserFilter({ sortBy: e.target.value });
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.chk-filter-hide-hiatus')?.addEventListener('change', (e) => {
      this.setBrowserFilter({ hideHiatus: e.target.checked });
      this.renderAllOpenViews();
    });
  }

  openPopout() {
    if (typeof document !== 'undefined') {
      document.getElementById('modal-campaign-tracker')?.classList.remove('active');
      document.getElementById('modal-party')?.classList.remove('active');
      if (typeof window !== 'undefined' && window.appController?.syncBodyScrollLock) {
        window.appController.syncBodyScrollLock();
      }
    }
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
  <link rel="stylesheet" href="css/styles.css?v=3.73">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg-app, #0f172a);
      color: var(--text-main, #f8fafc);
      margin: 0;
      padding: 1rem;
      font-size: 10pt;
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
      <button id="btn-popout-sync-discord" class="btn btn-outline" style="min-height: 28px; padding: 0.15rem 0.6rem; font-size: 10pt; font-weight: 700;">📢 Broadcast to Discord</button>
      <button id="btn-popout-close" class="btn" style="background: #dc2626; color: #fff; border: none; padding: 5px 12px; border-radius: 4px; font-weight: 700; cursor: pointer;">✕ Close</button>
    </div>
  </div>
  <div class="popout-scroll-body" id="party-tracker-popout-content">
    ${this.generatePartyHTML()}
  </div>
  <div class="popout-footer-bar">
    <span style="font-size: 10pt; color: var(--text-muted);">Real-time P2P campaign sync & collision protection</span>
    <div style="display: flex; gap: 0.45rem;">
      <button class="btn btn-outline" id="btn-popout-clear-inactive" style="font-size: 10pt; padding: 0.2rem 0.6rem;">Clear Inactive</button>
    </div>
  </div>
  <script>
    // Theme sync listener
    window.addEventListener('storage', (e) => {
      if (e.key === 'mm3e_theme' && e.newValue) {
        document.documentElement.setAttribute('data-theme', e.newValue);
      }
      if (e.key === 'mm3e_party_members' || e.key === 'mm3e_party_campaign_state') {
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

    // Wire up dynamic campaign buttons in popout
    if (window.opener && window.opener.partyManager) {
      window.opener.partyManager.wireCardButtons(document.getElementById('party-tracker-popout-content'));
    }

    window.addEventListener('beforeunload', () => {
      if (window.opener && window.opener.partyManager) {
        window.opener.partyManager.saveCoords({
          left: window.screenX,
          top: window.screenY,
          width: window.outerWidth,
          height: window.outerHeight
        });
        window.opener.partyManager.popoutWindow = null;
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

export const campaignManager = new CampaignTrackerManager();
export const partyManager = campaignManager;
export const PartyManager = CampaignTrackerManager;
