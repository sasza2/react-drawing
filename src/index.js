import React from 'react'

import PanZoom from '@sasza/react-panzoom'

const Drawing = ({
  children,
  moving,
}) => {
  const withPanZoom = (node) => {
    if (!moving) return node
    return (
      <PanZoom>
        {node}
      </PanZoom>
    )
  }

  return withPanZoom(children)
}

export default Drawing
