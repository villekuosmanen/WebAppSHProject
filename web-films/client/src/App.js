import React, { Component } from 'react';
import './App.css';
import StartView from './StartView';
import RateMoviesView from './rate_movies/RateMoviesView';
import RecommendationsView from './explanations/RecommendationsView';
import EndView from './EndView';

class App extends Component {

    constructor(props) {
        super(props);
        // TODO get this from back-end
        const userId = 19546801
        this.state = {
            view: 0,
            userId: userId,
            adultMovies: true,
        };
    }

    advanceView = () => {
        this.setState({view: this.state.view + 1});
    }

    toggleAdultMovies = () => {
        this.setState({adultMovies: !this.state.adultMovies});
    }

    render() {
        let viewElement;
        if (this.state.view === 0) {
            viewElement = <StartView advanceView={this.advanceView} adultMovies={this.state.adultMovies} 
                toggleAdultMovies={this.toggleAdultMovies} />
        } else if (this.state.view === 1) {
            viewElement = <RateMoviesView advanceView={this.advanceView} userId={this.state.userId}
                adultMovies={this.state.adultMovies} />
        } else if (this.state.view === 2) {
            viewElement = <RecommendationsView advanceView={this.advanceView} 
                userId={this.state.userId} adultMovies={this.state.adultMovies} />
        } else if (this.state.view === 3) {
            viewElement = <EndView/>
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
