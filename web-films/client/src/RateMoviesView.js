import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import StarRatingComponent from 'react-star-rating-component';
import Button from 'react-bootstrap/Button';

import './App.css';

class RateMoviesView extends Component {

    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            ratedMovies: [],
            selection: null,
            availableMovies: [],
            loading: false
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

    getMovieDetails = async (movieId) => {
        // const response = await fetch(`/movies/details/${movieId}`);
        // const body = await response.json();
        // console.log(body.details)
        // if (response.status !== 200) throw Error(body.message);
    
        // return body.details;
        return {
            poster: "...",
            description: "This is a description of the movie",
            ageRating: "15",
        };
    };

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.state.availableMovies.filter(movie =>
            movie.title.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.title;
 
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
            this.getMovieDetails(suggestion.key)
                .then(res => this.setState(prevState => ({ selection: {
                    ...prevState.selection,
                    description: res.description,
                    poster: res.poster,
                    ageRating: res.ageRating,
                }})))
                .catch(err => console.log(err));
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
        this.setState({loading: true});
        this.sendDataToServer()
            .then(() => this.props.advanceView());
    }

    sendDataToServer = async () => {
        const response = await fetch(`/movies/${this.props.userId}/responses`, {
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
        const theme = {
            container: 'autosuggest',
            input: 'react-autosuggest__input',
            suggestionsContainer: 'react-autosuggest__suggestions-container',
            suggestionsList: `dropdown-menu ${this.state.suggestions.length ? 'show' : ''}`,
            suggestion: 'react-autosuggest__suggestion',
            suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
        };

        let rateMovieElement = null;
        if (this.state.selection !== null) {
            rateMovieElement = <div class="container">
                <div class="row">
                    <div className="col">
                        <img src={this.state.selection.poster} />
                        <div className="movie-age-rating">{this.state.selection.ageRating}</div>
                    </div>
                    <div className="col-8">
                        <div className="movie-title">{this.state.selection.title}</div>
                        <div className="movie-description">{this.state.selection.description}</div>
                    </div>
                </div>
                <div class="row">
                    <div className="col">My rating: </div>
                    <div className="col">
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
                    </div>
                </div>
                <div class="row">
                    <div className="col">
                        {this.state.selection.rating !== 0
                            ? <Button onClick={this.rateFilm}>Confirm</Button> 
                            : <span />}
                    </div>
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
                <Button onClick={() => this.deleteRating(index)}>Delete</Button>
            </div>
        );

        return (
            !this.state.loading ?
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
                        theme={theme}
                    />
                    {rateMovieElement}
                    <Button onClick={this.submitRatings}>Finish</Button>
                    {ratedMoviesList}
                </div>  :
                <div>Loading...</div>            
        );
    }
}

export default RateMoviesView;