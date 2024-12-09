import { Armor } from "@/_common/interfaces/Armor";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Boot } from "@/_common/interfaces/Boot";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { Ring } from "@/_common/interfaces/Ring";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";
import GoldComponent from "./GoldComponent";
import { useEffect, useState } from "react";
import IncrementDecrement from "./UpdateQtyButton";
import ShopButton from "./shopButton";

interface Product {
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;
    isSelected: boolean;
    onClick: () => void;
    handleRemoval?: (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient) => void;
    isInCart?: boolean
    handleQuantityChange?: (value: number) => void;
    quantity?: number;
    index: number;
}
export const PRODUCT_CART = {
    mainContainer: "flex h-[53%] w-[90%] row-span-3 row-start-8 place-items-center justify-center mt-[3%] ml-[5%] bg-contain bg-center bg-no-repeat",
    imgContainer: "flex w-[35%] justify-center place-items-center h-[90%]  bg-contain bg-center bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]",
    productImg: 'w-[40%]',
    infoContainer: 'w-[30%] h-[90%] place-items-center text-center justify-content-start space-y-[6%] inline-block',
    name: "h-[30%]  ml-[5%] self-center w-[90%] text-2xl text-white",
    requirementsContainer: "w-[100%] flex place-items-center mb-[2%]",
    goldContainer: "w-[50%] flex  justify-content-start mr-[5%]",
    levelContainer: "justify-end flex space-x-[50%] inline-row",
    levelRequirement: "text-xl w-[2%] text-white",
    levelValue: "text-4xl pr-[12%]"
}
export const PRODUCT_SHOP = {
    mainContainer: `h-[41.5%] row-span-3 row-start-8 flex mt-[3%] bg-contain bg-no-repeat transform transition-transform duration-300 hover:scale-105 cursor-pointer`,
    imgContainer: "flex justify-center place-items-center place-items-center mt-[2.8%] w-[90%] h-[90%] ml-[2%] bg-contain bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]",
    productImg: "place-items-center self-center pb-[3%] w-[32%]",
    infoContainer: "text-center content-center ml-[2%] w-[80%] space-y-[7%] inline-block",
    name: "text-2xl text-white mr-[15%]",
    requirementsContainer: "",
    goldContainer: 'w-[50%] ml-[25%] align-center',
    levelContainer: 'justify-center flex space-x-[15%] inline-row',
    levelRequirement: 'text-xl w-[20%] text-white',
    levelValue: 'text-4xl self-center'
}
const ProductCard: React.FC<Product> = ({ index, product, onClick, isSelected, isInCart = false, quantity, handleQuantityChange, handleRemoval }) => {
    return (
        <>
            <div
                className={`${isInCart ? PRODUCT_CART.mainContainer : PRODUCT_SHOP.mainContainer} ${!isInCart && isSelected ? "bg-[url('/images/shop/product_card_selected.webp')]" : "bg-[url('/images/shop/product_card_unselected.webp')]"}`}
                onClick={onClick}
                data-testid={`${isInCart ? 'cart' : 'shop'}_card_${index}`}
            >
                <div className={isInCart ? PRODUCT_CART.imgContainer : PRODUCT_SHOP.imgContainer}>
                    <img data-testid={`${isInCart ? 'cart' : 'shop'}_card_img_${index}`}className={isInCart ? PRODUCT_CART.productImg : PRODUCT_SHOP.productImg} src={`https://kaotika.vercel.app${product.image}`} alt="HeaderDivider" />
                </div>
                <div className={isInCart ? PRODUCT_CART.infoContainer : PRODUCT_SHOP.infoContainer}>
                    <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_name_${index}`} className={isInCart ? PRODUCT_CART.name : PRODUCT_SHOP.name}>{product.name}</p>
                    <div  className={isInCart ? PRODUCT_CART.requirementsContainer : PRODUCT_SHOP.requirementsContainer}>
                        <div data-testid={`${isInCart ? 'cart' : 'shop'}_card_value_${index}`} className={isInCart ? PRODUCT_CART.goldContainer : PRODUCT_SHOP.goldContainer}>
                            <GoldComponent amount={product.value} />
                        </div>
                        {
                            product.type !== 'ingredient'
                                ? (
                                    <div className={isInCart ? PRODUCT_CART.levelContainer : PRODUCT_SHOP.levelContainer}>
                                        <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_level_text_${index}`} className={isInCart ? PRODUCT_CART.levelRequirement : PRODUCT_SHOP.levelRequirement}>{`Req. Lvl.`}</p>
                                        <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_level_value_${index}`}className={isInCart ? PRODUCT_CART.levelValue : PRODUCT_SHOP.levelValue}>{product.min_lvl}</p>
                                    </div>
                                )
                                : null
                        }

                    </div>
                    {
                        isInCart ? (
                            //ADD CART BUTTONS HERE
                            <>
                                {product.type === 'ingredient' && handleQuantityChange ? (
                                    <div data-testid={`cart_card_quantity_${index}`} className="flex flex-col place-items-center justify-center w-full mt-2 h-[33%]">
                                        <IncrementDecrement
                                            initialValue={quantity}
                                            onValueChange={handleQuantityChange}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {
                                            handleRemoval
                                                ?
                                                <div data-testid={`cart_card_remove_${index}`} className="flex cursor-pointer text-2xl place-items-center justify-center h-[35%] w-[85%] bg-center bg-contain bg-no-repeat bg-[url('/images/shop/store_button.webp')]" onClick={() => handleRemoval(product)}>
                                                    <p>Remove</p>
                                                </div>
                                                : null

                                        }

                                    </>

                                )}
                            </>
                        ) : null
                    }
                </div>
            </div>
        </>
    );
};

export default ProductCard;