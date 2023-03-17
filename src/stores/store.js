import { createStore, combineReducers } from 'redux';
import { battleReducer } from './battleReducer';

export const store = createStore(combineReducers({
  battle: battleReducer
}));
