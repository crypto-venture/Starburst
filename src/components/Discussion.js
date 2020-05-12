import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDiscussions, likeDiscussion } from '../actions';
import Like from './Like';

class Discussion extends Component {
  componentDidMount() {
    this.props.fetchDiscussions();
  }

  state = {
    discussion: [],
  };

  likeIt(event) {
    const value = event.target.value;
    const arr = this.state.discussion;
    const likeDisc = this.props.likeDiscussion.bind(this.setState);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        this.setState((state) => {
          likeDisc(value, 0);
          const discussion = state.discussion.filter((num) => value !== num);
          console.log('popopopop');

          return {
            discussion,
          };
        });
        window.location.reload(false);
        console.log('yooooo');
        return;
      }
    }
    this.setState((state) => {
      const discussion = state.discussion.concat(value);
      this.props.likeDiscussion(value, 1);

      return {
        discussion,
      };
    });

    console.log(this.state.discussion);
    console.log('hiiiiiii');
    window.location.reload(false);
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
            {/* <a>Likes: {discussion.likes}</a> */}
            <Like likes={discussion.likes} />
            <button
              value={discussion.id}
              onClick={(event) => this.likeIt(event)}
              className="blue btn"
            >
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
      paddingTop: 10,
      paddingBottom: 20,
    };
    return <div style={registerStyle}>{this.renderDiscussions()}</div>;
  }
}

function mapStateToProps({ discussions }) {
  return { discussions };
}

export default connect(mapStateToProps, { fetchDiscussions, likeDiscussion })(
  Discussion
);
