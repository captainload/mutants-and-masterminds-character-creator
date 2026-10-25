/**
 * Mutants & Masterminds 3rd Edition Dice Rolling Engine
 * Supports standard d20 checks, Hero Point rerolls (1-10 + 10), critical hits,
 * target DC comparisons, and common dice notation (e.g., "d20+8", "3d6+4", "2d10").
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
   * Parses and executes arbitrary dice notation (e.g. "d20+8", "1d20+12", "3d6+5", "2d10-1", "d100").
   */
  rollNotation(notationString, characterName = 'Hero', targetDC = null) {
    const clean = notationString.trim().toLowerCase();
    const regex = /^(\d+)?d(\d+)([\+\-]\d+)?$/i;
    const match = clean.match(regex);

    if (!match) {
      // Fallback: check if user just typed a number like "+8" or "8" (assume d20)
      const numberMatch = clean.match(/^([\+\-]?\d+)$/);
      if (numberMatch) {
        const mod = parseInt(numberMatch[1], 10);
        return this.rollCheck({
          title: `Custom Check (d20${mod >= 0 ? '+' + mod : mod})`,
          characterName,
          modifier: mod,
          targetDC,
          rollType: 'custom'
        });
      }
      throw new Error(`Invalid dice notation "${notationString}". Use format like d20+8, 2d6, or 3d6+2.`);
    }

    const count = parseInt(match[1] || '1', 10);
    const sides = parseInt(match[2], 10);
    const mod = match[3] ? parseInt(match[3], 10) : 0;

    if (count > 50 || sides > 1000) {
      throw new Error('Dice count or sides too high.');
    }

    const rolls = [];
    let diceSum = 0;
    for (let i = 0; i < count; i++) {
      const val = Math.floor(Math.random() * sides) + 1;
      rolls.push(val);
      diceSum += val;
    }

    const total = diceSum + mod;
    const isSingleD20 = count === 1 && sides === 20;

    let degrees = null;
    let outcome = null;
    let outcomeClass = 'neutral';
    let outcomeDescription = '';

    if (targetDC !== null && targetDC !== undefined && targetDC !== '') {
      const dc = parseInt(targetDC, 10);
      const diff = total - dc;
      if (diff >= 0) {
        degrees = Math.min(4, Math.floor(diff / 5) + 1);
        outcome = 'Success';
        outcomeClass = 'success';
        outcomeDescription = `${degrees} Degree${degrees > 1 ? 's' : ''} of Success!`;
      } else {
        degrees = Math.min(4, Math.floor((Math.abs(diff) - 1) / 5) + 1);
        outcome = 'Failure';
        outcomeClass = 'failure';
        outcomeDescription = `${degrees} Degree${degrees > 1 ? 's' : ''} of Failure.`;
      }
    }

    const rollData = {
      id: 'roll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      characterName,
      title: `Dice Roll: ${notationString}`,
      rollType: 'notation',
      notation: notationString,
      rawDie: isSingleD20 ? rolls[0] : rolls.join(', '),
      effectiveDie: diceSum,
      modifier: mod,
      total,
      targetDC,
      degrees,
      outcome,
      outcomeClass,
      outcomeDescription,
      isNatural20: isSingleD20 && rolls[0] === 20,
      isNatural1: isSingleD20 && rolls[0] === 1,
      isCriticalHit: isSingleD20 && rolls[0] === 20,
      extraText: `Dice: [${rolls.join(', ')}] ${mod !== 0 ? (mod > 0 ? '+ ' + mod : '- ' + Math.abs(mod)) : ''}`
    };

    this.notify(rollData);
    return rollData;
  }

  /**
   * Standard M&M 3e check roll with degrees of success, toughness bruises, and Hero Point mechanics.
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
        const failDiff = Math.abs(diff);
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
