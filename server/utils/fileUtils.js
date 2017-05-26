'use strict';

let fs = require('fs');
let path = require('path');

module.exports = {
  getFolderFilesRecursivelyWithPath(folderPath) {
    let files = [];

    fs.readdirSync(folderPath).forEach(file => {
      let fullFilePath = path.join(folderPath, file);

      if (fs.statSync(fullFilePath).isFile()) {
        files.push({
          folder: folderPath,
          file
        });
      } else if (fs.statSync(fullFilePath).isDirectory()) {
        files = [...files, ...this.getFolderFilesRecursivelyWithPath(path.join(fullFilePath, '/'))];
      }

    });

    return files;
  },

  getFileName: file => file.file.split('.')[0],

  getFilePath: file => path.resolve(path.join(file.folder, file.file)),

  getLocalFilePath: (rootFolder, file) => file.folder.split(path.normalize(rootFolder))[1]
};
