import React, { useState } from "react";
import NoteEditor from "./NoteEditor";

const NotesPanel = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([note, ...notes]);
  };

  return (
    <div className="p-4 bg-black text-yellow-300 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">📝 บันทึกของฉัน</h2>
      <NoteEditor onSave={addNote} />
      <div className="mt-4 space-y-3">
        {notes.map((n, i) => (
          <div
            key={i}
            className="bg-gray-800 border border-yellow-500 rounded-xl p-3"
          >
            <div className="font-bold">{n.title}</div>
            <div className="text-sm text-gray-300">{n.content}</div>
            <div className="text-xs text-right mt-2 opacity-70">
              {n.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPanel;