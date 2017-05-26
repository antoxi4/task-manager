'use strict';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const combinedReducers = combineReducers(reducers);
const store = createStoreWithMiddleware(combinedReducers);

export default store;
