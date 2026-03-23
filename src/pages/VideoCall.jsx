import React,{useEffect,useRef,useState} from "react"
import io from "socket.io-client"

const socket=io("https://heng-signaling.fly.dev")

export default function VideoCall(){

const localVideo=useRef(null)
const remoteVideo=useRef(null)
const fileInput=useRef(null)

const [msg,setMsg]=useState("")
const [messages,setMessages]=useState([])
const [mic,setMic]=useState(true)
const [cam,setCam]=useState(true)

let pc
let stream

useEffect(()=>{

pc=new RTCPeerConnection({
iceServers:[{urls:"stun:stun.l.google.com:19302"}]
})

navigator.mediaDevices.getUserMedia({
video:true,
audio:true
}).then(s=>{
stream=s
localVideo.current.srcObject=s
s.getTracks().forEach(t=>pc.addTrack(t,s))
})

pc.ontrack=e=>{
remoteVideo.current.srcObject=e.streams[0]
}

pc.onicecandidate=e=>{
if(e.candidate){
socket.emit("ice",e.candidate,"room")
}
}

socket.emit("join","room")

socket.on("ready",async()=>{

const offer=await pc.createOffer()
await pc.setLocalDescription(offer)
socket.emit("offer",offer,"room")

})

socket.on("offer",async offer=>{

await pc.setRemoteDescription(offer)

const answer=await pc.createAnswer()
await pc.setLocalDescription(answer)

socket.emit("answer",answer,"room")

})

socket.on("answer",a=>{
pc.setRemoteDescription(a)
})

socket.on("ice",c=>{
pc.addIceCandidate(c)
})

socket.on("chat",data=>{
setMessages(m=>[...m,data])
})

},[])

function send(){

if(!msg)return

socket.emit("chat",{text:msg},"room")
setMessages(m=>[...m,{me:true,text:msg}])
setMsg("")

}

function toggleMic(){

const t=localVideo.current.srcObject.getAudioTracks()[0]
t.enabled=!t.enabled
setMic(t.enabled)

}

function toggleCam(){

const t=localVideo.current.srcObject.getVideoTracks()[0]
t.enabled=!t.enabled
setCam(t.enabled)

}

function sendEmoji(e){

setMsg(msg+e)

}

function uploadFile(e){

const f=e.target.files[0]

if(!f)return

const url=URL.createObjectURL(f)

setMessages(m=>[...m,{file:url,name:f.name}])

}

return(

<div style={{
height:"100vh",
display:"flex",
flexDirection:"column",
background:"#1f2937",
color:"#fff"
}}>

{/* VIDEO */}

<div style={{display:"flex",flex:2}}>

<video ref={localVideo} autoPlay muted style={{width:"50%"}}/>

<video ref={remoteVideo} autoPlay style={{width:"50%"}}/>

</div>

{/* BUTTON BAR */}

<div style={{
display:"flex",
justifyContent:"center",
gap:"20px",
padding:"10px",
background:"#374151"
}}>

<button onClick={toggleCam}>
{cam?"📷 ปิดกล้อง":"📷 เปิดกล้อง"}
</button>

<button onClick={toggleMic}>
{mic?"🎤 ปิดไมค์":"🎤 เปิดไมค์"}
</button>

<button onClick={()=>fileInput.current.click()}>
➕
</button>

<input
type="file"
ref={fileInput}
style={{display:"none"}}
onChange={uploadFile}
/>

</div>

{/* CHAT */}

<div style={{
flex:1,
overflow:"auto",
padding:"10px"
}}>

{messages.map((m,i)=>{

if(m.text){

return(

<div key={i} style={{
textAlign:m.me?"right":"left",
margin:"5px"
}}>

<span style={{
background:m.me?"#22c55e":"#374151",
padding:"8px 12px",
borderRadius:"10px"
}}>

{m.text}

</span>

</div>

)

}

if(m.file){

return(

<div key={i}>

<a href={m.file} target="_blank">
📎 {m.name}
</a>

</div>

)

}

})}

</div>

{/* EMOJI BAR */}

<div style={{
display:"flex",
gap:"10px",
padding:"5px",
background:"#111"
}}>

<span onClick={()=>sendEmoji("😀")}>😀</span>
<span onClick={()=>sendEmoji("😍")}>😍</span>
<span onClick={()=>sendEmoji("😂")}>😂</span>
<span onClick={()=>sendEmoji("👍")}>👍</span>
<span onClick={()=>sendEmoji("🔥")}>🔥</span>

</div>

{/* INPUT */}

<div style={{
display:"flex",
padding:"10px",
background:"#111"
}}>

<input
value={msg}
onChange={e=>setMsg(e.target.value)}
placeholder="พิมพ์ข้อความ..."
style={{
flex:1,
padding:"10px",
borderRadius:"10px",
border:"none"
}}
/>

<button
onClick={send}
style={{
marginLeft:"10px",
padding:"10px 20px"
}}
>
ส่ง
</button>

</div>

</div>

)

}