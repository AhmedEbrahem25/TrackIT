import React from 'react';
const SocialButton = ({ className, iconPath, label }) => (
  <button type="button" className={`social-button ${className}`}>
    <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d={iconPath} />
    </svg>
    {label}
  </button>
);

export default SocialButton;