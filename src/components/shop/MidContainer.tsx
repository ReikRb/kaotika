import React, { useState } from "react";
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
import ProductWeaponDisplay from "./WeaponModifierDisplay";
import GoldComponent from "./GoldComponent";
import ProductDefenseDisplay from "./DefensiveModifierDisplay";
import { Player } from "@/_common/interfaces/Player";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import IncrementDecrement from "./UpdateQtyButton";
import { calculatePurchaseValue, isGoldSufficient, isProductEquiped, isProductInTheInventory } from "@/helpers/calculateIfCanBuy";
import ConfirmationComponent from "./ConfirmationComponent";

interface Props {
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;
    onBuy: (products: Product[], isInCart: boolean) => void;
    onSell: (product: Product) => void;
    onAddToCart: (product: Product) => void;
    player: Player
    quantity: number;
    handleQuantityChange: (value: number) => void;
    displayBuyButtons: boolean;
}

type Product = Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;

const hasDefense = (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient): product is (Helmet | Armor | Boot | Shield) => {
    return "defense" in product;
};

const isWeapon = (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient): product is Weapon => {
    return "base_percentage" in product && "die_faces" in product;
};

const isMagical = (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient): product is Ingredient => {
    return "effects" in product;
};

const MidContainer: React.FC<Props> = ({ product, onBuy, onSell, onAddToCart, player, quantity, handleQuantityChange, displayBuyButtons }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<{ name: string; value: number } | null>(null);

    const handleOpenModal = () => {
        if (product) {
            setModalContent({ name: product.name, value: product.value * quantity });
            setModalOpen(true);
        }
    };

    const handleBuy = () => {
        onBuy([product], false);
        setModalOpen(false);
        setModalContent(null);
    };

    const handleSell = () => {
        onSell(product);
        setModalOpen(false);
        setModalContent(null);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    const canAfford = () => {
        const value = calculatePurchaseValue([product]);

        return (
            isProductInTheInventory(player, [product]) &&
            isProductEquiped(player, [product]) &&
            isGoldSufficient(player, value)
        );
    };

    if (!product) {
        return <div className="w-full sm:w-4/12 h-full flex flex-col justify-center items-center">Select a product to view details</div>;
    }

    return (
        <>
            <div className="w-full sm:w-4/12 h-full flex flex-col relative">
                {isModalOpen && modalContent && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <ConfirmationComponent displayBuyButtons={displayBuyButtons} quantity={quantity} modalContent={modalContent} handleBuy={handleBuy} handleSell={handleSell} handleCloseModal={handleCloseModal}/>
                    </div>
                )}

                <RequirementsSection gold={product.value * quantity} level={product.min_lvl} />

                {hasDefense(product) ? (
                    <ProductDefenseDisplay defense={product.defense} />
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
                <div className="flex flex-col items-center justify-center h-[50%] -mb-32">
                {isMagical(product) ? (
                    <IncrementDecrement
                        initialValue={quantity}
                        onValueChange={handleQuantityChange}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-[10%] relative">
                    <div className="relative w-full"></div>
                </div>
                )}
            </div>
                <div className="flex flex-col sm:flex-row items-center justify-center h-[70%] sm:space-y-0 sm:space-x-4">
                    {displayBuyButtons
                        ? (
                            <>
                                <ShopButton
                                    label="BUY"
                                    imageSrc={canAfford() ? "/images/shop/store_button.webp" : "/images/shop/disabled_store_button.webp"}
                                    onClick={canAfford() ? handleOpenModal : () => {}}
                                />
                                <ShopButton
                                    label="ADD TO CART"
                                    imageSrc={canAfford() ? "/images/shop/store_button.webp" : "/images/shop/disabled_store_button.webp"}
                                    onClick={canAfford() ? () => product && onAddToCart(product) : () => {}}
                                />
                            </>
                        ) : (
                            <ShopButton
                                label="SELL"
                                imageSrc={"/images/shop/store_button.webp"}
                                onClick={handleOpenModal}
                            />
                        )}


                </div>
            </div>
        </>
    );
};

export default MidContainer;
