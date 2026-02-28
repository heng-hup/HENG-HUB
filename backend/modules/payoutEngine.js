import { recordTransaction } from "./ledgerEngine.js";

/**
 * 💸 ระบบถอนเงินอัตโนมัติรายวัน
 * ดึงยอดจาก creator / seller ที่ค้างจ่าย แล้วบันทึกธุรกรรม
 */
export function processDailyPayouts(users) {
  const results = [];
  for (const u of users) {
    const tx = recordTransaction(u.id, "payout", u.balance);
    results.push(tx);
  }

  console.log(`✅ จ่ายรายวันให้ ${results.length} บัญชี`);
  return results;
}