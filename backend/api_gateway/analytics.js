// heng/backend/api_gateway/analytics.js
export function applyCommission(response, category) {
  const rateMap = { market: 0.05, food: 0.07, travel: 0.03, work: 0.10, default: 0.05 };
  const rate = rateMap[category] ?? rateMap.default;
  const items = (response.items||[]).map(item => {
    const price = Number(item.price || 0);
    const heng_fee = +(price * rate).toFixed(2);
    const heng_price = +(price + heng_fee).toFixed(2);
    return { ...item, heng_fee, heng_price };
  });
  return { source: category, total_items: items.length, heng_profit: items.reduce((s,i)=>s+i.heng_fee,0), items };
}