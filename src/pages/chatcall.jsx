import VideoCall from "../components/VideoCall"
import ChatBox from "../components/ChatBox"
import StickerPanel from "../components/StickerPanel"

export default function Call(){

return(

<div style={{
display:"flex",
height:"100vh"
}}>

<div style={{flex:2}}>

<VideoCall/>

</div>

<div style={{
flex:1,
borderLeft:"1px solid #ddd",
padding:"10px"
}}>

<ChatBox/>

<StickerPanel/>

</div>

</div>

)

}