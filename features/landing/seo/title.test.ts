import { describe, expect, it } from "vitest";
import { seoTitle } from "./title";

describe("seoTitle", () => {
  it("keeps the template when the suffixed title fits in 60 chars", () => {
    expect(seoTitle("What is CBAM?")).toBe("What is CBAM?");
    expect(seoTitle("x".repeat(52))).toBe("x".repeat(52));
  });

  it("drops the suffix when it would push the title past 60 chars", () => {
    const long = "What is EUDR? The EU Deforestation Regulation, Explained";
    expect(seoTitle(long)).toEqual({ absolute: long });
    expect(seoTitle("x".repeat(53))).toEqual({ absolute: "x".repeat(53) });
  });
});
