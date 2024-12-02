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

const ProductsCardsContainer: React.FC<Props> = (data) => {
    return (
        <>
            <div className="w-full row-span-8 row-start-3 p-[2%] overflow-y-auto border-2 border-red-600">
                {       
                    data.products.map((product, i) => {
                        return (
                            <div key={i} className="w-full row-span-8 row-start-3 p-[2%]">
                                <p>{product.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

export default ProductsCardsContainer;