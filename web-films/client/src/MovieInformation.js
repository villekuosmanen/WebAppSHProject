import React, { Component } from 'react';

export default class MovieInformation extends Component {

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={`https://image.tmdb.org/t/p/w92/${this.props.poster_path}`} alt={"Movie poster"} />
                        <div className="movie-age-rating">{this.props.ageRating}</div>
                    </div>
                    <div className="col-8">
                        <div className="movie-title">{this.props.title}</div>
                        <div className="movie-description">{this.props.description}</div>
                    </div>
                </div>
            </div>
        );
    }
}