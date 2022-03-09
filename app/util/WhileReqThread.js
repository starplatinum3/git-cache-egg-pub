

// const WhileReqThread = {

//     req: function (url) {
//         rp(url)
//             .then(function (htmlString) {
//                 // Process html...
//                 //  log.info('htmlString:'+htmlString);
//                 console.log('htmlString:' + htmlString);

//                 ctx.body = {
//                     data: htmlString + ""
//                 };
//             }).catch(function (err) {
//                 // Crawling failed...
//                 // log.info('err:'+err.stack);
//                 console.log('err:' + err.stack);

//                 req(url)
//                 //   this.req(url)
//             });
//     }

// }
const https = require('https');
const cheerio = require('cheerio');
const http = require('http');
const rp = require('request-promise');
const common = require('./common');
class WhileReqThread {
  constructor(times, urlStr, app) {
    this.times = times;
    this.urlStr = urlStr;
    this.tryTimes = 0;
    this.app = app;
    this.list = [];
    this.query = null;
    this.page = null;

  }
  start() {
    // const timeoutPromise = new Promise((resolve, reject) => {
    //     timer = setTimeout(() => reject(timeoutMessage), timeout);
    // });

    this.req(this.urlStr);
    // this.getGithubPageRepos(this.urlStr)
  }

  getGithubPageRepos(query, page) {
    this.query = query;
    this.page = page;
    console.log('getGithubPageRepos');
    // const Protocol="http"
    const Protocol = 'https';
    const getUrlMarked = `${Protocol}://github.com/search?p=` + page + '&q=' + query + '&type=Repositories';
    // Protocol "https:" not supported. Expected "http:" (code: ERR_INVALID_PROTOCOL)

    const options = {
      hostname: 'github.com',
      port: 443,
      path: '/',
      method: 'GET',
    };
    // https request  options

    // node js 不能https
    console.log('getUrlMarked');
    console.log(getUrlMarked);


    const wz = 'http://news.baidu.com/'; // 网址

    const strHtml = '';
    const results = [];

    const list = [];

    this.tryTimes = 0;
    // TimeOutUtil.waitWithTimeout()
    this.reqTry(getUrlMarked);
    // https.get await

    // async function get_page() {
    //     const url = 'https://example.com'
    //     const data = await requestPromise({url, method:'GET'})
    //     do_awesome_things_with_data(data)
    // }

    // HttpUtil.requestPromise()

    // https.get(getUrlMarked, function (res) {
    //     // https://www.jianshu.com/p/995a3000f7d6?isappinstalled=0
    //     // https://blog.csdn.net/qq_26239917/article/details/90214885
    //     console.log(`状态码:${res.statusCode}`);
    //     // console.log(`状态码文字描述:${https.STATUS_CODES[res.statusCode]}`);
    //     // 没有吗
    //     // http.STATUS_CODES
    //     console.log(`状态码文字描述:${http.STATUS_CODES[res.statusCode]}`);
    //     console.log(`响应头:${JSON.stringify(res.headers)}`);
    //     // https.STATUS_CODES

    //     res.on("data", function (chunk) {
    //         // console.log("chunk");
    //         // console.log(chunk);
    //         strHtml += chunk;
    //     })
    //     // js http on("end" 没有读到
    //     res.on("end", function () {

    //         // console.log("strHtml");
    //         // console.log(strHtml);


    //         //console.log(strHtml);

    //         var $ = cheerio.load(strHtml);
    //         // cheerio 获取一个 元素之后 找他的 儿子
    //         // cheerio 从这个元素 再select
    //         // cheerio 根据querySelector
    //         let repoLis = $("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li");
    //         // https://gitee.com/mirrors_cheeriojs/cheerio/wikis/Chinese-README
    //         repoLis.each((idx, item) => {
    //             // 可以获取一个元素之后再获取
    //             // let repo1Dom = $(item);
    //             // item.selec
    //             // cheerio 元素的子查询
    //             //    let html= item.html()
    //             //    console.log("html");
    //             //    console.log(html);
    //             // let repo1Dom = $(item).$("div.mt-n1.flex-auto")
    //             let repo1Dom = $("div.mt-n1.flex-auto", item)
    //             // 每一个元素
    //             console.log("repo1Dom.text()");
    //             console.log(repo1Dom.text());
    //             // Elements sketch = repo1Dom.select(" p");
    //             let sketch = $(" p", repo1Dom)
    //             let repoName = $("div.d-flex > div.f4.text-normal > a", repo1Dom)[0].text()
    //             console.log("repoName");
    //             console.log(repoName);
    //             // egg 消息队列
    //             // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();
    //             sketchText = sketch.text();
    //             console.log("sketchText");
    //             console.log(sketchText);
    //             // String sketchText = sketch.text();
    //             // System.out.println("sketchText");
    //             // System.out.println(sketchText);
    //             // Elements topics = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a");

    //             let topics = $("  div:nth-child(3) > div:nth-child(1) > a", repo1Dom)
    //             let topicTexts = []
    //             topics.each((idx, item) => {
    //                 let topicText = $(item).text()
    //                 // item.
    //                 topicTexts.push(topicText)
    //             })

    //             let star = $("  div:nth-child(3) > div.d-flex.flex-wrap.text-small.color-fg-muted > div:nth-child(1) > a", repo1Dom)

    //             let textStar = star.text();

    //             let topicsStr = JSON.stringify(topicTexts)

    //             let GitPageRepo = {
    //                 "repoName": repoName,
    //                 "sketch": sketchText,
    //                 "star": textStar,
    //                 "topics": topicsStr,
    //                 "queryWord": query,
    //                 "page": page,
    //             }
    //             list.push(GitPageRepo);


    //         })


    //         //    for (const elementLi of repoLis) {
    //         //     // elementLi.
    //         //     let repo1Dom = $("div.mt-n1.flex-auto");
    //         //     console.log("repo1Dom.text()");
    //         //     console.log(repo1Dom.text());
    //         //     // Elements repo1Dom = elementLi.select("div.mt-n1.flex-auto");
    //         //     // Elements sketch = repo1Dom.select(" p");
    //         //     // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();

    //         //     // String sketchText = sketch.text();
    //         //    }


    //         //*[@id="js-pjax-container"]/div/div[3]/div/ul/li[1]/div[2]/div[1]/div/a
    //         // document.querySelector("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div.d-flex > div > a")
    //         // $("#channel-all li").each((iten,i)=>{
    //         //     console.log($(i).text());
    //         // })
    //         // https://segmentfault.com/a/1190000011564896
    //     });
    //     // res.on("error",(err)=>{
    //     //     console.log("err");
    //     //     console.log(err);
    //     // })
    // }).on('error', (e) => {
    //     console.log(`Got error: ${e.message}`);
    // });
  }

