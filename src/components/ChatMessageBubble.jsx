import React from "react";

const ChatMessageBubble = ({ sender, text }) => {
  const isUser = sender === "You" || sender === "ชัญญานุช";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div
        className={`px-4 py-2 rounded-2xl max-w-[75%] ${
          isUser
            ? "bg-yellow-400 text-black rounded-br-none"
            : "bg-gray-700 text-yellow-300 rounded-bl-none"
        }`}
      >
        <div className="text-sm font-semibold">{sender}</div>
        <div className="text-base">{text}</div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;