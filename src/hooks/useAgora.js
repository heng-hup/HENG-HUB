import { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = "ใส่IDที่ได้จากAgora"; 
const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

export const useAgora = () => {
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [isJoin, setIsJoin] = useState(false);

  const joinAsHost = async (channelName) => {
    await client.setClientRole("host");
    await client.join(APP_ID, channelName, null, null);
    const [audio, video] = await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalVideoTrack(video);
    await client.publish([audio, video]);
    setIsJoin(true);
  };

  const leave = async () => {
    localVideoTrack?.close();
    await client.leave();
    setIsJoin(false);
  };

  return { localVideoTrack, isJoin, joinAsHost, leave };
};
