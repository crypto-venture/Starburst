import React from 'react';

const handleChange = (handler) => ({ target: { files } }) =>
  handler(files.length ? { file: files[0], name: files[0].name } : {});

export default ({
  label,
  input: { onChange, onBlur, value: omitValue, ...inputProps },
  meta: omitMeta,
  ...props
}) => (
  <div>
    <div className="col s12 left">
      <label className="left">{label}</label>
    </div>
    {/* <input
      type="file"
      onChange={handleChange(onChange)}
      onBlur={handleChange(onBlur)}
      {...inputProps}
      {...props}
      style={{ marginBottom: '15px' }}
    /> */}
    <div className="file-field input-field">
      <div className="btn">
        <span>File</span>
        <input
          type="file"
          onChange={handleChange(onChange)}
          onBlur={handleChange(onBlur)}
          {...inputProps}
          {...props}
          accept="image/x-png,image/gif,image/jpeg"
          style={{ marginBottom: '15px' }}
        />
      </div>
      <div className="file-path-wrapper">
        <input
          className="file-path validate"
          type="text"
          placeholder="Upload File"
        />
      </div>
    </div>
  </div>
);
