// Field contains logic to render a single input
import React from 'react';

// {touched && error} - if touched is true, js will evaluate the entire statement and if error contains a string, that string will be returned.
// if touched is false, js will not execute boolean statement.
// props.input - event handlers from redux form
export default ({ input, type, label, meta: { error, touched } }) => {
  return (
    <div>
      <label className="left">{label}</label>
      <input {...input} type={type} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
