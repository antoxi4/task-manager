'use strict';

let path = require('path');
let httpControllersPath = path.resolve('api/controllers/http/');
let fileUtils = require(path.resolve('server/utils/fileUtils'));

module.exports = function() {
  let controllers = fileUtils.getFolderFilesRecursivelyWithPath(httpControllersPath);
  let loadedControllers = {};

  controllers.forEach(controller => {
    let controllerFileName = fileUtils.getFileName(controller);
    let controllerFilePath = fileUtils.getFilePath(controller);
    let controllerLocalPath = fileUtils.getLocalFilePath(httpControllersPath, controller);
    let controllerRoutePath = path.join(controllerLocalPath, controllerFileName);

    try {
      loadedControllers[controllerRoutePath] = require(controllerFilePath);
      sp.log.info(`HTTP Controllers :: controller "${controllerRoutePath}" is loaded`);
    } catch (err) {
      sp.log.error(`HTTP Controllers :: controller  "${controllerRoutePath}" is loaded`);
      throw new Error(err);
    }
  });

  return loadedControllers;
};
