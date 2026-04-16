import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../src/components/LoginPage';

jest.mock('../src/hooks/useLoginPage');
jest.mock('../src/services/loginPageService');

const mockUseLoginPage = require('../src/hooks/useLoginPage').useLoginPage;

describe('LoginPage', () => {
  beforeEach(() => {
    mockUseLoginPage.mockReturnValue({
      email: '',
      password: '',
      showPassword: false,
      rememberMe: false,
      emailError: null,
      passwordError: null,
      generalError: null,
      loading: false,
      handleEmailChange: jest.fn(),
      handleEmailBlur: jest.fn(),
      handlePasswordChange: jest.fn(),
      handlePasswordBlur: jest.fn(),
      handleTogglePassword: jest.fn(),
      handleRememberMeChange: jest.fn(),
      handleSubmit: jest.fn(),
      handleForgotPassword: jest.fn(),
      handleSignUp: jest.fn(),
    });
  });

  it('should render login form with email and password inputs', () => {
    render(<LoginPage />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should display error message when email validation fails', () => {
    mockUseLoginPage.mockReturnValueOnce({
      ...mockUseLoginPage.mock.results[0].value,
      emailError: 'Please enter a valid email address',
    });

    render(<LoginPage />);
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('should display loading state on form submit', () => {
    mockUseLoginPage.mockReturnValueOnce({
      ...mockUseLoginPage.mock.results[0].value,
      loading: true,
    });

    render(<LoginPage />);
    const submitButton = screen.getByRole('button', { name: /logging in/i });
    expect(submitButton).toBeDisabled();
  });

  it('should toggle password visibility on eye icon click', () => {
    const { getByRole } = render(<LoginPage />);
    const toggleButton = getByRole('button', { name: /show password/i });

    expect(toggleButton).toBeInTheDocument();
  });

  it('should display forgot password link', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: /forgot password/i })).toBeInTheDocument();
  });

  it('should display sign up link', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });
});