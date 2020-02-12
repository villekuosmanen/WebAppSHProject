import React, { Component } from 'react';

export default class Explanation extends Component {

    render() {
        if (this.props.explanation.type === 'A') {
            return (
                <div>
                    This film was recommended because you are similar to users who liked it.
                </div>
            );
        } else if (this.props.explanation.type === 'B') {
            return (
                <div>
                    <div>This film was recommended because you have rated the following films:</div>
                    <div>
                        {this.props.explanation.rule.map(obj => <div>{obj.title}</div>)}
                    </div>
                </div>
            );
        } else if (this.props.explanation.type === 'C') {
            return (
                <div>
                    <div>The following films you have rated influenced the recommendation the most:</div>
                    <div>
                        {this.props.explanation.positives.map(obj => <div>{obj.title}</div>)}
                    </div>
                </div>
            );
        }
    }
}