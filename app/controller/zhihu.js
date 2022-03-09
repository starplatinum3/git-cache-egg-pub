// https://www.zhihu.com/search?type=content&q=java

// development.js
'use strict';

const Controller = require('egg').Controller;
const cheerio = require('cheerio');
const http = require('http');
const https = require('https');
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

  async get() {
    const { ctx } = this;
    // https://www.zhihu.com/search?type=content&q=java
    let body=ctx.request.body
    let url=`https://www.zhihu.com/search?type=${body.type}&q=${body.query}`
   
    console.log("body");
    console.log(body);
    console.log("url");
    console.log(url);
    var strHtml = "";
    var results = [];
    // https
    let options={
        "Cookie":`__snaker__id=LnOHkwHZ2Nfwp2kZ; SESSIONID=iT9G3invIV9QuMrnUY9F2EWuQDUJvC5osXxYcL4dgyd; JOID=UlgcBUJbCodbWLO4el1z3hLsnSdnF3H8Lib03xklR8w4GfD5C5PJoj9Rur56hSKBsbGYQkmfYaTPs12GAT0_IaA=; osd=UFEUBUJZA49bWLGxcl1z3BvknSdlHnn8LiT91xklRcUwGfD7ApvJoj1Ysr56hyuJsbGaS0GfYabGu12GAzQ3IaA=; _zap=6e032c45-ccec-4567-bab7-1cd5f99ae851; d_c0="AJBRTbIolhSPTj_iwawoLh0ul0y6U77JUNA=|1646454381"; _9755xjdesxxd_=32; YD00517437729195:WM_TID=8r+a6X5ETZdBFQAEUFc+7jeUdyELH7S4; _xsrf=bd7ef49f-9941-4f7f-be5e-c162de661649; capsion_ticket="2|1:0|10:1646620198|14:capsion_ticket|44:NzNmYjZkZTVjYWQwNGViNGJhOTY2MDVkYWY0ZWFjYmY=|d49d3fcfdb9463dbcc15884b6cc490e6c098f33ba6982a4bab81834de5a37ab1"; gdxidpyhxdE=j8vGPVmJJnv+yByM+MstOqynsorAdftyYdDy3GlK/xe9JDC283gY2\CphsAeyt6pNiP3mC6iEqPz1fY3fePAcxDDTDg2JjmlRI1f5ZSTGG/dz3oJ\0IRBQogg0iMWYyzETkT\JSf4AH\i0h8Exu1Zhba\+8vb6jOCTT8QlIP18Qd3pz/:1646632223539; YD00517437729195:WM_NI=3kAvt9r9XSSSp1mUOFH3x9/pxGrELQjj6HOd8BcQoOaJro3W/eLMTr8i2zdp6GpF9+Sa+Z+3SbJT75shVmSL6afNBqvrXtcIP3O1BCY469esHKucY3FUJ4gIOSIOjLHYeGk=; YD00517437729195:WM_NIKE=9ca17ae2e6ffcda170e2e6eeb0d37b8e92a099ef7bf5928ba2c44f938f9aaeae7ff2f0ad97c54a9699a4d4ea2af0fea7c3b92af1b58f97f733b2e798b4d259b4efa3b6ce4e8cedb8daae7cbc99bea6cf5baab6faa9ce70fc9eadb2ee45a396be90b25dedbb84aed77afcb7fe9be77cf699c0a7bc2191bfe5bbaa3991be86b5b63fb1b89a8ed248f6bfaaafc17bb6ae9895e24394ed81d2c1499becfadae8798c95bb84dc39868b86d5e6438d8d87b0e9488c87aba8ea37e2a3; captcha_session_v2="2|1:0|10:1646631428|18:captcha_session_v2|88:VFpzcTZTdnpBWlF1VmtUcGd4bkhlRXpaa0xPK0FmWUJEODRoMWlYbFIwR01JUWp4TTVCME9MV3Z6MUJZV29Mbw==|b66aa04210b7139bf2ec12bf7d980c56ebaa67c5add1d939a4ec49400dd65f49"; captcha_ticket_v2="2|1:0|10:1646631440|17:captcha_ticket_v2|704:eyJ2YWxpZGF0ZSI6IkNOMzFfN1V3dE5iLXhVZ0ROYWk4dDdXTTBsdXBsd1o4eEhzVW4xNm5pTkRocWNqdG9KenhtVHYwMjJfRF80VkNwRS43TFpUcnVtS28xSjJmNGJaNjdWTVFUS1c3SVFheHBFX2wtUnBzYUxtZURPWVprTldGcGh1ZFotNFZDTTk4T01ULXRNS1RtTkc5T2IuWlJXYzlQLlpocTFaUWhTaldBNW44Wng5d3U4bDRFQ3FkNUdORkZRRWtCcFhEY01mb1ZvajJqNTFkaTBmUkYxTC4yVVg5cU1kSk1qVk1xWWpPOVdjem9fa1BIQ2ZFZk0xdzdUYmI3RkM5TS5icnRrYmhaVjVUYk5qR2RPRjFxaUV5SHd6NkpJc2Zmb0lkUkV4b1ZJNXFZMGkuX2ZhajVCLVVrUzZfZzhhQ3A3U0NnX3dtLk93ei12QmdJek1XZlJjc2I3NzRpZ21seVZESmZPTHZWUVY3UDdmcHQ4X0RjMUJXdHFhcFlrNlZLS25SUUp1N05HN1lYalVhZE1DSXFZQTBFbjhFUFlDbEJUQVdyUlZUcU9uNURKUXouLUlzYXdFVXlRMTFqSUhmOUZvVV94VFJUNmo2Y3VtUWI1SW1XZnRObWU3TFNYNjhfLmxzaG53VC50VGtjdklONzc2LVJISC1qd2JmdDJFUDJOcHZxbDZjMyJ9|af9a2fe3ac0a759b77c3c6ad5fa7ae705bb28329968962b148c7f35499299d00"; z_c0="2|1:0|10:1646631509|4:z_c0|92:Mi4xendJMkV3QUFBQUFBa0ZGTnNpaVdGQ1lBQUFCZ0FsVk5WZWdTWXdCNGh4M0k2RW1ueUFmMGtPUGJCUkZ2dkFkbGNR|92e917f54c58afa57bc6d7ce064af6764cac8ae8d42cce38be7b13d1ef5c108e"; tst=r; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1646635341,1646637473,1646638742,1646640329; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1646642626; KLBRSID=d017ffedd50a8c265f0e648afe355952|1646642624|1646642623; NOT_UNREGISTER_WAITING=1`
    }
    https.get(url,options, function (res) {
        res.on("data", function (chunk) {
            strHtml += chunk;
        })
        res.on("end", function () {
            var $ = cheerio.load(strHtml);
            console.log(strHtml);
      
            let listArticles = $("#SearchMain > div > div > div > div");
            console.log(listArticles);
            
            listArticles.each((idx, item) => {
                // console.log("item");
                // console.log(item);
            //    let  itemText= item.text()
               let  itemText=  $(item).text()
               console.log("itemText");
               console.log(itemText);
              
                const title = $('div.KfeCollection-PcCollegeCard-title', item).text();
                // 每一个元素
                console.log("title");
                console.log(title);
              
                const meta = $('div.KfeCollection-PcCollegeCard-meta', item).text();
                console.log("meta");
                console.log(meta);
               
              });

       
        });
    })
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
