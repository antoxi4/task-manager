'use strict';

import {connect} from 'react-redux';
import {compose} from 'redux';
import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import PropTypes from 'prop-types';
import StoryCard from '../storyCard';
import AddStoryBlock from '../addStoryBlock';
import {StoryActions} from '../../actions';

class StoriesList extends Component {
  constructor(props) {
    super(props);

    this.renderStories = this.renderStories.bind(this);
  }

  renderStories() {
    return this.props.stories.map((story, idx) => {
      return (
        <StoryCard
          key={`story_${story.id}`}
          story={story}
          storyIndex={idx}
          draggedStoryId={this.props.draggedStoryId}
          addTask={this.props.addTask}
          deleteStory={this.props.deleteStory}
          moveStoryAtIndex={this.props.moveStoryAtIndex}
          setDraggedStoryId={this.props.setDraggedStoryId}
        />
      );
    });
  }

  render() {
    const stories = this.renderStories();

    return (
      <div style={styles.mainContainer}>
        <AddStoryBlock addStory={this.props.addStory} />
        {stories}
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
    paddingTop: '4%',
    paddingLeft: '5%',
    paddingRight: '5%'
  },

  addStoryButton: {
    height: 45,
    width: 45,
    cursor: 'pointer',
    border: '1px solid #CFD8DC',
    marginRight: 10,
    backgroundImage: 'url("/img/ic_add.png")',
    backgroundSize: 25,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },

  addStoryWrapperStyle: {
    width: 240,
    height: 45,
    marginRight: 10
  },

  addStoryInputStyle: {
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#263238'
  }
};

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
  addStory: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  setDraggedStoryId: PropTypes.func.isRequired,
  draggedStoryId: PropTypes.string.isRequired,
  moveStoryAtIndex: PropTypes.func.isRequired,
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
    addTask: (storyId, taskDescription) => {
      dispatch(StoryActions.addTask(storyId, taskDescription));
    },

    addStory: storyName => {
      dispatch(StoryActions.addStory(storyName));
    },

    deleteStory: (storyIndex, storyId) => {
      dispatch(StoryActions.deleteStory(storyIndex, storyId));
    },

    setDraggedStoryId: storyId => {
      dispatch(StoryActions.setDraggedStoryId(storyId));
    },

    moveStoryAtIndex: (storyIndex, newIndex) => {
      dispatch(StoryActions.moveStoryAtIndex(storyIndex, newIndex));
    }
  };
};

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(StoriesList);
