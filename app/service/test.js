// service.js
'use strict';

const Service = require('egg').Service;

class Test extends Service {
  async index() {
    // 连接数据库
    // const { app } = this;
    // const data = await app.mysql.select('article');
    // const data = await app.mysql.query('select * from article');
    // console.log(data);
    return {
      id: '123',
      name: '测试',
    };
  }

}

module.exports = Test;
