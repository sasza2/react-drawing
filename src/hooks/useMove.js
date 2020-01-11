import { useEffect, useLayoutEffect, useRef, useState} from 'react'

import position from '../helpers/position'

const useMove = (drawingRef) => {
  const positionRef = useRef()
  const [moving, setMoving] = useState(null)  

  const mousedown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
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
    node.addEventListener('touchstart', mousedown)
    window.addEventListener('mouseup', mouseup)
    window.addEventListener('touchend', mouseup)

    return () => {
      node.removeEventListener('mousedown', mousedown)
      node.removeEventListener('touchstart', mousedown)
      window.removeEventListener('mouseup', mouseup)
      window.removeEventListener('touchend', mouseup)
    }
  })

  useEffect(() => {
    if (!moving) return

    window.addEventListener('mousemove', mousemove)
    window.addEventListener('touchmove', mousemove)
    return () => {
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('touchmove', mousemove)
    }
  }, [moving])

  return { positionRef, point: moving }
}

export default useMove
