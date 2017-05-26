'use strict';

let winston = require('winston');

module.exports = function() {
  let label = 'ring-test';

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label
      })
    ]
  });
};
