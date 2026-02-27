// ✅ ใช้ CommonJS (เข้ากับ Hardhat ทุกเวอร์ชัน)
require("dotenv").config();
const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x0d53754c302af50a939a210b80fe1fe5df87a459";
const ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const token = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  console.log("📘 ชื่อเหรียญ:", await token.name());
  console.log("🔤 สัญลักษณ์:", await token.symbol());
  console.log("💰 Supply ทั้งหมด:", (await token.totalSupply()).toString());
  console.log("👛 ยอดคงเหลือของคุณ:", (await token.balanceOf(wallet.address)).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});