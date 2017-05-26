'use strict';

let path = require('path');
let configsFolder = 'config/';
let fileUtils = require(path.resolve('server/utils/fileUtils'));

module.exports = function() {
  let configs = fileUtils.getFolderFilesRecursivelyWithPath(configsFolder);
  let loadedConfigs = {};

  configs.forEach(config => {
    let configFileName = fileUtils.getFileName(config);
    let configFilePath = fileUtils.getFilePath(config);

    try {
      Object.assign(loadedConfigs, require(configFilePath));

      sp.log.info(`Configs :: loading config "${configsFolder + configFileName}"`);
    } catch (err) {
      sp.log.error(`Configs :: loading config  "${configsFolder + configFileName}"`);
      throw new Error(err);
    }
  });

  return loadedConfigs;
};
