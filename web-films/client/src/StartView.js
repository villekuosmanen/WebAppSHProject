import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import './App.css';

class StartView extends Component {

    render() {
        return (
            <div>
                <div>Welcome to the research platform!</div>
                <Button onClick={this.props.advanceView}>Continue</Button>
            </div>
        );
    }
}

export default StartView;