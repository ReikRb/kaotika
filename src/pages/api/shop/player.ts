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
        const response = await Player.findOne({ email: 'unai.roca@ikasle.aeg.eus' });
        
        await DBDisconnect()
        if (response) {
            return res.status(200).json(response);
        }else {
            return res.status(404).json(response);
        }
         
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
    
}