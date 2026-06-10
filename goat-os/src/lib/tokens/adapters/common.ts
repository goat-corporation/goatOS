import type { TokenProfile } from "@/types/tokens";
import { mockTokens } from "@/lib/tokens/mock-data";

export type TokenAdapterHealth = { name: string; mode: "live" | "mock"; healthy: boolean; message: string };

export interface TokenAdapter {
  name: string;
  health(): Promise<TokenAdapterHealth>;
  getTrendingTokens(): Promise<TokenProfile[]>;
  getToken(mint: string): Promise<TokenProfile | undefined>;
}

export function mockTokenLookup(mint: string) {
  return mockTokens.find((token) => token.mint === mint);
}

export function mockTrending() {
  return mockTokens;
}
