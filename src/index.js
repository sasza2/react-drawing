import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'

import useBrush from './hooks/useBrush'
import useMove from './hooks/useMove'
import useDraw from './hooks/useDraw'
import brushArc from './brush/arc'

const Drawing = ({
  brush,
  height,
  width,
}) => {
  const canvasRef = useRef()
  const brushRef = useBrush({ brush, canvasRef })
  const move = useMove(canvasRef)
  useDraw({ brushRef, canvasRef, move })

  return <canvas height={height} ref={canvasRef} width={width} />
}

Drawing.propTypes = {
  brush: PropTypes.object,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

Drawing.defaultProps = {
  brush: brushArc(),
}

export default memo(Drawing)
export { brushArc }
export { default as brushFromSrc } from './brush/fromSrc'
export { default as brushRect } from './brush/rect'
