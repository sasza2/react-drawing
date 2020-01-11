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

const position = (drawingRef, e) => {
  if (e.target !== drawingRef.current) return

  const rect = drawingRef.current.getBoundingClientRect();
  const position = getMousePosition(e)
  if (!position) return null

  return {
    x: position.clientX - rect.left,
    y: position.clientY - rect.top,
  }
}

export default position
