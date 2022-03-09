// service.js
'use strict';

const Service = require('egg').Service;
// import tableNames from ''
// const tableNames = require('../util/common');
const common = require('../util/common');
class GitPageRepo extends Service {
  // tableName : 'git_page_repo';

  // js 类变量
  async getAll() {
    // node  module.exports require
    // tableNames.GitPageRepo
    // tableNames

    // GitPageRepo.prototype.
    // 连接数据库
    // const tableName = 'git_page_repo';
    const { app } = this;
    // const data = await app.mysql.select(tableName);
    // tableNames.git_page_repo
    const tableName = common.tableNames.git_page_repo;
    // const data = await app.mysql.select(tableNames.git_page_repo);
    const data = await app.mysql.select(tableName);
    // const data = await app.mysql.query('select * from article');
    // console.log('data');
    // console.log(data);
    return data;
    // return {
    //   id: '123',
    //   name: '测试',
    // };
  }

}

module.exports = GitPageRepo;
