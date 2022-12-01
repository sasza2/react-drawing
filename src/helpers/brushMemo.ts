import { BrushMemo } from 'types';

const memo: BrushMemo = (promise, dependencies) => ({ promise, dependencies });

export default memo;
