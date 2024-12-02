import React from "react";
import ShopButton from "./shopButton";
import RequirementsSection from "./requirementsSection";
import ProductImage from "./ProductImage";
import ProductDefenseSection from "./DefensiveModifierDisplay";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import ProductWeaponDisplay from "./WeaponModifierDisplay";

interface Props {
    products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[];
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | null;
}

const hasDefense = (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield): product is (Helmet | Armor | Boot | Shield) => {
    return "defense" in product;
};

const isWeapon = (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield): product is Weapon => {
    return "base_percentage" in product && "die_faces" in product;
};

const MidContainer: React.FC<Props> = ({ product }) => {
    const handleButtonClick = (action: string) => {
        console.log(action);
    };
    if (!product) {
        return <div className="w-full sm:w-4/12 h-full flex flex-col justify-center items-center">Select a product to view details</div>;
    }
    return (
        <div className="w-full sm:w-4/12 h-full flex flex-col">
            <RequirementsSection gold={product.value} level={product.min_lvl} />

            {hasDefense(product) ? (
                <ProductDefenseSection defense={product.defense} />
            ) : isWeapon(product) ? (
                <ProductWeaponDisplay
                    basePercentage={product.base_percentage}
                    dieFaces={product.die_faces}
                    dieModifier={product.die_modifier}
                    dieNum={product.die_num}
                />
            ) : (
                <div className="flex flex-col items-center justify-center h-[10%] relative">
                    <div className="relative w-full"></div>
                </div>
            )}

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