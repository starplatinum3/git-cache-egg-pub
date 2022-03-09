// GitPageUtil
const http = require('http');
const https = require('https');
// const fs = require("fs");
const cheerio = require('cheerio');
const HttpUtil = require('./HttpUtil');
// const Controller = require('egg').Controller;
const GitPageUtil = {

  // https://www.itbaoku.cn/post/2124574/do
  getMyFile() {
    const https = require('https');

    return new Promise((resolve, reject) => {
      https.get('URL_I_am_targeting/file.json', res => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;

        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
        }

        if (error) {
          console.error(error.message);
          // consume response data to free up memory
          res.resume();
        }

        res.setEncoding('utf8');
        let rawData = '';

        res.on('data', chunk => {
          rawData += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(e.message);
          }
        });
      }).on('error', e => {
        reject(`Got error: ${e.message}`);
      });

    });
  },

  parseRepoHtml(strHtml, query, page) {
    const $ = cheerio.load(strHtml);
    // cheerio 获取一个 元素之后 找他的 儿子
    // cheerio 从这个元素 再select
    // cheerio 根据querySelector
    const list = [];
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
        query_word: query,
        // query_word: this.query,
        // query_word: this.query,

        page,
        // page: this.page,
        create_time: new Date(),
      };
      // list.push(GitPageRepo);

      // this.list.push(GitPageRepo);
      list.push(GitPageRepo);
    });
    return list;

    // let tableName="git_page_repo"
    // const data = await that.app.mysql.insert(tableName);
    // egg js insert  batch
    // const tableName = 'git_page_repo';
    // that.app.mysql.insert(tableName, that.list).then(value => {
    //
    //   console.log('value');
    //   console.log(value);
    // });
  },

  getGithubPageRepos(query, page) {
    console.log('getGithubPageRepos');
    // const Protocol="http"
    const Protocol = 'https';
    const getUrlMarked = `${Protocol}://github.com/search?p=` + page + '&q=' + query + '&type=Repositories';
    // Protocol "https:" not supported. Expected "http:" (code: ERR_INVALID_PROTOCOL)

    // node js 不能https
    console.log('getUrlMarked');
    console.log(getUrlMarked);


    const wz = 'http://news.baidu.com/'; // 网址

    let strHtml = '';
    const results = [];

    const list = [];
    // https.get await

    // async function get_page() {
    //   const url = 'https://example.com';
    //   const data = await requestPromise({ url, method: 'GET' });
    //   do_awesome_things_with_data(data);
    // }

    // HttpUtil.requestPromise();

    https.get(getUrlMarked, function(res) {
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
          console.log('repo1Dom.text()');
          console.log(repo1Dom.text());
          // Elements sketch = repo1Dom.select(" p");
          const sketch = $(' p', repo1Dom);
          const repoName = $('div.d-flex > div.f4.text-normal > a', repo1Dom)[0].text();
          console.log('repoName');
          console.log(repoName);
          // egg 消息队列
          // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();
          const sketchText = sketch.text();
          console.log('sketchText');
          console.log(sketchText);
          // String sketchText = sketch.text();
          // System.out.println("sketchText");
          // System.out.println(sketchText);
          // Elements topics = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a");

          const topics = $('  div:nth-child(3) > div:nth-child(1) > a', repo1Dom);
          const topicTexts = [];
          topics.each((idx, item) => {
            const topicText = $(item).text();
            // item.
            topicTexts.push(topicText);
          });

          const star = $('  div:nth-child(3) > div.d-flex.flex-wrap.text-small.color-fg-muted > div:nth-child(1) > a', repo1Dom);

          const textStar = star.text();

          const topicsStr = JSON.stringify(topicTexts);

          const GitPageRepo = {
            repoName,
            sketch: sketchText,
            star: textStar,
            topics: topicsStr,
            queryWord: query,
            page,
          };
          list.push(GitPageRepo);


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
    });
  },
};
// class GitPageUtil {
//     getGithubPageRepos(query, page) {
//         const getUrlMarked = "https://github.com/search?p=" + page + "&q=" + query + "&type=Repositories";


