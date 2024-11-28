import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    attributes: {
      intelligence: { type: 'Number' },
      dexterity: { type: 'Number' },
      insanity: { type: 'Number' },
      charisma: { type: 'Number' },
      constitution: { type: 'Number' },
      strength: { type: 'Number' }
    },
    equipment: {
      weapon: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        damage: Object,
        base_percentage: Object,
        min_lvl: Object
      },
      armor: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        defense: Object,
        min_lvl: Object
      },
      artifact: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        min_lvl: Object
      },
      antidote_potion: {
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        recovery_effect: Object,
        min_lvl: Object
      },
      healing_potion: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        min_lvl: Object
      },
      enhancer_potion: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        duration: Object,
        min_lvl: Object
      },
      helmet: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        defense: Object,
        min_lvl: Object
      },
      shield: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        defense: Object,
        min_lvl: Object,
        isUnique: Object,
        isActive: Object
      },
      boot: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        defense: Object,
        min_lvl: Object
      },
      ring: {
        modifiers: Object,
        _id: Object,
        name: Object,
        description: Object,
        type: Object,
        image: Object,
        value: Object,
        min_lvl: Object
      }
    },
    inventory: {
      helmets: { type: 'Array' },
      weapons: { type: 'Array' },
      armors: { type: 'Array' },
      shields: { type: 'Array' },
      artifacts: { type: 'Array' },
      boots: { type: 'Array' },
      rings: { type: 'Array' },
      antidote_potions: { type: 'Array' },
      healing_potions: { type: 'Array' },
      enhancer_potions: { type: 'Array' }
    },
    _id: { type: 'ObjectId' },
    name: { type: 'String' },
    nickname: { type: 'String' },
    email: { type: 'String' },
    avatar: { type: 'String' },
    classroom_Id: { type: 'String' },
    level: { type: 'Number' },
    experience: { type: 'Number' },
    is_active: { type: 'Boolean' },
    profile: {
      _id: { type: 'ObjectId' },
      name: { type: 'String' },
      description: { type: 'String' },
      image: { type: 'String' },
      attributes: { type: [Array] }
    },
    tasks: { type: 'Array' },
    gold: { type: 'Number' },
    created_date: { type: 'Date' },
    role: { type: 'String' },
    socketId: { type: 'String', default: '' },
    isInside: { type: 'Boolean', default: false },
    searchValidated: { type: 'Boolean', default: false },
    deviceToken: { type: 'String', default: '' },
    location:{type: 'String', default: 'map'},
    schoolLocation:{type: 'String', default: 'map'}
  });

module.exports = mongoose.models.Player || mongoose.model('Player', playerSchema);