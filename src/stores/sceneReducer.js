const genInitialState = () => ({
  scene: 'main'
});

export const sceneReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'SET_SCENE':
      return { ...state, scene: action.payload };
    default:
      return state;
  }
};
