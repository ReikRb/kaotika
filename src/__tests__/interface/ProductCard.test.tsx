import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/shop/ProductCard';
import { MOCK_SHIELDS_COLLECTION } from '../mocks';

const mockProduct = MOCK_SHIELDS_COLLECTION[0]

const mockProps = {
    product: mockProduct,
    isSelected: false,
    onClick: jest.fn(),
    handleRemoval: jest.fn(),
    isInCart: false,
    handleQuantityChange: jest.fn(),
    quantity: 1,
};

describe('ProductCard Component', () => {
    it('renders the component correctly in the shop view', () => {
        render(<ProductCard {...mockProps} />);

        // Check if product name is displayed
        expect(screen.getByText(/Knight's Shield/)).toBeInTheDocument();
    })
});
