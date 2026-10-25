/**
 * Dice Rolling Engine for Mutants & Masterminds 3rd Edition
 * Supports standard d20 checks, Hero Point rerolls (1-10 + 10), critical hits,
 * and DC degree-of-success calculations.
 */

export class DiceRoller {
  constructor() {
    this.history = [];
    this.subscribers = [];
  }

  onRoll(callback) {
    this.subscribers.push(callback);
  }

  notify(rollResult) {
    this.history.unshift(rollResult);
    if (this.history.length > 50) this.history.pop();
    this.subscribers.forEach(cb => {
      try { cb(rollResult); } catch (e) { console.error('Roll subscriber error', e); }
    });
  }

  /**
   * Performs an M&M 3e check.
   */
  rollCheck({
    title = 'Check',
    characterName = 'Hero',
    modifier = 0,
    targetDC = null,
    critThreshold = 20,
    isHeroPointReroll = false,
    rollType = 'general',
    descriptor = '',
    damageRank = null,
    extraText = ''
  }) {
    const rawDie = Math.floor(Math.random() * 20) + 1;
    let effectiveDie = rawDie;
    let heroPointAdjusted = false;

    // Mutants & Masterminds 3e Hero Point Reroll Rule:
    // If the d20 roll is 10 or less, add 10 to the die!
    if (isHeroPointReroll && rawDie <= 10) {
      effectiveDie = rawDie + 10;
      heroPointAdjusted = true;
    }

    const total = effectiveDie + modifier;
    const isNatural20 = rawDie === 20;
    const isNatural1 = rawDie === 1;
    const isCriticalHit = rollType === 'attack' && (rawDie >= critThreshold);

    let degrees = null;
    let outcome = null;
    let outcomeClass = 'neutral';
    let outcomeDescription = '';

    if (targetDC !== null && targetDC !== undefined && targetDC !== '') {
      const dc = parseInt(targetDC, 10);
      const diff = total - dc;

      if (diff >= 0) {
        // Success
        const degreeRank = Math.floor(diff / 5) + 1;
        outcome = 'Success';
        outcomeClass = 'success';
        degrees = Math.min(4, degreeRank);

        if (rollType === 'toughness') {
          outcomeDescription = `Resisted harm! No damage taken (${degrees} Degree${degrees > 1 ? 's' : ''} of Success).`;
        } else {
          outcomeDescription = `${degrees} Degree${degrees > 1 ? 's' : ''} of Success!`;
        }
      } else {
        // Failure
        const failDiff = Math.abs(diff);
        // diff -1 to -4 is 1st degree; -5 to -9 is 2nd degree; -10 to -14 is 3rd degree; -15 or more is 4th degree
        const degreeRank = Math.floor((failDiff - 1) / 5) + 1;
        degrees = Math.min(4, degreeRank);
        outcome = 'Failure';
        outcomeClass = 'failure';

        if (rollType === 'toughness') {
          if (degrees === 1) {
            outcomeDescription = '1st Degree Failure: +1 Bruise (-1 penalty to future Toughness checks).';
          } else if (degrees === 2) {
            outcomeDescription = '2nd Degree Failure: Dazed for 1 round + 1 Bruise (-1 penalty).';
          } else if (degrees === 3) {
            outcomeDescription = '3rd Degree Failure: Staggered + 1 Bruise (-1 penalty)! (Second Staggered = Incapacitated).';
          } else {
            outcomeDescription = '4th Degree Failure: INCAPACITATED immediately!';
          }
        } else {
          outcomeDescription = `${degrees} Degree${degrees > 1 ? 's' : ''} of Failure.`;
        }
      }
    }

    const rollData = {
      id: 'roll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      characterName,
      title,
      rollType,
      modifier,
      rawDie,
      effectiveDie,
      heroPointAdjusted,
      isHeroPointReroll,
      critThreshold,
      isCriticalHit,
      isNatural20,
      isNatural1,
      total,
      targetDC,
      degrees,
      outcome,
      outcomeClass,
      outcomeDescription,
      descriptor,
      damageRank,
      extraText
    };

    this.notify(rollData);
    return rollData;
  }
}

export const diceRoller = new DiceRoller();
