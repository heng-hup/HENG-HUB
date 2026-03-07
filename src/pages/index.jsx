import { useNavigate } from "react-router-dom";

export default function Index() {

const navigate = useNavigate();

const loginGoogle = () => {
window.location.href = "/auth/google";
};

const loginLine = () => {
window.location.href = "/auth/line";
};

const loginFacebook = () => {
window.location.href = "/auth/facebook";
};

const loginEmail = () => {
navigate("/login");
};

const loginTelegram = () => {
window.open("https://t.me/", "_blank");
};

const loginInstagram = () => {
window.open("https://instagram.com", "_blank");
};

const loginGithub = () => {
window.location.href = "/auth/github";
};

return (

<div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black flex flex-col items-center justify-center text-white">

<h1 className="text-3xl font-bold text-yellow-400 mb-6">
⚡ เข้าสู่ระบบ HENG-HENG
</h1>

<div className="flex flex-col gap-3 w-80">

<button
onClick={loginGoogle}
className="bg-white text-black py-3 rounded-lg font-bold"
>
เข้าสู่ระบบด้วย Google
</button>

<button
onClick={loginLine}
className="bg-green-500 py-3 rounded-lg font-bold"
>
เข้าสู่ระบบด้วย LINE
</button>

<button
onClick={loginFacebook}
className="bg-blue-600 py-3 rounded-lg font-bold"
>
เข้าสู่ระบบด้วย Facebook
</button>

<button
onClick={loginEmail}
className="bg-yellow-400 text-black py-3 rounded-lg font-bold"
>
เข้าสู่ระบบด้วยอีเมล
</button>

<button
onClick={loginTelegram}
className="bg-cyan-500 py-3 rounded-lg font-bold"
>
เข้าสู่ระบบด้วย Telegram
</button>

<button
onClick={loginInstagram}
className="bg-gradient-to-r from-orange-500 to-purple-500 py-3 rounded-lg font-bold"
>
เข้าสู่ระบบด้วย Instagram
</button>

<button
onClick={loginGithub}
className="bg-black border py-3 rounded-lg font-bold"
>
เข้าสู่ระบบด้วย GitHub
</button>

</div>

<button
onClick={() => navigate("/")}
className="mt-6 text-yellow-400 underline"
>
กลับหน้าแรก
</button>

</div>

);
}