import React, { Component } from 'react';

export default class AssociationRuleExplanation extends Component {

    render() {
        return (

            <div>
                <div className="explanation-title">This film was recommended because your previously rated films suggests you might like it:</div>
                <div className="movie_card">
                    {this.props.explanation.rule.map((obj, index) => {
                        return <span>
                            {index > 0 ? <span> + </span> : null}
                            <span className="movie-title">{obj.title}</span>
                        </span>;
                    })}
                    <span> => </span>
                    <span className="movie-title">{this.props.recommendation_title}</span>
                </div>
            </div>
        );
    }
}