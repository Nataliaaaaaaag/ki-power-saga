
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
    name: "Goku (Ultra Instinto)",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 100,
    power: 95,
    speed: 90,
    specialAttack: {
      name: "Ultra Instinto Autónomo",
      damage: 50,
      description: "Goku esquiva ataques automáticamente y contraataca con golpes devastadores"
    }
  },
  {
    id: 2,
    name: "Vegeta (Evolución Blue)",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 100,
    power: 90,
    speed: 85,
    specialAttack: {
      name: "Resplandor Final",
      damage: 45,
      description: "Una poderosa explosión de energía que causa daño masivo"
    }
  },
  {
    id: 3,
    name: "Jiren",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 100,
    power: 100,
    speed: 80,
    specialAttack: {
      name: "Impacto de Poder",
      damage: 55,
      description: "Un poderoso ataque de ki que persigue al objetivo"
    }
  },
  {
    id: 4,
    name: "Hit",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 100,
    power: 85,
    speed: 95,
    specialAttack: {
      name: "Salto Temporal",
      damage: 40,
      description: "Congela el tiempo brevemente para asestar una serie de golpes devastadores"
    }
  },
  {
    id: 5,
    name: "Goku Black (Rosé)",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 100,
    power: 88,
    speed: 87,
    specialAttack: {
      name: "Lazo Divino",
      damage: 42,
      description: "Crea hojas de energía que atraviesan al oponente"
    }
  }
];

// Para enemigos en cada mundo
export const enemies: Character[] = [
  {
    id: 101,
    name: "Freezer",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 80,
    power: 75,
    speed: 70,
    specialAttack: {
      name: "Rayo Mortal",
      damage: 30,
      description: "Un rayo de energía penetrante"
    }
  },
  {
    id: 102,
    name: "Cell",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 85,
    power: 80,
    speed: 75,
    specialAttack: {
      name: "Kamehameha Perfecto",
      damage: 35,
      description: "Una versión perfecta de la onda Kamehameha"
    }
  },
  {
    id: 103,
    name: "Beerus",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 90,
    power: 90,
    speed: 85,
    specialAttack: {
      name: "Hakai",
      damage: 45,
      description: "Energía de destrucción que puede borrar la existencia"
    }
  },
  {
    id: 104,
    name: "Zamasu",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 95,
    power: 85,
    speed: 80,
    specialAttack: {
      name: "Hojas del Juicio",
      damage: 40,
      description: "Crea múltiples hojas de energía que llueven sobre los oponentes"
    }
  },
  {
    id: 105,
    name: "Broly",
    imageSrc: "", // Sin imagen - se mostrará inicial
    health: 100,
    power: 95,
    speed: 75,
    specialAttack: {
      name: "Rugido Gigantesco",
      damage: 50,
      description: "Una onda de energía masiva alimentada por la ira"
    }
  }
];
