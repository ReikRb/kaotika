import React from "react";
import ShopButton from "./shopButton";

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
                <img src="/path-to-your-image1.jpg" alt="Center" className="h-16 w-16" />
            </div>

            <div className="flex items-center justify-center h-[50%] border-b-2 border-gray-300">
                <img src="/path-to-your-image2.jpg" alt="Center" className="h-32 w-32" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center h-[30%] space-y-4 sm:space-y-0 sm:space-x-4">
                
                <ShopButton
                    label="BUY"
                    imageSrc="/images/store_button.webp"
                    onClick={() => handleButtonClick('Buy')}
                />

                
                <ShopButton
                    label="ADD TO CART"
                    imageSrc="/images/store_button.webp"
                    onClick={() => handleButtonClick('Add to Cart')}
                />
            </div>
        </div>
    );
};

export default MidContainer;
