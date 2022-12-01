import { BrushRef } from 'types';

type DrawProps = {
  brush: BrushRef['current'],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

type Draw = (props: DrawProps) => void

const draw: Draw = ({
  brush, x1, y1, x2, y2,
}) => {
  const xDirection = x1 < x2 ? 1 : -1;
  const yDirection = y1 < y2 ? 1 : -1;
  const xDiff = Math.abs(x1 - x2);
  const yDiff = Math.abs(y1 - y2);

  if (xDiff > yDiff) {
    let nextYDirection = (yDiff / xDiff) || 0;
    if (y1 > y2) nextYDirection = -nextYDirection;
    let currY = y1;
    const to = Math.abs(x1 - x2);
    for (let i = 0; i <= to; i += 1, currY += nextYDirection) {
      brush(x1 + xDirection * i, currY);
    }
  } else {
    let nextXDirection = (xDiff / yDiff) || 0;
    if (x1 > x2) nextXDirection = -nextXDirection;
    let currX = x1;
    const to = Math.abs(y1 - y2);
    for (let i = 0; i <= to; i += 1, currX += nextXDirection) {
      brush(currX, y1 + yDirection * i);
    }
  }
};

export default draw;
