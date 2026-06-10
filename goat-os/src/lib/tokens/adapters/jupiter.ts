import { env } from "@/lib/env";
import type { TokenAdapter } from "@/lib/tokens/adapters/common";
import { mockTokenLookup, mockTrending } from "@/lib/tokens/adapters/common";

export class JupiterAdapter implements TokenAdapter {
  name = "Jupiter";
  async health() {
    return { name: this.name, mode: env.JUPITER_API_KEY ? "live" as const : "mock" as const, healthy: true, message: env.JUPITER_API_KEY ? "Configured" : "Using mock fallback" };
  }
  async getTrendingTokens() {
    return mockTrending();
  }
  async getToken(mint: string) {
    return mockTokenLookup(mint);
  }
}
