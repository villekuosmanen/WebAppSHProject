import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class MovieInformation extends Component {

    render() {
        return(
            <Container>
                <Row className="star-rating-row">
                    <Col>My rating: </Col>
                    <Col>
                        <StarRatingComponent
                            name={"Rating"}
                            value={this.props.rating}
                            starCount={5}
                            onStarClick={this.props.onRatingChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.rating !== 0
                            ? <Button onClick={this.props.rateFilm}>Confirm</Button> 
                            : null}
                    </Col>
                </Row>
            </Container>
        );
    }
}