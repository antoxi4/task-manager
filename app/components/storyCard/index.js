'use strict';

import React, {Component} from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {DropTarget, DragSource} from 'react-dnd';
import {DND_ITEMS} from '../../constants';
import TaskList from '../taskList';
import StoryCardHeader from '../storyCardHeader';
import AddTaskBlock from '../addTaskBlock';

class StoryCard extends Component {
  constructor(props) {
    super(props);

    this.addNewTask = this.addNewTask.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
  }

  addNewTask(taskDescription) {
    this.props.addTask(this.props.story.id, taskDescription);
  }

  deleteStory() {
    this.props.deleteStory(this.props.storyIndex, this.props.story.id);
  }

  render() {
    const {connectDropTarget, connectDragSource} = this.props;
    const isStoryDragged = this.props.story.id === this.props.draggedStoryId;

    return connectDropTarget(connectDragSource(
      <div style={{...styles.mainContainer, ...{opacity: isStoryDragged ? 0 : 1}}}>
        <StoryCardHeader storyName={this.props.story.name} deleteStory={this.deleteStory}/>
        <AddTaskBlock addNewTask={this.addNewTask}/>
        <TaskList storyId={this.props.story.id} storyIndex={this.props.storyIndex} />
      </div>
    ));
  }
}

const styles = {
  mainContainer: {
    marginRight: 15,
    marginBottom: 15,
    display: 'flex',
    width: 240,
    flexDirection: 'column',
    minHeight: 220
  }
};

StoryCard.propTypes = {
  story: PropTypes.object.isRequired,
  storyIndex: PropTypes.number.isRequired,
  draggedStoryId: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  moveStoryAtIndex: PropTypes.func.isRequired,
  setDraggedStoryId: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

const storyTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().storyIndex;
    const hoverIndex = props.storyIndex;
    const dragId = monitor.getItem().story.id;
    const isHoveredSelf = dragIndex === hoverIndex;

    if (isHoveredSelf && !props.draggedStoryId.length) {
      props.setDraggedStoryId(dragId);
      return;
    }

    if (props.draggedStoryId.length && !isHoveredSelf) {
      props.moveStoryAtIndex(dragIndex, hoverIndex);
      monitor.getItem().storyIndex = hoverIndex;
    }
  }
};

const storySource = {
  beginDrag(props) {
    return {
      storyIndex: props.storyIndex,
      story: props.story
    };
  },

  endDrag(props) {
    props.setDraggedStoryId('');
  }
};

const storyCollectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  };
};

const storyCollectSource = connect => {
  return {
    connectDragSource: connect.dragSource()
  };
};

export default compose(
  DropTarget(DND_ITEMS.STORY, storyTarget, storyCollectTarget),
  DragSource(DND_ITEMS.STORY, storySource, storyCollectSource)
)(StoryCard);
