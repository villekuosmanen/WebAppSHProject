import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class MovieInformation extends Component {

    render() {
        return(
            <Container>
                <Row noGutters={true}>
                    <Col xs={4}>
                        <img src={`https://image.tmdb.org/t/p/w92/${this.props.poster_path}`} alt={"Movie poster"} />
                        <div className="movie-age-rating">{this.props.ageRating}</div>
                    </Col>
                    <Col xs={8}>
                        <div className="movie-title">{this.props.title}</div>
                        <div className="movie-description">{this.props.description}</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}