import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import './App.css';

class EndView extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}
    }

    sendResponsesToServer = async () => {
        const response = await fetch(`survey/recommendations/responses`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({response: this.props.responses}),
        });
        if (response.status === 500) {
            console.log("500 error");
            this.props.render500ErrorPage()
        }
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.sendResponsesToServer()
            .then(() => this.submitEmail())
            .then(() => this.props.advanceView());
        
    }

    submitEmail = async () => {
        const response = await fetch(`survey/emails`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: this.state.value}),
        });
        if (response.status === 500) {
            console.log("500 error");
            this.props.render500ErrorPage();
        }
    }

    render() {
        return (
            <div className="text-root">
                <h1 className="main-header" >End of study.</h1>
                <p>
                    By clicking the ‘Submit’ button below, you are consenting to participate in this study, as it is described in the participant information sheet, which you can download <a href={process.env.PUBLIC_URL + "/participant-information-sheet.pdf"} download>here</a>. If you did not yet download and keep a copy of this document for your records, we recommend you do that now.
                </p>
                <p>
                    You can also participate in the £50 Amazon voucher raffle by filling in your email address. It will not be shared with anyone.
                </p>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" 
                            value={this.state.value} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default EndView;