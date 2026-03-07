import { createClient } from "@supabase/supabase-js";

/*
  ใช้ ENV จากไฟล์ .env
  VITE_SUPABASE_URL
  VITE_SUPABASE_KEY
*/

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

/*
  ตรวจสอบก่อนสร้าง client
  ป้องกัน error ตอน deploy
*/

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase ENV is missing");
}

/*
  สร้าง Supabase Client
*/

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});