import React from 'react';
import './app.css';

class Square extends React.Component {
  render() {
    const {value} = this.props
    let className = 'square'

    if (typeof value !== 'number') {
      className += ' array'
    }

    return (
      <div className={className}><span>{value}</span></div>
    )
  }
}

export default Square;