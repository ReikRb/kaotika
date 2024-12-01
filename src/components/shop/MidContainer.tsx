import React from "react";
import ShopButton from "./shopButton";
import RequirementsSection from "./requirementsSection";
import ProductImage from "./ProductImage";

const MidContainer: React.FC = () => {
    const handleButtonClick = (action: string) => {
        console.log(action);
    };

    return (
        <div className="w-full sm:w-4/12 h-full border-2 border-red-600 flex flex-col">
            <RequirementsSection gold={500} level={10} />
            <ProductImage imageSrc="#" altText="Center" />
            <div className="flex flex-col sm:flex-row items-center justify-center h-[30%] space-y-4 sm:space-y-0 sm:space-x-4">
                <ShopButton
                    label="BUY"
                    imageSrc="/images/shop/store_button.webp"
                    onClick={() => handleButtonClick("Buy")}
                />
                <ShopButton
                    label="ADD TO CART"
                    imageSrc="/images/shop/store_button.webp"
                    onClick={() => handleButtonClick("Add to Cart")}
                />
            </div>
        </div>
    );
};

export default MidContainer;
