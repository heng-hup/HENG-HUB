// heng/backend/api_gateway/tax/localTax.js
import axios from "axios";
export async function getVatRateForCountry(countryCode="TH") {
  try {
    // vatcomply has simple endpoints; using free example
    const res = await axios.get(`https://api.vatcomply.com/rates?base=${countryCode}`);
    // fallback: res.data
    return { country: countryCode, raw: res.data };
  } catch (e) {
    console.warn("vat lookup failed", e.message);
    return { country: countryCode, standard: null };
  }
}