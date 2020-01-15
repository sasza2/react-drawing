const brushFromSrc = (src, { width, height } = {}) => new Promise((resolve) => {
  const image = new Image()
  image.onload = () => {
    const fullWidth = (width || image.naturalWidth)
    const fullHeight = (height || image.naturalHeight)

    const halfWidth = fullWidth / 2
    const halfHeight = fullHeight / 2

    const draw = (ctx, x, y) => {
      ctx.drawImage(image, x - halfWidth, y - halfHeight, fullWidth, fullHeight)
    }

    resolve({ draw })
  }
  image.src = src
})

export default brushFromSrc