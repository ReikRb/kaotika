import { Armor } from "@/_common/interfaces/Armor"
import { Artifact } from "@/_common/interfaces/Artifact"
import { Boot } from "@/_common/interfaces/Boot"
import { Helmet } from "@/_common/interfaces/Helmet"
import { Ingredient } from "@/_common/interfaces/Ingredient"
import { Player } from "@/_common/interfaces/Player"
import { Ring } from "@/_common/interfaces/Ring"
import { Shield } from "@/_common/interfaces/Shield"
import { Weapon } from "@/_common/interfaces/Weapon"

export const MOCK_HELMET_COLLECTION: Helmet[] = [{
    "_id": {
      "$oid": "66f3b3ddc8cdd090db911d7e"
    },
    "name": "Guardian's Resolve",
    "description": "Forged with the resolve of ancient warriors.",
    "type": "helmet",
    "image": "/images/equipment/helmets/helmet_1.png",
    "value": 150,
    "defense": 22,
    "modifiers": {
      "intelligence": 4,
      "dexterity": 3,
      "constitution": 5,
      "insanity": 1,
      "charisma": 2,
      "strength": 4
    },
    "min_lvl": 9,
    "isUnique": false,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "66f3b3ddc8cdd090db911d7f"
    },
    "name": "Warbringer Helm",
    "description": "Brings the wrath of war upon its foes.",
    "type": "helmet",
    "image": "/images/equipment/helmets/helmet_2.png",
    "value": 170,
    "defense": 24,
    "modifiers": {
      "intelligence": 3,
      "dexterity": 5,
      "constitution": 6,
      "insanity": 0,
      "charisma": 1,
      "strength": 5
    },
    "min_lvl": 10,
    "isUnique": false,
    "isActive": true
  }]

export const MOCK_BOOTS_COLLECTION: Boot[] = [{
    "_id": {
      "$oid": "66f694d84a8f1157dab87bb9"
    },
    "name": "Rogue's Stalking Boots",
    "description": "Silent and swift, perfect for stealth.",
    "type": "boot",
    "image": "/images/equipment/boots/boot_1.png",
    "value": 200,
    "defense": 15,
    "modifiers": {
      "intelligence": 2,
      "dexterity": 8,
      "constitution": 3,
      "insanity": 1,
      "charisma": 2,
      "strength": 4
    },
    "min_lvl": 5,
    "isActive": true,
    "isUnique": false
  },
  {
    "_id": {
      "$oid": "66f694d84a8f1157dab87bba"
    },
    "name": "Warrior's Leather Boots",
    "description": "Designed for strength and durability.",
    "type": "boot",
    "image": "/images/equipment/boots/boot_2.png",
    "value": 220,
    "defense": 18,
    "modifiers": {
      "intelligence": 1,
      "dexterity": 4,
      "constitution": 6,
      "insanity": 2,
      "charisma": 3,
      "strength": 4
    },
    "min_lvl": 6,
    "isActive": true,
    "isUnique": false
  },
  {
    "_id": {
      "$oid": "66f694d84a8f1157dab87bbb"
    },
    "name": "Mage's Arcane Boots",
    "description": "Infused with magical energies for agility.",
    "type": "boot",
    "image": "/images/equipment/boots/boot_3.png",
    "value": 240,
    "defense": 20,
    "modifiers": {
      "intelligence": 5,
      "dexterity": 6,
      "constitution": 2,
      "insanity": 3,
      "charisma": 4,
      "strength": 0
    },
    "min_lvl": 7,
    "isActive": true,
    "isUnique": false
  }]

