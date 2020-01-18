import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import StarRatingComponent from 'react-star-rating-component';

import './App.css';

class RateMoviesView extends Component {

    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            ratedMovies: [],
            selection: null,
            availableMovies: []
        };
    }

    componentDidMount() {
        this.getMoviesList()
            .then(res => this.setState({ availableMovies: res}))
            .catch(err => console.log(err));
    }

    getMoviesList = async () => {
        const response = await fetch('/movies');
        const body = await response.json();
        console.log(body.movies)
        if (response.status !== 200) throw Error(body.message);
    
        return body.movies;
    };

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.state.availableMovies.filter(movie =>
            movie.title.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.title;
 
    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <div>
            {suggestion.title}
        </div>
    );

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };
    
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion }) => {
        const previouslyRated = this.state.ratedMovies.filter((movie) => {
            return movie.key === suggestion.key;
        })
        if (previouslyRated.length === 0) {
            suggestion.rating = 0;
            this.setState({
                selection: suggestion
            });
        } else {
            this.setState({
                selection: previouslyRated[0]
            });
        }
    }

    rateFilm = () => {
        let nonDuplicateFilms = this.state.ratedMovies.filter((movie) => {
            return movie.key !== this.state.selection.key;
        });
        nonDuplicateFilms.push(this.state.selection);
        this.setState({
            ratedMovies: nonDuplicateFilms,
            selection: null, 
            value: ""
        });
    };

    deleteRating = (index) => {
        this.setState({
            ratedMovies: this.state.ratedMovies.filter((movie, movieIndex) => {
                return movieIndex !== index;
            })
        });
    }

    submitRatings = () => {
        this.sendDataToServer()
            .then(() => this.props.advanceView());
    }

    sendDataToServer = async () => {
        const response = await fetch('/movies/445/responses', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({response: this.state.ratedMovies}),
        });
        if (response.status !== 200) throw Error("Post failed");
    }

    render() { 
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type the name of a movie',
            value: this.state.value,
            onChange: this.onChange
        };

        let rateMovieElement = null;
        if (this.state.selection !== null) {
            rateMovieElement = <div>
                <div>{this.state.selection.title}</div>
                <div>
                    <span>My rating: </span>
                    <StarRatingComponent
                        name={"Rating"}
                        value={this.state.selection.rating}
                        starCount={5}
                        onStarClick={(nextValue, prevValue, name) => {
                            this.setState({
                                selection: {
                                    ...this.state.selection,
                                    rating: nextValue
                                }
                            })
                        }}
                    />
                    {this.state.selection.rating !== 0
                    ? <button onClick={this.rateFilm}>Confirm</button> 
                    : <span />}
                </div>
            </div>;
        }

        const ratedMoviesList = this.state.ratedMovies.map((movie, index) => 
            <div>
                <span>{movie.title}</span>
                <StarRatingComponent
                        name={"Rating"}
                        value={movie.rating}
                        starCount={5}
                        editing={false}
                    />
                <button onClick={() => this.deleteRating(index)}>Delete</button>
            </div>
        );

        return (
            <div>
                <div>Here, you can rate the movies you've seen lately</div>
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
                {rateMovieElement}
                <button onClick={this.submitRatings}>Finish</button>
                {ratedMoviesList}
            </div>
        );
    }
}

export default RateMoviesView;