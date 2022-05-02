# git cache egg ，快速浏览github

前端 https://gitee.com/starplatinum111/git-cache-vue3

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

egg.js  打包后台 部署
https://blog.csdn.net/qq_35241223/article/details/97306900

cnpm install pkg -g

分别是cnpm install request --save 和 cnpm install cheerio  --save 
https://segmentfault.com/a/1190000011564896 


node 的代码补全 还是 vscode 好用 比idea 的话

2022年2月25日21:47:16
cheerio 搜索到一个元素之后 从他开始搜索新的

cnpm i egg-bus --save

cnpm install --save request-promise

因为库没有 的话 貌似是要重新 run dev的 

http://localhost:7001/


cnpm install  egg-cors --save

https://blog.csdn.net/weixin_44934525/article/details/109163033

 cnpm install egg-mongoose --save
https://juejin.cn/post/6844903917533282312

egg js 时间存入mysql 

 cnpm install octokit --save


const TimeOutUtil = require('../util/timeOutUtil');

D:\proj\node\egg-demon\egg-demon\config\config.prod.js

要运行 需要修改
config\config.default.js 的mysql配置
mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '1234',
        // 数据库名
        database: 'egg_article',
      },
    

    运行视频 https://www.bilibili.com/video/bv1zr4y1q7NC