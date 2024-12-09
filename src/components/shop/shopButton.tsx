import React from "react";

interface ButtonProps {
    label: string;
    canAfford: Function;
    onClick: () => void;
}

const ShopButton: React.FC<ButtonProps> = ({ label, canAfford, onClick }) => {
    return (
        <div className={canAfford() ? 
            "w-5/12 h-full flex items-center justify-center cursor-pointer hover:opacity-80 focus:opacity-80 bg-[url('/images/shop/store_button.webp')] bg-contain bg-center bg-no-repeat"
            : "w-5/12 h-full flex items-center justify-center cursor-pointer hover:opacity-80 focus:opacity-80 bg-[url('/images/shop/disabled_store_button.webp')] bg-contain bg-center bg-no-repeat"}
            onClick={onClick}>
            <span className="inset-0 text-white 2xl:text-base lg:text-xs sm:text-xs">
                {label}
            </span>
        </div>
    );
};

export default ShopButton;