
import React, { useState } from 'react';
import { Character, characters } from '../data/characters';
import { Button } from '@/components/ui/button';

interface CharacterSelectProps {
  onSelect: (character: Character) => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleConfirm = () => {
    if (selectedCharacter) {
      onSelect(selectedCharacter);
    }
  };

  const getCharacterColor = (id: number) => {
    const colors = [
      'from-blue-500 to-cyan-500',      // Goku
      'from-purple-500 to-blue-500',    // Vegeta
      'from-red-500 to-orange-500',     // Jiren
      'from-gray-500 to-purple-500',    // Hit
      'from-pink-500 to-red-500'        // Goku Black
    ];
    return colors[(id - 1) % colors.length];
  };

  return (
    <div className="p-3 md:p-6 max-w-6xl mx-auto">
      <div className="text-center mb-4 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Selecciona tu Personaje</h2>
        <p className="text-dbs-lightPurple">Elige un guerrero para combatir a través de los mundos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`character-card p-3 md:p-4 border-2 cursor-pointer transition-all duration-300
              ${selectedCharacter?.id === character.id 
                ? 'border-dbs-vividPurple bg-dbs-darkPurple/50' 
                : 'border-dbs-darkPurple/50 bg-dbs-darkPurple/30 hover:bg-dbs-darkPurple/40'}`}
            onClick={() => handleSelect(character)}
          >
            <div className="relative">
              <div className="ki-aura"></div>
              <div className={`bg-gradient-to-b ${getCharacterColor(character.id)} aspect-square rounded-md flex items-center justify-center mb-4 overflow-hidden`}>
                <div className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                  {character.name.charAt(0)}
                </div>
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{character.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div>
                <span className="text-dbs-lightPurple text-xs md:text-sm">Poder: </span>
                <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                  <div className="h-full bg-dbs-orange rounded-full" style={{ width: `${character.power}%` }}></div>
                </div>
              </div>
              <div>
                <span className="text-dbs-lightPurple text-xs md:text-sm">Velocidad: </span>
                <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                  <div className="h-full bg-dbs-blue rounded-full" style={{ width: `${character.speed}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-dbs-darkPurple/50 p-2 rounded">
              <span className="text-dbs-purple font-semibold text-xs md:text-sm">Especial: </span>
              <span className="text-white text-xs md:text-sm">{character.specialAttack.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6 md:mt-8">
        <Button 
          onClick={handleConfirm} 
          disabled={!selectedCharacter}
          className="bg-dbs-vividPurple hover:bg-dbs-purple text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold disabled:bg-gray-600"
        >
          Confirmar Selección
        </Button>
      </div>
    </div>
  );
};

export default CharacterSelect;
