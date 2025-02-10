import React from 'react';

interface BonusStructureSectionProps {
  bonusData?: {
    type: string;
    amount: number;
    frequency: string;
  };
}

export const BonusStructureSection: React.FC<BonusStructureSectionProps> = ({
  bonusData
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-navy">Bonus Structure</h3>
      <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-gray-light/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-darker">Type:</span>
          <span className="font-medium">{bonusData?.type || 'Not Set'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-darker">Amount:</span>
          <span className="font-medium">
            {bonusData?.amount ? `$${bonusData.amount}` : 'Not Set'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-darker">Frequency:</span>
          <span className="font-medium">{bonusData?.frequency || 'Not Set'}</span>
        </div>
      </div>
    </div>
  );
};