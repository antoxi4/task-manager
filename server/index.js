'use strict';

global.sp = {
  log: require('./modules/logger')(),
  config: {},
  service: {}
};

const expressMidlwareLoader = require('./modules/expressMidlwareLodaer');

function Server() {
  this.WebSocketServer = require('ws').Server;
  this.express = require('express');
  this.app = this.express();
  this.httpServer = null;
  this.httpControllers = null;
  this.httpRoutes = null;
  this.websocketControllers = null;
  this.websocketRoutes = null;
  this.websocketInterface = null;
}

Server.prototype.loadConfigs = function() {
  sp.config = require('./modules/configsLoader')();
  sp.log.info(`Server :: All Configs was loaded`);
};

Server.prototype.createHTTPServer = function() {
  this.httpServer = require('http').createServer(this.app);
  expressMidlwareLoader.call(this);
  this.httpControllers = require('./modules/httpControllersLoader')();
  this.httpRoutes = require('./modules/httpRoutesLoader').call(this);
  sp.log.info(`Server :: HTTP Server was created`);
};

Server.prototype.createWebSocketServer = function() {
  if (!this.httpServer) {
    throw new Error ('HTTP Server not created');
  }

  this.websocketInterface = require('./modules/websocketInterfaceLoader');
  this.wss = new this.WebSocketServer({server: this.httpServer});
  this.websocketControllers = require('./modules/websocketControllersLoader')();
  this.websocketRoutes = require('./modules/websocketRoutesLoader').call(this);
  sp.log.info(`Server :: WebSocket Server was created`);
};

Server.prototype.run = function() {
  this.httpServer.listen(sp.config.globals.port, () => {
    sp.log.info(`Server :: HTTP Server started on port: ${this.httpServer.address().port}`);
  });
};

Server.prototype.openInBrowser = function() {
  require('./modules/pageLoader').call(this);
};

module.exports = Server;
