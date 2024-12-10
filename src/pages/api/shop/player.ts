import { DBConnect, DBDisconnect } from '@/database/dbHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
const Player = require("../../../database/models/playerSchema");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;
    console.log('received email in query:', email);

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        await DBConnect()
        const response = await populatePlayer()
        await DBDisconnect()
        if (response) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json(response);
        }

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

}

const populatePlayer = async () => {

    
    const playerPopulated: any = await Player.findOne({ email: 'unai.roca@ikasle.aeg.eus' }).populate('profile').exec();

    // Poblamos el equipo
    await playerPopulated.equipment.populate('armor');
    await playerPopulated.equipment.populate('weapon');
    await playerPopulated.equipment.populate('artifact');
    await playerPopulated.equipment.populate('ring');
    await playerPopulated.equipment.populate('helmet');
    await playerPopulated.equipment.populate('shield');
    await playerPopulated.equipment.populate('boot');


    // Poblamos el inventario
    await playerPopulated.inventory.populate('helmets');
    await playerPopulated.inventory.populate('shields');
    await playerPopulated.inventory.populate('weapons');
    await playerPopulated.inventory.populate('boots');
    await playerPopulated.inventory.populate('rings');
    await playerPopulated.inventory.populate('armors');
    await playerPopulated.inventory.populate('artifacts');
    await playerPopulated.inventory.populate('ingredients');

    console.log('playerPopulated', playerPopulated);
    return playerPopulated;
}

