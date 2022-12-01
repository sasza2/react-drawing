import { BrushRect, DrawAction, InitAction } from 'types';
import memo from '../helpers/brushMemo';


const brushRect: BrushRect = ({
  fillStyle = 'black',
  lineWidth = 5,
  width,
  height,
}) => memo(
  () => new Promise((resolve) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const init: InitAction = (ctx) => {
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = fillStyle;
    };

    const draw: DrawAction = (ctx, x, y) => {
      ctx.beginPath();
      ctx.rect(x - halfWidth, y - halfHeight, width, height);
      ctx.fill();
    };

    resolve({ draw, init });
  }),
  ['rect', fillStyle, lineWidth, width, height],
);

export default brushRect;
