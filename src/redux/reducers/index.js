import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import activities from './activities';
import common from './common';
import theme from './theme';

const rootReducer = combineReducers({ activities, common, theme });
const config = {
  key: 'root',
  storage,
  whitelist: ['activities', 'theme'],
};

export default persistReducer(config, rootReducer);
