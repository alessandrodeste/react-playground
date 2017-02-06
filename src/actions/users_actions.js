import axios from 'axios';
import { ROOT_URL } from '../config.js'
import {
  FETCH_USERS,
  FETCH_USER
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
    });
  }
}