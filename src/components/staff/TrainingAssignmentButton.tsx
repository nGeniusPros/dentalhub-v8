import React from 'react';
import { Button } from '../ui/button';

interface TrainingAssignmentButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const TrainingAssignmentButton: React.FC<TrainingAssignmentButtonProps> = ({
  onClick,
  disabled = false
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-navy hover:bg-navy-light text-white"
    >
      Assign Training
    </Button>
  );
};