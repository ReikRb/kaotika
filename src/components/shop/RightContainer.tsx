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
}

const RightContainer: React.FC<Props> = (data) => {
    return (
        <>
            <div className="w-4/12 grid grid-rows-10 border-2 border-red-600">
                <ProductsCardsContainer products={data.products!}/>
            </div>
        </>
    );
};

export default RightContainer;