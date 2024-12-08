import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import { Modifier } from "@/_common/interfaces/Modifier";
import MerchantComponent from "./MerchantComponent";
import ItemContainer from "./ItemContainer";

interface Props {
    currentAttributes: Modifier;
    currentEquipment: {
        helmet: Helmet,
        weapon: Weapon,
        armor: Armor,
        shield: Shield,
        artifact: Artifact,
        boot: Boot,
        ring: Ring,
      }
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield;
  }


const LeftContainer: React.FC<Props> = ({currentAttributes, currentEquipment, product}) => {

    return (
        <>
            <div className="w-4/12 grid grid-rows-10">
                <div className="w-full row-span-7 row-start-0 grid grid-rows-10 p-[4%]">
                    <ItemContainer currentAttributes={currentAttributes} currentEquipment={currentEquipment} product={product}/>
                </div>
                <div className="w-full row-span-3 row-start-8 flex p-[2%]">
                    <MerchantComponent/>
                </div>
            </div>
        </>
    );
};

export default LeftContainer;