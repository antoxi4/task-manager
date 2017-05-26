'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TaskItem from '../taskItem';
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
          storyIndex={this.props.storyIndex}
          draggedTaskId={this.props.draggedTaskId}
          moveTaskToStory={this.props.moveTaskToStory}
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
  moveTaskToStory: PropTypes.func.isRequired,
  setDraggeTaskId: PropTypes.func.isRequired,
  storyIndex: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
  draggedTaskId: PropTypes.string.isRequired
};

export default TasksList;
