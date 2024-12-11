import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MidContainer from "@/components/shop/MidContainer";
import { MOCK_SHIELDS_COLLECTION } from "../mocks";
import { Player } from "@/_common/interfaces/Player";

const mockOnBuy = jest.fn();
const mockOnSell = jest.fn();
const mockOnAddToCart = jest.fn();
const mockHandleQuantityChange = jest.fn();

const mockPlayer: Player = {
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
    weapon: {
      modifiers: {
        intelligence: 0,
        dexterity: 12,
        constitution: 0,
        insanity: 10,
        charisma: 12,
        strength: -19,
      },
      _id: "66f9caddd39859521ad20fe8",
      name: "Soul Shatter",
      description: "A sword that fractures the spirits of those it strikes.",
      type: "weapon",
      image: "/images/equipment/weapons/sword_46.png",
      value: 800,
      base_percentage: 12,
      min_lvl: 13,
      die_faces: 10,
      die_modifier: 0,
      die_num: 7,
      isUnique: false,
      isActive: true,
    },
    armor: {
      modifiers: {
        strength: -6,
        constitution: 0,
        dexterity: 15,
        intelligence: 30,
        insanity: 0,
        charisma: 15,
      },
      _id: "66f3e0f7b32d7add9a08768f",
      name: "Obsidian Heavy Armor",
      description: "An armor forged from obsidian, it grants both protection and intimidation.",
      type: "armor",
      image: "/images/equipment/armors/heavy_armor_26.png",
      value: 840,
      defense: 73,
      isUnique: false,
      isActive: true,
      min_lvl: 14,
    },
    artifact: {
      modifiers: {
        intelligence: -2,
        dexterity: 2,
        constitution: 0,
        insanity: 0,
        charisma: 8,
        strength: 0,
      },
      _id: "66a902e1b5831810990551d3",
      name: "Amulet of the Phoenix's Rebirth",
      description: "An amulet imbued with the essence of a phoenix.",
      type: "artifact",
      image: "/images/equipment/artifacts/artifact_3.png",
      value: 5,
      min_lvl: 1,
      isUnique: false,
      isActive: false
    },
    antidote_potion: {
      _id: "668bca125319ea9afdff0761",
      name: "Etherbind Tonic",
      description: "A mystical tonic made from binding agents and ethereal dust, anchoring the afflicted back to the material plane.",
      type: "antidote",
      image: "/images/equipment/potions/antidote/antidote_2.png",
      value: 10,
      recovery_effect: {
        modifiers: {
          hit_points: 0,
          intelligence: -10,
          dexterity: 0,
          insanity: 6,
          charisma: 0,
          constitution: 0,
          strength: 0,
        },
        _id: "6693fd5846527d0df5f0efeb",
        name: "Ethereal Consumption",
        description: "A spectral illness that causes the afflicted to slowly fade into the ethereal plane, losing touch with reality.",
        type: "illness",
      },
      min_lvl: 1,
    },
    healing_potion: {
      modifiers: {
        hit_points: 20,
        intelligence: 0,
        dexterity: 0,
        constitution: 0,
        insanity: 0,
        charisma: 0,
        strength: 0,
      },
      _id: "668bca125319ea9afdff0750",
      name: "Elixir of Vitality",
      description: "A rejuvenating potion that restores vigor and vitality to the drinker.",
      type: "healing",
      image: "/images/equipment/potions/healing/healing_1.png",
      value: 10,
      min_lvl: 1,
    },
    enhancer_potion: {
      modifiers: {
        intelligence: 0,
        dexterity: 0,
        constitution: 0,
        insanity: 0,
        charisma: 0,
        strength: 20,
      },
      _id: "668bca125319ea9afdff0767",
      name: "Potion of Increase Strength",
      description: "This robust elixir temporarily amplifies the drinker's physical power, significantly boosting muscle strength and stamina.\n\n\n",
      type: "enhancer",
      image: "/images/equipment/potions/enhancer/enhancer_1.png",
      value: 10,
      duration: 2,
      min_lvl: 1,
    },
    helmet: {
      modifiers: {
        intelligence: 3,
        dexterity: 6,
        constitution: 7,
        insanity: 0,
        charisma: 1,
        strength: 4,
      },
      _id: "66f3b3ddc8cdd090db911d85",
      name: "Dragonbane Helm",
      description: "Forged to slay the fiercest dragons.",
      type: "helmet",
      image: "/images/equipment/helmets/helmet_8.png",
      value: 190,
      defense: 27,
      min_lvl: 11,
      isUnique: false,
      isActive: true,
    },
    shield: {
      modifiers: {
        intelligence: 0,
        dexterity: 2,
        constitution: 3,
        insanity: 0,
        charisma: 0,
        strength: 5,
      },
      _id: "66f27c81c114335cadf45d70",
      name: "Knight's Shield",
      description: "A sturdy shield for knights.",
      type: "shield",
      image: "/images/equipment/shields/shield_initial.png",
      value: 15,
      defense: 10,
      min_lvl: 1,
      isUnique: false,
      isActive: true,
    },
    boot: {
      modifiers: {
        intelligence: 6,
        dexterity: 4,
        constitution: 5,
        insanity: 2,
        charisma: 6,
        strength: 3,
      },
      _id: "66f694d84a8f1157dab87bc1",
      name: "Druid's Nature Boots",
      description: "Embraced by the spirits of the forest.",
      type: "boot",
      image: "/images/equipment/boots/boot_9.png",
      value: 360,
      defense: 32,
      min_lvl: 13,
      isActive: true,
      isUnique: false,
    },
    ring: {
      modifiers: {
        intelligence: 2,
        dexterity: 0,
        constitution: 0,
        insanity: 0,
        charisma: 0,
        strength: 2,
      },
      _id: "66a6d6c8dfbffe7e6503970f",
      name: "Ring of Eternal Flame",
      description: "A ring that burns with eternal fire.",
      type: "ring",
      image: "/images/equipment/rings/ring_1.png",
      value: 10,
      min_lvl: 1,
      isUnique: false,
      isActive: false
    },
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
    ingredients: []
  },
  level: 17,
};


