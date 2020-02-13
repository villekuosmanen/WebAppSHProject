import React, { Component } from 'react';

export default class InfluenceExplanation extends Component {

    render() {
        return (
            <div>
                <div>The following films you have rated influenced the recommendation the most:</div>
                <div className="movie_card">
                    {this.props.explanation.positives.map(obj => 
                        <div className="row">
                            <div className="col-2" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                                {obj.influence < 0
                                    ? <div style={{width: (obj.influence * -100) + "%", backgroundColor: "#b80000",
                                        float: "right", height: "100%"}} />
                                    : null}
                            </div>
                            <div className="col-2" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                                {obj.influence > 0
                                    ? <div style={{width: (obj.influence * 100) + "%", backgroundColor: "#00b806", 
                                        float: "left", height: "100%"}} />
                                    : null}
                            </div>
                            <div className="col-8 movie-title">{obj.title}</div>
                        </div>
                    )}
                    {this.props.explanation.negatives.map(obj => 
                        <div className="row">
                            <div className="col-2" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                                {obj.influence < 0
                                    ? <div style={{width: (obj.influence * -100) + "%", backgroundColor: "#b80000",
                                        float: "right", height: "100%"}} />
                                    : null}
                            </div>
                            <div className="col-2" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                                {obj.influence > 0
                                    ? <div style={{width: (obj.influence * 100) + "%", backgroundColor: "#00b806", 
                                        float: "left", height: "100%"}} />
                                    : null}
                            </div>
                            <div className="col-8 movie-title">{obj.title}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}