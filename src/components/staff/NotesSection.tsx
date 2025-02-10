import React from 'react';

interface NotesSectionProps {
  notes?: string;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-navy">Notes</h3>
      <div className="p-4 border rounded-lg bg-gray-light/10">
        {notes ? (
          <p className="text-sm text-gray-darker whitespace-pre-wrap">{notes}</p>
        ) : (
          <p className="text-sm text-gray-darker italic">No notes available</p>
        )}
      </div>
    </div>
  );
};