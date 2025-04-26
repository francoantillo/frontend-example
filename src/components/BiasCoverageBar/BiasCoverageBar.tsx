import React from 'react';
import { Source } from '../../types';

interface BiasCoverageBarProps {
  sources: Source[];
}

const BiasCoverageBar: React.FC<BiasCoverageBarProps> = ({ sources }) => {
  const totalSources = sources.length;
  
  const biasCount = {
    left: sources.filter(s => s.politicalBias === 'left').length,
    centerLeft: sources.filter(s => s.politicalBias === 'center-left').length,
    center: sources.filter(s => s.politicalBias === 'center').length,
    centerRight: sources.filter(s => s.politicalBias === 'center-right').length,
    right: sources.filter(s => s.politicalBias === 'right').length,
  };
  
  const biasPercentage = {
    left: (biasCount.left / totalSources) * 100,
    centerLeft: (biasCount.centerLeft / totalSources) * 100,
    center: (biasCount.center / totalSources) * 100,
    centerRight: (biasCount.centerRight / totalSources) * 100,
    right: (biasCount.right / totalSources) * 100,
  };
  
  // Determine dominant bias
  const dominantBias = Object.entries(biasCount).reduce(
    (max, [bias, count]) => (count > max.count ? { bias, count } : max),
    { bias: '', count: 0 }
  );
  
  const dominantPercentage = dominantBias.count / totalSources * 100;
  
  // Format the bias name for display
  const formatBiasName = (bias: string) => {
    switch(bias) {
      case 'left': return 'left';
      case 'centerLeft': return 'center-left';
      case 'center': return 'center';
      case 'centerRight': return 'center-right';
      case 'right': return 'right';
      default: return '';
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex h-2 w-full rounded-full overflow-hidden">
        <div 
          className="bg-red-600 transition-all duration-300" 
          style={{ width: `${biasPercentage.left}%` }}
        />
        <div 
          className="bg-red-400 transition-all duration-300" 
          style={{ width: `${biasPercentage.centerLeft}%` }}
        />
        <div 
          className="bg-gray-400 transition-all duration-300" 
          style={{ width: `${biasPercentage.center}%` }}
        />
        <div 
          className="bg-blue-400 transition-all duration-300" 
          style={{ width: `${biasPercentage.centerRight}%` }}
        />
        <div 
          className="bg-blue-600 transition-all duration-300" 
          style={{ width: `${biasPercentage.right}%` }}
        />
      </div>
      <p className="text-xs mt-1 text-gray-600">
        {dominantPercentage.toFixed(0)}% {formatBiasName(dominantBias.bias)} coverage: {totalSources} sources
      </p>
    </div>
  );
};

export default BiasCoverageBar;