import React, { useState } from "react";

const NoteEditor = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (title && content) {
      onSave({ title, content, date: new Date().toLocaleString() });
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl text-yellow-300 shadow-md">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="หัวข้อ..."
        className="w-full bg-gray-800 p-2 mb-2 rounded-lg outline-none text-white"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="เขียนบันทึกของคุณ..."
        className="w-full bg-gray-800 p-2 h-32 rounded-lg outline-none text-white mb-3"
      />
      <button
        onClick={handleSave}
        className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-500"
      >
        บันทึก
      </button>
    </div>
  );
};

export default NoteEditor;