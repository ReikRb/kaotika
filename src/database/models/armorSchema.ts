import mongoose from "mongoose";
const Modifier = require("./modifierSchema");

const armorSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  image: { type: String },
  defense: { type: Number },
  value: { type: Number },
  modifiers: { type: Modifier },
  min_lvl: { type: Number },
  isUnique: { type: Boolean },
  isActive: { type: Boolean },
});

module.exports = mongoose.models.Armor || mongoose.model('Armor', armorSchema);
