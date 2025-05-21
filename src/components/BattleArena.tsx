
import React, { useState, useEffect } from 'react';
import { Character } from '../data/characters';
import HealthBar from './HealthBar';
import PowerMeter from './PowerMeter';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface BattleArenaProps {
  player: Character;
  enemy: Character;
  difficulty: number;
  onWin: () => void;
  onLose: () => void;
}

const BattleArena: React.FC<BattleArenaProps> = ({ player, enemy, difficulty, onWin, onLose }) => {
  const [playerHealth, setPlayerHealth] = useState(player.health);
  const [enemyHealth, setEnemyHealth] = useState(enemy.health);
  const [playerPower, setPlayerPower] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleLog, setBattleLog] = useState<string[]>([`Battle with ${enemy.name} has begun!`]);
  const [isSpecialReady, setIsSpecialReady] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const maxPower = 100;
  const powerGainPerTurn = 20;
  const difficultyMultiplier = 1 + (difficulty * 0.1);

  useEffect(() => {
    if (!isPlayerTurn && !isGameOver) {
      // Enemy's turn
      const timer = setTimeout(() => {
        enemyAttack();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, isGameOver]);

  useEffect(() => {
    // Check for game over
    if (playerHealth <= 0) {
      endGame(false);
    } else if (enemyHealth <= 0) {
      endGame(true);
    }
  }, [playerHealth, enemyHealth]);

  const endGame = (playerWins: boolean) => {
    setIsGameOver(true);
    if (playerWins) {
      toast({
        title: "Victory!",
        description: `You defeated ${enemy.name}!`,
      });
      setBattleLog(prev => [...prev, `You defeated ${enemy.name}!`]);
      setTimeout(() => onWin(), 2000);
    } else {
      toast({
        title: "Defeat!",
        description: "You were defeated!",
        variant: "destructive"
      });
      setBattleLog(prev => [...prev, "You were defeated!"]);
      setTimeout(() => onLose(), 2000);
    }
  };

  const performAttack = () => {
    if (isGameOver) return;
    
    // Calculate damage based on player power
    const damage = Math.floor(5 + (Math.random() * 10));
    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    
    setEnemyHealth(newEnemyHealth);
    setBattleLog(prev => [...prev, `You attacked ${enemy.name} for ${damage} damage!`]);
    
    // Gain power
    const newPower = Math.min(maxPower, playerPower + powerGainPerTurn);
    setPlayerPower(newPower);
    
    if (newPower >= maxPower) {
      setIsSpecialReady(true);
    }
    
    setIsPlayerTurn(false);
  };
  
  const enemyAttack = () => {
    if (isGameOver) return;
    
    // Calculate enemy damage based on enemy power and difficulty
    const damage = Math.floor((5 + (Math.random() * 10)) * difficultyMultiplier);
    const newPlayerHealth = Math.max(0, playerHealth - damage);
    
    setPlayerHealth(newPlayerHealth);
    setBattleLog(prev => [...prev, `${enemy.name} attacked you for ${damage} damage!`]);
    
    // Random chance for enemy to use special attack
    if (Math.random() < 0.1 * difficulty) {
      const specialDamage = Math.floor(enemy.specialAttack.damage * difficultyMultiplier);
      const newHealthAfterSpecial = Math.max(0, newPlayerHealth - specialDamage);
      
      setPlayerHealth(newHealthAfterSpecial);
      setBattleLog(prev => [
        ...prev, 
        `${enemy.name} used ${enemy.specialAttack.name} for ${specialDamage} damage!`
      ]);
    }
    
    setIsPlayerTurn(true);
  };
  
  const useSpecialAttack = () => {
    if (!isSpecialReady || isGameOver) return;
    
    const damage = player.specialAttack.damage;
    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    
    setEnemyHealth(newEnemyHealth);
    setBattleLog(prev => [
      ...prev, 
      `You used ${player.specialAttack.name} for ${damage} damage!`
    ]);
    
    setPlayerPower(0);
    setIsSpecialReady(false);
    setIsPlayerTurn(false);
  };

  return (
    <div className="w-full p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Character Stats & Controls */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="bg-dbs-darkPurple/70 p-4 rounded-lg flex-1 w-full">
              <h2 className="text-xl font-bold text-white mb-4">Player</h2>
              <HealthBar currentHealth={playerHealth} maxHealth={player.health} name={player.name} />
              
              <div className="mt-6">
                <PowerMeter 
                  power={playerPower} 
                  maxPower={maxPower} 
                  onSpecialAttack={useSpecialAttack}
                  isReady={isSpecialReady}
                />
              </div>
            </div>
            
            <div className="bg-dbs-darkPurple/70 p-4 rounded-lg flex-1 w-full">
              <h2 className="text-xl font-bold text-white mb-4">Enemy</h2>
              <HealthBar currentHealth={enemyHealth} maxHealth={enemy.health} name={enemy.name} />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={performAttack}
              disabled={!isPlayerTurn || isGameOver}
              className="bg-dbs-blue hover:bg-dbs-blue/80 text-white py-3 px-8 text-lg font-bold disabled:bg-gray-600"
            >
              Attack
            </Button>
          </div>
        </div>
        
        {/* Battle Log */}
        <div className="bg-dbs-darkPurple/50 p-4 rounded-lg h-80 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-2 sticky top-0 bg-dbs-darkPurple py-2">Battle Log</h2>
          <div className="space-y-2">
            {battleLog.map((log, index) => (
              <div key={index} className="text-dbs-lightPurple border-l-2 border-dbs-vividPurple pl-2 py-1">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
