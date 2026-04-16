import React from 'react';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useLoginPage } from '../hooks/useLoginPage';
import './LoginPage.css';

const NetworkIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Discovery Platform Network Icon"
  >
    <circle cx="20" cy="8" r="3" fill="currentColor" />
    <circle cx="32" cy="16" r="3" fill="currentColor" />
    <circle cx="32" cy="28" r="3" fill="currentColor" />
    <circle cx="20" cy="36" r="3" fill="currentColor" />
    <circle cx="8" cy="28" r="3" fill="currentColor" />
    <circle cx="8" cy="16" r="3" fill="currentColor" />
    <line x1="20" y1="8" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" />
    <line x1="32" y1="16" x2="32" y2="28" stroke="currentColor" strokeWidth="1.5" />
    <line x1="32" y1="28" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" />
    <line x1="20" y1="36" x2="8" y2="28" stroke="currentColor" strokeWidth="1.5" />
    <line x1="8" y1="28" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
    <line x1="8" y1="16" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const BrandedPanel = () => (
  <div className="branded-panel">
    <div className="geometric-pattern">
      <div className="pattern-dots"></div>
    </div>
    <div className="branded-content">
      <div className="branded-icon">
        <NetworkIcon />
      </div>
      <h1 className="branded-title">Discovery Platform</h1>
      <p className="branded-subtitle">Powered by CHANGEPOND</p>
    </div>
  </div>
);

const LoginPage = () => {
  const {
    email,
    password,
    showPassword,
    rememberMe,
    emailError,
    passwordError,
    generalError,
    loading,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    handleTogglePassword,
    handleRememberMeChange,
    handleSubmit,
    handleForgotPassword,
    handleSignUp,
  } = useLoginPage();

  return (
    <div className="login-page">
      <BrandedPanel />
      
      <div className="form-panel">
        <div className="form-container">
          <div className="form-header">
            <div className="header-icon" style={{ color: '#0066FF' }}>
              <NetworkIcon />
            </div>
            <h2 className="header-title">Discovery Platform</h2>
            <p className="header-subtitle">Powered by CHANGEPOND</p>
          </div>

          <div className="form-content">
            <h1 className="form-heading">Login</h1>
            <p className="welcome-text">Welcome to Discovery Platform</p>

            {generalError && (
              <div className="error-message" role="alert" aria-live="polite">
                {generalError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-wrapper">
                  <MdEmail className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${emailError ? 'input-error' : ''}`}
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    autoComplete="email"
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                </div>
                {emailError && (
                  <span id="email-error" className="inline-error" role="alert" aria-live="polite">
                    {emailError}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <MdLock className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input ${passwordError ? 'input-error' : ''}`}
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    autoComplete="current-password"
                    aria-describedby={passwordError ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={handleTogglePassword}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex="0"
                  >
                    {showPassword ? (
                      <MdVisibilityOff className="toggle-icon" />
                    ) : (
                      <MdVisibility className="toggle-icon" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <span id="password-error" className="inline-error" role="alert" aria-live="polite">
                    {passwordError}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Keep me logged In</span>
                </label>
                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="signup-section">
              <span className="signup-text">Don't have an account? </span>
              <button
                type="button"
                className="signup-link"
                onClick={handleSignUp}
              >
                Sign up
              </button>
            </div>
          </div>

          <div className="form-footer">
            <p className="footer-text">
              Copyright 2025 Changepond. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
