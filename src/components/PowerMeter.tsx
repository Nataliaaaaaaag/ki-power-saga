
import React from 'react';

interface PowerMeterProps {
  power: number;
  maxPower: number;
  onSpecialAttack: () => void;
  isReady: boolean;
}

const PowerMeter: React.FC<PowerMeterProps> = ({ power, maxPower, onSpecialAttack, isReady }) => {
  const powerPercentage = (power / maxPower) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="font-bold text-sm">Energía Ki</span>
        <span className="text-sm font-semibold">{power}/{maxPower}</span>
      </div>
      <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden border border-dbs-darkPurple relative">
        {/* Power segments - like fighting games */}
        <div className="absolute inset-0 flex">
          {Array(5).fill(0).map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 h-full ${i < Math.floor(powerPercentage / 20) ? 'bg-dbs-vividPurple' : 'bg-transparent'} 
                border-r border-gray-700 last:border-r-0 transition-colors duration-200`}
            />
          ))}
        </div>
      </div>
      <button
        onClick={onSpecialAttack}
        disabled={!isReady}
        className={`mt-2 px-4 py-2 rounded-md text-white font-bold w-full transition-all duration-300
          ${isReady 
            ? 'bg-dbs-vividPurple hover:bg-dbs-purple animate-power-pulse' 
            : 'bg-gray-600 cursor-not-allowed'}`}
      >
        {isReady ? 'Ataque Especial' : 'Cargando...'}
      </button>
    </div>
  );
};

export default PowerMeter;
