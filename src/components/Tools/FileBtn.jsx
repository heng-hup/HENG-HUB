import React from 'react';
import ToolButton from './ToolButton';

export default function FileBtn({ onSend }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) onSend(`📁 ส่งไฟล์: ${file.name}`);
  };

  return (
    <>
      <input type="file" id="real-file" hidden onChange={handleFile} />
      <ToolButton icon="📁" label="ส่งไฟล์" onClick={() => document.getElementById('real-file').click()} />
    </>
  );
}
