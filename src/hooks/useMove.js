import { useEffect, useLayoutEffect, useRef, useState} from 'react'

import position from '../helpers/position'

const useMove = (drawingRef) => {
  const positionRef = useRef()
  const [moving, setMoving] = useState(null)  

  const mousedown = (e) => {
    const positionFromEvent = position(drawingRef, e)
    positionRef.current = positionFromEvent
    setMoving(positionFromEvent)
  }

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
