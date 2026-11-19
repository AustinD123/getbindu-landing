import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "node",
    // pricing-drift.test.ts checks the landing price against shelley's
    // backend migration and @shelley/core/credits, which do not exist here.
    // The file is kept so features/landing/ stays identical to shelley's;
    // it runs in shelley.
    exclude: ["**/node_modules/**", "features/landing/pricing/pricing-drift.test.ts"],
  },
});
