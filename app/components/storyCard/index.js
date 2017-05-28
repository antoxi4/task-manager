'use strict';

import React, {Component} from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {DropTarget, DragSource} from 'react-dnd';
import {DND_ITEMS} from '../../constants';
import TasksList from '../tasksList';
import AddItemBlock from '../addItemBlock';

class StoryCard extends Component {
  constructor(props) {
    super(props);

    this.renderAddTaskBlock = this.renderAddTaskBlock.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
  }

  addNewTask(taskDescription) {
    this.props.addTask(this.props.story.id, taskDescription);
  }

  renderAddTaskBlock() {
    return (
      <AddItemBlock
        confirmEvent={this.addNewTask}
        wrapperStyle={styles.addTaskWrapperStyle}
        inputPlaceHolder={'New Task...'}
        inputClassName={'inputFocusStyle'}
      />
    );
  }

  deleteSelf() {
    this.props.deleteStory(this.props.storyIndex, this.props.story.id);
  }

  render() {
    const {connectDropTarget, connectDragSource} = this.props;
    const isStoryDragged = this.props.story.id === this.props.draggedStoryId;
    const addStoryBlock = this.renderAddTaskBlock();

    return connectDropTarget(connectDragSource(
      <div style={{...styles.mainContainer, ...{opacity: isStoryDragged ? 0 : 1}}}>
        <div style={styles.cardHeader}>
          <div style={styles.cardName}>{this.props.story.name}</div>
          <div onClick={this.deleteSelf} style={styles.deleteButton} className={'hoverGlow'} />
        </div>
        {addStoryBlock}
        <TasksList storyId={this.props.story.id} storyIndex={this.props.storyIndex} />
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
    minHeight: 220,
  },

  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    border: '1px solid #CFD8DC',
    backgroundColor: '#263238'
  },

  cardName: {
    color: '#fff',
    paddingLeft: 14,
    alignItems: 'center',
    fontSize: '10pt',
    display: 'flex',
    flex: 1
  },

  deleteButton: {
    display: 'flex',
    cursor: 'pointer',
    width: 45,
    backgroundPosition: 'center',
    backgroundSize: 25,
    backgroundRepeat: 'no-repeat',
    height: 45,
    backgroundImage: 'url("/img/ic_delete.png")'
  },

  addTaskWrapperStyle: {
    marginTop: 10
  }
};

StoryCard.propTypes = {
  story: PropTypes.object.isRequired,
  storyIndex: PropTypes.number.isRequired,
  draggedStoryId: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  moveStoryAtIndex: PropTypes.func.isRequired,
  setDraggeStoryId: PropTypes.func.isRequired,
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
      props.setDraggeStoryId(dragId);
      return;
    }

    if (props.draggedStoryId.length && !isHoveredSelf) {
      props.moveStoryAtIndex(dragIndex, hoverIndex);
      monitor.getItem().storyIndex = hoverIndex;
    }
  }
};

const storyCollectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  };
};


const storySource = {
  beginDrag(props) {
    return {
      storyIndex: props.storyIndex,
      story: props.story
    };
  },

  endDrag(props) {
    props.setDraggeStoryId('');
  }
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
