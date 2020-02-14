import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import './App.css';

class EndView extends Component {

    render() {
        return (
            <div className="text-root">
                <h1 className="main-header" >End of study.</h1>
                <p>
                    By clicking the ‘Submit’ button below, you are consenting to participate in this study, as it is
                    described in the participant information sheet, which you can download here [provide download
                    link]. If you did not yet download and keep a copy of this document for your records, we
                    recommend you do that now.
                </p>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
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