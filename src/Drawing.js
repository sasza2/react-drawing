import React, { forwardRef, memo, useRef } from 'react'
import PropTypes from 'prop-types'

import brushArc from './brush/arc'
import useApi from './hooks/useApi'
import useBrush from './hooks/useBrush'
import useMove from './hooks/useMove'
import useDraw from './hooks/useDraw'

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
  height: PropTypes.number,
  fps: PropTypes.number,
  width: PropTypes.number,
}

Drawing.defaultProps = {
  brush: brushArc(),
  height: 300,
  fps: 30,
  width: 300,
}

export default memo(forwardRef((props, ref) => <Drawing apiRef={ref} {...props} />))
