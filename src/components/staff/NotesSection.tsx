import React, { useState } from 'react';

interface Note {
  id: string;
  content: string;
  date?: string;
}

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (note: Note) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, onAddNote }) => {
  const [noteContent, setNoteContent] = useState("");

  const handleAddNote = () => {
    if (noteContent.trim() === "") return;
    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent.trim(),
      date: new Date().toISOString(),
    };
    onAddNote(newNote);
    setNoteContent("");
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Staff Notes</h3>
      <ul className="mb-4">
        {notes.map((note) => (
          <li key={note.id} className="mb-2">
            <p>{note.content}</p>
            {note.date && <small className="text-gray-500">{new Date(note.date).toLocaleString()}</small>}
          </li>
        ))}
      </ul>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Add a note..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleAddNote}
      >
        Add Note
      </button>
    </div>
  );
};

export { NotesSection };
