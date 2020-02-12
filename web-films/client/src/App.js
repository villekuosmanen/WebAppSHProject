import React, { Component } from 'react';
import './App.css';
import StartView from './StartView';
import RateMoviesView from './RateMoviesView';
import RecommendationsView from './RecommendationsView';
import EndView from './EndView';

class App extends Component {

    constructor(props) {
        super(props);
        // TODO get this from back-end
        const userId = 19546801
        this.state = {
            view: 0,
            userId: userId,
        };
    }

    advanceView = () => {
        this.setState({view: this.state.view + 1});
    }

    render() {
        let viewElement;
        if (this.state.view === 0) {
            viewElement = <StartView advanceView={this.advanceView} />
        } else if (this.state.view === 1) {
            viewElement = <RateMoviesView advanceView={this.advanceView} userId={this.state.userId} />
        } else if (this.state.view === 2) {
            viewElement = <RecommendationsView advanceView={this.advanceView} userId={this.state.userId} />
        } else if (this.state.view === 3) {
            viewElement = <EndView/>
        }
        return (
            <div className="App">
                {viewElement}
                <div className="footer">
                    Legal text and images
                </div>
            </div>
        );
    }
}

export default App;
