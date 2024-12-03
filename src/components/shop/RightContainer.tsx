import ProductsCardsContainer from "./ProductsCardsContainer";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import { Ingredient } from "@/_common/interfaces/Ingredient";

interface Props {
    products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[];
    onProductSelect: (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield) => void;

}

const RightContainer: React.FC<Props> = ({ products, onProductSelect }) => {
    return (
        <>
            <div className="w-[5.6%] h-[100%] bg-cover bg-no-repeat bg-[url('/images/shop/separator_glyph.webp')]">

            </div>
            <div className="w-4/12 grid grid-rows-10">
                <ProductsCardsContainer products={products} onProductSelect={onProductSelect} />
            </div>
        </>
    );
};

export default RightContainer;