
import React, { useState, useEffect } from 'react';
import { Character } from '../data/characters';
import HealthBar from './HealthBar';
import PowerMeter from './PowerMeter';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Sword, Shield, Zap } from 'lucide-react';

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
  const [battleLog, setBattleLog] = useState<string[]>([`¡Ha comenzado la batalla contra ${enemy.name}!`]);
  const [isSpecialReady, setIsSpecialReady] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastMove, setLastMove] = useState<'attack' | 'defend' | 'special' | ''>('');
  const [playerAnimating, setPlayerAnimating] = useState<'attack' | 'defend' | 'special' | ''>('');
  const [enemyAnimating, setEnemyAnimating] = useState<'attack' | 'defend' | 'special' | ''>('');
  
  const maxPower = 100;
  const powerGainPerTurn = 20;
  const difficultyMultiplier = 1 + (difficulty * 0.1);

  useEffect(() => {
    if (!isPlayerTurn && !isGameOver) {
      // Turno del enemigo
      const timer = setTimeout(() => {
        enemyAttack();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, isGameOver]);

  useEffect(() => {
    // Verificar fin del juego
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
        title: "¡Victoria!",
        description: `¡Has derrotado a ${enemy.name}!`,
      });
      setBattleLog(prev => [...prev, `¡Has derrotado a ${enemy.name}!`]);
      setTimeout(() => onWin(), 2000);
    } else {
      toast({
        title: "¡Derrota!",
        description: "¡Has sido derrotado!",
        variant: "destructive"
      });
      setBattleLog(prev => [...prev, "¡Has sido derrotado!"]);
      setTimeout(() => onLose(), 2000);
    }
  };

  const performAttack = () => {
    if (isGameOver) return;
    
    // Animación de ataque
    setPlayerAnimating('attack');
    setTimeout(() => setPlayerAnimating(''), 600);
    
    // Calcular daño basado en el poder del jugador
    const damage = Math.floor(5 + (Math.random() * 10));
    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    
    setEnemyHealth(newEnemyHealth);
    setBattleLog(prev => [...prev, `Has atacado a ${enemy.name} causando ${damage} de daño!`]);
    setLastMove('attack');
    
    // Ganar poder
    const newPower = Math.min(maxPower, playerPower + powerGainPerTurn);
    setPlayerPower(newPower);
    
    if (newPower >= maxPower) {
      setIsSpecialReady(true);
    }
    
    setIsPlayerTurn(false);
  };

  const defendAction = () => {
    if (isGameOver) return;

    // Animación de defensa
    setPlayerAnimating('defend');
    setTimeout(() => setPlayerAnimating(''), 600);

    // Ganar poder adicional al defender
    const defensePower = Math.floor(powerGainPerTurn * 1.5);
    const newPower = Math.min(maxPower, playerPower + defensePower);
    
    setPlayerPower(newPower);
    setLastMove('defend');
    setBattleLog(prev => [...prev, `Te has puesto en posición defensiva, obteniendo ${defensePower} de energía Ki.`]);
    
    if (newPower >= maxPower) {
      setIsSpecialReady(true);
    }
    
    setIsPlayerTurn(false);
  };
  
  const enemyAttack = () => {
    if (isGameOver) return;
    
    // Animación de ataque del enemigo
    setEnemyAnimating('attack');
    setTimeout(() => setEnemyAnimating(''), 600);
    
    // Calcular daño enemigo basado en dificultad
    let damage = Math.floor((5 + (Math.random() * 10)) * difficultyMultiplier);
    
    // Reducir daño si el jugador estaba defendiendo
    if (lastMove === 'defend') {
      damage = Math.floor(damage * 0.5);
      setBattleLog(prev => [...prev, `¡Tu defensa ha reducido el daño recibido a la mitad!`]);
    }
    
    const newPlayerHealth = Math.max(0, playerHealth - damage);
    
    setPlayerHealth(newPlayerHealth);
    setBattleLog(prev => [...prev, `${enemy.name} te ha atacado causando ${damage} de daño!`]);
    
    // Probabilidad de que el enemigo use ataque especial
    if (Math.random() < 0.1 * difficulty) {
      setTimeout(() => {
        setEnemyAnimating('special');
        setTimeout(() => setEnemyAnimating(''), 800);
        
        const specialDamage = Math.floor(enemy.specialAttack.damage * difficultyMultiplier);
        const newHealthAfterSpecial = Math.max(0, newPlayerHealth - specialDamage);
        
        setPlayerHealth(newHealthAfterSpecial);
        setBattleLog(prev => [
          ...prev, 
          `¡${enemy.name} ha usado ${enemy.specialAttack.name} causando ${specialDamage} de daño!`
        ]);
      }, 800);
    }
    
    setLastMove('');
    setIsPlayerTurn(true);
  };
  
  const useSpecialAttack = () => {
    if (!isSpecialReady || isGameOver) return;
    
    // Animación de ataque especial
    setPlayerAnimating('special');
    setTimeout(() => setPlayerAnimating(''), 800);
    
    const damage = player.specialAttack.damage;
    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    
    setEnemyHealth(newEnemyHealth);
    setBattleLog(prev => [
      ...prev, 
      `¡Has usado ${player.specialAttack.name} causando ${damage} de daño!`
    ]);
    setLastMove('special');
    
    setPlayerPower(0);
    setIsSpecialReady(false);
    setIsPlayerTurn(false);
  };

  return (
    <div className="w-full p-2 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Estadísticas de personajes, imágenes y controles */}
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="bg-dbs-darkPurple/70 p-4 rounded-lg w-full">
              <HealthBar 
                currentHealth={playerHealth} 
                maxHealth={player.health} 
                name={player.name} 
                isPlayer={true} 
              />
              
              <div className="mt-4">
                <PowerMeter 
                  power={playerPower} 
                  maxPower={maxPower} 
                  onSpecialAttack={useSpecialAttack}
                  isReady={isSpecialReady}
                />
              </div>
            </div>
            
            <div className="bg-dbs-darkPurple/70 p-4 rounded-lg w-full">
              <HealthBar 
                currentHealth={enemyHealth} 
                maxHealth={enemy.health} 
                name={enemy.name} 
                isPlayer={false} 
              />
            </div>
          </div>
          
          {/* Arena de combate con personajes mejorada */}
          <div className="battle-arena relative w-full rounded-lg p-2 h-64 md:h-80 overflow-hidden">
            {/* Jugador */}
            <div className={`player-character ${playerAnimating ? `animate-${playerAnimating}` : ''}`}>
              <div className="battle-character">
                {playerAnimating === 'special' && (
                  <div className="ki-effect player-ki absolute inset-0 w-full h-full animate-pulse"></div>
                )}
                
                <img 
                  src={player.imageSrc} 
                  alt={player.name}
                  className="character-image z-10 object-contain max-h-32 md:max-h-48" 
                />
                
                <div className="character-shadow"></div>
                
                {playerAnimating === 'defend' && (
                  <div className="absolute inset-0 border-4 border-dbs-blue rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            
            {/* Enemigo */}
            <div className={`enemy-character ${enemyAnimating ? `animate-${enemyAnimating}` : ''}`}>
              <div className="battle-character">
                {enemyAnimating === 'special' && (
                  <div className="ki-effect enemy-ki absolute inset-0 w-full h-full animate-pulse"></div>
                )}
                
                <img 
                  src={enemy.imageSrc} 
                  alt={enemy.name}
                  className="character-image z-10 object-contain max-h-32 md:max-h-48" 
                />
                
                <div className="character-shadow"></div>
                
                {enemyAnimating === 'defend' && (
                  <div className="absolute inset-0 border-4 border-dbs-red rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            
            {/* Efectos de combate */}
            {playerAnimating === 'attack' && (
              <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-dbs-blue rounded-full animate-ping"></div>
            )}
            
            {enemyAnimating === 'attack' && (
              <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-dbs-red rounded-full animate-ping"></div>
            )}
            
            {playerAnimating === 'special' && (
              <div className="absolute left-0 top-1/2 w-1/2 h-6 bg-dbs-vividPurple transform -translate-y-1/2 rounded-full animate-pulse"></div>
            )}
            
            {enemyAnimating === 'special' && (
              <div className="absolute right-0 top-1/2 w-1/2 h-6 bg-dbs-red transform -translate-y-1/2 rounded-full animate-pulse"></div>
            )}
            
            {/* Indicador de turno */}
            <div className={`turn-indicator
              ${isPlayerTurn ? 'bg-dbs-blue' : 'bg-dbs-red'}`}>
              {isPlayerTurn ? 'Tu turno' : 'Turno enemigo'}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={performAttack}
              disabled={!isPlayerTurn || isGameOver}
              className="bg-dbs-blue hover:bg-dbs-blue/80 text-white py-2 md:py-3 px-3 md:px-4 text-base md:text-lg font-bold disabled:bg-gray-600 flex items-center justify-center gap-2"
            >
              <Sword className="w-4 h-4 md:w-5 md:h-5" />
              Atacar
            </Button>
            
            <Button
              onClick={defendAction}
              disabled={!isPlayerTurn || isGameOver}
              className="bg-dbs-darkPurple hover:bg-dbs-darkPurple/80 text-white py-2 md:py-3 px-3 md:px-4 text-base md:text-lg font-bold disabled:bg-gray-600 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 md:w-5 md:h-5" />
              Defender
            </Button>
          </div>
        </div>
        
        {/* Registro de batalla */}
        <div className="bg-dbs-darkPurple/50 p-4 rounded-lg h-64 md:h-80 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-2 sticky top-0 bg-dbs-darkPurple py-2">Registro de Batalla</h2>
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