//         const wz = "http://news.baidu.com/"; //网址

//         var strHtml = "";
//         var results = [];
//         http.get(getUrlMarked, function (res) {
//             res.on("data", function (chunk) {
//                 strHtml += chunk;
//             })
//             res.on("end", function () {

//                 console.log(strHtml);

//                 //console.log(strHtml);

//                 var $ = cheerio.load(strHtml);
//                 // cheerio 获取一个 元素之后 找他的 儿子
//                 // cheerio 从这个元素 再select
//                 // cheerio 根据querySelector
//                 let repoLis = $("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li");

//                 repoLis.each((idx, item) => {
//                     // 可以获取一个元素之后再获取
//                     // let repo1Dom = $(item);
//                     let repo1Dom = $(item).$("div.mt-n1.flex-auto")
//                     // 每一个元素
//                     console.log(repo1Dom.text());
//                 })

//                 //    for (const elementLi of repoLis) {
//                 //     // elementLi.
//                 //     let repo1Dom = $("div.mt-n1.flex-auto");
//                 //     console.log("repo1Dom.text()");
//                 //     console.log(repo1Dom.text());
//                 //     // Elements repo1Dom = elementLi.select("div.mt-n1.flex-auto");
//                 //     // Elements sketch = repo1Dom.select(" p");
//                 //     // String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();

//                 //     // String sketchText = sketch.text();
//                 //    }


//                 //*[@id="js-pjax-container"]/div/div[3]/div/ul/li[1]/div[2]/div[1]/div/a
//                 // document.querySelector("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div.d-flex > div > a")
//                 // $("#channel-all li").each((iten,i)=>{
//                 //     console.log($(i).text());
//                 // })
//                 // https://segmentfault.com/a/1190000011564896
//             });
//         })

//     }
// }

// public class GitPageUtil {

//     public static void main(String[] args) throws IOException {
//     List < GitPageRepo > githubPageRepos = getGithubPageRepos("java", 2);
//     System.out.println("githubPageRepos");
//     System.out.println(githubPageRepos);
// }
// //    GitPageRepoRepository co
//    public  static List < GitPageRepo > getGithubPageRepos(String query, Integer page) throws IOException {
//     //        String queryMark="q";
//     //        String queryMark="#queryMark#";
//     //        String getUrl="https://github.com/search?q=java";
//     //        String getUrl="https://github.com/search?q=#queryMark#";
//     //        String getUrl="https://github.com/search?p=2&q="+query+"&type=Repositories";
//     //        String query="java";
//     String getUrlMarked = "https://github.com/search?p=" + page + "&q=" + query + "&type=Repositories";
//     //        String getUrlMarked = getUrl.replace(queryMark, query);
//     //       https://github.com/search?p=2&q=java&type=Repositories
//     Document newDoc = Jsoup.connect(getUrlMarked).get();
//     //       Jsoup.connect(Ur)
//     //       url query 拼接 java
//     //        Element element = newDoc.select("*[@id=\"js-pjax-container\"]/div/div[3]/div/ul/li[1]/div[2]/div[1]/div[1]/a").get(0);

//     //       https://acc15t4bm5.feishu.cn/docs/doccnKlHj7Nm4Ju9oD14nZ4F5Og
//     //       测试 数据
//     //        Element repoUl= newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul").get(0);
//     //        Elements repoLis= newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li ");
//     Elements repoLis = newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li");
//     //       Jsoup  ul 下面的所有
//     //       Elements ElementsUl = newDoc.getElementsByTag("ul");
//     List < GitPageRepo > list=new ArrayList <> ();
//     for (Element elementLi : repoLis) {
//         //           elementLi.select()
//         Elements repo1Dom = elementLi.select("div.mt-n1.flex-auto");
//         Elements sketch = repo1Dom.select(" p");
//         String repoName = repo1Dom.select("div.d-flex > div.f4.text-normal > a").get(0).text();

//         String sketchText = sketch.text();
//         System.out.println("sketchText");
//         System.out.println(sketchText);
//         Elements topics = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a");

