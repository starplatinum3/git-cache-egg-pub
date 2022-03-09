// config -> config.local.js
exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1:27017/egg-mongo',
    options: {}
  }
}

exports.baseUrl = 'http://127.0.0.1:7001';

// config.prod.js 目前用不到生产的环境，先不配置
