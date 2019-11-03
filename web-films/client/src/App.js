import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
        recommendations: [],
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ recommendations: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/recommendations/445');
        const body = await response.json();
        console.log(body.recommendations)
        if (response.status !== 200) throw Error(body.message);

        return body.recommendations;
    };

    render() {
        const elementsList = this.state.recommendations.map((rec) => 
            <div>
                <span>{rec.movieId}</span>
                <span>{rec.title}</span>
            </div>
        );
        return (
            <div className="App">
                {elementsList}
            </div>
        );
    }
}

export default App;
