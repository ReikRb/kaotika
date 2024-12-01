import ProductsCardsContainer from "./ProductsCardsContainer";

const RightContainer: React.FC = (products) => {
    return (
        <>
            <div className="w-4/12 grid grid-rows-10 border-2 border-red-600">
                <ProductsCardsContainer/>
            </div>
        </>
    );
};

export default RightContainer;