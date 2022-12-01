import { BrushCustom } from 'types';
import memo from '../helpers/brushMemo';

const brushCustom: BrushCustom = ({ draw, dependencies = [], init }) => memo(
  () => new Promise((resolve) => resolve({ draw, init })),
  ['custom', ...dependencies],
);

export default brushCustom;
