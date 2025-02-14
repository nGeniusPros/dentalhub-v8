import React, { useState } from 'react';

interface CaseStudy {
  id: number;
  description: string;
  correctAnswer: string;
}

const ConflictResolutionModule = () => {
  const [currentCase, setCurrentCase] = useState(0);
  const [score, setScore] = useState(0);

  const cases: CaseStudy[] = [
    {
      id: 1,
      description: "Team conflict scenario description...",
      correctAnswer: "Facilitate mediated discussion"
    }
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <div className="h-2 bg-gray-100 rounded-full mb-4">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((currentCase / Number(cases.length)) * 100).toFixed(0)}%` }}
        />
      </div>
    </div>
  );
};

export default ConflictResolutionModule;