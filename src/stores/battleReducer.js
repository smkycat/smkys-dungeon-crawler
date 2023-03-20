import { monsters } from '../Monsters';
import { characters } from '../Characters';

const genInitialState = () => ({
  characters: [
    {}, {}, {}, {}, monsters['Ark\'Xha'], {}, // enemies
    {}, characters['Rachel'], {}, {}, characters['Leya'], characters['Diana'] // friendlies
  ],
  activeCharIndex: -1,
  activeCharRegenBuffer: { index: -1, value: 0 }
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
        activeCharRegenBuffer: { index: -1, value: 0 }
      };
    case 'SET_ACTIVE_CHAR_INDEX':
      return { ...state, activeCharIndex: action.payload };
    case 'SET_ACTIVE_CHAR_REGEN_BUFFER':
      return { ...state, activeCharRegenBuffer: action.payload };
    default:
      return state;
  }
};
