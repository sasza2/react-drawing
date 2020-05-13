const getMousePosition = (e) => {
  if(!isNaN(e.clientX) && !isNaN(e.clientY)) return {
    clientX: e.clientX,
    clientY: e.clientY,
  }

  const { touches } = e
  if (!touches) return null

  return {
    clientX: touches[0].clientX,
    clientY: touches[0].clientY,
  }
}

const position = (drawingRef, panZoom, e) => {
  if (e.target !== drawingRef.current) return

  const position = getMousePosition(e)
  if (!position) return null

  const ret = {
    x: (position.clientX - panZoom.rect.left - panZoom.position.x) / panZoom.zoom,
    y: (position.clientY - panZoom.rect.top - panZoom.position.y) / panZoom.zoom,
  }

  return ret
}

export default position
