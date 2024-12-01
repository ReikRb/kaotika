import React from "react";

const RequiredGold: React.FC<{ goldAmount: number }> = ({ goldAmount }) => (
    <div className="flex items-center space-x-2">
        <img src="/images/gold_icon.webp" alt="Gold" className="h-4 w-4" />
        <span>{goldAmount}</span>
    </div>
);

const RequiredLevel: React.FC<{ level: number }> = ({ level }) => (
    <div className="flex items-center space-x-2">
        <span className="text-gray-600 text-sm">Req Level:</span>
        <span>{level}</span>
    </div>
);

const RequirementsSection: React.FC<{ gold: number; level: number }> = ({ gold, level }) => (
    <div className="flex flex-col items-center justify-center h-[20%] border-b-2 border-gray-300 relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <RequiredGold goldAmount={gold} />
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <RequiredLevel level={level} />
        </div>
        <img src="#" alt="Center" className="h-16 w-16" />
    </div>
);

export default RequirementsSection;
