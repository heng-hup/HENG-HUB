import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";

function Home() {
  return (
    <div className="text-white text-center mt-20 text-2xl">
      HENG Home Feed
    </div>
  );
}

function Market() {
  return (
    <div className="text-white text-center mt-20 text-2xl">
      ร้านค้า
    </div>
  );
}

function Live() {
  return (
    <div className="text-white text-center mt-20 text-2xl">
      ไลฟ์สด
    </div>
  );
}

function Chat() {
  return (
    <div className="text-white text-center mt-20 text-2xl">
      แชท
    </div>
  );
}

function Profile() {
  return (
    <div className="text-white text-center mt-20 text-2xl">
      โปรไฟล์
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-black pb-20">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/live" element={<Live />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <BottomNav />

      </div>

    </BrowserRouter>
  );
}

export default App;;