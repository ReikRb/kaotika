import { DBDisconnect } from '@/database/dbHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await DBDisconnect();
        return res.status(200).json(true);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};