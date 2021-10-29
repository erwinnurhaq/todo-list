import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import activities from './activities';
import common from './common';

const rootReducer = combineReducers({ activities, common });
const config = {
  key: 'root',
  storage,
  whitelist: ['activities'],
};

export default persistReducer(config, rootReducer);
