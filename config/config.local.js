'use strict';

module.exports = () => {
  const config = exports = {};

  // add your config here
  config.cluster = {
    listen: {
      port: 8201,
    },
  };

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };

  return config;
};
