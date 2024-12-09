import React, { useState } from "react";
import ShopButton from "./shopButton";
import RequirementsSection from "./requirementsSection";
import ProductImage from "./ProductImage";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Shield } from "@/_common/interfaces/Shield";
import ProductWeaponDisplay from "./WeaponModifierDisplay";
import ProductDefenseDisplay from "./DefensiveModifierDisplay";
import { Player } from "@/_common/interfaces/Player";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import IncrementDecrement from "./UpdateQtyButton";
import { calculatePurchaseValue, isGoldSufficient, isProductEquiped, isProductInTheInventory } from "@/helpers/calculateIfCanBuy";
import ConfirmationComponent from "./ConfirmationComponent";
import { Product, Products } from "@/_common/types/Product";

interface Props {
    product: Product;
    onBuy: (products: Products, isInCart: boolean) => void;
    onSell: (product: Product) => void;
    onAddToCart: (product: Product) => void;
    player: Player
    quantity: number;
    handleQuantityChange: (value: number) => void;
    displayBuyButtons: boolean;
};

const hasDefense = (product: Product): product is (Helmet | Armor | Boot | Shield) => {
    return "defense" in product;
};

const isWeapon = (product: Product): product is Weapon => {
    return "base_percentage" in product && "die_faces" in product;
};

const isMagical = (product: Product): product is Ingredient => {
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
        return <p className="w-4/12 h-full flex justify-center items-center 2xl:text-3xl lg:text-xl sm:text-base">Select a product to view details.</p>;
    }

    return (
        <>
            <div className="w-4/12 grid grid-rows-12">
                {isModalOpen && modalContent && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <ConfirmationComponent displayBuyButtons={displayBuyButtons} quantity={quantity} modalContent={modalContent} handleBuy={handleBuy} handleSell={handleSell} handleCloseModal={handleCloseModal}/>
                    </div>
                )}
                {isMagical(product) ? (
                    <div/>
                ) : (
                    <div className="w-full row-span-1 row-start-0 flex justify-center place-content-center pt-[2%]">
                        <RequirementsSection gold={product.value * quantity} level={product.min_lvl}/>
                    </div>
                )}
                {isMagical(product) ? (
                    <div/>
                ) : (
                    <div className="w-full row-span-3 row-start-2 flex justify-center place-content-center pt-[2%]">
                        {hasDefense(product) ? (
                            <ProductDefenseDisplay defense={product.defense}/>
                        ) : isWeapon(product) ? (
                            <ProductWeaponDisplay basePercentage={product.base_percentage} dieFaces={product.die_faces} dieModifier={product.die_modifier} dieNum={product.die_num}/>
                        ) : (
                            <div/>
                        )}
                    </div>
                )}
                <div className={isMagical(product) ? "w-full row-span-5 row-start-3 flex justify-center place-content-center p-[2%]" : "w-full row-span-5 row-start-5 flex justify-center place-content-center p-[2%]"}>
                    <ProductImage imageSrc={product.image} altText={product.name}/>
                </div>
                {isMagical(product) ? (
                    <div className="w-full row-span-2 row-start-8 flex items-center justify-center p-[2%]">
                        <IncrementDecrement initialValue={quantity} onValueChange={handleQuantityChange}/>
                    </div>
                ) : (
                    <div/>
                )}
                <div className="w-full row-span-3 row-start-10 flex justify-around items-center p-[2%]">
                    {displayBuyButtons ? (
                        <>
                            <ShopButton label="BUY" canAfford={canAfford} onClick={canAfford() ? handleOpenModal : () => {}}/>
                            <ShopButton label="ADD TO CART" canAfford={canAfford} onClick={canAfford() ? () => product && onAddToCart(product) : () => {}}/>
                        </>
                    ) : (
                        <ShopButton label="SELL" canAfford={() => {return true}} onClick={handleOpenModal}/>
                    )}
                </div>
            </div>
        </>
    );
};

export default MidContainer;