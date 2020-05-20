import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Drawing, {
  brushCustom, brushFromSrc, brushPanZoom, brushRect, brushText,
} from '.';

export default { title: 'Drawing' };

const Box = ({ children }) => (
  <div style={{
    display: 'inline-block', border: '1px solid #000', width: 300, height: 300,
  }}
  >
    {children}
  </div>
);

Box.propTypes = {
  children: PropTypes.node.isRequired,
};

export const example = () => (
  <>
    <Box>
      <Drawing
        brush={brushFromSrc('https://raw.githubusercontent.com/sasza2/react-drawing/master/docs/example/smile.png', { width: 30, height: 30 })}
      />
    </Box>
    <Box>
      <Drawing
        brush={brushRect({ strokeStyle: 'red', width: 30, height: 20 })}
      />
    </Box>
    <Box>
      <Drawing />
    </Box>
    <Box>
      <Drawing
        brush={brushCustom({
          init: (ctx) => {
            ctx.fillStyle = 'red';
          },
          draw: (ctx, x, y) => {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 25, y + 25);
            ctx.lineTo(x + 25, y - 25);
            ctx.fill();
          },
        })}
      />
    </Box>
    <Box>
      <Drawing
        brush={brushPanZoom()}
      />
    </Box>
    <Box>
      <Drawing
        brush={brushText({ fillStyle: 'green', text: 'hello world', size: 25 })}
      />
    </Box>
  </>
);

export const panZoomExample = () => {
  const [panZoom, setPanZoom] = useState(false);

  const changeBrush = () => setPanZoom(!panZoom);

  return (
    <Box>
      <Drawing
        containerWidth={300}
        containerHeight={300}
        width={1000}
        height={1000}
        brush={
          panZoom
            ? brushPanZoom()
            : brushRect({ strokeStyle: 'red', width: 30, height: 20 })
        }
      />
      <label htmlFor="panzoom-checkbox">
        <input
          id="panzoom-checkbox"
          type="checkbox"
          checked={panZoom}
          onChange={changeBrush}
        />
        pan zoom mode
      </label>
    </Box>
  );
};
