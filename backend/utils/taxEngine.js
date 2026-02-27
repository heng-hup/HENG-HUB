// backend/utils/taxEngine.js
// Vers.1 — HENG Tax Engine: VAT 7%, WHT 3%, Company tax 20% (bookkeeping), Fee engine 3-30%
import { supabase } from "../supabaseClient.js";

/**
 * calcTaxes(transaction)
 * transaction = {
 *   id, amountGross, currency, serviceFeePercent (optional), type: 'sale'|'payout'|'fee'|'refund',
 *   vendor, timestamp
 * }
 *
 * Returns {
 *   vatAmount, whtAmount, companyFee, burnAmount, netAmount, breakdown
 * }
 */

export async function calcTaxes(tx) {
  const amount = Number(tx.amountGross || 0);
  const feePercent = Number(tx.serviceFeePercent ?? 0); // company fee %, e.g. 3-30
  const VAT_RATE = 0.07;
  const WHT_RATE = 0.03;
  const BURN_RATE = 0.01; // 1%

  // service fee (company income)
  const companyFee = +(amount * (feePercent / 100));

  // VAT: usually charge VAT on sales (depends on local rules). Here we consider VAT on gross sales.
  const vatAmount = +(amount * VAT_RATE);

  // WHT: for payments requiring withholding (e.g. payouts to third-party vendors) — configurable per tx
  const whtAmount = tx.isWithhold ? +(amount * WHT_RATE) : 0;

  // Burn: 1% of every transaction amount
  const burnAmount = +(amount * BURN_RATE);

  // Net amount to receiver (after company fee, vat withheld from seller? depends on flow)
  // We'll compute net = amount - companyFee - vatAmount - whtAmount - burnAmount
  const netAmount = +(amount - companyFee - vatAmount - whtAmount - burnAmount);

  const breakdown = { amount, companyFee, vatAmount, whtAmount, burnAmount, netAmount };

  // Persist tax record to Supabase table `tax_records`
  try {
    const { data, error } = await supabase
      .from("tax_records")
      .insert([
        {
          tx_id: tx.id || null,
          vendor: tx.vendor || null,
          amount: amount,
          vat: vatAmount,
          wht: whtAmount,
          company_fee: companyFee,
          burn: burnAmount,
          net_amount: netAmount,
          tx_type: tx.type || "sale",
          created_at: new Date().toISOString()
        },
      ])
      .select();
    if (error) {
      console.error("taxEngine - supabase insert error:", error.message);
    }
  } catch (e) {
    console.error("taxEngine - persist error:", e.message);
  }

  return { ...breakdown };
}

/**
 * summarizeTaxes(period)
 * period = { from: ISO, to: ISO }
 * Returns sums for the period
 */
export async function summarizeTaxes(fromISO, toISO) {
  // Query tax_records from supabase and sum columns
  try {
    const { data, error } = await supabase
      .from("tax_records")
      .select("amount, vat, wht, company_fee, burn, net_amount")
      .gte("created_at", fromISO)
      .lte("created_at", toISO);

    if (error) throw error;

    const totals = data.reduce(
      (acc, r) => {
        acc.amount += Number(r.amount || 0);
        acc.vat += Number(r.vat || 0);
        acc.wht += Number(r.wht || 0);
        acc.company_fee += Number(r.company_fee || 0);
        acc.burn += Number(r.burn || 0);
        acc.net_amount += Number(r.net_amount || 0);
        return acc;
      },
      { amount: 0, vat: 0, wht: 0, company_fee: 0, burn: 0, net_amount: 0 }
    );

    return totals;
  } catch (e) {
    console.error("summarizeTaxes error:", e.message);
    return null;
  }
}