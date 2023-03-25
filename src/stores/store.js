import { createStore, combineReducers } from 'redux';
import { battleReducer } from './battleReducer';
import { sceneReducer } from './sceneReducer';
import { characterReducer } from './characterReducer';
import { itemReducer } from './itemReducer';
import { craftingReducer } from './craftingReducer';

export const store = createStore(combineReducers({
  battle: battleReducer,
  scene: sceneReducer,
  character: characterReducer,
  item: itemReducer,
  crafting: craftingReducer
}));
