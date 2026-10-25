/**
 * Discord Integration for Mutants & Masterminds 3rd Edition
 * Echoes rolls, checks, and hero point spends to Discord via Webhooks.
 */

export class DiscordIntegrator {
  constructor() {
    this.webhookUrl = localStorage.getItem('mm3e_discord_webhook') || '';
    this.enabled = localStorage.getItem('mm3e_discord_enabled') === 'true';
    this.botName = localStorage.getItem('mm3e_discord_botname') || 'M&M 3e Virtual Tabletop';
    this.avatarUrl = localStorage.getItem('mm3e_discord_avatar') || 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f9b8.png';
  }

  saveSettings({ webhookUrl, enabled, botName, avatarUrl }) {
    this.webhookUrl = webhookUrl.trim();
    this.enabled = !!enabled;
    this.botName = (botName || 'M&M 3e Virtual Tabletop').trim();
    this.avatarUrl = (avatarUrl || '').trim();

    localStorage.setItem('mm3e_discord_webhook', this.webhookUrl);
    localStorage.setItem('mm3e_discord_enabled', this.enabled ? 'true' : 'false');
    localStorage.setItem('mm3e_discord_botname', this.botName);
    localStorage.setItem('mm3e_discord_avatar', this.avatarUrl);
  }

  async sendRollEmbed(roll) {
    if (!this.enabled || !this.webhookUrl) return;

    let embedColor = 0x3498db; // blue default
    if (roll.isCriticalHit) {
      embedColor = 0xf1c40f; // gold
    } else if (roll.outcomeClass === 'success') {
      embedColor = 0x2ecc71; // green
    } else if (roll.outcomeClass === 'failure') {
      embedColor = 0xe74c3c; // red
    } else if (roll.isHeroPointReroll) {
      embedColor = 0x9b59b6; // purple
    }

    let diceString = `d20 (${roll.rawDie})`;
    if (roll.heroPointAdjusted) {
      diceString = `d20 (${roll.rawDie} ➜ **${roll.effectiveDie}** Hero Point +10)`;
    }
    const modString = roll.modifier >= 0 ? `+ ${roll.modifier}` : `- ${Math.abs(roll.modifier)}`;
    const mathBreakdown = `${diceString} ${modString} = **${roll.total}**`;

    const fields = [
      {
        name: 'Result',
        value: mathBreakdown,
        inline: true
      }
    ];

    if (roll.targetDC !== null && roll.targetDC !== undefined && roll.targetDC !== '') {
      fields.push({
        name: 'Target DC',
        value: `**${roll.targetDC}**`,
        inline: true
      });
    }

    if (roll.outcome) {
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

    const payload = {
      username: this.botName || 'M&M 3e Dice Roller',
      avatar_url: this.avatarUrl || undefined,
      embeds: [
        {
          title: `🎲 ${roll.title}`,
          author: {
            name: `${roll.characterName || 'Hero'}`
          },
          color: embedColor,
          fields,
          footer: {
            text: `Mutants & Masterminds 3e • ${roll.timestamp}`
          }
        }
      ]
    };

    return this.postPayload(payload);
  }

  async sendHeroPointSpend(characterName, spendType, spendDetails) {
    if (!this.enabled || !this.webhookUrl) return;

    const payload = {
      username: this.botName || 'M&M 3e Dice Roller',
      avatar_url: this.avatarUrl || undefined,
      embeds: [
        {
          title: `⚡ HERO POINT SPENT!`,
          author: {
            name: characterName || 'Hero'
          },
          color: 0x9b59b6, // purple
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
        }
      ]
    };

    return this.postPayload(payload);
  }

  async testConnection() {
    if (!this.webhookUrl) {
      throw new Error('Please enter a valid Discord Webhook URL first.');
    }

    const payload = {
      username: this.botName || 'M&M 3e Dice Roller',
      avatar_url: this.avatarUrl || undefined,
      embeds: [
        {
          title: `✅ Discord Integration Connected!`,
          color: 0x2ecc71,
          description: 'The Mutants & Masterminds 3e Character Creator & Interactive Record is now successfully linked to this Discord channel! Rolls and hero point spends will echo here.',
          footer: {
            text: `Connected at ${new Date().toLocaleTimeString()}`
          }
        }
      ]
    };

    return this.postPayload(payload);
  }

  async postPayload(payload) {
    try {
      const resp = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(`Discord API responded with status ${resp.status}: ${text}`);
      }
      return { success: true };
    } catch (err) {
      console.warn('Discord Webhook error:', err);
      return { success: false, error: err.message };
    }
  }
}

export const discordIntegrator = new DiscordIntegrator();
