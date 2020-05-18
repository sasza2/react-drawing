import memo from '../helpers/brushMemo';

const brushCustom = ({ draw, dependencies = [], init }) => memo(
  () => new Promise((resolve) => resolve({ draw, init })),
  ['custom', ...dependencies],
);

export default brushCustom;
