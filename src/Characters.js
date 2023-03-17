import { keyBy } from 'lodash';

export const characters = keyBy([
  {
    // immutable
    name: 'Rachel',
    img: 'white_rat_queen.png',
    maxHp: 10,
    maxSp: 5,
    special: false,
    attack: 6,
    attackType: 'melee',
    // mutable
    hp: 10,
    sp: 0,
    effects: {}
  }
], 'name');
