import { MutableRefObject } from 'react';

import { Move, Position } from 'types';

type EventPosition = {
  clientX: number,
  clientY: number,
}

const getMousePosition = (e: MouseEvent): EventPosition | null => {
  if ('clientX' in e) {
    return {
      clientX: e.clientX,
      clientY: e.clientY,
    };
  }

  const { touches } = e as unknown as TouchEvent;
  if (!touches) return null;

  return {
    clientX: touches[0].clientX,
    clientY: touches[0].clientY,
  };
};

const position = (
  canvasRef: MutableRefObject<HTMLCanvasElement>,
  panZoom: Move['panZoomOffsetRef']['current'],
  e: MouseEvent,
): Position | null => {
  if (e.target !== canvasRef.current) return null;

  const mousePosition = getMousePosition(e);
  if (!mousePosition) return null;

  const ret = {
    x: (mousePosition.clientX - panZoom.rect.left - panZoom.position.x) / panZoom.zoom,
    y: (mousePosition.clientY - panZoom.rect.top - panZoom.position.y) / panZoom.zoom,
  };

  return ret;
};

export default position;
