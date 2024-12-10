import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { Product, Products } from "@/_common/types/Product";
import { MERCHANT_MESSAGES } from "@/constants/constants";

interface Props {
    products: Products;
    onProductSelect: (product: Product) => void;
    setMerchantMessage: Function;
    isSelling: boolean;
};

const ProductsCardsContainer: React.FC<Props> = ({ products, onProductSelect, setMerchantMessage, isSelling }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

    useEffect(() => {
        setSelectedProduct(products[0]);
    }, [products]);

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        onProductSelect(product);
        setMerchantMessage(MERCHANT_MESSAGES.selectNewProduct);
    };

    return (
        <>
            <div className="w-[73%] ml-[13%] bg-gray-950 bg-opacity-50 row-span-8 row-start-3 p-[2%]
                overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-950
                [&::-webkit-scrollbar-thumb]:bg-gray-800">
                {products.map((product, i) => (
                    <ProductCard 
                    index ={i} 
                    key={i.toString()} 
                    product={product} 
                    isSelected={selectedProduct === product} 
                    onClick={() => handleProductSelect(product)}
                    isSelling={isSelling}
                    handleRemoval={() => {}}
                    handleQuantityChange={() => {}}
                    />
                ))}
            </div>
        </>
    );
};

export default ProductsCardsContainer;