export const MOCK_ARTIFACTS_COLLECTION: Artifact[] = [{
    "_id": {
      "$oid": "66f66acd4a8f1157dab87b58"
    },
    "name": "Amulet of Whispering Winds",
    "description": "Harnesses the power of the winds.",
    "type": "artifact",
    "image": "/images/equipment/artifacts/artifact_4.png",
    "value": 120,
    "modifiers": {
      "intelligence": 5,
      "dexterity": 5,
      "constitution": 3,
      "insanity": 4,
      "charisma": 3,
      "strength": 2
    },
    "min_lvl": 6,
    "isActive": true,
    "isUnique": false
  },
  {
    "_id": {
      "$oid": "66f66acd4a8f1157dab87b59"
    },
    "name": "Amulet of the Abyss",
    "description": "Glows with a dark, eerie light.",
    "type": "artifact",
    "image": "/images/equipment/artifacts/artifact_5.png",
    "value": 150,
    "modifiers": {
      "intelligence": 7,
      "dexterity": 2,
      "constitution": 5,
      "insanity": 6,
      "charisma": 3,
      "strength": 2
    },
    "min_lvl": 10,
    "isActive": true,
    "isUnique": false
  },
  {
    "_id": {
      "$oid": "66f66acd4a8f1157dab87b5a"
    },
    "name": "Amulet of Celestial Sight",
    "description": "Blessed with divine vision.",
    "type": "artifact",
    "image": "/images/equipment/artifacts/artifact_6.png",
    "value": 180,
    "modifiers": {
      "intelligence": 8,
      "dexterity": 4,
      "constitution": 6,
      "insanity": 0,
      "charisma": 6,
      "strength": 2
    },
    "min_lvl": 12,
    "isActive": true,
    "isUnique": false
  }]

export const MOCK_ARMORS_COLLECTION: Armor[] = [{
    "_id": {
      "$oid": "66f289b5e5be15925dc0abdd"
    },
    "name": "Dragonscale Aegis",
    "description": "Made from the scales of an ancient dragon.",
    "type": "armor",
    "image": "/images/equipment/armors/full_plate_21.png",
    "value": 2500,
    "defense": 120,
    "modifiers": {
      "intelligence": 20,
      "dexterity": 12,
      "constitution": 13,
      "insanity": 0,
      "charisma": 15,
      "strength": 0
    },
    "min_lvl": 16,
    "isUnique": true,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "66f289b5e5be15925dc0abde"
    },
    "name": "Guardian's Bastion",
    "description": "A shield of protection for the chosen.",
    "type": "armor",
    "image": "/images/equipment/armors/full_plate_24.png",
    "value": 4000,
    "defense": 135,
    "modifiers": {
      "intelligence": 25,
      "dexterity": 15,
      "constitution": 10,
      "insanity": 0,
      "charisma": 15,
      "strength": 0
    },
    "min_lvl": 18,
    "isUnique": true,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "66f289b5e5be15925dc0abdf"
    },
    "name": "Radiant Fortress",
    "description": "Shines with a divine light of protection.",
    "type": "armor",
    "image": "/images/equipment/armors/full_plate_25.png",
    "value": 5000,
    "defense": 145,
    "modifiers": {
      "intelligence": 30,
      "dexterity": 20,
      "constitution": 12,
      "insanity": 0,
      "charisma": 15,
      "strength": 0
    },
    "min_lvl": 20,
    "isUnique": true,
    "isActive": true
  }]    

export const MOCK_INGREDIENTS_COLLECTION: Ingredient[] = [{
    "_id": {
      "$oid": "6702b39d76863c206a48cccb"
    },
    "name": "Crimson Lotus",
    "description": "A sacred flower that boosts one's health noticeably.",
    "value": 110,
    "effects": [
      "increase_hit_points"
    ],
    "image": "/images/ingredients/increase/increase_2.webp",
    "type": "ingredient"
  },
  {
    "_id": {
      "$oid": "6702b39d76863c206a48cccc"
    },
    "name": "Ironbark Berry",
    "description": "A hard berry that enhances hit points by a small amount.",
    "value": 25,
    "effects": [
      "lesser_increase_hit_points"
    ],
    "image": "/images/ingredients/increase/increase_3.webp",
    "type": "ingredient"
  }]

