import React, { useState } from 'react';

import { BrushMemoReturn } from 'types';
import Drawing, {
  brushCustom, brushFromSrc, brushPanZoom, brushRect, brushText,
} from './index';

export default { title: 'Drawing' };

const BRUSH_CUSTOM = brushCustom({
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
});
const BRUSH_RECT = brushRect({ width: 30, height: 20 });
const BRUSH_SMILE = brushFromSrc(
  'https://raw.githubusercontent.com/sasza2/react-drawing/master/docs/example/smile.png',
  { width: 30, height: 30 },
);
const BRUSH_TEXT = brushText({ fillStyle: 'green', text: 'hello world', size: 25 });

const Box: React.FC = ({ children }) => (
  <div style={{
    display: 'inline-block', border: '1px solid #000', width: 300, height: 300,
  }}
  >
    {children}
  </div>
);

export const example: React.FC = () => (
  <>
    <Box>
      <Drawing brush={BRUSH_SMILE} />
    </Box>
    <Box>
      <Drawing brush={BRUSH_RECT} />
    </Box>
    <Box>
      <Drawing />
    </Box>
    <Box>
      <Drawing brush={BRUSH_CUSTOM} />
    </Box>
    <Box>
      <Drawing brush={brushPanZoom()} />
    </Box>
    <Box>
      <Drawing brush={BRUSH_TEXT} />
    </Box>
  </>
);

export const panZoomExample: React.FC = () => {
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
            : brushRect({ fillStyle: 'red', width: 30, height: 20 })
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

const TOOLBOX_ITEMS = [
  {
    id: 'panzoom',
    node: <div className="symbol">&#10557;</div>,
    brush: brushPanZoom(),
  },
  {
    id: 'smile',
    node: <img src="https://raw.githubusercontent.com/sasza2/react-drawing/master/docs/example/smile.png" alt="smile" />,
    brush: BRUSH_SMILE,
  },
  {
    id: 'rect',
    node: <div className="figure" />,
    brush: BRUSH_RECT,
  },
  {
    id: 'circle',
    node: <div className="figure" />,
    brush: undefined,
  },
  {
    id: 'triangle',
    node: <div className="figure" />,
    brush: BRUSH_CUSTOM,
  },
  {
    id: 'text',
    node: <div className="symbol">T</div>,
    brush: BRUSH_TEXT,
  },
];

const useToolbox = (): [React.ReactNode, BrushMemoReturn] => {
  const [toolbox, setToolbox] = useState<typeof TOOLBOX_ITEMS[number]>(TOOLBOX_ITEMS[1]);

  const node = (
    <>
      <style>
        {`
        .toolbox {
          position: absolute;
          left: 320px;
          width: 40px;
          top: 20px;
          border: 1px solid #eee;
          border-bottom: 0;
        }
        .toolbox__item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }
        .toolbox .selected {
          background-color: #ddd;
        }
        .toolbox__item--smile img {
          width: 30px;
          height: 30px;
        }
        .toolbox__item--rect .figure {
          background-color: black;
          width: 30px;
          height: 20px;
        }
        .toolbox__item--circle .figure {
          background-color: black;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .toolbox__item--triangle .figure {
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 10px solid black;
        }
        .toolbox__item--panzoom {
          font-size: 30px;
        }
      `}
      </style>
      <div className="toolbox">
        {
          TOOLBOX_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`toolbox__item toolbox__item--${item.id} ${toolbox && item.id === toolbox.id ? 'selected' : ''}`}
              onClick={() => setToolbox(item)}
            >
              {item.node}
            </div>
          ))
        }
      </div>
    </>
  );

  return [node, toolbox ? toolbox.brush : undefined];
};

export const toolboxExample: React.FC = () => {
  const [toolbox, brush] = useToolbox();
  return (
    <>
      {toolbox}
      <Box>
        <Drawing
          containerWidth={300}
          containerHeight={300}
          width={1000}
          height={1000}
          brush={brush}
        />
      </Box>
    </>
  );
};
