'use strict';

module.exports = () => {
  const config = exports = {};

  // add your config here
  config.cluster = {
    listen: {
      port: 8201,
    },
  };

  // mongoose config
  config.mongoose = {
    url: 'mongodb://localhost:27018/jobs',
  };

  config.logger = {
    // level: 'DEBUG',
    // consoleLevel: 'DEBUG',
  };

  return config;
};
