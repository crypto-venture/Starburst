import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { fetchDiscussions } from '../actions';
import Discussion from './Discussion';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h4 className="center">
          Discussion Feed{' '}
          {/* <span role="img" aria-label="jsx-a11y/accessible-emoji">
            💬
          </span> */}
        </h4>
        <Discussion />
        <div className="fixed-action-btn">
          <Link to="/discussions/create" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
