// heng/backend/treasury/ledger.js
import fs from "fs";
import path from "path";
const ledgerFile = path.join(process.cwd(), "heng/backend/treasury/ledger.json");

export function initLedger() {
  if (!fs.existsSync(ledgerFile)) fs.writeFileSync(ledgerFile, JSON.stringify([]));
}

export function recordTransaction(entry) {
  const ledger = JSON.parse(fs.readFileSync(ledgerFile, "utf8"));
  ledger.push({ ...entry, timestamp: new Date().toISOString() });
  fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));
}

export function getLedger() {
  if (!fs.existsSync(ledgerFile)) return [];
  return JSON.parse(fs.readFileSync(ledgerFile, "utf8"));
}