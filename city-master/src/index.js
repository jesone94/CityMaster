import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userSlice from './redux/userSlice';

import { gameStatusSlice } from './redux/gameStatusSlice';
import loaderSlice from './redux/loaderSlice';
import { statisticSlice } from './redux/statsSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  gameStatus: gameStatusSlice.reducer,
  loader: loaderSlice.reducer,
  stats: statisticSlice.reducer,
});

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serialiazableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

store.subscribe(() => {
  console.log('=== сработала подписка ===');
  console.log(store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
