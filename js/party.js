/**
 * Mutants & Masterminds 3E - Party Conditions & Toughness Tracker
 * Tracks conditions, bruises (toughness penalties), active forms/alts, and Hero Points
 * across party members. Supports Cloud Campaign synchronization via Supabase,
 * GM join approval queues, character sheet inspection, and P2P fallback.
 */

import { supabaseService } from './supabase_client.js?v=3.99';

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
    this.sessionPopoutWindow = null;
    this._sessionRolls = [];
    this._sessionEvents = [];
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

  escapeHTML(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
      const playerName = campaignData.playerName || existing.playerName || '';
      const userKey = (this.getCurrentUsername() || campaignData.playerName || existing.userKey || '').trim().toLowerCase();
      const entry = {
        campaignId: cleanId,
        campaignName: (campaignData.campaignName || existing.campaignName || cleanId).trim(),
        pin: campaignData.pin !== undefined ? String(campaignData.pin).trim() : (existing.pin || ''),
        powerLevel: parseInt(campaignData.powerLevel, 10) || existing.powerLevel || 10,
        dontEnforcePL: campaignData.dontEnforcePL !== undefined ? !!campaignData.dontEnforcePL : !!existing.dontEnforcePL,
        creatorName: campaignData.creatorName || existing.creatorName || '',
        playerName,
        userKey,
        isCreator,
        isOnHiatus,
        isPublic,
        notes,
        createdAtMs,
        pendingTransfer,
        isJoinedOrCreated: campaignData.isJoinedOrCreated !== undefined ? !!campaignData.isJoinedOrCreated : !!existing.isJoinedOrCreated,
        isMember: campaignData.isMember !== undefined ? !!campaignData.isMember : !!existing.isMember,
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

  saveAllCampaignHistory(history) {
    try {
      const serialized = JSON.stringify(Array.isArray(history) ? history : []);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaigns_history', serialized);
      } else {
        this._memoryFallback['mm3e_campaigns_history'] = serialized;
      }
      this.renderAllOpenViews();
    } catch (e) {}
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
        const sessions = this.getActiveSessions();
        const prevSession = sessions[cleanId] || {};
        const startedAtMs = current.startedAtMs || prevSession.startedAtMs || Date.now();
        const startedAtDate = current.startedAtDate || prevSession.startedAtDate || new Date(startedAtMs).toLocaleDateString();
        const startedAtTime = current.startedAtTime || prevSession.startedAtTime || new Date(startedAtMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const payload = {
          campaignId: cleanId,
          campaignName: current.campaignName,
          powerLevel: current.powerLevel || 10,
          dontEnforcePL: !!current.dontEnforcePL,
          creatorName: current.creatorName || '',
          isHost: !!current.isHost,
          startedAtMs,
          startedAtDate,
          startedAtTime,
          lastHeartbeat: Date.now()
        };
        try {
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

  getActiveSessionInfo(campaignId) {
    if (!campaignId) return null;
    const cleanId = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    const active = this.getActiveSessions();
    return active[cleanId] || null;
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
    if (!this.isUserCreatorOfCampaign(info || histMatch || { campaignId: cleanId })) {
      throw new Error('Only the GM can start a game session for this campaign.');
    }
    if (info?.isOnHiatus || histMatch?.isOnHiatus) {
      throw new Error(`Campaign "${info?.campaignName || histMatch?.campaignName || cleanId}" is currently on hiatus. Resume the campaign from hiatus before starting a game session.`);
    }

    // Limit GMs to running one campaign session at one time (v3.83)
    const activeSessions = this.getActiveSessions();
    for (const [activeCampId, s] of Object.entries(activeSessions)) {
      if (activeCampId !== cleanId) {
        const otherInfo = this.getCampaignInfo(activeCampId);
        const otherHist = this.getCampaignHistory().find(c => c.campaignId === activeCampId);
        if (this.isUserCreatorOfCampaign(otherInfo || otherHist || s || { campaignId: activeCampId })) {
          const runningName = otherInfo?.campaignName || otherHist?.campaignName || s.campaignName || activeCampId;
          throw new Error(`You are already running a game session for "${runningName}". GMs are limited to running one campaign session at a time. Please end that session before starting a new one.`);
        }
      }
    }
    if (current.isConnected && (current.isHost || current.isCreator) && current.campaignId && current.campaignId !== cleanId) {
      throw new Error(`You are currently connected as GM to a game session for "${current.campaignName || current.campaignId}". GMs are limited to running one campaign session at a time. Please end that session before starting a new one.`);
    }

    const campName = info?.campaignName || histMatch?.campaignName || current.campaignName || cleanId;
    const campPL = parseInt(info?.powerLevel ?? histMatch?.powerLevel ?? current.powerLevel ?? 10, 10) || 10;
    const dontEnforce = !!(info?.dontEnforcePL ?? histMatch?.dontEnforcePL ?? current.dontEnforcePL);

    const nowMs = Date.now();
    const startDate = new Date(nowMs).toLocaleDateString();
    const startTime = new Date(nowMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
      startedAtMs: nowMs,
      startedAtDate: startDate,
      startedAtTime: startTime,
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
    const info = this.getCampaignInfo(cleanId) || current;
    const histMatch = this.getCampaignHistory().find(c => c.campaignId === cleanId);
    if (!this.isUserCreatorOfCampaign(info || histMatch || current)) {
      throw new Error('Only the GM can end a game session for this campaign.');
    }
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
  // CAMPAIGN SESSION LOGS STORE & BROWSER VIEWER (v4.00)
  // =======================================================
  getCampaignSessionLogs(campaignId) {
    if (!campaignId) return [];
    const clean = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    const key = `mm3e_campaign_session_logs_${clean}`;
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : (this._sharedFallback[key] || this._memoryFallback[key]);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}

    const info = this.getCampaignInfo(clean) || {};
    if (Array.isArray(info.sessionLogs) && info.sessionLogs.length > 0) {
      return info.sessionLogs;
    }
    const histMatch = this.getCampaignHistory().find(c => c.campaignId === clean);
    if (Array.isArray(histMatch?.sessionLogs) && histMatch.sessionLogs.length > 0) {
      return histMatch.sessionLogs;
    }

    return [];
  }

  saveCampaignSessionLogs(campaignId, logs) {
    if (!campaignId || !Array.isArray(logs)) return;
    const clean = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    const key = `mm3e_campaign_session_logs_${clean}`;
    const serialized = JSON.stringify(logs);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, serialized);
      } else {
        this._sharedFallback[key] = serialized;
        this._memoryFallback[key] = serialized;
      }
    } catch {}
  }

  saveCampaignSessionLog(campaignId, logEntry) {
    if (!campaignId || !logEntry) return null;
    const clean = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    const logs = this.getCampaignSessionLogs(clean);
    const entry = {
      id: logEntry.id || ('slog_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)),
      campaignId: clean,
      title: (logEntry.title || 'Session Log').trim(),
      date: (logEntry.date || new Date().toLocaleDateString()).trim(),
      time: (logEntry.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).trim(),
      notes: (logEntry.notes || logEntry.summary || '').trim(),
      gmName: (logEntry.gmName || '').trim(),
      characterName: (logEntry.characterName || '').trim(),
      characters: Array.isArray(logEntry.characters) ? logEntry.characters : [],
      rollsCount: logEntry.rollsCount || 0,
      timestamp: logEntry.timestamp || new Date().toISOString()
    };

    const existingIdx = logs.findIndex(l => l.id === entry.id);
    if (existingIdx >= 0) {
      logs[existingIdx] = entry;
    } else {
      logs.unshift(entry);
    }
    this.saveCampaignSessionLogs(clean, logs);
    return entry;
  }

  generateSessionLogViewerHTML(log) {
    if (!log) return '';
    const charList = Array.isArray(log.characters) && log.characters.length > 0
      ? log.characters.map(c => `<strong>${this.escapeHTML(c.name || c)}</strong>${c.player ? ` <span style="color: var(--text-muted); font-size: 10pt;">(${this.escapeHTML(c.player)})</span>` : ''}`).join(', ')
      : (log.characterName ? `<strong>${this.escapeHTML(log.characterName)}</strong>` : '<span style="color: var(--text-muted); font-style: italic;">No characters recorded</span>');

    return `
      <div class="session-log-viewer-container" style="display: flex; flex-direction: column; height: 100%; padding: 0.85rem 1.15rem; box-sizing: border-box; overflow: hidden;">
        <!-- Header bar -->
        <div class="session-log-viewer-header" style="display: flex; justify-content: space-between; align-items: center; gap: 0.6rem; flex-wrap: wrap; border-bottom: 1px solid var(--border-color); padding-bottom: 0.6rem; flex-shrink: 0;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span style="font-size: 12pt; font-weight: 800; color: var(--hero-purple, #a855f7);">📜 Session Log:</span>
            <strong style="font-size: 12pt; color: var(--hero-cyan);">${this.escapeHTML(log.title || 'Session Log')}</strong>
            <span class="session-log-campaign-badge" style="font-size: 10.5pt; font-weight: 800; color: var(--hero-gold); background: rgba(234, 179, 8, 0.15); padding: 2px 8px; border-radius: 4px;">
              👑 ${this.escapeHTML(log.campaignName || log.campaignId || 'Campaign')}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <span style="font-size: 11pt; color: var(--text-muted); font-weight: 600;">
              📅 ${this.escapeHTML(log.date || '')} ${log.time ? '• ' + this.escapeHTML(log.time) : ''}
            </span>
            <button type="button" class="btn btn-outline btn-close-log-viewer" title="Close Session Log Viewer" style="min-height: 26px; padding: 1px 8px; font-size: 11.5pt; font-weight: 800; color: var(--text-muted); border-color: var(--border-color); cursor: pointer; border-radius: 4px; line-height: 1;">✕</button>
          </div>
        </div>

        <!-- Meta info row -->
        <div class="session-log-viewer-meta" style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 0.55rem; font-size: 11pt; color: var(--text-bright); flex-shrink: 0;">
          <span>👑 GM: <strong>${this.escapeHTML(log.gmName || 'GM')}</strong></span>
          <span>👥 Party: ${charList}</span>
          ${log.rollsCount ? `<span>🎲 Rolls Recorded: <strong>${log.rollsCount}</strong></span>` : ''}
        </div>

        <!-- Log Content / Notes -->
        <div class="session-log-viewer-body" style="flex: 1; overflow-y: auto; margin-top: 0.6rem; background: var(--bg-input, rgba(0,0,0,0.25)); border: 1px solid var(--border-color); border-radius: 6px; padding: 1rem; box-sizing: border-box;">
          <div style="font-size: 11pt; line-height: 1.6; color: var(--text-bright); white-space: pre-wrap; word-break: break-word;">
            ${this.escapeHTML(log.notes || '(No notes or event logs recorded for this session.)')}
          </div>
        </div>
      </div>
    `;
  }

  wireSessionLogViewer(parentEl) {
    if (!parentEl) return;
    const doc = parentEl.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!doc) return;

    // Close button
    parentEl.querySelectorAll('.btn-close-log-viewer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeSessionLogViewer(parentEl);
      });
    });

    // Divider interactions: Drag to resize & Double-click to restore 50/50
    const divider = parentEl.querySelector('#campaign-browser-split-divider') || doc.querySelector('#campaign-browser-split-divider');
    const wrapper = parentEl.querySelector('#campaign-browser-split-wrapper') || doc.querySelector('#campaign-browser-split-wrapper');
    const topPane = parentEl.querySelector('#campaign-browser-top-pane') || doc.querySelector('#campaign-browser-top-pane');
    const logPane = parentEl.querySelector('#campaign-browser-log-pane') || doc.querySelector('#campaign-browser-log-pane');

    if (divider && wrapper && topPane && logPane) {
      if (!divider._wiredSplitDivider) {
        divider._wiredSplitDivider = true;

        // Double click restores default position (50/50)
        divider.addEventListener('dblclick', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this._logDividerTopRatio = 0.5;
          topPane.style.flex = '1 1 50%';
          topPane.style.height = '50%';
          logPane.style.flex = '1 1 50%';
          logPane.style.height = '50%';
        });

        // Drag divider
        divider.addEventListener('mousedown', (e) => {
          e.preventDefault();
          divider.classList.add('active-dragging');
          const startY = e.clientY;
          const wrapperRect = wrapper.getBoundingClientRect();
          const totalHeight = wrapperRect.height || 500;
          const initialTopHeight = topPane.getBoundingClientRect().height;

          const onMouseMove = (moveEvent) => {
            const deltaY = moveEvent.clientY - startY;
            let newTopHeight = initialTopHeight + deltaY;
            const minHeight = 100;
            const maxHeight = totalHeight - minHeight - 8;
            if (newTopHeight < minHeight) newTopHeight = minHeight;
            if (newTopHeight > maxHeight) newTopHeight = maxHeight;

            const ratio = newTopHeight / totalHeight;
            this._logDividerTopRatio = ratio;
            topPane.style.flex = `0 0 ${newTopHeight}px`;
            topPane.style.height = `${newTopHeight}px`;
            logPane.style.flex = '1 1 auto';
            logPane.style.height = `calc(100% - ${newTopHeight + 8}px)`;
          };

          const onMouseUp = () => {
            divider.classList.remove('active-dragging');
            doc.removeEventListener('mousemove', onMouseMove);
            doc.removeEventListener('mouseup', onMouseUp);
          };

          doc.addEventListener('mousemove', onMouseMove);
          doc.addEventListener('mouseup', onMouseUp);
        });
      }
    }
  }

  closeSessionLogViewer(parentEl = null) {
    this._activeViewedSessionLog = null;
    const doc = parentEl ? (parentEl.ownerDocument || document) : (typeof document !== 'undefined' ? document : null);
    if (!doc) return;

    doc.querySelectorAll('#campaign-browser-split-divider').forEach(div => {
      div.style.display = 'none';
    });
    doc.querySelectorAll('#campaign-browser-log-pane').forEach(lp => {
      lp.style.display = 'none';
      lp.innerHTML = '';
    });
    doc.querySelectorAll('#campaign-browser-top-pane').forEach(tp => {
      tp.style.flex = '1 1 100%';
      tp.style.height = '100%';
    });
  }

  openSessionLogInBrowser(campId, logId, parentEl = null) {
    const logs = this.getCampaignSessionLogs(campId);
    const log = logs.find(l => l.id === logId) || logs[0];
    if (!log) return;

    const campInfo = this.getCampaignInfo(campId) || this.getCampaignHistory().find(c => c.campaignId === campId) || {};
    const campName = campInfo.campaignName || campId;
    this._activeViewedSessionLog = { ...log, campaignId: campId, campaignName: campName };

    const doc = parentEl ? (parentEl.ownerDocument || document) : (typeof document !== 'undefined' ? document : null);
    if (!doc) return;

    const wrapper = doc.querySelector('#campaign-browser-split-wrapper');
    const divider = doc.querySelector('#campaign-browser-split-divider');
    const logPane = doc.querySelector('#campaign-browser-log-pane');
    const topPane = doc.querySelector('#campaign-browser-top-pane');

    if (wrapper && divider && logPane && topPane) {
      logPane.innerHTML = this.generateSessionLogViewerHTML(this._activeViewedSessionLog);
      divider.style.display = 'flex';
      logPane.style.display = 'flex';

      const ratio = this._logDividerTopRatio || 0.5;
      topPane.style.flex = `0 0 ${ratio * 100}%`;
      topPane.style.height = `${ratio * 100}%`;
      logPane.style.flex = `0 0 calc(${100 - (ratio * 100)}% - 8px)`;
      logPane.style.height = `calc(${100 - (ratio * 100)}% - 8px)`;

      this.wireSessionLogViewer(wrapper);
    } else {
      this.renderAllOpenViews();
    }
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
      const full = abilityLabels[k]?.toLowerCase();
      const sVal = parseInt(sAb[k] ?? (full ? sAb[full] : undefined) ?? 0, 10);
      const iVal = parseInt(iAb[k] ?? (full ? iAb[full] : undefined) ?? 0, 10);
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
      mem.incomingCharacterData = incomingChar;
      this.savePartyMembers(members);
      this.renderAllOpenViews();
    }
  }

  recordMemberDiffAlert(campaignId, charName, diffs, incomingChar = null) {
    const clean = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const members = this.getPartyMembers();
    const mem = members.find(m => (m.characterName || '').toLowerCase() === String(charName || '').toLowerCase());
    if (mem) {
      mem.hasDiffAlert = true;
      mem.diffSummary = diffs;
      mem.savedTimestamp = 'Last Session Online Copy';
      mem.incomingTimestamp = new Date().toLocaleString();
      if (incomingChar) mem.incomingCharacterData = incomingChar;
      this.savePartyMembers(members);
      this.renderAllOpenViews();
    }
  }

  approveCharacterChanges(campaignId, charName) {
    const clean = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const members = this.getPartyMembers();
    const mem = members.find(m => (m.characterName || '').toLowerCase() === String(charName || '').toLowerCase());
    if (!mem) return false;

    const approvedChar = mem.incomingCharacterData || mem.characterData;
    if (approvedChar) {
      this.saveCampaignSavedCharacter(clean, approvedChar, mem.playerName || 'Player', new Date().toISOString());
      mem.characterData = approvedChar;
    }

    delete mem.hasDiffAlert;
    delete mem.diffSummary;
    delete mem.incomingCharacterData;
    this.savePartyMembers(members);
    this.renderAllOpenViews();
    return true;
  }

  removeCharacterFromPartyRoster(campaignId, charName) {
    const clean = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const members = this.getPartyMembers();
    const targetName = String(charName || '').trim().toLowerCase();
    const updated = members.filter(m => {
      const mCamp = String(m.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      const mName = String(m.characterName || '').trim().toLowerCase();
      if (clean && mCamp && mCamp !== clean) return true;
      return mName !== targetName;
    });
    this.savePartyMembers(updated);
    this.renderAllOpenViews();
    return true;
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
    // An unauthenticated visitor is NEVER a member of any campaign
    if (typeof supabaseService !== 'undefined' && supabaseService && !supabaseService.isLoggedIn()) {
      return false;
    }

    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cleanName = String(campaignName || '').trim().toLowerCase();
    const currentUsername = (this.getCurrentUsername() || '').trim().toLowerCase();
    if (!currentUsername) return false;

    // 1. Check if the user has an active or stored character currently attached to this campaign
    const allChars = [];
    if (typeof window !== 'undefined' && window.appController?.char) {
      allChars.push(window.appController.char);
      if (window.appController.primaryChar && window.appController.primaryChar !== window.appController.char) {
        allChars.push(window.appController.primaryChar);
      }
    }
    if (typeof storageManager !== 'undefined') {
      (storageManager.getCharacters() || []).forEach(c => allChars.push(c));
    } else if (typeof window !== 'undefined' && window.appController?.storage?.getCharacters) {
      (window.appController.storage.getCharacters() || []).forEach(c => allChars.push(c));
    }

    const hasAttachedChar = allChars.some(ch => {
      const chCampId = String(ch.campaignId || '').toUpperCase().replace(/^#+/, '');
      const chCampName = String(ch.campaign || ch.lastCampaign || '').trim().toLowerCase();
      return (cleanId && chCampId === cleanId) || (cleanName && chCampName === cleanName);
    });
    if (hasAttachedChar) return true;

    // 2. Check campaign history for recorded membership
    try {
      const history = this.getCampaignHistory();
      const histMatch = history.find(h => {
        const cId = String(h.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
        const cName = String(h.campaignName || '').trim().toLowerCase();
        const matchesCamp = (cleanId && cId === cleanId) || (cleanName && cName === cleanName);
        if (!matchesCamp) return false;
        if (h.isJoinedOrCreated || h.isMember) return true;
        return false;
      });
      if (histMatch) return true;
    } catch {}

    // 3. Check approved join requests store (only active approved request for this username)
    try {
      const reqs = this.getAllJoinRequestsStore();
      const approvedReq = reqs.find(r => {
        const cId = String(r.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
        const cName = String(r.campaignName || '').trim().toLowerCase();
        const matchesCamp = (cleanId && cId === cleanId) || (cleanName && cName === cleanName);
        if (!matchesCamp) return false;
        if (r.status !== 'approved') return false;
        if (currentUsername && String(r.username || '').trim().toLowerCase() !== currentUsername) return false;
        return true;
      });
      if (approvedReq) return true;
    } catch {}

    // 4. Check active party members
    const members = this.getPartyMembers();
    const isMemberInParty = members.some(m => {
      const mCampId = String(m.campaignId || '').toUpperCase().replace(/^#+/, '');
      const mCampName = String(m.campaign || '').trim().toLowerCase();
      const matchesCamp = (cleanId && mCampId === cleanId) || (cleanName && mCampName === cleanName);
      if (!matchesCamp) return false;
      const pName = String(m.playerName || '').trim().toLowerCase();
      return currentUsername && pName === currentUsername;
    });
    if (isMemberInParty) return true;

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

  updateCampaignSettings({ campaignId, powerLevel, dontEnforcePL, isPublic, notes }, { skipRender = false } = {}) {
    const current = this.getCampaignState();
    const targetId = String(campaignId || current.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const histMatch = this.getCampaignHistory().find(c => c.campaignId === targetId);
    const regInfo = this.getCampaignInfo(targetId) || {};
    if (!this.isUserCreatorOfCampaign(regInfo || histMatch || current)) return;

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
    if (!skipRender) {
      this.renderAllOpenViews();
    }
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

    const processCampaignEntry = (c) => {
      const cleanId = String(c.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      if (!cleanId) return;

      const regEntry = reg[cleanId] || {};
      const effPublic = c.isPublic !== undefined ? !!c.isPublic : (regEntry.isPublic !== undefined ? !!regEntry.isPublic : true);
      const effCreatorName = (c.creatorName || regEntry.creatorName || '').trim();
      const effNotes = String(c.notes ?? regEntry.notes ?? '');
      const effHiatus = c.isOnHiatus !== undefined ? !!c.isOnHiatus : !!regEntry.isOnHiatus;

      // Server-side verification: Every valid campaign must have an assigned GM/creator. Never display phantom/non-existent campaigns.
      if (!effCreatorName) {
        return;
      }

      // Determine GM / Creator rights dynamically for current user
      const isCreator = this.isUserCreatorOfCampaign({
        campaignId: cleanId,
        creatorName: effCreatorName,
        creator_id: c.creator_id || regEntry.creator_id,
        isCreator: c.isCreator
      });

      // Determine membership: either creator or joined as participant
      const isMember = isCreator || !!c.isJoinedOrCreated || !!c.isMember || this.isUserMemberOfCampaign(cleanId, c.campaignName || regEntry.campaignName);

      // SECURITY & PRIVACY RULE:
      // Non-public campaigns can ONLY be seen by the GM / Creator who created them, or members who joined them.
      // Other users MUST NOT see non-public campaigns in the campaign browser!
      if (!effPublic && !isCreator && !isMember) {
        return;
      }

      const existing = mergedMap.get(cleanId);
      if (existing) {
        if (isCreator) existing.isCreator = true;
        if (isMember) existing.isJoinedOrCreated = true;
        return;
      }

      mergedMap.set(cleanId, {
        ...regEntry,
        ...c,
        campaignId: cleanId,
        campaignName: (c.campaignName || regEntry.campaignName || cleanId).trim(),
        creatorName: effCreatorName,
        isCreator, // Strictly dynamically verified: true ONLY if the current user is the GM!
        isPublic: effPublic,
        notes: effNotes,
        isOnHiatus: effHiatus,
        createdAtMs: c.createdAtMs || regEntry.createdAtMs || c.lastJoinedMs || 0,
        isJoinedOrCreated: isCreator || isMember
      });
    };

    // 1. Process history
    history.forEach(h => processCampaignEntry(h));

    // 2. Process registry
    Object.values(reg).forEach(r => processCampaignEntry(r));

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
        const aOwned = a.isCreator ? 1 : 0;
        const bOwned = b.isCreator ? 1 : 0;
        if (bOwned !== aOwned) return bOwned - aOwned;
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
    const regInfo = this.getCampaignInfo(cleanId) || {};
    const isCreator = this.isUserCreatorOfCampaign(historyMatch || regInfo || { campaignId: cleanId, creatorName: regInfo.creatorName });

    const effCreatorName = info?.creatorName || historyMatch?.creatorName || regInfo?.creatorName || '';
    if (!effCreatorName && !isCreator) {
      throw new Error(`Campaign "${effName}" (#${cleanId}) does not exist on the server. Only verified campaigns with an assigned GM can be joined.`);
    }
    const membershipEntry = {
      isConnected: false,
      campaignId: cleanId,
      campaignName: effName,
      pin: cleanPin,
      powerLevel: effPL,
      dontEnforcePL: effDontEnforce,
      creatorName: effCreatorName,
      isHost: isCreator,
      isCreator,
      playerName,
      alreadyMember,
      isSessionRunning: this.isSessionActive(cleanId)
    };

    this.registerCampaignInfo(membershipEntry);
    this.saveToCampaignHistory(membershipEntry);
    this.saveCampaignState(membershipEntry);
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
    const regInfo = this.getCampaignInfo(cleanId) || {};
    const isCreator = this.isUserCreatorOfCampaign(historyMatch || regInfo || { campaignId: cleanId, creatorName: regInfo.creatorName });

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
    const currentUsername = (this.getCurrentUsername() || '').trim().toLowerCase();

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

    // Remove from campaign history UNLESS user is the GM / Creator of the campaign
    try {
      const history = this.getCampaignHistory().filter(c => {
        const matchId = cleanId && c.campaignId === cleanId;
        const matchName = cleanName && (c.campaignName || '').trim().toLowerCase() === cleanName;
        if (!matchId && !matchName) return true;
        // Keep in history ONLY if user is creator (so GM still sees their campaign in browser)
        if (c.isCreator || this.isUserCreatorOfCampaign(c)) return true;
        return false;
      });
      const serialized = JSON.stringify(history);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaigns_history', serialized);
      } else {
        this._memoryFallback['mm3e_campaigns_history'] = serialized;
      }
    } catch (e) {}

    // Remove approved join request for this user from join requests store
    try {
      const reqs = this.getAllJoinRequestsStore().filter(r => {
        const rId = String(r.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
        const rUser = String(r.username || '').trim().toLowerCase();
        const matchesCamp = rId === cleanId || (cleanName && String(r.campaignName || '').trim().toLowerCase() === cleanName);
        if (matchesCamp && (!currentUsername || rUser === currentUsername)) {
          return false;
        }
        return true;
      });
      this.saveAllJoinRequestsStore(reqs);
    } catch (e) {}

    // Remove any party members tied to this campaign
    const members = this.getPartyMembers().filter(m => {
      const mId = String(m.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      const mName = String(m.campaign || '').trim().toLowerCase();
      const matchesCamp = (cleanId && mId === cleanId) || (cleanName && mName === cleanName);
      if (matchesCamp) return false;
      if (m.isLocal && (!m.campaignId || m.campaignId === cleanId)) return false;
      return true;
    });
    this.savePartyMembers(members);

    // Call Supabase to remove member from campaign_members table in cloud
    if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
      const user = supabaseService.getUser();
      if (user && user.id) {
        supabaseService.removeCampaignMember(cleanId, user.id).catch(() => {});
      }
    }

    this.renderAllOpenViews();
    if (typeof window !== 'undefined' && window.appController) {
      window.appController.updateCampaignDropdown?.();
      window.appController.alignCampaignButton?.();
    }
  }

  // =======================================================
  // GM HIATUS, CAMPAIGN DELETION & OWNERSHIP TRANSFER
  // =======================================================
  isUserLoggedIn() {
    if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
      return true;
    }
    const uname = this.getCurrentUsername();
    return !!(uname && uname.trim());
  }

  getCurrentUsername() {
    if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
      return supabaseService.getUsername();
    }
    if (typeof window !== 'undefined' && window.appController?.char?.playerName) {
      return window.appController.char.playerName.trim();
    }
    return '';
  }

  /**
   * Strictly determines whether the current active user is the GM / Creator of the campaign.
   * Prevents non-creators from receiving GM rights or seeing non-public campaigns.
   */
  isUserCreatorOfCampaign(camp) {
    if (!camp) return false;
    // An unauthenticated visitor is NEVER a GM / creator of any campaign
    if (typeof supabaseService !== 'undefined' && supabaseService && !supabaseService.isLoggedIn()) {
      return false;
    }
    const currentUsername = (this.getCurrentUsername() || '').trim().toLowerCase();
    if (!currentUsername) return false;

    const cleanId = String(camp.campaignId || camp.id || '').trim().toUpperCase().replace(/^#+/, '');
    let regInfo = null;
    if (cleanId) {
      try {
        const reg = this.getCampaignRegistry();
        regInfo = reg[cleanId] || null;
      } catch {}
    }

    const creatorId = camp.creator_id || regInfo?.creator_id || null;
    const campCreator = String(camp.creatorName || camp.creator_name || regInfo?.creatorName || '').trim().toLowerCase();

    // 1. Supabase authenticated user check
    if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
      const user = supabaseService.getUser();
      if (user && creatorId && user.id === creatorId) {
        return true;
      }
      const suName = (supabaseService.getUsername() || '').trim().toLowerCase();
      if (suName && campCreator && suName === campCreator) {
        return true;
      }
      return false;
    }

    // 2. Offline / Local mode
    if (campCreator && currentUsername) {
      return campCreator === currentUsername;
    }
    if (!campCreator && camp.isCreator) {
      return currentUsername === 'gm' || currentUsername === 'host';
    }
    return false;
  }

  ownsAnyCampaign() {
    return this.getBrowsableCampaigns().some(c => !!c.isCreator);
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
    if (!this.isUserCreatorOfCampaign(info || match || { campaignId: cleanId })) {
      throw new Error('Only the GM can put this campaign on hiatus or resume it.');
    }
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

    const hist = this.getCampaignHistory();
    const match = hist.find(c => c.campaignId === cleanId);
    const info = this.getCampaignInfo(cleanId) || match || {};
    if (!this.isUserCreatorOfCampaign(info || match || { campaignId: cleanId })) {
      const uName = (this.getCurrentUsername() || '').trim().toLowerCase();
      const cCreator = (info?.creatorName || match?.creatorName || '').trim().toLowerCase();
      if (!uName || !cCreator || uName !== cCreator) {
        throw new Error('Only the GM can delete this campaign.');
      }
    }

    if (this.isSessionActive(cleanId)) {
      this.endSession(cleanId);
    }
    const campName = match?.campaignName || info.campaignName || cleanId;
    const effectiveGM = gmName || match?.creatorName || info.creatorName || this.getCurrentUsername() || 'GM';

    try {
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
    } catch (e) {}

    // 1. Remove from registry
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

    // 2. Remove from campaign history - MUST REMOVE REGARDLESS OF isCreator
    try {
      const history = this.getCampaignHistory().filter(c => {
        const matchId = cleanId && c.campaignId === cleanId;
        const matchName = campName && (c.campaignName || '').trim().toLowerCase() === campName.trim().toLowerCase();
        return !matchId && !matchName;
      });
      const serialized = JSON.stringify(history);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaigns_history', serialized);
      } else {
        this._memoryFallback['mm3e_campaigns_history'] = serialized;
      }
    } catch (e) {}

    // 3. Remove join requests for this campaign
    try {
      const reqs = this.getAllJoinRequestsStore().filter(r => {
        const rId = String(r.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
        return rId !== cleanId;
      });
      this.saveAllJoinRequestsStore(reqs);
    } catch (e) {}

    // 4. Clean up campaign characters store
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(`mm3e_campaign_characters_${cleanId}`);
      }
    } catch (e) {}

    // 5. Delete from Supabase cloud database
    if (typeof supabaseService !== 'undefined' && supabaseService && typeof supabaseService.deleteCampaign === 'function') {
      supabaseService.deleteCampaign(cleanId).catch(err => console.warn('Cloud campaign deletion error:', err));
    }

    // 6. Detach active character and stored characters
    if (typeof window !== 'undefined' && window.appController) {
      const app = window.appController;
      if (app.char) {
        const curId = String(app.char.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
        const curName = String(app.char.campaign || app.char.lastCampaign || '').trim().toLowerCase();
        if (curId === cleanId || curName === campName.trim().toLowerCase()) {
          app.char.campaign = '';
          app.char.campaignId = '';
          app.char.lastCampaign = '';
          if (app.primaryChar) {
            app.primaryChar.campaign = '';
            app.primaryChar.campaignId = '';
            app.primaryChar.lastCampaign = '';
          }
          const campInput = document.getElementById('header-campaign-name');
          if (campInput) campInput.value = '';
          app.saveAndAudit();
        }
      }
      try {
        const chars = (typeof storageManager !== 'undefined' ? storageManager.getCharacters() : (app.storage?.getCharacters() || [])) || [];
        chars.forEach(ch => {
          const chId = String(ch.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
          const chName = String(ch.campaign || ch.lastCampaign || '').trim().toLowerCase();
          if (chId === cleanId || chName === campName.trim().toLowerCase()) {
            ch.campaign = '';
            ch.campaignId = '';
            ch.lastCampaign = '';
            if (Array.isArray(ch.alts)) {
              ch.alts.forEach(alt => {
                alt.campaign = '';
                alt.campaignId = '';
                alt.lastCampaign = '';
              });
            }
            if (typeof storageManager !== 'undefined') storageManager.saveCharacter(ch);
          }
        });
      } catch (e) {}
    }

    // 7. Clear campaign state
    const current = this.getCampaignState();
    if (current && ((cleanId && current.campaignId === cleanId) || (campName && (current.campaignName || '').trim().toLowerCase() === campName.trim().toLowerCase()))) {
      this.leaveCampaign();
    }

    // 8. Re-render all views
    this.renderAllOpenViews();
    if (typeof window !== 'undefined' && window.appController) {
      window.appController.updateCampaignDropdown?.();
      window.appController.alignCampaignButton?.();
    }

    return true;
  }

  /**
   * Deletes an orphan campaign (a campaign not owned by an active GM or where creator is unavailable).
   * Completely purges the campaign from registry, history, join requests, characters, and cloud.
   */
  deleteOrphanCampaign(campaignId, campaignName = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return false;

    const hist = this.getCampaignHistory();
    const match = hist.find(c => c.campaignId === cleanId);
    const info = this.getCampaignInfo(cleanId) || match || {};
    const campName = campaignName || match?.campaignName || info.campaignName || cleanId;

    if (this.isSessionActive(cleanId)) {
      this.endSession(cleanId);
    }

    // 1. Remove from registry
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

    // 2. Remove from campaign history completely
    try {
      const history = this.getCampaignHistory().filter(c => {
        const matchId = cleanId && c.campaignId === cleanId;
        const matchName = campName && (c.campaignName || '').trim().toLowerCase() === campName.trim().toLowerCase();
        return !matchId && !matchName;
      });
      const serialized = JSON.stringify(history);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_campaigns_history', serialized);
      } else {
        this._memoryFallback['mm3e_campaigns_history'] = serialized;
      }
    } catch (e) {}

    // 3. Remove join requests for this campaign
    try {
      const reqs = this.getAllJoinRequestsStore().filter(r => {
        const rId = String(r.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
        return rId !== cleanId;
      });
      this.saveAllJoinRequestsStore(reqs);
    } catch (e) {}

    // 4. Clean up campaign characters store
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(`mm3e_campaign_characters_${cleanId}`);
      }
    } catch (e) {}

    // 5. Delete from Supabase cloud database if possible
    if (typeof supabaseService !== 'undefined' && supabaseService && typeof supabaseService.deleteCampaign === 'function') {
      supabaseService.deleteCampaign(cleanId).catch(err => console.warn('Cloud campaign deletion error:', err));
    }

    // 6. Detach active character and stored characters
    if (typeof window !== 'undefined' && window.appController) {
      const app = window.appController;
      if (app.char) {
        const curId = String(app.char.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
        const curName = String(app.char.campaign || app.char.lastCampaign || '').trim().toLowerCase();
        if (curId === cleanId || curName === campName.trim().toLowerCase()) {
          app.char.campaign = '';
          app.char.campaignId = '';
          app.char.lastCampaign = '';
          if (app.primaryChar) {
            app.primaryChar.campaign = '';
            app.primaryChar.campaignId = '';
            app.primaryChar.lastCampaign = '';
          }
          const campInput = document.getElementById('header-campaign-name');
          if (campInput) campInput.value = '';
          app.saveAndAudit();
        }
      }
      try {
        const chars = (typeof storageManager !== 'undefined' ? storageManager.getCharacters() : (app.storage?.getCharacters() || [])) || [];
        chars.forEach(ch => {
          const chId = String(ch.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
          const chName = String(ch.campaign || ch.lastCampaign || '').trim().toLowerCase();
          if (chId === cleanId || chName === campName.trim().toLowerCase()) {
            ch.campaign = '';
            ch.campaignId = '';
            ch.lastCampaign = '';
            if (Array.isArray(ch.alts)) {
              ch.alts.forEach(alt => {
                alt.campaign = '';
                alt.campaignId = '';
                alt.lastCampaign = '';
              });
            }
            if (typeof storageManager !== 'undefined') storageManager.saveCharacter(ch);
          }
        });
      } catch (e) {}
    }

    // 7. Clear campaign state if currently active
    const current = this.getCampaignState();
    if (current && ((cleanId && current.campaignId === cleanId) || (campName && (current.campaignName || '').trim().toLowerCase() === campName.trim().toLowerCase()))) {
      this.leaveCampaign();
    }

    // 8. Re-render all views
    this.renderAllOpenViews();
    if (typeof window !== 'undefined' && window.appController) {
      window.appController.updateCampaignDropdown?.();
      window.appController.alignCampaignButton?.();
    }

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
    if (!this.isUserCreatorOfCampaign(info || match || { campaignId: cleanId })) {
      throw new Error('Only the GM can transfer ownership of this campaign.');
    }
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
    if (!this.isUserCreatorOfCampaign(info || match || { campaignId: cleanId })) {
      throw new Error('Only the GM can withdraw an ownership transfer offer.');
    }
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
        .map(c => String(c.campaignId || '').toUpperCase().replace(/^#+/, ''))
    );
    const currentUsername = (this.getCurrentUsername() || '').trim().toLowerCase();
    return all.filter(r => {
      const rId = String(r.campaignId || r.campaign_id || '').toUpperCase().replace(/^#+/, '');
      const rGm = String(r.gmName || '').trim().toLowerCase();
      return ownedIds.has(rId) || (currentUsername && rGm === currentUsername);
    });
  }

  respondToCampaignJoinRequest(requestId, status, gmName = '') {
    if (status !== 'approved' && status !== 'rejected') return null;
    const requests = this.getAllJoinRequestsStore();
    const req = requests.find(r => r.id === requestId);
    if (!req) return null;

    req.status = status;
    req.updated_at = new Date().toISOString();
    this.saveAllJoinRequestsStore(requests);

    // Also mark any corresponding GM JOIN_REQUEST message as read
    try {
      const messages = this.getAllCampaignMessages();
      let msgChanged = false;
      messages.forEach(m => {
        if (m.type === 'JOIN_REQUEST' && (m.requestId === requestId || m.id === 'msg_join_req_' + requestId)) {
          m.read = true;
          msgChanged = true;
        }
      });
      if (msgChanged) {
        this.saveAllCampaignMessages(messages);
      }
    } catch (e) {}

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
      // When a user is accepted to a campaign, automatically mark any invitation message for this campaign as read
      this.markCampaignInvitationsRead(req.campaignId, req.username);

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
    invitationStatus = '',
    requestId = '',
    excludedUser = '',
    recipientUsers = [],
    ccUsers = [],
    isMassMail = false,
    selfIncludedBySender = false,
    recipientScopeLabel = '',
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
      invitationStatus: invitationStatus || '',
      requestId: requestId || '',
      excludedUser: (excludedUser || '').trim(),
      recipientUsers: Array.isArray(recipientUsers) ? recipientUsers : [],
      ccUsers: Array.isArray(ccUsers) ? ccUsers : [],
      isMassMail: !!isMassMail,
      selfIncludedBySender: !!selfIncludedBySender,
      recipientScopeLabel: (recipientScopeLabel || '').trim(),
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

  updateMessageCampaign(msgId, newCampId) {
    const cleanId = String(newCampId || '').trim().toUpperCase().replace(/^#+/, '');
    const messages = this.getAllCampaignMessages();
    const msg = messages.find(m => m.id === msgId);
    if (!msg) return null;

    if (!cleanId || cleanId === 'DIRECT') {
      msg.campaignId = 'DIRECT';
      msg.campaignName = 'Direct Message';
    } else {
      const info = this.getCampaignInfo(cleanId) || {};
      const histMatch = this.getCampaignHistory().find(c => String(c.campaignId || '').toUpperCase().replace(/^#+/, '') === cleanId) || {};
      msg.campaignId = cleanId;
      msg.campaignName = histMatch.campaignName || info.campaignName || cleanId;
      if (histMatch.creatorName || info.creatorName) {
        msg.gmName = histMatch.creatorName || info.creatorName;
      }
    }
    this.saveAllCampaignMessages(messages);
    this.updateHeaderBadge();
    return msg;
  }

  isUserPlayerInCampaign(username = '', campaignId = '') {
    if (!username || !campaignId) return false;
    const cleanId = String(campaignId).trim().toUpperCase().replace(/^#+/, '');
    if (cleanId === 'DIRECT') return false;
    const cleanUser = String(username).trim().toLowerCase();

    // 1. Check saved characters for this campaign
    try {
      const saved = this.getCampaignSavedCharacters(cleanId);
      if (Array.isArray(saved) && saved.some(c => (c.playerName || c.username || '').trim().toLowerCase() === cleanUser)) {
        return true;
      }
    } catch {}

    // 2. Check approved join requests
    try {
      const reqs = this.getAllJoinRequestsStore();
      if (reqs.some(r => String(r.campaignId || '').toUpperCase().replace(/^#+/, '') === cleanId &&
                         (r.username || '').trim().toLowerCase() === cleanUser &&
                         r.status === 'approved')) {
        return true;
      }
    } catch {}

    // 3. Check campaign history
    try {
      const hist = this.getCampaignHistory();
      const match = hist.find(c => String(c.campaignId || '').toUpperCase().replace(/^#+/, '') === cleanId);
      if (match && !match.isCreator && (match.playerName || '').toLowerCase() === cleanUser) {
        return true;
      }
    } catch {}

    return false;
  }

  markCampaignInvitationsRead(campaignId = '', username = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cleanUser = String(username || this.getCurrentUsername() || '').trim().toLowerCase();
    const messages = this.getAllCampaignMessages();
    let updated = false;

    messages.forEach(m => {
      const mCampId = String(m.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      const mPlayer = (m.playerName || m.recipientUser || '').trim().toLowerCase();
      const mRecip = (m.recipientUser || '').trim().toLowerCase();
      if (mCampId === cleanId && (!cleanUser || mPlayer === cleanUser || mRecip === cleanUser)) {
        if (m.type === 'CAMPAIGN_INVITATION' || m.type === 'JOIN_REQUEST') {
          if (!m.read) {
            m.read = true;
            updated = true;
          }
          if (m.type === 'CAMPAIGN_INVITATION' && m.invitationStatus === 'pending') {
            m.invitationStatus = 'accepted';
            updated = true;
          }
        }
      }
    });

    if (updated) {
      this.saveAllCampaignMessages(messages);
      this.updateHeaderBadge();
    }
  }

  sendCampaignInvitation({ targetUser = '', campaignId = '', gmName = '', customNote = '' } = {}) {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const cleanUser = String(targetUser || '').trim();
    if (!cleanUser || !cleanId) throw new Error('Recipient username and campaign are required.');

    const effGM = gmName || this.getCurrentUsername() || 'GM';
    const info = this.getCampaignInfo(cleanId) || {};
    const hist = this.getCampaignHistory().find(c => String(c.campaignId || '').toUpperCase().replace(/^#+/, '') === cleanId) || {};
    const campName = hist.campaignName || info.campaignName || cleanId;

    const msg = this.sendCampaignMessage({
      type: 'CAMPAIGN_INVITATION',
      recipientRole: 'USER',
      recipientUser: cleanUser,
      senderUser: effGM,
      campaignId: cleanId,
      campaignName: campName,
      gmName: effGM,
      playerName: cleanUser,
      invitationStatus: 'pending',
      text: customNote || `👑 ${effGM} has invited you to join campaign "${campName}" (#${cleanId})! You can accept this invitation to join the party directly, or decline.`
    });

    try {
      if (typeof window !== 'undefined' && window.appController?.forwardMessageToEmail) {
        window.appController.forwardMessageToEmail(msg, cleanUser);
      }
    } catch (e) {
      console.warn('Email forwarding trigger warning:', e);
    }

    return msg;
  }

  respondToCampaignInvitation(msgId, accept = true, characterData = null) {
    const messages = this.getAllCampaignMessages();
    const msg = messages.find(m => m.id === msgId);
    if (!msg) throw new Error('Invitation message not found.');

    const cleanId = String(msg.campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    const effUser = msg.recipientUser || msg.playerName || this.getCurrentUsername() || 'Player';

    if (accept) {
      msg.invitationStatus = 'accepted';
      msg.read = true;
      this.saveAllCampaignMessages(messages);

      // Save character to campaign
      const char = characterData || (typeof window !== 'undefined' ? window.appController?.char : null);
      if (char) {
        this.saveCampaignSavedCharacter(cleanId, char, effUser);
      }

      // Automatically mark any invitation message received for that campaign as read
      this.markCampaignInvitationsRead(cleanId, effUser);

      // Notify GM
      this.sendCampaignMessage({
        type: 'CAMPAIGN_INVITATION_ACCEPTED',
        recipientRole: 'GM',
        recipientUser: msg.gmName || msg.senderUser,
        senderUser: effUser,
        campaignId: cleanId,
        campaignName: msg.campaignName,
        gmName: msg.gmName,
        playerName: effUser,
        characterName: char?.name || 'Hero',
        text: `Player "${effUser}" accepted your invitation to join campaign "${msg.campaignName}" (#${cleanId}) with character "${char?.name || 'Hero'}".`
      });

      // Sync to cloud if Supabase is connected
      if (typeof supabaseService !== 'undefined' && supabaseService?.client && supabaseService.isLoggedIn()) {
        const charPayload = char || { name: 'Hero', powerLevel: 10 };
        supabaseService.getCampaignByNameOrCode(cleanId).then(camp => {
          if (camp) {
            supabaseService.client.from('campaign_members').upsert([{
              campaign_id: camp.id,
              user_id: supabaseService.currentUser?.id,
              character_id: char?.id || 'hero',
              character_name: char?.name || 'Hero',
              player_name: effUser,
              power_level: char?.powerLevel || camp.power_level || 10,
              character_data: charPayload,
              is_online: true,
              last_seen: new Date().toISOString()
            }], { onConflict: 'campaign_id,user_id' }).then(() => {
              supabaseService.syncCloudCampaignsToLocal(this);
            });
          }
        }).catch(err => console.warn('Supabase invitation accept error:', err));
      }
    } else {
      msg.invitationStatus = 'declined';
      msg.read = true;
      this.saveAllCampaignMessages(messages);

      this.sendCampaignMessage({
        type: 'CAMPAIGN_INVITATION_DECLINED',
        recipientRole: 'GM',
        recipientUser: msg.gmName || msg.senderUser,
        senderUser: effUser,
        campaignId: cleanId,
        campaignName: msg.campaignName,
        gmName: msg.gmName,
        playerName: effUser,
        text: `Player "${effUser}" declined the invitation to join campaign "${msg.campaignName}" (#${cleanId}).`
      });
    }

    this.updateHeaderBadge();
    this.renderAllOpenViews();
    return msg;
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
      const exclUser = (m.excludedUser || '').toLowerCase();

      const isExplicitlyNamedRecipient = !!(
        currentUser && (
          recUser === currentUser ||
          (Array.isArray(m.recipientUsers) && m.recipientUsers.some(u => String(u).toLowerCase() === currentUser)) ||
          (Array.isArray(m.ccUsers) && m.ccUsers.some(u => String(u).toLowerCase() === currentUser))
        )
      );

      // Sender should NOT receive copies of messages they mass-mailed (or where they are excludedUser)
      // unless they specifically added themselves as a recipient
      if (currentUser && (exclUser === currentUser || (sndUser === currentUser && (m.isMassMail || m.type === 'CAMPAIGN_PARTICIPANTS_MESSAGE')))) {
        return !!m.selfIncludedBySender || isExplicitlyNamedRecipient;
      }

      if (isExplicitlyNamedRecipient) return true;
      if (sndUser && currentUser && sndUser === currentUser) {
        // Sender's own sent messages belong in the Sent folder, not Inbox, unless sent to self
        return recUser === currentUser;
      }
      if (m.recipientRole === 'GM') {
        return ownedIds.has(mCampId) || (currentUser && (m.gmName || '').toLowerCase() === currentUser);
      }
      if (m.recipientRole === 'USER') {
        return !recUser || !currentUser || recUser === currentUser;
      }
      if (m.recipientRole === 'PLAYER') {
        return !recUser || !currentUser || recUser === currentUser || (participatedIds.has(mCampId) && !ownedIds.has(mCampId));
      }
      // PARTICIPANTS or ALL
      return participatedIds.has(mCampId) || ownedIds.has(mCampId);
    });
  }

  /**
   * Filters messages sent by the current user (either explicitly via senderUser or as GM/player).
   */
  getSentMessagesForCurrentUser() {
    const all = this.getAllCampaignMessages();
    const currentUser = (this.getCurrentUsername() || '').toLowerCase();
    if (!currentUser) return [];

    return all.filter(m => {
      const sndUser = (m.senderUser || '').toLowerCase();
      if (sndUser && sndUser === currentUser) return true;
      if (!sndUser) {
        if (m.recipientRole === 'GM' && (m.playerName || '').toLowerCase() === currentUser) return true;
        if ((m.recipientRole === 'PARTICIPANTS' || m.recipientRole === 'USER' || m.recipientRole === 'ALL') && (m.gmName || '').toLowerCase() === currentUser) return true;
      }
      return false;
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

  markMessagesRead(msgIds = []) {
    if (!Array.isArray(msgIds) || msgIds.length === 0) return;
    const targetSet = new Set(msgIds);
    const readerKey = this.getTabSessionId();
    const messages = this.getAllCampaignMessages();
    let changed = false;
    messages.forEach(m => {
      if (targetSet.has(m.id)) {
        m.read = true;
        if (!Array.isArray(m.readBy)) m.readBy = [];
        if (!m.readBy.includes(readerKey)) m.readBy.push(readerKey);
        changed = true;
      }
    });
    if (changed) {
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

  /**
   * Returns true if a string is a mailing list description, group scope label, or generic role placeholder
   * rather than an individual user's username. Mailing lists must NEVER be added to Address Books.
   */
  isMailingListName(name) {
    const clean = String(name || '').trim();
    if (!clean) return true;
    const lower = clean.toLowerCase();
    if (
      lower === 'all campaign players' ||
      lower === 'campaign participants' ||
      lower === 'player' ||
      lower === 'gm' ||
      lower === 'user' ||
      lower === 'known user' ||
      lower.startsWith('participants of ') ||
      lower.includes('participants of ') ||
      lower.startsWith('all participants') ||
      clean.includes(',') ||
      clean.includes('(') ||
      clean.includes(')')
    ) {
      return true;
    }
    return false;
  }

  addKnownUser(username, meta = {}) {
    const clean = String(username || '').trim();
    if (this.isMailingListName(clean)) return null;
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
   * Returns all individual known users for the current user (never mailing lists):
   * - Anyone the user has ever sent a direct message to (added automatically)
   * - Anyone who has messaged the user
   * - GMs of campaigns the user participates in & players in campaigns the user GMs
   */
  getKnownUsers() {
    const myName = (this.getCurrentUsername() || '').trim().toLowerCase();
    if (!myName) return [];

    const map = new Map();

    const upsert = (uname, info = {}) => {
      const clean = String(uname || '').trim();
      if (this.isMailingListName(clean)) return;
      if (clean.toLowerCase() === myName) return;
      const key = clean.toLowerCase();
      const existing = map.get(key) || {};
      map.set(key, {
        username: existing.username || clean,
        notes: this.getUserNotes(clean) || info.notes || ''
      });
    };

    // Only add users if a message has been successfully exchanged between that user and the currently logged in user
    this.getAllCampaignMessages().forEach(m => {
      const sender = (m.senderUser || '').trim();
      const recip = (m.recipientUser || '').trim();
      const senderLower = sender.toLowerCase();
      const recipLower = recip.toLowerCase();

      // Case 1: Current user sent a direct message or CC to this user
      if (senderLower === myName) {
        if (recip && !this.isMailingListName(recip) && recipLower !== myName) {
          upsert(recip);
        }
        if (Array.isArray(m.ccUsers)) {
          m.ccUsers.forEach(cc => {
            const ccClean = String(cc || '').trim();
            if (ccClean && !this.isMailingListName(ccClean) && ccClean.toLowerCase() !== myName) {
              upsert(ccClean);
            }
          });
        }
      }

      // Case 2: Current user received a direct message from this user
      if (recipLower === myName) {
        if (sender && !this.isMailingListName(sender) && senderLower !== myName) {
          upsert(sender);
        }
      }

      // Case 3: Current user was CC'd on a message from this user
      if (Array.isArray(m.ccUsers) && m.ccUsers.some(u => String(u || '').trim().toLowerCase() === myName)) {
        if (sender && !this.isMailingListName(sender) && senderLower !== myName) {
          upsert(sender);
        }
      }
    });

    return Array.from(map.values()).sort((a, b) => a.username.localeCompare(b.username));
  }

  /**
   * Returns participated campaigns with GM-owned campaigns (isCreator: true) shown FIRST,
   * followed by other campaigns the user participates in.
   */
  getSortedParticipatedCampaigns() {
    const list = this.getBrowsableCampaigns().filter(c => c.isJoinedOrCreated || c.isCreator);
    list.sort((a, b) => {
      const aGM = a.isCreator ? 1 : 0;
      const bGM = b.isCreator ? 1 : 0;
      if (bGM !== aGM) return bGM - aGM;
      return (b.lastJoinedMs || b.createdAtMs || 0) - (a.lastJoinedMs || a.createdAtMs || 0);
    });
    return list;
  }

  /**
   * Returns all known participants of a given campaign, strictly excluding excludeUsername (e.g. the sender themselves).
   */
  getCampaignParticipants(campaignId, excludeUsername = '') {
    const cleanId = String(campaignId || '').trim().toUpperCase().replace(/^#+/, '');
    if (!cleanId) return [];
    const excludeLower = String(excludeUsername || '').trim().toLowerCase();
    const participants = new Map();

    const addParticipant = (uname) => {
      const clean = String(uname || '').trim();
      if (this.isMailingListName(clean)) return;
      const lower = clean.toLowerCase();
      if (excludeLower && lower === excludeLower) return;
      if (!participants.has(lower)) participants.set(lower, clean);
    };

    const info = this.getCampaignInfo(cleanId) || {};
    const histMatch = this.getCampaignHistory().find(c => c.campaignId === cleanId) || {};
    if (info.creatorName) addParticipant(info.creatorName);
    if (histMatch.creatorName) addParticipant(histMatch.creatorName);
    if (histMatch.playerName) addParticipant(histMatch.playerName);

    // Connected party members in this campaign
    this.getPartyMembers().forEach(m => {
      const mCampId = String(m.campaignId || this.getCampaignState().campaignId || '').trim().toUpperCase().replace(/^#+/, '');
      if (mCampId === cleanId && m.playerName) {
        addParticipant(m.playerName);
      }
    });

    // Saved campaign characters
    const savedChars = this.getCampaignSavedCharacters(cleanId);
    Object.values(savedChars).forEach(sc => {
      if (sc && sc.playerName) addParticipant(sc.playerName);
    });

    // Join requests for this campaign
    this.getJoinRequestsForGM(cleanId).forEach(r => {
      if (r && r.username && r.status !== 'rejected') addParticipant(r.username);
    });

    // Message history for this campaign
    this.getAllCampaignMessages().forEach(m => {
      if (String(m.campaignId || '').toUpperCase().replace(/^#+/, '') === cleanId) {
        if (m.gmName) addParticipant(m.gmName);
        if (m.playerName) addParticipant(m.playerName);
        if (m.senderUser) addParticipant(m.senderUser);
      }
    });

    return Array.from(participants.values());
  }

  /**
   * Returns the well-defined recipient scope choices for the Messaging Client:
   * - Participants of currently connected campaign (excludes the user themselves)
   * - Participants of all campaigns owned
   * - Participants of [campaign 1] (GM-owned campaigns first with 👑 icon; other participated campaigns without 👑 icon)
   */
  getRecipientScopeChoices() {
    const sortedCamps = this.getSortedParticipatedCampaigns();
    const choices = [
      {
        value: '',
        scopeType: 'DIRECT_ONLY',
        label: 'Direct Recipient(s) Only (To: / Known Users)',
        isGM: false
      },
      {
        value: 'CURRENT_CONNECTED',
        scopeType: 'CURRENT_CONNECTED',
        label: 'Participants of currently connected campaign (excludes the user themselves)',
        isGM: false
      },
      {
        value: 'ALL_OWNED',
        scopeType: 'ALL_OWNED',
        label: '👑 Participants of all campaigns owned',
        isGM: true
      }
    ];

    sortedCamps.forEach(c => {
      const isGM = !!c.isCreator;
      choices.push({
        value: `CAMP:${c.campaignId}`,
        campaignId: c.campaignId,
        campaignName: c.campaignName,
        scopeType: 'SINGLE_CAMPAIGN',
        isGM,
        label: `${isGM ? '👑 ' : ''}Participants of ${c.campaignName} (#${c.campaignId})`
      });
    });

    return choices;
  }

  /**
   * Sends a message to one or more Known Users / explicit usernames and/or a well-defined campaign participant scope:
   * - "CURRENT_CONNECTED": Participants of currently connected campaign (excludes the user themselves)
   * - "ALL_OWNED": Participants of all campaigns owned (excludes the user themselves)
   * - "CAMP:<id>": Participants of that specific campaign (excludes the user themselves)
   * - Or specific individual recipient(s) selected via Known Users checkboxes or typed in To:
   */
  sendDirectUserMessage({ toUser = '', toUsers = [], ccUsers = [], recipientScope = '', senderUser = '', campaignId = '', campaignName = '', gmName = '', text = '' } = {}) {
    const cleanText = String(text || '').trim();
    if (!cleanText) {
      throw new Error('Please enter a message to send.');
    }

    const effSender = String(senderUser || this.getCurrentUsername() || 'Player').trim();
    const senderLower = effSender.toLowerCase();

    // Sync sender's user notes so recipients can read them via the "i" button
    const myNotes = this.getUserNotes(effSender);
    if (myNotes) {
      this.setUserNotes(myNotes, effSender);
    }

    // Collect explicit user recipients from toUsers array and comma-separated toUser string (ignoring mailing list labels)
    const explicitRecipients = [];
    const seenRecip = new Set();
    const rawUserList = [
      ...(Array.isArray(toUsers) ? toUsers : []),
      ...(Array.isArray(toUser) ? toUser : String(toUser || '').split(','))
    ];
    rawUserList.forEach(u => {
      const clean = String(u || '').trim();
      if (!clean || this.isMailingListName(clean)) return;
      const lower = clean.toLowerCase();
      if (!seenRecip.has(lower)) {
        seenRecip.add(lower);
        explicitRecipients.push(clean);
      }
    });

    // Collect CC recipients (from checkboxed CC Known Users list)
    const ccRecipientList = [];
    const seenCC = new Set();
    (Array.isArray(ccUsers) ? ccUsers : String(ccUsers || '').split(',')).forEach(u => {
      const clean = String(u || '').trim();
      if (!clean || this.isMailingListName(clean)) return;
      const lower = clean.toLowerCase();
      if (!seenCC.has(lower) && !seenRecip.has(lower)) {
        seenCC.add(lower);
        ccRecipientList.push(clean);
      }
    });

    // Check if the sender specifically added themselves as a recipient in To: or CC:
    const selfIncludedBySender =
      explicitRecipients.some(u => u.toLowerCase() === senderLower) ||
      ccRecipientList.some(u => u.toLowerCase() === senderLower);

    const rawScope = String(recipientScope || campaignId || '').trim();
    const dispatchedMessages = [];

    // Helper to dispatch a campaign-participants scoped message.
    // Mailing lists are NEVER added to Known Users / Address Book, and sender does NOT receive a copy unless they specifically added themselves.
    const dispatchToCampaignParticipants = (targetCampId) => {
      const cleanId = String(targetCampId || '').trim().toUpperCase().replace(/^#+/, '');
      if (!cleanId) return;
      const info = this.getCampaignInfo(cleanId) || {};
      const histMatch = this.getCampaignHistory().find(c => c.campaignId === cleanId) || {};
      const effCampName = (campaignName || histMatch.campaignName || info.campaignName || cleanId).trim();
      const effGM = (gmName || histMatch.creatorName || info.creatorName || (histMatch.isCreator ? effSender : 'GM')).trim();
      const participants = this.getCampaignParticipants(cleanId, selfIncludedBySender ? '' : effSender);
      if (selfIncludedBySender && !participants.some(p => p.toLowerCase() === senderLower)) {
        participants.push(effSender);
      }

      const ccSuffix = ccRecipientList.length > 0 ? ` (CC: ${ccRecipientList.join(', ')})` : '';

      const msg = this.sendCampaignMessage({
        type: 'CAMPAIGN_PARTICIPANTS_MESSAGE',
        recipientRole: 'PARTICIPANTS',
        recipientUser: participants.length === 1 ? participants[0] : '',
        recipientUsers: participants,
        ccUsers: ccRecipientList,
        isMassMail: true,
        selfIncludedBySender,
        recipientScopeLabel: `Participants of ${effCampName}`,
        excludedUser: selfIncludedBySender ? '' : effSender,
        senderUser: effSender,
        campaignId: cleanId,
        campaignName: effCampName,
        gmName: effGM,
        playerName: effSender,
        text: `📢 Message from ${effSender} to Participants of "${effCampName}" (#${cleanId})${ccSuffix}: "${cleanText}"`
      });
      dispatchedMessages.push(msg);
    };

    const dispatchDirectMessages = (targetCampId = '') => {
      const cleanCampId = String(targetCampId || '').trim().toUpperCase().replace(/^#+/, '');
      const info = cleanCampId ? (this.getCampaignInfo(cleanCampId) || {}) : {};
      const histMatch = cleanCampId ? (this.getCampaignHistory().find(c => c.campaignId === cleanCampId) || {}) : {};
      const effCampName = (campaignName || histMatch.campaignName || info.campaignName || (cleanCampId ? cleanCampId : 'Direct Message')).trim();
      const isMultiRecipient = (explicitRecipients.length + ccRecipientList.length) > 1;
      const ccSuffix = ccRecipientList.length > 0 ? ` (CC: ${ccRecipientList.join(', ')})` : '';

      explicitRecipients.forEach(cleanTo => {
        const effGM = (gmName || histMatch.creatorName || info.creatorName || (this.ownsAnyCampaign() ? effSender : cleanTo)).trim();
        this.addKnownUser(cleanTo, {
          role: (effGM.toLowerCase() === cleanTo.toLowerCase()) ? 'GM' : 'Known User',
          campaignId: cleanCampId,
          campaignName: effCampName
        });
        ccRecipientList.forEach(ccUser => {
          this.addKnownUser(ccUser, {
            role: 'Known User',
            campaignId: cleanCampId,
            campaignName: effCampName
          });
        });

        const msg = this.sendCampaignMessage({
          type: 'DIRECT_MESSAGE',
          recipientRole: 'USER',
          recipientUser: cleanTo,
          recipientUsers: [cleanTo, ...ccRecipientList],
          ccUsers: ccRecipientList,
          isMassMail: isMultiRecipient,
          selfIncludedBySender,
          excludedUser: selfIncludedBySender ? '' : effSender,
          senderUser: effSender,
          campaignId: cleanCampId || 'DIRECT',
          campaignName: effCampName,
          gmName: effGM,
          playerName: effSender,
          text: `✉️ Direct Message from ${effSender} to ${cleanTo}${ccSuffix}: "${cleanText}"`
        });
        dispatchedMessages.push(msg);
      });
    };

    if (rawScope === 'CURRENT_CONNECTED') {
      const state = this.getCampaignState();
      if (!state || !state.isConnected || !state.campaignId) {
        throw new Error('You are not currently connected to an active campaign session.');
      }
      dispatchToCampaignParticipants(state.campaignId);
    } else if (rawScope === 'ALL_OWNED') {
      const owned = this.getSortedParticipatedCampaigns().filter(c => !!c.isCreator);
      if (owned.length === 0) {
        throw new Error('You do not currently own any campaigns as GM.');
      }
      owned.forEach(c => dispatchToCampaignParticipants(c.campaignId));
    } else if (rawScope.toUpperCase().startsWith('CAMP:')) {
      const targetCampId = rawScope.slice(5).trim().toUpperCase().replace(/^#+/, '');
      if (explicitRecipients.length === 0) {
        dispatchToCampaignParticipants(targetCampId);
      } else {
        dispatchDirectMessages(targetCampId);
      }
    } else {
      if (explicitRecipients.length === 0) {
        if (rawScope) {
          dispatchToCampaignParticipants(rawScope);
        } else {
          throw new Error('Please select or enter at least one recipient username or choose a Campaign Participants scope.');
        }
      } else {
        dispatchDirectMessages(rawScope);
      }
    }

    return dispatchedMessages.length === 1 ? dispatchedMessages[0] : dispatchedMessages;
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

    if (msg.type === 'APP_UPDATE_AVAILABLE' && msg.version) {
      if (typeof window !== 'undefined' && window.appController?.applyRemoteUpdateAlert) {
        window.appController.applyRemoteUpdateAlert(msg.version, msg.releaseNotes);
      }
      return;
    }

    if (msg.type === 'SESSION_ROLL' && msg.roll) {
      if (!this._sessionRolls) this._sessionRolls = [];
      const exists = this._sessionRolls.some(r => r.id === msg.roll.id);
      if (!exists) {
        this._sessionRolls.unshift(msg.roll);
        if (this._sessionRolls.length > 100) this._sessionRolls.pop();
        if (typeof window !== 'undefined' && window.appController?.renderSessionRollsAndGeneral) {
          window.appController.renderSessionRollsAndGeneral();
        }
      }
      return;
    }

    if (msg.type === 'SESSION_EVENT' && msg.event) {
      if (!this._sessionEvents) this._sessionEvents = this.getSessionEvents();
      const exists = this._sessionEvents.some(e => e.id === msg.event.id);
      if (!exists) {
        this._sessionEvents.unshift(msg.event);
        if (this._sessionEvents.length > 100) this._sessionEvents.pop();
        try { localStorage.setItem('mm3e_session_events', JSON.stringify(this._sessionEvents)); } catch {}
        if (typeof window !== 'undefined' && window.appController?.renderSessionRollsAndGeneral) {
          window.appController.renderSessionRollsAndGeneral();
        }
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

      case 'GM_AWARD_CHARACTER':
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.handleGMAwardCharacterMessage(msg);
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


  isSessionPopoutOpen() {
    return !!(this.sessionPopoutWindow && !this.sessionPopoutWindow.closed);
  }

  getSessionRolls(campaignId = null) {
    if (!this._sessionRolls) this._sessionRolls = [];
    return this._sessionRolls;
  }

  addSessionRoll(roll) {
    if (!roll) return;
    if (!this._sessionRolls) this._sessionRolls = [];
    const formatted = {
      id: roll.id || ('roll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)),
      characterName: roll.characterName || 'Hero',
      title: roll.title || 'Dice Roll',
      total: roll.total,
      rawDie: roll.rawDie !== undefined ? roll.rawDie : (roll.d20Roll !== undefined ? roll.d20Roll : null),
      modifier: roll.modifier,
      targetDC: roll.targetDC,
      outcome: roll.outcome,
      outcomeClass: roll.outcomeClass || 'neutral',
      outcomeDescription: roll.outcomeDescription || '',
      isNatural20: !!roll.isNatural20,
      extraText: roll.extraText || '',
      appliedToughnessPenalties: roll.appliedToughnessPenalties || null,
      timestamp: roll.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    this._sessionRolls.unshift(formatted);
    if (this._sessionRolls.length > 100) this._sessionRolls.pop();

    if (this.isUserConnected()) {
      const state = this.getCampaignState();
      this.broadcastMessage({
        type: 'SESSION_ROLL',
        campaignId: state.campaignId,
        roll: formatted
      });
    }

    if (typeof window !== 'undefined' && window.appController && typeof window.appController.renderSessionRollsAndGeneral === 'function') {
      try {
        window.appController.renderSessionRollsAndGeneral();
      } catch (e) {
        console.warn('renderSessionRollsAndGeneral error:', e);
      }
    }
  }

  clearSessionRolls() {
    this._sessionRolls = [];
    if (typeof window !== 'undefined' && window.appController?.renderSessionRollsAndGeneral) {
      window.appController.renderSessionRollsAndGeneral();
    }
  }

  getSessionEvents(campaignId = null) {
    if (!this._sessionEvents || this._sessionEvents.length === 0) {
      try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('mm3e_session_events') : null;
        this._sessionEvents = stored ? JSON.parse(stored) : [];
      } catch {
        this._sessionEvents = [];
      }
    }
    return this._sessionEvents;
  }

  addSessionEvent({ type = 'general', text = '', icon = '📜', timestamp = null, broadcast = true } = {}) {
    if (!text) return;
    if (!this._sessionEvents) this._sessionEvents = this.getSessionEvents();
    const event = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      type,
      text,
      icon,
      timestamp: timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    this._sessionEvents.unshift(event);
    if (this._sessionEvents.length > 100) this._sessionEvents.pop();

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_session_events', JSON.stringify(this._sessionEvents));
      }
    } catch {}

    if (broadcast && this.isUserConnected()) {
      const state = this.getCampaignState();
      this.broadcastMessage({
        type: 'SESSION_EVENT',
        campaignId: state.campaignId,
        event
      });
    }

    if (typeof window !== 'undefined' && window.appController?.renderSessionRollsAndGeneral) {
      window.appController.renderSessionRollsAndGeneral();
    }
  }

  getEligibleRunningSessionsCount() {
    const campaigns = this.getBrowsableCampaigns();
    const activeSessions = campaigns.filter(c => {
      const isMember = !!(c.isCreator || c.isJoinedOrCreated || this.isUserMemberOfCampaign(c.campaignId, c.campaignName));
      const regInfo = this.getCampaignInfo(c.campaignId) || {};
      const isOnHiatus = !!(c.isOnHiatus || regInfo.isOnHiatus);
      const isLive = !isOnHiatus && this.isSessionActive(c.campaignId);
      return isMember && isLive;
    });
    return activeSessions.length;
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
        labelBtn.textContent = 'Sessions:';
        labelBtn.title = `Active Session: ${state.campaignName || ''} (#${state.campaignId}) [PL ${state.powerLevel || 10}]`;
      }
    } else {
      if (btn) {
        btn.innerHTML = `🛡️ Campaigns`;
        btn.style.borderColor = '';
        btn.style.color = '';
      }
      if (labelBtn) {
        labelBtn.textContent = 'Sessions:';
        labelBtn.title = 'Click to open Campaign Browser & Sessions';
      }
    }

    // Update new message count next to the user icon AND next to the Campaign Messages dropdown menu item (with pulsing effect when unread > 0)
    // Requirement v3.86: Always show the messages icon if a user is logged in
    const unreadCount = this.getUnreadMessageCount();
    const msgBtn = document.getElementById('btn-header-messages');
    const msgCountEl = document.getElementById('header-message-count-badge');
    const isUserLoggedIn = (typeof supabaseService !== 'undefined' && supabaseService?.isLoggedIn)
      ? supabaseService.isLoggedIn()
      : !!(this.getCurrentUsername && this.getCurrentUsername());

    if (msgBtn && msgCountEl) {
      if (isUserLoggedIn) {
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

    // Update running sessions count badge to the left of the Campaigns dropdown (v3.91)
    const runningSessionsCount = this.getEligibleRunningSessionsCount();
    const sessionsBtn = document.getElementById('btn-header-active-sessions');
    const sessionsBadge = document.getElementById('header-sessions-count-badge');
    if (sessionsBtn && sessionsBadge) {
      if (isUserLoggedIn && runningSessionsCount > 0) {
        sessionsBtn.style.display = 'inline-flex';
        sessionsBadge.textContent = String(runningSessionsCount);
        sessionsBtn.title = `${runningSessionsCount} active game session${runningSessionsCount === 1 ? '' : 's'} available to join`;
      } else {
        sessionsBtn.style.display = 'none';
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
  generateSessionTrackerHTML() {
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
          ${this.isUserCreatorOfCampaign(state) ? `
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.45rem; padding-top: 0.45rem; border-top: 1px dashed rgba(255,255,255,0.15); font-size: 10pt; flex-wrap: wrap;">
              <span style="color: var(--hero-gold); font-weight: 800;">👑 GM Session Controls:</span>
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
        <div style="background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 6px; padding: 1.25rem 1rem; margin-bottom: 0.75rem; text-align: center; color: var(--text-muted); font-size: 10pt;">
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-bright); margin-bottom: 0.35rem;">⚪ No Active Game Session Connected</div>
          <div>Pick a running session from the Campaign dropdown in the top header, or select "🎮 Join Session" in the Campaign Browser to connect.</div>
        </div>
      `;
    }

    // Hero Attachment Status Bar
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
        <div style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted); font-size: 10pt; font-style: italic;">
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
                ${state.isHost ? `
                  <div class="menu-dropdown-container gm-member-dropdown" style="position: relative; display: inline-block;">
                    <button type="button" class="btn btn-outline gm-member-toggle" data-charname="${m.characterName}" data-memberid="${m.id}" title="GM Options & Change Report" style="border: none; background: none; padding: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-bright); cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem;">
                      <span>${m.characterName}</span>
                      ${m.hasDiffAlert ? '<span class="party-char-alert-badge" title="Character updated since last session!" style="background: #ef4444; color: #fff; font-size: 10pt; font-weight: 900; width: 18px; height: 18px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">!</span>' : ''}
                      <span style="font-size: 10pt; color: var(--text-muted);">▾</span>
                    </button>
                    <div class="menu-dropdown-panel gm-member-panel" style="position: absolute; top: calc(100% + 4px); left: 0; min-width: 230px; border-radius: 6px; z-index: 2500; padding: 0.35rem 0; display: none; background: var(--bg-card); border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
                      <div class="menu-dropdown-heading" style="font-size: 10pt; font-weight: 800; text-transform: uppercase; color: var(--hero-gold); padding: 0.35rem 0.85rem 0.2rem 0.85rem;">${m.characterName} Options</div>
                      <button type="button" class="menu-dropdown-item btn-gm-view-change-report" data-charname="${m.characterName}" data-memberid="${m.id}" style="font-size: 10pt; color: ${m.hasDiffAlert ? 'var(--hero-gold)' : 'var(--text-bright)'}; font-weight: 700; cursor: pointer;">
                        <span class="menu-item-icon">📋</span> Report (Changes since last session)
                      </button>
                      ${m.hasDiffAlert ? `
                        <button type="button" class="menu-dropdown-item btn-gm-approve-character-changes" data-charname="${m.characterName}" data-memberid="${m.id}" style="font-size: 10pt; color: var(--hero-green); font-weight: 800; cursor: pointer;">
                          <span class="menu-item-icon">✅</span> Approve Changes
                        </button>
                      ` : ''}
                      <button type="button" class="menu-dropdown-item btn-inspect-member-sheet" data-memberid="${m.id}" style="font-size: 10pt; color: var(--hero-blue); font-weight: 700; cursor: pointer;">
                        <span class="menu-item-icon">👁️</span> View Character Sheet
                      </button>
                    </div>
                  </div>
                ` : `
                  <strong style="font-size: 1.05rem; color: var(--text-bright); display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span>${m.characterName}</span>
                    ${m.hasDiffAlert ? '<span class="party-char-alert-badge" title="Character updated since last session!" style="background: #ef4444; color: #fff; font-size: 10pt; font-weight: 900; width: 18px; height: 18px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">!</span>' : ''}
                  </strong>
                `}
                ${altBadge}
                <span style="font-size: 10pt; color: var(--text-muted); font-weight: 600;">Player: ${m.playerName}</span>
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
              <div style="display: inline-flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                <span style="font-size: 10pt; color: var(--text-muted); font-weight: 700;">Conditions:</span>
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

    return `
      <div class="tracker-section-session-monitor ${isConnectedToLiveSession ? 'session-live' : ''}">
        ${connectionBar}
        ${charAttachmentBar}
        ${memberCards}
      </div>
    `;
  }

  generateCampaignBrowserHTML() {
    const browserCampaigns = this.getBrowsableCampaigns();
    const allStoredChars = (typeof storageManager !== 'undefined' ? storageManager.getCharacters() : (typeof window !== 'undefined' && window.appController?.storage?.getCharacters ? window.appController.storage.getCharacters() : [])) || [];
    if (typeof window !== 'undefined' && window.appController?.char && !allStoredChars.some(c => c.id === window.appController.char.id)) {
      allStoredChars.push(window.appController.char);
    }
    const storedChars = allStoredChars;
    const bf = this.browserFilters || { query: '', searchName: true, searchDesc: true, searchPL: false, plMin: 1, plMax: 20, sortBy: 'default', hideHiatus: false };
    const state = this.getCampaignState();

    const browserCards = browserCampaigns.map(c => {
      const cLogs = this.getCampaignSessionLogs(c.campaignId);
      const regInfo = this.getCampaignInfo(c.campaignId) || {};
      const isOnHiatus = !!(c.isOnHiatus || regInfo.isOnHiatus);
      const isPublic = !!(c.isPublic || regInfo.isPublic);
      const notesText = String(c.notes ?? regInfo.notes ?? '');
      const pendingTransfer = c.pendingTransfer || regInfo.pendingTransfer || null;
      const activeSession = this.getActiveSessionInfo(c.campaignId);
      const isLive = !isOnHiatus && !!activeSession;
      const sessionStartDate = activeSession?.startedAtDate || (activeSession?.startedAtMs ? new Date(activeSession.startedAtMs).toLocaleDateString() : new Date().toLocaleDateString());
      const sessionStartTime = activeSession?.startedAtTime || (activeSession?.startedAtMs ? new Date(activeSession.startedAtMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      const isCur = state.isConnected && isLive && state.campaignId === c.campaignId;
      const attached = storedChars.filter(ch => (ch.campaignId && ch.campaignId.toUpperCase().replace(/^#+/, '') === c.campaignId) || (ch.campaign && ch.campaign.trim().toLowerCase() === (c.campaignName || '').toLowerCase()));
      const attachedStr = attached.map(ch => ch.name || 'Hero').join(', ') || 'None';
      const isCreator = !!c.isCreator;
      const isMember = isCreator || !!c.isJoinedOrCreated || this.isUserMemberOfCampaign(c.campaignId, c.campaignName);
      const hasCharInParty = attached.length > 0;
      const attachedCharName = attached[0]?.name || '';
      const pendingReqCount = isCreator ? this.getJoinRequestsForGM(c.campaignId).filter(r => r.status === 'pending').length : 0;

      return `
        <div class="campaign-browser-card" data-campid="${c.campaignId}" style="background: var(--bg-card); border: 1px solid ${isOnHiatus ? 'rgba(245, 158, 11, 0.45)' : (isCreator || isMember ? 'rgba(59, 130, 246, 0.5)' : 'var(--border-color)')}; border-radius: 6px; padding: 0.65rem 0.85rem; margin-bottom: 0.55rem; display: flex; flex-direction: column; gap: 0.45rem;">
          <!-- Row 1: Left has Campaign Name, GM, Status, badges. Right has Logs & Unified Actions -->
          <div class="campaign-card-row1" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.55rem; width: 100%;">
            <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
              <strong class="campaign-card-name" style="font-size: 12pt; font-weight: 800; color: var(--text-bright);">${c.isCreator ? '👑 ' : ''}${this.escapeHTML(c.campaignName)}</strong>
              <span class="campaign-card-gm" style="font-size: 11pt; color: var(--text-muted); font-weight: 600;">👑 GM: <strong style="color: var(--text-bright); font-size: 11pt;">${this.escapeHTML(c.creatorName || 'Unknown')}</strong></span>
              <span class="campaign-card-status" style="font-size: 11pt; font-weight: 700; ${isPublic ? 'color: #10b981; background: rgba(16, 185, 129, 0.12);' : 'color: var(--text-muted); background: rgba(255,255,255,0.05);'} padding: 1px 6px; border-radius: 4px;">${isPublic ? '🌐 Public' : '🔒 Private'}</span>
              <span class="badge-campaign-id" style="font-size: 10.5pt; background: rgba(0,0,0,0.18); padding: 1px 6px; border-radius: 4px; font-weight: 800; color: var(--hero-blue);">ID: #${c.campaignId}</span>
              <span class="badge-campaign-pl" data-campid="${c.campaignId}" style="font-size: 10.5pt; color: var(--hero-gold); font-weight: 800;">PL ${c.powerLevel || 10}</span>
              ${hasCharInParty
                ? `<span class="badge-joined-campaign" data-gm-owned="${isCreator ? '1' : '0'}" title="Campaign you participate in with character in party" style="font-size: 10.5pt; font-weight: 800; color: var(--hero-blue); background: rgba(59, 130, 246, 0.16); border: 1px solid rgba(59, 130, 246, 0.45); padding: 1px 6px; border-radius: 4px;">🌟 In Party${attachedStr !== 'None' ? ` (${this.escapeHTML(attachedStr)})` : ''}</span>`
                : (isMember && !isCreator
                  ? `<span style="font-size: 10.5pt; font-weight: 800; color: var(--hero-blue); background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.35); padding: 1px 6px; border-radius: 4px;">👤 Member</span>`
                  : (!isMember && !isCreator
                    ? `<span style="font-size: 10.5pt; font-weight: 700; color: var(--hero-green); background: rgba(16, 185, 129, 0.14); border: 1px solid rgba(16, 185, 129, 0.4); padding: 1px 6px; border-radius: 4px;">🌐 Open to Join</span>`
                    : ''
                  )
                )
              }
            </div>

            <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
              ${isMember ? `
                <!-- Dropdown: Campaign Session Logs -->
                <div class="menu-dropdown-container campaign-logs-dropdown" style="position: relative; display: inline-block;">
                  <button type="button" class="btn btn-outline campaign-logs-toggle" data-campid="${c.campaignId}" title="View previous session logs" style="font-size: 10pt; padding: 2px 9px; font-weight: 700; color: var(--hero-purple, #a855f7); border-color: rgba(168, 85, 247, 0.55); background: rgba(168, 85, 247, 0.08); cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>📜 Logs ▾</span>
                    ${cLogs.length > 0 ? `<span style="background: rgba(168, 85, 247, 0.25); color: #d8b4fe; font-size: 10pt; font-weight: 800; padding: 0px 5px; border-radius: 999px;">${cLogs.length}</span>` : ''}
                  </button>
                  <div class="menu-dropdown-panel campaign-logs-panel" style="position: absolute; top: calc(100% + 4px); right: 0; left: auto; min-width: 260px; max-height: calc(6 * 44px + 36px); overflow-y: auto; border-radius: 6px; z-index: 2500; padding: 0.35rem 0;">
                    <div class="menu-dropdown-heading" style="font-size: 10pt; font-weight: 800; text-transform: uppercase; color: var(--hero-purple, #a855f7); padding: 0.35rem 0.85rem 0.2rem 0.85rem;">Previous Session Logs</div>
                    ${cLogs.length === 0 ? `
                      <div style="font-size: 10pt; color: var(--text-muted); font-style: italic; padding: 0.5rem 0.85rem;">No previous session logs recorded yet.</div>
                    ` : cLogs.map(log => `
                      <button type="button" class="menu-dropdown-item btn-view-session-log" data-campid="${c.campaignId}" data-logid="${log.id}" style="font-size: 10pt; color: var(--text-bright); font-weight: 600; cursor: pointer; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 0.45rem 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: left; width: 100%;">
                        <span style="font-weight: 700; color: var(--hero-cyan);">${this.escapeHTML(log.title || 'Session Log')}</span>
                        <span style="font-size: 10pt; color: var(--text-muted);">${this.escapeHTML(log.date || '')} ${log.time ? '• ' + this.escapeHTML(log.time) : ''}</span>
                      </button>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Unified Actions Dropdown (Includes GM Controls when creator) -->
              <div class="menu-dropdown-container campaign-actions-dropdown" style="position: relative; display: inline-block;">
                <button type="button" class="btn btn-outline campaign-actions-toggle" data-campid="${c.campaignId}" title="Campaign Actions" style="font-size: 10pt; padding: 2px 9px; font-weight: 700; color: var(--hero-blue); border-color: rgba(59, 130, 246, 0.55); background: rgba(59, 130, 246, 0.08); cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem;">
                  <span>⚡ Actions ▾</span>
                  ${pendingReqCount > 0 ? `<span style="background: var(--hero-gold); color: #000; font-size: 10pt; font-weight: 900; padding: 0px 5px; border-radius: 999px;">${pendingReqCount}</span>` : ''}
                </button>
                <div class="menu-dropdown-panel campaign-actions-panel" style="position: absolute; top: calc(100% + 4px); right: 0; left: auto; min-width: 250px; border-radius: 6px; z-index: 2500; padding: 0.35rem 0;">
                  <div class="menu-dropdown-heading" style="font-size: 10pt; font-weight: 800; text-transform: uppercase; color: var(--text-muted); padding: 0.35rem 0.85rem 0.2rem 0.85rem;">Campaign Actions</div>
                  ${isLive && hasCharInParty ? `
                    <button type="button" class="menu-dropdown-item btn-join-game-session" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--hero-green); font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">🎮</span> Join Game Session
                    </button>
                  ` : ''}
                  ${!isMember ? `
                    <button type="button" class="menu-dropdown-item btn-browser-apply-campaign" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; color: var(--hero-blue); font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">📝</span> Apply to Join
                    </button>
                  ` : ''}
                  ${isMember && !hasCharInParty ? `
                    <button type="button" class="menu-dropdown-item btn-browser-attach-char" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; color: var(--hero-blue); font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">📎</span> Attach Character
                    </button>
                  ` : ''}
                  ${hasCharInParty ? `
                    <button type="button" class="menu-dropdown-item btn-load-attached-char" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--hero-purple); font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">🦸</span> Load Hero (${this.escapeHTML(attachedStr)})
                    </button>
                  ` : ''}
                  <button type="button" class="menu-dropdown-item btn-copy-campaign-link" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--text-bright); font-weight: 600; cursor: pointer;">
                    <span class="menu-item-icon">📋</span> Copy Campaign Link
                  </button>
                  ${!c.isCreator && c.creatorName ? `
                    <button type="button" class="menu-dropdown-item btn-browser-message-gm" data-gm="${(c.creatorName || '').replace(/"/g, '&quot;')}" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; color: var(--hero-blue); font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">✉️</span> Message GM (${this.escapeHTML(c.creatorName)})
                    </button>
                  ` : ''}
                  ${hasCharInParty ? `
                    <div class="menu-dropdown-separator" style="height: 1px; background-color: var(--border-color); margin: 0.35rem 0;"></div>
                    <button type="button" class="menu-dropdown-item btn-remove-char-from-party" data-campid="${c.campaignId}" data-charname="${(attachedCharName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; color: var(--hero-gold, #f59e0b); font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">👤❌</span> Remove ${this.escapeHTML(attachedCharName || 'Character')} from Party
                    </button>
                  ` : ''}
                  ${isMember && !c.isCreator ? `
                    <div class="menu-dropdown-separator" style="height: 1px; background-color: var(--border-color); margin: 0.35rem 0;"></div>
                    <button type="button" class="menu-dropdown-item btn-leave-campaign-membership" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; color: var(--hero-red); font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">🚪</span> Leave Campaign
                    </button>
                  ` : ''}

                  <!-- GM Controls Section (Filtered strictly by permission: creator only) -->
                  ${c.isCreator ? `
                    <div class="menu-dropdown-separator" style="height: 1px; background-color: rgba(255,255,255,0.12); margin: 0.35rem 0;"></div>
                    <div class="menu-dropdown-heading" style="font-size: 10pt; font-weight: 800; text-transform: uppercase; color: var(--hero-gold); padding: 0.35rem 0.85rem 0.2rem 0.85rem;">👑 GM Controls</div>

                    <!-- Set PL Stepper -->
                    <div class="menu-dropdown-item-control" style="padding: 0.35rem 0.85rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; font-size: 10pt; color: var(--text-bright);">
                      <span style="font-weight: 700; color: var(--hero-gold); white-space: nowrap;">Set Target PL:</span>
                      <div style="display: inline-flex; align-items: center; gap: 0.35rem;">
                        <button type="button" class="btn btn-outline btn-stepper-camp-pl" data-campid="${c.campaignId}" data-dir="-1" title="Decrease PL" style="padding: 1px 7px; font-size: 10pt; font-weight: 800; cursor: pointer; color: var(--text-bright); border-color: var(--border-color);">-</button>
                        <span class="stepper-value-camp-pl" data-campid="${c.campaignId}" style="min-width: 44px; text-align: center; font-weight: 800; color: var(--hero-cyan); font-size: 10.5pt;">PL ${c.powerLevel || 10}</span>
                        <button type="button" class="btn btn-outline btn-stepper-camp-pl" data-campid="${c.campaignId}" data-dir="1" title="Increase PL" style="padding: 1px 7px; font-size: 10pt; font-weight: 800; cursor: pointer; color: var(--text-bright); border-color: var(--border-color);">+</button>
                      </div>
                    </div>

                    <!-- Override PL Setting -->
                    <div class="menu-dropdown-item-control" style="padding: 0.35rem 0.85rem; font-size: 10pt;">
                      <label style="display: inline-flex; align-items: center; gap: 0.45rem; cursor: pointer; user-select: none; color: var(--text-bright); font-weight: 600;" title="When checked, characters of any Power Level can join without PL restrictions">
                        <input type="checkbox" class="chk-campaign-dont-enforce-pl chk-campaign-override-pl" data-campid="${c.campaignId}" ${c.dontEnforcePL ? 'checked' : ''} style="cursor: pointer; width: 15px; height: 15px; accent-color: var(--hero-gold);">
                        <span>Override PL (Don't enforce limits)</span>
                      </label>
                    </div>

                    <!-- Start / End Game Session -->
                    ${!isOnHiatus ? (isLive ? `
                      <button type="button" class="menu-dropdown-item btn-gm-toggle-session" data-action="end" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--hero-red); font-weight: 700; cursor: pointer;">
                        <span class="menu-item-icon">⏹️</span> End Game Session
                      </button>
                    ` : `
                      <button type="button" class="menu-dropdown-item btn-gm-toggle-session" data-action="start" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--hero-green); font-weight: 700; cursor: pointer;">
                        <span class="menu-item-icon">▶️</span> Start Game Session
                      </button>
                    `) : ''}

                    <!-- Review Join Requests -->
                    <button type="button" class="menu-dropdown-item btn-open-join-requests" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--hero-blue); font-weight: 700; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                      <span style="display: flex; align-items: center; gap: 0.45rem;">
                        <span class="menu-item-icon">🔔</span> Review Join Requests
                      </span>
                      ${pendingReqCount > 0 ? `<span style="background: var(--hero-blue); color: #fff; font-size: 10pt; font-weight: 800; padding: 0px 6px; border-radius: 999px;">${pendingReqCount}</span>` : ''}
                    </button>

                    <!-- Campaign Characters -->
                    <button type="button" class="menu-dropdown-item btn-open-campaign-characters" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; color: var(--hero-gold); font-weight: 700; display: flex; align-items: center; gap: 0.45rem; cursor: pointer;">
                      <span class="menu-item-icon">👥</span> Campaign Characters
                    </button>

                    <!-- Unlist / Make Public -->
                    <button type="button" class="menu-dropdown-item btn-gm-toggle-public" data-campid="${c.campaignId}" data-public="${isPublic ? '1' : '0'}" style="font-size: 10pt; color: ${isPublic ? '#10b981' : 'var(--hero-blue)'}; font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">${isPublic ? '🌐' : '📢'}</span> ${isPublic ? 'Unlist (Make Private)' : 'Make Public (Advertise)'}
                    </button>

                    <!-- Hiatus Toggle -->
                    ${isOnHiatus ? `
                      <button type="button" class="menu-dropdown-item btn-gm-toggle-hiatus" data-action="resume" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--hero-green); font-weight: 700; cursor: pointer;">
                        <span class="menu-item-icon">▶️</span> Resume Campaign
                      </button>
                    ` : `
                      <button type="button" class="menu-dropdown-item btn-gm-toggle-hiatus" data-action="hiatus" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--hero-gold); font-weight: 700; cursor: pointer;">
                        <span class="menu-item-icon">⏸️</span> Put on Hiatus
                      </button>
                    `}

                    <!-- Ownership Transfer -->
                    ${pendingTransfer && pendingTransfer.status === 'pending' ? `
                      <button type="button" class="menu-dropdown-item btn-gm-withdraw-transfer" data-campid="${c.campaignId}" style="font-size: 10pt; color: var(--hero-gold); font-weight: 700; cursor: pointer;">
                        <span class="menu-item-icon">↩️</span> Withdraw Transfer Offer
                      </button>
                    ` : `
                      <button type="button" class="menu-dropdown-item btn-gm-transfer-ownership" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; color: var(--hero-gold); font-weight: 700; cursor: pointer;">
                        <span class="menu-item-icon">👑</span> Transfer Ownership
                      </button>
                    `}

                    <div class="menu-dropdown-separator" style="height: 1px; background-color: rgba(255,255,255,0.1); margin: 0.35rem 0;"></div>
                    <!-- Delete Campaign -->
                    <button type="button" class="menu-dropdown-item btn-gm-delete-campaign" data-campid="${c.campaignId}" data-campname="${(c.campaignName || '').replace(/"/g, '&quot;')}" style="font-size: 10pt; color: var(--hero-red); font-weight: 700; cursor: pointer;">
                      <span class="menu-item-icon">🗑️</span> Delete Campaign
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2: Left has Session Running state (with start time/date if live). Right has expandable notes -->
          <div class="campaign-card-row2" style="display: flex; justify-content: space-between; align-items: center; gap: 0.65rem; width: 100%; margin-top: 0.2rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              ${isOnHiatus ? `
                <span class="campaign-session-status-badge session-hiatus" style="color: var(--hero-gold); font-weight: 800; font-size: 10pt; display: inline-flex; align-items: center; gap: 0.35rem;">⏸️ On Hiatus</span>
              ` : (isLive ? `
                <span class="campaign-session-status-badge session-active" style="color: #10b981; font-weight: 800; font-size: 10pt; display: inline-flex; align-items: center; gap: 0.35rem;">🟢 Session Running • Started: ${this.escapeHTML(sessionStartDate)} at ${this.escapeHTML(sessionStartTime)}</span>
              ` : `
                <span class="campaign-session-status-badge session-inactive" style="color: var(--text-muted); font-size: 10pt; display: inline-flex; align-items: center; gap: 0.35rem;">⚪ No Session Running</span>
              `)}
              ${isCur ? '<span style="font-size: 10pt; font-weight: 800; color: var(--hero-green);">[In Session]</span>' : ''}
            </div>

            <div class="campaign-notes-wrapper" style="display: flex; align-items: center; gap: 0.45rem; flex: 1; min-width: 250px; justify-content: flex-end;">
              <label style="font-size: 10pt; font-weight: 700; color: ${isCreator ? 'var(--hero-gold)' : 'var(--text-muted)'}; white-space: nowrap;">📝 Notes:</label>
              ${isCreator ? `
                <textarea class="textarea-campaign-notes" rows="1" data-campid="${c.campaignId}" placeholder="Add campaign notes or description (expands up to 3 rows)..." style="flex: 1; min-width: 150px; max-width: 600px; font-size: 10pt; background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 6px; resize: vertical; line-height: 1.35; max-height: 4.5em;">${notesText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
              ` : (notesText ? `
                <div class="display-campaign-notes" style="font-size: 10pt; color: var(--text-muted); background: rgba(0,0,0,0.15); border-left: 3px solid var(--hero-blue); padding: 0.2rem 0.5rem; border-radius: 3px; max-height: 4.5em; overflow-y: auto; white-space: pre-wrap; flex: 1; max-width: 600px;">${notesText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
              ` : `
                <span style="font-size: 10pt; color: var(--text-muted); font-style: italic;">No campaign notes recorded</span>
              `)}
            </div>
          </div>
        </div>
      `;
    }).join('');

    const isLoggedIn = (typeof this.isUserLoggedIn === 'function')
      ? this.isUserLoggedIn()
      : (typeof supabaseService !== 'undefined' && !!supabaseService?.isLoggedIn?.());
    if (typeof supabaseService !== 'undefined' && supabaseService && typeof supabaseService.isLoggedIn === 'function' && supabaseService.isLoggedIn() && typeof supabaseService.syncCloudCampaignsToLocal === 'function' && !this._isSyncingCampaigns) {
      this._isSyncingCampaigns = true;
      supabaseService.syncCloudCampaignsToLocal(this).catch(err => {
        console.warn('syncCloudCampaignsToLocal error:', err);
      }).finally(() => { this._isSyncingCampaigns = false; });
    }
    const topDirectoryBar = `
      <div style="background: var(--bg-card); border: 1.5px solid rgba(56, 189, 248, 0.55); border-radius: 6px; padding: 0.75rem 0.85rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.65rem; box-shadow: 0 2px 10px rgba(56, 189, 248, 0.08);">
        <div style="display: flex; align-items: baseline; gap: 0.75rem; flex-wrap: wrap;">
          <span style="font-weight: 800; color: var(--text-bright); font-size: 1.05rem; white-space: nowrap;">Campaign Directory</span>
          <span style="font-size: 10pt; color: var(--text-muted);">Apply to join a campaign by name or paste a GM's Campaign Link, or create and advertise your own campaign.</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
          <input type="text" class="input-join-campaign-link" placeholder="Paste campaign link or campaign name..." style="background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.28rem 0.6rem; font-size: 10pt; min-width: 350px;" />
          <button type="button" class="btn btn-outline btn-trigger-join-campaign" style="font-size: 10pt; font-weight: 700; padding: 0.25rem 0.75rem; color: var(--hero-blue); border-color: var(--hero-blue);">🔗 Join Campaign</button>
          ${isLoggedIn ? `
            <button type="button" class="btn btn-primary btn-trigger-create-campaign" style="font-size: 10pt; font-weight: 800; padding: 0.25rem 0.75rem; cursor: pointer;">➕ Create Campaign</button>
          ` : `
            <button type="button" class="btn btn-primary btn-trigger-create-campaign" disabled style="font-size: 10pt; font-weight: 800; padding: 0.25rem 0.75rem; opacity: 0.5; cursor: not-allowed; background: var(--bg-input); color: var(--text-muted); border-color: var(--border-color);" title="User must be logged in to create and manage campaigns">➕ Create Campaign</button>
            <span style="font-size: 10pt; color: var(--text-muted); font-style: italic;">User must be logged in to create and manage campaigns.</span>
          `}
        </div>
      </div>
    `;

    const browserSection = `
      <div class="tracker-section-campaign-browser">
        <div class="tracker-section-header">
          <div style="display: flex; align-items: center; gap: 0.55rem; flex-wrap: wrap;">
            <span style="font-size: 1.15rem; font-weight: 900; color: var(--hero-cyan); text-transform: uppercase; letter-spacing: 0.03em;">🌐 Campaign Browser (${browserCampaigns.length})</span>
            <span style="font-size: 10pt; font-weight: 800; color: var(--hero-gold); background: rgba(234, 179, 8, 0.14); border: 1px solid rgba(234, 179, 8, 0.4); padding: 2px 8px; border-radius: 999px;">🌟 Joined or owned campaigns shown first</span>
          </div>
          <span style="font-size: 10pt; color: var(--text-muted);">Browse all campaigns you are eligible to join, manage your campaigns, or advertise public campaigns</span>
        </div>

        <div class="campaign-browser-toolbar" style="display: flex; flex-direction: column; gap: 0.5rem; border-left: 5px solid var(--hero-blue);">
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
              <div class="pl-range-inputs-group" style="display: inline-flex; align-items: center; gap: 0.35rem; opacity: ${bf.searchPL ? '1' : '0.65'};">
                <input type="number" class="input-pl-range-min" min="1" max="20" value="${bf.plMin}" style="width: 36px; text-align: center; background: var(--bg-input); color: var(--hero-gold); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; font-size: 10pt; font-weight: 800; -moz-appearance: textfield; appearance: textfield;" />
                <span style="font-size: 10pt; color: var(--text-muted); font-weight: 700; padding: 0 1px;">to</span>
                <input type="number" class="input-pl-range-max" min="1" max="20" value="${bf.plMax}" style="width: 36px; text-align: center; background: var(--bg-input); color: var(--hero-gold); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; font-size: 10pt; font-weight: 800; -moz-appearance: textfield; appearance: textfield;" />
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.6rem; flex-wrap: wrap; border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 0.4rem; font-size: 10pt;">
            <div style="display: inline-flex; align-items: center; gap: 0.45rem;">
              <span style="color: var(--text-muted); font-weight: 700;">Sort by:</span>
              <select class="sel-browser-sort" style="background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 8px; font-size: 10pt; font-weight: 700;">
                <option value="default" ${bf.sortBy === 'default' ? 'selected' : ''}>🌟 Default (Joined / Owned First)</option>
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

        <div class="campaign-browser-toolbar-separator" style="height: 3px; background: linear-gradient(90deg, var(--hero-blue) 0%, var(--hero-cyan) 40%, rgba(59, 130, 246, 0.25) 80%, transparent 100%); margin: 0.45rem 0 0.95rem 0; border-radius: 2px;"></div>

        <div class="campaign-browser-list-container">
          ${browserCampaigns.length === 0 ? `
            <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 10pt; font-style: italic;">
              No campaigns match your current browser filters. Create a campaign, join by name/link, or adjust your search filters above.
            </div>
          ` : browserCards}
        </div>
      </div>
    `;

    const mainBrowserContent = topDirectoryBar + browserSection;
    const hasActiveLog = !!(this._activeViewedSessionLog);
    const splitRatio = this._logDividerTopRatio || 0.5;

    return `
      <div class="campaign-browser-split-wrapper" id="campaign-browser-split-wrapper" style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow: hidden; box-sizing: border-box;">
        <div class="campaign-browser-top-pane" id="campaign-browser-top-pane" style="${hasActiveLog ? `flex: 0 0 ${splitRatio * 100}%; height: ${splitRatio * 100}%;` : 'flex: 1 1 100%; height: 100%;'} min-height: 100px; overflow-y: auto; box-sizing: border-box;">
          ${mainBrowserContent}
        </div>
        <div class="campaign-browser-split-divider" id="campaign-browser-split-divider" style="display: ${hasActiveLog ? 'flex' : 'none'}; height: 8px; min-height: 8px; background: var(--border-color); cursor: row-resize; align-items: center; justify-content: center; user-select: none; transition: background 0.15s; flex-shrink: 0; z-index: 10; margin: 0; box-sizing: border-box;" title="Drag to resize pane • Double-click to restore 50/50 split">
          <div class="divider-handle" style="width: 36px; height: 3px; background: rgba(255, 255, 255, 0.4); border-radius: 2px;"></div>
        </div>
        <div class="campaign-browser-log-pane" id="campaign-browser-log-pane" style="display: ${hasActiveLog ? 'flex' : 'none'}; flex-direction: column; ${hasActiveLog ? `flex: 0 0 calc(${100 - (splitRatio * 100)}% - 8px); height: calc(${100 - (splitRatio * 100)}% - 8px);` : 'flex: 0 0 0px; height: 0px;'} min-height: ${hasActiveLog ? '100px' : '0px'}; overflow: hidden; background: var(--bg-card); border-top: 1px solid var(--border-color); box-sizing: border-box;">
          ${hasActiveLog ? this.generateSessionLogViewerHTML(this._activeViewedSessionLog) : ''}
        </div>
      </div>
    `;
  }

  generatePartyHTML() {
    return this.generateCampaignBrowserHTML();
  }

  renderAllOpenViews() {
    this.updateHeaderBadge();
    if (this.isPopoutOpen()) {
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

    if (this.isSessionPopoutOpen()) {
      try {
        const topCont = this.sessionPopoutWindow.document.getElementById('session-party-tracker-container');
        if (topCont) {
          topCont.innerHTML = this.generateSessionTrackerHTML();
          this.wireCardButtons(topCont);
        }
        if (typeof window !== 'undefined' && window.appController?.renderSessionRollsAndGeneral) {
          window.appController.renderSessionRollsAndGeneral(this.sessionPopoutWindow.document);
        }
      } catch (e) {
        console.warn('Could not update session popout window view:', e);
      }
    }

    const browserContainer = typeof document !== 'undefined' ? document.getElementById('campaign-tracker-content') : null;
    if (browserContainer) {
      // Preserve any open dropdown panel across re-rendering (Actions or Logs)
      let openPanelType = null;
      let openCampId = null;
      try {
        const openPanel = browserContainer.querySelector('.campaign-actions-panel.show, .campaign-logs-panel.show, .campaign-actions-panel[style*="display: block"], .campaign-logs-panel[style*="display: block"]');
        if (openPanel) {
          if (openPanel.classList.contains('campaign-actions-panel')) openPanelType = 'actions';
          else if (openPanel.classList.contains('campaign-logs-panel')) openPanelType = 'logs';
          const card = openPanel.closest('.campaign-browser-card');
          openCampId = card?.dataset?.campid || null;
        }
      } catch (e) {}

      browserContainer.innerHTML = this.generateCampaignBrowserHTML();
      this.wireCardButtons(browserContainer);

      if (openCampId && openPanelType) {
        try {
          const card = browserContainer.querySelector(`.campaign-browser-card[data-campid="${openCampId}"]`);
          if (card) {
            const panelToRestore = openPanelType === 'actions'
              ? card.querySelector('.campaign-actions-panel')
              : card.querySelector('.campaign-logs-panel');
            if (panelToRestore) {
              panelToRestore.classList.add('show');
              panelToRestore.style.display = 'block';
              if (card.style) card.style.zIndex = '50';
            }
          }
        } catch (e) {}
      }
    }

    const sessionTrackerContainer = typeof document !== 'undefined' ? document.getElementById('session-party-tracker-container') : null;
    if (sessionTrackerContainer) {
      sessionTrackerContainer.innerHTML = this.generateSessionTrackerHTML();
      this.wireCardButtons(sessionTrackerContainer);
    }

    if (typeof window !== 'undefined' && window.appController?.renderSessionRollsAndGeneral) {
      window.appController.renderSessionRollsAndGeneral();
    }
  }

  wireCardButtons(parentEl) {
    if (!parentEl) return;

    // Campaign Actions & GM Tools Dropdown Toggles (v3.81)
    const doc = parentEl.ownerDocument || (typeof document !== 'undefined' ? document : null);

    parentEl.querySelectorAll('.campaign-actions-toggle, .campaign-gm-toggle, .campaign-logs-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const container = btn.closest('.menu-dropdown-container');
        const panel = container ? container.querySelector('.campaign-actions-panel, .campaign-gm-panel, .campaign-logs-panel') : btn.nextElementSibling;
        const isShown = panel?.classList.contains('show') || panel?.style.display === 'block';

        // Close all dropdowns in this document
        if (doc) {
          doc.querySelectorAll('.campaign-actions-panel, .campaign-gm-panel, .campaign-logs-panel').forEach(p => {
            p.classList.remove('show');
            p.style.display = 'none';
            const c = p.closest(".campaign-browser-card"); if (c && c.style) { if (typeof c.style.removeProperty === "function") c.style.removeProperty("z-index"); else c.style.zIndex = ""; }
          });
        }

        if (!isShown && panel) {
          panel.classList.add('show');
          panel.style.display = 'block';
          const card = btn.closest('.campaign-browser-card');
          if (card) card.style.zIndex = '50';
        }
      });
    });

    parentEl.querySelectorAll('.campaign-actions-panel .menu-dropdown-item, .campaign-gm-panel .menu-dropdown-item, .campaign-logs-panel .menu-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        if (doc) {
          doc.querySelectorAll('.campaign-actions-panel, .campaign-gm-panel, .campaign-logs-panel').forEach(p => {
            p.classList.remove('show');
            p.style.display = 'none';
            const c = p.closest(".campaign-browser-card"); if (c && c.style) { if (typeof c.style.removeProperty === "function") c.style.removeProperty("z-index"); else c.style.zIndex = ""; }
          });
        }
      });
    });

    // Session log view selection
    parentEl.querySelectorAll('.btn-view-session-log').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const campId = e.currentTarget.dataset.campid;
        const logId = e.currentTarget.dataset.logid;
        this.openSessionLogInBrowser(campId, logId, parentEl);
      });
    });

    // Wire up log viewer and divider
    this.wireSessionLogViewer(parentEl);

    if (doc && !doc._campaignDropdownDocListenerAttached) {
      doc._campaignDropdownDocListenerAttached = true;
      doc.addEventListener('click', (e) => {
        if (!e.target.closest('.campaign-actions-dropdown') && !e.target.closest('.campaign-gm-tools-dropdown') && !e.target.closest('.campaign-logs-dropdown')) {
          doc.querySelectorAll('.campaign-actions-panel, .campaign-gm-panel, .campaign-logs-panel').forEach(p => {
            p.classList.remove('show');
            p.style.display = 'none';
            const c = p.closest(".campaign-browser-card"); if (c && c.style) { if (typeof c.style.removeProperty === "function") c.style.removeProperty("z-index"); else c.style.zIndex = ""; }
          });
        }
      });
    }
    // GM Party Member Dropdown & Change Report (v3.99)
    parentEl.querySelectorAll('.gm-member-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const container = e.currentTarget.closest('.gm-member-dropdown');
        const panel = container?.querySelector('.gm-member-panel');
        if (panel) {
          const isShown = panel.style.display === 'block';
          if (doc) {
            doc.querySelectorAll('.gm-member-panel').forEach(p => { p.style.display = 'none'; });
          }
          panel.style.display = isShown ? 'none' : 'block';
        }
      });
    });

    parentEl.querySelectorAll('.btn-gm-view-change-report').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const charName = e.currentTarget.dataset.charname;
        const memberId = e.currentTarget.dataset.memberid;
        if (doc) doc.querySelectorAll('.gm-member-panel').forEach(p => { p.style.display = 'none'; });
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.showCharacterChangeReport(charName, memberId);
        }
      });
    });

    parentEl.querySelectorAll('.btn-gm-approve-character-changes').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const charName = e.currentTarget.dataset.charname;
        const state = this.getCampaignState();
        if (doc) doc.querySelectorAll('.gm-member-panel').forEach(p => { p.style.display = 'none'; });
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.approveCharacterChanges(state.campaignId, charName);
        }
      });
    });

    // Attach Character to Campaign button (v3.99)
    parentEl.querySelectorAll('.btn-browser-attach-char').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        const campName = e.currentTarget.dataset.campname || '';
        if (campId && typeof window !== 'undefined' && window.appController) {
          window.appController.confirmAndAttachCharacterToCampaign(campId, campName);
        }
      });
    });

    // Remove Character from Party button (v3.99)
    parentEl.querySelectorAll('.btn-remove-char-from-party').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        const charName = e.currentTarget.dataset.charname || '';
        if (campId && typeof window !== 'undefined' && window.appController) {
          window.appController.confirmAndRemoveCharacterFromParty(campId, charName);
        }
      });
    });

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
      btn.addEventListener('click', async (e) => {
        const action = e.currentTarget.dataset.action;
        const campId = e.currentTarget.dataset.campid;
        if (action === 'start') {
          try {
            this.startSession(campId);
          } catch (err) {
            if (typeof window !== 'undefined' && window.appController) {
              await window.appController.showAlertDialog(err.message, { title: 'Cannot Start Session' });
            } else {
              alert(err.message);
            }
          }
        } else {
          try {
            this.endSession(campId);
          } catch (err) {
            if (typeof window !== 'undefined' && window.appController) {
              await window.appController.showAlertDialog(err.message, { title: 'Cannot End Session' });
            } else {
              alert(err.message);
            }
          }
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

    parentEl.querySelectorAll('.btn-gm-join-party').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid;
        if (campId && typeof window !== 'undefined' && window.appController) {
          window.appController.attachCurrentCharacterToCampaign(campId);
        }
      });
    });

    parentEl.querySelectorAll('.btn-open-campaign-characters').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.campid || '';
        const campName = e.currentTarget.dataset.campname || '';
        if (typeof window !== 'undefined' && window.appController) {
          window.appController.openCampaignCharactersModal(campId, campName);
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

    // Dropdown control items: prevent click from bubbling and dismissing menu
    parentEl.querySelectorAll('.menu-dropdown-item-control, .menu-dropdown-item-control label, .menu-dropdown-item-control input').forEach(ctrl => {
      ctrl.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    // Set PL Stepper in Actions Menu (GM Controls)
    parentEl.querySelectorAll('.btn-stepper-camp-pl').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const campId = e.currentTarget.dataset.campid;
        const dir = parseInt(e.currentTarget.dataset.dir, 10) || 0;
        const info = this.getCampaignInfo(campId) || {};
        const curPL = parseInt(info.powerLevel, 10) || 10;
        const newPL = Math.min(Math.max(curPL + dir, 1), 20);
        this.updateCampaignSettings({ campaignId: campId, powerLevel: newPL }, { skipRender: true });
        const panel = btn.closest('.campaign-actions-panel') || btn.closest('.menu-dropdown-panel');
        const stepperVal = panel ? panel.querySelector(`.stepper-value-camp-pl[data-campid="${campId}"]`) : null;
        if (stepperVal) stepperVal.textContent = `PL ${newPL}`;
        const card = btn.closest('.campaign-browser-card');
        const badge = card ? card.querySelector(`.badge-campaign-pl[data-campid="${campId}"]`) : null;
        if (badge) badge.textContent = `PL ${newPL}`;
        if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
          supabaseService.getCampaignByNameOrCode(campId).then(cloudCamp => {
            if (cloudCamp?.id) {
              supabaseService.updateCampaignSettings(cloudCamp.id, { powerLevel: newPL }).catch(() => {});
            }
          }).catch(() => {});
        }
      });
    });

    // Override PL checkbox (Don't enforce limits)
    parentEl.querySelectorAll('.chk-campaign-dont-enforce-pl, .chk-campaign-override-pl').forEach(chk => {
      chk.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        const campId = e.currentTarget.dataset.campid;
        this.updateCampaignSettings({ campaignId: campId, dontEnforcePL: e.target.checked }, { skipRender: true });
        if (typeof supabaseService !== 'undefined' && supabaseService && supabaseService.isLoggedIn()) {
          supabaseService.getCampaignByNameOrCode(campId).then(cloudCamp => {
            if (cloudCamp?.id) {
              supabaseService.updateCampaignSettings(cloudCamp.id, { dontEnforcePL: e.target.checked }).catch(() => {});
            }
          }).catch(() => {});
        }
      });
    });

    parentEl.querySelectorAll('.sel-campaign-target-pl').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const campId = e.currentTarget.dataset.campid;
        this.updateCampaignSettings({ campaignId: campId, powerLevel: parseInt(e.target.value, 10) }, { skipRender: true });
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

    parentEl.querySelector('.input-pl-range-min')?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        this.setBrowserPLRange(val, this.browserFilters?.plMax || 20, 'min');
      }
    });
    parentEl.querySelector('.input-pl-range-min')?.addEventListener('change', (e) => {
      this.setBrowserPLRange(parseInt(e.target.value, 10) || 1, this.browserFilters?.plMax || 20, 'min');
      this.renderAllOpenViews();
    });

    parentEl.querySelector('.input-pl-range-max')?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        this.setBrowserPLRange(this.browserFilters?.plMin || 1, val, 'max');
      }
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
  <link rel="stylesheet" href="css/styles.css?v=3.99">
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
      <button id="btn-popout-redock" class="btn btn-outline" title="Return this window to the main app" style="min-height: 28px; padding: 0.15rem 0.6rem; font-size: 10pt; font-weight: 700;">↙ Redock</button>
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

    document.getElementById('btn-popout-redock')?.addEventListener('click', () => {
      const op = window.opener;
      if (op && !op.closed && op.partyManager) {
        op.partyManager.saveCoords({ left: window.screenX, top: window.screenY, width: window.outerWidth, height: window.outerHeight });
        op.partyManager.popoutWindow = null;
        if (op.appController) op.appController.openCampaignTracker();
        try { op.focus(); } catch (e) {}
      }
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

  openSessionPopout() {
    const coords = this.getSavedCoords();
    const width = Math.max(900, coords.width || 950);
    const height = Math.max(700, coords.height || 750);
    const left = coords.left !== null ? coords.left : (window.screenX + 50);
    const top = coords.top !== null ? coords.top : (window.screenY + 50);

    if (this.sessionPopoutWindow && !this.sessionPopoutWindow.closed) {
      this.sessionPopoutWindow.focus();
      return;
    }

    this.sessionPopoutWindow = window.open('', 'MMGameSessionPopout', `left=${left},top=${top},width=${width},height=${height},resizable=yes,scrollbars=yes`);
    if (!this.sessionPopoutWindow) {
      console.warn('Pop-out blocked by browser');
      return;
    }

    if (typeof document !== 'undefined') {
      document.getElementById('modal-game-session')?.classList.remove('active');
      if (typeof window !== 'undefined' && window.appController?.syncBodyScrollLock) {
        window.appController.syncBodyScrollLock();
      }
    }

    const currentTheme = (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || (typeof localStorage !== 'undefined' && localStorage.getItem('mm3e_theme')) || 'dark';

    const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="${currentTheme}">
<head>
  <meta charset="UTF-8">
  <title>Mutants & Masterminds 3E - Game Session Tracker</title>
  <link rel="stylesheet" href="css/styles.css?v=3.99">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg-app, #0f172a);
      color: var(--text-main, #f8fafc);
      margin: 0;
      padding: 0;
      font-size: 10pt;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
      box-sizing: border-box;
    }
    .popout-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--border-color, #334155);
      padding: 0.6rem 1rem;
      background: var(--bg-card, #1e293b);
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
    .session-modal-top {
      flex: 1 1 50%;
      max-height: 50%;
      overflow-y: auto;
      padding: 0.75rem 1rem;
      border-bottom: 2px solid var(--border-color);
      min-height: 0;
    }
    .session-modal-bottom {
      flex: 1 1 50%;
      max-height: 50%;
      display: flex;
      flex-direction: column;
      min-height: 0;
      background: var(--bg-card);
    }
    .popout-footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-color, #334155);
      padding: 0.5rem 1rem;
      background: var(--bg-app, #0f172a);
    }
  </style>
</head>
<body>
  <div class="popout-top-bar">
    <h2 class="popout-title" id="popout-session-title">🎮 Game Session Tracker</h2>
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <button id="btn-session-popout-redock" class="btn btn-outline" title="Return this window to the main app" style="min-height: 28px; padding: 0.15rem 0.6rem; font-size: 10pt; font-weight: 700;">↙ Redock</button>
      <button id="btn-session-popout-close" class="btn" style="background: #dc2626; color: #fff; border: none; padding: 5px 12px; border-radius: 4px; font-weight: 700; cursor: pointer;">✕ Close</button>
    </div>
  </div>

  <div class="session-modal-top" id="session-party-tracker-container">
    ${this.generateSessionTrackerHTML()}
  </div>

  <div class="session-modal-bottom" id="session-output-history-container">
    <div class="session-tabs-bar">
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <button type="button" class="session-tab-btn active" id="btn-session-tab-rolls">🎲 Rolls <span id="session-rolls-count-badge" style="font-size: 10pt; font-weight: 800; background: rgba(59, 130, 246, 0.25); color: var(--hero-blue); padding: 1px 6px; border-radius: 999px; margin-left: 3px;">0</span></button>
        <button type="button" class="session-tab-btn" id="btn-session-tab-general">📜 General <span id="session-general-count-badge" style="font-size: 10pt; font-weight: 800; background: rgba(16, 185, 129, 0.25); color: var(--hero-green); padding: 1px 6px; border-radius: 999px; margin-left: 3px;">0</span></button>
      </div>
      <div style="display: flex; align-items: center; gap: 0.4rem;">
        <button type="button" class="btn btn-outline" id="btn-clear-session-rolls" style="font-size: 10pt; padding: 2px 7px; min-height: 24px;">Clear Rolls</button>
      </div>
    </div>

    <div class="session-pane" id="session-pane-rolls">
      <div id="session-rolls-list"></div>
    </div>

    <div class="session-pane" id="session-pane-general" style="display: none; flex-direction: column;">
      <div id="session-general-list" style="flex: 1; overflow-y: auto; margin-bottom: 0.5rem;"></div>
      <div style="display: flex; gap: 0.4rem; align-items: center; padding-top: 0.4rem; border-top: 1px solid var(--border-color);">
        <input type="text" id="session-broadcast-input" placeholder="Post a broadcast message or event to session log..." style="flex: 1; background: var(--bg-input); color: var(--text-bright); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.28rem 0.6rem; font-size: 10pt;">
        <button type="button" class="btn btn-primary" id="btn-session-send-broadcast" style="font-size: 10pt; font-weight: 800; padding: 0.28rem 0.85rem; white-space: nowrap;">📢 Post Event</button>
      </div>
    </div>
  </div>

  <div class="popout-footer-bar">
    <div style="display: flex; gap: 0.45rem;">
      <button class="btn btn-primary" id="btn-popout-session-discord" style="font-size: 10pt; font-weight: 800; padding: 0.2rem 0.85rem;">📢 Broadcast to Discord</button>
      <button class="btn btn-outline" id="btn-popout-session-add-ally" style="font-size: 10pt; font-weight: 700; padding: 0.2rem 0.75rem;">➕ Add Ally</button>
    </div>
    <div style="display: flex; gap: 0.45rem;">
      <button class="btn btn-outline" id="btn-popout-clear-inactive" style="font-size: 10pt; padding: 0.2rem 0.6rem;">Clear Inactive</button>
    </div>
  </div>

  <script>
    window.addEventListener('storage', (e) => {
      if (e.key === 'mm3e_theme' && e.newValue) {
        document.documentElement.setAttribute('data-theme', e.newValue);
      }
      if (e.key === 'mm3e_party_members' || e.key === 'mm3e_party_campaign_state') {
        if (window.opener && window.opener.partyManager) {
          const c = document.getElementById('session-party-tracker-container');
          if (c) {
            c.innerHTML = window.opener.partyManager.generateSessionTrackerHTML();
            window.opener.partyManager.wireCardButtons(c);
          }
        }
      }
    });

    document.getElementById('btn-session-popout-close')?.addEventListener('click', () => {
      window.close();
    });

    document.getElementById('btn-session-popout-redock')?.addEventListener('click', () => {
      const op = window.opener;
      if (op && !op.closed && op.partyManager) {
        op.partyManager.sessionPopoutWindow = null;
        if (op.appController) op.appController.openGameSessionModal();
        try { op.focus(); } catch (e) {}
      }
      window.close();
    });

    document.getElementById('btn-popout-session-discord')?.addEventListener('click', () => {
      if (window.opener && window.opener.appController) {
        window.opener.appController.broadcastPartyToDiscord();
      }
    });

    document.getElementById('btn-popout-session-add-ally')?.addEventListener('click', () => {
      if (window.opener && window.opener.appController) {
        window.opener.appController.addPartyAlly();
      }
    });

    document.getElementById('btn-popout-clear-inactive')?.addEventListener('click', () => {
      if (window.opener && window.opener.partyManager) {
        window.opener.partyManager.clearInactiveMembers();
      }
    });

    if (window.opener && window.opener.appController) {
      window.opener.partyManager.wireCardButtons(document.getElementById('session-party-tracker-container'));
      window.opener.appController.wireSessionTabs(document);
      window.opener.appController.renderSessionRollsAndGeneral(document);
    }

    window.addEventListener('beforeunload', () => {
      if (window.opener && window.opener.partyManager) {
        window.opener.partyManager.sessionPopoutWindow = null;
      }
    });
  </script>
</body>
</html>`;

    this.sessionPopoutWindow.document.open();
    this.sessionPopoutWindow.document.write(htmlContent);
    this.sessionPopoutWindow.document.close();
  }

}

export const campaignManager = new CampaignTrackerManager();
export const partyManager = campaignManager;
export const PartyManager = CampaignTrackerManager;
