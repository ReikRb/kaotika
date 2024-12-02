import ProductCard from "./ProductCard";

const RightContainer: React.FC = () => {
    return (
        <>
            <div className="w-4/12 h-full border-2 border-red-600">
                <ProductCard/>
            </div>
        </>
    );
};

export default RightContainer;