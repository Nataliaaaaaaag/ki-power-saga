
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
    name: "Tierra",
    description: "El planeta natal de los Guerreros Z. Un hermoso mundo con diversos paisajes.",
    background: "linear-gradient(to bottom, #33C3F0, #5ecce0)",
    difficulty: 1,
    enemyId: 101, // Freezer
    imageSrc: "/earth-world.png"
  },
  {
    id: 2,
    name: "Namek",
    description: "Un planeta con cielos verdes y hierba azul. Hogar de los Namekianos.",
    background: "linear-gradient(to bottom, #5ecce0, #44aa44)",
    difficulty: 2,
    enemyId: 102, // Cell
    imageSrc: "/namek-world.png"
  },
  {
    id: 3,
    name: "Planeta de Beerus",
    description: "El hogar del Dios de la Destrucción. Un pequeño mundo con gravedad inusual.",
    background: "linear-gradient(to bottom, #9b87f5, #D6BCFA)",
    difficulty: 3,
    enemyId: 103, // Beerus
    imageSrc: "/beerus-world.png"
  },
  {
    id: 4,
    name: "Tierra del Futuro",
    description: "Una Tierra distópica del futuro devastada por poderosos enemigos.",
    background: "linear-gradient(to bottom, #666666, #333333)",
    difficulty: 4,
    enemyId: 104, // Zamasu
    imageSrc: "/future-world.png"
  },
  {
    id: 5,
    name: "Arena del Torneo del Poder",
    description: "Una arena masiva creada por el Gran Sacerdote para el torneo multiversal.",
    background: "linear-gradient(to bottom, #1A1F2C, #444444)",
    difficulty: 5,
    enemyId: 105, // Broly
    imageSrc: "/tournament-world.png"
  }
];
