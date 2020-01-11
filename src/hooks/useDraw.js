import { useLayoutEffect } from 'react'

import draw from '../helpers/draw'

const useDraw = ({ brushRef, move }) => {
  useLayoutEffect(() => {
    if (!move.point) return
    brushRef.current(move.point.x, move.point.y)

    const last = { ...move.point }
    
    const timer = setInterval(() => {
      const position = move.positionRef.current
      if (!position) return
      
      console.log(last, position)
      draw({ brush: brushRef.current, x1: last.x, y1: last.y, x2: position.x, y2: position.y })

      last.x = position.x
      last.y = position.y
    }, 30)

    return () => clearInterval(timer)
  }, [move.point])
}

export default useDraw
