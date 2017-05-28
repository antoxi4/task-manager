'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmptyTaskList from '../emptyTaskList';
import PropTypes from 'prop-types';
import TaskItem from '../taskItem';
import {StoryActions} from '../../actions';

class TaskList extends Component {
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
          setTaskColor={this.props.setTaskColor}
          deleteTask={this.props.deleteTask}
          setDraggedTaskId={this.props.setDraggedTaskId}
        />
      );
    });
  }

  render() {
    const tasks = this.getStoryTasks();

    if (tasks.length) {
      return (
        <div style={styles.taskListContainer}>
          {tasks}
        </div>
      );
    }

    return <EmptyTaskList storyId={this.props.storyId} moveTask={this.props.moveTask}/>;
  }
}

const styles = {
  taskListContainer: {
    color: '#455A64',
    flex: 1
  }
};

TaskList.propTypes = {
  storyId: PropTypes.string.isRequired,
  moveTask: PropTypes.func.isRequired,
  setTaskColor: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setDraggedTaskId: PropTypes.func.isRequired,
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

    setDraggedTaskId: taskId => {
      dispatch(StoryActions.setDraggedTaskId(taskId));
    },

    deleteTask: (storyId, taskIndex) => {
      dispatch(StoryActions.deleteTask(storyId, taskIndex));
    },

    setTaskColor: (storyId, taskIndex, color) => {
      dispatch(StoryActions.setTaskColor(storyId, taskIndex, color));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
