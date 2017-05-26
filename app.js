'use strict';

const Server = require('./server/index.js');
const appServer = new Server();

appServer.loadConfigs();
appServer.createHTTPServer();
appServer.createWebSocketServer();
appServer.run();
appServer.openInBrowser();
