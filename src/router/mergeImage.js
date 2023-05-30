import Router from "@koa/router";
import { createCanvas } from "canvas";
import drawImage from './utils/drawImage'
import drawText from './utils/drawText'

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

  const imgSrc = canvas.toDataURL()
  imageData = imgSrc

})

router.get('/viewimage', ctx => {
  ctx.body = `<img src=${imageData} />`
})

export default router