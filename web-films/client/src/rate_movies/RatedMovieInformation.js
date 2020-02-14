import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class RatedMovieInformation extends Component {

    render() {
        return(
            <Container className="movie_card">
                <Row noGutters={true}>
                    <Col xs={4}>
                        <img src={`https://image.tmdb.org/t/p/w92/${this.props.poster_path}`} alt={"Movie poster"} />
                    </Col>
                    <Col xs={8}>
                        <div className="movie-title">{this.props.title}</div>
                        <StarRatingComponent
                            name={"Rating"}
                            value={this.props.rating}
                            starCount={5}
                            onStarClick={(rating) => this.props.onOldRatingChange(this.props.index, rating)}
                        />
                        <Button onClick={() => this.props.deleteRating(this.props.index)}>Delete</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}