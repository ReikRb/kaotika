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
        <div className="w-full flex items-center justify-center">
            <button
                className="w-[20%] cursor-pointer bg-[url('/images/shop/UpdateQtyBox.png')] bg-contain bg-center bg-no-repeat text-white 2xl:text-4xl lg:text-3xl sm:text-2xl text-xl"
                onClick={count < 99 ? handleIncrement : () => {}}>
                <p className="pb-[7%]">+</p>
            </button>
            <input
                type="number"
                value={count}
                min={isInCart ? 0 : 1}
                max={99}
                className="w-1/9 cursor-pointer text-center pb-[1%] text-white 2xl:text-4xl lg:text-3xl sm:text-1xl text-xl border border-x-sepia rounded bg-black
                appearance-none [&::-webkit-inner-spin-button]:hidden"
                onChange={handleInputChange}/>
            <button
                className="w-[20%] cursor-pointer bg-[url('/images/shop/UpdateQtyBox.png')] bg-contain bg-center bg-no-repeat text-white 2xl:text-4xl lg:text-3xl sm:text-2xl text-xl"
                onClick={count > 1 ? handleDecrement : () => {}}>
                <p className="pb-[7%]">-</p>
            </button>
        </div>
    );
};

export default IncrementDecrement;