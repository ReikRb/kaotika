import { Product } from "@/_common/types/Product";
import GoldComponent from "./GoldComponent";
import IncrementDecrement from "./UpdateQtyButton";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Shield } from "@/_common/interfaces/Shield";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Ingredient } from "@/_common/interfaces/Ingredient";

interface Props {
    product: Product;
    isSelected: boolean;
    onClick: () => void;
    handleRemoval: (product: Product) => void;
    isInCart?: boolean;
    handleQuantityChange: (product: Product, quantity: number) => void;
    quantity?: number;
    index: number;
    isSelling?: boolean
};

const PRODUCT_CART = {
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
};

const PRODUCT_SHOP = {
    mainContainer: `h-[41.5%] row-span-3 row-start-8 flex mt-[3%] bg-contain bg-no-repeat transform transition-transform duration-300 hover:scale-105 cursor-pointer`,
    imgContainer: "flex justify-center place-items-center place-items-center mt-[2.8%] w-[90%] h-[90%] ml-[2%] bg-contain bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]",
    productImg: "place-items-center self-center pb-[3%] w-[32%]",
    infoContainer: "text-center content-center ml-[2%] w-[80%] space-y-[7%] inline-block",
    name: "text-2xl text-white mr-[15%]",
    requirementsContainer: "",
    goldContainer: 'w-[50%] ml-[25%] align-center',
    levelContainer: 'justify-center flex space-x-[15%] inline-row',
    levelRequirement: 'text-xl w-[20%] text-white',
    levelValue: 'text-4xl self-center',
    qtyContainer: 'justify-center flex space-x-[18%] pr-[9%] inline-row',
    qtyRequirement: 'text-2xl w-[15%] text-white mt-[4%]',
    qtyValue: 'text-4xl mb-[7%]'
};

const isEquipment = (product: Product): product is (Weapon | Shield | Helmet | Armor | Boot | Ring | Artifact) => {
    return "min_lvl" in product;
};

const isIngredient = (product: Product): product is Ingredient => {
    return "qty" in product;
};

const ProductCard: React.FC<Props> = ({ index, product, onClick, isSelected, isInCart = false, quantity = 1, handleQuantityChange, handleRemoval, isSelling = false }) => {
    return (
        <>
            <div
                className={`${isInCart ? PRODUCT_CART.mainContainer : PRODUCT_SHOP.mainContainer} ${!isInCart && isSelected ? "bg-[url('/images/shop/product_card_selected.webp')]" : "bg-[url('/images/shop/product_card_unselected.webp')]"}`}
                onClick={onClick}
                data-testid={`${isInCart ? 'cart' : 'shop'}_card_${index}`}
            >
                <div className={isInCart ? PRODUCT_CART.imgContainer : PRODUCT_SHOP.imgContainer}>
                    <img data-testid={`${isInCart ? 'cart' : 'shop'}_card_img_${index}`} className={isInCart ? PRODUCT_CART.productImg : PRODUCT_SHOP.productImg} src={`https://kaotika.vercel.app${product.image}`} alt="HeaderDivider" />
                </div>
                <div className={isInCart ? PRODUCT_CART.infoContainer : PRODUCT_SHOP.infoContainer}>
                    <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_name_${index}`} className={isInCart ? PRODUCT_CART.name : PRODUCT_SHOP.name}>{product.name}</p>
                    <div className={isInCart ? PRODUCT_CART.requirementsContainer : PRODUCT_SHOP.requirementsContainer}>
                        <div data-testid={`${isInCart ? 'cart' : 'shop'}_card_value_${index}`} className={isInCart ? PRODUCT_CART.goldContainer : PRODUCT_SHOP.goldContainer}>


                            {isSelling ?
                                <GoldComponent amount={Math.floor(product.value / 3) * quantity} />
                                :
                                <GoldComponent amount={isInCart ? product.value * quantity : product.value} />
                            }
                        </div>
                        {
                            product.type !== 'ingredient'
                                ? (
                                    <div className={isInCart ? PRODUCT_CART.levelContainer : PRODUCT_SHOP.levelContainer}>
                                        <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_level_text_${index}`} className={isInCart ? PRODUCT_CART.levelRequirement : PRODUCT_SHOP.levelRequirement}>{`Req. Lvl.`}</p>
                                        <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_level_value_${index}`} className={isInCart ? PRODUCT_CART.levelValue : PRODUCT_SHOP.levelValue}>{isEquipment(product) ? product.min_lvl : null}</p>
                                    </div>
                                )
                                : isSelling
                                ? (
                                    <div className={PRODUCT_SHOP.qtyContainer}>
                                        <p data-testid={`shop_card_qty_text_${index}`} className={PRODUCT_SHOP.qtyRequirement}>{`Qty.`}</p>
                                        <p data-testid={`shop_card_qty_value_${index}`} className={PRODUCT_SHOP.qtyValue}>{isIngredient(product) ? product.qty : null}</p>
                                    </div>
                                ) : null
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
                                            onValueChange={(product, newQuantity) => {
                                                if (newQuantity === 0) {
                                                    handleRemoval(product);
                                                } else {
                                                    handleQuantityChange(product, newQuantity);
                                                }
                                            }}
                                            isInCart={true}
                                            product={product}
                                            displayButtons={isSelling}
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