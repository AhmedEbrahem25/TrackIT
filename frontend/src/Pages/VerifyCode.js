import React, { useState, useRef, useEffect } from 'react';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  
  // Auto-focus the first input on component mount
  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleCodeChange = (index, value) => {
    // Only accept numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');
    
    // Auto-focus next input if current one is filled
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace - move to previous input when empty
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    
    // Handle left arrow key
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    
    // Handle right arrow key
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content is exactly 4 digits
    if (/^\d{4}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      inputRefs[3].current?.focus();
    }
  };

  const handleVerify = async () => {
    // Validate all digits are entered
    if (code.some(digit => digit === '')) {
      setError('Please enter all digits');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes: consider code 1234 as correct
      const enteredCode = code.join('');
      if (enteredCode === '1234') {
        setSuccess(true);
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = (e) => {
    e.preventDefault();
    // Reset states
    setCode(['', '', '', '']);
    setError('');
    setSuccess(false);
    setIsLoading(true);
    
    // Simulate code resend
    setTimeout(() => {
      setIsLoading(false);
      inputRefs[0].current?.focus();
    }, 1000);
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '1.5rem'
    },
    instructions: {
      color: '#666',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    inputContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '1.5rem',
      width: '100%',
      justifyContent: 'center'
    },
    input: {
      width: '56px',
      height: '56px',
      textAlign: 'center',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      border: '2px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    button: {
      width: '100%',
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'background-color 0.2s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonHover: {
      backgroundColor: '#2980b9'
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    footer: {
      marginTop: '1.5rem',
      textAlign: 'center'
    },
    link: {
      color: '#3498db',
      fontWeight: '500',
      textDecoration: 'none'
    },
    linkHover: {
      color: '#2980b9',
      textDecoration: 'underline'
    },
    error: {
      color: '#e74c3c',
      marginBottom: '1rem',
      textAlign: 'center',
      width: '100%'
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '1rem',
      borderRadius: '4px',
      width: '100%',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    loading: {
      animation: 'pulse 1.5s infinite'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Verify your code</h2>
      
      {success ? (
        <div style={styles.success}>
          <p style={{ fontWeight: '500' }}>Verification successful!</p>
        </div>
      ) : (
        <>
          <p style={styles.instructions}>
            We've sent a 4-digit code to your device. Enter the code below to verify your account.
          </p>
          
          <div style={styles.inputContainer}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                aria-label={`Digit ${index + 1}`}
                style={{
                  ...styles.input,
                  borderColor: document.activeElement === inputRefs[index].current ? '#3498db' : '#ccc',
                  boxShadow: document.activeElement === inputRefs[index].current ? '0 0 0 3px rgba(52, 152, 219, 0.25)' : 'none'
                }}
              />
            ))}
          </div>
          
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
          
          <button
            onClick={handleVerify}
            disabled={isLoading}
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
            onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2980b9')}
            onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3498db')}
          >
            {isLoading ? (
              <span style={styles.loading}>Verifying...</span>
            ) : (
              'Verify Code'
            )}
          </button>
        </>
      )}
      
      <div style={styles.footer}>
        <p style={{ color: '#666' }}>
          Didn't receive code?{' '}
          <a 
            href="/" 
            onClick={handleResendCode}
            style={styles.link}
            onMouseOver={(e) => (e.currentTarget.style.color = '#2980b9')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#3498db')}
          >
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyCode;