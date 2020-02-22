import React, { Component } from 'react';

import './App.css';

class ThankYouView extends Component {

    render() {
        return (
            <div className="text-root">
                <h1 className="main-header" >Thank you!</h1>
                <p>
                    Thank you for completing the study. We will contact the winner of the Amazon voucher at the end of the study period.
                </p>
            </div>
        );
    }
}

export default ThankYouView;