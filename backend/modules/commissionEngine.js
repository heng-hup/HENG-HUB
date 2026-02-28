import fs from "fs";
import path from "path";

const configPath = path.resolve("config/commission.json");
const commission = JSON.parse(fs.readFileSync(configPath));

export function calculateCommission(type, amount) {
  const rule = commission[type];
  if (!rule) throw new Error(`ไม่พบหมวดธุรกรรม: ${type}`);

  const hengFee = amount * (rule.hengFee || 0);
  const partnerShare = amount - hengFee;

  return {
    hengFee: Number(hengFee.toFixed(2)),
    partnerShare: Number(partnerShare.toFixed(2))
  };
}