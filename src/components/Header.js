import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <li>
            <Link className="btn" to="/signup">
              Sign Up
            </Link>
          </li>
        );
      default:
        return [
          <li key="1">
            <a href="">Bitcoin</a>
          </li>,
          <li key="2">
            <a href="">Ethereum</a>
          </li>,
          <li key="3">
            <Link to="/profile">My Profile</Link>
          </li>,
          //   <li key="3" style={{ margin: '0 10px' }}>
          //     Credits: {this.props.auth.credits}
          //   </li>,
          <li key="4">
            <a href="/api/logout">Logout</a>
            {/* <Link className="btn" to="/signup">
              Sign Up
            </Link> */}
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/home' : '/'}
            className="left brand-logo"
            style={{ margin: '0 10px' }}
          >
            <span style={{ fontFamily: 'Permanent Marker' }}>
              Crypto Venture
              <i className="large material-icons">monetization_on</i>
            </span>
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

// state.auth and return { auth: auth }
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
