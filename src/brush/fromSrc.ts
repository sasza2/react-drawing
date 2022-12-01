import { BrushFromSrc, DrawAction } from 'types';
import memo from '../helpers/brushMemo';

const brushFromSrc: BrushFromSrc = (src, { width, height } = {}) => memo(
  () => new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const fullWidth = (width || image.naturalWidth);
      const fullHeight = (height || image.naturalHeight);

      const halfWidth = fullWidth / 2;
      const halfHeight = fullHeight / 2;

      const draw: DrawAction = (ctx, x, y) => {
        ctx.drawImage(image, x - halfWidth, y - halfHeight, fullWidth, fullHeight);
      };

      resolve({ draw });
    };
    image.src = src;
  }),
  ['src', src, width, height],
);

export default brushFromSrc;
