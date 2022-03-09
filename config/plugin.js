'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
// had enabled by egg
// static: {
//   enable: true,
// }
// };

// 自定义配置插件
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// 'use strict';
/** @type Egg.EggPlugin */

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// config -> pluin.js
exports.mongoose = {
  // enable: true, // 开启插件
  enable: false, // 开启插件
  package: 'egg-mongoose',
}
