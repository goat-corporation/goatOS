import { env } from "@/lib/env";

export function getGoatClient() {
  return {
    mode: env.goatLiveEnabled ? "live" : "mock",
    chain: "solana",
    rpcUrl: env.SOLANA_RPC_URL
  };
}
