import React from 'react';
import Row from './Row.jsx'

class Board extends React.Component {

    constructor() {
        super();
        this.state = {
            squares: [null,7,3,1,null,null,null,4,null,2,4,null,5,null,null,null,null,null,null,null,null,7,4,null,null,5,8,4,null,7,6,null,3,null,null,null,null,null,null,null,null,4,null,null,7,null,null,1,null,null,null,4,9,3,null,null,null,null,null,5,2,null,null,null,null,null,null,6,null,8,3,null,null,3,9,null,2,null,null,null,1]
        };
    }

    prepareSquares() {
        this.squares = this.state.squares.slice();
        for (let [index, value] of this.squares.entries()) {
            if (value === null) {
                this.squares[index] = [1,2,3,4,5,6,7,8,9];
            }
        }
    }

    solveBoard() {
        this.prepareSquares();
        for (let [index, value] of this.squares.entries()) {
            if (typeof value === 'object') {
                this.solveSquare(index);
            }
        }
        this.setState({
            squares: this.squares
        });
    }

    solveSquare(i) {
        let square = this.squares[i];
        square = this.checkRow(square, i);
        //square = this.checkRowForUniqueness(square, i);

        square = this.checkColumn(square, i);
        //square = this.checkColumnForUniqueness(square, i);

        square = this.checkRegion(square, i);
        square = this.checkRegionForUniqueness(square, i);

        this.updateSquare(square, i);
    }

    updateSquare(value, i) {
        const squares = this.squares.slice();
        if(value.length === 1) {
            squares[i] = value[0];
        } else {
            squares[i] = value;
        }
        this.squares = squares;
    }

    checkRow(square, i) {
        if (typeof square === 'number') {
            return square;
        }
        let row = this.getRow(i);
        for (let value of this.squares.slice(row * 9, row * 9 + 9)) {

            if (typeof value === 'number') {
                square = this.removeFromPossibilities(square, value);
            }
        }
        return square;
    }

    getRow(i) {
        return (Math.ceil((i + 1) / 9)) - 1;
    }

    checkColumn(square, i) {
        if (typeof square === 'number') {
            return square;
        }
        let column = this.getColumn(i);
        let columnArray = [];
        let j = 0;
        while (j < 9) {
            let square = this.squares[j * 9 + column];
            if (typeof square === 'number') {
                columnArray.push(square);
            }
            j++;
        }
        for (let value of columnArray) {
            square = this.removeFromPossibilities(square, value);
        }
        return square;
    }

    getColumn(i) {
        return i % 9;
    }

    checkRegion(square, i) {
        if (typeof square === 'number') {
            return square;
        }
        let [row, column] = this.getRegion(i),
            regionArray = [],
            j = 0,
            k;

        while (j < 3) {
            k = 0;
            while (k < 3) {
                let square = this.squares[((column * 3) + k) + ((row * 27) + (j * 9))];
                if (typeof square === 'number') {
                    regionArray.push(square);
                }
                k++;
            }
            j++;
        }
        for (let value of regionArray) {
            square = this.removeFromPossibilities(square, value);
        }
        return square;
    }

    getRegion(i) {
        return [Math.ceil((i + 1) / 27) - 1, (Math.floor(i / 3)) % 3];
    }

    checkRowForUniqueness(square, i) {
        if (typeof square === 'number') {
            return square;
        }
        let row = this.getRow(i),
            rowArray = [],
            squares = this.squares.slice(row * 9, row * 9 + 9);

        squares.splice(i%9, 1);

        for (let value of squares) {
            if (typeof value === 'object') {
                rowArray.push.apply(rowArray, value);
            }
        }

        return this.checkForUniqueness(square, rowArray);
    }

    checkColumnForUniqueness(square, i) {
        if (typeof square === 'number') {
            return square;
        }
        let column = this.getColumn(i),
            columnArray = [];

        let j = 0;
        while (j < 9) {
            let square = this.squares[j * 9 + column];
            if (typeof square === 'object' && j !== Math.floor(i/9)) {
                columnArray.push.apply(columnArray, square);
            }
            j++;
        }

        return this.checkForUniqueness(square, columnArray);
    }

    checkRegionForUniqueness(square, i) {
        if (typeof square === 'number') {
            return square;
        }
        let [row, column] = this.getRegion(i),
            regionArray = [],
            j = 0,
            k;

        while (j < 3) {
            k = 0;
            while (k < 3) {
                let square = this.squares[((column * 3) + k) + ((row * 27) + (j * 9))];
                if (typeof square === 'object' && !((j === Math.floor(i/9) % 3) && (k === i%3))) {
                    regionArray.push.apply(regionArray, square);
                }
                k++;
            }
            j++;
        }

        return this.checkForUniqueness(square, regionArray);
    }

    checkForUniqueness(square, array) {
        for (let value of square) {
            if (array.indexOf(value) === -1) {
                square = value;
                break;
            }
        }
        return square;
    }

    removeFromPossibilities(square, value) {
        let index = square.indexOf(value);
        if (index !== -1) {
            square.splice(index, 1);
        }
        return square;
    }

    renderRow(i) {
        return <Row value={this.state.squares.slice(i*9, i*9 + 9)}/>;
    }

    render () {
        return (
            <div>
            <div className="board">
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
                {this.renderRow(6)}
                {this.renderRow(7)}
                {this.renderRow(8)}
            </div>
            <button onClick={() => this.solveBoard()}>Solve</button>
            </div>
        );
    }
}

export default Board;