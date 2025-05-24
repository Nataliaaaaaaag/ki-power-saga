
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
    imageSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Goku UI
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
    imageSrc: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Vegeta Blue
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
    imageSrc: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Jiren
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
    imageSrc: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Hit
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
    imageSrc: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Goku Black
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
    imageSrc: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Frieza
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
    imageSrc: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Cell
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
    imageSrc: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Beerus
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
    imageSrc: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Zamasu
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
    imageSrc: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop&crop=face", // Placeholder - reemplazar con imagen real de Broly
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
