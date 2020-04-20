import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RegisterField from './Field.js';
import FileInput from './FileInput';
import TextArea from './TextArea';

class Registration extends Component {
  render() {
    const registerStyle = {
      paddingTop: 50,
      //   textAlign: 'center',
    };

    return (
      <div style={registerStyle}>
        <div className="row">
          <div className="col s4 offset-s4">
            <div className="card darken-1">
              <div className="card-content">
                <span className="card-title center">Create your account</span>
                <form
                  onSubmit={this.props.handleSubmit(
                    this.props.submitRegistration
                  )}
                >
                  <Field
                    label="Email"
                    type="text"
                    name="email"
                    component={RegisterField}
                  />
                  <Field
                    label="Username"
                    type="text"
                    name="username"
                    component={RegisterField}
                  />
                  <Field
                    label="Password"
                    type="password"
                    name="password"
                    component={RegisterField}
                  />
                  <Field
                    label="Re-enter password"
                    type="password"
                    name="re_password"
                    component={RegisterField}
                  />
                  <Field
                    label="Profile Picture"
                    type="file"
                    name="profile-pic"
                    component={FileInput}
                  />
                  <Field
                    label="Bio"
                    type="text"
                    name="bio"
                    component={TextArea}
                  />
                  <button className="btn-flat teal white-text" type="submit">
                    Continue
                    <i className="material-icons right">done</i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please provide a username.\n';
  }
  if (!values.password) {
    errors.password = 'Please provide a password.\n';
  }
  if (!values.email) {
    errors.email = 'Please provide an email.\n';
  }
  if (!values.password) {
    errors.password = 'Please provide a password.\n';
  }
  if (!values.re_password) {
    errors.re_password = 'Please re-enter above password.\n';
  }
  //   if (!values.bio) {
  //     errors.bio = 'Please enter a bio about yourself.\n';
  //   }
  return errors;
}

//options object inside redux form helper
export default reduxForm({
  validate,
  form: 'registerForm',
})(Registration);
