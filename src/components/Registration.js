import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RegisterField from './Field.js';
import FileInput from './FileInput';
import TextArea from './TextArea';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { onRegister } from '../actions';

class Registration extends Component {
  render() {
    const registerStyle = {
      paddingTop: 50,
      paddingBottom: 50,
    };

    return (
      <div style={registerStyle}>
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="card darken-1">
              <div className="card-content">
                <span className="card-title center">Create your account</span>
                <form
                  onSubmit={this.props.handleSubmit((values) => {
                    const history = this.props.history;
                    this.props.onRegister(values, history);
                  })}
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
                  <Link to="/">
                    <button className="red white-text btn-flat">
                      Back
                      <i className="material-icons right">keyboard_backspace</i>
                    </button>
                  </Link>
                  <button
                    className="right btn-flat green white-text"
                    type="submit"
                  >
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
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!re.test(values.email)) {
    errors.email = 'Provided email is not valid.';
  }

  if (values.password !== values.re_password) {
    errors.password = "Passwords don't match.";
    errors.re_password = "Passwords don't match.";
  }

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

Registration = connect(null, { onRegister })(withRouter(Registration));

//options object inside redux form helper
export default reduxForm({
  validate,
  form: 'registerForm',
})(Registration);
