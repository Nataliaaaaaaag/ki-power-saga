
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Select Your Character</h2>
        <p className="text-dbs-lightPurple">Choose a warrior to battle through the worlds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`character-card p-4 border-2 cursor-pointer transition-all duration-300
              ${selectedCharacter?.id === character.id 
                ? 'border-dbs-vividPurple bg-dbs-darkPurple/50' 
                : 'border-dbs-darkPurple/50 bg-dbs-darkPurple/30 hover:bg-dbs-darkPurple/40'}`}
            onClick={() => handleSelect(character)}
          >
            <div className="relative">
              <div className="ki-aura"></div>
              <div className="bg-gradient-to-b from-dbs-purple/10 to-dbs-vividPurple/20 aspect-square rounded-md flex items-center justify-center mb-4">
                {/* Replace with actual character image when available */}
                <div className="text-5xl font-bold text-dbs-vividPurple">{character.name.charAt(0)}</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div>
                <span className="text-dbs-lightPurple text-sm">Power: </span>
                <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                  <div className="h-full bg-dbs-orange rounded-full" style={{ width: `${character.power}%` }}></div>
                </div>
              </div>
              <div>
                <span className="text-dbs-lightPurple text-sm">Speed: </span>
                <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                  <div className="h-full bg-dbs-blue rounded-full" style={{ width: `${character.speed}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-dbs-darkPurple/50 p-2 rounded">
              <span className="text-dbs-purple font-semibold">Special: </span>
              <span className="text-white">{character.specialAttack.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button 
          onClick={handleConfirm} 
          disabled={!selectedCharacter}
          className="bg-dbs-vividPurple hover:bg-dbs-purple text-white px-8 py-4 text-lg font-bold disabled:bg-gray-600"
        >
          Confirm Selection
        </Button>
      </div>
    </div>
  );
};

export default CharacterSelect;
