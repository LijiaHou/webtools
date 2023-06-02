
const _ = (canvasCtx, resource) => {
  const {attributes: {content, style} = {}} = resource

  canvasCtx.font = `${style.fontSize}px Impact`
  canvasCtx.fillStyle = style.color

  const chars = content.split('')
  let line = []
  let lineIndex = 0
  for (const char of chars) {
    const {width} = canvasCtx.measureText(line.join(''))

    canvasCtx.fillText(
      char,
      style.left + width,
      style.top + lineIndex * style.lineHeight
    )
    line.push(char)

    // 判断下次打印是否需要另起一行
    if (width > style.maxWidth) {
      lineIndex++
      line = []
    }
  }

}

export default _