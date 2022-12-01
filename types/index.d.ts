import {
  BrushArcProps,
  BrushCustomProps,
  BrushFromSrcOptions,
  BrushMemoReturn,
  BrushRectProps,
  BrushTextProps,
  DrawingProps,
} from './types';

export { API } from './types';

export default function Drawing(props: DrawingProps): JSX.Element;

export function brushArc(props: BrushArcProps): BrushMemoReturn

export function brushCustom(props: BrushCustomProps): BrushMemoReturn;

export function brushFromSrc(src: string, options: BrushFromSrcOptions): BrushMemoReturn;

export function brushPanZoom(): BrushMemoReturn;

export function brushRect(props: BrushRectProps): BrushMemoReturn;

export function brushText(props: BrushTextProps): BrushMemoReturn;
