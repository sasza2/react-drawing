import { createRef, useEffect, useLayoutEffect, useState} from 'react'

import position from '../helpers/position'

const useMove = (drawingRef) => {
  const positionRef = createRef()
  const [moving, setMoving] = useState(null)  

  const mousedown = (e) => setMoving(position(drawingRef, e))
  const mouseup = () => setMoving(null)
  const mousemove = (e) => positionRef.current = position(drawingRef, e)

  useLayoutEffect(() => {
    const node = drawingRef.current
    if (!node) return

    node.addEventListener('mousedown', mousedown)
    window.addEventListener('mouseup', mouseup)

    return () => {
      node.removeEventListener('mousedown', mousedown)
      window.removeEventListener('mouseup', mouseup)
    }
  })

  useEffect(() => {
    if (!moving) return

    window.addEventListener('mousemove', mousemove)
    return () => window.removeEventListener('mousemove', mousemove)
  }, [moving])

  return { positionRef, point: moving }
}

export default useMove
