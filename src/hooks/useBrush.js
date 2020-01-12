import { useLayoutEffect, useRef } from 'react'

const NOOP = () => {}

const useBrush = ({ brush, canvasRef }) => {
  const brushRef = useRef()
  if (!brushRef.current) brushRef.current = NOOP

  useLayoutEffect(() => {
    let origin = true
    brush.then(({ draw, init }) => {
      if (!origin) return

      const ctx = canvasRef.current.getContext('2d')
      if (init) init(ctx)
      brushRef.current = (x, y) => draw(ctx, x, y)
    })

    return () => {
      brushRef.current = NOOP
      origin = false
    }
  }, [brush])

  return brushRef
}

export default useBrush