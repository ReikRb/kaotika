import ProductCard from "./ProductCard";
import { Product, Products } from "@/_common/types/Product";

interface Props {
    cart: Products;
    onRemoveFromCart: (product: Product) => void;
    handleQuantityChange: (value: number) => void;
    quantity: number;
};

const CartProductsContainer: React.FC<Props> = ({ cart, quantity, handleQuantityChange, onRemoveFromCart }) => {
    return (
        <div className=" w-[100%] h-full place-items-center bg-gray-950 bg-opacity-50
            overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-950
            [&::-webkit-scrollbar-thumb]:bg-gray-800">
            {cart.map((product, i) => (
                <ProductCard key={i.toString()} index={i} product={product} isSelected={false} isInCart={true} quantity={quantity} handleRemoval={() => onRemoveFromCart(product)} handleQuantityChange={handleQuantityChange} onClick={() => null}/>
            ))}
        </div>
    );
};

export default CartProductsContainer;