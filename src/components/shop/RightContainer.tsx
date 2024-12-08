import ProductsCardsContainer from "./ProductsCardsContainer";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Shield } from "@/_common/interfaces/Shield";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import UserComponent from "./UserComponent";
import { Player } from "@/_common/interfaces/Player";
import DropDownComponent from "./DropDownComponent";
import { useEffect, useState } from "react";

interface Props {
    products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[];
    category: string;
    onProductSelect: (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield) => void;
    player: Player;
}

const RightContainer: React.FC<Props> = ({ products, category, onProductSelect, player }) => {

    const [sortedProducts, setSortedProducts] = useState<Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[]>(products);
    const [sortOption, setSortOption] = useState<string>('gold');

    const defensiveEquipmentSortOptions = [
        { key: 'gold', label: 'Gold' },
        { key: 'min_lvl', label: 'Level' },
        { key: 'defense', label: 'Defense' },
        { key: 'intelligence', label: 'Intelligence' },
        { key: 'dexterity', label: 'Dexterity' },
        { key: 'insanity', label: 'Insanity' },
        { key: 'charisma', label: 'Charisma' },
        { key: 'constitution', label: 'Constitution' },
        { key: 'strength', label: 'Strength' },
    ];

    const ofensiveEquipmentsSortOptions = [
        { key: 'gold', label: 'Gold' },
        { key: 'min_lvl', label: 'Level' },
        { key: 'base_porcentage', label: 'Base Porcentage' },
        { key: 'intelligence', label: 'Intelligence' },
        { key: 'dexterity', label: 'Dexterity' },
        { key: 'insanity', label: 'Insanity' },
        { key: 'charisma', label: 'Charisma' },
        { key: 'constitution', label: 'Constitution' },
        { key: 'strength', label: 'Strength' },
    ];
    
    const ingredientsSortOptions = [
        { key: 'gold', label: 'Gold' },
    ];

    const inventorySortOptions = [
        { key: 'gold', label: 'Gold' },
        { key: 'min_lvl', label: 'Level' },
        { key: 'intelligence', label: 'Intelligence' },
        { key: 'dexterity', label: 'Dexterity' },
        { key: 'insanity', label: 'Insanity' },
        { key: 'charisma', label: 'Charisma' },
        { key: 'constitution', label: 'Constitution' },
        { key: 'strength', label: 'Strength' },
    ];

    useEffect(() => {
        setSortedProducts(products);
        sortProducts('gold');
    }, [products]);

    const sortProducts = (option: string) => {
        setSortOption(option);
        
        const sortedProducts = [...products].sort((product, prevProduct) => {
            switch (option) {
                case 'gold':
                    return product.value - prevProduct.value;
                case 'min_lvl':
                    return product.min_lvl - prevProduct.min_lvl;
                case 'defense':
                    return product.defense - prevProduct.defense;
                case 'intelligence':
                    return product.modifiers.intelligence - prevProduct.modifiers.intelligence;
                case 'dexterity':
                    return product.modifiers.dexterity - prevProduct.modifiers.dexterity;
                case 'insanity':
                    return product.modifiers.insanity - prevProduct.modifiers.insanity;
                case 'charisma':
                    return product.modifiers.charisma - prevProduct.modifiers.charisma;
                case 'constitution':
                    return product.modifiers.constitution - prevProduct.modifiers.constitution;
                case 'strength':
                    return product.modifiers.strength - prevProduct.modifiers.strength;
            };
        });
        
        setSortedProducts(sortedProducts);
    };

    const selectOptions = (category: string) => {
        switch (category) {
            case 'weapon':
                return ofensiveEquipmentsSortOptions;
            case 'shield':
            case 'helmet':
            case 'armor':
            case 'boot':
            case 'ring':
            case 'artifact':
                return defensiveEquipmentSortOptions;
            case 'ingredient':
                return ingredientsSortOptions;
            case 'inventory':
                return inventorySortOptions;
        };
    };

    return (
        <>
            <div className="w-[5.6%] h-[100%] bg-contain bg-no-repeat bg-[url('/images/shop/separator_glyph.webp')]">
            </div>
            
            <div className="w-4/12 grid grid-rows-10">
                <DropDownComponent options={selectOptions(category)} selectedOption={sortOption} handleFunction={sortProducts}/>
                <UserComponent name={player.nickname} gold={player.gold} level={player.level}/>
                <ProductsCardsContainer products={sortedProducts} onProductSelect={onProductSelect} />
            </div>
        </>
    );
};

export default RightContainer;