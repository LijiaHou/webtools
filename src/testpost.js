
/**
 * 也就是Ajax请求，最初是为了在浏览器页面中发送http请求
 * 不过这个在nodejs原生不支持，需要单独引入
 * 
*/
// const xhr = new XMLHttpRequest();

// const obj = {
//   username: "admin",
//   password: "1233321"
// }

// xhr.open('post', 'http://127.0.0.1:3000/user/add');

// xhr.setRequestHeader('Content-Type', 'application/json')

// xhr.send(JSON.stringify(obj))

// xhr.onreadystatechange = () => {
//   console.log(xhr.responseText)
// }



/**
 *  下面使用nodejs原生的 http 模块发送请求
 *   文档在 https://nodejs.org/docs/latest-v8.x/api/http.html
 **/
const { log } = require('console');
const https = require('http');

const postData = JSON.stringify({
  username: "admin",
  password: "1233321"
})

const req = https.request({
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: 3000,
  path: '/user/add',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
}, (res) => {
  let pipeTemp;
  res.pipe(pipeTemp);
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
})

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);

req.end();
