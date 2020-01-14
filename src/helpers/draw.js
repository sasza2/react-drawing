const draw = ({ brush, x1, y1, x2, y2 }) => {
  const xDirection = x1 < x2 ? 1 : -1
  const yDirection = y1 < y2 ? 1 : -1
  const xDiff = Math.abs(x1 - x2)
  const yDiff = Math.abs(y1 - y2)

  if(xDiff > yDiff){
    let yDirection = (yDiff / xDiff) || 0
    if (y1 > y2) yDirection = -yDirection
    let currY = y1
    const to = Math.abs(x1 - x2)
    for(let i = 0; i <= to; i++, currY += yDirection){
      brush(x1 + xDirection * i, currY)
    }
  } else {
    let xDirection = (xDiff / yDiff) || 0
    if (x1 > x2) xDirection = -xDirection
    let currX = x1
    const to = Math.abs(y1 - y2)
    for(let i = 0; i <= to; i++, currX += xDirection){
      brush(currX, y1 + yDirection * i)
    }
  }
}

export default draw
