import { Hono } from 'hono';

const app = new Hono();

// ✅ API หลักของ HENG GLOBAL
app.get('/', (c) => c.json({ message: 'HENG GLOBAL API ONLINE ✅' }));

// ✅ Route สำหรับทดสอบ
app.get('/ping', (c) => c.text('pong'));

export default app;