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
    const isTaskDragged = this.props.draggedTaskId === this.props.task.id;

    return connectDropTarget(connectDragSource(
      <div style={{...styles.taskContainer, ...{opacity: isTaskDragged ? 0 : 1}}} className={'taskContainer'}>
        <div style={{...styles.taskMarker, ...{backgroundColor: this.props.task.color}}}/>
        <div style={styles.taskDescription}>
          {this.props.task.description}
        </div>
      </div>
    ));
  }
}

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
  connectDropTarget: PropTypes.func.isRequired,
  setDraggeTaskId: PropTypes.func.isRequired,
  storyId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  draggedTaskId: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired
};

const taskSource = {
  beginDrag(props) {
    return {
      storyId: props.storyId,
      taskIndex: props.index,
      taskId: props.task.id
    };
  },

  endDrag(props) {
    props.setDraggeTaskId('');
  }
};

const taskCollectSource = connect => {
  return {
    connectDragSource: connect.dragSource()
  };
};

const taskTarget = {
  hover(props, monitor) {
    const dragTaskId = monitor.getItem().taskId;
    const hoverTaskId = props.task.id;
    const draggedTaskIndex = monitor.getItem().taskIndex;
    const hoveredTaskIndex = props.index;
    const isHoveredSelf = props.draggedTaskId === hoverTaskId;

    if (!props.draggedTaskId.length) {
      props.setDraggeTaskId(dragTaskId);
      return;
    }

    if (draggedTaskIndex === hoveredTaskIndex && isHoveredSelf) {
      return;
    }

    if (!isHoveredSelf && props.draggedTaskId.length) {
      props.moveTask(
        monitor.getItem().storyId,
        props.storyId,
        draggedTaskIndex,
        hoveredTaskIndex
      );

      monitor.getItem().taskIndex = hoveredTaskIndex;
      monitor.getItem().storyId = props.storyId;
    }
  }
};

const taskCollectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  };
};

export default compose(
  DropTarget(DND_ITEMS.TASK, taskTarget, taskCollectTarget),
  DragSource(DND_ITEMS.TASK, taskSource, taskCollectSource)
)(TaskItem);
