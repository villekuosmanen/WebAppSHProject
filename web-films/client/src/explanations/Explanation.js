import React, { Component } from 'react';

import BasicExplanation from "./BasicExplanation";
import AssociationRuleExplanation from "./AssociationRuleExplanation";
import InfluenceExplanation from "./InfluenceExplanation";

export default class Explanation extends Component {

    render() {
        if (this.props.explanation.type === 'A') {
            return <BasicExplanation />;
        } else if (this.props.explanation.type === 'B') {
            return <AssociationRuleExplanation 
                explanation={this.props.explanation} 
                recommendation_title={this.props.recommendation_title}
            />;
        } else if (this.props.explanation.type === 'C') {
            return <InfluenceExplanation explanation={this.props.explanation}/>;
        }
    }
}