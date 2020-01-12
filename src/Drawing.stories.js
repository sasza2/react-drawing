import React from 'react'

import Drawing, { brushFromSrc } from '.'

export default { title: 'Drawing' };

export const example = () => (
  <div style={{ display: 'inline-block', border: '1px solid #000' }}>
    <Drawing
      brush={brushFromSrc('https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/653/original/smile2-c.png?1512929493', { width: 30, height: 30 })}
      height={1200}
      width={800}
    />
  </div>
)
