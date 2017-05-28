'use strict';

import React, {Component} from 'react';
import {DND_ITEMS} from '../../constants';
import {DropTarget} from 'react-dnd';
import PropTypes from 'prop-types';

class EmptyTaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {connectDropTarget} = this.props;

    return connectDropTarget(<div style={styles.emptyTaskListContainer}/>);
  }
}

const styles = {
  emptyTaskListContainer: {
    flex: 1
  }
};

EmptyTaskList.propTypes = {
  storyId: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

const taskTarget = {
  hover(props, monitor) {
    props.moveTask(monitor.getItem().storyId, props.storyId, monitor.getItem().taskIndex, 0);
    monitor.getItem().storyId = props.storyId;
    monitor.getItem().taskIndex = 0;
  }
};

const taskCollectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  };
};

export default DropTarget(DND_ITEMS.TASK, taskTarget, taskCollectTarget)(EmptyTaskList);
