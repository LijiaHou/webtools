import Router from "@koa/router";
import { createCanvas } from "canvas";
import drawImage from './utils/drawImage'
import drawText from './utils/drawText'
import { port } from "..";

const router = new Router();

let imageData = null

// 合成图片的功能
router.post('/mergeimage', async (ctx, next) => {

  const {canvas: {temporarily, width, height, resources} = {}} = ctx.request.body

  // 根据宽高参数，创建canvas，拿到ctx
  const canvas = createCanvas(width, height)
  const canvasCtx = canvas.getContext('2d')

  for(const resource of resources) {
    switch (resource.type) {
      case 'image':
        await drawImage(canvasCtx, resource)
        break;

      case 'text':
        await drawText(canvasCtx, resource)
        break;
    
      default:
        break;
    }
  }

  // 注意：
  // toDataURL方法会转成“前缀为 data: 协议的 URL”【cdn连接：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs】
  // 而且这个url数据是base64的格式
  // 目前，试了Content-type设置为image/png等，是不能直接正常显示图片的
  // 而且没有查找到对应的MIME格式可以让浏览器直接显示这种格式
  // 当然这个格式可以作为<img />标签的src以及background的src来显示图片
  // 他的用途也在于，可以不用发http请求就能展示图片【博客：https://www.cnblogs.com/zhuzhenwei918/p/6868458.html】

  // const imgSrc = canvas.toDataURL('image/png')
  
  // 那在我们这个需求上，既然要做一个响应图片的接口，直接返回正常编码的图片，类型设为image/png即可
  // 而canvas.toBuffer正是把canvas图片转成字节序列
  // nodejs默认是utf-8编码【https://nodejs.org/api/buffer.html#buffers-and-character-encodings】
  const imgSrc = canvas.toBuffer('image/png')
  imageData = imgSrc

  ctx.body = `http://localhost:${port}/viewimage`
})

router.get('/viewimage', ctx => {
  ctx.status = 200
  if(imageData) {
    ctx.type = 'image/png'
    ctx.body = imageData
  } else {
    ctx.type = 'text/plain'
    ctx.body = '暂无图片数据'
  }
})

router.post('/measureText', ctx => {
  const {canvas: req, canvas: {fontSize, fontFamily, text}} = ctx.request.body
  console.log('req', req)

  const canvas = createCanvas(500, 500)
  const canvasCtx = canvas.getContext('2d')
  
  canvasCtx.font = `${fontSize}px ${fontFamily}`
  const {width} = canvasCtx.measureText(text)

  ctx.status = 200
  ctx.type = 'application/json'
  ctx.body = JSON.stringify({
    ret: 1,
    data: {
      width,
    }
  })
})

export default router