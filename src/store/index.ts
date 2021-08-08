import { createStore, combineReducers } from 'redux';
import graphicsReducer from './graphics';

const store = createStore(combineReducers({
    graphics: graphicsReducer
}));

export default store;