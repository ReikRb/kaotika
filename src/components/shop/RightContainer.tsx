import ProductsCardsContainer from "./ProductsCardsContainer";
import UserComponent from "./UserComponent";
import { Player } from "@/_common/interfaces/Player";
import { useEffect, useState } from "react";
import { Product, Products } from "@/_common/types/Product";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Ring } from "@/_common/interfaces/Ring";
import DropDownComponent from "./DropDownComponent";

interface Props {
    products: Products;
    category: string;
    onProductSelect: (product: Product) => void;
    player: Player;
    setMerchantMessage: Function;
    setSortedProducts: (products: Products) => void;
};

const hasDefense = (product: Product): product is (Helmet | Armor | Boot | Shield) => {
    return "defense" in product;
};

const isWeapon = (product: Product): product is Weapon => {
    return "base_percentage" in product && "die_faces" in product;
};

const isEquipment = (product: Product): product is (Weapon | Shield | Helmet | Armor | Boot | Ring | Artifact) => {
    return "min_lvl" in product;
};

const RightContainer: React.FC<Props> = ({ products, category, onProductSelect, player, setMerchantMessage, setSortedProducts}) => {
    const [sortOption, setSortOption] = useState<string>('gold');
    const [sortAscendant, setSortAscendant] = useState<boolean>(false);

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
        { key: 'gold', label: 'Gold'},
    ];

    const defaultSortOptions = [
        { key: 'gold', label: 'Gold' },
    ];

    useEffect(() => {
        if (products.length > 0){
            InitialsortProducts('gold');
            setSortAscendant(false);
        }
    }, [category]);

    const changeAscendant = () => {
        setSortAscendant(sortAscendant ? false : true);
        sortProducts(sortOption);
    };

    const sortProducts = (option: string) => {
        setSortOption(option);
        
        const sortedProducts: Products = [...products].sort((product, prevProduct) => {
            switch (option) {
                case 'gold':
                    return sortAscendant ? product.value - prevProduct.value : prevProduct.value - product.value;
                case 'min_lvl':
                    return isEquipment(product) && isEquipment(prevProduct) ? sortAscendant ? product.min_lvl - prevProduct.min_lvl : prevProduct.min_lvl - product.min_lvl : 1;
                case 'base_porcentage':
                    return isWeapon(product) && isWeapon(prevProduct) ? sortAscendant ? product.base_percentage - prevProduct.base_percentage : prevProduct.base_percentage - product.base_percentage : 1;
                case 'defense':
                    return hasDefense(product) && hasDefense(prevProduct) ? sortAscendant ? product.defense - prevProduct.defense : prevProduct.defense - product.defense : 1;
                case 'intelligence':
                    return isEquipment(product) && isEquipment(prevProduct) ? sortAscendant ? product.modifiers.intelligence - prevProduct.modifiers.intelligence : prevProduct.modifiers.intelligence - product.modifiers.intelligence : 1;
                case 'dexterity':
                    return isEquipment(product) && isEquipment(prevProduct) ? sortAscendant ? product.modifiers.dexterity - prevProduct.modifiers.dexterity : prevProduct.modifiers.dexterity - product.modifiers.dexterity : 1;
                case 'insanity':
                    return isEquipment(product) && isEquipment(prevProduct) ? sortAscendant ? product.modifiers.insanity - prevProduct.modifiers.insanity : prevProduct.modifiers.insanity - product.modifiers.insanity : 1;
                case 'charisma':
                    return isEquipment(product) && isEquipment(prevProduct) ? sortAscendant ? product.modifiers.charisma - prevProduct.modifiers.charisma : prevProduct.modifiers.charisma - product.modifiers.charisma : 1;
                case 'constitution':
                    return isEquipment(product) && isEquipment(prevProduct) ? sortAscendant ? product.modifiers.constitution - prevProduct.modifiers.constitution : prevProduct.modifiers.constitution - product.modifiers.constitution : 1;
                case 'strength':
                    return isEquipment(product) && isEquipment(prevProduct) ? sortAscendant ? product.modifiers.strength - prevProduct.modifiers.strength : prevProduct.modifiers.strength - product.modifiers.strength : 1;
                default:
                    return 1;
            };
        });

        setSortedProducts(sortedProducts);
    };

    const InitialsortProducts = (option: string) => {
        setSortOption(option);
        
        const sortedProducts: Products = [...products].sort((product, prevProduct) => {
            return product.value - prevProduct.value;
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
            default:
                return defaultSortOptions;
        };
    };

    return (
        <>
            <div className="w-[5.6%] h-[100%] bg-contain bg-no-repeat bg-[url('/images/shop/separator_glyph.webp')]"/>

            <div className="w-4/12 grid grid-rows">
                <DropDownComponent options={selectOptions(category)} selectedOption={sortOption} handleFunction={sortProducts}/>
                <button className="absolute right-1 2xl:text-4xl lg:text-2xl sm:text-xl text-black" onClick={() => {changeAscendant()}}>{sortAscendant ? '↑' : '↓'}</button>
                <UserComponent name={player.nickname} gold={player.gold} level={player.level}/>
                <ProductsCardsContainer
                    isSelling={category === 'inventory' ? true : false}
                    products={products}
                    onProductSelect={onProductSelect}
                    setMerchantMessage={setMerchantMessage}
                />
            </div>
        </>
    );
};

export default RightContainer;