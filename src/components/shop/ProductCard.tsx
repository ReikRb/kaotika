import { Armor } from "@/_common/interfaces/Armor";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Boot } from "@/_common/interfaces/Boot";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { Ring } from "@/_common/interfaces/Ring";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";
import GoldComponent from "./GoldComponent";

interface Product {
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;
    isSelected: boolean;
    onClick: () => void;
}

const ProductCard: React.FC<Product> = ({ product, onClick, isSelected }) => {
    return (
        <>
            <div 
            className={`h-[41.75%] row-span-3 row-start-8 flex mt-[3%] bg-contain bg-no-repeat 
                ${isSelected ? "bg-[url('/images/shop/product_card_selected.webp')]" : "bg-[url('/images/shop/product_card_unselected.webp')]"}
                transform transition-transform duration-300 hover:scale-105 cursor-pointer`}
                onClick={onClick}
            >
            
                <div className=" justify-center content-center self-center w-[90%] h-[90%] m-[2%] bg-contain bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]">
                    <img className="ml-[32%] mb-[3%] w-[37%]" src={`https://kaotika.vercel.app${product.image}`} alt="HeaderDivider" />
                </div>
                <div className=" text-center content-center ml-[2%] w-[80%] space-y-[7%] inline-block">
                    <p className=" text-2xl text-white mr-[15%]">{product.name}</p>
                    <div className="w-[50%] ml-[25%] align-center">
                        <GoldComponent amount={product.value} />
                    </div>
                    {
                        product.type !== 'Ingredient'
                            ? (
                                <div className=" justify-center flex space-x-[15%] inline-row">
                                    <p className="text-xl w-[20%] text-white">{`Req. Lvl.`}</p>
                                    <p className="text-4xl self-center">{product.min_lvl}</p>
                                </div>
                            )
                            : null
                    }
                </div>
            </div>
        </>
    );
};

export default ProductCard;