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
          draggedStoryId={this.props.draggedStoryId}
          addTask={this.props.addTask}
          moveStoryAtIndex={this.props.moveStoryAtIndex}
          setDraggeStoryId={this.props.setDraggeStoryId}
        />
      );
    });
  }

  renderAddStoryCard() {
    return (
      <div style={styles.cardHeader}>
        <div style={styles.cardName}>{this.props.story.name}</div>
        <div style={styles.moreButton} className={'cardMoreButton'} />
      </div>
    );
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
    paddingTop: '4%',
    paddingLeft: '5%',
    paddingRight: '5%'
  }
};

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
  setDraggeStoryId: PropTypes.func.isRequired,
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

    setDraggeStoryId: storyId => {
      dispatch(StoryActions.setDraggeStoryId(storyId));
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
