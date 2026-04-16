import { renderHook, act } from '@testing-library/react';
import { useLoginPage } from '../src/hooks/useLoginPage';

jest.mock('../src/services/loginPageService');
jest.mock('../src/utils/validators');

describe('useLoginPage', () => {
  it('should initialize with empty form state', () => {
    const { result } = renderHook(() => useLoginPage());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.showPassword).toBe(false);
    expect(result.current.rememberMe).toBe(false);
  });

  it('should update email state on email change', () => {
    const { result } = renderHook(() => useLoginPage());

    act(() => {
      result.current.handleEmailChange({ target: { value: 'test@example.com' } });
    });

    expect(result.current.email).toBe('test@example.com');
  });

  it('should toggle password visibility', () => {
    const { result } = renderHook(() => useLoginPage());

    expect(result.current.showPassword).toBe(false);

    act(() => {
      result.current.handleTogglePassword();
    });

    expect(result.current.showPassword).toBe(true);
  });

  it('should handle remember me checkbox', () => {
    const { result } = renderHook(() => useLoginPage());

    act(() => {
      result.current.handleRememberMeChange({ target: { checked: true } });
    });

    expect(result.current.rememberMe).toBe(true);
  });
});