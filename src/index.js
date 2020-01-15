import React, { forwardRef, memo, useRef } from 'react'
import PropTypes from 'prop-types'

import useApi from './hooks/useApi'
import useBrush from './hooks/useBrush'
import useMove from './hooks/useMove'
import useDraw from './hooks/useDraw'
import brushArc from './brush/arc'

import './Drawing.css'

const Drawing = ({
  apiRef,
  brush,
  height,
  fps,
  width,
}) => {
  const canvasRef = useRef()
  const brushRef = useBrush({ brush, canvasRef })
  const move = useMove(canvasRef)
  useDraw({ brushRef, canvasRef, fps, move })
  useApi({ apiRef, brushRef, canvasRef })

  return <canvas className='react-drawing' height={height} ref={canvasRef} width={width} />
}

Drawing.propTypes = {
  apiRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  brush: PropTypes.object,
  height: PropTypes.number.isRequired,
  fps: PropTypes.number,
  width: PropTypes.number.isRequired,
}

Drawing.defaultProps = {
  brush: brushArc(),
  fps: 30,
}

export default memo(forwardRef((props, ref) => <Drawing apiRef={ref} {...props} />))
export { brushArc }
export { default as brushCustom } from './brush/custom'
export { default as brushFromSrc } from './brush/fromSrc'
export { default as brushRect } from './brush/rect'
