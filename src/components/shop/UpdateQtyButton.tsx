import React, { useEffect, useState } from "react";
import { Armor } from "@/_common/interfaces/Armor";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Boot } from "@/_common/interfaces/Boot";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { Ring } from "@/_common/interfaces/Ring";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";

type Product = Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;

interface IncrementDecrementProps {
    initialValue?: number;
    onValueChange: (product: Product, quantity: number) => void;
    isInCart: boolean;
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;
}

const IncrementDecrement: React.FC<IncrementDecrementProps> = ({ initialValue = 1, onValueChange, isInCart = false, product }) => {
    const [count, setCount] = useState(initialValue);

    useEffect(() => {
        setCount(initialValue);
    }, [initialValue]);

    const handleIncrement = () => {
        const newValue = count + 1;
        setCount(newValue);
        onValueChange(product, newValue);
    };

    const handleDecrement = () => {
        const newValue = count - 1;
        if (newValue >= 0) {
            setCount(newValue);
            onValueChange(product, newValue);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setCount(value);
        onValueChange(product, value);
    };

    return (
        <div className="flex items-center justify-center">
            <button
                className="relative cursor-pointer w-20 bg-[url('/images/shop/UpdateQtyBox.webp')] bg-contain bg-no-repeat text-white text-5xl flex items-center justify-center"
                onClick={handleIncrement}
            >
                +
            </button>
            <input
                type="number"
                value={count}
                min={isInCart ? 0 : 1}
                max={99}
                className="relative cursor-pointer w-10 h-[70%] text-right text-white text-3xl border border-medievalSepia rounded bg-black"
                onChange={handleInputChange}
            />
            <button
                className="relative cursor-pointer w-20 bg-[url('/images/shop/UpdateQtyBox.webp')] bg-contain bg-no-repeat text-white text-5xl flex items-center justify-center"
                onClick={handleDecrement}
            >
                -
            </button>
        </div>
    );
};

export default IncrementDecrement;