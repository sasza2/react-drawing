import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Drawing, { brushCustom, brushFromSrc, brushRect } from '.'

export default { title: 'Drawing' };

const Box = ({ children }) => (
  <div style={{ display: 'inline-block', border: '1px solid #000' }}>
    {children}
  </div>
)

Box.propTypes = {
  children: PropTypes.node.isRequired,
}

export const example = () => (
  <Fragment>
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
      />
    </Box>
  </Fragment>
)
