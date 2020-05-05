import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

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
            <Link to="/profile">
              <i className="small material-icons left">person</i>Profile
            </Link>
          </li>,
          // //   <li key="3" style={{ margin: '0 10px' }}>
          // //     Credits: {this.props.auth.credits}
          // //   </li>,
          <li key="4">
            <a className="btn" href="/api/logout">
              Log out
            </a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a href="#!">one</a>
          </li>
          <li>
            <a href="#!">two</a>
          </li>
          <li class="divider"></li>
          <li>
            <a href="#!">three</a>
          </li>
        </ul>
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
