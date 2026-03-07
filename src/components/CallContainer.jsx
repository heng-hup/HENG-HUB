import React, { useState } from "react";
import CallPanel from "./CallPanel";
import ChatDuringCall from "./ChatDuringCall";
import VideoCallModal from "./VideoCallModal";

const CallContainer = ({ user }) => {
  const [inCall, setInCall] = useState(false);
  const [videoCall, setVideoCall] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-yellow-300 bg-gradient-to-b from-black to-gray-900 h-full">
      {!inCall ? (
        <CallPanel onStartCall={() => setInCall(true)} onStartVideo={() => setVideoCall(true)} />
      ) : (
        <ChatDuringCall onEnd={() => setInCall(false)} />
      )}
      {videoCall && <VideoCallModal onClose={() => setVideoCall(false)} />}
    </div>
  );
};

export default CallContainer;