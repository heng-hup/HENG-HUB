let localStream;

export function initCall(videoElement, setConnected) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      localStream = stream;
      videoElement.srcObject = stream;
      setConnected(true);
    })
    .catch((err) => {
      console.error("ไม่สามารถเปิดกล้อง/ไมค์ได้:", err);
      setConnected(false);
    });
}

export function endCall() {
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }
}