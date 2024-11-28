
import mongoose from "mongoose";
const Modifier = require("./modifierSchema");

const helmetSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  value: { type: Number },
  defense: { type: Number },
  image: { type: String },
  modifiers: { type: Modifier },
  min_lvl: { type: Number },
  isUnique: { type: Boolean },
  isActive: { type: Boolean },
});

module.exports = mongoose.models.Helmet || mongoose.model('Helmet', helmetSchema);