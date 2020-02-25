import React, { Component } from 'react';
import './App.css';
import StartView from './StartView';
import RateMoviesView from './rate_movies/RateMoviesView';
import RecommendationsView from './explanations/RecommendationsView';
import EndView from './EndView';
import ThankYouView from './ThankYouView'
import FatalErrorView from './FatalErrorView'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 0,
            adultMovies: true,
            render500ErrorPage: false,
            responses: null,
        };
    }

    advanceView = () => {
        this.setState({view: this.state.view + 1});
    }

    toggleAdultMovies = () => {
        this.setState({adultMovies: !this.state.adultMovies});
    }

    render500ErrorPage = () => {
        this.setState({render500ErrorPage: true});
    }

    restartStudy = () => {
        this.setState({view: 0, adultMovies: true, render500ErrorPage: false});
    }

    saveResponses = (responses) => {
        this.setState({responses: responses});
    }

    saveRecommendations = (recommendations) => {
        this.setState({recommendations: recommendations});
    }

    render() {
        let viewElement;
        if (this.state.render500ErrorPage) {
            viewElement = <FatalErrorView restartStudy={this.restartStudy} />
        }
        else if (this.state.view === 0) {
            viewElement = <StartView
                advanceView={this.advanceView}
                adultMovies={this.state.adultMovies} 
                toggleAdultMovies={this.toggleAdultMovies}
            />
        } else if (this.state.view === 1) {
            viewElement = <RateMoviesView 
                advanceView={this.advanceView}
                render500ErrorPage={this.render500ErrorPage} 
                adultMovies={this.state.adultMovies}
                saveRecommendations={this.saveRecommendations}
            />
        } else if (this.state.view === 2) {
            viewElement = <RecommendationsView 
                advanceView={this.advanceView}
                recommendations={this.state.recommendations}
                render500ErrorPage={this.render500ErrorPage} 
                adultMovies={this.state.adultMovies} 
                saveResponses={this.saveResponses} 
            />
        } else if (this.state.view === 3) {
            viewElement = <EndView 
                advanceView={this.advanceView}
                responses={this.state.responses}
                render500ErrorPage={this.render500ErrorPage} 
            />
        } else if (this.state.view === 4) {
            viewElement = <ThankYouView />
        }
        return (
            <div className="App">
                <div className="App">
                    {viewElement}
                </div>
                <footer className="footer">
                    <img src={"st_andrews_logo.png"} alt={"University of St Andrews Logo"} height={"88px"} width={"200px"} />
                    <img src={"tmdb_logo.png"} alt={"The Movie Database Logo"} height={"85px"} width={"82px"} />
                    <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                </footer>
            </div>
        );
    }
}

export default App;
