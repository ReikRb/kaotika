import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface CartProductsContainerProps {
    cart: (Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient)[];
    onRemoveFromCart: (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient) => void;
    handleQuantityChange: (value: number) => void;
    quantity: number;
 
}

const CartProductsContainer: React.FC<CartProductsContainerProps> = ({ cart, quantity, handleQuantityChange, onRemoveFromCart }) => {
    return (
        <div className=" w-[100%] h-full place-items-center bg-gray-950 bg-opacity-50
            overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-950
            [&::-webkit-scrollbar-thumb]:bg-gray-800">
            {cart.map((product, i) => (
                <ProductCard key={i.toString()} product={product} isSelected={false} isInCart={true} quantity={quantity} handleRemoval={onRemoveFromCart(product)} handleQuantityChange={handleQuantityChange} onClick={() => null}/>
            ))}
        </div>
    );
};

export default CartProductsContainer;
