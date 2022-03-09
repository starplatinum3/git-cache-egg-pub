'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hello, egg';
    // 从服务中获取数据
    const data = await ctx.service.test.index();
    // ctx.body = data;

    // 渲染模板（服务端渲染）
    await ctx.render('index.test.html', {
      // 渲染数据
      data,
      res: data,
      // 渲染列表
      list: [ 'a', 'b', 'c' ],

    });
  }
}

module.exports = HomeController;
