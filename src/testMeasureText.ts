{
const https = require('http');

// 发送数据
const postData = JSON.stringify({
  canvas: {
    fontSize: 17,
    fontFamily: 'serif',
    text: '你觉得我有多长',
  },
})

const req = https.request({
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: 3000,
  path: '/measureText',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Length': postData.length
  }
}, (res) => {
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

}