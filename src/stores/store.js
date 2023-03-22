import { createStore, combineReducers } from 'redux';
import { battleReducer } from './battleReducer';
import { sceneReducer } from './sceneReducer';
import { charactersReducer } from './charactersReducer';
import { itemsReducer } from './itemsReducer';

export const store = createStore(combineReducers({
  battle: battleReducer,
  scene: sceneReducer,
  characters: charactersReducer,
  items: itemsReducer
}));
