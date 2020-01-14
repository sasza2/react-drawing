import draw from './draw'

const fakeBrush = () => {
  const list = []

  const getList = () => list
  const add = (x, y) => list.push({ x: Math.round(x), y: Math.round(y) })

  return {
    getList,
    add,
  }
}

test('helper draw (10, 3) -> (4, 7)', () => {
  const brush = fakeBrush()

  draw({ brush: brush.add, x1: 10, y1: 3, x2: 4, y2: 7 })

  const list = [
    { x: 10, y: 3 },
    { x: 9, y: 4 },
    { x: 8, y: 4 },
    { x: 7, y: 5 },
    { x: 6, y: 6 },
    { x: 5, y: 6 },
    { x: 4, y: 7 },
  ]
  
  expect(brush.getList()).toStrictEqual(list)
})

test('helper draw (5, 10) -> (5, 5)', () => {
  const brush = fakeBrush()

  draw({ brush: brush.add, x1: 5, y1: 10, x2: 5, y2: 5 })

  const list = [
    { x: 5, y: 10 },
    { x: 5, y: 9 },
    { x: 5, y: 8 },
    { x: 5, y: 7 },
    { x: 5, y: 6 },
    { x: 5, y: 5 },
  ]

  expect(brush.getList()).toStrictEqual(list)
})

test('helper draw (4, 6) -> (0, 0)', () => {
  const brush = fakeBrush()

  draw({ brush: brush.add, x1: 4, y1: 6, x2: 0, y2: 0 })

  const list = [
    { x: 4, y: 6 },
    { x: 3, y: 5 },
    { x: 3, y: 4 },
    { x: 2, y: 3 },
    { x: 1, y: 2 },
    { x: 1, y: 1 },
    { x: 0, y: 0 },
  ]

  expect(brush.getList()).toStrictEqual(list)
})