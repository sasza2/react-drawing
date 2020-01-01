import React from 'react'

import Drawing from '.'

export default { title: 'Drawing' };

export const example = () => (
  <Drawing
    brush={(ctx) => {
      ctx.fillStyle = 'green'
      return (x, y) => ctx.fillRect(x, y, 3, 3)
    }}
    height={1200}
    width={800}
  />
)
