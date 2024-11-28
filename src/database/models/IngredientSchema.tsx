import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: 'string' },
  description: { type: 'string' },
  value: { type: 'number' },
  effects: { type: 'array', items: { type: 'string' } },
  image: { type: 'string' },
  type: { type: 'string' },
});

export const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);