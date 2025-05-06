import React, { useState } from 'react';
import './../../components/Style/Auth.css';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from './utils/authUtils';
import PasswordInput from './PasswordInput';
import SocialAuthButtons from './SocialAuthButtons';
import AuthFormContainer from './AuthFormContainer';
import AuthInput from './AuthInput';
import AuthFooter from './AuthFooter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) return;

    // Handle login logic
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Logging in with:', { email, password });
      // Here you would typically make an API call to authenticate
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error);
      setPasswordError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Welcome back">
      <form className="auth-form" onSubmit={handleLogin}>
        <AuthInput
          id="email"
          type="email"
          label="Email"
          placeholder="name@email.com"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          autoFocus
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />

        <div className="auth-footer-links">
          <button
            type="button"
            className="auth-text-button"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className={`primary-button ${isLoading ? 'button-disabled button-loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>

      <div className="divider">
        <div className="divider-line"></div>
        <span className="divider-text">or</span>
        <div className="divider-line"></div>
      </div>

      <SocialAuthButtons />

      <AuthFooter
        text="New to Coursera?"
        linkText="Sign up"
        linkPath="/signup"
        linkAriaLabel="Sign up for a new account"
      />
    </AuthFormContainer>
  );
};

export default Login;