import React, { useState } from "react";

const PostModal = ({ onClose }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = () => {
    console.log("โพสต์ใหม่:", { text, image });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center text-yellow-300 p-6">
      <div className="bg-gray-900 rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-3">โพสต์ใหม่ 🎥</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="เขียนสิ่งที่อยากแชร์..."
          className="w-full bg-gray-800 p-2 rounded-lg text-white mb-3"
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3 text-sm"
        />
        <button
          onClick={handlePost}
          className="w-full bg-yellow-400 text-black rounded-full py-2 hover:bg-yellow-500"
        >
          โพสต์เลย
        </button>
        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-400 hover:text-yellow-300"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default PostModal;