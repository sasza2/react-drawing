const brushBase64 = (base64) => new Promise((resolve) => {
  const image = new Image()
  image.onload = () => {
    const halfWidth = image.naturalWidth / 2
    const halfHeight = image.naturalHeight / 2

    const draw = (ctx, x, y) => {
      ctx.drawImage(image, x - halfWidth, y - halfHeight)
    }

    resolve(draw)
  }
  image.src = base64
})

export default brushBase64