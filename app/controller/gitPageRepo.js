'use strict';

const Controller = require('egg').Controller;
const GetBaiduUtil = require('../util/GetBaiduUtil');
const GitPageUtil = require('../util/GitPageUtil');
const HttpUtil = require('../util/HttpUtil');
const WhileReqThread = require('../util/WhileReqThread');
const rp = require('request-promise');
const common = require('../util/common');
const TimeUtil = require('../util/TimeUtil');
// 这是大写的是不是不行啊
// const TimeOutUtil = require('../util/TimeOutUtil');
const TimeOutUtil = require('../util/timeOutUtil');

// request-promise 安装
const co = require('co');
// got
// const got = require('got');

class HomeController extends Controller {
  async getAll() {
    const { ctx } = this;
    // ctx.body = 'hello, egg';
    // 从服务中获取数据
    // const data = await ctx.service.test.index();
    const data = await ctx.service.gitPageRepo.getAll();
    ctx.body = {
      data,
    };
    // ctx.service.gitPageRepo.
    // 还是 vscode 代码补全好啊
    // ctx.service.gitPageRepo.getAll()
    // ctx.body = data;

    // 渲染模板（服务端渲染）
    // await ctx.render('index.test.html', {
    //   // 渲染数据
    //   data,
    //   res: data,
    //   // 渲染列表
    //   list: [ 'a', 'b', 'c' ],
    //
    // });
  }
  async getGithubPageRepos() {
    const { ctx } = this;
    GitPageUtil.getGithubPageRepos('java', 1);
    ctx.body = {
      data: 'ok',
    };
  }

  async getBaiduBing() {
    const { ctx } = this;
    GetBaiduUtil.getBaidu('java', 1);
    ctx.body = {
      data: 'ok',
    };
  }
  async getBaidu() {
    const { ctx } = this;
    // GetBaiduUtil.getBaidu
    GetBaiduUtil.getBaiduNews();
    // await GetBaiduUtil.getBaiduNews()
    //  GitPageUtil.getGithubPageRepos()
    ctx.body = {
      data: 'ok',
    };
  }

  async getHttpTest() {
    const { ctx } = this;
    // GetBaiduUtil.getBaidu
    // GetBaiduUtil.getBaiduNews()
    // await GetBaiduUtil.getBaiduNews()
    //  GitPageUtil.getGithubPageRepos()


    // sendHttpRequest

    // 请求例子

    // co nodejs

    const res = co(function* () {
      // HttpUtil
      const req_res = yield HttpUtil.sendHttpRequest('www.video.com', 80, '/mobile/Test/phpinfo');
      // let req_res = yield sendHttpRequest('www.video.com', 80, '/mobile/Test/phpinfo');
      console.log('req_res');
      console.log(req_res);
      // ctx.body = {
      //   data: res
      // };
      ctx.body = {
        data: req_res,
      };
    });
    const data = await res;
    console.log('data');
    console.log(data);
    ctx.body = {
      data,
    };
    ctx.body = {
      data: 1,
    };


    // res.then(data=>{
    //   console.log("data");
    // console.log(data);
    //   ctx.body = {
    //     data: data
    //   };
    // })

    console.log('res');
    console.log(res);
  }

  req(url) {
    rp(url)
      .then(function(htmlString) {
        // Process html...
        //  log.info('htmlString:'+htmlString);
        console.log('htmlString:' + htmlString);

        ctx.body = {
          data: htmlString + '',
        };
      }).catch(function(err) {
        // Crawling failed...
        // log.info('err:'+err.stack);
        console.log('err:' + err.stack);

        this.req(url);
      });
  }
  async getHttpTestRp() {
    const url = 'https://www.baidu.com/?tn=92564395_hao_pg';
    // let url= 'www.video.com'
    const { ctx } = this;

    const res = await rp(url);
    // res.sendHttpRequest
    console.log('res');
    console.log(res);

    rp(url)
      .then(function(htmlString) {
        // Process html...
        //  log.info('htmlString:'+htmlString);
        console.log('htmlString:' + htmlString);

        ctx.body = {
          data: htmlString + '',
        };
      }).catch(function(err) {
        // Crawling failed...
        // log.info('err:'+err.stack);
        console.log('err:' + err.stack);
        // ctx.body = {
        //   data: err+""
        // };
        rp(url)
          .then(function(htmlString) {
            // Process html...
            //  log.info('htmlString:'+htmlString);
            console.log('htmlString:' + htmlString);

            ctx.body = {
              data: htmlString + '',
            };
          }).catch(function(err) {
            // Crawling failed...
            // log.info('err:'+err.stack);
            console.log('err:' + err.stack);
            // ctx.body = {
            //   data: err+""
            // };

          });
      });


    ctx.body = {
      data: res,
    };


  }

