import { BrushText, DrawAction, InitAction } from 'types';
import memo from '../helpers/brushMemo';

type Size = {
  width: number,
  height: number,
}

const brushText: BrushText = ({
  fillStyle = 'black', font = 'Arial', text, size = 10,
}) => memo(
  () => new Promise((resolve) => {
    const init: InitAction = (ctx) => {
      ctx.font = `${size}pt ${font}`;
      ctx.fillStyle = fillStyle;

      const { width } = ctx.measureText(text);
      return {
        width: width / 2,
        height: size / 2,
      };
    };

    const draw: DrawAction = (ctx, x, y, halfSize: Size) => {
      ctx.fillText(text, x - halfSize.width, y + halfSize.height);
    };

    resolve({ draw, init });
  }),
  ['text', fillStyle, font, text],
);

export default brushText;
