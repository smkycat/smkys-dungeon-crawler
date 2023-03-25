// battle reducer
export const setBattleCharacters = payload => ({ type: 'SET_BATTLE_CHARACTERS', payload });
export const updateBattleCharacters = payload => ({ type: 'UPDATE_BATTLE_CHARACTERS', payload });
export const setActiveCharIndex = payload => ({ type: 'SET_ACTIVE_CHAR_INDEX', payload });
export const setActiveCharRegenBuffer = payload => ({ type: 'SET_ACTIVE_CHAR_REGEN_BUFFER', payload });

// scene reducer
export const setScene = payload => ({ type: 'SET_SCENE', payload });

// character reducer
export const setCharacters = payload => ({ type: 'SET_CHARACTERS', payload });
export const updateCharacter = payload => ({ type: 'UPDATE_CHARACTER', payload });
export const characterEquipItem = payload => ({ type: 'CHARACTER_EQUIP_ITEM', payload });
export const characterUnequipItem = payload => ({ type: 'CHARACTER_UNEQUIP_ITEM', payload });

// item reducer
export const addItems = payload => ({ type: 'ADD_ITEMS', payload });
export const setItemMods = payload => ({ type: 'SET_ITEM_MODS', payload });
export const deleteItem = payload => ({ type: 'DELETE_ITEM', payload });

// crafting reducer
export const updateCraftingMaterialCounts = payload => ({ type: 'UPDATE_CRAFTING_MATERIAL_COUNTS', payload });

// shared
export const resetGame = payload => ({ type: 'RESET_GAME', payload });
