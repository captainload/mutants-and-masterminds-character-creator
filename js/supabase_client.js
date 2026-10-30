/**
 * Mutants & Masterminds 3E - Supabase Cloud Coordination & Authentication Client
 * Provides centralized authentication (Sign Up, Sign In, Email Password Reset),
 * strictly unique campaign names, creator-only authority & GM settings,
 * join request approval workflows, and character sheet viewing.
 */

export const SUPABASE_URL = 'https://jthabormtacutpiualiq.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0aGFib3JtdGFjdXRwaXVhbGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMTA1NDIsImV4cCI6MjEwODg4NjU0Mn0.EXYkUrL7DlCsxx0utPH2fBSndy2CAruquqg0pbZ6_eU';

class SupabaseService {
  constructor() {
    this.client = null;
    this.currentUser = null;
    this.currentProfile = null;
    this.authListeners = [];
    this.activeSubscriptions = [];
    this.initClient();
  }

  initClient() {
    if (typeof window !== 'undefined') {
      const tryInit = () => {
        if (window.supabase && typeof window.supabase.createClient === 'function' && !this.client) {
          try {
            this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
              auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
              }
            });
            this.setupAuthListener();
            return true;
          } catch (e) {
            console.warn('Supabase client initialization error:', e);
          }
        }
        return false;
      };

      if (!tryInit()) {
        if (document.readyState === 'loading') {
          window.addEventListener('DOMContentLoaded', () => {
            if (!tryInit()) {
              setTimeout(tryInit, 200);
            }
          });
        } else {
          setTimeout(tryInit, 100);
          setTimeout(tryInit, 500);
        }
      }
    }
  }

  ensureClient() {
    if (!this.client && typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
        this.setupAuthListener();
      } catch (e) {
        console.warn('Supabase ensureClient error:', e);
      }
    }
    return this.client;
  }

  setupAuthListener() {
    if (!this.client) return;
    this.client.auth.onAuthStateChange(async (event, session) => {
      this.currentUser = session?.user || null;
      if (this.currentUser) {
        await this.loadProfile();
      } else {
        this.currentProfile = null;
      }
      this.authListeners.forEach(cb => {
        try { cb(this.currentUser, this.currentProfile, event); } catch (e) {}
      });
    });

    // Check initial session
    this.client.auth.getSession().then(async ({ data: { session } }) => {
      this.currentUser = session?.user || null;
      if (this.currentUser) {
        await this.loadProfile();
      }
      this.authListeners.forEach(cb => {
        try { cb(this.currentUser, this.currentProfile, 'INITIAL'); } catch (e) {}
      });
    }).catch(() => {});
  }

  onAuthStateChange(callback) {
    this.authListeners.push(callback);
    if (this.currentUser !== undefined) {
      callback(this.currentUser, this.currentProfile, 'INITIAL');
    }
    return () => {
      this.authListeners = this.authListeners.filter(cb => cb !== callback);
    };
  }

  // =======================================================
  // AUTHENTICATION & USER IDENTITY
  // =======================================================
  async loadProfile() {
    if (!this.client || !this.currentUser) return null;
    try {
      const { data, error } = await this.client
        .from('profiles')
        .select('*')
        .eq('id', this.currentUser.id)
        .maybeSingle();

      if (data) {
        this.currentProfile = data;
      } else if (!error) {
        // Fallback profile if row is being created by trigger
        this.currentProfile = {
          id: this.currentUser.id,
          username: this.currentUser.user_metadata?.username || this.currentUser.email.split('@')[0],
          email: this.currentUser.email
        };
      }
      return this.currentProfile;
    } catch {
      return null;
    }
  }

  async checkUsernameAvailable(username) {
    if (!this.client) return true;
    const clean = String(username || '').trim().toLowerCase();
    if (!clean) return false;
    const { data } = await this.client
      .from('profiles')
      .select('id')
      .ilike('username', clean)
      .maybeSingle();
    return !data;
  }

  async signUp({ email, password, username }) {
    this.ensureClient();
    if (!this.client) throw new Error('Supabase client is not available. Please check your internet connection.');
    const cleanUser = String(username || '').trim();
    if (!cleanUser) throw new Error('Username is required.');
    
    // Enforce unique username
    const isAvail = await this.checkUsernameAvailable(cleanUser);
    if (!isAvail) {
      throw new Error(`The username "${cleanUser}" is already taken. Please choose another.`);
    }

    const redirectUrl = typeof window !== 'undefined' && window.location?.origin ? (window.location.origin + window.location.pathname) : undefined;
    const { data, error } = await this.client.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          username: cleanUser
        },
        emailRedirectTo: redirectUrl
      }
    });

    if (error) throw error;
    this.currentUser = data.user;
    await this.loadProfile();
    return data;
  }

  async signIn({ email, password }) {
    this.ensureClient();
    if (!this.client) throw new Error('Supabase client is not available. Please check your internet connection.');
    const { data, error } = await this.client.auth.signInWithPassword({
      email: email.trim(),
      password
    });
    if (error) throw error;
    this.currentUser = data.user;
    await this.loadProfile();
    return data;
  }

  async signOut() {
    if (!this.client) return;
    this.cleanupSubscriptions();
    await this.client.auth.signOut();
    this.currentUser = null;
    this.currentProfile = null;
  }

  async resetPasswordForEmail(email) {
    if (!this.client) throw new Error('Supabase client is not available.');
    const redirectUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : undefined;
    const { data, error } = await this.client.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectUrl
    });
    if (error) throw error;
    return data;
  }

  async resendVerificationEmail(email) {
    if (!this.client) throw new Error('Supabase client is not available.');
    const redirectUrl = typeof window !== 'undefined' && window.location?.origin ? (window.location.origin + window.location.pathname) : undefined;
    const { data, error } = await this.client.auth.resend({
      type: 'signup',
      email: email.trim(),
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    if (error) throw error;
    return data;
  }

  async updateUserPassword(newPassword) {
    if (!this.client) throw new Error('Supabase client is not available.');
    const { data, error } = await this.client.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
    return data;
  }

  async deleteCurrentUserAccount() {
    if (!this.client) throw new Error('Supabase client is not available.');
    if (!this.currentUser) throw new Error('No user is currently signed in.');

    const userId = this.currentUser.id;

    // 1. First, attempt to call RPC delete_user if defined in Supabase
    let rpcWorked = false;
    try {
      const { error: rpcErr } = await this.client.rpc('delete_user');
      if (!rpcErr) {
        rpcWorked = true;
      }
    } catch {}

    // 2. Clean up related public table rows
    try {
      await this.client.from('character_backups').delete().eq('user_id', userId);
    } catch {}
    try {
      await this.client.from('campaign_members').delete().eq('user_id', userId);
    } catch {}
    try {
      await this.client.from('join_requests').delete().eq('user_id', userId);
    } catch {}
    try {
      await this.client.from('campaigns').delete().eq('creator_id', userId);
    } catch {}
    try {
      await this.client.from('profiles').delete().eq('id', userId);
    } catch {}

    // 3. Sign out local session
    await this.signOut();
    return true;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getUser() {
    return this.currentUser;
  }

  getUsername() {
    return this.currentProfile?.username || this.currentUser?.user_metadata?.username || (this.currentUser?.email ? this.currentUser.email.split('@')[0] : 'Player');
  }

  // =======================================================
  // CAMPAIGNS (CREATION, OWNERSHIP & SETTINGS)
  // =======================================================
  async createCampaign({ name, campaignCode, powerLevel = 10, dontEnforcePL = false, isPublic = false, notes = '' }) {
    if (!this.client) throw new Error('Supabase client is not available.');
    if (!this.currentUser) throw new Error('You must be signed in to create a campaign.');

    const cleanName = String(name || '').trim();
    if (!cleanName) throw new Error('Campaign name cannot be blank.');

    // Check unique campaign name case-insensitively
    const { data: existing } = await this.client
      .from('campaigns')
      .select('id, campaign_name')
      .ilike('campaign_name', cleanName)
      .maybeSingle();

    if (existing) {
      throw new Error(`A campaign named "${cleanName}" already exists. Campaign names must be unique to prevent collisions.`);
    }

    const code = (campaignCode || cleanName.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000)).toUpperCase().replace(/^#+/, '');
    const creatorName = this.getUsername();

    const payload = {
      campaign_code: code,
      campaign_name: cleanName,
      creator_id: this.currentUser.id,
      creator_name: creatorName,
      power_level: parseInt(powerLevel, 10) || 10,
      dont_enforce_pl: !!dontEnforcePL,
      is_public: !!isPublic,
      description: String(notes || '').trim(),
      is_session_active: false
    };

    const { data, error } = await this.client
      .from('campaigns')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getPublicCampaigns() {
    if (!this.client) return [];
    try {
      const { data, error } = await this.client
        .from('campaigns')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });
      if (error) return [];
      return data || [];
    } catch {
      return [];
    }
  }

  async saveUserNotes(notesText) {
    const cleanNotes = String(notesText || '').slice(0, 256);
    if (!this.client || !this.currentUser) return cleanNotes;
    try {
      await this.client.auth.updateUser({
        data: { user_notes: cleanNotes }
      });
    } catch {}
    try {
      await this.client
        .from('profiles')
        .update({ user_notes: cleanNotes, updated_at: new Date().toISOString() })
        .eq('id', this.currentUser.id);
    } catch {}
    return cleanNotes;
  }

  async getUserNotes(username) {
    if (!this.client || !username) return '';
    try {
      const { data } = await this.client
        .from('profiles')
        .select('user_notes')
        .ilike('username', String(username).trim())
        .maybeSingle();
      return data?.user_notes ? String(data.user_notes).slice(0, 256) : '';
    } catch {
      return '';
    }
  }

  async getCampaignByNameOrCode(query) {
    if (!this.client || !query) return null;
    const clean = String(query).trim().replace(/^#+/, '');
    
    // Try matching by exact campaign_code first
    const { data: byCode } = await this.client
      .from('campaigns')
      .select('*')
      .eq('campaign_code', clean.toUpperCase())
      .maybeSingle();

    if (byCode) return byCode;

    // Try matching by campaign_name (case-insensitive)
    const { data: byName } = await this.client
      .from('campaigns')
      .select('*')
      .ilike('campaign_name', clean)
      .maybeSingle();

    return byName || null;
  }

  async updateCampaignSettings(campaignId, { powerLevel, dontEnforcePL, isSessionActive, isPublic, notes }) {
    if (!this.client || !campaignId) return null;
    const updates = { updated_at: new Date().toISOString() };
    if (powerLevel !== undefined) updates.power_level = parseInt(powerLevel, 10);
    if (dontEnforcePL !== undefined) updates.dont_enforce_pl = !!dontEnforcePL;
    if (isSessionActive !== undefined) updates.is_session_active = !!isSessionActive;
    if (isPublic !== undefined) updates.is_public = !!isPublic;
    if (notes !== undefined) updates.description = String(notes || '');

    const { data, error } = await this.client
      .from('campaigns')
      .update(updates)
      .eq('id', campaignId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  // =======================================================
  // JOIN REQUESTS & GM APPROVAL WORKFLOW
  // =======================================================
  async submitJoinRequest({ campaignId, character, characterData }) {
    if (!this.client) throw new Error('Supabase client is not available.');
    if (!this.currentUser) throw new Error('You must be signed in to request joining a campaign.');

    const username = this.getUsername();
    const payload = {
      campaign_id: campaignId,
      user_id: this.currentUser.id,
      username,
      character_id: character.id || 'hero',
      character_name: character.name || 'Hero',
      power_level: parseInt(character.powerLevel, 10) || 10,
      character_data: characterData || character,
      status: 'pending',
      updated_at: new Date().toISOString()
    };

    const { data, error } = await this.client
      .from('join_requests')
      .upsert([payload], { onConflict: 'campaign_id,user_id,character_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getMyCreatedCampaigns() {
    if (!this.client || !this.currentUser) return [];
    const { data, error } = await this.client
      .from('campaigns')
      .select('*')
      .eq('creator_id', this.currentUser.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching created campaigns:', error);
      return [];
    }
    return data || [];
  }

  async getJoinRequests(campaignId) {
    if (!this.client || !campaignId) return [];
    const { data, error } = await this.client
      .from('join_requests')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching join requests:', error);
      return [];
    }
    return data || [];
  }

  async respondToJoinRequest(requestId, status, campaignId = null, characterData = null) {
    if (!this.client || !requestId) return null;
    if (status !== 'approved' && status !== 'rejected') return null;

    // 1. Update the join request status
    const { data: request, error } = await this.client
      .from('join_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;

    // 2. If approved, add or update member in campaign_members
    if (status === 'approved' && request) {
      const charPayload = characterData || request.character_data || {};
      await this.client
        .from('campaign_members')
        .upsert([{
          campaign_id: request.campaign_id,
          user_id: request.user_id,
          character_id: request.character_id,
          character_name: request.character_name,
          player_name: request.username,
          power_level: request.power_level,
          character_data: charPayload,
          is_online: true,
          last_seen: new Date().toISOString()
        }], { onConflict: 'campaign_id,user_id' });
    }

    return request;
  }

  // =======================================================
  // CAMPAIGN MEMBERS & LIVE PARTY CONDITIONS
  // =======================================================
  async getCampaignMembers(campaignId) {
    if (!this.client || !campaignId) return [];
    const { data, error } = await this.client
      .from('campaign_members')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('character_name', { ascending: true });

    if (error) {
      console.warn('Error fetching campaign members:', error);
      return [];
    }
    return data || [];
  }

  async upsertCampaignMember({ campaignId, character, characterData }) {
    if (!this.client || !this.currentUser || !campaignId) return null;
    const baseHero = character;
    const bruises = parseInt(baseHero.bruises, 10) || 0;
    const conditions = [];
    if (baseHero.conditions) {
      Object.entries(baseHero.conditions).forEach(([k, v]) => {
        if (v) conditions.push(k.charAt(0).toUpperCase() + k.slice(1));
      });
    }

    const payload = {
      campaign_id: campaignId,
      user_id: this.currentUser.id,
      character_id: baseHero.id || 'hero',
      character_name: baseHero.name || 'Hero',
      player_name: this.getUsername(),
      power_level: parseInt(baseHero.powerLevel, 10) || 10,
      bruises,
      toughness_penalty: -bruises,
      conditions,
      hero_points: baseHero.heroPoints ?? 1,
      is_alt: !!baseHero.isAlt,
      active_alt_label: baseHero.activeAltLabel || null,
      character_data: characterData || baseHero,
      is_online: true,
      last_seen: new Date().toISOString()
    };

    const { data, error } = await this.client
      .from('campaign_members')
      .upsert([payload], { onConflict: 'campaign_id,user_id' })
      .select()
      .maybeSingle();

    if (error) console.warn('Failed to upsert campaign member:', error);
    return data;
  }

  async updateMemberConditions(campaignId, { bruises, conditions, heroPoints, isAlt, activeAltLabel }) {
    if (!this.client || !this.currentUser || !campaignId) return;
    const b = parseInt(bruises, 10) || 0;
    const condArray = Array.isArray(conditions) ? conditions : [];
    
    await this.client
      .from('campaign_members')
      .update({
        bruises: b,
        toughness_penalty: -b,
        conditions: condArray,
        hero_points: heroPoints ?? 1,
        is_alt: !!isAlt,
        active_alt_label: activeAltLabel || null,
        is_online: true,
        last_seen: new Date().toISOString()
      })
      .eq('campaign_id', campaignId)
      .eq('user_id', this.currentUser.id);
  }

  async removeCampaignMember(campaignId, userId) {
    if (!this.client || !campaignId || !userId) return;
    await this.client
      .from('campaign_members')
      .delete()
      .eq('campaign_id', campaignId)
      .eq('user_id', userId);
  }

  async markMemberOffline(campaignId) {
    if (!this.client || !this.currentUser || !campaignId) return;
    try {
      await this.client
        .from('campaign_members')
        .update({ is_online: false, last_seen: new Date().toISOString() })
        .eq('campaign_id', campaignId)
        .eq('user_id', this.currentUser.id);
    } catch {}
  }

  async saveCampaignCharacterSnapshot({ campaignId, characterId, characterName, playerName, characterData, timestamp }) {
    if (!this.client || !campaignId) return;
    try {
      const payload = {
        campaign_id: campaignId,
        user_id: this.currentUser?.id || 'offline_gm',
        character_id: characterId || 'hero',
        character_name: characterName || 'Hero',
        player_name: playerName || 'Player',
        power_level: parseInt(characterData?.powerLevel || 10, 10),
        character_data: characterData || {},
        is_online: false,
        last_seen: timestamp || new Date().toISOString()
      };
      await this.client
        .from('campaign_members')
        .upsert([payload], { onConflict: 'campaign_id,character_id' });
    } catch (e) {
      try {
        if (this.currentUser) {
          await this.client
            .from('campaign_members')
            .upsert([{
              campaign_id: campaignId,
              user_id: this.currentUser.id,
              character_id: characterId || 'hero',
              character_name: characterName || 'Hero',
              player_name: playerName || 'Player',
              power_level: parseInt(characterData?.powerLevel || 10, 10),
              character_data: characterData || {},
              is_online: false,
              last_seen: timestamp || new Date().toISOString()
            }], { onConflict: 'campaign_id,user_id' });
        }
      } catch {}
    }
  }

  // =======================================================
  // REAL-TIME SUBSCRIPTIONS
  // =======================================================
  subscribeToCampaign(campaignId, onCampaignUpdate) {
    if (!this.client || !campaignId) return null;
    const channel = this.client
      .channel(`campaign_${campaignId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'campaigns', filter: `id=eq.${campaignId}` },
        payload => onCampaignUpdate(payload.new || payload.old)
      )
      .subscribe();

    this.activeSubscriptions.push(channel);
    return channel;
  }

  subscribeToMembers(campaignId, onMembersChange) {
    if (!this.client || !campaignId) return null;
    const channel = this.client
      .channel(`members_${campaignId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'campaign_members', filter: `campaign_id=eq.${campaignId}` },
        () => onMembersChange()
      )
      .subscribe();

    this.activeSubscriptions.push(channel);
    return channel;
  }

  subscribeToJoinRequests(campaignId, onRequestChange) {
    if (!this.client || !campaignId) return null;
    const channel = this.client
      .channel(`requests_${campaignId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'join_requests', filter: `campaign_id=eq.${campaignId}` },
        payload => onRequestChange(payload)
      )
      .subscribe();

    this.activeSubscriptions.push(channel);
    return channel;
  }

  cleanupSubscriptions() {
    if (!this.client) return;
    this.activeSubscriptions.forEach(channel => {
      try { this.client.removeChannel(channel); } catch {}
    });
    this.activeSubscriptions = [];
  }

  // =======================================================
  // CLOUD CHARACTER BACKUPS & STORAGE
  // =======================================================
  async backupCharacter(character) {
    if (!this.client) throw new Error('Supabase client is not available.');
    if (!this.currentUser) throw new Error('You must be signed in to your Cloud Account to back up characters.');
    if (!character) throw new Error('No character data provided for backup.');

    const charData = typeof character.toJSON === 'function' ? character.toJSON() : JSON.parse(JSON.stringify(character));
    const charId = String(charData.id || character.id || ('hero_' + Date.now()));
    const name = String(charData.name || character.name || 'Unnamed Hero').trim();
    const pl = parseInt(charData.powerLevel || character.powerLevel || 10, 10);
    const concept = String(charData.concept || character.concept || '').trim();

    const record = {
      user_id: this.currentUser.id,
      character_id: charId,
      name,
      power_level: pl,
      concept,
      character_data: charData,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await this.client
      .from('character_backups')
      .upsert(record, { onConflict: 'user_id,character_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCharacterBackups() {
    if (!this.client || !this.currentUser) return [];
    const { data, error } = await this.client
      .from('character_backups')
      .select('id, character_id, name, power_level, concept, updated_at, character_data')
      .eq('user_id', this.currentUser.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async deleteCharacterBackup(backupId) {
    if (!this.client) throw new Error('Supabase client is not available.');
    if (!this.currentUser) throw new Error('You must be signed in to delete backups.');
    const { error } = await this.client
      .from('character_backups')
      .delete()
      .eq('id', backupId)
      .eq('user_id', this.currentUser.id);

    if (error) throw error;
    return true;
  }
}

export const supabaseService = new SupabaseService();
