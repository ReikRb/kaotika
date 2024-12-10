import { Player } from '@/_common/interfaces/Player';
import { Product, Products } from '@/_common/types/Product';
import { DBConnect, DBDisconnect } from '@/database/dbHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
const PlayerModel = require("../../../database/models/playerSchema");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await DBConnect();
        const email = req.body.email;
        const productsData = req.body.products;
        let mongoPlayer = await PlayerModel.findOne({ email: email });
        
        if (mongoPlayer){
            const value = calculatePurchaseValue(productsData);
            console.log('Products value: ', value);
            const productInInventory = isProductInTheInventory(mongoPlayer, productsData);
            const productEquiped = isProductEquiped(mongoPlayer, productsData);
            const goldSufficient = isGoldSufficient(mongoPlayer, value);
            console.log('Products is not in the inventory: ', productInInventory);
            console.log('Products is not equiped: ', productInInventory);
            console.log('Gold is sufficient: ', goldSufficient);

            if (productInInventory && productEquiped) {
                if (goldSufficient) {
                    console.log('Player inventory: ', mongoPlayer.inventory);
                    console.log('Player gold: ', mongoPlayer.gold);
                    updatePlayerInventory(mongoPlayer, productsData);
                    updatePlayerGold(mongoPlayer, value);
                    console.log('Updated player inventory: ', mongoPlayer.inventory);
                    console.log('Updated player gold: ', mongoPlayer.gold);
                    await mongoPlayer.save();
                    await DBDisconnect();
                    return res.status(200).json(mongoPlayer);
                } else {
                    await DBDisconnect();
                    console.log(`Player gold insufficient: players gold is ${mongoPlayer.gold} and the product value is ${value}`);
                    return res.status(400).json({ player: mongoPlayer, error: `Player gold insufficient: players gold is ${mongoPlayer.gold} and the product value is ${value}` });
                }
            } else {
                await DBDisconnect();
                console.log('Player already has the product');
                return res.status(409).json({ player: mongoPlayer, error: 'Player already has the product' });
            }
        } else {
            await DBDisconnect();
            return res.status(404).json({ error: 'Player returned is not correct' });
        }
    } catch (error) {
        await DBDisconnect();
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const updatePlayerInventory = (player: Player, products: string) => {
    products.map((product) => {
        console.log(product.product._id);
        
        switch(product.product.type) {
            case 'weapon':  
                player.inventory.weapons = [...player.inventory.weapons, product.product._id];
                console.log(player.inventory);
            break;
            case 'shield':
                player.inventory.shields = [...player.inventory.shields, product.product._id];
            break;
            case 'helmet':
                player.inventory.helmets = [...player.inventory.helmets, product.product._id];
            break;
            case 'armor':
                player.inventory.armors = [...player.inventory.armors, product.product._id];
            break;
            case 'boot':
                player.inventory.boots = [...player.inventory.boots, product.product._id];
            break;
            case 'ring':
                player.inventory.rings = [...player.inventory.rings, product.product._id];
            break;
            case 'artifact':
                player.inventory.artifacts = [...player.inventory.artifacts, product.product._id];
            break;
            case 'ingredient':
                player.inventory.ingredients = [...player.inventory.ingredients, product.product._id];
            break;
        };
    });
}

const updatePlayerGold = (player: Player, value: number) => {
    player.gold -= value;
}

const calculatePurchaseValue = (productsData: Products) => {
    let value = 0;

    productsData.map((products) => {
        
        value += products.product.value * products.quantity;
    });

    return value;
};

const isProductInTheInventory = (player: Player, products:Products) => {
    return Object.values(player.inventory).every((items) => {
        return items.every((item: Product) => {
            return products.every((product) => {
                return item._id !== product._id;
            });
        });
    });
};

const isProductEquiped = (player: Player, products: Products) => {
    return Object.values(player.equipment).every((item) => {
        return products.every((product) => {
            return item?._id !== product._id;
        });
    });
};

const isGoldSufficient = (player: Player, value: number) => {
    return player.gold >= value ? true : false;
};