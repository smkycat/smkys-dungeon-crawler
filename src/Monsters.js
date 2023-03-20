import { keyBy } from 'lodash';

const monstersAct1 = [
  {
    name: 'Orc Soldier',
    img: 'orc.png',
    maxHp: 5,
    maxSp: 1,
    special: false,
    attack: 1,
    attackType: 'melee',
    armor: 0,
    flavorText: 'Standard orcish melee infantry. When the Swamplands was united, this type of orc was recruited en masse to form a national guard, helping keep order in the land.'
  },
  {
    name: 'Saurian Armor',
    img: 'saurian_armor_warrior.png',
    maxHp: 4,
    maxSp: 1,
    special: false,
    attack: 1,
    attackType: 'melee',
    armor: 50,
    flavorText: 'Armored lizard. Sturdy on the outside, but somewhat fragile underneath. Lizards, while somewhat weaker than orcs, have survived over the years through their expertise in forging and using armor.'
  },
  {
    name: 'Orc Chieftain',
    img: 'orc_chieftain.png',
    maxHp: 7,
    maxSp: 1,
    special: false,
    attack: 2,
    attackType: 'ranged',
    armor: 0,
    flavorText: 'Orcish elder. Throws axe. Relatively durable. Though too slow to fight on the frontlines in their increasing age, orcish elders frequently take on safer means of combat such as weapon throwing.'
  },
  {
    name: 'Shadow Rat',
    img: 'sewer_rat.png',
    maxHp: 3,
    maxSp: 1,
    special: false,
    attack: 3,
    attackType: 'ranged',
    armor: 0,
    flavorText: 'Powerful ranged attack, but vulnerable if attacked. Rat folk have existed in the Swamplands as along as anyone can remember, using their strength in numbers and dangerous weaponry to maintain sovereignty.'
  },
  {
    name: 'Saurian Mage',
    img: 'saurian_vicious_mage.png',
    maxHp: 4,
    maxSp: 1,
    special: false,
    attack: 2,
    attackType: 'magic',
    armor: 25,
    flavorText: 'Lightly armored spellcaster. The Saurians pioneered the strategy of sending mages into combat with light armor, hindering their mobility and ability to cast, but greatly enhancing their ability to stay alive against certain types of enemies.'
  },
  {
    name: 'Swamp Sorceress',
    img: 'swamp_sorceress.png',
    maxHp: 5,
    maxSp: 1,
    special: false,
    attack: 1,
    attackType: 'magic',
    armor: 0,
    flavorText: 'Standard spellcaster unit. While most humans choose to stay away from the cold, wet marshes of the Swamplands, a small handful grouped together and chose to stay. These humans eventually turned to magic to survive, occasionally offering their services as mercanaries, often to help repel invaders.'
  },
  {
    name: 'Ark\'Xha',
    img: 'swamp_queen.png',
    maxHp: 40,
    maxSp: 5,
    special: true,
    attack: 2,
    attackType: 'melee',
    armor: 0,
    flavorText: 'Elite melee unit. Piercing special attack. Ark\'Xha, Orc Queen of the Swamplands, solely holds sovereignty over all factions within the Swamplands. Though her combat ability is feared, most know her as a gentle and prudent leader who prefers to rule with the spoken and written word, rather than with the sword.'
  },
].map(i => ({ ...i, act: 1 }));

const _monsters = [
  ...monstersAct1,
];

for (let i = 0; i < _monsters.length; i++) {
  _monsters[i].hp = _monsters[i].maxHp;
  _monsters[i].sp = 0;
  _monsters[i].regen = 0;
  _monsters[i].effects = {};
  _monsters[i].animation = null;
}

export const monsters = keyBy(_monsters, 'name');
