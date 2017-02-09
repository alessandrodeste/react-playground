import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Routes from './routes';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { authActions } from './actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers
  /*DEBUG ONLY:*/, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  authActions.getLoggedUser(store.dispatch);
} 

ReactDOM.render(
  <Provider store={store}>
    {Routes}
  </Provider>
  , document.querySelector('.container'));