//         //           Elements topics = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a");

//         //           for (Element topic : topics) {
//         //               String textTopic = topic.text();
//         //           }
//         List < String > topicTexts = topics.stream().map(o -> {
//             return o.text();
//         }).collect(Collectors.toList());
//         //           topicTexts.st

//         //           Elements topic = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a:nth-child(1)");
//         //           Elements topic2 = repo1Dom.select(" div:nth-child(3) > div:nth-child(1) > a:nth-child(2)");
//         Elements star = repo1Dom.select("  div:nth-child(3) > div.d-flex.flex-wrap.text-small.color-fg-muted > div:nth-child(1) > a");
//         String textStar = star.text();
//         //           int starInt = Integer.parseInt(textStar);
//         //           String s = topicTexts.toString();
//         //           https://www.cnblogs.com/yelanggu/p/13261828.html
//         //           JsonUtil.
//         //           JSONObject.
//         //           JSONObject list转化为 string
//         //实体类对象转换成String类型的JSON字符串
//         //           String s = JSONObject.toJSONString(topics);
//         String topicsStr = JsonUtil.objToStr(topicTexts);


//         GitPageRepo build = GitPageRepo.builder().repoName(repoName).
//             sketch(sketchText).star(textStar)
//             .topics(topicsStr).
//             queryWord(query).
//             page(page).build();
//         list.add(build);
//     }

//     return list;
//     //     仓库名字
//     //       Elements allElements = repoUl.getAllElements();
//     ////       allElements.
//     //       Element repoName = newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div.d-flex > div.f4.text-normal > a").get(0);
//     //        Element repo1 = repoUl.select("li:nth-child(1)").get(0);
//     //        Elements repo1Dom = repo1.select("div.mt-n1.flex-auto");
//     //        Elements sketch = repo1Dom.select(" p");
//     //        Elements topic = repo1Dom.select("  div:nth-child(3) > div:nth-child(1) > a:nth-child(1)");
//     //        Elements topic2 = repo1Dom.select(" div:nth-child(3) > div:nth-child(1) > a:nth-child(2)");
//     //        Elements star = repo1Dom.select("  div:nth-child(3) > div.d-flex.flex-wrap.text-small.color-fg-muted > div:nth-child(1) > a");
//     ////        System.out.println("sketch");
//     ////        System.out.println(sketch);
//     ////        System.out.println("topic");
//     ////        System.out.println(topic);
//     ////        System.out.println("topic2");
//     ////        System.out.println(topic2);
//     ////        System.out.println("star");
//     ////        System.out.println(star);
//     ////        System.out.println("repoName");
//     ////        System.out.println(repoName);
//     //       String sketchText = sketch.text();
//     //       String topicText = topic.text();
//     //       System.out.println("sketchText");
//     //       System.out.println(sketchText);
//     //       System.out.println("topicText");
//     //       System.out.println(topicText);

//     //       sketchText
//     //       All Algorithms implemented in Java
//     //               topicText
//     //       algorithms
//     //        repo1.select("div.mt-n1.flex-auto");
//     //        Element repoName = repoUl.select(" li:nth-child(1) > div.mt-n1.flex-auto > div.d-flex > div.f4.text-normal > a").get(0);

//     //        Element sketch = newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > p").get(0);
//     //        Element topic = newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div:nth-child(3) > div:nth-child(1) > a:nth-child(1)").get(0);
//     //        Element topic2 = newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div:nth-child(3) > div:nth-child(1) > a:nth-child(2)").get(0);
//     //        Element star = newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div:nth-child(3) > div.d-flex.flex-wrap.text-small.color-fg-muted > div:nth-child(1) > a").get(0);
//     //        Element element = newDoc.select("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div.d-flex > div.f4.text-normal > a").get(0);
//     //        *[@id="js-pjax-container"]/div/div[3]/div/ul/li[1]/div[2]/div[1]/div[1]/a
//     //        #js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li:nth-child(1) > div.mt-n1.flex-auto > div.d-flex > div.f4.text-normal > a
// }
// }
module.exports = GitPageUtil;
