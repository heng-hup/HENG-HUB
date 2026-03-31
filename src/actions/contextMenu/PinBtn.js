export const exec = (msg, setters) => {
  // เพิ่มข้อความเข้าไปในรายการปักหมุดใน chat.jsx
  setters.setPinnedList(prev => [msg, ...prev]);
  // สั่งให้ UI แสดงแถบปักหมุดออกมา
  setters.setIsCollapsed(false); 
};
