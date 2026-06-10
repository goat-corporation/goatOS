import type { TokenAdapter } from "@/lib/tokens/adapters/common";
import { mockTokenLookup, mockTrending } from "@/lib/tokens/adapters/common";

export class TelegramAdapter implements TokenAdapter {
  name = "Telegram";
  async health() {
    return { name: this.name, mode: "mock" as const, healthy: true, message: "Telegram signal uses mock fallback." };
  }
  async getTrendingTokens() {
    return mockTrending();
  }
  async getToken(mint: string) {
    return mockTokenLookup(mint);
  }
}
