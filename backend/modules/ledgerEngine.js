import { calculateCommission } from "./commissionEngine.js";
import { autoTaxDeduction } from "./taxEngine.js";

export function recordTransaction(userId, type, amount) {
  const { hengFee, partnerShare } = calculateCommission(type, amount);
  const tax = autoTaxDeduction({ amount: partnerShare, type });
  const net = tax.netAmount;

  const log = {
    userId,
    type,
    gross: amount,
    hengFee,
    vat: tax.vat,
    wht: tax.wht,
    platformFee: tax.platformFee,
    net,
    date: new Date()
  };

  console.log("💾 บันทึกธุรกรรมสำเร็จ:", log);
  return log;
}