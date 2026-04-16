import { authenticateUser } from '../src/services/loginPageService';

global.fetch = jest.fn();

describe('loginPageService', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should return token on successful authentication', async () => {
    const mockResponse = { success: true, token: 'jwt-token-123' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await authenticateUser('user@example.com', 'password');
    expect(result.token).toBe('jwt-token-123');
    expect(fetch).toHaveBeenCalledWith('/api/auth/login', expect.any(Object));
  });

  it('should throw error on failed authentication', async () => {
    const mockError = { message: 'Invalid credentials' };
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockError,
    });

    await expect(authenticateUser('user@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
  });

  it('should throw error on network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(authenticateUser('user@example.com', 'password')).rejects.toThrow('Network error');
  });
});