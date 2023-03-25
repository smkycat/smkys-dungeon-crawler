const genInitialState = () => ({
  characters: Array(12).fill(null),
  activeCharIndex: -1,
  activeCharRegenBuffer: { index: -1, value: 0 }
});

export const battleReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_BATTLE_CHARACTERS': {
      /* payload:
        [<Character>, null, null, null, null, null, (enemies)
        <Character>, null, null, null, null, null] (friendlies)
      */
      return { ...state, characters: action.payload };
    }
    case 'UPDATE_BATTLE_CHARACTERS': {
      /* payload
        {
          [index<Number>]: { [propertyName<String>]: value<Any> }
        }
      */
      // note: this method is very similar to characterReducer.updateCharacters(), except it keys by battle index, rather than charId.
      const newCharacters = [...state.characters];

      // clear all pre-existing animations
      for (let i = 0; i < newCharacters.length; i++) {
        if (newCharacters[i]) {
          const newCharacter = { ...newCharacters[i], animation: null };
          newCharacters[i] = newCharacter;
        }
      }

      // update all relevant properties for updating characters
      Object.keys(action.payload).forEach(index => {
        Object.keys(action.payload[index]).forEach(propertyName => {
          if (newCharacters[index].derivedStats.hasOwnProperty(propertyName)) {
            const newDerivedStats = {
              ...newCharacters[index].derivedStats, 
              [propertyName]: action.payload[index][propertyName]
            };
            const newCharacter = { ...newCharacters[index], derivedStats: newDerivedStats };
            newCharacters[index] = newCharacter;
          } else {
            const newCharacter = { ...newCharacters[index], [propertyName]: action.payload[index][propertyName] };
            newCharacters[index] = newCharacter;
          }
        });
      });

      return {
        ...state,
        characters: newCharacters,
        activeCharRegenBuffer: { index: -1, value: 0 }
      };
    }
    case 'SET_ACTIVE_CHAR_INDEX': {
      return { ...state, activeCharIndex: action.payload };
    }
    case 'SET_ACTIVE_CHAR_REGEN_BUFFER': {
      return { ...state, activeCharRegenBuffer: action.payload };
    }
    default: {
      return state;
    }
  }
};
