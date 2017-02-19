import _ from 'lodash';
import {  
  USERS_FETCH,
  USER_FETCH,
  USER_NEW,
  USER_DELETED
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {    
    case USERS_FETCH:
      return { ...state, list: action.payload, selected: _.noop() };
    case USER_FETCH:
      return { ...state, selected: action.payload };
    case USER_NEW:
      return { ...state, selected: action.payload };
    case USER_DELETED:
      return { ...state, selected: _.noop(), list: _.filter(state.list, (u) => u._id !== action.payload ) };
  }

  return state;
}
