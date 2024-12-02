interface Product {
}

const ProductCard: React.FC<Product> = () => {
    return (
        <>
            <div className=" row-span-3 row-start-8 flex m-[2%] bg-[url('/images/shop/product_card_container_selected.webp')] bg-cover bg-no-repeat">
            {/* <div className="border-1 border-red-600 bg-[url('/images/shop/product_card_item.webp')] bg-contain bg-no-repeat">
            </div>

                <img src="/images/gold.png" alt="HeaderDivider" width={40} height={1}/>
                <div className="w-8/12 h-full">
                    <p className="text-4xl">0</p>
                </div> */}
            </div>
        </>
    );
};

export default ProductCard;
