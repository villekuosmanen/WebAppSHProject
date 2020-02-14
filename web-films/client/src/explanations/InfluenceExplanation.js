import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class InfluenceExplanation extends Component {

    render() {
        return (
            <div>
                <div className="explanation-title">The following films you have rated influenced the recommendation the most:</div>
                <Container className="movie_card">
                    <Row>
                        <Col className="influence-subtitle">
                            Most positive influence:
                        </Col>
                    </Row>
                    {this.props.explanation.positives.map(obj => 
                        <Row noGutters={true}>
                            <Col xs={2}>
                                {obj.influence < 0
                                    ? <div className="influence-bar-negative" style={{width: (obj.influence * -100) + "%"}} />
                                    : null}
                            </Col>
                            <Col xs={2}>
                                {obj.influence > 0
                                    ? <div className="influence-bar-positive" style={{width: (obj.influence * 100) + "%"}} />
                                    : null}
                            </Col>
                            <Col xs={8} className="movie-title">{obj.title}</Col>
                        </Row>
                    )}
                    <Row>
                        <Col className="influence-subtitle">
                            Most negative influence:
                        </Col>
                    </Row>
                    {this.props.explanation.negatives.map(obj => 
                        <Row noGutters={true}>
                            <Col xs={2}>
                                {obj.influence < 0
                                    ? <div className="influence-bar-negative" style={{width: (obj.influence * -100) + "%"}} />
                                    : null}
                            </Col>
                            <Col xs={2}>
                                {obj.influence > 0
                                    ? <div className="influence-bar-positive" style={{width: (obj.influence * 100) + "%"}} />
                                    : null}
                            </Col>
                            <Col xs={8} className="movie-title">{obj.title}</Col>
                        </Row>
                    )}
                </Container>
            </div>
        );
    }
}