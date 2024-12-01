import React from "react";

const MidContainer: React.FC = () => {
    
    const handleButtonClick = (action: string) => {
        console.log(action);
    };

    return (
        <div className="w-full sm:w-4/12 h-full border-2 border-red-600 flex flex-col">
            <div className="flex flex-col items-center justify-center h-[20%] border-b-2 border-gray-300 relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <div>

                    </div>
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <div>

                    </div>
                </div>
                <img src="#" alt="ProductReq" className="h-16 w-16" />
            </div>

            <div className="flex items-center justify-center h-[50%] border-b-2 border-gray-300">
                <img src="#" alt="ProductImage" className="h-32 w-32" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center h-[30%] space-y-4 sm:space-y-0 sm:space-x-4">
                
                <div
                    className="relative cursor-pointer hover:opacity-80 focus:opacity-80"
                    onClick={() => handleButtonClick('Buy')}
                >
                    <img src="/images/store_button.webp" alt="Buy Button" className="h-24 w-48" />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold">BUY</span>
                </div>

                
                <div
                    className="relative cursor-pointer hover:opacity-80 focus:opacity-80"
                    onClick={() => handleButtonClick('Add to Cart')}
                >
                    <img src="/images/store_button.webp" alt="Add to Cart Button" className="h-24 w-48" />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold">ADD TO CART</span>
                </div>
            </div>
        </div>
    );
};

export default MidContainer;
