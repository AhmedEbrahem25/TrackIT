import React from 'react';
import PropTypes from 'prop-types';

const AuthFormContainer = ({ 
  title, 
  subtitle,
  children, 
  className = '', 
  maxWidth = '420px',
  headerSpacing = 'md',
  showLogo = false,
  logo = null
}) => {
  return (
    <div 
      className={`auth-container ${className}`}
      style={{ '--max-width': maxWidth }}
    >
      {showLogo && (
        <div className="auth-logo-container">
          {logo || <div className="auth-default-logo">Your Logo</div>}
        </div>
      )}
      
      <div className={`auth-header header-spacing-${headerSpacing}`}>
        {title && <h1 className="auth-title">{title}</h1>}
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
      </div>

      <div className="auth-content">
        {children}
      </div>
    </div>
  );
};

AuthFormContainer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
  headerSpacing: PropTypes.oneOf(['sm', 'md', 'lg']),
  showLogo: PropTypes.bool,
  logo: PropTypes.node
};

export default AuthFormContainer;