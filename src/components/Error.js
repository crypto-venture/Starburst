import React, { Component } from 'react';
import Login from './Login';

class Error extends Component {
  render() {
    const registerStyle = {
      paddingTop: 20,
      paddingBottom: 20,
    };

    // const { from } = this.props.location.state || { from: { pathname: '/' } };

    return (
      <div className="row" style={registerStyle}>
        <div className="col s10 offset-s1 card blue-grey darken-1">
          <div className="card-content white-text center">
            <span className="card-title center">Aw snap!</span>
            <img
              style={registerStyle}
              src={require('../images/jahan-ghofraniha.jpg')}
              alt=""
              className="circle responsive-img"
            ></img>
            <p className="center">
              Thank you Professor Ghofraniha for an eventful semester! 🤓
            </p>
            <h4 style={{ paddingBottom: -20 }}>Please Sign-in again.</h4>
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
