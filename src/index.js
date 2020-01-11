import React, { createRef, memo } from 'react'
import PanZoom from '@sasza/react-panzoom'

import useBrush from './hooks/useBrush'
import useMove from './hooks/useMove'
import useDraw from './hooks/useDraw'

const Drawing = ({
  brush,
  height,
  moving,
  width,
}) => {
  const canvasRef = createRef()
  const brushRef = useBrush({ brush, canvasRef })
  const move = useMove(canvasRef)
  useDraw({ brushRef, canvasRef, move })

  const withPanZoom = (node) => {
    if (!moving) return node
    return (
      <PanZoom>
        {node}
      </PanZoom>
    )
  }

  const canvas = <canvas height={height} ref={canvasRef} width={width} />

  return withPanZoom(canvas)
}

export default memo(Drawing)
export { default as brushBase64 } from './brush/base64'