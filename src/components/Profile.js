import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import FileInput from './FileInput';
import TextArea from './TextArea';
import M from 'materialize-css';
import { connect } from 'react-redux';
import ProfileInfo from './ProfileInfo';
import { fetchUser } from '../actions';

class Profile extends Component {
  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
    this.props.fetchUser();
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
      paddingTop: 20,
      paddingBottom: 20,
    };
    console.log(this.props.auth);
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3" style={registerStyle}>
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s2">
              <img
                src={require('../images/swag.jpg')}
                alt=""
                className="circle responsive-img"
              ></img>
            </div>
            <div className="col s9">
              <span className="black-text">{}</span>
            </div>
            <div className="col s1">
              <a
                className="btn-floating btn-large waves-light red modal-trigger"
                href="#modal1"
              >
                <i className="material-icons">edit</i>
              </a>
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h4>Edit Bio & Picture</h4>
                  {this.renderModal()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfileInfo author={this.props.auth} />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

Profile = connect(mapStateToProps, { fetchUser })(Profile);

//options object inside redux form helper
export default reduxForm({
  form: 'BioPictureForm',
})(Profile);
