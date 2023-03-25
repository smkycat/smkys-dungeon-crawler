import { createCharacter } from './characters';

export const ArkXha = (index) => {
  const monsterStats = {
    name: 'Ark\'Xha',
    image: 'swamp_queen.png',
    HP: 200,
    attack: 30,
    attackType: 'melee'
  };

  const monster = createCharacter(monsterStats.name, monsterStats.image, monsterStats.attackType, index);
  monster.HP = monsterStats.HP;
  monster.maxHP = monsterStats.HP;
  monster.derivedStats.HP = monsterStats.HP;
  monster.derivedStats.maxHP = monsterStats.HP;
  monster.derivedStats.attack = monsterStats.attack;
  monster.derivedStats.attackType = monsterStats.attackType;

  return monster;
}

export const testMonsters = [
  null,
  ArkXha(1),
  null,
  null,
  null,
  null,
];
