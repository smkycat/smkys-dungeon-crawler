import { monsters } from '../Monsters';
import { characters } from '../Characters';

const genInitialState = () => ({
  characters: [
    {}, monsters['Orc'], monsters['Orc'], {}, monsters['Orc'], {}, // enemies
    {}, characters['Rachel'], {}, {}, characters['Leya'], characters['Diana'] // friendlies
  ],
  activeCharIndex: 5
});

export const battleReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_BATTLE_STATS':
      return { ...state, characters: action.payload };
    case 'UPDATE_BATTLE_STATS':
      const newCharacters = [...state.characters];
      if (action.payload.hp) {
        action.payload.hp.forEach(({ index, change }) => {
          newCharacters[index] = {
            ...newCharacters[index],
            hp: Math.min(Math.max(newCharacters[index].hp + change, 0), newCharacters[index].maxHp)
          }
        });
      }
      if (action.payload.sp) {
        action.payload.sp.forEach(({ index, change }) => {
          newCharacters[index] = {
            ...newCharacters[index],
            sp: Math.max(Math.min(newCharacters[index].sp + change, newCharacters[index].maxSp), 0)
          }
        });
      }
      if (action.payload.animation) {
        action.payload.animation.forEach(({ index, animation }) => {
          newCharacters[index] = {
            ...newCharacters[index],
            animation
          }
        });
      }
      // effects
      return {
        ...state,
        characters: newCharacters,
        activeCharIndex: typeof action.payload.activeCharIndex === 'number'
          ? action.payload.activeCharIndex
          : state.activeCharIndex
    };
    default:
      return state;
  }
};
