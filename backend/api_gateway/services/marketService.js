// heng/backend/api_gateway/services/marketService.js
import * as shopee from "../providers/market/shopee.js";
import { applyCommission } from "../analytics.js";

export async function unifiedMarketSearch({ q, country }) {
  const r1 = await shopee.searchShopee(q, country);
  const merged = [...(r1.items||[])].slice(0,50);
  return applyCommission({ items: merged }, "market");
}