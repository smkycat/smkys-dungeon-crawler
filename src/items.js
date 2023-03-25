// all items can have up to 4 mods.
// each mod has 5 possible tiers. tier 1 is the best, and tier 5 is the worst.

import { random, sample, sampleSize } from 'lodash';
import { nanoid } from 'nanoid';
import { itemDescriptionsBySubtype } from './constants';

const modRangeByTier = {
  Armor: {
    HP: {
      5: [1, 10], // mod ranges are inclusive. tier 5 is worst, tier 1 is best.
      4: [11, 20],
      3: [21, 30],
      2: [31, 40],
      1: [41, 50],
    },
    Armor: {
      5: [1, 2],
      4: [3, 4],
      3: [5, 6],
      2: [7, 8],
      1: [9, 10],
    },
    Evasion: {
      5: [1, 2],
      4: [3, 4],
      3: [5, 6],
      2: [7, 8],
      1: [9, 10],
    },
    Regen: {
      5: [1, 2],
      4: [3, 4],
      3: [5, 6],
      2: [7, 8],
      1: [9, 10],
    },
    Reflect: {
      5: [1, 4],
      4: [5, 8],
      3: [9, 12],
      2: [13, 16],
      1: [17, 20],
    }
  },
  Weapon: {
    'Flat Damage': {
      5: [1, 10],
      4: [11, 20],
      3: [21, 30],
      2: [31, 40],
      1: [41, 50],
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

/* Item
  {
    id: <String>,
    image: <String>,
    description: <String>,
    rarity: 'common'|'uncommon'|'rare'|'legendary',
    type: 'weapon'|'gloves'|'helm'|'body'|'boots'|'legs',
    subtype: 'sword'|'bow'|'staff'|'plated'|'chain'|'banded'|'leather',
    name: <String>,
    implicits: [Mod]
    mods: [Mod]
  }
*/
/* Mod
  {
    name: <String>,
    tier: <Number>,
    range: [<Number, Number>]|null
    value: <Number>|null,
    locked: <Boolean>
  }
*/
const createNewMod = ({
  name,
  tier = 1,
  range = null,
  value = null,
  locked = false
}) => ({
  name,
  tier,
  range,
  value, 
  locked
});
export const createNewRandomItem = () => {
  const item = {
    id: nanoid(),
    implicits: [],
    mods: []
  };
  
  let numMods;

  let rng = random(1, 10);
  if (rng <= 1) {
    numMods = 3;
    item.rarity = 'Legendary';
  } else if (rng <= 3) {
    numMods = 2;
    item.rarity = 'Rare';
  } else if (rng <= 6) {
    numMods = 1;
    item.rarity = 'Uncommon';
  } else if (rng <= 10) {
    numMods = 0;
    item.rarity = 'Common';
  }

  let modNames = [];

  rng = random(1, 4);
  if (rng <= 1) {
    item.type = 'Weapon';
    item.subtype = sample(['Sword', 'Bow', 'Staff']);
    item.name = item.subtype;
    item.image = `items/${item.subtype}.png`;
    item.implicits.push(createNewMod({
      name: item.subtype,
      locked: true
    }));
    modNames = sampleSize(Object.keys(modRangeByTier[item.type]), numMods);
  } else {
    item.type = sample(['Helm', 'Body', 'Gloves', 'Legs', 'Boots']);
    item.subtype = sample(['Plated', 'Chain', 'Banded', 'Light']);
    item.name = `${item.type} ${item.subtype}`;
    item.image = `items/${item.name}.png`;
    if (item.subtype === 'Plated') {
      item.implicits.push(createNewMod({
        name: 'Armor',
        range: [5, 5],
        value: 10,
        locked: true
      }));
    } else if (item.subtype === 'Chain') {
      item.implicits.push(createNewMod({
        name: 'Evasion',
        range: [5, 5],
        value: 10,
        locked: true
      }));
    } else if (item.subtype === 'Banded') {
      item.implicits.push(createNewMod({
        name: 'HP',
        range: [5, 5],
        value: 10,
        locked: true
      }));
    } else if (item.subtype === 'Light') {
      item.implicits.push(createNewMod({
        name: 'Damage',
        range: [5, 5],
        value: 10,
        locked: true
      }));
    }
    modNames = sampleSize(Object.keys(modRangeByTier.Armor), numMods);
  }
  item.description = itemDescriptionsBySubtype[item.subtype];

  modNames.forEach(modName => {
    const modTier = random(1, 5);
    const modRange = modRangeByTier[item.type === 'Weapon' ? 'Weapon' : 'Armor'][modName][modTier];
    item.mods.push(createNewMod({
      name: modName,
      tier: modTier,
      range: modRange,
      value: random(modRange[0], modRange[1]),
    }));
  });

  return item;
};
