import memo from '../helpers/brushMemo';

const brushArc = ({ fillStyle = 'black', size = 10 } = {}) => memo(
  () => new Promise((resolve) => {
    const init = (ctx) => {
      ctx.fillStyle = fillStyle;
    };

    const draw = (ctx, x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    };

    resolve({ draw, init });
  }),
  ['arc', fillStyle, size],
);

export default brushArc;
