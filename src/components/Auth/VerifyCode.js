import React, { useState, useRef, useEffect } from 'react';
import './../../assets/Style/VerifyCode.css';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleCodeChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    if (value !== '' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    if (/^\d{4}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      inputRefs[3].current?.focus();
    }
  };

  const handleVerify = async () => {
    if (code.some((digit) => digit === '')) {
      setError('Please enter all digits');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const isValid = await simulateApiCall(code.join(''));
      if (isValid) {
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
    if (resendTimer > 0) return;

    setCode(['', '', '', '']);
    setError('');
    setSuccess(false);
    setIsLoading(true);
    setResendTimer(30);

    setTimeout(() => {
      setIsLoading(false);
      inputRefs[0].current?.focus();
    }, 1000);
  };

  return (
    <div className="verify-container">
      <h2 className="verify-heading">Verify your code</h2>

      {success ? (
        <div className="verify-success">
          <p>Verification successful!</p>
        </div>
      ) : (
        <>
          <p className="verify-instructions">
            We've sent a 4-digit code to your device. Enter the code below to verify your account.
          </p>

          <div className="verify-input-container">
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
                className="verify-input"
              />
            ))}
          </div>

          {error && <div className="verify-error">{error}</div>}

          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="verify-button"
          >
            {isLoading ? <span className="verify-loading">Verifying...</span> : 'Verify Code'}
          </button>
        </>
      )}

      <div className="verify-footer">
        <p style={{ color: '#666' }}>
          Didn't receive code?{' '}
          <a
            href="/"
            onClick={handleResendCode}
            className={`verify-link ${resendTimer > 0 ? 'disabled' : ''}`}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyCode;