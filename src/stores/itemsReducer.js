const genInitialState = () => ({
  items: {},
  inventory: Array(80).fill(null),
});

export const itemsReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'ADD_ITEMS': {
      const newItems = { ...state.items };
      const newInventory = [...state.inventory];
      action.payload.forEach(item => {
        if (newInventory.filter(i => i === null).length) {
          // only add item if there is space in inventory
          // should later add functionality to auto-salvage excess items
          newItems[item.id] = item;
          for (let i = 0; i < newInventory.length; i++) {
            if (newInventory[i] === null) {
              newInventory[i] = item.id;
              break;
            }
          }
        }
      });
      return {
        ...state,
        items: newItems,
        inventory: newInventory
      };
    }
    case 'UPDATE_ITEM': {
      return {
        ...state,
        items: { ...state.items, [action.payload.id]: action.payload }
      };
    }
    default:
      return state;
  }
};
