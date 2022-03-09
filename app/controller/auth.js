'use strict';

// import * as common from '../util/common';
// import {common} from '../util/common';
// import * as StringUtil from '../util/StringUtil';

const common = require('../util/common');
const Controller = require('egg').Controller;

const octokit = require('octokit')
const GetBaiduUtil = require('../util/GetBaiduUtil');
const GitPageUtil = require('../util/GitPageUtil');
const HttpUtil = require('../util/HttpUtil');
const WhileReqThread = require('../util/WhileReqThread');
const rp = require('request-promise');
// request-promise user agent
const TimeUtil = require('../util/TimeUtil');
const MySqlUtil = require('../util/MySqlUtil');
const StringUtil = require('../util/StringUtil');

class IssueController extends Controller {
  async login() {
    const { ctx } = this;


    ctx.body = {
      code: common.code.codeSuccess,
      // data: issues,
      data: "ok",
      msg: '',

    };

  }



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
      const issueDto =  await  this.getIssueByApi(ctx.request.body.url);
      // return  getIssueByApi(url);


      // const issueDto = this.getIssueByApi(ctx.request.body.url);
      // return  getIssueByApi(url);

      const issueToM = StringUtil.deepCopy(issueDto);
      issueToM.user = JSON.stringify(issueToM.user);
      issueToM.labels = JSON.stringify(issueToM.labels);
      issueToM.reactions = JSON.stringify(issueToM.reactions);


      const tableName = 'issue';
      MySqlUtil.save(app.mysql, tableName, issueToM);
      // const firstByUrl = await app.mysql.save('issue', issueDto);
      // MysqlUtil
      // const firstById = await app.mysql.get(tableName, {
      //   id: issueDto.id,
      // });
      // if (firstById === null) {
      //   await app.mysql.insert(tableName, issueDto);
      // } else {
      //   await app.mysql.update(tableName, issueDto);
      // }

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
        // data: json,
        data: issueDto,
        msg: '',
        // data: issueDto,
        // data: json,

      };
      return
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
