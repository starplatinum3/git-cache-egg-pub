'use strict';

// import * as common from '../util/common';
// import {common} from '../util/common';
// import * as StringUtil from '../util/StringUtil';

const common = require('../util/common');
const Controller = require('egg').Controller;

// const octokit = require('octokit');
const GetBaiduUtil = require('../util/GetBaiduUtil');
const GitPageUtil = require('../util/GitPageUtil');
const HttpUtil = require('../util/HttpUtil');
const WhileReqThread = require('../util/WhileReqThread');
const rp = require('request-promise');
// request-promise user agent
const TimeUtil = require('../util/TimeUtil');
const MySqlUtil = require('../util/MySqlUtil');
const StringUtil = require('../util/StringUtil');
const { Octokit, App } = require("octokit");

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
  async getIssueByApi(url) {
    const { ctx, app } = this;
    //   rp(url,{
    //     "User-Agent": "github Cache"
    // })

    const options = {
      method: 'GET',
      uri: url,
      headers: {
        'User-Agent': 'github Cache',
      },

    };
    let issueDto = await rp(options);


    issueDto = JSON.parse(issueDto);
    console.log('issueDto');
    console.log(issueDto);

    // issueDto.user=JSON.stringify(issueDto.user)
    // issueDto.reactions=JSON.stringify(issueDto.reactions)
    // const issueDto = await rp(url, {
    //   'User-Agent': 'github Cache',
    // });
    // rp
    // issueForm.
    // String s = OkHttpUtil.get(url, null);
    // const issueDto = await rp(url);
    // log.info("s {}", s);
    // List<Issue> issues = JSONObject.parseArray(s, Issue.class);
    // List<IssueDto> issueDtos = JSONObject.parseArray(s, IssueDto.class);
    //   const issueDto = JSONObject.parseObject(s, IssueDto.class);
    // new Issue()
    // log.info("issueDto {}", issueDto);
    // Issue issue = issueDto.toEntity();
    // log.info("issue {}", issue);
    //   egg save
    //   https://blog.csdn.net/yzwdzkn/article/details/99622238


    // const tableName = 'issue';
    // // const firstByUrl = await app.mysql.save('issue', issueDto);
    // const firstById = await app.mysql.get(tableName, {
    //   id: issueDto.id,
    // });
    // if (firstById === null) {
    //   await app.mysql.insert(tableName, issueDto);
    // } else {
    //   await app.mysql.update(tableName, issueDto);
    // }


    // Issue save = issueRepository.save(issue);
    // log.info("save {} ",save);
    // IssueDto issueDto1 = new IssueDto(save);
    // return ReturnT.success(issue);
    // return ReturnT.success(issueDto);

    return issueDto;
    // ctx.body = {
    //   data:issueDto
    //
    // };

  }

  async  CreateIssue(){
    const { ctx, app } = this;
    const body = ctx.request.body
    // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: body.auth });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);


    // await octokit.request('POST /repos/{owner}/{repo}/issues', {
    //   owner:body.owner,
    //   repo: body.repo,
    //   title: body.title
    // })

    let send=false
    console.log("CreateIssue");
    console.log("body");
    console.log(body);
    if(send){
      let res=await octokit.request('POST /repos/{owner}/{repo}/issues',body)
    }else{
      let res=""
    }
    
    ctx.body = {
      code: common.code.codeSuccess,
      data: res,
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
      const issueDto = await this.getIssueByApi(ctx.request.body.url);
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
      return;
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
