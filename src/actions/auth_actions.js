import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';
import { ROOT_URL } from '../config.js'

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/auth/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - Get information of the logged user
        getLoggedUser(dispatch);
        
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/auth/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function getLoggedUser(dispatch) {
  // get user information
  axios.get(`${ROOT_URL}/auth/loggedin`, {
    headers: { authorization: localStorage.getItem('token') }
  })
  .then(response => {
    // we have the token and the user information
    dispatch({
      type: AUTH_USER,
      payload: response.data.user
    });

    // Redirect to default entry point
    browserHistory.push('/');
  })
  .catch(() => {
    // Something went wrong, remove the token
    localStorage.removeItem('token');
    // - Show an error to the user
    dispatch(authError('Bad Login Info'));
  });
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}
