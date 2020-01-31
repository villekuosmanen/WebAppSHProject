import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import './App.css';

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
            .catch(err => console.log(err));
    }
    
    getRecommendations = async () => {
        const response = await fetch(`/recommendations/${this.props.userId}/recommendations`);
        const body = await response.json();
        console.log(body.recommendations)
        if (response.status !== 200) throw Error(body.message);
    
        return body.recommendations;
    };

    rateFilm = () => {
        this.state.responses.push({interest: this.state.interest, trust: this.state.trust});
        if (this.state.currentRecommendation === this.state.recommendations.length - 1) {
            this.sendDataToServer()
                .then(() => this.props.advanceView());
        } else {
            this.setState({currentRecommendation: this.state.currentRecommendation + 1, interest: 0, trust: 0});
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
        let explanation = null;
        if (this.state.currentRecommendation === -1) {
            mainComponent = <div>Loading...</div>;
        } else {
            const rec = this.state.recommendations[this.state.currentRecommendation];
            mainComponent = <div>
                <span>{rec.movieId}</span>
                <span>{rec.title}</span>
            </div>;
            
            if ('explanation' in rec) {
                explanation = <div>
                    <div>This film was recommended because you have rated the following films:</div>
                    <div>
                        {rec.explanation.map(obj => <div>{obj.title}</div>)}
                    </div>
                </div>
            } else {
                explanation = <div>This film was recommended because you are similar to users who liked it.</div>;
            }
        }
        return (
            <div className="App">
                {mainComponent}
                {explanation}
                {this.state.currentRecommendation === -1
                    ? <div />
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
                    : <div />
                }
            </div>
        );
    }
}

export default RecommendationsView;