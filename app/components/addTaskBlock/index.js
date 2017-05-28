'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import AddItemBlock from '../addItemBlock';

let AddTaskBlock = props => (
  <AddItemBlock
    confirmEvent={props.addNewTask}
    wrapperStyle={styles.addTaskWrapperStyle}
    inputPlaceHolder={'New Task...'}
    inputClassName={'inputFocusStyle'}
  />
);

const styles = {
  addTaskWrapperStyle: {
    marginTop: 10
  }
};

AddTaskBlock.propTypes = {
  addNewTask: PropTypes.func.isRequired
};

export default AddTaskBlock;
