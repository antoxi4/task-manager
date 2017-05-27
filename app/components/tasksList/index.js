'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TaskItem from '../taskItem';
import {StoryActions} from '../../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TasksList extends Component {
  constructor(props) {
    super(props);

    this.getStoryTasks = this.getStoryTasks.bind(this);
  }

  getStoryTasks() {
    return this.props.tasks.map((task, idx) => {
      return (
        <TaskItem
          key={`task_${task.id}`}
          task={task}
          index={idx}
          storyId={this.props.storyId}
          storyIndex={this.props.storyIndex}
          draggedTaskId={this.props.draggedTaskId}
          moveTask={this.props.moveTask}
          setDraggeTaskId={this.props.setDraggeTaskId}
        />
      );
    });
  }

  render() {
    const tasks = this.getStoryTasks();

    return (
      <ReactCSSTransitionGroup
        style={styles.taskListContainer}
        transitionName="example"
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}
      >
        {tasks}
      </ReactCSSTransitionGroup>
    );
  }
}

const styles = {
  taskListContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: '#455A64'
  }
};

TasksList.propTypes = {
  storyId: PropTypes.string.isRequired,
  moveTask: PropTypes.func.isRequired,
  setDraggeTaskId: PropTypes.func.isRequired,
  storyIndex: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
  draggedTaskId: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    tasks: state.story.tasks[props.storyId],
    draggedTaskId: state.story.draggedTaskId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveTask: (prevStoryIndex, nextStoryIndex, taskIndex, hoveredTaskIndex) => {
      dispatch(StoryActions.moveTask(prevStoryIndex, nextStoryIndex, taskIndex, hoveredTaskIndex));
    },

    setDraggeTaskId: taskId => {
      dispatch(StoryActions.setDraggeTaskId(taskId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
