const genInitialState = () => ({
  items: {}, // keyed by itemId
  inventory: Array(70).fill(null)
});

export const itemReducer = (state = genInitialState(), action) => {
  switch (action.type) {
    case 'ADD_ITEMS': {
      /* payload
        [{ ...item<Item> }]
      */
      // eventually, overflowing items should be auto-salvaged, but for now they just vanish
      const newItems = { ...state.items };
      const newInventory = [...state.inventory];
      action.payload.forEach(item => {
        if (newInventory.filter(i => i === null).length) {
          newItems[item.id] = item;
          for (let i = 0; i < newInventory.length; i++) {
            if (!newInventory[i]) {
              newInventory[i] = item.id;
              break;
            }
          }
        }
      });
      return { ...state, items: newItems, inventory: newInventory };
    }
    case 'SET_ITEM_MODS': {
      /* payload
        {
          id: <String>,
          mods: [<Mod>]
        }
      */
      const newItems = { ...state.items };
      const newItem = { ...newItems[action.payload.id] };
      newItem.mods = action.payload.mods;
      newItems[action.payload.id] = newItem;
      return { ...state, items: newItems };
    }
    case 'DELETE_ITEM': {
      /* payload
        itemId<String>
      */
      const newItems = { ...state.items };
      const newInventory = [...state.inventory];
      delete newItems[action.payload];
      newInventory[newInventory.indexOf(action.payload)] = null;
      return { ...state, items: newItems, inventory: newInventory };
    }
    case 'RESET_GAME': {
      return genInitialState();
    }
    default: {
      return state;
    }
  }
};
