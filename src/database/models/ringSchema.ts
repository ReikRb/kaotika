
import mongoose from "mongoose";
const Modifier = require("./modifierSchema");

const ringSchema = new mongoose.Schema({
    name: { type: String},
    description: { type: String},
    type: { type: String},
    image: { type: String},
    value: { type: Number},
    modifiers: { type: Modifier},
    min_lvl: { type: Number},
    isUnique: { type: Boolean},
    isActive: { type: Boolean},
  });

module.exports = mongoose.models.Ring || mongoose.model('Ring', ringSchema);