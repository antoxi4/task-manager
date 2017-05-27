'use strict';

import {STORE_STORY_DATA} from './actionTypes';
import {COLORS} from '../constants';

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

Array.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this));
};

function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}

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

export function addTask(storyId, taskDescription) {
  return (dispatch, getState) => {
    const randomColor = getRandomColor();
    let tasks = cloneObject(getState().story.tasks);

    tasks[storyId].unshift({
      id: Date.now().toString(),
      description: taskDescription,
      color: randomColor,
      completed: false
    });

    return dispatch(storeData({tasks}));
  };
}

export function deleteTask(storyId, taskIndex) {
  return (dispatch, getState) => {
    let tasks = cloneObject(getState().story.tasks);

    tasks[storyId].splice(taskIndex, 1);

    return dispatch(storeData({tasks}));
  };
}


export function moveTask(prevStoryId, nextStoryId, taskIndex, hoveredTaskIndex) {
  return (dispatch, getState) => {
    let tasks = cloneObject(getState().story.tasks);
    const isMovingInsideOneStory = prevStoryId === nextStoryId;

    if (isMovingInsideOneStory) {
      tasks[prevStoryId].move(taskIndex, hoveredTaskIndex);
    } else {
      const task = tasks[prevStoryId].splice(taskIndex, 1);

      tasks[nextStoryId].splice(hoveredTaskIndex, 0, task[0]);
    }

    return dispatch(storeData({tasks}));
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

    return dispatch(storeData({stories}));
  };
}
