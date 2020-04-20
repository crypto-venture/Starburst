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
    <form action="#">
      <div class="file-field input-field">
        <div class="btn">
          <span>File</span>
          <input
            type="file"
            onChange={handleChange(onChange)}
            onBlur={handleChange(onBlur)}
            {...inputProps}
            {...props}
            style={{ marginBottom: '15px' }}
          />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
    </form>
  </div>
);
