import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import './App.css';

class StartView extends Component {

    onChange = (event) => {
        this.props.toggleAdultMovies();
    }

    render() {
        return (
            <div className="text-root">
                <h1 className="main-header" >Welcome to the research platform!</h1>
                <p>
                    You are being invited to participate in a research study titled <b>Improving explainability in user-facing
                    recommendation systems</b>. This study is being done by Ville Kuosmanen and (Supervisor) Dr David
                    Harris-Birtill from the School of Computer Science at the University of St Andrews.
                </p>
                <p>We invite you to participate in a research project where you will be asked to rate movie
                    recommendations using a web application. You will first be asked to rate a number of movies you
                    have seen before. Then, you will be provided with a number of movie recommendations and you
                    will be asked to rate how interested you would be in seeing the movie, and how trustworthy the
                    recommendation seems to you. At the end, you will be asked a few general questions about the
                    system you used. Completing the study is expected to take around 10 minutes of your time. After
                    completing the study you will have a chance to win a £50 Amazon voucher by submitting your
                    email address. Further details, including information about data protection, are available in the
                    participant information sheet that you can download here [provide download link].
                </p>
                <p>
                    If you are interested in taking part, please read the participant information sheet and keep a copy
                    before starting the survey. If you have any questions, please email or call us at vik@st-
                    andrews.ac.uk or +44 (0)1334 463246.
                </p>
                <p>
                    Your participation is entirely voluntary, and you can withdraw at any time. You are free to omit any
                    question
                </p>
                <div className={"adult-film-preference-container"} >
                        <span className={"adult-film-preference-text"} >Allow films that are rated "18" or "R18" by the BBFC: </span>
                        <input type="checkbox" checked={this.props.adultMovies} onChange={this.onChange}/>
                </div>
                <Button onClick={this.props.advanceView}>Continue</Button>
            </div>
        );
    }
}

export default StartView;