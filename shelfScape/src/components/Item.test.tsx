import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import { Items } from './Items';
import { vi } from 'vitest';
import { useAuth } from './AuthProvider';
import { MemoryRouter } from 'react-router-dom';
import { item } from '@/types/Types';

vi.mock('./AuthProvider', () => ({
   useAuth: vi.fn()
}));

describe('Item Component', () => {
    let mockItems: item[];
    let handleMesageMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockItems = [
            {id: '1', name: 'Como armar garzas de papel', link: 'https://www.youtube.com/watch?v=j9JzBqmKcCY&list=RDMM&index=8', date:'08/09/2024'},
            {id: '2', name: 'El Castillo en el Aire', link: 'https://www.youtube.com/watch?v=j9JzBqmKcCY&list=RDMM&index=8', date:'08/09/2024'}
        ];
        handleMesageMock = vi.fn();

        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            selectedInterest: { _id: 'interest123', name: 'Interest 1' },
            message: null,
            handleMesage: handleMesageMock
        })

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ body: { itemsList: mockItems}})
        });
    })

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Should render items', async () => {
        render(
            <MemoryRouter>
                <Items/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Como armar garzas de papel')).toBeInTheDocument();
            expect(screen.getByText('El Castillo en el Aire')).toBeInTheDocument();
        })
    })

    it('Should delete items', async () => {
        render(
            <MemoryRouter>
                <Items/>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Como armar garzas de papel')).toBeInTheDocument();
        });

        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(handleMesageMock).toHaveBeenCalledWith('Item deleted', 'success');
        })
    })

});