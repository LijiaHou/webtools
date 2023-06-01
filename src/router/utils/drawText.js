const _ = (canvasCtx, resource) => {
  const {attributes: {content, style} = {}} = resource

  canvasCtx.font = `${style.fontSize}px Impact`
  canvasCtx.fillStyle = style.color
  canvasCtx.fillText(content, style.left, style.top, style.maxWidth)

  console.log('content:', content)
  console.log('style:', style)
}

export default _