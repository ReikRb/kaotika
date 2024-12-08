import { Armor } from "@/_common/interfaces/Armor";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Boot } from "@/_common/interfaces/Boot";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { Player } from "@/_common/interfaces/Player";
import { Ring } from "@/_common/interfaces/Ring";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";

export const calculatePurchaseValue = (products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[] | (Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient)[]) => {
    let value = 0;

    products.map((product) => {
        value += product.value;
    });

    return value;
}

export const isProductInTheInventory = (player: Player, products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[] | (Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient)[]) => {
    return Object.values(player.inventory).every((items) => {
        return items.every((item) => {
            return products.every((product) => {
                return item._id !== product._id;
            });
        });
    });
}

export const isProductEquiped = (player: Player, products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[] | (Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient)[]) => {
    return Object.values(player.equipment).every((item) => {
        return products.every((product) => {
            return item?._id !== product._id;
        });
    });
}

export const isGoldSufficient = (player: Player, value: number) => {
    return player.gold >= value ? true : false;
}