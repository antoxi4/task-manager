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
          draggedStoryId={this.props.draggedStoryId}
          moveTaskToStory={this.props.moveTaskToStory}
          addStoryTask={this.props.addStoryTask}
          setDraggeStoryId={this.props.setDraggeStoryId}
          moveStoryAtIndex={this.props.moveStoryAtIndex}
          clearDraggedStoryId={this.props.clearDraggedStoryId}
          storyIndex={idx}
          story={story}
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

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
  moveTaskToStory: PropTypes.func.isRequired,
  addStoryTask: PropTypes.func.isRequired,
  setDraggeStoryId: PropTypes.func.isRequired,
  draggedStoryId: PropTypes.string.isRequired,
  moveStoryAtIndex: PropTypes.func.isRequired,
  clearDraggedStoryId: PropTypes.func.isRequired
};

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 60,
    paddingTop: 20,
    paddingLeft: '5%',
    paddingRight: '5%'
  }
};

const mapStateToProps = state => {
  return {
    stories: state.story.stories,
    draggedStoryId: state.story.draggedStoryId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveTaskToStory: (prevStoryIndex, nextStoryIndex, taskIndex) => {
      dispatch(StoryActions.moveTaskToStory(prevStoryIndex, nextStoryIndex, taskIndex));
    },

    addStoryTask: (storyIndex, taskDescription) => {
      dispatch(StoryActions.addTask(storyIndex, taskDescription));
    },

    setDraggeStoryId: storyId => {
      dispatch(StoryActions.setDraggeStoryId(storyId));
    },

    moveStoryAtIndex: (storyIndex, newIndex) => {
      dispatch(StoryActions.moveStoryAtIndex(storyIndex, newIndex));
    },

    clearDraggedStoryId: () => {
      dispatch(StoryActions.clearDraggedStoryId());
    }
  };
};

export default compose(DragDropContext(HTML5Backend), connect(mapStateToProps, mapDispatchToProps))(StoriesList);
