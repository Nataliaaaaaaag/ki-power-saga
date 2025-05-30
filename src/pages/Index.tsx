import React, { useState } from 'react';
import CharacterSelect from '../components/CharacterSelect';
import GameWorld from '../components/GameWorld';
import { Character } from '../data/characters';
import { World, worlds } from '../data/worlds';
import { toast } from '@/hooks/use-toast';

enum GameState {
  CHARACTER_SELECT,
  WORLD_SELECT,
  BATTLE,
  GAME_OVER,
  VICTORY
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.CHARACTER_SELECT);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentWorld, setCurrentWorld] = useState<World | null>(null);
  const [completedWorlds, setCompletedWorlds] = useState<number[]>([]);

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

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setGameState(GameState.WORLD_SELECT);
    toast({
      title: "Personaje Seleccionado",
      description: `¡Has elegido a ${character.name}!`,
    });
  };

  const handleWorldSelect = (world: World) => {
    setCurrentWorld(world);
    setGameState(GameState.BATTLE);
  };

  const handleWorldComplete = () => {
    if (currentWorld) {
      const newCompletedWorlds = [...completedWorlds, currentWorld.id];
      setCompletedWorlds(newCompletedWorlds);
      
      // Verificar si todos los mundos están completados
      if (newCompletedWorlds.length === worlds.length) {
        setGameState(GameState.VICTORY);
      } else {
        setGameState(GameState.WORLD_SELECT);
      }
    }
  };

  const handleGameOver = () => {
    setGameState(GameState.GAME_OVER);
  };

  const handleRestart = () => {
    setSelectedCharacter(null);
    setCurrentWorld(null);
    setCompletedWorlds([]);
    setGameState(GameState.CHARACTER_SELECT);
  };

  const renderGameState = () => {
    switch (gameState) {
      case GameState.CHARACTER_SELECT:
        return <CharacterSelect onSelect={handleCharacterSelect} />;
      
      case GameState.WORLD_SELECT:
        return (
          <div className="p-3 md:p-6 max-w-6xl mx-auto">
            <div className="text-center mb-4 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Selecciona un Mundo</h2>
              <p className="text-dbs-lightPurple">Elige un mundo para combatir</p>
              
              {selectedCharacter && (
                <div className="mt-4 inline-flex items-center bg-dbs-darkPurple/70 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getCharacterColor(selectedCharacter.id)} flex items-center justify-center text-white font-bold text-sm`}>
                      {selectedCharacter.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-dbs-purple font-semibold mr-2">Personaje:</span> 
                      <span className="text-white">{selectedCharacter.name}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {worlds.map((world) => {
                const isCompleted = completedWorlds.includes(world.id);
                const isLocked = world.id > 1 && !completedWorlds.includes(world.id - 1);
                
                return (
                  <div
                    key={world.id}
                    className={`character-card p-3 md:p-4 border-2 relative
                      ${isCompleted 
                        ? 'border-green-500 bg-dbs-darkPurple/50' 
                        : isLocked
                          ? 'border-gray-700 bg-dbs-darkPurple/10 opacity-70'
                          : 'border-dbs-purple bg-dbs-darkPurple/30 cursor-pointer hover:bg-dbs-darkPurple/40'}`}
                    onClick={() => !isLocked && handleWorldSelect(world)}
                  >
                    <div className="relative">
                      <div className={`ki-aura ${isCompleted ? 'opacity-30 bg-green-500' : ''}`}></div>
                      <div className="bg-gradient-to-b from-dbs-darkPurple/50 to-black/50 aspect-video rounded-md flex items-center justify-center mb-4">
                        <div className="text-4xl md:text-5xl font-bold text-dbs-lightPurple">{world.name.charAt(0)}</div>
                      </div>
                    </div>

                    {isLocked && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                        <div className="text-white text-center">
                          <span className="text-3xl">🔒</span>
                          <p className="text-sm md:text-base">Completa el mundo anterior</p>
                        </div>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <span className="text-lg">✓</span>
                      </div>
                    )}

                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{world.name}</h3>
                    <p className="text-dbs-lightPurple text-xs md:text-sm mb-3">{world.description}</p>
                    
                    <div className="flex items-center mb-2">
                      <span className="text-dbs-purple mr-2 text-sm">Dificultad:</span>
                      <span className="text-yellow-400">
                        {Array(world.difficulty).fill('★').join('')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case GameState.BATTLE:
        return (
          <>
            {selectedCharacter && currentWorld && (
              <GameWorld
                world={currentWorld}
                player={selectedCharacter}
                onComplete={handleWorldComplete}
                onGameOver={handleGameOver}
                onBackToWorldSelect={() => setGameState(GameState.WORLD_SELECT)}
              />
            )}
          </>
        );
      
      case GameState.GAME_OVER:
        return (
          <div className="min-h-screen flex items-center justify-center bg-dbs-darkPurple">
            <div className="text-center p-8 bg-black/30 rounded-lg max-w-md">
              <h2 className="text-4xl font-bold text-dbs-red mb-4">Fin del Juego</h2>
              <p className="text-white mb-6">¡Has sido derrotado! ¡Entrena más duro e inténtalo de nuevo!</p>
              <button 
                onClick={handleRestart} 
                className="bg-dbs-vividPurple hover:bg-dbs-purple text-white px-8 py-3 rounded-lg font-bold"
              >
                Intentar de Nuevo
              </button>
            </div>
          </div>
        );
      
      case GameState.VICTORY:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dbs-purple to-dbs-vividPurple">
            <div className="text-center p-8 bg-black/30 backdrop-blur-sm rounded-lg max-w-md">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">¡Victoria!</h2>
              <p className="text-white mb-6">
                ¡Felicidades! Has completado todos los mundos y has demostrado ser el guerrero más fuerte.
              </p>
              <button 
                onClick={handleRestart} 
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-bold"
              >
                Jugar de Nuevo
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dbs-darkPurple to-black">
      {gameState !== GameState.BATTLE && (
        <header className="w-full py-3 md:py-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dbs-purple via-dbs-vividPurple to-dbs-orange">
            Dragon Ball Mundos
          </h1>
        </header>
      )}

      {renderGameState()}
    </div>
  );
};

export default Index;