export const MOCK_RINGS_COLLECTION: Ring[] = [{
    "_id": {
      "$oid": "66f3c85ec8cdd090db911db4"
    },
    "name": "Ring of the Whispering Wind",
    "description": "A ring that carries secrets from the breeze.",
    "type": "ring",
    "image": "/images/equipment/rings/ring_21.png",
    "value": 300,
    "modifiers": {
      "intelligence": 8,
      "dexterity": 6,
      "constitution": 5,
      "insanity": 4,
      "charisma": 7,
      "strength": 5
    },
    "min_lvl": 15,
    "isUnique": true,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "66f3c85ec8cdd090db911da5"
    },
    "name": "Ring of the Eternal Flame",
    "description": "A ring that blazes with unending fire.",
    "type": "ring",
    "image": "/images/equipment/rings/ring_2.png",
    "value": 150,
    "modifiers": {
      "intelligence": 5,
      "dexterity": 2,
      "constitution": 3,
      "insanity": 1,
      "charisma": 4,
      "strength": 3
    },
    "min_lvl": 6,
    "isUnique": false,
    "isActive": true
  }]

export const MOCK_SHIELDS_COLLECTION: Shield[] = [{
    "_id": {
      "$oid": "66f27c81c114335cadf45d70"
    },
    "name": "Knight's Shield",
    "description": "A sturdy shield for knights.",
    "type": "shield",
    "image": "/images/equipment/shields/shield_initial.png",
    "value": 15,
    "defense": 10,
    "modifiers": {
      "intelligence": 0,
      "dexterity": 2,
      "constitution": 3,
      "insanity": 0,
      "charisma": 0,
      "strength": 5
    },
    "min_lvl": 1,
    "isUnique": false,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "66f27c81c114335cadf45d71"
    },
    "name": "Wooden Shield",
    "description": "A basic wooden shield.",
    "type": "shield",
    "image": "/images/equipment/shields/shield_2.png",
    "value": 12,
    "defense": 8,
    "modifiers": {
      "intelligence": 0,
      "dexterity": 1,
      "constitution": 3,
      "insanity": 0,
      "charisma": 0,
      "strength": 4
    },
    "min_lvl": 1,
    "isUnique": false,
    "isActive": true
  }]

export const MOCK_WEAPONS_COLLECTION: Weapon[] = [{
    "_id": {
      "$oid": "66f97720f9a28c1fef4dfc9c"
    },
    "name": "Oaksplitter Axe",
    "description": "A reliable axe for splitting oak.",
    "type": "weapon",
    "image": "/images/equipment/weapons/axe_2.png",
    "value": 60,
    "base_percentage": 5,
    "modifiers": {
      "intelligence": 0,
      "dexterity": 0,
      "constitution": 0,
      "insanity": 0,
      "charisma": 0,
      "strength": -3
    },
    "min_lvl": 2,
    "die_faces": 8,
    "die_modifier": 2,
    "die_num": 2,
    "isUnique": false,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "66f97720f9a28c1fef4dfc9d"
    },
    "name": "Ironedge Axe",
    "description": "A sturdy axe with an iron blade.",
    "type": "weapon",
    "image": "/images/equipment/weapons/axe_3.png",
    "value": 90,
    "base_percentage": 5,
    "modifiers": {
      "intelligence": 0,
      "dexterity": 0,
      "constitution": 0,
      "insanity": 0,
      "charisma": 0,
      "strength": -4
    },
    "min_lvl": 3,
    "die_faces": 10,
    "die_modifier": 1,
    "die_num": 3,
    "isUnique": false,
    "isActive": true
  }]

export const MOCK_PLAYER: Player = {
    "_id": {
      "$oid": "66deaf67e81b70f650f226b8"
    },
    "attributes": {
      "intelligence": 26,
      "dexterity": 62,
      "insanity": 37,
      "charisma": 16,
      "constitution": 11,
      "strength": 28
    },
    "equipment": {
      "weapon": {
        "modifiers": {
          "intelligence": 0,
          "dexterity": 12,
          "constitution": 0,
          "insanity": 10,
          "charisma": 12,
          "strength": -19
        },
        "_id": "66f9caddd39859521ad20fe8",
        "name": "Soul Shatter",
        "description": "A sword that fractures the spirits of those it strikes.",
        "type": "weapon",
        "image": "/images/equipment/weapons/sword_46.png",
        "value": 800,
        "base_percentage": 12,
        "min_lvl": 13,
        "die_faces": 10,
        "die_modifier": 0,
        "die_num": 7,
        "isUnique": false,
        "isActive": true
      },
      "armor": {
        "modifiers": {
          "strength": -6,
          "constitution": 0,
          "dexterity": 15,
          "intelligence": 30,
          "insanity": 0,
          "charisma": 15
        },
        "_id": "66f3e0f7b32d7add9a08768f",
        "name": "Obsidian Heavy Armor",
        "description": "An armor forged from obsidian, it grants both protection and intimidation.",
        "type": "armor",
        "image": "/images/equipment/armors/heavy_armor_26.png",
        "value": 840,
        "defense": 73,
        "isUnique": false,
        "isActive": true,
        "min_lvl": 14
      },
      "artifact": {
        "modifiers": {
          "intelligence": -2,
          "dexterity": 2,
          "constitution": 0,
          "insanity": 0,
          "charisma": 8,
          "strength": 0
        },
        "_id": "66a902e1b5831810990551d3",
        "name": "Amulet of the Phoenix's Rebirth",
        "description": "An amulet imbued with the essence of a phoenix.",
        "type": "artifact",
        "image": "/images/equipment/artifacts/artifact_3.png",
        "value": 5,
        "min_lvl": 1
      },
      "antidote_potion": {
        "_id": "668bca125319ea9afdff0761",
        "name": "Etherbind Tonic",
        "description": "A mystical tonic made from binding agents and ethereal dust, anchoring the afflicted back to the material plane.",
        "type": "antidote",
        "image": "/images/equipment/potions/antidote/antidote_2.png",
        "value": 10,
        "recovery_effect": {
          "modifiers": {
            "hit_points": 0,
            "intelligence": -10,
            "dexterity": 0,
            "insanity": 6,
            "charisma": 0,
            "constitution": 0,
            "strength": 0
          },
          "_id": "6693fd5846527d0df5f0efeb",
          "name": "Ethereal Consumption",
          "description": "A spectral illness that causes the afflicted to slowly fade into the ethereal plane, losing touch with reality.",
          "type": "illness",
          "antidote_effects": [
            "restore_intelligence",
            "lesser_restore_insanity"
          ],
          "poison_effects": [
            "damage_intelligence",
            "lesser_damage_insanity"
          ]
        },
        "min_lvl": 1
      },
      "healing_potion": {
        "modifiers": {
          "hit_points": 20,
          "intelligence": 0,
          "dexterity": 0,
          "constitution": 0,
          "insanity": 0,
          "charisma": 0,
          "strength": 0
        },
        "_id": "668bca125319ea9afdff0750",
        "name": "Elixir of Vitality",
        "description": "A rejuvenating potion that restores vigor and vitality to the drinker.",
        "type": "healing",
        "image": "/images/equipment/potions/healing/healing_1.png",
        "value": 10,
        "min_lvl": 1
      },
      "enhancer_potion": {
        "modifiers": {
          "intelligence": 0,
          "dexterity": 0,
          "constitution": 0,
          "insanity": 0,
          "charisma": 0,
          "strength": 20
        },
        "_id": "668bca125319ea9afdff0767",
        "name": "Potion of Increase Strength",
        "description": "This robust elixir temporarily amplifies the drinker's physical power, significantly boosting muscle strength and stamina.\n\n\n",
        "type": "enhancer",
        "image": "/images/equipment/potions/enhancer/enhancer_1.png",
        "value": 10,
        "duration": 2,
        "min_lvl": 1
      },
      "helmet": {
        "modifiers": {
          "intelligence": 3,
          "dexterity": 6,
          "constitution": 7,
          "insanity": 0,
          "charisma": 1,
          "strength": 4
        },
        "_id": "66f3b3ddc8cdd090db911d85",
        "name": "Dragonbane Helm",
        "description": "Forged to slay the fiercest dragons.",
        "type": "helmet",
        "image": "/images/equipment/helmets/helmet_8.png",
        "value": 190,
        "defense": 27,
        "min_lvl": 11,
        "isUnique": false,
        "isActive": true
      },
      "shield": {
        "modifiers": {
          "intelligence": 0,
          "dexterity": 2,
          "constitution": 3,
          "insanity": 0,
          "charisma": 0,
          "strength": 5
        },
        "_id": "66f27c81c114335cadf45d70",
        "name": "Knight's Shield",
        "description": "A sturdy shield for knights.",
        "type": "shield",
        "image": "/images/equipment/shields/shield_initial.png",
        "value": 15,
        "defense": 10,
        "min_lvl": 1,
        "isUnique": false,
        "isActive": true
      },
      "boot": {
        "modifiers": {
          "intelligence": 6,
          "dexterity": 4,
          "constitution": 5,
          "insanity": 2,
          "charisma": 6,
          "strength": 3
        },
        "_id": "66f694d84a8f1157dab87bc1",
        "name": "Druid's Nature Boots",
        "description": "Embraced by the spirits of the forest.",
        "type": "boot",
        "image": "/images/equipment/boots/boot_9.png",
        "value": 360,
        "defense": 32,
        "min_lvl": 13,
        "isActive": true,
        "isUnique": false
      },
      "ring": {
        "modifiers": {
          "intelligence": 2,
          "dexterity": 0,
          "constitution": 0,
          "insanity": 0,
          "charisma": 0,
          "strength": 2
        },
        "_id": "66a6d6c8dfbffe7e6503970f",
        "name": "Ring of Eternal Flame",
        "description": "A ring that burns with eternal fire.",
        "type": "ring",
        "image": "/images/equipment/rings/ring_1.png",
        "value": 10,
        "min_lvl": 1
      }
    },
    "inventory": {
      "helmets": [],
      "weapons": [
        [
          {
            "modifiers": {
              "intelligence": 0,
              "dexterity": 0,
              "constitution": 0,
              "insanity": 0,
              "charisma": 0,
              "strength": -3
            },
            "_id": "668bca105319ea9afdff0719",
            "name": "Shardblade",
            "description": "A jagged sword prone to breaking on impact.",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_init_2.png",
            "value": 10,
            "base_percentage": 5,
            "min_lvl": 1,
            "profiles": [
              "6687c31b7a5ce485a0eed476",
              "6687c31b7a5ce485a0eed477",
              "6687c31b7a5ce485a0eed478",
              "6687c31b7a5ce485a0eed479",
              "6687c31b7a5ce485a0eed47a",
              "6687c31b7a5ce485a0eed47b",
              "6687c31b7a5ce485a0eed47c",
              "6687c31b7a5ce485a0eed47d"
            ],
            "die_faces": 12,
            "die_modifier": 4,
            "die_num": 2
          }
        ],
        [
          {
            "modifiers": {
              "intelligence": 0,
              "dexterity": 0,
              "constitution": 0,
              "insanity": 0,
              "charisma": 0,
              "strength": -3
            },
            "_id": "668bca105319ea9afdff0719",
            "name": "Shardblade",
            "description": "A jagged sword prone to breaking on impact.",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_init_2.png",
            "value": 10,
            "base_percentage": 5,
            "min_lvl": 1,
            "profiles": [
              "6687c31b7a5ce485a0eed476",
              "6687c31b7a5ce485a0eed477",
              "6687c31b7a5ce485a0eed478",
              "6687c31b7a5ce485a0eed479",
              "6687c31b7a5ce485a0eed47a",
              "6687c31b7a5ce485a0eed47b",
              "6687c31b7a5ce485a0eed47c",
              "6687c31b7a5ce485a0eed47d"
            ],
            "die_faces": 12,
            "die_modifier": 4,
            "die_num": 2
          }
        ],
        [
          {
            "modifiers": {
              "intelligence": 0,
              "dexterity": 0,
              "constitution": 0,
              "insanity": 0,
              "charisma": 0,
              "strength": -3
            },
            "_id": "668bca105319ea9afdff0719",
            "name": "Shardblade",
            "description": "A jagged sword prone to breaking on impact.",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_init_2.png",
            "value": 10,
            "base_percentage": 5,
            "min_lvl": 1,
            "profiles": [
              "6687c31b7a5ce485a0eed476",
              "6687c31b7a5ce485a0eed477",
              "6687c31b7a5ce485a0eed478",
              "6687c31b7a5ce485a0eed479",
              "6687c31b7a5ce485a0eed47a",
              "6687c31b7a5ce485a0eed47b",
              "6687c31b7a5ce485a0eed47c",
              "6687c31b7a5ce485a0eed47d"
            ],
            "die_faces": 12,
            "die_modifier": 4,
            "die_num": 2
          }
        ],
        [
          {
            "modifiers": {
              "intelligence": 0,
              "dexterity": 0,
              "constitution": 0,
              "insanity": 0,
              "charisma": 0,
              "strength": -3
            },
            "_id": "668bca105319ea9afdff0719",
            "name": "Shardblade",
            "description": "A jagged sword prone to breaking on impact.",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_init_2.png",
            "value": 10,
            "base_percentage": 5,
            "min_lvl": 1,
            "profiles": [
              "6687c31b7a5ce485a0eed476",
              "6687c31b7a5ce485a0eed477",
              "6687c31b7a5ce485a0eed478",
              "6687c31b7a5ce485a0eed479",
              "6687c31b7a5ce485a0eed47a",
              "6687c31b7a5ce485a0eed47b",
              "6687c31b7a5ce485a0eed47c",
              "6687c31b7a5ce485a0eed47d"
            ],
            "die_faces": 12,
            "die_modifier": 4,
            "die_num": 2
          }
        ]
      ],
      "armors": [],
      "shields": [],
      "artifacts": [],
      "boots": [],
      "rings": [],
      "antidote_potions": [],
      "healing_potions": [],
      "enhancer_potions": []
    },
    "name": "UNAI ROCA BERRIDI",
    "nickname": "Reik",
    "email": "unai.roca@ikasle.aeg.eus",
    "avatar": "https://lh3.googleusercontent.com/a/ACg8ocI06V7E80-0BX0KSzg6VsriKhB7RhGne3im2QsX5awsoeZ2vgM=s96-c",
    "classroom_Id": "110496660036555663487",
    "level": 17,
    "experience": 29280,
    "is_active": true,
    "profile": {
      "_id": {
        "$oid": "6687c31b7a5ce485a0eed47a"
      },
      "name": "Embalmer",
      "description": "In the quiet, shadowed corners of the necropolis, the Embalmer performs his sacred and somber duties. Clad in robes as dark as the midnight sky, he is the keeper of the dead, the guardian of the departed. With hands steady and skilled, he prepares the bodies for their final journey, preserving them with ancient and arcane methods known only to a select few. His knowledge of life and death is profound, and his presence commands both respect and fear. The Embalmer speaks in whispers, his words carrying the weight of the afterlife, and his eyes see beyond the veil of mortality. He is a figure of mystery and reverence, a master of the delicate balance between this world and the next.",
      "image": "/images/profiles/embalmer.jpg",
      "attributes": [
        [
          {
            "_id": "67407e06ca81e5d5aa8da9a5",
            "name": "Intelligence",
            "description": "The intelligence controls the chance of success when using a potion",
            "value": 13
          }
        ],
        [
          {
            "_id": "67407e06ca81e5d5aa8da9a6",
            "name": "Dexterity",
            "description": "Manages the chance of success when using a melee weapon and the damage a missile weapon does",
            "value": 30
          }
        ],
        [
          {
            "_id": "67407e06ca81e5d5aa8da9a7",
            "name": "Insanity",
            "description": "Indicates the state of mental health of an adventurer. If the insanity is high, there will be more chance to make a fumble of a critical hit, and the resulting damage will be more critical. If the insanity is low, there will be less chance to make a fumble or a critical hit, and the resulting damage will be less critical",
            "value": 40
          }
        ],
        [
          {
            "_id": "67407e06ca81e5d5aa8da9a8",
            "name": "Charisma",
            "description": "Indicates the chance to attack first in the next round",
            "value": 5
          }
        ],
        [
          {
            "_id": "67407e06ca81e5d5aa8da9a9",
            "name": "Constitution",
            "description": "Indicates the number of Hit Points an adventurer starts with",
            "value": 5
          }
        ],
        [
          {
            "_id": "67407e06ca81e5d5aa8da9aa",
            "name": "Strength",
            "description": "Manages the chance of success when using a melee weapon, and the damage a melee weapon does",
            "value": 17
          }
        ]
      ]
    },
    "tasks": [
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "La Hambruna",
          "grade": 18,
          "selectedAssignment": "696068354158",
          "maxPoints": 22,
          "_id": "67090c222cb4a14cd6f7c24b"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "¿Qué sabes de desarrollo?",
          "grade": 5,
          "selectedAssignment": "696069128911",
          "maxPoints": 5,
          "_id": "67090c4d2cb4a14cd6f7c408"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "El Altar de la Experiencia - The Arrival",
          "grade": 25,
          "selectedAssignment": "685686685180",
          "maxPoints": 40,
          "_id": "67090caa2cb4a14cd6f7c6c7"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "Simon's Potions Implementation",
          "grade": 7,
          "selectedAssignment": "711980684441",
          "maxPoints": 25,
          "_id": "67090d34d964b7483432bff2"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU -  Authentication & Roles",
          "grade": 5,
          "selectedAssignment": "685768780197",
          "maxPoints": 5,
          "_id": "67090d87d964b7483432c363"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - Laboratory Access",
          "grade": 5,
          "selectedAssignment": "717971139101",
          "maxPoints": 5,
          "_id": "67090da0d964b7483432c5f3"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "La falsificación del Libro de las Caras",
          "grade": 12,
          "selectedAssignment": "696068583613",
          "maxPoints": 12,
          "_id": "67090dc6d964b7483432c8dc"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "El Altar de la Experiencia -  Angelo's Laboratory",
          "grade": 17,
          "selectedAssignment": "709980072206",
          "maxPoints": 40,
          "_id": "67090de8d964b7483432cb45"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - Potions Creation",
          "grade": 5,
          "selectedAssignment": "696068830480",
          "maxPoints": 5,
          "_id": "671639cdc47d87a7d726b852"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - Advanced Player Profile",
          "grade": 5,
          "selectedAssignment": "686027153267",
          "maxPoints": 5,
          "_id": "671639dfc47d87a7d726ba5b"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - Map screen",
          "grade": 5,
          "selectedAssignment": "721029623436",
          "maxPoints": 5,
          "_id": "671639ebc47d87a7d726bc72"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "El destilador de pociones",
          "grade": 12,
          "selectedAssignment": "696069128873",
          "maxPoints": 12,
          "_id": "67163a14c47d87a7d726c012"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "El Altar de la Experiencia - The Potions Cauldron",
          "grade": 28,
          "selectedAssignment": "696068583674",
          "maxPoints": 40,
          "_id": "67163a2cc47d87a7d726c467"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU -  SECURE TOWER ACCESS",
          "grade": 5,
          "selectedAssignment": "724238580333",
          "maxPoints": 5,
          "_id": "6731bccaf39e888968012158"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - ARCANE PUSH NOTIFICATIONS",
          "grade": 5,
          "selectedAssignment": "724238452980",
          "maxPoints": 5,
          "_id": "6731bcd8f39e8889680125f5"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - ACOLYTES IN THE TOWER",
          "grade": 5,
          "selectedAssignment": "724238257455",
          "maxPoints": 5,
          "_id": "6731bce8f39e888968012b01"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - EPIC MQTT BROKER & AWESOME SELF CERTIFICATES",
          "grade": 5,
          "selectedAssignment": "724237654224",
          "maxPoints": 5,
          "_id": "6731bcf6f39e888968013088"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "El Altar de la Experiencia - The Swamp Tower",
          "grade": 8,
          "selectedAssignment": "696068583703",
          "maxPoints": 50,
          "_id": "6731bd0bf39e88896801376c"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "El manual de despliegue",
          "grade": 10,
          "selectedAssignment": "696069128945",
          "maxPoints": 10,
          "_id": "67331d9ded9c944b0984cdba"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "Todas las piezas encajan",
          "grade": 15,
          "selectedAssignment": "696068830469",
          "maxPoints": 15,
          "_id": "67331e10447c2302e9867d5c"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "La Pócima de la Cordura",
          "grade": 0,
          "selectedAssignment": "696068354193",
          "maxPoints": 10,
          "_id": "67331e7f447c2302e9868a78"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "El Trago Infecto",
          "grade": 0,
          "selectedAssignment": "696068354203",
          "maxPoints": 40,
          "_id": "67331ec0447c2302e9869380"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "MORTIMER'S REVELATIONS I // HU - THE SEARCH OF ARCANE ARTIFACTS",
          "grade": 25,
          "selectedAssignment": "696068830536",
          "maxPoints": 25,
          "_id": "673d8cba00a15d40e84a1b24"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - THE SEARCH OF ARCANE ARTIFACTS",
          "grade": 15,
          "selectedAssignment": "696068830508",
          "maxPoints": 15,
          "_id": "6740730e9f0d9d166c717d0c"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "HU - MORTIMER VALIDATES THE SEARCH FOR THE ARTIFACTS",
          "grade": 15,
          "selectedAssignment": "696068830518",
          "maxPoints": 15,
          "_id": "674073289f0d9d166c71867d"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "MORTIMER'S REVELATIONS II // HU - MORTIMER VALIDATES THE SEARCH FOR THE ARTIFACTS",
          "grade": 25,
          "selectedAssignment": "696069128970",
          "maxPoints": 25,
          "_id": "674073689f0d9d166c718fc4"
        }
      ],
      [
        {
          "classroomId": "110496660036555663487",
          "courseWorkName": "El Altar de la Experiencia - Los Artefactos Arcanos",
          "grade": 100,
          "selectedAssignment": "696068830489",
          "maxPoints": 100,
          "_id": "674073b89f0d9d166c71a1e4"
        }
      ]
    ],
    "gold": 1529,
    "created_date": {
      "$date": "2024-09-09T08:18:47.052Z"
    },
    "role": "ACOLITO",
    "socketId": "K0Xo6uJNUVNlNZ7CAAAi",
    "isInside": false,
    "location": "school",
    "__v": 16,
    "cardId": "72acb402",
    "deviceToken": "d63BNE7OTD6tPgYvOQ_O8A:APA91bE488cpch05hjZp32UmyAfcHVO1qg5Y1M2mcbJ8gVMr0-oqNX_mL2CK4erQNYbEbt1aNwI0PLB-j5Vr0FM4BOCSFZHvGZEdAaselH7-wsEzGeD9XUs",
    "schoolLocation": "map",
    "searchValidated": false
  }