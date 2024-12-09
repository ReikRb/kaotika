import React from "react";
import GoldComponent from "./GoldComponent";

const RequiredLevel: React.FC<{ level: number }> = ({ level }) => (
    <div className="flex items-center space-x-2">
        <span className="text-gray-200 2xl:text-2xl lg:text-lg sm:text-base">Req Level:</span>
        <span className="text-amber-200 2xl:text-2xl lg:text-lg sm:text-base">{level}</span>
    </div>
);

const RequirementsSection: React.FC<{ gold: number; level?: number; }> = ({ gold, level }) => (
    <>
        <div className="w-full flex justify-around place-content-center bg-[url('/images/shop/Req_Bg.webp')] bg-center bg-no-repeat [background-size:100%_100%]">
            <GoldComponent amount={gold}/>
            {level !== undefined && (
                <RequiredLevel level={level}/>
            )}
        </div>
    </>
);

export default RequirementsSection;