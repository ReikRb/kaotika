import React from "react";

interface ButtonProps {
    label: string;
    imageSrc: string;
    onClick: () => void;
}

const ShopButton: React.FC<ButtonProps> = ({ label, imageSrc, onClick }) => {
    return (
        <div
            className="relative cursor-pointer hover:opacity-80 focus:opacity-80"
            onClick={onClick}
        >
            <img src={imageSrc} alt={`${label} Button`} className="h-24 w-48" />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                {label}
            </span>
        </div>
    );
};

export default ShopButton;
