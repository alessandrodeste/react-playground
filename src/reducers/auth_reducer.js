import {
  AUTH_USER,
  AUTH_SIGNOUT,
  AUTH_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, user: action.payload };
    case AUTH_SIGNOUT:
      return { ...state, authenticated: false, user: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
