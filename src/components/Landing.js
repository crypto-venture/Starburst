import React, { Component } from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../actions';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent() {
    if (this.props.auth) {
      return (
        <div style={{ paddingTop: 100 }}>
          <Link to="/home" className="black-text btn btn-large lime lighten-2">
            Go Back To Home<i className="material-icons right">home</i>
          </Link>
        </div>
      );
    } else {
      return <Login />;
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Hello!</h1>
        Invest in cryptocurrencies the right way.
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(Landing);