  parseRepoHtml(strHtml) {
    const $ = cheerio.load(strHtml);
    // cheerio 获取一个 元素之后 找他的 儿子
    // cheerio 从这个元素 再select
    // cheerio 根据querySelector
    const repoLis = $('#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li');
    // https://gitee.com/mirrors_cheeriojs/cheerio/wikis/Chinese-README
    repoLis.each((idx, item) => {
      // 可以获取一个元素之后再获取
      // let repo1Dom = $(item);
      // item.selec
      // cheerio 元素的子查询
      //    let html= item.html()
      //    console.log("html");
      //    console.log(html);
      // let repo1Dom = $(item).$("div.mt-n1.flex-auto")
      const repo1Dom = $('div.mt-n1.flex-auto', item);
      // 每一个元素
      // console.log("repo1Dom.text()");
      // console.log(repo1Dom.text());
      // Elements sketch = repo1Dom.select(" p");
      const sketch = $(' p', repo1Dom);
      const repoNameDom = $('div.d-flex > div.f4.text-normal > a', repo1Dom)[0];
      // console.log('repoNameDom');
      // console.log(repoNameDom);
      const repoName = $(repoNameDom).text().trim();
      // let repoName = $("div.d-flex > div.f4.text-normal > a", repo1Dom)[0].text()
      // let repoName = $("div.d-flex > div.f4.text-normal > a", repo1Dom)[0].text()
      // console.log('repoName');
      // console.log(repoName);
      // egg 消息队列
      // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();
      const sketchText = sketch.text().trim();
      // console.log('sketchText');
      // console.log(sketchText);
      // String sketchText = sketch.text();
      // System.out.println("sketchText");
      // System.out.println(sketchText);
      // Elements topics = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a");

      const topics = $('  div:nth-child(3) > div:nth-child(1) > a', repo1Dom);
      const topicTexts = [];
      topics.each((idx, item) => {
        const topicText = $(item).text().trim();
        // item.
        topicTexts.push(topicText);
      });

      const star = $('  div:nth-child(3) > div.d-flex.flex-wrap.text-small.color-fg-muted > div:nth-child(1) > a', repo1Dom);

      const textStar = star.text().trim();
      // console.log('textStar');
      // console.log(textStar);

      const topicsStr = JSON.stringify(topicTexts);

      const GitPageRepo = {
        // "repoName": repoName,
        repo_name: repoName,

        sketch: sketchText,
        star: textStar,
        topics: topicsStr,
        // "queryWord": query,
        query_word: this.query,

        page: this.page,
        create_time: new Date(),
      };
      // list.push(GitPageRepo);

      this.list.push(GitPageRepo);
    });
    return this.list;

    // let tableName="git_page_repo"
    // const data = await that.app.mysql.insert(tableName);
    // egg js insert  batch
    // const tableName = 'git_page_repo';
    // that.app.mysql.insert(tableName, that.list).then(value => {
    //
    //   console.log('value');
    //   console.log(value);
    // });
  }
  reqTry(urlStr) {
    // this.tryTimes = 0;
    const that = this;
    let strHtml = '';
    console.log('urlStr');
    console.log(urlStr);
    // 数据要传出去吗 没有就是 mysql 插入
    // https.get 超时设置

    const options = {
      hostname: 'github.com',
      port: 443,
      path: '/',
      method: 'GET',
    };

    https.get(urlStr, function(res) {
      // https://www.jianshu.com/p/995a3000f7d6?isappinstalled=0
      // https://blog.csdn.net/qq_26239917/article/details/90214885
      console.log(`状态码:${res.statusCode}`);
      // console.log(`状态码文字描述:${https.STATUS_CODES[res.statusCode]}`);
      // 没有吗
      // http.STATUS_CODES
      console.log(`状态码文字描述:${http.STATUS_CODES[res.statusCode]}`);
      console.log(`响应头:${JSON.stringify(res.headers)}`);
      // https.STATUS_CODES

      res.on('data', function(chunk) {
        // console.log("chunk");
        // console.log(chunk);
        strHtml += chunk;
      });
      // js http on("end" 没有读到
      res.on('end', function() {

        // console.log("strHtml");
        // console.log(strHtml);


        // console.log(strHtml);

        const $ = cheerio.load(strHtml);
        // cheerio 获取一个 元素之后 找他的 儿子
        // cheerio 从这个元素 再select
        // cheerio 根据querySelector
        const repoLis = $('#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li');
        // https://gitee.com/mirrors_cheeriojs/cheerio/wikis/Chinese-README
        repoLis.each((idx, item) => {
          // 可以获取一个元素之后再获取
          // let repo1Dom = $(item);
          // item.selec
          // cheerio 元素的子查询
          //    let html= item.html()
          //    console.log("html");
          //    console.log(html);
          // let repo1Dom = $(item).$("div.mt-n1.flex-auto")
          const repo1Dom = $('div.mt-n1.flex-auto', item);
          // 每一个元素
          // console.log("repo1Dom.text()");
          // console.log(repo1Dom.text());
          // Elements sketch = repo1Dom.select(" p");
          const sketch = $(' p', repo1Dom);
          const repoNameDom = $('div.d-flex > div.f4.text-normal > a', repo1Dom)[0];
          // console.log('repoNameDom');
          // console.log(repoNameDom);
          const repoName = $(repoNameDom).text().trim();
          // let repoName = $("div.d-flex > div.f4.text-normal > a", repo1Dom)[0].text()
          // let repoName = $("div.d-flex > div.f4.text-normal > a", repo1Dom)[0].text()
          // console.log('repoName');
          // console.log(repoName);
          // egg 消息队列
          // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();
          const sketchText = sketch.text().trim();
          // console.log('sketchText');
          // console.log(sketchText);
          // String sketchText = sketch.text();
          // System.out.println("sketchText");
          // System.out.println(sketchText);
          // Elements topics = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a");

          const topics = $('  div:nth-child(3) > div:nth-child(1) > a', repo1Dom);
          const topicTexts = [];
          topics.each((idx, item) => {
            const topicText = $(item).text().trim();
            // item.
            topicTexts.push(topicText);
          });

          const star = $('  div:nth-child(3) > div.d-flex.flex-wrap.text-small.color-fg-muted > div:nth-child(1) > a', repo1Dom);

          const textStar = star.text().trim();
          // console.log('textStar');
          // console.log(textStar);

          const topicsStr = JSON.stringify(topicTexts);

          const GitPageRepo = {
            // "repoName": repoName,
            repo_name: repoName,

            sketch: sketchText,
            star: textStar,
            topics: topicsStr,
            // "queryWord": query,
            query_word: that.query,

            page: that.page,
            create_time: new Date(),
          };
          // list.push(GitPageRepo);

          that.list.push(GitPageRepo);
        });

        // let tableName="git_page_repo"
        // const data = await that.app.mysql.insert(tableName);
        // egg js insert  batch
        const tableName = 'git_page_repo';
        that.app.mysql.insert(tableName, that.list).then(value => {

          console.log('value');
          console.log(value);
        });


        //    for (const elementLi of repoLis) {
        //     // elementLi.
        //     let repo1Dom = $("div.mt-n1.flex-auto");
        //     console.log("repo1Dom.text()");
        //     console.log(repo1Dom.text());
        //     // Elements repo1Dom = elementLi.select("div.mt-n1.flex-auto");
        //     // Elements sketch = repo1Dom.select(" p");
        //     // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();

        //     // String sketchText = sketch.text();
        //    }


        //* [@id="js-pjax-container"]/div/div[3]/div/ul/li[1]/div[2]/div[1]/div/a
        // document.querySelector("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div.d-flex > div > a")
        // $("#channel-all li").each((iten,i)=>{
        //     console.log($(i).text());
        // })
        // https://segmentfault.com/a/1190000011564896
      });
      // res.on("error",(err)=>{
      //     console.log("err");
      //     console.log(err);
      // })
    }).on('error', e => {

      console.log(`Got error: ${e.message}`);
      console.log('err:' + e.stack);
      console.log('this.tryTimes');
      console.log(that.tryTimes);
      if (that.times < that.tryTimes) {
        // reject("error times out")
        return;
      }
      setTimeout(() => {
        that.tryTimes++;
        that.reqTry(urlStr);
      }, 1000);


    });
  }

