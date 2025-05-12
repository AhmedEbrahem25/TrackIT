import React, { useState } from 'react';
import '../Style/Auth.css';
import { validateEmail, calculatePasswordStrength } from '../utils/authUtils';
import SocialAuthButtons from '../components/SocialAuthButtons';
import PasswordInput from '../components/PasswordInput';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput';
import AuthFormContainer from '../components/AuthFormContainer';
import api from '../utils/api';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (firstNameError) setFirstNameError('');
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (lastNameError) setLastNameError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
    if (passwordError) setPasswordError('');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Validate inputs
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    }

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
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    try {
      
      const response = await api.auth.register({
        firstName,
        lastName,
        email,
        password
      });

      // Save token to localStorage
      localStorage.setItem('token', response.token);
      
      // Save user data if available
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        // Create a basic user object if not provided by API
        const userData = {
          firstName,
          lastName,
          email
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      // Trigger auth state change event
      window.dispatchEvent(new Event('authStateChanged'));
      
      // Redirect to home page after successful registration
      navigate('/');
    } catch (error) {
      console.error('Sign up failed:', error);
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          // Handle validation errors from server
          error.response.data.errors.forEach(err => {
            if (err.param === 'firstName') setFirstNameError(err.msg);
            if (err.param === 'lastName') setLastNameError(err.msg);
            if (err.param === 'email') setEmailError(err.msg);
            if (err.param === 'password') setPasswordError(err.msg);
          });
        } else if (error.response.data.msg) {
          setGeneralError(error.response.data.msg);
        }
      } else {
        setGeneralError('Sign up failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Sign up">
      {generalError && <div className="auth-error-message">{generalError}</div>}
      <form className="auth-form" onSubmit={handleSignUp}>
        <div className="name-fields">
          <AuthInput
            id="firstName"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            onChange={handleFirstNameChange}
            error={firstNameError}
            required
          />
          <AuthInput
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onChange={handleLastNameChange}
            error={lastNameError}
            required
          />
        </div>

        <AuthInput
          id="email"
          type="email"
          label="Email"
          placeholder="name@email.com"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          required
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Create password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          showStrength={true}
          strength={passwordStrength}
        />

        <button
          type="submit"
          className={`primary-button ${isLoading ? 'button-disabled button-loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Submitting...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>

      <SocialAuthButtons />

      <p className="auth-footer">
        Already have an account?{' '}
        <a href="/login" className="auth-link">
          Log in
        </a>
      </p>
    </AuthFormContainer>
  );
};

export default SignUp;