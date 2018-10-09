import React, {Component, Fragment} from 'react'
import Row from './Row.jsx'
import config from './config'

class Board extends Component {

  state = {
    squares: [],
    options: config,
    ended: false,
    blocked: false
  }

  prepareSquares() {
    this.prevSquares = this.state.squares.slice()
    this.squares = this.prevSquares.slice()
    for (const [index, value] of this.squares.entries()) {
      if (value === null) {
        this.squares[index] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    }
  }

  solveBoard = (event) => {
    this.stepByStep = event.target.id === 'step'
    this.prepareSquares()
    this.circleBoard()
    this.setState({
      squares: this.squares,
      ended: !this.squares.find(square => typeof square === 'object')
    })
  }

  circleBoard() {
    this.searchBoardForPairs()

    for (const [index, value] of this.squares.entries()) {
      if (typeof value === 'object') {
        this.solveSquare(index)
      }
    }

    if (JSON.stringify(this.prevSquares) === JSON.stringify(this.squares)) {
      this.setState({blocked: true})
    } else {
      if (!this.stepByStep && this.squares.find(square => typeof square === 'object')) {
        this.prevSquares = this.squares.slice()
        this.circleBoard()
      }
    }
  }

  searchBoardForPairs() {
    for (let i = 0; i < 9; i++) {
      // ROW
      const rowArray = this.squares.slice(i * 9, i * 9 + 9)
      this.checkForPairs(rowArray, i, 'row')

      // COLUMN
      const columnArray = []
      let columnJ = 0
      while (columnJ < 9) {
        const square = this.squares[columnJ * 9 + i]
        columnArray.push(square)
        columnJ++
      }
      this.checkForPairs(columnArray, i, 'column')

      // REGION
      const [row, column] = this.getRegion((Math.floor(i / 3) * 27) + ((i % 3) * 3 ))
      const regionArray = []
      let regionJ = 0

      while (regionJ < 3) {
        let k = 0
        while (k < 3) {
          const square = this.squares[((column * 3) + k) + ((row * 27) + (regionJ * 9))]
          regionArray.push(square)
          k++
        }
        regionJ++
      }
      this.checkForPairs(regionArray, i, 'region')
    }
  }

  checkForPairs(array, i, type) {
    const func = {
      row: 'getSquareIndexFromRow',
      column: 'getSquareIndexFromColumn',
      region: 'getSquareIndexFromRegion'
    }

    for (const [index, value] of array.entries()) {
      if (typeof value === 'object' && value.length === 2) {
        const arr = array.slice(index + 1)
        arr.forEach((entrie, index2) => {
          if (JSON.stringify(value) === JSON.stringify(entrie)) {
            array.forEach((v, i2) => {
              if (i2 === index || i2 === index2 + index + 1) {
                return
              }

              if (typeof v === 'object' && (v.includes(value[0]) || v.includes(value[1]))) {

                let newVal = v.filter(v2 => v2 !== value[0] && v2 !== value[1])

                if (newVal.length === 1) {
                  newVal = newVal[0]
                }

                this.squares[this[func[type]](i, i2)] = newVal
              }
            })
          }
        })
      }
    }
  }

  solveSquare(i) {
    let square = this.squares[i]
    square = this.checkRow(square, i)
    square = this.checkRowForUniqueness(square, i)

    square = this.checkColumn(square, i)
    square = this.checkColumnForUniqueness(square, i)

    square = this.checkRegion(square, i)
    square = this.checkRegionForUniqueness(square, i)

    this.updateSquare(square, i)
  }

  updateSquare(value, i) {
    const squares = this.squares.slice()
    if (value.length === 1) {
      squares[i] = value[0]
    } else {
      squares[i] = value
    }
    this.squares = squares
  }

  getSquareIndexFromRow(rowIndex, squareIndex) {
    return (rowIndex * 9) + squareIndex
  }

  getSquareIndexFromColumn(columnIndex, squareIndex) {
    return columnIndex + squareIndex * 9
  }

  getSquareIndexFromRegion(regionIndex, squareIndex) {
    return (Math.floor(regionIndex / 3)) * 27 + ((regionIndex % 3) * 3) + (Math.floor(squareIndex / 3)) * 9 + (squareIndex % 3)
  }

  checkRow(square, i) {
    if (typeof square === 'number') {
      return square
    }
    const row = this.getRow(i)
    for (const value of this.squares.slice(row * 9, row * 9 + 9)) {

      if (typeof value === 'number') {
        square = this.removeFromPossibilities(square, value)
      }
    }
    return square
  }

  getRow(i) {
    return (Math.ceil((i + 1) / 9)) - 1
  }

  checkColumn(square, i) {
    if (typeof square === 'number') {
      return square
    }
    const column = this.getColumn(i)
    const columnArray = []
    let j = 0
    while (j < 9) {
      const square = this.squares[j * 9 + column]
      if (typeof square === 'number') {
        columnArray.push(square)
      }
      j++
    }
    for (const value of columnArray) {
      square = this.removeFromPossibilities(square, value)
    }
    return square
  }

  getColumn(i) {
    return i % 9
  }

  checkRegion(square, i) {
    if (typeof square === 'number') {
      return square
    }
    const [row, column] = this.getRegion(i),
      regionArray = []
    let j = 0

    while (j < 3) {
      let k = 0
      while (k < 3) {
        const square = this.squares[((column * 3) + k) + ((row * 27) + (j * 9))]
        if (typeof square === 'number') {
          regionArray.push(square)
        }
        k++
      }
      j++
    }
    for (const value of regionArray) {
      square = this.removeFromPossibilities(square, value)
    }
    return square
  }

  getRegion(i) {
    return [Math.ceil((i + 1) / 27) - 1, (Math.floor(i / 3)) % 3]
  }

  checkRowForUniqueness(square, i) {
    if (typeof square === 'number') {
      return square
    }
    const row = this.getRow(i),
      rowArray = [],
      squares = this.squares.slice(row * 9, row * 9 + 9)

    squares.splice(i % 9, 1)

    for (const value of squares) {
      if (typeof value === 'object') {
        rowArray.push.apply(rowArray, value)
      }
    }

    return this.checkForUniqueness(square, rowArray)
  }

  checkColumnForUniqueness(square, i) {
    if (typeof square === 'number') {
      return square
    }
    const column = this.getColumn(i),
      columnArray = []

    let j = 0
    while (j < 9) {
      const square = this.squares[j * 9 + column]
      if (typeof square === 'object' && j !== Math.floor(i / 9)) {
        columnArray.push.apply(columnArray, square)
      }
      j++
    }

    return this.checkForUniqueness(square, columnArray)
  }

  checkRegionForUniqueness(square, i) {
    if (typeof square === 'number') {
      return square
    }
    const [row, column] = this.getRegion(i),
      regionArray = []
    let j = 0

    while (j < 3) {
      let k = 0
      while (k < 3) {
        const square = this.squares[((column * 3) + k) + ((row * 27) + (j * 9))]
        if (typeof square === 'object' && !((j === Math.floor(i / 9) % 3) && (k === i % 3))) {
          regionArray.push.apply(regionArray, square)
        }
        k++
      }
      j++
    }

    return this.checkForUniqueness(square, regionArray)
  }

  checkForUniqueness(square, array) {
    for (const value of square) {
      if (array.indexOf(value) === -1) {
        square = value
        break
      }
    }
    return square
  }

  removeFromPossibilities(square, value) {
    const index = square.indexOf(value)
    if (index !== -1) {
      square.splice(index, 1)
    }
    return square
  }

  handleChange = event => {
    let {value} = event.target
    if (value) {
      value = value.split('_')
      this.setState({
        squares: config.find(level => level.level === value[0]).grids.find(grid => grid.id === Number(value[1])).grid,
        ended: false,
        blocked: false
      })
      this.stepByStep = false
    }
  }

  render() {
    const {squares, options, ended, blocked} = this.state
    const rows = []
    const selectOptions = []


    for (let i = 0; i < 9; i++) {
      rows.push(<Row key={i} value={squares.slice(i * 9, i * 9 + 9)}/>)
    }

    options.forEach(group => {
      const {level} = group
      const groupOptions = []

      group.grids.forEach(grid => {
        const {id} = grid
        groupOptions.push(<option key={id} value={`${level}_${id}`}>{id}</option>)
      })
      selectOptions.push(<optgroup key={`group_${ level }`} label={`level ${ level }`}>{groupOptions}</optgroup>)
    })

    return (
      <Fragment>
        <select onChange={this.handleChange}>
          <option selected disabled>Select a Grid</option>
          {selectOptions}
        </select>
        {
          !!squares.length && (
            <Fragment>
              <div className="board">
                {rows}
              </div>
              {
                blocked ? (
                  <Fragment>
                    <p>Blocked !</p>
                  </Fragment>
                )
                  : ended ? (
                  <p>Resolved !</p>
                )
                  : (
                    <Fragment>
                      <button id="step" onClick={this.solveBoard}>Solve Step By Step</button>
                      <button onClick={this.solveBoard}>Solve</button>
                    </Fragment>
                  )
              }
            </Fragment>
          )
        }
      </Fragment>
    )
  }
}

export default Board