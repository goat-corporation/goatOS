export type TokenProfile = {
  mint: string;
  symbol: string;
  name: string;
  priceUsd: number;
  marketCapUsd: number;
  liquidityUsd: number;
  volume1hUsd: number;
  volume24hUsd: number;
  holders: number;
  top10HolderPercent: number;
  devWalletStatus: "UNKNOWN" | "CLEAN" | "SUSPICIOUS" | "DUMPED";
  lpStatus: "UNKNOWN" | "LOCKED" | "UNLOCKED" | "MIGRATED" | "LOW_LIQUIDITY";
  migrationStatus: "UNKNOWN" | "BONDING" | "MIGRATED" | "FAILED";
  bundleRisk: number;
  socialVelocity: number;
  createdAt: Date;
  links: {
    website?: string;
    x?: string;
    telegram?: string;
    dexscreener?: string;
    birdeye?: string;
  };
};

export type RiskScoreResult = {
  tokenMint: string;
  score: number;
  level: "LOW" | "MODERATE" | "HIGH" | "SEVERE" | "EXTREME";
  reasons: string[];
  warnings: string[];
};
