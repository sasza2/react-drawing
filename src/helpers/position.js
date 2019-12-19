const position = (drawingRef, e) => {
  if (e.target !== drawingRef.current) return

  const rect = drawingRef.current.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

export default position
