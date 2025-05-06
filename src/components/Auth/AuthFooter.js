import React from 'react';
import './../Style/Auth.css';

const AuthFooter = ({ text, linkText, linkPath, linkAriaLabel }) => {
  return (
    <p className="auth-footer">
      {text}{' '}
      <a
        href={linkPath}
        className="auth-link"
        aria-label={linkAriaLabel || linkText}
      >
        {linkText}
      </a>
    </p>
  );
};

export default AuthFooter;