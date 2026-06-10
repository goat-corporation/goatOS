import { env } from "@/lib/env";
import type { TokenAdapter } from "@/lib/tokens/adapters/common";
import { mockTokenLookup, mockTrending } from "@/lib/tokens/adapters/common";

export class DexscreenerAdapter implements TokenAdapter {
  name = "Dexscreener";
  async health() {
    return { name: this.name, mode: env.DEXSCREENER_API_KEY ? "live" as const : "mock" as const, healthy: true, message: env.DEXSCREENER_API_KEY ? "Configured" : "Using mock fallback" };
  }
  async getTrendingTokens() {
    return mockTrending();
  }
  async getToken(mint: string) {
    return mockTokenLookup(mint);
  }
}
