import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import DiscussionField from './Field';
import formFields from './formFields';

class DiscussionForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={DiscussionField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div style={{ paddingTop: 20 }}>
        <h5 className="center">Create Discussion Post</h5>
        <form onSubmit={this.props.handleSubmit(this.props.onDiscussionSubmit)}>
          {this.renderFields()}
          <Link to="/home" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">clear</i>
          </Link>
          <button type="submit" className="green btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'Please provide some information.';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'discussionForm',
  destroyOnUnmount: false,
})(DiscussionForm);
