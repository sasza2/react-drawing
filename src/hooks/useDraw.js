import { useLayoutEffect } from 'react'

import draw from '../helpers/draw'

const useDraw = ({ brush, canvasRef, move }) => {
  useLayoutEffect(() => {
    if (!move.point) return

    const ctx = canvasRef.current.getContext('2d')
    const brushMove = brush(ctx)
    const last = { ...move.point }
    
    const timer = setInterval(() => {
      const position = move.positionRef.current
      if (!position) return

      draw({ brush: brushMove, x1: last.x, y1: last.y, x2: position.x, y2: position.y })

      last.x = position.x
      last.y = position.y
    }, 30)

    return () => clearInterval(timer)
  }, [brush, move.point])
}

export default useDraw
