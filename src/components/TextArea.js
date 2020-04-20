import React, { Component } from 'react';

class TextArea extends Component {
  //   componentDidMount() {
  //     const script = document.createElement('script');

  //     script.src = 'js/materialize.min.js';
  //     script.async = true;

  //     document.body.appendChild(script);
  //   }

  render() {
    return (
      <div className="row" style={{ marginBottom: '-10px' }}>
        {/* <input {...input} type={type} style={{ marginBottom: '5px' }} /> */}
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              className="materialize-textarea"
            ></textarea>
            <label>Bio</label>
          </div>
        </div>
      </div>
    );
  }
}

export default TextArea;
