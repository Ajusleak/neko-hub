export type SpriteVariant = {
  id: string;
  name: string;
  fullName: string;
  image: string;
  infoUrl: string;
  availability: "available" | "unreleased" | "unavailable";
};

export type SpriteFamily = {
  id: string;
  name: string;
  element: string;
  rarity: string;
  dropRate: string;
  ability: string;
  description: string;
  location: string;
  accent: string;
  image: string;
  infoUrl: string;
  variants: SpriteVariant[];
};

// Catalog and artwork references: https://fortnite.gg/sprites (retrieved 2026-08-31).
export const SPRITE_FAMILIES: SpriteFamily[] = [
  {
    "id": "jackrabbit",
    "name": "Jackrabbit Sprite",
    "element": "Jackrabbit",
    "rarity": "Legendary",
    "dropRate": "0%",
    "ability": "Grants the ability to perform another jump while mid-air!",
    "description": "Cooldown between jumps decreases with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#f0a43b",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_JazzJackrabbit_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/161-jackrabbit-sprite",
    "variants": [
      {
        "id": "161-jackrabbit-sprite",
        "name": "Base",
        "fullName": "Jackrabbit Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_JazzJackrabbit_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/161-jackrabbit-sprite",
        "availability": "available"
      },
      {
        "id": "162-gold-jackrabbit-sprite",
        "name": "Gold",
        "fullName": "Gold Jackrabbit Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_JazzJackrabbit_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/162-gold-jackrabbit-sprite",
        "availability": "available"
      },
      {
        "id": "163-cheat-master-jackrabbit-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Jackrabbit Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_JazzJackrabbit_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/163-cheat-master-jackrabbit-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "shadow",
    "name": "Shadow Sprite",
    "element": "Shadow",
    "rarity": "Epic",
    "dropRate": "0%",
    "ability": "Automatically reload unequipped weapons over time.",
    "description": "Reloads equipped weapon at max level. Automatic reload gets faster with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Scribe_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/164-shadow-sprite",
    "variants": [
      {
        "id": "164-shadow-sprite",
        "name": "Base",
        "fullName": "Shadow Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Scribe_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/164-shadow-sprite",
        "availability": "available"
      },
      {
        "id": "165-cheat-master-shadow-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Shadow Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Scribe_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/165-cheat-master-shadow-sprite",
        "availability": "available"
      },
      {
        "id": "166-gold-shadow-sprite",
        "name": "Gold",
        "fullName": "Gold Shadow Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Scribe_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/166-gold-shadow-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "bush",
    "name": "Bush Sprite",
    "element": "Bush",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Grants a bush on you after a duration, gain a bush on elimination at max level.",
    "description": "Time between bush activating decreases with each Level Up!",
    "location": "Location data not listed",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_BushRanger_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/167-bush-sprite",
    "variants": [
      {
        "id": "167-bush-sprite",
        "name": "Base",
        "fullName": "Bush Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_BushRanger_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/167-bush-sprite",
        "availability": "available"
      },
      {
        "id": "168-cheat-master-bush-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Bush Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_BushRanger_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/168-cheat-master-bush-sprite",
        "availability": "available"
      },
      {
        "id": "169-gold-bush-sprite",
        "name": "Gold",
        "fullName": "Gold Bush Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_BushRanger_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/169-gold-bush-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "tails",
    "name": "Tails Sprite",
    "element": "Tails",
    "rarity": "Epic",
    "dropRate": "0%",
    "ability": "Grants the ability to hover with the Help of Tails!",
    "description": "Hover speed increased with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Monkey_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/170-tails-sprite",
    "variants": [
      {
        "id": "170-tails-sprite",
        "name": "Base",
        "fullName": "Tails Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Monkey_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/170-tails-sprite",
        "availability": "available"
      },
      {
        "id": "171-cheat-master-tails-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Tails Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Monkey_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/171-cheat-master-tails-sprite",
        "availability": "available"
      },
      {
        "id": "172-gold-tails-sprite",
        "name": "Gold",
        "fullName": "Gold Tails Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Monkey_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/172-gold-tails-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "killswitch",
    "name": "Killswitch Sprite",
    "element": "Killswitch",
    "rarity": "Epic",
    "dropRate": "0%",
    "ability": "Enter Hangtime with improved accuracy when aiming while jumping and falling.",
    "description": "Accuracy increases with each Level Up!",
    "location": "Found in the world at nighttime",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Killswitch_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/173-killswitch-sprite",
    "variants": [
      {
        "id": "173-killswitch-sprite",
        "name": "Base",
        "fullName": "Killswitch Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Killswitch_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/173-killswitch-sprite",
        "availability": "available"
      },
      {
        "id": "174-cheat-master-killswitch-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Killswitch Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Killswitch_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/174-cheat-master-killswitch-sprite",
        "availability": "available"
      },
      {
        "id": "175-gold-killswitch-sprite",
        "name": "Gold",
        "fullName": "Gold Killswitch Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Killswitch_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/175-gold-killswitch-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "adventure",
    "name": "Adventure Sprite",
    "element": "Adventure",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Upgrades a random item in the player's inventory with each Level Up!",
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Dwarf_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/176-adventure-sprite",
    "variants": [
      {
        "id": "176-adventure-sprite",
        "name": "Base",
        "fullName": "Adventure Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Dwarf_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/176-adventure-sprite",
        "availability": "available"
      },
      {
        "id": "177-cheat-master-adventure-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Adventure Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Dwarf_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/177-cheat-master-adventure-sprite",
        "availability": "available"
      },
      {
        "id": "178-gold-adventure-sprite",
        "name": "Gold",
        "fullName": "Gold Adventure Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Dwarf_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/178-gold-adventure-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "klombo",
    "name": "Klombo Sprite",
    "element": "Klombo",
    "rarity": "Mythic",
    "dropRate": "0%",
    "ability": "Grants random items at each level, only levels up by consuming items.",
    "description": "Item quality increases with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Klombo_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/179-klombo-sprite",
    "variants": [
      {
        "id": "179-klombo-sprite",
        "name": "Base",
        "fullName": "Klombo Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Klombo_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/179-klombo-sprite",
        "availability": "available"
      },
      {
        "id": "180-cheat-master-klombo-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Klombo Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Klombo_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/180-cheat-master-klombo-sprite",
        "availability": "available"
      },
      {
        "id": "181-gold-klombo-sprite",
        "name": "Gold",
        "fullName": "Gold Klombo Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Klombo_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/181-gold-klombo-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "jonesy",
    "name": "Jonesy Sprite",
    "element": "Jonesy",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Recover some health or shields after being damaged after a short duration.",
    "description": "Increase amount healed with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Jonesy_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/182-jonesy-sprite",
    "variants": [
      {
        "id": "182-jonesy-sprite",
        "name": "Base",
        "fullName": "Jonesy Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Jonesy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/182-jonesy-sprite",
        "availability": "available"
      },
      {
        "id": "183-cheat-master-jonesy-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Jonesy Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Jonesy_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/183-cheat-master-jonesy-sprite",
        "availability": "available"
      },
      {
        "id": "184-gold-jonesy-sprite",
        "name": "Gold",
        "fullName": "Gold Jonesy Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Jonesy_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/184-gold-jonesy-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "sonic",
    "name": "Sonic Sprite",
    "element": "Sonic",
    "rarity": "Epic",
    "dropRate": "0%",
    "ability": "Gotta Go Fast!",
    "description": "Sprint faster with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Obsidian_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/185-sonic-sprite",
    "variants": [
      {
        "id": "185-sonic-sprite",
        "name": "Base",
        "fullName": "Sonic Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Obsidian_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/185-sonic-sprite",
        "availability": "available"
      },
      {
        "id": "186-cheat-master-sonic-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Sonic Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Obsidian_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/186-cheat-master-sonic-sprite",
        "availability": "available"
      },
      {
        "id": "187-gold-sonic-sprite",
        "name": "Gold",
        "fullName": "Gold Sonic Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_NarrowFlea_Obsidian_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/187-gold-sonic-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "crown",
    "name": "Crown Sprite",
    "element": "Crown",
    "rarity": "Mythic",
    "dropRate": "0%",
    "ability": "Only levels up by winning matches.",
    "description": "Level up faster with Crown Wins. New variants unlocked after mastering!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Crown_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/188-crown-sprite",
    "variants": [
      {
        "id": "188-crown-sprite",
        "name": "Base",
        "fullName": "Crown Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Crown_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/188-crown-sprite",
        "availability": "available"
      },
      {
        "id": "189-cheat-master-crown-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Crown Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Crown_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/189-cheat-master-crown-sprite",
        "availability": "available"
      },
      {
        "id": "190-gold-crown-sprite",
        "name": "Gold",
        "fullName": "Gold Crown Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Crown_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/190-gold-crown-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "8-bit",
    "name": "8-Bit Sprite",
    "element": "8-Bit",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "description": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "location": "Spotted near high and mountainous areas",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_EightBitBlaster_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/191-8-bit-sprite",
    "variants": [
      {
        "id": "191-8-bit-sprite",
        "name": "Base",
        "fullName": "8-Bit Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_EightBitBlaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/191-8-bit-sprite",
        "availability": "available"
      },
      {
        "id": "192-cheat-master-8-bit-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master 8-Bit Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_EightBitBlaster_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/192-cheat-master-8-bit-sprite",
        "availability": "available"
      },
      {
        "id": "193-gold-8-bit-sprite",
        "name": "Gold",
        "fullName": "Gold 8-Bit Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_EightBitBlaster_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/193-gold-8-bit-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "storm-scout",
    "name": "Storm Scout Sprite",
    "element": "Storm Scout",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Applies Overdrive after taking a certain amount of storm damage.",
    "description": "Reveals future Storm Circles at max level. Reduces damage to trigger overdrive with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_StormScout_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/194-storm-scout-sprite",
    "variants": [
      {
        "id": "194-storm-scout-sprite",
        "name": "Base",
        "fullName": "Storm Scout Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_StormScout_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/194-storm-scout-sprite",
        "availability": "available"
      },
      {
        "id": "195-cheat-master-storm-scout-sprite",
        "name": "Cheat Master",
        "fullName": "Cheat Master Storm Scout Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_StormScout_Cheatmaster_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/195-cheat-master-storm-scout-sprite",
        "availability": "available"
      },
      {
        "id": "196-gold-storm-scout-sprite",
        "name": "Gold",
        "fullName": "Gold Storm Scout Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_StormScout_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/196-gold-storm-scout-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "john-wick",
    "name": "John Wick Sprite",
    "element": "John Wick",
    "rarity": "Mythic",
    "dropRate": "0%",
    "ability": "Knocking players reveals others nearby.",
    "description": "Mark duration increases at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "location": "Found rarely in Sprite Chests",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_Reload_FillerGrunt_icon_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/138-john-wick-sprite",
    "variants": [
      {
        "id": "138-john-wick-sprite",
        "name": "Base",
        "fullName": "John Wick Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_Reload_FillerGrunt_icon_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/138-john-wick-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "batman",
    "name": "Batman Sprite",
    "element": "Batman",
    "rarity": "Mythic",
    "dropRate": "1.44%",
    "ability": "Grants the ability to launch in the air and deploy the Bat Cape!",
    "description": "Grants the ability to launch in the air and deploy the Bat Cape!",
    "location": "Found rarely in Sprite Chests",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_FossilMeal_Default_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/139-batman-sprite",
    "variants": [
      {
        "id": "139-batman-sprite",
        "name": "Base",
        "fullName": "Batman Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_FossilMeal_Default_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/139-batman-sprite",
        "availability": "available"
      },
      {
        "id": "146-cube-batman-sprite",
        "name": "Cube",
        "fullName": "Cube Batman Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_FossilMeal_Cube_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/146-cube-batman-sprite",
        "availability": "available"
      },
      {
        "id": "140-gold-batman-sprite",
        "name": "Gold",
        "fullName": "Gold Batman Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_FossilMeal_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/140-gold-batman-sprite",
        "availability": "available"
      },
      {
        "id": "141-gummy-batman-sprite",
        "name": "Gummy",
        "fullName": "Gummy Batman Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_FossilMeal_Candy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/141-gummy-batman-sprite",
        "availability": "available"
      },
      {
        "id": "142-galaxy-batman-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Batman Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_FossilMeal_Galaxy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/142-galaxy-batman-sprite",
        "availability": "available"
      },
      {
        "id": "145-holofoil-batman-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Batman Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_FossilMeal_Holofoil_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/145-holofoil-batman-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "water",
    "name": "Water Sprite",
    "element": "Water",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Replenish shields while standing in water!",
    "description": "Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "location": "Spotted near rivers and beaches",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Water_Unvault_Ch7S3_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/1-water-sprite",
    "variants": [
      {
        "id": "1-water-sprite",
        "name": "Base",
        "fullName": "Water Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Water_Unvault_Ch7S3_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/1-water-sprite",
        "availability": "available"
      },
      {
        "id": "4-gold-water-sprite",
        "name": "Gold",
        "fullName": "Gold Water Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Water_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/4-gold-water-sprite",
        "availability": "available"
      },
      {
        "id": "84-quack-water-sprite",
        "name": "Quack",
        "fullName": "Quack Water Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Water_Quack_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/84-quack-water-sprite",
        "availability": "available"
      },
      {
        "id": "2-gummy-water-sprite",
        "name": "Gummy",
        "fullName": "Gummy Water Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Water_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/2-gummy-water-sprite",
        "availability": "available"
      },
      {
        "id": "3-galaxy-water-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Water Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Water_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/3-galaxy-water-sprite",
        "availability": "available"
      },
      {
        "id": "76-gem-water-sprite",
        "name": "Gem",
        "fullName": "Gem Water Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Water_Gem_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/76-gem-water-sprite",
        "availability": "available"
      },
      {
        "id": "43-holofoil-water-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Water Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Water_Holofoil_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/43-holofoil-water-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "earth",
    "name": "Earth Sprite",
    "element": "Earth",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "You have a chance to find additional rare items when opening chests.",
    "description": "Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "location": "Found wandering around forests and wooded regions",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Earth_Ch7S3_UI_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/5-earth-sprite",
    "variants": [
      {
        "id": "5-earth-sprite",
        "name": "Base",
        "fullName": "Earth Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Earth_Ch7S3_UI_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/5-earth-sprite",
        "availability": "available"
      },
      {
        "id": "86-cube-earth-sprite",
        "name": "Cube",
        "fullName": "Cube Earth Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Earth_Cube_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/86-cube-earth-sprite",
        "availability": "available"
      },
      {
        "id": "8-gold-earth-sprite",
        "name": "Gold",
        "fullName": "Gold Earth Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Earth_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/8-gold-earth-sprite",
        "availability": "available"
      },
      {
        "id": "87-quack-earth-sprite",
        "name": "Quack",
        "fullName": "Quack Earth Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Earth_Quack_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/87-quack-earth-sprite",
        "availability": "available"
      },
      {
        "id": "6-gummy-earth-sprite",
        "name": "Gummy",
        "fullName": "Gummy Earth Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Earth_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/6-gummy-earth-sprite",
        "availability": "available"
      },
      {
        "id": "7-galaxy-earth-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Earth Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Earth_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/7-galaxy-earth-sprite",
        "availability": "available"
      },
      {
        "id": "45-gem-earth-sprite",
        "name": "Gem",
        "fullName": "Gem Earth Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Earth_Gem_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/45-gem-earth-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "fire",
    "name": "Fire Sprite",
    "element": "Fire",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Creates a fiery burst when you deal enough damage to an enemy!",
    "description": "Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "location": "Located near urban areas",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fire_Unvault_Ch7S3_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/9-fire-sprite",
    "variants": [
      {
        "id": "9-fire-sprite",
        "name": "Base",
        "fullName": "Fire Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fire_Unvault_Ch7S3_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/9-fire-sprite",
        "availability": "available"
      },
      {
        "id": "89-cube-fire-sprite",
        "name": "Cube",
        "fullName": "Cube Fire Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fire_Cube_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/89-cube-fire-sprite",
        "availability": "available"
      },
      {
        "id": "12-gold-fire-sprite",
        "name": "Gold",
        "fullName": "Gold Fire Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fire_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/12-gold-fire-sprite",
        "availability": "available"
      },
      {
        "id": "90-quack-fire-sprite",
        "name": "Quack",
        "fullName": "Quack Fire Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fire_Quack_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/90-quack-fire-sprite",
        "availability": "available"
      },
      {
        "id": "10-gummy-fire-sprite",
        "name": "Gummy",
        "fullName": "Gummy Fire Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fire_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/10-gummy-fire-sprite",
        "availability": "available"
      },
      {
        "id": "11-galaxy-fire-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Fire Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fire_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/11-galaxy-fire-sprite",
        "availability": "available"
      },
      {
        "id": "46-holofoil-fire-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Fire Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fire_Holofoil_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/46-holofoil-fire-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "duck",
    "name": "Duck Sprite",
    "element": "Duck",
    "rarity": "Epic",
    "dropRate": "6.48%",
    "ability": "Emoting or Jamming replenishes shields.",
    "description": "Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 6 Shield -> 8 Shield per tick",
    "location": "Found in the vault of a certain business mogul",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Duck_Default_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/13-duck-sprite",
    "variants": [
      {
        "id": "13-duck-sprite",
        "name": "Base",
        "fullName": "Duck Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Duck_Default_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/13-duck-sprite",
        "availability": "available"
      },
      {
        "id": "16-gold-duck-sprite",
        "name": "Gold",
        "fullName": "Gold Duck Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Duck_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/16-gold-duck-sprite",
        "availability": "available"
      },
      {
        "id": "14-gummy-duck-sprite",
        "name": "Gummy",
        "fullName": "Gummy Duck Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Duck_Candy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/14-gummy-duck-sprite",
        "availability": "available"
      },
      {
        "id": "15-galaxy-duck-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Duck Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Duck_Galaxy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/15-galaxy-duck-sprite",
        "availability": "available"
      },
      {
        "id": "44-gem-duck-sprite",
        "name": "Gem",
        "fullName": "Gem Duck Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Duck_Gem_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/44-gem-duck-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "ghost",
    "name": "Ghost Sprite",
    "element": "Ghost",
    "rarity": "Epic",
    "dropRate": "5.25%",
    "ability": "Grants cloak for a duration upon reloading.",
    "description": "Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "location": "Found in the world at nighttime",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Ghost_Unvault_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/17-ghost-sprite",
    "variants": [
      {
        "id": "17-ghost-sprite",
        "name": "Base",
        "fullName": "Ghost Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Ghost_Unvault_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/17-ghost-sprite",
        "availability": "available"
      },
      {
        "id": "20-gold-ghost-sprite",
        "name": "Gold",
        "fullName": "Gold Ghost Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Ghost_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/20-gold-ghost-sprite",
        "availability": "available"
      },
      {
        "id": "18-gummy-ghost-sprite",
        "name": "Gummy",
        "fullName": "Gummy Ghost Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Ghost_Candy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/18-gummy-ghost-sprite",
        "availability": "available"
      },
      {
        "id": "19-galaxy-ghost-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Ghost Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Ghost_Galaxy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/19-galaxy-ghost-sprite",
        "availability": "available"
      },
      {
        "id": "48-holofoil-ghost-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Ghost Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Ghost_Holo_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/48-holofoil-ghost-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "dream",
    "name": "Dream Sprite",
    "element": "Dream",
    "rarity": "Legendary",
    "dropRate": "4.45%",
    "ability": "Grants a random item at each level, exploding with legendary loot at Max Level.",
    "description": "Loot value increases at each Level Up!",
    "location": "Sometimes found sleeping in the storage crates",
    "accent": "#f0a43b",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Sleepy_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/21-dream-sprite",
    "variants": [
      {
        "id": "21-dream-sprite",
        "name": "Base",
        "fullName": "Dream Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Sleepy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/21-dream-sprite",
        "availability": "available"
      },
      {
        "id": "99-cube-dream-sprite",
        "name": "Cube",
        "fullName": "Cube Dream Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Sleepy_Cube_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/99-cube-dream-sprite",
        "availability": "available"
      },
      {
        "id": "24-gold-dream-sprite",
        "name": "Gold",
        "fullName": "Gold Dream Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Sleepy_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/24-gold-dream-sprite",
        "availability": "available"
      },
      {
        "id": "22-gummy-dream-sprite",
        "name": "Gummy",
        "fullName": "Gummy Dream Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Sleepy_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/22-gummy-dream-sprite",
        "availability": "available"
      },
      {
        "id": "23-galaxy-dream-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Dream Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Sleepy_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/23-galaxy-dream-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "demon",
    "name": "Demon Sprite",
    "element": "Demon",
    "rarity": "Epic",
    "dropRate": "6.48%",
    "ability": "Siphon some health and shields when you eliminate an opponent.",
    "description": "Increases in power at each Level Up: 10 Healing -> 15 Healing -> 20 Healing -> 25 Healing -> 30 Healing per elimination",
    "location": "Found rarely in Sprite Chests",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_RedDemon_Default_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/37-demon-sprite",
    "variants": [
      {
        "id": "37-demon-sprite",
        "name": "Base",
        "fullName": "Demon Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_RedDemon_Default_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/37-demon-sprite",
        "availability": "available"
      },
      {
        "id": "40-gold-demon-sprite",
        "name": "Gold",
        "fullName": "Gold Demon Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_RedDemon_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/40-gold-demon-sprite",
        "availability": "available"
      },
      {
        "id": "38-gummy-demon-sprite",
        "name": "Gummy",
        "fullName": "Gummy Demon Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_RedDemon_Candy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/38-gummy-demon-sprite",
        "availability": "available"
      },
      {
        "id": "39-galaxy-demon-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Demon Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_RedDemon_Galaxy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/39-galaxy-demon-sprite",
        "availability": "available"
      },
      {
        "id": "47-gem-demon-sprite",
        "name": "Gem",
        "fullName": "Gem Demon Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_RedDemon_Gem_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/47-gem-demon-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "punk",
    "name": "Punk Sprite",
    "element": "Punk",
    "rarity": "Legendary",
    "dropRate": "4.45%",
    "ability": "Possibly nothing... or infinitely something",
    "description": "Possibly nothing... or infinitely something",
    "location": "Found rarely in Sprite Chests",
    "accent": "#f0a43b",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Punk_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/25-punk-sprite",
    "variants": [
      {
        "id": "25-punk-sprite",
        "name": "Base",
        "fullName": "Punk Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Punk_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/25-punk-sprite",
        "availability": "available"
      },
      {
        "id": "106-cube-punk-sprite",
        "name": "Cube",
        "fullName": "Cube Punk Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Punk_Cube_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/106-cube-punk-sprite",
        "availability": "available"
      },
      {
        "id": "28-gold-punk-sprite",
        "name": "Gold",
        "fullName": "Gold Punk Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Punk_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/28-gold-punk-sprite",
        "availability": "available"
      },
      {
        "id": "26-gummy-punk-sprite",
        "name": "Gummy",
        "fullName": "Gummy Punk Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Punk_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/26-gummy-punk-sprite",
        "availability": "available"
      },
      {
        "id": "27-galaxy-punk-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Punk Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Punk_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/27-galaxy-punk-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "king",
    "name": "King Sprite",
    "element": "King",
    "rarity": "Epic",
    "dropRate": "5.25%",
    "ability": "Your Pickaxe deals more damage.",
    "description": "Increases in damage at each Level Up: 30 -> 40 -> 60 -> 80 -> 120 bonus damage",
    "location": "Found rarely in Sprite Chests",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_King_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/29-king-sprite",
    "variants": [
      {
        "id": "29-king-sprite",
        "name": "Base",
        "fullName": "King Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_King_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/29-king-sprite",
        "availability": "available"
      },
      {
        "id": "32-gold-king-sprite",
        "name": "Gold",
        "fullName": "Gold King Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_King_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/32-gold-king-sprite",
        "availability": "available"
      },
      {
        "id": "30-gummy-king-sprite",
        "name": "Gummy",
        "fullName": "Gummy King Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_King_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/30-gummy-king-sprite",
        "availability": "available"
      },
      {
        "id": "31-galaxy-king-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy King Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_King_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/31-galaxy-king-sprite",
        "availability": "available"
      },
      {
        "id": "73-holofoil-king-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil King Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_King_Holofoil_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/73-holofoil-king-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "vini-jr-",
    "name": "Vini Jr. Sprite",
    "element": "Vini Jr.",
    "rarity": "Mythic",
    "dropRate": "2.14%",
    "ability": "Sprinting for a short time makes your slide destructive.",
    "description": "Slidekicking enemies increases rate of fire and reload speed. Increases in power at each Level Up: 40 dmg / 10% fire rate -> 45 dmg / 20% fire rate -> 50 dmg / 30% fire rate -> 55 dmg / 40% fire rate -> 60 dmg / 50% fire rate",
    "location": "Found in Relic Chests",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_CokeParmesan_Default_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/149-vini-jr-sprite",
    "variants": [
      {
        "id": "149-vini-jr-sprite",
        "name": "Base",
        "fullName": "Vini Jr. Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_CokeParmesan_Default_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/149-vini-jr-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "burnt-peanut",
    "name": "Burnt Peanut",
    "element": "Burnt Peanut",
    "rarity": "Mythic",
    "dropRate": "2.14%",
    "ability": "Goop! When eliminating players, you may find more loot. Sometimes mythic!",
    "description": "Chance increases at each Level Up: 20% -> 30% -> 40% -> 50% -> 60% chance to find more loot. 10% chance to find Mythic at Max Level!",
    "location": "Found in Relic Chests",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_BurntPeanut_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/41-burnt-peanut",
    "variants": [
      {
        "id": "41-burnt-peanut",
        "name": "Base",
        "fullName": "Burnt Peanut",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_BurntPeanut_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/41-burnt-peanut",
        "availability": "available"
      }
    ]
  },
  {
    "id": "zero-point",
    "name": "Zero Point Sprite",
    "element": "Zero Point",
    "rarity": "Mythic",
    "dropRate": "0%",
    "ability": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades).",
    "description": "Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "location": "Found rarely in Sprite Chests",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/33-zero-point-sprite",
    "variants": [
      {
        "id": "33-zero-point-sprite",
        "name": "Base",
        "fullName": "Zero Point Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/33-zero-point-sprite",
        "availability": "available"
      },
      {
        "id": "112-cube-zero-point-sprite",
        "name": "Cube",
        "fullName": "Cube Zero Point Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_Cube_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/112-cube-zero-point-sprite",
        "availability": "available"
      },
      {
        "id": "36-gold-zero-point-sprite",
        "name": "Gold",
        "fullName": "Gold Zero Point Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/36-gold-zero-point-sprite",
        "availability": "available"
      },
      {
        "id": "113-quack-zero-point-sprite",
        "name": "Quack",
        "fullName": "Quack Zero Point Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_Quack_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/113-quack-zero-point-sprite",
        "availability": "available"
      },
      {
        "id": "34-gummy-zero-point-sprite",
        "name": "Gummy",
        "fullName": "Gummy Zero Point Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/34-gummy-zero-point-sprite",
        "availability": "available"
      },
      {
        "id": "35-galaxy-zero-point-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Zero Point Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/35-galaxy-zero-point-sprite",
        "availability": "available"
      },
      {
        "id": "82-gem-zero-point-sprite",
        "name": "Gem",
        "fullName": "Gem Zero Point Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_Gem_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/82-gem-zero-point-sprite",
        "availability": "available"
      },
      {
        "id": "111-holofoil-zero-point-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Zero Point Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ZeroPoint_Holofoil_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/111-holofoil-zero-point-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "fishy",
    "name": "Fishy Sprite",
    "element": "Fishy",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Swim speed greatly increased. Taking damage also briefly increases movement speed.",
    "description": "Increases in power at each Level Up: 25% Swim Speed / 10% Movement Speed -> 50% Swim Speed / 20% Movement Speed -> 100% Swim Speed / 30% Movement Speed -> 150% Swim Speed / 40% Movement Speed -> 200% Swim Speed / 50% Movement Speed Bonuses",
    "location": "Spotted near high and mountainous areas",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fishy_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/58-fishy-sprite",
    "variants": [
      {
        "id": "58-fishy-sprite",
        "name": "Base",
        "fullName": "Fishy Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fishy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/58-fishy-sprite",
        "availability": "available"
      },
      {
        "id": "116-cube-fishy-sprite",
        "name": "Cube",
        "fullName": "Cube Fishy Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fishy_Cube_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/116-cube-fishy-sprite",
        "availability": "available"
      },
      {
        "id": "61-gold-fishy-sprite",
        "name": "Gold",
        "fullName": "Gold Fishy Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fishy_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/61-gold-fishy-sprite",
        "availability": "available"
      },
      {
        "id": "59-gummy-fishy-sprite",
        "name": "Gummy",
        "fullName": "Gummy Fishy Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fishy_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/59-gummy-fishy-sprite",
        "availability": "available"
      },
      {
        "id": "60-galaxy-fishy-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Fishy Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Fishy_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/60-galaxy-fishy-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "striker",
    "name": "Striker Sprite",
    "element": "Striker",
    "rarity": "Epic",
    "dropRate": "5.25%",
    "ability": "Gain the Overdrive effect when you Mantle, Hurdle, or Wall Scramble.",
    "description": "Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds of Overdrive",
    "location": "Spotted near high and mountainous areas",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Soccer_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/62-striker-sprite",
    "variants": [
      {
        "id": "62-striker-sprite",
        "name": "Base",
        "fullName": "Striker Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Soccer_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/62-striker-sprite",
        "availability": "available"
      },
      {
        "id": "65-gold-striker-sprite",
        "name": "Gold",
        "fullName": "Gold Striker Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Soccer_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/65-gold-striker-sprite",
        "availability": "available"
      },
      {
        "id": "63-gummy-striker-sprite",
        "name": "Gummy",
        "fullName": "Gummy Striker Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Soccer_Candy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/63-gummy-striker-sprite",
        "availability": "available"
      },
      {
        "id": "64-galaxy-striker-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Striker Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Soccer_Galaxy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/64-galaxy-striker-sprite",
        "availability": "available"
      },
      {
        "id": "66-holofoil-striker-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Striker Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Soccer_Holofoil_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/66-holofoil-striker-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "aura",
    "name": "Aura Sprite",
    "element": "Aura",
    "rarity": "Epic",
    "dropRate": "6.48%",
    "ability": "Gain a Shock Rock charge when you deal enough damage to enemies!",
    "description": "Required damage decreases at each Level Up: 175 Damage -> 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage to trigger",
    "location": "Spotted near high and mountainous areas",
    "accent": "#c06df2",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Drifter_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/67-aura-sprite",
    "variants": [
      {
        "id": "67-aura-sprite",
        "name": "Base",
        "fullName": "Aura Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Drifter_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/67-aura-sprite",
        "availability": "available"
      },
      {
        "id": "71-gold-aura-sprite",
        "name": "Gold",
        "fullName": "Gold Aura Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Drifter_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/71-gold-aura-sprite",
        "availability": "available"
      },
      {
        "id": "68-gummy-aura-sprite",
        "name": "Gummy",
        "fullName": "Gummy Aura Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Drifter_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/68-gummy-aura-sprite",
        "availability": "available"
      },
      {
        "id": "69-galaxy-aura-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Aura Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Drifter_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/69-galaxy-aura-sprite",
        "availability": "available"
      },
      {
        "id": "70-gem-aura-sprite",
        "name": "Gem",
        "fullName": "Gem Aura Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Drifter_Gem_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/70-gem-aura-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "boss",
    "name": "Boss Sprite",
    "element": "Boss",
    "rarity": "Legendary",
    "dropRate": "4.45%",
    "ability": "Grants an increase to your max HP and Shield.",
    "description": "Increases at each Level Up: 5 HP/Shield -> 10 HP/Shield -> 15 HP/Shield -> 20 HP/Shield -> 25 HP/Shield",
    "location": "Claimed from defeating a powerful adversary",
    "accent": "#f0a43b",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Boss_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/49-boss-sprite",
    "variants": [
      {
        "id": "49-boss-sprite",
        "name": "Base",
        "fullName": "Boss Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Boss_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/49-boss-sprite",
        "availability": "available"
      },
      {
        "id": "126-cube-boss-sprite",
        "name": "Cube",
        "fullName": "Cube Boss Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Boss_Cube_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/126-cube-boss-sprite",
        "availability": "available"
      },
      {
        "id": "50-gold-boss-sprite",
        "name": "Gold",
        "fullName": "Gold Boss Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Boss_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/50-gold-boss-sprite",
        "availability": "available"
      },
      {
        "id": "51-gummy-boss-sprite",
        "name": "Gummy",
        "fullName": "Gummy Boss Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Boss_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/51-gummy-boss-sprite",
        "availability": "available"
      },
      {
        "id": "52-galaxy-boss-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Boss Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Boss_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/52-galaxy-boss-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "grim",
    "name": "Grim Sprite",
    "element": "Grim",
    "rarity": "Mythic",
    "dropRate": "0.15%",
    "ability": "Players who attack you are marked for a duration.",
    "description": "Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "location": "Found rarely in Sprite Chests",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_GrimReaper_Default_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/78-grim-sprite",
    "variants": [
      {
        "id": "78-grim-sprite",
        "name": "Base",
        "fullName": "Grim Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_GrimReaper_Default_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/78-grim-sprite",
        "availability": "available"
      },
      {
        "id": "130-cube-grim-sprite",
        "name": "Cube",
        "fullName": "Cube Grim Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_GrimReaper_Cube_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/130-cube-grim-sprite",
        "availability": "available"
      },
      {
        "id": "81-gold-grim-sprite",
        "name": "Gold",
        "fullName": "Gold Grim Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_GrimReaper_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/81-gold-grim-sprite",
        "availability": "available"
      },
      {
        "id": "79-gummy-grim-sprite",
        "name": "Gummy",
        "fullName": "Gummy Grim Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_GrimReaper_Candy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/79-gummy-grim-sprite",
        "availability": "available"
      },
      {
        "id": "80-galaxy-grim-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Grim Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_GrimReaper_Galaxy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/80-galaxy-grim-sprite",
        "availability": "available"
      },
      {
        "id": "128-gem-grim-sprite",
        "name": "Gem",
        "fullName": "Gem Grim Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_GrimReaper_Gem_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/128-gem-grim-sprite",
        "availability": "available"
      },
      {
        "id": "129-holofoil-grim-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Grim Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_GrimReaper_Holofoil_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/129-holofoil-grim-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "air",
    "name": "Air Sprite",
    "element": "Air",
    "rarity": "Rare",
    "dropRate": "0%",
    "ability": "Increases sprinting speed and jump height.",
    "description": "Also nullifies fall damage. Jump height increased with each Level Up!",
    "location": "Spotted near high and mountainous areas",
    "accent": "#4db7ef",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Air_Default_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/74-air-sprite",
    "variants": [
      {
        "id": "74-air-sprite",
        "name": "Base",
        "fullName": "Air Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Air_Default_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/74-air-sprite",
        "availability": "available"
      },
      {
        "id": "42-gold-air-sprite",
        "name": "Gold",
        "fullName": "Gold Air Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Air_Gold_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/42-gold-air-sprite",
        "availability": "available"
      },
      {
        "id": "72-gummy-air-sprite",
        "name": "Gummy",
        "fullName": "Gummy Air Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Air_Candy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/72-gummy-air-sprite",
        "availability": "available"
      },
      {
        "id": "75-galaxy-air-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Air Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Air_Galaxy_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/75-galaxy-air-sprite",
        "availability": "available"
      },
      {
        "id": "77-holofoil-air-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Air Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Air_Holo_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/77-holofoil-air-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "seven",
    "name": "Seven Sprite",
    "element": "Seven",
    "rarity": "Legendary",
    "dropRate": "3.63%",
    "ability": "Enemy player foot trails are visible in the world for your Squad.",
    "description": "Duration increases at each Level Up: 10 Seconds -> 15 Seconds -> 20 Seconds -> 25 Seconds -> 30 Second foot trails",
    "location": "Spotted near high and mountainous areas",
    "accent": "#f0a43b",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Seven_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/53-seven-sprite",
    "variants": [
      {
        "id": "53-seven-sprite",
        "name": "Base",
        "fullName": "Seven Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Seven_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/53-seven-sprite",
        "availability": "available"
      },
      {
        "id": "56-gold-seven-sprite",
        "name": "Gold",
        "fullName": "Gold Seven Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Seven_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/56-gold-seven-sprite",
        "availability": "available"
      },
      {
        "id": "54-gummy-seven-sprite",
        "name": "Gummy",
        "fullName": "Gummy Seven Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Seven_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/54-gummy-seven-sprite",
        "availability": "available"
      },
      {
        "id": "55-galaxy-seven-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Seven Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Seven_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/55-galaxy-seven-sprite",
        "availability": "available"
      },
      {
        "id": "57-holofoil-seven-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Seven Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Seven_Holofoil_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/57-holofoil-seven-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "ironmouse",
    "name": "Ironmouse Sprite",
    "element": "Ironmouse",
    "rarity": "Mythic",
    "dropRate": "2.14%",
    "ability": "Regenerate health over time when low.",
    "description": "While regenerating, gain Cloak and low gravity! Health regenerated to increases at each Level Up: 60 Health -> 70 Health -> 80 Health -> 90 Health -> 100 Health",
    "location": "Found in Relic Chests",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_PedicureAntacid_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/150-ironmouse-sprite",
    "variants": [
      {
        "id": "150-ironmouse-sprite",
        "name": "Base",
        "fullName": "Ironmouse Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_PedicureAntacid_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/150-ironmouse-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "pollo",
    "name": "Pollo Sprite",
    "element": "Pollo",
    "rarity": "Mythic",
    "dropRate": "2.14%",
    "ability": "Upon earning an elimination, slowly replenish shield for you and nearby squad members for a duration.",
    "description": "Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "location": "Location data not listed",
    "accent": "#f1ce4d",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_CompanyStargazer_Default_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/148-pollo-sprite",
    "variants": [
      {
        "id": "148-pollo-sprite",
        "name": "Base",
        "fullName": "Pollo Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_CompanyStargazer_Default_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/148-pollo-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "llama",
    "name": "Llama Sprite",
    "element": "Llama",
    "rarity": "Legendary",
    "dropRate": "4.45%",
    "ability": "Opening ammo boxes has a chance to grant a weapon upgrade.",
    "description": "Chance increases at each Level Up: 5% -> 10% -> 15% -> 17% -> 20%",
    "location": "Found in Relic Chests",
    "accent": "#f0a43b",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Llama_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/151-llama-sprite",
    "variants": [
      {
        "id": "151-llama-sprite",
        "name": "Base",
        "fullName": "Llama Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Llama_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/151-llama-sprite",
        "availability": "available"
      },
      {
        "id": "152-gold-llama-sprite",
        "name": "Gold",
        "fullName": "Gold Llama Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Llama_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/152-gold-llama-sprite",
        "availability": "available"
      },
      {
        "id": "153-gummy-llama-sprite",
        "name": "Gummy",
        "fullName": "Gummy Llama Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Llama_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/153-gummy-llama-sprite",
        "availability": "available"
      },
      {
        "id": "154-galaxy-llama-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Llama Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Llama_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/154-galaxy-llama-sprite",
        "availability": "available"
      },
      {
        "id": "155-gem-llama-sprite",
        "name": "Gem",
        "fullName": "Gem Llama Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Llama_Gem_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/155-gem-llama-sprite",
        "availability": "available"
      }
    ]
  },
  {
    "id": "peeky-peely",
    "name": "Peeky Peely Sprite",
    "element": "Peeky Peely",
    "rarity": "Legendary",
    "dropRate": "4.62%",
    "ability": "Emits a ping for players with rare sprites nearby, but marks you on the map.",
    "description": "Ping radius increases at each Level Up: 40m -> 50m -> 60m -> 70m -> 80m",
    "location": "Spotted near high and mountainous areas",
    "accent": "#f0a43b",
    "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Peely_ui_L.webp",
    "infoUrl": "https://fortnite.gg/sprites/156-peeky-peely-sprite",
    "variants": [
      {
        "id": "156-peeky-peely-sprite",
        "name": "Base",
        "fullName": "Peeky Peely Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Peely_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/156-peeky-peely-sprite",
        "availability": "available"
      },
      {
        "id": "157-gold-peeky-peely-sprite",
        "name": "Gold",
        "fullName": "Gold Peeky Peely Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Peely_Gold_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/157-gold-peeky-peely-sprite",
        "availability": "available"
      },
      {
        "id": "158-gummy-peeky-peely-sprite",
        "name": "Gummy",
        "fullName": "Gummy Peeky Peely Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Peely_Candy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/158-gummy-peeky-peely-sprite",
        "availability": "available"
      },
      {
        "id": "159-galaxy-peeky-peely-sprite",
        "name": "Galaxy",
        "fullName": "Galaxy Peeky Peely Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Peely_Galaxy_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/159-galaxy-peeky-peely-sprite",
        "availability": "available"
      },
      {
        "id": "160-holofoil-peeky-peely-sprite",
        "name": "Holofoil",
        "fullName": "Holofoil Peeky Peely Sprite",
        "image": "https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Peely_Holofoil_ui_L.webp",
        "infoUrl": "https://fortnite.gg/sprites/160-holofoil-peeky-peely-sprite",
        "availability": "available"
      }
    ]
  }
];

