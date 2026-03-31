const CACHE_NAME = 'heng-heng-v1';
// รายชื่อไฟล์ที่สำคัญ (ตรวจสอบชื่อไฟล์ให้ตรงกับที่มีจริงใน public นะครับ)
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/1000102275.png', // รูป Screenshot ที่คุณนัตมี
  '/1000102276.png',
  '/logo-192.png',
  '/logo-512.png'
];

// 1. ติดตั้ง Service Worker
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('HENG HENG: กำลังบันทึกไฟล์ลง Cache...');
        // ใช้ return เพื่อให้มั่นใจว่าบันทึกสำเร็จ
        return cache.addAll(urlsToCache).catch(err => {
          console.warn('HENG HENG: บางไฟล์โหลดลง Cache ไม่ได้ (ไม่เป็นไร):', err);
        });
      })
  );
});

// 2. ลบ Cache เก่า
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('HENG HENG: ลบ Cache เก่า:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. กลยุทธ์การดึงไฟล์ (Network First, then Cache) 
// วิธีนี้จะช่วยให้เวลาคุณนัตแก้โค้ด ลูกค้าจะเห็นของใหม่ทันทีถ้ามีเน็ต
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request) || caches.match('/index.html');
      })
  );
});
