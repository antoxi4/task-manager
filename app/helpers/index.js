'use strict';

import {COLORS} from '../constants';

export const clone = object => JSON.parse(JSON.stringify(object));

export const moveArrayElement = (from, to, array) => array.splice(to, 0, array.splice(from, 1)[0]);

export const getRandomColor = () => {
  const colorsCount = COLORS.length - 1;
  const randomColorNumber = Math.floor(Math.random() * (colorsCount - 0 + 1)) + 0;

  return COLORS[randomColorNumber];
};
