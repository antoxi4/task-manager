'use strict';

import {TEST_ACTION_TYPE} from './actionTypes';

function storeData(data) {
  return {
    type: TEST_ACTION_TYPE,
    payload: data
  };
}

export function addItem() {
  return (dispatch, getState) => {
    let previousState = JSON.parse(JSON.stringify(getState().test.itemsCount));

    previousState.push(1);

    return dispatch(storeData({
      itemsCount: previousState
    }));
  };
}
