// heng/backend/treasury/feeEngine.js
export function calculateHengFee(amount, category="default") {
  const rates = { market:0.05, food:0.07, travel:0.03, work:0.10, health:0.05, default:0.05 };
  const rate = rates[category] || rates.default;
  const fee = +(amount * rate).toFixed(2);
  return { fee, rate };
}