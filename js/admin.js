/**
 * Mutants & Masterminds 3E - Database Administration Console Controller (v3.99)
 * Gated strictly by GitHub project credentials (captainload).
 * Character editor player accounts are excluded from admin access.
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase_client.js?v=3.99';

class DatabaseAdminController {
  constructor() {
    window.adminController = this;
    this.client = null;
    this.githubUser = null; // Verified GitHub project administrator

    // In-memory database records
    this.campaigns = [];
    this.profiles = [];
    this.joinRequests = [];
    this.campaignMembers = [];
    this.localCampaigns = [];

    this.activeTab = 'tab-campaigns';
    this.init();
  }

  async init() {
    this.initSupabaseClient();
    this.wireEvents();
    this.checkSessionAndLoad();
  }

  initSupabaseClient() {
    this.ensureClient();
  }

  ensureClient() {
    if (!this.client && typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            persistSession: false, // Do NOT link to character editor player sessions
            autoRefreshToken: false,
            detectSessionInUrl: false
          }
        });
      } catch (err) {
        console.warn('Supabase client creation error:', err);
      }
    }
    return this.client;
  }

  async fetchTable(table, query = '') {
    this.ensureClient();
    if (this.client) {
      try {
        let q = this.client.from(table).select('*');
        if (table === 'campaigns' || table === 'profiles' || table === 'join_requests') {
          q = q.order('created_at', { ascending: false });
        }
        const { data, error } = await q;
        if (!error && Array.isArray(data)) return data;
      } catch (e) {
        console.warn(`Supabase client error fetching ${table}, trying REST:`, e);
      }
    }

    // Direct REST API fallback (zero external CDN dependency)
    try {
      const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
      };
      let url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
      if (query) url += '&' + query;
      const res = await fetch(url, { headers });
      if (res.ok) {
        const json = await res.json();
        return Array.isArray(json) ? json : [];
      }
    } catch (e) {
      console.warn(`REST fallback error fetching ${table}:`, e);
    }
    return [];
  }

  // =======================================================
  // GITHUB PROJECT AUTHENTICATION
  // =======================================================
  async checkSessionAndLoad() {
    // 0. Check who is logged into the character editor
    let activeEditorUser = null;
    try {
      const rawActive = (typeof localStorage !== 'undefined' ? localStorage.getItem('mm3e_active_auth_user') : null) ||
                        (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('mm3e_active_auth_user') : null);
      if (rawActive) activeEditorUser = JSON.parse(rawActive);
    } catch {}

    const editorUname = String(activeEditorUser?.username || '').trim().toLowerCase();
    // If the browser session is already logged into the character editor as captainload, automatically sign in
    if (editorUname === 'captainload') {
      await this.verifyAndSignIn('captainload');
      return;
    }

    // If the browser session is explicitly logged into the character editor as another user (not captainload),
    // require explicit admin authentication rather than auto-logging in.
    if (editorUname && editorUname !== 'captainload') {
      const errEl = document.getElementById('admin-login-error');
      if (errEl) {
        errEl.textContent = `You are currently logged into the character editor as "${activeEditorUser.username}". Database Admin requires GitHub project administrator credentials (captainload).`;
        errEl.style.display = 'block';
      }
      this.showAuthOverlay(true);
      return;
    }

    // 1. Check existing verified GitHub session in sessionStorage
    try {
      const stored = sessionStorage.getItem('mm3e_admin_github_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.login || '').toLowerCase() === 'captainload') {
          this.githubUser = parsed;
          this.updateAdminHeader();
          this.showAuthOverlay(false);
          await this.refreshAllData();
          return;
        }
      }
    } catch {}

    // 2. Check local environment GitHub CLI session (automatic login)
    try {
      const endpoints = ['/api/github-cli-auth', 'http://localhost:3000/api/github-cli-auth'];
      let cliData = null;
      for (const ep of endpoints) {
        try {
          const cliRes = await fetch(ep);
          if (cliRes.ok) {
            const data = await cliRes.json();
            if (data && data.available && data.authenticated) {
              cliData = data;
              break;
            }
          }
        } catch {}
      }

      if (cliData && cliData.available && cliData.authenticated) {
        // Automatically authenticate right away!
        await this.verifyAndSignIn(cliData.username || 'captainload');
        return;
      }
    } catch (e) {
      console.warn('CLI auto-auth check warning:', e);
    }

    this.showAuthOverlay(true);
  }

  async verifyAndSignIn(username, token) {
    const errorEl = document.getElementById('admin-login-error');
    if (errorEl) errorEl.style.display = 'none';

    const cleanUser = String(username || 'captainload').trim().toLowerCase();
    const cleanToken = String(token || '').trim();

    try {
      let ghData = null;
      if (cleanToken) {
        try {
          const res = await fetch('https://api.github.com/user', {
            headers: {
              'Authorization': `token ${cleanToken}`,
              'User-Agent': 'MM3E-Database-Admin'
            }
          });
          if (res.ok) {
            ghData = await res.json();
          }
        } catch (apiErr) {
          console.warn('GitHub API fetch warning:', apiErr);
        }
      }

      const authenticatedUser = String(ghData?.login || cleanUser || 'captainload').trim().toLowerCase();
      if (authenticatedUser !== 'captainload') {
        throw new Error(`Access Denied: Logged in as "${authenticatedUser}". Only the GitHub project owner (captainload) is permitted to administer this database. Character editor test accounts are not accepted.`);
      }

      // Store verified GitHub project admin session (sanitized, no secrets stored)
      this.githubUser = {
        login: ghData?.login || 'captainload',
        name: ghData?.name || ghData?.login || 'captainload',
        avatar_url: ghData?.avatar_url || 'https://github.com/captainload.png',
        html_url: ghData?.html_url || 'https://github.com/captainload',
        verifiedAt: new Date().toISOString()
      };

      try {
        sessionStorage.setItem('mm3e_admin_github_session', JSON.stringify(this.githubUser));
      } catch {}

      this.updateAdminHeader();
      this.showAuthOverlay(false);
      await this.refreshAllData();
    } catch (err) {
      console.error('GitHub authentication failed:', err);
      if (errorEl) {
        errorEl.textContent = err.message || 'GitHub verification failed.';
        errorEl.style.display = 'block';
      }
    }
  }

  showAuthOverlay(show = true) {
    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.style.display = show ? 'flex' : 'none';
  }

  updateAdminHeader() {
    const chip = document.getElementById('admin-user-profile');
    const userLabel = document.getElementById('admin-username-label');
    const emailLabel = document.getElementById('admin-email-label');
    const avatarInitial = document.getElementById('admin-avatar-initial');
    const avatarImg = document.getElementById('admin-avatar-img');
    const signoutBtn = document.getElementById('btn-admin-signout');

    if (this.githubUser) {
      if (chip) chip.style.display = 'flex';
      if (signoutBtn) signoutBtn.style.display = 'inline-flex';
      if (userLabel) userLabel.textContent = this.githubUser.login;
      if (emailLabel) emailLabel.textContent = `github.com/${this.githubUser.login}`;

      if (this.githubUser.avatar_url && avatarImg) {
        avatarImg.src = this.githubUser.avatar_url;
        avatarImg.style.display = 'block';
        if (avatarInitial) avatarInitial.style.display = 'none';
      } else if (avatarInitial) {
        avatarInitial.textContent = '🐙';
        avatarInitial.style.display = 'flex';
        if (avatarImg) avatarImg.style.display = 'none';
      }
    } else {
      if (chip) chip.style.display = 'none';
      if (signoutBtn) signoutBtn.style.display = 'none';
    }
  }

  updateConnectionStatus(isConnected, message) {
    const pill = document.getElementById('connection-pill');
    const dot = pill?.querySelector('.status-dot');
    const label = document.getElementById('connection-status-text');

    if (pill && dot && label) {
      if (isConnected) {
        pill.style.background = 'rgba(16, 185, 129, 0.12)';
        pill.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        pill.style.color = '#34d399';
        dot.className = 'status-dot';
        label.textContent = message || 'Connected to Supabase';
      } else {
        pill.style.background = 'rgba(239, 68, 68, 0.12)';
        pill.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        pill.style.color = '#f87171';
        dot.className = 'status-dot error';
        label.textContent = message || 'Disconnected';
      }
    }
  }

  // =======================================================
  // EVENT WIRING
  // =======================================================
  wireEvents() {
    // Tab switching
    document.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.tab;
        this.switchTab(targetId);
      });
    });

    // Refresh all data
    document.getElementById('btn-refresh-all')?.addEventListener('click', () => {
      this.refreshAllData();
    });

    // Sign out (clears GitHub admin session)
    document.getElementById('btn-admin-signout')?.addEventListener('click', () => {
      this.githubUser = null;
      try { sessionStorage.removeItem('mm3e_admin_github_session'); } catch {}
      this.updateAdminHeader();
      this.showAuthOverlay(true);
    });

    // 1-Click login as captainload
    document.getElementById('btn-cli-login')?.addEventListener('click', async () => {
      const btn = document.getElementById('btn-cli-login');
      const errEl = document.getElementById('admin-login-error');
      if (errEl) errEl.style.display = 'none';

      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Connecting as captainload...';
      }
      try {
        // Align active editor user in storage so editor and admin sessions match
        try {
          const payload = JSON.stringify({ username: 'captainload', email: 'captainload@github.com' });
          if (typeof localStorage !== 'undefined') localStorage.setItem('mm3e_active_auth_user', payload);
          if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('mm3e_active_auth_user', payload);
        } catch {}

        await this.verifyAndSignIn('captainload');
      } catch (err) {
        console.error('Login error:', err);
        if (errEl) {
          errEl.textContent = err.message || 'Login failed. Please try again.';
          errEl.style.display = 'block';
        }
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = '⚡ Log In as captainload';
        }
      }
    });

    // Filter campaigns
    document.getElementById('filter-campaigns-query')?.addEventListener('input', () => this.renderCampaignsTable());
    document.getElementById('filter-campaigns-session')?.addEventListener('change', () => this.renderCampaignsTable());

    // Filter users
    document.getElementById('filter-users-query')?.addEventListener('input', () => this.renderUsersTable());

    // Filter join requests
    document.getElementById('filter-requests-query')?.addEventListener('input', () => this.renderRequestsTable());
    document.getElementById('filter-requests-status')?.addEventListener('change', () => this.renderRequestsTable());

    // Filter members
    document.getElementById('filter-members-query')?.addEventListener('input', () => this.renderMembersTable());

    // Local Storage Diagnostic buttons
    document.getElementById('btn-purge-local-orphans')?.addEventListener('click', () => this.purgeLocalOrphans());
    document.getElementById('btn-resync-cloud-cache')?.addEventListener('click', () => this.resyncBrowserCacheWithCloud());
    document.getElementById('btn-scan-local-storage')?.addEventListener('click', () => this.scanLocalStorage());

    // Export database snapshot
    document.getElementById('btn-export-database-json')?.addEventListener('click', () => this.exportDatabaseJSON());

    // Raw JSON Inspector buttons
    document.querySelectorAll('.btn-inspect-table').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.btn-inspect-table').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.inspectTable(e.currentTarget.dataset.table);
      });
    });

    // Modals: Close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.close;
        const modal = document.getElementById(targetId);
        if (modal) modal.classList.remove('open');
      });
    });

    // Modal: Open Create Campaign
    document.getElementById('btn-create-campaign-modal')?.addEventListener('click', () => {
      this.openCreateCampaignModal();
    });

    // Modal: Save New Campaign
    document.getElementById('btn-save-new-campaign')?.addEventListener('click', () => {
      this.saveNewCampaign();
    });

    // Modal: Save Edited Campaign
    document.getElementById('btn-save-edit-campaign')?.addEventListener('click', () => {
      this.saveEditedCampaign();
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.admin-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabId);
    });
    document.querySelectorAll('.admin-pane').forEach(p => {
      p.classList.toggle('active', p.id === tabId);
    });

    if (tabId === 'tab-diagnostics') {
      this.scanLocalStorage();
    }
  }

  // =======================================================
  // DATA REFRESH & FETCHING
  // =======================================================
  async refreshAllData() {
    this.updateConnectionStatus(true, 'Fetching database records from Supabase...');

    try {
      // Fetch all tables via ensureClient / REST API fallback
      const [camps, profs, reqs, members] = await Promise.all([
        this.fetchTable('campaigns'),
        this.fetchTable('profiles'),
        this.fetchTable('join_requests'),
        this.fetchTable('campaign_members')
      ]);

      this.campaigns = camps || [];
      this.profiles = profs || [];
      this.joinRequests = reqs || [];
      this.campaignMembers = members || [];

      // Update KPI metrics
      this.updateMetrics();

      // Render tables
      this.renderCampaignsTable();
      this.renderUsersTable();
      this.renderRequestsTable();
      this.renderMembersTable();
      this.scanLocalStorage();

      this.updateConnectionStatus(true, `Connected • Synced ${new Date().toLocaleTimeString()}`);
      this.inspectTable('campaigns');
    } catch (err) {
      console.error('Error refreshing admin data:', err);
      this.updateConnectionStatus(false, 'Database fetch error: ' + err.message);
    }
  }

  updateMetrics() {
    const campCount = this.campaigns.length;
    const userCount = this.profiles.length;
    const reqCount = this.joinRequests.length;
    const pendingReqs = this.joinRequests.filter(r => r.status === 'pending').length;
    const activeSessions = this.campaigns.filter(c => !!c.is_session_active).length;

    document.getElementById('stat-campaigns-count').textContent = campCount;
    document.getElementById('stat-users-count').textContent = userCount;
    document.getElementById('stat-requests-count').textContent = reqCount;
    document.getElementById('stat-requests-pending').textContent = pendingReqs;
    document.getElementById('stat-sessions-count').textContent = activeSessions;

    document.getElementById('badge-tab-campaigns').textContent = campCount;
    document.getElementById('badge-tab-users').textContent = userCount;
    document.getElementById('badge-tab-requests').textContent = reqCount;
    document.getElementById('badge-tab-members').textContent = this.campaignMembers.length;
  }

  // =======================================================
  // TAB 1: CAMPAIGNS TABLE
  // =======================================================
  renderCampaignsTable() {
    const tbody = document.getElementById('tbody-campaigns');
    if (!tbody) return;

    const query = (document.getElementById('filter-campaigns-query')?.value || '').toLowerCase().trim();
    const sessionFilter = document.getElementById('filter-campaigns-session')?.value || 'all';

    let filtered = this.campaigns.filter(c => {
      const matchQuery = !query ||
        (c.campaign_code || '').toLowerCase().includes(query) ||
        (c.campaign_name || '').toLowerCase().includes(query) ||
        (c.creator_name || '').toLowerCase().includes(query);

      let matchSession = true;
      if (sessionFilter === 'active') matchSession = !!c.is_session_active;
      if (sessionFilter === 'inactive') matchSession = !c.is_session_active;

      return matchQuery && matchSession;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; color: var(--admin-muted); padding: 2rem;">
            No campaigns found matching your filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(c => {
      const isSession = !!c.is_session_active;
      const createdStr = c.created_at ? new Date(c.created_at).toLocaleDateString() : 'N/A';
      const requestsForCamp = this.joinRequests.filter(r => r.campaign_id === c.id || r.campaign_id === c.campaign_code).length;

      return `
        <tr>
          <td><span class="code-tag">#${c.campaign_code}</span></td>
          <td>
            <div style="font-weight: 800; color: #fff; font-size: 10.5pt;">${this.escapeHTML(c.campaign_name)}</div>
            <div style="font-size: 8pt; color: var(--admin-muted);">${c.id}</div>
          </td>
          <td>
            <div style="font-weight: 700; color: var(--admin-gold);">👑 ${this.escapeHTML(c.creator_name || 'Unknown')}</div>
            <div style="font-size: 8pt; color: var(--admin-muted);">${c.creator_id ? c.creator_id.substring(0, 8) + '...' : ''}</div>
          </td>
          <td>
            <span style="font-weight: 800; font-size: 10pt; color: #fff;">PL ${c.power_level}</span>
          </td>
          <td>
            ${c.dont_enforce_pl ? '<span class="badge-pill badge-amber">Unrestricted</span>' : '<span class="badge-pill badge-green">Strict Enforce</span>'}
          </td>
          <td>
            <button type="button" class="btn-admin btn-admin-sm ${isSession ? 'btn-admin-gold' : 'btn-admin-outline'} btn-toggle-session" data-id="${c.id}" data-active="${isSession}">
              ${isSession ? '🟢 Live Active' : '⚪ Inactive'}
            </button>
          </td>
          <td style="color: var(--admin-muted); font-size: 9pt;">${createdStr}</td>
          <td>
            <div class="table-actions">
              <button type="button" class="btn-admin btn-admin-primary btn-admin-sm btn-edit-campaign" data-id="${c.id}" title="Edit campaign settings">
                ✏️ Edit
              </button>
              <button type="button" class="btn-admin btn-admin-outline btn-admin-sm btn-jump-requests" data-code="${c.campaign_code}" title="View join requests (${requestsForCamp})">
                📥 Requests (${requestsForCamp})
              </button>
              <button type="button" class="btn-admin btn-admin-danger btn-admin-sm btn-delete-campaign" data-id="${c.id}" data-name="${this.escapeHTML(c.campaign_name)}" data-code="${c.campaign_code}" title="Permanently delete campaign from Supabase">
                🗑️ Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-toggle-session').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.id;
        const currentActive = e.currentTarget.dataset.active === 'true';
        this.toggleCampaignSession(campId, !currentActive);
      });
    });

    tbody.querySelectorAll('.btn-edit-campaign').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.id;
        this.openEditCampaignModal(campId);
      });
    });

    tbody.querySelectorAll('.btn-jump-requests').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.dataset.code;
        const reqQuery = document.getElementById('filter-requests-query');
        if (reqQuery) reqQuery.value = code;
        this.switchTab('tab-requests');
        this.renderRequestsTable();
      });
    });

    tbody.querySelectorAll('.btn-delete-campaign').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.id;
        const campName = e.currentTarget.dataset.name;
        const campCode = e.currentTarget.dataset.code;
        this.deleteCampaignAdmin(campId, campName, campCode);
      });
    });
  }

  async toggleCampaignSession(campId, newActive) {
    if (!this.client || !campId) return;
    try {
      const { error } = await this.client
        .from('campaigns')
        .update({ is_session_active: newActive, updated_at: new Date().toISOString() })
        .eq('id', campId);

      if (error) throw error;
      await this.refreshAllData();
    } catch (err) {
      alert(`Could not toggle session status: ${err.message}`);
    }
  }

  // =======================================================
  // TAB 2: USERS TABLE
  // =======================================================
  renderUsersTable() {
    const tbody = document.getElementById('tbody-users');
    if (!tbody) return;

    const query = (document.getElementById('filter-users-query')?.value || '').toLowerCase().trim();

    let filtered = this.profiles.filter(p => {
      return !query ||
        (p.username || '').toLowerCase().includes(query) ||
        (p.email || '').toLowerCase().includes(query) ||
        (p.id || '').toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--admin-muted); padding: 2rem;">
            No user profiles found.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(p => {
      const ownedCamps = this.campaigns.filter(c => c.creator_id === p.id || (c.creator_name || '').toLowerCase() === (p.username || '').toLowerCase());
      const userRequests = this.joinRequests.filter(r => r.user_id === p.id || (r.username || '').toLowerCase() === (p.username || '').toLowerCase());
      const regDate = p.created_at ? new Date(p.created_at).toLocaleDateString() : 'N/A';

      const campChips = ownedCamps.map(c => `
        <span class="code-tag" style="font-size: 8.5pt; cursor: pointer;" title="${this.escapeHTML(c.campaign_name)}">#${c.campaign_code}</span>
      `).join(' ') || '<span style="color: var(--admin-muted); font-size: 8.5pt;">None</span>';

      return `
        <tr>
          <td>
            <div style="font-family: monospace; font-size: 9pt; color: var(--admin-cyan);">${p.id}</div>
          </td>
          <td>
            <div style="font-weight: 800; color: #fff; font-size: 10pt;">${this.escapeHTML(p.username)}</div>
          </td>
          <td>
            <div style="color: var(--admin-muted); font-size: 9.5pt;">${this.escapeHTML(p.email || 'N/A')}</div>
          </td>
          <td style="color: var(--admin-muted); font-size: 9pt;">${regDate}</td>
          <td>
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; align-items: center;">
              ${campChips}
            </div>
          </td>
          <td>
            <span class="badge-pill badge-gray">${userRequests.length} submitted</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // =======================================================
  // TAB 3: JOIN REQUESTS TABLE
  // =======================================================
  renderRequestsTable() {
    const tbody = document.getElementById('tbody-requests');
    if (!tbody) return;

    const query = (document.getElementById('filter-requests-query')?.value || '').toLowerCase().trim();
    const statusFilter = document.getElementById('filter-requests-status')?.value || 'all';

    let filtered = this.joinRequests.filter(r => {
      const matchQuery = !query ||
        (r.character_name || '').toLowerCase().includes(query) ||
        (r.username || '').toLowerCase().includes(query) ||
        (r.campaign_id || '').toLowerCase().includes(query);

      let matchStatus = true;
      if (statusFilter !== 'all') matchStatus = r.status === statusFilter;

      return matchQuery && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--admin-muted); padding: 2rem;">
            No join requests matching filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(r => {
      const camp = this.campaigns.find(c => c.id === r.campaign_id || c.campaign_code === r.campaign_id);
      const campDisplay = camp ? `#${camp.campaign_code} (${camp.campaign_name})` : r.campaign_id;
      const createdStr = r.created_at ? new Date(r.created_at).toLocaleString() : 'N/A';

      let statusBadge = '<span class="badge-pill badge-amber">⏳ Pending</span>';
      if (r.status === 'approved') statusBadge = '<span class="badge-pill badge-green">✓ Approved</span>';
      if (r.status === 'rejected') statusBadge = '<span class="badge-pill badge-red">✕ Rejected</span>';

      return `
        <tr>
          <td>
            <span class="code-tag" style="font-size: 8.5pt;">${this.escapeHTML(campDisplay)}</span>
          </td>
          <td>
            <div style="font-weight: 700; color: #fff;">${this.escapeHTML(r.username)}</div>
            <div style="font-size: 8pt; color: var(--admin-muted);">${r.user_id ? r.user_id.substring(0, 8) + '...' : ''}</div>
          </td>
          <td>
            <div style="font-weight: 800; color: var(--admin-gold);">${this.escapeHTML(r.character_name)}</div>
          </td>
          <td>
            <span style="font-weight: 700; color: #fff;">PL ${r.power_level || 10}</span>
          </td>
          <td>${statusBadge}</td>
          <td style="color: var(--admin-muted); font-size: 8.5pt;">${createdStr}</td>
          <td>
            <div class="table-actions">
              <button type="button" class="btn-admin btn-admin-outline btn-admin-sm btn-inspect-char" data-id="${r.id}" title="Inspect character sheet">
                🔍 Sheet
              </button>
              ${r.status !== 'approved' ? `
                <button type="button" class="btn-admin btn-admin-primary btn-admin-sm btn-approve-request" data-id="${r.id}" title="Approve applicant">
                  ✓
                </button>
              ` : ''}
              ${r.status !== 'rejected' ? `
                <button type="button" class="btn-admin btn-admin-outline btn-admin-sm btn-reject-request" data-id="${r.id}" title="Reject applicant">
                  ✕
                </button>
              ` : ''}
              <button type="button" class="btn-admin btn-admin-danger btn-admin-sm btn-delete-request" data-id="${r.id}" title="Delete this join request">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-inspect-char').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.dataset.id;
        const req = this.joinRequests.find(r => r.id === reqId);
        if (req) this.openCharacterModal(req);
      });
    });

    tbody.querySelectorAll('.btn-approve-request').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.dataset.id;
        this.updateJoinRequestStatus(reqId, 'approved');
      });
    });

    tbody.querySelectorAll('.btn-reject-request').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.dataset.id;
        this.updateJoinRequestStatus(reqId, 'rejected');
      });
    });

    tbody.querySelectorAll('.btn-delete-request').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.dataset.id;
        this.deleteJoinRequestAdmin(reqId);
      });
    });
  }

  async updateJoinRequestStatus(reqId, newStatus) {
    if (!this.client || !reqId) return;
    try {
      const { error } = await this.client
        .from('join_requests')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', reqId);

      if (error) throw error;
      await this.refreshAllData();
    } catch (err) {
      alert(`Could not update join request: ${err.message}`);
    }
  }

  async deleteJoinRequestAdmin(reqId) {
    if (!this.client || !reqId) return;
    if (!confirm('Are you sure you want to permanently delete this join request?')) return;
    try {
      const { error } = await this.client
        .from('join_requests')
        .delete()
        .eq('id', reqId);

      if (error) throw error;
      await this.refreshAllData();
    } catch (err) {
      alert(`Could not delete join request: ${err.message}`);
    }
  }

  openCharacterModal(req) {
    const modal = document.getElementById('modal-view-character');
    const body = document.getElementById('modal-char-body');
    if (!modal || !body) return;

    const char = req.character_data || {};
    body.innerHTML = `
      <div style="background: var(--admin-bg); padding: 1rem; border-radius: 6px; border: 1px solid var(--admin-border); margin-bottom: 1rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--admin-gold); font-size: 13pt;">${this.escapeHTML(req.character_name)} (PL ${req.power_level})</h3>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 9.5pt; color: var(--admin-muted);">
          <div>Player: <strong style="color: #fff;">${this.escapeHTML(req.username)}</strong></div>
          <div>Submitted: <span style="color: #fff;">${new Date(req.created_at).toLocaleString()}</span></div>
          <div>Status: <span style="color: #fff;">${req.status}</span></div>
        </div>
      </div>

      <h4 style="color: var(--admin-text); margin: 0 0 0.5rem 0;">Raw Character JSON Data</h4>
      <pre class="json-view">${this.escapeHTML(JSON.stringify(char, null, 2))}</pre>
    `;

    modal.classList.add('open');
  }

  // =======================================================
  // TAB 4: CAMPAIGN MEMBERS TABLE
  // =======================================================
  renderMembersTable() {
    const tbody = document.getElementById('tbody-members');
    if (!tbody) return;

    const query = (document.getElementById('filter-members-query')?.value || '').toLowerCase().trim();

    let filtered = this.campaignMembers.filter(m => {
      return !query ||
        (m.character_name || '').toLowerCase().includes(query) ||
        (m.player_name || '').toLowerCase().includes(query) ||
        (m.campaign_id || '').toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--admin-muted); padding: 2rem;">
            No campaign members recorded in cloud table.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(m => {
      const camp = this.campaigns.find(c => c.id === m.campaign_id || c.campaign_code === m.campaign_id);
      const campDisplay = camp ? `#${camp.campaign_code} (${camp.campaign_name})` : m.campaign_id;
      const lastSeen = m.last_seen ? new Date(m.last_seen).toLocaleString() : 'N/A';

      return `
        <tr>
          <td><span class="code-tag">${this.escapeHTML(campDisplay)}</span></td>
          <td><strong style="color: #fff;">${this.escapeHTML(m.player_name || 'Player')}</strong></td>
          <td><span style="color: var(--admin-gold); font-weight: 700;">${this.escapeHTML(m.character_name || 'Hero')}</span></td>
          <td>PL ${m.power_level || 10}</td>
          <td>${m.is_online ? '<span class="badge-pill badge-green">Online</span>' : '<span class="badge-pill badge-gray">Offline</span>'}</td>
          <td style="color: var(--admin-muted); font-size: 8.5pt;">${lastSeen}</td>
          <td>
            <button type="button" class="btn-admin btn-admin-danger btn-admin-sm btn-remove-member" data-camp="${m.campaign_id}" data-user="${m.user_id}">
              🗑️ Remove
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-remove-member').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const campId = e.currentTarget.dataset.camp;
        const userId = e.currentTarget.dataset.user;
        this.removeMemberAdmin(campId, userId);
      });
    });
  }

  async removeMemberAdmin(campaignId, userId) {
    if (!this.client || !campaignId || !userId) return;
    if (!confirm('Remove this member from the campaign roster?')) return;
    try {
      const { error } = await this.client
        .from('campaign_members')
        .delete()
        .eq('campaign_id', campaignId)
        .eq('user_id', userId);

      if (error) throw error;
      await this.refreshAllData();
    } catch (err) {
      alert(`Could not remove member: ${err.message}`);
    }
  }

  // =======================================================
  // TAB 5: LOCAL STORAGE & ORPHAN DIAGNOSTICS
  // =======================================================
  scanLocalStorage() {
    const tbody = document.getElementById('tbody-local-campaigns');
    if (!tbody) return;

    this.localCampaigns = [];
    const knownGMs = ['captainload'];
    const cloudCodes = new Set(this.campaigns.map(c => String(c.campaign_code || '').toUpperCase()));
    const cloudIds = new Set(this.campaigns.map(c => String(c.id || '').toUpperCase()));

    // 1. Read mm3e_campaign_registry
    try {
      const rawReg = localStorage.getItem('mm3e_campaign_registry');
      if (rawReg) {
        const reg = JSON.parse(rawReg);
        Object.keys(reg).forEach(code => {
          const entry = reg[code];
          this.localCampaigns.push({
            code: String(code).toUpperCase().replace(/^#+/, ''),
            name: entry.campaignName || code,
            creator: entry.creatorName || 'Unknown',
            source: 'mm3e_campaign_registry',
            raw: entry
          });
        });
      }
    } catch (e) {}

    // 2. Read mm3e_campaigns_history
    try {
      const rawHist = localStorage.getItem('mm3e_campaigns_history');
      if (rawHist) {
        const hist = JSON.parse(rawHist);
        if (Array.isArray(hist)) {
          hist.forEach(h => {
            const clean = String(h.campaignId || '').toUpperCase().replace(/^#+/, '');
            if (!this.localCampaigns.some(x => x.code === clean)) {
              this.localCampaigns.push({
                code: clean,
                name: h.campaignName || clean,
                creator: h.creatorName || (h.isCreator ? 'Local Creator' : 'Unknown'),
                source: 'mm3e_campaigns_history',
                raw: h
              });
            }
          });
        }
      }
    } catch (e) {}

    let orphanCount = 0;
    this.localCampaigns.forEach(c => {
      const inCloud = cloudCodes.has(c.code) || cloudIds.has(c.code);
      const isKnownGM = knownGMs.includes((c.creator || '').toLowerCase());
      c.isCloudVerified = inCloud;
      c.isOrphan = !inCloud && !isKnownGM;
      if (c.isOrphan) orphanCount++;
    });

    document.getElementById('stat-orphans-count').textContent = orphanCount;
    document.getElementById('badge-tab-orphans').textContent = orphanCount;

    if (this.localCampaigns.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--admin-muted); padding: 2rem;">
            No campaigns currently stored in this browser's local cache.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.localCampaigns.map(c => {
      let statusBadge = '<span class="badge-pill badge-green">✓ Cloud Verified</span>';
      if (c.isOrphan) {
        statusBadge = '<span class="badge-pill badge-red">⚠️ Local Storage Orphan</span>';
      } else if (!c.isCloudVerified) {
        statusBadge = '<span class="badge-pill badge-amber">Local Test (Known GM)</span>';
      }

      return `
        <tr>
          <td><span class="code-tag">#${c.code}</span></td>
          <td><strong style="color: #fff;">${this.escapeHTML(c.name)}</strong></td>
          <td style="color: var(--admin-gold); font-weight: 700;">${this.escapeHTML(c.creator)}</td>
          <td>${statusBadge}</td>
          <td style="font-family: monospace; font-size: 8.5pt; color: var(--admin-muted);">${c.source}</td>
          <td>
            <button type="button" class="btn-admin btn-admin-danger btn-admin-sm btn-delete-single-local" data-code="${c.code}" data-name="${this.escapeHTML(c.name)}">
              🗑️ Delete Local Record
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-delete-single-local').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.dataset.code;
        const name = e.currentTarget.dataset.name;
        this.deleteLocalCampaignSingle(code, name);
      });
    });
  }

  deleteLocalCampaignSingle(code, name) {
    if (!confirm(`Delete local storage copy of campaign "${name}" (#${code})?`)) return;

    // Remove from registry
    try {
      const reg = JSON.parse(localStorage.getItem('mm3e_campaign_registry') || '{}');
      delete reg[code];
      localStorage.setItem('mm3e_campaign_registry', JSON.stringify(reg));
    } catch {}

    // Remove from history
    try {
      const hist = JSON.parse(localStorage.getItem('mm3e_campaigns_history') || '[]');
      const filtered = hist.filter(c => String(c.campaignId || '').toUpperCase().replace(/^#+/, '') !== code);
      localStorage.setItem('mm3e_campaigns_history', JSON.stringify(filtered));
    } catch {}

    this.scanLocalStorage();
    alert(`Local storage record for #${code} removed.`);
  }

  purgeLocalOrphans() {
    const orphans = this.localCampaigns.filter(c => c.isOrphan);
    if (orphans.length === 0) {
      alert('No local orphan campaigns found! All cached campaigns in this browser match official cloud campaigns or known GM accounts.');
      return;
    }

    const listStr = orphans.map(c => `• "${c.name}" (#${c.code}) — GM: ${c.creator}`).join('\n');
    if (!confirm(`Purge ${orphans.length} local orphan campaign(s) from this browser?\n\n${listStr}\n\nThis will remove them from your browser's local cache.`)) {
      return;
    }

    const orphanCodes = new Set(orphans.map(o => o.code));

    // Clean registry
    try {
      const reg = JSON.parse(localStorage.getItem('mm3e_campaign_registry') || '{}');
      orphanCodes.forEach(code => delete reg[code]);
      localStorage.setItem('mm3e_campaign_registry', JSON.stringify(reg));
    } catch {}

    // Clean history
    try {
      const hist = JSON.parse(localStorage.getItem('mm3e_campaigns_history') || '[]');
      const filtered = hist.filter(c => !orphanCodes.has(String(c.campaignId || '').toUpperCase().replace(/^#+/, '')));
      localStorage.setItem('mm3e_campaigns_history', JSON.stringify(filtered));
    } catch {}

    this.scanLocalStorage();
    alert(`Successfully purged ${orphans.length} orphan campaign(s) from local browser storage.`);
  }

  resyncBrowserCacheWithCloud() {
    if (this.campaigns.length === 0) {
      alert('No cloud campaigns available to sync.');
      return;
    }

    if (!confirm(`Resync browser cache with all ${this.campaigns.length} cloud campaigns from Supabase?`)) {
      return;
    }

    try {
      const newReg = {};
      const newHist = [];

      this.campaigns.forEach(c => {
        const code = String(c.campaign_code).toUpperCase();
        newReg[code] = {
          campaignId: code,
          campaignName: c.campaign_name,
          powerLevel: c.power_level,
          dontEnforcePL: !!c.dont_enforce_pl,
          creatorName: c.creator_name,
          creator_id: c.creator_id,
          isPublic: true,
          notes: ''
        };

        newHist.push({
          campaignId: code,
          campaignName: c.campaign_name,
          powerLevel: c.power_level,
          dontEnforcePL: !!c.dont_enforce_pl,
          creatorName: c.creator_name,
          creator_id: c.creator_id,
          isCreator: false,
          isConnected: false
        });
      });

      localStorage.setItem('mm3e_campaign_registry', JSON.stringify(newReg));
      localStorage.setItem('mm3e_campaigns_history', JSON.stringify(newHist));

      this.scanLocalStorage();
      alert(`Local storage successfully synchronized with ${this.campaigns.length} cloud campaign(s).`);
    } catch (e) {
      alert(`Failed to resync local cache: ${e.message}`);
    }
  }

  // =======================================================
  // TAB 6: BACKUP & JSON EXPORT
  // =======================================================
  exportDatabaseJSON() {
    const backup = {
      app: 'Mutants & Masterminds 3E Database Admin',
      version: '4.03',
      exported_at: new Date().toISOString(),
      exported_by: this.githubUser ? `github:${this.githubUser.login}` : 'admin',
      database_tables: {
        campaigns: this.campaigns,
        profiles: this.profiles,
        join_requests: this.joinRequests,
        campaign_members: this.campaignMembers
      }
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mm3e_database_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  inspectTable(tableName) {
    const display = document.getElementById('raw-json-display');
    if (!display) return;

    let data = [];
    if (tableName === 'campaigns') data = this.campaigns;
    if (tableName === 'profiles') data = this.profiles;
    if (tableName === 'join_requests') data = this.joinRequests;
    if (tableName === 'campaign_members') data = this.campaignMembers;

    display.textContent = JSON.stringify(data, null, 2);
  }

  // =======================================================
  // CRUD OPERATIONS: CAMPAIGNS
  // =======================================================
  openCreateCampaignModal() {
    const modal = document.getElementById('modal-create-campaign');
    const selectCreator = document.getElementById('new-camp-creator');
    if (!modal || !selectCreator) return;

    selectCreator.innerHTML = this.profiles.map(p => `
      <option value="${p.id}" data-name="${this.escapeHTML(p.username)}">
        ${this.escapeHTML(p.username)} (${p.email || 'No email'})
      </option>
    `).join('') || '<option value="">No registered profiles found</option>';

    modal.classList.add('open');
  }

  async saveNewCampaign() {
    if (!this.client) return;

    const name = document.getElementById('new-camp-name')?.value.trim();
    let code = document.getElementById('new-camp-code')?.value.trim().toUpperCase().replace(/^#+/, '');
    const pl = parseInt(document.getElementById('new-camp-pl')?.value, 10) || 10;
    const enforcePL = !document.getElementById('new-camp-enforce-pl')?.checked;

    const selectCreator = document.getElementById('new-camp-creator');
    const creatorId = selectCreator?.value;
    const creatorName = selectCreator?.options[selectCreator.selectedIndex]?.dataset.name || 'GM';

    if (!name) {
      alert('Campaign Name is required.');
      return;
    }

    if (!code) {
      const prefix = name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase().padEnd(4, 'X');
      const num = Math.floor(1000 + Math.random() * 9000);
      code = `${prefix}-${num}`;
    }

    try {
      const { data, error } = await this.client
        .from('campaigns')
        .insert([{
          campaign_code: code,
          campaign_name: name,
          creator_id: creatorId || 'admin',
          creator_name: creatorName,
          power_level: pl,
          dont_enforce_pl: !enforcePL,
          is_session_active: false
        }])
        .select()
        .single();

      if (error) throw error;

      document.getElementById('modal-create-campaign')?.classList.remove('open');
      document.getElementById('form-create-campaign')?.reset();
      await this.refreshAllData();
      alert(`Campaign "${name}" (#${code}) created successfully!`);
    } catch (err) {
      alert(`Could not create campaign: ${err.message}`);
    }
  }

  openEditCampaignModal(campId) {
    const modal = document.getElementById('modal-edit-campaign');
    const camp = this.campaigns.find(c => c.id === campId);
    if (!modal || !camp) return;

    document.getElementById('edit-camp-id').value = camp.id;
    document.getElementById('edit-camp-code').value = '#' + camp.campaign_code;
    document.getElementById('edit-camp-name').value = camp.campaign_name;
    document.getElementById('edit-camp-pl').value = camp.power_level;
    document.getElementById('edit-camp-enforce-pl').checked = !!camp.dont_enforce_pl;
    document.getElementById('edit-camp-session-active').checked = !!camp.is_session_active;

    modal.classList.add('open');
  }

  async saveEditedCampaign() {
    if (!this.client) return;

    const campId = document.getElementById('edit-camp-id')?.value;
    const name = document.getElementById('edit-camp-name')?.value.trim();
    const pl = parseInt(document.getElementById('edit-camp-pl')?.value, 10) || 10;
    const dontEnforce = document.getElementById('edit-camp-enforce-pl')?.checked;
    const sessionActive = document.getElementById('edit-camp-session-active')?.checked;

    if (!campId || !name) {
      alert('Campaign Name is required.');
      return;
    }

    try {
      const { error } = await this.client
        .from('campaigns')
        .update({
          campaign_name: name,
          power_level: pl,
          dont_enforce_pl: dontEnforce,
          is_session_active: sessionActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', campId);

      if (error) throw error;

      document.getElementById('modal-edit-campaign')?.classList.remove('open');
      await this.refreshAllData();
      alert(`Campaign settings updated.`);
    } catch (err) {
      alert(`Could not update campaign: ${err.message}`);
    }
  }

  async deleteCampaignAdmin(campId, campName, campCode) {
    if (!this.client || !campId) return;

    const promptConfirm = prompt(`Are you sure you want to PERMANENTLY DELETE campaign "${campName}" (#${campCode}) from the cloud database?\n\nType the campaign code "${campCode}" below to confirm:`);
    if (!promptConfirm || promptConfirm.trim().toUpperCase() !== campCode.toUpperCase()) {
      alert('Deletion cancelled: confirmation code did not match.');
      return;
    }

    try {
      // 1. Delete associated join requests
      try {
        await this.client.from('join_requests').delete().or(`campaign_id.eq.${campId},campaign_id.eq.${campCode}`);
      } catch {}

      // 2. Delete associated campaign members
      try {
        await this.client.from('campaign_members').delete().or(`campaign_id.eq.${campId},campaign_id.eq.${campCode}`);
      } catch {}

      // 3. Delete campaign row
      const { error } = await this.client
        .from('campaigns')
        .delete()
        .eq('id', campId);

      if (error) throw error;

      // 4. Also clean from local storage if present
      try {
        const reg = JSON.parse(localStorage.getItem('mm3e_campaign_registry') || '{}');
        delete reg[campCode];
        localStorage.setItem('mm3e_campaign_registry', JSON.stringify(reg));
      } catch {}

      try {
        const hist = JSON.parse(localStorage.getItem('mm3e_campaigns_history') || '[]');
        const filtered = hist.filter(c => String(c.campaignId || '').toUpperCase().replace(/^#+/, '') !== campCode);
        localStorage.setItem('mm3e_campaigns_history', JSON.stringify(filtered));
      } catch {}

      await this.refreshAllData();
      alert(`Campaign "${campName}" (#${campCode}) has been permanently deleted from Supabase.`);
    } catch (err) {
      alert(`Could not delete campaign: ${err.message}`);
    }
  }

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Instantiate Admin Console
function initAdmin() {
  if (!window.adminController) {
    window.adminController = new DatabaseAdminController();
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initAdmin);
} else {
  initAdmin();
}
