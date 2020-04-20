import React from 'react';

export default ({ input, type, label, meta: { error, touched } }) => {
  return (
    <div className="row">
      {/* <label className="left">{label}</label> */}
      {/* <input {...input} type={type} style={{ marginBottom: '5px' }} /> */}
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              className="materialize-textarea"
            ></textarea>
            <label for="textarea1">Bio</label>
          </div>
        </div>
      </form>
    </div>
  );
};
