// server.js

'use strict';
const egg = require('egg');

const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  baseDir: __dirname,
});

// https://blog.csdn.net/clearlxj/article/details/88708709
