import React, { Component } from 'react';
import './App.css';
import StartView from './StartView';
import RateMoviesView from './RateMoviesView';
import RecommendationsView from './RecommendationsView';
import EndView from './EndView';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 0,
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
            viewElement = <RateMoviesView advanceView={this.advanceView} />
        } else if (this.state.view === 2) {
            viewElement = <RecommendationsView advanceView={this.advanceView} />
        } else if (this.state.view === 3) {
            viewElement = <EndView/>
        }
        return (
            <div className="App">
                {viewElement}
            </div>
        );
    }
}

export default App;
