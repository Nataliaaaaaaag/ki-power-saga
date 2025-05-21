
export interface Character {
  id: number;
  name: string;
  imageSrc: string;
  health: number;
  power: number;
  speed: number;
  specialAttack: SpecialAttack;
}

export interface SpecialAttack {
  name: string;
  damage: number;
  description: string;
}

export const characters: Character[] = [
  {
    id: 1,
    name: "Goku (Ultra Instinct)",
    imageSrc: "/goku-ui.png", // We'll replace these with actual images later
    health: 100,
    power: 95,
    speed: 90,
    specialAttack: {
      name: "Autonomous Ultra Instinct",
      damage: 50,
      description: "Goku dodges attacks automatically and counters with devastating blows"
    }
  },
  {
    id: 2,
    name: "Vegeta (Blue Evolution)",
    imageSrc: "/vegeta-blue.png",
    health: 100,
    power: 90,
    speed: 85,
    specialAttack: {
      name: "Final Flash",
      damage: 45,
      description: "A powerful energy blast that deals massive damage"
    }
  },
  {
    id: 3,
    name: "Jiren",
    imageSrc: "/jiren.png",
    health: 100,
    power: 100,
    speed: 80,
    specialAttack: {
      name: "Power Impact",
      damage: 55,
      description: "A powerful ki blast that pursues the target"
    }
  },
  {
    id: 4,
    name: "Hit",
    imageSrc: "/hit.png",
    health: 100,
    power: 85,
    speed: 95,
    specialAttack: {
      name: "Time Skip",
      damage: 40,
      description: "Freezes time briefly to deliver a series of devastating blows"
    }
  },
  {
    id: 5,
    name: "Goku Black (Rosé)",
    imageSrc: "/goku-black.png",
    health: 100,
    power: 88,
    speed: 87,
    specialAttack: {
      name: "Divine Lasso",
      damage: 42,
      description: "Creates blades of energy that impale the opponent"
    }
  }
];

// For enemies in each world
export const enemies: Character[] = [
  {
    id: 101,
    name: "Frieza",
    imageSrc: "/frieza.png",
    health: 80,
    power: 75,
    speed: 70,
    specialAttack: {
      name: "Death Beam",
      damage: 30,
      description: "A piercing beam of energy"
    }
  },
  {
    id: 102,
    name: "Cell",
    imageSrc: "/cell.png",
    health: 85,
    power: 80,
    speed: 75,
    specialAttack: {
      name: "Perfect Kamehameha",
      damage: 35,
      description: "A perfect version of the Kamehameha wave"
    }
  },
  {
    id: 103,
    name: "Beerus",
    imageSrc: "/beerus.png",
    health: 90,
    power: 90,
    speed: 85,
    specialAttack: {
      name: "Hakai",
      damage: 45,
      description: "Energy of destruction that can erase existence"
    }
  },
  {
    id: 104,
    name: "Zamasu",
    imageSrc: "/zamasu.png",
    health: 95,
    power: 85,
    speed: 80,
    specialAttack: {
      name: "Blades of Judgment",
      damage: 40,
      description: "Creates multiple energy blades that rain down on opponents"
    }
  },
  {
    id: 105,
    name: "Broly",
    imageSrc: "/broly.png",
    health: 100,
    power: 95,
    speed: 75,
    specialAttack: {
      name: "Gigantic Roar",
      damage: 50,
      description: "A massive energy wave fueled by rage"
    }
  }
];
