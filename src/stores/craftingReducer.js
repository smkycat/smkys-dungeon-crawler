import { craftingMaterials } from '../constants';

const genInitialState = () => {
  const state = {
    materials: {}
  };
  Object.keys(craftingMaterials).forEach(i => {
    state.materials[i] = 0;
  });
  return state;
};

export const craftingReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'UPDATE_CRAFTING_MATERIAL_COUNTS': {
      /* payload
        {
          [craftingMaterialName<String>]: countChange<Number>
        }
      */
      const newMaterials = { ...state.materials };
      Object.keys(action.payload).forEach(i => {
        newMaterials[i] += action.payload[i];
      });
      return { ...state, materials: newMaterials };
    }
    case 'RESET_GAME': {
      return genInitialState();
    }
    default: {
      return state;
    }
  }
};
