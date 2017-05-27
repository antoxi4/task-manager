'use strict';

import {STORE_STORY_DATA} from './actionTypes';
import {COLORS} from '../constants';

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

Array.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this));
};

function getRandomColor() {
  const colorsCount = COLORS.length - 1;
  const randomColorNumber = Math.floor(Math.random() * (colorsCount - 0 + 1)) + 0;

  return COLORS[randomColorNumber];
}

function storeData(data) {
  return {
    type: STORE_STORY_DATA,
    payload: data
  };
}

export function addTask(storyIndex, taskDescription) {
  return (dispatch, getState) => {
    const randomColor = getRandomColor();
    let stories = getState().story.stories.clone();

    stories[storyIndex].tasks.unshift({
      id: Date.now().toString(),
      description: taskDescription,
      color: randomColor,
      completed: false
    });

    return dispatch(storeData({stories}));
  };
}

export function setDraggeStoryId(storyId) {
  return storeData({draggedStoryId: storyId});
}

export function setDraggeTaskId(taskId) {
  return storeData({draggedTaskId: taskId});
}

export function moveStoryAtIndex(storyIndex, newIndex) {
  return (dispatch, getState) => {
    let stories = getState().story.stories.clone();

    stories.move(storyIndex, newIndex);

    return dispatch(storeData({
      stories
    }));
  };
}

export function moveTask(prevStoryIndex, nextStoryIndex, taskIndex, hoveredTaskIndex) {
  return (dispatch, getState) => {
    let stories = getState().story.stories.clone();
    const isMovingInsideOneStory = prevStoryIndex === nextStoryIndex;

    if (isMovingInsideOneStory) {
      stories[prevStoryIndex].tasks.move(taskIndex, hoveredTaskIndex);
    } else {
      const task = stories[prevStoryIndex].tasks.splice(taskIndex, 1);

      stories[nextStoryIndex].tasks.splice(hoveredTaskIndex, 0, task[0]);
    }

    return dispatch(storeData({stories}));
  };
}
