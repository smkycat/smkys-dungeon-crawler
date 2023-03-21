import { keyBy } from 'lodash';

const _characters = [
  {
    name: 'Rachel',
    img: 'white_rat_girl.png',
    maxHp: 100,
    maxSp: 5,
    special: false,
    attack: 25,
    attackType: 'melee',
  },
  {
    name: 'Diana',
    img: 'elf_archer.png',
    maxHp: 100,
    maxSp: 5,
    special: false,
    attack: 25,
    attackType: 'ranged',
  },
  {
    name: 'Leya',
    img: 'human_mage.png',
    maxHp: 100,
    maxSp: 5,
    special: false,
    attack: 25,
    attackType: 'magic'
  }
];

for (let i = 0; i < _characters.length; i++) {
  _characters[i].hp = _characters[i].maxHp;
  _characters[i].sp = 0;
  _characters[i].regen = 30; // testing
  _characters[i].hp = 50; // testing
  _characters[i].effects = {};
  _characters[i].animation = null;
}

export const characters = keyBy(_characters, 'name');
