import socket from "./socket";

let localStream;
let peer;

export async function startCall(roomId, localVideo, remoteVideo) {

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

  localVideo.srcObject = localStream;

  peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }
    ]
  });

  localStream.getTracks().forEach(track => {
    peer.addTrack(track, localStream);
  });

  peer.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", event.candidate);
    }
  };

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);

  socket.emit("offer", offer, roomId);
}


export function answerCall(offer, localVideo, remoteVideo) {

  peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }
    ]
  });

  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {

    localVideo.srcObject = stream;

    stream.getTracks().forEach(track => {
      peer.addTrack(track, stream);
    });

    peer.setRemoteDescription(offer);

    peer.createAnswer().then(answer => {

      peer.setLocalDescription(answer);

      socket.emit("answer", answer);

    });

  });

  peer.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

}