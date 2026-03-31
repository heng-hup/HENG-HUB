export const exec = (textContext, setters) => {
  // เปิด Sidebar และส่งค่าไปที่ NoteManager
  setters.setShowSidebar(true);
  // ตรงนี้เพิ่ม logic การ save เข้า Database (Firebase) ได้เลย
  console.log("Saving to HENG Note:", textContext);
};
