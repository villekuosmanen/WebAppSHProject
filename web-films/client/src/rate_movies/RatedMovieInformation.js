import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Button from 'react-bootstrap/Button';

export default class RatedMovieInformation extends Component {

    render() {
        return(
            <div className="container movie_card">
                <div className="row">
                    <div className="col">
                        <img src={`https://image.tmdb.org/t/p/w92/${this.props.poster_path}`} alt={"Movie poster"} />
                    </div>
                    <div className="col-8">
                        <div className="movie-title">{this.props.title}</div>
                        <StarRatingComponent
                            name={"Rating"}
                            value={this.props.rating}
                            starCount={5}
                            onStarClick={(rating) => this.props.onOldRatingChange(this.props.index, rating)}
                        />
                        <Button onClick={() => this.props.deleteRating(this.props.index)}>Delete</Button>
                    </div>
                </div>
            </div>
        );
    }
}