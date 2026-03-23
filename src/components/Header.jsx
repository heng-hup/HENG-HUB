import { useNavigate } from "react-router-dom";

export default function Header(){

const navigate = useNavigate()

return(

<div className="header">

<div className="header-actions">

<button
className="btn-register"
onClick={()=>navigate("/register")}
>
สมัครสมาชิก
</button>

<button
className="btn-login"
onClick={()=>navigate("/login")}
>
เข้าสู่ระบบ
</button>

</div>

</div>

)

}