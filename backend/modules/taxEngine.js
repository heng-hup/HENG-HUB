export function autoTaxDeduction({ amount, type }) {
  const vatRate = 0.07;   // VAT 7%
  const whtRate = 0.03;   // หัก ณ ที่จ่าย 3%
  const platformFee = 0.025; // ค่าระบบ 2.5%

  const vat = amount * vatRate;
  const wht = amount * whtRate;
  const fee = amount * platformFee;

  const netAmount = amount - vat - wht - fee;

  return {
    vat: Number(vat.toFixed(2)),
    wht: Number(wht.toFixed(2)),
    platformFee: Number(fee.toFixed(2)),
    netAmount: Number(netAmount.toFixed(2))
  };
}