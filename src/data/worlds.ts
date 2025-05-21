
export interface World {
  id: number;
  name: string;
  description: string;
  background: string;
  difficulty: number;
  enemyId: number;
  imageSrc: string;
}

export const worlds: World[] = [
  {
    id: 1,
    name: "Earth",
    description: "The home planet of the Z fighters. A beautiful world with diverse landscapes.",
    background: "linear-gradient(to bottom, #33C3F0, #5ecce0)",
    difficulty: 1,
    enemyId: 101, // Frieza
    imageSrc: "/earth-world.png"
  },
  {
    id: 2,
    name: "Namek",
    description: "A planet with green skies and blue grass. Once home to the Namekians.",
    background: "linear-gradient(to bottom, #5ecce0, #44aa44)",
    difficulty: 2,
    enemyId: 102, // Cell
    imageSrc: "/namek-world.png"
  },
  {
    id: 3,
    name: "Beerus's Planet",
    description: "The home of the God of Destruction. A small world with unusual gravity.",
    background: "linear-gradient(to bottom, #9b87f5, #D6BCFA)",
    difficulty: 3,
    enemyId: 103, // Beerus
    imageSrc: "/beerus-world.png"
  },
  {
    id: 4,
    name: "Future Earth",
    description: "A dystopian future Earth devastated by powerful enemies.",
    background: "linear-gradient(to bottom, #666666, #333333)",
    difficulty: 4,
    enemyId: 104, // Zamasu
    imageSrc: "/future-world.png"
  },
  {
    id: 5,
    name: "Tournament of Power Arena",
    description: "A massive arena created by the Grand Priest for the multiverse tournament.",
    background: "linear-gradient(to bottom, #1A1F2C, #444444)",
    difficulty: 5,
    enemyId: 105, // Broly
    imageSrc: "/tournament-world.png"
  }
];
