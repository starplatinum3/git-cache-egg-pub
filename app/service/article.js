/* eslint-disable array-callback-return */
// article.service.js
'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class ArticleService extends Service {
  async create(params) {
    const { app } = this;
    try {
      // 根据那些参数的字典
      const res = await app.mysql.insert('article', params);
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async lists() {
    const { app } = this;
    try {
      const res = await app.mysql.select('article');
      const getLists = [
        ...res,
      ];
      getLists.map(item => {
        // console.log(moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'));
        if (item.createTime) {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
          return item;
        }
      });
      return getLists;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async detail(id) {
    if (!id) {
      console.log('查询详情失败：id=' + id);
      return null;
    }

    const { app } = this;
    try {
      const getDetail = await app.mysql.get('article', { id });
      return getDetail;
    } catch (error) {
      console.log(error);
    }

  }

  async delete(id) {
    if (!id) {
      console.log('文章删除失败：id=' + id);
      return undefined;
    }
    const { app } = this;
    try {
      const deleteArticle = await app.mysql.delete('article', { id });
      return deleteArticle;
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = ArticleService;
