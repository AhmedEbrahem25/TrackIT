import React, { useState } from 'react';
import AuthFormContainer from './AuthFormContainer';
import AuthInput from './AuthInput';
import { validateEmail } from './utils/authUtils';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to send reset code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Reset code sent to:', email);
      setSuccess(true);
    } catch (error) {
      console.error('Failed to send reset code:', error);
      setEmailError('Failed to send reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Forgot Password">
      {success ? (
        <div className="auth-success-message">
          <p>We've sent a password reset link to your email.</p>
          <p>Please check your inbox and follow the instructions.</p>
          <button
            className="auth-secondary-button"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </button>
        </div>
      ) : (
        <>
          <p className="auth-instructions">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <AuthInput
              id="email"
              type="email"
              label="Email Address"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              error={emailError}
              autoFocus
            />

            <button
              type="submit"
              className={`primary-button ${isLoading ? 'button-disabled button-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="auth-footer-links">
            <button
              className="auth-text-button"
              onClick={() => navigate('/login')}
            >
              Remember your password? Log in
            </button>
          </div>
        </>
      )}
    </AuthFormContainer>
  );
};

export default ForgotPassword;