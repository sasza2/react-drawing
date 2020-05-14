import React, {
  forwardRef, memo, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';
import PanZoom from '@sasza/react-panzoom';

import brushArc from './brush/arc';
import useApi from './hooks/useApi';
import useBrush from './hooks/useBrush';
import useMove from './hooks/useMove';
import useDraw from './hooks/useDraw';

const STYLE = {
  CANVAS_BACKGROUND: '#fff',
  CONTAINER_BACKGROUND: '#ddd',
};

const Drawing = ({
  apiRef,
  brush,
  containerWidth,
  containerHeight,
  height,
  fps,
  width,
}) => {
  const canvasRef = useRef();
  const panZoomRef = useRef();
  const move = useMove({ brush, canvasRef, panZoomRef });
  const brushRef = useBrush({ brush, canvasRef, move });
  useDraw({
    brushRef, canvasRef, fps, move, panZoomRef,
  });
  useApi({ apiRef, brushRef, canvasRef });

  const panZoomDisabled = useMemo(() => brush !== null, [brush]);

  const canvasStyle = useMemo(() => {
    const props = {
      backgroundColor: STYLE.CANVAS_BACKGROUND,
      touchAction: 'none',
    };

    if (panZoomDisabled) props.pointerEvents = 'all';

    return props;
  }, [panZoomDisabled]);

  const containerStyle = useMemo(() => ({
    backgroundColor: STYLE.CONTAINER_BACKGROUND,
    width: containerWidth || width,
    height: containerHeight || height,
  }), [containerWidth, containerHeight, width, height]);

  return (
    <div style={containerStyle}>
      <PanZoom disabled={panZoomDisabled} ref={panZoomRef}>
        <canvas style={canvasStyle} height={height} ref={canvasRef} width={width} />
      </PanZoom>
    </div>
  );
};

Drawing.propTypes = {
  apiRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  brush: PropTypes.shape({
    then: PropTypes.func.isRequired,
  }),
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  height: PropTypes.number,
  fps: PropTypes.number,
  width: PropTypes.number,
};

Drawing.defaultProps = {
  brush: brushArc(),
  height: 300,
  fps: 30,
  width: 300,
};

export default memo(forwardRef((props, ref) => <Drawing apiRef={ref} {...props} />));
