import { keyBy } from 'lodash';
import { nanoid } from 'nanoid';
/* Character
  {
    id: <String>,
    maxHP: <Number>,
    maxSP: <Number>,
    attack: <Number>,
    name: <String>,
    image: <String>,
    animation: <String>,
    index: <Number>,

    Gloves: itemId<String>,
    Helm: itemId<String>,
    Body: itemId<String>,
    Boots: itemId<String>,
    Legs: itemId<String>,
    Weapon: itemId<String>,

    derivedStats: <Object>
  }
*/

export const createCharacter = (name, image, startingAttackType, defaultIndex) => ({
  id: nanoid(),
  HP: 100,
  maxHP: 100,
  SP: 0,
  maxSP: 5,
  attack: 25,
  name,
  image,
  animation: null,
  index: defaultIndex, // persist battle index

  Gloves: null,
  Helm: null,
  Body: null,
  Boots: null,
  Legs: null,
  Weapon: null, /* sword/bow/staff weapon item, depending on startingAttackType */

  derivedStats: { // "total" stats, including item bonuses. should be used on the frontend.
    HP: 100,
    maxHP: 100,
    SP: 0,
    maxSP: 5,
    Armor: 0,
    Evasion: 0,
    Regen: 0,
    Reflect: 0,
    attack: 25,
    attackType: 'melee',
    Leech: 0
  } 
});

export const generateCharacterWithDerivedStats = ({
  char, // <Character>
  items // <itemsReducer.state>
}) => {
  const derivedStats = {
    ...char.derivedStats,
    HP: char.maxHP,
    maxHP: char.maxHP,
    SP: 0,
    maxSP: char.maxSP,
    attack: char.attack
  };

  let attackFlatBonus = 0;
  let attackMoreDamagePercent = 0;

  [char.Gloves, char.Helm, char.Body, char.Boots, char.Legs, char.Weapon].filter(Boolean).forEach(id => {
    const item = items[id];
    [...item.implicits, ...item.mods].forEach(mod => {
      if (['Armor', 'Evasion', 'Regen', 'Reflect', 'Leech'].includes(mod.name)) {
        derivedStats[mod.name] += mod.value;
      } else if (mod.name === 'HP') {
        derivedStats.HP += mod.value;
        derivedStats.maxHP += mod.value;
      } else if (mod.name === 'Flat Damage') {
        attackFlatBonus = mod.value;
      } else if (mod.name === 'Percent Damage') {
        attackMoreDamagePercent = mod.value;
      } else if (mod.name === 'Sword') {
        derivedStats.attackType = 'melee';
      } else if (mod.name === 'Bow') {
        derivedStats.attackType = 'ranged';
      } else if (mod.name === 'Staff') {
        derivedStats.attackType = 'magic';
      }
    });
  });

  derivedStats.attack = Math.floor(
    (derivedStats.attack + attackFlatBonus) * (1 + attackMoreDamagePercent / 100)
  );

  return { ...char, derivedStats };
};

export const testCharacters = keyBy([
  createCharacter('Rachel', 'white_rat_girl.png', 'melee', 7),
  createCharacter('Kate', 'zombie_chick.png', 'melee', 8),
  createCharacter('Diana', 'elf_archer.png', 'ranged', 10),
  createCharacter('Leya', 'human_mage.png', 'magic', 11),
], 'id');
export const testBattleCharacters = [
  null,
  Object.values(testCharacters)[0],
  null,
  Object.values(testCharacters)[1],
  Object.values(testCharacters)[2],
  Object.values(testCharacters)[3],
];
