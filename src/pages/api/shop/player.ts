import { DBConnect } from '@/database/dbHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
const Player = require("../../../database/models/playerSchema");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email;
  console.log('received email in query:', email);

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    await DBConnect();
    const response = await populatePlayer(email)

    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json(response);
    }

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const populatePlayer = async (email: string | string[]) => {
  const playerPopulated: any = await Player.findOne({ email: email })
  .populate('profile')
  .populate({
    path: 'equipment',
    populate: [ 
      'armor',
      'weapon',
      'artifact',
      'ring',
      'helmet',
      'shield',
      'boot',
      'healing_potion',
      'enhancer_potion',
      { path: 'antidote_potion', populate: { path: 'recovery_effect' }}
    ]
  })
  .populate({
    path: 'inventory',
    populate: [
      'helmets',
      'shields',
      'weapons',
      'boots',
      'rings',
      'armors',
      'artifacts',
      'healing_potions',
      'enhancer_potions',
      { path: 'antidote_potions', populate: { path: 'recovery_effect' }}
    ]
  })
  .exec();
    
	const returnPlayer = await updateIngredientsWithQuantity(playerPopulated);
	return returnPlayer;
};

const updateIngredientsWithQuantity = async (playerPopulated: any) => {
  //Asignamos ingredient y añadimos atributo quantity
  const inputIngredientIds = playerPopulated.inventory.ingredients;

  const ingredientQuantites: any = [];

  inputIngredientIds.forEach((ingredient: any) => {
    const indexFound = ingredientQuantites.findIndex((item: any) => item._id.equals(ingredient._id));

    if (indexFound !== -1) {
      ingredientQuantites[indexFound].qty++;
    }
    else {
      ingredientQuantites.push({ _id: ingredient._id, qty: 1 });
    }
  });

	const { ingredients } = await playerPopulated.inventory.populate('ingredients');

  const ingredientQuantitiesPopulated = ingredientQuantites.map((item: any) => {
    const object = ingredients.filter((ingredient: any) => item._id.equals(ingredient._id))[0];

    return { ...object.toObject(), qty: item.qty };
  });

  const returnPlayer = { ...playerPopulated.toObject() };
  returnPlayer.inventory.ingredients = ingredientQuantitiesPopulated;

  return returnPlayer;
};