'use strict';

import {STORE_STORY_DATA} from './actionTypes';
import * as helper from '../helpers';

function storeData(data) {
  return {
    type: STORE_STORY_DATA,
    payload: data
  };
}

export function addTask(storyId, taskDescription) {
  return (dispatch, getState) => {
    const randomColor = helper.getRandomColor();
    let tasks = helper.clone(getState().story.tasks);

    tasks[storyId].unshift({
      id: Date.now().toString(),
      description: taskDescription,
      color: randomColor
    });

    return dispatch(storeData({tasks}));
  };
}

export function addStory(storyName) {
  return (dispatch, getState) => {
    const storyId = Date.now().toString();
    let tasks = helper.clone(getState().story.tasks);
    let stories = helper.clone(getState().story.stories);

    tasks[storyId] = [];
    stories.unshift({
      id: storyId,
      name: storyName,
    });

    return dispatch(storeData({stories, tasks}));
  };
}

export function deleteStory(storyIndex, storyId) {
  return (dispatch, getState) => {
    let tasks = helper.clone(getState().story.tasks);
    let stories = helper.clone(getState().story.stories);

    stories.splice(storyIndex, 1);
    delete tasks[storyId];

    return dispatch(storeData({stories, tasks}));
  };
}

export function deleteTask(storyId, taskIndex) {
  return (dispatch, getState) => {
    let tasks = helper.clone(getState().story.tasks);

    tasks[storyId].splice(taskIndex, 1);

    return dispatch(storeData({tasks}));
  };
}

export function setTaskColor(storyId, taskIndex, color) {
  return (dispatch, getState) => {
    let tasks = helper.clone(getState().story.tasks);

    tasks[storyId][taskIndex].color = color;

    return dispatch(storeData({tasks}));
  };
}

export function moveTask(prevStoryId, nextStoryId, taskIndex, hoveredTaskIndex) {
  return (dispatch, getState) => {
    let tasks = helper.clone(getState().story.tasks);
    const isMovingInsideOneStory = prevStoryId === nextStoryId;

    if (isMovingInsideOneStory) {
      helper.moveArrayElement(taskIndex, hoveredTaskIndex, tasks[prevStoryId]);
    } else {
      const task = tasks[prevStoryId].splice(taskIndex, 1);

      tasks[nextStoryId].splice(hoveredTaskIndex, 0, task[0]);
    }

    return dispatch(storeData({tasks}));
  };
}

export function setDraggedStoryId(storyId) {
  return storeData({draggedStoryId: storyId});
}

export function setDraggedTaskId(taskId) {
  return storeData({draggedTaskId: taskId});
}

export function moveStoryAtIndex(storyIndex, newIndex) {
  return (dispatch, getState) => {
    let stories = helper.clone(getState().story.stories);

    helper.moveArrayElement(storyIndex, newIndex, stories);

    return dispatch(storeData({stories}));
  };
}
