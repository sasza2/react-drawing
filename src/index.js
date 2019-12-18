import React from 'react'

import PanZoom from '@sasza/react-panzoom'

// const produceBrushStandard = ({ color, width, height }) => {}

const Drawing = ({
  height,
  moving,
  width,
}) => {
  const withPanZoom = (node) => {
    if (!moving) return node
    return (
      <PanZoom>
        {node}
      </PanZoom>
    )
  }

  const canvas = <canvas height={height} width={width} />

  return withPanZoom(canvas)
}

export default Drawing
