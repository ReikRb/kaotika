import { NextApiRequest, NextApiResponse } from 'next';
import { Ingredient } from '@/database/models/IngredientSchema';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await mongoose.connect(process.env.MONGO_URL + process.env.DB);
		const ingredients = await Ingredient.find();
		console.log(ingredients);
		res.status(200).json(ingredients);
		await mongoose.disconnect();
	} catch (error) {
		console.error('Failed to get ingredients:', error);
		res.status(500).json({ error: 'Failed to get ingredients' });
	}
}