describe("ShopButton Component - Add to Cart", () => {
  it("adds a product to the cart when the Add to Cart button is clicked", () => {
    const mockProduct = MOCK_SHIELDS_COLLECTION[0];

    render(
      <MidContainer
        product={mockProduct}
        onBuy={mockOnBuy}
        onSell={mockOnSell}
        onAddToCart={mockOnAddToCart}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={mockHandleQuantityChange}
        displayBuyButtons={true}
      />
    );

    const addToCartButton = screen.getByText("ADD TO CART");

    expect(addToCartButton).toBeInTheDocument();
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("disables the Add to Cart button if the player cannot afford the item", () => {
    const expensiveProduct = { ...MOCK_SHIELDS_COLLECTION[0], value: 6100 };

    render(
      <MidContainer
        product={expensiveProduct}
        onBuy={mockOnBuy}
        onSell={mockOnSell}
        onAddToCart={mockOnAddToCart}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={mockHandleQuantityChange}
        displayBuyButtons={true}
      />
    );

    const addToCartButton = screen.getByText("ADD TO CART");

    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton.closest("button")).toBeDisabled();
  });

  it("resets the quantity after adding a product to the cart", () => {
    const mockProduct = MOCK_SHIELDS_COLLECTION[1];

    render(
      <MidContainer
        product={mockProduct}
        onBuy={mockOnBuy}
        onSell={mockOnSell}
        onAddToCart={mockOnAddToCart}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={mockHandleQuantityChange}
        displayBuyButtons={true}
      />
    );

    const addToCartButton = screen.getByText("ADD TO CART");

    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});