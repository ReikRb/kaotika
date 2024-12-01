import { Player } from "@/_common/interfaces/Player";
import { Mixed } from "mongoose";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import ShopProgressBar from "./ShopProgressBar";
import { Modifier } from "@/_common/interfaces/Modifier";
import { useEffect, useState } from "react";
import { HealingPotion } from "@/_common/interfaces/HealingPotion";
import { AntidotePotion } from "@/_common/interfaces/AntidotePotion";
import { EnhancerPotion } from "@/_common/interfaces/EnhancerPotion";

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
    const [modifierValue, setModifierValue] = useState<Modifier>({
        intelligence: 0,
        dexterity: 0,
        constitution: 0,
        insanity: 0,
        charisma: 0,
        strength: 0
    })

    useEffect(()=>{
        const equipmentArray = Object.values(currentEquipment)
        const item:any = equipmentArray.find((item) => item.type === product.type)
        
        const resultValue = {
            intelligence: 0,
            dexterity: 0,
            constitution: 0,
            insanity: 0,
            charisma: 0,
            strength: 0
        }
        if (item) {
            resultValue.charisma = product.modifiers.charisma - item.modifiers.charisma
            resultValue.strength = product.modifiers.strength - item.modifiers.strength
            resultValue.insanity = product.modifiers.insanity - item.modifiers.insanity
            resultValue.dexterity = product.modifiers.dexterity - item.modifiers.dexterity
            resultValue.intelligence = product.modifiers.intelligence - item.modifiers.intelligence
            resultValue.constitution = product.modifiers.constitution - item.modifiers.constitution
        }

        setModifierValue(resultValue)
        
    },[product])
    
    return (
        <>
            <div className="w-1/3 h-screen border-2 border-red-600">
            {currentAttributes && product ? (
                <>
                    <h1 className={`text-center text-3xl mt-3 mb-2 ${product.isUnique ? "text-purple-500" : "text-darkSepia"}`}>{product.name}</h1>
                    <p className="text-center text-2xl mb-2">{product.description}</p>
                    <ShopProgressBar label="Charisma" value={currentAttributes.charisma} itemValue={modifierValue.charisma} maxValue={300} />
                    <ShopProgressBar label="Constitution" value={currentAttributes.constitution} itemValue={modifierValue.constitution} maxValue={300} />
                    <ShopProgressBar label="Dexterity" value={currentAttributes.dexterity} itemValue={modifierValue.dexterity} maxValue={300} />
                    <ShopProgressBar label="Insanity" value={currentAttributes.insanity} itemValue={modifierValue.insanity} maxValue={300} />
                    <ShopProgressBar label="Intelligence" value={currentAttributes.intelligence} itemValue={modifierValue.intelligence} maxValue={300} />
                    <ShopProgressBar label="Strength" value={currentAttributes.strength} itemValue={modifierValue.strength} maxValue={500} />
                </>
            ) : <h1 className={`text-center text-3xl mb-2 "text-darkSepia"}`}>Something went wrong. Please reload.</h1>
            }
            </div>
        </>
    );
};

export default LeftContainer;