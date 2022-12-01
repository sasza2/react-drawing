import { MutableRefObject } from 'react';

export { API as PanZoomAPI } from '@sasza/react-panzoom';

export type InitAction = (
  ctx: CanvasRenderingContext2D,
  options: { zoom: number },
) => void

export type DrawAction = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  initReturn?: unknown,
) => void

type Brush = {
  init?: InitAction,
  draw: DrawAction,
}

type BrushPromise = () => Promise<Brush>

export type BrushDependencies = Array<string | number | undefined | null>

export type BrushMemoReturn = {
  promise: BrushPromise,
  dependencies: BrushDependencies,
} | null

export type BrushMemo = (promise: BrushPromise, dependencies: BrushDependencies) => BrushMemoReturn

export type BrushRef = MutableRefObject<(x: number, y: number) => void>

export type API = {
  brush: (x: number, y: number) => void,
  getCanvas: () => HTMLCanvasElement,
  getContext: () => CanvasRenderingContext2D,
  toDataURL: () => string,
}

export type ApiRef = MutableRefObject<API> | ((api: API) => void)

export type Position = {
  x: number,
  y: number,
}

type PanZoomOffsetRef = MutableRefObject<{
  rect: { left: number, top: number },
  position: Position,
  zoom: number,
}>

export type Move = {
  panZoomOffsetRef: PanZoomOffsetRef,
  positionRef: MutableRefObject<Position>,
  point: Position | null,
}

export type DrawingProps = {
  apiRef?: ApiRef,
  brush?: BrushMemoReturn,
  containerWidth?: number,
  containerHeight?: number,
  height?: number,
  fps?: number,
  width?: number,
}

export type BrushArcProps = {
  fillStyle?: string,
  size?: number,
}

export type BrushArc = (props?: BrushArcProps) => BrushMemoReturn

export type BrushCustomProps = {
  draw: DrawAction,
  dependencies?: BrushDependencies,
  init: InitAction,
}

export type BrushCustom = (props: BrushCustomProps) => BrushMemoReturn

export type BrushFromSrcOptions = {
  width?: number,
  height?: number,
}

export type BrushFromSrc = (src: string, { width, height }?: BrushFromSrcOptions) => BrushMemoReturn

export type BrushRectProps = {
  fillStyle?: string,
  lineWidth?: number,
  width: number,
  height: number,
}

export type BrushRect = (props: BrushRectProps) => BrushMemoReturn

export type BrushTextProps = {
  fillStyle?: string,
  font?: string,
  text: string,
  size?: number,
}

export type BrushText = (props: BrushTextProps) => BrushMemoReturn
