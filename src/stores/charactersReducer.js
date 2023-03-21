import { characters } from '../Characters';

const genInitialState = () => ({
  characters: [characters['Rachel'], characters['Diana'], characters['Leya'], characters['Leya']],
});

export const charactersReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return { ...state, characters: action.payload };
    case 'UPDATE_CHARACTERS':
      const newState = [...characters];
      newState[action.payload.index] = {
        ...newState[action.payload.index],
        ...action.payload.updates
      };
      return newState;
    default:
      return state;
  }
};
