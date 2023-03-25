const genInitialState = () => ({
  characters: {} // keyed by characterId
});

export const characterReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_CHARACTERS': {
      /* payload
        { ...characters<Character> }
      */
     return { ...state, characters: action.payload };
    }
    case 'UPDATE_CHARACTERS': {
      /* payload
        {
          [id<String>]: { [propertyName<String>]: value<Any> }
        }
      */
     // note: this method should only be used to update base stats, NOT derived stats.
     // derived stats are only to be automatically calculated using generateCharacterWithDerivedStats().
      const newCharacters = { ...state.characters };
      Object.keys(action.payload).forEach(id => {
        Object.keys(action.payload[id]).forEach(propertyName => {
          newCharacters[id] = {
            ...newCharacters[id],
            [propertyName]: action.payload[id][propertyName]
          }
        });
      });
      return { ...state, characters: newCharacters };
    }
    case 'RESET_GAME': {
      return genInitialState();
    }
    default: {
      return state;
    }
  }
};
