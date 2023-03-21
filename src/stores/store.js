import { createStore, combineReducers } from 'redux';
import { battleReducer } from './battleReducer';
import { sceneReducer } from './sceneReducer';
import { charactersReducer } from './charactersReducer';

export const store = createStore(combineReducers({
  battle: battleReducer,
  scene: sceneReducer,
  characters: charactersReducer
}));
