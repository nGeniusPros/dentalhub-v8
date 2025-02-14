import React from 'react';

interface BonusStructure {
  enrolled: boolean;
  type: string;
  frequency: string;
  targets: Array<{ metric: string; target: number; bonus: number }>;
  customPayoutDates?: string[];
  notes?: string;
}

interface BonusStructureSectionProps {
  value: BonusStructure;
  onChange: (value: BonusStructure) => void;
}

const BonusStructureSection: React.FC<BonusStructureSectionProps> = ({ value, onChange }) => {
  // This is a placeholder component for Bonus Structure
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Bonus Structure</h3>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter bonus structure notes"
        value={value.notes || ''}
        onChange={(e) => onChange({ ...value, notes: e.target.value })}
      />
    </div>
  );
};

export { BonusStructureSection };
