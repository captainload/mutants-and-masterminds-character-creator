export class AppControllerMock {
  constructor() {
    this.char = { name: '', playerName: '', campaign: '', campaignId: '' };
    this.primaryChar = this.char;
    this.mockOnlineUsername = 'OnlineUser';
  }

  isCharacterAttachedToCampaign(char = this.char) {
    if (!char) return false;
    const campId = String(char.campaignId || '').trim();
    const campName = String(char.campaign || char.lastCampaign || '').trim();
    if (campId) return true;
    if (campName && campName !== 'Earth-Prime' && campName !== 'None') return true;
    return false;
  }

  syncPlayerNameWithCampaignAttachment() {
    if (!this.char) return;
    const isCampaign = this.isCharacterAttachedToCampaign(this.char);
    if (isCampaign) {
      const onlineUname = this.mockOnlineUsername || '';
      if (onlineUname) {
        this.char.playerName = onlineUname;
        if (this.primaryChar && this.primaryChar !== this.char) {
          this.primaryChar.playerName = onlineUname;
        }
      }
    }
  }
}
