import React, { useState } from 'react';
import '../Style/Auth.css';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/authUtils';
import PasswordInput from '../components/PasswordInput';
import SocialAuthButtons from '../components/SocialAuthButtons';
import AuthFormContainer from '../components/AuthFormContainer';
import AuthInput from '../components/AuthInput';
import AuthFooter from '../components/AuthFooter';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
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
    setGeneralError('');
    setEmailError('');
    setPasswordError('');

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

    setIsLoading(true);

    try {
      const response = await api.auth.login({ email, password });
      
      // Check if we got a valid response
      if (response && response.token) {
        // Save authentication data
        localStorage.setItem('token', response.token);
        
        // Save user data if needed
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Notify components about authentication state change
        window.dispatchEvent(new Event('authStateChanged'));
        
        // Redirect to home page after successful login
        navigate('/');
      } else {
        setGeneralError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.message) {
        setGeneralError(error.message);
      } else {
        setGeneralError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Welcome back">
      {generalError && <div className="auth-error-message">{generalError}</div>}
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
            onClick={() => navigate('/login/ForgotPassword')}
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