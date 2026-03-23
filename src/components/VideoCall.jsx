import { useRef, useEffect } from "react"

export default function VideoCall(){

const videoRef = useRef(null)

useEffect(()=>{

async function start(){

const stream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
})

videoRef.current.srcObject = stream

}

start()

},[])

return(

<div style={{
background:"#000",
height:"250px"
}}>

<video
ref={videoRef}
autoPlay
playsInline
style={{width:"100%"}}
/>

</div>

)

}