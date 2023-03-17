import { keyBy } from 'lodash';

export const monsters = keyBy([
  {
    // immutable
    name: 'Orc',
    img: 'orc.png',
    maxHp: 10,
    maxSp: 1,
    special: false,
    attack: 1,
    attackType: 'melee',
    // mutable
    hp: 10,
    sp: 0,
    effects: {}
  }
], 'name');
