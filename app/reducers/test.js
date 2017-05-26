'use strict';

import  TestInitialState from './initialStates/test';
import {TEST_ACTION_TYPE} from '../actions/actionTypes';

export default function test(state = TestInitialState, action) {

  if (action.type === TEST_ACTION_TYPE) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
}
