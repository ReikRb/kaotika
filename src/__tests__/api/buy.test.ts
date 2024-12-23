import { UnPopulatedPlayer } from "@/_common/interfaces/UnPopulatedPlayer";
import { Cart } from "@/_common/types/Product";
import { MOCK_INGREDIENTS_COLLECTION, MOCK_SHIELDS_COLLECTION } from "../mocks";
import { updatePlayerGold, updatePlayerInventory } from "@/helpers/updatePlayer";

const mockPlayer: UnPopulatedPlayer = {
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
  gold: 5750,
};

const mockUpdatedPlayer: UnPopulatedPlayer = {
  inventory: {
    helmets: [],
    weapons: [],
    armors: [],
    shields: ['66f27c81c114335cadf45d70'],
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
  gold: 5250,
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

describe('Update the player gold', () => {
  it('Should reduce the player gold', () => {
      updatePlayerGold(mockPlayer, 500);
      
      expect(mockPlayer.gold).toEqual(5250);
  });
});