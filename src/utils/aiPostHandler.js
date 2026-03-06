import { API_BASE } from "../config";

export async function autoPostToGlobal(content) {
  try {
    if (!content || content.trim() === "") {
      return {
        success: false,
        message: "กรุณาเขียนข้อความก่อนโพสต์",
      };
    }

    const payload = {
      text: content,
      language: "auto",
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(`${API_BASE}/global/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "โพสต์ไม่สำเร็จ");
    }

    return {
      success: true,
      message: "🌍 โพสต์ขึ้น HENG Global สำเร็จ",
      data,
    };
  } catch (error) {
    console.error("❌ Global Post Error:", error);

    return {
      success: false,
      message: "ไม่สามารถโพสต์ได้ กรุณาลองใหม่",
    };
  }
}