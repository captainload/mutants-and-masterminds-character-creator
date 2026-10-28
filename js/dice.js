/**
 * Mutants & Masterminds 3rd Edition Dice Rolling Engine
 * Supports standard d20 checks, Hero Point rerolls (1-10 + 10), critical hits,
 * target DC comparisons, and common dice notation (e.g., "d20+8", "3d6+4", "2d10").
 */

export class DiceRoller {
  constructor() {
    this.history = [];
    this.subscribers = [];
    this.lastFailedCheck = null;
    this.mostRecentCheck = null;
  }

  onRoll(callback) {
    this.subscribers.push(callback);
  }

  notify(rollResult) {
    this.history.unshift(rollResult);
    if (this.history.length > 100) this.history.pop();
    if (rollResult.rollType !== 'initiative') {
      this.mostRecentCheck = rollResult;
      if (rollResult.outcomeClass === 'failure' || rollResult.outcome === 'Failure') {
        this.lastFailedCheck = rollResult;
      }
    }
    this.subscribers.forEach(cb => {
      try { cb(rollResult); } catch (e) { console.error('Roll subscriber error', e); }
    });
  }

  /**
   * Parses and executes arbitrary dice notation (e.g. "d20+8", "1d20+12", "3d6+5", "2d10-1", "d100").
   */
  rollNotation(notationString, characterName = 'Hero', targetDC = null) {
    const clean = notationString.trim().toLowerCase();
    if (clean === 'init' || clean === 'initiative') {
      return this.rollCheck({
        title: 'Initiative',
        characterName,
        modifier: 0,
        targetDC: null,
        rollType: 'initiative'
      });
    }
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
        outcomeDescription = `${degrees}° Success`;
      } else {
        degrees = Math.min(4, Math.floor((Math.abs(diff) - 1) / 5) + 1);
        outcome = 'Failure';
        outcomeClass = 'failure';
        outcomeDescription = `${degrees}° Failure`;
      }
    }

    const rollData = {
      id: 'roll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      characterName,
      title: notationString,
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
      isNatural20: isSingleD20 ? (rolls[0] === 20) : (sides === 20 && rolls.includes(20)),
      isNatural1: isSingleD20 ? (rolls[0] === 1) : (sides === 20 && rolls.includes(1)),
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
    let outcomeClass = rollType === 'initiative' ? 'initiative' : 'neutral';
    let outcomeDescription = '';

    // Initiative in M&M 3e is never rolled against a DC and has no success/failure
    if (rollType === 'initiative') {
      targetDC = null;
    }

    if (rollType !== 'initiative' && targetDC !== null && targetDC !== undefined && targetDC !== '') {
      const dc = parseInt(targetDC, 10);
      const diff = total - dc;

      if (diff >= 0) {
        const degreeRank = Math.floor(diff / 5) + 1;
        outcome = 'Success';
        outcomeClass = 'success';
        degrees = Math.min(4, degreeRank);

        if (rollType === 'toughness') {
          outcomeDescription = `${degrees}° Success (No damage)`;
        } else {
          outcomeDescription = `${degrees}° Success`;
        }
      } else {
        const failDiff = Math.abs(diff);
        const degreeRank = Math.floor((failDiff - 1) / 5) + 1;
        degrees = Math.min(4, degreeRank);
        outcome = 'Failure';
        outcomeClass = 'failure';

        if (rollType === 'toughness') {
          if (degrees === 1) {
            outcomeDescription = '1° Fail (+1 Bruise)';
          } else if (degrees === 2) {
            outcomeDescription = '2° Fail (Dazed + Bruise)';
          } else if (degrees === 3) {
            outcomeDescription = '3° Fail (Staggered + Bruise)';
          } else {
            outcomeDescription = '4° Fail (Incapacitated!)';
          }
        } else {
          outcomeDescription = `${degrees}° Failure`;
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
