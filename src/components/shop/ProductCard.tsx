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

interface Product {
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;
    isSelected: boolean;
    onClick: () => void;
    isInCart?: boolean
}

interface Styles {
    mainContainer: string;
    imgContainer: string;
    productImg: string;
    infoContainer: string;
    name: string;
    requirementsContainer: string;
    goldContainer: string;
    levelContainer: string;
    levelRequirement: string;
    levelValue: string;
}

const ProductCard: React.FC<Product> = ({ product, onClick, isSelected, isInCart = false }) => {

    const [componentStyles, setComponentStyles] = useState<Styles>({
        mainContainer: '',
        imgContainer: '',
        productImg: '',
        infoContainer: '',
        name: '',
        requirementsContainer: '',
        goldContainer: '',
        levelContainer: '',
        levelRequirement: '',
        levelValue: '',

    })

    useEffect(() => {

        const shopStyles = {
            mainContainer: `h-[41.75%] row-span-3 row-start-8 flex mt-[3%] bg-contain bg-no-repeat ${isSelected ? "bg-[url('/images/shop/product_card_selected.webp')]" : "bg-[url('/images/shop/product_card_unselected.webp')]"} transform transition-transform duration-300 hover:scale-105 cursor-pointer`,
            imgContainer: "place-items-center w-[90%] h-[90%] ml-[2%] bg-contain bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]",
            productImg: "place-items-center ml-[31%] mt-[30%] w-[37%]",
            infoContainer: "text-center content-center ml-[2%] w-[80%] space-y-[7%] inline-block",
            name: " text-2xl text-white mr-[15%]",
            requirementsContainer: "",
            goldContainer: 'w-[50%] ml-[25%] align-center',
            levelContainer: 'justify-center flex space-x-[15%] inline-row',
            levelRequirement: 'text-xl w-[20%] text-white',
            levelValue: 'text-4xl self-center'
        }

        const cartStyles = {
            mainContainer: "flex h-[53%] w-[90%] row-span-3 row-start-8 place-items-center justify-center mt-[3%] ml-[5%] bg-contain bg-center bg-no-repeat bg-[url('/images/shop/product_card_unselected.webp')]",
            imgContainer: "flex w-[35%] justify-center place-items-center h-[90%]  bg-contain bg-center bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]",
            productImg: 'w-[40%]',
            infoContainer: 'w-[30%] h-[90%] place-items-center text-center justify-content-start space-y-[7%] inline-block',
            name: "h-[30%]  ml-[5%] self-center w-[90%] text-2xl text-white",
            requirementsContainer: "w-[100%] flex place-items-center justify-center align-center",
            goldContainer: "w-[50%] flex  justify-content-start mr-[5%]",
            levelContainer: "justify-end flex space-x-[50%] inline-row",
            levelRequirement: "text-xl w-[2%] text-white",
            levelValue: "text-4xl pr-[12%]"
        }

        const result = isInCart ? cartStyles : shopStyles

        setComponentStyles(result)
    }, [isInCart, isSelected])

    return (
        <>
            <div
                className={componentStyles.mainContainer}
                onClick={onClick}
            >
                <div className={componentStyles.imgContainer}>
                    <img className={componentStyles.productImg} src={`https://kaotika.vercel.app${product.image}`} alt="HeaderDivider" />
                </div>
                <div className={componentStyles.infoContainer}>
                    <p className={componentStyles.name}>{product.name}</p>
                    <div className={componentStyles.requirementsContainer}>
                        <div className={componentStyles.goldContainer}>
                            <GoldComponent amount={product.value} />
                        </div>
                        {
                            product.type !== 'ingredient'
                                ? (
                                    <div className={componentStyles.levelContainer}>
                                        <p className={componentStyles.levelRequirement}>{`Req. Lvl.`}</p>
                                        <p className={componentStyles.levelValue}>{product.min_lvl}</p>
                                    </div>
                                )
                                : null
                        }
                        {
                            isInCart ? (
                                //ADD CART BUTTONS HERE
                                <>
                                
                                </>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;