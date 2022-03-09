

const http = require('http');
const https = require('https');

//    var protocol = (parsedUrl.protocol == 'https:' ? https : http);
//    protocol.get(parsedUrl, function(res) {
//    //   ...
//    });


//    https://blog.csdn.net/qq_28828547/article/details/81938821

// generic promise method for https
const requestPromise = (urlOptions, data) => {
  return new Promise((resolve, reject) => {
    const req = https.request(urlOptions,
      res => {
        let body = '';
        res.on('data', chunk => (body += chunk.toString()));
        res.on('error', reject);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode <= 299) {
            resolve({ statusCode: res.statusCode, headers: res.headers, body });
          } else {
            reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
          }
        });
      });
    req.on('error', reject);
    req.write(data, 'binary');
    req.end();
  });
};


//   https://stackoverflow.com/questions/65306617/async-await-for-node-js-https-get#:~:text=https.get%20doesn%27t%20return%20something%20that%20can%20be%20promisified,Promise%2C%20like%20so%2C%20then%20await%20when%20calling%20get_page


// https://blog.csdn.net/mxdzchallpp/article/details/79362516
// let http = require("http"); // 引入http模块
// let co = require('co');

/**
 * http模块发送请求
 * @param host
 * @param port
 * @param route
 * @param headers
 * @param encoding 可选值： utf8 binary
 */
function sendHttpRequest(host, port, route, headers = {}, encoding = 'utf8') {
  const options = {
    hostname: host,
    port,
    path: '/' + route,
    method: 'GET',
    headers,
  };

  let data = '';
  return new Promise(function(resolve, reject) {
    const req = http.request(options, function(res) {
      res.setEncoding(encoding);
      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function() {
        resolve({ result: true, data });
      });
    });

    req.on('error', e => {
      resolve({ result: false, errmsg: e.message });
    });
    req.end();
  });
}

// 请求例子
// let res = co(function* () {
//     let req_res = yield sendHttpRequest('www.video.com', 80, '/mobile/Test/phpinfo');
//     console.log(req_res);
// });
// console.log(res);
// console.log('123');

// error: Cannot access 'requestPromise'
// 可能要放在 前面 定义的话
const HttpUtil = {
  requestPromise,
  sendHttpRequest,
};

module.exports = HttpUtil;
