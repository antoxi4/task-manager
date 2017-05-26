"use strict";

const jwt = require('jsonwebtoken');

module.exports = {

  createToken(data) {
    return jwt.sign(data, sp.config.jwt.secretKey, {expiresIn: sp.config.jwt.expiresIn});
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, sp.config.jwt.secretKey);
    } catch (error) {
      sp.log.error('TOKEN VERIFYING ERROR:', error.message);
      return null;
    }
  },

  extractAuthToken(req) {
    if (req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        return credentials;
      }
    }

    return null;
  }

};
