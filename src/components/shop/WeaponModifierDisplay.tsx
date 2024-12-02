import React from "react";

interface Props {
    basePercentage: number;
    dieFaces: number;
    dieModifier: number;
    dieNum: number;
}

const ProductAttack: React.FC<Props> = ({ basePercentage, dieFaces, dieModifier, dieNum }) => (
    <div>
        <div className="flex items-center space-x-40">
            <span className="text-gray-200 text-2xl ">Base Percentage:</span>
            <span className="text-amber-200 text-2xl ">{basePercentage}</span>

        </div>
        <div className="flex items-center space-x-40">
            <span className="text-gray-200 text-2xl">Attack:</span>
            <span className="text-amber-200 text-2xl">{dieNum}D{dieFaces} + {dieModifier}</span>

        </div>
    </div>

);

const ProductWeaponDisplay: React.FC<Props> = ({ basePercentage, dieFaces, dieModifier, dieNum }) => {
    return (

        <div className="flex flex-col items-center justify-center h-[10%] border-b-2 border-gray-300 relative">
            <div className="relative w-full">
                <img
                    src="/images/shop/ProductBonusContainer.webp"
                    alt="Center"
                    className="h-56 w-full"
                />
                <div className="absolute left-40 top-1/2 transform -translate-y-1/2">
                    <ProductAttack basePercentage={basePercentage} dieFaces={dieFaces} dieModifier={dieModifier} dieNum={dieNum} />
                </div>

            </div>
        </div>

    );
};

export default ProductWeaponDisplay;
