'use strict';

module.exports = {
  send(connection, event, payload) {
    let sendFormat = {
      event,
      data: payload
    };

    connection.send(JSON.stringify(sendFormat));
  }
};
