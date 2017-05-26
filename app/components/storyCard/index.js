'use strict';

import React, {Component} from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {DropTarget, DragSource} from 'react-dnd';
import {DND_ITEMS} from '../../constants';
import TasksList from '../tasksList';
import AddTask from '../addTask';

class StoryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {connectDropTarget, connectDragSource} = this.props;

    return connectDropTarget(connectDragSource(
      <div style={{...styles.mainContainer, ...{opacity: this.props.story.id === this.props.draggedStoryId ? 0 : 1}}}>
        <div style={{...styles.cardHeader, ...{backgroundColor: this.props.story.color}}}>
          <div style={styles.cardName}>{this.props.story.name}</div>
          <div style={styles.moreButton} className={'cardMoreButton'} />
        </div>
        <AddTask storyIndex={this.props.storyIndex} addStoryTask={this.props.addStoryTask} />
        <TasksList moveTaskToStory={this.props.moveTaskToStory} tasks={this.props.story.tasks} storyIndex={this.props.storyIndex} />
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
  },

  cardName: {
    color: '#fff',
    paddingLeft: 14,
    alignItems: 'center',
    fontSize: '10pt',
    display: 'flex',
    flex: 1
  },

  moreButton: {
    display: 'flex',
    cursor: 'pointer',
    width: 45,
    backgroundPosition: 'center',
    backgroundSize: 25,
    backgroundRepeat: 'no-repeat',
    height: 45,
    backgroundImage: 'url("/img/ic_more.png")'
  }
};

StoryCard.propTypes = {
  story: PropTypes.object.isRequired,
  storyIndex: PropTypes.number.isRequired,
  moveTaskToStory: PropTypes.func.isRequired,
  setDraggeStoryId: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  addStoryTask: PropTypes.func.isRequired,
  draggedStoryId: PropTypes.string.isRequired,
  moveStoryAtIndex: PropTypes.func.isRequired
};

const storyTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().storyIndex;
    const hoverIndex = props.storyIndex;
    const dragId = monitor.getItem().story.id;
    const hoverId = props.story.id;


    if (dragIndex === hoverIndex && !props.draggedStoryId.length) {
      props.setDraggeStoryId(dragId);
      return;
    }

    if (props.draggedStoryId.length && dragId != hoverId && dragIndex != hoverIndex) {
      props.moveStoryAtIndex(dragIndex, hoverIndex);
      monitor.getItem().storyIndex = hoverIndex;
    }
  },

  drop(props, monitor) {
    const dragIndex = monitor.getItem().storyIndex;
    const hoverIndex = props.storyIndex;
    props.clearDraggedStoryId();
  }
};

const storyCollectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  };
};


const storySource = {
  beginDrag(props, monitor) {
    return {
      storyIndex: props.storyIndex,
      story: props.story
    };
  }
};

const storyCollect = connect => {
  return {
    connectDragSource: connect.dragSource()
  };
};

export default compose(DropTarget(DND_ITEMS.STORY, storyTarget, storyCollectTarget), DragSource(DND_ITEMS.STORY, storySource, storyCollect))(StoryCard);