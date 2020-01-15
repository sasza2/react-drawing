import React, { Fragment } from 'react'

import Drawing, { brushCustom, brushFromSrc, brushRect } from '.'

export default { title: 'Drawing' };

export const example = () => (
  <Fragment>
    <div style={{ display: 'inline-block', border: '1px solid #000' }}>
      <Drawing
        brush={brushFromSrc('https://raw.githubusercontent.com/sasza2/react-drawing/master/docs/example/smile.png', { width: 30, height: 30 })}
        height={300}
        width={300}
      />
    </div>
    <div style={{ display: 'inline-block', border: '1px solid #000' }}>
      <Drawing
        brush={brushRect({ strokeStyle: 'red', width: 30, height: 20 })}
        height={300}
        width={300}
      />
    </div>
    <div style={{ display: 'inline-block', border: '1px solid #000' }}>
      <Drawing
        height={300}
        width={300}
      />
    </div>
    <div style={{ display: 'inline-block', border: '1px solid #000' }}>
      <Drawing
        brush={brushCustom({
          init: (ctx) => {
            ctx.fillStyle = 'red'
          },
          draw: (ctx, x, y) => {
            ctx.beginPath()
            ctx.moveTo(x,y)
            ctx.lineTo(x + 25,y + 25)
            ctx.lineTo(x + 25, y - 25)
            ctx.fill()
          }
        })}
        height={300}
        width={300}
      />
    </div>
  </Fragment>
)
