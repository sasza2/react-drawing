import { MutableRefObject, useLayoutEffect } from 'react';

import { API, ApiRef, BrushRef } from 'types';

type UseApiProps = {
  apiRef?: ApiRef,
  brushRef: BrushRef,
  canvasRef: MutableRefObject<HTMLCanvasElement>,
}

type UseApi = (props: UseApiProps) => void

const useApi: UseApi = ({ apiRef, brushRef, canvasRef }) => {
  useLayoutEffect(() => {
    const nextApiRef = apiRef;

    if (!nextApiRef) return;

    const api: API = {
      brush: (x, y) => {
        if (brushRef.current) brushRef.current(x, y);
      },
      getCanvas: () => canvasRef.current,
      getContext: () => canvasRef.current.getContext('2d'),
      toDataURL: () => canvasRef.current.toDataURL(),
    };

    if ('current' in nextApiRef) nextApiRef.current = api;
    else nextApiRef(api);
  }, [apiRef]);
};

export default useApi;
