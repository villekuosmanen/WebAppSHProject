import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import './App.css';

class StartView extends Component {

    render() {
        return (
            <div className="text-root">
                <h1 className="main-header" >500 - Internal server error</h1>
                <p>
                    A server error has happend that the application cannot recover from on its own. We're sorry about it :(
                </p>
                    This error may be temporary, and you can try restarting the survey. If this error keeps happening, please contact the researcher at vik@st-andrews.ac.uk. Hopefully it will then be fixed soon.
                <p>
                </p>
                <Button onClick={this.props.restartStudy}>Restart survey</Button>
            </div>
        );
    }
}

export default StartView;