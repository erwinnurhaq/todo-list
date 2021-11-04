import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import persistedReducer from './reducers';

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
