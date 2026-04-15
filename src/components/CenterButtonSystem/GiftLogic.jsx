// GiftLogic.js
export const getDynamicGifts = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  let gifts = [
    { id: 'b1', name: '⚡️ Heart Beat', price: 10, icon: '💝' },
    { id: 'b2', name: '⚡️ Neon Star', price: 20, icon: '💫' },
    { id: 'b3', name: '⚡️ Turbo Fire', price: 50, icon: '🧨' },
    { id: 'b4', name: '⚡️ Rose Gold', price: 100, icon: '🌹' },
    { id: 'b5', name: '⚡️ Diamond Cut', price: 200, icon: '💎' },
    { id: 'b6', name: '⚡️ King Crown', price: 500, icon: '👑' },
  ];

  const flyItems = [{ n: 'Space Rocket', p: 12000, i: '🚀' }, { n: 'UFO Tech', p: 18000, i: '🛸' }];
  for (let i = 1; i <= 10; i++) {
    const item = flyItems[i % flyItems.length];
    gifts.push({ id: `fly_${i}`, name: `⚡️ ${item.n} Max`, price: item.p + (i * 250), icon: item.i });
  }

  if (month === 4) {
    gifts.push({ id: 's1', name: '⚡️ Water Cannon', price: 1500, icon: '🌊' });
  }

  if (date >= 25) {
    gifts.push({ id: 'god_1', name: '⚡️ HENG UNIVERSE', price: 150000, icon: '🌌' });
  }

  return gifts;
};
