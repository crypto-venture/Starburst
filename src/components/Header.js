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
        if (this.props.auth.access) {
          return [
            <li key="1">
              <Link to="/btc">Bitcoin</Link>
            </li>,
            <li key="3">
              <Link to="/profile">
                <i className="small material-icons left">person</i>Profile
              </Link>
            </li>,
            <li key="4">
              <a className="btn" href="/api/logout">
                Log out
              </a>
            </li>,
          ];
        } else {
          return (
            <li>
              <Link className="btn" to="/signup">
                Sign Up
              </Link>
            </li>
          );
        }
    }
  }

  render() {
    console.log(this.props.auth);
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? '/home' : '/'}
              className="left brand-logo"
              style={{ margin: '0 10px' }}
            >
              <span style={{ fontFamily: 'Permanent Marker' }}>
                Crypto Venture
                <i className="material-icons left">monetization_on</i>
              </span>
            </Link>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

// state.auth and return { auth: auth }
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
