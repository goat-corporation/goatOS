import type { TokenAdapter } from "@/lib/tokens/adapters/common";
import { mockTokenLookup, mockTrending } from "@/lib/tokens/adapters/common";

export class XSocialAdapter implements TokenAdapter {
  name = "XSocial";
  async health() {
    return { name: this.name, mode: "mock" as const, healthy: true, message: "Social velocity is mock-backed." };
  }
  async getTrendingTokens() {
    return mockTrending();
  }
  async getToken(mint: string) {
    return mockTokenLookup(mint);
  }
}
