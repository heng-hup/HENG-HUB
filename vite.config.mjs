import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // ✅ สำคัญ: ทำให้เข้าผ่านโดเมน hengheng88.app หรือ IP ในวงแลนได้
    open: true,
    strictPort: true,
  },
  // ✅ ส่วนนี้ทำให้ livekit-server-sdk ทำงานบน Browser ได้โดยไม่ฟ้อง Error
  define: {
    global: 'window',
    'process.env': {},
  },
  resolve: {
    alias: {
      // ✅ ช่วยให้ Library หาโมดูล Buffer เจอเวลาเจน Token หน้าบ้าน
      buffer: 'buffer',
    },
  },
  // ป้องกันปัญหาการ Build เมื่อใช้ Library ฝั่ง Server มาไว้หน้าบ้าน
  optimizeDeps: {
    include: ['buffer'],
  },
})
