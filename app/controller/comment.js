'use strict';

// import * as common from '../util/common';
// import {common} from '../util/common';
// import * as StringUtil from '../util/StringUtil';


const common = require('../util/common');
const StringUtil = require('../util/StringUtil');
const Controller = require('egg').Controller;
const GetBaiduUtil = require('../util/GetBaiduUtil');
const GitPageUtil = require('../util/GitPageUtil');
const HttpUtil = require('../util/HttpUtil');
const WhileReqThread = require('../util/WhileReqThread');
const rp = require('request-promise');
// request-promise user agent
const TimeUtil = require('../util/TimeUtil');
const MySqlUtil = require('../util/MySqlUtil');
const octokit = require('octokit');

class IssueController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hello, egg';
    // 从服务中获取数据
    const data = await ctx.service.test.index();
    // ctx.body = data;

    // rp(url,)
    // 渲染模板（服务端渲染）
    await ctx.render('index.test.html', {
      // 渲染数据
      data,
      res: data,
      // 渲染列表
      list: [ 'a', 'b', 'c' ],

    });
  }


  async getCommentsByApi(commentsUrl) {

    const options = {
      method: 'GET',
      uri: commentsUrl,
      headers: {
        'User-Agent': 'github Cache',
      },

    };
    const string = await rp(options);

    const arr = JSON.parse(string);
    // arr.forEach()
    // console.log("string");
    // console.log(string);
    // 这是 str
    // console.log();
    // console.log("arr");
    // console.log(arr);
    // 返回的已经是 json
    // arr.forEach(o => {
    //   // firstByUrl.user = JSON.parse(firstByUrl.user);
    //   // firstByUrl.labels = JSON.parse(firstByUrl.labels);
    //   // firstByUrl.reactions = JSON.parse(firstByUrl.reactions);
    //
    //   // js 判断是不是 json字符串
    //   // StringUtil.isJsonString(o.user)
    //
    //   // let parsedUser= JSON.parse(o.user);
    //   // if (typeof  parsedUser=== 'object'){
    //   //   // 是json对象
    //   // }
    //   o.user = JSON.parse(o.user);
    //   // o.labels = JSON.parse(o.labels);
    //   o.reactions = JSON.parse(o.reactions);
    // });
    return arr;
    // return string;
  }

  commentObjToMyO(obj) {
    obj.user = JSON.stringify(obj.user);
    obj.reactions = JSON.stringify(obj.reactions);
    // o.reactions = JSON.stringify(o.reactions);
    obj.created_at = new Date(obj.created_at);
    obj.updated_at = new Date(obj.updated_at);
  }
  async comments(url) {
    const { ctx, app } = this;
    //   rp(url,{
    //     "User-Agent": "github Cache"
    // })

    const commentsUrl = ctx.request.body.commentsUrl;
    const split = commentsUrl.split('/');
    const issId = split[split.length - 2];
    const user = split[4];
    const repo = split[5];
    const api = 'https://api.github.com/repos';

    const url1 = `${api}/${user}/${repo}/issues/${issId}`;
    // const allByIssueUrl = await app.mysql.select('comment', {
    //   issue_url: url1,
    // });
    // 必须写 where？
    console.log('url1');
    console.log(url1);
    const allByIssueUrl = await app.mysql.select('comment', {
      where: {
        issue_url: url1,
      },

    });
    // console.log("allByIssueUrl");
    // console.log(allByIssueUrl);
    // https://blog.csdn.net/yzwdzkn/article/details/99622238
    // let result = await this.app.mysql.select("user",{
    //   where:{id:1}
    // })

    if (allByIssueUrl.length === 0) {
      // 没有 需要调用api

      const comments = await this.getCommentsByApi(commentsUrl);
      // eslint-disable-next-line no-undef
      const commentsWithStrCol = StringUtil.deepCopy(comments);
      commentsWithStrCol.forEach(o => {
        o.user = JSON.stringify(o.user);
        o.reactions = JSON.stringify(o.reactions);
        // o.reactions = JSON.stringify(o.reactions);
        o.created_at = new Date(o.created_at);
        o.updated_at = new Date(o.updated_at);
        // this.commentObjToMyO(o)
        // 这个函数好像不行
      });
      const res = await app.mysql.insert('comment', commentsWithStrCol);
      // 但是有些字段是 str
      console.log('res');
      console.log(res);

      ctx.body = {
        code: common.code.codeSuccess,
        data: comments,
        msg: '',

      };
      return;
    }

    for (const o of allByIssueUrl) {
      // let toMysql=
      // js 复制对象
      // o.user = JSON.stringify(o.user);
      // o.reactions = JSON.stringify(o.reactions);
      const toMysql = JSON.parse(JSON.stringify(o));


      if (toMysql.user.userName) {
        toMysql.user.user_name = toMysql.user.userName;
      }
      if (toMysql.user.userUrl) {
        toMysql.user.user_url = toMysql.user.userUrl;
      }
      if (toMysql.user.userAvatar) {
        toMysql.user.user_avatar = toMysql.user.userAvatar;
      }
      // toMysql.user.user_url = toMysql.user.userUrl;
      // toMysql.user.user_avatar = toMysql.user.userAvatar;
      // Value assigned to primitive will be lost
      // toMysql.user = JSON.stringify(toMysql.user);
      // toMysql.reactions = JSON.stringify(toMysql.reactions);
      toMysql.created_at = new Date(toMysql.created_at);
      toMysql.updated_at = new Date(toMysql.updated_at);

      // console.log('toMysql.updated_at');
      // console.log(toMysql.updated_at);
      const comment = await app.mysql.get('comment', {
        id: toMysql.id,
      });

      if (comment === null) {
        await app.mysql.insert('comment', toMysql);
      } else {
        await app.mysql.update('comment', toMysql);
      }

      // if (comment === null) {
      //   await app.mysql.insert('comment', o);
      // }else{
      //   await app.mysql.update('comment', o);
      // }
    }

    // allByIssueUrl=JSON.parse(  allByIssueUrl)

    allByIssueUrl.forEach(toMysql => {
      // toMysql.user =    toMysql.user.toJSON()
      toMysql.user = JSON.parse(toMysql.user);
      try {
        toMysql.user = JSON.parse(toMysql.user);
      } catch (e) {

      }

      // 需要parse两次就离谱
      const typeUser = typeof toMysql.user;
      // console.log('typeUser');
      // console.log(typeUser);
      // toMysql.user = StringUtil.deepCopy(toMysql.user)
      // console.log(' toMysql.user ');
      // console.log(toMysql.user);
      toMysql.reactions = JSON.parse(toMysql.reactions);
      try {
        toMysql.reactions = JSON.parse(toMysql.reactions);
      } catch (e) {

      }

    });

    // js map  收集
    // 对原来的数组做了操作
    // allByIssueUrl.map(toMysql=>{
    //   toMysql.user = JSON.parse(toMysql.user);
    //   toMysql.reactions = JSON.parse(toMysql.reactions);
    //   return toMysql
    // }).col
    // egg mysql update
    // const options = {
    //   method: 'GET',
    //   uri: url,
    //   headers: {
    //     'User-Agent': 'github Cache',
    //   },
    //
    // };
    // const issueDto = await rp(options);
    // console.log("allByIssueUrl");
    // console.log(allByIssueUrl);
    ctx.body = {
      code: common.code.codeSuccess,
      data: allByIssueUrl,
      msg: '',

    };

  }


  async issues() {
    // rp
    const { ctx, app } = this;
    // ctx.body = 'hello, egg';
    // 从服务中获取数据
    // const url = ctx.body.url;
    const url = ctx.request.body.url;
    // const issues = await rp(url);
    const options = {
      method: 'GET',
      uri: url,
      headers: {
        'User-Agent': 'github Cache',
      },

    };
    // const issueDto = await  rp(options);
    const issues = await rp(options);
    // console.log('issues');
    // console.log(issues);
    // 返回的是是str
    // const firstByUrl = await app.mysql.select('issue', {
    //   url: ctx.body.url,
    // });
    // // const data = await ctx.service.test.index();
    // // ctx.body = data;
    //
    // if (firstByUrl === null) {
    //   const issueDto = this.getIssueByApi(ctx.body.url);
    //   // return  getIssueByApi(url);
    //   ctx.body = {
    //     data: issueDto,
    //
    //   };
    // }
    // firstByUrl.to
    // IssueDto issueDto = new IssueDto(issue);
    // IssueDto issueDto = new IssueDto(firstByUrl);
    // log.info("issueDto {} ",issueDto);
    // return ReturnT.success(issueDto);
    const json = JSON.parse(issues);
    // const firstByUrl = await app.mysql.insert('issue', {
    //   url: ctx.body.url,
    // });
    ctx.body = {
      code: common.code.codeSuccess,
      // data: issues,
      data: json,
      msg: '',

    };

  }

  // async CreateIssueComment(){
  //   // octokit
  //   const { ctx, app } = this;
  //   await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
  //     owner: 'octocat',
  //     repo: 'hello-world',
  //     issue_number: 42,
  //     body: 'body'
  //   })
  // }


  
  async CreateIssueComment(){
    // octokit

    const { ctx, app } = this;
   let  body=  ctx.request.body
    await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
      // owner: 'octocat',
      // repo: 'hello-world',
      // issue_number: 42,
      // body: 'body'

      owner: 'starplatinum3',
      repo: 'starplatinum',
      issue_number: body.issue_number,
      body: body.body
    })

    ctx.body = {
      code: common.code.codeSuccess,
      data: issueDto,
      msg: '',
    };

  }


  // 这个貌似没用的
  async getIssue() {
    const { ctx, app } = this;
    // ctx.body = 'hello, egg';
    // 从服务中获取数据
    // const firstByUrl = await app.mysql.select('issue', {
    const firstByUrl = await app.mysql.get('issue', {
      url: ctx.request.body.url,
    });
    // const data = await ctx.service.test.index();
    // ctx.body = data;

    if (firstByUrl === null) {
      console.log('getIssueByApi');
      // const issueDto = this.getIssueByApi(ctx.body.url);
      const issueDto = this.getIssueByApi(ctx.request.body.url);
      // return  getIssueByApi(url);

      let issueToM=StringUtil.deepCopy(issueDto)
      issueToM.user = JSON.stringify(issueToM.user);
      issueToM.labels = JSON.stringify(issueToM.labels);
      issueToM.reactions = JSON.stringify(issueToM.reactions);
      const tableName = 'issue';
      // const firstByUrl = await app.mysql.save('issue', issueDto);
      // MysqlUtil
      const firstById = await app.mysql.get(tableName, {
        id: issueDto.id,
      });
      if (firstById === null) {
        await app.mysql.insert(tableName, issueDto);
      } else {
        await app.mysql.update(tableName, issueDto);
      }

      // const json = JSON.parse(issueDto);
      //
      // json.user = JSON.parse(json.user);
      // json.labels = JSON.parse(json.labels);
      // json.reactions = JSON.parse(json.reactions);


      // json.forEach(o => {
      //   // firstByUrl.user = JSON.parse(firstByUrl.user);
      //   // firstByUrl.labels = JSON.parse(firstByUrl.labels);
      //   // firstByUrl.reactions = JSON.parse(firstByUrl.reactions);
      //
      //   // js 判断是不是 json字符串
      //   // StringUtil.isJsonString(o.user)
      //
      //   // let parsedUser= JSON.parse(o.user);
      //   // if (typeof  parsedUser=== 'object'){
      //   //   // 是json对象
      //   // }
      //   o.user = JSON.parse(o.user);
      //   o.labels = JSON.parse(o.labels);
      //   o.reactions = JSON.parse(o.reactions);
      // });

      ctx.body = {
        code: common.code.codeSuccess,
        // data: issues,
        data: json,
        msg: '',
        // data: issueDto,
        // data: json,

      };
    }
    // firstByUrl.to
    // IssueDto issueDto = new IssueDto(issue);
    // IssueDto issueDto = new IssueDto(firstByUrl);
    // log.info("issueDto {} ",issueDto);
    // return ReturnT.success(issueDto);
    // console.log('firstByUrl');
    // console.log(firstByUrl);

    firstByUrl.user = JSON.parse(firstByUrl.user);
    firstByUrl.labels = JSON.parse(firstByUrl.labels);
    firstByUrl.reactions = JSON.parse(firstByUrl.reactions);


    // firstByUrl.forEach(o => {
    //   // firstByUrl.user = JSON.parse(firstByUrl.user);
    //   // firstByUrl.labels = JSON.parse(firstByUrl.labels);
    //   // firstByUrl.reactions = JSON.parse(firstByUrl.reactions);
    //
    //   // console.log("o.user");
    //   // console.log(o.user);
    //   // js 判断是不是 json字符串
    //   // StringUtil.isJsonString(o.user)
    //
    //  // let parsedUser= JSON.parse(o.user);
    //   // if (typeof  parsedUser=== 'object'){
    //   //   // 是json对象
    //   // }
    //   o.user = JSON.parse(o.user);
    //   o.labels = JSON.parse(o.labels);
    //   o.reactions = JSON.parse(o.reactions);
    // });

    ctx.body = {
      data: firstByUrl,
      code: common.code.codeSuccess,
      // data: issues,
      // data: json,
      msg: '',
    };

  }


}

module.exports = IssueController;
