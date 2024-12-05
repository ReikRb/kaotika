import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

interface Props {
    products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[];
    onProductSelect: (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield) => void;

}

const ProductsCardsContainer: React.FC<Props> = ({ products, onProductSelect }) => {

    const [selectedProduct, setSelectedProduct] = useState<Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient | null>(null);

    useEffect(() => {
        setSelectedProduct(products[0]);
    }, [products]);

    const handleProductSelect = (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient) => {
        setSelectedProduct(product);
        onProductSelect(product);
    };

    return (
        <>
            <div className="w-[73%] ml-[13%] bg-gray-950 bg-opacity-50 row-span-8 row-start-3 p-[2%]
                overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-950
                [&::-webkit-scrollbar-thumb]:bg-gray-800">
                {products.map((product, i) => (
                    <ProductCard key={i.toString()} product={product} isSelected={selectedProduct === product} onClick={() => handleProductSelect(product)}/>
                ))}
            </div>
        </>
    );
};

export default ProductsCardsContainer;