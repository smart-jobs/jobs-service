'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520823985247_0312';

  // add your config here
  // config.middleware = [];

  config.cluster = {
    listen: {
      port: 8201,
    },
  };

  config.errorMongo = {
    details: true,
  };
  config.errorHanler = {
    details: true,
  };

  // mongoose config
  config.mongoose = {
    url: 'mongodb://localhost:27017/jobs',
    options: {
      user: 'root',
      pass: 'Ziyouyanfa#@!',
      authSource: 'admin',
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  };

  // axios service config
  config.axios = {
    corp: { // 企业信息查询服务
      baseUrl: 'http://localhost:8102/api',
    },
    user: { // 学生信息查询服务
      baseUrl: 'http://localhost:8101/api',
    },
  };

  return config;
};
