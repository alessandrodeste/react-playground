import axios from 'axios';
import { hashHistory } from 'react-router';
import { ROOT_URL } from '../config.js'
import {
  FETCH_USERS,
  FETCH_USER,
  NEW_USER,
  UPDATE_USER,
  CREATED_USER
} from './types';

export function fetchUsers() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/secured/users`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_USERS,
        payload: response.data
      });
    })
    .catch(function (error) {
      // TODO: if 500 go to home, if 400 logout
      console.log(error);
    });
  }
}

export function fetchUser(userId) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/secured/users/${userId}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {      
      dispatch({
        type: FETCH_USER,
        payload: response.data
      });
    }) 
    .catch(function (error) {
      console.log(arguments);
      // TODO: if 500 go to list, if 400 logout
      hashHistory.push('/users');
    });
  }
}

/**
 * Return a default empty user object
 */
export function newUser() {
  return function(dispatch) {
    dispatch({
      type: NEW_USER,
      payload: {
        username: '',
        email: '',
        first_name: '',
        family_name: ''
      }
    });
  }
}

export function updateUser(userId, partialUser) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/api/secured/users/${userId}`, 
      partialUser, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: UPDATE_USER,
        payload: response.data
      });
    }) 
    .catch(function (error) {
      // TODO
      console.log(error);
    });
  }
}

export function createUser(user) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/secured/users/`, 
      user, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: CREATED_USER,
        payload: response.data
      });
    }) 
    .catch(function (error) {
      // TODO
      console.log(error);
    });
  }
}