import React from 'react';
import Square from './Square.jsx'

class Row extends React.Component {
  render() {
    const squares = []

    for (let i = 0; i < 9; i++) {
      squares.push(<Square key={i} value={this.props.value[i]}/>)
    }

    return (
      <div className="row">
        {squares}
      </div>
    )
  }
}

export default Row;