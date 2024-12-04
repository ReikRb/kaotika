import React from "react";
import GoldComponent from "./GoldComponent";

interface Props {
    gold: number;
    quantity: number;
}


const RequiredLevel: React.FC<{ level: number }> = ({ level }) => (
    <div className="flex items-center space-x-2">
        <span className="text-gray-200 text-2xl">Req Level:</span>
        <span className="text-amber-200 text-2xl">{level}</span>
    </div>
);



const RequirementsSection: React.FC<{ gold: number; level?: number; quantity: number }> = ({ gold, level, quantity }) => (
    <div className="flex flex-col items-center justify-center h-[12%] relative">
        <div className="relative h-[70%] w-[80%] ml-[4%] mt-[2%]">
            <img src="/images/shop/Req_Bg.webp" alt="Requirements to buy this product" className="h-full w-full" />
            <div className={`absolute top-1/2 transform -translate-y-1/2 ${level !== undefined ? "left-5" : "left-1/2 -translate-x-1/2"}`}>
                <GoldComponent amount={gold} />
            </div>
            {level !== undefined && (
                <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <RequiredLevel level={level} />
                </div>
            )}
        </div>
    </div>
);

export default RequirementsSection;