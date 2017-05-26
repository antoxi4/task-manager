'use strict';

const path = require('path');
const staticFilesPath = path.resolve('public/');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: 'tmpFiles'});

module.exports = function() {
  this.app.use(this.express.static(staticFilesPath));
  this.app.use(bodyParser.json());
  this.app.use(bodyParser.urlencoded({extended: true}));
  this.app.use(multipartMiddleware);
  this.app.use(_sendViewMiddleware);
  this.app.use((req, res, next) => {
    sp.log.info(`HTTP Request :: Method: ${req.method}, Url: ${req.url}`);
    next();
  });
};

function _sendViewMiddleware(req, res, next) {
  res.sendView = function(view) {
    return res.sendFile(view, {root: 'views'});
  };

  next();
}
