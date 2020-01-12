const brushRect = ({ fillStyle = 'black', lineWidth = 5, width, height }) => new Promise((resolve) => {
  const halfWidth = width / 2
  const halfHeight = height / 2

  const init = (ctx) => {
    ctx.lineWidth = lineWidth
    ctx.fillStyle = fillStyle
  }

  const draw = (ctx, x, y) => {
    ctx.beginPath()    
    ctx.rect(x - halfWidth, y - halfHeight, width, height)
    ctx.fill()
  }

  resolve({ draw, init })
})

export default brushRect