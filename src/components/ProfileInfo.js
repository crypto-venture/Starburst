import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import FileInput from './FileInput';
import TextArea from './TextArea';
import M from 'materialize-css';

class ProfileInfo extends Component {
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  renderModal() {
    return (
      <div className="row valign-wrapper">
        <div className="col s10 offset-s1">
          <form onSubmit={this.props.handleSubmit}>
            <Field label="Bio" type="text" name="bio" component={TextArea} />
            <Field
              label="Profile Picture"
              type="file"
              name="profile-pic"
              component={FileInput}
            />
            <button className="right btn green white-text" type="submit">
              Save
              <i className="material-icons right">check_circle</i>
            </button>
          </form>
        </div>
      </div>
    );
  }

  render() {
    const registerStyle = {
      paddingTop: 0,
      paddingBottom: 50,
    };

    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3" style={registerStyle}>
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s12">
              <h4>Email</h4>
              <p>john.doe@gmail.com</p>
              <h4>Username</h4>
              <p>bobby_swag</p>
              <h4>Password</h4>
              <p>********</p>
              <a className="btn waves-light modal-trigger" href="#modal2">
                Edit Profile
              </a>
              <div id="modal2" className="modal">
                <div className="modal-content">
                  <h4>Edit Profile Information</h4>
                  {this.renderModal()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ProfileInfo = connect(null, { onRegister })(withRouter(ProfileInfo));

//options object inside redux form helper
export default reduxForm({
  form: 'ProfileInfoForm',
})(ProfileInfo);
