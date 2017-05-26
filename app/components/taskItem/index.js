'use strict';

import React, {Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {DND_ITEMS} from '../../constants';

class TaskItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {connectDragSource, connectDropTarget} = this.props;

    return connectDropTarget(connectDragSource(
      <div style={styles.taskContainer} className={'taskContainer'}>
        <div style={{...styles.taskMarker, ...{backgroundColor: this.props.task.color}}}/>
        <div style={styles.taskDescription}>
          {this.props.task.description}
        </div>
      </div>
    ));
  }
}

const itemSource = {
  beginDrag(props) {
    return {
      storyIndex: props.storyIndex,
      taskIndex: props.index
    };
  }
};

const collect = connect => {
  return {
    connectDragSource: connect.dragSource()
  };
};

const taskTarget = {
  drop(props, monitor) {
    if (props.storyIndex != monitor.getItem().storyIndex) {
      props.moveTaskToStory(
        monitor.getItem().storyIndex,
        props.storyIndex,
        monitor.getItem().taskIndex
      );
    }
  }
};

const taskCollectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  };
};

const styles = {
  taskContainer: {
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },

  taskMarker: {
    display: 'flex',
    width: 5
  },

  taskDescription: {
    display: 'flex',
    wordBreak: 'break-word',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    color: '#90A4AE',
    fontSize: '10pt',
    padding: '16px 15px 15px 14px'
  }
};

TaskItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  storyIndex: PropTypes.number.isRequired,
  task: PropTypes.object.isRequired
};

export default compose(
  DropTarget(DND_ITEMS.TASK, taskTarget, taskCollectTarget),
  DragSource(DND_ITEMS.TASK, itemSource, collect)
)(TaskItem);
