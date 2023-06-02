const https = require('http');

// 发送数据
const posterList = [
  '1543933245',
  '1543933767',
  '1543933846',
  '1543933900',
  '1543934039',
  '1543934172',
  '1543934325',
  '1543934415',
  '1543934515',
  '1543934708',
  '1543934867',
  '1543934962',
  '1543935191',
  '1543935297',
  '1543935453',
  '1543935548',
  '1543935615',
  '1543935732',
  '1543935929',
  '1543936052',
]
const RATIO = 2
const postImage =
  // 'https://tbfile.ixiaochuan.cn/img/view/id/1536172703/sz/src'
  `https://tbfile.ixiaochuan.cn/img/view/id/${
    posterList[Math.floor(Math.random() * 19)]
  }/sz/src`

let number = 'xxx'
const numberOffsetLeft = 54
const numberOffsetTop = 260
const numberMargin = 5
const wordFamily = '江西拙楷'
const numberFamily = '江西拙楷'
const hasSended = false
const textLength = 50


const opts = {
  temporarily: true,
  width: 375 * RATIO,
  height: 668 * RATIO,
  // 因为是按顺序画的，所以传在后面的图或文本会覆盖前面的图和文本
  resources: [
    {
      type: 'image',
      attributes: {
        url: postImage,
        style: {
          left: 0 * RATIO,
          top: 0 * RATIO,
          width: 375 * RATIO,
          height: 668 * RATIO,
          borderRadius: '0%',
        },
      },
    },
    // {
    //   type: 'image',
    //   attributes: {
    //     url: 'http://tbfile.ixiaochuan.cn/img/png/id/670379726',
    //     style: {
    //       left: 100 * RATIO,
    //       top: 200 * RATIO,
    //       width: 200 * RATIO,
    //       height: 100 * RATIO,
    //       borderRadius: '0%',
    //     },
    //   },
    // },
    {
      type: 'text',
      attributes: {
        content: hasSended ? '我是第' : '已有',
        style: {
          left: numberOffsetLeft * RATIO,
          top: numberOffsetTop * RATIO,
          fontSize: 15 * RATIO,
          color: '#DCDCDC',
          lineHeight: 25 * RATIO,
          fonwWeight: 400 * RATIO,
          maxWidth: 266 * RATIO,
          fontFamily: wordFamily,
        },
      },
    },
    {
      type: 'text',
      attributes: {
        content: number,
        style: {
          left:
            (numberOffsetLeft + numberMargin + (hasSended ? 45 : 30)) *
            RATIO, // '我是第'宽45
          top: (numberOffsetTop - 1) * RATIO,
          fontSize: 17 * RATIO,
          color: '#FFE793',
          lineHeight: 25 * RATIO,
          fonwWeight: 400 * RATIO,
          maxWidth: 266 * RATIO,
          fontFamily: numberFamily,
        },
      },
    },
    {
      type: 'text',
      attributes: {
        content: !hasSended ? '个高考助力者阿爸爸爸爸爸爸，我我我我我我我我我我我我我我我呜呜呜呜呜呜呜呜呜呜呜呜呜呜我' : '人为2021高考助力',
        style: {
          left:
            (numberOffsetLeft +
              numberMargin * 2 +
              (hasSended ? 45 : 30) +
              textLength) *
            RATIO,
          top: numberOffsetTop * RATIO,
          fontSize: 15 * RATIO,
          color: '#DCDCDC',
          lineHeight: 25 * RATIO,
          fonwWeight: 400 * RATIO,
          maxWidth: 100 * RATIO,
          fontFamily: wordFamily,
        },
      },
    },
  ],
}

const postData = JSON.stringify({
  canvas: opts
})

const req = https.request({
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: 3000,
  path: '/mergeimage',
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
