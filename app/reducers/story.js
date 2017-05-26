'use strict';

import  StoryInitialState from './initialStates/story';
import {STORE_STORY_DATA} from '../actions/actionTypes';

export default function story(state = StoryInitialState, action) {

  if (action.type === STORE_STORY_DATA) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
}
