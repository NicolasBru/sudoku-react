import React from 'react';
import Square from './Square.jsx'

class Row extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.value[i]}/>;
    }

    render () {
        return (
            <div className="row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        );
    }
}

export default Row;