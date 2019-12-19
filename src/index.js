import React, { createRef, memo } from 'react'
import PanZoom from '@sasza/react-panzoom'

import useMove from './hooks/useMove'
import useDraw from './hooks/useDraw'

// const produceBrushStandard = ({ color, width, height }) => {}

const Drawing = ({
  brush,
  height,
  moving,
  width,
}) => {
  const canvasRef = createRef()
  const move = useMove(canvasRef)
  useDraw({ brush, canvasRef, move })

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
