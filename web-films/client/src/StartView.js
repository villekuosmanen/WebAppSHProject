import React, { Component } from 'react';
import './App.css';

class StartView extends Component {

    render() {
        return (
            <div>
                <div>Welcome to the research platform!</div>
                <button onClick={this.props.advanceView}>Continue</button>
            </div>
        );
    }
}

export default StartView;