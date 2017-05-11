/**
 * Created by Nicolas on 06/05/2017.
 */
import React from 'react';
import {render} from 'react-dom';
import Board from './Board.jsx';

class App extends React.Component {

    render () {
        return (
            <Board/>
        );
    }
}

render (<App/>, document.getElementById('app'));