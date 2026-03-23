import { useNavigate } from "react-router-dom";

export default function BottomNav(){

const navigate = useNavigate();

return(

<div style={navbar}>

<button onClick={()=>navigate("/")} style={btn}>
🏠
<p>หน้าแรก</p>
</button>

<button onClick={()=>navigate("/market")} style={btn}>
🛒
<p>ร้านค้า</p>
</button>


{/* ปุ่มกลาง */}

<div style={outerCircle} onClick={()=>navigate("/feed")}>

<div style={innerCircle}>
<span style={plus}>+</span>
</div>

</div>


<button onClick={()=>navigate("/call")} style={btn}>
📞
<p>แชท & โทร</p>
</button>


<button onClick={()=>navigate("/profile")} style={btn}>
👤
<p>โปรไฟล์</p>
</button>

</div>

);

}


/* style */

const btn = {
background:"none",
border:"none",
color:"white",
display:"flex",
flexDirection:"column",
alignItems:"center",
fontSize:"18px",
cursor:"pointer"
};


const navbar = {
position:"fixed",
bottom:0,
left:0,
right:0,
background:"#111",
display:"flex",
justifyContent:"space-around",
alignItems:"center",
padding:"10px 0",
color:"white",
zIndex:999
};


/* ปุ่ม + */

const outerCircle = {
width:"64px",
height:"64px",
borderRadius:"50%",
background:"#FFEA00",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
};

const innerCircle = {
width:"42px",
height:"42px",
borderRadius:"50%",
background:"#111",
display:"flex",
alignItems:"center",
justifyContent:"center"
};

const plus = {
fontSize:"28px",
color:"#FFEA00",
fontWeight:"900",
lineHeight:"1",
transform:"translateY(-2px)"
};