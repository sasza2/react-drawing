const draw = ({ brush, x1, y1, x2, y2 }) => {
  const xDirection = x1 < x2 ? 1 : -1
  const yDirection = y1 < y2 ? 1 : -1
  const xDiff = Math.abs(x1 - x2)
  const yDiff = Math.abs(y1 - y2)

  if(xDiff > yDiff){
    let yDirection = (yDiff / xDiff) || 0
    if (y1 > y2) yDirection = -yDirection
    let currY = y1
    for(let x = x1; x !== x2; x += xDirection){
      brush(x, currY)
      currY += yDirection
    }
  } else {
    let xDirection = (xDiff / yDiff) || 0
    if (x1 > x2) xDirection = -xDirection
    let currX = x1
    for(let y = y1; y !== y2; y += yDirection){
      brush(currX, y)
      currX += xDirection
    }
  }
}

export default draw
