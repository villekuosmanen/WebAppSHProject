import React, { Component } from 'react';
import './App.css';

class RateMoviesView extends Component {

    render() {
        return (
            <div>
                <div>Here, you can rate the movies you've seen lately</div>
                <button onClick={this.props.advanceView}>Continue</button>
            </div>
        );
    }
}

export default RateMoviesView;