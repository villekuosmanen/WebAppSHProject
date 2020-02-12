import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Button from 'react-bootstrap/Button';

export default class MovieInformation extends Component {

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">My rating: </div>
                    <div className="col">
                        <StarRatingComponent
                            name={"Rating"}
                            value={this.props.rating}
                            starCount={5}
                            onStarClick={this.props.onRatingChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.props.rating !== 0
                            ? <Button onClick={this.props.rateFilm}>Confirm</Button> 
                            : <span />}
                    </div>
                </div>
            </div>
        );
    }
}