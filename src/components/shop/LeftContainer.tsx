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
    console.log('Current P LeftC: ', product.name);

    return (
        <>
            <div className="w-4/12 grid grid-rows-10 border-2 border-red-600">
                <ItemContainer currentAttributes={currentAttributes} currentEquipment={currentEquipment} product={product}/>       
                <MerchantComponent/>
            </div>
        </>
    );
};

export default LeftContainer;