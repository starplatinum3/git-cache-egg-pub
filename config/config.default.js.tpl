/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
    // 允许访问接口的白名单，例如：http://localhost:8080 *表示均可访问
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };


  // 连接mongodb的配置
  config.mongoose = {
    client: {
      url: 'mongodb://starplatinumora.top/git_cache',
      options: {},
    },
  };
  // https://www.jianshu.com/p/2e63e7b930fa

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1626598022913_9968';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 修改config/config.default.js
  config.static = {
    prefix: '/',
    dir: process.cwd() + '/public',
  };

  // 修改config/config.default.js
  config.rundir = process.cwd() + '/run';

  // add your user config here 自定义配置
  const userConfig = {
    // myAppName: 'egg',
    view: {
      mapping: {
        '.html': 'ejs',
      },
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '1234',
        // 数据库名
        database: 'egg_article',
      },
      
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};

// 'use strict';

/**
 * egg-bus default config
 * @member Config#bus
 * @property {String} SOME_KEY - some description
 */
exports.bus = {
  app: true,
  agent: true,
  debug: true,
  concurrency: 1,
  listener: {
    baseDir: 'listener',
    options: {
      attempts: 5,
      backoff: {
        delay: 3000,
        type: 'fixed',
      },
    },
  },
  bull: {
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
    },
  },
  job: {
    baseDir: 'job',
    options: {
      attempts: 5,
      backoff: {
        delay: 3000,
        type: 'fixed',
      },
    },
  },
  queue: {
    default: 'default', // 默认队列名称
    prefix: 'bus', // 队列前缀
  },
  queues: {},
};


// {app_root}/config/config.default.js
// exports.bus = {
//   enable: true,
//   package: 'egg-bus',
//   debug: true, // Debug 模式下会打印更多日志信息
//   concurrency: 1, // Bull 中队列处理的并发数：https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueprocess
//   listener: {
//     ignore: null, // 忽略目录中的某些文件，https://eggjs.org/zh-cn/advanced/loader.html#ignore-string
//     baseDir: 'listener',
//     options: { // Bull Job 配置： https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
//       attempts: 5,
//       backoff: {
//         delay: 3000,
//         type: 'fixed',
//       },
//     }
//   },
//   job: {
//     // 与 listener 一致，唯一不同的就是 默认 baseDir 的值为 `job`
//   },
//   bull: { // Bull 队列配置：https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queue
//     redis: {
//       host: 'localhost',
//       port: 6379,
//       db: 0,
//     },
//   },

//   queue: {
//     default: 'default', // 默认队列名称
//     prefix: 'bus', // 队列前缀
//   },
//   queues: { // 针对不同队列单独配置

//     // 比如针对默认队列更改 redis 端口
//     default: {
//       redis: {
//         port: 6380,
//       },
//     }
//   },
// };
