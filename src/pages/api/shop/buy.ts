import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { Player } from '@/_common/interfaces/Player';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';
import { DBConnect, DBDisconnect } from '@/database/dbHandler';
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

        if (value <= mongoPlayer.gold) {
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

const calculatePurchaseValue = (products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[]) => {
    let value = 0;

    products.map((product) => {
        value += product.value;
    });

    return value;
}

const updatePlayerInventory = (player: Player, products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[]) => {
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