import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
import { useAuth } from './AuthProvider';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mocking useAuth hook
vi.mock('./AuthProvider', () => ({
  useAuth: vi.fn(),
}));

describe('Login Component', () => {
  let saveUserMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    saveUserMock = vi.fn();

    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isAuthenticated: false,
      saveUser: saveUserMock,
    });
  });

  it('should handle successful login and save user', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fakeToken' }),
    } as Response);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(saveUserMock).toHaveBeenCalledWith({ token: 'fakeToken' });
    });

    // Cleanup mock
    vi.restoreAllMocks();
  });
});