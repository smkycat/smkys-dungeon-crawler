import { keyBy } from 'lodash';

const _monsters = [
  {
    name: 'Orc',
    img: 'orc.png',
    maxHp: 1,
    maxSp: 1,
    special: false,
    attack: 1,
    attackType: 'melee',
  }
];

for (let i = 0; i < _monsters.length; i++) {
  _monsters[i].hp = _monsters[i].maxHp;
  _monsters[i].sp = 0;
  _monsters.effects = {};
  _monsters.animation = null;
}

export const monsters = keyBy(_monsters, 'name');