  reqTryWait(urlStr) {
    this.tryTimes = 0;
    const that = this;
    let strHtml = '';
    console.log('urlStr');
    console.log(urlStr);
    // 数据要传出去吗 没有就是 mysql 插入
    // https.get 超时设置

    const options = {
      hostname: 'github.com',
      port: 443,
      path: '/',
      method: 'GET',
    };

    https.get(urlStr, function(res) {
      // https://www.jianshu.com/p/995a3000f7d6?isappinstalled=0
      // https://blog.csdn.net/qq_26239917/article/details/90214885
      console.log(`状态码:${res.statusCode}`);
      // console.log(`状态码文字描述:${https.STATUS_CODES[res.statusCode]}`);
      // 没有吗
      // http.STATUS_CODES
      console.log(`状态码文字描述:${http.STATUS_CODES[res.statusCode]}`);
      console.log(`响应头:${JSON.stringify(res.headers)}`);
      // https.STATUS_CODES

      res.on('data', function(chunk) {
        // console.log("chunk");
        // console.log(chunk);
        strHtml += chunk;
      });
      // js http on("end" 没有读到
      res.on('end', function() {

        // console.log("strHtml");
        // console.log(strHtml);


        // console.log(strHtml);

        const $ = cheerio.load(strHtml);
        // cheerio 获取一个 元素之后 找他的 儿子
        // cheerio 从这个元素 再select
        // cheerio 根据querySelector
        const repoLis = $('#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li');
        // https://gitee.com/mirrors_cheeriojs/cheerio/wikis/Chinese-README
        repoLis.each((idx, item) => {
          // 可以获取一个元素之后再获取
          // let repo1Dom = $(item);
          // item.selec
          // cheerio 元素的子查询
          //    let html= item.html()
          //    console.log("html");
          //    console.log(html);
          // let repo1Dom = $(item).$("div.mt-n1.flex-auto")
          const repo1Dom = $('div.mt-n1.flex-auto', item);
          // 每一个元素
          // console.log("repo1Dom.text()");
          // console.log(repo1Dom.text());
          // Elements sketch = repo1Dom.select(" p");
          const sketch = $(' p', repo1Dom);
          const repoNameDom = $('div.d-flex > div.f4.text-normal > a', repo1Dom)[0];
          // console.log('repoNameDom');
          // console.log(repoNameDom);
          const repoName = $(repoNameDom).text().trim();
          // let repoName = $("div.d-flex > div.f4.text-normal > a", repo1Dom)[0].text()
          // let repoName = $("div.d-flex > div.f4.text-normal > a", repo1Dom)[0].text()
          // console.log('repoName');
          // console.log(repoName);
          // egg 消息队列
          // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();
          const sketchText = sketch.text().trim();
          // console.log('sketchText');
          // console.log(sketchText);
          // String sketchText = sketch.text();
          // System.out.println("sketchText");
          // System.out.println(sketchText);
          // Elements topics = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a");

          const topics = $('  div:nth-child(3) > div:nth-child(1) > a', repo1Dom);
          const topicTexts = [];
          topics.each((idx, item) => {
            const topicText = $(item).text().trim();
            // item.
            topicTexts.push(topicText);
          });

          const star = $('  div:nth-child(3) > div.d-flex.flex-wrap.text-small.color-fg-muted > div:nth-child(1) > a', repo1Dom);

          const textStar = star.text().trim();
          // console.log('textStar');
          // console.log(textStar);

          const topicsStr = JSON.stringify(topicTexts);

          const GitPageRepo = {
            // "repoName": repoName,
            repo_name: repoName,

            sketch: sketchText,
            star: textStar,
            topics: topicsStr,
            // "queryWord": query,
            query_word: that.query,

            page: that.page,
            create_time: new Date(),
          };
          // list.push(GitPageRepo);

          that.list.push(GitPageRepo);
        });

        // let tableName="git_page_repo"
        // const data = await that.app.mysql.insert(tableName);
        // egg js insert  batch
        const tableName = 'git_page_repo';
        that.app.mysql.insert(tableName, that.list).then(value => {

          console.log('value');
          console.log(value);
        });


        //    for (const elementLi of repoLis) {
        //     // elementLi.
        //     let repo1Dom = $("div.mt-n1.flex-auto");
        //     console.log("repo1Dom.text()");
        //     console.log(repo1Dom.text());
        //     // Elements repo1Dom = elementLi.select("div.mt-n1.flex-auto");
        //     // Elements sketch = repo1Dom.select(" p");
        //     // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();

        //     // String sketchText = sketch.text();
        //    }


        //* [@id="js-pjax-container"]/div/div[3]/div/ul/li[1]/div[2]/div[1]/div/a
        // document.querySelector("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div.d-flex > div > a")
        // $("#channel-all li").each((iten,i)=>{
        //     console.log($(i).text());
        // })
        // https://segmentfault.com/a/1190000011564896
      });
      // res.on("error",(err)=>{
      //     console.log("err");
      //     console.log(err);
      // })
    }).on('error', e => {

      console.log(`Got error: ${e.message}`);
      console.log('err:' + e.stack);
      console.log('this.tryTimes');
      console.log(that.tryTimes);
      if (that.times < that.tryTimes) {
        // reject("error times out")
        return;
      }
      setTimeout(() => {
        that.tryTimes++;
        that.reqTry(urlStr);
      }, 1000);


    });
  }

