export default
[
  {
    level: 'easy',
    grids: [
      {
        id: 1,
        grid: [
          9, 1, null, 7, null, null, null, null, null,
          null, 3, 2, 6, null, 9, null, 8, null,
          null, null, 7, null, 8, null, 9, null, null,
          null, 8, 6, null, 3, null, 1, 7, null,
          3, null, null, null, null, null, null, null, 6,
          null, 5, 1, null, 2, null, 8, 4, null,
          null, null, 9, null, 5, null, 3, null, null,
          null, 2, null, 3, null, 1, 4, 9, null,
          null, null, null, null, null, 2, null, 6, 1
        ]
      },
      {
        id: 2,
        grid: [
          6, null, null, 7, null, 5, 4, null, 3,
          null, null, 3, null, 2, null, 7, null, null,
          null, null, null, null, null, 6, null, 5, 1,
          2, null, 5, null, 6, null, 9, null, 4,
          null, 7, null, null, null, null, null, 1, null,
          9, null, 1, null, 7, null, 5, null, 8,
          5, 3, null, 8, null, null, null, null, null,
          null, null, 8, null, 9, null, 3, null, null,
          7, null, 6, 1, null, 3, null, null, 9
        ]
      }
    ]
  },
  {
    level: 'medium',
    grids: [
      {
        id: 3,
        grid: [
          7, 9, null, null, null, null, null, null, null,
          8, null, 1, null, null, 9, null, 7, null,
          null, 4, 6, null, 7, null, null, null, 8,
          null, null, 7, 6, null, 3, null, 5, null,
          1, null, 2, null, null, null, 6, null, 7,
          null, 6, null, 7, null, 8, 2, null, null,
          6, null, null, null, 9, null, 8, 2, null,
          null, 7, null, 2, null, null, 4, null, 9,
          null, null, null, null, null, null, null, 1, 5
        ]
      },
      {
        id: 4,
        grid: [
          null, 5, 4, null, 2, null, null, null, 7,
          2, 6, null, null, null, null, null, null, null,
          7, null, 8, null, null, 6, null, 2, null,
          null, null, 2, 4, null, 9, null, 1, null,
          8, null, 3, null, null, null, 4, null, 2,
          null, 4, null, 2, null, 7, 3, null, null,
          null, 2, null, 3, null, null, 5, null, 6,
          null, null, null, null, null, null, null, 8, 1,
          4, null, null, null, 6, null, 7, 3, null
        ]
      }
    ]
  },
  {
    level: 'hard',
    grids: [
      {
        id: 5,
        grid: [
          6, null, null, null, 2, 1, null, 5, null,
          null, null, 2, null, null, null, 4, null, 7,
          null, null, null, 5, 8, null, null, null, 2,
          9, null, 3, null, null, null, null, null, null,
          null, null, null, 8, null, 6, null, null, null,
          null, null, null, null, null, null, 2, null, 3,
          2, null, null, null, 4, 3, null, null, null,
          1, null, 4, null, null, null, 3, null, null,
          null, 5, null, 1, 7, null, null, null, 8
        ]
      },
      {
        id: 6,
        grid: [
          7, null, null, 6, 5, null, 2, null, null,
          null, 3, 8, null, null, null, null, 5, null,
          null, null, 5, null, 9, 7, null, null, null,
          null, null, null, null, null, null, 1, 4, null,
          null, null, null, 2, null, 9, null, null, null,
          null, 5, 4, null, null, null, null, null, null,
          null, null, null, 4, 3, null, 5, null, null,
          null, 4, null, null, null, null, 6, 3, null,
          null, null, 9, null, 8, 6, null, null, 7
        ]
      }
    ]
  },
  {
    level: 'evil',
    grids: [
      {
        id: 7,
        grid: [
          5, 2, null, null, 8, null, 1, null, null,
          8, null, null, 3, null, null, null, null, null,
          6, null, null, null, null, 9, null, null, null,
          null, 9, null, null, 6, null, null, null, null,
          null, 4, 2, null, null, null, 8, 7, null,
          null, null, null, null, 3, null, null, 5, null,
          null, null, null, 2, null, null, null, null, 3,
          null, null, null, null, null, 7, null, null, 9,
          null, null, 8, null, 4, null, null, 2, 5
        ]
      },
      {
        id: 8,
        grid: [
          null, 2, 9, null, 3, null, null, null, 7,
          null, null, 1, null, null, 8, null, null, null,
          null, null, 3, 5, null, null, null, null, null,
          null, 8, null, null, 1, null, null, null, null,
          2, 6, null, null, null, null, null, 4, 3,
          null, null, null, null, 5, null, null, 9, null,
          null, null, null, null, null, 4, 8, null, null,
          null, null, null, 2, null, null, 5, null, null,
          3, null, null, null, 6, null, 9, 2, null
        ]
      }
    ]
  }
]

const blank = [
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null
]