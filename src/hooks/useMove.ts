import {
  MutableRefObject, useLayoutEffect, useRef, useState,
} from 'react';

import {
  BrushMemoReturn, Move, PanZoomAPI, Position,
} from 'types';
import position from '../helpers/position';

type UseMove = (props: {
  brush: BrushMemoReturn,
  canvasRef: MutableRefObject<HTMLCanvasElement>,
  panZoomRef: MutableRefObject<PanZoomAPI>
}) => Move

const useMove: UseMove = ({ brush, canvasRef, panZoomRef }) => {
  const positionRef = useRef<Position>();
  const panZoomOffsetRef = useRef<Move['panZoomOffsetRef']['current']>({
    rect: { left: 0, top: 0 },
    position: { x: 0, y: 0 },
    zoom: 1,
  });
  const [moving, setMoving] = useState<Position | null>(null);

  const mousedown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const childNode = panZoomRef.current.ref().current;
    panZoomOffsetRef.current = {
      rect: (childNode.parentNode as HTMLDivElement).getBoundingClientRect(),
      position: panZoomRef.current.getPosition(),
      zoom: panZoomRef.current.getZoom(),
    };

    const positionFromEvent = position(canvasRef, panZoomOffsetRef.current, e);
    positionRef.current = positionFromEvent;
    setMoving(positionFromEvent);
  };

  const mouseup = () => setMoving(null);

  const mousemove = (e: MouseEvent) => {
    positionRef.current = position(canvasRef, panZoomOffsetRef.current, e);
  };

  useLayoutEffect(() => {
    const node = canvasRef.current;
    if (!node) return undefined;

    node.addEventListener('mousedown', mousedown);
    node.addEventListener('touchstart', mousedown);
    window.addEventListener('mouseup', mouseup);
    window.addEventListener('touchend', mouseup);

    return () => {
      node.removeEventListener('mousedown', mousedown);
      node.removeEventListener('touchstart', mousedown);
      window.removeEventListener('mouseup', mouseup);
      window.removeEventListener('touchend', mouseup);
    };
  }, [brush]);

  useLayoutEffect(() => {
    if (!moving) return undefined;

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('touchmove', mousemove);
    return () => {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('touchmove', mousemove);
    };
  }, [moving]);

  return { panZoomOffsetRef, positionRef, point: moving };
};

export default useMove;
