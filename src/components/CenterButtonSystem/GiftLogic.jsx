export const getDynamicGifts = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const isEvenDay = date % 2 === 0;

  const baseGifts = [
    { id: 1, name: 'กุหลาบ', price: 1, icon: '🌹' },
    { id: 2, name: 'ส่งจูบ', price: 5, icon: '😘' },
    { id: 3, name: 'หัวใจไฟ', price: 10, icon: '🔥' },
  ];

  const dailyRotation = [
    { id: 4, name: 'ส้มมงคล', price: 25, icon: '🍊' },
    { id: 4, name: 'กาแฟเช้า', price: 25, icon: '☕' },
    { id: 4, name: 'อมยิ้ม', price: 25, icon: '🍭' },
    { id: 4, name: 'ซูชิหรู', price: 150, icon: '🍣' },
    { id: 4, name: 'ไอศกรีม', price: 25, icon: '🍦' },
    { id: 4, name: 'เบอร์เกอร์', price: 60, icon: '🍔' },
    { id: 4, name: 'หมูกระทะ', price: 300, icon: '🥘' },
  ];

  let seasonalGifts = (month === 4) 
    ? [{ id: 5, name: 'ปืนฉีดน้ำ', price: 500, icon: '🔫' }, { id: 6, name: 'รถเล่นน้ำ', price: 5000, icon: '🛻' }]
    : isEvenDay 
      ? [{ id: 5, name: 'มงกุฎเพชร', price: 2000, icon: '👑' }, { id: 6, name: 'เจ็ทส่วนตัว', price: 15000, icon: '🛩️' }]
      : [{ id: 5, name: 'รถสปอร์ต', price: 3000, icon: '🏎️' }, { id: 6, name: 'เรือยอร์ช', price: 14000, icon: '🛥️' }];

  let megaGift = (date <= 15) 
    ? { id: 8, name: 'เกาะ HENG', price: 20000, icon: '🏝️' } 
    : { id: 8, name: 'ปราสาททอง', price: 25000, icon: '🏰' };

  return [...baseGifts, dailyRotation[day], ...seasonalGifts, { id: 7, name: 'มังกรทอง', price: 8888, icon: '🐉' }, megaGift].slice(0, 8);
};
