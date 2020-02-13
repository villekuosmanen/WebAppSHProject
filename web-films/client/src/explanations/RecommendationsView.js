import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import './explanations.css';
import Explanation from './Explanation'
import MovieInformation from "../rate_movies/MovieInformation"

class RecommendationsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommendations: [],
            responses: [],
            currentRecommendation: -1,
            interest: 0,
            trust: 0,
        };
    }

    componentDidMount() {
        this.getRecommendations()
            .then(res => this.setState({ recommendations: res, currentRecommendation: 0 }))
            .then(() => this.getMovieDetails(this.state.recommendations[this.state.currentRecommendation].movieId))
            .then(res => {
                if ((res.age_rating === "18" || res.age_rating === "R18") && !this.props.adultMovies) {
                    this.setState({
                        currentRecommendation: this.state.currentRecommendation + 1,
                    });
                    return;
                }
                const recs = this.state.recommendations;
                recs[this.state.currentRecommendation] = {
                    ...recs[this.state.currentRecommendation],
                    description: res.description,
                    poster_path: res.poster_path,
                    ageRating: res.age_rating,
                };
                this.setState({
                    recommendations: recs,
                });
            })
            .catch(err => console.log(err));
    }

    getMovieDetails = async (movieId) => {
        const response = await fetch(`/movies/details/${movieId}`);
        const body = await response.json();
        console.log(body.details)
        if (response.status !== 200) throw Error(body.message);
    
        return body;
    };
    
    getRecommendations = async () => {
        const response = await fetch(`/recommendations/${this.props.userId}/recommendations`);
        const body = await response.json();
        console.log(body.recommendations)
        if (response.status !== 200) throw Error(body.message);
    
        return body.recommendations;
    };

    incrementFilm = () => {
        const recs = this.state.recommendations;
        const newMovieIndex = this.state.currentRecommendation + 1;
        this.getMovieDetails(recs[newMovieIndex].movieId)
            .then(res => {
                if ((res.age_rating === "18" || res.age_rating === "R18") && !this.props.adultMovies) {
                    this.setState({
                        currentRecommendation: newMovieIndex,
                    }).then(() => this.incrementFilm());
                    return;
                }
                const recs = this.state.recommendations;
                recs[newMovieIndex] = {
                    ...recs[newMovieIndex],
                    description: res.description,
                    poster_path: res.poster_path,
                    ageRating: res.age_rating,
                };
                this.setState({
                    recommendations: recs,
                    currentRecommendation: newMovieIndex,
                    interest: 0,
                    trust: 0,
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    currentRecommendation: this.state.currentRecommendation + 1,
                });
            });
    }

    rateFilm = () => {
        this.state.responses.push({interest: this.state.interest, trust: this.state.trust});
        if (this.state.currentRecommendation === this.state.recommendations.length - 1) {
            this.sendDataToServer()
                .then(() => this.props.advanceView());
        } else {
            this.incrementFilm();
        }
    };

    sendDataToServer = async () => {
        const response = await fetch(`/recommendations/${this.props.userId}/responses`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({response: this.state.responses}),
        });
        if (response.status !== 200) throw Error("Post failed");
    }
    
    render() {
        let mainComponent = null;
        if (this.state.currentRecommendation === -1) {
            mainComponent = <div>Loading...</div>;
        } else {
            mainComponent = <MovieInformation 
                title={this.state.recommendations[this.state.currentRecommendation].title}
                description={this.state.recommendations[this.state.currentRecommendation].description}
                ageRating={this.state.recommendations[this.state.currentRecommendation].ageRating}
                poster_path={this.state.recommendations[this.state.currentRecommendation].poster_path}
            />
        }
        return (
            <div className="App">
                {mainComponent}
                {this.state.currentRecommendation === -1 ? null : 
                    <Explanation 
                        explanation={this.state.recommendations[this.state.currentRecommendation].explanation}
                        recommendation_title={this.state.recommendations[this.state.currentRecommendation].title}
                    />}
                {this.state.currentRecommendation === -1
                    ? null
                    : <div><div>
                        <span>I am interested in watching this film: </span>
                        <StarRatingComponent
                            name={"Interest"}
                            value={this.state.interest}
                            starCount={5}
                            onStarClick={(nextValue, prevValue, name) => {
                                this.setState({interest: nextValue})
                            }}
                        />
                    </div>
                    <div>
                        <span>I trust this recommendation: </span>
                        <StarRatingComponent
                            name={"Trust"}
                            value={this.state.trust}
                            starCount={5}
                            onStarClick={(nextValue, prevValue, name) => {
                                this.setState({trust: nextValue})
                            }}
                        />
                    </div>
                </div>}
                {this.state.interest !== 0 && this.state.trust !== 0
                    ? <button onClick={this.rateFilm}>Continue</button> 
                    : null
                }
            </div>
        );
    }
}

export default RecommendationsView;