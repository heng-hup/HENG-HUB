import React from "react";
import { Brain } from "lucide-react";

const HENGAIButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-36 right-6 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full p-4 shadow-lg transition"
    >
      <Brain size={28} />
    </button>
  );
};

export default HENGAIButton;