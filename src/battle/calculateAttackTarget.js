// character indices
// 0 1 2
// 3 4 5
// 6 7 8
// 9 1011
export const calculateAttackTarget = (charIndex, char, characters) => {
  const n = Math.random();
  let targetPriority = [];
  
  if (char.derivedStats.attackType === 'melee') {
    // melee attacks always try to target the nearest enemy.
    // if two or more (three) enemies are the same distance away, a random enemy of the same distance away is selected.
    if ([6, 9].includes(charIndex)) {
      targetPriority = [
        3,
        n < 0.5 ? 0 : 4,
        n < 0.5 ? 4 : 0,
        n < 0.5 ? 1 : 5,
        n < 0.5 ? 5 : 1,
        2
      ];
    } else if ([7, 10].includes(charIndex)) {
      targetPriority = [
        4,
        n < 0.33 ? (n < 0.66 ? 3 : 1) : 5,
        n < 0.33 ? (n < 0.66 ? 5: 3) : 1,
        n < 0.33 ? (n < 0.66 ? 1: 5) : 3,
        n < 0.5 ? 0 : 2,
        n < 0.5 ? 2 : 0
      ];
    } else if ([8, 11].includes(charIndex)) {
      targetPriority = [
        5,
        n < 0.5 ? 2 : 4,
        n < 0.5 ? 4 : 2,
        n < 0.5 ? 1 : 3,
        n < 0.5 ? 3 : 1,
        0
      ];
    } else if ([0, 3].includes(charIndex)) {
      targetPriority = [
        6,
        n < 0.5 ? 7 : 9,
        n < 0.5 ? 9 : 7,
        n < 0.5 ? 8 : 10,
        n < 0.5 ? 10 : 8,
        11
      ];
    } else if ([1, 4].includes(charIndex)) {
      targetPriority = [
        7,
        n < 0.33 ? (n < 0.66 ? 6 : 8) : 10,
        n < 0.33 ? (n < 0.66 ? 10: 6) : 8,
        n < 0.33 ? (n < 0.66 ? 8: 10) : 6,
        n < 0.5 ? 9 : 11,
        n < 0.5 ? 11 : 9
      ];
    } else if ([2, 5].includes(charIndex)) {
      targetPriority = [
        8,
        n < 0.5 ? 7 : 11,
        n < 0.5 ? 11 : 7,
        n < 0.5 ? 6 : 10,
        n < 0.5 ? 10 : 6,
        9
      ];
    }
  } else if (['ranged', 'magic'].includes(char.attackType)) {
    // ranged and magic attacks target an enemy at random.
    targetPriority = charIndex >= 6
      ? [0, 1, 2, 3, 4, 5]
      : [6, 7, 8, 9, 10, 11];
  }

  return targetPriority.filter(i => characters[i] && characters[i].derivedStats.HP)[0];
};
