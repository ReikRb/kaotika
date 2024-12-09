import React, { useState } from "react";

interface Props {
    initialValue?: number;
    onValueChange: (value: number) => void;
};

const IncrementDecrement: React.FC<Props> = ({ initialValue = 1, onValueChange }) => {
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
        let value = Math.max(1, parseInt(e.target.value) || 1);
        value = value > 99 ? 99 : value;
        setCount(value);
        onValueChange(value);
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
                min={1}
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