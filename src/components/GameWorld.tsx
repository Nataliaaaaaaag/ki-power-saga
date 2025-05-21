
import React from 'react';
import { World } from '../data/worlds';
import { Character, enemies } from '../data/characters';
import BattleArena from './BattleArena';
import { Button } from '@/components/ui/button';

interface GameWorldProps {
  world: World;
  player: Character;
  onComplete: () => void;
  onGameOver: () => void;
  onBackToWorldSelect: () => void;
}

const GameWorld: React.FC<GameWorldProps> = ({ 
  world, 
  player, 
  onComplete, 
  onGameOver,
  onBackToWorldSelect
}) => {
  const enemy = enemies.find(e => e.id === world.enemyId) || enemies[0];

  return (
    <div 
      className="w-full min-h-screen flex flex-col p-4"
      style={{ background: world.background }}
    >
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={onBackToWorldSelect}
          className="bg-dbs-darkPurple hover:bg-dbs-darkPurple/80 text-white"
        >
          Back to Worlds
        </Button>
        
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{world.name}</h2>
          <p className="text-white/80 drop-shadow-md">Difficulty: {Array(world.difficulty).fill('★').join('')}</p>
        </div>
        
        <div className="invisible">
          <Button>Placeholder</Button>
        </div>
      </div>

      <div className="bg-gradient-to-b from-black/30 to-black/60 rounded-xl p-4 md:p-6 flex-1 backdrop-blur-sm">
        <p className="text-white mb-8 text-center">{world.description}</p>
        
        <div className="bg-dbs-darkPurple/80 rounded-lg p-4 md:p-6">
          <BattleArena
            player={player}
            enemy={enemy}
            difficulty={world.difficulty}
            onWin={onComplete}
            onLose={onGameOver}
          />
        </div>
      </div>
    </div>
  );
};

export default GameWorld;
