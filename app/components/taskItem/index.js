'use strict';

import React, {Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {DND_ITEMS} from '../../constants';
import ColorPalette from '../colorPalette';

class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTaskHovered: false,
      isColorPaletteVisible: false
    };

    this.renderColorPalette = this.renderColorPalette.bind(this);
    this.renderTaskTools = this.renderTaskTools.bind(this);
  }

  renderTaskTools() {
    return (
      <div style={styles.taskTools}>
        <div
          style={styles.deleteContainer}
          onClick={() => this.props.deleteTask(this.props.storyId, this.props.index)}
        />
      <div onClick={() => this.setState({isColorPaletteVisible: !this.state.isColorPaletteVisible})} style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 16, height: 16, borderRadius: 8, backgroundColor: this.props.task.color}}/>
        </div>
      </div>
    );
  }

  renderColorPalette() {
    if (this.state.isColorPaletteVisible) {
      return <ColorPalette marginTop={23} setColor={(color) => this.props.setTaskColor(this.props.storyId, this.props.index, color)}/>;
    }

    return null;
  }

  handleMouseEvent(isEnter) {
    if (isEnter) {
      this.setState({isTaskHovered: isEnter});
    } else {
      this.setState({
        isTaskHovered: isEnter,
        isColorPaletteVisible: isEnter
      });
    }
  }

  render() {
    const {connectDragSource, connectDropTarget} = this.props;
    const isTaskDragged = this.props.draggedTaskId === this.props.task.id;
    const taskTools = this.state.isTaskHovered ? this.renderTaskTools() : null;
    const colorPalette = this.renderColorPalette();

    return connectDropTarget(connectDragSource(
      <div
        onMouseLeave={() => this.handleMouseEvent(false)}
        onMouseEnter={() => this.handleMouseEvent(true)}
        className={'taskContainer'}
        style={{...styles.taskContainer, ...{opacity: isTaskDragged ? 0 : 1}}}
      >
        <div style={{...styles.taskMarker, ...{backgroundColor: this.props.task.color}}}/>
        <div style={styles.taskDescription}>
          {this.props.task.description}
        </div>
        {taskTools}
        {colorPalette}
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
    backgroundColor: '#fff',
    position: 'relative',
    border: '1px solid #CFD8DC',
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
    padding: '16px 35px 15px 14px'
  },

  taskTools: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    height: 60,
    top: 0,
    right: 0,
    width: 35,
  },

  deleteContainer: {
    display: 'flex',
    flex: 1,
    backgroundImage: 'url("/img/ic_close.png")',
    backgroundSize: 16,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
};

TaskItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  setDraggeTaskId: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
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
