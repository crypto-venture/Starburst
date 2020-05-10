import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLogin } from '../actions';
import Error from './Error';

class Authenticator extends Component {
  renderContent() {
    if (this.props.auth.access) {
      return <div></div>;
    } else {
      return <Error />;
    }
  }
  render() {
    return <div></div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { onLogin })(Authenticator);
