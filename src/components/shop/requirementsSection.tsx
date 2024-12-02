import React from "react";
import GoldComponent from "./GoldComponent";

const RequiredLevel: React.FC<{ level: number }> = ({ level }) => (
    <div className="flex items-center space-x-2">
        <span className="text-gray-200 text-2xl">Req Level:</span>
        <span className="text-amber-200 text-2xl">{level}</span>
    </div>
);

const RequirementsSection: React.FC<{ gold: number; level: number }> = ({ gold, level }) => (
    <div className="flex flex-col items-center justify-center h-[20%] border-b-2 border-gray-300 relative">
        <div className="relative h-64 w-120">
            <img src="/images/shop/Req_Bg.webp" alt="Center" className="h-full w-full" />
            <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
                <GoldComponent amount={gold} />
            </div>
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
                <RequiredLevel level={level} />
            </div>
        </div>
    </div>
);

export default RequirementsSection;