import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import DiscussionForm from './DiscussionForm';
import DiscussionFormReview from './DiscussionFormReview';

class CreateDiscussion extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <DiscussionFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <DiscussionForm
        onDiscussionSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

//options object inside redux form helper
export default reduxForm({
  form: 'discussionForm',
})(CreateDiscussion);
