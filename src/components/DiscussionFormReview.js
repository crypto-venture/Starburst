import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

const DiscussionFormReview = ({
  onCancel,
  formValues,
  createDiscussion,
  history,
}) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div style={{ paddingBottom: 20 }} key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div style={{ paddingTop: 20 }}>
      {/* <h5 className="center" style={{ paddingTop: 20 }}>
        Confirm Discussion Post
      </h5> */}
      <div className="card darken-1">
        <div className="card-content">
          <span className="card-title center">Confirm Discussion Post</span>
          <p style={{ paddingBottom: 10 }}>{reviewFields}</p>
        </div>
      </div>
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
        <i className="material-icons right">backspace</i>
      </button>
      <button
        onClick={() => createDiscussion(formValues, history)}
        className="green btn-flat right white-text"
      >
        Post Discussion
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.discussionForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(DiscussionFormReview));
