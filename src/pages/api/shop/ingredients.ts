import { NextApiRequest, NextApiResponse } from 'next';
import { Ingredient } from '@/database/models/IngredientSchema';
import { DBConnect, DBDisconnect } from '@/database/dbHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await DBConnect();
		const ingredients = await Ingredient.find();
		console.log(ingredients);
		await DBDisconnect();
		res.status(200).json(ingredients);
	} catch (error) {
		console.error('Failed to get ingredients:', error);
		res.status(500).json({ error: 'Failed to get ingredients' });
	}
}