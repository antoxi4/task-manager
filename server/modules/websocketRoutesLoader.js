'use strict';

module.exports = function() {
  _validateRoutes(sp.config.websocketRoutes, this.websocketControllers);

  this.wss.on('connection', client => {
    client.on('message', message => {
      let parsedMessage = _toJSON(message);
      let messageEvent = sp.config.websocketRoutes[parsedMessage.event];
      let requestContext = {
        body: parsedMessage.data,
        client
      };
      let responseContext = {
        send: (connection, eventName, payload) => {
          this.websocketInterface.send(connection, eventName, payload);
        }
      };

      this.websocketControllers[messageEvent.controller][messageEvent.action](requestContext, responseContext);
    });
  });
};

function _validateRoutes(routes, controllers) {
  for (const routeKey of Object.keys(routes)) {
    let route = routes[routeKey];

    if (!controllers.hasOwnProperty(route.controller)) {
      sp.log.error(`Websocket Routes :: Controller "${route.controller}" missing`);
      throw new Error(`Websocket Routes :: Controller "${route.controller}" missing`);
    }

    if (!controllers[route.controller].hasOwnProperty(route.action)) {
      sp.log.error(`Websocket Routes :: Controller "${route.controller}" action "${route.action}" missing`);
      throw new Error(`Websocket Routes :: Controller "${route.controller}" action "${route.action}" missing`);
    }
  }
}

function _toJSON(message) {
  return JSON.parse(message);
}
