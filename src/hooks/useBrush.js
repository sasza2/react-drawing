import { useLayoutEffect, useRef } from 'react'

const NOOP = () => {}

const useBrush = ({ brush, canvasRef }) => {
  const brushRef = useRef()
  if (!brushRef.current) brushRef.current = NOOP

  useLayoutEffect(() => {
    let origin = true
    brush.then((func) => {
      if (!origin) return

      const ctx = canvasRef.current.getContext('2d')
      brushRef.current = (x, y) => func(ctx, x, y)
    })

    return () => {
      brushRef.current = NOOP
      origin = false
    }
  }, [brush])

  return brushRef
}

export default useBrush