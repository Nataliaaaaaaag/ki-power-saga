
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

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setGameState(GameState.WORLD_SELECT);
    toast({
      title: "Character Selected",
      description: `You've chosen ${character.name}!`,
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
      
      // Check if all worlds are completed
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
          <div className="p-6 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Select a World</h2>
              <p className="text-dbs-lightPurple">Choose a world to battle in</p>
              
              {selectedCharacter && (
                <div className="mt-4 inline-flex items-center bg-dbs-darkPurple/70 px-4 py-2 rounded-lg">
                  <span className="text-dbs-purple font-semibold mr-2">Selected Character:</span> 
                  <span className="text-white">{selectedCharacter.name}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {worlds.map((world) => {
                const isCompleted = completedWorlds.includes(world.id);
                const isLocked = world.id > 1 && !completedWorlds.includes(world.id - 1);
                
                return (
                  <div
                    key={world.id}
                    className={`character-card p-4 border-2 relative
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
                        {/* Replace with actual world image when available */}
                        <div className="text-5xl font-bold text-dbs-lightPurple">{world.name.charAt(0)}</div>
                      </div>
                    </div>

                    {isLocked && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                        <div className="text-white text-center">
                          <span className="text-3xl">🔒</span>
                          <p>Complete previous world</p>
                        </div>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <span className="text-lg">✓</span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-2">{world.name}</h3>
                    <p className="text-dbs-lightPurple text-sm mb-3">{world.description}</p>
                    
                    <div className="flex items-center mb-2">
                      <span className="text-dbs-purple mr-2">Difficulty:</span>
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
              <h2 className="text-4xl font-bold text-dbs-red mb-4">Game Over</h2>
              <p className="text-white mb-6">You were defeated! Train harder and try again!</p>
              <button 
                onClick={handleRestart} 
                className="bg-dbs-vividPurple hover:bg-dbs-purple text-white px-8 py-3 rounded-lg font-bold"
              >
                Try Again
              </button>
            </div>
          </div>
        );
      
      case GameState.VICTORY:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dbs-purple to-dbs-vividPurple">
            <div className="text-center p-8 bg-black/30 backdrop-blur-sm rounded-lg max-w-md">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">Victory!</h2>
              <p className="text-white mb-6">
                Congratulations! You have completed all worlds and proven yourself to be the strongest warrior!
              </p>
              <button 
                onClick={handleRestart} 
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-bold"
              >
                Play Again
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dbs-darkPurple to-black">
      {gameState !== GameState.BATTLE && (
        <header className="w-full py-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dbs-purple via-dbs-vividPurple to-dbs-orange">
            Dragon Ball Worlds
          </h1>
        </header>
      )}

      {renderGameState()}
    </div>
  );
};

export default Index;
