// development.js
'use strict';

const Controller = require('egg').Controller;

class Test extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hello, this is development egg!';
    // 从服务中获取数据
    const data = await ctx.service.test.index();
    ctx.body = data;
  }

  async detail() {
    // 传参:ulr后面加?id=1234（http://127.0.0.1:7002/test/detail?id=123456）
    const { ctx } = this;
    // console.log(ctx.query);
    ctx.body = `id==${ctx.query.id}`;
  }
  async detail0() {
    // 动态传参:ulr后面加参数（http://127.0.0.1:7002/test/detail0/1234）
    const { ctx } = this;
    // console.log(ctx.params);
    ctx.body = `id == ${ctx.params.id}`;
  }

  async create() {
    const { ctx } = this;
    console.log(ctx.request.body);
    ctx.body = {
      id: 123,
    };
  }

  async update() {
    const { ctx } = this;
    console.log(ctx.params);
    ctx.body = {
      id: ctx.params.id,
    };
  }
  async delete() {
    const { ctx } = this;
    console.log(ctx.params);
    ctx.body = {
      id: ctx.params.id,
    };
  }
}

module.exports = Test;
