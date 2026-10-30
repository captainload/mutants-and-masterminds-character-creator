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
    <div class="sheet-inspector-body" style="font-size: 13px; color: var(--text-main); display: flex; flex-direction: column; gap: 1rem;">
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-bright);">${char.name || 'Unnamed Hero'}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${char.concept || 'Custom Superhero'} • Player: <strong>${char.playerName || char.player || 'Player'}</strong></div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span style="font-size: 12px; font-weight: 800; background: rgba(59, 130, 246, 0.15); color: var(--hero-blue); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-blue);">PL ${char.powerLevel || 10}</span>
          <span style="font-size: 12px; font-weight: 800; background: rgba(234, 179, 8, 0.15); color: var(--hero-gold); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-gold);">${char.totalSpentPP || char.powerPointsBudget || 150} PP</span>
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
        <div style="font-weight: 800; color: var(--hero-gold); font-size: 12px; text-transform: uppercase; margin-bottom: 0.5rem;">Abilities</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 0.5rem; text-align: center;">
          ${abilityKeys.map(k => `
            <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.35rem;">
              <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${k}</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-bright);">${abilities[k] ?? 0}</div>
              <div style="font-size: 9px; color: var(--text-muted);">${abilityNames[k]}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
        <div style="font-weight: 800; color: var(--hero-blue); font-size: 12px; text-transform: uppercase; margin-bottom: 0.5rem;">Defenses</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.5rem; text-align: center;">
          ${Object.entries({ Dodge: defenses.dodge ?? 0, Parry: defenses.parry ?? 0, Fortitude: defenses.fortitude ?? 0, Toughness: defenses.toughness ?? 0, Will: defenses.will ?? 0 }).map(([name, val]) => `
            <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.35rem;">
              <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${name}</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-bright);">${val}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
        <div style="font-weight: 800; color: var(--hero-purple); font-size: 12px; text-transform: uppercase; margin-bottom: 0.5rem;">Powers (${powers.length})</div>
        ${powers.length === 0 ? '<div style="color:var(--text-muted);font-style:italic;font-size:11px;">No powers recorded.</div>' : powers.map(p => `
          <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.45rem 0.65rem; margin-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
            <div>
              <strong style="color: var(--text-bright); font-size: 12px;">${p.name || 'Power'}</strong>
              <span style="font-size: 11px; color: var(--hero-gold); font-weight: 700;">Rank ${p.rank ?? 0}</span>
              ${p.descriptors ? `<span style="font-size: 10px; color: var(--text-muted);">[${p.descriptors}]</span>` : ''}
              ${p.cost ? `<span style="font-size: 10px; color: var(--hero-green); font-weight: 700;">(${p.cost} PP)</span>` : ''}
            </div>
            ${p.summary ? `<div style="font-size: 11px; color: var(--text-muted); width: 100%;">${p.summary}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
          <div style="font-weight: 800; color: var(--hero-green); font-size: 12px; text-transform: uppercase; margin-bottom: 0.5rem;">Skills (${skills.length})</div>
          ${skills.length === 0 ? '<div style="color:var(--text-muted);font-style:italic;font-size:11px;">No skills recorded.</div>' : skills.map(s => `
            <div style="display: flex; justify-content: space-between; font-size: 11px; padding: 2px 0; border-bottom: 1px dashed rgba(255,255,255,0.08);">
              <span>${s.name || s.id} ${s.specialization ? `(${s.specialization})` : ''}</span>
              <strong style="color: var(--text-bright);">+${s.totalBonus ?? (s.ranks ?? 0)}</strong>
            </div>
          `).join('')}
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
          <div style="font-weight: 800; color: var(--hero-blue); font-size: 12px; text-transform: uppercase; margin-bottom: 0.5rem;">Advantages (${advantages.length})</div>
          ${advantages.length === 0 ? '<div style="color:var(--text-muted);font-style:italic;font-size:11px;">No advantages recorded.</div>' : `
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
              ${advantages.map(a => `
                <span style="font-size: 11px; background: var(--bg-input); border: 1px solid var(--border-color); padding: 2px 6px; border-radius: 4px; color: var(--text-bright);">
                  ${typeof a === 'string' ? a : (a.name + (a.rank > 1 ? ` ${a.rank}` : ''))}
                </span>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      ${gear.length > 0 ? `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem;">
          <div style="font-weight: 800; color: var(--hero-gold); font-size: 12px; text-transform: uppercase; margin-bottom: 0.5rem;">Equipment & Gear (${gear.length})</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            ${gear.map(g => `<span style="font-size: 11px; background: var(--bg-input); border: 1px solid var(--border-color); padding: 2px 6px; border-radius: 4px;">${typeof g === 'string' ? g : g.name}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export class CampaignTrackerManager {
  constructor() {
    this.storageKey = 'mm3e_party_members';
    this.coordsKey = 'mm3e_party_window_coords';
    this.campaignStateKey = 'mm3e_party_campaign_state';
    this.popoutWindow = null;
    this.isEmbeddedOpen = false;
    this.broadcastChannel = null;
    this._memoryFallback = {};
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
      const entry = {
        campaignId: cleanId,
        campaignName: (campaignData.campaignName || existing.campaignName || cleanId).trim(),
        pin: campaignData.pin !== undefined ? String(campaignData.pin).trim() : (existing.pin || ''),
        powerLevel: parseInt(campaignData.powerLevel, 10) || existing.powerLevel || 10,
        dontEnforcePL: campaignData.dontEnforcePL !== undefined ? !!campaignData.dontEnforcePL : !!existing.dontEnforcePL,
        creatorName: campaignData.creatorName || existing.creatorName || '',
        isCreator,
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
            this._memoryFallback['mm3e_active_sessions'] = JSON.stringify(sessions);
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
  }

  stopSessionHeartbeat() {
    if (this._heartbeatInterval) {
      clearInterval(this._heartbeatInterval);
      this._heartbeatInterval = null;
    }
  }

  getActiveSessions() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('mm3e_active_sessions') : this._memoryFallback['mm3e_active_sessions'];
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
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('mm3e_campaign_registry') : this._memoryFallback['mm3e_campaign_registry'];
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
      reg[id] = {
        campaignId: id,
        campaignName: (info.campaignName || id).trim(),
        pin: (info.pin || '').trim(),
        powerLevel: parseInt(info.powerLevel, 10) || 10,
        dontEnforcePL: !!info.dontEnforcePL,
        isHost: !!info.isHost,
        lastUpdated: Date.now()
      };
      const serialized = JSON.stringify(reg);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaign_registry', serialized);
      } else {
        this._memoryFallback['mm3e_campaign_registry'] = serialized;
      }
    } catch (e) {
      console.warn('Failed to register campaign info', e);
    }
  }

  startSession(campaignId) {
    const current = this.getCampaignState();
    const cleanId = String(campaignId || current.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return;
    this.startSessionHeartbeat();
    this.broadcastMessage({
      type: 'SESSION_STARTED',
      campaignId: cleanId,
      campaignName: current.campaignName,
      powerLevel: current.powerLevel
    });
    this.renderAllOpenViews();
  }

  endSession(campaignId) {
    const current = this.getCampaignState();
    const cleanId = String(campaignId || current.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return;
    this.stopSessionHeartbeat();
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
        this._memoryFallback['mm3e_active_sessions'] = JSON.stringify(sessions);
      }
    } catch (e) {}
    this.renderAllOpenViews();
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

  isUserConnected() {
    const state = this.getCampaignState();
    return !!(state && state.isConnected && state.campaignId);
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
   * Creates a new campaign room.
   * Strictly enforces that a connected user cannot create other campaigns.
   */
  createCampaign({ name, campaignId, pin, creatorName = 'GM', powerLevel = 10, dontEnforcePL = false }) {
    if (this.isUserConnected()) {
      const current = this.getCampaignState();
      throw new Error(`You are currently connected to campaign "${current.campaignName || current.campaignId}" (ID: #${current.campaignId}). You must disconnect from your current campaign before creating a new one.`);
    }

    const assignedId = (campaignId || this.generateUniqueCampaignId(name)).trim().toUpperCase().replace(/^#+/, '');
    const cleanPin = (pin || '').trim();
    const pl = parseInt(powerLevel, 10) || 10;
    const noEnforce = !!dontEnforcePL;

    const newState = {
      isConnected: true,
      campaignId: assignedId,
      campaignName: (name || 'New Campaign').trim(),
      pin: cleanPin,
      powerLevel: pl,
      dontEnforcePL: noEnforce,
      isHost: true,
      isCreator: true,
      creatorName,
      connectedAt: new Date().toLocaleTimeString()
    };

    this.saveCampaignState(newState);
    this.registerCampaignInfo(newState);
    this.saveToCampaignHistory(newState);
    this.startSession(assignedId);

    // Announce creation to network
    this.broadcastMessage({
      type: 'CAMPAIGN_ANNOUNCE',
      campaignId: assignedId,
      campaignName: newState.campaignName,
      pin: cleanPin,
      powerLevel: pl,
      dontEnforcePL: noEnforce,
      creatorName
    });

    return newState;
  }

  updateCampaignSettings({ powerLevel, dontEnforcePL }) {
    const current = this.getCampaignState();
    if (!current.isConnected || !current.isHost) return;
    if (powerLevel !== undefined) current.powerLevel = parseInt(powerLevel, 10) || 10;
    if (dontEnforcePL !== undefined) current.dontEnforcePL = !!dontEnforcePL;
    this.saveCampaignState(current);
    this.registerCampaignInfo(current);
    this.broadcastMessage({
      type: 'CAMPAIGN_UPDATE',
      campaignId: current.campaignId,
      campaignName: current.campaignName,
      pin: current.pin,
      powerLevel: current.powerLevel,
      dontEnforcePL: current.dontEnforcePL
    });
    this.renderAllOpenViews();
  }

  /**
   * Joins an existing campaign room using ID and PIN.
   * Even identically named campaigns are differentiated by PIN and ID.
   */
  joinCampaign({ campaignId, pin, playerName = 'Player', powerLevel = 10, dontEnforcePL = false, campaignName = '' }) {
    if (this.isUserConnected()) {
      const current = this.getCampaignState();
      throw new Error(`You are currently connected to campaign "${current.campaignName || current.campaignId}". Disconnect first to join a different campaign.`);
    }

    const cleanId = (campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cleanPin = (pin || '').trim();

    if (!cleanId) {
      throw new Error('Please enter a valid Campaign ID # to join.');
    }

    const info = this.getCampaignInfo(cleanId);
    const effName = campaignName || info?.campaignName || cleanId;
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
    if (isCreator) {
      this.startSession(cleanId);
    }

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

  leaveCampaign() {
    this.stopSessionHeartbeat();
    const current = this.getCampaignState();
    if (current && current.isConnected) {
      const cleanId = current.campaignId.replace(/^#+/, '');
      this.broadcastMessage({
        type: 'MEMBER_LEFT',
        campaignId: cleanId,
        pin: current.pin,
        memberId: this._lastLocalHeroId || undefined
      });
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
          this._memoryFallback['mm3e_active_sessions'] = JSON.stringify(sessions);
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
    }

    const current = this.getCampaignState();
    if (!current.isConnected) return;

    if (msg.type === 'SESSION_HEARTBEAT' && msg.campaignId) {
      try {
        const cleanId = String(msg.campaignId).trim().toUpperCase().replace(/^#+/, '');
        const sessions = this.getActiveSessions();
        sessions[cleanId] = { ...msg, campaignId: cleanId, lastHeartbeat: Date.now() };
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mm3e_active_sessions', JSON.stringify(sessions));
        }
      } catch (e) {}
    }

    if (msg.type === 'SESSION_ENDED' && msg.campaignId) {
      try {
        const cleanId = String(msg.campaignId).trim().toUpperCase().replace(/^#+/, '');
        const sessions = this.getActiveSessions();
        delete sessions[cleanId];
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mm3e_active_sessions', JSON.stringify(sessions));
        }
      } catch (e) {}
    }

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
        // Send our local member data to welcome them
        this.broadcastLocalMemberData();
        break;

      case 'MEMBER_UPDATE':
        if (msg.member && msg.member.id) {
          this.ingestRemoteMember(msg.member);
        }
        break;

      case 'MEMBER_LEFT':
        if (msg.memberId) {
          this.removeMember(msg.memberId);
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

    // When connected to a campaign:
    // Characters loaded into the client (including GM) do NOT automatically join the party
    // unless explicitly attached to this campaign!
    if (campaignState.isConnected && campaignState.campaignId) {
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
      this.broadcastMessage({
        type: 'MEMBER_UPDATE',
        campaignId: campaignState.campaignId,
        pin: campaignState.pin,
        member: localMember
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
        btn.innerHTML = `🛡️ Campaigns <span style="font-size: 10px; font-weight: 900; background: #10b981; color: #fff; padding: 1px 5px; border-radius: 4px; margin-left: 2px;">#${state.campaignId}</span>`;
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
    const isLive = state.isConnected ? this.isSessionActive(state.campaignId) : false;

    // Top Connection Bar:
    let connectionBar = '';
    if (state.isConnected) {
      connectionBar = `
        <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid var(--hero-green); border-radius: 6px; padding: 0.65rem 0.85rem; margin-bottom: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981;"></span>
              <strong style="color: var(--text-bright); font-size: 1.05rem;">${state.campaignName || 'Campaign Room'}</strong>
              <span style="font-size: 11px; background: rgba(0,0,0,0.15); padding: 2px 7px; border-radius: 4px; font-weight: 800; color: var(--hero-blue);">ID: #${state.campaignId}</span>
              <span style="font-size: 11px; background: rgba(234, 179, 8, 0.15); border: 1px solid var(--hero-gold); padding: 2px 7px; border-radius: 4px; font-weight: 800; color: var(--hero-gold);">PL ${state.powerLevel || 10}</span>
              ${state.pin ? `<span style="font-size: 11px; color: var(--hero-gold); font-weight: 700;">🔒 PIN Protected</span>` : ''}
              <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">(${state.isHost ? 'GM / Host' : 'Connected Player'})</span>
            </div>
            <button type="button" class="btn btn-outline btn-leave-campaign-room" style="font-size: 11px; font-weight: 700; padding: 0.2rem 0.65rem; color: var(--hero-red); border-color: var(--hero-red);">🚪 Disconnect / Leave</button>
          </div>
          ${(state.isCreator || this.getCampaignHistory().find(c => c.campaignId === state.campaignId)?.isCreator) ? `
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.45rem; padding-top: 0.45rem; border-top: 1px dashed rgba(255,255,255,0.15); font-size: 12px; flex-wrap: wrap;">
              <span style="color: var(--hero-gold); font-weight: 800;">⚙️ GM Campaign Settings (Creator):</span>
              ${isLive ? `
                <button type="button" class="btn btn-outline btn-gm-toggle-session" data-action="end" data-campid="${state.campaignId}" style="font-size: 11px; font-weight: 800; color: var(--hero-red); border-color: var(--hero-red); padding: 2px 9px; cursor: pointer;">⏹️ End Game Session</button>
                <span style="color: #10b981; font-size: 11px; font-weight: 800;">🟢 Live Broadcasting</span>
              ` : `
                <button type="button" class="btn btn-primary btn-gm-toggle-session" data-action="start" data-campid="${state.campaignId}" style="font-size: 11px; font-weight: 800; background: var(--hero-green); border-color: var(--hero-green); padding: 2px 9px; cursor: pointer;">▶️ Start Game Session</button>
                <span style="color: var(--text-muted); font-size: 11px; font-weight: 700;">⚪ Inactive / Offline</span>
              `}
              <label style="display: inline-flex; align-items: center; gap: 0.35rem; cursor: pointer; user-select: none; color: var(--text-bright); font-weight: 700; margin-left: 0.4rem;" title="When checked, characters of any Power Level can join without PL restrictions">
                <input type="checkbox" class="chk-campaign-dont-enforce-pl" ${state.dontEnforcePL ? 'checked' : ''} style="cursor: pointer; width: 14px; height: 14px; accent-color: var(--hero-gold);">
                <span>Don't enforce PL</span>
              </label>
              <div style="display: inline-flex; align-items: center; gap: 0.35rem; margin-left: 0.25rem;">
                <span style="color: var(--text-muted); font-size: 11px; font-weight: 700;">PL:</span>
                <select class="sel-campaign-target-pl" style="background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 3px; padding: 1px 6px; font-size: 11px; font-weight: 800;">
                  ${[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(pl => `<option value="${pl}" ${(state.powerLevel || 10) === pl ? 'selected' : ''}>PL ${pl}</option>`).join('')}
                </select>
              </div>
              <button type="button" class="btn btn-outline btn-open-join-requests" style="font-size: 11px; font-weight: 700; color: var(--hero-blue); border-color: var(--hero-blue); padding: 1px 8px; margin-left: 0.35rem; cursor: pointer;">🔔 Join Requests</button>
            </div>
          ` : `
            <div style="margin-top: 0.35rem; font-size: 11px; color: var(--text-muted);">
              ${state.dontEnforcePL ? '⚠️ PL Enforcement is disabled by GM (any character PL permitted)' : '🛡️ Strict PL Enforcement is active (characters must match campaign PL)'}
            </div>
          `}
        </div>
      `;
    } else {
      connectionBar = `
        <div style="background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 6px; padding: 0.75rem 0.85rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <div style="font-weight: 800; color: var(--text-bright); font-size: var(--font-size-sm);">P2P Campaign Sync: Disconnected</div>
            <div style="font-size: 11px; color: var(--text-muted);">Create or join a Campaign ID room to sync conditions and alts in real-time.</div>
          </div>
          <div style="display: flex; gap: 0.45rem;">
            <button type="button" class="btn btn-primary btn-trigger-create-campaign" style="font-size: 11px; font-weight: 800; padding: 0.25rem 0.75rem;">➕ Create Campaign</button>
            <button type="button" class="btn btn-outline btn-trigger-join-campaign" style="font-size: 11px; font-weight: 700; padding: 0.25rem 0.75rem;">🔗 Join Campaign</button>
          </div>
        </div>
      `;
    }

    // Hero Attachment Status Bar (Allows GM or Player to manually attach or detach their loaded hero)
    let charAttachmentBar = '';
    const activeChar = (typeof window !== 'undefined' && window.appController?.char) || null;
    if (state.isConnected && activeChar) {
      const cleanCampId = (state.campaignId || '').toUpperCase().replace(/^#+/, '');
      const charCampId = (activeChar.campaignId || '').toUpperCase().replace(/^#+/, '');
      const charCampName = (activeChar.campaign || '').trim().toLowerCase();
      const campName = (state.campaignName || '').trim().toLowerCase();
      const isCharAttached = (charCampId && charCampId === cleanCampId) ||
                             (charCampName && campName && charCampName === campName);

      if (!isCharAttached) {
        charAttachmentBar = `
          <div style="background: rgba(59, 130, 246, 0.08); border: 1px dashed var(--hero-blue); border-radius: 6px; padding: 0.5rem 0.85rem; margin-bottom: 0.65rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-size: 11px; color: var(--text-bright);">
              <span>🦸 Loaded Character: <strong>${activeChar.name || 'Hero'}</strong> (PL ${activeChar.powerLevel || 10}) is not in this campaign's party.</span>
            </div>
            <button type="button" class="btn btn-outline btn-attach-current-char" style="font-size: 11px; font-weight: 700; color: var(--hero-blue); border-color: var(--hero-blue); padding: 2px 8px;">➕ Attach to Campaign Party</button>
          </div>
        `;
      } else {
        charAttachmentBar = `
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 6px; padding: 0.4rem 0.85rem; margin-bottom: 0.65rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div style="font-size: 11px; color: var(--text-bright);">
              <span>🦸 Active Hero in Party: <strong>${activeChar.name || 'Hero'}</strong> (PL ${activeChar.powerLevel || 10})</span>
            </div>
            <button type="button" class="btn btn-outline btn-detach-current-char" style="font-size: 10px; color: var(--text-muted); border-color: var(--border-color); padding: 1px 6px;">Detach from Party</button>
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
               💥 Toughness: -${m.bruises} Penalty
             </span>`
          : `<span style="font-size: 12px; font-weight: 800; color: var(--hero-green); background: rgba(16, 185, 129, 0.15); padding: 3px 8px; border-radius: 4px; border: 1px solid var(--hero-green);">
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
                <span style="font-size: 12px; font-weight: 800; color: var(--hero-gold);">⚡ ${m.heroPoints} HP</span>
                <button type="button" class="btn btn-outline btn-inspect-member-sheet" data-memberid="${m.id}" title="Inspect full character sheet" style="font-size: 11px; font-weight: 700; color: var(--hero-blue); border-color: var(--hero-blue); padding: 1px 7px; cursor: pointer;">👁️ View Sheet</button>
                ${!m.isLocal ? `<button type="button" class="btn-remove-party-member" data-id="${m.id}" title="Remove member" style="background: none; border: none; color: var(--hero-red); cursor: pointer; font-size: 12px; font-weight: 700;">✕</button>` : ''}
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


    // Participated Campaigns History List
    const history = this.getCampaignHistory();
    const storedChars = (typeof window !== 'undefined' && window.appController?.storage?.getCharacters()) || [];

    const historyCards = history.map(c => {
      const isCur = state.isConnected && state.campaignId === c.campaignId;
      const isLive = this.isSessionActive(c.campaignId);
      const attached = storedChars.filter(ch => (ch.campaignId && ch.campaignId.toUpperCase().replace(/^#+/, '') === c.campaignId) || (ch.campaign && ch.campaign.trim().toLowerCase() === c.campaignName.toLowerCase()));
      const attachedStr = attached.map(ch => ch.name || 'Hero').join(', ') || 'None';

      return `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.5rem 0.75rem; margin-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <strong>${c.campaignName}</strong>
            <span style="font-size: 11px; background: rgba(0,0,0,0.15); padding: 1px 6px; border-radius: 4px; font-weight: 800; color: var(--hero-blue);">ID: #${c.campaignId}</span>
            <span style="font-size: 11px; color: var(--hero-gold); font-weight: 700;">PL ${c.powerLevel}</span>
            ${c.isCreator ? '<span style="font-size: 10px; font-weight: 800; color: var(--hero-gold); background: rgba(234, 179, 8, 0.15); padding: 1px 5px; border-radius: 3px;">👑 GM</span>' : '<span style="font-size: 10px; font-weight: 700; color: var(--hero-blue); background: rgba(59, 130, 246, 0.15); padding: 1px 5px; border-radius: 3px;">Player</span>'}
            <span style="font-size: 11px; color: var(--text-muted);">Attached: ${attachedStr}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            ${isLive ? '<span style="color: #10b981; font-weight: 800; font-size: 11px;">🟢 Session Running</span>' : '<span style="color: var(--text-muted); font-size: 11px;">⚪ Offline</span>'}
            ${c.isCreator ? (isLive ? `
              <button type="button" class="btn btn-outline btn-gm-toggle-session" data-action="end" data-campid="${c.campaignId}" style="font-size: 11px; padding: 2px 7px; color: var(--hero-red); border-color: var(--hero-red); font-weight: 700;">⏹️ End Session</button>
            ` : `
              <button type="button" class="btn btn-outline btn-gm-toggle-session" data-action="start" data-campid="${c.campaignId}" style="font-size: 11px; padding: 2px 7px; color: var(--hero-green); border-color: var(--hero-green); font-weight: 700;">▶️ Start Session</button>
            `) : ''}
            ${isCur ? '<span style="font-size: 11px; font-weight: 800; color: var(--hero-green);">[Connected]</span>' : `
              <button type="button" class="btn btn-outline btn-reconnect-campaign" data-campid="${c.campaignId}" style="font-size: 11px; padding: 2px 8px; font-weight: 700;">🔗 Connect</button>
            `}
            ${attached.length > 0 ? `
              <button type="button" class="btn btn-outline btn-load-attached-char" data-campid="${c.campaignId}" style="font-size: 11px; padding: 2px 8px; color: var(--hero-purple); border-color: var(--hero-purple);">🦸 Load Hero</button>
            ` : ''}
            <button type="button" class="btn-remove-campaign-history" data-campid="${c.campaignId}" title="Remove from list" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 12px; font-weight: 700; padding: 0 4px;">✕</button>
          </div>
        </div>
      `;
    }).join('');

    const historySection = `
      <div style="margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
        <div style="font-weight: 800; font-size: var(--font-size-sm); color: var(--text-bright); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
          <span>📜 Your Participated Campaigns (${history.length})</span>
          <span style="font-size: 11px; color: var(--text-muted);">Persistent across sessions</span>
        </div>
        ${history.length === 0 ? `
          <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 11px; font-style: italic;">
            No participated campaigns stored yet. When you create or join a campaign, it is saved here for quick reconnection.
          </div>
        ` : historyCards}
      </div>
    `;

    return connectionBar + charAttachmentBar + memberCards + historySection;
  }

  renderAllOpenViews() {
    this.updateHeaderBadge();
    const container = typeof document !== 'undefined' ? (document.getElementById('campaign-tracker-content') || document.getElementById('party-tracker-content')) : null;
    if (container) {
      container.innerHTML = this.generatePartyHTML();
      this.wireCardButtons(container);
    }
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

    parentEl.querySelectorAll('.btn-leave-campaign-room').forEach(btn => {
      btn.addEventListener('click', () => {
        this.leaveCampaign();
        this.renderAllOpenViews();
      });
    });

    parentEl.querySelectorAll('.btn-reconnect-campaign').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.campid;
        if (id && typeof window !== 'undefined' && window.appController) {
          window.appController.openJoinCampaignDialog(id);
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

    parentEl.querySelectorAll('.btn-remove-campaign-history').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.campid;
        if (id) {
          this.removeFromCampaignHistory(id);
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
      btn.addEventListener('click', () => {
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openJoinRequestsModal();
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
        this.updateCampaignSettings({ dontEnforcePL: e.target.checked });
      });
    });

    parentEl.querySelectorAll('.sel-campaign-target-pl').forEach(sel => {
      sel.addEventListener('change', (e) => {
        this.updateCampaignSettings({ powerLevel: parseInt(e.target.value, 10) });
      });
    });

    parentEl.querySelectorAll('.btn-trigger-create-campaign').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openCreateCampaignDialog();
        }
      });
    });

    parentEl.querySelectorAll('.btn-trigger-join-campaign').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openJoinCampaignDialog();
        }
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
  <link rel="stylesheet" href="css/styles.css?v=3.68">
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
    <span style="font-size: 11px; color: var(--text-muted);">Real-time P2P campaign sync & collision protection</span>
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
