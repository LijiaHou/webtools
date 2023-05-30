import {loadImage} from 'canvas'

// 画图
const _ = async (canvasCtx, resource) => {
  const {attributes: {url, style} = {}} = resource

  const image = await loadImage(url)
  
  canvasCtx.drawImage(image, style.left, style.top, style.width, style.height)
  
}

export default _