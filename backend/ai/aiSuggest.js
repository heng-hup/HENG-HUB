// heng/backend/ai/aiSuggest.js

/**
 * 🧠 AI Suggest System
 * ระบบแนะนำอัจฉริยะของ HENG GLOBAL
 * วิเคราะห์พฤติกรรมผู้ใช้ แล้วเสนอสิ่งที่ "เขาอยากทำต่อไป"
 */

export function suggestAction(user) {
  // ✅ ถ้ายังไม่มีข้อมูล
  if (!user || !user.activity) {
    return "✨ ยินดีต้อนรับสู่ HENG — เริ่มจากดูฟีดหรือแชตเพื่อนได้เลย!";
  }

  // ✅ วิเคราะห์พฤติกรรมหลัก
  const acts = user.activity.map(a => a.toLowerCase());

  // 💬 ชอบคุย / ใช้ Chat บ่อย
  if (acts.includes("chat") || acts.includes("message")) {
    return "💬 มีเพื่อนใหม่ออนไลน์อยู่ 5 คน ลองทักทายเลยไหม?";
  }

  // 📞 ชอบคอล / วิดีโอคอล
  if (acts.includes("call") || acts.includes("video")) {
    return "📞 มีสายจากเพื่อนที่คุณคุยล่าสุด รอรับไหม?";
  }

  // 🛍️ ชอบซื้อของ / Market
  if (acts.includes("market") || acts.includes("shopping")) {
    return "🛍️ สินค้าใหม่มาแรงวันนี้ ลดเพิ่มอีก 10% สำหรับคุณ!";
  }

  // 💰 ใช้งาน Wallet / Finance
  if (acts.includes("wallet") || acts.includes("finance")) {
    return "💰 ยอดเงินในกระเป๋าคุณมีพอสำหรับคูปอง HENG ลดภาษี!";
  }

  // 🎥 ชอบ Live
  if (acts.includes("live") || acts.includes("stream")) {
    return "🎥 ไลฟ์ใหม่เริ่มแล้ว คนที่คุณติดตามกำลังออนไลน์!";
  }

  // 📚 เรียนรู้ / ดูคอร์ส
  if (acts.includes("education") || acts.includes("learn")) {
    return "📚 คอร์ส 'ใช้ AI เพิ่มรายได้' กำลังได้รับความนิยมสุดในวันนี้!";
  }

  // ❤️ พฤติกรรมดี / ช่วยเหลือคนอื่น
  if (acts.includes("donate") || acts.includes("help")) {
    return "🌟 พลังบุญของคุณเพิ่มขึ้น! อยากแชร์ความดีนี้ในฟีดไหม?";
  }

  // 🌐 ไม่เข้ากลุ่มใดเลย
  return "⚡ ระบบกำลังเรียนรู้พฤติกรรมของคุณ เพื่อแนะนำสิ่งที่เหมาะสม!";
}