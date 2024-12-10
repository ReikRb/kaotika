import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Player } from '@/_common/interfaces/Player';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';
import { Products } from '@/_common/types/Product';
import { DBConnect, DBDisconnect } from '@/database/dbHandler';
import { calculatePurchaseValue, isGoldSufficient, isProductEquiped, isProductInTheInventory } from '@/helpers/calculateIfCanBuy';
import type { NextApiRequest, NextApiResponse } from 'next';
const PlayerModel = require("../../../database/models/playerSchema");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email;
    const products = req.body.products;
    const value = calculatePurchaseValue(products);
    console.log('Products value: ', value);
    
    try {
        await DBConnect();
        let mongoPlayer = await PlayerModel.findOne({ email: email });
        const productInInventory = isProductInTheInventory(mongoPlayer, products);
        const productEquiped = isProductEquiped(mongoPlayer, products);
        const goldSufficient = isGoldSufficient(mongoPlayer, value);
        console.log('Products is not in the inventory: ', productInInventory);
        console.log('Products is not equiped: ', productInInventory);
        console.log('Gold is sufficient: ', goldSufficient);

        if (productInInventory && productEquiped) {
            if (goldSufficient) {
                console.log('Player inventory: ', mongoPlayer.inventory);
                console.log('Player gold: ', mongoPlayer.gold);
                updatePlayerInventory(mongoPlayer, products);
                updatePlayerGold(mongoPlayer, value);
                console.log('Updated player inventory: ', mongoPlayer.inventory);
                console.log('Updated player gold: ', mongoPlayer.gold);
                await mongoPlayer.save();
            } else {
                console.log(`Player gold insufficient: players gold is ${mongoPlayer.gold} and the product value is ${value}`);
                return res.status(400).json({ player: mongoPlayer, error: `Player gold insufficient: players gold is ${mongoPlayer.gold} and the product value is ${value}` });
            }
        } else {
            console.log('Player already has the product');
            return res.status(409).json({ player: mongoPlayer, error: 'Player already has the product' });
        }
        
        await DBDisconnect();

        if (mongoPlayer) {
            return res.status(200).json(mongoPlayer);
        }else {
            return res.status(404).json({ error: 'Player returned is not correct' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const updatePlayerInventory = (player: Player, products: Products) => {
    products.map((product) => {
        switch(product.type) {
            case 'weapon':  
                player.inventory.weapons = [...player.inventory.weapons, product as Weapon];
            break;
            case 'shield':
                player.inventory.shields = [...player.inventory.shields, product as Shield];
            break;
            case 'helmet':
                player.inventory.helmets = [...player.inventory.helmets, product as Helmet];
            break;
            case 'armor':
                player.inventory.armors = [...player.inventory.armors, product as Armor];
            break;
            case 'boot':
                player.inventory.boots = [...player.inventory.boots, product as Boot];
            break;
            case 'ring':
                player.inventory.rings = [...player.inventory.rings, product as Ring];
            break;
            case 'artifact':
                player.inventory.artifacts = [...player.inventory.artifacts, product as Artifact];
            break;
        };
    });
}

const updatePlayerGold = (player: Player, value: number) => {
    player.gold -= value;
}