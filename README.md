# react-drawing
React component for drawing on canvas.

!["Preview"](docs/preview.gif "Example preview")

## Demo
https://...

## Installation
```sh
npm install react-drawing
```

## Usage
Example from GIF above.
```jsx
  <Drawing
    brush={brushFromSrc('smile.png',{ width: 30, height: 30 })}
    height={300}
    width={300}
  />
```

## Properties
| Name | Default | Description |
| --- | --- | --- |
| brush | brushArc | Brush of drawing |
| height | | canvas height |
| width | | canvas width |


## Brush
`brushArc` -

`brushFromSrc` -

`brushRect` -

`brushCustom` -

## API

## Testing
```sh
npm run test
```

## Examples
```sh
npm run storybook
```