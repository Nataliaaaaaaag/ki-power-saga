
import React from 'react';

interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
  name: string;
}

const HealthBar: React.FC<HealthBarProps> = ({ currentHealth, maxHealth, name }) => {
  const healthPercentage = (currentHealth / maxHealth) * 100;
  
  // Determine color based on health percentage
  const getHealthColor = () => {
    if (healthPercentage > 50) return 'bg-green-500';
    if (healthPercentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="font-bold text-sm">{name}</span>
        <span className="text-sm font-semibold">{currentHealth}/{maxHealth}</span>
      </div>
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getHealthColor()} transition-all duration-500`}
          style={{ width: `${healthPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default HealthBar;
