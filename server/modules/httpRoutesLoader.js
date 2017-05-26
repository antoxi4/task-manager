'use strict';

module.exports = function() {
  for (const routeKey of Object.keys(sp.config.routes)) {
    const route = _getParsedRoute(sp.config.routes[routeKey], routeKey);

    if (!this.httpControllers.hasOwnProperty(route.controller)) {
      sp.log.error(`HTTP Routes :: Controller "${route.controller}" missing`);
      throw new Error(`HTTP Routes :: Controller "${route.controller}" missing`);
    }

    if (!this.httpControllers[route.controller].hasOwnProperty(route.action)) {
      sp.log.error(`HTTP Routes :: Controller "${route.controller}" action "${route.action}" missing`);
      throw new Error(`HTTP Routes :: Controller "${route.controller}" action "${route.action}" missing`);
    }

    this.app[route.method](route.url, this.httpControllers[route.controller][route.action]);
    sp.log.info(`HTTP Routes :: Route "${routeKey}" is loaded`);
  }
};

function _getParsedRoute(route, routePath) {
  const splitBySymbolNumber = 2;
  let splitRoute = routePath.split(' ', splitBySymbolNumber);

  return {
    url: splitRoute[1],
    method: splitRoute[0].toLowerCase(),
    action: route.action,
    controller: route.controller
  };
}
