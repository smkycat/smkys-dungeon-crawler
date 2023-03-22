// all items can have up to 4 mods.
// each mod has 5 possible tiers. tier 1 is the best, and tier 5 is the worst.

import { random, sample } from 'lodash';
import { nanoid } from 'nanoid';

const modRangeByTier = {
  Armor: {
    Life: {
      5: [1, 2], // inclusive
      4: [3, 4],
      3: [5, 6],
      2: [7, 8],
      1: [9, 10],
    },
    Armor: {
      5: [1, 1],
      4: [2, 2],
      3: [3, 3],
      2: [4, 4],
      1: [5, 5],
    },
    Evasion: {
      5: [1, 1],
      4: [2, 2],
      3: [3, 3],
      2: [4, 4],
      1: [5, 5],
    },
    Regen: {
      5: [1, 1], // inclusive
      4: [2, 2],
      3: [3, 3],
      2: [4, 4],
      1: [5, 5],
    },
    Reflect: {
      5: [1, 5],
      4: [6, 10],
      3: [11, 15],
      2: [16, 20],
      1: [21, 25],
    }
  },
  Weapon: {
    'Flat Damage': {
      5: [1, 4],
      4: [5, 8],
      3: [9, 12],
      2: [13, 16],
      1: [17, 20],
    },
    'Percent Damage': {
      5: [1, 10],
      4: [11, 20],
      3: [21, 30],
      2: [31, 40],
      1: [41, 50],
    },
    Leech: {
      5: [1, 5],
      4: [6, 10],
      3: [11, 15],
      2: [16, 20],
      1: [21, 25],
    }
  }
};

export const createNewRandomItem = () => {
  const item = {
    id: nanoid(),
    img: null,
    type: null, // weapon|armor
    subtype: null, //sword|bow|staff
    name: null,
    implicits: [],
    mods: []
  };
  
  let numMods;

  let rng = random(1, 15);
  if (rng <= 5) {
    numMods = 0;
  } else if (rng <= 9) {
    numMods = 1;
  } else if (rng <= 12) {
    numMods = 2;
  } else if (rng <= 14) {
    numMods = 3;
  } else {
    numMods = 4;
  }

  rng = random(1, 4);
  if (rng <= 1) {
    item.type = 'Weapon';
    item.subtype = sample(['Sword', 'Bow', 'Staff']);
    item.name = item.subtype;
    item.img = `items/${item.subtype}.png`;
    item.implicits.push({
      name: item.subtype,
      locked: true
    });
  } else {
    item.type = 'Armor';
    item.subtype = sample(['Helm', 'Body', 'Gloves', 'Legs', 'Boots']);
    const armorSubtype = sample(['Plated', 'Chain', 'Banded', 'Light']);
    item.name = `${armorSubtype}_${item.subtype}`;
    item.img = `items/${item.name}.png`;
    if (armorSubtype === 'Plated') {
      item.implicits.push({
        name: 'Armor',
        range: [10, 10],
        value: 10,
        locked: true
      });
    } else if (armorSubtype === 'Chain') {
      item.implicits.push({
        name: 'Evasion',
        range: [10, 10],
        value: 10,
        locked: true
      });
    } else if (armorSubtype === 'Banded') {
      item.implicits.push({
        name: 'Life',
        range: [10, 10],
        value: 10,
        locked: true
      });
    } else if (armorSubtype === 'Light') {
      item.implicits.push({
        name: 'Damage',
        range: [5, 5],
        value: 10,
        locked: true
      });
    }
  }

  for (let i = 0; i < numMods; i++) {
    const modName = sample(Object.keys(modRangeByTier[item.type]));
    const modTier = random(1, 5);
    const modRange = modRangeByTier[item.type][modName][modTier];

    item.mods.push({
      name: modName,
      range: modRange,
      value: random(modRange[0], modRange[1]),
      locked: false
    });
  }

  return item;
};
