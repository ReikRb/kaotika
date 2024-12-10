import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MidContainer from "@/components/shop/MidContainer";
import { MOCK_SHIELDS_COLLECTION } from "../mocks";
import { Player } from "@/_common/interfaces/Player";

const mockOnBuy = jest.fn();
const mockOnSell = jest.fn();
const mockOnAddToCart = jest.fn();
const mockHandleQuantityChange = jest.fn();

const mockPlayer: Player = {
  id: "player1",
  name: "Reik",
  gold: 5750,
  inventory: [],
  equipment: [],
  level: 17,
};

describe("ShopButton Component - Add to Cart", () => {
  it("adds a product to the cart when the Add to Cart button is clicked", () => {
    const mockProduct = MOCK_SHIELDS_COLLECTION[0];

    render(
      <MidContainer
        product={mockProduct}
        onBuy={mockOnBuy}
        onSell={mockOnSell}
        onAddToCart={mockOnAddToCart}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={mockHandleQuantityChange}
        displayBuyButtons={true}
      />
    );

    const addToCartButton = screen.getByText("ADD TO CART");

    expect(addToCartButton).toBeInTheDocument();
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("disables the Add to Cart button if the player cannot afford the item", () => {
    const expensiveProduct = { ...MOCK_SHIELDS_COLLECTION[0], value: 6100 };

    render(
      <MidContainer
        product={expensiveProduct}
        onBuy={mockOnBuy}
        onSell={mockOnSell}
        onAddToCart={mockOnAddToCart}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={mockHandleQuantityChange}
        displayBuyButtons={true}
      />
    );

    const addToCartButton = screen.getByText("ADD TO CART");

    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton.closest("button")).toBeDisabled();
  });

  it("resets the quantity after adding a product to the cart", () => {
    const mockProduct = MOCK_SHIELDS_COLLECTION[1];

    render(
      <MidContainer
        product={mockProduct}
        onBuy={mockOnBuy}
        onSell={mockOnSell}
        onAddToCart={mockOnAddToCart}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={mockHandleQuantityChange}
        displayBuyButtons={true}
      />
    );

    const addToCartButton = screen.getByText("ADD TO CART");

    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});