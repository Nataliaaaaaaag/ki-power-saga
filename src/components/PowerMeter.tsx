
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
        <span className="font-bold text-sm">Ki Power</span>
        <span className="text-sm font-semibold">{power}/{maxPower}</span>
      </div>
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-dbs-purple transition-all duration-300"
          style={{ width: `${powerPercentage}%` }}
        />
      </div>
      <button
        onClick={onSpecialAttack}
        disabled={!isReady}
        className={`mt-2 px-4 py-2 rounded-md text-white font-bold w-full transition-all duration-300
          ${isReady 
            ? 'bg-dbs-vividPurple hover:bg-dbs-purple animate-power-pulse' 
            : 'bg-gray-600 cursor-not-allowed'}`}
      >
        {isReady ? 'Special Attack' : 'Charging...'}
      </button>
    </div>
  );
};

export default PowerMeter;
