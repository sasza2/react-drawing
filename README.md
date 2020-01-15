# react-drawing
React component for drawing on canvas.

!["Preview"](docs/preview.gif "Example preview")

# Demo
https://codesandbox.io/s/romantic-tesla-oqdmx

# Installation
```sh
npm install react-drawing
```

# Usage
Example from GIF above:
```jsx
<Drawing
  brush={brushFromSrc('smile.png',{ width: 30, height: 30 })}
/>
```

# Properties
| Name | Default | Description |
| --- | --- | --- |
| brush | brushArc | Brush for drawing |
| height | 300 | canvas height in px |
| fps | 30 | drawing interval time |
| width | 300 | canvas width in px |


# Brush

```js
brushArc({ fillStyle = 'black', size = 10 })
```
Brush on canvas with `arc`.

---

```js
brushFromSrc(src, { width, height })
```
Brush on canvas with specified image. Could be also base64.

---

```js
brushRect({ fillStyle = 'black', lineWidth = 5, width, height })
```
Brush on canvas with rect.

---

```js
brushCustom({ draw, init })
```
Brush custom on canvas context:

```jsx
import Drawing, { brushCustom } from 'react-drawing'

// ...

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
  height={200}
  width={400}
/>
```

`init()` method is executed only once, so it's a good place for setting color, line width, stroke-dasharray etc.

# API
| Name | Description |
| --- | --- |
| brush(x, y) | brush on x, y position of canvas |
| getCanvas() | get canvas node |
| getContext() | get context 2d of canvas |
| toDataURL() | canvas to data URI  |

Usage:
```jsx
const ref = useRef()
//...
<Drawing ref={drawingRef} />
```

# Testing
```sh
npm run test
```

# Examples
```sh
npm run storybook
```