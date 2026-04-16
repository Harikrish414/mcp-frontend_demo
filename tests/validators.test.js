import { validateEmail, validatePassword } from '../src/utils/validators';

describe('validators', () => {
  it('should return error when email is empty', () => {
    const result = validateEmail('');
    expect(result).toBe('Email is required');
  });

  it('should return error when email format is invalid', () => {
    const result = validateEmail('invalid-email');
    expect(result).toBe('Please enter a valid email address');
  });

  it('should return null when email format is valid', () => {
    const result = validateEmail('user@example.com');
    expect(result).toBeNull();
  });

  it('should return error when password is empty', () => {
    const result = validatePassword('');
    expect(result).toBe('Password is required');
  });

  it('should return null when password is provided', () => {
    const result = validatePassword('password123');
    expect(result).toBeNull();
  });
});