import React, { useState } from "react";

interface IncrementDecrementProps {
    initialValue?: number;
    onValueChange: (value: number) => void;
}

const IncrementDecrement: React.FC<IncrementDecrementProps> = ({ initialValue = 1, onValueChange }) => {
    const [count, setCount] = useState(initialValue);

    const handleIncrement = () => {
        const newValue = count + 1;
        setCount(newValue);
        onValueChange(newValue);
    };

    const handleDecrement = () => {
        if (count > 1) {
            const newValue = count - 1;
            setCount(newValue);
            onValueChange(newValue);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setCount(value);
        onValueChange(value);
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
                min={1}
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