  async appBusTest() {
    const { app } = this;
    // https://www.npmjs.com/package/egg-bus
    const data = { name: 'abel' };
    // app.bus.dispatch('gitGetJob', data);
    app.bus.emit('gitGetJob', data);
    // app.bus.emit
    // app.bus.dispatch()
  }

  async whileReqThread() {
    const { ctx, app } = this;
    // console.log(ctx.params);
    // ctx.body = {
    //   url: ctx.params.url,
    // };
    // let reqUrl=ctx.params.url|| "https://github.com/starplatinum3"
    const reqUrl = 'https://github.com/starplatinum3313';
    console.log('reqUrl');
    console.log(reqUrl);
    const whileReqThread = new WhileReqThread(5, reqUrl, app);
    whileReqThread.start();
    // url: ctx.params.url,
    ctx.body = {
      data: 'start',

    };

  }


  async saveGitRepos() {
    const { ctx, app } = this;
    // console.log(ctx.params);
    // ctx.body = {
    //   url: ctx.params.url,
    // };
    // let reqUrl=ctx.params.url|| "https://github.com/starplatinum3"
    const reqUrl = 'https://github.com/starplatinum3313';
    console.log('reqUrl');
    console.log(reqUrl);
    const body = ctx.request.body;
    const whileReqThread = new WhileReqThread(5, reqUrl, app);
    // whileReqThread.start()
    whileReqThread.getGithubPageRepos(body.query, body.page);
    // url: ctx.params.url,
    ctx.body = {
      data: 'start',

    };

  }

  async crawlerRepos(ctx, getUrlMarked, body, app) {
    // const getUrlMarked = `${Protocol}://github.com/search?p=` + body.page + '&q=' + body.query + '&type=Repositories';
    try {
      console.log('getUrlMarked');
      console.log(getUrlMarked);
      const timeOutMsg = 'htmlRepoTimeOut';
      let timeOutMs=5000
      const htmlRepo = await TimeOutUtil.waitWithTimeout(rp(getUrlMarked), timeOutMs, timeOutMsg);
      // const htmlRepo = await rp(getUrlMarked);
      if (timeOutMsg === htmlRepo) {
        ctx.body = {
          code: common.code.codeError,
          data: timeOutMsg,
          msg: timeOutMsg,
        };
        return;
      }
      // return await Promise.reject(new Error());
      console.log('htmlRepo');
      console.log(htmlRepo);
      console.log('body.queryWord');
      console.log(body.queryWord);
      // const repos = GitPageUtil.parseRepoHtml(htmlRepo, body.query, body.page);
      const repos = GitPageUtil.parseRepoHtml(htmlRepo, body.queryWord, body.page);
      // app.mysql.insert()
      const res = await app.mysql.insert(common.tableNames.git_page_repo, repos);
      console.log('res');
      console.log(res);
      ctx.body = {
        code: common.code.codeSuccess,
        data: repos,
        msg: '',


      };
    } catch (e) {
      // const whileReqThread = new WhileReqThread(5, 'reqUrl', app);
      // reqUrl 参数没有用处
      const whileReqThread = new WhileReqThread(5, 'reqUrl', app);
      // whileReqThread.start()
      // whileReqThread.getGithubPageRepos(body.query, body.page);
      whileReqThread.getGithubPageRepos(body.queryWord, body.page);
      console.log('e');
      console.log(e);
      // return 'Saved!';
      ctx.body = {
        data: '开始线程查询',
        code: common.code.codeError,

        msg: '开始线程查询',
      };
    }
  }

