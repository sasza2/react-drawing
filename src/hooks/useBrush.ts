import {
  MutableRefObject, useLayoutEffect, useMemo, useRef,
} from 'react';

import { BrushMemoReturn, BrushRef, Move } from 'types';

const NOOP = (() => null) as BrushRef['current'];

type UseBrushProps = {
  brush?: BrushMemoReturn,
  canvasRef: MutableRefObject<HTMLCanvasElement>,
  move: Move,
}

type UseBrush = (props: UseBrushProps) => BrushRef

const useBrush: UseBrush = ({ brush, canvasRef, move }) => {
  const brushRef: BrushRef = useRef();
  if (!brushRef.current) brushRef.current = NOOP;

  const dependencies = useMemo(() => {
    if (!brush || !brush.dependencies) return null;
    return JSON.stringify(brush.dependencies);
  }, [brush]);

  useLayoutEffect(() => {
    if (!brush) return undefined;

    let isMounted = true;
    brush.promise().then(({ draw, init }) => {
      if (!isMounted) return;

      const { zoom } = move.panZoomOffsetRef.current;
      const ctx = canvasRef.current.getContext('2d');
      const options = init
        ? init(ctx, { zoom })
        : undefined;

      brushRef.current = (x, y) => draw(ctx, x, y, options);
    });

    return () => {
      brushRef.current = NOOP;
      isMounted = false;
    };
  }, [dependencies]);

  return brushRef;
};

export default useBrush;
