import { useLayoutEffect } from 'react';

const useApi = ({ apiRef, brushRef, canvasRef }) => {
  useLayoutEffect(() => {
    const nextApiRef = apiRef;

    if (!nextApiRef) return;

    const api = {
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
