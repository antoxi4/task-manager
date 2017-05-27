'use strict';

import {connect} from 'react-redux';
import {compose} from 'redux';
import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import PropTypes from 'prop-types';
import StoryCard from '../storyCard';
import {StoryActions} from '../../actions';

class StoriesList extends Component {
  constructor(props) {
    super(props);

    this.getStoriesList = this.getStoriesList.bind(this);
  }

  getStoriesList() {
    return this.props.stories.map((story, idx) => {
      return (
        <StoryCard
          key={`story_${story.id}`}
          story={story}
          storyIndex={idx}
          draggedTaskId={this.props.draggedTaskId}
          draggedStoryId={this.props.draggedStoryId}
          addStoryTask={this.props.addStoryTask}
          moveTask={this.props.moveTask}
          moveStoryAtIndex={this.props.moveStoryAtIndex}
          setDraggeTaskId={this.props.setDraggeTaskId}
          setDraggeStoryId={this.props.setDraggeStoryId}
        />
      );
    });
  }

  render() {
    const storiesList = this.getStoriesList();

    return (
      <div style={styles.mainContainer}>
        {storiesList}
      </div>
    );
  }
}

const styles = {
  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 60,
    paddingTop: 20,
    paddingLeft: '5%',
    paddingRight: '5%'
  }
};

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
  moveTask: PropTypes.func.isRequired,
  addStoryTask: PropTypes.func.isRequired,
  setDraggeStoryId: PropTypes.func.isRequired,
  setDraggeTaskId: PropTypes.func.isRequired,
  draggedStoryId: PropTypes.string.isRequired,
  moveStoryAtIndex: PropTypes.func.isRequired,
  draggedTaskId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    stories: state.story.stories,
    draggedStoryId: state.story.draggedStoryId,
    draggedTaskId: state.story.draggedTaskId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveTask: (prevStoryIndex, nextStoryIndex, taskIndex, hoveredTaskIndex) => {
      dispatch(StoryActions.moveTask(prevStoryIndex, nextStoryIndex, taskIndex, hoveredTaskIndex));
    },

    addStoryTask: (storyIndex, taskDescription) => {
      dispatch(StoryActions.addTask(storyIndex, taskDescription));
    },

    setDraggeStoryId: storyId => {
      dispatch(StoryActions.setDraggeStoryId(storyId));
    },

    setDraggeTaskId: taskId => {
      dispatch(StoryActions.setDraggeTaskId(taskId));
    },

    moveStoryAtIndex: (storyIndex, newIndex) => {
      dispatch(StoryActions.moveStoryAtIndex(storyIndex, newIndex));
    }
  };
};

export default compose(DragDropContext(HTML5Backend), connect(mapStateToProps, mapDispatchToProps))(StoriesList);
