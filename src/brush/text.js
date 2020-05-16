import memo from '../helpers/brushMemo';

const brushText = ({
  fillStyle = 'black', font = 'Arial', text, size = 10,
} = {}) => memo(
  () => new Promise((resolve) => {
    const init = (ctx) => {
      ctx.font = `${size}pt ${font}`;
      ctx.fillStyle = fillStyle;

      const { width } = ctx.measureText(text);
      return {
        width: width / 2,
        height: size / 2,
      };
    };

    const draw = (ctx, x, y, halfSize) => {
      ctx.fillText(text, x - halfSize.width, y + halfSize.height);
    };

    resolve({ draw, init });
  }),
  ['text', fillStyle, font, text],
);

export default brushText;
