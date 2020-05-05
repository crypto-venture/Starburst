import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    const registerStyle = {
      paddingTop: 50,
      paddingBottom: 50,
    };

    return (
      <div style={registerStyle}>
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card-panel grey lighten-5 z-depth-1">
            <div className="row valign-wrapper">
              <div className="col s2">
                <img
                  src={require('../images/swag.jpg')}
                  alt=""
                  className="circle responsive-img"
                ></img>
              </div>
              <div className="col s10">
                <span className="black-text">
                  {/* This is a square image. Add the "circle" class to it to make
                  it appear circular. */}
                  Hi! My name is Bobby and I am a swag boy. I have a hat that
                  says DOPE.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div>
      //   <img src="../../images/swag.jpg"></img>
      // </div>
    );
  }
}

export default Profile;
