let stream;

export const initCall = async (videoRef, setConnected) => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.srcObject = stream;
    setConnected(true);
  } catch (err) {
    console.error("ไม่สามารถเปิดกล้อง/ไมค์ได้", err);
  }
};

export const endCall = () => {
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
  }
  window.history.back();
};