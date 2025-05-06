import React, { useState } from 'react';
import './../../components/Style/Auth.css';
import { validateEmail, calculatePasswordStrength } from './utils/authUtils';
import SocialAuthButtons from './SocialAuthButtons';
import PasswordInput from './PasswordInput';
import { useNavigate } from 'react-router-dom';
import AuthInput from './AuthInput';
import AuthFormContainer from './AuthFormContainer';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setFullName(e.target.value);
    if (nameError) setNameError('');
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

    // Validate inputs
    let isValid = true;

    if (!fullName.trim()) {
      setNameError('Full name is required');
      isValid = false;
    } else if (/\d/.test(fullName)) {
      setNameError('Full name cannot contain numbers');
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
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    } else if (passwordStrength < 3) {
      setPasswordError('Please create a stronger password');
      isValid = false;
    }

    if (!isValid) return;

    // Handle signup logic
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Signing up with:', { fullName, email, password });
      navigate('/welcome'); // Redirect to a welcome page after successful signup
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Sign up">
      <form className="auth-form" onSubmit={handleSignUp}>
        <AuthInput
          id="fullName"
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={handleNameChange}
          error={nameError}
          required
        />

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