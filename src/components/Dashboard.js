import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDiscussions } from '../actions';
// import Discussion from './Discussion';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchDiscussions();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <p>Hey there!</p>
      </div>
    );
  }
}

function mapStateToProps({ hello }) {
  return { hello };
}

export default connect(mapStateToProps, { fetchDiscussions })(Dashboard);