  req(urlStr) {
    // new Promise((resolve, reject) => {
    //     rp(urlStr)
    //     .then(function (htmlString) {
    //         // Process html...
    //         //  log.info('htmlString:'+htmlString);
    //         console.log('htmlString:' + htmlString);

    //         resolve(htmlString)
    //         // ctx.body = {
    //         //     data: htmlString + ""
    //         // };
    //     }).catch(function (err) {
    //         // Crawling failed...
    //         // log.info('err:'+err.stack);
    //         console.log('err:' + err.stack);

    //         if(this.times<this.tryTimes){
    //             reject("error times out")
    //         }
    //         this.req(urlStr)
    //         //   this.req(url)
    //     });
    //     // timer = setTimeout(() => reject(timeoutMessage), timeout);
    // });

    const that = this;
    // const { app } = this;
    rp(urlStr)
      .then(function(htmlString) {
        // Process html...
        //  log.info('htmlString:'+htmlString);
        // console.log('htmlString:' + htmlString);
        console.log('get it');
        console.log('this.tryTimes');
        console.log(that.tryTimes);
        const params = {

        };

        try {
          // 根据那些参数的字典
          //   const res = await that.app.mysql.insert('article', params);
          that.app.mysql.insert(common.tableNames.git_page_repo, params).then(value => {
            // "git"

            console.log('ful filled');
            console.log('value');
            console.log(value);
          });
          // console.log(res);
          //   return res;
        } catch (error) {
          console.log('error');
          console.log(error);
          //   return null;
        }


        return;

        // 存入数据库?
        // ctx.body = {
        //     data: htmlString + ""
        // };
      }).catch(function(err) {
        // Crawling failed...
        // log.info('err:'+err.stack);
        console.log('err:' + err.stack);
        console.log('this.tryTimes');
        console.log(that.tryTimes);
        if (that.times < that.tryTimes) {
          // reject("error times out")
          return;
        }
        that.tryTimes++;
        that.req(urlStr);
        //   this.req(url)
      });
  }
}

module.exports = WhileReqThread;
