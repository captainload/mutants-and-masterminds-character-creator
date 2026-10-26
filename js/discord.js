/**
 * Discord Integration for Mutants & Masterminds 3rd Edition
 * Multi-Configuration Manager supporting both Webhook and Bot API channels.
 * Supports automatic default naming (Server - #Channel combo).
 */

export class DiscordConfig {
  constructor(data = {}) {
    this.id = data.id || 'dc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    this.name = (data.name || '').trim();
    this.serverName = (data.serverName || '').trim();
    this.channelName = (data.channelName || '').trim().replace(/^#/, '');
    this.type = data.type === 'bot' ? 'bot' : 'webhook'; // 'webhook' or 'bot'
    this.webhookUrl = (data.webhookUrl || '').trim();
    this.botToken = (data.botToken || '').trim();
    this.channelId = (data.channelId || '').trim();
    this.botName = (data.botName || 'M&M 3E Hero Roller').trim();
    this.avatarUrl = (data.avatarUrl || 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f9b8.png').trim();
    this.enabled = data.enabled !== undefined ? !!data.enabled : true;
  }

  getDisplayName() {
    if (this.name && this.name.length > 0) {
      return this.name;
    }
    const s = this.serverName;
    const c = this.channelName;
    if (s && c) return `${s} #${c}`;
    if (s) return `${s} (Discord)`;
    if (c) return `#${c}`;
    return 'Discord Channel';
  }
}

export class DiscordIntegrator {
  constructor() {
    this.configs = [];
    this.loadConfigs();
  }

  loadConfigs() {
    if (typeof localStorage === 'undefined') return;
    try {
      const stored = localStorage.getItem('mm3e_discord_configs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.configs = parsed.map(c => new DiscordConfig(c));
        }
      }
    } catch (e) {
      console.warn('Failed to parse mm3e_discord_configs:', e);
      this.configs = [];
    }

    // Legacy migration check
    if (this.configs.length === 0) {
      const legacyWebhook = localStorage.getItem('mm3e_discord_webhook');
      if (legacyWebhook && legacyWebhook.trim()) {
        const legacyEnabled = localStorage.getItem('mm3e_discord_enabled') === 'true';
        const legacyBotName = localStorage.getItem('mm3e_discord_botname') || 'M&M 3E Hero Roller';
        const legacyAvatar = localStorage.getItem('mm3e_discord_avatar') || '';
        const initialConfig = new DiscordConfig({
          name: '',
          serverName: 'Campaign Server',
          channelName: 'dice-rolls',
          type: 'webhook',
          webhookUrl: legacyWebhook,
          enabled: legacyEnabled,
          botName: legacyBotName,
          avatarUrl: legacyAvatar
        });
        this.configs.push(initialConfig);
        this.saveConfigs();
      }
    }
  }

  saveConfigs() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('mm3e_discord_configs', JSON.stringify(this.configs));
    } catch (e) {
      console.error('Failed to save mm3e_discord_configs:', e);
    }
  }

  get enabled() {
    return this.configs.some(c => c.enabled);
  }

  getConfigs() {
    return this.configs;
  }

  getConfig(id) {
    return this.configs.find(c => c.id === id) || null;
  }

  saveConfig(data) {
    const existingIndex = this.configs.findIndex(c => c.id === data.id);
    const updated = new DiscordConfig(data);
    if (existingIndex >= 0) {
      this.configs[existingIndex] = updated;
    } else {
      this.configs.push(updated);
    }
    this.saveConfigs();
    return updated;
  }

  deleteConfig(id) {
    this.configs = this.configs.filter(c => c.id !== id);
    this.saveConfigs();
  }

  toggleConfigEnabled(id, isEnabled) {
    const config = this.getConfig(id);
    if (config) {
      config.enabled = !!isEnabled;
      this.saveConfigs();
    }
  }

  buildEmbedFromRoll(roll) {
    let embedColor = 0x3498db; // Blue
    if (roll.rollType === 'initiative') {
      embedColor = 0xf39c12; // Gold/Amber for Initiative
    } else if (roll.isCriticalHit) {
      embedColor = 0xf1c40f; // Gold
    } else if (roll.outcomeClass === 'success') {
      embedColor = 0x2ecc71; // Green
    } else if (roll.outcomeClass === 'failure') {
      embedColor = 0xe74c3c; // Red
    } else if (roll.isHeroPointReroll) {
      embedColor = 0x9b59b6; // Purple
    }

    let diceString = `d20 (${roll.rawDie})`;
    if (roll.heroPointAdjusted) {
      diceString = `d20 (${roll.rawDie} ➜ **${roll.effectiveDie}** Hero Point +10)`;
    }
    const modString = roll.modifier >= 0 ? `+ ${roll.modifier}` : `- ${Math.abs(roll.modifier)}`;
    const mathBreakdown = `${diceString} ${modString} = **${roll.total}**`;

    const fields = [
      {
        name: roll.rollType === 'initiative' ? 'Initiative Score' : 'Result',
        value: mathBreakdown,
        inline: true
      }
    ];

    if (roll.rollType !== 'initiative' && roll.targetDC !== null && roll.targetDC !== undefined && roll.targetDC !== '') {
      fields.push({
        name: 'Target DC',
        value: `**${roll.targetDC}**`,
        inline: true
      });
    }

    if (roll.rollType !== 'initiative' && roll.outcome) {
      const icon = roll.outcomeClass === 'success' ? '✅' : '❌';
      fields.push({
        name: 'Outcome',
        value: `${icon} **${roll.outcome}** (${roll.outcomeDescription})`,
        inline: false
      });
    }

    if (roll.isCriticalHit) {
      fields.push({
        name: '💥 CRITICAL HIT!',
        value: '+5 to effect rank or alternate effect!',
        inline: false
      });
    }

    if (roll.descriptor) {
      fields.push({
        name: 'Descriptors',
        value: `*${roll.descriptor}*`,
        inline: true
      });
    }

    if (roll.damageRank) {
      fields.push({
        name: 'Damage Rank',
        value: `Rank **${roll.damageRank}** (Toughness DC ${15 + parseInt(roll.damageRank, 10)})`,
        inline: true
      });
    }

    if (roll.extraText) {
      fields.push({
        name: 'Details',
        value: roll.extraText,
        inline: false
      });
    }

    return {
      title: `🎲 ${roll.title}`,
      author: {
        name: `${roll.characterName || 'Hero'}`
      },
      color: embedColor,
      fields,
      footer: {
        text: `Mutants & Masterminds 3e • ${roll.timestamp || new Date().toLocaleTimeString()}`
      }
    };
  }

  async sendRollEmbed(roll) {
    const activeConfigs = this.configs.filter(c => c.enabled);
    if (activeConfigs.length === 0) return;

    const embed = this.buildEmbedFromRoll(roll);

    const promises = activeConfigs.map(config => {
      const payload = {
        username: config.botName || 'M&M 3E Hero Roller',
        avatar_url: config.avatarUrl || undefined,
        embeds: [embed]
      };
      return this.dispatchToConfig(config, payload);
    });

    return Promise.allSettled(promises);
  }

  async sendHeroPointSpend(characterName, spendType, spendDetails) {
    const activeConfigs = this.configs.filter(c => c.enabled);
    if (activeConfigs.length === 0) return;

    const embed = {
      title: `⚡ HERO POINT SPENT!`,
      author: {
        name: characterName || 'Hero'
      },
      color: 0x9b59b6, // Purple
      description: `**${characterName}** expended 1 Hero Point for **${spendType}**!`,
      fields: [
        {
          name: 'Benefit',
          value: spendDetails,
          inline: false
        }
      ],
      footer: {
        text: `Mutants & Masterminds 3e • ${new Date().toLocaleTimeString()}`
      }
    };

    const promises = activeConfigs.map(config => {
      const payload = {
        username: config.botName || 'M&M 3E Hero Roller',
        avatar_url: config.avatarUrl || undefined,
        embeds: [embed]
      };
      return this.dispatchToConfig(config, payload);
    });

    return Promise.allSettled(promises);
  }

  async testConfig(config) {
    const embed = {
      title: `✅ Discord Integration Verified!`,
      color: 0x2ecc71,
      description: `The **Mutants & Masterminds 3E Character Architect** has successfully established communication with **${config.getDisplayName()}** via **${config.type === 'bot' ? 'Discord Bot API' : 'Discord Webhook'}**!`,
      fields: [
        {
          name: 'Configuration Mode',
          value: config.type === 'bot' ? '🤖 Bot API' : '🔗 Webhook',
          inline: true
        },
        {
          name: 'Channel',
          value: config.channelName ? `#${config.channelName}` : (config.channelId || 'Default'),
          inline: true
        }
      ],
      footer: {
        text: `Connected • ${new Date().toLocaleTimeString()}`
      }
    };

    const payload = {
      username: config.botName || 'M&M 3E Hero Roller',
      avatar_url: config.avatarUrl || undefined,
      embeds: [embed]
    };

    return this.dispatchToConfig(config, payload);
  }

  async dispatchToConfig(config, payload) {
    if (config.type === 'webhook') {
      if (!config.webhookUrl) {
        throw new Error('Discord Webhook URL is empty.');
      }
      const resp = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(`Discord Webhook error (HTTP ${resp.status}): ${text}`);
      }
      return { success: true };
    } else if (config.type === 'bot') {
      if (!config.botToken) {
        throw new Error('Discord Bot Token is empty.');
      }
      if (!config.channelId) {
        throw new Error('Discord Channel ID is empty.');
      }

      // Format clean bot token if user pasted 'Bot ' prefix
      const cleanToken = config.botToken.startsWith('Bot ') ? config.botToken : `Bot ${config.botToken}`;
      const url = `https://discord.com/api/v10/channels/${config.channelId}/messages`;

      const botPayload = {
        embeds: payload.embeds
      };

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': cleanToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(botPayload)
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(`Discord Bot API error (HTTP ${resp.status}): ${text}`);
      }
      return { success: true };
    } else {
      throw new Error(`Unknown configuration type: ${config.type}`);
    }
  }
}

export const discordIntegrator = new DiscordIntegrator();
