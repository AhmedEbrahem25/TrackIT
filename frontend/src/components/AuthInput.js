import React from 'react';
import './../Style/Auth.css';

const AuthInput = ({
  id,
  type = 'text',
  label,
  value,
  onChange,
  error,
  placeholder = '',
  ariaInvalid,
  required = false,
  ...props
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={id}>
          {label} {required && <span className="required-indicator">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? 'input-field-error' : ''}`}
        aria-invalid={ariaInvalid || (error ? 'true' : 'false')}
        {...props}
      />
      {error && <span className="error-text" role="alert">{error}</span>}
    </div>
  );
};

export default AuthInput;