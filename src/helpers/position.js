const getMousePosition = (e) => {
  if ('clientX' in e) {
    return {
      clientX: e.clientX,
      clientY: e.clientY,
    };
  }

  const { touches } = e;
  if (!touches) return null;

  return {
    clientX: touches[0].clientX,
    clientY: touches[0].clientY,
  };
};

const position = (drawingRef, panZoom, e) => {
  if (e.target !== drawingRef.current) return null;

  const mousePosition = getMousePosition(e);
  if (!mousePosition) return null;

  const ret = {
    x: (mousePosition.clientX - panZoom.rect.left - panZoom.position.x) / panZoom.zoom,
    y: (mousePosition.clientY - panZoom.rect.top - panZoom.position.y) / panZoom.zoom,
  };

  return ret;
};

export default position;
