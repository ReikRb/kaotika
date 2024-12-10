import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Player } from '@/_common/interfaces/Player';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';
import { Product } from '@/_common/types/Product';
import { DBConnect, DBDisconnect } from '@/database/dbHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { populatePlayer } from './player';
const PlayerModel = require("../../../database/models/playerSchema");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email;
    const product = req.body.product;
    const value = calculatePurchaseValue(product);
    console.log('Product value: ', value);
    
    try {
        await DBConnect();
        let mongoPlayer = await PlayerModel.findOne({ email: email });

        if (mongoPlayer) {
            console.log('Player gold: ', mongoPlayer.gold);
            updatePlayerInventory(mongoPlayer, product);
            updatePlayerGold(mongoPlayer, value);
            console.log('Updated player gold: ', mongoPlayer.gold);
            await mongoPlayer.save();
            const returnPlayer = await populatePlayer()
            console.log('PLAYER TO RETURN: ', returnPlayer);

            await DBDisconnect();
            return res.status(200).json(returnPlayer);
        } else {
            await DBDisconnect();
            return res.status(404).json({ error: 'Player returned is not correct' });
        }
    } catch (error) {
        await DBDisconnect();
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const calculatePurchaseValue = (product: Product) => {
    return Math.floor(product.value / 3);
}

const updatePlayerInventory = (player: Player, product: Product) => {
    switch(product.type) {
        case 'weapon':
            console.log('Player inventory weapons: ', player.inventory.weapons);
            player.inventory.weapons = [...player.inventory.weapons.filter((item) => item._id.toString() !== product._id)];
            console.log('Updated player inventory weapons: ', player.inventory.weapons);
        break;
        case 'shield':
            console.log('Player inventory shields: ', player.inventory.shields);
            player.inventory.shields = [...player.inventory.shields.filter((item) => item._id.toString() !== product._id)];
            console.log('Updated player inventory shields: ', player.inventory.shields);
        break;
        case 'helmet':
            console.log('Player inventory helmets: ', player.inventory.helmets);
            player.inventory.helmets = [...player.inventory.helmets.filter((item) => item._id.toString() !== product._id)];
            console.log('Updated player inventory helmets: ', player.inventory.helmets);
        break;
        case 'armor':
            console.log('Player inventory armors: ', player.inventory.armors);
            player.inventory.armors = [...player.inventory.armors.filter((item) => item._id.toString() !== product._id)];
            console.log('Updated player inventory armors: ', player.inventory.armors);
        break;
        case 'boot':
            console.log('Player inventory boots: ', player.inventory.boots);
            player.inventory.boots = [...player.inventory.boots.filter((item) => item._id.toString() !== product._id)];
            console.log('Updated player inventory boots: ', player.inventory.boots);
        break;
        case 'ring':
            console.log('Player inventory rings: ', player.inventory.rings);
            player.inventory.rings = [...player.inventory.rings.filter((item) => item._id.toString() !== product._id)];
            console.log('Updated player inventory rings: ', player.inventory.rings);
        break;
        case 'artifact':
            console.log('Player inventory artifacts: ', player.inventory.artifacts);
            player.inventory.artifacts = [...player.inventory.artifacts.filter((item) => item._id.toString() !== product._id)];
            console.log('Updated player inventory artifacts: ', player.inventory.artifacts);
        break;
    };
}

const updatePlayerGold = (player: Player, value: number) => {
    player.gold += value;
}