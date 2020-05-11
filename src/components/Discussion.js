import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDiscussions } from '../actions';

class Discussion extends Component {
  componentDidMount() {
    this.props.fetchDiscussions();
  }

  renderDiscussions() {
    return this.props.discussions.map((discussion) => {
      return (
        <div className="card darken-1" key={discussion.id}>
          <div className="card-content">
            <span className="card-title">{discussion.title}</span>
            <p>{discussion.content}</p>
            <p className="right">
              Created On: {new Date(discussion.created_on).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Likes: {discussion.likes}</a>
            <button className="blue btn">
              Like<i className="small material-icons right">thumb_up</i>
            </button>
            <a className="right">By: {discussion.author}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    const registerStyle = {
      paddingTop: 20,
      paddingBottom: 20,
    };
    return <div style={registerStyle}>{this.renderDiscussions()}</div>;
  }
}

function mapStateToProps({ discussions }) {
  return { discussions };
}

export default connect(mapStateToProps, { fetchDiscussions })(Discussion);
