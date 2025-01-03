import { Modifier } from "@/_common/interfaces/Modifier";
import ShopProgressBar from "./ShopProgressBar";
import { useEffect, useState } from "react";
import { Equipment } from "@/_common/interfaces/Equipment";
import { Product } from "@/_common/types/Product";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Shield } from "@/_common/interfaces/Shield";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";

interface Props {
    currentAttributes: Modifier;
    currentEquipment: Equipment;
    product: Product;
};

const isEquipment = (product: Product): product is (Weapon | Shield | Helmet | Armor | Boot | Ring | Artifact) => {
    return "modifiers" in product;
};

const isMagical = (product: Product): product is Ingredient => {
    return "effects" in product;
};

const ItemContainer: React.FC<Props> = ({currentAttributes, currentEquipment, product}) => {
    const [modifierValue, setModifierValue] = useState<Modifier>({
        intelligence: 0,
        dexterity: 0,
        constitution: 0,
        insanity: 0,
        charisma: 0,
        strength: 0
    });

    useEffect(() => {
        if (product) { 
            const equipmentArray = Object.values(currentEquipment)
            const item:any = equipmentArray.find((item) => item.type === product.type)
            
            const resultValue = {
                intelligence: 0,
                dexterity: 0,
                constitution: 0,
                insanity: 0,
                charisma: 0,
                strength: 0,
            }

            if (item) {
                resultValue.charisma = isEquipment(product) ? product.modifiers.charisma - item.modifiers.charisma : 0;
                resultValue.strength = isEquipment(product) ? product.modifiers.strength - item.modifiers.strength : 0;
                resultValue.insanity = isEquipment(product) ? product.modifiers.insanity - item.modifiers.insanity : 0;
                resultValue.dexterity = isEquipment(product) ? product.modifiers.dexterity - item.modifiers.dexterity : 0;
                resultValue.intelligence = isEquipment(product) ? product.modifiers.intelligence - item.modifiers.intelligence : 0;
                resultValue.constitution = isEquipment(product) ? product.modifiers.constitution - item.modifiers.constitution : 0;
            }

            setModifierValue(resultValue)
        }
    },[product]);

    const renderEffect = (item: string) => {

        const effect = item.replace(/_/g, ' ');
        const firstLetter = effect.charAt(0);
        const rest = effect.slice(1);
        return firstLetter.toUpperCase() + rest;
    };

    return (
        <>
            {product && currentAttributes ? (
                <>
                    <div className="flex flex-col place-content-around row-span-3 row-start-0">
                        <h2 className="text-center 2xl:text-4xl lg:text-2xl sm:text-lg pb-[2%] text-darkSepia font-black border-medievalSepia border-b-1 ">{product.name}</h2>
                        <p className="text-center 2xl:text-3xl lg:text-xl sm:text-base">{product.description}</p>
                    </div>
                    {product.type === 'ingredient' ? (
                        <div className="flex justify-center place-items-center row-span-7 row-start-4">
                            <p className="2xl:text-3xl lg:text-xl sm:text-lg text-white">{renderEffect(isMagical(product) ? product.effects[0] : '')}</p>
                        </div>
                    ) : (
                        <div className="row-span-7 row-start-4 place-content-center">
                            <ShopProgressBar label="Charisma" value={currentAttributes.charisma} itemValue={modifierValue.charisma} maxValue={300}/>
                            <ShopProgressBar label="Constitution" value={currentAttributes.constitution} itemValue={modifierValue.constitution} maxValue={300}/>
                            <ShopProgressBar label="Dexterity" value={currentAttributes.dexterity} itemValue={modifierValue.dexterity} maxValue={300}/>
                            <ShopProgressBar label="Insanity" value={currentAttributes.insanity} itemValue={modifierValue.insanity} maxValue={300}/>
                            <ShopProgressBar label="Intelligence" value={currentAttributes.intelligence} itemValue={modifierValue.intelligence} maxValue={300}/>
                            <ShopProgressBar label="Strength" value={currentAttributes.strength} itemValue={modifierValue.strength} maxValue={500}/>
                        </div>
                    )}
                </>     
            ) : <h2 className={`text-center 2xl:text-3xl lg:text-xl sm:text-base mb-2 "text-darkSepia"}`}> </h2>}
        </>
    );
};

export default ItemContainer;