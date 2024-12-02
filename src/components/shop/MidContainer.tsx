import React from "react";
import ShopButton from "./shopButton";
import RequirementsSection from "./requirementsSection";
import ProductImage from "./ProductImage";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import { Modifier } from "@/_common/interfaces/Modifier";
import MerchantComponent from "./MerchantComponent";
import ItemContainer from "./ItemContainer";

interface Props {
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield;
  }

const MidContainer: React.FC<Props>  = ({product}) => {
    const handleButtonClick = (action: string) => {
        console.log(action);
    };
    // console.log('Current Product: ', product.name,);

    return (
        <div className="w-full sm:w-4/12 h-full border-2 border-red-600 flex flex-col">
            <RequirementsSection gold={product.value} level={product.min_lvl} />
            <ProductImage imageSrc={product.image} altText="Center" />
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
