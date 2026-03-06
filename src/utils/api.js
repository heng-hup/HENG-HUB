// heng/frontend/utils/api.js
export async function getFeed() {
  const res = await fetch("https://api.hengheng88.app/api/social/feed");
  return res.json();
}

export async function getMarketItems() {
  const res = await fetch("https://api.hengheng88.app/api/market/items");
  return res.json();
}