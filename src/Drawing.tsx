import React, {
  forwardRef, memo, useMemo, useRef,
} from 'react';
import PanZoom from '@sasza/react-panzoom';

import { ApiRef, DrawingProps, PanZoomAPI } from 'types';
import brushArc from 'brush/arc';
import useApi from 'hooks/useApi';
import useBrush from 'hooks/useBrush';
import useMove from 'hooks/useMove';
import useDraw from 'hooks/useDraw';

const STYLE = {
  CANVAS_BACKGROUND: '#fff',
  CONTAINER_BACKGROUND: '#ddd',
};

const Drawing: React.FC<DrawingProps> = ({
  apiRef,
  brush = brushArc(),
  containerWidth,
  containerHeight,
  height = 300,
  fps = 30,
  width = 300,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const panZoomRef = useRef<PanZoomAPI>();
  const move = useMove({ brush, canvasRef, panZoomRef });
  const brushRef = useBrush({ brush, canvasRef, move });
  const panZoomDisabled = brush !== null;

  useDraw({ brushRef, fps, move });
  useApi({ apiRef, brushRef, canvasRef });

  const canvasStyle = useMemo(() => {
    const props: React.CSSProperties = {
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
      <PanZoom disabled={panZoomDisabled} apiRef={panZoomRef}>
        <canvas style={canvasStyle} height={height} ref={canvasRef} width={width} />
      </PanZoom>
    </div>
  );
};

const DrawingMemo: React.FC<Omit<DrawingProps, 'apiRef'>> = memo(forwardRef(
  (props, ref) => <Drawing apiRef={ref as ApiRef} {...props} />,
));

export default DrawingMemo;
