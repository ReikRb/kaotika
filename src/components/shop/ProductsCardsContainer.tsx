import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import ProductCard from "./ProductCard";

interface Props {
    products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[];
    onProductSelect: (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield) => void;

}

const ProductsCardsContainer: React.FC<Props> = ({ products, onProductSelect }) => {
    return (
        <>
            <div className="w-[73%] ml-[13%] bg-gray-950 bg-opacity-50 row-span-8 row-start-3 p-[2%] overflow-y-auto">
            {products.map((product, i) => (
                <ProductCard key={i.toString()} product={product} onClick={() => onProductSelect(product)} />
            ))}
        </div>
        </>
    );
};

export default ProductsCardsContainer;