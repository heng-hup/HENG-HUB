import { useState } from "react"

export default function IosActionCenter(){

const [active,setActive] = useState(null)

const actions = [
{icon:"💬",label:"Chat"},
{icon:"📞",label:"Call"},
{icon:"🎥",label:"Meet"},
{icon:"😊",label:"Sticker"},
{icon:"📝",label:"Note"},
{icon:"📎",label:"File"},
{icon:"📷",label:"Photo"},
{icon:"🎤",label:"Voice"},
{icon:"👥",label:"Group"},
{icon:"📍",label:"Location"},
{icon:"🌍",label:"Translate"},
{icon:"🤖",label:"AI"},
{icon:"💰",label:"Wallet"},
{icon:"📤",label:"Share"}
]

return(

<div
style={{
position:"relative",
width:"100%",
animation:"fadein .25s"
}}
>

<div
style={{
display:"flex",
overflowX:"auto",
gap:"20px",
padding:"18px",
background:"rgba(255,255,255,0.08)",
backdropFilter:"blur(22px)",
borderRadius:"30px",
boxShadow:"0 10px 40px rgba(0,0,0,0.45)",
WebkitOverflowScrolling:"touch"
}}
>

{actions.map((a,i)=>(

<div
key={i}
onClick={()=>setActive(i)}
style={{
minWidth:"74px",
textAlign:"center",
color:"white",
cursor:"pointer",
transition:"transform .2s"
}}
>

<div
style={{
width:"62px",
height:"62px",
borderRadius:"22px",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px",
background:"linear-gradient(145deg,#1f1f1f,#2a2a2a)",
boxShadow: active===i
? "0 0 20px rgba(255,215,0,0.8)"
: "0 8px 22px rgba(0,0,0,0.55)",
transform: active===i ? "scale(1.18)" : "scale(1)"
}}
>

{a.icon}

</div>

<div
style={{
fontSize:"12px",
marginTop:"7px",
opacity:"0.9"
}}
>
{a.label}
</div>

</div>

))}

</div>

<style>
{`

@keyframes fadein{
from{opacity:0; transform:translateY(10px);}
to{opacity:1; transform:translateY(0);}
}

`}
</style>

</div>

)

}