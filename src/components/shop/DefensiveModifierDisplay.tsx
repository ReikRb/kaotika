import React from "react";

const ProductDefense: React.FC<{ defense: number }> = ({ defense }) => (
    <div className="flex items-center space-x-40">
        <span className="text-gray-200 text-2xl ">Defense</span>
        <span className="text-amber-200 text-2xl">{defense}</span>
    </div>
);

const ProductDefenseDisplay: React.FC<{ defense?: number }> = ({ defense }) => (
    <div className="flex flex-col items-center justify-center h-[10%] relative">
        {defense ? (
            <div className="relative h-64 w-full">
                <img
                    src="/images/shop/ProductBonusContainer.webp"
                    alt="Center"
                    className="h-56 w-full"
                />
                <div className="absolute left-40 top-28 transform -translate-y-1/2">
                    <ProductDefense defense={defense} />
                </div>
            </div>
        ) : (
            <div className="relative h-64 w-120">
            </div>
        )}
    </div>
);

export default ProductDefenseDisplay;