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
import UpdateQtyButton from "./UpdateQtyButton";
import IncrementDecrement from "./UpdateQtyButton";


interface Props {
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient | null;
    onAddToCart: (product: Product) => void;
    player: Player
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

const MidContainer: React.FC<Props> = ({ product, onAddToCart, player }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<{ name: string; value: number } | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleBuyClick = () => {
        if (product) {
            setModalContent({ name: product.name, value: product.value * quantity });
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    const handleQuantityChange = (value: number) => {
        setQuantity(value);
    };

    const canAfford = product ? player.gold >= product.value * quantity : false;

    if (!product) {
        return <div className="w-full sm:w-4/12 h-full flex flex-col justify-center items-center">Select a product to view details</div>;
    }

    return (
        <div className="w-full sm:w-4/12 h-full flex flex-col relative">
            {isModalOpen && modalContent && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative w-5/12 h-3/6 bg-[url('/images/shop/confirmation_box.webp')] bg-contain bg-no-repeat text-white shadow-xl p-8 md:p-24 flex-col justify-center space-y-10">
                        <div className="flex flex-col items-center justify-center md:space-y-8">
                            <p className="text-xl md:text-4xl font-bold">Are you sure you want to buy</p>
                            <p className="text-2xl md:text-5xl font-extrabold text-yellow-300"> x{quantity} {modalContent.name}</p>
                            <div className="flex items-center justify-center space-x-2">
                                <p className="text-xl md:text-4xl font-bold">for</p>
                                <GoldComponent amount={modalContent.value} />
                                <p className="text-xl md:text-4xl font-bold">?</p>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4 md:space-x-60">
                            <button
                                className="bg-transparent hover:bg-black text-white text-2xl px-4 py-2 md:px-6 md:py-3 rounded-3xl border-2 border-medievalSepia "
                                onClick={() => console.log("Confirmed purchase")}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-transparent hover:bg-black text-white text-2xl px-4 py-2 md:px-6 md:py-3 rounded-3xl border-2 border-medievalSepia"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
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
                <ShopButton
                    label="BUY"
                    imageSrc={canAfford ? "/images/shop/store_button.webp" : "/images/shop/disabled_store_button.webp"}
                    onClick={canAfford ? handleBuyClick : null}
                />
                <ShopButton
                    label="ADD TO CART"
                    imageSrc={canAfford ? "/images/shop/store_button.webp" : "/images/shop/disabled_store_button.webp"}
                    onClick={canAfford ? () => product && onAddToCart(product) : null}
                />
            </div>
        </div>
    );
};

export default MidContainer;
