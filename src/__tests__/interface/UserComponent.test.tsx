import { render, screen } from '@testing-library/react';
import UserComponent from '@/components/shop/UserComponent';
import { MOCK_SHIELDS_COLLECTION } from '../mocks';

describe('DisplayPlayerData', () => {
    it('Should display the player\'s current gold amount', () => {

        const mockPlayer = { name: "Reik", gold: 5725, level: 17 };

        render(<UserComponent name={mockPlayer.name} gold={mockPlayer.gold} level={mockPlayer.level} />);

        const goldDisplay = screen.getByText(/5725/);

        // Check if the player's current gold ammount is displayed
        expect(goldDisplay).toBeInTheDocument();
    });
});

