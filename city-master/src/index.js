import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userSlice from './redux/userSlice';

import { gameCoordsSlice } from './redux/gameCoordsSlice';
import loaderSlice from './redux/loaderSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  gameCoords: gameCoordsSlice.reducer,
  loader: loaderSlice.reducer

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
// console.log(store.getState());
// store.subscribe(() => {
//   console.log('=== сработала подписка ===');
//   console.log(store.getState());
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
