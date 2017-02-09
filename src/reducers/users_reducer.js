import { noop } from 'lodash';
import {  
  FETCH_USERS,
  FETCH_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {    
    case FETCH_USERS:
      return { ...state, list: action.payload, selected: noop() };
    case FETCH_USER:
      return { ...state, selected: action.payload };
  }

  return state;
}
