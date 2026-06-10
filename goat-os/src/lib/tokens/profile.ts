import { store } from "@/lib/mock-store";
import { scoreTokenRisk } from "@/lib/tokens/risk-score";

export async function getTokens() {
  return store.tokens;
}

export async function getTokenByMint(mint: string) {
  return store.tokens.find((token) => token.mint === mint);
}

export async function getTokenRisk(mint: string) {
  const token = await getTokenByMint(mint);
  return token ? scoreTokenRisk(token) : undefined;
}
