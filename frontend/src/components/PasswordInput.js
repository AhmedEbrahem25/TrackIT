import React, { useState } from 'react';
import './../Style/Auth.css';

const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  showStrength = false,
  onStrengthChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    if (onStrengthChange) onStrengthChange(strength);
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    onChange(e);
    if (showStrength) calculateStrength(newPassword);
  };

  const getStrengthColor = () => {
    if (value.length === 0) return '#ddd';
    const strength = calculateStrength(value);
    if (strength <= 1) return '#e74c3c';
    if (strength <= 3) return '#f39c12';
    return '#27ae60';
  };

  return (
    <div className="input-group">
      <label className="input-label" htmlFor={id}>{label}</label>
      <div className="password-container">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={handlePasswordChange}
          className={`input-field ${error ? 'input-field-error' : ''}`}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      
      {showStrength && value && (
        <>
          <div className="strength-meter">
            <div 
              className="strength-indicator"
              style={{
                width: `${(calculateStrength(value) / 5) * 100}%`,
                backgroundColor: getStrengthColor()
              }}
            ></div>
          </div>
          <div className="strength-text" style={{color: getStrengthColor()}}>
            Password strength: {(() => {
              if (value.length === 0) return '';
              const strength = calculateStrength(value);
              if (strength <= 1) return 'Weak';
              if (strength <= 3) return 'Moderate';
              return 'Strong';
            })()}
          </div>
        </>
      )}
      
      {error && <span className="error-text" role="alert">{error}</span>}
    </div>
  );
};

export default PasswordInput;