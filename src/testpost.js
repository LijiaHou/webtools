
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
 * 
 **/
const https = require('http');

const data = JSON.stringify({
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
    'Content-Length':data.length
  }
}, (res) => {
  res.on('data', () => {
    console.log('data', data)
  })
})

req.end();
