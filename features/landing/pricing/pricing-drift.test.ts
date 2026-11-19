import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { CREDIT_UNIT_CENTS_FALLBACK } from "@shelley/core/credits";
import { describe, expect, it } from "vitest";

import { PRICES } from "./price-data";

// One pricing source of truth (workplan present/13, D-ONEPRICE). Two layers
// legitimately hold the HS credit price — the static-SEO marketing figure in
// price-data.ts and the live-money seed in migration 084 (which the wallet also
// falls back to) — so "one" is enforced by binding them here: the € figure is
// authored once in price-data.ts, and every other copy must equal it. This test
// is the reason PRICING.md and the landing #pricing act no longer restate a
// number that could drift (the €40/€0.40 vs €100/€1 drift that existed before).

const here = dirname(fileURLToPath(import.meta.url));
const migration084 = resolve(
  here,
  "../../../../../../db/migrations/backend/084_credit_wallet.up.sql",
);

describe("HS credit price is one source of truth", () => {
  const authoredCents = PRICES.hsPerTrade * 100;

  it("the credit_price seed (084) matches the authored figure", () => {
    const sql = readFileSync(migration084, "utf8");
    const match = sql.match(/\(\s*'trade_screening'\s*,\s*1\s*,\s*(\d+)\s*\)/);
    expect(match, "trade_screening seed row not found in migration 084").not.toBeNull();
    expect(Number(match![1])).toBe(authoredCents);
  });

  it("the wallet's fallback unit price matches the authored figure", () => {
    expect(CREDIT_UNIT_CENTS_FALLBACK).toBe(authoredCents);
  });

  it("the €100 pack still buys a whole number of credits at this price", () => {
    expect(PRICES.hsPack % PRICES.hsPerTrade).toBe(0);
    // The headline the marketing sells: €100 = 20 credits.
    expect(PRICES.hsPack / PRICES.hsPerTrade).toBe(20);
  });
});
