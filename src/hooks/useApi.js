import { useLayoutEffect } from 'react'

const useApi = ({ apiRef, brushRef, canvasRef }) => {
  useLayoutEffect(() => {
    if (!apiRef) return

    const api = {
      brush: (x, y) => {
        if (brushRef.current) brushRef.current(x, y)
      },
      getCanvas: () => canvasRef.current,
      getContext: () => canvasRef.current.getContext('2d'),
      toDataURL: () => canvasRef.current.toDataURL(),
    }

    if ('current' in apiRef) apiRef.current = api
    else apiRef(api)
  }, [apiRef])
}

export default useApi
