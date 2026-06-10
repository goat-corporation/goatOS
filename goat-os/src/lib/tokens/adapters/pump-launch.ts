import type { TokenAdapter } from "@/lib/tokens/adapters/common";
import { mockTokenLookup, mockTrending } from "@/lib/tokens/adapters/common";

export class PumpLaunchAdapter implements TokenAdapter {
  name = "PumpLaunch";
  async health() {
    return { name: this.name, mode: "mock" as const, healthy: true, message: "Launch feed uses mock fallback until configured." };
  }
  async getTrendingTokens() {
    return mockTrending();
  }
  async getToken(mint: string) {
    return mockTokenLookup(mint);
  }
}
