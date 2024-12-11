import { Player } from '@/_common/interfaces/Player';
import { Cart, Product } from '@/_common/types/Product';
import { DBConnect, DBDisconnect } from '@/database/dbHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { populatePlayer } from './player';
import { UnPopulatedPlayer } from '@/_common/interfaces/UnPopulatedPlayer';
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
                    const returnPlayer = await populatePlayer()
                    console.log('PLAYER TO RETURN: ', returnPlayer);
                    
                    await DBDisconnect();
                    return res.status(200).json(returnPlayer);
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
};

const updatePlayerInventory = (player: UnPopulatedPlayer, productsData: Cart) => {
    productsData.map((productData) => {
        switch(productData.product.type) {
            case 'weapon':  
                player.inventory.weapons = [...player.inventory.weapons, productData.product._id];
            break;
            case 'shield':
                player.inventory.shields = [...player.inventory.shields, productData.product._id];
            break;
            case 'helmet':
                player.inventory.helmets = [...player.inventory.helmets, productData.product._id];
            break;
            case 'armor':
                player.inventory.armors = [...player.inventory.armors, productData.product._id];
            break;
            case 'boot':
                player.inventory.boots = [...player.inventory.boots, productData.product._id];
            break;
            case 'ring':
                player.inventory.rings = [...player.inventory.rings, productData.product._id];
            break;
            case 'artifact':
                player.inventory.artifacts = [...player.inventory.artifacts, productData.product._id];
            break;
            case 'ingredient':
                for (let index = 0; index < productData.quantity; index++) {
                    player.inventory.ingredients = [...player.inventory.ingredients, productData.product._id];
                }
            break;
        };
    });
};

const updatePlayerGold = (player: Player, value: number) => {
    player.gold -= value;
};

const calculatePurchaseValue = (productsData: {product: Product, quantity: number}[]) => {
    let value = 0;

    productsData.map((productData) => {
        value += productData.product.value * productData.quantity;
    });

    return value;
};

const isProductInTheInventory = (player: Player, productsData: {product: Product, quantity: number}[]) => {
    return Object.values(player.inventory).every((items) => {
        return items.every((item: Product) => {
            return productsData.every((productData) => {
                if (productData.product.type !== 'ingredient') {
                    return item._id.toString() !== productData.product._id.toString();
                }
                return true
                });   
        });
    });
};

const isProductEquiped = (player: Player, productsData: {product: Product, quantity: number}[]) => {
    return Object.values(player.equipment).every((item) => {
        return productsData.every((productData) => {
            return item?._id.toString() !== productData.product._id;
        });
    });
};

const isGoldSufficient = (player: Player, value: number) => {
    return player.gold >= value ? true : false;
};