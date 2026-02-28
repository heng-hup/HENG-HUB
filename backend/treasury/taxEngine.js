// heng/backend/treasury/taxEngine.js
export function calculateTaxes({ amount=0, category="default", profit=0 } = {}) {
  const VAT_RATE = 0.07;
  const WHT_RATE = 0.03;
  const vat = +(amount * VAT_RATE).toFixed(2);
  const wht = +(amount * WHT_RATE).toFixed(2);
  const corp = +(profit * 0.20).toFixed(2);
  return { base: amount, vat, wht, corpTax: corp, totalPayable: +(amount + vat - wht).toFixed(2) };
}