  /**
   *
   * @return {Promise<void>}
   */
  async getGitRepos() {
    const { ctx, app } = this;
    // console.log(ctx.params);
    // ctx.body = {
    //   url: ctx.params.url,
    // };
    // let reqUrl=ctx.params.url|| "https://github.com/starplatinum3"
    const reqUrl = 'https://github.com/starplatinum3313';
    // console.log('reqUrl');
    // console.log(reqUrl);
    const body = ctx.request.body;

    const Protocol = 'https';

    // const allReady = await app.mysql.select(common.tableNames.git_page_repo, {
    //   page: body.page,
    //   query: body.query,
    // });

    // console.log("body.query");
    // console.log(body.query);
    const queryWord = body.queryWord;
    console.log('queryWord');
    console.log(queryWord);

    const allReady = await app.mysql.select(common.tableNames.git_page_repo,
      {
        where: {
          page: body.page,
          // query_word: body.query,
          query_word: queryWord,
        },
      }
    );
    // const getUrlMarked = `${Protocol}://github.com/search?p=` + body.page + '&q=' + body.query + '&type=Repositories';
    const getUrlMarked = `${Protocol}://github.com/search?p=` + body.page + '&q=' + queryWord + '&type=Repositories';
    if (allReady.length === 0) {
      // 没有 需要 用爬虫
      // parseRepoHtml

      console.log('没有 需要 用爬虫');
      await this.crawlerRepos(ctx, getUrlMarked, body, app);
      return;
    }

    const allReady0 = allReady[0];

    if (TimeUtil.daysDistance(allReady0.create_time, new Date()) >= 1) {
      // 过期了 再次查询
      ctx.body = {
        code: common.code.codeSuccess,
        data: allReady,
        msg: '',
      };
      console.log('过期了 爬虫');
      await this.crawlerRepos(ctx, getUrlMarked, body, app);
    }

    ctx.body = {
      code: common.code.codeSuccess,
      data: allReady,
      msg: '',

    };

    // try {
    //   const htmlRepo = await rp(getUrlMarked);
    //   // return await Promise.reject(new Error());
    //   console.log('htmlRepo');
    //   console.log(htmlRepo);
    //   const repos = GitPageUtil.parseRepoHtml(htmlRepo, body.query, body.page);
    //   // app.mysql.insert()
    //   const res = await app.mysql.insert(common.tableNames.git_page_repo, repos);
    //   console.log('res');
    //   console.log(res);
    //   ctx.body = {
    //     data: repos,
    //
    //   };
    // } catch (e) {
    //   const whileReqThread = new WhileReqThread(5, reqUrl, app);
    //   // whileReqThread.start()
    //   whileReqThread.getGithubPageRepos(body.query, body.page);
    //   console.log('e');
    //   console.log(e);
    //   // return 'Saved!';
    //   ctx.body = {
    //     data: '开始线程查询',
    //
    //   };
    // }


    // await app.mysql.insert(common.tableNames.git_page_repo, repos).then(value => {
    //   // "git"
    //
    //   console.log('ful filled');
    //   console.log('value');
    //   console.log(value);
    // });
    // GitPageUtil.getGithubPageRepos();
    // const whileReqThread = new WhileReqThread(5, reqUrl, app);
    // // whileReqThread.start()
    // whileReqThread.getGithubPageRepos(body.query, body.page);
    // url: ctx.params.url,


  }

  // https://github.com/ali-sdk/ali-rds#insert
  async getBatch() {
    // let rows = [
    //   {
    //     name: 'fengmk1',
    //     otherField: 'other field value',
    //     createdAt: db.literals.now, // `now()` on db server
    //     // ...
    //   },
    //   {
    //     name: 'fengmk2',
    //     otherField: 'other field value',
    //     createdAt: db.literals.now, // `now()` on db server
    //     // ...
    //   },
    //   // ...
    // ];
    const { ctx, app } = this;
    // common.tableNames.git_page_repo
    const data = await app.mysql.select(common.tableNames.git_page_repo);
    ctx.body = {
      data,

    };

  }

  TimeUtil() {
    // TimeUtil
    // const res = TimeUtil.daysDistance('2021-1-1', '2021-1-2');
    const res = TimeUtil.daysDistance('2021-1-1', '2021-1-30');
    console.log('res');
    console.log(res);
    const { ctx, app } = this;
    // common.tableNames.git_page_repo
    ctx.body = {
      data: res,

    };

  }
  // async gotTest() {

  //   (async () => {
  //     try {
  //       // const response = await got('https://google.com');
  //       const response = await got('https://www.baidu.com/?tn=92564395_hao_pg');
  //       console.log('statusCode:', response.statusCode);
  //       console.log('body:', response.body);
  //       // ctx.body = {
  //       //   data: response.body
  //       // };
  //     } catch (error) {
  //       console.log('error:', error);
  //       // ctx.body = {
  //       //   data: error
  //       // };
  //     }
  //   })();
  // }


}

module.exports = HomeController;
