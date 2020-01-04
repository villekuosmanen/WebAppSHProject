import React, { Component } from 'react';
import './App.css';

class RecommendationsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommendations: [],
        };
    }

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
                <button onClick={this.props.advanceView}>Continue</button>
            </div>
        );
    }
}

export default RecommendationsView;