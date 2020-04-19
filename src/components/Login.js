import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import LoginField from './Field.js';

class Login extends Component {
  render() {
    const loginStyle = {
      paddingTop: 50,
      //   textAlign: 'center',
    };

    return (
      <div style={loginStyle}>
        <div className="row">
          <div className="col s4 offset-s4">
            <div className="card darken-1">
              <div className="card-content">
                <span className="card-title">Sign in</span>
                <form
                  onSubmit={this.props.handleSubmit((values) =>
                    console.log(values)
                  )}
                >
                  <Field
                    label="Username"
                    type="text"
                    name="username"
                    component={LoginField}
                  />
                  <Field
                    label="Password"
                    type="password"
                    name="password"
                    component={LoginField}
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
  return errors;
}

//options object inside redux form helper
export default reduxForm({
  validate,
  form: 'loginForm',
})(Login);
