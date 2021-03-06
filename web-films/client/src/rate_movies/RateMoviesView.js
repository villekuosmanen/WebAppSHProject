import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BounceLoader from "react-spinners/BounceLoader";

import RateMovie from './RateMovie';
import RatedMovieInformation from './RatedMovieInformation';
import MovieInformation from './MovieInformation';
import './rate_movies.css';

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
        const response = await fetch('survey/movies');
        const body = await response.json();
        console.log(body.movies)
        
        if (response.status === 500) {
            console.log("500 error");
            this.props.render500ErrorPage();
        }
    
        return body.movies;
    };

    getMovieDetails = async (movieId) => {
        const response = await fetch(`survey/movies/details/${movieId}`);
        const body = await response.json();
        if (response.status === 404) {
            console.log("404 error");
            // Do nothing
        } else if (response.status === 500) {
            console.log("500 error");
            // Do nothing
        }
    
        return body;
    };

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.state.availableMovies.filter(movie => {
            if (inputLength > 4 && movie.title.toLowerCase().includes("the")) {
                return movie.title.toLowerCase().slice(0, inputLength) === inputValue ||
                    "the " + movie.title.toLowerCase().slice(0, inputLength - 4) === inputValue;
            }
            return movie.title.toLowerCase().slice(0, inputLength) === inputValue
        });
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
                .then(res => this.setState({ selection: {
                    ...this.state.selection,
                    description: res.description,
                    poster_path: res.poster_path,
                    ageRating: res.age_rating,
                }}))
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

    onOldRatingChange = (index, rating) => {
        const editRatedMovies = this.state.ratedMovies;
        editRatedMovies[index].rating = rating;
        this.setState({
            ratedMovies: editRatedMovies
        })
    }

    submitRatings = () => {
        this.setState({loading: true});
        this.sendDataToServer()
            .then((body) => {
                this.props.saveRecommendations(body.recommendations);
                this.props.advanceView();
            }
        );
    }

    sendDataToServer = async () => {
        const response = await fetch(`survey/movies/movie-ratings`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({response: this.state.ratedMovies}),
        });
        if (response.status === 500) {
            console.log("500 error");
            this.props.render500ErrorPage();
        } else {
            return await response.json();
        }
    }

    render() { 
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type the name of a movie',
            value: this.state.value,
            onChange: this.onChange
        };
        const theme = {
            input: 'react-autosuggest__input',
            suggestionsContainer: 'react-autosuggest__suggestions-container',
            suggestionsList: `dropdown-menu ${this.state.suggestions.length ? 'show' : ''}`,
            suggestion: 'react-autosuggest__suggestion',
            suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
        };

        let movieInformation = null;
        let rateMovie = null;
        if (this.state.selection !== null) {
            if ((this.state.selection.ageRating === "18" || this.state.selection.ageRating === "R18")
                && !this.props.adultMovies) {
                movieInformation = <MovieInformation
                    title={this.state.selection.title}
                    ageRating={this.state.selection.ageRating}
                    forbidden={true}
                />;
            } else {
                movieInformation = <MovieInformation
                    title={this.state.selection.title}
                    description={this.state.selection.description}
                    ageRating={this.state.selection.ageRating}
                    poster_path={this.state.selection.poster_path}
                    forbidden={false}
                />;
                rateMovie = <RateMovie 
                    rating={this.state.selection.rating}
                    rateFilm={this.rateFilm}
                    onRatingChange={(nextValue, prevValue, name) => {
                        this.setState({
                            selection: {
                                ...this.state.selection,
                                rating: nextValue
                            }
                        })
                    }}
                />;
            }
        }

        const ratedMoviesList = this.state.ratedMovies.map((movie, index) => 
            <RatedMovieInformation 
                key={index}
                index={index}
                title={movie.title}
                poster_path={movie.poster_path}
                rating={movie.rating}
                onOldRatingChange={this.onOldRatingChange}
                deleteRating={this.deleteRating}
            />
        );

        return (
            !this.state.loading ?
                <Container>
                    <Row>
                        <h1 className="main-header" >Here, you can rate the movies you've seen. Rate a minimum of 10 movies.</h1>
                    </Row>
                    <Row>
                        <Col md={12} lg={7}>
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
                            {movieInformation}
                            {rateMovie}
                            {this.state.ratedMovies.length >= 10
                                ? <Button className="finish-button" onClick={this.submitRatings}>Finish</Button>
                                : null}
                        </Col>
                        <Col className="your-ratings" md={12} lg={5}>
                            <div>
                                <div>Your ratings:</div>
                                {ratedMoviesList}
                            </div>
                        </Col>
                    </Row>
                </Container>  :
                <div>
                    <div>Generating recommendations... This may take a few minutes.</div>
                    <div style={{ position: "fixed", left: "50%", transform: "translateX(-50%)" }} >
                        <BounceLoader size={150} />
                    </div>
                </div>            
        );
    }
}

export default RateMoviesView;