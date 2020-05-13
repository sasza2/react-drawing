import { useEffect, useLayoutEffect, useRef, useState} from 'react'

import position from '../helpers/position'

const useMove = ({ brush, canvasRef, panZoomRef }) => {
  const positionRef = useRef()
  const panZoomOffsetRef = useRef(() => ({
    rect: { left: 0, top: 0 },
    position: { x: 0, y: 0 },
    zoom: 1,
  }))
  const [moving, setMoving] = useState(null)

  useEffect(() => {
    panZoomOffsetRef.current = {
      rect: panZoomRef.current.ref().current.parentNode.getBoundingClientRect(),
      position: panZoomRef.current.getPosition(),
      zoom: panZoomRef.current.getZoom(),
    }
  }, [brush])

  const mousedown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const positionFromEvent = position(canvasRef, panZoomOffsetRef.current, e)
    positionRef.current = positionFromEvent
    setMoving(positionFromEvent)
  }

  const mouseup = () => setMoving(null)

  const mousemove = (e) => {
    positionRef.current = position(canvasRef, panZoomOffsetRef.current, e)
  }

  useLayoutEffect(() => {
    const node = canvasRef.current
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
  }, [brush])

  useLayoutEffect(() => {
    if (!moving) return

    window.addEventListener('mousemove', mousemove)
    window.addEventListener('touchmove', mousemove)
    return () => {
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('touchmove', mousemove)
    }
  }, [moving])

  return { panZoomOffsetRef, positionRef, point: moving }
}

export default useMove
