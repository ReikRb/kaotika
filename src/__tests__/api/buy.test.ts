import { UnPopulatedPlayer } from "@/_common/interfaces/UnPopulatedPlayer";
import { Cart } from "@/_common/types/Product";
import { MOCK_INGREDIENTS_COLLECTION, MOCK_SHIELDS_COLLECTION } from "../mocks";
import { updatePlayerInventory } from "@/helpers/updatePlayer";

let mockPlayer: UnPopulatedPlayer = {
    _id:'',
    avatar:'',
    email:'',
    experience: 0,
    is_active: false,
    created_date:'',
    profile:null,
    attributes:{
      intelligence: 0,
      dexterity: 12,
      constitution: 0,
      insanity: 10,
      charisma: 12,
      strength: -19,
    },
    classroom_id: '',
    tasks:[],
    nickname: "Reik",
    name: "Reik",
    gold: 5750,
    equipment: {
      weapon: '',
      armor: '',
      artifact: '',
      antidote_potion: '',
      healing_potion: '',
      enhancer_potion: '',
      helmet: '',
      shield: '',
      boot: '',
      ring: '',
    },
    inventory: {
      helmets: [],
      weapons: [],
      armors: [],
      shields: [],
      artifacts: [],
      boots: [],
      rings: [],
      antidote_potions: [],
      healing_potions: [],
      enhancer_potions: [],
      ingredients: [],
    },
    level: 17,
};

const mockUpdatedPlayer: UnPopulatedPlayer = {
    _id:'',
    avatar:'',
    email:'',
    experience: 0,
    is_active: false,
    created_date:'',
    profile:null,
    attributes:{
      intelligence: 0,
      dexterity: 12,
      constitution: 0,
      insanity: 10,
      charisma: 12,
      strength: -19,
    },
    classroom_id: '',
    tasks:[],
    nickname: "Reik",
    name: "Reik",
    gold: 5750,
    equipment: {
      weapon: '',
      armor: '',
      artifact: '',
      antidote_potion: '',
      healing_potion: '',
      enhancer_potion: '',
      helmet: '',
      shield: '',
      boot: '',
      ring: '',
    },
    inventory: {
      helmets: [],
      weapons: [],
      armors: [],
      shields: [
        '66f27c81c114335cadf45d70',
      ],
      artifacts: [],
      boots: [],
      rings: [],
      antidote_potions: [],
      healing_potions: [],
      enhancer_potions: [],
      ingredients: [
        '6702b39d76863c206a48cccb',
        '6702b39d76863c206a48cccb',
        '6702b39d76863c206a48cccb',
        '6702b39d76863c206a48cccb',
        '6702b39d76863c206a48cccb',
        '6702b39d76863c206a48cccb',
        '6702b39d76863c206a48cccb',
        '6702b39d76863c206a48cccb',
      ],
    },
    level: 17,
};

const mockCart: Cart = [{
  product: MOCK_SHIELDS_COLLECTION[0],
  quantity: 1,
},{
  product: MOCK_INGREDIENTS_COLLECTION[0],
  quantity: 8,
}];

describe('Update the player inventory', () => {
    it('Should add some equipment to the inventory', () => {
        updatePlayerInventory(mockPlayer, mockCart);
        
        expect(mockPlayer.inventory).toEqual(mockUpdatedPlayer.inventory);
    });
});