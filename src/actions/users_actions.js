import axios from 'axios';
import { hashHistory } from 'react-router';
import { ROOT_URL } from '../config.js'
import {
  USERS_FETCH,
  USER_FETCH,
  USER_NEW,
  USER_UPDATE,
  USER_CREATED,
  USER_DELETED
} from './types';

export function fetchUsers() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/secured/users`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: USERS_FETCH,
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
        type: USER_FETCH,
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
      type: USER_NEW,
      payload: {
        username: '',
        email: '',
        first_name: '',
        family_name: '',
        role: 2
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
        type: USER_UPDATE,
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
        type: USER_CREATED,
        payload: response.data
      });
    }) 
    .catch(function (error) {
      // TODO
      console.log(error);
    });
  }
}

export function deleteUser(userId) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/api/secured/users/${userId}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: USER_DELETED,
        payload: userId
      });
    }) 
    .catch(function (error) {
      // TODO
      console.log(error);
    });
  }
}