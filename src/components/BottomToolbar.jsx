import React from "react";

function BottomToolbar({onChat,onVideo,onCall,onFile,onLocation}){

return(

<div style={{
position:"fixed",
bottom:0,
left:0,
right:0,
background:"#111",
display:"flex",
justifyContent:"space-around",
padding:"10px"
}}>

<button onClick={onChat}>💬</button>

<button onClick={onCall}>📞</button>

<button onClick={onVideo}>📹</button>

<button onClick={onFile}>📎</button>

<button onClick={onLocation}>📍</button>

</div>

)

}

export default BottomToolbar;