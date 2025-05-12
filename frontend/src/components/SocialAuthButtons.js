import React from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa'; // Import icons from react-icons
import './../Style/SocialButton.css';

const SocialAuthButtons = () => {
  const socialButtons = [
    {
      className: 'google-button',
      Icon: FaGoogle, // Use the Google icon from react-icons
      label: 'Continue with Google',
    },
    {
      className: 'facebook-button',
      Icon: FaFacebookF, // Use the Facebook icon from react-icons
      label: 'Continue with Facebook',
    },
    {
      className: 'apple-button',
      Icon: FaApple, // Use the Apple icon from react-icons
      label: 'Continue with Apple',
    },
  ];

  return (
    <>
      {/* Divider Section */}
      <div className="divider">
        <div className="divider-line"></div>
        <span className="divider-text">or</span>
        <div className="divider-line"></div>
      </div>

      {/* Social Buttons Section */}
      <div className="social-buttons-container">
        {socialButtons.map((button, index) => (
          <button key={index} className={`social-button ${button.className}`}>
            <button.Icon className="social-icon" /> {/* Render the icon */}
            {button.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default SocialAuthButtons;