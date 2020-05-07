import React, { Component } from 'react';

class Bitcoin extends Component {
  render() {
    const registerStyle = {
      paddingTop: 20,
      paddingBottom: 20,
    };

    return (
      <div className="row">
        <div style={registerStyle}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">BTC</span>
              <p>Bitcoin</p>
              {/* <p className="right">
            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
          </p> */}
            </div>
            {/* <div className="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
        </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Bitcoin;
