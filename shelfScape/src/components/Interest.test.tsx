import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Interest } from './Interest';
import { useAuth } from './AuthProvider';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { interest } from '../types/Types';

vi.mock('./AuthProvider', () => ({
  useAuth: vi.fn(),
}));

describe('Interest Component', () => {
  let mockInterests: interest[];
  let saveInterestMock: ReturnType<typeof vi.fn>;
  let closeSectionMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockInterests = [
      { _id: '1', nombre: 'Literature', imagenURL: 'img1.jpg' },
      { _id: '2', nombre: 'Music', imagenURL: 'img2.jpg' },
    ];

    saveInterestMock = vi.fn();
    closeSectionMock = vi.fn();

    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { _id: 'user123' },
      saveInterest: saveInterestMock,
      closeSection: closeSectionMock,
      message: null,
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ body: { interestList: mockInterests } }),
    });

  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render interests and handle modal state', async () => {
    render(
      <MemoryRouter>
        <Interest />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Literature')).toBeInTheDocument();
      expect(screen.getByText('Music')).toBeInTheDocument();
    });


    fireEvent.click(screen.getByText('Add Interest'));
    expect(screen.getByText('Create interest')).toBeTruthy();
  });

  it('should handle edit, delete, and view actions', async () => {
    render(
      <MemoryRouter>
        <Interest />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Literature')).toBeInTheDocument();
    });

    // Simulate hovering over an interest
    fireEvent.mouseEnter(screen.getByText('Literature').closest('section')!);
    await waitFor(() => {
      expect(screen.getByAltText('edit')).toBeInTheDocument();
    });

    // Test edit interest
    fireEvent.click(screen.getByAltText('edit'));
    expect(screen.getByText('Edit interest')).toBeTruthy();

    // Test delete interest
    fireEvent.click(screen.getByAltText('delete'));
    await waitFor(() => {
      expect(screen.getByText('Interest Deleted!')).toBeInTheDocument();
    });

    // Test view interest
    fireEvent.click(screen.getByAltText('view'));
    await waitFor(() => {
      expect(saveInterestMock).toHaveBeenCalledWith(expect.any(Object));
    });

  });
});
