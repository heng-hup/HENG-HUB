import socket from "./socket";

export function listenVideo(peer) {

  socket.on("offer", async (offer) => {

    await peer.setRemoteDescription(offer);

    const answer = await peer.createAnswer();

    await peer.setLocalDescription(answer);

    socket.emit("answer", answer);

  });

  socket.on("answer", async (answer) => {

    await peer.setRemoteDescription(answer);

  });

  socket.on("ice-candidate", async (candidate) => {

    await peer.addIceCandidate(candidate);

  });

}