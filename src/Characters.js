import { keyBy } from 'lodash';

const _characters = [
  {
    name: 'Rachel',
    img: 'white_rat_girl.png',
    maxHp: 20,
    maxSp: 5,
    special: false,
    attack: 4,
    attackType: 'melee',
  },
  {
    name: 'Diana',
    img: 'elf_archer.png',
    maxHp: 20,
    maxSp: 5,
    special: false,
    attack: 6,
    attackType: 'ranged',
  },
  {
    name: 'Lyra',
    img: 'human_mage.png',
    maxHp: 20,
    maxSp: 5,
    special: false,
    attack: 4,
    attackType: 'magic'
  }
];

for (let i = 0; i < _characters.length; i++) {
  _characters[i].hp = _characters[i].maxHp;
  _characters[i].sp = 0;
  _characters.effects = {};
  _characters.animation = null;
}

export const characters = keyBy(_characters, 'name');
