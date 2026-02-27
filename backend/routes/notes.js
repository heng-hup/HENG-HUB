// heng/backend/routes/notes.js
import express from "express";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../data/notes.db");

// เปิดฐานข้อมูล (ถ้าไม่มีจะสร้างใหม่อัตโนมัติ)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("❌ เปิดฐานข้อมูลล้มเหลว:", err.message);
  else console.log("✅ เปิดฐานข้อมูล notes สำเร็จ:", dbPath);
});

// สร้างตาราง notes ถ้ายังไม่มี
db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// ✅ ดึงโน้ตทั้งหมด
router.get("/", (req, res) => {
  db.all("SELECT * FROM notes ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ เพิ่มโน้ตใหม่
router.post("/", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "ต้องมี title และ content" });
  db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, content });
  });
});

// ✅ แก้ไขโน้ต
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  db.run("UPDATE notes SET title = ?, content = ? WHERE id = ?", [title, content, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, updated: this.changes });
  });
});

// ✅ ลบโน้ต
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM notes WHERE id = ?", id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, deleted: this.changes });
  });
});

export default router;