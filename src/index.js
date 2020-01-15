import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'

import useBrush from './hooks/useBrush'
import useMove from './hooks/useMove'
import useDraw from './hooks/useDraw'
import brushArc from './brush/arc'

import './Drawing.css'

const Drawing = ({
  brush,
  height,
  fps,
  width,
}) => {
  const canvasRef = useRef()
  const brushRef = useBrush({ brush, canvasRef })
  const move = useMove(canvasRef)
  useDraw({ brushRef, canvasRef, fps, move })

  return <canvas className='react-drawing' height={height} ref={canvasRef} width={width} />
}

Drawing.propTypes = {
  brush: PropTypes.object,
  height: PropTypes.number.isRequired,
  fps: PropTypes.number,
  width: PropTypes.number.isRequired,
}

Drawing.defaultProps = {
  brush: brushArc(),
  fps: 30,
}

export default memo(Drawing)
export { brushArc }
export { default as brushCustom } from './brush/custom'
export { default as brushFromSrc } from './brush/fromSrc'
export { default as brushRect } from './brush/rect'
