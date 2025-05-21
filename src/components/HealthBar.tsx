
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
  name: string;
  isPlayer?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ currentHealth, maxHealth, name, isPlayer = true }) => {
  const healthPercentage = (currentHealth / maxHealth) * 100;
  
  // Determinar color basado en el porcentaje de salud
  const getHealthColor = () => {
    if (healthPercentage > 50) return 'bg-green-500';
    if (healthPercentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full">
      <div className={`flex ${isPlayer ? 'justify-start' : 'justify-end'} mb-1 items-center`}>
        <span className={`font-bold text-sm ${isPlayer ? 'text-dbs-blue' : 'text-dbs-red'}`}>{name}</span>
        <span className="text-sm font-semibold ml-2">{currentHealth}/{maxHealth}</span>
      </div>
      <div className="w-full h-6 bg-gray-800 rounded-md overflow-hidden border-2 border-black relative">
        <div
          className={`h-full ${getHealthColor()} transition-all duration-300 absolute ${isPlayer ? 'left-0' : 'right-0'}`}
          style={{ width: `${healthPercentage}%` }}
        />
        {/* Líneas decorativas como en juegos de lucha */}
        <div className="absolute inset-0 flex justify-between">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="w-px h-full bg-black/30" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthBar;
