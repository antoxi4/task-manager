'use strict';

import UserInitialState from './initialStates/user';
import {USER_ACTION_TYPE} from '../actions/actionTypes';

export default function user(state = UserInitialState, action) {

  if (action.type === USER_ACTION_TYPE) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
}
