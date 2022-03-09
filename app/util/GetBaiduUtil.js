// GitPageUtil
const http = require("http");
// const fs = require("fs");
// const Controller = require('egg').Controller;
const cheerio = require('cheerio');
var GitPageUtil = {
    // name: 'app',
    // version: '1.0.0',
    // sayName: function(name){
    //     console.log(this.name);
    // }
    // vscode 跳转上次的代码
    getBaidu:function(query, page) {
        // const getUrlMarked ="https://github.com/search?p="+page+"&q="+query+"&type=Repositories";


        const wz = "http://cn.bing.com/search?q=%E7%99%BE%E5%BA%A6&cvid=26d0fce0bc27499b9eabc8bec30cc1b9&aqs=edge..69i57j0l4j69i61l3j69i65.894j0j1&pglt=43&FORM=ANNTA1&PC=U531"; //网址

        var strHtml = "";
        var results = [];
        http.get(wz, function (res) {
            res.on("data", function (chunk) {
                strHtml += chunk;
            })
            res.on("end", function () {
                var $ = cheerio.load(strHtml);
                // console.log(strHtml);

                //console.log(strHtml);

                // #b_results > li:nth-child(1) > div.b_title
                // #b_results > li:nth-child(1) > div.b_title > h2 > a
                // let newsLstDiv = $("#left-col-wrapper > div.mod-tab-content");
                let titleDiv = $("#b_results > li:nth-child(1) > div.b_title");
                let title = $(" h2 > a",titleDiv).text()
                // 这样应该是可行的
                console.log("title");
                console.log(title);
           
            });
        })

    },

    getBaiduNews:function(query, page) {
        // const getUrlMarked ="https://github.com/search?p="+page+"&q="+query+"&type=Repositories";


        const wz = "http://news.baidu.com/"; //网址

        var strHtml = "";
        var results = [];
        http.get(wz, function (res) {
            res.on("data", function (chunk) {
                strHtml += chunk;
            })
            res.on("end", function () {

                // console.log(strHtml);

                //console.log(strHtml);
                // var $ = cheerio.load(strHtml);
                // #b_results > li:nth-child(1) > div.b_title
                // #b_results > li:nth-child(1) > div.b_title > h2 > a
                // let newsLstDiv = $("#left-col-wrapper > div.mod-tab-content");
                let newsLstDiv = $("#left-col-wrapper > div.mod-tab-content");
                $("a",newsLstDiv).text()
                // #headline-tabs
                // #left-col-wrapper > div.mod-tab-content
                // #pane-news > div > ul > li.hdline0 > strong > a:nth-child(1)
                // #pane-news > div > ul > li.hdline0 > strong > a:nth-child(1)
                // #pane-news > div
                // #pane-news > ul:nth-child(2) > li.bold-item > span
                var $ = cheerio.load(strHtml);
                // cheerio 获取一个 元素之后 找他的 儿子
                // cheerio 从这个元素 再select
                // cheerio 根据querySelector
                // let repoLis = $("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li");
                let news1 = $("#pane-news > div > ul > li.hdline0 > strong > a");
                // let news1 = $("#pane-news  div  ul  li.hdline0  strong  a");
                // 可以拿到
                // console.log("news1");
                // console.log(news1);
                // let newsText=news1.text()
                // console.log("newsText");
                // console.log(newsText);
                $("#channel-all li").each((idx, item) => {
                    // console.log("i");
                    // console.log(i);
                    // 可以获取一个元素之后再获取
                    // let html= item.html()
                    // let html= item.html
                    // let html= $(item).html
                    const html= $(item).html()
                    console.log("html");
                    console.log(html);
                    console.log($(item).text());
                    const aText= $("a",item).text()
                    console.log("aText");
                    console.log(aText);
                })
                // https://segmentfault.com/a/1190000011564896
            });
        })

    }
}
// class 应该是要new 的
// module.exports = app;

// class GitPageUtil {
//     getBaiduNews(query, page) {
//         // const getUrlMarked ="https://github.com/search?p="+page+"&q="+query+"&type=Repositories";


//         const wz = "http://news.baidu.com/"; //网址

//         var strHtml = "";
//         var results = [];
//         http.get(wz, function (res) {
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
//                 // let repoLis = $("#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > ul > li");
//                 let news1 = $("#pane-news > div > ul > li.hdline0 > strong > a");
//                 console.log("news1");
//                 console.log(news1);
//                 $("#channel-all li").each((iten, i) => {
//                     console.log($(i).text());
//                 })
//                 // https://segmentfault.com/a/1190000011564896
//             });
//         })

//     }
// }


module.exports = GitPageUtil;