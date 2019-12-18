import { createRef, useEffect, useLayoutEffect, useState} from 'react'

const useMove = (drawingRef) => {
  const positionRef = createRef()
  const [moving, setMoving] = useState(false)  

  const mousedown = () => setMoving(true)
  const mouseup = () => setMoving(false)
  const mousemove = (e) => {
    if (e.target !== drawingRef.current) return

    const rect = drawingRef.current.getBoundingClientRect();
    positionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

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

  return positionRef
}

export default useMove
