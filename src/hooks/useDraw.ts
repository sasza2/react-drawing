import { useLayoutEffect } from 'react';

import { BrushRef, Move } from 'types';
import draw from '../helpers/draw';

type UseDraw = (props: {
  brushRef: BrushRef,
  fps: number,
  move: Move,
}) => void

const useDraw: UseDraw = ({ brushRef, fps, move }) => {
  const intervalTime = 1000 / fps;

  useLayoutEffect(() => {
    if (!move.point) return undefined;
    brushRef.current(move.point.x, move.point.y);

    const last = { ...move.point };

    const timer = setInterval(() => {
      const position = move.positionRef.current;
      if (!position) return;

      draw({
        brush: brushRef.current,
        x1: last.x,
        y1: last.y,
        x2: position.x,
        y2: position.y,
      });

      last.x = position.x;
      last.y = position.y;
    }, intervalTime);

    return () => clearInterval(timer);
  }, [intervalTime, move.point]);
};

export default useDraw;
