'use strict';

let path = require('path');
let websocketControllersPath = path.resolve('api/controllers/websocket/');
let fileUtils = require(path.resolve('server/utils/fileUtils'));

module.exports = function() {
  let controllers = fileUtils.getFolderFilesRecursivelyWithPath(websocketControllersPath);
  let loadedControllers = {};

  controllers.forEach(controller => {
    let controllerFileName = fileUtils.getFileName(controller);
    let controllerFilePath = fileUtils.getFilePath(controller);
    let controllerLocalPath = fileUtils.getLocalFilePath(websocketControllersPath, controller);
    let controllerRoutePath = path.join(controllerLocalPath, controllerFileName);

    try {
      loadedControllers[controllerRoutePath] = require(controllerFilePath);
      sp.log.info(`Websocket Controllers :: controller "${controllerRoutePath}" is loaded`);
    } catch (err) {
      sp.log.error(`Websocket Controllers :: controller "${controllerRoutePath}" is loaded`);
      throw new Error(err);
    }
  });

  return loadedControllers;
};
