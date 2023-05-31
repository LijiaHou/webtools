const _ = (canvasCtx, resource) => {
  const {attributes: {content, style} = {}} = resource

  canvasCtx.font = `${style.fontSize}px Impact`
  canvasCtx.fillText(content, style.width, style.height)

}

export default _