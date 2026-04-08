import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validators';
import { authenticateUser } from '../services/loginPageService';

export const useLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(null);
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(null);
  };

  const handlePasswordBlur = () => {
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError(null);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    setLoading(true);
    try {
      const response = await authenticateUser(email, password);
      
      if (response && response.success === false) {
        setGeneralError(response.message || 'Login failed');
      } else if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberEmail', email);
        }
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setGeneralError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    window.location.href = '/forgot-password';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  return {
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
  };
};
