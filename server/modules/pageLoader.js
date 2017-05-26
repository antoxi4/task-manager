'use strict';

const {spawn} = require('child_process');
const os = require('os');

module.exports = function() {
  sp.log.info(`Server :: Try open page in browser`);
  switch (os.platform()) {
    case 'darwin':
      spawn('open', [`http://localhost:${sp.config.globals.port}`]);
      break;
    case 'win32':
      spawn('cmd', ['/c', 'start', `http://localhost:${sp.config.globals.port}`]);
      break;
    default:
      sp.log.info(`Server :: Server does not support opening page in you Operation System`);
      break;
  }
};
